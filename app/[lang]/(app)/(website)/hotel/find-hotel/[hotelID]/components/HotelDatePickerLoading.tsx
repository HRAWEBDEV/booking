import { Skeleton } from '@/components/ui/skeleton';

export default function HotelDatePickerLoading() {
 return (
  <div className='shadow-lg border border-input p-4 rounded-md mb-2 space-y-4'>
   <div>
    <Skeleton className='h-4 w-16 mb-2' />
    <Skeleton className='h-10 w-full rounded-md' />
   </div>
   <div>
    <Skeleton className='h-4 w-16 mb-2' />
    <Skeleton className='h-10 w-full rounded-md' />
   </div>
   <div>
    <Skeleton className='h-4 w-20 mb-2' />
    <Skeleton className='h-10 w-full rounded-md' />
   </div>
   <Skeleton className='h-10 w-full rounded-md' />
  </div>
 );
}

export function HotelDatePickerMobileBarLoading() {
 return (
  <div className='p-2 bg-neutral-100 dark:bg-neutral-900 border-t border-input fixed z-3 bottom-(--website-mobile-nav-height) start-0 end-0 md:hidden'>
   <div className='mb-1'>
    <Skeleton className='h-4 w-36 bg-neutral-300 dark:bg-neutral-700' />
   </div>
   <div className='grid grid-cols-2 gap-4'>
    <Skeleton className='h-10 w-full rounded-md bg-neutral-300 dark:bg-neutral-700' />
    <Skeleton className='h-10 w-full rounded-md bg-neutral-300 dark:bg-neutral-700' />
   </div>
  </div>
 );
}
