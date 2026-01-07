'use client';

import { Button } from '@/components/ui/button';
import { FindHotelDictionary } from '@/internalization/app/dictionaries/website/find-hotel/dictionary';
import {
 Drawer,
 DrawerClose,
 DrawerContent,
 DrawerHeader,
 DrawerTitle,
 DrawerTrigger,
} from '@/components/ui/drawer';
import { ArrowUpDown, Check } from 'lucide-react';
import { useState } from 'react';

type SortOption = 'default' | 'lowestPrice' | 'highestPrice' | 'highestRating';

export default function SortDisplay({ dic }: { dic: FindHotelDictionary }) {
 const [selectedSort, setSelectedSort] = useState<SortOption>('default');

 const sortOptions: { key: SortOption; label: string }[] = [
  { key: 'default', label: dic.filters.displaySortButtons.default },
  { key: 'lowestPrice', label: dic.filters.displaySortButtons.lowestPrice },
  { key: 'highestPrice', label: dic.filters.displaySortButtons.highestPrice },
  { key: 'highestRating', label: dic.filters.displaySortButtons.highestRating },
 ];

 return (
  <>
   <div className='sm:flex hidden items-center justify-center gap-2'>
    <span className='text-sm font-medium'>{dic.filters.displaySortTitle}</span>
    <div className='flex items-center justify-center gap-4'>
     {sortOptions.map((option) => (
      <Button
       key={option.key}
       variant='ghost'
       onClick={() => setSelectedSort(option.key)}
       className={`hover:bg-transparent p-0 text-xs cursor-pointer transition-colors ${
        selectedSort === option.key
         ? 'text-active-red/80 font-semibold'
         : 'text-gray-400 hover:text-active-red/80 dark:text-gray-600 dark:hover:text-active-red/80'
       }`}
      >
       {option.label}
      </Button>
     ))}
    </div>
   </div>
   <div className='sm:hidden w-full'>
    <Drawer>
     <DrawerTrigger asChild>
      <Button
       variant='outline'
       className='w-full justify-between rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 border-none cursor-pointer'
      >
       <span>
        {selectedSort === 'default'
         ? dic.filters.displaySortTitle.split(':')[0]
         : sortOptions.find((option) => option.key === selectedSort)?.label}
       </span>
       <ArrowUpDown className='h-4 w-4' />
      </Button>
     </DrawerTrigger>

     <DrawerContent>
      <DrawerHeader className='text-center'>
       <DrawerTitle>{dic.filters.displaySortTitle}</DrawerTitle>
      </DrawerHeader>
      <div className='flex flex-col pb-6'>
       {sortOptions.map((option) => (
        <DrawerClose key={option.key} asChild>
         <button
          onClick={() => setSelectedSort(option.key)}
          className={`flex items-center justify-between px-6 py-4 text-base transition-colors cursor-pointer
            ${
             selectedSort === option.key
              ? 'bg-primary/10 text-primary font-medium'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
         >
          <span>{option.label}</span>
          {selectedSort === option.key && (
           <Check className='h-5 w-5 text-primary' />
          )}
         </button>
        </DrawerClose>
       ))}
      </div>
     </DrawerContent>
    </Drawer>
   </div>
  </>
 );
}
