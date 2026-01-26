const roomStates = ['stopSell', 'cta', 'ctd'] as const;

const roomStatesStyles = new Map<
 (typeof roomStates)[number],
 {
  title: (typeof roomStates)[number];
  backgroundColor: string;
 }
>([
 [
  'stopSell',
  {
   title: 'stopSell',
   backgroundColor: 'bg-red-300 dark:bg-red-700',
  },
 ],
 [
  'cta',
  {
   title: 'cta',
   backgroundColor: 'bg-purple-300 dark:bg-purple-700',
  },
 ],
 [
  'ctd',
  {
   title: 'ctd',
   backgroundColor: 'bg-orange-300 dark:bg-orange-700',
  },
 ],
]);

export { roomStates, roomStatesStyles };
