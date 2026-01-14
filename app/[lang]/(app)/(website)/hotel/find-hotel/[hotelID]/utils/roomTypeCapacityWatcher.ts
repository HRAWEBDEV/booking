import { type SelectedRoom } from './hotelRoomsPickerReducer';
import { type RoomInventory } from '../../../services/hotelApiActions';

type RoomTypeCapacityWatcher = Record<
 string,
 {
  isFull: boolean;
  roomTypeID: number;
  count: number;
 }
>;

function roomTypeCapacityWatcher({
 rooms,
 selectedRooms,
}: {
 rooms: RoomInventory[];
 selectedRooms: SelectedRoom[];
}): RoomTypeCapacityWatcher {
 const capacityInfo: RoomTypeCapacityWatcher = {};
 selectedRooms.forEach((room) => {
  const targetRoomType = rooms.find(
   (item) => item.roomTypeID === room.roomTypeID,
  );
  if (room.roomTypeID in capacityInfo) {
   const val = capacityInfo[room.roomTypeID];
   const newCount = val.count + room.count;
   capacityInfo[room.roomTypeID] = {
    ...val,
    count: newCount,
    isFull: (targetRoomType?.roomCount || 0) <= newCount,
   };
  } else {
   capacityInfo[room.roomTypeID] = {
    roomTypeID: room.roomTypeID,
    count: room.count,
    isFull: (targetRoomType?.roomCount || 0) <= room.count,
   };
  }
 });
 return capacityInfo;
}
export type { RoomTypeCapacityWatcher };
export { roomTypeCapacityWatcher };
