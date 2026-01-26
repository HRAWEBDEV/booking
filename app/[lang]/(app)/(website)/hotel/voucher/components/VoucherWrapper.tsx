import { type ReserveVoucherDictionary } from '@/internalization/app/dictionaries/website/hotel/voucher/dictionary';

export default function VoucherWrapper({
 dic,
}: {
 dic: ReserveVoucherDictionary;
}) {
 return (
  <div className='p-4 my-10'>
   <div className='w-[min(100%,30rem)] p-4 bg-red-100 border border-red-700 rounded-md mx-auto'>
    <div>
     <h2 className='text-center font-medium text-red-700 text-xl'>
      {dic.voucherInfo.failedReservation}
     </h2>
    </div>
   </div>
  </div>
 );
}
