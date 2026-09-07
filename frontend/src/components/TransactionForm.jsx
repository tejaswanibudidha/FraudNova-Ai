import React, { useState } from 'react'
import { Sparkles, CreditCard, Building2, Activity, ArrowRight, RotateCcw, AlertCircle } from 'lucide-react'

const initialForm = {
  amount_inr: '', account_type: 'Savings', transaction_type: 'Purchase', transaction_direction: 'Debit',
  merchant_category: 'Electronics', payment_method: 'UPI', location: 'Mumbai', device_type: 'Mobile', network_type: '4G',
  transaction_frequency: 1, average_spending_inr: '', previous_transaction_amount_inr: '',
  distance_from_previous_location_km: '', account_balance_inr: '', credit_score: '', transaction_date: '', transaction_time: '', hour_of_day: '', day_of_week: ''
}

const inputClass = 'w-full px-3 py-2 bg-[#090f1d] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all'
const numberClass = `${inputClass} font-mono`

function Field({ label, name, value, onChange, error, children, type = 'text', min, max, className = inputClass }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-400 mb-1">{label}</label>
      {children || <input name={name} type={type} min={min} max={max} value={value} onChange={onChange} className={className} />}
      {error && <p className="text-[11px] text-rose-400 mt-1">{error}</p>}
    </div>
  )
}

function SelectField({ label, name, value, onChange, options, error }) {
  return <Field label={label} name={name} value={value} onChange={onChange} error={error}>
    <select name={name} value={value} onChange={onChange} className={inputClass}>
      {options.map(option => <option key={option} value={option}>{option}</option>)}
    </select>
  </Field>
}

export default function TransactionForm({ onSubmit, loading = false }) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})

  const handle = (e) => {
    const nextForm = { ...form, [e.target.name]: e.target.value }
    if (e.target.name === 'transaction_time') {
      nextForm.hour_of_day = e.target.value ? Number(e.target.value.slice(0, 2)) : ''
    }
    if (e.target.name === 'transaction_date') {
      const date = e.target.value ? new Date(`${e.target.value}T00:00:00`) : null
      nextForm.day_of_week = date ? (date.getDay() + 6) % 7 : ''
    }
    setForm(nextForm)
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null })
  }

  const resetForm = () => { setForm(initialForm); setErrors({}) }

  const validate = () => {
    const err = {}
    const numeric = (field, label, minimum = 0) => {
      if (form[field] === '' || !Number.isFinite(Number(form[field])) || Number(form[field]) < minimum) {
        err[field] = `${label} must be ${minimum ? `at least ${minimum}` : '0 or greater'}`
      }
    }
    numeric('amount_inr', 'Amount', 0.01)
    numeric('transaction_frequency', 'Transaction frequency')
    numeric('average_spending_inr', 'Average spending')
    numeric('previous_transaction_amount_inr', 'Previous amount')
    numeric('distance_from_previous_location_km', 'Distance')
    numeric('account_balance_inr', 'Account balance')
    numeric('credit_score', 'Credit score', 300)
    if (!form.transaction_date) err.transaction_date = 'Transaction date is required'
    if (!form.transaction_time) err.transaction_time = 'Transaction time is required'
    if (Number(form.credit_score) > 850) err.credit_score = 'Credit score must be between 300 and 850'
    setErrors(err)
    return Object.keys(err).length === 0
  }

  const submit = (e) => {
    e.preventDefault()
    if (!validate()) return
    const amount = Number(form.amount_inr)
    const averageSpending = Number(form.average_spending_inr)
    const previousAmount = Number(form.previous_transaction_amount_inr)
    onSubmit({
      ...form, amount_inr: amount, transaction_frequency: Number(form.transaction_frequency), average_spending_inr: averageSpending,
      previous_transaction_amount_inr: previousAmount, distance_from_previous_location_km: Number(form.distance_from_previous_location_km),
      account_balance_inr: Number(form.account_balance_inr), credit_score: Number(form.credit_score), hour_of_day: Number(form.hour_of_day),
      day_of_week: Number(form.day_of_week), is_weekend: Number(form.day_of_week) >= 5 ? 1 : 0,
      amount_vs_average_ratio: averageSpending === 0 ? 0 : amount / averageSpending,
      amount_change_from_previous_ratio: previousAmount === 0 ? 0 : (amount - previousAmount) / previousAmount
    })
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="space-y-5">
        <div className="rounded-2xl bg-[#0e172a]/80 border border-white/10 p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/5">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/15 text-cyan-400 flex items-center justify-center"><CreditCard size={15} /></div>
            <h4 className="text-sm font-bold text-white tracking-wide">1. Transaction Basics</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Field label="Amount (₹)" name="amount_inr" type="number" min="0.01" value={form.amount_inr} onChange={handle} error={errors.amount_inr} className={`${numberClass} font-bold text-cyan-300`} />
            <SelectField label="Account Type" name="account_type" value={form.account_type} onChange={handle} options={['Savings', 'Current']} error={errors.account_type} />
            <SelectField label="Transaction Type" name="transaction_type" value={form.transaction_type} onChange={handle} options={['Purchase', 'Transfer', 'Withdrawal', 'Deposit']} error={errors.transaction_type} />
            <SelectField label="Transaction Direction" name="transaction_direction" value={form.transaction_direction} onChange={handle} options={['Debit', 'Credit']} error={errors.transaction_direction} />
            <Field label="Transaction Date" name="transaction_date" type="date" value={form.transaction_date} onChange={handle} error={errors.transaction_date} />
            <Field label="Transaction Time" name="transaction_time" type="time" value={form.transaction_time} onChange={handle} error={errors.transaction_time} />
            <Field label="Hour of Day"><input readOnly value={form.hour_of_day} className={`${numberClass} text-gray-400`} /></Field>
            <Field label="Day of Week (0–6)"><input readOnly value={form.day_of_week} className={`${inputClass} text-gray-400`} /></Field>
            <Field label="Is Weekend"><input readOnly value={Number(form.day_of_week) >= 5 ? 'Yes' : 'No'} className={`${inputClass} text-gray-400`} /></Field>
          </div>
        </div>

        <div className="rounded-2xl bg-[#0e172a]/80 border border-white/10 p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/5">
            <div className="w-7 h-7 rounded-lg bg-purple-500/15 text-purple-400 flex items-center justify-center"><Building2 size={15} /></div>
            <h4 className="text-sm font-bold text-white tracking-wide">2. Merchant &amp; Channel Context</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <SelectField label="Merchant Category" name="merchant_category" value={form.merchant_category} onChange={handle} options={['Electronics', 'Grocery', 'Travel', 'Luxury', 'Utilities', 'Food']} error={errors.merchant_category} />
            <SelectField label="Payment Method" name="payment_method" value={form.payment_method} onChange={handle} options={['UPI', 'Credit Card', 'Debit Card', 'Net Banking', 'Wallet', 'Cash']} error={errors.payment_method} />
            <SelectField label="Location / City" name="location" value={form.location} onChange={handle} options={['Mumbai', 'Delhi', 'Bengaluru', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata']} error={errors.location} />
            <SelectField label="Device Type" name="device_type" value={form.device_type} onChange={handle} options={['Mobile', 'Desktop', 'Tablet']} error={errors.device_type} />
            <SelectField label="Network Type" name="network_type" value={form.network_type} onChange={handle} options={['4G', '5G', 'WiFi', 'Public WiFi']} error={errors.network_type} />
          </div>
        </div>

        <div className="rounded-2xl bg-[#0e172a]/80 border border-white/10 p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/5">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center"><Activity size={15} /></div>
            <h4 className="text-sm font-bold text-white tracking-wide">3. Behavioral &amp; Financial Profile</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Field label="Transaction Frequency (24h)" name="transaction_frequency" type="number" min="0" value={form.transaction_frequency} onChange={handle} error={errors.transaction_frequency} className={numberClass} />
            <Field label="Average Spending (₹)" name="average_spending_inr" type="number" min="0" value={form.average_spending_inr} onChange={handle} error={errors.average_spending_inr} className={numberClass} />
            <Field label="Previous Transaction Amount (₹)" name="previous_transaction_amount_inr" type="number" min="0" value={form.previous_transaction_amount_inr} onChange={handle} error={errors.previous_transaction_amount_inr} className={numberClass} />
            <Field label="Distance from Previous Location (km)" name="distance_from_previous_location_km" type="number" min="0" value={form.distance_from_previous_location_km} onChange={handle} error={errors.distance_from_previous_location_km} className={numberClass} />
            <Field label="Account Balance (₹)" name="account_balance_inr" type="number" min="0" value={form.account_balance_inr} onChange={handle} error={errors.account_balance_inr} className={numberClass} />
            <Field label="Credit Score" name="credit_score" type="number" min="300" max="850" value={form.credit_score} onChange={handle} error={errors.credit_score} className={numberClass} />
          </div>
        </div>
      </div>

      {Object.keys(errors).length > 0 && <div className="rounded-xl bg-rose-500/10 border border-rose-500/30 p-3 text-xs text-rose-300 flex items-center gap-2"><AlertCircle size={16} className="text-rose-400 shrink-0" /><span>Please provide valid values for all required fields highlighted above before proceeding.</span></div>}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <button type="button" onClick={resetForm} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all text-xs font-semibold"><RotateCcw size={14} /><span>Clear / Reset Form</span></button>
        <button type="submit" disabled={loading} className="btn-bright-cyan w-full sm:w-80 py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(6,182,212,0.45)] hover:shadow-[0_0_35px_rgba(6,182,212,0.7)] flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:pointer-events-none">
          {loading ? <><div className="w-5 h-5 rounded-full border-2 border-[#00171f] border-t-transparent animate-spin"></div><span>Analyzing Through Quantum Pipeline...</span></> : <><Sparkles size={18} /><span>Analyze Transaction Security</span><ArrowRight size={16} /></>}
        </button>
      </div>
    </form>
  )
}