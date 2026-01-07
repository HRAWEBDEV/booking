'use client';
import { useState } from 'react';
import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import { FieldGroup, Field } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
 Popover,
 PopoverContent,
 PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { ChevronDownIcon } from 'lucide-react';
import { useDateFns } from '@/hooks/useDateFns';

export default function HotelDatePicker({
 dic,
}: {
 dic: PreviewHotelDictionary;
}) {
 const dateFns = useDateFns();
 const [openDatePickerCalendar, setOpenDatePickerCalendar] = useState(false);

 const datePickerCalendar = (
  <Calendar
   mode='range'
   numberOfMonths={2}
   startMonth={dateFns.startOfMonth(new Date())}
   showOutsideDays={false}
   disabled={(date) => {
    return date.getTime() <= new Date().getTime();
   }}
  />
 );

 return (
  <form className='shadow-lg border border-input p-4 rounded-md mb-2'>
   <div className='mb-3 grid grid-cols-2 gap-4 text-xs font-medium text-neutral-600 pb-2 border-b border-input'>
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
     <Label htmlFor='fromDate' className='px-1'>
      {dic.hotelDatePicker.fromDate}
     </Label>
     <Button
      type='button'
      variant='outline'
      id='fromDate'
      className='w-32 justify-between font-normal'
      onClick={() => setOpenDatePickerCalendar((pre) => !pre)}
     >
      {'Select date'}
      <ChevronDownIcon />
     </Button>
    </Field>
    <Field className='gap-2'>
     <Label htmlFor='toDate' className='px-1'>
      {dic.hotelDatePicker.fromDate}
     </Label>
     <Popover
      open={openDatePickerCalendar}
      onOpenChange={setOpenDatePickerCalendar}
     >
      <PopoverTrigger asChild>
       <Button
        type='button'
        variant='outline'
        id='toDate'
        className='w-32 justify-between font-normal'
       >
        {'Select date'}
        <ChevronDownIcon />
       </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto overflow-hidden p-0' align='end'>
       {datePickerCalendar}
      </PopoverContent>
     </Popover>
    </Field>
    <Button type='submit' size='lg'>
     {dic.hotelDatePicker.search}
    </Button>
   </FieldGroup>
  </form>
 );
}
