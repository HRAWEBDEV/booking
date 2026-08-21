import { useRef, type PointerEvent } from 'react';

const DRAG_THRESHOLD_PX = 8;

/**
 * A draggable slider still fires a `click` when a drag ends on the slide, which
 * makes the click action (opening a lightbox, following a link) fire by
 * accident. Wire `onPointerDown` to the element and gate the click on `isTap`.
 *
 * Keyboard activation has no preceding pointer event, so it is always a tap.
 */
export function useTapGuard() {
 const origin = useRef<{ x: number; y: number } | null>(null);

 function onPointerDown(event: PointerEvent) {
  origin.current = { x: event.clientX, y: event.clientY };
 }

 function isTap(event: { clientX: number; clientY: number }) {
  const start = origin.current;
  origin.current = null;
  if (!start) return true;
  return (
   Math.abs(event.clientX - start.x) <= DRAG_THRESHOLD_PX &&
   Math.abs(event.clientY - start.y) <= DRAG_THRESHOLD_PX
  );
 }

 return { onPointerDown, isTap };
}
