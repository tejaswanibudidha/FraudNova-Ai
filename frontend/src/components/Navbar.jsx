import React from 'react'
import { Bell, ChevronRight } from 'lucide-react'
import { getStoredUser } from '../services/api'

export default function Navbar({ title }) {
  const user = getStoredUser()
  const displayName = user?.full_name || user?.username || 'Security Analyst'
  const role = (user?.role || 'analyst').toUpperCase()

  return (
    <header className="flex items-center justify-between py-3.5 px-6 border-b border-white/10 bg-[#091122]/70 backdrop-blur-xl sticky top-0 z-30">
      {/* Breadcrumb & Page Title */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-gray-400">Platform</span>
        <ChevronRight size={14} className="text-gray-600" />
        <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
          {title}
        </h2>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Live Backend Connection Indicator */}
        <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 radar-live-dot"></span>
          <span className="font-semibold">Live Engine</span>
        </div>

        <div className="h-5 w-px bg-white/10 hidden sm:block"></div>

        {/* Notification Bell */}
        <button
          title="Security Notifications"
          className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-300 transition cursor-pointer border border-white/5"
        >
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500"></span>
        </button>

        {/* User Card */}
        <div className="flex items-center gap-2.5 pl-1">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-xs text-slate-950 shadow-md">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div className="text-right hidden sm:block">
            <div className="text-xs font-bold text-gray-200 leading-tight">
              {displayName}
            </div>
            <div className="text-[10px] text-cyan-400 font-mono font-medium">
              {role}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
