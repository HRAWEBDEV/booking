import React from 'react';
import SortDisplay from './SortDisplay';
import CardLayoutDisplay from './CardLayoutDisplay';
import { FindHotelDictionary } from '@/internalization/app/dictionaries/website/find-hotel/dictionary';

export default function DisplayFilters({ dic }: { dic: FindHotelDictionary }) {
 return (
  <div className='flex justify-between items-center'>
   <SortDisplay dic={dic} />
   <CardLayoutDisplay dic={dic} />
  </div>
 );
}
