'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { addToCalculator } from '@/lib/calculator';

const AgencyDetailsModal = ({ agency, children }) => {
  const [selectedService, setSelectedService] = useState('poster');
  const [selectedDuration, setSelectedDuration] = useState('1 month');

  const services = [
    { id: 'poster', name: 'Poster Design', price: '₮65,000 - 100,000' },
    { id: 'banner', name: 'Banner Design', price: '₮45,000 - 80,000' },
    { id: 'social', name: 'Social Media Content', price: '₮35,000 - 60,000' },
    { id: 'branding', name: 'Brand Identity', price: '₮150,000 - 250,000' },
    { id: 'video', name: 'Video Production', price: '₮200,000 - 400,000' }
  ];

  const durations = ['1 week', '2 weeks', '1 month', '3 months', '6 months'];

  const handleAddToCalculator = () => {
    const selectedServiceData = services.find(s => s.id === selectedService);
    addToCalculator({
      id: agency?.id || Date.now(),
      type: 'agency',
      name: agency?.name || 'Agency Service',
      service: selectedServiceData?.name || 'Poster Design',
      duration: selectedDuration,
      price: selectedServiceData?.price || '₮65,000 - 100,000',
      agency: agency?.name || 'Creative Studio Pro'
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-6xl w-[95vw] max-h-[90vh] overflow-y-auto sm:max-w-6xl md:max-w-6xl lg:max-w-6xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {agency?.name} - Agency Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Agency Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-6">
                {/* Agency Avatar */}
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-full flex items-center justify-center">
                    <img 
                      src={agency?.profileImage || "/icons/svg/agency-cover.svg"} 
                      alt={agency?.name}
                      className="w-16 h-16 rounded-full object-cover opacity-60"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
                </div>

                {/* Agency Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h2 className="text-2xl font-bold text-gray-900">{agency?.name}</h2>
                    <div className="flex space-x-2">
                      {agency?.tags?.map((tag, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className={`text-xs px-2 py-1 ${
                            index === 0 ? 'bg-purple-100 text-purple-800' : 'bg-pink-100 text-pink-800'
                          }`}
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {agency?.description}
                  </p>
                  <div className="text-lg font-semibold text-gray-900">
                    {agency?.pricing}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Services Grid */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Services & Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service) => (
                  <Card 
                    key={service.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedService === service.id 
                        ? 'ring-2 ring-blue-500 bg-blue-50' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => setSelectedService(service.id)}
                  >
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{service.name}</h3>
                      <p className="text-lg font-bold text-blue-600">{service.price}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Duration Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Project Duration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {durations.map((duration) => (
                  <Button
                    key={duration}
                    variant={selectedDuration === duration ? "default" : "outline"}
                    onClick={() => setSelectedDuration(duration)}
                    className="text-sm"
                  >
                    {duration}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Clients Portfolio */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Client Portfolio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {agency?.clients?.map((client, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-600">{client.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sample Work */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Sample Work</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm text-gray-500">Project {item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact & Action */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to work together?</h3>
                  <p className="text-gray-600">Contact us to discuss your project requirements</p>
                </div>
                <div className="flex space-x-3">
                  <Button variant="outline" className="px-6">
                    Contact Agency
                  </Button>
                  <Button 
                    onClick={handleAddToCalculator}
                    className="px-6 bg-blue-600 hover:bg-blue-700"
                  >
                    Add to Calculator
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AgencyDetailsModal; 