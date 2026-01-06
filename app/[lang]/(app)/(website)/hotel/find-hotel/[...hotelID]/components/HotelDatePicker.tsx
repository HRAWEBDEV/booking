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
  <div className='sticky top-4 shadow-lg border border-input p-4 rounded-md'>
   <FieldGroup className='gap-5'>
    <Field className='gap-2'>
     <FieldLabel htmlFor='fromDate'>{dic.hotelDatePicker.fromDate}</FieldLabel>
     <Input />
    </Field>
    <Field className='gap-2'>
     <FieldLabel htmlFor='toDate'>{dic.hotelDatePicker.toDate}</FieldLabel>
     <Input />
    </Field>
    <Button>{dic.hotelDatePicker.search}</Button>
   </FieldGroup>
  </div>
 );
}
