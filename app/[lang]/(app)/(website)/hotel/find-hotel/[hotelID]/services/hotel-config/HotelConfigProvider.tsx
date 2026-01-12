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
// import { fromDateQueryName, toDateQueryName } from '../../utils/hotelQueries';
import { useRouter } from 'next/navigation';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { hotelRoomsPickerReducer } from '../../utils/hotelRoomsPickerReducer';

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
 const { locale } = useBaseConfig();
 const router = useRouter();

 const [rooms, setRooms] = useState<RoomInventory[]>([]);
 const [selectedRooms, selectedRoomsDispatch] = useReducer(
  hotelRoomsPickerReducer,
  [],
 );

 const datePickerFilters = useForm({
  resolver: zodResolver(createHotelDatePickerSchema()),
  defaultValues: {
   ...defaultValues,
   fromDate: new Date(fromDate),
   toDate: new Date(toDate),
  },
 });

 function handleUpdateRoomInventory(roomInventory: RoomInventory[]) {
  setRooms(roomInventory);
 }

 const ctx: HotelConfig = {
  hotelInfo,
  hotelID,
  rooms: {
   data: rooms,
   onUpdateRoomInventory: handleUpdateRoomInventory,
   selectedRooms,
   selectedRoomsDispatch,
  },
 };

 return (
  <hotelConfigContext.Provider value={ctx}>
   <FormProvider {...datePickerFilters}>{children}</FormProvider>
  </hotelConfigContext.Provider>
 );
}
