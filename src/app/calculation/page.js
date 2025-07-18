'use client';

import React from 'react';
import TVChannels from '@/components/TVChannels';
import OOH from '@/components/OOH';
import Billboard from '@/components/Billboard';
import Liftboard from '@/components/Liftboard';

const CalculationPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* TV Channels Section */}
        <TVChannels />
        
        {/* OOH Section */}
        <OOH />
        
        {/* Billboard Section */}
        <Billboard />
        
        {/* Liftboard Section */}
        <Liftboard />
      </div>
    </div>
  );
};

export default CalculationPage;
