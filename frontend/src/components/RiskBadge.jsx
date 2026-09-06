import React from 'react'

export default function RiskBadge({ score = 0, prediction }) {
  const numericScore = Number(score) || 0
  const isHighRisk = prediction === 'Fraud' || prediction === 'High Risk' || numericScore >= 75
  const isMediumRisk = prediction === 'Medium Risk' || (numericScore >= 40 && numericScore < 75)

  if (isHighRisk) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs font-semibold shadow-[0_0_10px_rgba(244,63,94,0.2)]">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping"></span>
        <span>High Risk ({numericScore}%)</span>
      </span>
    )
  }

  if (isMediumRisk) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-semibold">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
        <span>Medium ({numericScore}%)</span>
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
      <span>Genuine ({numericScore}%)</span>
    </span>
  )
}
