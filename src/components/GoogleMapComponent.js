'use client';

import React, { useEffect, useRef } from 'react';

const GoogleMapComponent = ({ liftboards = [], center = { lat: 47.9184, lng: 106.9177 }, zoom = 13 }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    // Check if Google Maps is loaded
    if (!window.google || !window.google.maps) {
      console.warn('Google Maps API not loaded');
      return;
    }

    // Initialize map
    if (mapRef.current && !mapInstanceRef.current) {
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        center: center,
        zoom: zoom,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });
    }

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Add markers for each liftboard
    liftboards.forEach((liftboard) => {
      const marker = new window.google.maps.Marker({
        position: liftboard.coordinates,
        map: mapInstanceRef.current,
        title: liftboard.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#EF4444',
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 2
        }
      });

      // Create info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 8px; max-width: 200px;">
            <h3 style="margin: 0 0 4px 0; font-weight: 600; color: #111827;">${liftboard.name}</h3>
            <p style="margin: 0 0 4px 0; font-size: 12px; color: #6B7280;">${liftboard.location}</p>
            <div style="font-size: 11px; color: #9CA3AF;">
              <p style="margin: 2px 0;">Code: ${liftboard.code}</p>
              <p style="margin: 2px 0;">Views: +${liftboard.views}</p>
              <p style="margin: 2px 0;">${liftboard.price}</p>
            </div>
          </div>
        `
      });

      // Add click listener
      marker.addListener('click', () => {
        infoWindow.open(mapInstanceRef.current, marker);
      });

      markersRef.current.push(marker);
    });

    // Cleanup function
    return () => {
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
    };
  }, [liftboards, center, zoom]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full rounded-lg"
      style={{ minHeight: '400px' }}
    />
  );
};

export default GoogleMapComponent; 