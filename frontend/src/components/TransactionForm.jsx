import React, { useState } from 'react'
import {
  Sparkles,
  CreditCard,
  Building2,
  Activity,
  ArrowRight,
  RotateCcw,
  AlertCircle
} from 'lucide-react'

export default function TransactionForm({ onSubmit, loading = false }) {
  const [form, setForm] = useState({
    transaction_id: `TXN_${Math.floor(1000 + Math.random() * 9000)}`,
    customer_id: '',
    amount: '',
    time: '',
    merchant: '',
    payment_method: '',
    location: '',
    device: '',
    transaction_frequency: 1,
    average_spending: '',
    previous_amount: '',
    distance: ''
  })
  const [errors, setErrors] = useState({})

  const handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null })
    }
  }

  const resetForm = () => {
    setForm({
      transaction_id: `TXN_${Math.floor(1000 + Math.random() * 9000)}`,
      customer_id: '',
      amount: '',
      time: '',
      merchant: '',
      payment_method: '',
      location: '',
      device: '',
      transaction_frequency: 1,
      average_spending: '',
      previous_amount: '',
      distance: ''
    })
    setErrors({})
  }

  const validate = () => {
    const err = {}
    if (!form.transaction_id?.trim()) err.transaction_id = 'Transaction ID is required'
    if (!form.customer_id?.trim()) err.customer_id = 'Customer ID is required'
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0) err.amount = 'Valid amount is required'
    if (!form.time?.trim()) err.time = 'Time is required'
    if (!form.merchant?.trim()) err.merchant = 'Merchant category is required'
    if (!form.payment_method?.trim()) err.payment_method = 'Payment method is required'
    if (!form.location?.trim()) err.location = 'Location is required'
    if (!form.device?.trim()) err.device = 'Device type is required'
    if (form.transaction_frequency === '' || isNaN(Number(form.transaction_frequency))) err.transaction_frequency = 'Valid frequency is required'
    if (form.average_spending === '' || isNaN(Number(form.average_spending))) err.average_spending = 'Valid average spending is required'
    if (form.previous_amount === '' || isNaN(Number(form.previous_amount))) err.previous_amount = 'Valid previous amount is required'
    if (form.distance === '' || isNaN(Number(form.distance))) err.distance = 'Valid distance is required'
    setErrors(err)
    return Object.keys(err).length === 0
  }

  const submit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit(form)
  }

  return (
    <form onSubmit={submit} className="space-y-6">


      {/* 3 Grouped Sections */}
      <div className="space-y-5">
        
        {/* Section 1: Transaction Basics */}
        <div className="rounded-2xl bg-[#0e172a]/80 border border-white/10 p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/5">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/15 text-cyan-400 flex items-center justify-center">
              <CreditCard size={15} />
            </div>
            <h4 className="text-sm font-bold text-white tracking-wide">1. Transaction Basics</h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Transaction ID</label>
              <input
                name="transaction_id"
                value={form.transaction_id}
                onChange={handle}
                placeholder="TXN_1001"
                className="w-full px-3 py-2 bg-[#090f1d] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
              />
              {errors.transaction_id && <p className="text-[11px] text-rose-400 mt-1">{errors.transaction_id}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Customer ID</label>
              <input
                name="customer_id"
                value={form.customer_id}
                onChange={handle}
                placeholder="CUST_204"
                className="w-full px-3 py-2 bg-[#090f1d] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
              />
              {errors.customer_id && <p className="text-[11px] text-rose-400 mt-1">{errors.customer_id}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Amount (₹)</label>
              <input
                name="amount"
                type="number"
                value={form.amount}
                onChange={handle}
                placeholder="25000"
                className="w-full px-3 py-2 bg-[#090f1d] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono font-bold text-cyan-300"
              />
              {errors.amount && <p className="text-[11px] text-rose-400 mt-1">{errors.amount}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Timestamp / Time</label>
              <input
                name="time"
                value={form.time}
                onChange={handle}
                placeholder="10:30"
                className="w-full px-3 py-2 bg-[#090f1d] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
              />
              {errors.time && <p className="text-[11px] text-rose-400 mt-1">{errors.time}</p>}
            </div>
          </div>
        </div>

        {/* Section 2: Merchant & Context */}
        <div className="rounded-2xl bg-[#0e172a]/80 border border-white/10 p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/5">
            <div className="w-7 h-7 rounded-lg bg-purple-500/15 text-purple-400 flex items-center justify-center">
              <Building2 size={15} />
            </div>
            <h4 className="text-sm font-bold text-white tracking-wide">2. Merchant & Channel Context</h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Merchant Category</label>
              <input
                name="merchant"
                value={form.merchant}
                onChange={handle}
                placeholder="Electronics, Luxury..."
                className="w-full px-3 py-2 bg-[#090f1d] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
              />
              {errors.merchant && <p className="text-[11px] text-rose-400 mt-1">{errors.merchant}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Payment Method</label>
              <input
                name="payment_method"
                value={form.payment_method}
                onChange={handle}
                placeholder="Credit Card, Wire, UPI..."
                className="w-full px-3 py-2 bg-[#090f1d] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
              />
              {errors.payment_method && <p className="text-[11px] text-rose-400 mt-1">{errors.payment_method}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Location / City</label>
              <input
                name="location"
                value={form.location}
                onChange={handle}
                placeholder="Mumbai, London, Dubai..."
                className="w-full px-3 py-2 bg-[#090f1d] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
              />
              {errors.location && <p className="text-[11px] text-rose-400 mt-1">{errors.location}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Device Telemetry</label>
              <input
                name="device"
                value={form.device}
                onChange={handle}
                placeholder="iPhone 15, Windows, VM..."
                className="w-full px-3 py-2 bg-[#090f1d] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
              />
              {errors.device && <p className="text-[11px] text-rose-400 mt-1">{errors.device}</p>}
            </div>
          </div>
        </div>

        {/* Section 3: Behavioral Telemetry */}
        <div className="rounded-2xl bg-[#0e172a]/80 border border-white/10 p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/5">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
              <Activity size={15} />
            </div>
            <h4 className="text-sm font-bold text-white tracking-wide">3. Behavioral & Geolocation Profile</h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">24h Transaction Frequency</label>
              <input
                name="transaction_frequency"
                type="number"
                value={form.transaction_frequency}
                onChange={handle}
                placeholder="3"
                className="w-full px-3 py-2 bg-[#090f1d] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
              />
              {errors.transaction_frequency && <p className="text-[11px] text-rose-400 mt-1">{errors.transaction_frequency}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Average Spending (₹)</label>
              <input
                name="average_spending"
                type="number"
                value={form.average_spending}
                onChange={handle}
                placeholder="2000"
                className="w-full px-3 py-2 bg-[#090f1d] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
              />
              {errors.average_spending && <p className="text-[11px] text-rose-400 mt-1">{errors.average_spending}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Previous Amount (₹)</label>
              <input
                name="previous_amount"
                type="number"
                value={form.previous_amount}
                onChange={handle}
                placeholder="1500"
                className="w-full px-3 py-2 bg-[#090f1d] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
              />
              {errors.previous_amount && <p className="text-[11px] text-rose-400 mt-1">{errors.previous_amount}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Distance Jump (km)</label>
              <input
                name="distance"
                type="number"
                value={form.distance}
                onChange={handle}
                placeholder="5"
                className="w-full px-3 py-2 bg-[#090f1d] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
              />
              {errors.distance && <p className="text-[11px] text-rose-400 mt-1">{errors.distance}</p>}
            </div>
          </div>
        </div>

      </div>

      {/* Global Validation Warning if any */}
      {Object.keys(errors).length > 0 && (
        <div className="rounded-xl bg-rose-500/10 border border-rose-500/30 p-3 text-xs text-rose-300 flex items-center gap-2">
          <AlertCircle size={16} className="text-rose-400 shrink-0" />
          <span>Please provide valid values for all required fields highlighted above before proceeding.</span>
        </div>
      )}

      {/* Action Buttons Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <button
          type="button"
          onClick={resetForm}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all text-xs font-semibold"
        >
          <RotateCcw size={14} />
          <span>Clear / Reset Form</span>
        </button>

        <button
          type="submit"
          disabled={loading}
          className="btn-bright-cyan w-full sm:w-80 py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(6,182,212,0.45)] hover:shadow-[0_0_35px_rgba(6,182,212,0.7)] flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:pointer-events-none"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 rounded-full border-2 border-[#00171f] border-t-transparent animate-spin"></div>
              <span>Analyzing Through Quantum Pipeline...</span>
            </>
          ) : (
            <>
              <Sparkles size={18} />
              <span>Analyze Transaction Security</span>
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>

    </form>
  )
}

