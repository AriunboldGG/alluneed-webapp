'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { addToCalculator } from '@/lib/calculator';
import ViewModal from './ViewModal';

const News = ({ searchQuery = '' }) => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const newsChannels = [
    {
      id: 1,
      name: 'News 1',
      image: '/images/news.png',
      avgViews: '+30,000',
      duration: '1 day',
      brand: 'News Channel'
    },
    {
      id: 2,
      name: 'News 2',
      image: '/images/news.png',
      avgViews: '+25,000',
      duration: '1 day',
      brand: 'News Channel'
    },
    {
      id: 3,
      name: 'News 3',
      image: '/images/news.png',
      avgViews: '+20,000',
      duration: '1 day',
      brand: 'News Channel'
    },
    {
      id: 4,
      name: 'News 4',
      image: '/images/news.png',
      avgViews: '+18,000',
      duration: '1 day',
      brand: 'News Channel'
    }
  ];

  const filteredChannels = newsChannels.filter(channel => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return channel.name.toLowerCase().includes(query);
  });



  return (
    <div className="mb-25">
      {/* Section Header */}
      <div className="px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center">
          <img src="/icons/svg/earth.svg" alt="News" className="w-6 h-6 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900">News</h2>
        </div>
      </div>

      {/* News Channels Grid */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredChannels.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500 text-lg">No news channels found for &quot;{searchQuery}&quot;</p>
            </div>
          ) : (
            filteredChannels.map((channel) => (
              <Card key={channel.id} className="overflow-hidden hover:shadow-lg transition-shadow p-0">
                {/* Image Section */}
                <div className="relative h-[150px] sm:h-[227px] bg-gray-200">
                  <img 
                    src={channel.image} 
                    alt={channel.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src = '/images/bill2.png'; }}
                  />
                </div>
                
                <div className="px-4 pb-4">
                  {/* Date and Source */}
                  <div className="text-sm text-gray-500 mb-2">
                    March 8, 2025 • Marketing weekly
                  </div>
                  
                  {/* Title */}
                  <CardTitle className="text-lg font-bold text-[#09090B] mb-2">{channel.name}</CardTitle>
                  
                  {/* Description */}
                  <div className="text-sm font-normal text-[#09090B] mb-4">
                    Join industry leaders for insights on the future of advertising
                  </div>
                  
                  {/* Button */}
                  <Button 
                    onClick={() => setIsViewModalOpen(true)}
                    className="w-full bg-white border border-gray-300 text-[#09090B] hover:bg-[#09090B] hover:text-white transition-colors rounded-[999px] cursor-pointer"
                  >
                    View detail
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* View Modal */}
      <ViewModal 
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        calculatorItems={newsChannels.map(channel => ({
          id: channel.id,
          type: 'news',
          name: channel.name,
          cost: parseInt(channel.avgViews.replace(/[^0-9]/g, '')) * 1000, // Convert views to cost
          views: parseInt(channel.avgViews.replace(/[^0-9]/g, '')),
          duration: channel.duration,
          brand: channel.brand
        }))}
      />
    </div>
  );
};

export default News; 