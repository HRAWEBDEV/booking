import { type HotelInfo } from '../../../../services/hotelApiActions';
import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import { FaLocationDot } from 'react-icons/fa6';

export default function HotelDescription({
 dic,
 hotelInfo,
}: {
 dic: PreviewHotelDictionary;
 hotelInfo: HotelInfo;
}) {
 return (
  <section
   id='hotelDescription'
   className='scroll-mt-16 mb-4 p-4 rounded-md border border-primary bg-primary/5'
  >
   <h1 className='text-2xl text-primary font-medium mb-2'>
    <span>{hotelInfo.fName}</span>
   </h1>
   <div className='text-sm lg:text-[0.9rem] text-neutral-600 dark:text-neutral-400 mb-3'>
    <FaLocationDot className='inline size-5 text-rose-700 dark:text-rose-400' />
    <p className='inline ms-2 font-medium'>
     {hotelInfo.address || dic.hotelInfo.unknownAddress}
    </p>
   </div>
   <div className='mb-4 grid grid-cols-2 md:grid-cols-4 gap-4 font-medium text-sm text-neutral-600 pb-4 border-b border-neutral-400 dark:border-neutral-600'>
    <div className='flex text-center flex-col gap-1 items-center p-2 rounded-md bg-neutral-200 dark:bg-neutral-800 border border-neutral-400 dark:border-neutral-600'>
     <span>{dic.hotelDatePicker.arrivalTime}</span>
     <span>{hotelInfo.checkin || '---'}</span>
    </div>
    <div className='flex text-center flex-col gap-1 items-center p-2 rounded-md bg-neutral-200 dark:bg-neutral-800 border border-neutral-400 dark:border-neutral-600'>
     <span>{dic.hotelDatePicker.departureTime}</span>
     <span>{hotelInfo.checkout || '---'}</span>
    </div>
    <div className='flex text-center flex-col gap-1 items-center p-2 rounded-md bg-neutral-200 dark:bg-neutral-800 border border-neutral-400 dark:border-neutral-600'>
     <span>{dic.hotelDescription.floors}</span>
     <span>{hotelInfo.floors || '---'}</span>
    </div>
    <div className='flex text-center flex-col gap-1 items-center p-2 rounded-md bg-neutral-200 dark:bg-neutral-800 border border-neutral-400 dark:border-neutral-600'>
     <span>{dic.hotelDescription.rooms}</span>
     <span>{hotelInfo.roomsCount || '---'}</span>
    </div>
   </div>
   <p className='text-sm text-neutral-600 dark:text-neutral-400 leading-6 rtl:text-justify font-medium'>
    {hotelInfo.description || '---'}
   </p>
  </section>
 );
}
