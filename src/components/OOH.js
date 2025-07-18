'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { addToCalculator } from '@/lib/calculator';

const OOH = () => {
  const [selectedProvider, setSelectedProvider] = useState('JCDecaux');

  const providers = ['JCDecaux', 'CCTS'];

  const jcdecauxPackages = [
    {
      id: 1,
      name: 'Strong',
      nameMongolian: 'Багц',
      icon: '/icons/svg/tree.svg',
      data: {
        busStop: 30,
        infoFacility: 15,
        column: '-',
        flagFacility: '-',
        totalFacility: 27,
        area: 390
      }
    },
    {
      id: 2,
      name: 'Mini',
      nameMongolian: 'Багц',
      icon: '/icons/svg/navch.svg',
      data: {
        busStop: 18,
        infoFacility: 10,
        column: '-',
        flagFacility: '-',
        totalFacility: 15,
        area: 320
      }
    },
    {
      id: 3,
      name: 'Landmark',
      nameMongolian: 'Багц',
      icon: '/icons/svg/googlemap.svg',
      data: {
        busStop: 11,
        infoFacility: 5,
        column: '-',
        flagFacility: '-',
        totalFacility: 18,
        area: 200
      }
    },
    {
      id: 4,
      name: 'Петит',
      nameMongolian: 'Багц',
      icon: '/icons/svg/potit.svg',
      data: {
        busStop: '-',
        infoFacility: 1,
        column: 2,
        flagFacility: '-',
        totalFacility: 18,
        area: 110
      }
    },
    {
      id: 5,
      name: 'Тугт',
      nameMongolian: 'Багц',
      icon: '/icons/svg/flag.svg',
      data: {
        busStop: '-',
        infoFacility: '-',
        column: '-',
        flagFacility: 8,
        totalFacility: 8,
        area: 35.2
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
        busStop: 45,
        infoFacility: 22,
        column: '-',
        flagFacility: '-',
        totalFacility: 35,
        area: 520
      }
    },
    {
      id: 2,
      name: 'Standard',
      nameMongolian: 'Багц',
      icon: '/icons/svg/navch.svg',
      data: {
        busStop: 25,
        infoFacility: 12,
        column: '-',
        flagFacility: '-',
        totalFacility: 20,
        area: 380
      }
    },
    {
      id: 3,
      name: 'Express',
      nameMongolian: 'Багц',
      icon: '/icons/svg/googlemap.svg',
      data: {
        busStop: 15,
        infoFacility: 8,
        column: '-',
        flagFacility: '-',
        totalFacility: 12,
        area: 180
      }
    },
    {
      id: 4,
      name: 'Basic',
      nameMongolian: 'Багц',
      icon: '/icons/svg/potit.svg',
      data: {
        busStop: '-',
        infoFacility: 2,
        column: 3,
        flagFacility: '-',
        totalFacility: 22,
        area: 140
      }
    },
    {
      id: 5,
      name: 'Compact',
      nameMongolian: 'Багц',
      icon: '/icons/svg/flag.svg',
      data: {
        busStop: '-',
        infoFacility: '-',
        column: '-',
        flagFacility: 12,
        totalFacility: 12,
        area: 45.5
      }
    }
  ];

  const packages = selectedProvider === 'JCDecaux' ? jcdecauxPackages : cctsPackages;

  const dataLabels = {
    busStop: 'Автобусны зогсоол',
    infoFacility: 'Мэдээллийн байгууламж',
    column: 'Колуми',
    flagFacility: 'Тугт байгууламж',
    totalFacility: 'Нийт байгууламж',
    area: 'Талбай м²'
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
        {packages.map((pkg) => (
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
                      {pkg.data[key]}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>

            <CardFooter className="pt-4">
              <button 
                className="w-full bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-[999px] text-sm font-medium hover:bg-[#09090B] hover:text-white transition-colors cursor-pointer flex items-center justify-center space-x-2"
                onClick={() => addToCalculator({ 
                  id: pkg.id,
                  type: 'ooh', 
                  name: `${pkg.name} / ${pkg.nameMongolian}`,
                  provider: selectedProvider,
                  busStops: pkg.data.busStop,
                  infoFacilities: pkg.data.infoFacility,
                  columns: pkg.data.column,
                  flagpoleFacilities: pkg.data.flagFacility,
                  totalFacilities: pkg.data.totalFacility,
                  area: pkg.data.area
                })}
              >
                <img src="/icons/svg/plus.svg" alt="Add" className="w-5 h-5" />
                <span>Add</span>
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OOH; 