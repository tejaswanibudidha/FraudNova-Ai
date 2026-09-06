import React from 'react'
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { ShoppingBag } from 'lucide-react'

const COLORS = ['#00f5ff', '#ff3366', '#a855f7', '#f59e0b', '#10b981', '#38bdf8']

function CustomPieTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0]
    return (
      <div className="bg-[#0b1325]/95 border border-cyan-500/30 rounded-xl p-2.5 shadow-2xl backdrop-blur-xl text-xs">
        <div className="font-bold text-gray-200">{data.name}</div>
        <div className="text-cyan-300 font-mono font-semibold mt-0.5">
          {data.value} Transactions
        </div>
      </div>
    )
  }
  return null
}

export default function MerchantChart({ data = [] }) {
  const total = data.reduce((acc, curr) => acc + (curr.value || 0), 0)

  return (
    <div className="card h-[310px] flex flex-col justify-between">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
            <ShoppingBag size={16} />
          </div>
          <div>
            <h4 className="font-bold text-sm text-white">Merchant Risk Breakdown</h4>
            <p className="text-[11px] text-gray-400">Distribution by sector</p>
          </div>
        </div>
        <span className="text-[11px] font-mono text-cyan-300 font-bold bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
          {total} Total
        </span>
      </div>

      <div className="flex items-center justify-between flex-1 gap-2">
        {/* Donut Chart */}
        <div className="w-1/2 h-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height={190}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={48}
                outerRadius={75}
                paddingAngle={4}
                stroke="rgba(14, 23, 42, 0.8)"
                strokeWidth={2}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomPieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend List */}
        <div className="w-1/2 space-y-1.5 overflow-y-auto max-h-[200px] pr-1">
          {data.map((entry, index) => {
            const percentage = total > 0 ? Math.round((entry.value / total) * 100) : 0
            const color = COLORS[index % COLORS.length]
            return (
              <div
                key={entry.name}
                className="flex items-center justify-between text-xs p-1.5 rounded-lg bg-white/2 hover:bg-white/5 transition"
              >
                <div className="flex items-center gap-2 truncate">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}80` }}
                  ></span>
                  <span className="text-gray-300 truncate font-medium">{entry.name}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-gray-400">{entry.value}</span>
                  <span className="text-[10px] font-bold text-gray-500 w-7 text-right">
                    {percentage}%
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
