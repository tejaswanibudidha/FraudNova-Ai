import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import TransactionTable from '../components/TransactionTable'
import FraudAlert from '../components/FraudAlert'
import { getAlerts, getTransactions } from '../services/api'

export default function RealTimeMonitor(){
  const navigate = useNavigate()
  const [rows, setRows] = useState([])
  const [alert, setAlert] = useState(null)
  const [error, setError] = useState(null)

  useEffect(()=>{
    let mounted = true
    const fetchData = async ()=>{
      try{
        const res = await getTransactions()
        if(!mounted) return
        const txns = res.data && res.data.length? res.data.slice(0,5) : []
        setRows(txns.length? txns : [
          {transaction_id:'TXN1002', customer_id:'CUST1002', amount:85000, time:'10:31', risk_score:94, prediction:'Fraud', status:'High Risk', reason:'Large amount from new device'}
        ])
        const ares = await getAlerts()
        setAlert(ares.data?.[0] || null)
      }catch(err){
        if(!mounted) return
        // Check if 401 (not authenticated) - redirect to login
        if(err.response?.status === 401) {
          navigate('/')
          return
        }
        setError('FraudNova AI backend is not running. Start the Python backend on http://localhost:5000')
        // keep small demo row
        setRows(rows=> rows.length? rows : [
          {transaction_id:'TXN1002', customer_id:'CUST1002', amount:85000, time:'10:31', risk_score:94, prediction:'Fraud', status:'High Risk', reason:'Large amount from new device'}
        ])
      }
    }
    fetchData()
    const id = setInterval(fetchData, 5000)
    const onAnalyzed = ()=> fetchData()
    window.addEventListener('txn:analyzed', onAnalyzed)
    return ()=>{mounted=false; clearInterval(id); window.removeEventListener('txn:analyzed', onAnalyzed)}
  },[navigate])
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen">
        <Navbar title={`Real-Time Fraud Monitor  — LIVE 1`} />
        <main className="p-6 space-y-4">
          {error && <div className="card text-fraudred">{error}
            <div className="mt-2">
              <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={()=>{
                setError(null); (async ()=>{ try{ const res = await getTransactions(); setRows(res.data || []) }catch(e){}})()
              }}>Retry</button>
            </div>
          </div>}
          {alert && <FraudAlert txn={alert} />}
          <h3 className="font-semibold">Live Transactions</h3>
          <TransactionTable rows={rows} />
        </main>
      </div>
    </div>
  )
}
