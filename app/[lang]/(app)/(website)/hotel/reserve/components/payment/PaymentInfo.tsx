import { type ReserveHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/reserve/dictionary';
import { useReserveConfig } from '../../services/reserve-config/reserveConfigContext';
import { Skeleton } from '@/components/ui/skeleton';

export default function PaymentInfo({ dic }: { dic: ReserveHotelDictionary }) {
 const { lockInfo } = useReserveConfig();
 if (lockInfo.isLoading) return <Skeleton className='w-full h-56' />;
 return (
  <section className='border border-input rounded-md p-4'>
   <h3 className='font-medium mb-4 text-lg'>{dic.payment.paymentInfo.title}</h3>
   <div className='grid gap-4 grid-cols-2'>
    <div>
     <span className='text-neutral-600 dark:text-neutral-400'>
      {dic.reserveInfo.reserveForm.firstName}:{' '}
     </span>
     <span className='font-medium'>{lockInfo.data?.lockInfo.firstName}</span>
    </div>
    <div>
     <span className='text-neutral-600 dark:text-neutral-400'>
      {dic.reserveInfo.reserveForm.lastName}:{' '}
     </span>
     <span className='font-medium'>{lockInfo.data?.lockInfo.lastName}</span>
    </div>
    <div>
     <span className='text-neutral-600 dark:text-neutral-400'>
      {dic.reserveInfo.reserveForm.phoneNumber}:{' '}
     </span>
     <span className='font-medium'>{lockInfo.data?.lockInfo.contactNo}</span>
    </div>
    <div>
     <span className='text-neutral-600 dark:text-neutral-400'>
      {dic.reserveInfo.reserveForm.email}:{' '}
     </span>
     <span className='font-medium'>
      {lockInfo.data?.lockInfo.email || '---'}
     </span>
    </div>
   </div>
  </section>
 );
}
