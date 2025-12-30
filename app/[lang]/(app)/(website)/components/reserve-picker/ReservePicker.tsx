import ReservePickerTypes from './ReservePickerTypes';
import ReserveTypeForm from './ReserveTypeForm';
export default function ReservePicker() {
 return (
  <div className='-mt-[calc(var(--website-hero-height)/2)] mb-4 px-1 md:px-4'>
   <ReservePickerTypes />
   <ReserveTypeForm />
  </div>
 );
}
