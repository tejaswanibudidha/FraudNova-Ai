import React from 'react'

const blocks = [
  'Transaction Data','Feature Engineering','CNN + LSTM','Feature Extraction','QCNN','QSVM','VQE + QAOA Optimization','Fraud / Not Fraud','SHAP','Real-Time Dashboard'
]

export default function ArchitectureDiagram(){
  return (
    <div className="card p-6">
      <h3 className="font-semibold mb-4">Model Architecture</h3>
      <div className="flex flex-col items-center text-center gap-4">
        {blocks.map((b,i)=> (
          <div key={b} className="w-full flex items-center justify-center">
            <div className="w-3/4 p-3 bg-white/3 rounded">{b}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-sm text-gray-300">
        <p><strong>CNN:</strong> Learns important transaction patterns.</p>
        <p><strong>LSTM:</strong> Learns temporal transaction behavior.</p>
        <p><strong>QCNN:</strong> Performs quantum feature learning.</p>
        <p><strong>QSVM:</strong> Performs quantum kernel-based classification.</p>
        <p><strong>VQE:</strong> Optimizes parameters of the variational quantum circuit.</p>
        <p><strong>QAOA:</strong> Solves optimization problems in the quantum pipeline.</p>
        <p><strong>SHAP:</strong> Explains the features influencing the prediction.</p>
      </div>
    </div>
  )
}
