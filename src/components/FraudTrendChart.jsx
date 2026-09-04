import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export default function FraudTrendChart({data=[]}){
  return (
    <div className="card" style={{height:220}}>
      <h4 className="font-semibold mb-2">Fraud Trend Over Time (Demo Data)</h4>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="fraud" stroke="#ff4d6d" />
          <Line type="monotone" dataKey="genuine" stroke="#00d1ff" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
