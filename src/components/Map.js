'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the map components to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

const Map = ({ billboards = [] }) => {
  // Default center (Ulaanbaatar coordinates)
  const defaultCenter = [47.9184, 106.9177];
  
  // Create custom marker icon only on client side
  const createCustomIcon = () => {
    if (typeof window !== 'undefined') {
      const L = require('leaflet');
      return L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            width: 25px;
            height: 41px;
            background: #EF4444;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            margin: -20px -12px;
            position: relative;
          ">
            <div style="
              width: 15px;
              height: 15px;
              background: white;
              border-radius: 50%;
              position: absolute;
              top: 3px;
              left: 5px;
            ">
              <div style="
                width: 9px;
                height: 9px;
                background: #EF4444;
                border-radius: 50%;
                position: absolute;
                top: 3px;
                left: 3px;
              "></div>
            </div>
          </div>
        `,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });
    }
    return null;
  };
  
  const customIcon = createCustomIcon();

  return (
    <div className="w-full h-full">
      <MapContainer
        center={defaultCenter}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {billboards.map((billboard) => (
          <Marker
            key={billboard.id}
            position={billboard.coordinates}
            icon={customIcon}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {billboard.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {billboard.location}
                </p>
                <div className="text-xs text-gray-500">
                  <p>Code: {billboard.code}</p>
                  <p>Views: +{billboard.views}</p>
                  <p>{billboard.costPerView}</p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map; 