'use client';
import HotelDatePicker from './HotelDatePicker';
import useStickyScroll from '@/utils/useStickyScroll';
import { PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import { type HotelInfo as HotelInfoData } from '../../../services/hotelApiActions';
export default function HotelDatePickerWrapper({
 dic,
 hotelInfo,
}: {
 dic: PreviewHotelDictionary;
 hotelInfo: HotelInfoData;
}) {
 const { containerRef } = useStickyScroll(16, 768);

 return (
  <div ref={containerRef} className=' hidden md:block'>
   <HotelDatePicker dic={dic} hotelInfo={hotelInfo} />
  </div>
 );
}
