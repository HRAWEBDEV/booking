'use client';
import { useState, ReactNode } from 'react';
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

export default function ReserveConfigProvider({
 children,
 dic,
}: {
 dic: ReserveHotelDictionary;
 children: ReactNode;
}) {
 // booking info
 const bookingInfoForm = useForm<BookingInfoSchema>({
  resolver: zodResolver(createBookingInfoSchema({ dic })),
  defaultValues: {
   ...defaultValues,
  },
 });
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
   return res.data;
  },
 });

 const bookingInvoiceInfo = getBookingInvoiceInfo({
  rooms: rooms || [],
 });

 const ctx: ReserveConfig = {
  reserveInfo: localeReserveInfo!,
  bookingInvoiceInfo,
  hotelInfo: {
   data: hotelInfo,
   isLoading: hotelInfoIsLoading,
   isSuccess: hotelInfoIsSuccess,
   isError: hotelInfoIsError,
  },
  rooms: {
   data: rooms,
   isLoading: roomsIsLoading,
   isSuccess: roomsIsSuccess,
   isError: roomsIsError,
  },
 };
 // handle error here
 if (!localeReserveInfo) return <div>error</div>;
 return (
  <reserveConfigContext.Provider value={ctx}>
   <FormProvider {...bookingInfoForm}>{children}</FormProvider>
  </reserveConfigContext.Provider>
 );
}
