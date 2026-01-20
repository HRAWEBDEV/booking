'use client';

import { FindHotelDictionary } from '@/internalization/app/dictionaries/website/find-hotel/dictionary';
import HotelListItem from './HotelListItem';
import useFindHotel from '../../../../services/find-hotel/FindHotelContext';

export function HotelsList({ dic }: { dic: FindHotelDictionary }) {
 const { isRowView } = useFindHotel();
 return (
  <div
   className={`${
    isRowView
     ? 'flex flex-col items-center'
     : 'grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 '
   } flex-1 gap-4`}
  >
   {Array.from({ length: 20 }, (_, i) => i).map((i) => (
    <HotelListItem key={i} dic={dic} />
   ))}
  </div>
 );
}
