'use client';

import { ShareDictionary } from '@/internalization/app/dictionaries/share/dictionary';
import HotelListItem from './HotelListItem';

export function HotelsList({ dic }: { dic: ShareDictionary }) {
 return (
  <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 flex-1'>
   {Array.from({ length: 20 }, (_, i) => i).map((i) => (
    <HotelListItem key={i} dic={dic} />
   ))}
  </div>
 );
}
