import { Skeleton } from '@/components/ui/skeleton';

export default function HotelMenuBarLoading() {
 return (
  <section className='bg-background shadow-lg rounded-md mb-4 overflow-hidden border border-input'>
   <div className='flex gap-2 p-1 py-2'>
    {Array.from({ length: 4 }, (_, i) => i).map((i) => (
     <Skeleton key={i} className='h-4 w-16 shrink-0' />
    ))}
   </div>
  </section>
 );
}
