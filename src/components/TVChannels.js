'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { addToCalculator } from '@/lib/calculator';
import TVChannelDetailsModal from './TVChannelDetailsModal';

const TVChannels = ({ searchQuery = '' }) => {
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('One day');

  const timeFilters = ['One day', 'One week', 'One month'];

  const tvChannels = [
    {
      id: 1,
      name: 'Eagle news',
      logo: 'EAGLE',
      platforms: ['Sansar', 'Univision', 'Skymedia', 'Voo'],
      additionalPlatforms: 12,
      avgViews: '30,000',
      costPerView: '₮5,000 = 1 View',
      isActive: true
    },
    {
      id: 2,
      name: 'TV 5',
      logo: 'CH',
      platforms: ['Platform 1', 'Platform 2', 'Platform 3'],
      additionalPlatforms: 8,
      avgViews: '25,000',
      costPerView: '₮4,500 = 1 View',
      isActive: false
    },
    {
      id: 3,
      name: 'Education TV',
      logo: 'CH',
      platforms: ['Platform 1', 'Platform 2'],
      additionalPlatforms: 5,
      avgViews: '20,000',
      costPerView: '₮3,800 = 1 View',
      isActive: false
    },
    {
      id: 4,
      name: 'MNB',
      logo: 'CH',
      platforms: ['Platform 1', 'Platform 2', 'Platform 3', 'Platform 4'],
      additionalPlatforms: 15,
      avgViews: '35,000',
      costPerView: '₮6,200 = 1 View',
      isActive: false
    }
  ];

  // Filter channels based on search query
  const filteredChannels = tvChannels.filter(channel => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      channel.name.toLowerCase().includes(query) ||
      channel.platforms.some(platform => platform.toLowerCase().includes(query))
    );
  });

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <img src="/icons/svg/tv-retro.svg" alt="TV" className="w-[18px] h-[28px] text-gray-900" />
          <h2 className="text-2xl font-semibold text-gray-900">TV Channels</h2>
        </div>
      </div>

      {/* Channel Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {filteredChannels.length === 0 ? (
          <div className="col-span-full text-center py-8">
                            <p className="text-gray-500 text-lg">No channels found for &quot;{searchQuery}&quot;</p>
          </div>
        ) : (
          filteredChannels.map((channel) => (
          <Card key={channel.id} className="bg-white shadow-sm border border-gray-200">
            <CardHeader className="pb-4">
              <div className="flex flex-col space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-[100px] h-[48px] flex items-center justify-center">
                    <img src="/icons/svg/eagletv.svg" alt="TV" className="w-[100px] h-[48px]" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {channel.name}
                  </CardTitle>
                </div>
                <div className="flex items-center space-x-2">
                  <CardDescription className="text-sm text-gray-500">
                    {channel.platforms.join(' · ')}
                  </CardDescription>
                  <div className="px-2 py-1 bg-gray-100 rounded-[99px] text-xs text-gray-700 border border-gray-200">
                    +{channel.additionalPlatforms}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Time Filters and Average Views Container */}
              <div className="bg-[#F4F4F5] rounded-[24px] p-4 space-y-4">
                {/* Time Filters */}
                <div className="flex space-x-2">
                  {timeFilters.map((filter) => (
                    <button
                      key={filter}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        selectedTimeFilter === filter 
                          ? 'bg-white text-black shadow-sm' 
                          : 'bg-transparent text-gray-600 hover:text-gray-800'
                      }`}
                      onClick={() => setSelectedTimeFilter(filter)}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                {/* Average Views */}
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-1">
                    <span className="text-2xl font-bold text-gray-900">+{channel.avgViews}</span>
                    <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h4l3-9 4 18 3-9h4" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500">AVG Views</p>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col items-center space-y-4 pt-4">
              {/* Cost per View - Outside Card Content */}
              <div className="flex space-x-1 w-full">
                <p className="text-sm font-medium text-gray-900">{channel.costPerView}</p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-2 w-full">
                <TVChannelDetailsModal channel={channel}>
                  <button className="flex-1 bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-[999px] text-sm font-medium hover:bg-[#09090B] hover:text-white transition-colors cursor-pointer">
                    View details
                  </button>
                </TVChannelDetailsModal>
                <button 
                  className="flex-1 bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-[999px] text-sm font-medium hover:bg-[#09090B] hover:text-white transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                  onClick={() => addToCalculator({ 
                    id: channel.id,
                    type: 'tv', 
                    name: channel.name,
                    providers: channel.platforms,
                    views: parseInt(channel.avgViews.replace(',', '')),
                    cost: parseInt(channel.costPerView.match(/₮([\d,]+)/)[1].replace(',', '')),
                    timeFilter: selectedTimeFilter.toLowerCase().replace(' ', '-')
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

export default TVChannels; 