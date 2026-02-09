'use client';
import { useRef, memo, ReactNode } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { addMonths, startOfMonth } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';

const TOTAL_MONTHS = 24;
const START_DATE = startOfMonth(new Date());

const VirtualMonth = memo(
 ({
  monthDate,
  selected,
  onSelect,
 }: {
  monthDate: Date;
  selected: DateRange | undefined;
  onSelect: (range: DateRange | undefined) => void;
 }) => {
  return (
   <div className='w-full flex flex-col items-center pb-6 border-b last:border-0'>
    <Calendar
     mode='range'
     month={monthDate}
     selected={selected}
     onSelect={onSelect}
     disableNavigation
     className='w-full flex justify-center p-0'
     classNames={{
      month: 'space-y-4 w-full max-w-[300px]',
      table: 'w-full border-collapse space-y-1',
      head_row: 'hidden',
      row: 'flex w-full mt-2 justify-between',
      caption: 'hidden',
     }}
    />
   </div>
  );
 },
 (prev, next) => {
  return (
   prev.monthDate.getTime() === next.monthDate.getTime() &&
   prev.selected === next.selected
  );
 },
);

VirtualMonth.displayName = 'VirtualMonth';

interface ScrollableCalendarProps {
 selected: DateRange | undefined;
 onSelect: (range: DateRange | undefined) => void;
 className?: string;
 children: ReactNode;
}

export default function ScrollableCalendar({
 selected,
 onSelect,
 className,
 children,
}: ScrollableCalendarProps) {
 const parentRef = useRef<HTMLDivElement>(null);

 const rowVirtualizer = useVirtualizer({
  count: TOTAL_MONTHS,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 350,
  overscan: 1,
 });

 return (
  <div className={cn('flex flex-col h-full w-full', className)}>
   <div
    ref={parentRef}
    className='flex-1 w-full overflow-y-auto contain-layout'
   >
    <div>{children}</div>
    <div
     className='relative w-full'
     style={{
      height: `${rowVirtualizer.getTotalSize()}px`,
     }}
    >
     {rowVirtualizer.getVirtualItems().map((virtualRow) => {
      const monthDate = addMonths(START_DATE, virtualRow.index);

      return (
       <div
        key={virtualRow.key}
        data-index={virtualRow.index}
        ref={rowVirtualizer.measureElement}
        className='absolute top-0 left-0 w-full'
        style={{
         transform: `translateY(${virtualRow.start}px)`,
        }}
       >
        <VirtualMonth
         monthDate={monthDate}
         selected={selected}
         onSelect={onSelect}
        />
       </div>
      );
     })}
    </div>
   </div>
  </div>
 );
}
