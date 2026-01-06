import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import HotelInfo from './HotelInfo';
import HotelGallery from './HotelGallery';

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
     <div className='h-80 bg-red-50 sticky top-0'></div>
    </div>
   </div>
  </>
 );
}
