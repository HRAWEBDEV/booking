'use client';

import { useKeenSlider } from 'keen-slider/react';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { useEffect, useState } from 'react';
import {
 Card,
 CardContent,
 CardFooter,
 CardHeader,
} from '@/components/ui/card';
import { ImageMinus, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { FindHotelDictionary } from '@/internalization/app/dictionaries/website/find-hotel/dictionary';
import useFindHotel from '../../../../services/find-hotel/FindHotelContext';
import { Button } from '@/components/ui/button';
import HotelItemRowAccordion from './HotelItemRowAccordion';

export default function HotelListItem({ dic }: { dic: FindHotelDictionary }) {
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
 const { isRowView } = useFindHotel();
 useEffect(() => {
  instanceRef.current?.update();
 }, [instanceRef, isRowView]);
 return (
  <div className='flex flex-col w-full max-w-full min-w-0'>
   <Card
    data-view={isRowView ? 'row' : 'grid'}
    className={`group w-full shadow-none py-4 data-[view='grid']:py-0 data-[view='row']:py-0 gap-4 flex! data-[view='row']:flex-row data-[view='grid']:flex-col data-[view='row']:items-center data-[view="row"]:rounded-b-none rounded-lg `}
   >
    <CardHeader className='px-0! gap-0 relative shrink-0 group-data-[view="row"]:basis-64'>
     <div
      ref={sliderRef}
      className='keen-slider relative overflow-hidden rounded-lg group-data-[view="grid"]:rounded-b-none group-data-[view="row"]:rounded-b-none group-data-[view="row"]:rounded-tl-none group-data-[view="row"]:rounded-r-lg'
     >
      {Array.from({ length: 2 }, (_, i) => i).map((i) => (
       <div
        key={i}
        className='keen-slider__slide cursor-grab active:cursor-grabbing overflow-hidden'
       >
        <div className='h-52 mx-auto border border-input rounded-lg group-data-[view="grid"]:rounded-b-none group-data-[view="row"]:rounded-b-none group-data-[view="row"]:rounded-tl-none group-data-[view="row"]:rounded-r-lg bg-gray-200 dark:bg-gray-600 flex items-center justify-center gap-4 w-full'>
         <ImageMinus className='text-gray-600 dark:text-gray-300' size={64} />
        </div>
       </div>
      ))}
      {slidesCount > 0 && (
       <div className='flex justify-center gap-2 py-3 absolute bottom-0 left-0 right-0'>
        {[...Array(slidesCount).keys()].map((idx) => (
         <button
          key={idx}
          onClick={() => instanceRef?.current?.moveToIdx(idx)}
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
    <Link
     href={'#'}
     className='flex group-data-[view="grid"]:flex-col grow h-full min-h-52 group-data-[view="row"]:py-4 group-data-[view="grid"]:pb-4'
    >
     <CardContent className='px-4 flex flex-col gap-4 group-data-[view="row"]:justify-between group-data-[view="row"]:items-start flex-1'>
      <div className='flex flex-col gap-2 justify-between group-data-[view="row"]:h-full'>
       <div className='flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
         <span className='flex items-center justify-ceter gap-1'>
          {Array.from({ length: 5 }, (_, i) => i).map((i) => (
           <Star key={i} size={12} fill='#ed6c02' stroke='#ed6c02' />
          ))}
         </span>
        </div>
        <h3 className='font-semibold text-lg'>{dic.hotelCard.mockTitle}</h3>
        <div>
         <p className='text-sm text-muted-foreground'>
          {dic.hotelCard.mockLocation}
         </p>
        </div>
       </div>
       <div className='flex items-center gap-1 flex-wrap'>
        {dic?.hotelCard?.mockAmentities?.slice(0, 3).map((item, index) => (
         <Badge
          key={index}
          variant='outline'
          className='p-1.5 rounded-lg text-gray-600 dark:text-gray-300'
         >
          {item}
         </Badge>
        ))}
        {(dic?.hotelCard?.mockAmentities?.length ?? 0) > 3 && (
         <Badge
          variant='outline'
          className='p-1.5 px-4 rounded-lg text-gray-600 dark:text-gray-300'
         >
          +{(dic?.hotelCard?.mockAmentities?.length ?? 0) - 3}
         </Badge>
        )}
       </div>
      </div>
     </CardContent>
     <CardFooter className='px-4 group-data-[view="grid"]:pt-2 group-data-[view="row"]:max-w-60 group-data-[view="row"]:w-full group-data-[view="grid"]:flex group-data-[view="grid"]:flex-col group-data-[view="grid"]:gap-2 group-data-[view="row"]:grid group-data-[view="row"]:grid-cols-1 group-data-[view="row"]:items-center group-data-[view="row"]:justify-between'>
      {/* Check if there's a discount */}
      {dic.hotelCard.mockBaseDiscountPrice ? (
       <>
        {/* Row 1: Badge and Base Price (strikethrough) */}
        <div className='flex items-center justify-between w-full group-data-[view="row"]:justify-start group-data-[view="row"]:mb-0'>
         <Badge
          variant='secondary'
          className='cursor-pointer text-gray-100 px-1.5 py-1 dark:text-gray-300 text-xs'
         >
          {dic.hotelCard.discountBadge}
         </Badge>

         <div className='text-md font-semibold line-through text-destructive group-data-[view="row"]:hidden'>
          {dic.hotelCard.mockBasePrice}
         </div>
        </div>
        <div className='hidden group-data-[view="row"]:flex group-data-[view="row"]:flex-col group-data-[view="row"]:items-center group-data-[view="row"]:gap-2 group-data-[view="row"]:w-full'>
         <div className='flex flex-col-reverse items-center w-full gap-2'>
          <div className='sm:text-lg font-semibold text-xl'>
           {dic.hotelCard.mockBaseDiscountPrice}
           <span className='text-sm text-muted-foreground'>
            / {dic.hotelCard.residentUnit}
           </span>
          </div>
         </div>
         <div className='flex relative items-center gap-2'>
          <div className='flex gap-1 items-center w-full'>
           <div className='text-md font-semibold line-through text-destructive'>
            {dic.hotelCard.mockBasePrice}
           </div>
          </div>
         </div>
        </div>
        <div className='flex items-center w-full group-data-[view="row"]:hidden justify-center'>
         <div className='text-lg font-semibold'>
          {dic.hotelCard.mockBaseDiscountPrice}
          <span className='text-sm text-muted-foreground'>
           / {dic.hotelCard.residentUnit}
          </span>
         </div>
        </div>
       </>
      ) : (
       <>
        <div className='flex items-center justify-center w-full group-data-[view="row"]:justify-center'>
         <div className='text-lg font-semibold'>
          {dic.hotelCard.mockBasePrice}
          <span className='text-sm text-muted-foreground'>
           / {dic.hotelCard.residentUnit}
          </span>
         </div>
        </div>
       </>
      )}
      <Button className='cursor-pointer w-full group-data-[view="grid"]:hidden'>
       {dic.hotelCard.catPrices}
      </Button>
     </CardFooter>
    </Link>
   </Card>
   <HotelItemRowAccordion dic={dic} />
  </div>
 );
}
