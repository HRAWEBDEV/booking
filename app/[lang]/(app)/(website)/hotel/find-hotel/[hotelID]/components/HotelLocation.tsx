'use client';
import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import { FaMapPin } from 'react-icons/fa';

export default function HotelLocation({
 dic,
}: {
 dic: PreviewHotelDictionary;
}) {
 return (
  <div className='h-44 border border-input rounded-md bg-neutral-100 dark:bg-neutral-900'>
   <div className='h-full flex flex-col items-center justify-center text-center gap-2'>
    <FaMapPin className='size-20 text-neutral-600 dark:text-neutral-400' />
    <p className='text-sm font-medium text-neutral-600 dark:text-neutral-400'>
     {dic.hotelLocaltionMap.unkownLocation}
    </p>
   </div>
  </div>
 );
}
