import { type HotelInfo } from '../../../services/hotelApiActions';
import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import { FaLocationDot } from 'react-icons/fa6';
import { FaStar } from 'react-icons/fa6';
import ShareHotelButton from './ShareHotelButton';
import HotelLocationDrawer from './HotelLocationDrawer';

export default function HotelTitle({
 dic,
 hotelInfo,
}: {
 dic: PreviewHotelDictionary;
 hotelInfo: HotelInfo;
}) {
 return (
  <div className='py-4'>
   <div className='flex gap-1 mb-2 items-center'>
    {Array.from({ length: 5 }, (_, i) => i).map((i) => (
     <FaStar
      data-active={i < (hotelInfo.hotelGradeID || 0)}
      key={i}
      className='size-6 text-neutral-200 dark:text-neutral-800 data-[active="true"]:text-orange-400 data-[active="true"]:dark:text-orange-800'
     />
    ))}
    <span className='text-md text-neutral-500'>
     ({hotelInfo.hotelGradeID}) {dic.hotelInfo.star}
    </span>
   </div>
   <div className='mb-2 flex gap-2 justify-between'>
    <h1 className='text-2xl lg:text-3xl font-medium grow'>
     <ShareHotelButton dic={dic} />
     <span>{hotelInfo.fName}</span>
    </h1>
    <div className='md:hidden'>
     <HotelLocationDrawer hotelInfo={hotelInfo} dic={dic} />
    </div>
   </div>
   <div className='text-sm lg:text-[0.9rem] text-neutral-600 dark:text-neutral-400'>
    <FaLocationDot className='inline size-4 text-rose-700 dark:text-rose-400' />
    <p className='inline ms-2'>
     {hotelInfo.address || dic.hotelInfo.unknownAddress}
    </p>
   </div>
  </div>
 );
}
