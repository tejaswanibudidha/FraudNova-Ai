import React from 'react'
import RiskBadge from './RiskBadge'

export default function TransactionTable({rows=[]}){
  return (
    <div className="card overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-gray-400 text-xs">
          <tr>
            <th className="p-2 text-left">Transaction ID</th>
            <th className="p-2 text-left">Customer ID</th>
            <th className="p-2 text-left">Amount</th>
            <th className="p-2 text-left">Merchant</th>
            <th className="p-2 text-left">Time</th>
            <th className="p-2 text-left">Risk</th>
            <th className="p-2 text-left">Prediction</th>
            <th className="p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r=> (
            <tr key={r.transaction_id} className="border-t border-white/5">
              <td className="p-2">{r.transaction_id}</td>
              <td className="p-2">{r.customer_id}</td>
              <td className="p-2">₹{r.amount}</td>
              <td className="p-2">{r.merchant}</td>
              <td className="p-2">{r.time}</td>
              <td className="p-2"><RiskBadge score={r.risk_score} prediction={r.prediction} /></td>
              <td className="p-2">{r.prediction}</td>
              <td className="p-2">{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
