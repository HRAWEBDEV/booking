import React from 'react';
import FindHotelNest from './components/find-hotel-nest/FindHotelNest';
import { Metadata } from 'next';
import { getFindHotelDictionary } from '@/internalization/app/dictionaries/website/find-hotel/dictionary';
import { type Locale } from '@/internalization/app/localization';
export const metadata: Metadata = {
 title: 'جستجوی هتل: کیش',
};

export default async function layout({
 children,
 params,
}: {
 children: React.ReactNode;
 params: Promise<{ lang: string }>; // In Next.js 15+, params is a Promise
}) {
 const { lang } = await params;
 const dic = await getFindHotelDictionary({ locale: lang as Locale });

 return (
  <>
   <FindHotelNest dic={dic} />
   {children}
  </>
 );
}
