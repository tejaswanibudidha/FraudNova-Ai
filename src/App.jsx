import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import FraudDetection from './pages/FraudDetection'
import PredictionResult from './pages/PredictionResult'
import RealTimeMonitor from './pages/RealTimeMonitor'
import TransactionHistory from './pages/TransactionHistory'
import ShapExplanation from './pages/ShapExplanation'
import About from './pages/About'

export default function App(){
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/detect" element={<FraudDetection/>} />
      <Route path="/result" element={<PredictionResult/>} />
      <Route path="/monitor" element={<RealTimeMonitor/>} />
      <Route path="/history" element={<TransactionHistory/>} />
      <Route path="/shap" element={<ShapExplanation/>} />
      
      <Route path="/about" element={<About/>} />
    </Routes>
  )
}
