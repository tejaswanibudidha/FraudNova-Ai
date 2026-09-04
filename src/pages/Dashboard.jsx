import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import StatCard from '../components/StatCard'
import FraudTrendChart from '../components/FraudTrendChart'
import MerchantChart from '../components/MerchantChart'
import TransactionTable from '../components/TransactionTable'
import { getDashboard, getTransactions } from '../services/api'

const DEMO_TXNS = [
  {transaction_id:'TXN1001', customer_id:'CUST1001', amount:2500, merchant:'Electronics', time:'10:30', risk_score:5, prediction:'Genuine', status:'Low Risk', location:'Mumbai'},
  {transaction_id:'TXN1002', customer_id:'CUST1002', amount:85000, merchant:'Electronics', time:'10:31', risk_score:94, prediction:'Fraud', status:'High Risk', location:'Delhi'},
  {transaction_id:'TXN1003', customer_id:'CUST1003', amount:1200, merchant:'Grocery', time:'10:32', risk_score:8, prediction:'Genuine', status:'Low Risk', location:'Mumbai'},
  {transaction_id:'TXN1004', customer_id:'CUST1004', amount:4500, merchant:'Travel', time:'10:33', risk_score:12, prediction:'Genuine', status:'Low Risk', location:'Bengaluru'},
  {transaction_id:'TXN1005', customer_id:'CUST1005', amount:65000, merchant:'Luxury', time:'10:34', risk_score:88, prediction:'Fraud', status:'High Risk', location:'Chennai'}
]

export default function Dashboard(){
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [rows, setRows] = useState(DEMO_TXNS)

  useEffect(()=>{
    let mounted = true
    const fetchData = async ()=>{
      try{
        const res = await getDashboard()
        if(!mounted) return
        if(res.data){
          setData(res.data)
          // use returned recent transactions if present
          if(res.data.recent_transactions && res.data.recent_transactions.length>0){
            setRows(res.data.recent_transactions)
          }
        }
        const tres = await getTransactions()
        if(!mounted) return
        if(tres.data && tres.data.length>0) setRows(tres.data)
      }catch(err){
        if(!mounted) return
        // Check if 401 (not authenticated) - redirect to login
        if(err.response?.status === 401) {
          navigate('/')
          return
        }
        // Otherwise keep demo data
        console.log('Using demo data - backend unavailable')
      }
    }
    fetchData()

    const onAnalyzed = ()=> fetchData()
    window.addEventListener('txn:analyzed', onAnalyzed)

    return ()=>{ mounted = false; window.removeEventListener('txn:analyzed', onAnalyzed) }
  },[navigate])

  const txns = rows || []

  // prefer backend-provided stats when available
  const total = data?.total_transactions ?? txns.length
  const fraud = data?.fraud_transactions ?? txns.filter(t=>t.prediction==='Fraud').length
  const genuine = data?.genuine_transactions ?? txns.filter(t=>t.prediction==='Genuine').length
  const rate = data?.fraud_rate ?? (total? Math.round((fraud/total)*10000)/100 : 0)

  // trend and merchant data: prefer backend fields
  const trend = data?.fraud_trends ?? txns.map((t,i)=> ({time: t.time || `T${i+1}`, fraud: t.prediction==='Fraud'?1:0, genuine: t.prediction==='Genuine'?1:0}))
  const merchants = data?.fraud_by_merchant ?? Object.entries(txns.reduce((acc,t)=>{acc[t.merchant]=(acc[t.merchant]||0)+1;return acc},{ } )).map(([name,value])=>({name, value}))

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen">
        <Navbar title="FraudNova AI Dashboard" />
        <main className="p-6 space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <StatCard label="Total Transactions" value={total} />
            <StatCard label="Fraud Detected" value={fraud} />
            <StatCard label="Genuine Transactions" value={genuine} />
            <StatCard label="Fraud Detection Rate" value={`${rate}%`} />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <FraudTrendChart data={trend} />
            <MerchantChart data={merchants} />
            <div className="card"> 
              <h4 className="font-semibold">Fraud vs Genuine Transactions</h4>
              <div className="mt-4 text-sm text-gray-300">{data? 'Live data from backend' : 'Demo Data (shown because backend is unavailable)'}.</div>
            </div>
          </div>

          <div>
            <h3 className="mb-3 font-semibold">Recent Transactions</h3>
            <TransactionTable rows={txns} />
          </div>
        </main>
      </div>
    </div>
  )
}
