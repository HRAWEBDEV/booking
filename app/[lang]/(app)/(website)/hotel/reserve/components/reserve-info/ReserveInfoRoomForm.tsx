import { useState, useEffect } from 'react';
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
import { useReserveConfig } from '../../services/reserve-config/reserveConfigContext';
import {
 Dialog,
 DialogClose,
 DialogContent,
 DialogHeader,
 DialogFooter,
} from '@/components/ui/dialog';
import { BiError } from 'react-icons/bi';
import { ratePlanTypes } from '../../../find-hotel/[hotelID]/utils/ratePlanTypes';
import { Badge } from '@/components/ui/badge';

export default function ReserveInfoRoomForm({
 room,
 i,
 dic,
}: {
 room: RoomInventory;
 i: number;
 dic: ReserveHotelDictionary;
}) {
 const [showRemoveRoom, setShowRemoveRoom] = useState(false);
 const {
  rooms: { data, storeRooms, guestInfo, storeRoomsDispatcher },
 } = useReserveConfig();
 const {
  register,
  control,
  setValue,
  formState: { errors },
 } = useFormContext<BookingInfoSchema>();
 const saveAsReserveInfo = guestInfo[i].saveAsReserveInfo;
 const isRemoved = guestInfo[i].removed;

 const { localeInfo } = useBaseConfig();

 const activeRatePlanTypes = ratePlanTypes.filter(
  (item) =>
   room.accommodationTypePrice.accommodationRatePlanModel.ratePlanModel[
    item.type
   ],
 );

 return (
  <section
   data-is-removed={isRemoved}
   key={i}
   className='p-4 border border-input rounded-md mb-4 relative data-[is-removed="true"]:hidden!'
  >
   <div className='absolute end-4 top-4'>
    <Button
     type='button'
     size='icon'
     variant='ghost'
     className='text-rose-700 dark:text-rose-400'
     disabled={Boolean(storeRooms && storeRooms.length <= 1)}
     onClick={() => {
      setShowRemoveRoom(true);
     }}
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
    {!!activeRatePlanTypes.length && (
     <div className='mt-2 lg:mb-0 flex-wrap flex gap-2'>
      {activeRatePlanTypes.map((item) => {
       return (
        <Badge key={item.type} variant='outline' className='rounded-md p-2'>
         {dic.reserveInfo.reserveForm.ratePlanTypes[item.type]}
        </Badge>
       );
      })}
     </div>
    )}
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
         className='w-20 data-[state="active"]:border-primary'
         onClick={() => onChange('male')}
        >
         {dic.reserveInfo.reserveForm.male}
        </TabsTrigger>
        <TabsTrigger
         value='female'
         className='w-20 data-[state="active"]:border-primary'
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
        <TabsTrigger
         className='data-[state="active"]:border-primary'
         value='inner'
         onClick={() => onChange('inner')}
        >
         {dic.reserveInfo.reserveForm.innerGuest}
        </TabsTrigger>
        <TabsTrigger
         disabled
         className='data-[state="active"]:border-primary'
         value='foreign'
         onClick={() => onChange('foreign')}
        >
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
         if (value) {
          data?.forEach((_, i) => {
           setValue(`guestInfo.${i}.saveAsReserveInfo`, false);
          });
         }
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
   <Dialog
    open={showRemoveRoom}
    onOpenChange={(newValue) => setShowRemoveRoom(newValue)}
   >
    <DialogContent className='p-0 gap-0'>
     <DialogHeader className='p-4'></DialogHeader>
     <div className='p-4'>
      <div className='flex gap-1 items-center text-red-700 dark:text-red-400 font-medium'>
       <BiError className='size-12' />
       <p>{dic.reserveInfo.removeReserveRoom.title}</p>
      </div>
     </div>
     <DialogFooter className='p-4'>
      <DialogClose asChild>
       <Button
        className='sm:w-24 h-11'
        variant='outline'
        onClick={() => setShowRemoveRoom(false)}
       >
        {dic.reserveInfo.removeReserveRoom.cancel}
       </Button>
      </DialogClose>
      <DialogClose asChild>
       <Button
        className='sm:w-24 h-11'
        variant='destructive'
        onClick={() => {
         setValue(`guestInfo.${i}.removed`, true);
         storeRoomsDispatcher({
          type: 'remove',
          payload: i,
         });
        }}
       >
        {dic.reserveInfo.removeReserveRoom.confirm}
       </Button>
      </DialogClose>
     </DialogFooter>
    </DialogContent>
   </Dialog>
  </section>
 );
}
