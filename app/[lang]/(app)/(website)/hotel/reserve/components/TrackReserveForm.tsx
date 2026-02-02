'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useShareDictionary } from '../../../services/share-dictionary/shareDictionaryContext';
import { isValidIranMobileNumber } from '../../../utils/mobileNumberValidator';

interface TrackReserveFormProps {
 onSubmit: (trackingCode: string) => void;
 onCancel: () => void;
}

export default function TrackReserveForm({
 onSubmit,
 onCancel,
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
  mode: 'onBlur',
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
   className='flex flex-col gap-4'
  >
   <div className='transition-all'>
    <Input
     type='text'
     placeholder={trackReserve.placeholderReserveCode}
     {...register('trackingCode')}
     className='text-right border-input'
    />
    {errors.trackingCode && (
     <p className='text-destructive text-sm mt-1'>
      {errors.trackingCode.message}
     </p>
    )}
   </div>
   <div className='transition-all'>
    <Input
     type='tel'
     placeholder={trackReserve.placeholderContactNumber}
     {...register('phoneNumber')}
     className='text-foreground placeholder:text-muted-foreground text-right'
    />
    {errors.phoneNumber && (
     <p className='text-destructive text-sm mt-1'>
      {errors.phoneNumber.message}
     </p>
    )}
   </div>
   <div className='flex items-center gap-4'>
    <Button
     type='button'
     className='flex-1'
     variant='destructive'
     onClick={onCancel}
    >
     {trackReserve.closeBtn}
    </Button>
    <Button type='submit' className='flex-1' disabled={isSubmitting}>
     {isSubmitting ? '' : trackReserve.confirmBtn}
    </Button>
   </div>
  </form>
 );
}
