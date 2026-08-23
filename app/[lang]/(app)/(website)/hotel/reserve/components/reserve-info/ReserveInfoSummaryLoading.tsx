import { Skeleton } from '@/components/ui/skeleton';

export default function ReserveInfoSummaryLoading() {
 return (
  <>
   <section className='p-4 rounded-md border border-input mb-2'>
    <div className='mb-3 pb-3 border-b border-input flex gap-2'>
     <div className='grow'>
      <Skeleton className='h-6 w-40 mb-2' />
      <Skeleton className='h-4 w-56' />
     </div>
     <Skeleton className='h-9 w-28 rounded-md shrink-0' />
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
    <div className='flex flex-col border-t border-input pt-4'>
     <div className='mb-2 flex flex-col gap-2'>
      {Array.from({ length: 2 }, (_, i) => i).map((i) => (
       <Skeleton key={i} className='h-4 w-48' />
      ))}
     </div>
     <Skeleton className='h-6 w-52' />
    </div>
   </section>
   <div className='gap-4 grid-cols-2 hidden lg:grid'>
    <div className='col-span-full'>
     <Skeleton className='h-6 w-full' />
    </div>
    <Skeleton className='h-11 w-full rounded-md' />
    <Skeleton className='h-11 w-full rounded-md' />
   </div>
  </>
 );
}
