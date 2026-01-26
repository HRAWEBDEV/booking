import { type SelectedRoom } from './hotelRoomsPickerReducer';
const localReserveInfoName = 'locale-reserve-info';

interface LocalReserveInfo {
 hotelID: string;
 fromDate: string;
 toDate: string;
 rooms: SelectedRoom[];
}

function clearLocalReserveInfo() {
 localStorage.removeItem(localReserveInfoName);
}

function getLocalReserveInfo(): LocalReserveInfo | null {
 const val = localStorage.getItem(localReserveInfoName);
 return val ? JSON.parse(val) : null;
}

function setLocalReserveInfo(newInfo: LocalReserveInfo | null) {
 if (!newInfo) {
  clearLocalReserveInfo();
  return;
 }
 localStorage.setItem(localReserveInfoName, JSON.stringify(newInfo));
}

export type { LocalReserveInfo };
export { clearLocalReserveInfo, getLocalReserveInfo, setLocalReserveInfo };
