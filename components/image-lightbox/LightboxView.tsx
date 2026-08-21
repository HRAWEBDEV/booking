'use client';
import Lightbox, {
 useLightboxState,
 type Labels,
} from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { useCurrencyFormatter } from '@/hooks/useCurrencyFormatter';
import {
 type ImageLightboxLabels,
 type LightboxImage,
} from './imageLightboxContext';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import './image-lightbox.css';

function SlideCounter() {
 const { currentIndex, slides } = useLightboxState();
 const formatNumber = useCurrencyFormatter();

 if (slides.length < 2) return null;

 return (
  <span
   dir='ltr'
   role='status'
   aria-live='polite'
   className='app-lightbox__counter'
  >
   {formatNumber.format(currentIndex + 1)}
   <span aria-hidden className='app-lightbox__counter-divider'>
    /
   </span>
   {formatNumber.format(slides.length)}
  </span>
 );
}

export default function LightboxView({
 open,
 close,
 images,
 index,
 labels,
 onView,
}: {
 open: boolean;
 close: () => unknown;
 images: LightboxImage[];
 index: number;
 labels: ImageLightboxLabels;
 onView: (index: number) => unknown;
}) {
 const { localeInfo } = useBaseConfig();

 const lightboxLabels: Labels = {
  Lightbox: labels.title,
  Close: labels.close,
  Previous: labels.previous,
  Next: labels.next,
  'Zoom in': labels.zoomIn,
  'Zoom out': labels.zoomOut,
  Thumbnails: labels.thumbnails,
  'Show thumbnails': labels.showThumbnails,
  'Hide thumbnails': labels.hideThumbnails,
 };

 return (
  <Lightbox
   open={open}
   close={close}
   index={index}
   slides={images}
   className='app-lightbox dark-surface'
   labels={lightboxLabels}
   plugins={[Captions, Thumbnails, Zoom]}
   toolbar={{
    buttons: [<SlideCounter key='counter' />, 'thumbnails', 'zoom', 'close'],
   }}
   controller={{
    closeOnBackdropClick: true,
    closeOnPullDown: true,
   }}
   carousel={{ preload: 1, padding: 0, imageFit: 'contain' }}
   captions={{
    showToggle: false,
    descriptionTextAlign: 'start',
   }}
   thumbnails={{
    position: 'bottom',
    width: 96,
    height: 64,
    border: 2,
    borderRadius: 8,
    padding: 0,
    gap: 8,
    vignette: true,
    showToggle: true,
   }}
   zoom={{
    scrollToZoom: true,
    maxZoomPixelRatio: 3,
   }}
   animation={{ fade: 220, swipe: 320 }}
   on={{ view: ({ index: viewedIndex }) => onView(viewedIndex) }}
   portal={{
    container: {
     dir: localeInfo.contentDirection,
    },
   }}
  />
 );
}
