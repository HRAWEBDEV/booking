'use client';
import { Field, FieldLabel } from '@/components/ui/field';
import {
 InputGroup,
 InputGroupInput,
 InputGroupAddon,
} from '@/components/ui/input-group';
import { Button } from '@/components/ui/button';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useShareDictionary } from '../../../services/share-dictionary/shareDictionaryContext';

export default function HotelReserveTypeForm() {
 const {
  shareDictionary: {
   component: {
    reservePicker: { hotelReserveFrom },
   },
  },
 } = useShareDictionary();
 return (
  <div className='grid gap-5 md:grid-cols-[repeat(3,1fr)_0.75fr] md:items-end md:gap-4'>
   <Field className='gap-2'>
    <FieldLabel htmlFor='destination'>
     {hotelReserveFrom.destination}
    </FieldLabel>
    <InputGroup className='h-11'>
     <InputGroupAddon align='inline-start'>
      <FaMapMarkerAlt className='size-5 text-rose-800 dark:text-rose-400' />
     </InputGroupAddon>
     <InputGroupInput
      placeholder={hotelReserveFrom.exampleDestination + '...'}
      id='destination'
     ></InputGroupInput>
    </InputGroup>
   </Field>
   <Field className='gap-2'>
    <FieldLabel htmlFor='destination'>{hotelReserveFrom.fromDate}</FieldLabel>
    <InputGroup className='h-11'>
     <InputGroupInput id='destination'></InputGroupInput>
    </InputGroup>
   </Field>
   <Field className='gap-2'>
    <FieldLabel htmlFor='destination'>{hotelReserveFrom.toDate}</FieldLabel>
    <InputGroup className='h-11'>
     <InputGroupInput id='destination'></InputGroupInput>
    </InputGroup>
   </Field>
   <Button className='h-11'>{hotelReserveFrom.search}</Button>
  </div>
 );
}
