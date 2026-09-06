import React from 'react'
import { AlertCircle } from 'lucide-react'

export default function ErrorMessage({ message }) {
  if (!message) return null
  return (
    <div className="rounded-2xl bg-rose-500/10 border border-rose-500/30 p-4 shadow-lg flex items-start gap-3">
      <div className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
        <AlertCircle size={18} />
      </div>
      <div>
        <div className="text-xs font-bold text-rose-400 tracking-wider uppercase">System Notification</div>
        <div className="mt-0.5 text-xs text-rose-200/90 leading-relaxed">{message}</div>
      </div>
    </div>
  )
}

