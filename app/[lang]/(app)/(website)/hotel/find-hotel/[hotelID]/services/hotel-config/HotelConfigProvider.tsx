'use client';
import { ReactNode, useEffect } from 'react';
import {
 type HotelInfo,
 type RoomInventory,
 getRoomInventoriesApi,
 getRoomInventory,
} from '../hotelApiActions';
import { type HotelConfig, hotelConfigContext } from './hotelConfigContext';
import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import { useForm, FormProvider } from 'react-hook-form';
import {
 defaultValues,
 createHotelDatePickerSchema,
} from '../../schemas/hotelDatePickerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { fromDateQueryName, toDateQueryName } from '../../utils/hotelQueries';
import { useRouter } from 'next/navigation';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { useQuery } from '@tanstack/react-query';
import { getSetupProviderCredentials } from '@/app/[lang]/(app)/(website)/utils/getSetupProviderCredentials';

export default function HotelConfigProvider({
 children,
 hotelInfo,
 dic,
 fromDate,
 toDate,
 hotelID,
 roomInventories,
}: {
 children: ReactNode;
 hotelInfo: HotelInfo;
 dic: PreviewHotelDictionary;
 fromDate: string;
 toDate: string;
 hotelID: string;
 roomInventories: RoomInventory[] | null;
}) {
 const { arzID, channelID, providerID } = getSetupProviderCredentials();
 const { locale } = useBaseConfig();
 const router = useRouter();
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

 //
 const {
  data: roomInventoriesData,
  isLoading: roomInventoriesIsLoading,
  isFetching: roomInventoriesIsFetching,
  isError: roomInventoriesError,
  refetch: roomInventoriesRefetch,
 } = useQuery({
  queryKey: [
   getRoomInventoriesApi,
   hotelID,
   providerID,
   arzID,
   channelID,
   fromDateValue?.toISOString(),
   toDateValue?.toISOString(),
  ],
  enabled: Boolean(fromDateValue?.toISOString() && toDateValue?.toISOString()),
  async queryFn({ signal }) {
   const res = await getRoomInventory({
    signal,
    arzID,
    channelID,
    providerID,
    hotelID,
    ratePlanID: null,
    checkinDate: fromDateValue!.toISOString(),
    checkoutDate: toDateValue!.toISOString(),
   });
   return res.data;
  },
  initialData: roomInventories,
 });

 const ctx: HotelConfig = {
  hotelInfo,
  hotelID,
  roomInventories: {
   data: roomInventories,
   isLoading: roomInventoriesIsLoading,
   isFetching: roomInventoriesIsFetching,
   isError: roomInventoriesError,
   refetch: roomInventoriesRefetch,
  },
 };

 useEffect(() => {
  const newSearchParam = new URLSearchParams(location.search);
  newSearchParam.set(fromDateQueryName, fromDateValue?.toISOString() || '');
  newSearchParam.set(toDateQueryName, toDateValue?.toISOString() || '');
  router.replace(`/${locale}/hotel/find-hotel/1?${newSearchParam.toString()}`);
 }, [fromDateValue, toDateValue, locale, router]);
 return (
  <hotelConfigContext.Provider value={ctx}>
   <FormProvider {...datePickerFilters}>{children}</FormProvider>
  </hotelConfigContext.Provider>
 );
}
