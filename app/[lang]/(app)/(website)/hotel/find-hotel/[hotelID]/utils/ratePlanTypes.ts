import { RoomAccomodationType } from '../services/hotelApiActions';

export const ratePlanTypes: {
 type: keyof Pick<
  RoomAccomodationType['accommodationRatePlanModel']['ratePlanModel'],
  | 'noBreakfast'
  | 'nonRefundable'
  | 'withDinner'
  | 'withLunch'
  | 'limitedMenu'
  | 'freeChargeMinibar'
 >;
}[] = [
 { type: 'noBreakfast' },
 { type: 'nonRefundable' },
 {
  type: 'freeChargeMinibar',
 },
 { type: 'withDinner' },
 { type: 'withLunch' },
 { type: 'limitedMenu' },
];
