import React from 'react'

export default function RiskBadge({score, prediction}){
  let cls = 'bg-blue-600 text-white'
  if(prediction==='Fraud') cls = 'bg-fraudred text-white'
  if(prediction==='High Risk') cls = 'bg-orange-500 text-white'
  if(prediction==='Genuine') cls = 'bg-green-500 text-white'

  return (
    <span className={`px-2 py-1 rounded text-xs ${cls}`}>{prediction} · {score}%</span>
  )
}
