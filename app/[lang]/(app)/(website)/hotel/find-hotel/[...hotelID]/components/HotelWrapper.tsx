import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import HotelInfo from './HotelInfo';
import HotelGallery from './HotelGallery';
import HotelDatePicker from './HotelDatePicker';
import HotelMenuBar from './HotelMenuBar';
import HotelDescription from './hotel-description/HotelDescription';
import HotelFacilities from './hotel-facilities/HotelFacilities';
import HotelRooms from './hotel-rooms/HotelRooms';

export default function HotelWrapper({ dic }: { dic: PreviewHotelDictionary }) {
 return (
  <>
   <HotelInfo dic={dic} />
   <div className='grid md:grid-cols-[1fr_18rem] gap-4 mb-4'>
    <div className='grid grid-cols-1'>
     <HotelGallery dic={dic} />
     <HotelMenuBar dic={dic} />
     <div className='block md:hidden'>
      <HotelDatePicker dic={dic} />
     </div>
     <HotelFacilities dic={dic} />
     <HotelRooms dic={dic} />
     <HotelDescription dic={dic} />
    </div>
    <div>
     <div className='sticky top-1 hidden md:block'>
      <HotelDatePicker dic={dic} />
     </div>
    </div>
   </div>
  </>
 );
}
