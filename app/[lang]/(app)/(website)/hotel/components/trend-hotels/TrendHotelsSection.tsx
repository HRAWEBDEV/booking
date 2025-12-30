'use client';
import { type HotelHomePageDictionary } from '@/internalization/app/dictionaries/website/hotel/home/dictionary';
import { useKeenSlider } from 'keen-slider/react';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function TrendHotelsSection({
 dic,
}: {
 dic: HotelHomePageDictionary;
}) {
 const { localeInfo } = useBaseConfig();
 const [sliderRef] = useKeenSlider({
  rtl: localeInfo.contentDirection === 'rtl',
  breakpoints: {
   '(min-width: 400px)': {
    slides: { perView: 2, spacing: 5 },
   },
   '(min-width: 600px)': {
    slides: { perView: 3, spacing: 5 },
   },
   '(min-width: 1000px)': {
    slides: { perView: 4, spacing: 10 },
   },
  },
  slides: { perView: 1, spacing: 5 },
 });
 return (
  <section className='px-2 md:px-4 w-[min(100%,var(--website-container-max-width))] mx-auto py-4'>
   <div className='mb-4'>
    <h2 className='font-medium text-xl'>{dic.trendSections.title}</h2>
   </div>
   <div ref={sliderRef} className='keen-slider'>
    {Array.from({ length: 6 }, (_, i) => i).map((i) => (
     <article key={i} className='keen-slider__slide number-slide1'>
      <Link href='#' className='flex flex-col border border-input rounded-md'>
       <div className='h-52 border border-input rounded-md rounded-ee-none rounded-es-none overflow-hidden'>
        <img
         alt='city'
         src='/images/qeshm.avif'
         className='w-full h-full object-center object-cover'
        />
       </div>
       <div className='p-2'>
        <div className='mb-2'>
         <h3 className='font-medium text-base mb-1'>هتل آریا کیش</h3>
         <p className='text-xs text-neutral-600 dark:text-neutral-400'>
          کیش، خیابان هفدهدم
         </p>
        </div>
        <div className='flex gap-2 flex-wrap items-center justify-between'>
         <div>
          <span className='me-1 text-xs text-neutral-600 dark:text-neutral-400'>
           {dic.trendSections.from}
          </span>
          <span className='font-medium'>25,000,000</span>
          <span className='ms-1 text-sm'>تومان</span>
          <span className='ms-1 text-xs text-neutral-600 dark:text-neutral-400'>
           / ۱ {dic.trendSections.night}
          </span>
         </div>
         <div>
          <Badge variant='secondary'>۲۵٪ {dic.trendSections.discount}</Badge>
         </div>
        </div>
       </div>
      </Link>
     </article>
    ))}
   </div>
  </section>
 );
}
