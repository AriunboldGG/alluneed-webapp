'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { addToCalculator } from '@/lib/calculator';

const Newspaper = ({ searchQuery = '' }) => {
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('One day');
  const [selectedOptions, setSelectedOptions] = useState({});
  const timeFilters = ['One day', 'One week', 'One month'];

  const newspapers = [
    {
      id: 1,
      name: 'Unuudur',
      avatar: '/images/news/news.png',
      avgViews: '+50,000',
      pricingOptions: [
        { id: 'front', label: 'Front Page', price: '₮60,000', selected: true },
        { id: 'inside', label: 'Inside Page', price: '₮40,000', selected: false }
      ]
    },
    {
      id: 2,
      name: 'Zaluu',
      avatar: '/images/news/news.png',
      avgViews: '+45,000',
      pricingOptions: [
        { id: 'front', label: 'Front Page', price: '₮55,000', selected: true },
        { id: 'inside', label: 'Inside Page', price: '₮35,000', selected: false }
      ]
    },
    {
      id: 3,
      name: 'GoGo',
      avatar: '/images/news/news.png',
      avgViews: '+40,000',
      pricingOptions: [
        { id: 'front', label: 'Front Page', price: '₮50,000', selected: true },
        { id: 'inside', label: 'Inside Page', price: '₮30,000', selected: false }
      ]
    },
    {
      id: 4,
      name: 'News.mn',
      avatar: '/images/news/news.png',
      avgViews: '+35,000',
      pricingOptions: [
        { id: 'front', label: 'Front Page', price: '₮45,000', selected: true },
        { id: 'inside', label: 'Inside Page', price: '₮25,000', selected: false }
      ]
    }
  ];

  const filteredNewspapers = newspapers.filter(newspaper => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return newspaper.name.toLowerCase().includes(query);
  });

  const handleOptionSelect = (newspaperId, optionId) => {
    setSelectedOptions(prev => ({
      ...prev,
      [newspaperId]: {
        ...prev[newspaperId],
        [optionId]: !prev[newspaperId]?.[optionId]
      }
    }));
  };

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center space-x-3">
          <img src="/icons/svg/newspaper.svg" alt="Newspaper" className="w-6 h-6" />
          <h2 className="text-2xl font-semibold text-gray-900">Newspaper</h2>
        </div>
      </div>

      {/* Newspapers Grid */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {filteredNewspapers.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500 text-lg">No newspapers found for &quot;{searchQuery}&quot;</p>
          </div>
        ) : (
          filteredNewspapers.map((newspaper) => (
            <Card key={newspaper.id} className="bg-white shadow-sm border border-gray-200">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                    <img 
                      src={newspaper.avatar} 
                      alt={newspaper.name}
                      className="w-8 h-8 rounded"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center text-xs font-medium text-gray-600" style={{ display: 'none' }}>
                      {newspaper.name.charAt(0)}
                    </div>
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {newspaper.name}
                  </CardTitle>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Time Filters */}
                <div className="flex space-x-2">
                  {timeFilters.map((filter) => (
                    <Button
                      key={filter}
                      variant={selectedTimeFilter === filter ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTimeFilter(filter)}
                      className="text-xs cursor-pointer"
                    >
                      {filter}
                    </Button>
                  ))}
                </div>

                {/* Average Views */}
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900">{newspaper.avgViews}</span>
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500">AVG Views</p>
                </div>

                {/* Pricing Options */}
                <div className="space-y-2">
                  {newspaper.pricingOptions.map((option) => {
                    const isSelected = selectedOptions[newspaper.id]?.[option.id] || false;
                    return (
                      <div key={option.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleOptionSelect(newspaper.id, option.id)}
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
                          <span className="text-xl font-medium leading-7 tracking-normal text-[#09090B]">{option.price}</span>
                        </div>
                        <span className="text-sm font-medium leading-5 tracking-normal text-[#71717B]">
                          {option.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 rounded-[999px] bg-white text-[#09090B] border-gray-200 hover:bg-[#09090B] hover:text-white cursor-pointer"
                  >
                    View details
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addToCalculator({
                      id: newspaper.id,
                      type: 'newspaper',
                      name: newspaper.name,
                      duration: selectedTimeFilter,
                      pricingOptions: newspaper.pricingOptions,
                      selectedOptions: selectedOptions[newspaper.id] || {}
                    })}
                    className="flex-1 rounded-[999px] bg-white text-[#09090B] border-gray-200 hover:bg-[#09090B] hover:text-white cursor-pointer"
                  >
                    + Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
        </div>
      </div>

      {/* Show More Button */}
      <div className="flex items-center">
        <div className="flex-1 h-px bg-gray-200 mr-4"></div>
        <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-[999px] font-medium hover:bg-[#09090B] hover:text-white transition-colors cursor-pointer">
          Show more
        </button>
        <div className="flex-1 h-px bg-gray-200 ml-4"></div>
      </div>
    </div>
  );
};

export default Newspaper; 