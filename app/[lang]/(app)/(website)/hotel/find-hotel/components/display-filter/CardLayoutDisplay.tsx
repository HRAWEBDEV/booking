import { Grid3x2, TableProperties } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FindHotelDictionary } from '@/internalization/app/dictionaries/website/find-hotel/dictionary';
export default function CardLayoutDisplay({
 dic,
}: {
 dic: FindHotelDictionary;
}) {
 return (
  <div className='lg:flex items-center gap-2 hidden'>
   <span className='text-sm font-medium'>{dic.filters.displayGridTitle}</span>
   <div className='flex items-center gap-0 transition-colors'>
    <Button variant='ghost' className='rounded-full! group cursor-pointer'>
     <Grid3x2
      strokeWidth={1.6}
      className='text-active-red group-hover:text-active-red/80 dark:text-gray-600 dark:group-hover:text-active-red/80 size-5'
     />
    </Button>
    <Button variant='ghost' className='rounded-full! group cursor-pointer'>
     <TableProperties
      strokeWidth={1.6}
      className='text-gray-400 group-hover:text-active-red/80 dark:text-gray-600 dark:group-hover:text-active-red/80 rotate-180 size-5'
     />
    </Button>
   </div>
  </div>
 );
}
