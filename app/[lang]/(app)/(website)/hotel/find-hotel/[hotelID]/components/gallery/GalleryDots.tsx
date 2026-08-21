'use client';

const MAX_VISIBLE_DOTS = 5;

/**
 * Paging dots for the image sliders. Only a window of dots is rendered so a
 * gallery with 40 photos stays as compact as one with 3, and the dots at the
 * edge of that window shrink to hint that there is more on either side.
 */
export default function GalleryDots({
 count,
 activeIndex,
 label,
 onSelect,
}: {
 count: number;
 activeIndex: number;
 label: string;
 onSelect: (index: number) => unknown;
}) {
 if (count < 2) return null;

 const visibleCount = Math.min(MAX_VISIBLE_DOTS, count);
 const firstVisible = Math.min(
  Math.max(activeIndex - Math.floor(visibleCount / 2), 0),
  count - visibleCount,
 );

 return (
  <div className='absolute bottom-0 left-0 right-0 flex justify-center gap-2 py-3'>
   {Array.from({ length: visibleCount }, (_, i) => firstVisible + i).map(
    (index) => {
     const isActive = index === activeIndex;
     const isTrimmed =
      (index === firstVisible && firstVisible > 0) ||
      (index === firstVisible + visibleCount - 1 &&
       firstVisible + visibleCount < count);

     return (
      <button
       key={index}
       type='button'
       aria-label={`${label} ${index + 1}`}
       aria-current={isActive || undefined}
       onClick={() => onSelect(index)}
       className={`h-2 cursor-pointer rounded-full border border-gray-300 shadow-sm transition-all ${
        isActive
         ? 'w-6 bg-white'
         : `hover:bg-white ${isTrimmed ? 'w-1.5 bg-gray-200/60' : 'w-2 bg-gray-200/80'}`
       }`}
      />
     );
    },
   )}
  </div>
 );
}
