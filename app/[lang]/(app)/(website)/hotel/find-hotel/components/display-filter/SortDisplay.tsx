import { Button } from '@/components/ui/button';
import { FindHotelDictionary } from '@/internalization/app/dictionaries/website/find-hotel/dictionary';

export default function SortDisplay({ dic }: { dic: FindHotelDictionary }) {
 return (
  <div className='flex items-center justify-center gap-2'>
   <span className='text-sm font-medium'>{dic.filters.displaySortTitle}</span>
   <div className='flex items-center justify-center gap-4'>
    <Button
     className={`bg-transparent border-none hover:bg-transparent p-0! text-gray-400 hover:text-active-red/80 dark:text-gray-600 dark:hover:text-active-red/80 font-normal text-xs cursor-pointer transition-colors`}
    >
     {dic.filters.displaySortButtons.default}
    </Button>
    <Button
     className={`bg-transparent border-none hover:bg-transparent p-0! text-gray-400 hover:text-active-red/80 dark:text-gray-600 dark:hover:text-active-red/80 font-normal text-xs cursor-pointer transition-colors`}
    >
     {dic.filters.displaySortButtons.lowestPrice}
    </Button>
    <Button
     className={`bg-transparent border-none hover:bg-transparent p-0! text-gray-400 hover:text-active-red/80 dark:text-gray-600 dark:hover:text-active-red/80 font-normal text-xs cursor-pointer transition-colors`}
    >
     {dic.filters.displaySortButtons.highestPrice}
    </Button>
    <Button
     className={`bg-transparent border-none hover:bg-transparent p-0! text-gray-400 hover:text-active-red/80 dark:text-gray-600 dark:hover:text-active-red/80 font-normal text-xs cursor-pointer transition-colors`}
    >
     {dic.filters.displaySortButtons.highestRating}
    </Button>
   </div>
  </div>
 );
}
