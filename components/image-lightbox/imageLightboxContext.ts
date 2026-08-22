import { createContext, use, type ReactNode } from 'react';
import { OutOfContext } from '@/utils/OutOfContext';

interface LightboxImage {
 src: string;
 alt?: string;
 title?: ReactNode;
 description?: ReactNode;
}

interface ImageLightboxLabels {
 title: string;
 image: string;
 close: string;
 previous: string;
 next: string;
 zoomIn: string;
 zoomOut: string;
 thumbnails: string;
 showThumbnails: string;
 hideThumbnails: string;
}

interface OpenImageLightboxParams {
 images: LightboxImage[];
 index?: number;
 onClose?: (index: number) => unknown;
}

interface ImageLightbox {
 open: (params: OpenImageLightboxParams) => unknown;
 preload: () => unknown;
}

const imageLightboxContext = createContext<ImageLightbox | null>(null);

function useImageLightbox(): ImageLightbox {
 const val = use(imageLightboxContext);
 if (!val) throw new OutOfContext('ImageLightbox');
 return val;
}

export type {
 LightboxImage,
 ImageLightboxLabels,
 OpenImageLightboxParams,
 ImageLightbox,
};
export { imageLightboxContext, useImageLightbox };
