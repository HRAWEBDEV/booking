'use client';
import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import { FaMapPin } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import { type HotelInfo } from '../../../services/hotelApiActions';
import HotelLocationDrawer from './HotelLocationDrawer';

const HotelLocaltionMap = dynamic(() => import('./HotelLocationMap'), {
 ssr: false,
 loading: () => (
  <div className='h-full flex flex-col items-center justify-center text-center gap-2'>
   <FaMapPin className='size-20 text-neutral-600 dark:text-neutral-400' />
   <p className='text-sm font-medium text-neutral-600 dark:text-neutral-400'></p>
  </div>
 ),
});

export default function HotelLocation({
 dic,
 hotelInfo,
 isDrawer = false,
}: {
 dic: PreviewHotelDictionary;
 hotelInfo: HotelInfo;
 isDrawer?: boolean;
}) {
 return (
  <div
   data-is-drawer={isDrawer}
   className='h-44 data-[is-drawer="true"]:h-auto data-[is-drawer="true"]:grow w-full rounded-md bg-neutral-100 dark:bg-neutral-900 overflow-hidden relative border border-border'
  >
   {hotelInfo && (hotelInfo.latitude || hotelInfo.longitude) ? (
    <>
     {!isDrawer && (
      <div className='absolute top-2 start-2 z-2'>
       <HotelLocationDrawer dic={dic} hotelInfo={hotelInfo} />
      </div>
     )}
     <HotelLocaltionMap dic={dic} hotelInfo={hotelInfo} />
    </>
   ) : (
    <div className='h-full flex flex-col items-center justify-center text-center gap-2'>
     <FaMapPin className='size-20 text-neutral-600 dark:text-neutral-400' />
     <p className='text-sm font-medium text-neutral-600 dark:text-neutral-400'>
      {dic.hotelLocaltionMap.unkownLocation}
     </p>
    </div>
   )}
  </div>
 );
}
