import { ShareDictionary } from '@/internalization/app/dictionaries/share/dictionary';
import { Grid3x2, TableProperties } from 'lucide-react';
import { Button } from '@/components/ui/button';
export default function CardLayoutDisplay({ dic }: { dic: ShareDictionary }) {
 return (
  <div className='lg:flex items-center gap-2 hidden'>
   <span className='text-sm font-medium'>
    {dic.find_hotel.filters.display_grid_title}
   </span>
   <div className='flex items-center gap-0 transition-colors'>
    <Button
     variant='ghost'
     size='icon'
     className='rounded-full! group cursor-pointer'
    >
     <Grid3x2
      strokeWidth={1.6}
      className='text-active-red group-hover:text-active-red/80 dark:text-gray-600 dark:group-hover:text-active-red/80'
     />
    </Button>
    <Button
     variant='ghost'
     size='icon'
     className='rounded-full! group cursor-pointer'
    >
     <TableProperties
      strokeWidth={1.6}
      className='text-gray-400 group-hover:text-active-red/80 dark:text-gray-600 dark:group-hover:text-active-red/80'
     />
    </Button>
   </div>
  </div>
 );
}
