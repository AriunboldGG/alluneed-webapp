'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Map from './Map';
import { addToCalculator } from '@/lib/calculator';

const Billboard = () => {
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('Day');

  const timeFilters = ['Day', 'Week', 'Month'];

  const billboards = [
    {
      id: 1,
      code: 'K1',
      name: 'Метромалл их дэлгүүр',
      location: 'Сүхбаатарын талбайн баруун талд / СБД / Энхтайваны өргөн чөлөө / Зүүн хойд',
      views: '30,000',
      costPerView: '₮5,000 = 1 view',
      emptyImage: '/images/bill1.png',
      adImage: '/images/bill2.png',
      coordinates: [47.9184, 106.9177]
    },
    {
      id: 2,
      code: 'K2',
      name: 'Энхтайван их дэлгүүр',
      location: 'Энхтайваны өргөн чөлөө / СБД / Баянзүрх дүүрэг / Баруун хойд',
      views: '25,000',
      costPerView: '₮4,500 = 1 view',
      emptyImage: '/images/bill1.png',
      adImage: '/images/bill2.png',
      coordinates: [47.9200, 106.9200]
    },
    {
      id: 3,
      code: 'K3',
      name: 'Гэмтэл сансрын төв',
      location: 'Чингис хааны өргөн чөлөө / ХЗД / Хан-Уул дүүрэг / Төв',
      views: '35,000',
      costPerView: '₮6,200 = 1 view',
      emptyImage: '/images/bill1.png',
      adImage: '/images/bill2.png',
      coordinates: [47.9150, 106.9150]
    },
    {
      id: 4,
      code: 'K4',
      name: 'Их Дэлгүүр',
      location: 'Их Дэлгүүрийн гудамж / БЗД / Баянзүрх дүүрэг / Зүүн',
      views: '20,000',
      costPerView: '₮3,800 = 1 view',
      emptyImage: '/images/bill1.png',
      adImage: '/images/bill2.png',
      coordinates: [47.9250, 106.9250]
    },
    {
      id: 5,
      code: 'K5',
      name: 'Ханбүргэдийн төв',
      location: 'Ханбүргэдийн гудамж / ХЗД / Хан-Уул дүүрэг / Баруун',
      views: '28,000',
      costPerView: '₮5,500 = 1 view',
      emptyImage: '/images/bill1.png',
      adImage: '/images/bill2.png',
      coordinates: [47.9100, 106.9100]
    }
  ];

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <img src="/icons/svg/bill-tv.svg" alt="Billboard" className="w-5 h-5 sm:w-6 sm:h-6" />
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Billboard</h2>
      </div>

      {/* Main Content - Responsive Layout */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Left: Billboard List */}
        <div className="w-full lg:w-[440px] lg:flex-shrink-0">
          <div className="space-y-3 sm:space-y-4 max-h-[400px] sm:max-h-[500px] lg:max-h-[747px] overflow-y-auto pr-2 scrollbar-hide">
            {billboards.map((billboard) => (
              <Card key={billboard.id} className="bg-white shadow-sm border border-gray-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-2 sm:space-x-3 flex-1 min-w-0">
                      <Badge className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-medium flex-shrink-0">
                        {billboard.code}
                      </Badge>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base sm:text-lg font-semibold text-gray-900 mb-1 truncate">
                          {billboard.name}
                        </CardTitle>
                        <p className="text-xs text-gray-600 leading-relaxed line-clamp-2 sm:line-clamp-none">
                          {billboard.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-1 sm:space-x-2 flex-shrink-0">
                      <button 
                        className="p-1.5 sm:p-2 bg-gray-800 hover:bg-gray-900 rounded-full transition-colors cursor-pointer"
                        onClick={() => addToCalculator({ 
                          id: billboard.id,
                          type: 'billboard', 
                          name: billboard.name,
                          location: billboard.location,
                          size: 'Standard',
                          dailyViews: parseInt(billboard.views.replace(',', '')),
                          cost: parseInt(billboard.costPerView.match(/₮([\d,]+)/)[1].replace(',', ''))
                        })}
                      >
                        <img src="/icons/svg/bill-plus.svg" alt="Add" className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      <button className="p-1.5 sm:p-2 bg-gray-800 hover:bg-gray-900 rounded-full transition-colors cursor-pointer">
                        <img src="/icons/svg/bill-more.svg" alt="More" className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3 sm:space-y-4">
                  {/* Images */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <div className="w-full h-[100px] sm:h-[120px] lg:h-[150px] bg-gray-100 rounded-lg overflow-hidden">
                      <img 
                        src={billboard.emptyImage} 
                        alt="Empty Billboard" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-full h-[100px] sm:h-[120px] lg:h-[150px] bg-gray-100 rounded-lg overflow-hidden">
                      <img 
                        src={billboard.adImage} 
                        alt="Billboard with Ad" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Statistics and Time Filter */}
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-base sm:text-lg font-bold text-gray-900">+{billboard.views}</span>
                        <span className="text-xs sm:text-sm text-gray-500">Views</span>
                      </div>
                      <div className="flex space-x-1">
                        {timeFilters.map((filter) => (
                          <button
                            key={filter}
                            className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                              selectedTimeFilter === filter 
                                ? 'bg-gray-800 text-white' 
                                : 'bg-white text-gray-600 hover:text-gray-800 border border-gray-200'
                            }`}
                            onClick={() => setSelectedTimeFilter(filter)}
                          >
                            {filter}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-2">
                  <p className="text-xs sm:text-sm text-gray-600">
                    {billboard.costPerView}
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Right: Map */}
        <div className="w-full lg:flex-1">
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardContent className="p-0">
              <div className="h-[300px] sm:h-[400px] lg:h-[747px] rounded-lg overflow-hidden">
                <Map billboards={billboards} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Billboard; 