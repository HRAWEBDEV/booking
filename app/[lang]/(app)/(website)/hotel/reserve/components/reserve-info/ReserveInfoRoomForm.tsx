import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { type RoomInventory } from '../../../services/hotelApiActions';
import { FaTrashAlt } from 'react-icons/fa';
import { FieldLabel, Field } from '@/components/ui/field';
import { InputGroup, InputGroupInput } from '@/components/ui/input-group';
import { useFormContext, Controller } from 'react-hook-form';
import { type BookingInfoSchema } from '../../schemas/bookingInfoSchema';
import { type ReserveHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/reserve/dictionary';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';

export default function ReserveInfoRoomForm({
 room,
 i,
 dic,
}: {
 room: RoomInventory;
 i: number;
 dic: ReserveHotelDictionary;
}) {
 const {
  register,
  control,
  getValues,
  formState: { errors },
 } = useFormContext<BookingInfoSchema>();
 const [saveAsReserveInfo, setSaveAsReserveInfo] = useState(
  getValues(`guestInfo.${i}.saveAsReserveInfo`),
 );

 const { localeInfo } = useBaseConfig();

 return (
  <section key={i} className='p-4 border border-input rounded-md mb-4 relative'>
   <div className='absolute end-4 top-4'>
    <Button
     type='button'
     size='icon'
     variant='ghost'
     className='text-rose-700 dark:text-rose-400'
    >
     <FaTrashAlt className='size-5' />
    </Button>
   </div>
   <div className='mb-3'>
    <h4 className='font-medium mb-2'>
     {i + 1}) {room.fName}
    </h4>
    <p className='font-medium text-neutral-600 dark:text-neutral-400'>
     {room.accommodationTypePrice.beds} {dic.reserveInfo.reserveForm.person}
    </p>
   </div>
   <div className='flex flex-wrap gap-5 mb-5'>
    <Controller
     name={`guestInfo.${i}.gender`}
     control={control}
     render={({ field: { value, onChange, ...other } }) => (
      <Tabs dir={localeInfo.contentDirection} value={value} {...other}>
       <TabsList>
        <TabsTrigger
         value='male'
         className='w-20'
         onClick={() => onChange('male')}
        >
         {dic.reserveInfo.reserveForm.male}
        </TabsTrigger>
        <TabsTrigger
         value='female'
         className='w-20'
         onClick={() => onChange('female')}
        >
         {dic.reserveInfo.reserveForm.female}
        </TabsTrigger>
       </TabsList>
      </Tabs>
     )}
    />
    <Controller
     name={`guestInfo.${i}.type`}
     control={control}
     render={({ field: { value, onChange, ...other } }) => (
      <Tabs dir={localeInfo.contentDirection} value={value} {...other}>
       <TabsList>
        <TabsTrigger value='inner' onClick={() => onChange('inner')}>
         {dic.reserveInfo.reserveForm.innerGuest}
        </TabsTrigger>
        <TabsTrigger value='foreign' onClick={() => onChange('foreign')}>
         {dic.reserveInfo.reserveForm.foreignGuest}
        </TabsTrigger>
       </TabsList>
      </Tabs>
     )}
    />
   </div>
   <div className='flex gap-5 flex-wrap mb-8'>
    <div className='flex gap-3'>
     <Controller
      name={`guestInfo.${i}.saveAsReserveInfo`}
      control={control}
      render={({ field: { value, onChange, ...other } }) => (
       <Checkbox
        id={`saveAsReservePersonInfo${i + 1}`}
        className='scale-125'
        {...other}
        checked={value}
        onCheckedChange={(value) => {
         setSaveAsReserveInfo(value as boolean);
         onChange(value);
        }}
       />
      )}
     />
     <Label htmlFor={`saveAsReservePersonInfo${i + 1}`}>
      {dic.reserveInfo.reserveForm.saveAsReservePersonInfo}
     </Label>
    </div>
    <div className='flex gap-3 flex-wrap'>
     <Controller
      name={`guestInfo.${i}.hasEarlyCheckin`}
      control={control}
      render={({ field: { value, onChange, ...other } }) => (
       <Checkbox
        id={`earlyCheckinCharge${i + 1}`}
        className='scale-125'
        {...other}
        checked={value}
        onCheckedChange={(value) => onChange(value)}
       />
      )}
     />
     <Label htmlFor={`earlyCheckinCharge${i + 1}`}>
      {dic.reserveInfo.reserveForm.earlyCheckinCharge}
     </Label>
    </div>
    <div className='flex gap-3 flex-wrap'>
     <Controller
      name={`guestInfo.${i}.hasLateCheckout`}
      control={control}
      render={({ field: { value, onChange, ...other } }) => (
       <Checkbox
        id={`lateCheckoutCharge${i + 1}`}
        className='scale-125'
        {...other}
        checked={value}
        onCheckedChange={(value) => onChange(value)}
       />
      )}
     />
     <Label htmlFor={`lateCheckoutCharge${i + 1}`}>
      {dic.reserveInfo.reserveForm.lateCheckoutCharge}
     </Label>
    </div>
   </div>
   {!saveAsReserveInfo && (
    <div className='grid gap-4 grid-cols-1 md:grid-cols-2 gap-y-5'>
     <div className='grid gap-4 grid-cols-2'>
      <Field
       className='gap-2'
       data-invalid={!!errors.guestInfo?.[i]?.firstName}
      >
       <FieldLabel htmlFor={`firstName${i + 1}`}>
        {dic.reserveInfo.reserveForm.firstName} *
       </FieldLabel>
       <InputGroup data-invalid={!!errors.guestInfo?.[i]?.firstName}>
        <InputGroupInput
         id={`firstName${i + 1}`}
         {...register(`guestInfo.${i}.firstName`)}
        />
       </InputGroup>
      </Field>
      <Field className='gap-2' data-invalid={!!errors.guestInfo?.[i]?.lastName}>
       <FieldLabel htmlFor={`lastName${i + 1}`}>
        {dic.reserveInfo.reserveForm.lastName} *
       </FieldLabel>
       <InputGroup data-invalid={!!errors.guestInfo?.[i]?.lastName}>
        <InputGroupInput
         id={`lastName${i + 1}`}
         {...register(`guestInfo.${i}.lastName`)}
        />
       </InputGroup>
      </Field>
     </div>
     <Field
      className='gap-2'
      data-invalid={!!errors.guestInfo?.[i]?.nationalCode}
     >
      <FieldLabel htmlFor={`nationalCode${i + 1}`}>
       {dic.reserveInfo.reserveForm.nationalCode} *
      </FieldLabel>
      <InputGroup data-invalid={!!errors.guestInfo?.[i]?.nationalCode}>
       <InputGroupInput
        id={`nationalCode${i + 1}`}
        {...register(`guestInfo.${i}.nationalCode`)}
       />
      </InputGroup>
     </Field>
    </div>
   )}
  </section>
 );
}
