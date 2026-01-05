'use client';

import {
 Card,
 CardContent,
 CardFooter,
 CardHeader,
} from '@/components/ui/card';
import { useKeenSlider } from 'keen-slider/react';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ImageMinus, Star } from 'lucide-react';
import { ShareDictionary } from '@/internalization/app/dictionaries/share/dictionary';
import { Badge } from '@/components/ui/badge';

export default function HotelListItem({ dic }: { dic: ShareDictionary }) {
 const { localeInfo } = useBaseConfig();
 const [currentSlide, setCurrentSlide] = useState(0);
 const [slidesCount, setSlidesCount] = useState(0);
 const [sliderRef, instanceRef] = useKeenSlider({
  initial: 0,
  slideChanged(slider) {
   setCurrentSlide(slider.track.details.rel);
  },
  created(slider) {
   setSlidesCount(slider.track.details.slides.length);
  },
  rtl: localeInfo.contentDirection === 'rtl',
  slides: { perView: 1, spacing: 16 },
 });

 return (
  <Card className='w-full! shadow-none pt-0! gap-4'>
   <CardHeader className='px-0!'>
    <div ref={sliderRef} className='keen-slider relative'>
     {Array.from({ length: 2 }, (_, i) => i).map((i) => (
      <div key={i} className='keen-slider__slide cursor-pointer'>
       <div className='h-52 border border-input rounded-xl rounded-b-none overflow-hidden bg-gray-200 dark:bg-gray-600 flex items-center justify-center gap-4 w-full'>
        <ImageMinus className='text-gray-600 dark:text-gray-300' size={64} />
       </div>
      </div>
     ))}
     {slidesCount > 0 && (
      <div className='flex justify-center gap-2 py-3 absolute bottom-0 left-0 right-0'>
       {[...Array(slidesCount).keys()].map((idx) => (
        <button
         key={idx}
         onClick={() => instanceRef.current?.moveToIdx(idx)}
         className={`h-2 border cursor-pointer border-gray-300 rounded-full transition-all ${
          currentSlide === idx
           ? 'bg-white w-6'
           : 'bg-gray-200/80 hover:bg-white w-2'
         }`}
        />
       ))}
      </div>
     )}
    </div>
   </CardHeader>
   <CardContent className=''>
    <div className='flex items-center justify-between'>
     <span className='font-medium text-md'>
      {dic.find_hotel.hotel_card.mock_title}
     </span>
     <span className='flex items-center justify-center gap-1'>
      {Array.from({ length: 5 }, (_, i) => i).map((i) => (
       <Star key={i} size={16} fill='#ed6c02' stroke='#ed6c02' />
      ))}
     </span>
    </div>
    <div className='py-2'>
     <span className='text-sm text-muted-foreground'>
      {dic.find_hotel.hotel_card.mock_location}
     </span>
    </div>
    <div className='flex items-center gap-2 flex-wrap'>
     {dic?.find_hotel?.hotel_card?.mock_amentities
      ?.slice(0, 3)
      .map((item, index) => (
       <Badge
        key={index}
        variant='outline'
        className='p-2 px-4 rounded-lg text-gray-600 dark:text-gray-300'
       >
        {item}
       </Badge>
      ))}
     {(dic?.find_hotel?.hotel_card?.mock_amentities?.length ?? 0) > 3 && (
      <Badge
       variant='outline'
       className='p-2 px-4 rounded-lg text-gray-600 dark:text-gray-300'
      >
       +{(dic?.find_hotel?.hotel_card?.mock_amentities?.length ?? 0) - 3}
      </Badge>
     )}
    </div>
   </CardContent>
   <CardFooter className='gap-2 flex items-center justify-between!'>
    <div className='flex gap-1 items-center w-full'>
     <span>{dic.find_hotel.hotel_card.from_text}</span>
     <span className=''>
      {dic.find_hotel.hotel_card.mock_base_price}
      <span className='text-xs text-muted-foreground'>
       / {dic.find_hotel.hotel_card.resident_unit}
      </span>
     </span>
    </div>
    <Button
     variant='ghost'
     className='text-sm bg-primary rounded-md text-gray-200 hover:text-gray-300 dark:text-gray-600 dark:hover:text-gray-400 hover:bg-primary/90 dark:hover:bg-primary/90 cursor-pointer'
    >
     {dic.find_hotel.hotel_card.view_more_button}
    </Button>
   </CardFooter>
  </Card>
 );
}
