import { axios } from '@/app/[lang]/(app)/utils/defaultAxios';
import { ReserveInfo } from '../find-hotel/[hotelID]/utils/reserveInfo';

interface HotelInfo {
 id: number;
 address: string | null;
 cityName: string | null;
 description: string | null;
 fName: string | null;
 faxNo: string | null;
 floors: number | null;
 hotelGradeID: number | null;
 hotelID: number;
 latitude: number | null;
 longitude: number | null;
 logo: string | null;
 roomsCount: number;
 stateName: string | null;
 telNo1: string | null;
 telNo2: string | null;
 telNo3: string | null;
 publicRules: string | null;
 checkin: string;
 checkout: string;
}

interface HotelImage {
 hotelID: number;
 imageURL: string;
}

interface HotelFacility {
 key: string;
 value: string;
}

interface RatePlanType {
 fName: string;
 ratePlanID: number;
 ratePlanTypeID: number;
 ratePlanTypeName: string;
 noBreakfast: boolean;
 nonRefundable: boolean;
 minNights: number;
 freeChargeMinibar: boolean;
 withLunch: boolean;
 withDinner: boolean;
 limitedMenu: boolean;
}

interface RoomAccomodationType {
 roomOnlineShowRate: number;
 netRoomRate: number;
 beds: number;
 dailyPrices: {
  price: number;
  date: string;
 }[];
 accommodationRatePlanModel: {
  ratePlanID: number;
  rateTypeID: number;
  rateTypePlan: number;
  rateTypeName: string;
  boardID: number;
  ratePlanModel: RatePlanType;
 };
}

interface AccomodationImage {
 imageURL: string;
}

interface RoomInventory {
 hoteID: number;
 roomTypeID: number;
 fName: string;
 fixBeds: number;
 roomCount: number;
 accommodationTypePrices: RoomAccomodationType[];
 accommodationTypePrice: RoomAccomodationType;
 accommodationImages: AccomodationImage[];
}

type GetRoomInventoryProps = {
 channelID: string;
 providerID: string;
 checkinDate: string;
 checkoutDate: string;
 arzID: string;
 hotelID: string;
 ratePlanID?: null | string;
};

interface RoomDailyPrice {
 date: string;
 roomOnlineShowRate: number;
 netRoomRate: number;
 stopSell: boolean;
 cta: boolean;
 ctd: boolean;
}

type ApiCredentialProps = {
 channelID?: string;
 hotelID: string;
 providerID?: string;
 arzID?: string;
};

const getHotelInfoApi = '/CRS/OnlineReservation/GetHotelInfo';
const getRoomInventoriesApi = '/CRS/OnlineReservation/GetRoomInventories';
const getRoomDailyPriceApi = '/CRS/OnlineReservation/GetMonthyInventory';
const getRatePlanTypesApi = '/CRS/OnlineReservation/GetRatePlans';
const getHotelImagesApi = '/CRS/OnlineReservation/GetHotelImages';
const getHotelFacilitiesApi = '/CRS/OnlineReservation/GetHotelFacilities';
const getRoomFacilitiesApi =
 '/CRS/OnlineReservation/GetHotelRoomTypeFacilities';
const getSelectedRoomApi = '/CRS/OnlineReservation/AccommodationTypeInfo';
const getSelectedRoomsApi = '/CRS/OnlineReservation/GetAccommodationTypes';

function getRoomInventorySearch(query: GetRoomInventoryProps) {
 const searchParams = new URLSearchParams([
  ['noBreakfast', 'false'],
  ['fullBoard', 'false'],
  ['refundable', 'false'],
  ['person', '0'],
 ]);
 Object.entries(query).forEach(([key, val]) => {
  if (val !== undefined) {
   searchParams.set(key, String(val));
  }
 });
 return searchParams.toString();
}

function getHotelInfo({
 signal,
 ...queries
}: { signal: AbortSignal } & Pick<
 ApiCredentialProps,
 'hotelID' | 'channelID'
>) {
 const searchParams = new URLSearchParams();
 Object.entries(queries).forEach(([key, val]) => {
  if (val !== undefined) {
   searchParams.set(key, String(val));
  }
 });
 return axios.get<HotelInfo>(`${getHotelInfoApi}?${searchParams.toString()}`, {
  signal,
 });
}

function getRoomInventory({
 signal,
 ...queries
}: { signal: AbortSignal } & GetRoomInventoryProps) {
 return axios.get<RoomInventory[]>(
  `${getRoomInventoriesApi}?${getRoomInventorySearch(queries).toString()}`,
  { signal },
 );
}

function getRoomPriceDaily({
 signal,
 ...queries
}: {
 signal: AbortSignal;
 channelID: string;
 hotelID: string;
 providerID: string;
 startDate: string;
 endDate: string;
 roomTypeID: number;
 ratePlanID: number;
 arzID: string;
 beds: number;
}) {
 const searchParams = new URLSearchParams();
 Object.entries(queries).forEach(([key, val]) => {
  if (val !== undefined) {
   searchParams.set(key, String(val));
  }
 });
 return axios.get<RoomDailyPrice[]>(
  `${getRoomDailyPriceApi}?${searchParams.toString()}`,
  {
   signal,
  },
 );
}

function getSelectedRoom({
 signal,
 ...queries
}: {
 signal: AbortSignal;
 startDate: string;
 endDate: string;
 ratePlanID: number;
 bedCount: number;
 roomTypeID: number;
} & ApiCredentialProps) {
 const searchParams = new URLSearchParams();
 Object.entries(queries).forEach(([key, val]) => {
  if (val !== undefined) {
   searchParams.set(key, String(val));
  }
 });
 return axios.get<RoomInventory>(
  `${getSelectedRoomApi}?${searchParams.toString()}`,
  {
   signal,
  },
 );
}

function getSelectedRooms({
 roomInfo,
 signal,
 ...queries
}: {
 signal: AbortSignal;
 roomInfo: {
  roomTypeID: number;
  bedCount: number;
 }[];
 startDate: string;
 endDate: string;
 ratePlanID: number;
} & ApiCredentialProps) {
 const searchParams = new URLSearchParams();
 Object.entries(queries).forEach(([key, val]) => {
  if (val !== undefined) {
   searchParams.set(key, String(val));
  }
 });
 return axios.post<RoomInventory[]>(
  `${getSelectedRoomsApi}?${searchParams.toString()}`,
  roomInfo,
  {
   signal,
  },
 );
}

function getRatePlanTypes({
 signal,
 ...queries
}: {
 signal: AbortSignal;
} & Omit<ApiCredentialProps, 'arzID'>) {
 const searchParams = new URLSearchParams();
 Object.entries(queries).forEach(([key, val]) => {
  searchParams.set(key, String(val));
 });
 return axios.get<Pick<RatePlanType, 'ratePlanID' | 'fName'>[]>(
  `${getRatePlanTypesApi}?${searchParams.toString()}`,
  {
   signal,
  },
 );
}

export type {
 HotelInfo,
 HotelFacility,
 HotelImage,
 RoomInventory,
 GetRoomInventoryProps,
 RoomAccomodationType,
 RatePlanType,
};
export {
 getHotelInfoApi,
 getHotelFacilitiesApi,
 getRoomFacilitiesApi,
 getHotelImagesApi,
 getRoomInventoriesApi,
 getRoomDailyPriceApi,
 getSelectedRoomApi,
 getSelectedRoomsApi,
 getRatePlanTypesApi,
 getHotelInfo,
 getSelectedRoom,
 getRoomInventorySearch,
 getRoomInventory,
 getRoomPriceDaily,
 getSelectedRooms,
 getRatePlanTypes,
};
