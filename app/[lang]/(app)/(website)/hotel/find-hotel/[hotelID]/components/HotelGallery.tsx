'use client';
import { useState } from 'react';
import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import { useKeenSlider } from 'keen-slider/react';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { type HotelImage } from '../../../services/hotelApiActions';
import { LuImageOff } from 'react-icons/lu';
import {
 Dialog,
 DialogContent,
 DialogHeader,
 DialogTitle,
 DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { GrGallery } from 'react-icons/gr';

export default function HotelGallery({
 hotelImages,
 dic,
 showGallery = false,
}: {
 hotelImages: HotelImage[] | null;
 dic: PreviewHotelDictionary;
 showGallery?: boolean;
}) {
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
 const [sliderRef] = useKeenSlider({
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
   {hotelImages && hotelImages.length ? (
    <div
     ref={bannerSlideRef}
     className='keen-slider mb-2 overflow-hidden rounded-lg relative'
    >
     {showGallery && (
      <div className='absolute top-1 start-1 z-2'>
       <Dialog>
        <DialogTrigger asChild>
         <Button variant='ghost' className='bg-background/50 text-primary/80'>
          <GrGallery className='size-5' />
          <span className='text-sm'>{dic.hotelRooms.images}</span>
         </Button>
        </DialogTrigger>
        <DialogContent className='p-0 gap-0 flex flex-col overflow-hidden max-h-[90svh] max-w-[unset]! w-[min(95%,45rem)]!'>
         <DialogHeader className='p-4'>
          <DialogTitle></DialogTitle>
         </DialogHeader>
         <div className='p-4 grow overflow-auto'>
          <HotelGallery
           dic={dic}
           hotelImages={hotelImages.map((item) => ({
            hotelID: 1,
            imageURL: item.imageURL,
           }))}
          />
         </div>
        </DialogContent>
       </Dialog>
      </div>
     )}

     {hotelImages.map((image, i) => (
      <div
       className='keen-slider__slide rounded-lg h-92 overflow-hidden'
       key={i}
      >
       <img
        src={image.imageURL}
        alt='hotel image'
        className='h-full w-full object-cover object-center'
        loading='lazy'
       />
      </div>
     ))}
     <div className='flex justify-center gap-2 py-3 absolute bottom-0 left-0 right-0'>
      {hotelImages.map((image, idx) => (
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
   ) : (
    <div className='rounded-lg h-92 bg-neutral-200 dark:bg-neutral-800 mb-2 grid place-content-center'>
     <LuImageOff className='size-32 text-neutral-400 dark:text-neutral-600' />
    </div>
   )}
   <div className='hidden md:block'>
    {hotelImages && hotelImages.length ? (
     <div ref={sliderRef} className='keen-slider relative'>
      {hotelImages.map((image, i) => (
       <button
        className='keen-slider__slide rounded-lg size-20 cursor-pointer'
        key={i}
        onClick={() => {
         bannerSliderInstance.current?.moveToIdx(i);
        }}
       >
        <img
         src={image.imageURL}
         alt='hotel image'
         className='h-full w-full object-cover object-center'
         loading='lazy'
        />
       </button>
      ))}
     </div>
    ) : null}
   </div>
  </section>
 );
}
