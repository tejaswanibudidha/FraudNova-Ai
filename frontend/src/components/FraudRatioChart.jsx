import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { ShieldCheck, ShieldAlert, PieChart as PieIcon } from 'lucide-react'

export default function FraudRatioChart({ genuine = 0, fraud = 0 }) {
  const count = genuine + fraud
  const total = count || 1
  const data = count > 0
    ? [
        { name: 'Legitimate', value: genuine, color: '#10b981' },
        { name: 'Fraudulent', value: fraud, color: '#f43f5e' }
      ]
    : [
        { name: 'Awaiting Records', value: 1, color: '#1e293b' }
      ]

  const fraudPct = Math.round((fraud / total) * 1000) / 10
  const genuinePct = Math.round((genuine / total) * 1000) / 10

  return (
    <div className="p-5 rounded-2xl bg-[#0b1324] border border-slate-800/80 shadow-xl flex flex-col justify-between hover-lift hover:border-slate-700/90 transition-all duration-300" style={{ minHeight: 280 }}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <PieIcon className="w-4 h-4 text-cyan-400" />
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            System Threat Ratio
          </h4>
        </div>
        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
          {count} Total
        </span>
      </div>

      <div className="flex items-center justify-between gap-4 h-52">
        {/* Semi Donut / Donut */}
        <div className="h-full w-1/2 relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={45}
                outerRadius={68}
                paddingAngle={count > 0 ? 5 : 0}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={index} 
                    fill={entry.color} 
                    stroke="#0b1324" 
                    strokeWidth={2}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Centered Threat Percentage */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl font-bold font-mono text-white leading-none">
              {count > 0 ? `${fraudPct}%` : '0.0%'}
            </span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mt-0.5">
              {count > 0 ? 'Threat' : 'Standby'}
            </span>
          </div>
        </div>

        {/* Legend / Metrics */}
        <div className="w-1/2 space-y-3">
          {/* Legitimate Bar */}
          <div className="p-2.5 rounded-xl bg-[#070d18] border border-slate-800/80">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Legitimate</span>
              </div>
              <span className="font-mono font-bold text-white text-xs">{genuine}</span>
            </div>
            <div className="flex justify-between items-center mt-1 text-[11px] text-slate-400">
              <span>Verified Clean</span>
              <span className="font-mono font-bold text-emerald-400">{count > 0 ? `${genuinePct}%` : '0%'}</span>
            </div>
          </div>

          {/* Fraud Bar */}
          <div className="p-2.5 rounded-xl bg-[#070d18] border border-slate-800/80">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-rose-400 font-semibold">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Fraudulent</span>
              </div>
              <span className="font-mono font-bold text-white text-xs">{fraud}</span>
            </div>
            <div className="flex justify-between items-center mt-1 text-[11px] text-slate-400">
              <span>High Risk Anomaly</span>
              <span className="font-mono font-bold text-rose-400">{count > 0 ? `${fraudPct}%` : '0%'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
