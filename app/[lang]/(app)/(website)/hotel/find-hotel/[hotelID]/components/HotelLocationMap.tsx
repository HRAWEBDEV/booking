'use client';
import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { LatLngTuple, DivIcon } from 'leaflet';
import { type HotelInfo } from '../../../services/hotelApiActions';

export default function HotelLocationMap({
 hotelInfo,
}: {
 dic: PreviewHotelDictionary;
 hotelInfo: HotelInfo;
}) {
 const position = [hotelInfo.latitude!, hotelInfo.longitude!] as LatLngTuple;

 const createCustomIcon = () => {
  return new DivIcon({
   html: `<div style="
     color: #ef4444;
     transform: translate(-12px, -24px);
     filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
   ">
     <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
       <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
     </svg>
   </div>`,
   iconSize: [24, 24],
   className: 'custom-marker-icon',
  });
 };

 return (
  <MapContainer
   center={position}
   zoom={13}
   scrollWheelZoom={false}
   style={{ height: '100%', width: '100%', zIndex: 1 }}
  >
   <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
   />
   <Marker position={position} icon={createCustomIcon()}>
    <Popup>{hotelInfo.fName || 'Hotel Location'}</Popup>
   </Marker>
  </MapContainer>
 );
}
