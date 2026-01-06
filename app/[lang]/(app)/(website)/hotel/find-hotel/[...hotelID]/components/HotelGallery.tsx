'use client';
import { useState } from 'react';
import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import { useKeenSlider } from 'keen-slider/react';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';

export default function HotelGallery({ dic }: { dic: PreviewHotelDictionary }) {
 const [activeBannerSliderIndex, setActiveBannderSliderIndex] = useState(0);
 const [bannerSliderCount, setBannerSliderCount] = useState(0);
 const { localeInfo } = useBaseConfig();
 const [bannerSlideRef, bannerSliderInstance] = useKeenSlider({
  rtl: localeInfo.contentDirection === 'rtl',
  slideChanged(slider) {
   setActiveBannderSliderIndex(slider.track.details.rel);
  },
  created(slider) {
   setBannerSliderCount(slider.track.details.slidesLength);
  },
 });
 const [sliderRef, instanceRef] = useKeenSlider({
  rtl: localeInfo.contentDirection === 'rtl',
  breakpoints: {
   '(max-width:980px)': {
    slides: {
     perView: 3.5,
     spacing: 4,
    },
   },
   '(max-width:700px)': {
    slides: {
     perView: 2.5,
     spacing: 4,
    },
   },
  },
  slides: {
   perView: 5.5,
   spacing: 4,
  },
 });

 return (
  <section className='grid grid-cols-1 mb-4'>
   <div
    ref={bannerSlideRef}
    className='keen-slider mb-2 overflow-hidden rounded-lg relative'
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
    <div className='flex justify-center gap-2 py-3 absolute bottom-0 left-0 right-0'>
     {Array.from({ length: bannerSliderCount }, (_, i) => i).map((idx) => (
      <button
       key={idx}
       onClick={() => {
        bannerSliderInstance.current?.moveToIdx(idx);
       }}
       className={`h-2 border cursor-pointer border-gray-300 rounded-full transition-all ${
        activeBannerSliderIndex === idx
         ? 'bg-white w-6'
         : 'bg-gray-200/80 hover:bg-white w-2'
       }`}
      />
     ))}
    </div>
   </div>
   <div className='hidden md:block'>
    <div ref={sliderRef} className='keen-slider relative'>
     {Array.from({ length: 10 }, (_, i) => i).map((i) => (
      <button
       className='keen-slider__slide rounded-lg size-20'
       key={i}
       onClick={() => {
        bannerSliderInstance.current?.moveToIdx(i);
       }}
      >
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
