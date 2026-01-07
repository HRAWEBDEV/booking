import { type HotelInfo } from '../services/hotelApiActions';
import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import { FaLocationDot } from 'react-icons/fa6';
import { FaStar } from 'react-icons/fa6';
import { FaShareAlt } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

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
      className='size-4 text-neutral-200 dark:text-neutral-800 data-[active="true"]:text-orange-400 data-[active="true"]:dark:text-orange-800'
     />
    ))}
    <span className='text-xs text-neutral-500'>
     ({hotelInfo.hotelGradeID}) {dic.hotelInfo.star}
    </span>
   </div>
   <h1 className='text-2xl lg:text-3xl font-medium mb-2'>
    <Button
     title={dic.hotelInfo.share}
     variant='ghost'
     size='icon'
     className='text-neutral-500'
    >
     <FaShareAlt />
    </Button>
    <span>{hotelInfo.fName}</span>
   </h1>
   <div className='text-sm lg:text-[0.9rem] text-neutral-600 dark:text-neutral-400'>
    <FaLocationDot className='inline size-4 text-rose-700 dark:text-rose-400' />
    <p className='inline ms-2'>
     {hotelInfo.address || dic.hotelInfo.unknownAddress}
    </p>
   </div>
  </div>
 );
}
