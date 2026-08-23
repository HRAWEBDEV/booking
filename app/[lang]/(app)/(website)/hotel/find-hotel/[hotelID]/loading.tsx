import HotelInfoLoading from './components/HotelInfoLoading';
import HotelGalleryLoading from './components/HotelGalleryLoading';
import HotelMenuBarLoading from './components/HotelMenuBarLoading';
import HotelFacilitiesLoading from './components/hotel-facilities/HotelFacilitiesLoading';
import HotelRoomsLoading from './components/hotel-rooms/HotelRoomsLoading';
import HotelDescriptionLoading from './components/hotel-description/HotelDescriptionLoading';
import HotelCancelPoliciesLoading from './components/hotel-cancel-policies/HotelCancelPoliciesLoading';
import HotelLocationLoading from './components/HotelLocationLoading';
import HotelDatePickerLoading, {
 HotelDatePickerMobileBarLoading,
} from './components/HotelDatePickerLoading';

export default function Loading() {
 return (
  <div className='w-full min-h-[calc(100svh-var(--website-header-height))]'>
   <HotelInfoLoading />

   <div className='grid md:grid-cols-[1fr_18rem] gap-4 mb-4'>
    <div className='grid grid-cols-1'>
     <HotelGalleryLoading />

     <div className='md:sticky md:top-3 z-3'>
      <HotelMenuBarLoading />
     </div>

     <div className='block md:hidden'>
      <HotelDatePickerMobileBarLoading />
     </div>

     <HotelFacilitiesLoading />

     <HotelRoomsLoading />

     <HotelDescriptionLoading />

     <div className='mb-4 block md:hidden'>
      <HotelLocationLoading />
     </div>

     <HotelCancelPoliciesLoading />
    </div>

    <div className='hidden md:block'>
     <div className='mb-4'>
      <HotelLocationLoading />
     </div>
     <HotelDatePickerLoading />
    </div>
   </div>
  </div>
 );
}
