'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const DigitalPage = ({ selectedCategory, searchQuery = '' }) => {
  // Sample data for digital channels
  const digitalChannels = [
    {
      id: 1,
      name: 'Name',
      handle: '@name',
      profileImage: '/icons/svg/instagram.svg',
      followers: '293k',
      dailyReach: '679k',
      engagementRate: '3.72%',
      fakeFollowers: '24.60%',
      fakeFollowersCount: '70k',
      audienceGender: { male: '20%', female: '80%' },
      audienceLocation: ['83%', '13%', '4%'],
      socialPlatforms: ['tiktok', 'facebook', 'instagram'],
      additionalPlatforms: 2,
      category: 'instagram'
    },
    {
      id: 2,
      name: 'Digital Creator',
      handle: '@digitalcreator',
      profileImage: '/icons/svg/instagram.svg',
      followers: '156k',
      dailyReach: '432k',
      engagementRate: '4.15%',
      fakeFollowers: '18.30%',
      fakeFollowersCount: '45k',
      audienceGender: { male: '35%', female: '65%' },
      audienceLocation: ['76%', '18%', '6%'],
      socialPlatforms: ['tiktok', 'facebook', 'instagram'],
      additionalPlatforms: 1,
      category: 'youtube'
    },
    {
      id: 3,
      name: 'Content Pro',
      handle: '@contentpro',
      profileImage: '/icons/svg/instagram.svg',
      followers: '89k',
      dailyReach: '234k',
      engagementRate: '5.28%',
      fakeFollowers: '12.45%',
      fakeFollowersCount: '28k',
      audienceGender: { male: '45%', female: '55%' },
      audienceLocation: ['68%', '25%', '7%'],
      socialPlatforms: ['tiktok', 'facebook', 'instagram'],
      additionalPlatforms: 3,
      category: 'facebook'
    },
    {
      id: 4,
      name: 'Social Star',
      handle: '@socialstar',
      profileImage: '/icons/svg/instagram.svg',
      followers: '445k',
      dailyReach: '1.2M',
      engagementRate: '3.91%',
      fakeFollowers: '22.15%',
      fakeFollowersCount: '98k',
      audienceGender: { male: '25%', female: '75%' },
      audienceLocation: ['91%', '7%', '2%'],
      socialPlatforms: ['tiktok', 'facebook', 'instagram'],
      additionalPlatforms: 2,
      category: 'tiktok'
    },
    {
      id: 5,
      name: 'Trend Setter',
      handle: '@trendsetter',
      profileImage: '/icons/svg/instagram.svg',
      followers: '67k',
      dailyReach: '189k',
      engagementRate: '6.42%',
      fakeFollowers: '8.90%',
      fakeFollowersCount: '12k',
      audienceGender: { male: '30%', female: '70%' },
      audienceLocation: ['72%', '20%', '8%'],
      socialPlatforms: ['tiktok', 'facebook', 'instagram'],
      additionalPlatforms: 1,
      category: 'instagram'
    },
    {
      id: 6,
      name: 'Influencer Plus',
      handle: '@influencerplus',
      profileImage: '/icons/svg/instagram.svg',
      followers: '234k',
      dailyReach: '567k',
      engagementRate: '4.67%',
      fakeFollowers: '19.80%',
      fakeFollowersCount: '52k',
      audienceGender: { male: '40%', female: '60%' },
      audienceLocation: ['79%', '15%', '6%'],
      socialPlatforms: ['tiktok', 'facebook', 'instagram'],
      additionalPlatforms: 2,
      category: 'youtube'
    }
  ];

  // Filter channels based on selected category
  // Filter channels based on category and search query
  const filteredChannels = digitalChannels.filter(channel => {
    // Category filter
    if (selectedCategory && selectedCategory !== 'all' && channel.category !== selectedCategory) {
      return false;
    }
    
    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      return (
        channel.name.toLowerCase().includes(query) ||
        channel.handle.toLowerCase().includes(query) ||
        channel.category.toLowerCase().includes(query) ||
        channel.socialPlatforms.some(platform => platform.toLowerCase().includes(query))
      );
    }
    
    return true;
  });

  const getSocialIcon = (platform) => {
    switch (platform) {
      case 'instagram': return '/icons/svg/instagram.svg';
      case 'facebook': return '/icons/svg/socials.svg';
      case 'tiktok': return '/icons/svg/socials.svg';
      default: return '/icons/svg/socials.svg';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Digital Channels</h2>
          <p className="text-lg text-gray-600">Discover and connect with digital influencers and content creators</p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChannels.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">
                {searchQuery.trim() 
                  ? `No digital channels found for "${searchQuery}"`
                  : 'No digital channels available'
                }
              </p>
            </div>
          ) : (
            filteredChannels.map((channel) => (
            <Card key={channel.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-4">
                {/* Profile Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold">{channel.name}</CardTitle>
                      <CardDescription className="text-sm">{channel.handle}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {channel.socialPlatforms.map((platform, index) => (
                      <div key={index} className="w-4 h-4 bg-gray-200 rounded flex items-center justify-center">
                        <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    ))}
                    {channel.additionalPlatforms > 0 && (
                      <Badge variant="destructive" className="text-xs px-1 py-0">
                        +{channel.additionalPlatforms}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pb-4">
                {/* Statistics Section - Fully Responsive Design */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                  {/* Followers */}
                  <div>
                    <label className="text-xs md:text-sm font-medium text-gray-700 block mb-1">Followers</label>
                    <div className="border border-[#E4E4E7] rounded-full px-2 py-2 flex items-center space-x-1 md:space-x-2">
                      <img src="/icons/svg/users.svg" alt="Users" className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="text-xs md:text-sm font-medium">{channel.followers}</span>
                    </div>
                  </div>

                  {/* Daily Reach */}
                  <div>
                    <label className="text-xs md:text-sm font-medium text-gray-700 block mb-1">Followers</label>
                    <div className="border border-[#E4E4E7] rounded-full px-2 py-2 flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <img src="/icons/svg/sun.svg" alt="Daily" className="w-3 h-3 md:w-4 md:h-4" />
                        <span className="text-xs">Өдөрт</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <img src="/icons/svg/eye.svg" alt="Views" className="w-3 h-3 md:w-4 md:h-4" />
                        <span className="text-xs">{channel.dailyReach}</span>
                      </div>
                    </div>
                  </div>

                  {/* Engagement Rate */}
                  <div>
                    <label className="text-xs md:text-sm font-medium text-gray-700 block mb-1">Enagagement rate</label>
                    <div className="border border-[#E4E4E7] rounded-full px-2 py-2 flex items-center space-x-1 md:space-x-2">
                      <img src="/icons/svg/rate.svg" alt="Rate" className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="text-xs md:text-sm">{channel.engagementRate}</span>
                    </div>
                  </div>

                  {/* Fake Followers */}
                  <div>
                    <label className="text-xs md:text-sm font-medium text-gray-700 block mb-1">Fake followers</label>
                    <div className="border border-[#E4E4E7] rounded-full px-2 py-2 flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <img src="/icons/svg/fake-awesome.svg" alt="Fake" className="w-3 h-3 md:w-4 md:h-4" />
                        <span className="text-xs">{channel.fakeFollowers}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <img src="/icons/svg/fake-bot.svg" alt="Bot" className="w-3 h-3 md:w-4 md:h-4" />
                        <span className="text-xs">{channel.fakeFollowersCount}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Audience Demographics */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Эр {channel.audienceGender.male}</span>
                    <span>Эм {channel.audienceGender.female}</span>
                  </div>
                  <div className="flex space-x-1">
                    {channel.audienceLocation.map((percentage, index) => (
                      <div 
                        key={index}
                        className="flex-1 h-2 bg-gray-200 rounded"
                        style={{ 
                          background: `linear-gradient(to right, ${index === 0 ? '#3B82F6' : index === 1 ? '#10B981' : '#F59E0B'} ${percentage}, #E5E7EB ${percentage})`
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    {channel.audienceLocation.map((percentage, index) => (
                      <span key={index}>{percentage}</span>
                    ))}
                  </div>
                </div>

                {/* Content Placeholder */}
                <div className="mt-4 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-gray-400 text-sm">Content Preview</div>
                </div>
              </CardContent>
              
              <CardFooter className="pt-4">
                <div className="flex space-x-2 w-full">
                  <button className="flex-1 bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-[#09090B] hover:text-white transition-colors cursor-pointer">
                    View details
                  </button>
                  <button className="flex-1 bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-[#09090B] hover:text-white transition-colors flex items-center justify-center space-x-1 cursor-pointer">
                    <img src="/icons/svg/plus.svg" alt="Add" className="w-5 h-5" />
                    <span>Add</span>
                  </button>
                </div>
              </CardFooter>
            </Card>
          ))
          )}
        </div>

        {/* Empty State */}
        {filteredChannels.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No digital channels found</h3>
            <p className="text-gray-600">Try adjusting your filters or search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DigitalPage; 