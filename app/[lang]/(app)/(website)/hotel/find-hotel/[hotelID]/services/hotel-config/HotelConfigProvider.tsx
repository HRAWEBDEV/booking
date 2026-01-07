'use client';
import { ReactNode, useEffect } from 'react';
import { type HotelInfo } from '../hotelApiActions';
import { hotelConfigContext } from './hotelConfigContext';
import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import { useForm, FormProvider } from 'react-hook-form';
import {
 type HotelDatePickerSchema,
 defaultValues,
 createHotelDatePickerSchema,
} from '../../schemas/hotelDatePickerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { fromDateQueryName, toDateQueryName } from '../../utils/hotelQueries';
import { useRouter, useSearchParams } from 'next/navigation';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';

export default function HotelConfigProvider({
 children,
 hotelInfo,
 dic,
 fromDate,
 toDate,
 hotelID,
}: {
 children: ReactNode;
 hotelInfo: HotelInfo;
 dic: PreviewHotelDictionary;
 fromDate: string;
 toDate: string;
 hotelID: string;
}) {
 const { locale } = useBaseConfig();
 const router = useRouter();
 const searchParams = useSearchParams();
 const datePickerFilters = useForm({
  resolver: zodResolver(createHotelDatePickerSchema()),
  defaultValues: {
   ...defaultValues,
   fromDate: new Date(fromDate),
   toDate: new Date(toDate),
  },
 });

 const [fromDateValue, toDateValue] = datePickerFilters.watch([
  'fromDate',
  'toDate',
 ]);

 const ctx = {
  hotelInfo,
  hotelID,
 };

 useEffect(() => {
  const newSearchParam = new URLSearchParams(searchParams.toString());
  newSearchParam.set(fromDateQueryName, fromDateValue?.toISOString() || '');
  newSearchParam.set(toDateQueryName, toDateValue?.toISOString() || '');
  router.replace(`/${locale}/hotel/find-hotel/1${newSearchParam.toString()}`);
 }, [fromDateValue, toDateValue, searchParams, locale, router]);
 return (
  <hotelConfigContext.Provider value={ctx}>
   <FormProvider {...datePickerFilters}>{children}</FormProvider>
  </hotelConfigContext.Provider>
 );
}
