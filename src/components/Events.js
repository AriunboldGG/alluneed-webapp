'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';

const Events = ({ events = [] }) => {
  return (
    <div className="mb-25">
      {/* Section Header */}
      <div className="px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center">
          <img src="/icons/svg/tv-retro.svg" alt="TV" className="w-6 h-6 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900">Events</h2>
        </div>
      </div>

      {/* Events Grid */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {events.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow p-0">
              {/* Image Section */}
              <div className="relative h-[150px] sm:h-[227px] bg-gray-200">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.onerror = null; e.target.src = '/images/bill2.png'; }}
                />
                {/* Calendar Badge */}
                {item.day && item.month && item.weekday && (
                  <div className="absolute top-3 left-3 rounded-lg overflow-hidden shadow-sm" style={{ width: '58px', height: '76px' }}>
                    {/* Top Section - Purple with Month */}
                    <div className="bg-[#8557F5] text-white text-center flex items-center justify-center" style={{ height: '30px' }}>
                      <div className="text-xs font-medium">{item.month}</div>
                    </div>
                    {/* Bottom Section - White with Day and Weekday */}
                    <div className="bg-white text-gray-900 text-center flex flex-col items-center justify-center" style={{ height: '46px' }}>
                      <div className="text-lg font-bold">{item.day}</div>
                      <div className="text-xs">{item.weekday}</div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="px-4 pb-4">
                {/* Location */}
                {item.location && (
                  <div className="flex items-center mb-2">
                    <img src="/icons/svg/map-pin.svg" alt="Location" className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium text-[#09090B]">{item.location}</span>
                  </div>
                )}
                
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

export default Events; 