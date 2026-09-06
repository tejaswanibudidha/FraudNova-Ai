import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { TrendingUp, TrendingDown, HelpCircle } from 'lucide-react'

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    const isPositive = data.impact >= 0
    return (
      <div className="rounded-xl bg-[#090f1d]/95 border border-cyan-500/30 p-3 shadow-2xl backdrop-blur-xl text-xs font-mono">
        <div className="font-bold text-white mb-1">{data.name}</div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400">SHAP Attribution:</span>
          <span className={`font-black ${isPositive ? 'text-rose-400' : 'text-cyan-400'}`}>
            {data.impact > 0 ? `+${data.impact.toFixed(3)}` : data.impact.toFixed(3)}
          </span>
        </div>
        <div className="text-[10px] text-gray-400 mt-1">
          {isPositive ? '↑ Increased anomaly probability' : '↓ Supported normal transaction pattern'}
        </div>
      </div>
    )
  }
  return null
}

export default function ShapChart({ data = [] }) {
  const chartData = data.length > 0
    ? data.map(d => ({ name: d.feature, impact: Number(d.impact || 0) }))
    : [
        { name: 'Amount Deviation', impact: 0.42 },
        { name: 'Distance Jump (km)', impact: 0.35 },
        { name: 'Transaction Frequency', impact: 0.28 },
        { name: 'Unusual Device Node', impact: 0.19 },
        { name: 'Normal Merchant Category', impact: -0.15 },
        { name: 'Historical KYC Verification', impact: -0.25 }
      ]

  return (
    <div className="w-full space-y-3">
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              width={170}
              tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="impact" radius={[4, 4, 4, 4]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.impact >= 0 ? '#f43f5e' : '#06b6d4'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/5 text-xs text-gray-400">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <span className="w-2.5 h-2.5 rounded-sm bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]"></span>
            <span className="text-rose-300">Positive Factor (Increases Fraud Probability)</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></span>
            <span className="text-cyan-300">Mitigating Factor (Supports Authenticity)</span>
          </div>
        </div>

        <span className="text-[10px] text-gray-500 font-mono">
          Kernel: Tree/Permutation Explainer
        </span>
      </div>
    </div>
  )
}


