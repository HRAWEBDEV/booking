import { Skeleton } from '@/components/ui/skeleton';

export default function HotelRoomsLoading() {
 return (
  <div className='grid gap-4 mb-4'>
   {Array.from({ length: 2 }, (_, i) => i).map((i) => (
    <Skeleton key={i} className='h-36' />
   ))}
  </div>
 );
}
