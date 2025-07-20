"use client"

import * as React from "react"
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, LabelList, Tooltip } from "recharts"

import { cn } from "@/lib/utils"

const PieChart = React.forwardRef(({ className, data, showLabelList = true, showTooltip = false, labelListProps, ...props }, ref) => {
  const defaultColors = [
    "#3B82F6", // blue
    "#F97316", // orange
    "#10B981", // green
    "#F59E0B", // yellow
    "#8B5CF6", // purple
    "#EF4444", // red
    "#6B7280", // gray
    "#EC4899", // pink
    "#14B8A6", // teal
    "#F97316", // amber
  ]

  return (
    <div ref={ref} className={cn("w-full", className)} {...props}>
      <ResponsiveContainer width="100%" height={200}>
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color || defaultColors[index % defaultColors.length]} 
              />
            ))}
            {showLabelList && (
              <LabelList
                dataKey="value"
                position="outside"
                {...labelListProps}
              />
            )}
          </Pie>
          {showTooltip && (
            <Tooltip
              formatter={(value, name) => [`${value}%`, name]}
              labelFormatter={(label) => label}
            />
          )}
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  )
})
PieChart.displayName = "PieChart"

export { PieChart } 