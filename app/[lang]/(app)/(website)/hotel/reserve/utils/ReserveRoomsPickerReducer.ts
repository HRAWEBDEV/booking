import { type RoomInventory } from '../../services/hotelApiActions';

type RoomsPickerActions =
 | {
    type: 'remove';
    payload: number;
   }
 | {
    type: 'insertRooms';
    payload: RoomInventory[];
   };

function reserveRoomsPickerReducer(
 state: RoomInventory[],
 action: RoomsPickerActions,
): RoomInventory[] {
 if (action.type === 'insertRooms') {
  return action.payload;
 }
 if (action.type === 'remove') {
  const newRooms = state.filter((_, i) => i !== action.payload);
  return newRooms;
 }
 return state;
}

export type { RoomsPickerActions };
export { reserveRoomsPickerReducer };
