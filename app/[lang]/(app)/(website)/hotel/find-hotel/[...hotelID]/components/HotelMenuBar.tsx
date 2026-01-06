'use client';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import { useKeenSlider } from 'keen-slider/react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HotelMenuBar({ dic }: { dic: PreviewHotelDictionary }) {
 const { localeInfo } = useBaseConfig();
 const [sliderRef] = useKeenSlider({
  rtl: localeInfo.contentDirection === 'rtl',
  breakpoints: {
   '(max-width:700px)': {
    slides: {
     perView: 4,
    },
   },
  },
  slides: {
   perView: 4,
  },
 });

 return (
  <section className='shadow-lg rounded-md border border-input mb-4 sticky top-4 bg-background'>
   <nav ref={sliderRef} className='keen-slider'>
    {Object.keys(dic.hotelMenuBar).map((key) => {
     return (
      <Button
       variant='ghost'
       size='icon'
       className='keen-slider__slide cursor-pointer text-neutral-500'
       key={key}
       asChild
      >
       <Link href={`#${key}`}>
        {dic.hotelMenuBar[key as keyof typeof dic.hotelMenuBar]}
       </Link>
      </Button>
     );
    })}
   </nav>
  </section>
 );
}
