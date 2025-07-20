'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const DigitalPage = ({ selectedCategory }) => {
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
  const filteredChannels = selectedCategory && selectedCategory !== 'all' 
    ? digitalChannels.filter(channel => channel.category === selectedCategory)
    : digitalChannels;

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
          {filteredChannels.map((channel) => (
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
                {/* Statistics in Single Row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-200 rounded flex items-center justify-center">
                      <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium">{channel.followers}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-200 rounded flex items-center justify-center">
                      <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <span className="text-sm">Өдөрт {channel.dailyReach}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-200 rounded flex items-center justify-center">
                      <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <span className="text-sm">{channel.engagementRate}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-200 rounded flex items-center justify-center">
                      <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-sm">{channel.fakeFollowers}</span>
                    <div className="w-3 h-3 bg-gray-200 rounded flex items-center justify-center">
                      <svg className="w-2 h-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <span className="text-sm">{channel.fakeFollowersCount}</span>
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
          ))}
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