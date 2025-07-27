'use client';

import React, { useState } from 'react';
import { CategoryTabs } from '@/components/ui/category-tabs';
import Events from '@/components/Events';
import Campaigns from '@/components/Campaigns';
import News from '@/components/News';

const ForYouPage = () => {
  const [activeTab, setActiveTab] = useState('all');

  const events = [
    {
      id: 'event-1',
      title: 'Advertising Summit 2024',
      date: 'March 15, 2024',
      day: '15',
      month: 'March',
      weekday: 'TUE',
      location: 'Ulaanbaatar, Mongolia',
      description: 'Join industry leaders for insights on the future of advertising',
      image: '/images/foru1.png',
      category: 'events'
    },
    {
      id: 'event-2',
      title: 'Digital Marketing Workshop',
      date: 'March 22, 2024',
      day: '22',
      month: 'March',
      weekday: 'FRI',
      location: 'Online Event',
      description: 'Learn advanced digital marketing strategies and techniques',
      image: '/images/foru2.png',
      category: 'events'
    },
    {
      id: 'event-3',
      title: 'Creative Design Conference',
      date: 'March 28, 2024',
      day: '28',
      month: 'March',
      weekday: 'THU',
      location: 'Ulaanbaatar, Mongolia',
      description: 'Explore the latest trends in creative design and branding',
      image: '/images/foru3.png',
      category: 'events'
    },
    {
      id: 'event-4',
      title: 'Brand Strategy Summit',
      date: 'April 5, 2024',
      day: '5',
      month: 'April',
      weekday: 'FRI',
      location: 'Ulaanbaatar, Mongolia',
      description: 'Master the art of brand building and strategic positioning',
      image: '/images/camp1.png',
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
      image: '/images/camp1.png',
      category: 'campaigns'
    },
    {
      id: 'campaign-2',
      title: 'Tech Product Launch',
      brand: 'Tech Company',
      duration: '3 months',
      description: 'Comprehensive launch campaign for new tech product',
      image: '/images/camp2.png',
      category: 'campaigns'
    },
    {
      id: 'campaign-3',
      title: 'Sustainability Initiative',
      brand: 'Eco Brand',
      duration: '6 months',
      description: 'Long-term campaign promoting environmental awareness',
      image: '/images/camp3.png',
      category: 'campaigns'
    },
    {
      id: 'campaign-4',
      title: 'Holiday Season Promotion',
      brand: 'Retail Brand',
      duration: '1 month',
      description: 'Festive campaign for holiday shopping season',
      image: '/images/camp4.png',
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
      image: '/images/news.png',
      category: 'news'
    },
    {
      id: 'news-2',
      title: 'Digital Advertising Trends',
      date: 'March 8, 2024',
      source: 'Marketing Weekly',
      description: 'Emerging trends in digital advertising for 2024',
      image: '/images/news.png',
      category: 'news'
    },
    {
      id: 'news-3',
      title: 'Social Media Marketing Insights',
      date: 'March 5, 2024',
      source: 'Social Media Today',
      description: 'Latest strategies for effective social media marketing',
      image: '/images/news.png',
      category: 'news'
    },
    {
      id: 'news-4',
      title: 'AI in Advertising Report',
      date: 'March 1, 2024',
      source: 'Tech Marketing',
      description: 'How artificial intelligence is transforming advertising',
      image: '/images/news.png',
      category: 'news'
    }
  ];

  const allContent = [...events, ...campaigns, ...news];



  const categories = [
    { value: 'all', label: 'All', count: allContent.length },
    { value: 'events', label: 'Events', count: events.length },
    { value: 'campaigns', label: 'Campaigns', count: campaigns.length },
    { value: 'news', label: 'News', count: news.length }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Empty div for spacing */}
      <div className="h-[1px]"></div>

      {/* Centered Tabs */}
      <div className="flex justify-center mb-12 mt-4">
        <div className="w-full max-w-md">
          <CategoryTabs
            value={activeTab}
            onValueChange={setActiveTab}
            categories={categories}
            variant="pill"
          />
        </div>
      </div>

      {/* Content Sections */}
      {activeTab === 'all' && (
        <>
          <Events events={events} />
          <Campaigns campaigns={campaigns} />
          <News news={news} />
        </>
      )}
      
      {activeTab === 'events' && <Events events={events} />}
      {activeTab === 'campaigns' && <Campaigns campaigns={campaigns} />}
      {activeTab === 'news' && <News news={news} />}


    </div>
  );
};

export default ForYouPage; 