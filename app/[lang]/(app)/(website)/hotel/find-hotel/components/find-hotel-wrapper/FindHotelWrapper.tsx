'use client';
import DisplayFilters from '../display-filter/DisplayFilters';
import { HotelsList } from '../hotels-list/HotelsList';
import { FindHotelDictionary } from '@/internalization/app/dictionaries/website/find-hotel/dictionary';
import HotelFilters from '../hotel-filters-desktop/HotelFilters';
import FindHotelProvider from '../../../../services/find-hotel/FindHotelProvider';

export default function FindHotelWrapper({
 dic,
}: {
 dic: FindHotelDictionary;
}) {
 return (
  <FindHotelProvider>
   <DisplayFilters dic={dic} />
   <div className='flex items-start gap-4'>
    <HotelFilters dic={dic} />
    <HotelsList dic={dic} />
   </div>
  </FindHotelProvider>
 );
}
