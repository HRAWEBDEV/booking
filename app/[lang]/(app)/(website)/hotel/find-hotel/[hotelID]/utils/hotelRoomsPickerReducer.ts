type SelectedRoom = {
 roomTypeID: number;
 ratePlanID: number;
 beds: number;
 count: number;
};
type RoomsPickerActions =
 | {
    type: 'increase';
    payload: SelectedRoom;
   }
 | {
    type: 'decrease';
    payload: SelectedRoom;
   };

function hotelRoomsPickerReducer(
 state: SelectedRoom[],
 action: RoomsPickerActions,
): SelectedRoom[] {
 if (action.type === 'increase') {
 }
 if (action.type === 'decrease') {
 }
 return state;
}

export type { SelectedRoom, RoomsPickerActions };
export { hotelRoomsPickerReducer };
