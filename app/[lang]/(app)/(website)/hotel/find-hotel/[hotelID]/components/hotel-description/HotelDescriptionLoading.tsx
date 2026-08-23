import { Skeleton } from '@/components/ui/skeleton';

export default function HotelDescriptionLoading() {
 return (
  <section className='mb-4 p-4 shadow-md rounded-md border border-primary bg-primary/5'>
   <Skeleton className='h-8 w-48 mb-2' />
   <div className='flex items-center gap-2 mb-3'>
    <Skeleton className='size-5 rounded-full shrink-0' />
    <Skeleton className='h-4 w-64' />
   </div>
   <div className='mb-4 grid grid-cols-2 md:grid-cols-4 gap-4 pb-4 border-b border-neutral-400 dark:border-neutral-600'>
    {Array.from({ length: 4 }, (_, i) => i).map((i) => (
     <Skeleton key={i} className='h-14 rounded-md w-full' />
    ))}
   </div>
   <div className='space-y-2'>
    <Skeleton className='h-3.5 w-full' />
    <Skeleton className='h-3.5 w-11/12' />
    <Skeleton className='h-3.5 w-3/4' />
   </div>
  </section>
 );
}
