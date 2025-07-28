'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ViewModal = ({ isOpen, onClose, calculatorItems }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  // Animation effect on mount
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);

  // Get items by category
  const tvChannels = calculatorItems.filter(item => item.type === 'tv');
  const oohItems = calculatorItems.filter(item => item.type === 'ooh');
  const billboardItems = calculatorItems.filter(item => item.type === 'billboard');
  const liftboardItems = calculatorItems.filter(item => item.type === 'liftboard');
  const newspaperItems = calculatorItems.filter(item => item.type === 'newspaper');
  const newsItems = calculatorItems.filter(item => item.type === 'news');
  const campaignItems = calculatorItems.filter(item => item.type === 'campaign');

  const totalItems = calculatorItems.length;
  const totalCost = calculatorItems.reduce((sum, item) => sum + (item.cost || 0), 0);
  const totalViews = calculatorItems.reduce((sum, item) => sum + (item.views || 0), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex items-center justify-center p-4">
      {/* Animated Modal Container */}
      <div 
        className={`w-full max-w-6xl h-full max-h-[90vh] bg-white rounded-3xl overflow-hidden transform transition-all duration-700 ease-out ${
          isAnimating 
            ? 'scale-100 opacity-100 translate-y-0' 
            : 'scale-95 opacity-0 translate-y-10'
        }`}
      >
        {/* Header with gradient background */}
        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6 text-white">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white bg-opacity-10 rounded-full animate-pulse delay-300"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white bg-opacity-5 rounded-full animate-ping"></div>
          </div>
          
          <div className="relative z-10 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <img src="/icons/svg/calculator.svg" alt="Calculator" className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">View Details</h2>
                <p className="text-blue-100 text-sm">Total Items: {totalItems}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm hover:bg-opacity-30 transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row h-full">
          {/* Left Column - Items List */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* TV Channels */}
              {tvChannels.length > 0 && (
                <div className="animate-fade-in-up">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                      📺
                    </div>
                    TV Channels ({tvChannels.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tvChannels.map((item, index) => (
                      <Card key={index} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-medium">{item.name}</h4>
                            <Badge variant="secondary">₮{item.cost?.toLocaleString()}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{item.providers?.join(' • ')}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>👁️ {item.views?.toLocaleString()}+ views</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* OOH */}
              {oohItems.length > 0 && (
                <div className="animate-fade-in-up">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center">
                      🌳
                    </div>
                    OOH ({oohItems.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {oohItems.map((item, index) => (
                      <Card key={index} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-medium">{item.name}</h4>
                            <Badge variant="secondary">₮{item.cost?.toLocaleString()}</Badge>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>Total Facilities: {item.totalFacilities}</p>
                            <p>Area: {item.area} m²</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Billboard */}
              {billboardItems.length > 0 && (
                <div className="animate-fade-in-up">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center">
                      🏢
                    </div>
                    Billboard ({billboardItems.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {billboardItems.map((item, index) => (
                      <Card key={index} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-medium">{item.name}</h4>
                            <Badge variant="secondary">₮{item.cost?.toLocaleString()}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{item.location}</p>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>Size: {item.size}</p>
                            <p>Daily Views: {item.dailyViews?.toLocaleString()}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Liftboard */}
              {liftboardItems.length > 0 && (
                <div className="animate-fade-in-up">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <div className="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center">
                      🛗
                    </div>
                    Liftboard ({liftboardItems.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {liftboardItems.map((item, index) => (
                      <Card key={index} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-orange-500">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-medium">{item.name}</h4>
                            <Badge variant="secondary">₮{item.cost?.toLocaleString()}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{item.location}</p>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>Duration: {item.duration}</p>
                            <p>Daily Views: {item.dailyViews?.toLocaleString()}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Newspaper */}
              {newspaperItems.length > 0 && (
                <div className="animate-fade-in-up">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <div className="w-6 h-6 bg-red-100 rounded-lg flex items-center justify-center">
                      📰
                    </div>
                    Newspaper ({newspaperItems.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {newspaperItems.map((item, index) => (
                      <Card key={index} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-red-500">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-medium">{item.name}</h4>
                            <Badge variant="secondary">₮{item.cost?.toLocaleString()}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{item.duration}</p>
                          <div className="text-sm text-gray-600">
                            <p>Avg Views: {item.avgViews}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* News */}
              {newsItems.length > 0 && (
                <div className="animate-fade-in-up">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                      🌍
                    </div>
                    News ({newsItems.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {newsItems.map((item, index) => (
                      <Card key={index} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-medium">{item.name}</h4>
                            <Badge variant="secondary">₮{item.cost?.toLocaleString()}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{item.duration}</p>
                          <div className="text-sm text-gray-600">
                            <p>Avg Views: {item.avgViews}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Campaigns */}
              {campaignItems.length > 0 && (
                <div className="animate-fade-in-up">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <div className="w-6 h-6 bg-pink-100 rounded-lg flex items-center justify-center">
                      📺
                    </div>
                    Campaigns ({campaignItems.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {campaignItems.map((item, index) => (
                      <Card key={index} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-pink-500">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-medium">{item.title}</h4>
                            <Badge variant="secondary">₮{item.cost?.toLocaleString()}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{item.brand}</p>
                          <div className="text-sm text-gray-600">
                            <p>Duration: {item.duration}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Total Summary */}
          <div className="w-full lg:w-1/3 bg-gradient-to-b from-gray-50 to-white p-6 border-l border-gray-200">
            <div className="sticky top-6">
              <h3 className="text-xl font-bold mb-6 text-gray-800">Summary</h3>
              
              {/* Combined Total Summary */}
              <Card className="mb-6 bg-white border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-800">Нийт төлбөр / Views</span>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">₮{totalCost.toLocaleString()} / {totalViews.toLocaleString()}</span>
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Category Breakdown */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-700">Category Breakdown</h4>
                
                {tvChannels.length > 0 && (
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-medium">TV Channels</span>
                    </div>
                    <span className="text-sm font-semibold">₮{tvChannels.reduce((sum, item) => sum + (item.cost || 0), 0).toLocaleString()}</span>
                  </div>
                )}

                {oohItems.length > 0 && (
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium">OOH</span>
                    </div>
                    <span className="text-sm font-semibold">₮{oohItems.reduce((sum, item) => sum + (item.cost || 0), 0).toLocaleString()}</span>
                  </div>
                )}

                {billboardItems.length > 0 && (
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                      <span className="text-sm font-medium">Billboard</span>
                    </div>
                    <span className="text-sm font-semibold">₮{billboardItems.reduce((sum, item) => sum + (item.cost || 0), 0).toLocaleString()}</span>
                  </div>
                )}

                {liftboardItems.length > 0 && (
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                      <span className="text-sm font-medium">Liftboard</span>
                    </div>
                    <span className="text-sm font-semibold">₮{liftboardItems.reduce((sum, item) => sum + (item.cost || 0), 0).toLocaleString()}</span>
                  </div>
                )}

                {newspaperItems.length > 0 && (
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                      <span className="text-sm font-medium">Newspaper</span>
                    </div>
                    <span className="text-sm font-semibold">₮{newspaperItems.reduce((sum, item) => sum + (item.cost || 0), 0).toLocaleString()}</span>
                  </div>
                )}

                {newsItems.length > 0 && (
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-medium">News</span>
                    </div>
                    <span className="text-sm font-semibold">₮{newsItems.reduce((sum, item) => sum + (item.cost || 0), 0).toLocaleString()}</span>
                  </div>
                )}

                {campaignItems.length > 0 && (
                  <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-pink-500 rounded-full"></div>
                      <span className="text-sm font-medium">Campaigns</span>
                    </div>
                    <span className="text-sm font-semibold">₮{campaignItems.reduce((sum, item) => sum + (item.cost || 0), 0).toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 space-y-3">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl py-3 transition-all duration-300 transform hover:scale-105">
                  Download Report
                </Button>
                <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl py-3 transition-all duration-300">
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewModal; 