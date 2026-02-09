'use client';

import { useState } from 'react';
import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import { FieldGroup, Field } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
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
import {
 Select,
 SelectItem,
 SelectTrigger,
 SelectContent,
 SelectGroup,
 SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { DateRange } from 'react-day-picker';
import ScrollableCalendar from './ScrollableCalendar';

export default function HotelDatePicker({
 dic,
}: {
 dic: PreviewHotelDictionary;
 hotelInfo: HotelInfo;
}) {
 const numberFormatter = useCurrencyFormatter();
 const {
  ratePlanTypes,
  rooms: { data, selectedRooms, isLoading },
  reserve: { onChangeReserveDate, onSubmitReserveInfo },
 } = useHotelConfig();
 const { locale, localeInfo } = useBaseConfig();
 const filtersUserForm = useFormContext<HotelDatePickerSchema>();
 const dateFns = useDateFns();
 const [openDatePickerCalendar, setOpenDatePickerCalendar] = useState(false);
 const [showChangeReserveDate, setShowChangeReserveDate] = useState(false);

 const [fromDateValue, toDateValue] = filtersUserForm.watch([
  'fromDate',
  'toDate',
 ]);

 const reserveInfo = getReserveInfo(selectedRooms);

 const activeFiltersCount = (() => {
  let activeCount = 0;
  const ignoreKeys = ['fromDate', 'toDate'];
  Object.entries(filtersUserForm.getValues()).forEach(([key, value]) => {
   if (ignoreKeys.includes(key)) return;
   if (key === 'ratePlan' && value === 'all') return;
   if (value) activeCount = activeCount + 1;
  });
  return activeCount;
 })();

 const handleRangeSelect = (selected: DateRange | undefined) => {
  if (!selected) return;

  let newFromDate = selected.from;
  let newUntilDate = selected.to;

  if (
   fromDateValue &&
   toDateValue &&
   fromDateValue.getTime() !== toDateValue.getTime()
  ) {
   if (newFromDate && newFromDate.getTime() < fromDateValue.getTime()) {
    newUntilDate = newFromDate;
   } else {
    newFromDate = newUntilDate;
   }
  }

  filtersUserForm.setValue('fromDate', newFromDate!);
  filtersUserForm.setValue('toDate', newUntilDate || newFromDate!);

  if (
   newFromDate &&
   newUntilDate &&
   newFromDate.getTime() !== newUntilDate.getTime()
  ) {
   setOpenDatePickerCalendar(false);
  }
 };

 // --- RENDER: Desktop Calendar (Standard Paged View) ---
 const renderDesktopCalendar = (
  <Controller
   control={filtersUserForm.control}
   name='toDate'
   render={() => (
    <Calendar
     mode='range'
     numberOfMonths={2}
     startMonth={dateFns.startOfMonth(new Date())}
     selected={{
      from: fromDateValue || undefined,
      to: toDateValue || undefined,
     }}
     onSelect={handleRangeSelect}
     defaultMonth={fromDateValue || new Date()}
     showOutsideDays={false}
     disabled={(date) => {
      return date.getTime() < dateFns.startOfDay(new Date()).getTime();
     }}
    />
   )}
  />
 );
 const renderMobileCalendar = (
  <Controller
   control={filtersUserForm.control}
   name='toDate'
   render={() => (
    <ScrollableCalendar
     selected={{
      from: fromDateValue || undefined,
      to: toDateValue || undefined,
     }}
     onSelect={handleRangeSelect}
    >
     {renderMobileInputs}
    </ScrollableCalendar>
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

 const renderRatePlanSelect = (
  <Controller
   control={filtersUserForm.control}
   name='ratePlan'
   render={({ field: { value, onChange, ...other } }) => (
    <Select
     value={value || 'all'}
     dir={localeInfo.contentDirection}
     onValueChange={(newValue) => {
      onChange(newValue);
     }}
     {...other}
    >
     <SelectTrigger>
      <SelectValue />
     </SelectTrigger>
     <SelectContent>
      <SelectGroup>
       {[
        { ratePlanID: 'all', fName: dic.hotelDatePicker.all },
        ...(ratePlanTypes.data || []),
       ].map((item) => {
        return (
         <SelectItem key={item.ratePlanID} value={item.ratePlanID.toString()}>
          {item.fName}
         </SelectItem>
        );
       })}
      </SelectGroup>
     </SelectContent>
    </Select>
   )}
  />
 );

 const renderMobileInputs = (
  <div className='p-4 grid grid-cols-2 gap-1 gap-y-3 bg-background'>
   <Field className='gap-2'>
    <Label htmlFor='fromDate' className='px-1'>
     {dic.hotelDatePicker.fromDate}
    </Label>
    {renderFromDateInput}
   </Field>
   <Field className='gap-2'>
    <Label htmlFor='toDate'>{dic.hotelDatePicker.toDate}</Label>
    {renderToDateInput}
   </Field>
   <Field className='gap-2 col-span-full'>
    <Label htmlFor='ratePlan'>{dic.hotelDatePicker.ratePlan}</Label>
    {renderRatePlanSelect}
   </Field>
  </div>
 );

 const renderConfirmReserveButton = (
  <Button
   variant='secondary'
   type='button'
   className='w-full'
   disabled={!selectedRooms.length}
   onClick={() => {
    onSubmitReserveInfo();
   }}
  >
   <div className='basis-6'></div>
   {dic.hotelDatePicker.confirmReserve}
   <div>
    <div className='basis-6'>
     {!!selectedRooms.length && (
      <Badge className='border-destructive bg-background text-foreground font-medium'>
       {selectedRooms.length}
      </Badge>
     )}
    </div>
   </div>
  </Button>
 );

 const renderSearchButton = (
  <Button
   type='submit'
   className='w-full'
   disabled={isLoading}
   onClick={(e) => {
    e.preventDefault();
    filtersUserForm.handleSubmit(
     (data) => {
      if (!data.fromDate || !data.toDate) return;
      setShowChangeReserveDate(false);
      onChangeReserveDate(data);
     },
     (err) => {
      Object.values(err).forEach((errItem) => {
       toast.error(errItem.message);
      });
     },
    )();
   }}
  >
   {isLoading && <Spinner />}
   {dic.hotelDatePicker.search}
  </Button>
 );

 return (
  <>
   <form className='shadow-lg border border-input p-4 rounded-md mb-2'>
    <FieldGroup className='gap-4'>
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
        <Label className='px-1'>{dic.hotelDatePicker.fromDate}</Label>
        <DialogTrigger asChild className='md:hidden'>
         <div>{renderFromDateInput}</div>
        </DialogTrigger>
        <PopoverTrigger asChild className='hidden md:block'>
         <div>{renderFromDateInput}</div>
        </PopoverTrigger>
       </Field>
       <Field
        className='gap-2'
        data-invalid={!!filtersUserForm.formState.errors.toDate}
       >
        <Label className='px-1'>{dic.hotelDatePicker.toDate}</Label>
        <DialogTrigger asChild className='md:hidden text-base'>
         <div>{renderToDateInput}</div>
        </DialogTrigger>
        <PopoverTrigger asChild className='hidden md:block'>
         <div>{renderToDateInput}</div>
        </PopoverTrigger>

        <PopoverContent className='w-auto overflow-hidden p-0' align='end'>
         {renderDesktopCalendar}
        </PopoverContent>

        <DialogContent className='gap-0 p-0 flex flex-col overflow-hidden w-screen max-w-screen! h-screen rounded-none'>
         <DialogHeader className='p-4 shrink-0 border-b border-input'>
          <DialogTitle className='text-base font-medium'>
           {dic.hotelDatePicker.changeFilters}{' '}
           <div className='text-sm text-neutral-500 inline-block'>
            (<span>{dic.hotelDatePicker.results}: </span>
            <span>{data.length || 0}</span>)
           </div>
          </DialogTitle>
         </DialogHeader>

         <div className='grow flex flex-col overflow-hidden'>
          <div className='grow min-h-0 relative bg-background h-full'>
           {renderMobileCalendar}
          </div>
          <div className='p-2 border-t bg-background shrink-0'>
           {renderSearchButton}
          </div>
         </div>
        </DialogContent>
       </Field>

       <Field className='gap-2'>
        <Label htmlFor='ratePlan'>{dic.hotelDatePicker.ratePlan}</Label>
        {renderRatePlanSelect}
       </Field>
       <div>
        <div>{renderSearchButton}</div>
        <p className='text-xs mt-2 text-neutral-600 dark:text-neutral-400'>
         <span>{dic.hotelDatePicker.results}: </span>
         <span>{data.length || 0}</span>
        </p>
       </div>

       {!!selectedRooms.length && (
        <div className='pt-2 border-t border-input flex flex-col gap-4'>
         <div>{renderConfirmReserveButton}</div>
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
         <div className='mb-t font-medium'>
          <span className='text-xs'>
           {dic.reserveInfo.totalDiscountPrice}:{' '}
          </span>
          <span>{numberFormatter.format(reserveInfo.totalDiscountPrice)}</span>
          <span className='text-xs'> ریال</span>
         </div>
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
      {dic.hotelDatePicker.changeFilters}
      {!!activeFiltersCount && <Badge>{activeFiltersCount}</Badge>}
     </Button>
    </div>
    <div>{renderConfirmReserveButton}</div>
   </div>
  </>
 );
}
