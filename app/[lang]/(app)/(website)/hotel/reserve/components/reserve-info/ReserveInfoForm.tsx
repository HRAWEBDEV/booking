'use client';
import { type ReserveHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/reserve/dictionary';
import { FieldLabel, Field } from '@/components/ui/field';
import { InputGroup, InputGroupInput } from '@/components/ui/input-group';
import { useReserveConfig } from '../../services/reserve-config/reserveConfigContext';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { FaTrashAlt } from 'react-icons/fa';

export default function ReserveInfoForm({
 dic,
}: {
 dic: ReserveHotelDictionary;
}) {
 const {
  hotelInfo: { isLoading: hotelInfoIsLoading },
  rooms: { data, isLoading },
 } = useReserveConfig();
 const { localeInfo } = useBaseConfig();
 return (
  <div>
   <form>
    <section className='p-4 border border-input rounded-md mb-4'>
     <div>
      <h3 className='font-medium mb-4 text-neutral-600 dark:text-neutral-400'>
       {dic.reserveInfo.reserveForm.reservePersonInfo}
      </h3>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 gap-y-5'>
       <div className='grid gap-4 grid-cols-2'>
        <Field className='gap-2'>
         <FieldLabel htmlFor='firstName'>
          {dic.reserveInfo.reserveForm.firstName} *
         </FieldLabel>
         <InputGroup>
          <InputGroupInput id='firstName' />
         </InputGroup>
        </Field>
        <Field className='gap-2'>
         <FieldLabel htmlFor='lastName'>
          {dic.reserveInfo.reserveForm.lastName} *
         </FieldLabel>
         <InputGroup>
          <InputGroupInput id='lastName' />
         </InputGroup>
        </Field>
       </div>
       <Field className='gap-2'>
        <FieldLabel htmlFor='nationalCode'>
         {dic.reserveInfo.reserveForm.nationalCode} *
        </FieldLabel>
        <InputGroup>
         <InputGroupInput id='nationalCode' />
        </InputGroup>
       </Field>
       <Field className='gap-2'>
        <FieldLabel htmlFor='email'>
         {dic.reserveInfo.reserveForm.email}
        </FieldLabel>
        <InputGroup>
         <InputGroupInput id='email' />
        </InputGroup>
       </Field>
       <Field className='gap-2'>
        <FieldLabel htmlFor='phoneNumber'>
         {dic.reserveInfo.reserveForm.phoneNumber} *
        </FieldLabel>
        <InputGroup>
         <InputGroupInput id='phoneNumber' />
        </InputGroup>
       </Field>
      </div>
     </div>
    </section>
    <div>
     <h3 className='font-medium mb-4 text-neutral-600 dark:text-neutral-400'>
      {dic.reserveInfo.reserveForm.roomsPersonInfo}
     </h3>
     {isLoading || hotelInfoIsLoading ? (
      <>
       {Array.from({ length: 2 }, (_, i) => i).map((i) => (
        <Skeleton key={i} className='h-60 mb-4' />
       ))}
      </>
     ) : (
      data?.map((room, i) => {
       return (
        <section
         key={i}
         className='p-4 border border-input rounded-md mb-4 relative'
        >
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
           {room.accommodationTypePrice.beds}{' '}
           {dic.reserveInfo.reserveForm.person}
          </p>
         </div>
         <div className='flex flex-wrap gap-5 mb-5'>
          <Tabs dir={localeInfo.contentDirection} value='male'>
           <TabsList>
            <TabsTrigger value='male' className='w-20'>
             {dic.reserveInfo.reserveForm.male}
            </TabsTrigger>
            <TabsTrigger value='female' className='w-20'>
             {dic.reserveInfo.reserveForm.female}
            </TabsTrigger>
           </TabsList>
          </Tabs>
          <Tabs dir={localeInfo.contentDirection} value='innerGuest'>
           <TabsList>
            <TabsTrigger value='innerGuest'>
             {dic.reserveInfo.reserveForm.innerGuest}
            </TabsTrigger>
            <TabsTrigger value='foreignGuest'>
             {dic.reserveInfo.reserveForm.foreignGuest}
            </TabsTrigger>
           </TabsList>
          </Tabs>
         </div>
         <div className='flex gap-5 flex-wrap mb-8'>
          <div className='flex gap-3'>
           <Checkbox
            id={`saveAsReservePersonInfo${i + 1}`}
            className='scale-125'
           />
           <Label htmlFor={`saveAsReservePersonInfo${i + 1}`}>
            {dic.reserveInfo.reserveForm.saveAsReservePersonInfo}
           </Label>
          </div>
          <div className='flex gap-3 flex-wrap'>
           <Checkbox id={`earlyCheckinCharge${i + 1}`} className='scale-125' />
           <Label htmlFor={`earlyCheckinCharge${i + 1}`}>
            {dic.reserveInfo.reserveForm.earlyCheckinCharge}
           </Label>
          </div>
          <div className='flex gap-3 flex-wrap'>
           <Checkbox id={`lateCheckoutCharge${i + 1}`} className='scale-125' />
           <Label htmlFor={`lateCheckoutCharge${i + 1}`}>
            {dic.reserveInfo.reserveForm.lateCheckoutCharge}
           </Label>
          </div>
         </div>
         <div className='grid gap-4 grid-cols-1 md:grid-cols-2 gap-y-5'>
          <div className='grid gap-4 grid-cols-2'>
           <Field className='gap-2'>
            <FieldLabel htmlFor={`firstName${i + 1}`}>
             {dic.reserveInfo.reserveForm.firstName} *
            </FieldLabel>
            <InputGroup>
             <InputGroupInput id={`firstName${i + 1}`} />
            </InputGroup>
           </Field>
           <Field className='gap-2'>
            <FieldLabel htmlFor={`lastName${i + 1}`}>
             {dic.reserveInfo.reserveForm.lastName} *
            </FieldLabel>
            <InputGroup>
             <InputGroupInput id={`lastName${i + 1}`} />
            </InputGroup>
           </Field>
          </div>
          <Field className='gap-2'>
           <FieldLabel htmlFor={`nationalCode${i + 1}`}>
            {dic.reserveInfo.reserveForm.nationalCode} *
           </FieldLabel>
           <InputGroup>
            <InputGroupInput id={`nationalCode${i + 1}`} />
           </InputGroup>
          </Field>
         </div>
        </section>
       );
      })
     )}
    </div>
    <div className='flex justify-end gap-4 lg:opacity-0 mb-4 lg:h-0 lg:mb-0'>
     <Button
      className='text-base w-40'
      variant='outline'
      size='lg'
      type='button'
      disabled={isLoading || hotelInfoIsLoading}
     >
      {(isLoading || hotelInfoIsLoading) && <Spinner />}
      {dic.reserveInfo.reserveForm.cancel}
     </Button>
     <Button
      className='text-base w-40'
      variant='secondary'
      size='lg'
      type='submit'
      disabled={isLoading || hotelInfoIsLoading}
     >
      {(isLoading || hotelInfoIsLoading) && <Spinner />}
      {dic.reserveInfo.reserveForm.confirm}
     </Button>
    </div>
   </form>
  </div>
 );
}
