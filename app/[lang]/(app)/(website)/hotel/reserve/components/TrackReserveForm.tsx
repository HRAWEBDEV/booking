'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
 Field,
 FieldLabel,
 FieldError,
 FieldGroup,
} from '@/components/ui/field';
import { InputGroup, InputGroupInput } from '@/components/ui/input-group';
import { Button } from '@/components/ui/button';
import { useShareDictionary } from '../../../services/share-dictionary/shareDictionaryContext';
import { isValidIranMobileNumber } from '../../../utils/mobileNumberValidator';
import { Spinner } from '@/components/ui/spinner';

interface TrackReserveFormProps {
 onSubmit: (trackingCode: string) => void;
 onCancel: () => void;
 isPending: boolean;
}

export default function TrackReserveForm({
 onSubmit,
 onCancel,
 isPending,
}: TrackReserveFormProps) {
 const {
  shareDictionary: {
   component: { trackReserve },
  },
 } = useShareDictionary();

 const trackingFormSchema = z.object({
  trackingCode: z
   .string()
   .min(1, trackReserve.formSchemaMessages.trackingCodeRequired),
  phoneNumber: z
   .string()
   .min(1, trackReserve.formSchemaMessages.phoneNumberRequired)
   .refine(
    isValidIranMobileNumber,
    trackReserve.formSchemaMessages.phoneNumberWrong,
   ),
 });

 type TrackingFormData = z.infer<typeof trackingFormSchema>;

 const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
 } = useForm<TrackingFormData>({
  resolver: zodResolver(trackingFormSchema),
  defaultValues: {
   trackingCode: '',
   phoneNumber: '',
  },
 });

 const handleFormSubmit = (data: TrackingFormData) => {
  onSubmit(data.trackingCode);
 };

 return (
  <form
   onSubmit={handleSubmit(handleFormSubmit)}
   className='flex flex-col gap-4 pt-7'
  >
   <FieldGroup className='mb-7'>
    <Field className='gap-2' data-invalid={!!errors.trackingCode}>
     <FieldLabel htmlFor='trackingCode' className='text-base'>
      {trackReserve.placeholderReserveCode}
     </FieldLabel>
     <InputGroup data-invalid={!!errors.trackingCode} className='h-11'>
      <InputGroupInput
       id='trackingCode'
       type='text'
       {...register('trackingCode')}
       className='text-right border-input'
      />
     </InputGroup>
     {!!errors.trackingCode && (
      <FieldError>{errors.trackingCode.message}</FieldError>
     )}
    </Field>
    <Field className='gap-2' data-invalid={!!errors.phoneNumber}>
     <FieldLabel htmlFor='phone-number' className='text-base'>
      {trackReserve.placeholderContactNumber}
     </FieldLabel>
     <InputGroup data-invalid={!!errors.phoneNumber} className='h-11'>
      <InputGroupInput
       id='phone-number'
       type='tel'
       {...register('phoneNumber')}
       className='text-foreground placeholder:text-muted-foreground text-right'
      />
     </InputGroup>
     {!!errors.phoneNumber && (
      <FieldError>{errors.phoneNumber.message}</FieldError>
     )}
    </Field>
   </FieldGroup>
   <div className='flex items-center gap-4'>
    <Button
     type='button'
     className='flex-1 text-base'
     variant='outline'
     disabled={isSubmitting || isPending}
     onClick={onCancel}
     size='lg'
    >
     {(isSubmitting || isPending) && <Spinner />}
     {trackReserve.closeBtn}
    </Button>
    <Button
     type='submit'
     className='flex-1 text-base'
     disabled={isSubmitting || isPending}
     size='lg'
    >
     {(isSubmitting || isPending) && <Spinner />}
     {trackReserve.confirmBtn}
    </Button>
   </div>
  </form>
 );
}
