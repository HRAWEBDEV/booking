'use client';
import { type ReserveVoucherDictionary } from '@/internalization/app/dictionaries/website/hotel/voucher/dictionary';
import { Button } from '@/components/ui/button';
import { IoIosCopy } from 'react-icons/io';
import { FaCheckCircle } from 'react-icons/fa';

export default function ConfirmedVoucher({
 dic,
}: {
 dic: ReserveVoucherDictionary;
}) {
 return (
  <div className='py-4 my-10'>
   <div className='overflow-hidden relative w-[min(100%,28rem)] min-h-80 p-4 bg-teal-50 dark:bg-teal-950 border border-teal-700 dark:border-teal-300 rounded-md mx-auto flex items-center justify-center'>
    <div className='flex flex-col items-center'>
     <div className='text-teal-800 dark:text-teal-300 flex flex-col items-center'>
      <div>
       <FaCheckCircle className='size-36' />
      </div>
      <div className='mb-12 text-center'>
       <h2 className='font-medium text-3xl mb-2'>
        {dic.voucherInfo.confirmedReservation}
       </h2>
       <p className='mb-2'>{dic.voucherInfo.confirmedReservationMessage}</p>
       <Button variant='secondary'>
        <p className='font-medium'>
         <span className='text-neutral-300 dark:text-neutral-700'>
          {dic.voucherInfo.reserveCheckCode}:{' '}
         </span>
         <span className='text-base'></span>
        </p>
        <IoIosCopy />
       </Button>
      </div>
     </div>
     <div className='grid grid-cols-2 gap-4 text-teal-700 dark:text-teal-300'>
      <Button
       size='lg'
       className='w-36 font-medium text-base border border-teal-700 dark:border-teal-300 '
       variant='outline'
      >
       {dic.voucherInfo.returnBack}
      </Button>
      <Button
       variant='secondary'
       size='lg'
       className='w-36 font-medium text-base'
      >
       {dic.voucherInfo.downloadVoucher}
      </Button>
     </div>
    </div>
   </div>
  </div>
 );
}
