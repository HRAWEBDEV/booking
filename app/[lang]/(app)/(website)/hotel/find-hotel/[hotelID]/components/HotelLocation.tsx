'use client';
import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import { FaMapPin } from 'react-icons/fa';
import dynamic from 'next/dynamic';

const HotelLocaltionMap = dynamic(() => import('./HotelLocationMap'), {
 ssr: false,
 loading: () => (
  <div className='h-full flex flex-col items-center justify-center text-center gap-2'>
   <FaMapPin className='size-20 text-neutral-600 dark:text-neutral-400' />
   <p className='text-sm font-medium text-neutral-600 dark:text-neutral-400'></p>
  </div>
 ),
});

export default function HotelLocation({
 dic,
}: {
 dic: PreviewHotelDictionary;
}) {
 return (
  <div className='h-44 w-full border border-input rounded-md bg-neutral-100 dark:bg-neutral-900 overflow-hidden relative'>
   {true ? (
    <HotelLocaltionMap dic={dic} />
   ) : (
    <div className='h-full flex flex-col items-center justify-center text-center gap-2'>
     <FaMapPin className='size-20 text-neutral-600 dark:text-neutral-400' />
     <p className='text-sm font-medium text-neutral-600 dark:text-neutral-400'>
      {dic.hotelLocaltionMap.unkownLocation}
     </p>
    </div>
   )}
  </div>
 );
}
