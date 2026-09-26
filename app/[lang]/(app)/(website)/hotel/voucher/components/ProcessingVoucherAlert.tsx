'use client';
import { type ReserveVoucherDictionary } from '@/internalization/app/dictionaries/website/hotel/voucher/dictionary';
import { LuCalendarSearch } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import { IoIosCopy } from 'react-icons/io';
import { toast } from 'sonner';
import { useGoHome } from '../../../hooks/useGoHome';
import Link from 'next/link';
import { contactUs } from '../../../utils/contractUs';
import { BsTelephoneFill } from 'react-icons/bs';

export default function ProcessingVoucherAlert({
 dic,
 trackingCode,
}: {
 dic: ReserveVoucherDictionary;
 trackingCode: string;
}) {
 const { goHome } = useGoHome();
 return (
  <div>
   <div className='py-4 my-10'>
    <div className='overflow-hidden relative w-[min(100%,28rem)] min-h-80 p-4 bg-neutral-200 dark:bg-neutral-800 border border-neutral-400 dark:border-neutral-600 rounded-md mx-auto flex items-center justify-center text-center'>
     <div className='flex flex-col items-center'>
      <div className='text-neutral-600 dark:text-neutral-400 flex flex-col items-center'>
       <div className='mb-4'>
        <LuCalendarSearch className='size-20' />
       </div>
       <div className='mb-12 text-center'>
        <h2 className='font-medium text-2xl mb-6'>
         {dic.voucherInfo.reserveIsProccessing}
        </h2>
        <Button
         variant='outline'
         onClick={() => {
          navigator.clipboard.writeText(trackingCode);
          toast.success(dic.voucherInfo.reserveCheckCodeCopied);
         }}
        >
         <p className='font-medium'>
          <span>{dic.voucherInfo.reserveCheckCode}: </span>
          <span>{trackingCode}</span>
         </p>
         <IoIosCopy />
        </Button>
       </div>
       <div className='grid grid-cols-2 gap-4'>
        <Button className='w-36' variant='outline' onClick={goHome}>
         {dic.voucherInfo.returnBack}
        </Button>
        <Button variant='outline' className='w-36' asChild>
         <Link href={`tel:${contactUs}`}>
          <span>{contactUs}</span>
          <BsTelephoneFill />
         </Link>
        </Button>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}
