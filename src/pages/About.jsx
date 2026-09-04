import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

export default function About(){
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen">
        <Navbar title="About" />
        <main className="p-6">
          <div className="card">
            <h3 className="text-xl font-semibold">FraudNova AI</h3>
            <p className="text-sm text-gray-300">Quantum-Enhanced Financial Fraud Detection System</p>
            <div className="mt-4">
              <h4 className="font-semibold">Technologies</h4>
              <ul className="mt-2 text-sm text-gray-300 list-disc list-inside">
                <li>Python</li>
                <li>CNN, LSTM</li>
                <li>QCNN, QSVM</li>
                <li>VQE, QAOA</li>
                <li>SHAP</li>
                <li>TensorFlow, Keras, Qiskit</li>
                <li>Pandas, NumPy, Scikit-learn</li>
                <li>Streamlit / Flask</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
