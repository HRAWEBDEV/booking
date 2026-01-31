'use client';
import { type ReserveVoucherDictionary } from '@/internalization/app/dictionaries/website/hotel/voucher/dictionary';
import { Button } from '@/components/ui/button';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { useGoHome } from '../../../hooks/useGoHome';
import { type BookReserveInfo } from '../../services/reserveApiActions';
import { IoIosCopy } from 'react-icons/io';
import { toast } from 'sonner';

export default function FailedReserve({
 dic,
 trackingCode,
}: {
 dic: ReserveVoucherDictionary;
 bookReserveInfo: BookReserveInfo | null;
 trackingCode: string;
}) {
 const { goHome } = useGoHome();
 return (
  <div className='py-4 my-10'>
   <div className='overflow-hidden relative w-[min(100%,28rem)] min-h-80 p-4 bg-red-50 dark:bg-red-950 border border-red-700 dark:border-red-300 rounded-md mx-auto flex items-center justify-center'>
    <div className='flex flex-col items-center'>
     <div className='text-red-800 dark:text-red-300 flex flex-col items-center'>
      <div>
       <IoMdInformationCircleOutline className='size-36' />
      </div>
      <div className='mb-12 flex flex-col items-center'>
       <h2 className='text-center font-medium text-3xl m-4'>
        {dic.voucherInfo.failedReservation}
       </h2>
       <Button
        variant='destructive'
        onClick={() => {
         navigator.clipboard.writeText(trackingCode);
         toast.success(dic.voucherInfo.reserveCheckCodeCopied);
        }}
       >
        <p className='font-medium'>
         <span className='text-neutral-200 dark:text-neutral-800'>
          {dic.voucherInfo.reserveCheckCode}:{' '}
         </span>
         <span className='text-lg'>{trackingCode}</span>
        </p>
        <IoIosCopy />
       </Button>
      </div>
     </div>
     <div className='grid grid-cols-2 gap-4 text-red-700 dark:text-red-300'>
      <Button
       size='lg'
       className='w-36 font-medium text-base border border-red-700 dark:border-red-300 '
       variant='outline'
       onClick={goHome}
      >
       {dic.voucherInfo.returnBack}
      </Button>
      <Button
       variant='destructive'
       size='lg'
       className='w-36 font-medium text-base'
      >
       {dic.voucherInfo.contactSupport}
      </Button>
     </div>
    </div>
   </div>
  </div>
 );
}
