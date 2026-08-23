import { Skeleton } from '@/components/ui/skeleton';

export default function PaymentInfoLoading({
 roomsCount = 1,
}: {
 roomsCount?: number;
}) {
 return (
  <section className='border border-input rounded-md p-4'>
   <Skeleton className='h-6 w-40 mb-4' />
   <div className='grid gap-4 grid-cols-1 md:grid-cols-2 mb-3 pb-3 border-b border-input'>
    {Array.from({ length: 4 }, (_, i) => i).map((i) => (
     <Skeleton key={i} className='h-5 w-48' />
    ))}
   </div>
   <section className='pb-3 mb-2 border-b border-input'>
    {Array.from({ length: roomsCount }, (_, i) => i).map((i) => (
     <div key={i} className='w-full mb-4'>
      <Skeleton className='h-5 w-56 mb-1' />
      <Skeleton className='h-5 w-24 mb-2' />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
       <Skeleton className='h-5 w-40' />
       <Skeleton className='h-5 w-36' />
      </div>
     </div>
    ))}
   </section>
   <section className='grid grid-cols-1 md:grid-cols-2 mb-4 gap-2'>
    <Skeleton className='h-7 w-52' />
    <Skeleton className='h-7 w-44' />
   </section>
   <section>
    <Skeleton className='h-5 w-36 mb-3' />
    <div className='space-y-3 mb-6'>
     {Array.from({ length: 3 }, (_, i) => i).map((i) => (
      <Skeleton key={i} className='h-16 w-full rounded-2xl' />
     ))}
    </div>
    <div className='flex justify-end gap-4'>
     <Skeleton className='h-11 w-36 flex-1 md:flex-none rounded-md' />
     <Skeleton className='h-11 w-36 flex-1 md:flex-none rounded-md' />
    </div>
   </section>
  </section>
 );
}
