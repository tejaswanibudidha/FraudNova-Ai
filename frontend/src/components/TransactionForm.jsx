import React, { useState } from 'react'
import { Sparkles, CreditCard, Building2, Activity, ArrowRight, RotateCcw, AlertCircle } from 'lucide-react'

const initialForm = {
  amount_inr: '', account_type: 'Savings', transaction_type: 'Purchase', transaction_direction: 'Debit',
  merchant_category: 'Grocery', payment_method: 'UPI', location: 'Hyderabad', device_type: 'Mobile', network_type: '5G',
  transaction_frequency: 2, average_spending_inr: '', previous_transaction_amount_inr: '',
  distance_from_previous_location_km: '', account_balance_inr: '', credit_score: '', transaction_date: '', transaction_time: '', hour_of_day: '', day_of_week: '', is_weekend: 'No'
}

const inputClass = 'w-full px-3 py-2 bg-[#090f1d] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all'
const numberClass = `${inputClass} font-mono`

function Field({ label, name, value, onChange, error, children, type = 'text', min, max, step, className = inputClass }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-400 mb-1">{label}</label>
      {children || (
        <input 
          name={name} 
          type={type} 
          min={min} 
          max={max} 
          step={step !== undefined ? step : (type === 'number' ? 'any' : undefined)}
          value={value ?? ''} 
          onChange={onChange} 
          className={className} 
        />
      )}
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
    const { name, value } = e.target
    const nextForm = { ...form, [name]: value }
    
    if (name === 'transaction_time') {
      if (value && (nextForm.hour_of_day === '' || nextForm.hour_of_day === undefined)) {
        nextForm.hour_of_day = Number(value.slice(0, 2))
      }
    }
    
    if (name === 'transaction_date') {
      const date = value ? new Date(`${value}T00:00:00`) : null
      if (date && !isNaN(date.getTime()) && (nextForm.day_of_week === '' || nextForm.day_of_week === undefined)) {
        // Monday=1 ... Thursday=4 ... Sunday=7
        const isoDay = date.getDay() === 0 ? 7 : date.getDay()
        nextForm.day_of_week = isoDay
        nextForm.is_weekend = isoDay >= 6 ? 'Yes' : 'No'
      }
    }

    if (name === 'day_of_week') {
      const dNum = Number(value)
      if (!isNaN(dNum)) {
        nextForm.is_weekend = (dNum === 0 || dNum === 6 || dNum === 7) ? 'Yes' : 'No'
      }
    }

    setForm(nextForm)
    if (errors[name]) setErrors({ ...errors, [name]: null })
  }

  const loadTestCase = () => {
    setForm({
      amount_inr: '1000',
      account_type: 'Savings',
      transaction_type: 'Purchase',
      transaction_direction: 'Debit',
      transaction_date: '2026-09-24',
      transaction_time: '14:30',
      hour_of_day: 14,
      day_of_week: 4,
      is_weekend: 'No',
      merchant_category: 'Grocery',
      payment_method: 'UPI',
      location: 'Hyderabad',
      device_type: 'Mobile',
      network_type: '5G',
      transaction_frequency: 2,
      average_spending_inr: '1500',
      previous_transaction_amount_inr: '1200',
      distance_from_previous_location_km: '2',
      account_balance_inr: '40000',
      credit_score: '750'
    })
    setErrors({})
  }

  const resetForm = () => { setForm(initialForm); setErrors({}) }

  const validate = () => {
    const err = {}
    const numeric = (field, label, minimum = 0) => {
      if (form[field] === '' || form[field] === undefined || !Number.isFinite(Number(form[field])) || Number(form[field]) < minimum) {
        err[field] = `${label} must be ${minimum ? `at least ${minimum}` : '0 or greater'}`
      }
    }
    numeric('amount_inr', 'Amount', 1)
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
    const distance = Number(form.distance_from_previous_location_km)
    const balance = Number(form.account_balance_inr)
    const isWeekendVal = form.is_weekend === 'Yes' || form.is_weekend === 1 || form.is_weekend === '1' ? 1 : 0

    onSubmit({
      ...form,
      amount: amount,
      amount_inr: amount,
      transaction_frequency: Number(form.transaction_frequency),
      average_spending: averageSpending,
      average_spending_inr: averageSpending,
      previous_transaction_amount: previousAmount,
      previous_transaction_amount_inr: previousAmount,
      distance_from_previous_location: distance,
      distance_from_previous_location_km: distance,
      account_balance: balance,
      account_balance_inr: balance,
      credit_score: Number(form.credit_score),
      hour_of_day: Number(form.hour_of_day || (form.transaction_time ? form.transaction_time.slice(0, 2) : 14)),
      day_of_week: Number(form.day_of_week !== '' ? form.day_of_week : 4),
      is_weekend: isWeekendVal,
      time: form.transaction_time,
      transaction_time: form.transaction_time,
      amount_vs_average_ratio: averageSpending === 0 ? 0 : amount / averageSpending,
      amount_change_from_previous_ratio: previousAmount === 0 ? 0 : (amount - previousAmount) / previousAmount
    })
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-6">
      <div className="space-y-5">
        <div className="rounded-2xl bg-[#0e172a]/80 border border-white/10 p-5 shadow-lg">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/15 text-cyan-400 flex items-center justify-center"><CreditCard size={15} /></div>
              <h4 className="text-sm font-bold text-white tracking-wide">1. Transaction Basics</h4>
            </div>
            <button
              type="button"
              onClick={loadTestCase}
              className="px-3 py-1.5 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-bold hover:bg-cyan-500/25 transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(6,182,212,0.2)]"
            >
              <Sparkles size={13} />
              <span>Load Test Case (₹1000 Grocery)</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Field label="Amount (₹)" name="amount_inr" type="number" min="0" step="any" value={form.amount_inr} onChange={handle} error={errors.amount_inr} className={`${numberClass} font-bold text-cyan-300`} />
            <SelectField label="Account Type" name="account_type" value={form.account_type} onChange={handle} options={['Savings', 'Current']} error={errors.account_type} />
            <SelectField label="Transaction Type" name="transaction_type" value={form.transaction_type} onChange={handle} options={['Purchase', 'Transfer', 'Withdrawal', 'Deposit']} error={errors.transaction_type} />
            <SelectField label="Transaction Direction" name="transaction_direction" value={form.transaction_direction} onChange={handle} options={['Debit', 'Credit']} error={errors.transaction_direction} />
            <Field label="Transaction Date" name="transaction_date" type="date" value={form.transaction_date} onChange={handle} error={errors.transaction_date} />
            <Field label="Transaction Time" name="transaction_time" type="time" value={form.transaction_time} onChange={handle} error={errors.transaction_time} />
            <Field label="Hour of Day" name="hour_of_day" type="number" min="0" max="23" value={form.hour_of_day} onChange={handle} className={numberClass} />
            <Field label="Day of Week" name="day_of_week" type="number" min="0" max="7" value={form.day_of_week} onChange={handle} className={numberClass} />
            <SelectField label="Is Weekend" name="is_weekend" value={form.is_weekend} onChange={handle} options={['No', 'Yes']} />
          </div>
        </div>

        <div className="rounded-2xl bg-[#0e172a]/80 border border-white/10 p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/5">
            <div className="w-7 h-7 rounded-lg bg-purple-500/15 text-purple-400 flex items-center justify-center"><Building2 size={15} /></div>
            <h4 className="text-sm font-bold text-white tracking-wide">2. Merchant &amp; Channel Context</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <SelectField label="Merchant Category" name="merchant_category" value={form.merchant_category} onChange={handle} options={['Grocery', 'Electronics', 'Travel', 'Luxury', 'Utilities', 'Food']} error={errors.merchant_category} />
            <SelectField label="Payment Method" name="payment_method" value={form.payment_method} onChange={handle} options={['UPI', 'Credit Card', 'Debit Card', 'Net Banking', 'Wallet', 'Cash']} error={errors.payment_method} />
            <SelectField label="Location / City" name="location" value={form.location} onChange={handle} options={['Hyderabad', 'Mumbai', 'Delhi', 'Bengaluru', 'Chennai', 'Pune', 'Kolkata']} error={errors.location} />
            <SelectField label="Device Type" name="device_type" value={form.device_type} onChange={handle} options={['Mobile', 'Desktop', 'Tablet']} error={errors.device_type} />
            <SelectField label="Network Type" name="network_type" value={form.network_type} onChange={handle} options={['5G', '4G', 'WiFi', 'Public WiFi']} error={errors.network_type} />
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