'use client';
import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { LatLngTuple, Icon, DivIcon } from 'leaflet';

export default function HotelLocationMap({
 dic,
}: {
 dic: PreviewHotelDictionary;
}) {
 const position = [32, 53] as LatLngTuple;

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
   <Marker
    position={position}
    icon={
     new Icon({
      iconUrl: '/images/map-marker.png',
      iconSize: [25, 40],
     })
    }
   >
    <Popup>
     A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
   </Marker>
  </MapContainer>
 );
}
