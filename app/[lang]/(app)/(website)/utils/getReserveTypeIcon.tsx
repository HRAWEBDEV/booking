import { type ReserveType } from './reserveTypes';
import { FaHotel } from 'react-icons/fa6';
import { MdFlightTakeoff } from 'react-icons/md';
import { FaTrainSubway } from 'react-icons/fa6';
import { FaBus } from 'react-icons/fa6';
import { FaCar } from 'react-icons/fa';
import { SVGProps } from 'react';

export function getReserveTypeIcon(
 type?: ReserveType,
 props?: SVGProps<SVGSVGElement>,
) {
 switch (type) {
  case 'hotel':
   return <FaHotel {...props} />;
  case 'flights':
   return <MdFlightTakeoff {...props} />;
  case 'train':
   return <FaTrainSubway {...props} />;
  case 'bus':
   return <FaBus {...props} />;
  case 'car':
   return <FaCar {...props} />;
 }
 return <FaHotel />;
}
