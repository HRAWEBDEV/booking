import { type ReserveConfig } from '../services/reserve-config/reserveConfigContext';

type RoomsPickerActions =
 | {
    type: 'remove';
    payload: number;
   }
 | {
    type: 'insertRooms';
    payload: ReserveConfig['rooms']['storeRooms'];
   };

function reserveRoomsPickerReducer(
 state: ReserveConfig['rooms']['storeRooms'],
 action: RoomsPickerActions,
): ReserveConfig['rooms']['storeRooms'] {
 if (action.type === 'insertRooms') {
  return action.payload.map((item) => ({ ...item, isDeleted: false }));
 }
 if (action.type === 'remove') {
  return state.map((item, index) => {
   if (index === action.payload) {
    return { ...item, isDeleted: true };
   }
   return item;
  });
 }
 return state;
}

export type { RoomsPickerActions };
export { reserveRoomsPickerReducer };
