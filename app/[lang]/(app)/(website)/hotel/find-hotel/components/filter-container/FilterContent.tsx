import { FindHotelDictionary } from '@/internalization/app/dictionaries/website/find-hotel/dictionary';
import React from 'react';
import StarFilters from '../star-filters/StarFilters';
import BedFilters from '../bed-filters/BedFilters';
import AmenitiesFilter from '../amenities-filter/AmenitiesFilter';
import OffersFilter from '../offers-filter/OffersFilter';
import PriceRangeFilter from '../price-range-filter/PriceRangeFilter';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';

export default function FilterContent({
 dic,
 currentPriceRange,
 setCurrentPriceRange,
}: {
 dic: FindHotelDictionary;
 currentPriceRange: number[];
 setCurrentPriceRange: React.Dispatch<React.SetStateAction<number[]>>;
}) {
 return (
  <>
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
  </>
 );
}
