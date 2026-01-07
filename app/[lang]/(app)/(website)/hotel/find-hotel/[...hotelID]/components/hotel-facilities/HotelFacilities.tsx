import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import { FaCar } from 'react-icons/fa';

export default function HotelFacilities({
 dic,
}: {
 dic: PreviewHotelDictionary;
}) {
 return (
  <section
   id='hotelFacilities'
   className='scroll-mt-16 mb-4 p-4 shadow-md rounded-md dark:border dark:border-input'
  >
   <h3 className='text-lg font-medium text-primary mb-3'>
    {dic.hotelFacilities.title}
   </h3>
   <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
    {Array.from({ length: 12 }, (_, i) => i).map((i) => (
     <div
      key={i}
      className='flex gap-2 items-center text-neutral-600 dark:text-neutral-400'
     >
      <FaCar className='size-5' />
      <span className='text-sm'>پارکینگ</span>
     </div>
    ))}
   </div>
  </section>
 );
}
