import React from 'react';
// import FindHotelNest from './components/find-hotel-nest/FindHotelNest';
import { Metadata } from 'next';
import { getFindHotelDictionary } from '@/internalization/app/dictionaries/website/find-hotel/dictionary';
import { type Locale } from '@/internalization/app/localization';

export async function generateMetadata(
 props: LayoutProps<'/[lang]/hotel'>,
): Promise<Metadata> {
 const { lang } = await props.params;
 const dic = await getFindHotelDictionary({
  locale: lang as Locale,
 });

 return {
  title: dic.metadata.title,
  description: dic.metadata.description,
  keywords: dic.metadata.keywords,
 };
}

export default async function layout({
 children,
}: {
 children: React.ReactNode;
}) {
 return <>{children}</>;
}
