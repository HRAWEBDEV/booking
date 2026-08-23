import { Skeleton } from '@/components/ui/skeleton';

export default function ReserveInfoRoomFormLoading() {
 return (
  <div className='p-4 border border-input rounded-md mb-4 relative'>
   <div className='absolute end-4 top-4'>
    <Skeleton className='size-9 rounded-md' />
   </div>
   <div className='mb-3'>
    <Skeleton className='h-5 w-44 mb-2' />
    <Skeleton className='h-5 w-24' />
    <div className='mt-2 flex flex-wrap gap-2'>
     {Array.from({ length: 3 }, (_, i) => i).map((i) => (
      <Skeleton key={i} className='h-9 w-24 rounded-md' />
     ))}
    </div>
   </div>
   <div className='flex flex-wrap gap-5 mb-5'>
    {Array.from({ length: 2 }, (_, i) => i).map((i) => (
     <Skeleton key={i} className='h-9 w-20 rounded-md' />
    ))}
   </div>
   <div className='flex gap-5 flex-wrap mb-8'>
    <Skeleton className='h-6 w-44' />
   </div>
   <div className='grid gap-4 grid-cols-1 md:grid-cols-2 gap-y-5'>
    <div className='grid gap-4 grid-cols-2'>
     <div className='flex flex-col gap-2'>
      <Skeleton className='h-4 w-20' />
      <Skeleton className='h-9 w-full rounded-md' />
     </div>
     <div className='flex flex-col gap-2'>
      <Skeleton className='h-4 w-20' />
      <Skeleton className='h-9 w-full rounded-md' />
     </div>
    </div>
    <div className='flex flex-col gap-2'>
     <Skeleton className='h-4 w-24' />
     <Skeleton className='h-9 w-full rounded-md' />
    </div>
   </div>
  </div>
 );
}
