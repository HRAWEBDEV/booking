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
import { type HotelInfo } from '../../../services/hotelApiActions';
import { Controller, useFormContext } from 'react-hook-form';
import { type HotelDatePickerSchema } from '../schemas/hotelDatePickerSchema';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { useHotelConfig } from '../services/hotel-config/hotelConfigContext';
import { getReserveInfo } from '../utils/reserveInfo';
import { useCurrencyFormatter } from '@/hooks/useCurrencyFormatter';
import {
 Dialog,
 DialogTitle,
 DialogContent,
 DialogHeader,
 DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

export default function HotelDatePicker({
 dic,
 hotelInfo,
}: {
 dic: PreviewHotelDictionary;
 hotelInfo: HotelInfo;
}) {
 const numberFormatter = useCurrencyFormatter();
 const {
  rooms: { selectedRooms },
  reserve: { onChangeReserveDate, onSubmitReserveInfo },
 } = useHotelConfig();
 const { locale } = useBaseConfig();
 const filtersUserForm = useFormContext<HotelDatePickerSchema>();
 const dateFns = useDateFns();
 const [openDatePickerCalendar, setOpenDatePickerCalendar] = useState(false);
 const [showChangeReserveDate, setShowChangeReserveDate] = useState(false);

 const [fromDateValue, toDateValue] = filtersUserForm.watch([
  'fromDate',
  'toDate',
 ]);

 const reserveInfo = getReserveInfo(selectedRooms);

 const renderCalendar = (
  <Controller
   control={filtersUserForm.control}
   name='toDate'
   render={({ field: { ...other } }) => (
    <Calendar
     mode='range'
     {...other}
     numberOfMonths={2}
     startMonth={dateFns.startOfMonth(new Date())}
     selected={{
      to: fromDateValue || undefined,
      from: toDateValue || undefined,
     }}
     onSelect={(selected) => {
      if (!selected) {
       filtersUserForm.setValue('fromDate', null);
       filtersUserForm.setValue('toDate', null);
       return;
      }
      if (!selected.to || !selected.from) {
       filtersUserForm.setValue('fromDate', selected.from || null);
       filtersUserForm.setValue('toDate', selected.to || null);
       return;
      }
      if (selected.from.getTime() > selected.to.getTime()) {
       filtersUserForm.setValue('fromDate', selected.to || null);
       filtersUserForm.setValue('toDate', selected.from || null);
       return;
      }
      filtersUserForm.setValue('fromDate', selected.from || null);
      filtersUserForm.setValue('toDate', selected.to || null);
     }}
     defaultMonth={fromDateValue || new Date()}
     showOutsideDays={false}
     disabled={(date) => {
      return date.getTime() < dateFns.startOfDay(new Date()).getTime();
     }}
    />
   )}
  />
 );

 const renderFromDateInput = (
  <Button
   type='button'
   variant='outline'
   id='fromDate'
   className='w-full justify-between font-normal text-base'
   data-invalid={!!filtersUserForm.formState.errors.fromDate}
  >
   {fromDateValue
    ? fromDateValue.toLocaleDateString(locale, {
       dateStyle: 'full',
      })
    : '---'}
   <ChevronDownIcon className='hidden md:inline-block' />
  </Button>
 );

 const renderToDateInput = (
  <Button
   data-invalid={!!filtersUserForm.formState.errors.toDate}
   type='button'
   variant='outline'
   id='toDate'
   className='w-full justify-between font-normal text-base'
  >
   {!toDateValue || toDateValue.getTime() === fromDateValue?.getTime()
    ? '---'
    : toDateValue?.toLocaleDateString(locale, {
       dateStyle: 'full',
      })}
   <ChevronDownIcon className='hidden md:inline-block' />
  </Button>
 );

 const renderConfirmReserveButton = (
  <Button
   variant='secondary'
   type='button'
   className='w-full'
   onClick={() => {
    onSubmitReserveInfo();
   }}
  >
   {dic.hotelDatePicker.confirmReserve}
  </Button>
 );

 const renderSearchButton = (
  <Button
   type='submit'
   size='lg'
   className='w-full'
   onClick={(e) => {
    e.preventDefault();
    filtersUserForm.handleSubmit(
     (data) => {
      if (!data.fromDate || !data.toDate) return;
      setShowChangeReserveDate(false);
      onChangeReserveDate(data.toDate, data.fromDate);
     },
     (err) => {
      Object.values(err).forEach((errItem) => {
       toast.error(errItem.message);
      });
     },
    )();
   }}
  >
   {dic.hotelDatePicker.search}
  </Button>
 );

 return (
  <>
   <form className='shadow-lg border border-input p-4 rounded-md mb-2'>
    <div className='mb-3 grid grid-cols-2 gap-4 text-xs font-medium text-neutral-600 pb-2 border-b border-input'>
     <div className='flex flex-col gap-1 items-center p-1 rounded-md bg-neutral-100 dark:bg-neutral-900'>
      <span>{dic.hotelDatePicker.arrivalTime}</span>
      <span>{hotelInfo.checkin || '---'}</span>
     </div>
     <div className='flex flex-col gap-1 items-center p-1 rounded-md bg-neutral-100 dark:bg-neutral-900'>
      <span>{dic.hotelDatePicker.departureTime}</span>
      <span>{hotelInfo.checkout || '---'}</span>
     </div>
    </div>
    <FieldGroup className='gap-5'>
     <Popover
      open={openDatePickerCalendar}
      onOpenChange={setOpenDatePickerCalendar}
     >
      <Dialog
       open={showChangeReserveDate}
       onOpenChange={setShowChangeReserveDate}
      >
       <Field
        className='gap-2'
        data-invalid={!!filtersUserForm.formState.errors.fromDate}
       >
        <Label htmlFor='fromDate' className='px-1'>
         {dic.hotelDatePicker.fromDate}
        </Label>

        <DialogTrigger asChild>
         <div className='md:hidden'>{renderFromDateInput}</div>
        </DialogTrigger>
        <PopoverTrigger asChild>
         <div className='hidden md:block'>{renderFromDateInput}</div>
        </PopoverTrigger>
       </Field>
       <Field
        className='gap-2'
        data-invalid={!!filtersUserForm.formState.errors.toDate}
       >
        <Label htmlFor='toDate' className='px-1'>
         {dic.hotelDatePicker.toDate}
        </Label>
        <DialogTrigger asChild>
         <div className='md:hidden'>{renderToDateInput}</div>
        </DialogTrigger>
        <PopoverTrigger asChild>
         <div className='hidden md:block'>{renderToDateInput}</div>
        </PopoverTrigger>
        <PopoverContent className='w-auto overflow-hidden p-0' align='end'>
         {renderCalendar}
        </PopoverContent>
        <DialogContent className='gap-0 p-0 flex flex-col overflow-hidden w-svw max-w-svw h-svh rounded-none'>
         <DialogHeader className='p-4 shrink-0'>
          <DialogTitle className='text-base font-medium'>
           {dic.hotelDatePicker.changeDate}{' '}
           <span className='text-sm text-neutral-500'></span>
          </DialogTitle>
         </DialogHeader>
         <div className='grow overflow-auto flex flex-col '>
          <div className='p-4 grid grid-cols-2 gap-1'>
           <Field className='gap-2'>
            <Label htmlFor='toDate' className='px-1'>
             {dic.hotelDatePicker.fromDate}
            </Label>
            {renderFromDateInput}
           </Field>
           <Field className='gap-2'>
            <Label htmlFor='toDate' className='px-1'>
             {dic.hotelDatePicker.toDate}
            </Label>
            {renderToDateInput}
           </Field>
          </div>
          <div className='mx-auto *:[--cell-size:2.5rem]'>{renderCalendar}</div>
          <div className='sticky bottom-0 bg-background p-2 border-t border-input'>
           {renderSearchButton}
          </div>
         </div>
        </DialogContent>
       </Field>
       {renderSearchButton}
       {!!selectedRooms.length && (
        <div className='pt-2 border-t border-input flex flex-col'>
         <ul className='max-h-24 overflow-auto'>
          {selectedRooms.map((room) => (
           <li
            key={
             room.ratePlanTypeID.toString() +
             room.roomTypeID.toString() +
             room.ratePlanID.toString() +
             room.beds.toString()
            }
            className='flex flex-wrap gap-2 text-xs text-neutral-600 dark:text-neutral-400'
           >
            <span>{room.roomTypeName}: </span>
            <div style={{ direction: 'ltr' }}>
             <span>{room.count} </span>x
             <span> {numberFormatter.format(room.discountPrice)}</span>
            </div>
           </li>
          ))}
         </ul>
         <div className='mb-2 font-medium'>
          <span className='text-xs'>
           {dic.reserveInfo.totalDiscountPrice}:{' '}
          </span>
          <span>{numberFormatter.format(reserveInfo.totalDiscountPrice)}</span>
          <span className='text-xs'> ریال</span>
         </div>
         <div>{renderConfirmReserveButton}</div>
        </div>
       )}
      </Dialog>
     </Popover>
    </FieldGroup>
   </form>
   <div className='p-2 bg-neutral-100 fixed z-3 bottom-(--website-mobile-nav-height) start-0 end-0 grid grid-cols-2 gap-4 md:hidden'>
    <div>
     <Button
      variant='outline'
      type='button'
      className='w-full text-primary border border-primary'
      onClick={() => setShowChangeReserveDate(true)}
     >
      {dic.hotelDatePicker.changeDate}
     </Button>
    </div>
    <div>{renderConfirmReserveButton}</div>
   </div>
  </>
 );
}
