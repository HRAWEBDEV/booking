'use client';
import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import { Button } from '@/components/ui/button';
import { useKeenSlider } from 'keen-slider/react';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { Badge } from '@/components/ui/badge';

export default function HotelRoom({ dic }: { dic: PreviewHotelDictionary }) {
 const { localeInfo } = useBaseConfig();
 const [bannerSlideRef] = useKeenSlider({
  rtl: localeInfo.contentDirection === 'rtl',
 });
 return (
  <article className='shadow-lg rounded-md p-3 flex flex-col lg:flex-row overflow-hidden dark:border dark:border-input'>
   <div
    className='mb-4 keen-slider rounded-md overflow-hidden lg:mb-0 lg:me-4 lg:basis-44 grow-0'
    ref={bannerSlideRef}
   >
    {Array.from({ length: 10 }, (_, i) => i).map((i) => (
     <div
      className='keen-slider__slide h-56 lg:h-44 rounded-md overflow-hidden'
      key={i}
     >
      <img
       src='/images/hotelGallery.jpg'
       alt='hotel image'
       className='h-full w-full object-cover object-center'
      />
     </div>
    ))}
   </div>
   <main className='grow mb-2'>
    <h3 className='text-lg font-medium'>اتاق دو تخته دابل</h3>
    <p className='font-medium text-neutral-600 dark:text-neutral-400'>
     1 {dic.hotelRooms.person}
    </p>
   </main>
   <footer className='flex flex-col lg:justify-end lg:basis-52'>
    <div className='mb-4 flex gap-4 items-end flex-wrap lg:gap-1 lg:justify-center'>
     <div className='lg:order-2'>
      <span className='font-medium text-lg'>25,000,000</span>
      <span className='ms-1 text-sm'>ریال</span>
      <span className='ms-1 text-sm text-neutral-600 dark:text-neutral-400'>
       / ۱ {dic.hotelRooms.nights}
      </span>
     </div>
     <div className='flex gap-1 items-end'>
      <Badge variant='secondary' className='size-7'>
       ۲۵٪
      </Badge>
      <div className='line-through text-sm text-red-700 dark:text-red-400'>
       <span className='font-medium'>25,000,000</span>
       <span className='ms-1 text-sm'>ریال</span>
      </div>
     </div>
    </div>
    <div className='flex flex-col gap-2'>
     <Button size='lg' className='w-full'>
      {dic.hotelRooms.addRoom}
     </Button>
     <Button variant='outline' size='lg' className='w-full'>
      {dic.hotelRooms.viewPricingCalendar}
     </Button>
    </div>
   </footer>
  </article>
 );
}
