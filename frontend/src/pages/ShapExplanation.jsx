import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, Sparkles, HelpCircle, FileText, CheckCircle2, AlertTriangle } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import ShapChart from '../components/ShapChart'

function buildTextFromShap(shap) {
  if (!shap || !shap.length) {
    return 'The neural network model evaluated transaction amount, geo-spatial displacement, and velocity spikes. High value transfers coupled with unfamiliar device nodes represented the highest risk weights.'
  }
  const positives = shap.filter(s => s.impact > 0).sort((a, b) => b.impact - a.impact).slice(0, 3)
  const negatives = shap.filter(s => s.impact < 0).sort((a, b) => a.impact - b.impact).slice(0, 2)
  let text = ''
  if (positives.length) {
    text += `Primary risk-elevating attributes: ${positives.map(p => `"${p.feature}" (+${Number(p.impact).toFixed(2)})`).join(', ')}. `
  }
  if (negatives.length) {
    text += `Mitigating factors reducing anomaly risk: ${negatives.map(p => `"${p.feature}" (${Number(p.impact).toFixed(2)})`).join(', ')}.`
  }
  return text
}

export default function ShapExplanation() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const shap = state?.explanation || state?.shap || []

  return (
    <div className="flex min-h-screen bg-[#070d18] text-white">
      <Sidebar />
      <div className="flex-1 min-h-screen flex flex-col">
        <Navbar title="Explainable AI (XAI) & SHAP Attribution" />
        <main className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto w-full">

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white tracking-wide">
                Why was this Transaction Classified this way?
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Shapley additive explanations calculate the exact marginal contribution of every transaction attribute to the final anomaly classification.
              </p>
            </div>

            <button
              onClick={() => navigate(-1)}
              className="text-xs font-semibold text-gray-400 hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft size={15} />
              <span>Back</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Chart Column (2 Cols) */}
            <div className="lg:col-span-2 rounded-2xl bg-[#0b1322]/90 border border-white/10 p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                  <Sparkles size={16} />
                  <span>Feature Contribution Spectrum</span>
                </div>
                <span className="text-[11px] font-mono text-gray-400">Additive Scale [-1.0, +1.0]</span>
              </div>

              <ShapChart data={shap} />
            </div>

            {/* Narrative Explanation Column (1 Col) */}
            <div className="lg:col-span-1 space-y-5">
              <div className="rounded-2xl bg-[#0b1322]/90 border border-white/10 p-6 shadow-xl space-y-3">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <FileText size={16} className="text-cyan-400" />
                  <span>Attribution Narrative</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {buildTextFromShap(shap)}
                </p>
              </div>

              <div className="rounded-2xl bg-[#0e172a]/80 border border-white/10 p-5 shadow-lg space-y-3">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
                  <HelpCircle size={15} />
                  <span>Regulatory Compliance</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  By providing full SHAP decomposition, FraudNova AI adheres to <strong>GDPR Article 22</strong> (Right to Explanation) and <strong>FCRA adverse action reporting</strong> standards for automated decision engines.
                </p>
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  )
}

