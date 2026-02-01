'use client';

import { useState, ReactNode } from 'react';
import { TrackReserveHotelContext } from './ReserveHotelContext';
import { useMediaQuery } from '@/services/base-config/hooks/useMediaQuery';
import {
 Drawer,
 DrawerContent,
 DrawerHeader,
 DrawerTitle,
} from '@/components/ui/drawer';
import {
 Dialog,
 DialogContent,
 DialogHeader,
 DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';
import { useShareDictionary } from '../share-dictionary/shareDictionaryContext';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidIranMobileNumber } from '../../utils/mobileNumberValidator';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
 getLockInfo,
 downloadReserveVoucher,
} from '../../hotel/services/reserveApiActions';
import { getHotelInfo } from '../../hotel/services/hotelApiActions';
import { ConvertToLocalDate } from '../../utils/trackReserveUtils/convertToLocalDate';
import { useCurrencyFormatter } from '@/hooks/useCurrencyFormatter';
import { getSetupProviderCredentials } from '../../utils/getSetupProviderCredentials';
import { Spinner } from '@/components/ui/spinner';
import { useRef } from 'react';
interface ReserveProviderProps {
 children: ReactNode;
}

type ReserveStatus = 'failed' | 'pending' | 'success';

export default function ReserveProvider({ children }: ReserveProviderProps) {
 const [isOpen, setIsOpen] = useState(false);
 const [isResultOpen, setIsResultOpen] = useState(false);
 const isDesktop = useMediaQuery('(min-width: 768px)');
 const {
  shareDictionary: {
   component: { trackReserve },
  },
 } = useShareDictionary();
 const trackingFormSchema = z.object({
  trackingCode: z
   .string()
   .min(1, trackReserve.formSchemaMessages.trackingCodeRequired),
  phoneNumber: z
   .string()
   .min(1, trackReserve.formSchemaMessages.phoneNumberRequired)
   .refine(
    isValidIranMobileNumber,
    trackReserve.formSchemaMessages.phoneNumberWrong,
   ),
 });
 type TrackingFormData = z.infer<typeof trackingFormSchema>;

 const priceFormatter = useCurrencyFormatter({ numberingSystem: 'arabext' });

 const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
  reset,
 } = useForm<TrackingFormData>({
  resolver: zodResolver(trackingFormSchema),
  mode: 'onBlur',
  defaultValues: {
   trackingCode: '',
   phoneNumber: '',
  },
 });

 const { mutate, data, isError } = useMutation({
  mutationFn: ({
   trackingCode,
   signal,
  }: {
   trackingCode: string;
   signal?: AbortSignal;
  }) => {
   return getLockInfo({
    trackingCode: trackingCode,
    signal: signal!,
   });
  },
  onSuccess: (data) => {
   setIsOpen(false);
   setIsResultOpen(true);
   reset();
   console.log(data);
  },
  onError: (err) => {
   setIsOpen(false);
   setIsResultOpen(true);
   console.log(`API Request Failed `, err);
  },
 });

 const res = data?.data;
 const hotelID = res?.lockInfo.hotelID;
 const { isLoading, data: hotelInfoRes } = useQuery({
  queryKey: ['hotel-info', hotelID],
  queryFn: ({ signal }) =>
   getHotelInfo({
    signal,
    hotelID: String(hotelID),
   }),

  enabled: isResultOpen && !!hotelID,
 });

 const { channelID } = getSetupProviderCredentials();
 const downloadVoucherAnchor = useRef<HTMLAnchorElement>(null);

 const {
  mutate: downloadVoucher,
  isPending: isDownloadVoucherPending,
  isError: voucherError,
 } = useMutation({
  mutationFn: ({
   reserveID,
   channelID,
   hotelID,
  }: {
   reserveID: string;
   channelID: string;
   hotelID: string;
  }) => {
   return downloadReserveVoucher({
    reserveID,
    channelID,
    hotelID,
   });
  },
  onSuccess: async (data) => {
   const reportFile = new Blob([data.data], { type: 'application/pdf' });
   const reportFileUrl = URL.createObjectURL(reportFile);
   if (downloadVoucherAnchor.current) {
    downloadVoucherAnchor.current.href = reportFileUrl;
    downloadVoucherAnchor.current.click();
   }
   window.open(reportFileUrl);
  },
  onError: (err) => {
   console.log(err);
  },
 });
 const reserveStatus: ReserveStatus = (() => {
  if (isError) return 'failed';
  if (data?.data.isBooked === false) return 'pending';
  return data?.data.isBooked ? 'success' : 'failed';
 })();

 const onSubmit = (data: TrackingFormData) => {
  mutate({ trackingCode: data.trackingCode });
 };

 const handleResultOpenChange = (open: boolean) => {
  setIsResultOpen(open);
 };

 const handleCancel = () => {
  setIsOpen(false);
  reset();
 };

 const handleOpenChange = (open: boolean) => {
  setIsOpen(open);
  if (!open) {
   reset();
  }
 };

 const handleContactSupport = () => {
  console.log('Contact support clicked');
 };

 const formContent = (
  <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
   <div className='transition-all'>
    <Input
     type='text'
     placeholder={trackReserve.placeholderReserveCode}
     {...register('trackingCode')}
     className='text-right border-input'
    />
    {errors.trackingCode && (
     <p className='text-destructive text-sm mt-1'>
      {errors.trackingCode.message}
     </p>
    )}
   </div>
   <div className='transition-all'>
    <Input
     type='tel'
     placeholder={trackReserve.placeholderContactNumber}
     {...register('phoneNumber')}
     className='text-foreground placeholder:text-muted-foreground text-right'
    />
    {errors.phoneNumber && (
     <p className='text-destructive text-sm mt-1'>
      {errors.phoneNumber.message}
     </p>
    )}
   </div>
   <div className='flex items-center gap-4'>
    <Button
     type='button'
     className='flex-1'
     variant='destructive'
     onClick={handleCancel}
    >
     {trackReserve.closeBtn}
    </Button>
    <Button type='submit' className='flex-1' disabled={isSubmitting}>
     {isSubmitting ? '' : trackReserve.confirmBtn}
    </Button>
   </div>
  </form>
 );

 const getStatusConfig = (status: ReserveStatus) => {
  switch (status) {
   case 'success':
    return {
     icon: <CheckCircle2 className='w-12 h-12 text-green-500' />,
     text: trackReserve.reserveStatus.success,
     bgColor: 'bg-green-50 dark:bg-green-950',
     textColor: 'text-green-700 dark:text-green-400',
    };
   case 'pending':
    return {
     icon: <Clock className='w-12 h-12 text-blue-500' />,
     text: trackReserve.reserveStatus.paid,
     bgColor: 'bg-blue-50 dark:bg-blue-950',
     textColor: 'text-blue-700 dark:text-blue-400',
    };
   case 'failed':
    return {
     icon: <XCircle className='w-12 h-12 text-red-500' />,
     text: trackReserve.reserveStatus.failed,
     bgColor: 'bg-red-50 dark:bg-red-950',
     textColor: 'text-red-700 dark:text-red-400',
    };
  }
 };

 const statusConfig = getStatusConfig(reserveStatus);

 const resultContent = (
  <div className='flex flex-col gap-4'>
   <div
    className={`flex flex-col items-center justify-center py-6 rounded-lg ${statusConfig.bgColor}`}
   >
    {statusConfig.icon}
    <p className={`text-lg font-bold mt-2 ${statusConfig.textColor}`}>
     {statusConfig.text}
    </p>
    {reserveStatus === 'failed' && (
     <p className={`text-sm text-center mt-2 px-4 ${statusConfig.textColor}`}>
      {trackReserve.reserveStatus.failedMessage}
     </p>
    )}
   </div>
   {reserveStatus !== 'failed' && (
    <div className='flex flex-col gap-3 text-sm'>
     <div className='flex justify-between items-center border-b pb-2'>
      <span className='text-muted-foreground'>
       {trackReserve.trackDetails.trackingCode}
      </span>
      <span className='font-medium'>{res?.lockInfo.trackingCode}</span>
     </div>
     <div className='flex justify-between items-center border-b pb-2'>
      <span className='text-muted-foreground'>
       {trackReserve.trackDetails.hotelName}
      </span>
      <span className='font-medium'>
       {isLoading
        ? trackReserve.trackDetails.hotelNameLoading
        : hotelInfoRes?.data.fName}
      </span>
     </div>
     <div className='flex justify-between items-center border-b pb-2'>
      <span className='text-muted-foreground'>
       {trackReserve.trackDetails.hotelCity}
      </span>
      <span className='font-medium'>
       {isLoading
        ? trackReserve.trackDetails.hotelCityLoading
        : hotelInfoRes?.data.cityName}
      </span>
     </div>
     <div className='flex justify-between items-center border-b pb-2'>
      <span className='text-muted-foreground'>
       {trackReserve.trackDetails.checkIn}
      </span>
      <span className='font-medium'>
       {ConvertToLocalDate(res?.lockInfo.arrivelDateTimeOffset)}
      </span>
     </div>
     <div className='flex justify-between items-center border-b pb-2'>
      <span className='text-muted-foreground'>
       {trackReserve.trackDetails.checkOut}
      </span>
      <span className='font-medium'>
       {ConvertToLocalDate(res?.lockInfo.departureDateTimeOffset)}
      </span>
     </div>
     <div className='flex justify-between items-center border-b pb-2'>
      <span className='text-muted-foreground'>
       {trackReserve.trackDetails.guestName}
      </span>
      <span className='font-medium'>
       {res?.lockInfo.firstName} {res?.lockInfo.lastName}
      </span>
     </div>
     <div className='flex justify-between items-center border-b pb-2'>
      <span className='text-muted-foreground'>
       {trackReserve.trackDetails.roomType}
      </span>
      <span className='font-medium'>{res?.rooms[0].fName}</span>
     </div>
     <div className='flex justify-between items-center border-b pb-2'>
      <span className='text-muted-foreground'>
       {trackReserve.trackDetails.phoneNumber}
      </span>
      <span className='font-medium'>{res?.lockInfo.contactNo}</span>
     </div>
     <div className='flex justify-between items-center border-b pb-2'>
      <span className='text-muted-foreground'>
       {trackReserve.trackDetails.totalPrice}
      </span>
      <span className='font-bold text-primary'>
       {priceFormatter.format(Number(res?.lockInfo.totalPrice))}{' '}
       {trackReserve.priceUnit}
      </span>
     </div>
    </div>
   )}
   {reserveStatus === 'success' && (
    <Button
     className='w-full'
     onClick={() => {
      if (hotelID && res?.lockInfo.pmsReserveID) {
       downloadVoucher({
        channelID,
        hotelID: String(hotelID),
        reserveID: String(res.lockInfo.pmsReserveID),
       });
      }
     }}
     disabled={isDownloadVoucherPending}
    >
     {isDownloadVoucherPending && <Spinner />}
     {trackReserve.downloadVoucher}
    </Button>
   )}
   <div className='flex items-center gap-3 mt-2'>
    <Button className='flex-1' variant='outline' onClick={handleContactSupport}>
     {trackReserve.contactSupport}
    </Button>
    <Button className='flex-1' onClick={() => handleResultOpenChange(false)}>
     {trackReserve.closeBtn}
    </Button>
   </div>
   <a href='' ref={downloadVoucherAnchor} download className='invisible'></a>
  </div>
 );

 return (
  <TrackReserveHotelContext.Provider value={{ isOpen, setIsOpen }}>
   {children}
   {isDesktop ? (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
     <DialogContent className=' w-full  p-4'>
      <DialogHeader>
       <DialogTitle className='dark:text-gray-300 text-gray-700'>
        {trackReserve.titleTrackReserve}
       </DialogTitle>
      </DialogHeader>
      {formContent}
     </DialogContent>
    </Dialog>
   ) : (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
     <DrawerContent className='p-4 [&_div.bg-muted]:bg-primary!'>
      <DrawerHeader className='text-right px-0'>
       <DrawerTitle className='dark:text-gray-300 text-gray-700'>
        {trackReserve.titleTrackReserve}
       </DrawerTitle>
      </DrawerHeader>
      {formContent}
     </DrawerContent>
    </Drawer>
   )}

   {isDesktop ? (
    <Dialog open={isResultOpen} onOpenChange={handleResultOpenChange}>
     <DialogContent className='w-full p-4 max-w-md'>
      <DialogHeader>
       <DialogTitle className='dark:text-gray-300 text-gray-700'>
        {trackReserve.titleReserveDetails}
       </DialogTitle>
      </DialogHeader>
      {resultContent}
     </DialogContent>
    </Dialog>
   ) : (
    <Drawer open={isResultOpen} onOpenChange={handleResultOpenChange}>
     <DrawerContent className='p-4 pb-4' style={{ maxHeight: '100dvh' }}>
      <DrawerHeader className='text-right px-0'>
       <DrawerTitle className='dark:text-gray-300 text-gray-700'>
        {trackReserve.titleReserveDetails}{' '}
       </DrawerTitle>
      </DrawerHeader>
      <div>{resultContent}</div>
     </DrawerContent>
    </Drawer>
   )}
  </TrackReserveHotelContext.Provider>
 );
}
