import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../services/api'
import { User, Lock, Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react'
import FraudNovaLogo from '../components/FraudNovaLogo'

export default function Login() {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('admin123')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handle = async (e) => {
    e.preventDefault()
    setError('')

    if (!username.trim() || !password) {
      setError('Username and password are required.')
      return
    }

    setLoading(true)
    try {
      const response = await login(username.trim(), password)

      if (response.data?.success) {
        navigate('/dashboard')
      } else {
        setError(response.data?.message || 'Invalid username or password.')
      }
    } catch (err) {
      console.error('Login error:', err)
      const errorMsg =
        err.response?.data?.message || 'Login failed. Please verify your credentials and server status.'
      setError(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-[#070d19] text-white">
      {/* Background glow effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10 my-8">
        <div className="bg-[#0e172a]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-cyan-950/30">
          {/* Header */}
          <div className="mb-7">
            <FraudNovaLogo size="lg" />
          </div>

          {/* Feedback error alert */}
          {error && (
            <div className="mb-5 p-3.5 bg-rose-500/15 border border-rose-500/30 rounded-xl text-rose-300 text-sm flex items-start gap-2.5">
              <AlertCircle size={18} className="shrink-0 mt-0.5 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handle} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1.5">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                  disabled={loading}
                  className="w-full pl-9 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Default demo: admin / admin123</p>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <Lock size={16} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  disabled={loading}
                  className="w-full pl-9 pr-10 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  disabled={loading}
                  className="rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-0 focus:ring-offset-0"
                />
                <span>Remember this workstation</span>
              </label>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-[#00F5FF] via-[#06B6D4] to-[#00E5FF] hover:from-[#38BDF8] hover:to-[#00F5FF] active:scale-[0.99] text-[#030712] font-extrabold text-base tracking-wide rounded-xl shadow-[0_0_25px_rgba(6,182,212,0.65)] hover:shadow-[0_0_35px_rgba(6,182,212,0.9)] flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="animate-pulse">Authenticating...</span>
                ) : (
                  <>
                    <LogIn size={18} className="stroke-[2.5]" />
                    <span>SIGN IN TO PLATFORM</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Navigation to Register */}
          <div className="mt-6 pt-5 border-t border-white/10 text-center text-sm text-gray-300">
            Don't have an analyst account?{' '}
            <Link
              to="/register"
              className="text-[#00F5FF] hover:text-cyan-200 font-bold transition inline-flex items-center gap-1 hover:underline underline-offset-4 drop-shadow-[0_0_8px_rgba(0,245,255,0.5)]"
            >
              Register Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

