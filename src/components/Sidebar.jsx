import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Home, Shield, Clock, List, Activity, Info, LogOut } from 'lucide-react'

const items = [
  {to:'/dashboard', label:'Dashboard', icon:Home},
  {to:'/detect', label:'Fraud Detection', icon:Shield},
  {to:'/monitor', label:'Real-Time Monitor', icon:Clock},
  {to:'/history', label:'Transaction History', icon:List},
  {to:'/shap', label:'SHAP Explainability', icon:Activity},
  {to:'/about', label:'About', icon:Info}
]

export default function Sidebar(){
  const navigate = useNavigate()
  return (
    <aside className="w-72 min-h-screen p-6 border-r border-white/5">
      <div className="mb-8">
        <h1 className="text-cyan-400 font-bold text-xl">FraudNova AI</h1>
        <p className="text-xs text-gray-400">Quantum-Enhanced Financial Fraud Detection</p>
      </div>
      <nav className="space-y-2">
        {items.map((it)=>{
          const Icon = it.icon
          return (
            <NavLink key={it.to} to={it.to} className={({isActive})=>`flex items-center gap-3 p-3 rounded-md hover:bg-white/2 ${isActive? 'bg-white/5' : 'text-gray-300'}`}>
              <Icon size={18} className="text-cyan-300" />
              <span>{it.label}</span>
            </NavLink>
          )
        })}
      </nav>
      <div className="mt-8">
        <button onClick={()=>navigate('/login')} className="w-full flex items-center gap-2 p-2 rounded bg-[rgba(255,77,109,0.12)] text-fraudred">
          <LogOut size={16}/> Logout
        </button>
      </div>
    </aside>
  )
}
