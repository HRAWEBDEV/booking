'use client';
import { type ReserveHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/reserve/dictionary';
import { reserveSteps } from '../utils/reserveSteps';
import { useReserveConfig } from '../services/reserve-config/reserveConfigContext';

export default function ReserveStepper({
 dic,
}: {
 dic: ReserveHotelDictionary;
}) {
 const { activeReserveStep } = useReserveConfig();
 return (
  <section className='my-4'>
   <div className='flex items-center gap-2 justify-center'>
    <div
     data-active-step={activeReserveStep === 'reserve'}
     data-completed-step={activeReserveStep !== 'reserve'}
     className='group flex flex-col gap-1 items-center text-center shrink-0'
    >
     <div className='size-6 rounded-full bg-neutral-300 grid place-content-center text-xs group-data-[active-step="true"]:bg-primary group-data-[active-step="true"]:text-primary-foreground group-data-[completed-step="true"]:bg-secondary group-data-[completed-step="true"]:text-secondary-foreground'>
      1
     </div>
     <span className='text-sm font-medium text-neutral-600 dark:text-neutral-400'>
      {dic.reserveStepper.fillForm}
     </span>
    </div>
    <div
     data-completed-step={activeReserveStep === 'payment'}
     className='basis-24 h-px bg-neutral-400 dark:bg-neutral-600 data-[completed-step="true"]:bg-secondary'
    ></div>
    <div
     data-active-step={activeReserveStep === 'payment'}
     data-completed-step={activeReserveStep === 'book'}
     className='group flex flex-col gap-1 items-center text-center shrink-0'
    >
     <div className='size-6 rounded-full bg-neutral-300 grid place-content-center text-xs group-data-[active-step="true"]:bg-primary group-data-[active-step="true"]:text-primary-foreground group-data-[completed-step="true"]:bg-secondary group-data-[completed-step="true"]:text-secondary-foreground'>
      2
     </div>
     <span className='text-sm font-medium text-neutral-600 dark:text-neutral-400'>
      {dic.reserveStepper.payment}
     </span>
    </div>
    <div
     data-completed-step={activeReserveStep === 'book'}
     className='basis-24 h-px bg-neutral-400 dark:bg-neutral-600 data-[completed-step="true"]:bg-secondary'
    ></div>
    <div
     data-active-step={activeReserveStep === 'book'}
     className='group flex flex-col gap-1 items-center text-center shrink-0'
    >
     <div className='size-6 rounded-full bg-neutral-300 grid place-content-center text-xs group-data-[active-step="true"]:bg-primary group-data-[active-step="true"]:text-primary-foreground group-data-[completed-step="true"]:bg-secondary group-data-[completed-step="true"]:text-secondary-foreground'>
      3
     </div>
     <span className='text-sm font-medium text-neutral-600 dark:text-neutral-400'>
      {dic.reserveStepper.reserveVoucher}
     </span>
    </div>
   </div>
  </section>
 );
}
