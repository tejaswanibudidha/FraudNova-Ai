import React from 'react'

export default function FraudNovaLogo({ size = 'md', className = '' }) {
  const isLarge = size === 'lg'

  return (
    <div className={`flex items-center ${isLarge ? 'flex-col gap-3 text-center' : 'gap-3'} ${className}`}>
      <div
        className={`relative shrink-0 overflow-hidden rounded-2xl border border-cyan-400/40 bg-[#0a1328] shadow-[0_0_24px_rgba(6,182,212,0.28)] ${
          isLarge ? 'h-24 w-24 sm:h-28 sm:w-28' : 'h-11 w-11 rounded-xl'
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.22),transparent_58%),radial-gradient(circle_at_85%_90%,rgba(99,102,241,0.2),transparent_55%)]" />
        <svg viewBox="0 0 100 100" className="relative h-full w-full" aria-hidden="true">
          <path
            d="M50 14 76 24v22c0 17-10 29-26 39C34 75 24 63 24 46V24l26-10Z"
            fill="rgba(8,25,48,0.92)"
            stroke="#67e8f9"
            strokeWidth="3"
          />
          <path d="M50 25 64 31v14c0 10-5 18-14 25-9-7-14-15-14-25V31l14-6Z" fill="rgba(6,182,212,0.14)" stroke="#38bdf8" strokeWidth="2" />
          <path d="M50 34v29M39 45h22M43 55h14" stroke="#a5f3fc" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M24 34H13v-7M76 34h11v-7M29 68H16v7M71 68h13v7" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" />
          <circle cx="13" cy="27" r="3" fill="#22d3ee" />
          <circle cx="87" cy="27" r="3" fill="#60a5fa" />
          <circle cx="16" cy="75" r="3" fill="#818cf8" />
          <circle cx="84" cy="75" r="3" fill="#22d3ee" />
          <path d="M35 19 28 12M65 19l7-7" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <div className={isLarge ? '' : 'min-w-0'}>
        <div className={`flex items-center ${isLarge ? 'justify-center gap-2.5' : 'gap-2'}`}>
          <h1 className={`font-extrabold tracking-tight text-white ${isLarge ? 'text-3xl sm:text-4xl' : 'text-lg'}`}>
            Fraud<span className="text-cyan-300">Nova</span>
          </h1>
          <span className={`rounded border border-cyan-400/70 bg-cyan-400/10 font-mono font-bold text-cyan-200 shadow-[0_0_12px_rgba(34,211,238,0.18)] ${isLarge ? 'px-2 py-0.5 text-xs' : 'px-1.5 py-0.5 text-[10px]'}`}>
            PRO
          </span>
        </div>
        <p className={`font-medium text-gray-200 ${isLarge ? 'mt-1 text-sm sm:text-base' : 'text-[11px] text-gray-400'}`}>
          Quantum Defense System
        </p>
      </div>
    </div>
  )
}