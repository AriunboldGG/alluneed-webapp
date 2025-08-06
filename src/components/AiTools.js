'use client';

import React from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const AiTools = ({ aiTools = [] }) => {
  const handleViewDetails = (website) => {
    window.open(website, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="mb-25">
      {/* Section Header */}
      <div className="px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center">
          <div className="w-6 h-6 mr-3 flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">AI Tools</h2>
        </div>
      </div>

      {/* AI Tools Grid */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {aiTools.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500 text-lg">No AI tools found</p>
            </div>
          ) : (
            aiTools.map((tool) => (
              <Card key={tool.id} className="overflow-hidden hover:shadow-lg transition-shadow p-0">
                {/* Image Section with Gradient Background */}
                <div className="relative h-[150px] sm:h-[227px] bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
                  {/* AI Badge */}
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                      AI Powered
                    </Badge>
                  </div>
                  
                  {/* Tool Logo Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="px-4 pb-4">
                  {/* Core Strength */}
                  <div className="text-sm text-gray-500 mb-2">
                    {tool.coreStrength}
                  </div>
                  
                  {/* Title */}
                  <CardTitle className="text-lg font-bold text-[#09090B] mb-2">{tool.title}</CardTitle>
                  
                  {/* Description */}
                  <div className="text-sm font-normal text-[#09090B] mb-3">
                    {tool.description}
                  </div>
                  
                  {/* Best Use Case */}
                  <div className="text-xs text-gray-600 mb-4">
                    <span className="font-medium">Best for:</span> {tool.bestUseCase}
                  </div>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {tool.features.slice(0, 2).map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                        {feature}
                      </Badge>
                    ))}
                    {tool.features.length > 2 && (
                      <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                        +{tool.features.length - 2} more
                      </Badge>
                    )}
                  </div>
                  
                  {/* Button */}
                  <Button 
                    onClick={() => handleViewDetails(tool.website)}
                    className="w-full bg-white border border-gray-300 text-[#09090B] hover:bg-[#09090B] hover:text-white transition-colors rounded-[999px] cursor-pointer"
                  >
                    View details
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AiTools; 