import React from 'react'
import { ShieldAlert, CheckCircle2, AlertTriangle, ArrowUpRight, Cpu } from 'lucide-react'
import RiskBadge from './RiskBadge'

export default function PredictionCard({ result }) {
  if (!result) return null
  const isFraud = result.prediction === 'Fraud'
  const riskScore = Number(result.risk_score || 0)
  const confidence = Math.round((result.confidence || 0) * 1000) / 10

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border p-6 backdrop-blur-xl transition-all ${
        isFraud
          ? 'bg-gradient-to-br from-rose-950/40 via-slate-900/90 to-black/80 border-rose-500/50 shadow-[0_0_30px_rgba(244,63,94,0.15)]'
          : 'bg-gradient-to-br from-emerald-950/40 via-slate-900/90 to-black/80 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)]'
      }`}
    >
      {/* Top accent glow line */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
          isFraud ? 'from-rose-500 to-amber-500' : 'from-emerald-400 to-cyan-500'
        }`}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
              isFraud
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
            }`}
          >
            {isFraud ? <ShieldAlert size={26} /> : <CheckCircle2 size={26} />}
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Quantum-Hybrid AI Verdict
            </span>
            <h3
              className={`text-xl sm:text-2xl font-black tracking-tight ${
                isFraud ? 'text-rose-400' : 'text-emerald-400'
              }`}
            >
              {isFraud ? 'SUSPICIOUS FRAUD DETECTED' : 'TRANSACTION VERIFIED GENUINE'}
            </h3>
          </div>
        </div>

        <RiskBadge score={riskScore} prediction={result.prediction} />
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="rounded-xl bg-black/40 border border-white/5 p-3.5">
          <span className="text-xs text-gray-400 block font-semibold">Anomaly Risk Score</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span
              className={`text-3xl font-black font-mono ${
                isFraud ? 'text-rose-400' : 'text-emerald-400'
              }`}
            >
              {riskScore}%
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-full h-2 rounded-full bg-white/10 mt-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isFraud
                  ? 'bg-gradient-to-r from-orange-500 to-rose-500'
                  : 'bg-gradient-to-r from-teal-400 to-emerald-400'
              }`}
              style={{ width: `${Math.min(riskScore, 100)}%` }}
            />
          </div>
        </div>

        <div className="rounded-xl bg-black/40 border border-white/5 p-3.5">
          <span className="text-xs text-gray-400 block font-semibold">Classification Confidence</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black font-mono text-cyan-300">
              {confidence}%
            </span>
          </div>
          <span className="text-[11px] text-gray-500 block mt-2">
            Ensemble Consensus: 4/4 Models
          </span>
        </div>

        <div className="rounded-xl bg-black/40 border border-white/5 p-3.5">
          <span className="text-xs text-gray-400 block font-semibold">Recommended Security Action</span>
          <div className="mt-1.5">
            <span
              className={`text-xs font-bold px-2 py-1 rounded-md inline-block ${
                isFraud
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              }`}
            >
              {isFraud ? '⛔ Freeze & Request MFA' : '✅ Immediate Clearance'}
            </span>
          </div>
          <span className="text-[11px] text-gray-500 block mt-2">
            Automated Rule ID: FN-902-Q
          </span>
        </div>
      </div>

      {/* Transaction Details Grid */}
      <div className="mt-6 pt-5 border-t border-white/10">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
          Assessed Parameters
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-xs">
          <div className="bg-white/[0.03] p-2.5 rounded-xl border border-white/5">
            <span className="text-gray-500 block">Txn ID</span>
            <span className="text-white font-mono font-bold mt-0.5 block truncate">
              {result.transaction_id || 'N/A'}
            </span>
          </div>
          <div className="bg-white/[0.03] p-2.5 rounded-xl border border-white/5">
            <span className="text-gray-500 block">Amount</span>
            <span className="text-cyan-300 font-mono font-bold mt-0.5 block">
              ₹{Number(result.amount || 0).toLocaleString()}
            </span>
          </div>
          <div className="bg-white/[0.03] p-2.5 rounded-xl border border-white/5">
            <span className="text-gray-500 block">Merchant</span>
            <span className="text-white font-semibold mt-0.5 block truncate">
              {result.merchant || result.merchant_category || 'N/A'}
            </span>
          </div>
          <div className="bg-white/[0.03] p-2.5 rounded-xl border border-white/5">
            <span className="text-gray-500 block">Location</span>
            <span className="text-white font-semibold mt-0.5 block truncate">
              {result.location || 'N/A'}
            </span>
          </div>
          <div className="bg-white/[0.03] p-2.5 rounded-xl border border-white/5">
            <span className="text-gray-500 block">Time</span>
            <span className="text-white font-mono mt-0.5 block">
              {result.time || 'N/A'}
            </span>
          </div>
          <div className="bg-white/[0.03] p-2.5 rounded-xl border border-white/5">
            <span className="text-gray-500 block">Device</span>
            <span className="text-white font-semibold mt-0.5 block truncate">
              {result.device || result.device_type || 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

