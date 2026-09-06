import React from 'react'

export default function LoadingAnimation({ label = 'Evaluating Quantum Probabilities...' }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-4">
      <div className="relative w-14 h-14 flex items-center justify-center">
        {/* Outer glowing ring */}
        <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin"></div>
        {/* Inner reverse spinning ring */}
        <div className="w-9 h-9 rounded-full border-2 border-purple-500/20 border-b-purple-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.2s' }}></div>
        {/* Center core pulse */}
        <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#00F5FF] animate-ping"></div>
      </div>
      <div className="text-xs font-mono font-semibold text-cyan-300 tracking-wider uppercase animate-pulse">
        {label}
      </div>
    </div>
  )
}

