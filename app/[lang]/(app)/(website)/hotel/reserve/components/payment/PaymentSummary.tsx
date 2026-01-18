import { type ReserveHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/reserve/dictionary';
import { Skeleton } from '@/components/ui/skeleton';
import { useReserveConfig } from '../../services/reserve-config/reserveConfigContext';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { Button } from '@/components/ui/button';
import { IoIosCopy } from 'react-icons/io';
import { toast } from 'sonner';

export default function PaymentSummary({
 dic,
}: {
 dic: ReserveHotelDictionary;
}) {
 const { hotelInfo, lockInfo } = useReserveConfig();
 const { locale } = useBaseConfig();

 return (
  <div className='row-start-1 lg:row-start-auto'>
   {lockInfo.isLoading || hotelInfo.isLoading ? (
    <Skeleton className='w-full h-96' />
   ) : (
    <div className='sticky top-1'>
     <section className='p-4 rounded-md border border-input mb-2'>
      <div className='mb-3 pb-3 border-b border-input'>
       <h1 className='text-lg font-medium'>{hotelInfo.data?.fName}</h1>
       <p className='text-sm text-neutral-600 dark:text-neutral-400'>
        {hotelInfo.data?.address}
       </p>
      </div>
      <div className='grid grid-cols-[1fr_max-content_1fr] gap-2 justify-center items-center mb-3 pb-3'>
       <div className='flex flex-col justify-center text-center gap-1'>
        <p className='text-primary text-sm font-medium'>
         {dic.reserveInfo.reserveSummary.arrivalDate}
        </p>
        <p className='font-medium text-sm'>
         {lockInfo.data?.lockInfo.arrivelDateTimeOffset
          ? new Date(
             lockInfo.data?.lockInfo.arrivelDateTimeOffset,
            ).toLocaleDateString(locale, {
             dateStyle: 'full',
            })
          : ''}
        </p>
        <p className='text-neutral-600 dark:text-neutral-400'>
         {hotelInfo.data?.checkin}
        </p>
       </div>
       <div className='flex flex-col text-sm text-neutral-500'>
        <span>- 4 {dic.reserveInfo.reserveSummary.night} -</span>
       </div>
       <div className='flex flex-col justify-center text-center gap-1'>
        <p className='text-primary text-sm font-medium'>
         {dic.reserveInfo.reserveSummary.departureDate}
        </p>
        <p className='font-medium text-sm'>
         {lockInfo.data?.lockInfo.departureDateTimeOffset
          ? new Date(
             lockInfo.data?.lockInfo.departureDateTimeOffset,
            ).toLocaleDateString(locale, {
             dateStyle: 'full',
            })
          : ''}
        </p>
        <p className='text-neutral-600 dark:text-neutral-400'>
         {hotelInfo.data?.checkout}
        </p>
       </div>
      </div>
      <div>
       <Button
        variant='outline'
        size='lg'
        className='w-full text-neutral-700 dark:text-neutral-400 bg-orange-50 dark:bg-orange-950 border-orange-600 dark:border-orange-400'
        onClick={() => {
         if (!lockInfo.data) return;
         navigator.clipboard.writeText(lockInfo.data.lockInfo.trackingCode);
         toast.success(dic.payment.paymentSummary.reserveCheckCodeCopied);
        }}
       >
        <span>{dic.payment.paymentSummary.reserveCheckCode}: </span>
        <span className='font-medium text-base'>
         {lockInfo.data?.lockInfo.trackingCode}
        </span>
        <IoIosCopy />
       </Button>
      </div>
     </section>
    </div>
   )}
  </div>
 );
}
