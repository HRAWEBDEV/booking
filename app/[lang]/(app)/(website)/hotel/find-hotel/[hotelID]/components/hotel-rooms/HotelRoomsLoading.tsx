import { Skeleton } from '@/components/ui/skeleton';

function HotelRoomCardLoading() {
 return (
  <div className='overflow-hidden shadow-lg rounded-md border border-neutral-200 dark:border-neutral-800'>
   <article className='p-3 flex flex-col lg:flex-row overflow-hidden'>
    <div className='mb-4 rounded-md overflow-hidden lg:mb-0 lg:me-4 lg:basis-40 grow-0 shrink-0'>
     <Skeleton className='h-56 lg:h-40 rounded-md w-full' />
    </div>
    <main className='grow mb-2 lg:mb-0 flex flex-col lg:pe-4'>
     <Skeleton className='h-6 w-48 mb-2' />
     <div className='flex gap-2 items-center mb-4'>
      <Skeleton className='size-6 rounded-full shrink-0' />
      <Skeleton className='h-4 w-20' />
     </div>
     <div className='flex-wrap flex gap-2'>
      <Skeleton className='h-7 w-24 rounded-md' />
      <Skeleton className='h-7 w-24 rounded-md' />
     </div>
    </main>
    <footer className='flex flex-col lg:justify-end lg:basis-52'>
     <div className='mb-4 flex gap-2 items-end flex-wrap lg:justify-center'>
      <Skeleton className='h-6 w-28' />
     </div>
     <div className='flex flex-col gap-2'>
      <Skeleton className='h-11 w-full rounded-md' />
      <Skeleton className='h-11 w-full rounded-md' />
     </div>
    </footer>
   </article>
   <div className='h-10 bg-neutral-100 dark:bg-neutral-900 p-1 flex gap-2 items-center'>
    <Skeleton className='h-6 w-24 rounded' />
    <Skeleton className='h-6 w-24 rounded' />
   </div>
  </div>
 );
}

export default function HotelRoomsLoading() {
 return (
  <div className='grid gap-4 mb-4'>
   {Array.from({ length: 2 }, (_, i) => i).map((i) => (
    <HotelRoomCardLoading key={i} />
   ))}
  </div>
 );
}
