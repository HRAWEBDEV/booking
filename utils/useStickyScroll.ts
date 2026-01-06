import { useEffect, useRef } from 'react';

export default function useStickyScroll(offset = 16) {
 const containerRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
  const sidebar = containerRef.current;
  if (!sidebar) return;

  let prevScrollY = window.scrollY;
  // Track the current top offset - start at the top offset
  let currTop = offset;

  const handleScroll = () => {
   const scrollY = window.scrollY;
   const delta = scrollY - prevScrollY;

   // Skip if no scroll happened
   if (delta === 0) {
    prevScrollY = scrollY;
    return;
   }

   const viewportHeight = window.innerHeight;
   const sidebarHeight = sidebar.offsetHeight;

   // Calculate the sticky bounds
   // maxTop: When sticking at top (top of sidebar aligns with top of viewport)
   const maxTop = offset;
   // minTop: When sticking at bottom (bottom of sidebar aligns with bottom of viewport)
   const minTop = viewportHeight - sidebarHeight - offset;

   // If sidebar fits in viewport, just stick at top
   if (sidebarHeight <= viewportHeight - 2 * offset) {
    sidebar.style.position = 'sticky';
    sidebar.style.top = `${maxTop}px`;
    prevScrollY = scrollY;
    return;
   }

   // Smart sticky logic:
   // When scrolling DOWN: decrease top (move towards minTop/bottom-stick)
   // When scrolling UP: increase top (move towards maxTop/top-stick)
   currTop -= delta;

   // Clamp currTop between minTop and maxTop
   if (currTop > maxTop) {
    currTop = maxTop;
   } else if (currTop < minTop) {
    currTop = minTop;
   }

   sidebar.style.position = 'sticky';
   sidebar.style.top = `${currTop}px`;

   prevScrollY = scrollY;
  };

  // Set initial position
  sidebar.style.position = 'sticky';
  sidebar.style.top = `${offset}px`;

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', () => {
   // Reset on resize
   currTop = offset;
   handleScroll();
  });

  return () => {
   window.removeEventListener('scroll', handleScroll);
   window.removeEventListener('resize', handleScroll);
  };
 }, [offset]);

 return { containerRef };
}
