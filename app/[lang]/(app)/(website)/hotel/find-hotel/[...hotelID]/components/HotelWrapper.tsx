import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import HotelInfo from './HotelInfo';
import HotelGallery from './HotelGallery';
import HotelDatePicker from './HotelDatePicker';

export default function HotelWrapper({ dic }: { dic: PreviewHotelDictionary }) {
 return (
  <>
   <HotelInfo dic={dic} />
   <div className='flex gap-4 mb-4'>
    <div className='grow overflow-hidden'>
     <HotelGallery dic={dic} />
     <div className='h-[2000px]'></div>
    </div>
    <div className='w-[18rem] shrink-0'>
     <HotelDatePicker dic={dic} />
    </div>
   </div>
  </>
 );
}
