import React from 'react'
import { Bell } from 'lucide-react'

export default function Navbar({title}){
  return (
    <header className="flex items-center justify-between py-4 px-6 border-b border-white/5">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-400">Welcome, Analyst</div>
        <Bell className="text-cyan-300" />
      </div>
    </header>
  )
}
