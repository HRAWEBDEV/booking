'use client';
import { XCircle, Clock } from 'lucide-react';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useShareDictionary } from '../../../services/share-dictionary/shareDictionaryContext';
import { ConvertToLocalDate } from '../../../utils/trackReserveUtils/convertToLocalDate';
import { useCurrencyFormatter } from '@/hooks/useCurrencyFormatter';
import { ReserveStatus } from '../hooks/useTrackReserve';
import {
 getLockExpireTimeApi,
 getLockExpireTime,
} from '../../services/reserveApiActions';
import { useQuery } from '@tanstack/react-query';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useRouter } from 'next/navigation';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { trackingCodeQueryName } from '../utils/reserveSteps';
import Link from 'next/link';

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
 const { locale } = useBaseConfig();
 const router = useRouter();
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
     icon: <IoCheckmarkCircleOutline className='w-18 h-18 text-secondary' />,
     text: trackReserve.reserveStatus.success,
     bgColor: 'bg-secondary/10',
     textColor: 'text-secondary',
     border: 'border border-secondary',
    };
   case 'pending':
    return {
     icon: <Clock className='w-18 h-18 text-primary' />,
     text: trackReserve.reserveStatus.paid,
     bgColor: 'bg-primary/10',
     textColor: 'text-primary',
     border: 'border border-primary',
    };
   case 'failed':
    return {
     icon: <XCircle className='w-18 h-18 text-red-700 dark:text-red-400' />,
     text: trackReserve.reserveStatus.failed,
     bgColor: 'bg-red-50 dark:bg-red-950',
     textColor: 'text-red-700 dark:text-red-400',
     border: 'border border-red-700 dark:border-red-400',
    };
  }
 };
 const statusConfig = getStatusConfig(status);

 const {
  data: lockExpireTime,
  isLoading: lockExpireTimeLoading,
  isSuccess: lockExpireTimeSuccess,
 } = useQuery({
  enabled: status === 'pending' && !!trackDetails?.lockInfo.trackingCode,
  queryKey: [getLockExpireTimeApi, trackDetails?.lockInfo.trackingCode],
  gcTime: 0,
  async queryFn({ signal }) {
   const res = await getLockExpireTime({
    signal,
    trackingCode: trackDetails!.lockInfo.trackingCode!,
   });
   return res.data;
  },
 });

 return (
  <div className='flex flex-col gap-4 h-full overflow-auto p-4'>
   {lockExpireTimeSuccess && lockExpireTime <= 0 && (
    <div>
     <Alert
      variant='destructive'
      className='bg-destructive/10 border-destructive'
     >
      <AlertDescription className='font-medium'>
       {trackReserve.pendingReserveIsExpired}.
      </AlertDescription>
     </Alert>
    </div>
   )}
   <div
    className={`flex flex-col items-center justify-center py-5 rounded-lg ${statusConfig.bgColor} ${statusConfig.border} mb-4`}
   >
    {statusConfig.icon}
    <p className={`text-2xl font-bold mt-2 ${statusConfig.textColor}`}>
     {statusConfig.text}
    </p>
    {status === 'failed' && (
     <p
      className={`text-sm text-center mt-2 px-4 ${statusConfig.textColor} font-medium text-base`}
     >
      {trackReserve.reserveStatus.failedMessage}
     </p>
    )}
   </div>
   {status !== 'failed' && (
    <div className='flex flex-col gap-3 text-sm mb-4'>
     <div className='flex justify-between items-center border-b pb-2 font-medium text-base'>
      <span className='text-muted-foreground'>
       {trackReserve.trackDetails.trackingCode}
      </span>
      <span>{trackDetails?.lockInfo.trackingCode}</span>
     </div>
     <div className='flex justify-between items-center border-b pb-2 font-medium text-base'>
      <span className='text-muted-foreground'>
       {trackReserve.trackDetails.hotelName}
      </span>
      <span className='font-medium'>
       {isLoadingHotelInfo
        ? trackReserve.trackDetails.hotelNameLoading
        : hotelInfo?.fName}
      </span>
     </div>
     <div className='flex justify-between items-center border-b pb-2 font-medium text-base'>
      <span className='text-muted-foreground'>
       {trackReserve.trackDetails.hotelCity}
      </span>
      <span className='font-medium'>
       {isLoadingHotelInfo
        ? trackReserve.trackDetails.hotelCityLoading
        : hotelInfo?.cityName}
      </span>
     </div>
     <div className='flex justify-between items-center border-b pb-2 font-medium text-base'>
      <span className='text-muted-foreground'>
       {trackReserve.trackDetails.guestName}
      </span>
      <span className='font-medium'>
       {trackDetails?.lockInfo.firstName} {trackDetails?.lockInfo.lastName}
      </span>
     </div>
     <div className='flex justify-between items-center border-b pb-2 font-medium text-base'>
      <span className='text-muted-foreground'>
       {trackReserve.trackDetails.phoneNumber}
      </span>
      <span className='font-medium'>{trackDetails?.lockInfo.contactNo}</span>
     </div>
     <div className='flex justify-between items-center border-b pb-2 font-medium text-base'>
      <span className='text-muted-foreground'>
       {trackReserve.trackDetails.checkIn}
      </span>
      <span className='font-medium'>
       {ConvertToLocalDate(
        trackDetails?.lockInfo.arrivelDateTimeOffset ?? undefined,
       )}
      </span>
     </div>
     <div className='flex justify-between items-center border-b pb-2 font-medium text-base'>
      <span className='text-muted-foreground'>
       {trackReserve.trackDetails.checkOut}
      </span>
      <span className='font-medium'>
       {ConvertToLocalDate(
        trackDetails?.lockInfo.departureDateTimeOffset ?? undefined,
       )}
      </span>
     </div>
     <div className='flex justify-between items-center pb-2 font-medium text-base'>
      <span className='text-muted-foreground'>
       {trackReserve.trackDetails.totalPrice}
      </span>
      <span className='font-bold text-primary text-xl'>
       {priceFormatter.format(Number(trackDetails?.lockInfo.totalPrice))}{' '}
       {trackReserve.priceUnit}
      </span>
     </div>
    </div>
   )}
   <div className='grid grid-cols-2 gap-4'>
    {status === 'success' && (
     <div className='col-span-2'>
      <Button
       size='lg'
       variant='secondary'
       className='w-full text-base'
       onClick={onDownloadVoucher}
       disabled={isDownloading}
      >
       {isDownloading && <Spinner />}
       {trackReserve.downloadVoucher}
      </Button>
     </div>
    )}
    {status === 'pending' && (
     <div className='col-span-2'>
      <Button
       size='lg'
       className='w-full text-base'
       disabled={lockExpireTimeLoading || !lockExpireTimeSuccess}
       onClick={() => {
        if (!trackDetails?.lockInfo.trackingCode) return;
        const searchParams = new URLSearchParams([
         [trackingCodeQueryName, trackDetails?.lockInfo.trackingCode],
        ]);
        router.push(`/${locale}/hotel/reserve?${searchParams.toString()}`);
        onClose();
       }}
      >
       {lockExpireTimeLoading && <Spinner />}
       {trackReserve.continueReserve}
      </Button>
     </div>
    )}
    <Button onClick={onClose} size='lg' className='text-base' variant='outline'>
     {trackReserve.closeBtn}
    </Button>
    <Button
     variant='destructive'
     onClick={onContactSupport}
     size='lg'
     className='text-base'
     asChild
    >
     <Link href='tel:02191780185'>{trackReserve.contactSupport}</Link>
    </Button>
   </div>
   <a href='' ref={downloadVoucherAnchorRef} download className='hidden'></a>
  </div>
 );
}
