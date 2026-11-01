import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
} from 'lucide-react'

function AuthPage({ mode = 'signin' }) {
  const navigate = useNavigate()
  const isSignup = mode === 'signup'

  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
  })

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError('')
    setMessage('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setMessage('')

    try {
      const savedAccount = JSON.parse(
        localStorage.getItem('drBeautyAccount') || 'null'
      )

      if (isSignup) {
        if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.password.trim()) {
          setError('Please complete all required fields.')
          return
        }

        const account = {
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim().toLowerCase(),
        }

        localStorage.setItem('drBeautyAccount', JSON.stringify(account))
        localStorage.setItem('drBeautyLoggedIn', 'true')

        setMessage('Account created successfully! Welcome to DR Beauty Salon.')
        setTimeout(() => navigate('/'), 1200)
      } else {
        if (!savedAccount) {
          setError('No demo account found. Please create an account first.')
          return
        }

        if (savedAccount.email !== formData.email.trim().toLowerCase()) {
          setError('Email not found. Please check your email or sign up.')
          return
        }

        localStorage.setItem('drBeautyLoggedIn', 'true')
        setMessage('Demo login successful! Welcome back.')
        setTimeout(() => navigate('/'), 1200)
      }
    } catch {
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-purple-50/70 px-4 py-12">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl shadow-purple-100 md:grid-cols-2">

        {/* Left panel */}
        <div className="relative hidden overflow-hidden bg-linear-to-br from-purple-950 via-purple-800 to-purple-600 p-10 text-white md:flex md:flex-col md:justify-between">
          <div className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-pink-300/10 blur-3xl" />

          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                <Sparkles size={26} />
              </div>
              <span className="text-xl font-bold">DR Beauty Salon</span>
            </div>

            <div className="mt-24">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-200">
                Beauty & Self-Care
              </p>
              <h1 className="mt-5 text-4xl font-bold leading-tight">
                Your Beauty Journey Starts Here.
              </h1>
              <p className="mt-6 text-sm leading-7 text-white">
                Discover beauty services, explore special offers and request your next appointment with ease.
              </p>
            </div>
          </div>

          <div className="relative rounded-2xl border border-white/15 bg-white/10 p-5">
            <Sparkles className="mb-3 text-pink-200" size={24} />
            <p className="font-semibold">Feel Beautiful. Feel Confident.</p>
            <p className="mt-2 text-sm text-purple-100">Your personal beauty experience awaits.</p>
          </div>
        </div>

        {/* Form panel */}
        <div className="p-6 sm:p-10 lg:p-12">
          <div className="mb-8 text-center md:text-left">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-700 md:mx-0">
              <Sparkles size={28} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              {isSignup ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="mt-3 text-sm text-gray-600">
              {isSignup ? 'Create your demo customer account.' : 'Sign in to your demo customer account.'}
            </p>
          </div>

          {message && (
            <div role="status" className="mb-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
              {message}
            </div>
          )}

          {error && (
            <div role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>

            {isSignup && (
              <>
                <div>
                  <label htmlFor="auth-name" className="mb-2 block text-sm font-semibold text-gray-700">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                      id="auth-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      autoComplete="name"
                      required
                      className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 text-gray-900 placeholder:text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="auth-phone" className="mb-2 block text-sm font-semibold text-gray-700">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                      id="auth-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="01XXXXXXXXX"
                      pattern="[0-9]{11}"
                      title="Enter an 11-digit phone number"
                      autoComplete="tel"
                      inputMode="numeric"
                      required
                      className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 text-gray-900 placeholder:text-gray-500"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label htmlFor="auth-email" className="mb-2 block text-sm font-semibold text-gray-700">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  id="auth-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  autoComplete="email"
                  required
                  className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 text-gray-900 placeholder:text-gray-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="auth-password" className="mb-2 block text-sm font-semibold text-gray-700">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  id="auth-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete={isSignup ? 'new-password' : 'current-password'}
                  minLength={6}
                  required
                  className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-12 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 text-gray-900 placeholder:text-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-gray-500 hover:text-purple-700"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Minimum 6 characters. Demo only; password is not saved.
              </p>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-700 px-6 py-3.5 font-semibold text-white shadow-lg shadow-purple-200 transition hover:bg-purple-800"
            >
              {isSignup ? 'Create Account' : 'Sign In'}
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-7 text-center text-sm text-gray-600">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}
            <button
              type="button"
              onClick={() => navigate(isSignup ? '/signin' : '/signup')}
              className="ml-2 font-bold text-purple-700 hover:text-purple-900"
            >
              {isSignup ? 'Sign In' : 'Sign Up'}
            </button>
          </div>

          <p className="mt-7 text-center text-xs leading-5 text-gray-500">
            Frontend demo authentication only. Do not use a real password. No secure account verification is provided.
          </p>
        </div>
      </div>
    </main>
  )
}

export default AuthPage