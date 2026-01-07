import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import { type HotelInfo } from '../../services/hotelApiActions';

export default function HotelCancelPolicies({
 dic,
 hotelInfo,
}: {
 dic: PreviewHotelDictionary;
 hotelInfo: HotelInfo;
}) {
 return (
  <section
   id='cancelPolicies'
   className='scroll-mt-16 mb-4 p-4 shadow-md rounded-md dark:border dark:border-input'
  >
   <h3 className='text-lg font-medium text-rose-700 dark:text-rose-400 mb-2'>
    {dic.hotelCancelPolicies.title}
   </h3>
   <p className='text-sm text-neutral-600 dark:text-neutral-400'>
    {hotelInfo.publicRules || '---'}
   </p>
  </section>
 );
}
