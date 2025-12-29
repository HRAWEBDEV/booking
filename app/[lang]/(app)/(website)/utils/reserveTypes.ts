type ReserveType = 'hotel' | 'flights' | 'train' | 'bus' | 'car';

interface ReserveTypeInfo {
 title: ReserveType;
 active: boolean;
}

const reserveTypes: Record<ReserveType, ReserveTypeInfo> = {
 hotel: {
  title: 'hotel',
  active: true,
 },
 flights: {
  title: 'flights',
  active: true,
 },
 train: {
  title: 'train',
  active: true,
 },
 bus: {
  title: 'bus',
  active: true,
 },
 car: {
  title: 'car',
  active: true,
 },
} as const;

const reserveTypesList = Object.keys(reserveTypes) as ReserveType[];

function getReserveTypeInfo(reserveType: ReserveType): ReserveTypeInfo {
 if (reserveType in reserveTypes) return reserveTypes[reserveType];
 return reserveTypes['hotel'];
}

export type { ReserveType, ReserveTypeInfo };
export { reserveTypes, reserveTypesList, getReserveTypeInfo };
