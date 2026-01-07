'use client';

import { useState } from 'react';
import { FindHotelDictionary } from '@/internalization/app/dictionaries/website/find-hotel/dictionary';
import useStickyScroll from '@/utils/useStickyScroll';
import {
 Drawer,
 DrawerContent,
 DrawerHeader,
 DrawerTitle,
 DrawerTrigger,
} from '@/components/ui/drawer';
import FilterContent from '../filter-container/FilterContent';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-react';

export default function HotelFilters({ dic }: { dic: FindHotelDictionary }) {
 const [currentPriceRange, setCurrentPriceRange] = useState<number[]>([
  500_000, 50_000_000,
 ]);
 const { containerRef } = useStickyScroll();
 return (
  <>
   <div
    ref={containerRef}
    className='lg:flex flex-col hidden max-w-[280px] w-full self-start top-4 rounded-xl bg-card flex-1 border border-gray-300 dark:border-gray-600'
   >
    <FilterContent
     dic={dic}
     currentPriceRange={currentPriceRange}
     setCurrentPriceRange={setCurrentPriceRange}
    />
   </div>
   <div className='lg:hidden fixed bottom-20 right-1/2 translate-x-1/2 z-50'>
    <Drawer>
     <DrawerTrigger asChild>
      <Button
       variant='outline'
       className='rounded-xl! shadow-lg opacity-50 hover:opacity-100 transition-[3s] cursor-pointer bg-gray-400 hover:bg-gray-400 dark:bggr border-none'
      >
       <SlidersHorizontal className='h-5 w-5 mr-2' />
       {dic.filterButton.title}
      </Button>
     </DrawerTrigger>
     <DrawerContent className='max-h-svh! rounded-none!'>
      <DrawerHeader className='text-center'>
       <DrawerTitle>{dic.filterButton.title}</DrawerTitle>
      </DrawerHeader>
      <div className='flex-1 overflow-y-auto w-full px-4 pb-8'>
       <FilterContent
        dic={dic}
        currentPriceRange={currentPriceRange}
        setCurrentPriceRange={setCurrentPriceRange}
       />
      </div>
     </DrawerContent>
    </Drawer>
   </div>
  </>
 );
}
