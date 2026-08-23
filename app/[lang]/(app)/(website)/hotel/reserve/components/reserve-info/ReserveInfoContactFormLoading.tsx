import { Skeleton } from '@/components/ui/skeleton';

export default function ReserveInfoContactFormLoading() {
 return (
  <div>
   <Skeleton className='h-6 w-44 mb-4' />
   <div className='grid gap-4 grid-cols-1 md:grid-cols-2 gap-y-5'>
    <div className='grid gap-4 grid-cols-2'>
     {Array.from({ length: 2 }, (_, i) => i).map((i) => (
      <div key={i} className='flex flex-col gap-2'>
       <Skeleton className='h-4 w-20' />
       <Skeleton className='h-9 w-full rounded-md' />
      </div>
     ))}
    </div>
    {Array.from({ length: 3 }, (_, i) => i).map((i) => (
     <div key={i} className='flex flex-col gap-2'>
      <Skeleton className='h-4 w-24' />
      <Skeleton className='h-9 w-full rounded-md' />
     </div>
    ))}
   </div>
  </div>
 );
}
