import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const apps = [
  {
    id: 'ahs',
    name: 'NDISHub',
    tagline: 'Smart NDIS Management',
    description: 'NDIS invoicing, rostering, and compliance automation powered by AI. Save hours every week.',
    icon: 'N',
    gradient: 'from-indigo-500 via-purple-500 to-indigo-600',
    shadowColor: 'shadow-indigo-500/30',
    hoverShadow: 'hover:shadow-indigo-500/40',
    bgPattern: 'bg-indigo-500',
    stats: [
      { label: 'Accuracy', value: '98%' },
      { label: 'Time Saved', value: '10hr/wk' },
    ],
    features: ['Invoice Generation', 'Smart Rostering', 'Compliance Tracking', 'Sales Automation'],
    route: '/dashboard',
    available: true,
  },
  {
    id: 'applymate',
    name: 'ApplyMate',
    tagline: 'AI Job Application Assistant',
    description: 'Automate your job search with AI-powered applications, cover letters, and interview prep.',
    icon: '⚡',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    shadowColor: 'shadow-emerald-500/30',
    hoverShadow: 'hover:shadow-emerald-500/40',
    bgPattern: 'bg-emerald-500',
    stats: [
      { label: 'Applications', value: '50+/day' },
      { label: 'Success Rate', value: '3x' },
    ],
    features: ['Auto-Apply', 'AI Cover Letters', 'Resume Tailoring', 'Interview Prep'],
    route: '/applymate',
    available: true,
  },
]

export default function AppSelector() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  const handleAppSelect = (app) => {
    if (app.available) {
      navigate(app.route)
    }
  }

  const getInitials = (email) => {
    if (!email) return 'U'
    const parts = email.split('@')[0].split('.')
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase()
    }
    return email.substring(0, 2).toUpperCase()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <div>
              <h1 className="font-bold text-white text-lg tracking-tight">AutoAI Hub</h1>
              <p className="text-slate-400 text-xs">Your AI Automation Platform</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">{getInitials(user?.email)}</span>
              </div>
              <span className="text-white/80 text-sm hidden sm:block">{user?.email?.split('@')[0]}</span>
            </div>
            <button
              onClick={signOut}
              className="px-4 py-2 text-slate-400 hover:text-white text-sm font-medium transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero section */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Choose Your{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI App
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Select an application to get started. Each AI agent is designed to automate and enhance your workflow.
            </p>
          </div>

          {/* App cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {apps.map((app, index) => (
              <div
                key={app.id}
                onClick={() => handleAppSelect(app)}
                className={`
                  relative group rounded-3xl p-1 transition-all duration-500
                  ${app.available ? 'cursor-pointer' : 'cursor-default'}
                  animate-fade-in-up
                `}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Gradient border */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${app.gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-500 blur-sm`}></div>
                
                {/* Card content */}
                <div className={`
                  relative bg-slate-900/90 backdrop-blur-xl rounded-3xl p-8 h-full
                  border border-white/10 group-hover:border-white/20
                  shadow-2xl ${app.shadowColor} group-hover:${app.hoverShadow}
                  transition-all duration-500
                  ${app.available ? 'group-hover:-translate-y-2' : 'opacity-80'}
                `}>
                  {/* Coming soon badge */}
                  {app.comingSoon && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full shadow-lg shadow-amber-500/30">
                        Coming Soon
                      </span>
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`
                    w-16 h-16 rounded-2xl bg-gradient-to-br ${app.gradient}
                    flex items-center justify-center mb-6
                    shadow-xl ${app.shadowColor}
                    group-hover:scale-110 transition-transform duration-500
                  `}>
                    <span className="text-white font-bold text-2xl">{app.icon}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-1">{app.name}</h3>
                  <p className={`text-sm font-medium bg-gradient-to-r ${app.gradient} bg-clip-text text-transparent mb-4`}>
                    {app.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-slate-400 mb-6 leading-relaxed">
                    {app.description}
                  </p>

                  {/* Stats */}
                  <div className="flex gap-6 mb-6">
                    {app.stats.map((stat) => (
                      <div key={stat.label}>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                        <p className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {app.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 text-xs font-medium text-slate-300 bg-white/5 border border-white/10 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    disabled={!app.available}
                    className={`
                      w-full py-4 rounded-xl font-semibold text-white
                      transition-all duration-300
                      ${app.available 
                        ? `bg-gradient-to-r ${app.gradient} shadow-lg ${app.shadowColor} hover:shadow-xl group-hover:shadow-2xl`
                        : 'bg-slate-700/50 cursor-not-allowed text-slate-400'
                      }
                    `}
                  >
                    {app.available ? (
                      <span className="flex items-center justify-center gap-2">
                        Launch {app.name}
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                        </svg>
                      </span>
                    ) : (
                      'Coming Soon'
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom info */}
          <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <p className="text-slate-500 text-sm">
              More AI agents coming soon • 
              <a href="mailto:support@autoaihub.io" className="text-indigo-400 hover:text-indigo-300 ml-1">
                Request a feature
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

