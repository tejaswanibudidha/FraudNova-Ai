import React from 'react'
import RiskBadge from './RiskBadge'

export default function PredictionCard({result}){
  if(!result) return null
  const fraud = result.prediction === 'Fraud'
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">{fraud? 'FRAUD DETECTED' : 'TRANSACTION IS LEGITIMATE'}</h3>
        <RiskBadge score={result.risk_score} prediction={fraud? 'High Risk' : 'Low Risk'} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-gray-400">Risk Score</div>
          <div className="text-3xl font-semibold">{result.risk_score}%</div>
        </div>
        <div>
          <div className="text-sm text-gray-400">Confidence</div>
          <div className="text-2xl font-semibold">{Math.round(result.confidence*100)/100}%</div>
        </div>
      </div>
      <div className="mt-4">
        <h4 className="font-semibold">Transaction Summary</h4>
        <div className="text-sm text-gray-300 mt-2">
          <div>Transaction ID: {result.transaction_id}</div>
          <div>Amount: ₹{result.amount}</div>
          <div>Merchant: {result.merchant}</div>
          <div>Location: {result.location}</div>
          <div>Time: {result.time}</div>
          <div>Device: {result.device}</div>
        </div>
      </div>
    </div>
  )
}
