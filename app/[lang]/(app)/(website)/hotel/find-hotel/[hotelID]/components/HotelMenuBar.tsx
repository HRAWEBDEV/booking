'use client';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import { useKeenSlider } from 'keen-slider/react';
import Link from 'next/link';

export default function HotelMenuBar({ dic }: { dic: PreviewHotelDictionary }) {
 const { localeInfo } = useBaseConfig();
 const [sliderRef] = useKeenSlider({
  rtl: localeInfo.contentDirection === 'rtl',
  slides: {
   perView: 4,
  },
 });

 return (
  <section className='bg-neutral-200 dark:bg-neutral-800 shadow-lg rounded-md mb-4 md:sticky top-1 overflow-hidden z-1 border border-neutral-400 dark:border-neutral-600'>
   <nav ref={sliderRef} className='keen-slider'>
    {Object.keys(dic.hotelMenuBar).map((key) => {
     return (
      <Link
       key={key}
       className='keen-slider__slide text-center p-1 py-2 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-sm text-neutral-600 dark:text-neutral-400 font-medium shrink-0'
       href={`#${key}`}
      >
       {dic.hotelMenuBar[key as keyof typeof dic.hotelMenuBar]}
      </Link>
     );
    })}
   </nav>
  </section>
 );
}
