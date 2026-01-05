'use client';

import { FindHotelDictionary } from '@/internalization/app/dictionaries/website/find-hotel/dictionary';
import HotelListItem from './HotelListItem';

export function HotelsList({ dic }: { dic: FindHotelDictionary }) {
 return (
  <div className='grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 flex-1'>
   {Array.from({ length: 20 }, (_, i) => i).map((i) => (
    <HotelListItem key={i} dic={dic} />
   ))}
  </div>
 );
}
