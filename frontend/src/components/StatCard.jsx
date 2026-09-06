import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

export default function StatCard({ label, value, change, icon: Icon, trend = 'up', color = 'cyan', subtext }) {
  const colorMap = {
    cyan: {
      border: 'border-cyan-500/30 hover:border-cyan-400/60',
      glow: 'shadow-[0_0_20px_rgba(6,182,212,0.12)]',
      iconBg: 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30',
      accentLine: 'bg-gradient-to-r from-cyan-400 to-blue-500'
    },
    danger: {
      border: 'border-rose-500/30 hover:border-rose-400/60',
      glow: 'shadow-[0_0_20px_rgba(244,63,94,0.12)]',
      iconBg: 'bg-rose-500/15 text-rose-400 border border-rose-500/30',
      accentLine: 'bg-gradient-to-r from-rose-500 to-orange-500'
    },
    emerald: {
      border: 'border-emerald-500/30 hover:border-emerald-400/60',
      glow: 'shadow-[0_0_20px_rgba(16,185,129,0.12)]',
      iconBg: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
      accentLine: 'bg-gradient-to-r from-emerald-400 to-teal-500'
    },
    purple: {
      border: 'border-purple-500/30 hover:border-purple-400/60',
      glow: 'shadow-[0_0_20px_rgba(168,85,247,0.12)]',
      iconBg: 'bg-purple-500/15 text-purple-400 border border-purple-500/30',
      accentLine: 'bg-gradient-to-r from-purple-400 to-pink-500'
    }
  }

  const theme = colorMap[color] || colorMap.cyan

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-[#0e172a]/85 backdrop-blur-xl border ${theme.border} p-5 ${theme.glow} transition-all duration-200 hover:-translate-y-0.5`}>
      {/* Top accent glow line */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${theme.accentLine}`}></div>

      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-400 tracking-wide uppercase">
          {label}
        </span>
        {Icon && (
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${theme.iconBg}`}>
            <Icon size={18} />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {value}
        </span>
      </div>

      {(change || subtext) && (
        <div className="mt-2.5 flex items-center gap-2 text-xs text-gray-400">
          {change && (
            <span
              className={`inline-flex items-center gap-0.5 font-bold px-1.5 py-0.5 rounded-md ${
                trend === 'down'
                  ? 'bg-emerald-500/15 text-emerald-300'
                  : 'bg-cyan-500/15 text-cyan-300'
              }`}
            >
              {trend === 'down' ? <TrendingDown size={12} /> : <TrendingUp size={12} />}
              {change}
            </span>
          )}
          {subtext && <span className="truncate text-gray-400">{subtext}</span>}
        </div>
      )}
    </div>
  )
}
