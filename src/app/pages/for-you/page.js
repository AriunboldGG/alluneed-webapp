'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const ForYouPage = () => {
  const [activeTab, setActiveTab] = useState('events');

  const events = [
    {
      id: 'event-1',
      title: 'Advertising Summit 2024',
      date: 'March 15, 2024',
      location: 'Ulaanbaatar, Mongolia',
      description: 'Join industry leaders for insights on the future of advertising',
      image: '/icons/svg/event.svg',
      category: 'events'
    },
    {
      id: 'event-2',
      title: 'Digital Marketing Workshop',
      date: 'March 22, 2024',
      location: 'Online Event',
      description: 'Learn advanced digital marketing strategies and techniques',
      image: '/icons/svg/event.svg',
      category: 'events'
    }
  ];

  const campaigns = [
    {
      id: 'campaign-1',
      title: 'Spring Collection Campaign',
      brand: 'Fashion Brand',
      duration: '2 months',
      description: 'Multi-channel campaign for spring fashion collection',
      image: '/icons/svg/campaign.svg',
      category: 'campaigns'
    },
    {
      id: 'campaign-2',
      title: 'Tech Product Launch',
      brand: 'Tech Company',
      duration: '3 months',
      description: 'Comprehensive launch campaign for new tech product',
      image: '/icons/svg/campaign.svg',
      category: 'campaigns'
    }
  ];

  const news = [
    {
      id: 'news-1',
      title: 'New Advertising Regulations',
      date: 'March 10, 2024',
      source: 'Industry News',
      description: 'Latest updates on advertising regulations and compliance',
      image: '/icons/svg/news.svg',
      category: 'news'
    },
    {
      id: 'news-2',
      title: 'Digital Advertising Trends',
      date: 'March 8, 2024',
      source: 'Marketing Weekly',
      description: 'Emerging trends in digital advertising for 2024',
      image: '/icons/svg/news.svg',
      category: 'news'
    }
  ];

  const allContent = [...events, ...campaigns, ...news];

  const getFilteredContent = () => {
    if (activeTab === 'all') return allContent;
    return allContent.filter(item => item.category === activeTab);
  };

  const getTabData = () => {
    switch (activeTab) {
      case 'events':
        return events;
      case 'campaigns':
        return campaigns;
      case 'news':
        return news;
      default:
        return allContent;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <img src="/icons/svg/plante.svg" alt="For You" className="w-[18px] h-[28px] text-gray-900" />
            <h1 className="text-3xl font-bold text-gray-900 ml-3">For You</h1>
          </div>
          <p className="text-lg text-gray-600">Personalized content and recommendations just for you</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm">
            {[
              { id: 'all', label: 'All', count: allContent.length },
              { id: 'events', label: 'Events', count: events.length },
              { id: 'campaigns', label: 'Campaigns', count: campaigns.length },
              { id: 'news', label: 'News', count: news.length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {tab.label}
                <span className="ml-2 bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getFilteredContent().map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                    <img src={item.image} alt={item.title} className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {item.category}
                    </span>
                    {item.date && (
                      <p className="text-sm text-gray-600">{item.date}</p>
                    )}
                    {item.duration && (
                      <p className="text-sm text-gray-600">{item.duration}</p>
                    )}
                    {item.brand && (
                      <p className="text-sm text-gray-600">{item.brand}</p>
                    )}
                    {item.source && (
                      <p className="text-sm text-gray-600">{item.source}</p>
                    )}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                
                {item.location && (
                  <p className="text-sm text-gray-500 mb-4">
                    📍 {item.location}
                  </p>
                )}
                
                <div className="flex space-x-2">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                    View Details
                  </Button>
                  <Button variant="outline" className="px-3">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {getFilteredContent().length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No content found</h3>
            <p className="text-gray-600">Try selecting a different category or check back later</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForYouPage; 