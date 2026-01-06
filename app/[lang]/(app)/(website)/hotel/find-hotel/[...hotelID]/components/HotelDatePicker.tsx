import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function HotelDatePicker({
 dic,
}: {
 dic: PreviewHotelDictionary;
}) {
 return (
  <form className='shadow-lg border border-input p-4 rounded-md mb-2'>
   <div className='mb-2 grid grid-cols-2 gap-4 text-xs font-medium text-neutral-600 pb-2 border-b border-input'>
    <div className='flex flex-col gap-1 items-center p-1 rounded-md bg-neutral-100 dark:bg-neutral-900'>
     <span>{dic.hotelDatePicker.arrivalTime}</span>
     <span>12:00</span>
    </div>
    <div className='flex flex-col gap-1 items-center p-1 rounded-md bg-neutral-100 dark:bg-neutral-900'>
     <span>{dic.hotelDatePicker.departureTime}</span>
     <span>12:00</span>
    </div>
   </div>
   <FieldGroup className='gap-5'>
    <Field className='gap-2'>
     <FieldLabel htmlFor='fromDate'>{dic.hotelDatePicker.fromDate}</FieldLabel>
     <Input />
    </Field>
    <Field className='gap-2'>
     <FieldLabel htmlFor='toDate'>{dic.hotelDatePicker.toDate}</FieldLabel>
     <Input />
    </Field>
    <Button type='submit' size='lg'>
     {dic.hotelDatePicker.search}
    </Button>
   </FieldGroup>
  </form>
 );
}
