'use client';
import { Button } from '@/components/ui/button';
import { reserveTypesList } from '../../utils/reserveTypes';
import { useShareDictionary } from '../../services/share-dictionary/shareDictionaryContext';
import { getReserveTypeIcon } from '../../utils/getReserveTypeIcon';

export default function ReservePickerTypes() {
 const {
  shareDictionary: {
   system: { reserveTypes },
  },
 } = useShareDictionary();
 return (
  <div className='grid grid-cols-5 gap-1 px-1 -mt-[calc(var(--website-hero-height)/2)]'>
   {reserveTypesList.map((reserveType) => {
    return (
     <Button
      variant='outline'
      key={reserveType}
      className='h-auto w-auto flex-col md:min-h-24'
     >
      {getReserveTypeIcon(reserveType, {
       className: 'size-6 md:size-8 text-primary',
      })}
      <span className='font-medium text-base'>{reserveTypes[reserveType]}</span>
     </Button>
    );
   })}
  </div>
 );
}
