import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

export default function ShapChart({data=[]}){
  const chartData = data.map(d=> ({name:d.feature, impact: d.impact}))
  return (
    <div className="card" style={{height:300}}>
      <h4 className="font-semibold mb-2">Top factors influencing this prediction</h4>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={chartData} layout="vertical">
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="name" width={160} />
          <Tooltip />
          <Bar dataKey="impact">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.impact >= 0 ? '#ff4d6d' : '#2fb6ff'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-3 flex items-center gap-4 text-sm text-gray-300">
        <div className="flex items-center gap-2"><div style={{width:12,height:12,background:'#ff4d6d'}}></div><div>Increases fraud probability</div></div>
        <div className="flex items-center gap-2"><div style={{width:12,height:12,background:'#2fb6ff'}}></div><div>Decreases fraud probability</div></div>
      </div>
    </div>
  )
}

