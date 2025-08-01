'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { PieChart } from '@/components/ui/pie-chart';

// Chart data for marketing plan analysis
const BUDGET_ALLOCATION_DATA = [
  { name: 'ТВ сурталчилгаа', value: 33, color: '#3B82F6' },
  { name: 'Сошиал медиа', value: 25, color: '#10B981' },
  { name: 'OOH дэлгэц', value: 17, color: '#F59E0B' },
  { name: 'Дижитал маркетинг', value: 15, color: '#8B5CF6' },
  { name: 'Бусад', value: 10, color: '#EF4444' }
];

const TARGET_AUDIENCE_DATA = [
  { name: '18-25 нас', value: 30, color: '#3B82F6' },
  { name: '26-35 нас', value: 35, color: '#10B981' },
  { name: '36-45 нас', value: 20, color: '#F59E0B' },
  { name: '46+ нас', value: 15, color: '#8B5CF6' }
];

const LOCATION_REACH_DATA = [
  { name: 'Улаанбаатар', views: 45 },
  { name: 'Дархан', views: 25 },
  { name: 'Орхон', views: 15 },
  { name: 'Төв', views: 10 },
  { name: 'Бусад', views: 5 }
];

const AIMarketingPlanModal = ({ marketingData, children, onClose, isOpen, setIsOpen }) => {
  const handleClose = () => {
    if (setIsOpen) setIsOpen(false);
    if (onClose) onClose();
  };

  const CustomPieChart = ({ data, title, showTooltip = false }) => (
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
  );

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
    </div>
  );

  // Calculate budget allocations
  const budget = parseInt(marketingData?.budget?.replace(/[^\d]/g, '') || '0');
  const tvBudget = Math.floor(budget * 0.33);
  const socialBudget = Math.floor(budget * 0.25);
  const oohBudget = Math.floor(budget * 0.17);
  const digitalBudget = Math.floor(budget * 0.15);
  const otherBudget = budget - tvBudget - socialBudget - oohBudget - digitalBudget;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-6xl w-[95vw] max-h-[90vh] overflow-y-auto sm:max-w-6xl md:max-w-6xl lg:max-w-6xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 text-center">
            🎯 Маркетингийн төлөвлөгөө
          </DialogTitle>
          <p className="text-gray-600 text-center">Таны хариулт дээр суурилсан цогц маркетингийн стратеги</p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Plan Summary Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-2 border-blue-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  📋 Төлөвлөгөөний мэдээлэл
                </h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <label className="text-sm font-medium text-blue-700">🎯 Зорилго:</label>
                    <p className="text-sm text-gray-900 mt-1 font-medium">{marketingData?.goal || 'Тодорхойлогдоогүй'}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <label className="text-sm font-medium text-green-700">👥 Зорилтод хэрэглэгчид:</label>
                    <p className="text-sm text-gray-900 mt-1 font-medium">{marketingData?.targetUsers || 'Тодорхойлогдоогүй'} хүн</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <label className="text-sm font-medium text-purple-700">🏢 Үйл ажиллагааны чиглэл:</label>
                    <p className="text-sm text-gray-900 mt-1 font-medium">{marketingData?.businessDirection || 'Тодорхойлогдоогүй'}</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <label className="text-sm font-medium text-orange-700">💰 Төсөв:</label>
                    <p className="text-lg font-bold text-gray-900 mt-1">{marketingData?.budget || 'Тодорхойлогдоогүй'} ₮</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  📺 Санал болгох суваг
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                    <div>
                      <h4 className="font-bold text-gray-900">🏆 Боловсрол ТВ</h4>
                      <p className="text-sm text-gray-600">Өдөрт 351,549 үзэгч</p>
                      <p className="text-xs text-blue-600">Хамгийн өндөр үзэлттэй</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900 text-lg">₮150,000</p>
                      <p className="text-xs text-gray-600">нэг удаа</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                    <div>
                      <h4 className="font-bold text-gray-900">🥈 Энэтхэг ТВ</h4>
                      <p className="text-sm text-gray-600">Өдөрт 280,000 үзэгч</p>
                      <p className="text-xs text-green-600">2-р байр</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900 text-lg">₮120,000</p>
                      <p className="text-xs text-gray-600">нэг удаа</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                    <div>
                      <h4 className="font-bold text-gray-900">🥉 Монгол ТВ</h4>
                      <p className="text-sm text-gray-600">Өдөрт 200,000 үзэгч</p>
                      <p className="text-xs text-purple-600">3-р байр</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900 text-lg">₮100,000</p>
                      <p className="text-xs text-gray-600">нэг удаа</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Budget Analysis Section */}
          <Card className="border-2 border-orange-200">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                💰 Төсөвний дүн шинжилгээ
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="text-center p-4 bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                  <div className="text-3xl font-bold text-blue-600 mb-2">₮{tvBudget.toLocaleString()}</div>
                  <div className="text-sm font-medium text-gray-700">ТВ сурталчилгаа</div>
                  <div className="text-xs text-gray-500 mt-1">33%</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-b from-green-50 to-green-100 rounded-lg border border-green-200">
                  <div className="text-3xl font-bold text-green-600 mb-2">₮{socialBudget.toLocaleString()}</div>
                  <div className="text-sm font-medium text-gray-700">Сошиал медиа</div>
                  <div className="text-xs text-gray-500 mt-1">25%</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-b from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">₮{oohBudget.toLocaleString()}</div>
                  <div className="text-sm font-medium text-gray-700">OOH дэлгэц</div>
                  <div className="text-xs text-gray-500 mt-1">17%</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-b from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                  <div className="text-3xl font-bold text-purple-600 mb-2">₮{digitalBudget.toLocaleString()}</div>
                  <div className="text-sm font-medium text-gray-700">Дижитал</div>
                  <div className="text-xs text-gray-500 mt-1">15%</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-b from-red-50 to-red-100 rounded-lg border border-red-200">
                  <div className="text-3xl font-bold text-red-600 mb-2">₮{otherBudget.toLocaleString()}</div>
                  <div className="text-sm font-medium text-gray-700">Бусад</div>
                  <div className="text-xs text-gray-500 mt-1">10%</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-4">
                <CustomPieChart data={BUDGET_ALLOCATION_DATA} title="Төсөвний хуваарилалт" showTooltip={true} />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <CustomPieChart data={TARGET_AUDIENCE_DATA} title="Зорилтот үзэгчид" showTooltip={true} />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <BarChart data={LOCATION_REACH_DATA} title="Байршлын хүртээмж" />
              </CardContent>
            </Card>
          </div>

          {/* Recommendations Section */}
          <Card className="border-2 border-indigo-200">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                💡 Санал болгох стратеги
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                    <div>
                      <h4 className="font-medium text-gray-900">ТВ сурталчилгаа</h4>
                      <p className="text-sm text-gray-600">Өдөрт 3-5 удаа, 15-30 секундын урттай</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                    <div>
                      <h4 className="font-medium text-gray-900">Сошиал медиа</h4>
                      <p className="text-sm text-gray-600">Instagram, Facebook дээр өдөрт 2-3 пост</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                    <div>
                      <h4 className="font-medium text-gray-900">OOH дэлгэц</h4>
                      <p className="text-sm text-gray-600">Төв талбай, их дэлгүүрүүдэд 2-4 долоо хоног</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">4</div>
                    <div>
                      <h4 className="font-medium text-gray-900">Дижитал маркетинг</h4>
                      <p className="text-sm text-gray-600">Google Ads, YouTube дээр зорилтот сурталчилгаа</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 pt-4">
            <button 
              onClick={handleClose}
              className="bg-gray-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors cursor-pointer flex items-center space-x-2"
            >
              <span>✕</span>
              <span>Хаах</span>
            </button>
            <button 
              className="bg-green-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center space-x-2 cursor-pointer"
            >
              <span>💾</span>
              <span>Төлөвлөгөөг хадгалах</span>
            </button>
            <button 
              className="bg-blue-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center space-x-2 cursor-pointer"
            >
              <span>📊</span>
              <span>Тооцоолуурт нэмэх</span>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIMarketingPlanModal; 