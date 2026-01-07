'use client';
import { ReactNode } from 'react';
import { type HotelInfo } from '../hotelApiActions';
import { hotelConfigContext } from './hotelConfigContext';
import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';

export default function HotelConfigProvider({
 children,
 hotelInfoPromise,
 dic,
}: {
 children: ReactNode;
 hotelInfoPromise: Promise<HotelInfo>;
 dic: PreviewHotelDictionary;
}) {
 const ctx = {
  hotelInfoPromise,
 };

 return (
  <hotelConfigContext.Provider value={ctx}>
   {children}
  </hotelConfigContext.Provider>
 );
}
