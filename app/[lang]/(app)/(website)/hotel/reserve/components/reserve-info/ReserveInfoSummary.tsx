'use client';
import { type ReserveHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/reserve/dictionary';
import { useReserveConfig } from '../../services/reserve-config/reserveConfigContext';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { useCurrencyFormatter } from '@/hooks/useCurrencyFormatter';

export default function ReserveInfoSummary({
 dic,
}: {
 dic: ReserveHotelDictionary;
}) {
 const numberFormatter = useCurrencyFormatter();
 const {
  hotelInfo,
  reserveInfo,
  rooms: { data },
 } = useReserveConfig();

 const { locale } = useBaseConfig();
 return (
  <section className='p-4 rounded-md border border-input'>
   <div className='mb-3 pb-3 border-b border-input'>
    <h1 className='text-2xl font-medium'>{hotelInfo.data?.fName}</h1>
    <p className='text-sm text-neutral-600 dark:text-neutral-400'>
     {hotelInfo.data?.address}
    </p>
   </div>
   <div className='grid grid-cols-[1fr_max-content_1fr] gap-2 justify-center items-center mb-3 pb-3'>
    <div className='flex flex-col justify-center text-center gap-1'>
     <p className='text-primary text-sm font-medium'>
      {dic.reserveInfo.reserveSummary.arrivalDate}
     </p>
     <p className='font-medium text-base'>
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
     <p className='font-medium text-base'>
      {new Date(reserveInfo.toDate).toLocaleDateString(locale, {
       dateStyle: 'full',
      })}
     </p>
     <p className='text-neutral-600 dark:text-neutral-400'>
      {hotelInfo.data?.checkout}
     </p>
    </div>
   </div>
   <div className='flex flex-col'>
    <ul className='max-h-24 overflow-auto mb-2'>
     {data?.map((room, i) => (
      <li
       key={i}
       className='flex flex-wrap gap-2 text-xs text-neutral-600 dark:text-neutral-400'
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
    <div className='font-medium'>
     <span>{dic.reserveInfo.reserveSummary.totalPrice}: </span>
     <span className='text-lg'>{numberFormatter.format(121231231)}</span>
     <span className='text-xs'> ریال</span>
    </div>
   </div>
  </section>
 );
}
