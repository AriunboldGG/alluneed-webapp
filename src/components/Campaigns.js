'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';

const Campaigns = ({ campaigns = [] }) => {
  return (
    <div className="mb-25">
      {/* Section Header */}
      <div className="px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center">
          <img src="/icons/svg/tv-retro.svg" alt="TV" className="w-6 h-6 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900">Campaigns</h2>
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {campaigns.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow p-0">
              {/* Image Section */}
              <div className="relative h-[150px] sm:h-[227px] bg-gray-200">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.onerror = null; e.target.src = '/images/bill2.png'; }}
                />
              </div>
              
              <div className="px-4 pb-4">
                {/* Badges */}
                <div className="flex gap-2 mb-2">
                  <span className="bg-[#FD3D80] text-white px-2 py-1 rounded-full text-xs font-medium">
                    {item.duration}
                  </span>
                  <span className="bg-gray-200 text-[#09090B] px-2 py-1 rounded-full text-xs font-medium">
                    {item.brand}
                  </span>
                </div>
                
                {/* Title */}
                <CardTitle className="text-lg font-bold text-[#09090B] mb-2">{item.title}</CardTitle>
                
                {/* Description */}
                <CardDescription className="text-sm font-normal text-[#09090B] mb-4">
                  {item.description}
                </CardDescription>
                
                {/* Button */}
                <Button className="w-full bg-white border border-gray-300 text-[#09090B] hover:bg-[#09090B] hover:text-white transition-colors rounded-[999px] cursor-pointer">
                  View detail
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Campaigns; 