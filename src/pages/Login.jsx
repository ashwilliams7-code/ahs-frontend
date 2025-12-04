import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signIn(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 via-primary-700 to-indigo-900 p-12 flex-col justify-between relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-accent-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <span className="text-white font-bold text-2xl">A</span>
            </div>
            <div>
              <h1 className="font-bold text-white text-2xl tracking-tight">AHS</h1>
              <p className="text-primary-200 text-sm">Automate Human Services</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <h2 className="text-4xl font-bold text-white mb-4">
            Streamline Your NDIS Operations
          </h2>
          <p className="text-primary-100 text-lg">
            Invoicing, rostering, and compliance automation powered by AI. Save hours every week and focus on what matters most - your clients.
          </p>
        </div>

        <div className="relative flex items-center gap-8">
          <div className="text-center">
            <p className="text-3xl font-bold text-white">98%</p>
            <p className="text-primary-200 text-sm">Accuracy</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">&lt;5s</p>
            <p className="text-primary-200 text-sm">Processing</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">10hr</p>
            <p className="text-primary-200 text-sm">Saved/Week</p>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="lg:hidden flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">A</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
            <p className="text-gray-500 mt-2">Sign in to your AHS account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl shadow-lg shadow-primary-200 hover:shadow-xl hover:shadow-primary-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="spinner w-5 h-5 border-2 border-white/20 border-t-white"></div>
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-primary-600 hover:text-primary-500">
              Sign up for free
            </Link>
          </p>

          {/* Demo credentials hint */}
          <div className="mt-6 p-4 bg-primary-50 border border-primary-100 rounded-xl">
            <p className="text-sm text-primary-700 text-center">
              <strong>Demo:</strong> Use any email/password to explore the app
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

