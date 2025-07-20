'use client';

import React, { useState, Suspense } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import dynamic from 'next/dynamic';
import { addToCalculator } from '@/lib/calculator';

// Dynamically import GoogleMapComponent to avoid SSR issues
const GoogleMapComponent = dynamic(() => import('./GoogleMapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
      <div className="text-gray-500">Loading map...</div>
    </div>
  )
});

const Liftboard = () => {
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('daily');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const timeFilters = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'residential', label: 'Residential' },
    { value: 'highway', label: 'Highway' }
  ];

  const liftboards = [
    {
      id: 1,
      code: '01',
      name: 'Метромалл их дэлгүүр',
      location: 'Сүхбаатарын талбайн баруун талд / СБД / Энхтайваны өргөн чөлөө / Зүүн хойд',
      price: '5,000₮ = 1 view daily',
      audience: '15 өрх айл',
      coordinates: { lat: 47.9184, lng: 106.9177 },
      category: 'commercial',
      views: '25,000',
      costPerView: '5,000₮'
    },
    {
      id: 2,
      code: '02',
      name: 'Энхтайван их дэлгүүр',
      location: 'Энхтайваны өргөн чөлөө / СБД / Баянзүрх дүүрэг / Баруун хойд',
      price: '4,500₮ = 1 view daily',
      audience: '12 өрх айл',
      coordinates: { lat: 47.9200, lng: 106.9200 },
      category: 'commercial',
      views: '22,000',
      costPerView: '4,500₮'
    },
    {
      id: 3,
      code: '03',
      name: 'Гэмтэл сансрын төв',
      location: 'Чингис хааны өргөн чөлөө / ХЗД / Хан-Уул дүүрэг / Төв',
      price: '6,200₮ = 1 view daily',
      audience: '18 өрх айл',
      coordinates: { lat: 47.9150, lng: 106.9150 },
      category: 'commercial',
      views: '30,000',
      costPerView: '6,200₮'
    },
    {
      id: 4,
      code: '04',
      name: 'Их Дэлгүүр',
      location: 'Их Дэлгүүрийн гудамж / БЗД / Баянзүрх дүүрэг / Зүүн',
      price: '3,800₮ = 1 view daily',
      audience: '10 өрх айл',
      coordinates: { lat: 47.9250, lng: 106.9250 },
      category: 'commercial',
      views: '18,000',
      costPerView: '3,800₮'
    },
    {
      id: 5,
      code: '05',
      name: 'Ханбүргэдийн төв',
      location: 'Ханбүргэдийн гудамж / ХЗД / Хан-Уул дүүрэг / Баруун',
      price: '5,500₮ = 1 view daily',
      audience: '14 өрх айл',
      coordinates: { lat: 47.9100, lng: 106.9100 },
      category: 'commercial',
      views: '26,000',
      costPerView: '5,500₮'
    }
  ];

  const GoogleMap = () => {
    // Check if Google Maps API key is available
    const hasGoogleMapsAPI = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    
    if (hasGoogleMapsAPI) {
      return <GoogleMapComponent liftboards={liftboards} />;
    }
    
    return (
      <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
            </svg>
          </div>
          <p className="text-lg font-medium text-gray-500">Google Maps</p>
          <p className="text-sm text-gray-400">API key required</p>
        </div>
      </div>
    );
  };

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <img src="/icons/svg/liftboard-section.svg" alt="Liftboard" className="w-6 h-6" />
        <h2 className="text-2xl font-semibold text-gray-900">Liftboard</h2>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex space-x-2">
          {timeFilters.map((filter) => (
            <Button
              key={filter.value}
              variant={selectedTimeFilter === filter.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTimeFilter(filter.value)}
              className="cursor-pointer"
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Main Content - Split Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Liftboard List */}
        <div className="w-full lg:w-[440px] lg:flex-shrink-0">
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-hide">
            {liftboards.map((liftboard) => (
              <Card key={liftboard.id} className="bg-white shadow-sm border border-gray-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1 min-w-0">
                      <Badge className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                        {liftboard.code}
                      </Badge>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg font-semibold text-gray-900 mb-1 truncate">
                          {liftboard.name}
                        </CardTitle>
                        <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                          {liftboard.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2 flex-shrink-0">
                      <Button 
                        size="sm" 
                        variant="secondary" 
                        className="w-8 h-8 p-0 rounded-full"
                        onClick={() => addToCalculator({ 
                          id: liftboard.id,
                          type: 'liftboard', 
                          name: liftboard.name,
                          location: liftboard.location,
                          duration: 'Daily',
                          dailyViews: parseInt(liftboard.views.replace(',', '')),
                          cost: parseInt(liftboard.costPerView.replace('₮', '').replace(',', ''))
                        })}
                      >
                        <img src="/icons/svg/bill-plus.svg" alt="Add" className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="w-8 h-8 p-0 rounded-full">
                        <img src="/icons/svg/bill-more.svg" alt="More" className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  {/* Statistics */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">+{liftboard.views}</span>
                      <span className="text-sm text-gray-500">Views</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{liftboard.audience}</p>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-2">
                  <p className="text-sm text-gray-600">
                    {liftboard.price}
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Right: Google Map */}
        <div className="w-full lg:flex-1">
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardContent className="p-0">
              <div className="h-[600px] rounded-lg overflow-hidden">
                <Suspense fallback={
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <div className="text-gray-500">Loading map...</div>
                  </div>
                }>
                  <GoogleMap />
                </Suspense>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Liftboard; 