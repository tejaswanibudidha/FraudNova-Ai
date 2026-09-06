import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../services/api'
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react'
import FraudNovaLogo from '../components/FraudNovaLogo'

export default function Register() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    mail: '',
    pass: '',
    confirmPass: ''
  })

  const [showPass, setShowPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const { name, mail, pass, confirmPass } = formData

    // Validation
    if (!name.trim()) {
      setError('Please enter your full name.')
      return
    }

    if (!mail.trim() || !mail.includes('@') || !mail.includes('.')) {
      setError('Please enter a valid email address.')
      return
    }

    if (!pass) {
      setError('Please enter a password.')
      return
    }

    if (pass.length < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }

    if (pass !== confirmPass) {
      setError('Passwords do not match. Please verify.')
      return
    }

    setLoading(true)

    try {
      const response = await register({
        name: name.trim(),
        email: mail.trim(),
        password: pass,
        role: 'analyst'
      })

      if (response.data?.success) {
        setSuccess('Account created successfully! Redirecting to dashboard...')
        setTimeout(() => {
          navigate('/dashboard')
        }, 1200)
      } else {
        setError(response.data?.message || 'Registration failed. Please try again.')
      }
    } catch (err) {
      console.error('Registration error:', err)
      const errorMsg =
        err.response?.data?.message || 'Registration failed. Please check your details and try again.'
      setError(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-[#070d19] text-white">
      {/* Dynamic ambient background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10 my-8">
        <div className="bg-[#0e172a]/90 backdrop-blur-2xl border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-cyan-950/40">
          {/* Header */}
          <div className="text-center mb-6">
            <FraudNovaLogo size="lg" className="mb-5" />
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Create Account
            </h1>
            <p className="text-sm text-gray-300 mt-1">
              Join the FraudNova AI Detection Platform
            </p>
          </div>

          {/* Feedback alerts */}
          {error && (
            <div className="mb-5 p-3.5 bg-rose-500/20 border border-rose-500/40 rounded-xl text-rose-200 text-sm flex items-start gap-2.5 shadow-sm">
              <AlertCircle size={18} className="shrink-0 mt-0.5 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-5 p-3.5 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-200 text-sm flex items-start gap-2.5 shadow-sm">
              <CheckCircle2 size={18} className="shrink-0 mt-0.5 text-emerald-400" />
              <span>{success}</span>
            </div>
          )}

          {/* Form with 4 stacked fields one-by-one below */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 1. Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-200 mb-1.5 uppercase tracking-wider">
                Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cyan-400">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  disabled={loading}
                  className="w-full pl-10 pr-3.5 py-3 bg-[#0a101d] border border-white/15 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition shadow-inner"
                />
              </div>
            </div>

            {/* 2. Mail */}
            <div>
              <label className="block text-xs font-semibold text-gray-200 mb-1.5 uppercase tracking-wider">
                Mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cyan-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  name="mail"
                  value={formData.mail}
                  onChange={handleChange}
                  placeholder="name@organization.com"
                  required
                  disabled={loading}
                  className="w-full pl-10 pr-3.5 py-3 bg-[#0a101d] border border-white/15 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition shadow-inner"
                />
              </div>
            </div>

            {/* 3. Pass */}
            <div>
              <label className="block text-xs font-semibold text-gray-200 mb-1.5 uppercase tracking-wider">
                Pass
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cyan-400">
                  <Lock size={18} />
                </div>
                <input
                  type={showPass ? 'text' : 'password'}
                  name="pass"
                  value={formData.pass}
                  onChange={handleChange}
                  placeholder="Enter password (min. 6 characters)"
                  required
                  disabled={loading}
                  className="w-full pl-10 pr-11 py-3 bg-[#0a101d] border border-white/15 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-cyan-400 hover:text-cyan-300 transition"
                  title={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* 4. Confirm Pass */}
            <div>
              <label className="block text-xs font-semibold text-gray-200 mb-1.5 uppercase tracking-wider">
                Confirm Pass
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cyan-400">
                  <Lock size={18} />
                </div>
                <input
                  type={showConfirmPass ? 'text' : 'password'}
                  name="confirmPass"
                  value={formData.confirmPass}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  disabled={loading}
                  className="w-full pl-10 pr-11 py-3 bg-[#0a101d] border border-white/15 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-cyan-400 hover:text-cyan-300 transition"
                  title={showConfirmPass ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {formData.confirmPass && (
                <div className="text-xs flex items-center gap-1.5 mt-1.5">
                  {formData.pass === formData.confirmPass ? (
                    <span className="text-emerald-400 font-medium flex items-center gap-1">
                      <CheckCircle2 size={13} /> Passwords match
                    </span>
                  ) : (
                    <span className="text-amber-400 font-medium flex items-center gap-1">
                      <AlertCircle size={13} /> Passwords do not match
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Bright, Highly Visible Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-[#00F5FF] via-[#06B6D4] to-[#00E5FF] hover:from-[#38BDF8] hover:to-[#00F5FF] active:scale-[0.99] text-[#030712] font-extrabold text-base tracking-wide rounded-xl shadow-[0_0_25px_rgba(6,182,212,0.65)] hover:shadow-[0_0_35px_rgba(6,182,212,0.9)] flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="animate-pulse">Creating Account...</span>
                ) : (
                  <>
                    <span>REGISTER ACCOUNT</span>
                    <ArrowRight size={18} className="stroke-[2.5]" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Navigation to Login with bright visible link */}
          <div className="mt-6 pt-5 border-t border-white/10 text-center text-sm text-gray-300">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-[#00F5FF] hover:text-cyan-200 font-bold transition inline-flex items-center gap-1 hover:underline underline-offset-4 drop-shadow-[0_0_8px_rgba(0,245,255,0.5)]"
            >
              Sign In Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
