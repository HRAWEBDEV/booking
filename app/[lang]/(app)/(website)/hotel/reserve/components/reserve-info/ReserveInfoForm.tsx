'use client';
import { type ReserveHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/reserve/dictionary';
import { FieldLabel, Field, FieldError } from '@/components/ui/field';
import { InputGroup, InputGroupInput } from '@/components/ui/input-group';
import { useReserveConfig } from '../../services/reserve-config/reserveConfigContext';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useFormContext, Controller } from 'react-hook-form';
import { type BookingInfoSchema } from '../../schemas/bookingInfoSchema';
import ReserveInfoRoomForm from './ReserveInfoRoomForm';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LockReserveErrorCodes } from '../../../utils/lockReserveErrorCodes';
import { toEnglishNumbers } from '@/utils/numberReplacer';

export default function ReserveInfoForm({
 dic,
}: {
 dic: ReserveHotelDictionary;
}) {
 const {
  register,
  control,
  formState: { errors },
 } = useFormContext<BookingInfoSchema>();

 const {
  hotelInfo: { isLoading: hotelInfoIsLoading },
  rooms: { data, isLoading },
  onSubmitBookingFormInfo,
  onCancelReserve,
  cancelReserveIsLoading,
  confirmReserveIsPending,
  confirmReserveError,
 } = useReserveConfig();

 const reserveRoomsAreFull =
  confirmReserveError?.response?.data.errorInfo.code ===
  LockReserveErrorCodes.ROOMS_ARE_FULL;

 const reserveRoomsAreFullAlert = (
  <Alert variant='destructive' className='bg-destructive/10 border-destructive'>
   <AlertDescription className='font-medium'>
    {dic.reserveInfo.reserveRoomsArefull}
   </AlertDescription>
  </Alert>
 );

 return (
  <div>
   <form>
    <section className='p-4 border border-input rounded-md mb-6 bg-neutral-50 dark:bg-neutral-950'>
     {reserveRoomsAreFull && (
      <div className='mb-2'>{reserveRoomsAreFullAlert}</div>
     )}
     <div>
      <h3 className='font-medium mb-4 text-neutral-600 dark:text-neutral-400'>
       {dic.reserveInfo.reserveForm.reservePersonInfo}
      </h3>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 gap-y-5'>
       <div className='grid gap-4 grid-cols-2'>
        <Field className='gap-2' data-invalid={!!errors.firstName}>
         <FieldLabel htmlFor='firstName'>
          {dic.reserveInfo.reserveForm.firstName} *
         </FieldLabel>
         <InputGroup data-invalid={!!errors.firstName}>
          <InputGroupInput id='firstName' {...register('firstName')} />
         </InputGroup>
        </Field>
        <Field className='gap-2' data-invalid={!!errors.lastName}>
         <FieldLabel htmlFor='lastName'>
          {dic.reserveInfo.reserveForm.lastName} *
         </FieldLabel>
         <InputGroup data-invalid={!!errors.lastName}>
          <InputGroupInput id='lastName' {...register('lastName')} />
         </InputGroup>
        </Field>
       </div>
       <Controller
        control={control}
        name='nationalCode'
        render={({ field: { onChange, ...other } }) => (
         <Field className='gap-2' data-invalid={!!errors.nationalCode}>
          <FieldLabel htmlFor='nationalCode'>
           {dic.reserveInfo.reserveForm.nationalCode} *
          </FieldLabel>
          <InputGroup data-invalid={!!errors.nationalCode}>
           <InputGroupInput
            id='nationalCode'
            {...other}
            onChange={(e) => {
             const value = e.target.value;
             const englishValue = toEnglishNumbers(value);
             onChange(englishValue);
            }}
           />
          </InputGroup>
          {!!errors.nationalCode && (
           <FieldError>
            <p>{errors.nationalCode.message}</p>
           </FieldError>
          )}
         </Field>
        )}
       />
       <Controller
        control={control}
        name='phoneNumber'
        render={({ field: { onChange, ...other } }) => (
         <Field className='gap-2' data-invalid={!!errors.phoneNumber}>
          <FieldLabel htmlFor='phoneNumber'>
           {dic.reserveInfo.reserveForm.phoneNumber} *
          </FieldLabel>
          <InputGroup data-invalid={!!errors.phoneNumber}>
           <InputGroupInput
            id='phoneNumber'
            {...other}
            onChange={(e) => {
             const value = e.target.value;
             const englishValue = toEnglishNumbers(value);
             onChange(englishValue);
            }}
           />
          </InputGroup>
          {!!errors.phoneNumber && (
           <FieldError>
            <p>{errors.phoneNumber.message}</p>
           </FieldError>
          )}
         </Field>
        )}
       />
       <Field className='gap-2' data-invalid={!!errors.email}>
        <FieldLabel htmlFor='email'>
         {dic.reserveInfo.reserveForm.email}
        </FieldLabel>
        <InputGroup data-invalid={!!errors.email}>
         <InputGroupInput id='email' {...register('email')} />
        </InputGroup>
       </Field>
      </div>
     </div>
    </section>
    <div>
     <h3 className='font-medium mb-2 text-neutral-600 dark:text-neutral-400'>
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
       return <ReserveInfoRoomForm i={i} room={room} key={i} dic={dic} />;
      })
     )}
    </div>
    <div className='flex justify-end gap-4 lg:opacity-0 mb-4 lg:h-0 lg:mb-0 overflow-hidden'>
     <Button
      className='text-base w-40 flex-1 md:flex-none'
      variant='outline'
      size='lg'
      type='button'
      disabled={
       isLoading ||
       hotelInfoIsLoading ||
       cancelReserveIsLoading ||
       confirmReserveIsPending
      }
      onClick={onCancelReserve}
     >
      {(isLoading ||
       hotelInfoIsLoading ||
       cancelReserveIsLoading ||
       confirmReserveIsPending) && <Spinner />}
      {dic.reserveInfo.reserveForm.cancel}
     </Button>
     <Button
      className='text-base w-40 flex-1 md:flex-none'
      variant='secondary'
      size='lg'
      type='submit'
      disabled={
       isLoading ||
       hotelInfoIsLoading ||
       cancelReserveIsLoading ||
       confirmReserveIsPending
      }
      onClick={(e) => {
       e.preventDefault();
       onSubmitBookingFormInfo();
      }}
     >
      {(isLoading ||
       hotelInfoIsLoading ||
       cancelReserveIsLoading ||
       confirmReserveIsPending) && <Spinner />}
      {dic.reserveInfo.reserveForm.confirm}
     </Button>
    </div>
   </form>
  </div>
 );
}
