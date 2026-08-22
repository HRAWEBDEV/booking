'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ScrollToTopProps {
 /**
  * Scroll distance in pixels after which the button appears.
  * Default is 450px (400-500px from top).
  */
 threshold?: number;
 className?: string;
}

export default function ScrollToTop({
 threshold = 450,
 className,
}: ScrollToTopProps) {
 const [isVisible, setIsVisible] = useState(false);

 useEffect(() => {
  const onScroll = () => {
   setIsVisible(window.scrollY > threshold);
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  const rafId = requestAnimationFrame(onScroll);

  return () => {
   cancelAnimationFrame(rafId);
   window.removeEventListener('scroll', onScroll);
  };
 }, [threshold]);

 const scrollToTop = () => {
  window.scrollTo({
   top: 0,
   behavior: 'smooth',
  });
 };

 return (
  <Button
   type='button'
   variant='default'
   size='icon'
   onClick={scrollToTop}
   aria-label='Scroll to top'
   title='Scroll to top'
   className={cn(
    'group fixed bottom-40 md:bottom-20 lg:bottom-8 end-6 z-40',
    'size-11 sm:size-12 rounded-full p-0',
    'shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/35 dark:shadow-black/50',
    'transition-all duration-300 ease-in-out',
    'hover:-translate-y-1 active:translate-y-0 active:scale-95',
    isVisible
     ? 'opacity-100 translate-y-0 pointer-events-auto'
     : 'opacity-0 translate-y-4 pointer-events-none',
    className,
   )}
  >
   <ArrowUp className='size-5 transition-transform duration-200 group-hover:-translate-y-0.5' />
  </Button>
 );
}
