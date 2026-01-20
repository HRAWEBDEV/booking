import { FindHotelDictionary } from '@/internalization/app/dictionaries/website/find-hotel/dictionary';
import { KeenSliderInstance } from 'keen-slider/react';

export interface HotelItem {
 dic: FindHotelDictionary;
 currentSlide: number;
 slidesCount: number;
 sliderRef: React.Ref<HTMLDivElement> | undefined;
 instanceRef: React.Ref<KeenSliderInstance> | null;
}
