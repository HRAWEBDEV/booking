'use client';
import { useState } from 'react';
import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import { Button } from '@/components/ui/button';
import { useKeenSlider } from 'keen-slider/react';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { Badge } from '@/components/ui/badge';
import { FiMinus, FiPlus } from 'react-icons/fi';

export default function HotelRoom({ dic }: { dic: PreviewHotelDictionary }) {
 const [sliderCount, setSliderCount] = useState(0);
 const [activeSliderIndex, setActiveSliderIndex] = useState(0);
 const { localeInfo } = useBaseConfig();
 const [bannerSlideRef, instanceRef] = useKeenSlider({
  rtl: localeInfo.contentDirection === 'rtl',
  created(slider) {
   setSliderCount(slider.track.details.slidesLength);
  },
  slideChanged(slider) {
   setActiveSliderIndex(slider.track.details.rel);
  },
 });
 return (
  <article className='shadow-lg rounded-md p-3 flex flex-col lg:flex-row overflow-hidden dark:border dark:border-input'>
   <div
    className='mb-4 keen-slider rounded-md overflow-hidden lg:mb-0 lg:me-4 lg:basis-44 grow-0 relative'
    ref={bannerSlideRef}
   >
    {Array.from({ length: 3 }, (_, i) => i).map((i) => (
     <div
      className='keen-slider__slide h-56 lg:h-44 rounded-md overflow-hidden'
      key={i}
     >
      <img
       src='/images/hotelGallery.jpg'
       alt='hotel image'
       className='h-full w-full object-cover object-center'
       loading='lazy'
      />
     </div>
    ))}
    <div className='flex justify-center gap-2 py-3 absolute bottom-0 left-0 right-0'>
     {Array.from({ length: sliderCount }, (_, i) => i).map((idx) => (
      <button
       key={idx}
       onClick={() => {
        instanceRef.current?.moveToIdx(idx);
       }}
       className={`h-2 border cursor-pointer border-gray-300 rounded-full transition-all ${
        activeSliderIndex === idx
         ? 'bg-white w-6'
         : 'bg-gray-200/80 hover:bg-white w-2'
       }`}
      />
     ))}
    </div>
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
      <div className='text-sm text-red-700 dark:text-red-400'>
       <span className='font-medium line-through'>25,000,000</span>
       <span className='ms-1 text-sm'>ریال</span>
      </div>
     </div>
    </div>
    <div className='flex flex-col gap-2'>
     <div className='flex gap-4 items-center w-[min(100%,9rem)] mx-auto'>
      <Button variant='outline' size='icon-lg'>
       <FiMinus className='size-4' />
      </Button>
      <div className='grow text-center text-primary text-lg font-medium'>5</div>
      <Button size='icon-lg'>
       <FiPlus className='size-4' />
      </Button>
     </div>
     {/* <Button size='lg' className='w-full'> */}
     {/*  <FiPlus className='size-4' /> */}
     {/*  {dic.hotelRooms.addRoom} */}
     {/* </Button> */}
     <Button variant='outline' size='lg' className='w-full'>
      {dic.hotelRooms.viewPricingCalendar}
     </Button>
    </div>
   </footer>
  </article>
 );
}
