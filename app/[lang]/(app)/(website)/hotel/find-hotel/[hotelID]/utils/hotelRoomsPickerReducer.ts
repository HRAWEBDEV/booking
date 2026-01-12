interface SelectedRoom {
 roomTypeID: number;
 ratePlanID: number;
 ratePlanTypeID: number;
 beds: number;
 count: number;
}

type Room = Omit<SelectedRoom, 'count'>;

type RoomsPickerActions =
 | {
    type: 'increase';
    payload: Room;
   }
 | {
    type: 'decrease';
    payload: Room;
   }
 | {
    type: 'remove';
    payload: Room;
   };

function isTargetRoom(item: SelectedRoom, room: Room) {
 return (
  item.roomTypeID === room.roomTypeID &&
  item.ratePlanID === room.ratePlanID &&
  item.ratePlanTypeID === room.ratePlanTypeID &&
  item.beds === room.beds
 );
}
function findRoom(state: SelectedRoom[], room: Room) {
 const existedRoom = state.find((item) => isTargetRoom(item, room));
 return existedRoom;
}
function filterRoom(state: SelectedRoom[], room: Room) {
 return state.filter((item) => !isTargetRoom(item, room));
}

function hotelRoomsPickerReducer(
 state: SelectedRoom[],
 action: RoomsPickerActions,
): SelectedRoom[] {
 if (action.type === 'increase') {
  const existedRoom = findRoom(state, action.payload);
  if (existedRoom) {
   return state.map((item) => {
    if (item === existedRoom) {
     return { ...item, count: item.count + 1 };
    }
    return item;
   });
  }
  return [...state, { ...action.payload, count: 1 }];
 }
 if (action.type === 'decrease') {
  const existedRoom = findRoom(state, action.payload);
  if (!existedRoom) return state;
  if (existedRoom.count === 1) return filterRoom(state, action.payload);
  return state.map((item) => {
   if (isTargetRoom(item, action.payload)) {
    return { ...item, count: item.count - 1 };
   }
   return item;
  });
 }
 if (action.type === 'remove') {
  return filterRoom(state, action.payload);
 }
 return state;
}

export type { SelectedRoom, RoomsPickerActions, Room };
export { isTargetRoom, findRoom, hotelRoomsPickerReducer };
