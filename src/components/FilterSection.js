'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSearch } from '@/hooks/useSearch';

const FilterSection = () => {
  const [activeTab, setActiveTab] = useState('traditional');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Initialize search hook with empty array as initial data
  const { searchQuery, isSearching, handleSearchChange, clearSearch } = useSearch([]);

  // Define categories for each tab
  const tabCategories = {
    traditional: ['all', 'tv', 'ooh', 'printings', 'billboard', 'liftboard'],
    digital: ['all', 'instagram', 'youtube', 'facebook', 'tiktok'],
    agency: ['all', 'marketing', 'video-production', 'branding', 'design']
  };

  // Load initial state from localStorage
  useEffect(() => {
    const storedTab = localStorage.getItem('activeTab');
    const storedCategory = localStorage.getItem('selectedCategory');
    
    if (storedTab) setActiveTab(storedTab);
    if (storedCategory) setSelectedCategory(storedCategory);
  }, []);

  const handleClearFilters = () => {
    clearSearch([]);
    setSelectedCategory('all');
    localStorage.setItem('selectedCategory', 'all');
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('filterChange', {
      detail: { category: 'all' }
    }));
  };

  const handleTabChange = (newTab) => {
    console.log('Tab changed to:', newTab);
    setActiveTab(newTab);
    setSelectedCategory('all'); // Reset category when changing tabs
    
    // Save to localStorage
    localStorage.setItem('activeTab', newTab);
    localStorage.setItem('selectedCategory', 'all');
    
    // Dispatch custom event
    const event = new CustomEvent('filterChange', {
      detail: { tab: newTab, category: 'all' }
    });
    console.log('Dispatching filterChange event:', event.detail);
    window.dispatchEvent(event);
  };

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
    
    // Save to localStorage
    localStorage.setItem('selectedCategory', newCategory);
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('filterChange', {
      detail: { category: newCategory }
    }));
  };

  const getCurrentCategories = () => {
    return tabCategories[activeTab] || [];
  };

  // Handle search input change
  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    handleSearchChange(query, []); // Pass empty array since we're not filtering here
    
    // Dispatch search event
    window.dispatchEvent(new CustomEvent('searchChange', {
      detail: { 
        query, 
        tab: activeTab, 
        category: selectedCategory 
      }
    }));
  };

  return (
    <div className="bg-white px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 border-b border-gray-200">
      {/* Mobile Layout - Stacked */}
      <div className="block lg:hidden space-y-3">
        {/* Search Input - Full Width */}
        <div className="w-full">
          <div className="relative">
            <img 
              src="/icons/svg/search.svg" 
              alt="Search" 
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors ${
                isSearching ? 'text-blue-500' : 'text-gray-400'
              }`} 
            />
            <Input
              type="text"
              placeholder="Search channel"
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="pl-10 bg-[#F4F4F5] border-none rounded-[999px] focus:ring-0 focus:border-none w-full"
            />
            {isSearching && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
              </div>
            )}
          </div>
        </div>

        {/* Main Tabs - Horizontal Scroll */}
        <div className="w-full">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="bg-[#F4F4F5] p-1 h-auto gap-1 sm:gap-2 border-none w-full overflow-x-auto flex-nowrap rounded-[999px]">
              <TabsTrigger 
                value="traditional" 
                className="rounded-[999px] px-3 py-2 text-xs font-medium data-[state=active]:bg-white data-[state=active]:text-[#09090B] data-[state=active]:shadow-sm border-none bg-transparent text-[#52525C] hover:bg-white/50 whitespace-nowrap flex-shrink-0 cursor-pointer"
              >
                Traditional
              </TabsTrigger>
              <TabsTrigger 
                value="digital" 
                className="rounded-[999px] px-3 py-2 text-xs font-medium data-[state=active]:bg-white data-[state=active]:text-[#09090B] data-[state=active]:shadow-sm border-none bg-transparent text-[#52525C] hover:bg-white/50 whitespace-nowrap flex-shrink-0 cursor-pointer"
              >
                Digital
              </TabsTrigger>
              <TabsTrigger 
                value="agency" 
                className="rounded-[999px] px-3 py-2 text-xs font-medium data-[state=active]:bg-white data-[state=active]:text-[#09090B] data-[state=active]:shadow-sm border-none bg-transparent text-[#52525C] hover:bg-white/50 whitespace-nowrap flex-shrink-0 cursor-pointer"
              >
                Agency
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Category Filters - Horizontal Scroll */}
        <div className="w-full">
          <Tabs value={selectedCategory} onValueChange={handleCategoryChange} className="w-full">
            <TabsList className="bg-transparent p-0 h-auto gap-1 sm:gap-2 border-none w-full overflow-x-auto flex-nowrap">
              {getCurrentCategories().map((category) => (
                <TabsTrigger 
                  key={category}
                  value={category} 
                  className="rounded-full px-3 py-2 text-xs font-medium data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:border-gray-900 data-[state=active]:shadow-sm border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 whitespace-nowrap flex-shrink-0 cursor-pointer"
                >
                  {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Clear Button - Full Width */}
        <div className="w-full">
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearFilters}
            className="rounded-[999px] px-3 py-2 text-xs font-medium bg-white text-[#09090B] border-gray-200 hover:bg-[#09090B] hover:text-white w-full cursor-pointer"
          >
            Clear
            <img src="/icons/svg/clear-header.svg" alt="Clear" className="ml-1 w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Desktop Layout - Horizontal */}
      <div className="hidden lg:flex items-center gap-4 xl:gap-6">
        {/* Search Input */}
        <div className="flex-shrink-0 w-64">
          <div className="relative">
            <img 
              src="/icons/svg/search.svg" 
              alt="Search" 
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors ${
                isSearching ? 'text-blue-500' : 'text-gray-400'
              }`} 
            />
            <Input
              type="text"
              placeholder="Search channel"
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="pl-10 bg-[#F4F4F5] border-none rounded-[999px] focus:ring-0 focus:border-none"
            />
            {isSearching && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
              </div>
            )}
          </div>
        </div>

        {/* Separator */}
        <div className="w-px h-6 bg-gray-200 flex-shrink-0"></div>

        {/* Main Tabs */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-auto">
            <TabsList className="bg-[#F4F4F5] p-1 h-auto gap-2 border-none rounded-[999px]">
              <TabsTrigger 
                value="traditional" 
                className="rounded-[999px] px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-[#09090B] data-[state=active]:shadow-sm border-none bg-transparent text-[#52525C] hover:bg-white/50 whitespace-nowrap flex-shrink-0 cursor-pointer"
              >
                Traditional
              </TabsTrigger>
              <TabsTrigger 
                value="digital" 
                className="rounded-[999px] px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-[#09090B] data-[state=active]:shadow-sm border-none bg-transparent text-[#52525C] hover:bg-white/50 whitespace-nowrap flex-shrink-0 cursor-pointer"
              >
                Digital
              </TabsTrigger>
              <TabsTrigger 
                value="agency" 
                className="rounded-[999px] px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-[#09090B] data-[state=active]:shadow-sm border-none bg-transparent text-[#52525C] hover:bg-white/50 whitespace-nowrap flex-shrink-0 cursor-pointer"
              >
                Agency
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Separator */}
        <div className="w-px h-6 bg-gray-200 flex-shrink-0"></div>

        {/* Category Filters */}
        <div className="flex-1 min-w-0">
          <Tabs value={selectedCategory} onValueChange={handleCategoryChange} className="w-full">
            <TabsList className="bg-transparent p-0 h-auto gap-2 border-none w-full overflow-x-auto flex-nowrap">
              {getCurrentCategories().map((category) => (
                <TabsTrigger 
                  key={category}
                  value={category} 
                  className="rounded-full px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:border-gray-900 data-[state=active]:shadow-sm border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 whitespace-nowrap flex-shrink-0 cursor-pointer"
                >
                  {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Clear Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleClearFilters}
          className="rounded-[999px] px-4 py-2 text-sm font-medium bg-white text-[#09090B] border-gray-200 hover:bg-[#09090B] hover:text-white flex-shrink-0 cursor-pointer"
        >
          Clear
          <img src="/icons/svg/clear-header.svg" alt="Clear" className="ml-1 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default FilterSection; 