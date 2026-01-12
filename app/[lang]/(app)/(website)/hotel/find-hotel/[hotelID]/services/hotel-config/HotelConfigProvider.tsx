'use client';
import { ReactNode, useReducer, useState } from 'react';
import { type HotelInfo, RoomInventory } from '../hotelApiActions';
import { type HotelConfig, hotelConfigContext } from './hotelConfigContext';
import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import { useForm, FormProvider } from 'react-hook-form';
import {
 defaultValues,
 createHotelDatePickerSchema,
} from '../../schemas/hotelDatePickerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { fromDateQueryName, toDateQueryName } from '../../utils/hotelQueries';
import { useRouter, useSearchParams } from 'next/navigation';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { hotelRoomsPickerReducer } from '../../utils/hotelRoomsPickerReducer';
import { useDateFns } from '@/hooks/useDateFns';
import { roomTypeCapacityWatcher } from '../../utils/roomTypeCapacityWatcher';

export default function HotelConfigProvider({
 children,
 hotelInfo,
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

 const [rooms, setRooms] = useState<RoomInventory[]>([]);
 const [selectedRooms, selectedRoomsDispatch] = useReducer(
  hotelRoomsPickerReducer,
  [],
 );

 const roomTypeCapacity = roomTypeCapacityWatcher({
  rooms,
  selectedRooms,
 });

 const datePickerFilters = useForm({
  resolver: zodResolver(createHotelDatePickerSchema()),
  defaultValues: {
   ...defaultValues,
   fromDate: fromDateQuery,
   toDate: toDateQuery,
  },
 });

 const [] = datePickerFilters.watch([]);

 const reserveRoomNights =
  fromDateQuery && toDateQuery
   ? dateFns.differenceInDays(toDateQuery, fromDateQuery)
   : 0;

 function handleUpdateRoomInventory(roomInventory: RoomInventory[]) {
  setRooms(roomInventory);
 }

 const ctx: HotelConfig = {
  hotelInfo,
  hotelID,
  rooms: {
   data: rooms,
   roomTypeCapacity,
   selectedRooms,
   onUpdateRoomInventory: handleUpdateRoomInventory,
   selectedRoomsDispatch,
  },
  reserve: {
   reserveRoomNights,
   fromDateValue: fromDateQuery,
   toDateValue: toDateQuery,
  },
 };

 return (
  <hotelConfigContext.Provider value={ctx}>
   <FormProvider {...datePickerFilters}>{children}</FormProvider>
  </hotelConfigContext.Provider>
 );
}
