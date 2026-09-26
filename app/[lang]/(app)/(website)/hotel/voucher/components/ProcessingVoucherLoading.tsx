import { LuCalendarClock } from 'react-icons/lu';

const processingReserveMessages = {
 fa: {
  title: 'در حال پردازش رزرو',
  message: 'لطفا از صفحه خارج نشوید',
 },
 en: {
  title: '',
  message: '',
 },
};

export default function ProcessingVoucherLoading() {
 return (
  <div>
   <div className='py-4 my-10'>
    <div className='overflow-hidden relative w-[min(100%,28rem)] min-h-80 p-4 bg-neutral-200 dark:bg-neutral-800 border border-neutral-400 dark:border-neutral-600 rounded-md mx-auto flex items-center justify-center animate-pulse text-center'>
     <div className='flex flex-col items-center'>
      <div className='text-neutral-600 dark:text-neutral-400 flex flex-col items-center'>
       <div className='mb-4'>
        <LuCalendarClock className='size-20' />
       </div>
       <div className='mb-12 text-center'>
        <h2 className='font-medium text-2xl mb-2'>
         {processingReserveMessages['fa'].title}
        </h2>
        <p className='mb-2 text-base text-destructive'>
         {processingReserveMessages['fa'].message}.
        </p>
       </div>
      </div>
      <div className='grid grid-cols-2 gap-4 text-teal-700 dark:text-teal-300'></div>
     </div>
    </div>
   </div>
  </div>
 );
}
