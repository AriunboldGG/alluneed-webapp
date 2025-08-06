'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AgencyDetailsModal from '../AgencyDetailsModal';

const AgencyPage = ({ selectedCategory }) => {
  const [selectedOptions, setSelectedOptions] = useState({});

  // Sample data for agencies
  const agencies = [
    {
      id: 1,
      name: 'Creative Studio Pro',
      description: 'It is a long established fact that a reader desktop publishing packages and web page.',
      tags: ['Design', 'Research'],
      category: 'design',
      clients: [
        { name: 'Client 1', logo: '/icons/svg/agency-cover.svg' },
        { name: 'Client 2', logo: '/icons/svg/agency-cover.svg' },
        { name: 'Client 3', logo: '/icons/svg/agency-cover.svg' },
        { name: 'Client 4', logo: '/icons/svg/agency-cover.svg' },
        { name: 'Client 5', logo: '/icons/svg/agency-cover.svg' }
      ],
      pricing: '₮65,000 - 100\'000 = 1 poster (avg)',
      profileImage: '/icons/svg/agency-cover.svg',
      serviceOptions: [
        { id: 'poster', label: 'Poster', price: '₮65,000', selected: true },
        { id: 'video', label: 'Video', price: '₮40,000', selected: false }
      ]
    },
    {
      id: 2,
      name: 'Digital Agency Plus',
      description: 'It is a long established fact that a reader desktop publishing packages and web page.',
      tags: ['Creative', 'Strategy'],
      category: 'marketing',
      clients: [
        { name: 'Client 1', logo: '/icons/svg/agency-cover.svg' },
        { name: 'Client 2', logo: '/icons/svg/agency-cover.svg' },
        { name: 'Client 3', logo: '/icons/svg/agency-cover.svg' },
        { name: 'Client 4', logo: '/icons/svg/agency-cover.svg' },
        { name: 'Client 5', logo: '/icons/svg/agency-cover.svg' }
      ],
      pricing: '₮75,000 - 120\'000 = 1 poster (avg)',
      profileImage: '/icons/svg/agency-cover.svg',
      serviceOptions: [
        { id: 'poster', label: 'Poster', price: '₮75,000', selected: true },
        { id: 'video', label: 'Video', price: '₮50,000', selected: false }
      ]
    },
    {
      id: 3,
      name: 'Brand Solutions Hub',
      description: 'It is a long established fact that a reader desktop publishing packages and web page.',
      tags: ['Branding', 'Marketing'],
      category: 'branding',
      clients: [
        { name: 'Client 1', logo: '/icons/svg/agency-cover.svg' },
        { name: 'Client 2', logo: '/icons/svg/agency-cover.svg' },
        { name: 'Client 3', logo: '/icons/svg/agency-cover.svg' },
        { name: 'Client 4', logo: '/icons/svg/agency-cover.svg' },
        { name: 'Client 5', logo: '/icons/svg/agency-cover.svg' }
      ],
      pricing: '₮55,000 - 90\'000 = 1 poster (avg)',
      profileImage: '/icons/svg/agency-cover.svg',
      serviceOptions: [
        { id: 'poster', label: 'Poster', price: '₮55,000', selected: true },
        { id: 'video', label: 'Video', price: '₮35,000', selected: false }
      ]
    },
    {
      id: 4,
      name: 'Innovation Lab',
      description: 'It is a long established fact that a reader desktop publishing packages and web page.',
      tags: ['Innovation', 'Technology'],
      category: 'video-production',
      clients: [
        { name: 'Client 1', logo: '/icons/svg/agency-cover.svg' },
        { name: 'Client 2', logo: '/icons/svg/agency-cover.svg' },
        { name: 'Client 3', logo: '/icons/svg/agency-cover.svg' },
        { name: 'Client 4', logo: '/icons/svg/agency-cover.svg' },
        { name: 'Client 5', logo: '/icons/svg/agency-cover.svg' }
      ],
      pricing: '₮85,000 - 140\'000 = 1 poster (avg)',
      profileImage: '/icons/svg/agency-cover.svg',
      serviceOptions: [
        { id: 'poster', label: 'Poster', price: '₮85,000', selected: true },
        { id: 'video', label: 'Video', price: '₮60,000', selected: false }
      ]
    },
    {
      id: 5,
      name: 'Media Masters',
      description: 'It is a long established fact that a reader desktop publishing packages and web page.',
      tags: ['Media', 'Production'],
      category: 'marketing',
      clients: [
        { name: 'Client 1', logo: '/icons/svg/agency-cover.svg' },
        { name: 'Client 2', logo: '/icons/svg/agency-cover.svg' },
        { name: 'Client 3', logo: '/icons/svg/agency-cover.svg' },
        { name: 'Client 4', logo: '/icons/svg/agency-cover.svg' },
        { name: 'Client 5', logo: '/icons/svg/agency-cover.svg' }
      ],
      pricing: '₮70,000 - 110\'000 = 1 poster (avg)',
      profileImage: '/icons/svg/agency-cover.svg',
      serviceOptions: [
        { id: 'poster', label: 'Poster', price: '₮70,000', selected: true },
        { id: 'video', label: 'Video', price: '₮45,000', selected: false }
      ]
    },
    {
      id: 6,
      name: 'Strategic Partners',
      description: 'It is a long established fact that a reader desktop publishing packages and web page.',
      tags: ['Strategy', 'Consulting'],
      category: 'design',
      clients: [
        { name: 'Client 1', logo: '/icons/svg/agency-cover.svg' },
        { name: 'Client 2', logo: '/icons/svg/agency-cover.svg' },
        { name: 'Client 3', logo: '/icons/svg/agency-cover.svg' },
        { name: 'Client 4', logo: '/icons/svg/agency-cover.svg' },
        { name: 'Client 5', logo: '/icons/svg/agency-cover.svg' }
      ],
      pricing: '₮95,000 - 150\'000 = 1 poster (avg)',
      profileImage: '/icons/svg/agency-cover.svg',
      serviceOptions: [
        { id: 'poster', label: 'Poster', price: '₮95,000', selected: true },
        { id: 'video', label: 'Video', price: '₮65,000', selected: false }
      ]
    }
  ];

  // Filter agencies based on selected category
  const filteredAgencies = selectedCategory === 'all' || selectedCategory === 'agency' 
    ? agencies 
    : agencies.filter(agency => agency.category === selectedCategory);

  const handleOptionSelect = (agencyId, optionId) => {
    setSelectedOptions(prev => ({
      ...prev,
      [agencyId]: {
        ...prev[agencyId],
        [optionId]: !prev[agencyId]?.[optionId]
      }
    }));
  };

  console.log('Rendering content for tab: agency category:', selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center">
          <div className="w-6 h-6 mr-2 flex items-center justify-center">
            <img 
              src="/icons/svg/agency-title.svg" 
              alt="Agency" 
              className="w-4 h-4"
            />
          </div>
          <h2 className="text-lg font-semibold text-[#09090B]">Agencies</h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgencies.map((agency) => (
            <Card key={agency.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 p-0">
              {/* Gradient Banner with Cover Picture */}
              <div className="h-[118.5px] bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 relative overflow-hidden">
                {/* Agency Cover Picture */}
                <img 
                  src="/icons/svg/agency-cover.svg" 
                  alt="Agency Cover" 
                  className="w-full h-full object-cover opacity-100"
                />
                
                {/* Profile Avatar - Overlapping */}
                <div className="absolute -bottom-6 left-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full border-4 border-white flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-12">
                {/* Tags/Badges */}
                <div className="flex gap-2 mb-3">
                  {agency.tags.map((tag, index) => (
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

                {/* Agency Info */}
                <h3 className="text-lg font-bold mb-2">{agency.name}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {agency.description}
                </p>

                {/* Clients Section */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Clients</h4>
                  <div className="flex gap-2">
                    {agency.clients.map((client, index) => (
                      <div 
                        key={index}
                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                      >
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content Placeholders */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[1, 2, 3].map((item) => (
                    <div 
                      key={item}
                      className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center"
                    >
                      <div className="text-gray-400 text-xs">Content</div>
                    </div>
                  ))}
                </div>

                {/* Service Options */}
                <div className="space-y-2 mb-4">
                  {agency.serviceOptions.map((option) => {
                    const isSelected = selectedOptions[agency.id]?.[option.id] || false;
                    return (
                      <div key={option.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleOptionSelect(agency.id, option.id)}
                            className={`w-4 h-4 rounded-sm border-2 transition-all duration-200 cursor-pointer flex items-center justify-center ${
                              isSelected 
                                ? 'bg-[#09090B] border-[#09090B]' 
                                : 'bg-white border-gray-300 hover:border-[#09090B]'
                            }`}
                          >
                            {isSelected && (
                              <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </button>
                          <span className="text-xl font-medium leading-7 tracking-normal text-[#09090B]">{option.price}</span>
                        </div>
                        <span className="text-sm font-medium leading-5 tracking-normal text-[#71717B]">
                          {option.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 w-full">
                  <AgencyDetailsModal agency={agency}>
                    <button className="flex-1 bg-white border border-gray-300 text-[#09090B] px-4 py-2 rounded-[999px] text-base font-medium leading-6 tracking-normal hover:bg-[#09090B] hover:text-white transition-colors cursor-pointer">
                      View details
                    </button>
                  </AgencyDetailsModal>
                  <button className="flex-1 bg-white border border-gray-300 text-[#09090B] px-4 py-2 rounded-[999px] text-base font-medium leading-6 tracking-normal hover:bg-[#09090B] hover:text-white transition-colors cursor-pointer flex items-center justify-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredAgencies.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No agencies found</h3>
            <p className="text-gray-600">Try adjusting your filters or search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgencyPage; 