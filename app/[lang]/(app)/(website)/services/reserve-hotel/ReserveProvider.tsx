'use client';

import { useState, ReactNode } from 'react';
import { ReserveHotelContext } from './ReserveHotelContext';
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
interface ReserveProviderProps {
 children: ReactNode;
}

const trackingFormSchema = z.object({
 trackingCode: z.string().min(1, 'کد پیگیری الزامی است'),
 phoneNumber: z.string().min(1, 'شماره تلفن الزامی است'),
});
type TrackingFormData = z.infer<typeof trackingFormSchema>;

type ReserveStatus = 'failed' | 'paid' | 'success';
export default function ReserveProvider({ children }: ReserveProviderProps) {
 const [isOpen, setIsOpen] = useState(false);
 const [isResultOpen, setIsResultOpen] = useState(false);
 const isDesktop = useMediaQuery('(min-width: 768px)');
 const {
  shareDictionary: {
   component: { trackReserve },
  },
 } = useShareDictionary();
 const [reserveData] = useState({
  status: 'success' as ReserveStatus,
  trackingCode: 'RES-2024-123456',
  hotelName: 'هتل پارسیان آزادی',
  checkIn: '1403/10/15',
  checkOut: '1403/10/18',
  guestName: 'علی احمدی',
  roomType: 'اتاق دو تخته',
  totalPrice: '15,000,000 تومان',
  phoneNumber: '09123456789',
 });
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

 const onSubmit = async (data: TrackingFormData) => {
  try {
   await new Promise((resolve) => setTimeout(resolve, 1000));
   console.log('valid form data: ', data);
   setIsOpen(false);
   setIsResultOpen(true);
   reset();
  } catch (err) {
   console.error('Submission Error: ', err);
  }
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
     className='text-right border-input focus:border-primary focus-visible:border-primary focus:ring-primary focus-visible:ring-0'
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
     className='text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:border-primary text-right'
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
     {isSubmitting ? 'در حال پردازش...' : trackReserve.confirmBtn}
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
   case 'paid':
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

 const statusConfig = getStatusConfig(reserveData.status);

 const resultContent = (
  <div className='flex flex-col gap-4'>
   <div
    className={`flex flex-col items-center justify-center py-6 rounded-lg ${statusConfig.bgColor}`}
   >
    {statusConfig.icon}
    <p className={`text-lg font-bold mt-2 ${statusConfig.textColor}`}>
     {statusConfig.text}
    </p>
   </div>
   <div className='flex flex-col gap-3 text-sm'>
    <div className='flex justify-between items-center border-b pb-2'>
     <span className='text-muted-foreground'>
      {trackReserve.successStatusFields.trackingCode}
     </span>
     <span className='font-medium'>{reserveData.trackingCode}</span>
    </div>
    <div className='flex justify-between items-center border-b pb-2'>
     <span className='text-muted-foreground'>نام هتل:</span>
     <span className='font-medium'>{reserveData.hotelName}</span>
    </div>
    <div className='flex justify-between items-center border-b pb-2'>
     <span className='text-muted-foreground'>
      {trackReserve.successStatusFields.checkIn}
     </span>
     <span className='font-medium'>{reserveData.checkIn}</span>
    </div>
    <div className='flex justify-between items-center border-b pb-2'>
     <span className='text-muted-foreground'>
      {trackReserve.successStatusFields.checkOut}
     </span>
     <span className='font-medium'>{reserveData.checkOut}</span>
    </div>
    <div className='flex justify-between items-center border-b pb-2'>
     <span className='text-muted-foreground'>
      {trackReserve.successStatusFields.guestName}
     </span>
     <span className='font-medium'>{reserveData.guestName}</span>
    </div>
    <div className='flex justify-between items-center border-b pb-2'>
     <span className='text-muted-foreground'>
      {trackReserve.successStatusFields.roomType}
     </span>
     <span className='font-medium'>{reserveData.roomType}</span>
    </div>
    <div className='flex justify-between items-center border-b pb-2'>
     <span className='text-muted-foreground'>
      {trackReserve.successStatusFields.phoneNumber}
     </span>
     <span className='font-medium'>{reserveData.phoneNumber}</span>
    </div>
    <div className='flex justify-between items-center border-b pb-2'>
     <span className='text-muted-foreground'>
      {trackReserve.successStatusFields.totalPrice}
     </span>
     <span className='font-bold text-primary'>{reserveData.totalPrice}</span>
    </div>
   </div>
   <div className='flex items-center gap-3 mt-2'>
    <Button className='flex-1' variant='outline' onClick={handleContactSupport}>
     {trackReserve.contactSupport}
    </Button>
    <Button className='flex-1' onClick={() => setIsResultOpen(false)}>
     {trackReserve.closeBtn}
    </Button>
   </div>
  </div>
 );

 return (
  <ReserveHotelContext.Provider value={{ isOpen, setIsOpen }}>
   {children}
   {isDesktop ? (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
     <DialogContent className='w-full p-4'>
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
    <Dialog open={isResultOpen} onOpenChange={setIsResultOpen}>
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
    <Drawer open={isResultOpen} onOpenChange={setIsResultOpen}>
     <DrawerContent
      className='p-4'
      style={{ height: 'fit-content', maxHeight: '90vh' }}
     >
      <DrawerHeader className='text-right px-0'>
       <DrawerTitle className='dark:text-gray-300 text-gray-700'>
        {trackReserve.titleReserveDetails}{' '}
       </DrawerTitle>
      </DrawerHeader>
      <div>{resultContent}</div>
     </DrawerContent>
    </Drawer>
   )}
  </ReserveHotelContext.Provider>
 );
}
