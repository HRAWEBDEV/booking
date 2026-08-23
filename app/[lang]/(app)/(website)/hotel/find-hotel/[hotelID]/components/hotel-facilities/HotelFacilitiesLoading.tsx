import { Skeleton } from '@/components/ui/skeleton';

export default function HotelFacilitiesLoading() {
 return (
  <section className='mb-4 p-4 shadow-md rounded-md border border-secondary bg-secondary/5'>
   <Skeleton className='h-6 w-32 mb-3' />
   <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-2'>
    {Array.from({ length: 4 }, (_, i) => i).map((i) => (
     <Skeleton key={i} className='h-4 w-24' />
    ))}
   </div>
   <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
    {Array.from({ length: 4 }, (_, i) => i).map((i) => (
     <Skeleton key={i} className='h-4 w-20' />
    ))}
   </div>
  </section>
 );
}
