'use client';

import { useKeenSlider } from 'keen-slider/react';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { useState } from 'react';

import { FindHotelDictionary } from '@/internalization/app/dictionaries/website/find-hotel/dictionary';

import HotelCardListItem from './HotelCardListItem';

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

 return (
  <HotelCardListItem
   dic={dic}
   currentSlide={currentSlide}
   slidesCount={slidesCount}
   sliderRef={sliderRef}
   instanceRef={instanceRef}
  />
 );
}
