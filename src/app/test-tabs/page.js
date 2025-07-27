'use client';

import React from 'react';
import { ExampleCategoryTabs } from '@/components/ui/example-category-tabs';

const TestTabsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Category Tabs Component Demo</h1>
            <p className="text-gray-600 mt-2">
              This demonstrates the reusable CategoryTabs component that matches the design pattern from the calculation page.
            </p>
          </div>
          <ExampleCategoryTabs />
        </div>
      </div>
    </div>
  );
};

export default TestTabsPage; 