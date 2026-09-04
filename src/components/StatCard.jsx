import React from 'react'

export default function StatCard({label, value, change}){
  return (
    <div className="card">
      <div className="text-xs text-gray-400">{label}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
      {change && <div className="text-sm text-gray-300 mt-1">{change}</div>}
    </div>
  )
}
