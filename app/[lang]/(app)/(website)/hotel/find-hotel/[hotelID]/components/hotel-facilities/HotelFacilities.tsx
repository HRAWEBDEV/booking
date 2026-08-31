import { use } from 'react';
import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import { type HotelFacility } from '../../../../services/hotelApiActions';

export default function HotelFacilities({
 dic,
 hotelFacilityPromise,
 roomFacilityPromise,
}: {
 dic: PreviewHotelDictionary;
 hotelFacilityPromise: Promise<HotelFacility[] | null>;
 roomFacilityPromise: Promise<HotelFacility[] | null>;
}) {
 const data = use(hotelFacilityPromise);
 const roomFacilities = use(roomFacilityPromise);
 return (
  <section
   id='hotelFacilities'
   className='scroll-mt-16 mb-4 p-4 rounded-md border border-border'
  >
   <h3 className='text-lg font-medium mb-3'>{dic.hotelFacilities.title}</h3>
   <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-2'>
    {data && !!data.length ? (
     data.map((item) => (
      <div
       key={item.key}
       className='flex gap-2 items-center text-neutral-600 dark:text-neutral-400'
      >
       <span className='font-medium'>{item.value}</span>
      </div>
     ))
    ) : (
     <p className='col-span-full font-medium'></p>
    )}
   </div>
   <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
    {roomFacilities && !!roomFacilities.length ? (
     roomFacilities.map((item) => (
      <div
       key={item.key}
       className='flex gap-2 items-center text-neutral-600 dark:text-neutral-400'
      >
       <span className='text-sm'>{item.value}</span>
      </div>
     ))
    ) : (
     <p className='col-span-full font-medium'></p>
    )}
   </div>
  </section>
 );
}
