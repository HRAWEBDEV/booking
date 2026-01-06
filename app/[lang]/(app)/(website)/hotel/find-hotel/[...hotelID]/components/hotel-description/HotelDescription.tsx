import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';

export default function HotelDescription({
 dic,
}: {
 dic: PreviewHotelDictionary;
}) {
 return (
  <section
   id='hotelDescription'
   className='mb-4 p-4 shadow-md rounded-md dark:border dark:border-input'
  >
   <h1 className='text-2xl text-primary font-medium mb-4'>
    <span>هتل کیش</span>
   </h1>
   <div className='mb-2 grid grid-cols-2 md:grid-cols-4 gap-4 font-medium text-sm text-neutral-600 pb-2 border-b border-input'>
    <div className='flex text-center flex-col gap-1 items-center p-2 rounded-md bg-neutral-100 dark:bg-neutral-900'>
     <span>{dic.hotelDatePicker.arrivalTime}</span>
     <span>12:00</span>
    </div>
    <div className='flex text-center flex-col gap-1 items-center p-2 rounded-md bg-neutral-100 dark:bg-neutral-900'>
     <span>{dic.hotelDatePicker.departureTime}</span>
     <span>12:00</span>
    </div>
    <div className='flex text-center flex-col gap-1 items-center p-2 rounded-md bg-neutral-100 dark:bg-neutral-900'>
     <span>{dic.hotelDescription.floors}</span>
     <span>25</span>
    </div>
    <div className='flex text-center flex-col gap-1 items-center p-2 rounded-md bg-neutral-100 dark:bg-neutral-900'>
     <span>{dic.hotelDescription.rooms}</span>
     <span>12</span>
    </div>
   </div>
   <p className='text-sm text-neutral-600 dark:text-neutral-400'>
    لورم ايپسوم متن ساختگي با توليد سادگي نامفهوم از صنعت چاپ، و با استفاده از
    طراحان گرافيک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که
    لازم است، و براي شرايط فعلي تکنولوژي مورد نياز، و کاربردهاي متنوع با هدف
    بهبود ابزارهاي کاربردي مي باشد، کتابهاي زيادي در شصت و سه درصد گذشته حال و
    آينده، شناخت فراوان جامعه و متخصصان را مي طلبد، تا با نرم افزارها شناخت
    بيشتري را براي طراحان رايانه اي علي الخصوص طراحان خلاقي، و فرهنگ پيشرو در
    زبان فارسي ايجاد کرد، در اين صورت مي توان اميد داشت که تمام و دشواري موجود
    در ارائه راهکارها، و شرايط سخت تايپ به پايان رسد و زمان مورد نياز شامل
    حروفچيني دستاوردهاي اصلي، و جوابگوي سوالات پيوسته اهل دنياي موجود طراحي
    اساسا مورد استفاده قرار گيرد
   </p>
  </section>
 );
}
