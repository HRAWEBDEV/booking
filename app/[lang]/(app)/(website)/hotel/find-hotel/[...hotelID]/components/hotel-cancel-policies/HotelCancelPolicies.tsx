import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';

export default function HotelCancelPolicies({
 dic,
}: {
 dic: PreviewHotelDictionary;
}) {
 return (
  <section
   id='cancelPolicies'
   className='scroll-mt-16 mb-4 p-4 shadow-md rounded-md dark:border dark:border-input'
  >
   <h3 className='text-lg font-medium text-rose-700 dark:text-rose-400'>
    {dic.hotelCancelPolicies.title}
   </h3>
   <p className='text-sm text-neutral-600 dark:text-neutral-400'>
    لورم ايپسوم متن ساختگي با توليد سادگي نامفهوم از صنعت چاپ، و با استفاده از
    طراحان گرافيک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که
    لازم است، و براي شرايط فعلي تکنولوژي مورد نياز، و کاربردهاي متنوع با هدف
   </p>
  </section>
 );
}
