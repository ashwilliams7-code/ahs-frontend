import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Landing() {
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [showDemo, setShowDemo] = useState(false)
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
    { value: '500+', label: 'SMBs Automated' },
    { value: '10,000+', label: 'Hours Saved' },
    { value: '3x', label: 'Efficiency Boost' },
    { value: '24/7', label: 'AI Working' },
  ]

  const testimonials = [
    {
      quote: "NDISHub cut our admin time by 80%. We went from drowning in paperwork to actually growing our business.",
      author: "Sarah M.",
      role: "NDIS Provider, Brisbane",
      avatar: "S",
    },
    {
      quote: "As a small business, we couldn't afford a full HR team. ApplyMate found us 3 quality hires in a month.",
      author: "Michael R.",
      role: "Director, Tech Startup",
      avatar: "M",
    },
    {
      quote: "Finally, AI tools built for Australian businesses. The compliance features alone saved us thousands.",
      author: "Jessica L.",
      role: "Operations Manager, SME",
      avatar: "J",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Animated Background - Simplified for mobile */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Desktop: Full animated blobs */}
        <div className="hidden md:block">
          <div className="absolute top-0 -left-40 w-80 h-80 bg-purple-500/30 rounded-full blur-[128px] blob animate-float-slow"></div>
          <div className="absolute top-1/3 -right-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-[128px] blob animate-float-reverse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-500/20 rounded-full blur-[128px] blob animate-float-slow" style={{ animationDelay: '2s' }}></div>
        </div>
        {/* Mobile: Static gradient - much lighter */}
        <div className="md:hidden absolute inset-0 bg-gradient-to-br from-purple-500/10 via-slate-950 to-emerald-500/10"></div>
        {/* Grid pattern - hidden on mobile */}
        <div className="hidden md:block absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 group cursor-pointer">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 md:group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-base sm:text-lg">AI</span>
            </div>
            <div>
              <span className="font-bold text-base sm:text-xl md:group-hover:text-indigo-400 transition-colors block leading-tight">AutoAI Hub</span>
              <span className="text-[8px] sm:text-[10px] text-slate-400 block leading-tight">A Williams Group Company</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-300 hover:text-white transition-colors">Features</a>
            <a href="#apps" className="text-slate-300 hover:text-white transition-colors">Apps</a>
            <a href="#testimonials" className="text-slate-300 hover:text-white transition-colors">Testimonials</a>
            <a href="#about" className="text-slate-300 hover:text-white transition-colors">About</a>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setShowLogin(true)}
              className="px-3 sm:px-5 py-2 text-slate-300 hover:text-white transition-colors font-medium text-sm sm:text-base"
            >
              Sign In
            </button>
            <button
              onClick={() => setShowSignup(true)}
              className="px-3 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/30 transition-all text-sm sm:text-base"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-20 pb-32">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 animate-[fadeIn_0.6s_ease-out]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-sm text-slate-300">Now with GPT-4 powered automation</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight animate-[fadeIn_0.8s_ease-out]">
            Custom AI Solutions for{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Australian
            </span>
            <br />Small & Medium Business
          </h1>
          
          <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 px-2 animate-[fadeIn_1s_ease-out]">
            Tailored AI automation built specifically for Australian SMBs. From NDIS providers to growing businesses — automate your operations, hire smarter, and scale faster with intelligent solutions that work.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-[fadeIn_1.2s_ease-out]">
            <button
              onClick={() => setShowSignup(true)}
              className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-semibold text-lg hover:opacity-90 active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2 animate-[glow_2s_ease-in-out_infinite] shadow-lg shadow-indigo-500/30"
              style={{ animation: 'glow 2s ease-in-out infinite' }}
            >
              Start Free Trial
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1 animate-[bounceX_1s_ease-in-out_infinite]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </button>
            <button 
              onClick={() => setShowDemo(true)}
              className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-semibold text-lg hover:bg-white/10 active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className={`text-center animate-slide-up animate-delay-${(index + 4) * 100}`}>
                <p className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-slate-500 mt-1 text-xs sm:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apps Showcase */}
      <section id="apps" className="relative z-10 px-6 py-24 bg-gradient-to-b from-transparent to-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Your AI-Powered Business Suite</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              10 powerful applications designed to automate and scale your Australian business
            </p>
          </div>

          {/* Main Apps */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* NDISHub Card */}
            <div className="group relative rounded-3xl p-1 transition-transform duration-200 md:hover:-translate-y-2 active:scale-[0.98]">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 opacity-50 group-active:opacity-70 md:group-hover:opacity-100 transition-opacity duration-200"></div>
              <div className="relative bg-slate-900/95 rounded-3xl p-6 sm:p-8 border border-white/10 group-active:border-indigo-500/50 md:group-hover:border-indigo-500/50 transition-colors h-full">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-6 text-xl sm:text-2xl shadow-lg shadow-indigo-500/30 animate-[float_3s_ease-in-out_infinite] hover:animate-[spin_0.5s_ease-in-out]"
                  style={{ animation: 'float 3s ease-in-out infinite' }}
                >
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
                  className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-semibold hover:opacity-90 active:scale-[0.97] transition-all duration-150"
                >
                  Try NDISHub
                </button>
              </div>
            </div>

            {/* ApplyMate Card */}
            <div className="group relative rounded-3xl p-1 transition-transform duration-200 md:hover:-translate-y-2 active:scale-[0.98]">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500 to-cyan-500 opacity-50 group-active:opacity-70 md:group-hover:opacity-100 transition-opacity duration-200"></div>
              <div className="relative bg-slate-900/95 rounded-3xl p-6 sm:p-8 border border-white/10 group-active:border-emerald-500/50 md:group-hover:border-emerald-500/50 transition-colors h-full">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center mb-6 text-xl sm:text-2xl shadow-lg shadow-emerald-500/30 animate-[float_3s_ease-in-out_infinite]"
                  style={{ animation: 'float 3s ease-in-out infinite', animationDelay: '0.5s' }}
                >
                  <span className="animate-pulse">⚡</span>
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
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl font-semibold hover:opacity-90 active:scale-[0.97] transition-all duration-150"
                >
                  Try ApplyMate
                </button>
              </div>
            </div>
          </div>

          {/* Coming Soon Apps - Same style as main apps */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
              {[
                { icon: '📝', name: 'ResumeAI', tagline: 'Fully Automated Resume Builder', desc: 'AI builds your entire resume automatically. Just input your experience once — our AI optimizes, formats, and tailors it for every job application.', features: ['100% Automated', 'ATS Optimized', 'One-Click Export', 'AI Tailoring'], color: 'from-violet-500 to-purple-500', textColor: 'text-violet-400' },
                { icon: '🎯', name: 'InterviewAI', tagline: 'AI Interview Automation', desc: 'Fully automated interview prep. AI conducts mock interviews, analyzes your responses in real-time, and coaches you to perfection — zero manual effort.', features: ['Auto Mock Interviews', 'AI Feedback', 'Voice Analysis', 'Auto Scoring'], color: 'from-blue-500 to-cyan-500', textColor: 'text-cyan-400' },
                { icon: '✉️', name: 'EmailAI', tagline: 'Fully Automated Email Assistant', desc: 'Never write an email again. AI reads context, drafts perfect responses, schedules follow-ups, and manages your inbox completely on autopilot.', features: ['Auto-Drafting', 'Smart Replies', 'Auto Follow-ups', 'Inbox Zero'], color: 'from-rose-500 to-pink-500', textColor: 'text-pink-400' },
                { icon: '📅', name: 'MeetingAI', tagline: 'Fully Automated Meeting Notes', desc: 'AI joins your meetings automatically, transcribes everything, generates summaries, extracts action items, and sends follow-ups — you just show up.', features: ['Auto-Join', 'Live Transcription', 'AI Summaries', 'Auto Actions'], color: 'from-amber-500 to-orange-500', textColor: 'text-amber-400' },
                { icon: '📱', name: 'SocialAI', tagline: 'Fully Automated Social Media', desc: 'Complete autopilot for social media. AI creates content, designs graphics, schedules posts, engages with followers, and grows your audience 24/7.', features: ['Auto Content', 'Auto Posting', 'Auto Engage', 'Auto Growth'], color: 'from-pink-500 to-rose-500', textColor: 'text-rose-400' },
                { icon: '✍️', name: 'ContentAI', tagline: 'Fully Automated Content Creation', desc: 'AI writes your blogs, articles, and marketing copy automatically. Set your topics and schedule — wake up to fresh, SEO-optimized content daily.', features: ['Auto Writing', 'Auto SEO', 'Auto Publishing', 'Brand Voice AI'], color: 'from-teal-500 to-emerald-500', textColor: 'text-emerald-400' },
                { icon: '💼', name: 'SalesAI', tagline: 'Fully Automated Sales Pipeline', desc: 'AI runs your entire sales process. Automated prospecting, personalized outreach, intelligent follow-ups, and deal tracking — sales on complete autopilot.', features: ['Auto Prospecting', 'Auto Outreach', 'Auto Follow-up', 'Auto CRM'], color: 'from-indigo-500 to-blue-500', textColor: 'text-blue-400' },
                { icon: '💰', name: 'FinanceAI', tagline: 'Fully Automated Finance Manager', desc: 'AI manages your finances automatically. Auto-categorizes expenses, generates reports, forecasts budgets, and prepares tax documents — zero spreadsheets.', features: ['Auto Tracking', 'Auto Reports', 'Auto Forecast', 'Auto Tax Prep'], color: 'from-green-500 to-emerald-500', textColor: 'text-green-400' },
              ].map((app, i) => (
                <div 
                  key={i} 
                  className="group relative rounded-3xl p-1 transition-transform duration-200 cursor-not-allowed opacity-70 hover:opacity-85 active:scale-[0.98]"
                >
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${app.color} opacity-40 group-hover:opacity-60 transition-opacity duration-200`}></div>
                  <div className="relative bg-slate-900/95 rounded-3xl p-6 sm:p-8 border border-white/10 group-hover:border-white/20 transition-colors h-full">
                    <div 
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center mb-6 text-xl sm:text-2xl shadow-lg opacity-80 animate-[float_3s_ease-in-out_infinite]`}
                      style={{ animationDelay: `${i * 0.2}s` }}
                    >
                      <span className="animate-pulse">{app.icon}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{app.name}</h3>
                    <p className={`${app.textColor} font-medium mb-3 sm:mb-4`}>{app.tagline}</p>
                    <p className="text-slate-400 text-sm sm:text-base mb-4 sm:mb-6">{app.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                      {app.features.map((feature) => (
                        <span key={feature} className={`px-2 sm:px-3 py-1 bg-white/5 ${app.textColor} rounded-full text-xs sm:text-sm border border-white/10`}>
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className={`w-full py-3 bg-gradient-to-r ${app.color} opacity-50 rounded-xl font-semibold text-center text-white/80`}>
                      Coming 2026
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* App Screenshots/Previews */}
          <div className="mt-16 mb-20">
            <h3 className="text-2xl font-bold text-center mb-12">See Our Apps in Action</h3>
            
            {/* NDISHub Preview */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">N</div>
                <h4 className="text-xl font-semibold text-white">NDISHub Dashboard</h4>
              </div>
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-indigo-500/10">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-600/5"></div>
                {/* Mock Dashboard UI */}
                <div className="relative bg-slate-900/95 p-6">
                  {/* Mock Header */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/20"></div>
                      <div className="h-4 w-32 bg-white/10 rounded"></div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-8 w-8 rounded-full bg-white/10"></div>
                      <div className="h-8 w-24 rounded-lg bg-indigo-500/30"></div>
                    </div>
                  </div>
                  {/* Mock Stats Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-6">
                    {[
                      { label: 'Total Revenue', value: '$124,500', color: 'from-indigo-500 to-purple-500', change: '+12%' },
                      { label: 'Active Workers', value: '48', color: 'from-emerald-500 to-cyan-500', change: '+3' },
                      { label: 'Pending Invoices', value: '12', color: 'from-amber-500 to-orange-500', change: '-2' },
                      { label: 'Compliance Score', value: '98%', color: 'from-pink-500 to-rose-500', change: '+1%' },
                    ].map((stat, i) => (
                      <div key={i} className="bg-white/5 rounded-xl p-2 sm:p-4 border border-white/5">
                        <p className="text-[10px] sm:text-xs text-slate-500 mb-1">{stat.label}</p>
                        <p className={`text-lg sm:text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>{stat.value}</p>
                        <p className="text-[10px] sm:text-xs text-emerald-400 mt-1">{stat.change}</p>
                      </div>
                    ))}
                  </div>
                  {/* Mock Chart Area */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2 bg-white/5 rounded-xl p-3 sm:p-4 border border-white/5 h-32 sm:h-48">
                      <div className="h-3 sm:h-4 w-20 sm:w-24 bg-white/10 rounded mb-3 sm:mb-4"></div>
                      <div className="flex items-end gap-1 sm:gap-2 h-20 sm:h-32">
                        {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                          <div key={i} className="flex-1 bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t opacity-70" style={{ height: `${h}%` }}></div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 sm:p-4 border border-white/5 hidden sm:block">
                      <div className="h-4 w-20 bg-white/10 rounded mb-4"></div>
                      <div className="space-y-3">
                        {['Invoice #1234', 'Invoice #1235', 'Invoice #1236'].map((inv, i) => (
                          <div key={i} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                            <span className="text-xs text-slate-400">{inv}</span>
                            <span className="text-xs text-emerald-400">Paid</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ApplyMate Preview */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white text-xl">⚡</div>
                <h4 className="text-xl font-semibold text-white">ApplyMate Auto-Apply</h4>
              </div>
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-emerald-500/10">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5"></div>
                {/* Mock ApplyMate UI */}
                <div className="relative bg-slate-900/95 p-6">
                  {/* Mock Header */}
                  <div className="flex items-center justify-between mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-white/10">
                    <div className="flex items-center gap-2 sm:gap-4">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-emerald-500/20"></div>
                      <div className="h-3 sm:h-4 w-16 sm:w-28 bg-white/10 rounded"></div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-[10px] sm:text-xs text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="hidden sm:inline">Auto-Apply Active</span>
                        <span className="sm:hidden">Active</span>
                      </span>
                      <div className="h-6 w-12 sm:h-8 sm:w-20 rounded-lg bg-red-500/30 flex items-center justify-center text-[10px] sm:text-xs text-red-400">Stop</div>
                    </div>
                  </div>
                  {/* Mock Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-6">
                    {[
                      { label: 'Jobs Applied', value: '47', color: 'from-emerald-500 to-cyan-500' },
                      { label: 'Interviews', value: '8', color: 'from-blue-500 to-indigo-500' },
                      { label: 'Response Rate', value: '32%', color: 'from-amber-500 to-orange-500' },
                      { label: 'Today\'s Target', value: '50', color: 'from-pink-500 to-rose-500' },
                    ].map((stat, i) => (
                      <div key={i} className="bg-white/5 rounded-xl p-2 sm:p-4 border border-white/5">
                        <p className="text-[10px] sm:text-xs text-slate-500 mb-1">{stat.label}</p>
                        <p className={`text-lg sm:text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>{stat.value}</p>
                      </div>
                    ))}
                  </div>
                  {/* Mock Job Cards */}
                  <div className="space-y-2 sm:space-y-3">
                    {[
                      { title: 'Senior React Developer', company: 'TechCorp', status: 'Applied', time: '2m ago' },
                      { title: 'Full Stack Engineer', company: 'StartupXYZ', status: 'Applied', time: '5m ago' },
                      { title: 'Frontend Developer', company: 'DigitalAgency', status: 'Applying...', time: 'Now' },
                    ].map((job, i) => (
                      <div key={i} className="flex items-center justify-between p-2 sm:p-4 bg-white/5 rounded-xl border border-white/5">
                        <div className="flex items-center gap-2 sm:gap-4">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-sm sm:text-lg">🏢</div>
                          <div>
                            <p className="font-medium text-white text-sm sm:text-base truncate max-w-[120px] sm:max-w-none">{job.title}</p>
                            <p className="text-[10px] sm:text-xs text-slate-500">{job.company}</p>
                          </div>
                        </div>
                        <div className="text-right ml-2">
                          <p className={`text-xs sm:text-sm ${job.status === 'Applying...' ? 'text-amber-400' : 'text-emerald-400'}`}>{job.status}</p>
                          <p className="text-[10px] sm:text-xs text-slate-500">{job.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Australian SMBs Choose Us</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Powerful AI solutions built for the way Australian businesses actually work
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-slate-800/50 rounded-2xl p-4 sm:p-6 border border-slate-700 hover:border-slate-600 active:border-slate-500 active:scale-[0.98] transition-all duration-150 md:hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3 sm:mb-4 text-lg sm:text-xl`}>
                  {feature.icon}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-xs sm:text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="relative z-10 px-6 py-24 bg-gradient-to-b from-transparent to-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Loved by Australian Businesses</h2>
            <p className="text-slate-400 text-lg">See what our SMB clients have to say</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-slate-800/50 rounded-2xl p-5 sm:p-6 border border-slate-700 hover:border-slate-600 active:border-amber-500/30 active:scale-[0.98] transition-all duration-150 md:hover:-translate-y-1"
              >
                <div className="flex items-center gap-1 mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-slate-300 mb-4 italic text-sm sm:text-base">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm sm:text-base">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm sm:text-base">{testimonial.author}</p>
                    <p className="text-slate-500 text-xs sm:text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="relative z-10 px-6 py-24 bg-gradient-to-b from-slate-900/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          {/* Williams Group Banner */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-6">
              <span className="text-sm text-indigo-400 font-medium">A Williams Group Company</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">About Us</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Innovation meets execution — building the future of AI automation
            </p>
          </div>

          {/* Three Column Layout */}
          <div className="grid md:grid-cols-3 gap-4 sm:gap-8 mb-16">
            {/* Williams Group */}
            <div className="bg-slate-800/50 rounded-2xl p-5 sm:p-8 border border-slate-700 hover:border-slate-600 active:border-indigo-500/30 active:scale-[0.98] transition-all duration-150 md:hover:-translate-y-1 group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4 sm:mb-6 text-xl sm:text-2xl shadow-lg shadow-indigo-500/20 md:group-hover:scale-110 transition-transform duration-300">
                🏢
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Williams Group</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Williams Group is a multi-venture Australian enterprise focused on building high-performance companies across technology, automation, media, consulting, and digital commerce.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                We specialise in creating systems-driven businesses that scale fast — from AI automation and innovation labs to content production, education brands, and commercial partnerships.
              </p>
              <div className="mt-6 pt-6 border-t border-slate-700">
                <p className="text-indigo-400 text-sm font-medium italic">
                  "Be smarter, be faster, and deliver real-world results."
                </p>
              </div>
            </div>

            {/* Our Company */}
            <div className="bg-slate-800/50 rounded-2xl p-5 sm:p-8 border border-slate-700 hover:border-slate-600 active:border-emerald-500/30 active:scale-[0.98] transition-all duration-150 md:hover:-translate-y-1 group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center mb-4 sm:mb-6 text-xl sm:text-2xl shadow-lg shadow-emerald-500/20 md:group-hover:scale-110 transition-transform duration-300">
                🚀
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                We're part of Williams Group's innovation and growth division, dedicated to building practical, high-impact solutions for modern businesses.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Our focus is simple: turn complexity into clarity, and problems into automated systems that save time and generate growth.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Whether it's AI-driven processes, strategic consulting, sales enablement, digital products, or full-service automation — we execute with precision, speed, and a no-nonsense approach.
              </p>
              <div className="mt-6 pt-6 border-t border-slate-700">
                <p className="text-emerald-400 text-sm font-medium italic">
                  "Results first, excuses never."
                </p>
              </div>
            </div>

            {/* Founder */}
            <div className="bg-slate-800/50 rounded-2xl p-5 sm:p-8 border border-slate-700 hover:border-slate-600 active:border-amber-500/30 active:scale-[0.98] transition-all duration-150 md:hover:-translate-y-1 group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-4 sm:mb-6 text-xl sm:text-2xl shadow-lg shadow-amber-500/20 md:group-hover:scale-110 transition-transform duration-300">
                👤
              </div>
              <h3 className="text-xl font-bold text-white mb-4">The Founder</h3>
              <p className="text-lg font-semibold text-white mb-3">Ash Williams</p>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Ash Williams is the founder and driving force behind Williams Group — a builder, strategist, and operator who specialises in turning ideas into functioning businesses.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                With a background in consulting, project management, aviation, AI systems, and business development, Ash blends real-world experience with a sharp, technical edge.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Known for tackling big problems with simple, elegant solutions — and for pushing every project toward growth, automation, and long-term scalability.
              </p>
              <div className="mt-6 pt-6 border-t border-slate-700">
                <p className="text-amber-400 text-sm font-medium italic">
                  "Build fast, iterate smarter, stay three steps ahead."
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="text-center">
            <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-slate-300 text-sm">Proudly Australian • Built for Scale • Powered by AI</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden md:hover:border-indigo-500/30 transition-all duration-300">
            {/* Desktop only: Animated gradient background */}
            <div className="hidden md:block">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
              <p className="text-slate-400 text-base sm:text-lg mb-8">
                Join hundreds of Australian SMBs saving time and scaling faster with custom AI automation.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => setShowSignup(true)}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-semibold text-lg hover:opacity-90 active:scale-[0.97] transition-all duration-150"
                >
                  Start Free — No Credit Card
                </button>
              </div>
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
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
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

      {/* Demo Video Modal */}
      {showDemo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowDemo(false)}></div>
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setShowDemo(false)}
              className="absolute -top-12 right-0 text-white/70 hover:text-white flex items-center gap-2 text-sm"
            >
              Close
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <div className="relative pt-[56.25%] rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/20 border border-white/10">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/rA6Ml2qalUw?autoplay=1&rel=0&modestbranding=1&playsinline=1"
                title="AutoAI Hub Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                allowFullScreen
              ></iframe>
            </div>
            <p className="text-center text-slate-400 mt-4 text-sm">See how AutoAI Hub can transform your workflow</p>
          </div>
        </div>
      )}
    </div>
  )
}

