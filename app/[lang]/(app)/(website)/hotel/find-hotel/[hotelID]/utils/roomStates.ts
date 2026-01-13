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
   backgroundColor: 'bg-red-500',
  },
 ],
 [
  'cta',
  {
   title: 'cta',
   backgroundColor: 'bg-purple-500',
  },
 ],
 [
  'ctd',
  {
   title: 'ctd',
   backgroundColor: 'bg-orange-500',
  },
 ],
]);

export { roomStates, roomStatesStyles };
