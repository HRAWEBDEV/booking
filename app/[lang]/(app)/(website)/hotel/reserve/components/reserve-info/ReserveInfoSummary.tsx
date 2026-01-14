'use client';
import { type ReserveHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/reserve/dictionary';
import { useReserveConfig } from '../../services/reserve-config/reserveConfigContext';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { useCurrencyFormatter } from '@/hooks/useCurrencyFormatter';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Skeleton } from '@/components/ui/skeleton';

export default function ReserveInfoSummary({
 dic,
}: {
 dic: ReserveHotelDictionary;
}) {
 const numberFormatter = useCurrencyFormatter();
 const {
  hotelInfo,
  reserveInfo,
  rooms: { data, isLoading },
 } = useReserveConfig();

 const { locale } = useBaseConfig();
 return (
  <div className='row-start-1 lg:row-start-auto'>
   {isLoading || hotelInfo.isLoading ? (
    <Skeleton className='w-full h-96' />
   ) : (
    <div className='sticky top-1'>
     <section className='p-4 rounded-md border border-input mb-2'>
      <div className='mb-3 pb-3 border-b border-input'>
       <h1 className='text-xl font-medium'>{hotelInfo.data?.fName}</h1>
       <p className='text-sm text-neutral-600 dark:text-neutral-400'>
        {hotelInfo.data?.address}
       </p>
      </div>
      <div className='grid grid-cols-[1fr_max-content_1fr] gap-2 justify-center items-center mb-3 pb-3'>
       <div className='flex flex-col justify-center text-center gap-1'>
        <p className='text-primary text-sm font-medium'>
         {dic.reserveInfo.reserveSummary.arrivalDate}
        </p>
        <p className='font-medium'>
         {new Date(reserveInfo.fromDate).toLocaleDateString(locale, {
          dateStyle: 'full',
         })}
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
        <p className='font-medium'>
         {new Date(reserveInfo.toDate).toLocaleDateString(locale, {
          dateStyle: 'full',
         })}
        </p>
        <p className='text-neutral-600 dark:text-neutral-400'>
         {hotelInfo.data?.checkout}
        </p>
       </div>
      </div>
      <div className='flex flex-col border-t border-input pt-4'>
       <ul className='h-24 overflow-auto mb-2'>
        {data?.map((room, i) => (
         <li
          key={i}
          className='flex flex-wrap gap-2 text-sm text-neutral-600 dark:text-neutral-400'
         >
          <span>{room.fName}: </span>
          <div>
           <span>
            {numberFormatter.format(room.accommodationTypePrice.netRoomRate)}
           </span>
           <span className='text-xs'> ریال</span>
          </div>
         </li>
        ))}
       </ul>
       <div className='text-rose-700 dark:text-rose-400 mb-1'>
        <span>+ {dic.reserveInfo.reserveSummary.TotalPrice}: </span>
        <span className='text-sm line-through'>
         {numberFormatter.format(121231231)}
        </span>
        <span className='text-xs'> ریال</span>
       </div>
       <div className='text-secondary mb-3 pb-2 border-b border-input'>
        <span>- {dic.reserveInfo.reserveSummary.totalDiscount}: </span>
        <span className='text-base'>{numberFormatter.format(121231231)}</span>
        <span className='text-xs'> ریال</span>
       </div>
       <div className='font-medium text-primary'>
        <span>{dic.reserveInfo.reserveSummary.discountTotalPrice}: </span>
        <span className='text-lg'>{numberFormatter.format(121231231)}</span>
        <span className='text-xs'> ریال</span>
       </div>
      </div>
     </section>
     <div className='grid gap-4 grid-cols-2'>
      <Button
       className='text-base'
       variant='outline'
       size='lg'
       disabled={isLoading || hotelInfo.isLoading}
      >
       {(isLoading || hotelInfo.isLoading) && <Spinner />}
       {dic.reserveInfo.reserveForm.cancel}
      </Button>
      <Button
       className='text-base'
       variant='secondary'
       size='lg'
       disabled={isLoading || hotelInfo.isLoading}
      >
       {(isLoading || hotelInfo.isLoading) && <Spinner />}
       {dic.reserveInfo.reserveForm.payment}
      </Button>
     </div>
    </div>
   )}
  </div>
 );
}
