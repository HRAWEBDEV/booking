'use client';
import { ReactNode, useReducer, useState, useTransition } from 'react';
import {
 type HotelInfo,
 type RoomInventory,
 getRatePlanTypesApi,
 getRatePlanTypes,
} from '../../../../services/hotelApiActions';
import { type HotelConfig, hotelConfigContext } from './hotelConfigContext';
import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import { useForm, FormProvider } from 'react-hook-form';
import {
 defaultValues,
 createHotelDatePickerSchema,
 HotelDatePickerSchema,
} from '../../schemas/hotelDatePickerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
 fromDateQueryName,
 toDateQueryName,
 ratePlanTypeQueryName,
} from '../../utils/hotelQueries';
import { useRouter, useSearchParams } from 'next/navigation';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { hotelRoomsPickerReducer } from '../../utils/hotelRoomsPickerReducer';
import { useDateFns } from '@/hooks/useDateFns';
import { roomTypeCapacityWatcher } from '../../utils/roomTypeCapacityWatcher';
import { setLocalReserveInfo } from '../../utils/localReserveInfoManager';
import { getSetupProviderCredentials } from '@/app/[lang]/(app)/(website)/utils/getSetupProviderCredentials';
import { useQuery } from '@tanstack/react-query';

export default function HotelConfigProvider({
 children,
 hotelInfo,
 hotelID,
 dic,
}: {
 children: ReactNode;
 hotelInfo: HotelInfo;
 dic: PreviewHotelDictionary;
 fromDate: string;
 toDate: string;
 hotelID: string;
}) {
 const [isPending, startTransition] = useTransition();
 const { channelID, providerID } = getSetupProviderCredentials();
 const dateFns = useDateFns();
 const { locale } = useBaseConfig();
 const router = useRouter();
 const searchParams = useSearchParams();
 const fromDateQuery = searchParams.get(fromDateQueryName)
  ? new Date(searchParams.get(fromDateQueryName) as string)
  : null;
 const toDateQuery = searchParams.get(toDateQueryName)
  ? new Date(searchParams.get(toDateQueryName) as string)
  : null;

 const ratePlanTypeQuery = searchParams.get(ratePlanTypeQueryName)
  ? (searchParams.get(ratePlanTypeQueryName) as string)
  : '';

 const [rooms, setRooms] = useState<RoomInventory[]>([]);
 const [selectedRooms, selectedRoomsDispatch] = useReducer(
  hotelRoomsPickerReducer,
  [],
 );

 const roomTypeCapacity = roomTypeCapacityWatcher({
  rooms,
  selectedRooms,
 });

 const datePickerFilters = useForm<HotelDatePickerSchema>({
  resolver: zodResolver(createHotelDatePickerSchema(dic)),
  defaultValues: {
   ...defaultValues,
   fromDate: fromDateQuery,
   toDate: toDateQuery,
   ratePlan: ratePlanTypeQuery || '',
  },
 });

 const [] = datePickerFilters.watch([]);

 const reserveRoomNights =
  fromDateQuery && toDateQuery
   ? dateFns.differenceInDays(toDateQuery, fromDateQuery)
   : 0;

 // rate plan types
 const { data: ratePlanTypes, isLoading: ratePlanTypesIsLoading } = useQuery({
  queryKey: [
   getRatePlanTypesApi,
   hotelID.toString(),
   providerID.toString(),
   channelID.toString(),
  ],
  async queryFn({ signal }) {
   const res = await getRatePlanTypes({
    signal,
    hotelID,
    providerID,
    channelID,
   });
   return res.data;
  },
 });
 //

 function handleUpdateRoomInventory(roomInventory: RoomInventory[]) {
  setRooms(roomInventory);
 }

 function handleChangeReserveDate({
  toDate,
  fromDate,
  ratePlan,
 }: HotelDatePickerSchema) {
  const searchParams = new URLSearchParams(location.search);
  selectedRoomsDispatch({
   type: 'reset',
  });
  startTransition(() => {
   searchParams.set(fromDateQueryName, fromDate!.toISOString());
   searchParams.set(toDateQueryName, toDate!.toISOString());
   searchParams.set(ratePlanTypeQueryName, ratePlan === 'all' ? '' : ratePlan);
   router.push(
    `/${locale}/hotel/find-hotel/${hotelID}?${searchParams.toString()}#rooms`,
   );
  });
 }

 function handleSubmitReserveInfo() {
  if (!fromDateQuery || !toDateQuery || !selectedRooms.length) return false;
  setLocalReserveInfo({
   hotelID,
   fromDate: fromDateQuery.toISOString(),
   toDate: toDateQuery.toISOString(),
   rooms: selectedRooms,
  });
  router.push(`/${locale}/hotel/reserve`, {
   scroll: true,
  });
 }

 const roomsResult = rooms.reduce((acc, cur) => {
  return acc + cur.accommodationTypePrices.length;
 }, 0);

 const ctx: HotelConfig = {
  hotelInfo,
  hotelID,
  ratePlanTypes: {
   data: ratePlanTypes,
   isLoading: ratePlanTypesIsLoading,
  },
  rooms: {
   data: rooms,
   result: roomsResult,
   roomTypeCapacity,
   selectedRooms,
   isLoading: isPending,
   onUpdateRoomInventory: handleUpdateRoomInventory,
   selectedRoomsDispatch,
  },
  reserve: {
   reserveRoomNights,
   fromDateValue: fromDateQuery,
   toDateValue: toDateQuery,
   ratePlanValue: ratePlanTypeQuery,
   onChangeReserveDate: handleChangeReserveDate,
   onSubmitReserveInfo: handleSubmitReserveInfo,
  },
 };

 return (
  <hotelConfigContext.Provider value={ctx}>
   <FormProvider {...datePickerFilters}>{children}</FormProvider>
  </hotelConfigContext.Provider>
 );
}
