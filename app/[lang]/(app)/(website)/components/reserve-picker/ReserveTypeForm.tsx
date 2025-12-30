import HotelReserveTypeForm from './hotel/HotelReserveTypeForm';

export default function ReserveTypeForm() {
 return (
  <div className='bg-background p-4 rounded-md w-[min(100%,var(--website-container-max-width))] mx-auto shadow-md md:py-6'>
   <HotelReserveTypeForm />
  </div>
 );
}
