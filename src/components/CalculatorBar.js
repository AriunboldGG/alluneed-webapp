'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import CalculationModal from './CalculationModal';

const CalculatorBar = () => {
  const [itemCount, setItemCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [calculatorItems, setCalculatorItems] = useState([]);

  // Listen for custom events when items are added
  useEffect(() => {
    const handleItemAdded = (event) => {
      setItemCount(prev => prev + 1);
      if (event.detail?.item) {
        setCalculatorItems(prev => [...prev, event.detail.item]);
      }
    };

    const handleItemRemoved = (event) => {
      setItemCount(prev => Math.max(0, prev - 1));
      if (event.detail?.itemId) {
        setCalculatorItems(prev => prev.filter(item => item.id !== event.detail.itemId));
      }
    };

    // Listen for custom events
    window.addEventListener('calculator:item-added', handleItemAdded);
    window.addEventListener('calculator:item-removed', handleItemRemoved);

    return () => {
      window.removeEventListener('calculator:item-added', handleItemAdded);
      window.removeEventListener('calculator:item-removed', handleItemRemoved);
    };
  }, []);

  const handleViewClick = () => {
    setIsModalOpen(true);
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white rounded-full shadow-lg border border-gray-200 px-6 py-3 flex items-center space-x-4 min-w-[280px]">
          {/* Left Section - Calculator Icon and Text */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <img 
                src="/icons/svg/calculator-tool.svg" 
                alt="Calculator" 
                className="w-5 h-5"
              />
            </div>
            <span className="text-gray-900 font-medium">Calculator</span>
          </div>

          {/* Middle Section - Count Badge */}
          <div className="flex-1 flex justify-center">
            <div className="bg-gray-100 rounded-full px-3 py-1 min-w-[32px] flex items-center justify-center">
              <span className="text-gray-900 font-semibold text-sm">
                {itemCount}
              </span>
            </div>
          </div>

          {/* Right Section - View Button */}
          <Button 
            onClick={handleViewClick}
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-4 py-2 flex items-center space-x-2 transition-colors"
          >
            <span className="text-sm font-medium">View</span>
            <img 
              src="/icons/svg/view-plus.svg" 
              alt="View" 
              className="w-4 h-4"
            />
          </Button>
        </div>
      </div>

      <CalculationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        calculatorItems={calculatorItems}
      />
    </>
  );
};

export default CalculatorBar; 