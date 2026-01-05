import { useEffect, useRef, useState } from 'react';

import React from 'react';

export default function useStickyScroll() {
 const containerRef = useRef<HTMLDivElement>(null);
 const [stickyStyle, setStickyStyle] = useState<React.CSSProperties>({});
 const lastScrollY = useRef(0);

 useEffect(() => {
  const handleScroll = () => {
   if (!containerRef.current) return;

   const container = containerRef.current;
   const rect = container.getBoundingClientRect();
   const viewportHeight = window.innerHeight;
   const scrollY = window.scrollY;
   const scrollingDown = scrollY > lastScrollY.current;

   const filterHeight = container.offsetHeight;

   if (scrollingDown) {
    // When scrolling down, stick to bottom of viewport
    if (rect.bottom <= viewportHeight) {
     setStickyStyle({
      position: 'sticky',
      top: `${viewportHeight - filterHeight - 16}px`,
     });
    }
   } else {
    // When scrolling up, stick to top
    if (rect.top >= 16) {
     setStickyStyle({
      position: 'sticky',
      top: '16px', // 1rem = 16px (top-4)
     });
    }
   }

   lastScrollY.current = scrollY;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
 }, []);
 return { containerRef, stickyStyle };
}
