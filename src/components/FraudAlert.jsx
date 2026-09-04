import React from 'react'

export default function FraudAlert({txn}){
  if(!txn) return null
  return (
    <div className="card border-l-4 border-fraudred">
      <div className="text-sm text-fraudred font-semibold">⚠ HIGH RISK FRAUD ALERT</div>
      <div className="mt-2 text-sm text-gray-300">Suspicious transaction detected</div>
      <div className="mt-2">
        <div>Transaction ID: {txn.transaction_id}</div>
        <div>Amount: ₹{txn.amount}</div>
        <div>Risk Score: {txn.risk_score}%</div>
        <div>Reason: {txn.reason || 'Unusual pattern detected'}</div>
      </div>
    </div>
  )
}
