import { Suspense } from 'react';
import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import HotelInfo from './HotelInfo';
import HotelGallery from './HotelGallery';
import HotelDatePicker from './HotelDatePicker';
import HotelMenuBar from './HotelMenuBar';
import HotelDescription from './hotel-description/HotelDescription';
import HotelFacilities from './hotel-facilities/HotelFacilities';
import HotelRooms from './hotel-rooms/HotelRooms';
import HotelCancelPolicies from './hotel-cancel-policies/HotelCancelPolicies';
import {
 type HotelInfo as HotelInfoData,
 type HotelFacility,
 type HotelImage,
} from '../services/hotelApiActions';
import HotelConfigProvider from '../services/hotel-config/HotelConfigProvider';
import { Skeleton } from '@/components/ui/skeleton';

export default function HotelWrapper({
 dic,
 hotelInfo,
 hotelFacilityPromise,
 hotelImages,
 fromDate,
 toDate,
 hotelID,
}: {
 dic: PreviewHotelDictionary;
 hotelInfo: HotelInfoData;
 hotelImages: HotelImage[] | null;
 hotelFacilityPromise: Promise<HotelFacility[] | null>;
 fromDate: string;
 toDate: string;
 hotelID: string;
}) {
 return (
  <HotelConfigProvider
   hotelInfo={hotelInfo}
   dic={dic}
   fromDate={fromDate}
   toDate={toDate}
   hotelID={hotelID}
  >
   <HotelInfo dic={dic} hotelInfo={hotelInfo} />
   <div className='grid md:grid-cols-[1fr_18rem] gap-4 mb-4'>
    <div className='grid grid-cols-1'>
     <HotelGallery dic={dic} hotelImages={hotelImages} />
     <HotelMenuBar dic={dic} />
     <div className='block md:hidden'>
      <HotelDatePicker dic={dic} hotelInfo={hotelInfo} />
     </div>
     <Suspense fallback={<Skeleton className='h-36 mb-4' />}>
      <HotelFacilities dic={dic} hotelFacilityPromise={hotelFacilityPromise} />
     </Suspense>
     <HotelRooms dic={dic} />
     <HotelDescription dic={dic} hotelInfo={hotelInfo} />
     <HotelCancelPolicies dic={dic} hotelInfo={hotelInfo} />
    </div>
    <div>
     <div className='sticky top-1 hidden md:block'>
      <HotelDatePicker dic={dic} hotelInfo={hotelInfo} />
     </div>
    </div>
   </div>
  </HotelConfigProvider>
 );
}
