import { use } from 'react';
import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import { type HotelFacility } from '../../services/hotelApiActions';

export default function HotelFacilities({
 dic,
 hotelFacilityPromise,
}: {
 dic: PreviewHotelDictionary;
 hotelFacilityPromise: Promise<HotelFacility[] | null>;
}) {
 const data = use(hotelFacilityPromise);
 return (
  <section
   id='hotelFacilities'
   className='scroll-mt-16 mb-4 p-4 shadow-md rounded-md dark:border dark:border-input'
  >
   <h3 className='text-lg font-medium text-primary mb-3'>
    {dic.hotelFacilities.title}
   </h3>
   <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
    {data && !!data.length ? (
     data.map((item) => (
      <div
       key={item.key}
       className='flex gap-2 items-center text-neutral-600 dark:text-neutral-400'
      >
       <span className='text-sm'>{item.value}</span>
      </div>
     ))
    ) : (
     <p className='text-center col-span-full font-medium'>
      {dic.hotelFacilities.noItemFound}
     </p>
    )}
   </div>
  </section>
 );
}
