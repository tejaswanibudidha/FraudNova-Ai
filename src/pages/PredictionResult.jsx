import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import PredictionCard from '../components/PredictionCard'
import ShapChart from '../components/ShapChart'
import { useLocation } from 'react-router-dom'

function buildTextExplanation(shap){
  if(!shap || !shap.length) return 'No explanation available.'
  const positives = shap.filter(s=>s.impact>0).sort((a,b)=>b.impact-a.impact)
  const negatives = shap.filter(s=>s.impact<0).sort((a,b)=>a.impact-b.impact)
  const topPos = positives.slice(0,3).map(p=>p.feature)
  const topNeg = negatives.slice(0,2).map(p=>p.feature)
  let parts = []
  if(topPos.length) parts.push(`The prediction was increased by ${topPos.join(', ')}.`)
  if(topNeg.length) parts.push(`It was slightly decreased by ${topNeg.join(', ')}.`)
  return parts.join(' ')
}

export default function PredictionResult(){
  const {state} = useLocation()
  const result = state?.result
  if(!result) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card p-6">No prediction data. Please analyze a transaction first.</div>
    </div>
  )

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen">
        <Navbar title="Prediction Result" />
        <main className="p-6 space-y-4">
          <PredictionCard result={result} />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <button onClick={()=>window.scrollTo({top:0, behavior:'smooth'})} className="px-4 py-2 bg-white/5 rounded">Return</button>
            </div>
            <div className="card">
              <h4 className="font-semibold">Model</h4>
              <div className="text-sm text-gray-300 mt-2">CNN + LSTM + QCNN + QSVM</div>
              <h4 className="font-semibold mt-3">Optimization</h4>
              <div className="text-sm text-gray-300 mt-2">VQE + QAOA</div>
            </div>
          </div>
          <div className="card">
            <h4 className="font-semibold">SHAP Summary</h4>
            <div className="text-sm text-gray-300 mt-2">{buildTextExplanation(result.shap || result.explanation)}</div>
            <div className="mt-4">
              <ShapChart data={result.shap || []} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
