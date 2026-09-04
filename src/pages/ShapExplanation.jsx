import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import ShapChart from '../components/ShapChart'
import { useLocation } from 'react-router-dom'

function buildTextFromShap(shap){
  if(!shap || !shap.length) return 'No SHAP data available.'
  const positives = shap.filter(s=>s.impact>0).sort((a,b)=>b.impact-a.impact).slice(0,3)
  const negatives = shap.filter(s=>s.impact<0).sort((a,b)=>a.impact-b.impact).slice(0,2)
  let text = ''
  if(positives.length){
    text += `Primary positive contributors: ${positives.map(p=>p.feature).join(', ')}. `
  }
  if(negatives.length){
    text += `Primary negative contributors: ${negatives.map(p=>p.feature).join(', ')}.`
  }
  return text
}
export default function ShapExplanation(){
  const {state} = useLocation()
  const shap = state?.explanation || state?.shap || []
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen">
        <Navbar title="Why was this transaction classified as FRAUD?" />
        <main className="p-6">
          <div className="text-sm text-gray-400">SHAP values explain how each feature contributed to the model's prediction.</div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <ShapChart data={shap} />
            <div className="card">
              <h4 className="font-semibold">Textual Explanation</h4>
              <p className="text-sm text-gray-300 mt-2">{buildTextFromShap(shap)}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
