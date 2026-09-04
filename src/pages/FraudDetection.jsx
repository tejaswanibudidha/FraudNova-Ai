import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import TransactionForm from '../components/TransactionForm'
import ModelPipeline from '../components/ModelPipeline'
import LoadingAnimation from '../components/LoadingAnimation'
import { predict } from '../services/api'
import ErrorMessage from '../components/ErrorMessage'
import ShapChart from '../components/ShapChart'

export default function FraudDetection(){
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)
  const [lastPayload, setLastPayload] = useState(null)

  function backendUnavailableError(){
    return 'FraudNova AI backend is not running. Start the Python backend on http://localhost:5000'
  }

  const handleSubmit = async (payload)=>{
    setLoading(true); setError(null); setResult(null)
    // map frontend form fields to backend API keys and coerce numeric values
    const body = {
      transaction_id: payload.transaction_id,
      customer_id: payload.customer_id,
      amount: Number(payload.amount) || 0,
      time: payload.time,
      merchant_category: payload.merchant,
      payment_method: payload.payment_method,
      location: payload.location,
      device_type: payload.device,
      transaction_frequency: Number(payload.transaction_frequency) || 0,
      average_spending: Number(payload.average_spending) || 0,
      previous_transaction_amount: Number(payload.previous_amount) || 0,
      distance_from_previous_location: Number(payload.distance) || 0
    }
    setLastPayload(body)
    try{
      const res = await predict(body)
      const data = res.data
      setResult(data)
      // notify other parts of the app to refresh data
      try{ window.dispatchEvent(new CustomEvent('txn:analyzed',{detail:data})) }catch(e){}
    }catch(err){
      // Check if 401 (not authenticated) - redirect to login
      if(err.response?.status === 401) {
        navigate('/')
        return
      }
      // network / backend unavailable
      if(!err.response){
        setError(backendUnavailableError())
      }else{
        setError(err.response?.data?.message || 'An error occurred while analyzing transaction.')
      }
    }finally{setLoading(false)}
  }

  function buildShapText(shap){
    if(!shap || !shap.length) return 'No SHAP explanation available.'
    const pos = shap.filter(s=>s.impact>0).sort((a,b)=>b.impact-a.impact)
    const neg = shap.filter(s=>s.impact<0).sort((a,b)=>a.impact-b.impact)
    const strongest = pos[0]
    let sentences = []
    if(strongest) sentences.push(`${strongest.feature} was the strongest factor increasing the fraud probability.`)
    if(pos.length>1) sentences.push(`Other contributors: ${pos.slice(1,4).map(p=>p.feature).join(', ')}.`)
    if(neg.length) sentences.push(`${neg.map(n=>n.feature).join(', ')} slightly reduced the fraud probability.`)
    return sentences.join(' ')
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen">
        <Navbar title="Analyze Transaction" />
        <main className="p-6 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <TransactionForm onSubmit={handleSubmit} loading={loading} />

              {/* Analysis result appears here when available */}
              {loading && (
                <div className="card mt-4">
                  <LoadingAnimation label="Analyzing Transaction..." />
                  <div className="mt-4">
                    <ModelPipeline />
                  </div>
                </div>
              )}

              {error && (
                <div className="mt-4">
                  <ErrorMessage message={error} />
                  <div className="mt-2 flex gap-2">
                    <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={()=>{
                      if(lastPayload) handleSubmit(lastPayload)
                    }}>Retry</button>
                  </div>
                </div>
              )}

              {result && (
                <div className="space-y-4 mt-4">
                  <div className="card">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Analysis Result</h4>
                      {result.mode === 'DEMO' && <div className="text-xs bg-yellow-700 text-white px-2 py-1 rounded">DEMO RESULT</div>}
                    </div>
                    <div className="mt-3">
                      {result.prediction === 'Fraud' ? (
                        <div className="text-red-400 font-bold">🚨 FRAUD DETECTED</div>
                      ) : (
                        <div className="text-green-400 font-bold">✓ TRANSACTION IS LEGITIMATE</div>
                      )}
                      <div className="mt-2 text-sm text-gray-300">Transaction ID: <strong>{result.transaction_id}</strong></div>
                      <div className="mt-2 text-sm text-gray-300">Risk Score: <strong>{result.risk_score}%</strong></div>
                      <div className="mt-1 text-sm text-gray-300">Confidence: <strong>{Math.round((result.confidence||0)*1000)/10}%</strong></div>
                    </div>
                  </div>

                  <div className="card">
                    <h4 className="font-semibold">Why was this transaction classified as {result.prediction.toUpperCase()}?</h4>
                    <div className="text-sm text-gray-400">SHAP values explain how each feature contributed to the model's prediction.</div>
                    <div className="mt-4">
                      <ShapChart data={result.shap || []} />
                    </div>
                  </div>

                  <div className="card">
                    <h4 className="font-semibold">Explanation</h4>
                    <p className="text-sm text-gray-300 mt-2">{result.explanation || buildShapText(result.shap || [])}</p>
                  </div>
                </div>
              )}

            </div>
            <div className="col-span-1 space-y-4">
              <ModelPipeline />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
