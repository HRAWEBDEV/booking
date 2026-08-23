import { Skeleton } from '@/components/ui/skeleton';

export default function PaymentSummaryLoading() {
 return (
  <section className='p-4 rounded-md border border-input mb-2'>
   <div className='mb-3 pb-3 border-b border-input'>
    <Skeleton className='h-6 w-40 mb-2' />
    <Skeleton className='h-4 w-56' />
   </div>
   <div className='grid grid-cols-[1fr_max-content_1fr] gap-2 justify-center items-center mb-3 pb-3'>
    <div className='flex flex-col items-center gap-1'>
     <Skeleton className='h-4 w-20' />
     <Skeleton className='h-4 w-28' />
     <Skeleton className='h-4 w-14' />
    </div>
    <Skeleton className='h-4 w-16' />
    <div className='flex flex-col items-center gap-1'>
     <Skeleton className='h-4 w-20' />
     <Skeleton className='h-4 w-28' />
     <Skeleton className='h-4 w-14' />
    </div>
   </div>
   <div>
    <Skeleton className='h-11 w-full rounded-md mb-4' />
    {Array.from({ length: 3 }, (_, i) => i).map((i) => (
     <Skeleton key={i} className='h-14 w-full rounded-lg mb-2' />
    ))}
   </div>
  </section>
 );
}
