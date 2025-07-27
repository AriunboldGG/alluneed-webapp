"use client"

import React, { useState } from "react"
import { CategoryTabs } from "./category-tabs"

const ExampleCategoryTabs = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Example categories with counts matching the image
  const categories = [
    { value: 'all', label: 'All', count: 2 },
    { value: 'events', label: 'Events', count: 2 },
    { value: 'campaigns', label: 'Campaigns', count: 2 },
    { value: 'news', label: 'News', count: 2 }
  ]

  const handleCategoryChange = (value) => {
    setSelectedCategory(value)
    console.log('Selected category:', value)
  }

  return (
    <div className="p-6 bg-white">
      <h3 className="text-lg font-semibold mb-4">Category Filter Example</h3>
      
      {/* Main category tabs with pill variant */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Main Categories (Pill Style)</h4>
        <CategoryTabs
          value={selectedCategory}
          onValueChange={handleCategoryChange}
          categories={categories}
          variant="pill"
        />
      </div>

      {/* Alternative style with default variant */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Alternative Style (Default)</h4>
        <CategoryTabs
          value={selectedCategory}
          onValueChange={handleCategoryChange}
          categories={categories}
          variant="default"
        />
      </div>

      {/* Display selected category */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          Selected category: <span className="font-medium text-gray-900">{selectedCategory}</span>
        </p>
      </div>
    </div>
  )
}

export { ExampleCategoryTabs } 