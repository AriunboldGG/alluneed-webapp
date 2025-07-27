'use client';

import React, { useState, Suspense } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
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

const Liftboard = ({ searchQuery = '' }) => {
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('daily');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedOptions, setSelectedOptions] = useState({});

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
      audience: '15 өрх айл',
      coordinates: { lat: 47.9184, lng: 106.9177 },
      category: 'commercial',
      pricingOptions: [
        { id: 'poster', label: 'Poster', price: '₮40,000', selected: true },
        { id: 'ledtv', label: 'Led TV', price: '₮80,000', selected: false }
      ]
    },
    {
      id: 2,
      code: '02',
      name: 'Энхтайван их дэлгүүр',
      location: 'Энхтайваны өргөн чөлөө / СБД / Баянзүрх дүүрэг / Баруун хойд',
      audience: '12 өрх айл',
      coordinates: { lat: 47.9200, lng: 106.9200 },
      category: 'commercial',
      pricingOptions: [
        { id: 'poster', label: 'Poster', price: '₮35,000', selected: true },
        { id: 'ledtv', label: 'Led TV', price: '₮70,000', selected: false }
      ]
    },
    {
      id: 3,
      code: '03',
      name: 'Гэмтэл сансрын төв',
      location: 'Чингис хааны өргөн чөлөө / ХЗД / Хан-Уул дүүрэг / Төв',
      audience: '18 өрх айл',
      coordinates: { lat: 47.9150, lng: 106.9150 },
      category: 'commercial',
      pricingOptions: [
        { id: 'poster', label: 'Poster', price: '₮45,000', selected: true },
        { id: 'ledtv', label: 'Led TV', price: '₮90,000', selected: false }
      ]
    },
    {
      id: 4,
      code: '04',
      name: 'Их Дэлгүүр',
      location: 'Их Дэлгүүрийн гудамж / БЗД / Баянзүрх дүүрэг / Зүүн',
      audience: '10 өрх айл',
      coordinates: { lat: 47.9250, lng: 106.9250 },
      category: 'commercial',
      pricingOptions: [
        { id: 'poster', label: 'Poster', price: '₮30,000', selected: true },
        { id: 'ledtv', label: 'Led TV', price: '₮60,000', selected: false }
      ]
    },
    {
      id: 5,
      code: '05',
      name: 'Ханбүргэдийн төв',
      location: 'Ханбүргэдийн гудамж / ХЗД / Хан-Уул дүүрэг / Баруун',
      audience: '14 өрх айл',
      coordinates: { lat: 47.9100, lng: 106.9100 },
      category: 'commercial',
      pricingOptions: [
        { id: 'poster', label: 'Poster', price: '₮38,000', selected: true },
        { id: 'ledtv', label: 'Led TV', price: '₮76,000', selected: false }
      ]
    }
  ];

  // Handle option selection
  const handleOptionSelect = (liftboardId, optionId) => {
    setSelectedOptions(prev => ({
      ...prev,
      [liftboardId]: {
        ...prev[liftboardId],
        [optionId]: !prev[liftboardId]?.[optionId]
      }
    }));
  };

  // Filter liftboards based on search query
  const filteredLiftboards = liftboards.filter(liftboard => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      liftboard.code.toLowerCase().includes(query) ||
      liftboard.name.toLowerCase().includes(query) ||
      liftboard.location.toLowerCase().includes(query) ||
      liftboard.category.toLowerCase().includes(query)
    );
  });

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
            {filteredLiftboards.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">No liftboards found for &quot;{searchQuery}&quot;</p>
              </div>
            ) : (
              filteredLiftboards.map((liftboard) => (
              <Card key={liftboard.id} className="bg-white shadow-sm border border-[#E4E4E7] rounded-2xl">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1 min-w-0">
                      <Badge className="w-8 h-8 bg-[#FDC404] text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
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
                      <button 
                        className="w-8 h-8 p-0 rounded-full bg-[#09090B] hover:bg-gray-900 transition-colors cursor-pointer flex items-center justify-center"
                        onClick={() => addToCalculator({ 
                          id: liftboard.id,
                          type: 'liftboard', 
                          name: liftboard.name,
                          location: liftboard.location,
                          duration: 'Daily',
                          pricingOptions: liftboard.pricingOptions,
                          selectedOptions: selectedOptions[liftboard.id] || {}
                        })}
                      >
                        <img src="/icons/svg/bill-plus.svg" alt="Add" className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 p-0 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-center">
                        <img src="/icons/svg/bill-more.svg" alt="More" className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  {/* Pricing Options and Audience Count in Row */}
                  <div className="flex items-center justify-between">
                    {/* Pricing Options */}
                    <div className="space-y-2">
                      {liftboard.pricingOptions.map((option) => {
                        const isSelected = selectedOptions[liftboard.id]?.[option.id] || false;
                        return (
                          <div key={option.id} className="flex items-center space-x-3">
                            <button
                              onClick={() => handleOptionSelect(liftboard.id, option.id)}
                              className={`w-4 h-4 rounded-sm border-2 transition-all duration-200 cursor-pointer flex items-center justify-center ${
                                isSelected 
                                  ? 'bg-[#09090B] border-[#09090B]' 
                                  : 'bg-white border-gray-300 hover:border-[#09090B]'
                              }`}
                            >
                              {isSelected && (
                                <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </button>
                            <span className="text-sm font-medium text-gray-900">
                              {option.price} = {option.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Audience Count */}
                    <div className="flex items-center space-x-2 border border-[#E4E4E7] rounded-full px-3 py-1">
                      <img src="/icons/svg/users.svg" alt="Users" className="w-4 h-4" />
                      <span className="text-sm font-medium text-black">{liftboard.audience}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
            )}
          </div>
        </div>

        {/* Right: Google Map */}
        <div className="w-full lg:flex-1">
          <Card className="bg-white shadow-sm border border-[#E4E4E7] rounded-2xl">
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