import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Landing() {
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email, password)
      navigate('/apps')
    } catch (err) {
      setError(err.message || 'Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signUp(email, password)
      navigate('/apps')
    } catch (err) {
      setError(err.message || 'Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  const features = [
    {
      icon: '⚡',
      title: 'NDISHub',
      description: 'Automate NDIS invoicing, rostering, and compliance with AI-powered tools.',
      color: 'from-indigo-500 to-purple-600',
    },
    {
      icon: '🚀',
      title: 'ApplyMate',
      description: 'AI job application assistant that applies to 50+ jobs per day automatically.',
      color: 'from-emerald-500 to-cyan-500',
    },
    {
      icon: '🤖',
      title: 'AI-Powered',
      description: 'GPT-4 generates cover letters, answers screening questions, and tailors resumes.',
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: '📊',
      title: 'Analytics',
      description: 'Track performance, response rates, and optimize your workflow with insights.',
      color: 'from-pink-500 to-rose-500',
    },
  ]

  const stats = [
    { value: '10,000+', label: 'Applications Sent' },
    { value: '98%', label: 'ATS Pass Rate' },
    { value: '3x', label: 'Interview Rate' },
    { value: '24/7', label: 'AI Automation' },
  ]

  const testimonials = [
    {
      quote: "ApplyMate landed me 5 interviews in my first week. Game changer!",
      author: "Sarah M.",
      role: "Software Engineer",
      avatar: "S",
    },
    {
      quote: "NDISHub cut our invoicing time from 10 hours to 30 minutes.",
      author: "Michael R.",
      role: "NDIS Provider",
      avatar: "M",
    },
    {
      quote: "The AI cover letters are incredibly personalized. Can't tell they're AI.",
      author: "Jessica L.",
      role: "Project Manager",
      avatar: "J",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-purple-500/30 rounded-full blur-[128px] animate-pulse"></div>
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <span className="font-bold text-xl">AutoAI Hub</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-300 hover:text-white transition-colors">Features</a>
            <a href="#apps" className="text-slate-300 hover:text-white transition-colors">Apps</a>
            <a href="#testimonials" className="text-slate-300 hover:text-white transition-colors">Testimonials</a>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowLogin(true)}
              className="px-5 py-2 text-slate-300 hover:text-white transition-colors font-medium"
            >
              Sign In
            </button>
            <button
              onClick={() => setShowSignup(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
            >
              Get Started Free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-20 pb-32">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-sm text-slate-300">Now with GPT-4 powered automation</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Automate Your{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Work & Career
            </span>
            <br />with AI
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            From NDIS provider automation to AI-powered job applications. 
            Let our intelligent agents handle the repetitive work while you focus on what matters.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={() => setShowSignup(true)}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-indigo-500/30 transition-all flex items-center justify-center gap-2"
            >
              Start Free Trial
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-slate-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apps Showcase */}
      <section id="apps" className="relative z-10 px-6 py-24 bg-gradient-to-b from-transparent to-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Your AI-Powered Suite</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Two powerful applications designed to automate your professional life
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* NDISHub Card */}
            <div className="group relative rounded-3xl p-1 transition-all duration-500">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 opacity-50 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl p-8 border border-white/10 group-hover:border-white/20 transition-all h-full">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-6 text-2xl shadow-xl shadow-indigo-500/30 group-hover:scale-110 transition-transform">
                  N
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">NDISHub</h3>
                <p className="text-indigo-400 font-medium mb-4">Smart NDIS Management</p>
                <p className="text-slate-400 mb-6">
                  Automate invoicing, rostering, compliance tracking, and more. 
                  Built specifically for NDIS providers who want to save 10+ hours per week.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['Invoicing', 'Rostering', 'Compliance', 'Sales', 'Marketing'].map((feature) => (
                    <span key={feature} className="px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-sm border border-indigo-500/20">
                      {feature}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setShowSignup(true)}
                  className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
                >
                  Try NDISHub
                </button>
              </div>
            </div>

            {/* ApplyMate Card */}
            <div className="group relative rounded-3xl p-1 transition-all duration-500">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500 to-cyan-500 opacity-50 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl p-8 border border-white/10 group-hover:border-white/20 transition-all h-full">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center mb-6 text-2xl shadow-xl shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                  ⚡
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">ApplyMate</h3>
                <p className="text-emerald-400 font-medium mb-4">AI Job Application Assistant</p>
                <p className="text-slate-400 mb-6">
                  Automate your job search with AI that applies to 50+ jobs daily, 
                  generates tailored cover letters, and answers screening questions.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['Auto-Apply', 'AI Cover Letters', 'Resume Builder', 'Job Tracking'].map((feature) => (
                    <span key={feature} className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-sm border border-emerald-500/20">
                      {feature}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setShowSignup(true)}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/30 transition-all"
                >
                  Try ApplyMate
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose AutoAI Hub?</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Powerful features designed to supercharge your productivity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-slate-600 transition-all hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 text-xl`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="relative z-10 px-6 py-24 bg-gradient-to-b from-transparent to-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Loved by Professionals</h2>
            <p className="text-slate-400 text-lg">See what our users have to say</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-slate-300 mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-white font-medium">{testimonial.author}</p>
                    <p className="text-slate-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl p-12 border border-white/10 backdrop-blur-sm">
            <h2 className="text-4xl font-bold mb-4">Ready to Automate?</h2>
            <p className="text-slate-400 text-lg mb-8">
              Join thousands of professionals saving hours every week with AI automation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setShowSignup(true)}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-indigo-500/30 transition-all"
              >
                Start Free — No Credit Card
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="font-semibold">AutoAI Hub</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
            <p className="text-sm text-slate-500">© 2024 AutoAI Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowLogin(false)}></div>
          <div className="relative bg-slate-900 rounded-3xl p-8 w-full max-w-md border border-slate-700 shadow-2xl">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">AI</span>
              </div>
              <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
              <p className="text-slate-400 mt-1">Sign in to your account</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 disabled:opacity-50 transition-all"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-400">
              Don't have an account?{' '}
              <button
                onClick={() => { setShowLogin(false); setShowSignup(true); }}
                className="text-indigo-400 hover:text-indigo-300 font-medium"
              >
                Sign up free
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowSignup(false)}></div>
          <div className="relative bg-slate-900 rounded-3xl p-8 w-full max-w-md border border-slate-700 shadow-2xl">
            <button
              onClick={() => setShowSignup(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">AI</span>
              </div>
              <h2 className="text-2xl font-bold text-white">Create Account</h2>
              <p className="text-slate-400 mt-1">Start your free trial today</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 disabled:opacity-50 transition-all"
              >
                {loading ? 'Creating account...' : 'Create Free Account'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-400">
              Already have an account?{' '}
              <button
                onClick={() => { setShowSignup(false); setShowLogin(true); }}
                className="text-indigo-400 hover:text-indigo-300 font-medium"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

