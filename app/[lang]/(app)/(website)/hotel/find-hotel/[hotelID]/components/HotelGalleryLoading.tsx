import { Skeleton } from '@/components/ui/skeleton';

export default function HotelGalleryLoading() {
 return (
  <section className='grid grid-cols-1 mb-4'>
   <Skeleton className='rounded-lg h-92 w-full mb-2' />
   <div className='hidden md:flex gap-1 overflow-hidden'>
    {Array.from({ length: 6 }, (_, i) => i).map((i) => (
     <Skeleton key={i} className='rounded-lg size-20 shrink-0' />
    ))}
   </div>
  </section>
 );
}
