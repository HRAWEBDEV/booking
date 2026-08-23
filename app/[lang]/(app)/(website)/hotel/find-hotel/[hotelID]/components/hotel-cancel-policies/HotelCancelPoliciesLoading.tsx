import { Skeleton } from '@/components/ui/skeleton';

export default function HotelCancelPoliciesLoading() {
 return (
  <section className='mb-4 p-4 shadow-md rounded-md border border-destructive bg-destructive/5'>
   <Skeleton className='h-6 w-36 mb-2' />
   <div className='space-y-2'>
    <Skeleton className='h-3.5 w-full' />
    <Skeleton className='h-3.5 w-4/5' />
   </div>
  </section>
 );
}
