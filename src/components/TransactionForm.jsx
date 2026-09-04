import React, {useState} from 'react'

export default function TransactionForm({onSubmit, loading=false}){
  const [form, setForm] = useState({
    transaction_id: '', customer_id:'', amount:'', time:'', merchant:'', payment_method:'', location:'', device:'', transaction_frequency:1, average_spending:'', previous_amount:'', distance:''
  })
  const [errors, setErrors] = useState({})

  const handle = (e)=> setForm({...form, [e.target.name]: e.target.value})

  const validate = ()=>{
    const err = {}
    if(!form.transaction_id) err.transaction_id = 'Transaction ID is required'
    if(!form.customer_id) err.customer_id = 'Customer ID is required'
    if(!form.amount || isNaN(Number(form.amount))) err.amount = 'Valid amount is required'
    if(!form.time) err.time = 'Time is required'
    if(!form.merchant) err.merchant = 'Merchant category is required'
    if(!form.payment_method) err.payment_method = 'Payment method is required'
    if(!form.location) err.location = 'Location is required'
    if(!form.device) err.device = 'Device type is required'
    if(form.transaction_frequency==='' || isNaN(Number(form.transaction_frequency))) err.transaction_frequency = 'Valid frequency is required'
    if(form.average_spending==='' || isNaN(Number(form.average_spending))) err.average_spending = 'Valid average spending is required'
    if(form.previous_amount==='' || isNaN(Number(form.previous_amount))) err.previous_amount = 'Valid previous amount is required'
    if(form.distance==='' || isNaN(Number(form.distance))) err.distance = 'Valid distance is required'
    setErrors(err)
    return Object.keys(err).length===0
  }

  const submit = (e)=>{
    e.preventDefault()
    if(!validate()) return
    onSubmit(form)
  }

  return (
    <form onSubmit={submit} className="card space-y-3">
      <h3 className="font-semibold">Analyze Transaction</h3>
      <div className="grid grid-cols-2 gap-3">
        <input name="transaction_id" onChange={handle} placeholder="Transaction ID" className="p-2 bg-transparent border rounded" />
        <input name="customer_id" onChange={handle} placeholder="Customer ID" className="p-2 bg-transparent border rounded" />
        <input name="amount" onChange={handle} placeholder="Amount" className="p-2 bg-transparent border rounded" />
        <input name="time" onChange={handle} placeholder="Time" className="p-2 bg-transparent border rounded" />
        <input name="merchant" onChange={handle} placeholder="Merchant Category" className="p-2 bg-transparent border rounded" />
        <input name="payment_method" onChange={handle} placeholder="Payment Method" className="p-2 bg-transparent border rounded" />
        <input name="location" onChange={handle} placeholder="Location" className="p-2 bg-transparent border rounded" />
        <input name="device" onChange={handle} placeholder="Device Type" className="p-2 bg-transparent border rounded" />
        <input name="transaction_frequency" onChange={handle} placeholder="Transaction Frequency" className="p-2 bg-transparent border rounded" />
        <input name="average_spending" onChange={handle} placeholder="Average Spending" className="p-2 bg-transparent border rounded" />
        <input name="previous_amount" onChange={handle} placeholder="Previous Transaction Amount" className="p-2 bg-transparent border rounded" />
        <input name="distance" onChange={handle} placeholder="Distance From Previous Location" className="p-2 bg-transparent border rounded" />
      </div>
      {Object.keys(errors).length>0 && (
        <div className="text-sm text-fraudred">
          {Object.values(errors).map((m,i)=>(<div key={i}>{m}</div>))}
        </div>
      )}
      <div className="mt-4 flex justify-center">
        <button disabled={loading} type="submit" className={`px-6 py-3 ${loading? 'bg-blue-400':'bg-blue-600'} text-white rounded-lg hover:bg-blue-700 transition-colors w-72 flex items-center justify-center gap-2`}>
          <span>🔍</span>
          <span>{loading? 'Analyzing Transaction...' : 'Analyze Transaction'}</span>
        </button>
      </div>
    </form>
  )
}
