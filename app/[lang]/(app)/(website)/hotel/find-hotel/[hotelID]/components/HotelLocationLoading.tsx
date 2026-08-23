import { Skeleton } from '@/components/ui/skeleton';

export default function HotelLocationLoading() {
 return (
  <div className='h-44 w-full border border-input rounded-md bg-neutral-100 dark:bg-neutral-900 overflow-hidden'>
   <Skeleton className='h-full w-full rounded-none' />
  </div>
 );
}
