import { axios } from '@/app/[lang]/(app)/utils/defaultAxios';

interface HotelInfo {
 id: number;
 address: string | null;
 cityName: string | null;
 description: string | null;
 fName: string | null;
 faxNo: string | null;
 floors: number | null;
 hotelGradeID: number | null;
 hoteID: number;
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

const getHotelInfoApi = '/CRS/OnlineReservation/GetHotelInfo';
const getRoomInventoriesApi = '/CRS/OnlineReservation/GetRoomInventories';
const getRoomDailyPriceApi = '/CRS/OnlineReservation/GetMonthyInventory';
const getRatePlanTypesApi = '/CRS/OnlineReservation/GetRatePlans';
const getHotelImagesApi = '/CRS/OnlineReservation/GetHotelImages';
const getHotelFacilitiesApi = '/CRS/OnlineReservation/GetHotelFacilities';
const getRoomFacilitiesApi =
 '/CRS/OnlineReservation/GetHotelRoomTypeFacilities';

function getRoomInventorySearch(query: GetRoomInventoryProps) {
 const searchParams = new URLSearchParams([
  ['noBreakfast', 'false'],
  ['fullBoard', 'false'],
  ['refundable', 'false'],
  ['person', '0'],
 ]);
 Object.entries(query).forEach(([key, val]) => {
  if (val) searchParams.set(key, String(val));
 });
 return searchParams.toString();
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

export type {
 HotelInfo,
 HotelFacility,
 HotelImage,
 RoomInventory,
 GetRoomInventoryProps,
 RoomAccomodationType,
};
export {
 getHotelInfoApi,
 getHotelFacilitiesApi,
 getHotelImagesApi,
 getRoomInventoriesApi,
 getRoomInventorySearch,
 getRoomInventory,
};
