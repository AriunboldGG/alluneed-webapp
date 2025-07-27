'use client';

import React, { Suspense } from 'react';
import TVChannels from '../TVChannels';
import OOH from '../OOH';
import Billboard from '../Billboard';
import Liftboard from '../Liftboard';
import News from '../News';

// Error boundary component
const ErrorBoundary = ({ children, fallback }) => {
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const handleError = (error) => {
      console.error('Component error:', error);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return fallback || <div className="text-red-500">Something went wrong. Please refresh the page.</div>;
  }

  return children;
};

const TraditionalPage = ({ selectedCategory, searchQuery = '' }) => {
  const renderContent = () => {
    switch (selectedCategory) {
      case 'all':
        return (
          <div className="min-h-screen bg-gray-50 py-8">
            <div className="w-full px-4 sm:px-6 lg:px-8">
              {/* TV Channels Section */}
              <ErrorBoundary>
                <Suspense fallback={<div className="text-gray-500">Loading TV Channels...</div>}>
                  <TVChannels searchQuery={searchQuery} />
                </Suspense>
              </ErrorBoundary>
              
              {/* OOH Section */}
              <ErrorBoundary>
                <Suspense fallback={<div className="text-gray-500">Loading OOH...</div>}>
                  <OOH searchQuery={searchQuery} />
                </Suspense>
              </ErrorBoundary>
              
              {/* News Section */}
              <ErrorBoundary>
                <Suspense fallback={<div className="text-gray-500">Loading News...</div>}>
                  <News searchQuery={searchQuery} />
                </Suspense>
              </ErrorBoundary>
              
              {/* Billboard Section */}
              <ErrorBoundary>
                <Suspense fallback={<div className="text-gray-500">Loading Billboard...</div>}>
                  <Billboard key={`billboard-${selectedCategory}`} searchQuery={searchQuery} />
                </Suspense>
              </ErrorBoundary>
              
              {/* Liftboard Section */}
              <ErrorBoundary>
                <Suspense fallback={<div className="text-gray-500">Loading Liftboard...</div>}>
                  <Liftboard searchQuery={searchQuery} />
                </Suspense>
              </ErrorBoundary>
            </div>
          </div>
        );
      case 'tv':
        return (
          <div className="min-h-screen bg-gray-50 py-8">
            <div className="w-full px-4 sm:px-6 lg:px-8">
              <ErrorBoundary>
                <Suspense fallback={<div className="text-gray-500">Loading TV Channels...</div>}>
                  <TVChannels searchQuery={searchQuery} />
                </Suspense>
              </ErrorBoundary>
            </div>
          </div>
        );
      case 'ooh':
        return (
          <div className="min-h-screen bg-gray-50 py-8">
            <div className="w-full px-4 sm:px-6 lg:px-8">
              <ErrorBoundary>
                <Suspense fallback={<div className="text-gray-500">Loading OOH...</div>}>
                  <OOH searchQuery={searchQuery} />
                </Suspense>
              </ErrorBoundary>
            </div>
          </div>
        );
      case 'billboard':
        return (
          <div className="min-h-screen bg-gray-50 py-8">
            <div className="w-full px-4 sm:px-6 lg:px-8">
              <ErrorBoundary>
                <Suspense fallback={<div className="text-gray-500">Loading Billboard...</div>}>
                  <Billboard key={`billboard-${selectedCategory}`} searchQuery={searchQuery} />
                </Suspense>
              </ErrorBoundary>
            </div>
          </div>
        );
      case 'liftboard':
        return (
          <div className="min-h-screen bg-gray-50 py-8">
            <div className="w-full px-4 sm:px-6 lg:px-8">
              <ErrorBoundary>
                <Suspense fallback={<div className="text-gray-500">Loading Liftboard...</div>}>
                  <Liftboard searchQuery={searchQuery} />
                </Suspense>
              </ErrorBoundary>
            </div>
          </div>
        );
      case 'news':
        return (
          <div className="min-h-screen bg-gray-50 py-8">
            <div className="w-full px-4 sm:px-6 lg:px-8">
              <ErrorBoundary>
                <Suspense fallback={<div className="text-gray-500">Loading News...</div>}>
                  <News searchQuery={searchQuery} />
                </Suspense>
              </ErrorBoundary>
            </div>
          </div>
        );
      case 'printings':
        return (
          <div className="min-h-screen bg-gray-50 py-8">
            <div className="w-full px-4 sm:px-6 lg:px-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Print Media</h2>
                <p className="text-gray-600">Traditional print advertising opportunities</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Newspaper Ads</h3>
                  <p className="text-sm text-gray-600 mb-4">Full-page and classified advertisements</p>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Reach: 100K+</span>
                    <span className="font-medium text-green-600">$1.20/view</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Magazine Ads</h3>
                  <p className="text-sm text-gray-600 mb-4">Premium magazine placements</p>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Reach: 50K+</span>
                    <span className="font-medium text-green-600">$2.50/view</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Brochures & Flyers</h3>
                  <p className="text-sm text-gray-600 mb-4">Custom printed materials</p>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Reach: 25K+</span>
                    <span className="font-medium text-green-600">$0.80/view</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="min-h-screen bg-gray-50 py-8">
            <div className="w-full px-4 sm:px-6 lg:px-8">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No content found</h3>
                <p className="text-gray-600">Please select a valid category</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return renderContent();
};

export default TraditionalPage; 