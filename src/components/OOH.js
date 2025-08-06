'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import GoogleMapComponent from './GoogleMapComponent';

import { addToCalculator } from '@/lib/calculator';

const OOH = ({ searchQuery = '' }) => {
  const [selectedProvider, setSelectedProvider] = useState('JCDecaux');
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedCardForMap, setSelectedCardForMap] = useState(1); // Default to first card (Strong)

  const providers = ['JCDecaux', 'CCTS'];
  const options = ['Хувилбар А', 'Хувилбар Б', 'Хувилбар В'];

  const jcdecauxPackages = [
    {
      id: 1,
      name: 'Strong',
      nameMongolian: 'Багц',
      icon: '/icons/svg/tree.svg',
      data: {
        'Хувилбар А': {
          busStop: 30,
          infoFacility: 15,
          column: '-',
          flagFacility: '-',
          totalFacility: 27,
          area: 390
        },
        'Хувилбар Б': {
          busStop: 25,
          infoFacility: 12,
          column: '-',
          flagFacility: '-',
          totalFacility: 22,
          area: 320
        },
        'Хувилбар В': {
          busStop: 35,
          infoFacility: 18,
          column: '-',
          flagFacility: '-',
          totalFacility: 32,
          area: 450
        }
      }
    },
    {
      id: 2,
      name: 'Mini',
      nameMongolian: 'Багц',
      icon: '/icons/svg/navch.svg',
      data: {
        'Хувилбар А': {
          busStop: 18,
          infoFacility: 10,
          column: '-',
          flagFacility: '-',
          totalFacility: 15,
          area: 320
        },
        'Хувилбар Б': {
          busStop: 15,
          infoFacility: 8,
          column: '-',
          flagFacility: '-',
          totalFacility: 12,
          area: 280
        },
        'Хувилбар В': {
          busStop: 22,
          infoFacility: 12,
          column: '-',
          flagFacility: '-',
          totalFacility: 18,
          area: 360
        }
      }
    },
    {
      id: 3,
      name: 'Landmark',
      nameMongolian: 'Багц',
      icon: '/icons/svg/googlemap.svg',
      data: {
        'Хувилбар А': {
          busStop: 11,
          infoFacility: 5,
          column: '-',
          flagFacility: '-',
          totalFacility: 18,
          area: 200
        },
        'Хувилбар Б': {
          busStop: 9,
          infoFacility: 4,
          column: '-',
          flagFacility: '-',
          totalFacility: 15,
          area: 180
        },
        'Хувилбар В': {
          busStop: 13,
          infoFacility: 6,
          column: '-',
          flagFacility: '-',
          totalFacility: 21,
          area: 220
        }
      }
    },
    {
      id: 4,
      name: 'Петит',
      nameMongolian: 'Багц',
      icon: '/icons/svg/potit.svg',
      data: {
        'Хувилбар А': {
          busStop: '-',
          infoFacility: 1,
          column: 2,
          flagFacility: '-',
          totalFacility: 18,
          area: 110
        },
        'Хувилбар Б': {
          busStop: '-',
          infoFacility: 1,
          column: 1,
          flagFacility: '-',
          totalFacility: 15,
          area: 95
        },
        'Хувилбар В': {
          busStop: '-',
          infoFacility: 2,
          column: 3,
          flagFacility: '-',
          totalFacility: 21,
          area: 125
        }
      }
    },
    {
      id: 5,
      name: 'Тугт',
      nameMongolian: 'Багц',
      icon: '/icons/svg/flag.svg',
      data: {
        'Хувилбар А': {
          busStop: '-',
          infoFacility: '-',
          column: '-',
          flagFacility: 8,
          totalFacility: 8,
          area: 35.2
        },
        'Хувилбар Б': {
          busStop: '-',
          infoFacility: '-',
          column: '-',
          flagFacility: 6,
          totalFacility: 6,
          area: 28.5
        },
        'Хувилбар В': {
          busStop: '-',
          infoFacility: '-',
          column: '-',
          flagFacility: 10,
          totalFacility: 10,
          area: 42.0
        }
      }
    }
  ];

  const cctsPackages = [
    {
      id: 1,
      name: 'Premium',
      nameMongolian: 'Багц',
      icon: '/icons/svg/tree.svg',
      data: {
        'Хувилбар А': {
          busStop: 45,
          infoFacility: 22,
          column: '-',
          flagFacility: '-',
          totalFacility: 35,
          area: 520
        },
        'Хувилбар Б': {
          busStop: 38,
          infoFacility: 18,
          column: '-',
          flagFacility: '-',
          totalFacility: 28,
          area: 450
        },
        'Хувилбар В': {
          busStop: 52,
          infoFacility: 26,
          column: '-',
          flagFacility: '-',
          totalFacility: 42,
          area: 590
        }
      }
    },
    {
      id: 2,
      name: 'Standard',
      nameMongolian: 'Багц',
      icon: '/icons/svg/navch.svg',
      data: {
        'Хувилбар А': {
          busStop: 25,
          infoFacility: 12,
          column: '-',
          flagFacility: '-',
          totalFacility: 20,
          area: 380
        },
        'Хувилбар Б': {
          busStop: 20,
          infoFacility: 10,
          column: '-',
          flagFacility: '-',
          totalFacility: 16,
          area: 320
        },
        'Хувилбар В': {
          busStop: 30,
          infoFacility: 14,
          column: '-',
          flagFacility: '-',
          totalFacility: 24,
          area: 440
        }
      }
    },
    {
      id: 3,
      name: 'Express',
      nameMongolian: 'Багц',
      icon: '/icons/svg/googlemap.svg',
      data: {
        'Хувилбар А': {
          busStop: 15,
          infoFacility: 8,
          column: '-',
          flagFacility: '-',
          totalFacility: 12,
          area: 180
        },
        'Хувилбар Б': {
          busStop: 12,
          infoFacility: 6,
          column: '-',
          flagFacility: '-',
          totalFacility: 9,
          area: 150
        },
        'Хувилбар В': {
          busStop: 18,
          infoFacility: 10,
          column: '-',
          flagFacility: '-',
          totalFacility: 15,
          area: 210
        }
      }
    },
    {
      id: 4,
      name: 'Basic',
      nameMongolian: 'Багц',
      icon: '/icons/svg/potit.svg',
      data: {
        'Хувилбар А': {
          busStop: '-',
          infoFacility: 2,
          column: 3,
          flagFacility: '-',
          totalFacility: 22,
          area: 140
        },
        'Хувилбар Б': {
          busStop: '-',
          infoFacility: 1,
          column: 2,
          flagFacility: '-',
          totalFacility: 18,
          area: 120
        },
        'Хувилбар В': {
          busStop: '-',
          infoFacility: 3,
          column: 4,
          flagFacility: '-',
          totalFacility: 26,
          area: 160
        }
      }
    },
    {
      id: 5,
      name: 'Compact',
      nameMongolian: 'Багц',
      icon: '/icons/svg/flag.svg',
      data: {
        'Хувилбар А': {
          busStop: '-',
          infoFacility: '-',
          column: '-',
          flagFacility: 12,
          totalFacility: 12,
          area: 45.5
        },
        'Хувилбар Б': {
          busStop: '-',
          infoFacility: '-',
          column: '-',
          flagFacility: 10,
          totalFacility: 10,
          area: 38.0
        },
        'Хувилбар В': {
          busStop: '-',
          infoFacility: '-',
          column: '-',
          flagFacility: 14,
          totalFacility: 14,
          area: 53.0
        }
      }
    }
  ];

  const packages = selectedProvider === 'JCDecaux' ? jcdecauxPackages : cctsPackages;

  // Filter packages based on search query
  const filteredPackages = packages.filter(pkg => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      pkg.name.toLowerCase().includes(query) ||
      pkg.nameMongolian.toLowerCase().includes(query) ||
      selectedProvider.toLowerCase().includes(query)
    );
  });

  const dataLabels = {
    busStop: 'Автобусны зогсоол',
    infoFacility: 'Мэдээллийн байгууламж',
    column: 'Колуми',
    flagFacility: 'Тугт байгууламж',
    totalFacility: 'Нийт байгууламж',
    area: 'Талбай м²'
  };

  // Billboard locations for each package and option
  const getBillboardsForPackage = (pkgId, option) => {
    // All 5 landmark locations for Option A
    const allLandmarks = [
      { id: 1, name: 'Beatles Monument Billboard', location: 'Beatles Monument (Beatles Square)', code: 'LND001', views: '15,000', costPerView: '₮2.50', coordinates: { lat: 47.9153, lng: 106.9065 } },
      { id: 2, name: 'Mongolian Theatre Museum Billboard', location: 'Mongolian Theatre Museum', code: 'LND002', views: '12,000', costPerView: '₮2.80', coordinates: { lat: 47.91953, lng: 106.91975 } },
      { id: 3, name: 'National Art Gallery Billboard', location: 'National Art Gallery', code: 'LND003', views: '18,000', costPerView: '₮2.20', coordinates: { lat: 47.91954, lng: 106.92098 } },
      { id: 4, name: 'Sükhbaatar Square Billboard', location: 'Sükhbaatar Square & Government Palace', code: 'LND004', views: '20,000', costPerView: '₮2.00', coordinates: { lat: 47.9180, lng: 106.9170 } },
      { id: 5, name: 'National Opera Billboard', location: 'National Opera & Ballet Theatre', code: 'LND005', views: '16,000', costPerView: '₮2.30', coordinates: { lat: 47.9186, lng: 106.9193 } }
    ];

    const optionALocations = {
      1: allLandmarks, // Strong - All 5 landmarks
      2: allLandmarks, // Mini - All 5 landmarks  
      3: allLandmarks, // Landmark - All 5 landmarks
      4: allLandmarks, // Петит - All 5 landmarks
      5: allLandmarks  // Тугт - All 5 landmarks
    };

    // Option B locations (green markers)
    const optionBLocations = {
      1: [ // Strong - Option B locations
        { id: 1, name: 'Khoroo Administrative Office Billboard', location: 'Khoroo Administrative Office', code: 'STR001', views: '15,000', costPerView: '₮2.50', coordinates: { lat: 47.9220, lng: 106.9410 }, color: 'green' },
        { id: 2, name: 'Local Health Clinic Billboard', location: 'Local Health Clinic', code: 'STR002', views: '12,000', costPerView: '₮2.80', coordinates: { lat: 47.9222, lng: 106.9420 }, color: 'green' },
        { id: 3, name: 'Police Safety Department Billboard', location: 'Police / Safety Department', code: 'STR003', views: '18,000', costPerView: '₮2.20', coordinates: { lat: 47.9223, lng: 106.9405 }, color: 'green' },
        { id: 4, name: 'Bilgbtboorj Geodetic Survey Billboard', location: 'Bilgbtboorj Geodetic Survey Company', code: 'STR004', views: '14,000', costPerView: '₮2.60', coordinates: { lat: 47.9230, lng: 106.9450 }, color: 'green' },
        { id: 5, name: 'Elderly Hospital Project Billboard', location: 'Parking / Elderly Hospital Project Zone', code: 'STR005', views: '16,000', costPerView: '₮2.40', coordinates: { lat: 47.9215, lng: 106.9435 }, color: 'green' }
      ],
      2: [ // Mini - Option B locations
        { id: 6, name: 'Khoroo Office Mini Billboard', location: 'Khoroo Administrative Office', code: 'MIN001', views: '8,000', costPerView: '₮3.20', coordinates: { lat: 47.9220, lng: 106.9410 }, color: 'green' },
        { id: 7, name: 'Health Clinic Mini Billboard', location: 'Local Health Clinic', code: 'MIN002', views: '6,500', costPerView: '₮3.50', coordinates: { lat: 47.9222, lng: 106.9420 }, color: 'green' },
        { id: 8, name: 'Police Department Mini Billboard', location: 'Police / Safety Department', code: 'MIN003', views: '7,200', costPerView: '₮3.30', coordinates: { lat: 47.9223, lng: 106.9405 }, color: 'green' },
        { id: 9, name: 'Geodetic Survey Mini Billboard', location: 'Bilgbtboorj Geodetic Survey Company', code: 'MIN004', views: '5,800', costPerView: '₮3.80', coordinates: { lat: 47.9230, lng: 106.9450 }, color: 'green' },
        { id: 10, name: 'Hospital Project Mini Billboard', location: 'Parking / Elderly Hospital Project Zone', code: 'MIN005', views: '6,800', costPerView: '₮3.40', coordinates: { lat: 47.9215, lng: 106.9435 }, color: 'green' }
      ],
      3: [ // Landmark - Option B locations
        { id: 11, name: 'Khoroo Office Landmark Billboard', location: 'Khoroo Administrative Office', code: 'LND001', views: '25,000', costPerView: '₮1.80', coordinates: { lat: 47.9220, lng: 106.9410 }, color: 'green' },
        { id: 12, name: 'Health Clinic Landmark Billboard', location: 'Local Health Clinic', code: 'LND002', views: '22,000', costPerView: '₮2.00', coordinates: { lat: 47.9222, lng: 106.9420 }, color: 'green' },
        { id: 13, name: 'Police Department Landmark Billboard', location: 'Police / Safety Department', code: 'LND003', views: '24,000', costPerView: '₮1.90', coordinates: { lat: 47.9223, lng: 106.9405 }, color: 'green' },
        { id: 14, name: 'Geodetic Survey Landmark Billboard', location: 'Bilgbtboorj Geodetic Survey Company', code: 'LND004', views: '20,000', costPerView: '₮2.10', coordinates: { lat: 47.9230, lng: 106.9450 }, color: 'green' },
        { id: 15, name: 'Hospital Project Landmark Billboard', location: 'Parking / Elderly Hospital Project Zone', code: 'LND005', views: '23,000', costPerView: '₮1.95', coordinates: { lat: 47.9215, lng: 106.9435 }, color: 'green' }
      ],
      4: [ // Петит - Option B locations
        { id: 16, name: 'Khoroo Office Petit Billboard', location: 'Khoroo Administrative Office', code: 'PET001', views: '5,000', costPerView: '₮4.00', coordinates: { lat: 47.9220, lng: 106.9410 }, color: 'green' },
        { id: 17, name: 'Health Clinic Petit Billboard', location: 'Local Health Clinic', code: 'PET002', views: '4,500', costPerView: '₮4.20', coordinates: { lat: 47.9222, lng: 106.9420 }, color: 'green' },
        { id: 18, name: 'Police Department Petit Billboard', location: 'Police / Safety Department', code: 'PET003', views: '4,800', costPerView: '₮4.10', coordinates: { lat: 47.9223, lng: 106.9405 }, color: 'green' },
        { id: 19, name: 'Geodetic Survey Petit Billboard', location: 'Bilgbtboorj Geodetic Survey Company', code: 'PET004', views: '4,200', costPerView: '₮4.40', coordinates: { lat: 47.9230, lng: 106.9450 }, color: 'green' },
        { id: 20, name: 'Hospital Project Petit Billboard', location: 'Parking / Elderly Hospital Project Zone', code: 'PET005', views: '4,600', costPerView: '₮4.15', coordinates: { lat: 47.9215, lng: 106.9435 }, color: 'green' }
      ],
      5: [ // Тугт - Option B locations
        { id: 21, name: 'Khoroo Office Flag Billboard', location: 'Khoroo Administrative Office', code: 'FLG001', views: '3,000', costPerView: '₮5.50', coordinates: { lat: 47.9220, lng: 106.9410 }, color: 'green' },
        { id: 22, name: 'Health Clinic Flag Billboard', location: 'Local Health Clinic', code: 'FLG002', views: '2,800', costPerView: '₮5.80', coordinates: { lat: 47.9222, lng: 106.9420 }, color: 'green' },
        { id: 23, name: 'Police Department Flag Billboard', location: 'Police / Safety Department', code: 'FLG003', views: '2,900', costPerView: '₮5.60', coordinates: { lat: 47.9223, lng: 106.9405 }, color: 'green' },
        { id: 24, name: 'Geodetic Survey Flag Billboard', location: 'Bilgbtboorj Geodetic Survey Company', code: 'FLG004', views: '2,600', costPerView: '₮6.00', coordinates: { lat: 47.9230, lng: 106.9450 }, color: 'green' },
        { id: 25, name: 'Hospital Project Flag Billboard', location: 'Parking / Elderly Hospital Project Zone', code: 'FLG005', views: '2,700', costPerView: '₮5.90', coordinates: { lat: 47.9215, lng: 106.9435 }, color: 'green' }
      ]
    };

    // Option C locations (orange markers)
    const optionCLocations = {
      1: [ // Strong - Option C locations
        { id: 1, name: 'Youth Federation Billboard', location: 'Youth Federation (Micro-15)', code: 'STR001', views: '15,000', costPerView: '₮2.50', coordinates: { lat: 47.9210, lng: 106.9440 }, color: 'orange' },
        { id: 2, name: 'Phoenix Gym Center Billboard', location: 'Phoenix Gym Center (15 Street)', code: 'STR002', views: '12,000', costPerView: '₮2.80', coordinates: { lat: 47.921661, lng: 106.943837 }, color: 'orange' },
        { id: 3, name: 'Military Museum Billboard', location: 'Mongolian Military Museum', code: 'STR003', views: '18,000', costPerView: '₮2.20', coordinates: { lat: 47.9190, lng: 106.9620 }, color: 'orange' },
        { id: 4, name: 'Saints Peter & Paul Cathedral Billboard', location: 'Saints Peter & Paul Cathedral', code: 'STR004', views: '14,000', costPerView: '₮2.60', coordinates: { lat: 47.9200, lng: 106.9450 }, color: 'orange' },
        { id: 5, name: 'Holy Trinity Church Billboard', location: 'Holy Trinity Church (Russian Orthodox)', code: 'STR005', views: '16,000', costPerView: '₮2.40', coordinates: { lat: 47.9220, lng: 106.9460 }, color: 'orange' }
      ],
      2: [ // Mini - Option C locations
        { id: 6, name: 'Youth Federation Mini Billboard', location: 'Youth Federation (Micro-15)', code: 'MIN001', views: '8,000', costPerView: '₮3.20', coordinates: { lat: 47.9210, lng: 106.9440 }, color: 'orange' },
        { id: 7, name: 'Phoenix Gym Mini Billboard', location: 'Phoenix Gym Center (15 Street)', code: 'MIN002', views: '6,500', costPerView: '₮3.50', coordinates: { lat: 47.921661, lng: 106.943837 }, color: 'orange' },
        { id: 8, name: 'Military Museum Mini Billboard', location: 'Mongolian Military Museum', code: 'MIN003', views: '7,200', costPerView: '₮3.30', coordinates: { lat: 47.9190, lng: 106.9620 }, color: 'orange' },
        { id: 9, name: 'Cathedral Mini Billboard', location: 'Saints Peter & Paul Cathedral', code: 'MIN004', views: '5,800', costPerView: '₮3.80', coordinates: { lat: 47.9200, lng: 106.9450 }, color: 'orange' },
        { id: 10, name: 'Trinity Church Mini Billboard', location: 'Holy Trinity Church (Russian Orthodox)', code: 'MIN005', views: '6,800', costPerView: '₮3.40', coordinates: { lat: 47.9220, lng: 106.9460 }, color: 'orange' }
      ],
      3: [ // Landmark - Option C locations
        { id: 11, name: 'Youth Federation Landmark Billboard', location: 'Youth Federation (Micro-15)', code: 'LND001', views: '25,000', costPerView: '₮1.80', coordinates: { lat: 47.9210, lng: 106.9440 }, color: 'orange' },
        { id: 12, name: 'Phoenix Gym Landmark Billboard', location: 'Phoenix Gym Center (15 Street)', code: 'LND002', views: '22,000', costPerView: '₮2.00', coordinates: { lat: 47.921661, lng: 106.943837 }, color: 'orange' },
        { id: 13, name: 'Military Museum Landmark Billboard', location: 'Mongolian Military Museum', code: 'LND003', views: '24,000', costPerView: '₮1.90', coordinates: { lat: 47.9190, lng: 106.9620 }, color: 'orange' },
        { id: 14, name: 'Cathedral Landmark Billboard', location: 'Saints Peter & Paul Cathedral', code: 'LND004', views: '20,000', costPerView: '₮2.10', coordinates: { lat: 47.9200, lng: 106.9450 }, color: 'orange' },
        { id: 15, name: 'Trinity Church Landmark Billboard', location: 'Holy Trinity Church (Russian Orthodox)', code: 'LND005', views: '23,000', costPerView: '₮1.95', coordinates: { lat: 47.9220, lng: 106.9460 }, color: 'orange' }
      ],
      4: [ // Петит - Option C locations
        { id: 16, name: 'Youth Federation Petit Billboard', location: 'Youth Federation (Micro-15)', code: 'PET001', views: '5,000', costPerView: '₮4.00', coordinates: { lat: 47.9210, lng: 106.9440 }, color: 'orange' },
        { id: 17, name: 'Phoenix Gym Petit Billboard', location: 'Phoenix Gym Center (15 Street)', code: 'PET002', views: '4,500', costPerView: '₮4.20', coordinates: { lat: 47.921661, lng: 106.943837 }, color: 'orange' },
        { id: 18, name: 'Military Museum Petit Billboard', location: 'Mongolian Military Museum', code: 'PET003', views: '4,800', costPerView: '₮4.10', coordinates: { lat: 47.9190, lng: 106.9620 }, color: 'orange' },
        { id: 19, name: 'Cathedral Petit Billboard', location: 'Saints Peter & Paul Cathedral', code: 'PET004', views: '4,200', costPerView: '₮4.40', coordinates: { lat: 47.9200, lng: 106.9450 }, color: 'orange' },
        { id: 20, name: 'Trinity Church Petit Billboard', location: 'Holy Trinity Church (Russian Orthodox)', code: 'PET005', views: '4,600', costPerView: '₮4.15', coordinates: { lat: 47.9220, lng: 106.9460 }, color: 'orange' }
      ],
      5: [ // Тугт - Option C locations
        { id: 21, name: 'Youth Federation Flag Billboard', location: 'Youth Federation (Micro-15)', code: 'FLG001', views: '3,000', costPerView: '₮5.50', coordinates: { lat: 47.9210, lng: 106.9440 }, color: 'orange' },
        { id: 22, name: 'Phoenix Gym Flag Billboard', location: 'Phoenix Gym Center (15 Street)', code: 'FLG002', views: '2,800', costPerView: '₮5.80', coordinates: { lat: 47.921661, lng: 106.943837 }, color: 'orange' },
        { id: 23, name: 'Military Museum Flag Billboard', location: 'Mongolian Military Museum', code: 'FLG003', views: '2,900', costPerView: '₮5.60', coordinates: { lat: 47.9190, lng: 106.9620 }, color: 'orange' },
        { id: 24, name: 'Cathedral Flag Billboard', location: 'Saints Peter & Paul Cathedral', code: 'FLG004', views: '2,600', costPerView: '₮6.00', coordinates: { lat: 47.9200, lng: 106.9450 }, color: 'orange' },
        { id: 25, name: 'Trinity Church Flag Billboard', location: 'Holy Trinity Church (Russian Orthodox)', code: 'FLG005', views: '2,700', costPerView: '₮5.90', coordinates: { lat: 47.9220, lng: 106.9460 }, color: 'orange' }
      ]
    };

    // Return different billboards based on option
    const optionMultiplier = {
      'Хувилбар А': 1,
      'Хувилбар Б': 0.8,
      'Хувилбар В': 1.2
    };

    // Use different locations based on option
    let baseBillboards = [];
    if (option === 'Хувилбар А') {
      baseBillboards = optionALocations[pkgId] || [];
    } else if (option === 'Хувилбар Б') {
      baseBillboards = optionBLocations[pkgId] || [];
    } else {
      baseBillboards = optionCLocations[pkgId] || [];
    }
    
    const multiplier = optionMultiplier[option] || 1;

    return baseBillboards.map(billboard => ({
      ...billboard,
      views: Math.round(parseInt(billboard.views.replace(',', '')) * multiplier).toLocaleString(),
      costPerView: `₮${(parseFloat(billboard.costPerView.replace('₮', '')) / multiplier).toFixed(2)}`
    }));
  };

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <input type="checkbox" className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black" />
          <h2 className="text-2xl font-semibold text-gray-900">OOH</h2>
        </div>
        
        {/* Provider Filter Buttons */}
        <div className="inline-flex bg-white rounded-full p-1">
          {providers.map((provider) => (
            <button
              key={provider}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                selectedProvider === provider 
                  ? 'bg-gray-100 text-gray-800' 
                  : 'bg-white text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setSelectedProvider(provider)}
            >
              {provider}
            </button>
          ))}
        </div>
      </div>

      {/* Package Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {filteredPackages.length === 0 ? (
          <div className="col-span-full text-center py-8">
                            <p className="text-gray-500 text-lg">No OOH packages found for &quot;{searchQuery}&quot;</p>
          </div>
        ) : (
          filteredPackages.map((pkg) => (
          <Card key={pkg.id} className="bg-white shadow-sm border border-gray-200">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-[999px] flex items-center justify-center p-2">
                  <img src={pkg.icon} alt={pkg.name} className="w-4 h-4" />
                </div>
                <div className="flex items-center space-x-1">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {pkg.name}
                  </CardTitle>
                  <span className="text-sm text-gray-500">/ {pkg.nameMongolian}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="border border-gray-200 rounded-[24px] p-4 space-y-3">
                {Object.entries(dataLabels).map(([key, label]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{label}</span>
                                         <span className="text-sm font-medium text-gray-900">
                       {pkg.data[selectedOptions[pkg.id] || 'Хувилбар А'][key]}
                     </span>
                  </div>
                ))}
              </div>
              
                             {/* Dropdown Section */}
                                <div className="border border-gray-200 rounded-[24px] h-10 flex items-center px-4">
                   <select
                     value={selectedOptions[pkg.id] || 'Хувилбар А'}
                     onChange={(e) => {
                       setSelectedOptions(prev => ({
                         ...prev,
                         [pkg.id]: e.target.value
                       }));
                       setSelectedCardForMap(pkg.id);
                     }}
                     className="w-full border-0 text-sm focus:outline-none bg-transparent"
                   >
                     {options.map((option) => (
                       <option key={option} value={option}>{option}</option>
                     ))}
                   </select>
                 </div>
            </CardContent>

                         <CardFooter>
               <div className="flex space-x-2 w-full">
                 <button className="flex-1 bg-white border border-gray-300 text-[#09090B] px-4 py-2 rounded-[999px] text-base font-medium leading-6 tracking-normal hover:bg-[#09090B] hover:text-white transition-colors cursor-pointer">
                   View details
                 </button>
                 <button 
                   className="flex-1 bg-white border border-gray-300 text-[#09090B] px-4 py-2 rounded-[999px] text-base font-medium leading-6 tracking-normal hover:bg-[#09090B] hover:text-white transition-colors cursor-pointer flex items-center justify-center space-x-2"
                   onClick={() => addToCalculator({ 
                     id: pkg.id,
                     type: 'ooh', 
                     name: `${pkg.name} / ${pkg.nameMongolian}`,
                     provider: selectedProvider,
                     option: selectedOptions[pkg.id] || 'Хувилбар А',
                     busStops: pkg.data[selectedOptions[pkg.id] || 'Хувилбар А'].busStop,
                     infoFacilities: pkg.data[selectedOptions[pkg.id] || 'Хувилбар А'].infoFacility,
                     columns: pkg.data[selectedOptions[pkg.id] || 'Хувилбар А'].column,
                     flagpoleFacilities: pkg.data[selectedOptions[pkg.id] || 'Хувилбар А'].flagFacility,
                     totalFacilities: pkg.data[selectedOptions[pkg.id] || 'Хувилбар А'].totalFacility,
                     area: pkg.data[selectedOptions[pkg.id] || 'Хувилбар А'].area
                   })}
                 >
                   <img src="/icons/svg/plus.svg" alt="Add" className="w-5 h-5" />
                   <span>Add</span>
                 </button>
               </div>
             </CardFooter>
          </Card>
        ))
                 )}
       </div>

       {/* Google Maps Section */}
       {selectedCardForMap && (
         <div className="mt-8">
           <div className="bg-white border border-gray-200 rounded-lg p-6">
                           <h3 className="text-lg font-semibold text-gray-900 mb-4">
               {selectedProvider} Locations - {filteredPackages.find(pkg => pkg.id === selectedCardForMap)?.name} ({selectedOptions[selectedCardForMap] || 'Хувилбар А'})
              </h3>
             <div className="w-full h-96 rounded-lg overflow-hidden">
               <GoogleMapComponent 
                 billboards={getBillboardsForPackage(selectedCardForMap, selectedOptions[selectedCardForMap] || 'Хувилбар А')}
                 center={{ lat: 47.9184, lng: 106.9177 }}
                 zoom={12}
               />
             </div>
             <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
               {getBillboardsForPackage(selectedCardForMap, selectedOptions[selectedCardForMap] || 'Хувилбар А').map((billboard) => (
                 <div key={billboard.id} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                   <h4 className="font-medium text-sm text-gray-900 mb-1">{billboard.name}</h4>
                   <p className="text-xs text-gray-600 mb-2">{billboard.location}</p>
                   <div className="flex justify-between text-xs">
                     <span className="text-gray-500">Code: {billboard.code}</span>
                     <span className="text-gray-500">Views: {billboard.views}</span>
                   </div>
                   <p className="text-xs text-gray-600 mt-1">{billboard.costPerView}</p>
                 </div>
               ))}
             </div>
           </div>
         </div>
       )}
     </div>
   );
 };

export default OOH; 