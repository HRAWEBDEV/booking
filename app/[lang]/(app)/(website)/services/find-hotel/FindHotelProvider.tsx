'use client';

import { useEffect, useState } from 'react';
import { FindHotelContext } from './FindHotelContext';

export default function FindHotelProvider({
 children,
}: {
 children: React.ReactNode;
}) {
 const [isRowView, setIsRowView] = useState(false);

 useEffect(() => {
  const onResize = () => {
   setIsRowView(window.innerWidth > 768);
  };
  if (isRowView) {
   onResize();
   window.addEventListener('resize', onResize);
  }
  return () => window.removeEventListener('resize', onResize);
 }, [isRowView]);

 return (
  <FindHotelContext.Provider value={{ isRowView, setIsRowView }}>
   {children}
  </FindHotelContext.Provider>
 );
}
