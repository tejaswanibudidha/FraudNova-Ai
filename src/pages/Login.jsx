import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Login(){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handle = async (e)=>{
    e.preventDefault()
    
    // Clear previous errors
    setError('')
    
    // Minimal validation
    if(!username || !password) {
      setError('Username and password are required')
      return
    }
    
    setLoading(true)
    try {
      // Call login API
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/login`,
        {
          username: username,
          password: password
        },
        {
          withCredentials: true  // Important for session cookies
        }
      )
      
      if(response.data.success) {
        // Login successful, navigate to dashboard
        navigate('/dashboard')
      } else {
        setError(response.data.message || 'Login failed')
      }
    } catch (err) {
      console.error('Login error:', err)
      const errorMsg = err.response?.data?.message || 'Login failed. Please try again.'
      setError(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="card p-8">
          <h1 className="text-2xl font-bold text-cyan-300">FraudNova AI</h1>
          <p className="text-sm text-gray-400 mb-6">Quantum-Enhanced Financial Fraud Detection</p>
          
          {error && (
            <div className="mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded text-red-300 text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handle} className="space-y-4">
            <div>
              <label className="text-xs text-gray-300">Username</label>
              <input 
                value={username} 
                onChange={e=>setUsername(e.target.value)} 
                disabled={loading}
                className="w-full p-2 mt-1 bg-transparent border rounded disabled:opacity-50" 
              />
              <p className="text-xs text-gray-500 mt-1">Demo: admin / admin123</p>
            </div>
            <div>
              <label className="text-xs text-gray-300">Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={e=>setPassword(e.target.value)} 
                disabled={loading}
                className="w-full p-2 mt-1 bg-transparent border rounded disabled:opacity-50" 
              />
            </div>
            <div className="flex items-center justify-between text-sm text-gray-300">
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={remember} 
                  onChange={e=>setRemember(e.target.checked)}
                  disabled={loading}
                /> 
                Remember Me
              </label>
              <a href="#" className="text-cyan-300">Forgot Password?</a>
            </div>
            <div>
              <button 
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-cyan-400 text-navy rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'LOGGING IN...' : 'LOGIN'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
