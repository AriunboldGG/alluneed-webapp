'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the map components to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { 
    ssr: false,
    loading: () => <div className="w-full h-full bg-gray-100 flex items-center justify-center">Loading map...</div>
  }
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
  const [customIcon, setCustomIcon] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [mapError, setMapError] = useState(false);
  const [isLeafletReady, setIsLeafletReady] = useState(false);
  const mapRef = useRef(null);
  
  // Default center (Ulaanbaatar coordinates)
  const defaultCenter = [47.9184, 106.9177];
  
  // Check if we're on client side
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Initialize Leaflet only when component is mounted and client-side
  useEffect(() => {
    if (!isClient) return;

    let isMounted = true;

    const initializeLeaflet = async () => {
      try {
        // Import Leaflet with proper error handling
        const leafletModule = await import('leaflet');
        const L = leafletModule.default || leafletModule;
        
        // Check if L and required methods exist
        if (!L || typeof L.divIcon !== 'function') {
          console.error('Leaflet divIcon method not available');
          if (isMounted) setMapError(true);
          return;
        }
        
        // Create the custom icon
        const icon = L.divIcon({
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
        
        if (isMounted) {
          setCustomIcon(icon);
          setIsLeafletReady(true);
        }
      } catch (error) {
        console.error('Error initializing Leaflet:', error);
        if (isMounted) {
          setMapError(true);
        }
      }
    };
    
    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      initializeLeaflet();
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [isClient]);

  // Cleanup function for map instance
  useEffect(() => {
    return () => {
      if (mapRef.current && mapRef.current._leaflet_events) {
        try {
          mapRef.current.remove();
        } catch (error) {
          console.error('Error cleaning up map:', error);
        }
      }
    };
  }, []);

  // Don't render anything if not on client side
  if (!isClient) {
    return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">Loading map...</div>
      </div>
    );
  }

  // Show error state if map failed to load
  if (mapError) {
    return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 mb-2">Map could not be loaded</div>
          <button 
            onClick={() => window.location.reload()} 
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  // Don't render map until Leaflet is ready
  if (!isLeafletReady) {
    return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">Initializing map...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <MapContainer
        center={defaultCenter}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
        key={isClient ? 'map-loaded' : 'map-loading'} // Force re-render when client is ready
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {billboards.map((billboard) => (
          <Marker
            key={billboard.id}
            position={billboard.coordinates}
            icon={customIcon} // Will use default icon if customIcon is null
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