"use client"

import React from "react"
import { Tabs, TabsList, TabsTrigger } from "./tabs"

const CategoryTabs = ({ 
  value, 
  onValueChange, 
  categories = [], 
  className = "",
  variant = "default" // "default" or "pill"
}) => {
  const getTabStyles = () => {
    if (variant === "pill") {
      return {
        list: "bg-[#F4F4F5] p-1 h-auto gap-2 border-none rounded-[999px] w-full overflow-x-auto flex-nowrap max-[425px]:overflow-x-auto min-[425px]:overflow-visible",
                  trigger: "rounded-[999px] px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-[#09090B] data-[state=active]:shadow-sm data-[state=active]:border-2 data-[state=active]:border-[#F4F4F5] border-none bg-transparent text-[#52525C] hover:bg-white/50 whitespace-nowrap flex-shrink-0 cursor-pointer"
      }
    }
    
    // Default variant (like the category filters)
    return {
      list: "bg-transparent p-0 h-auto gap-2 border-none w-full overflow-x-auto flex-nowrap",
      trigger: "rounded-full px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:border-gray-900 data-[state=active]:shadow-sm border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 whitespace-nowrap flex-shrink-0"
    }
  }

  const styles = getTabStyles()

  return (
    <Tabs value={value} onValueChange={onValueChange} className={className}>
      <TabsList className={styles.list}>
        {categories.map((category) => (
          <TabsTrigger 
            key={category.value}
            value={category.value} 
            className={styles.trigger}
          >
            <span>{category.label}</span>
            {category.count !== undefined && (
              <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-medium bg-gray-200 text-gray-700 rounded-full">
                {category.count}
              </span>
            )}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

export { CategoryTabs } 