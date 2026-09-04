import React from 'react'

const STEPS = [
  'Preprocessing', 'Feature Engineering', 'CNN + LSTM', 'Feature Extraction', 'QCNN', 'QSVM', 'VQE + QAOA', 'Prediction'
]

export default function ModelPipeline({active=true}){
  return (
    <div className="card">
      <h3 className="font-semibold mb-3">Processing Pipeline</h3>
      <div className="flex flex-col gap-2">
        {STEPS.map((s,i)=> (
          <div key={s} className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${i<3? 'bg-cyan-400' : i<6? 'bg-blue-400' : 'bg-fraudred'}`}></div>
            <div className="text-sm text-gray-300">{s}</div>
            {i<STEPS.length-1 && <div className="ml-2 text-gray-500">↓</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
