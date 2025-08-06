'use client';

import React, { useEffect, useRef } from 'react';

const GoogleMapComponent = ({ liftboards = [], selectedLiftboard = null, billboards = [], selectedBillboard = null, center = { lat: 47.9184, lng: 106.9177 }, zoom = 13 }) => {
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
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        zoomControl: true,
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

    // Add markers for liftboards or billboards
    const items = liftboards.length > 0 ? liftboards : billboards;
    const selectedItem = selectedLiftboard || selectedBillboard;

    items.forEach((item) => {
      const marker = new window.google.maps.Marker({
        position: item.coordinates,
        map: mapInstanceRef.current,
        title: item.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: billboards.length > 0 
            ? (item.color === 'green' ? '#10B981' : item.color === 'orange' ? '#F97316' : '#FD3D80') 
            : '#EF4444',
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 2
        }
      });

      // Create info window content based on item type
      let infoContent = '';
      if (billboards.length > 0) {
        // Billboard info window
        infoContent = `
          <div style="padding: 8px; max-width: 200px;">
            <h3 style="margin: 0 0 4px 0; font-weight: 600; color: #111827;">${item.name}</h3>
            <p style="margin: 0 0 4px 0; font-size: 12px; color: #6B7280;">${item.location}</p>
            <div style="font-size: 11px; color: #9CA3AF;">
              <p style="margin: 2px 0;">Code: ${item.code}</p>
              <p style="margin: 2px 0;">Views: +${item.views}</p>
              <p style="margin: 2px 0;">${item.costPerView}</p>
            </div>
          </div>
        `;
      } else {
        // Liftboard info window
        infoContent = `
          <div style="padding: 8px; max-width: 200px;">
            <h3 style="margin: 0 0 4px 0; font-weight: 600; color: #111827;">${item.name}</h3>
            <p style="margin: 0 0 4px 0; font-size: 12px; color: #6B7280;">${item.location}</p>
            <div style="font-size: 11px; color: #9CA3AF;">
              <p style="margin: 2px 0;">Code: ${item.code}</p>
              <p style="margin: 2px 0;">Audience: ${item.audience}</p>
            </div>
          </div>
        `;
      }

      const infoWindow = new window.google.maps.InfoWindow({
        content: infoContent
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
  }, [liftboards, billboards, center, zoom]);

  // Handle selected item navigation
  useEffect(() => {
    const selectedItem = selectedLiftboard || selectedBillboard;
    if (selectedItem && mapInstanceRef.current) {
      // Find the marker for the selected item
      const items = liftboards.length > 0 ? liftboards : billboards;
      const markerIndex = items.findIndex(item => item.id === selectedItem.id);
      if (markerIndex !== -1 && markersRef.current[markerIndex]) {
        const marker = markersRef.current[markerIndex];
        
        // Pan to the marker with smooth animation
        mapInstanceRef.current.panTo(selectedItem.coordinates);
        
        // Set zoom level for better visibility
        mapInstanceRef.current.setZoom(15);
        
        // Create info window content based on item type
        let infoContent = '';
        if (billboards.length > 0) {
          // Billboard info window
          infoContent = `
            <div style="padding: 8px; max-width: 200px;">
              <h3 style="margin: 0 0 4px 0; font-weight: 600; color: #111827;">${selectedItem.name}</h3>
              <p style="margin: 0 0 4px 0; font-size: 12px; color: #6B7280;">${selectedItem.location}</p>
              <div style="font-size: 11px; color: #9CA3AF;">
                <p style="margin: 2px 0;">Code: ${selectedItem.code}</p>
                <p style="margin: 2px 0;">Views: +${selectedItem.views}</p>
                <p style="margin: 2px 0;">${selectedItem.costPerView}</p>
              </div>
            </div>
          `;
        } else {
          // Liftboard info window
          infoContent = `
            <div style="padding: 8px; max-width: 200px;">
              <h3 style="margin: 0 0 4px 0; font-weight: 600; color: #111827;">${selectedItem.name}</h3>
              <p style="margin: 0 0 4px 0; font-size: 12px; color: #6B7280;">${selectedItem.location}</p>
              <div style="font-size: 11px; color: #9CA3AF;">
                <p style="margin: 2px 0;">Code: ${selectedItem.code}</p>
                <p style="margin: 2px 0;">Audience: ${selectedItem.audience}</p>
              </div>
            </div>
          `;
        }
        
        const infoWindow = new window.google.maps.InfoWindow({
          content: infoContent
        });
        
        infoWindow.open(mapInstanceRef.current, marker);
        
        // Close info window after 3 seconds
        setTimeout(() => {
          infoWindow.close();
        }, 3000);
      }
    }
  }, [selectedLiftboard, selectedBillboard, liftboards, billboards]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full"
      style={{ 
        minHeight: '400px',
        width: '100%',
        height: '100%',
        margin: 0,
        padding: 0
      }}
    />
  );
};

export default GoogleMapComponent; 