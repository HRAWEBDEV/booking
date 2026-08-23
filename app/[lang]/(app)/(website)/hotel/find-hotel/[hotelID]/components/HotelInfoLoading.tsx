import { Skeleton } from '@/components/ui/skeleton';

export default function HotelInfoLoading() {
 return (
  <div className='py-4'>
   <div className='flex gap-1 mb-2 items-center'>
    <Skeleton className='h-4 w-28' />
   </div>
   <div className='mb-2 flex gap-2 justify-between items-center'>
    <Skeleton className='h-9 w-64 md:w-96' />
    <div className='md:hidden'>
     <Skeleton className='h-10 w-10 rounded-md shrink-0' />
    </div>
   </div>
   <div className='flex items-center gap-2'>
    <Skeleton className='size-4 rounded-full shrink-0' />
    <Skeleton className='h-4 w-48 md:w-80' />
   </div>
  </div>
 );
}
