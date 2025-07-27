'use client';

import { useState, useCallback, useMemo } from 'react';
import { debounce } from '@/utils/helpers';

export const useSearch = (initialData = []) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(initialData);
  const [isSearching, setIsSearching] = useState(false);

  // Debounced search function
  const performSearch = useCallback(
    debounce((query, data) => {
      setIsSearching(true);
      
      // Handle undefined or null data
      if (!data || !Array.isArray(data)) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }
      
      if (!query.trim()) {
        setSearchResults(data);
        setIsSearching(false);
        return;
      }

      const results = data.filter(item => {
        const searchTerm = query.toLowerCase();
        
        // Search in name
        if (item.name?.toLowerCase().includes(searchTerm)) return true;
        
        // Search in description
        if (item.description?.toLowerCase().includes(searchTerm)) return true;
        
        // Search in category
        if (item.category?.toLowerCase().includes(searchTerm)) return true;
        
        // Search in providers (for TV channels)
        if (item.providers?.some(provider => 
          provider.toLowerCase().includes(searchTerm)
        )) return true;
        
        // Search in location
        if (item.location?.toLowerCase().includes(searchTerm)) return true;
        
        // Search in brand (for campaigns)
        if (item.brand?.toLowerCase().includes(searchTerm)) return true;
        
        // Search in source (for news)
        if (item.source?.toLowerCase().includes(searchTerm)) return true;
        
        return false;
      });
      
      setSearchResults(results);
      setIsSearching(false);
    }, 300),
    []
  );

  // Handle search input change
  const handleSearchChange = useCallback((query, data) => {
    setSearchQuery(query);
    // Only perform search if data is provided
    if (data) {
      performSearch(query, data);
    }
  }, [performSearch]);

  // Clear search
  const clearSearch = useCallback((data) => {
    setSearchQuery('');
    setSearchResults(data || []);
    setIsSearching(false);
  }, []);

  return {
    searchQuery,
    searchResults,
    isSearching,
    handleSearchChange,
    clearSearch,
    setSearchResults
  };
}; 