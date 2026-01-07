'use client';
import { ReactNode } from 'react';
import { type HotelInfo } from '../hotelApiActions';
import { hotelConfigContext } from './hotelConfigContext';
import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';

export default function HotelConfigProvider({
 children,
 hotelInfo,
 dic,
}: {
 children: ReactNode;
 hotelInfo: HotelInfo;
 dic: PreviewHotelDictionary;
}) {
 const ctx = {
  hotelInfo,
 };

 return (
  <hotelConfigContext.Provider value={ctx}>
   {children}
  </hotelConfigContext.Provider>
 );
}
