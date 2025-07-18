'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CalculationModal = ({ isOpen, onClose, calculatorItems }) => {
  const [activeTab, setActiveTab] = useState('map');
  const [broadcastTime, setBroadcastTime] = useState('17:00-00:00');
  const [broadcastDays, setBroadcastDays] = useState('');
  const [broadcastDuration, setBroadcastDuration] = useState('');
  const [location, setLocation] = useState('');

  // Get items by category
  const tvChannels = calculatorItems.filter(item => item.type === 'tv');
  const oohItems = calculatorItems.filter(item => item.type === 'ooh');
  const billboardItems = calculatorItems.filter(item => item.type === 'billboard');
  const liftboardItems = calculatorItems.filter(item => item.type === 'liftboard');

  const totalItems = calculatorItems.length;
  const totalCost = calculatorItems.reduce((sum, item) => sum + (item.cost || 0), 0);
  const totalViews = calculatorItems.reduce((sum, item) => sum + (item.views || 0), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex items-center justify-center">
      <div className="w-full h-full bg-white flex flex-col relative z-[10000]">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            Calculation Bag ({totalItems})
          </h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setActiveTab(activeTab === 'map' ? 'config' : 'map')}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
            >
              {activeTab === 'map' ? 'Configuration' : 'Map'}
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col xl:flex-row gap-8 p-8 overflow-hidden">
          {/* Left Column - Items */}
          <div className="flex-1 space-y-6 overflow-y-auto pr-4">
            {/* TV Channels Section */}
            {tvChannels.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-4">TV Channels ({tvChannels.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {tvChannels.map((item, index) => (
                    <Card key={index} className="relative">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg mb-2"></div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-500 hover:text-red-500"
                            onClick={() => {/* Remove item logic */}}
                          >
                            ✕ Clear
                          </Button>
                        </div>
                        <h4 className="font-medium mb-2">{item.name}</h4>
                        <p className="text-sm text-gray-600 mb-3">
                          {item.providers?.join(' · ')} +12
                        </p>
                        <div className="flex gap-2 mb-3">
                          <Badge variant={item.timeFilter === 'one-day' ? 'default' : 'secondary'}>
                            One day
                          </Badge>
                          <Badge variant={item.timeFilter === 'one-week' ? 'default' : 'secondary'}>
                            One week
                          </Badge>
                          <Badge variant={item.timeFilter === 'one-month' ? 'default' : 'secondary'}>
                            One month
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
                  <Card className="border-dashed border-2 border-gray-300 hover:border-gray-400 transition-colors cursor-pointer">
                    <CardContent className="p-4 flex flex-col items-center justify-center h-full min-h-[200px]">
                      <div className="text-3xl text-gray-400 mb-2">+</div>
                      <p className="text-gray-600">Add more</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* OOH Section */}
            {oohItems.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-4">OOH ({oohItems.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
                            className="text-gray-500 hover:text-red-500"
                            onClick={() => {/* Remove item logic */}}
                          >
                            ✕ Clear
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
                <h3 className="text-lg font-medium mb-4">Billboard ({billboardItems.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
                            className="text-gray-500 hover:text-red-500"
                            onClick={() => {/* Remove item logic */}}
                          >
                            ✕ Clear
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
                <h3 className="text-lg font-medium mb-4">Liftboard ({liftboardItems.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
                            className="text-gray-500 hover:text-red-500"
                            onClick={() => {/* Remove item logic */}}
                          >
                            ✕ Clear
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
          </div>

          {/* Right Column - Map or Configuration */}
          {activeTab === 'map' ? (
            <div className="flex-1 overflow-hidden">
              <div className="h-full bg-gray-100 rounded-lg relative z-0">
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
                      </svg>
                    </div>
                    <p className="text-lg font-medium">Interactive Map</p>
                    <p className="text-sm">Showing selected locations</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 space-y-6 overflow-y-auto pr-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="tv">TV</TabsTrigger>
                <TabsTrigger value="influencer">Influencer</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-6">
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

                      {/* Summary Row */}
                      <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Төлбөр</div>
                          <div className="font-semibold">₮{totalCost.toLocaleString()}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Авч үзэлт</div>
                          <div className="font-semibold">+{totalViews.toLocaleString()}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Хугацаа</div>
                          <div className="font-semibold">6 мин</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* OOH Summary */}
                {oohItems.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3">OOH</h4>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <div className="text-sm text-gray-600">Нийт төлбөр / Views</div>
                        <div className="font-semibold">₮{totalCost.toLocaleString()} / {totalViews.toLocaleString()}+</div>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="tv" className="space-y-6">
                {/* TV-specific configuration */}
                <div className="text-center text-gray-500 py-8">
                  TV-specific configuration options
                </div>
              </TabsContent>

              <TabsContent value="influencer" className="space-y-6">
                {/* Influencer-specific configuration */}
                <div className="text-center text-gray-500 py-8">
                  Influencer-specific configuration options
                </div>
              </TabsContent>
            </Tabs>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center p-6 border-t bg-white">
          <div className="text-lg font-semibold">
            Нийт төлбөр / Views: ₮{totalCost.toLocaleString()} / {totalViews.toLocaleString()}+
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <img src="/icons/svg/save.svg" alt="Save" className="w-4 h-4" />
              Хадгалах
            </Button>
            <Button className="flex items-center gap-2">
              <img src="/icons/svg/download.svg" alt="Download" className="w-4 h-4" />
              Татаж авах
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculationModal; 