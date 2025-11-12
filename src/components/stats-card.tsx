import React from 'react'

interface StatsCardProps {
  title: string
  value: string | number
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value }) => {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex flex-col space-y-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  )
}

export default StatsCard