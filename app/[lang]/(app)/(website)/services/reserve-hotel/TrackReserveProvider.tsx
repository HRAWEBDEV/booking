'use client';
import { ReactNode } from 'react';
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
import { useShareDictionary } from '../share-dictionary/shareDictionaryContext';
import { useTrackReserve } from '../../hotel/reserve/hooks/useTrackReserve';
import TrackReserveForm from '../../hotel/reserve/components/TrackReserveForm';
import TrackReserveResult from '../../hotel/reserve/components/TrackReserveResult';

interface ReserveProviderProps {
 children: ReactNode;
}

export default function TrackReserveProvider({
 children,
}: ReserveProviderProps) {
 const isDesktop = useMediaQuery('(min-width: 768px)');
 const {
  shareDictionary: {
   component: { trackReserve },
  },
 } = useShareDictionary();

 const {
  isOpen,
  setIsOpen,
  isResultOpen,
  setIsResultOpen,
  reserveStatus,
  trackData,
  hotelInfo,
  isHotelInfoLoading,
  handleTrackSubmit,
  handleReset,
  downloadVoucherAnchor,
  isDownloadVoucherPending,
  handleDownloadVoucher,
  reserveTrackIsPending,
 } = useTrackReserve();

 const handleContactSupport = () => {
  console.log('Contact support clicked');
 };

 const formContent = (
  <TrackReserveForm
   onSubmit={handleTrackSubmit}
   onCancel={handleReset}
   isPending={reserveTrackIsPending}
  />
 );

 const resultContent = (
  <TrackReserveResult
   status={reserveStatus}
   trackDetails={trackData}
   hotelInfo={hotelInfo}
   isLoadingHotelInfo={isHotelInfoLoading}
   onDownloadVoucher={handleDownloadVoucher}
   isDownloading={isDownloadVoucherPending}
   onClose={() => setIsResultOpen(false)}
   onContactSupport={handleContactSupport}
   downloadVoucherAnchorRef={downloadVoucherAnchor}
  />
 );

 return (
  <TrackReserveHotelContext.Provider value={{ isOpen, setIsOpen }}>
   {children}
   {isDesktop ? (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
     <DialogContent className=' w-full p-4'>
      <DialogHeader>
       <DialogTitle className='dark:text-gray-300 text-gray-700 text-xl'>
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
       <DrawerTitle className='dark:text-gray-300 text-gray-700 text-xl'>
        {trackReserve.titleTrackReserve}
       </DrawerTitle>
      </DrawerHeader>
      {formContent}
     </DrawerContent>
    </Drawer>
   )}

   {isDesktop ? (
    <Dialog open={isResultOpen} onOpenChange={setIsResultOpen}>
     <DialogContent className='flex flex-col w-full p-0 max-w-md max-h-[95svh] overflow-hidden gap-0'>
      <DialogHeader className='p-4'>
       <DialogTitle className='dark:text-gray-300 text-gray-700 text-xl'>
        {trackReserve.titleReserveDetails}
       </DialogTitle>
      </DialogHeader>
      {resultContent}
     </DialogContent>
    </Dialog>
   ) : (
    <Drawer open={isResultOpen} onOpenChange={setIsResultOpen}>
     <DrawerContent className='flex flex-col p-0 max-h-[95svh]! overflow-hidden gap-0'>
      <DrawerHeader className='text-right'>
       <DrawerTitle className='dark:text-gray-300 text-gray-700 text-xl'>
        {trackReserve.titleReserveDetails}{' '}
       </DrawerTitle>
      </DrawerHeader>
      {resultContent}
     </DrawerContent>
    </Drawer>
   )}
  </TrackReserveHotelContext.Provider>
 );
}
