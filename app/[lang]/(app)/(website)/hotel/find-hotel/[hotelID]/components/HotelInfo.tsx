import { type HotelInfo } from '../../../services/hotelApiActions';
import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import { FaLocationDot } from 'react-icons/fa6';
import ShareHotelButton from './ShareHotelButton';
import HotelLocationDrawer from './HotelLocationDrawer';
import HotelStars from '../../../components/HotelStars';

export default function HotelTitle({
 dic,
 hotelInfo,
}: {
 dic: PreviewHotelDictionary;
 hotelInfo: HotelInfo;
}) {
 return (
  <div className='py-4'>
   <div className='mb-2'>
    <HotelStars
     grade={hotelInfo.hotelGradeID || 0}
     label={dic.hotelInfo.star}
    />
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
