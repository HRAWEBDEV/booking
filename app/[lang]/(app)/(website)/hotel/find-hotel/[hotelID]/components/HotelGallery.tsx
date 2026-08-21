'use client';
import { useEffect, useRef, useState } from 'react';
import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import { useKeenSlider } from 'keen-slider/react';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { type HotelImage } from '../../../services/hotelApiActions';
import { LuImageOff } from 'react-icons/lu';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { useCurrencyFormatter } from '@/hooks/useCurrencyFormatter';
import { useTapGuard } from '@/hooks/useTapGuard';
import { useImageLightbox } from '@/components/image-lightbox/imageLightboxContext';
import GalleryDots from './gallery/GalleryDots';
import GalleryOpenButton from './gallery/GalleryOpenButton';

const bannerClass = 'h-92';

export default function HotelGallery({
 hotelImages,
 dic,
 hotelName,
 showGallery = false,
}: {
 hotelImages: HotelImage[] | null;
 dic: PreviewHotelDictionary;
 hotelName?: string | null;
 showGallery?: boolean;
}) {
 const images = hotelImages || [];
 const [activeIndex, setActiveIndex] = useState(0);
 const { localeInfo } = useBaseConfig();
 const formatNumber = useCurrencyFormatter();
 const lightbox = useImageLightbox();
 const tapGuard = useTapGuard();
 const thumbnailsRef = useRef<HTMLDivElement>(null);
 const activeThumbnailRef = useRef<HTMLButtonElement>(null);

 const [bannerSlideRef, bannerSliderInstance] = useKeenSlider({
  rtl: localeInfo.contentDirection === 'rtl',
  slideChanged(slider) {
   setActiveIndex(slider.track.details.rel);
  },
 });

 const slides = images.map((image, index) => ({
  src: image.imageURL,
  alt: `${hotelName || ''} ${dic.gallery.image} ${index + 1}`.trim(),
  title: hotelName || undefined,
 }));

 function handleOpenLightbox(index: number) {
  lightbox.open({
   images: slides,
   index,
   onClose: (lastIndex) => bannerSliderInstance.current?.moveToIdx(lastIndex),
  });
 }

 useEffect(() => {
  const container = thumbnailsRef.current;
  const thumbnail = activeThumbnailRef.current;
  if (!container || !thumbnail) return;

  const containerRect = container.getBoundingClientRect();
  const thumbnailRect = thumbnail.getBoundingClientRect();
  const isVisible =
   thumbnailRect.left >= containerRect.left &&
   thumbnailRect.right <= containerRect.right;
  if (isVisible) return;

  container.scrollBy({
   left:
    thumbnailRect.left +
    thumbnailRect.width / 2 -
    (containerRect.left + containerRect.width / 2),
   behavior: 'smooth',
  });
 }, [activeIndex]);

 return (
  <section className='grid grid-cols-1 mb-4'>
   {images.length ? (
    <div className='relative mb-2'>
     <div
      ref={bannerSlideRef}
      className='keen-slider overflow-hidden rounded-lg'
     >
      {images.map((image, index) => (
       <button
        type='button'
        key={`${image.imageURL}-${index}`}
        aria-label={`${dic.gallery.openImage} — ${index + 1}`}
        className={`keen-slider__slide block ${bannerClass} cursor-zoom-in overflow-hidden bg-neutral-200 dark:bg-neutral-800`}
        onPointerDown={tapGuard.onPointerDown}
        onPointerEnter={lightbox.preload}
        onClick={(event) => {
         if (!tapGuard.isTap(event)) return;
         handleOpenLightbox(index);
        }}
       >
        <img
         src={image.imageURL}
         alt={slides[index].alt}
         className='h-full w-full object-cover object-center'
         draggable={false}
         decoding='async'
         loading={index === 0 ? 'eager' : 'lazy'}
         fetchPriority={index === 0 ? 'high' : 'auto'}
        />
       </button>
      ))}
     </div>

     {showGallery && (
      <div className='absolute top-3 start-3 z-2'>
       <GalleryOpenButton
        label={dic.gallery.images}
        count={formatNumber.format(images.length)}
        onClick={() => handleOpenLightbox(activeIndex)}
        onPreload={lightbox.preload}
       />
      </div>
     )}

     {images.length > 1 && (
      <>
       <div className='pointer-events-none absolute inset-x-0 bottom-0 h-16 rounded-b-lg bg-linear-to-t from-black/45 to-transparent' />
       <Button
        type='button'
        variant='ghost'
        size='icon'
        aria-label={dic.gallery.previousImage}
        onClick={() => bannerSliderInstance.current?.prev()}
        className='absolute start-3 top-1/2 hidden size-9 -translate-y-1/2 rounded-full bg-background/85 text-foreground shadow-sm backdrop-blur-sm hover:bg-background hover:text-foreground md:inline-flex'
       >
        <FiChevronLeft className='size-5 rtl:rotate-180' />
       </Button>
       <Button
        type='button'
        variant='ghost'
        size='icon'
        aria-label={dic.gallery.nextImage}
        onClick={() => bannerSliderInstance.current?.next()}
        className='absolute end-3 top-1/2 hidden size-9 -translate-y-1/2 rounded-full bg-background/85 text-foreground shadow-sm backdrop-blur-sm hover:bg-background hover:text-foreground md:inline-flex'
       >
        <FiChevronRight className='size-5 rtl:rotate-180' />
       </Button>
       <GalleryDots
        count={images.length}
        activeIndex={activeIndex}
        label={dic.gallery.goToImage}
        onSelect={(index) => bannerSliderInstance.current?.moveToIdx(index)}
       />
      </>
     )}
    </div>
   ) : (
    <div
     className={`rounded-lg ${bannerClass} bg-neutral-200 dark:bg-neutral-800 mb-2 flex flex-col items-center justify-center gap-3`}
    >
     <LuImageOff className='size-24 text-neutral-400 dark:text-neutral-600' />
     <p className='text-sm font-medium text-neutral-500 dark:text-neutral-400'>
      {dic.gallery.noImages}
     </p>
    </div>
   )}

   {images.length > 1 && (
    <div className='hidden md:block'>
     <div
      ref={thumbnailsRef}
      className='hide-scrollbar flex gap-1 overflow-x-auto scroll-smooth'
     >
      {images.map((image, index) => {
       const isActive = index === activeIndex;
       return (
        <button
         type='button'
         key={`${image.imageURL}-${index}`}
         ref={isActive ? activeThumbnailRef : null}
         aria-label={`${dic.gallery.goToImage} ${index + 1}`}
         aria-current={isActive || undefined}
         onClick={() => bannerSliderInstance.current?.moveToIdx(index)}
         className={`size-20 shrink-0 cursor-pointer overflow-hidden rounded-md bg-neutral-200 transition-opacity dark:bg-neutral-800 ${
          isActive
           ? 'ring-2 ring-primary ring-offset-1 ring-offset-background'
           : 'opacity-70 hover:opacity-100'
         }`}
        >
         <img
          src={image.imageURL}
          alt=''
          className='h-full w-full object-cover object-center'
          draggable={false}
          decoding='async'
          loading='lazy'
         />
        </button>
       );
      })}
     </div>
    </div>
   )}
  </section>
 );
}
