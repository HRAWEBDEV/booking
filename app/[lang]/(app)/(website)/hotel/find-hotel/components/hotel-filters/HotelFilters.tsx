'use client';

import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

import { useState } from 'react';
import PriceRangeFilter from '../price-range-filter/PriceRangeFilter';
import { FindHotelDictionary } from '@/internalization/app/dictionaries/website/find-hotel/dictionary';
import StarFilters from '../star-filters/StarFilters';
import BedFilters from '../bed-filters/BedFilters';
import AmenitiesFilter from '../amenities-filter/AmenitiesFilter';
import OffersFilter from '../offers-filter/OffersFilter';
import useStickyScroll from '@/utils/useStickyScroll';

export default function HotelFilters({ dic }: { dic: FindHotelDictionary }) {
 const [currentPriceRange, setCurrentPriceRange] = useState<number[]>([
  500_000, 50_000_000,
 ]);
 const { containerRef } = useStickyScroll();
 return (
  <div
   ref={containerRef}
   className='lg:flex flex-col hidden max-w-[280px] w-full self-start top-4 rounded-xl bg-card flex-1 border border-gray-300 dark:border-gray-600'
  >
   <div className='p-5'>
    <Input
     type='search'
     placeholder={dic.searchInputFilter.placeholder}
     className='h-11 text-base'
    />
   </div>
   <Separator className='bg-border' />
   <div className='p-5'>
    <PriceRangeFilter
     dic={dic}
     currentPriceRange={currentPriceRange}
     setCurrentPriceRange={setCurrentPriceRange}
    />
   </div>
   <Separator className='bg-border' />
   <div className='p-5'>
    <StarFilters dic={dic} />
   </div>
   <Separator className='bg-border' />
   <div className='p-5'>
    <BedFilters dic={dic} />
   </div>
   <Separator className='bg-border' />
   <div className='p-5'>
    <AmenitiesFilter dic={dic} />
   </div>
   <Separator className='bg-border' />
   <div className='p-5'>
    <OffersFilter dic={dic} />
   </div>
  </div>
 );
}
