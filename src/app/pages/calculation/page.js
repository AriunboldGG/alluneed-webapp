'use client';

import React, { useState, useEffect } from 'react';
import TraditionalPage from '@/components/calculation/TraditionalPage';
import DigitalPage from '@/components/calculation/DigitalPage';
import AgencyPage from '@/components/calculation/AgencyPage';

const CalculationPage = () => {
  const [activeTab, setActiveTab] = useState('traditional');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Listen for filter changes from FilterSection
  useEffect(() => {
    const handleStorageChange = () => {
      const storedTab = localStorage.getItem('activeTab');
      const storedCategory = localStorage.getItem('selectedCategory');
      
      console.log('Storage change detected - Tab:', storedTab, 'Category:', storedCategory);
      
      if (storedTab) setActiveTab(storedTab);
      if (storedCategory) setSelectedCategory(storedCategory);
    };

    // Check for initial values
    handleStorageChange();

    // Listen for storage changes
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event listener for same-tab communication
    const handleFilterChange = (event) => {
      console.log('FilterChange event received:', event.detail);
      if (event.detail.tab) setActiveTab(event.detail.tab);
      if (event.detail.category) setSelectedCategory(event.detail.category);
    };
    
    window.addEventListener('filterChange', handleFilterChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('filterChange', handleFilterChange);
    };
  }, []);

  const renderContent = () => {
    console.log('Rendering content for tab:', activeTab, 'category:', selectedCategory);
    
    switch (activeTab) {
      case 'traditional':
        return <TraditionalPage selectedCategory={selectedCategory} />;
      case 'digital':
        return <DigitalPage selectedCategory={selectedCategory} />;
      case 'agency':
        return <AgencyPage selectedCategory={selectedCategory} />;
      default:
        return <TraditionalPage selectedCategory={selectedCategory} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderContent()}
    </div>
  );
};

export default CalculationPage; 