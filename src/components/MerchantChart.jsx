import React from 'react'
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const COLORS = ['#00d1ff','#ff4d6d','#ffb86b','#4ade80']

export default function MerchantChart({data=[]}){
  return (
    <div className="card" style={{height:260}}>
      <h4 className="font-semibold mb-2">Fraud by Merchant Category (Demo)</h4>
      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={80} fill="#8884d8">
            {data.map((entry, index)=>(<Cell key={index} fill={COLORS[index % COLORS.length]} />))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
