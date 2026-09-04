import React, {useState,useMemo, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import TransactionTable from '../components/TransactionTable'
import { getTransactions } from '../services/api'

export default function TransactionHistory(){
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')
  const [rows, setRows] = useState([])

  useEffect(()=>{
    let mounted = true
    const fetchData = async ()=>{
      try{
        const res = await getTransactions()
        if(mounted) setRows(res.data || [])
      }catch(err){
        if(!mounted) return
        if(err.response?.status === 401) {
          navigate('/')
          return
        }
        // Otherwise show demo data
        if(mounted) setRows([
          {transaction_id:'TXN1001', customer_id:'CUST1001', amount:2500, merchant:'Electronics', time:'2026-08-01 10:30', risk_score:5, prediction:'Genuine', status:'Low Risk'},
          {transaction_id:'TXN1002', customer_id:'CUST1002', amount:85000, merchant:'Electronics', time:'2026-08-01 10:31', risk_score:94, prediction:'Fraud', status:'High Risk'}
        ])
      }
    }
    fetchData()
    const onAnalyzed = ()=> fetchData()
    window.addEventListener('txn:analyzed', onAnalyzed)
    return ()=>{ mounted = false; window.removeEventListener('txn:analyzed', onAnalyzed)}
  },[navigate])

  const filtered = rows.filter(r=>{
    if(filter==='Fraud' && r.prediction!=='Fraud') return false
    if(filter==='Genuine' && r.prediction!=='Genuine') return false
    if(filter==='High Risk' && r.status!=='High Risk') return false
    if(filter==='Medium Risk' && r.status!=='Medium Risk') return false
    if(filter==='Low Risk' && r.status!=='Low Risk') return false
    if(query && !(r.transaction_id.includes(query) || r.customer_id.includes(query) || (r.merchant && r.merchant.toLowerCase().includes(query.toLowerCase())))) return false
    return true
  })

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen">
        <Navbar title="Transaction History" />
        <main className="p-6 space-y-4">
          <div className="flex gap-2">
            <input placeholder="Search by Transaction ID, Customer ID, Merchant" value={query} onChange={e=>setQuery(e.target.value)} className="p-2 bg-transparent border rounded flex-1" />
            <select value={filter} onChange={e=>setFilter(e.target.value)} className="p-2 bg-transparent border rounded">
              <option>All</option>
              <option>Fraud</option>
              <option>Genuine</option>
              <option>High Risk</option>
              <option>Medium Risk</option>
              <option>Low Risk</option>
            </select>
          </div>
          <TransactionTable rows={filtered} />
        </main>
      </div>
    </div>
  )
}
