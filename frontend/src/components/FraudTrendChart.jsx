import React from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { Activity } from 'lucide-react'

// Custom Glassmorphic Tooltip
function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0b1325]/95 border border-cyan-500/30 rounded-xl p-3 shadow-2xl backdrop-blur-xl text-xs">
        <div className="font-bold text-gray-200 mb-1.5 border-b border-white/10 pb-1">
          Time: {label}
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-4 text-rose-400 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              Fraud Flagged:
            </span>
            <span className="font-bold font-mono">{payload[0]?.value ?? 0}</span>
          </div>
          <div className="flex items-center justify-between gap-4 text-cyan-300 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              Genuine Passed:
            </span>
            <span className="font-bold font-mono">{payload[1]?.value ?? 0}</span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export default function FraudTrendChart({ data = [] }) {
  return (
    <div className="card h-[310px] flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
            <Activity size={16} />
          </div>
          <div>
            <h4 className="font-bold text-sm text-white">Detection Trends</h4>
            <p className="text-[11px] text-gray-400">Fraudulent vs Genuine flow rate</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 text-rose-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]"></span> Fraud
          </span>
          <span className="flex items-center gap-1.5 text-cyan-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span> Genuine
          </span>
        </div>
      </div>

      <div className="w-full flex-1 mt-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="fraudGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff3366" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#ff3366" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="genuineGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00f5ff" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#00f5ff" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis 
              dataKey="time" 
              stroke="#64748b" 
              fontSize={11} 
              tickLine={false} 
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            />
            <YAxis 
              stroke="#64748b" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="fraud"
              stroke="#ff3366"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#fraudGrad)"
            />
            <Area
              type="monotone"
              dataKey="genuine"
              stroke="#00f5ff"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#genuineGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
