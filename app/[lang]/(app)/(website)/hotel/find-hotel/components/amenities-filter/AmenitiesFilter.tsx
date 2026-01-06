'use client';

import { useState, useMemo } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FindHotelDictionary } from '@/internalization/app/dictionaries/website/find-hotel/dictionary';
import {
 Accordion,
 AccordionContent,
 AccordionItem,
 AccordionTrigger,
} from '@/components/ui/accordion';

const AMENITY_KEYS = [
 'lobby',
 'reception24h',
 'elevator',
 'safeBox',
 'electricCharging',
] as const;

export default function AmenitiesFilter({ dic }: { dic: FindHotelDictionary }) {
 const [searchQuery, setSearchQuery] = useState('');

 const filteredAmenities = useMemo(() => {
  if (!searchQuery.trim()) return AMENITY_KEYS;

  return AMENITY_KEYS.filter((key) =>
   dic.amenitiesFilter.amenities[key]
    .toLowerCase()
    .includes(searchQuery.toLowerCase())
  );
 }, [searchQuery, dic.amenitiesFilter.amenities]);

 return (
  <Accordion type='single' collapsible defaultValue='item-1' className='w-full'>
   <AccordionItem value='item-1' className='border-none'>
    <AccordionTrigger className='cursor-pointer hover:no-underline py-2 font-semibold text-sm'>
     {dic.amenitiesFilter.title}
    </AccordionTrigger>
    <AccordionContent className='pt-2 pb-4'>
     <div className='flex flex-col gap-4'>
      <Input
       type='search'
       placeholder={dic.amenitiesFilter.searchPlaceholder}
       value={searchQuery}
       onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className='flex flex-col items-start gap-4'>
       {filteredAmenities.map((amenityKey) => (
        <div key={amenityKey} className='flex items-center gap-3'>
         <Checkbox
          className='cursor-pointer'
          id={`amenity-filter-${amenityKey}`}
         />
         <Label htmlFor={`amenity-filter-${amenityKey}`}>
          {dic.amenitiesFilter.amenities[amenityKey]}
         </Label>
        </div>
       ))}
      </div>
     </div>
    </AccordionContent>
   </AccordionItem>
  </Accordion>
 );
}
