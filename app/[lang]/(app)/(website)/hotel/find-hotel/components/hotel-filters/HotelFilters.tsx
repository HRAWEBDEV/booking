'use client';

import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

import { useState } from 'react';
import PriceRangeFilter from '../price-range-filter/PriceRangeFilter';
import { FindHotelDictionary } from '@/internalization/app/dictionaries/website/find-hotel/dictionary';
import StarFilters from '../star-filters/StarFilters';
import BedFilters from '../bed-filters/BedFilters';
import useStickyScroll from '@/utils/useStickyScroll';

export default function HotelFilters({ dic }: { dic: FindHotelDictionary }) {
 const [currentPriceRange, setCurrentPriceRange] = useState<number[]>([
  500_000, 50_000_000,
 ]);
 const { containerRef, stickyStyle } = useStickyScroll();
 return (
  <div
   ref={containerRef}
   style={stickyStyle}
   className='lg:flex flex-col hidden max-w-[240px] w-full self-start top-4 border rounded-lg flex-1'
  >
   <div className='p-4 px-2'>
    <Input type='search' placeholder={dic.searchInputFilter.placeholder} />
   </div>
   <Separator className='text-gray-300 dark:text-gray-600 px-2' />
   <div className='p-4 px-2'>
    <PriceRangeFilter
     dic={dic}
     currentPriceRange={currentPriceRange}
     setCurrentPriceRange={setCurrentPriceRange}
    />
   </div>
   <Separator className='text-gray-300 dark:text-gray-600 px-2' />
   <div className='p-4 px-2'>
    <StarFilters dic={dic} />
   </div>
   <Separator className='text-gray-300 dark:text-gray-600 px-2' />
   <div className='p-4 px-2'>
    <BedFilters dic={dic} />
   </div>
  </div>
 );
}
