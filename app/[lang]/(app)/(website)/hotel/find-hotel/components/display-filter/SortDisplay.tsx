import { Button } from '@/components/ui/button';
import { ShareDictionary } from '@/internalization/app/dictionaries/share/dictionary';

export default function SortDisplay({ dic }: { dic: ShareDictionary }) {
 return (
  <div className='flex items-center justify-center gap-2'>
   <span className='text-sm font-medium'>
    {dic.find_hotel.filters.display_sort_title}
   </span>
   <div className='flex items-center justify-center gap-4'>
    <Button
     className={`bg-transparent border-none hover:bg-transparent p-0! text-gray-400 hover:text-active-red/80 dark:text-gray-600 dark:hover:text-active-red/80 font-normal text-xs cursor-pointer transition-colors`}
    >
     {dic.find_hotel.filters.display_sort_buttons.default}
    </Button>
    <Button
     className={`bg-transparent border-none hover:bg-transparent p-0! text-gray-400 hover:text-active-red/80 dark:text-gray-600 dark:hover:text-active-red/80 font-normal text-xs cursor-pointer transition-colors`}
    >
     {dic.find_hotel.filters.display_sort_buttons.lowest_price}
    </Button>
    <Button
     className={`bg-transparent border-none hover:bg-transparent p-0! text-gray-400 hover:text-active-red/80 dark:text-gray-600 dark:hover:text-active-red/80 font-normal text-xs cursor-pointer transition-colors`}
    >
     {dic.find_hotel.filters.display_sort_buttons.highest_price}
    </Button>
    <Button
     className={`bg-transparent border-none hover:bg-transparent p-0! text-gray-400 hover:text-active-red/80 dark:text-gray-600 dark:hover:text-active-red/80 font-normal text-xs cursor-pointer transition-colors`}
    >
     {dic.find_hotel.filters.display_sort_buttons.highest_rating}
    </Button>
   </div>
  </div>
 );
}
