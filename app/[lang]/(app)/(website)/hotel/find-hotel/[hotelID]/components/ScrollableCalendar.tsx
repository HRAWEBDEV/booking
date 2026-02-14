import { useRef, memo, ReactNode, useMemo } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Calendar } from '@/components/ui/calendar';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { useDateFns } from '@/hooks/useDateFns';

const TOTAL_MONTHS = 20;

const VirtualMonth = memo(
 ({
  monthDate,
  selected,
  onSelect,
 }: {
  monthDate: Date;
  monthStart: number;
  monthEnd: number;
  selected: DateRange | undefined;
  onSelect: (range: DateRange | undefined, selectedDay: Date) => void;
 }) => {
  const dateFns = useDateFns();
  return (
   <div className='w-full flex flex-col gap-4 items-center pb-6 border-b last:border-0'>
    <Calendar
     mode='range'
     month={monthDate}
     selected={selected}
     onSelect={onSelect}
     disableNavigation
     showOutsideDays={false}
     hideNavigation
     className='w-full flex justify-center p-2 [--cell-size:3rem]'
     disabled={(date) => {
      return date.getTime() < dateFns.startOfDay(new Date()).getTime();
     }}
     classNames={{
      month: 'space-y-4 w-full ',
      table: 'w-full border-collapse space-y-1',
      head_row: 'hidden',
      row: 'flex w-full mt-6 justify-between',
      caption: 'hidden',
      day: 'text-xl',
     }}
    />
   </div>
  );
 },
 (prev, next) => {
  const isMonthChanged = prev.monthDate.getTime() !== next.monthDate.getTime();
  if (isMonthChanged) return false;

  // Check if selection ranges are equal
  const prevFrom = prev.selected?.from?.getTime();
  const prevTo = prev.selected?.to?.getTime();
  const nextFrom = next.selected?.from?.getTime();
  const nextTo = next.selected?.to?.getTime();

  if (prevFrom === nextFrom && prevTo === nextTo) return true;

  // Smart re-render: Only re-render if the month is involved in the change
  // We use the passed locale-aware timestamps
  const monthStart = prev.monthStart;
  const monthEnd = prev.monthEnd;

  const isOverlap = (range: DateRange | undefined) => {
   if (!range?.from) return false;
   const rangeStart = range.from.getTime();
   const rangeEnd = range.to ? range.to.getTime() : rangeStart;

   // Check if the range overlaps with the month
   // Range overlaps month if: RangeStart <= MonthEnd AND RangeEnd >= MonthStart
   return rangeStart <= monthEnd && rangeEnd >= monthStart;
  };

  const prevOverlap = isOverlap(prev.selected);
  const nextOverlap = isOverlap(next.selected);

  // If the month was not involved in previous selection AND is not involved in new selection,
  // we can skip re-render.
  if (!prevOverlap && !nextOverlap) return true;

  // Otherwise, if ranges differ and we are involved, we must re-render
  return false;
 },
);

VirtualMonth.displayName = 'VirtualMonth';

interface ScrollableCalendarProps {
 selected: DateRange | undefined;
 onSelect: (range: DateRange | undefined, selectedDay: Date) => void;
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
 const dateFns = useDateFns();

 const monthsData = useMemo(() => {
  const START_DATE = dateFns.startOfMonth(new Date());
  return Array.from({ length: TOTAL_MONTHS }).map((_, index) => {
   const monthDate = dateFns.addMonths(START_DATE, index);
   return {
    monthDate,
    monthStart: dateFns.startOfMonth(monthDate).getTime(),
    monthEnd: dateFns.endOfMonth(monthDate).getTime(),
   };
  });
 }, [dateFns]);

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
      const { monthDate, monthStart, monthEnd } = monthsData[virtualRow.index];

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
         monthStart={monthStart}
         monthEnd={monthEnd}
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
