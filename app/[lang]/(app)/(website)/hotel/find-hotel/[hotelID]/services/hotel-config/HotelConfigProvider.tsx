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
}: {
 children: ReactNode;
 hotelInfo: HotelInfo;
 dic: PreviewHotelDictionary;
 fromDate: string;
 toDate: string;
 hotelID: string;
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

 const ctx: HotelConfig = {
  hotelInfo,
  hotelID,
 };

 return (
  <hotelConfigContext.Provider value={ctx}>
   <FormProvider {...datePickerFilters}>{children}</FormProvider>
  </hotelConfigContext.Provider>
 );
}
