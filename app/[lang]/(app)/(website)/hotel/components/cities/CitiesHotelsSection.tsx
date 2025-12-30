'use client';
import { type HotelHomePageDictionary } from '@/internalization/app/dictionaries/website/hotel/home/dictionary';
import { useKeenSlider } from 'keen-slider/react';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import Link from 'next/link';

export default function CitiesHotelsSection({
 dic,
}: {
 dic: HotelHomePageDictionary;
}) {
 const { localeInfo } = useBaseConfig();
 const [sliderRef] = useKeenSlider({
  rtl: localeInfo.contentDirection === 'rtl',
  breakpoints: {
   '(min-width: 400px)': {
    slides: { perView: 3.2, spacing: 5 },
   },
   '(min-width: 600px)': {
    slides: { perView: 4.2, spacing: 5 },
   },
   '(min-width: 1000px)': {
    slides: { perView: 5.2, spacing: 10 },
   },
  },
  slides: { perView: 2.2, spacing: 5 },
 });
 return (
  <section className='px-2 md:px-4 w-[min(100%,var(--website-container-max-width))] mx-auto py-4 mb-4'>
   <div className='mb-4'>
    <h2 className='font-medium text-xl'>{dic.citiesSection.title}</h2>
   </div>
   <div ref={sliderRef} className='keen-slider'>
    {Array.from({ length: 6 }, (_, i) => i).map((i) => (
     <div key={i} className='keen-slider__slide number-slide1'>
      <Link href='#' className='flex flex-col gap-2'>
       <div className='h-52 border border-input rounded-md'></div>
       <p className='text-center font-medium text-base text-neutral-700 dark:text-neutral-400'>
        همدان
       </p>
      </Link>
     </div>
    ))}
   </div>
  </section>
 );
}
