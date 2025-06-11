// src/components/Map.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

function CountryMap({ latlng }) {
  if (!latlng || latlng.length === 0) return null;

  const position = latlng; 
  return (
    <MapContainer center={position} zoom={6} style={{ height: "300px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position}>
        <Popup>
          Latitude: {latlng[0]} <br /> Longitude: {latlng[1]}
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default CountryMap;


