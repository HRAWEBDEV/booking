import { Grid3x2, TableProperties } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FindHotelDictionary } from '@/internalization/app/dictionaries/website/find-hotel/dictionary';
import { useFindHotel } from '../../../../services/find-hotel/FindHotelContext';
export default function CardLayoutDisplay({
 dic,
}: {
 dic: FindHotelDictionary;
}) {
 const { isRowView, setIsRowView } = useFindHotel();
 return (
  <div className='md:flex items-center gap-2 hidden'>
   <span className='text-sm font-medium'>{dic.filters.displayGridTitle}</span>
   <div className='flex items-center gap-0 transition-colors'>
    <Button
     variant='ghost'
     className='rounded-full! group cursor-pointer'
     onClick={() => setIsRowView(!isRowView)}
    >
     <Grid3x2
      strokeWidth={1.6}
      className={`${
       !isRowView ? 'text-active-red!' : 'text-gray-400'
      } group-hover:text-active-red/80 dark:text-gray-600 dark:group-hover:text-active-red/80 size-5`}
     />
    </Button>
    <Button
     variant='ghost'
     className='rounded-full! group cursor-pointer'
     onClick={() => setIsRowView(!isRowView)}
    >
     <TableProperties
      strokeWidth={1.6}
      className={`${
       isRowView ? 'text-active-red!' : 'text-gray-400'
      } group-hover:text-active-red/80 dark:text-gray-600 dark:group-hover:text-active-red/80 rotate-180 size-5`}
     />
    </Button>
   </div>
  </div>
 );
}
