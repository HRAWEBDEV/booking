import { Suspense } from 'react';
import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import HotelInfo from './HotelInfo';
import HotelGallery from './HotelGallery';
import HotelDatePicker from './HotelDatePicker';
import HotelMenuBar from './HotelMenuBar';
import HotelDescription from './hotel-description/HotelDescription';
import HotelFacilities from './hotel-facilities/HotelFacilities';
import HotelRooms from './hotel-rooms/HotelRooms';
import HotelRoomsLoading from './hotel-rooms/HotelRoomsLoading';
import HotelCancelPolicies from './hotel-cancel-policies/HotelCancelPolicies';
import {
 type HotelInfo as HotelInfoData,
 type HotelFacility,
 type HotelImage,
 type RoomInventory,
} from '../../../services/hotelApiActions';
import HotelConfigProvider from '../services/hotel-config/HotelConfigProvider';
import { Skeleton } from '@/components/ui/skeleton';
import HotelLocation from './HotelLocation';
import HotelDatePickerWrapper from './HotelDatePickerWrapper';

export default function HotelWrapper({
 dic,
 hotelInfo,
 hotelFacilityPromise,
 roomFacilityPromise,
 hotelImages,
 fromDate,
 toDate,
 hotelID,
 roomInventoriesPromise,
}: {
 dic: PreviewHotelDictionary;
 hotelInfo: HotelInfoData;
 hotelImages: HotelImage[] | null;
 hotelFacilityPromise: Promise<HotelFacility[] | null>;
 roomFacilityPromise: Promise<HotelFacility[] | null>;
 roomInventoriesPromise: Promise<RoomInventory[] | null>;
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
     <div className='md:sticky md:top-3'>
      <HotelMenuBar dic={dic} />
     </div>
     <div className='block md:hidden'>
      <HotelDatePicker dic={dic} hotelInfo={hotelInfo} />
     </div>
     <Suspense fallback={<Skeleton className='h-36 mb-4' />}>
      <HotelFacilities
       dic={dic}
       hotelFacilityPromise={hotelFacilityPromise}
       roomFacilityPromise={roomFacilityPromise}
      />
     </Suspense>
     <Suspense fallback={<HotelRoomsLoading />}>
      <HotelRooms dic={dic} roomInventoriesPromise={roomInventoriesPromise} />
     </Suspense>
     <HotelDescription dic={dic} hotelInfo={hotelInfo} />
     <div className='mb-4 block md:hidden'>
      <HotelLocation dic={dic} hotelInfo={hotelInfo} />
     </div>
     <HotelCancelPolicies dic={dic} hotelInfo={hotelInfo} />
    </div>
    <div>
     <div className='mb-4 hidden md:block'>
      <HotelLocation dic={dic} hotelInfo={hotelInfo} />
     </div>
     <HotelDatePickerWrapper dic={dic} hotelInfo={hotelInfo} />
    </div>
   </div>
  </HotelConfigProvider>
 );
}
