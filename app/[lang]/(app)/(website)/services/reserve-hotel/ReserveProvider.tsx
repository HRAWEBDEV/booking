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

interface ReserveProviderProps {
 children: ReactNode;
}

type ReserveStatus = 'failed' | 'paid' | 'success';

export default function ReserveProvider({ children }: ReserveProviderProps) {
 const [isOpen, setIsOpen] = useState(false);
 const [isResultOpen, setIsResultOpen] = useState(false);
 const isDesktop = useMediaQuery('(min-width: 768px)');

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

 const handleSubmit = () => {
  setIsOpen(false);
  setIsResultOpen(true);
 };

 const handleCancel = () => {
  setIsOpen(false);
 };

 const handleContactSupport = () => {
  console.log('Contact support clicked');
 };

 const getStatusConfig = (status: ReserveStatus) => {
  switch (status) {
   case 'success':
    return {
     icon: <CheckCircle2 className='w-12 h-12 text-green-500' />,
     text: 'رزرو موفق',
     bgColor: 'bg-green-50 dark:bg-green-950',
     textColor: 'text-green-700 dark:text-green-400',
    };
   case 'paid':
    return {
     icon: <Clock className='w-12 h-12 text-blue-500' />,
     text: 'در انتظار تایید',
     bgColor: 'bg-blue-50 dark:bg-blue-950',
     textColor: 'text-blue-700 dark:text-blue-400',
    };
   case 'failed':
    return {
     icon: <XCircle className='w-12 h-12 text-red-500' />,
     text: 'رزرو ناموفق',
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
     <span className='text-muted-foreground'>کد پیگیری:</span>
     <span className='font-medium'>{reserveData.trackingCode}</span>
    </div>
    <div className='flex justify-between items-center border-b pb-2'>
     <span className='text-muted-foreground'>نام هتل:</span>
     <span className='font-medium'>{reserveData.hotelName}</span>
    </div>
    <div className='flex justify-between items-center border-b pb-2'>
     <span className='text-muted-foreground'>تاریخ ورود:</span>
     <span className='font-medium'>{reserveData.checkIn}</span>
    </div>
    <div className='flex justify-between items-center border-b pb-2'>
     <span className='text-muted-foreground'>تاریخ خروج:</span>
     <span className='font-medium'>{reserveData.checkOut}</span>
    </div>
    <div className='flex justify-between items-center border-b pb-2'>
     <span className='text-muted-foreground'>نام مهمان:</span>
     <span className='font-medium'>{reserveData.guestName}</span>
    </div>
    <div className='flex justify-between items-center border-b pb-2'>
     <span className='text-muted-foreground'>نوع اتاق:</span>
     <span className='font-medium'>{reserveData.roomType}</span>
    </div>
    <div className='flex justify-between items-center border-b pb-2'>
     <span className='text-muted-foreground'>شماره تماس:</span>
     <span className='font-medium'>{reserveData.phoneNumber}</span>
    </div>
    <div className='flex justify-between items-center border-b pb-2'>
     <span className='text-muted-foreground'>مبلغ کل:</span>
     <span className='font-bold text-primary'>{reserveData.totalPrice}</span>
    </div>
   </div>

   {/* Action Buttons */}
   <div className='flex items-center gap-3 mt-2'>
    <Button className='flex-1' variant='outline' onClick={handleContactSupport}>
     تماس با پشتیبانی
    </Button>
    <Button className='flex-1' onClick={() => setIsResultOpen(false)}>
     بستن
    </Button>
   </div>
  </div>
 );

 return (
  <ReserveHotelContext.Provider value={{ isOpen, setIsOpen }}>
   {children}
   {isDesktop ? (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
     <DialogContent className='w-full p-4'>
      <DialogHeader>
       <DialogTitle className='dark:text-gray-300 text-gray-700'>
        پیگیری رزرو
       </DialogTitle>
      </DialogHeader>
      <div className='flex flex-col gap-4'>
       <Input
        type='text'
        placeholder='کد پیگیری رزرو'
        className='text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:border-primary!'
       />
       <Input
        type='number'
        placeholder='شماره تماس'
        className='text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:border-primary!'
       />
       <div className='flex items-center gap-4'>
        <Button className='flex-1' variant='destructive' onClick={handleCancel}>
         انصراف
        </Button>
        <Button className='flex-1' onClick={handleSubmit}>
         تایید
        </Button>
       </div>
      </div>
     </DialogContent>
    </Dialog>
   ) : (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
     <DrawerContent className='p-4 [&_div.bg-muted]:bg-primary!'>
      <DrawerHeader className='text-right px-0'>
       <DrawerTitle className='dark:text-gray-300 text-gray-700'>
        پیگیری رزرو
       </DrawerTitle>
      </DrawerHeader>
      <div className='flex flex-col gap-4'>
       <Input
        type='text'
        placeholder='کد پیگیری رزرو'
        className='text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:border-primary!'
       />
       <Input
        type='number'
        placeholder='شماره تماس'
        className='text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:border-primary!'
       />
       <div className='flex items-center gap-4'>
        <Button className='flex-1' variant='destructive' onClick={handleCancel}>
         انصراف
        </Button>
        <Button className='flex-1' onClick={handleSubmit}>
         تایید
        </Button>
       </div>
      </div>
     </DrawerContent>
    </Drawer>
   )}

   {isDesktop ? (
    <Dialog open={isResultOpen} onOpenChange={setIsResultOpen}>
     <DialogContent className='w-full p-4 max-w-md'>
      <DialogHeader>
       <DialogTitle className='dark:text-gray-300 text-gray-700'>
        جزئیات رزرو
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
        جزئیات رزرو
       </DrawerTitle>
      </DrawerHeader>
      <div>{resultContent}</div>
     </DrawerContent>
    </Drawer>
   )}
  </ReserveHotelContext.Provider>
 );
}
