import { useState } from 'react'
import { Link } from 'react-router-dom'

const stats = [
  { 
    label: 'Applications Sent', 
    value: '247', 
    change: '+32 this week',
    trend: 'up',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
      </svg>
    ),
    color: 'from-emerald-500 to-cyan-500',
  },
  { 
    label: 'Interview Invites', 
    value: '18', 
    change: '+5 this week',
    trend: 'up',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
      </svg>
    ),
    color: 'from-purple-500 to-pink-500',
  },
  { 
    label: 'Response Rate', 
    value: '7.3%', 
    change: '+1.2% vs avg',
    trend: 'up',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
      </svg>
    ),
    color: 'from-amber-500 to-orange-500',
  },
  { 
    label: 'Cover Letters', 
    value: '89', 
    change: 'AI Generated',
    trend: 'neutral',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
      </svg>
    ),
    color: 'from-blue-500 to-indigo-500',
  },
]

const recentApplications = [
  { id: 1, company: 'Google', role: 'Senior Software Engineer', status: 'Applied', date: '2 hours ago', logo: 'G' },
  { id: 2, company: 'Meta', role: 'Full Stack Developer', status: 'Viewed', date: '5 hours ago', logo: 'M' },
  { id: 3, company: 'Amazon', role: 'Backend Engineer', status: 'Interview', date: '1 day ago', logo: 'A' },
  { id: 4, company: 'Microsoft', role: 'Software Engineer II', status: 'Applied', date: '1 day ago', logo: 'M' },
  { id: 5, company: 'Apple', role: 'iOS Developer', status: 'Rejected', date: '2 days ago', logo: 'A' },
]

const quickActions = [
  { 
    title: 'Start Auto-Apply', 
    description: 'Let AI apply to 50+ jobs matching your profile',
    icon: '⚡',
    color: 'from-emerald-500 to-cyan-500',
    link: '/applymate/auto-apply',
  },
  { 
    title: 'Search Jobs', 
    description: 'Find jobs on SEEK, LinkedIn, Indeed & more',
    icon: '🔍',
    color: 'from-purple-500 to-pink-500',
    link: '/applymate/search',
  },
  { 
    title: 'Generate Cover Letter', 
    description: 'AI-powered cover letters in seconds',
    icon: '✍️',
    color: 'from-amber-500 to-orange-500',
    link: '/applymate/cover-letters',
  },
  { 
    title: 'Update Resume', 
    description: 'Tailor your resume for each application',
    icon: '📄',
    color: 'from-blue-500 to-indigo-500',
    link: '/applymate/resume',
  },
]

export default function ApplyMateDashboard() {
  const [autoApplyStatus, setAutoApplyStatus] = useState('idle') // idle, running, paused

  const getStatusColor = (status) => {
    switch (status) {
      case 'Applied': return 'bg-blue-500/20 text-blue-400'
      case 'Viewed': return 'bg-purple-500/20 text-purple-400'
      case 'Interview': return 'bg-emerald-500/20 text-emerald-400'
      case 'Rejected': return 'bg-red-500/20 text-red-400'
      case 'Offer': return 'bg-amber-500/20 text-amber-400'
      default: return 'bg-slate-500/20 text-slate-400'
    }
  }

  return (
    <div className="p-4 lg:p-8 bg-slate-900 min-h-screen">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
          Welcome back! 👋
        </h1>
        <p className="text-slate-400">
          Your AI job hunting assistant is ready. Let's land your dream job.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="bg-slate-800 rounded-2xl p-5 border border-slate-700 hover:border-slate-600 transition-all"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 text-white`}>
              {stat.icon}
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-sm text-slate-400 mb-1">{stat.label}</p>
            <p className={`text-xs ${stat.trend === 'up' ? 'text-emerald-400' : 'text-slate-500'}`}>
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className="group bg-slate-800 rounded-2xl p-5 border border-slate-700 hover:border-emerald-500/50 transition-all hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform`}>
                  {action.icon}
                </div>
                <h3 className="text-white font-semibold mb-1">{action.title}</h3>
                <p className="text-sm text-slate-400">{action.description}</p>
              </Link>
            ))}
          </div>

          {/* Auto-Apply Status Card */}
          <div className="mt-6 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-2xl p-6 border border-emerald-500/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Auto-Apply Engine</h3>
                  <p className="text-sm text-slate-400">
                    {autoApplyStatus === 'running' ? 'Currently applying to jobs...' : 'Ready to start'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {autoApplyStatus === 'running' && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/20 rounded-full">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-sm text-emerald-400">Running</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              {autoApplyStatus === 'idle' ? (
                <button 
                  onClick={() => setAutoApplyStatus('running')}
                  className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all"
                >
                  Start Auto-Apply
                </button>
              ) : (
                <>
                  <button 
                    onClick={() => setAutoApplyStatus('paused')}
                    className="flex-1 py-3 bg-slate-700 text-white font-semibold rounded-xl hover:bg-slate-600 transition-all"
                  >
                    Pause
                  </button>
                  <button 
                    onClick={() => setAutoApplyStatus('idle')}
                    className="flex-1 py-3 bg-red-500/20 text-red-400 font-semibold rounded-xl hover:bg-red-500/30 transition-all"
                  >
                    Stop
                  </button>
                </>
              )}
              <Link
                to="/applymate/auto-apply"
                className="px-4 py-3 bg-slate-700 text-white rounded-xl hover:bg-slate-600 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Applications */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Recent Applications</h2>
            <Link to="/applymate/applications" className="text-sm text-emerald-400 hover:text-emerald-300">
              View all
            </Link>
          </div>
          <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
            {recentApplications.map((app, index) => (
              <div 
                key={app.id}
                className={`p-4 flex items-center gap-4 hover:bg-slate-700/50 transition-colors ${
                  index !== recentApplications.length - 1 ? 'border-b border-slate-700' : ''
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center text-white font-bold">
                  {app.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{app.company}</p>
                  <p className="text-sm text-slate-400 truncate">{app.role}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(app.status)}`}>
                    {app.status}
                  </span>
                  <p className="text-xs text-slate-500 mt-1">{app.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/20">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl shrink-0">
            💡
          </div>
          <div>
            <h3 className="text-white font-semibold mb-1">Pro Tip</h3>
            <p className="text-slate-400 text-sm">
              Applications sent between 6-10 AM on Tuesday have the highest response rate. 
              Schedule your auto-apply sessions accordingly for best results!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

