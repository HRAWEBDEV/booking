'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { Spinner } from '@/components/ui/spinner';
import {
 imageLightboxContext,
 type ImageLightbox,
 type ImageLightboxLabels,
 type OpenImageLightboxParams,
} from './imageLightboxContext';

const IDLE_PRELOAD_FALLBACK_DELAY = 2000;

type IdleWindow = Window & {
 requestIdleCallback?: (callback: () => void) => number;
 cancelIdleCallback?: (handle: number) => void;
};

let lightboxChunk: Promise<unknown> | null = null;

/**
 * The lightbox and its plugins are ~20kb gzipped that nothing on first paint
 * needs, so the chunk is kept out of the page bundle and fetched while the main
 * thread is idle (or on the first hover over a trigger, whichever comes first).
 */
function loadLightboxChunk() {
 lightboxChunk ??= import('./LightboxView');
 return lightboxChunk;
}

function LightboxLoading() {
 return (
  <div className='fixed inset-0 z-9999 grid place-content-center bg-black/90'>
   <Spinner className='size-8 text-white' />
  </div>
 );
}

const LightboxView = dynamic(() => import('./LightboxView'), {
 ssr: false,
 loading: LightboxLoading,
});

export default function ImageLightboxProvider({
 children,
 labels,
}: {
 children: ReactNode;
 labels: ImageLightboxLabels;
}) {
 const [payload, setPayload] = useState<OpenImageLightboxParams | null>(null);
 const viewedIndexRef = useRef(0);
 const onCloseRef = useRef<OpenImageLightboxParams['onClose']>(undefined);

 const open = useCallback(
  ({ images, index, onClose }: OpenImageLightboxParams) => {
   if (!images.length) return;
   const safeIndex = Math.min(Math.max(index ?? 0, 0), images.length - 1);
   viewedIndexRef.current = safeIndex;
   onCloseRef.current = onClose;
   loadLightboxChunk();
   setPayload({ images, index: safeIndex });
  },
  [],
 );

 const preload = useCallback(() => {
  loadLightboxChunk();
 }, []);

 const handleView = useCallback((index: number) => {
  viewedIndexRef.current = index;
 }, []);

 const handleClose = useCallback(() => {
  setPayload(null);
  onCloseRef.current?.(viewedIndexRef.current);
  onCloseRef.current = undefined;
 }, []);

 useEffect(() => {
  const idleWindow = window as IdleWindow;
  if (idleWindow.requestIdleCallback) {
   const handle = idleWindow.requestIdleCallback(() => loadLightboxChunk());
   return () => idleWindow.cancelIdleCallback?.(handle);
  }
  const timer = window.setTimeout(
   loadLightboxChunk,
   IDLE_PRELOAD_FALLBACK_DELAY,
  );
  return () => window.clearTimeout(timer);
 }, []);

 const ctx: ImageLightbox = useMemo(() => ({ open, preload }), [open, preload]);

 return (
  <imageLightboxContext.Provider value={ctx}>
   {children}
   {payload && (
    <LightboxView
     open
     close={handleClose}
     images={payload.images}
     index={payload.index ?? 0}
     labels={labels}
     onView={handleView}
    />
   )}
  </imageLightboxContext.Provider>
 );
}
