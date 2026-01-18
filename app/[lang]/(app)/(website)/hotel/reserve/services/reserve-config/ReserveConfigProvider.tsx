'use client';
import { useState, useCallback, ReactNode, useReducer } from 'react';
import { type ReserveHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/reserve/dictionary';
import {
 type ReserveConfig,
 reserveConfigContext,
} from './reserveConfigContext';
import {
 type LocalReserveInfo,
 getLocalReserveInfo,
} from '../../../find-hotel/[hotelID]/utils/localReserveInfoManager';
import { getSetupProviderCredentials } from '../../../../utils/getSetupProviderCredentials';
import { useQuery } from '@tanstack/react-query';
import {
 getSelectedRoomsApi,
 getSelectedRooms,
 getHotelInfoApi,
 getHotelInfo,
} from '../../../services/hotelApiActions';
import { getBookingInvoiceInfo } from '../../utils/bookingInvoiceInfo';
import { useForm, FormProvider } from 'react-hook-form';
import {
 type BookingInfoSchema,
 createBookingInfoSchema,
 defaultValues,
} from '../../schemas/bookingInfoSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { reserveRoomsPickerReducer } from '../../utils/ReserveRoomsPickerReducer';
import { useRouter } from 'next/navigation';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import {
 fromDateQueryName,
 toDateQueryName,
} from '../../../find-hotel/[hotelID]/utils/hotelQueries';
import {
 Dialog,
 DialogClose,
 DialogContent,
 DialogHeader,
 DialogFooter,
} from '@/components/ui/dialog';
import { BiError } from 'react-icons/bi';
import { Button } from '@/components/ui/button';
import {
 type LockReserveProps,
 type LockRoomInfo,
 lockReserve,
} from '../../../services/reserveApiActions';
import { useMutation } from '@tanstack/react-query';
import { type ReserveStep } from '../../utils/reserveSteps';
import { AxiosError } from 'axios';

export default function ReserveConfigProvider({
 children,
 dic,
}: {
 dic: ReserveHotelDictionary;
 children: ReactNode;
}) {
 const [activeReserveStep, setActiveReserveStep] =
  useState<ReserveStep>('reserve');
 const [reserveTrackingCode, setReserveTrackingCode] = useState<string | null>(
  null,
 );
 //
 const router = useRouter();
 const { locale } = useBaseConfig();
 //
 const [showConfirmCancelReserve, setShowConfirmCancelReserve] =
  useState(false);
 //
 const [storeRooms, storeRoomsDispatch] = useReducer(
  reserveRoomsPickerReducer,
  [],
 );
 // booking info
 const bookingInfoForm = useForm<BookingInfoSchema>({
  resolver: zodResolver(createBookingInfoSchema({ dic })),
  defaultValues: {
   ...defaultValues,
  },
 });
 const [guestInfo] = bookingInfoForm.watch(['guestInfo']);

 const setGuestInfoFormDefaults = useCallback(
  (i: number) => {
   bookingInfoForm.setValue(`guestInfo.${i}.saveAsReserveInfo`, false);
   bookingInfoForm.setValue(`guestInfo.${i}.hasEarlyCheckin`, false);
   bookingInfoForm.setValue(`guestInfo.${i}.hasLateCheckout`, false);
   bookingInfoForm.setValue(`guestInfo.${i}.type`, 'inner');
   bookingInfoForm.setValue(`guestInfo.${i}.gender`, 'male');
   bookingInfoForm.setValue(`guestInfo.${i}.firstName`, '');
   bookingInfoForm.setValue(`guestInfo.${i}.lastName`, '');
   bookingInfoForm.setValue(`guestInfo.${i}.nationalCode`, '');
   bookingInfoForm.setValue(`guestInfo.${i}.removed`, false);
  },
  [bookingInfoForm],
 );
 //
 const { arzID, channelID, providerID } = getSetupProviderCredentials();
 const [localeReserveInfo] = useState<LocalReserveInfo | null>(() => {
  try {
   if (typeof window !== 'undefined' && window) {
    return getLocalReserveInfo();
   }
   return null;
  } catch {
   return getLocalReserveInfo() || null;
  }
 });

 // hotel info
 const {
  data: hotelInfo,
  isLoading: hotelInfoIsLoading,
  isError: hotelInfoIsError,
  isSuccess: hotelInfoIsSuccess,
 } = useQuery({
  staleTime: 'static',
  enabled: !!localeReserveInfo && !!localeReserveInfo.hotelID,
  queryKey: [
   getHotelInfoApi,
   localeReserveInfo?.hotelID.toString(),
   channelID.toString(),
  ],
  async queryFn({ signal }) {
   const res = await getHotelInfo({
    signal,
    hotelID: localeReserveInfo!.hotelID,
    channelID: channelID,
   });
   return res.data;
  },
 });
 // selected rooms
 const {
  data: rooms,
  isLoading: roomsIsLoading,
  isError: roomsIsError,
  isSuccess: roomsIsSuccess,
 } = useQuery({
  enabled:
   !!localeReserveInfo &&
   !!localeReserveInfo.rooms.length &&
   !!localeReserveInfo.hotelID,
  gcTime: 0,
  staleTime: 'static',
  queryKey: [
   getSelectedRoomsApi,
   localeReserveInfo?.hotelID.toString(),
   arzID.toString(),
  ],
  async queryFn({ signal }) {
   const res = await getSelectedRooms({
    arzID,
    channelID,
    hotelID: localeReserveInfo!.hotelID,
    providerID,
    ratePlanID: localeReserveInfo!.rooms[0].ratePlanID,
    signal,
    roomInfo: (() => {
     const roomInfo: { roomTypeID: number; bedCount: number }[] = [];
     localeReserveInfo!.rooms.forEach((room) => {
      Array.from({ length: room.count }, (_, i) => i).forEach(() =>
       roomInfo.push({
        bedCount: room.beds,
        roomTypeID: room.roomTypeID,
       }),
      );
     });
     return roomInfo;
    })(),
    endDate: localeReserveInfo!.toDate,
    startDate: localeReserveInfo!.fromDate,
   });
   res.data.forEach((room, i) => {
    setGuestInfoFormDefaults(i);
   });
   storeRoomsDispatch({
    type: 'insertRooms',
    payload: res.data || [],
   });
   return res.data;
  },
 });

 const bookingInvoiceInfo = getBookingInvoiceInfo({
  rooms: rooms || [],
 });

 const { mutate: confirmReserveMutate } = useMutation({
  mutationFn({
   guestInfo,
   email,
   firstName,
   lastName,
   nationalCode,
   phoneNumber,
  }: BookingInfoSchema) {
   const lockRoomInfo: LockRoomInfo[] = [];
   rooms!.forEach((room, i) => {
    if (guestInfo[i].removed) return;
    const {
     firstName: guestFirstName,
     lastName: guestLastName,
     nationalCode: guestNationalCode,
     type,
     gender,
     hasEarlyCheckin,
     hasLateCheckout,
     saveAsReserveInfo,
    } = guestInfo[i];
    const confirmGuestFirstName = saveAsReserveInfo
     ? firstName
     : guestFirstName;
    const confirmGuestLastName = saveAsReserveInfo ? lastName : guestLastName;
    const confirmGuestNationalCode = saveAsReserveInfo
     ? nationalCode
     : guestNationalCode;
    const isForeigner = type === 'foreign';
    lockRoomInfo.push({
     roomTypeID: room.roomTypeID,
     adult: room.accommodationTypePrice.beds,
     isForeigner,
     earlyCheckin: hasEarlyCheckin,
     lateCheckout: hasLateCheckout,
     guestLockModel: {
      firstName: confirmGuestFirstName,
      lastName: confirmGuestLastName,
      genderID: gender === 'male' ? 1 : 2,
      nationalCode: !isForeigner ? confirmGuestNationalCode : null,
      passport: isForeigner ? confirmGuestNationalCode : null,
     },
    });
   });
   const lockReserveProps: LockReserveProps = {
    hotelID: hotelInfo!.hotelID.toString(),
    providerID,
    channelID,
    arzID,
    email: email || null,
    firstName,
    lastName,
    nationalCode,
    contactNo: phoneNumber,
    ratePlanID:
     rooms![0].accommodationTypePrice.accommodationRatePlanModel.ratePlanID,
    rateTypeID:
     rooms![0].accommodationTypePrice.accommodationRatePlanModel.rateTypeID,
    arrivelDate: localeReserveInfo!.fromDate,
    depatureDate: localeReserveInfo!.toDate,
    lockInfo: lockRoomInfo,
   };
   return lockReserve(lockReserveProps);
  },
  onError(err: AxiosError<string>) {},
  onSuccess(res) {
   if (res.data.trackingCode) {
    setActiveReserveStep('payment');
    setReserveTrackingCode(res.data.trackingCode);
   }
  },
 });

 function handleSubmitBookingFormInfo() {
  bookingInfoForm.handleSubmit(
   (data) => {
    confirmReserveMutate(data);
   },
   () => {
    toast.error(dic.reserveInfo.reserveForm.fillRequiredInfo);
   },
  )();
 }

 // cancel reserve
 function confirmCancelReserve() {
  const searchParams = new URLSearchParams();
  if (localeReserveInfo) {
   searchParams.set(fromDateQueryName, localeReserveInfo.fromDate);
   searchParams.set(toDateQueryName, localeReserveInfo.toDate);
  }
  router.replace(
   `/${locale}/hotel/find-hotel/${hotelInfo?.hotelID}?${searchParams.toString()}`,
  );
 }
 function handleCancelReserve() {
  setShowConfirmCancelReserve(true);
 }

 const ctx: ReserveConfig = {
  activeReserveStep,
  reserveInfo: localeReserveInfo!,
  bookingInvoiceInfo,
  hotelInfo: {
   data: hotelInfo,
   isLoading: hotelInfoIsLoading,
   isSuccess: hotelInfoIsSuccess,
   isError: hotelInfoIsError,
  },
  rooms: {
   guestInfo,
   data: rooms,
   storeRooms,
   storeRoomsDispatcher: storeRoomsDispatch,
   isLoading: roomsIsLoading,
   isSuccess: roomsIsSuccess,
   isError: roomsIsError,
  },
  onCancelReserve: handleCancelReserve,
  onSubmitBookingFormInfo: handleSubmitBookingFormInfo,
 };
 // handle error here
 if (!localeReserveInfo) return <p>error</p>;
 return (
  <reserveConfigContext.Provider value={ctx}>
   <FormProvider {...bookingInfoForm}>{children}</FormProvider>
   <Dialog
    open={showConfirmCancelReserve}
    onOpenChange={(newValue) => setShowConfirmCancelReserve(newValue)}
   >
    <DialogContent className='p-0 gap-0'>
     <DialogHeader className='p-4'></DialogHeader>
     <div className='p-4'>
      <div className='flex gap-1 items-center text-red-700 dark:text-red-400 font-medium'>
       <BiError className='size-12' />
       <p>{dic.cancelReserve.title}</p>
      </div>
     </div>
     <DialogFooter className='p-4'>
      <DialogClose asChild>
       <Button
        className='sm:w-24 h-11'
        variant='outline'
        onClick={() => setShowConfirmCancelReserve(false)}
       >
        {dic.cancelReserve.cancel}
       </Button>
      </DialogClose>
      <DialogClose asChild>
       <Button
        className='sm:w-24 h-11'
        variant='destructive'
        onClick={() => {
         confirmCancelReserve();
        }}
       >
        {dic.cancelReserve.confirm}
       </Button>
      </DialogClose>
     </DialogFooter>
    </DialogContent>
   </Dialog>
  </reserveConfigContext.Provider>
 );
}
