import React from 'react'

interface StatsCardProps {
  title: string
  value: string | number
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value }) => {
  return (
    <div className="rounded-2xl bg-linear-to-br from-white to-slate-50 p-6 shadow-lg hover:shadow-xl border border-slate-200 transform hover:scale-105 transition-all duration-300">
      <div className="flex flex-col space-y-2">
        <p className="text-sm font-medium text-slate-600">{title}</p>
        <p className="text-3xl font-bold text-slate-800">{value}</p>
      </div>
    </div>
  )
}

export default StatsCard