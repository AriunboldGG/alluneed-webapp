'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ForYouPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Events', 'Campaigns', 'News'];

  const events = [
    {
      id: 1,
      title: 'Tech Conference 2024',
      description: 'Join us for the biggest tech event of the year',
      category: 'Events',
      date: 'Dec 15, 2024',
      location: 'Ulaanbaatar',
      attendees: '500+',
      image: '/icons/svg/event.svg',
      isFeatured: true
    },
    {
      id: 2,
      title: 'Startup Meetup',
      description: 'Network with local entrepreneurs and investors',
      category: 'Events',
      date: 'Dec 20, 2024',
      location: 'Ulaanbaatar',
      attendees: '100+',
      image: '/icons/svg/event.svg',
      isFeatured: false
    }
  ];

  const campaigns = [
    {
      id: 3,
      title: 'Digital Marketing Campaign',
      description: 'Boost your brand visibility with our latest campaign',
      category: 'Campaigns',
      duration: '30 days',
      budget: '₮5,000,000',
      reach: '50,000+',
      image: '/icons/svg/campaign.svg',
      isActive: true
    },
    {
      id: 4,
      title: 'Social Media Promotion',
      description: 'Engage with your audience through social platforms',
      category: 'Campaigns',
      duration: '15 days',
      budget: '₮2,500,000',
      reach: '25,000+',
      image: '/icons/svg/campaign.svg',
      isActive: false
    }
  ];

  const news = [
    {
      id: 5,
      title: 'Industry Trends Report',
      description: 'Latest insights on digital marketing trends',
      category: 'News',
      published: 'Dec 10, 2024',
      readTime: '5 min read',
      views: '1,200+',
      image: '/icons/svg/news.svg',
      isBreaking: true
    },
    {
      id: 6,
      title: 'Success Story: Local Business',
      description: 'How a local business grew 300% in 6 months',
      category: 'News',
      published: 'Dec 8, 2024',
      readTime: '3 min read',
      views: '800+',
      image: '/icons/svg/news.svg',
      isBreaking: false
    }
  ];

  const allItems = [...events, ...campaigns, ...news];
  const filteredItems = selectedCategory === 'All' 
    ? allItems 
    : allItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <img src="/icons/svg/plante.svg" alt="For You" className="w-[18px] h-[28px] text-gray-900" />
              <h1 className="text-2xl font-semibold text-gray-900">Танд зориулав</h1>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex space-x-2 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category 
                    ? 'bg-[#09090B] text-white' 
                    : 'bg-white text-gray-600 hover:text-gray-800 border border-gray-200'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <img src={item.image} alt={item.category} className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-500">
                        {item.description}
                      </CardDescription>
                    </div>
                  </div>
                  {item.isFeatured && (
                    <Badge className="bg-blue-100 text-blue-800">Featured</Badge>
                  )}
                  {item.isActive && (
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  )}
                  {item.isBreaking && (
                    <Badge className="bg-red-100 text-red-800">Breaking</Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                {/* Event specific info */}
                {item.category === 'Events' && (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>📅 {item.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>📍 {item.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>👥 {item.attendees} attendees</span>
                    </div>
                  </div>
                )}

                {/* Campaign specific info */}
                {item.category === 'Campaigns' && (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>⏱️ {item.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>💰 {item.budget}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>📊 {item.reach} reach</span>
                    </div>
                  </div>
                )}

                {/* News specific info */}
                {item.category === 'News' && (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>📅 {item.published}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>⏱️ {item.readTime}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>👁️ {item.views} views</span>
                    </div>
                  </div>
                )}
              </CardContent>

              <CardFooter className="flex space-x-2 pt-4">
                <button className="flex-1 bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-[#09090B] hover:text-white transition-colors cursor-pointer">
                  View details
                </button>
                <button className="flex-1 bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-[#09090B] hover:text-white transition-colors flex items-center justify-center space-x-1 cursor-pointer">
                  <span>+</span>
                  <span>Add</span>
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Show More Button */}
        <div className="text-center mt-8">
          <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-[#09090B] hover:text-white transition-colors cursor-pointer">
            Show more
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForYouPage;
