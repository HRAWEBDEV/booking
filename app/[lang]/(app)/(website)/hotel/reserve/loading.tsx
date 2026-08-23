import { Skeleton } from '@/components/ui/skeleton';
import ReserveInfoContactFormLoading from './components/reserve-info/ReserveInfoContactFormLoading';
import ReserveInfoRoomFormLoading from './components/reserve-info/ReserveInfoRoomFormLoading';
import ReserveInfoSummaryLoading from './components/reserve-info/ReserveInfoSummaryLoading';

function StepperStepLoading() {
 return (
  <div className='flex flex-col gap-1 items-center text-center shrink-0'>
   <Skeleton className='size-6 rounded-full' />
   <Skeleton className='h-5 w-16' />
  </div>
 );
}

export default function Loading() {
 return (
  <>
   <section className='my-4'>
    <div className='flex items-center gap-2 justify-center'>
     <StepperStepLoading />
     <Skeleton className='basis-24 w-24 h-px rounded-none' />
     <StepperStepLoading />
     <Skeleton className='basis-24 w-24 h-px rounded-none' />
     <StepperStepLoading />
    </div>
   </section>

   <div className='grid grid-cols-1 lg:grid-cols-[1fr_24rem] gap-4 gap-y-0'>
    <div>
     <section className='p-4 border border-input rounded-md mb-6 bg-neutral-50 dark:bg-neutral-950'>
      <ReserveInfoContactFormLoading />
     </section>
     <div>
      <Skeleton className='h-6 w-40 mb-2' />
      <ReserveInfoRoomFormLoading />
     </div>
    </div>

    <div className='row-start-1 lg:row-start-auto mb-4'>
     <ReserveInfoSummaryLoading />
    </div>
   </div>
  </>
 );
}
