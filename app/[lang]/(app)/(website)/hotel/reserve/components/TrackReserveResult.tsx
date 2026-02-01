'use client';

import { CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useShareDictionary } from '../../../services/share-dictionary/shareDictionaryContext';
import { ConvertToLocalDate } from '../../../utils/trackReserveUtils/convertToLocalDate';
import { useCurrencyFormatter } from '@/hooks/useCurrencyFormatter';
import { ReserveStatus } from '../hooks/useTrackReserve';

interface LockInfo {
 trackingCode: string | null;
 arrivelDateTimeOffset: string | null;
 departureDateTimeOffset: string | null;
 firstName: string | null;
 lastName: string | null;
 contactNo: string | null;
 totalPrice: number | null;
}

interface Room {
 fName: string | null;
}

interface TrackDetails {
 lockInfo: LockInfo;
 rooms: Room[];
}

interface HotelInfo {
 fName: string | null;
 cityName: string | null;
}

interface TrackReserveResultProps {
 status: ReserveStatus;
 trackDetails: TrackDetails | null | undefined;
 hotelInfo: HotelInfo | null | undefined;
 isLoadingHotelInfo: boolean;
 onDownloadVoucher: () => void;
 isDownloading: boolean;
 onClose: () => void;
 onContactSupport: () => void;
 downloadVoucherAnchorRef: React.RefObject<HTMLAnchorElement | null>;
}

export default function TrackReserveResult({
 status,
 trackDetails,
 hotelInfo,
 isLoadingHotelInfo,
 onDownloadVoucher,
 isDownloading,
 onClose,
 onContactSupport,
 downloadVoucherAnchorRef,
}: TrackReserveResultProps) {
 const {
  shareDictionary: {
   component: { trackReserve },
  },
 } = useShareDictionary();

 const priceFormatter = useCurrencyFormatter({ numberingSystem: 'arabext' });

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

 const statusConfig = getStatusConfig(status);

 return (
  <div className='flex flex-col gap-4'>
   <div
    className={`flex flex-col items-center justify-center py-6 rounded-lg ${statusConfig.bgColor}`}
   >
    {statusConfig.icon}
    <p className={`text-lg font-bold mt-2 ${statusConfig.textColor}`}>
     {statusConfig.text}
    </p>
    {status === 'failed' && (
     <p className={`text-sm text-center mt-2 px-4 ${statusConfig.textColor}`}>
      {trackReserve.reserveStatus.failedMessage}
     </p>
    )}
   </div>
   {status !== 'failed' && (
    <div className='flex flex-col gap-3 text-sm'>
     <div className='flex justify-between items-center border-b pb-2'>
      <span className='text-muted-foreground'>
       {trackReserve.trackDetails.trackingCode}
      </span>
      <span className='font-medium'>{trackDetails?.lockInfo.trackingCode}</span>
     </div>
     <div className='flex justify-between items-center border-b pb-2'>
      <span className='text-muted-foreground'>
       {trackReserve.trackDetails.hotelName}
      </span>
      <span className='font-medium'>
       {isLoadingHotelInfo
        ? trackReserve.trackDetails.hotelNameLoading
        : hotelInfo?.fName}
      </span>
     </div>
     <div className='flex justify-between items-center border-b pb-2'>
      <span className='text-muted-foreground'>
       {trackReserve.trackDetails.hotelCity}
      </span>
      <span className='font-medium'>
       {isLoadingHotelInfo
        ? trackReserve.trackDetails.hotelCityLoading
        : hotelInfo?.cityName}
      </span>
     </div>
     <div className='flex justify-between items-center border-b pb-2'>
      <span className='text-muted-foreground'>
       {trackReserve.trackDetails.checkIn}
      </span>
      <span className='font-medium'>
       {ConvertToLocalDate(
        trackDetails?.lockInfo.arrivelDateTimeOffset ?? undefined,
       )}
      </span>
     </div>
     <div className='flex justify-between items-center border-b pb-2'>
      <span className='text-muted-foreground'>
       {trackReserve.trackDetails.checkOut}
      </span>
      <span className='font-medium'>
       {ConvertToLocalDate(
        trackDetails?.lockInfo.departureDateTimeOffset ?? undefined,
       )}
      </span>
     </div>
     <div className='flex justify-between items-center border-b pb-2'>
      <span className='text-muted-foreground'>
       {trackReserve.trackDetails.guestName}
      </span>
      <span className='font-medium'>
       {trackDetails?.lockInfo.firstName} {trackDetails?.lockInfo.lastName}
      </span>
     </div>
     <div className='flex justify-between items-center border-b pb-2'>
      <span className='text-muted-foreground'>
       {trackReserve.trackDetails.roomType}
      </span>
      <span className='font-medium'>{trackDetails?.rooms[0].fName}</span>
     </div>
     <div className='flex justify-between items-center border-b pb-2'>
      <span className='text-muted-foreground'>
       {trackReserve.trackDetails.phoneNumber}
      </span>
      <span className='font-medium'>{trackDetails?.lockInfo.contactNo}</span>
     </div>
     <div className='flex justify-between items-center border-b pb-2'>
      <span className='text-muted-foreground'>
       {trackReserve.trackDetails.totalPrice}
      </span>
      <span className='font-bold text-primary'>
       {priceFormatter.format(Number(trackDetails?.lockInfo.totalPrice))}{' '}
       {trackReserve.priceUnit}
      </span>
     </div>
    </div>
   )}
   {status === 'success' && (
    <Button
     className='w-full'
     onClick={onDownloadVoucher}
     disabled={isDownloading}
    >
     {isDownloading && <Spinner />}
     {trackReserve.downloadVoucher}
    </Button>
   )}
   <div className='flex items-center gap-3 mt-2'>
    <Button className='flex-1' variant='outline' onClick={onContactSupport}>
     {trackReserve.contactSupport}
    </Button>
    <Button className='flex-1' onClick={onClose}>
     {trackReserve.closeBtn}
    </Button>
   </div>
   <a href='' ref={downloadVoucherAnchorRef} download className='invisible'></a>
  </div>
 );
}
