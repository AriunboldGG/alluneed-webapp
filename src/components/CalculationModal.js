'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CalculationModal = ({ isOpen, onClose, calculatorItems }) => {
  const [activeTab, setActiveTab] = useState('config');
  const [broadcastTime, setBroadcastTime] = useState('17:00-00:00');
  const [broadcastDays, setBroadcastDays] = useState('');
  const [broadcastDuration, setBroadcastDuration] = useState('');
  const [location, setLocation] = useState('');

  // Get items by category
  const tvChannels = calculatorItems.filter(item => item.type === 'tv');
  const oohItems = calculatorItems.filter(item => item.type === 'ooh');
  const billboardItems = calculatorItems.filter(item => item.type === 'billboard');
  const liftboardItems = calculatorItems.filter(item => item.type === 'liftboard');
  const newspaperItems = calculatorItems.filter(item => item.type === 'newspaper');

  const totalItems = calculatorItems.length;
  const totalCost = calculatorItems.reduce((sum, item) => sum + (item.cost || 0), 0);
  const totalViews = calculatorItems.reduce((sum, item) => sum + (item.views || 0), 0);

  // Determine which categories have items
  const selectedCategories = {};
  if (tvChannels.length > 0) selectedCategories.tv = true;
  if (oohItems.length > 0) selectedCategories.ooh = true;
  if (billboardItems.length > 0) selectedCategories.billboard = true;
  if (liftboardItems.length > 0) selectedCategories.liftboard = true;
  if (newspaperItems.length > 0) selectedCategories.newspaper = true;

  // Set default active tab based on available categories
  useEffect(() => {
    if (Object.keys(selectedCategories).length > 0) {
      setActiveTab('all');
    } else if (tvChannels.length > 0) {
      setActiveTab('tv');
    } else if (oohItems.length > 0) {
      setActiveTab('ooh');
    } else if (billboardItems.length > 0) {
      setActiveTab('billboard');
    } else if (liftboardItems.length > 0) {
      setActiveTab('liftboard');
    } else if (newspaperItems.length > 0) {
      setActiveTab('newspaper');
    }
  }, [calculatorItems]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#444444] bg-opacity-50 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl h-full max-h-[90vh] bg-[#F4F4F5] flex flex-col relative z-[10000] rounded-lg overflow-hidden">
        <div className="p-4 sm:p-6 border-b flex justify-between items-center bg-white">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <img src="/icons/svg/calculator.svg" alt="Calculator" className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Calculation Bag ({totalItems})
          </h2>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={onClose}
              className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <img src="/icons/svg/calc-clear.svg" alt="Close" className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8 overflow-hidden">
          {/* Left Column - Items */}
          <div className="flex-1 space-y-4 sm:space-y-6 overflow-y-auto pr-0 sm:pr-4">
            {/* TV Channels Section */}
            {tvChannels.length > 0 && (
              <div>
                <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">TV Channels ({tvChannels.length})</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                  {tvChannels.map((item, index) => (
                    <Card key={index} className="relative hover:shadow-lg transition-shadow duration-200 border-2 hover:border-blue-200">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg mb-2"></div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-500 hover:text-red-500 flex items-center gap-1"
                            onClick={() => {/* Remove item logic */}}
                          >
                            <img src="/icons/svg/calc-clear.svg" alt="Clear" className="w-4 h-4" />
                            Clear
                          </Button>
                        </div>
                        <h4 className="font-medium mb-2">{item.name}</h4>
                        <p className="text-sm text-gray-600 mb-3">
                          {item.providers?.join(' · ')} +12
                        </p>
                        <div className="flex gap-2 mb-3">
                          <Badge variant="default">
                            {item.timeFilter || 'One day'}
                          </Badge>
                        </div>
                        <div className="text-center mb-3">
                          <div className="text-2xl font-bold text-blue-600">+{item.views?.toLocaleString()}</div>
                          <div className="text-sm text-gray-600">AVG Views</div>
                        </div>
                        <div className="text-center text-sm">
                          ₮{item.cost?.toLocaleString()} = 1 View
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Card className="border-dashed border-2 border-blue-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 cursor-pointer group">
                    <CardContent className="p-4 flex flex-col items-center justify-center h-full min-h-[200px]">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
                        <img src="/icons/svg/plus.svg" alt="Add" className="w-6 h-6 text-blue-600" />
                      </div>
                      <p className="text-blue-600 font-medium">Add more</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* OOH Section */}
            {oohItems.length > 0 && (
              <div>
                <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">OOH ({oohItems.length})</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                  {oohItems.map((item, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            {item.name.includes('Strong') ? '🌳' : '🍃'}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-500 hover:text-red-500 flex items-center gap-1"
                            onClick={() => {/* Remove item logic */}}
                          >
                            <img src="/icons/svg/calc-clear.svg" alt="Clear" className="w-4 h-4" />
                            Clear
                          </Button>
                        </div>
                        <h4 className="font-medium mb-3">{item.name}</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Автобусны зогсоол:</span>
                            <span>{item.busStops || '-'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Мэдээллийн байгууламж:</span>
                            <span>{item.infoFacilities || '-'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Колуми:</span>
                            <span>{item.columns || '-'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Тугт байгууламж:</span>
                            <span>{item.flagpoleFacilities || '-'}</span>
                          </div>
                          <div className="flex justify-between font-medium">
                            <span>Нийт байгууламж:</span>
                            <span>{item.totalFacilities || '-'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Талбай м²:</span>
                            <span>{item.area || '-'}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Card className="border-dashed border-2 border-gray-300 hover:border-gray-400 transition-colors cursor-pointer">
                    <CardContent className="p-4 flex flex-col items-center justify-center h-full min-h-[200px]">
                      <div className="text-3xl text-gray-400 mb-2">+</div>
                      <p className="text-gray-600">Add more</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Billboard Section */}
            {billboardItems.length > 0 && (
              <div>
                <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">Billboard ({billboardItems.length})</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                  {billboardItems.map((item, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            🏢
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-500 hover:text-red-500 flex items-center gap-1"
                            onClick={() => {/* Remove item logic */}}
                          >
                            <img src="/icons/svg/calc-clear.svg" alt="Clear" className="w-4 h-4" />
                            Clear
                          </Button>
                        </div>
                        <h4 className="font-medium mb-2">{item.name}</h4>
                        <p className="text-sm text-gray-600 mb-3">{item.location}</p>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Size:</span>
                            <span>{item.size}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Daily Views:</span>
                            <span>{item.dailyViews?.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Cost:</span>
                            <span>₮{item.cost?.toLocaleString()}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Card className="border-dashed border-2 border-gray-300 hover:border-gray-400 transition-colors cursor-pointer">
                    <CardContent className="p-4 flex flex-col items-center justify-center h-full min-h-[200px]">
                      <div className="text-3xl text-gray-400 mb-2">+</div>
                      <p className="text-gray-600">Add more</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Liftboard Section */}
            {liftboardItems.length > 0 && (
              <div>
                <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">Liftboard ({liftboardItems.length})</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                  {liftboardItems.map((item, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                            🛗
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-500 hover:text-red-500 flex items-center gap-1"
                            onClick={() => {/* Remove item logic */}}
                          >
                            <img src="/icons/svg/calc-clear.svg" alt="Clear" className="w-4 h-4" />
                            Clear
                          </Button>
                        </div>
                        <h4 className="font-medium mb-2">{item.name}</h4>
                        <p className="text-sm text-gray-600 mb-3">{item.location}</p>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Duration:</span>
                            <span>{item.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Daily Views:</span>
                            <span>{item.dailyViews?.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Cost:</span>
                            <span>₮{item.cost?.toLocaleString()}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Card className="border-dashed border-2 border-gray-300 hover:border-gray-400 transition-colors cursor-pointer">
                    <CardContent className="p-4 flex flex-col items-center justify-center h-full min-h-[200px]">
                      <div className="text-3xl text-gray-400 mb-2">+</div>
                      <p className="text-gray-600">Add more</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Newspaper Section */}
            {newspaperItems.length > 0 && (
              <div>
                <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">Newspaper ({newspaperItems.length})</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                  {newspaperItems.map((item, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                            📰
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-500 hover:text-red-500 flex items-center gap-1"
                            onClick={() => {/* Remove item logic */}}
                          >
                            <img src="/icons/svg/calc-clear.svg" alt="Clear" className="w-4 h-4" />
                            Clear
                          </Button>
                        </div>
                        <h4 className="font-medium mb-2">{item.name}</h4>
                        <p className="text-sm text-gray-600 mb-3">{item.duration}</p>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Avg Views:</span>
                            <span>{item.avgViews}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Cost:</span>
                            <span>₮{item.cost?.toLocaleString()}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Card className="border-dashed border-2 border-gray-300 hover:border-gray-400 transition-colors cursor-pointer">
                    <CardContent className="p-4 flex flex-col items-center justify-center h-full min-h-[200px]">
                      <div className="text-3xl text-gray-400 mb-2">+</div>
                      <p className="text-gray-600">Add more</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Configuration */}
          <div className="w-full lg:w-1/3 xl:w-1/4 space-y-4 sm:space-y-6 overflow-y-auto bg-white p-4 sm:p-6 rounded-lg">
            <div className="border-b border-gray-200 pb-2 mb-4 sm:mb-6">
              <div className="flex gap-3 sm:gap-6 overflow-x-auto">
                {Object.keys(selectedCategories).length > 0 && (
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`text-xs sm:text-sm font-medium pb-2 border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === 'all' 
                        ? 'text-gray-900 border-gray-900' 
                        : 'text-gray-500 border-transparent hover:text-gray-700'
                    }`}
                  >
                    All
                  </button>
                )}
                {tvChannels.length > 0 && (
                  <button
                    onClick={() => setActiveTab('tv')}
                    className={`text-xs sm:text-sm font-medium pb-2 border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === 'tv' 
                        ? 'text-gray-900 border-gray-900' 
                        : 'text-gray-500 border-transparent hover:text-gray-700'
                    }`}
                  >
                    TV
                  </button>
                )}
                {oohItems.length > 0 && (
                  <button
                    onClick={() => setActiveTab('ooh')}
                    className={`text-xs sm:text-sm font-medium pb-2 border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === 'ooh' 
                        ? 'text-gray-900 border-gray-900' 
                        : 'text-gray-500 border-transparent hover:text-gray-700'
                    }`}
                  >
                    OOH
                  </button>
                )}
                {billboardItems.length > 0 && (
                  <button
                    onClick={() => setActiveTab('billboard')}
                    className={`text-xs sm:text-sm font-medium pb-2 border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === 'billboard' 
                        ? 'text-gray-900 border-gray-900' 
                        : 'text-gray-500 border-transparent hover:text-gray-700'
                    }`}
                  >
                    Billboard
                  </button>
                )}
                {liftboardItems.length > 0 && (
                  <button
                    onClick={() => setActiveTab('liftboard')}
                    className={`text-xs sm:text-sm font-medium pb-2 border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === 'liftboard' 
                        ? 'text-gray-900 border-gray-900' 
                        : 'text-gray-500 border-transparent hover:text-gray-700'
                    }`}
                  >
                    Liftboard
                  </button>
                )}
                {newspaperItems.length > 0 && (
                  <button
                    onClick={() => setActiveTab('newspaper')}
                    className={`text-xs sm:text-sm font-medium pb-2 border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === 'newspaper' 
                        ? 'text-gray-900 border-gray-900' 
                        : 'text-gray-500 border-transparent hover:text-gray-700'
                    }`}
                  >
                    Newspaper
                  </button>
                )}
              </div>
            </div>

                          {activeTab === 'all' && (
              <div className="space-y-4 sm:space-y-6">
                {/* TV Channels Configuration */}
                {tvChannels.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3">TV Channels</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {tvChannels.map((item, index) => (
                        <Badge key={index} variant="secondary">
                          TV ({item.name})
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Реклам цацах цаг</label>
                        <div className="flex gap-2">
                          <Button
                            variant={broadcastTime === '17:00-00:00' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setBroadcastTime('17:00-00:00')}
                          >
                            17:00-00:00
                          </Button>
                          <Button
                            variant={broadcastTime === 'other' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setBroadcastTime('other')}
                          >
                            Бусад
                          </Button>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Цацах хоногын тоо</label>
                        <Input
                          placeholder="Type here"
                          value={broadcastDays}
                          onChange={(e) => setBroadcastDays(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Реклам цацах хугацаа</label>
                        <Input
                          placeholder="Type here"
                          value={broadcastDuration}
                          onChange={(e) => setBroadcastDuration(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Байршил</label>
                        <Select value={location} onValueChange={setLocation}>
                          <SelectTrigger>
                            <SelectValue placeholder="Сонгох" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ulaanbaatar">Улаанбаатар</SelectItem>
                            <SelectItem value="darkhan">Дархан</SelectItem>
                            <SelectItem value="erdenet">Эрдэнэт</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                     
                    </div>
                  </div>
                )}

                {/* OOH Summary */}
                {oohItems.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3">OOH</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {oohItems.map((item, index) => (
                        <Badge key={index} variant="secondary">
                          OOH ({item.name})
                        </Badge>
                      ))}
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <div className="text-sm text-gray-600">Нийт төлбөр / Views</div>
                        <div className="font-semibold">₮{totalCost.toLocaleString()} / {totalViews.toLocaleString()}+</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Billboard Summary */}
                {billboardItems.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3">Billboard</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {billboardItems.map((item, index) => (
                        <Badge key={index} variant="secondary">
                          Billboard ({item.name})
                        </Badge>
                      ))}
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <div className="text-sm text-gray-600">Нийт төлбөр / Views</div>
                        <div className="font-semibold">₮{totalCost.toLocaleString()} / {totalViews.toLocaleString()}+</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Liftboard Summary */}
                {liftboardItems.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3">Liftboard</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {liftboardItems.map((item, index) => (
                        <Badge key={index} variant="secondary">
                          Liftboard ({item.name})
                        </Badge>
                      ))}
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <div className="text-sm text-gray-600">Нийт төлбөр / Views</div>
                        <div className="font-semibold">₮{totalCost.toLocaleString()} / {totalViews.toLocaleString()}+</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Newspaper Summary */}
                {newspaperItems.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3">Newspaper</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {newspaperItems.map((item, index) => (
                        <Badge key={index} variant="secondary">
                          Newspaper ({item.name})
                        </Badge>
                      ))}
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <div className="text-sm text-gray-600">Нийт төлбөр / Views</div>
                        <div className="font-semibold">₮{totalCost.toLocaleString()} / {totalViews.toLocaleString()}+</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'tv' && (
              <div className="space-y-4 sm:space-y-6">
                {/* TV Configuration */}
                {tvChannels.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3">TV Channels</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {tvChannels.map((item, index) => (
                        <Badge key={index} variant="secondary">
                          TV ({item.name})
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Реклам цацах цаг</label>
                        <div className="flex gap-2">
                          <Button
                            variant={broadcastTime === '17:00-00:00' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setBroadcastTime('17:00-00:00')}
                          >
                            17:00-00:00
                          </Button>
                          <Button
                            variant={broadcastTime === 'other' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setBroadcastTime('other')}
                          >
                            Бусад
                          </Button>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Цацах хоногын тоо</label>
                        <Input
                          placeholder="Type here"
                          value={broadcastDays}
                          onChange={(e) => setBroadcastDays(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Реклам цацах хугацаа</label>
                        <Input
                          placeholder="Type here"
                          value={broadcastDuration}
                          onChange={(e) => setBroadcastDuration(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Байршил</label>
                        <Select value={location} onValueChange={setLocation}>
                          <SelectTrigger>
                            <SelectValue placeholder="Сонгох" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ulaanbaatar">Улаанбаатар</SelectItem>
                            <SelectItem value="darkhan">Дархан</SelectItem>
                            <SelectItem value="erdenet">Эрдэнэт</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* TV-specific Summary Row */}
                      <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Төлбөр</div>
                          <div className="font-semibold">₮{tvChannels.reduce((sum, item) => sum + (item.cost || 0), 0).toLocaleString()}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Авч үзэлт</div>
                          <div className="font-semibold">+{tvChannels.reduce((sum, item) => sum + (item.views || 0), 0).toLocaleString()}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Хугацаа</div>
                          <div className="font-semibold">6 мин</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'ooh' && (
              <div className="space-y-4 sm:space-y-6">
                {/* OOH Configuration */}
                {oohItems.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3">OOH</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {oohItems.map((item, index) => (
                        <Badge key={index} variant="secondary">
                          OOH ({item.name})
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Реклам цацах цаг</label>
                        <div className="flex gap-2">
                          <Button
                            variant={broadcastTime === '17:00-00:00' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setBroadcastTime('17:00-00:00')}
                          >
                            17:00-00:00
                          </Button>
                          <Button
                            variant={broadcastTime === 'other' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setBroadcastTime('other')}
                          >
                            Бусад
                          </Button>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Цацах хоногын тоо</label>
                        <Input
                          placeholder="Type here"
                          value={broadcastDays}
                          onChange={(e) => setBroadcastDays(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Реклам цацах хугацаа</label>
                        <Input
                          placeholder="Type here"
                          value={broadcastDuration}
                          onChange={(e) => setBroadcastDuration(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Байршил</label>
                        <Select value={location} onValueChange={setLocation}>
                          <SelectTrigger>
                            <SelectValue placeholder="Сонгох" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ulaanbaatar">Улаанбаатар</SelectItem>
                            <SelectItem value="darkhan">Дархан</SelectItem>
                            <SelectItem value="erdenet">Эрдэнэт</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* OOH-specific Summary Row */}
                      <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Төлбөр</div>
                          <div className="font-semibold">₮{oohItems.reduce((sum, item) => sum + (item.cost || 0), 0).toLocaleString()}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Авч үзэлт</div>
                          <div className="font-semibold">+{oohItems.reduce((sum, item) => sum + (item.views || 0), 0).toLocaleString()}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Хугацаа</div>
                          <div className="font-semibold">6 мин</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'billboard' && (
              <div className="space-y-4 sm:space-y-6">
                {/* Billboard Configuration */}
                {billboardItems.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3">Billboard</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {billboardItems.map((item, index) => (
                        <Badge key={index} variant="secondary">
                          Billboard ({item.name})
                        </Badge>
                      ))}
                </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Реклам цацах цаг</label>
                        <div className="flex gap-2">
                          <Button
                            variant={broadcastTime === '17:00-00:00' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setBroadcastTime('17:00-00:00')}
                          >
                            17:00-00:00
                          </Button>
                          <Button
                            variant={broadcastTime === 'other' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setBroadcastTime('other')}
                          >
                            Бусад
                          </Button>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Цацах хоногын тоо</label>
                        <Input
                          placeholder="Type here"
                          value={broadcastDays}
                          onChange={(e) => setBroadcastDays(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Реклам цацах хугацаа</label>
                        <Input
                          placeholder="Type here"
                          value={broadcastDuration}
                          onChange={(e) => setBroadcastDuration(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Байршил</label>
                        <Select value={location} onValueChange={setLocation}>
                          <SelectTrigger>
                            <SelectValue placeholder="Сонгох" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ulaanbaatar">Улаанбаатар</SelectItem>
                            <SelectItem value="darkhan">Дархан</SelectItem>
                            <SelectItem value="erdenet">Эрдэнэт</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Billboard-specific Summary Row */}
                      <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Төлбөр</div>
                          <div className="font-semibold">₮{billboardItems.reduce((sum, item) => sum + (item.cost || 0), 0).toLocaleString()}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Авч үзэлт</div>
                          <div className="font-semibold">+{billboardItems.reduce((sum, item) => sum + (item.views || 0), 0).toLocaleString()}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Хугацаа</div>
                          <div className="font-semibold">6 мин</div>
                        </div>
                      </div>
                </div>
            </div>
          )}
              </div>
            )}

            {activeTab === 'liftboard' && (
              <div className="space-y-4 sm:space-y-6">
                {/* Liftboard Configuration */}
                {liftboardItems.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3">Liftboard</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {liftboardItems.map((item, index) => (
                        <Badge key={index} variant="secondary">
                          Liftboard ({item.name})
                        </Badge>
                      ))}
        </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Реклам цацах цаг</label>
                        <div className="flex gap-2">
                          <Button
                            variant={broadcastTime === '17:00-00:00' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setBroadcastTime('17:00-00:00')}
                          >
                            17:00-00:00
                          </Button>
                          <Button
                            variant={broadcastTime === 'other' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setBroadcastTime('other')}
                          >
                            Бусад
                          </Button>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Цацах хоногын тоо</label>
                        <Input
                          placeholder="Type here"
                          value={broadcastDays}
                          onChange={(e) => setBroadcastDays(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Реклам цацах хугацаа</label>
                        <Input
                          placeholder="Type here"
                          value={broadcastDuration}
                          onChange={(e) => setBroadcastDuration(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Байршил</label>
                        <Select value={location} onValueChange={setLocation}>
                          <SelectTrigger>
                            <SelectValue placeholder="Сонгох" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ulaanbaatar">Улаанбаатар</SelectItem>
                            <SelectItem value="darkhan">Дархан</SelectItem>
                            <SelectItem value="erdenet">Эрдэнэт</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Liftboard-specific Summary Row */}
                      <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Төлбөр</div>
                          <div className="font-semibold">₮{liftboardItems.reduce((sum, item) => sum + (item.cost || 0), 0).toLocaleString()}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Авч үзэлт</div>
                          <div className="font-semibold">+{liftboardItems.reduce((sum, item) => sum + (item.views || 0), 0).toLocaleString()}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Хугацаа</div>
                          <div className="font-semibold">6 мин</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'newspaper' && (
              <div className="space-y-4 sm:space-y-6">
                {/* Newspaper Configuration */}
                {newspaperItems.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3">Newspaper</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {newspaperItems.map((item, index) => (
                        <Badge key={index} variant="secondary">
                          Newspaper ({item.name})
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Реклам цацах цаг</label>
                        <div className="flex gap-2">
                          <Button
                            variant={broadcastTime === '17:00-00:00' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setBroadcastTime('17:00-00:00')}
                          >
                            17:00-00:00
                          </Button>
                          <Button
                            variant={broadcastTime === 'other' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setBroadcastTime('other')}
                          >
                            Бусад
                          </Button>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Цацах хоногын тоо</label>
                        <Input
                          placeholder="Type here"
                          value={broadcastDays}
                          onChange={(e) => setBroadcastDays(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Реклам цацах хугацаа</label>
                        <Input
                          placeholder="Type here"
                          value={broadcastDuration}
                          onChange={(e) => setBroadcastDuration(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Байршил</label>
                        <Select value={location} onValueChange={setLocation}>
                          <SelectTrigger>
                            <SelectValue placeholder="Сонгох" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ulaanbaatar">Улаанбаатар</SelectItem>
                            <SelectItem value="darkhan">Дархан</SelectItem>
                            <SelectItem value="erdenet">Эрдэнэт</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Newspaper-specific Summary Row */}
                      <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Төлбөр</div>
                          <div className="font-semibold">₮{newspaperItems.reduce((sum, item) => sum + (item.cost || 0), 0).toLocaleString()}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Авч үзэлт</div>
                          <div className="font-semibold">+{newspaperItems.reduce((sum, item) => sum + (item.views || 0), 0).toLocaleString()}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Хугацаа</div>
                          <div className="font-semibold">6 мин</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Total Cost Summary - Bottom of Right Sidebar */}
            <div className="mt-6 sm:mt-8 pt-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                <h4 className="text-xs sm:text-sm text-gray-600">Нийт төлбөр / Views</h4>
                <div className="flex items-center gap-2">
                  <div className="text-lg sm:text-2xl font-bold text-gray-800">
                    ₮{totalCost.toLocaleString()}
                  </div>
                  <img src="/icons/svg/slash.svg" alt="Separator" className="w-3 h-3 sm:w-4 sm:h-4" />
                  <div className="text-lg sm:text-2xl font-bold text-gray-800">
                    {totalViews.toLocaleString()}
                  </div>
                  <img src="/icons/svg/view-insight.svg" alt="Views" className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              </div>
          </div>

            {/* Action Buttons - Bottom of Right Sidebar */}
            <div className="mt-4 flex flex-col sm:flex-row gap-2">
              <Button 
                variant="outline" 
                className="flex-1 flex items-center justify-center gap-2 py-2 sm:py-3 rounded-full border-gray-300 hover:bg-[#09090B] hover:text-white hover:border-[#09090B] transition-colors cursor-pointer text-sm"
              >
                <svg width="14" height="14" className="sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                  <polyline points="17,21 17,13 7,13 7,21"/>
                  <polyline points="7,3 7,8 15,8"/>
                </svg>
              Хадгалах
            </Button>
              <Button 
                className="flex-1 flex items-center justify-center gap-2 py-2 sm:py-3 bg-[#09090B] hover:bg-[#09090B]/90 rounded-full transition-colors cursor-pointer text-sm"
              >
                <svg width="14" height="14" className="sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7,10 12,15 17,10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              Татаж авах
            </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculationModal; 