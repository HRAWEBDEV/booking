import { FieldGroup, Field, FieldLabel } from '@/components/ui/field';
import {
 InputGroup,
 InputGroupInput,
 InputGroupAddon,
} from '@/components/ui/input-group';
import { Button } from '@/components/ui/button';
import { FaMapMarkerAlt } from 'react-icons/fa';

export default function ReserveTypeForm() {
 return (
  <div className='bg-background p-4 rounded-md w-[min(100%,var(--website-container-max-width))] mx-auto shadow-md md:py-6'>
   <div className='grid gap-5 md:grid-cols-[repeat(3,1fr)_0.75fr] md:items-end md:gap-4'>
    <Field className='gap-2'>
     <FieldLabel htmlFor='destination'>مقصد</FieldLabel>
     <InputGroup className='h-11'>
      <InputGroupAddon align='inline-start'>
       <FaMapMarkerAlt className='size-5 text-rose-800 dark:text-rose-400' />
      </InputGroupAddon>
      <InputGroupInput
       placeholder='برای مثال تهران ...'
       id='destination'
      ></InputGroupInput>
     </InputGroup>
    </Field>
    <Field className='gap-2'>
     <FieldLabel htmlFor='destination'>از تاریخ</FieldLabel>
     <InputGroup className='h-11'>
      <InputGroupInput id='destination'></InputGroupInput>
     </InputGroup>
    </Field>
    <Field className='gap-2'>
     <FieldLabel htmlFor='destination'>تا تاریخ</FieldLabel>
     <InputGroup className='h-11'>
      <InputGroupInput id='destination'></InputGroupInput>
     </InputGroup>
    </Field>
    <Button className='h-11'>جستجو</Button>
   </div>
  </div>
 );
}
