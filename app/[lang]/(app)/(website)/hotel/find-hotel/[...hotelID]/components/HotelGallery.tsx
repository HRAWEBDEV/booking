'use client';
import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import { useKeenSlider } from 'keen-slider/react';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';

export default function HotelGallery({ dic }: { dic: PreviewHotelDictionary }) {
 const { localeInfo } = useBaseConfig();
 const [bannerSlideRef] = useKeenSlider({
  rtl: localeInfo.contentDirection === 'rtl',
 });
 const [sliderRef] = useKeenSlider({
  rtl: localeInfo.contentDirection === 'rtl',
  breakpoints: {
   '(max-width:1280px)': {
    slides: {
     perView: 8,
     spacing: 4,
    },
   },
   '(max-width:980px)': {
    slides: {
     perView: 6,
     spacing: 4,
    },
   },
   '(max-width:700px)': {
    slides: {
     perView: 4,
     spacing: 4,
    },
   },
  },
  slides: {
   perView: 8,
   spacing: 4,
  },
 });
 return (
  <section className='grid grid-cols-1 mb-4'>
   <div
    ref={bannerSlideRef}
    className='keen-slider mb-2 overflow-hidden rounded-lg'
   >
    {Array.from({ length: 10 }, (_, i) => i).map((i) => (
     <div
      className='keen-slider__slide rounded-lg h-92 overflow-hidden'
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
   <div className='hidden md:block'>
    <div ref={sliderRef} className='keen-slider'>
     {Array.from({ length: 10 }, (_, i) => i).map((i) => (
      <button className='keen-slider__slide rounded-lg size-20' key={i}>
       <img
        src='/images/hotelGallery.jpg'
        alt='hotel image'
        className='h-full w-full object-cover object-center'
       />
      </button>
     ))}
    </div>
   </div>
  </section>
 );
}
