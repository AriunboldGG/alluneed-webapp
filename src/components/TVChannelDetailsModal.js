'use client';

import React, { useState, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { PieChart } from '@/components/ui/pie-chart';
import { addToCalculator } from '@/lib/calculator';

// Move chart data outside component to prevent re-creation
const GENDER_DATA = [
  { name: 'Эрэгтэй', value: 36, color: '#3B82F6' },
  { name: 'Эмэгтэй', value: 64, color: '#F97316' }
];

const AGE_DATA = [
  { name: '0-10', value: 15, color: '#10B981' },
  { name: '11-20', value: 25, color: '#F59E0B' },
  { name: '21-35', value: 35, color: '#8B5CF6' },
  { name: '35-50', value: 20, color: '#EF4444' },
  { name: '50+', value: 5, color: '#6B7280' }
];

const LOCATION_DATA = [
  { name: 'Орхон', views: 30 },
  { name: 'Төв', views: 20 },
  { name: 'Улаанбаатар', views: 45 },
  { name: 'Дархан', views: 40 },
  { name: 'Сэлэнгэ', views: 25 }
];

const TVChannelDetailsModal = ({ channel, children }) => {
  const [advertisingTime, setAdvertisingTime] = useState('17:00 - 00:00');
  const [frequencyPerDay, setFrequencyPerDay] = useState('1');
  const [broadcastDays, setBroadcastDays] = useState('1');
  const [adDuration, setAdDuration] = useState('1');
  const [selectedLocation, setSelectedLocation] = useState('Бүх байршил');
  
  // Calculation state
  const [calculatedMetrics, setCalculatedMetrics] = useState({
    totalReach: 1200,
    costPerPerson: 3500,
    totalCost: 42000,
    tvComparison: '2%'
  });

  // Calculate summary metrics

  // Calculation function
  const calculateMetrics = useCallback(() => {
    // Base values from channel data
    const baseViews = parseInt(channel?.avgViews?.replace(',', '') || '3000');
    const baseCost = parseInt(channel?.costPerView?.match(/₮([\d,]+)/)?.[1]?.replace(',', '') || '500');
    
    // Multipliers based on selections
    const timeMultiplier = advertisingTime === '17:00 - 00:00' ? 1.2 : 1.0;
    const frequencyMultiplier = parseInt(frequencyPerDay);
    const daysMultiplier = parseInt(broadcastDays);
    const durationMultiplier = parseInt(adDuration) / 60; // Convert seconds to minutes
    
    // Location multiplier
    const locationMultipliers = {
      'Бүх байршил': 1.0,
      'Улаанбаатар': 1.5,
      'Дархан': 1.3,
      'Орхон': 1.1,
      'Төв': 1.0,
      'Сэлэнгэ': 0.9
    };
    const locationMultiplier = locationMultipliers[selectedLocation] || 1.0;
    
    // Calculate new metrics and divide by 100 for reasonable numbers
    const newTotalReach = Math.round((baseViews * timeMultiplier * frequencyMultiplier * daysMultiplier * locationMultiplier) / 100);
    const newCostPerPerson = Math.round((baseCost * durationMultiplier) / 100);
    const newTotalCost = newTotalReach * newCostPerPerson;
    const newTvComparison = Math.round((newTotalReach / baseViews) * 100);
    
    setCalculatedMetrics({
      totalReach: newTotalReach,
      costPerPerson: newCostPerPerson,
      totalCost: newTotalCost,
      tvComparison: `${newTvComparison}%`
    });
  }, [advertisingTime, frequencyPerDay, broadcastDays, adDuration, selectedLocation, channel]);

  // Add to calculator function
  const handleAddToCalculator = useCallback(() => {
    // First calculate metrics if not already calculated
    if (calculatedMetrics.totalReach === 120000) {
      calculateMetrics();
    }
    
    // Add to calculator with current settings
    addToCalculator({
      id: channel?.id || Date.now(),
      type: 'tv',
      name: channel?.name || 'TV Channel',
      providers: channel?.platforms || [],
      views: calculatedMetrics.totalReach,
      cost: calculatedMetrics.costPerPerson,
      timeFilter: advertisingTime,
      frequency: frequencyPerDay,
      days: broadcastDays,
      duration: adDuration,
      location: selectedLocation,
      totalCost: calculatedMetrics.totalCost,
      tvComparison: calculatedMetrics.tvComparison
    });
  }, [channel, calculatedMetrics, advertisingTime, frequencyPerDay, broadcastDays, adDuration, selectedLocation, calculateMetrics]);

  const CustomPieChart = useCallback(({ data, title, showTooltip = false }) => (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-700">{title}</h3>
      <PieChart 
        data={data} 
        showLabelList={!showTooltip}
        showTooltip={showTooltip}
      />
      <div className="flex flex-wrap gap-1 justify-center">
        {data.map((item) => (
          <div key={item.name} className="flex items-center space-x-1">
            <div 
              className="w-2 h-2 rounded-sm" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-gray-600">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  ), []);

  const BarChart = ({ data, title }) => (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-700">{title}</h3>
      <div className="space-y-2">
        {data.map((item) => (
          <div key={item.name} className="flex items-center space-x-2">
            <div className="w-16 text-xs text-gray-600">{item.name}</div>
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full" 
                style={{ width: `${item.views}%` }}
              />
            </div>
            <div className="w-8 text-xs text-gray-600">{item.views}%</div>
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-1">
        <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
        <span className="text-xs text-gray-600">Харьцаа</span>
      </div>
    </div>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-5xl w-[90vw] max-h-[85vh] overflow-y-auto sm:max-w-5xl md:max-w-5xl lg:max-w-5xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            {channel?.name || 'TV Channel'} - Дэлгэрэнгүй мэдээлэл
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Top Section - Three Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Gender Proportion */}
            <Card>
              <CardContent className="p-4">
                <CustomPieChart data={GENDER_DATA} title="Хүйсийн харьцаа" showTooltip={true} />
              </CardContent>
            </Card>

            {/* Middle Column - Campaign Settings */}
            <Card>
              <CardContent className="p-4 space-y-4">
                {/* Advertising Time */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Реклам цацах цаг</label>
                  <div className="flex space-x-2">
                    <button
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        advertisingTime === '17:00 - 00:00'
                          ? 'bg-purple-100 text-purple-700 border border-purple-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      onClick={() => setAdvertisingTime('17:00 - 00:00')}
                    >
                      17:00 - 00:00
                    </button>
                    <button
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        advertisingTime === 'Бусад'
                          ? 'bg-purple-100 text-purple-700 border border-purple-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      onClick={() => setAdvertisingTime('Бусад')}
                    >
                      Бусад
                    </button>
                  </div>
                </div>

                {/* Frequency per Day */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Өдөрт цацах давтамж</label>
                  <select
                    value={frequencyPerDay}
                    onChange={(e) => setFrequencyPerDay(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {Array.from({ length: 14 }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>

                {/* Broadcast Days */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Цацах хоногийн тоо</label>
                  <select
                    value={broadcastDays}
                    onChange={(e) => setBroadcastDays(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {Array.from({ length: 365 }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>{num} хоног</option>
                    ))}
                  </select>
                </div>

                {/* Ad Duration */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Рекламны үргэлжлэх хугацаа</label>
                  <select
                    value={adDuration}
                    onChange={(e) => setAdDuration(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {[1, 5, 10, 15, 30, 60, 120, 300, 600].map((seconds) => (
                      <option key={seconds} value={seconds}>{seconds} секунд</option>
                    ))}
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Right Column - Most Viewed Locations */}
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Их үзэлттэй байршил</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Бүх байршил">Бүх байршил</option>
                    <option value="Улаанбаатар">Улаанбаатар</option>
                    <option value="Дархан">Дархан</option>
                    <option value="Орхон">Орхон</option>
                    <option value="Төв">Төв</option>
                    <option value="Сэлэнгэ">Сэлэнгэ</option>
                  </select>
                </div>
                <BarChart data={LOCATION_DATA} title="Байршил" />
              </CardContent>
            </Card>
          </div>

          {/* Age Proportion Section */}
          <Card>
            <CardContent className="p-4">
              <CustomPieChart data={AGE_DATA} title="Насны харьцаа" showTooltip={true} />
            </CardContent>
          </Card>

          {/* Calculate and Add Buttons */}
          <div className="flex justify-center space-x-4">
            <button 
              onClick={calculateMetrics}
              className="bg-blue-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors cursor-pointer"
            >
              Тооцоолох
            </button>
            <button 
              onClick={handleAddToCalculator}
              className="bg-green-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center space-x-2 cursor-pointer"
            >
              <img src="/icons/svg/plus.svg" alt="Add" className="w-5 h-5" />
              <span>Add to Calculator</span>
            </button>
          </div>

          {/* Bottom Section - Summary Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-500">{calculatedMetrics.totalReach.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Нийт хүртээмж</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-500">{calculatedMetrics.costPerPerson.toLocaleString()} ₮</div>
                <div className="text-sm text-gray-600">Нэг хүнд хүрч буй зардал</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-500">{calculatedMetrics.totalCost.toLocaleString()} ₮</div>
                <div className="text-sm text-gray-600">Нийт зардал</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-500">{calculatedMetrics.tvComparison}</div>
                <div className="text-sm text-gray-600">ТВ үзэлтийн дундажтай харьцуулахад</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TVChannelDetailsModal; 