'use client';
import { Button } from '@/components/ui/button';
import { reserveTypesList, getReserveTypeInfo } from '../../utils/reserveTypes';
import { useShareDictionary } from '../../services/share-dictionary/shareDictionaryContext';
import { getReserveTypeIcon } from '../../utils/getReserveTypeIcon';

export default function ReservePickerTypes() {
 const {
  shareDictionary: {
   system: { reserveTypes },
  },
 } = useShareDictionary();
 return (
  <div className='grid grid-cols-5 md:flex gap-1 mb-1'>
   {reserveTypesList.map((reserveType) => {
    const reserveTypeInfo = getReserveTypeInfo(reserveType);
    return (
     <Button
      variant='outline'
      key={reserveType}
      className='cursor-pointer bg-background dark:bg-background h-auto w-auto flex-col md:min-h-24 md:min-w-24'
     >
      {getReserveTypeIcon(reserveType, {
       className: 'size-6 md:size-8 text-primary',
      })}
      <span className='font-medium text-neutral-700 dark:text-neutral-400'>
       {reserveTypes[reserveType]}
      </span>
     </Button>
    );
   })}
  </div>
 );
}
