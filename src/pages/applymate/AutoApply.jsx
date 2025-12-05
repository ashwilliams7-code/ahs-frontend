import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

const API_URL = import.meta.env.VITE_BACKEND_URL || 'https://ahs-backend.onrender.com'

export default function AutoApply() {
  const { session } = useAuth()
  const [sessionData, setSessionData] = useState({
    status: 'idle',
    jobs_found: 0,
    jobs_applied: 0,
    jobs_skipped: 0,
    current_job: null,
    current_company: null,
    error_message: null
  })
  const [applications, setApplications] = useState([])
  const [activityLog, setActivityLog] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [error, setError] = useState(null)
  const pollInterval = useRef(null)
  const logContainerRef = useRef(null)

  // Activity log helper
  const addLogEntry = (message, type = 'info') => {
    setActivityLog(prev => {
      const newLog = [
        { id: Date.now(), message, type, timestamp: new Date().toISOString() },
        ...prev.slice(0, 49) // Keep last 50 entries
      ]
      return newLog
    })
  }

  // Load session and applications on mount
  useEffect(() => {
    loadData()
    return () => {
      if (pollInterval.current) clearInterval(pollInterval.current)
    }
  }, [])

  // Poll for updates when running
  useEffect(() => {
    if (sessionData.status === 'running' || sessionData.status === 'paused') {
      pollInterval.current = setInterval(loadSession, 2000)
    } else {
      if (pollInterval.current) clearInterval(pollInterval.current)
    }
    return () => {
      if (pollInterval.current) clearInterval(pollInterval.current)
    }
  }, [sessionData.status])

  const loadData = async () => {
    await Promise.all([loadSession(), loadApplications()])
    setLoading(false)
  }

  const loadSession = async () => {
    try {
      const res = await fetch(`${API_URL}/api/applymate/session`, {
        headers: { 
          'Authorization': `Bearer ${session?.access_token}`,
          'Content-Type': 'application/json'
        }
      })
      if (res.ok) {
        const data = await res.json()
        setError(null) // Clear any previous errors
        
        // Add log entries based on status changes
        if (data.status === 'running') {
          if (data.current_job && data.current_job !== sessionData.current_job) {
            addLogEntry(`📋 Found job: ${data.current_job}`, 'job')
            addLogEntry(`🤖 Analyzing job requirements...`, 'info')
            setTimeout(() => addLogEntry(`✍️ Generating tailored cover letter...`, 'info'), 1500)
            setTimeout(() => addLogEntry(`📤 Submitting application...`, 'info'), 3000)
          }
          if (data.jobs_applied > sessionData.jobs_applied) {
            setTimeout(() => addLogEntry(`✅ Successfully applied! (${data.jobs_applied} total)`, 'success'), 4000)
            setTimeout(() => addLogEntry(`🔍 Searching for next job...`, 'info'), 5000)
          }
          if (data.jobs_skipped > sessionData.jobs_skipped) {
            addLogEntry(`⏭️ Skipped job (already applied or blocked)`, 'warning')
          }
        }
        
        setSessionData(data)
      }
    } catch (err) {
      console.error('Failed to load session:', err)
      if (sessionData.status === 'running') {
        addLogEntry('⚠️ Connection interrupted, retrying...', 'warning')
      }
      // Only show error on initial load, not during polling
      if (loading) {
        setError('Failed to connect to server. Please refresh the page.')
      }
    }
  }

  const loadApplications = async () => {
    try {
      const res = await fetch(`${API_URL}/api/applymate/applications`, {
        headers: { 'Authorization': `Bearer ${session?.access_token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setApplications(data.slice(0, 10)) // Show last 10
      }
    } catch (err) {
      console.error('Failed to load applications:', err)
    }
  }

  const handleStart = async () => {
    setActionLoading(true)
    setError(null)
    setActivityLog([]) // Clear previous log
    addLogEntry('🚀 Starting Auto-Apply session...', 'start')
    addLogEntry('🔧 Loading your settings...', 'info')
    try {
      const res = await fetch(`${API_URL}/api/applymate/start`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${session?.access_token}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: 'Server error' }))
        addLogEntry(`❌ Error: ${data.error || 'Failed to start'}`, 'error')
        throw new Error(data.error || 'Failed to start automation')
      }
      
      const data = await res.json()
      addLogEntry('✅ Settings loaded successfully', 'success')
      addLogEntry('🌐 Launching browser in stealth mode...', 'info')
      setTimeout(() => addLogEntry('🔗 Connecting to SEEK...', 'info'), 1000)
      setTimeout(() => addLogEntry('🔐 Logging into your account...', 'info'), 2500)
      setTimeout(() => addLogEntry('🔍 Starting job search...', 'info'), 4000)
      await loadSession()
    } catch (err) {
      const errorMsg = err.message === 'Failed to fetch' 
        ? 'Cannot connect to server. Please check your internet connection.'
        : err.message
      setError(errorMsg)
      addLogEntry(`❌ ${errorMsg}`, 'error')
    } finally {
      setActionLoading(false)
    }
  }

  const handlePause = async () => {
    setActionLoading(true)
    addLogEntry('⏸️ Pausing automation...', 'info')
    try {
      await fetch(`${API_URL}/api/applymate/pause`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${session?.access_token}` }
      })
      addLogEntry('⏸️ Auto-Apply paused', 'warning')
      await loadSession()
    } catch (err) {
      console.error('Pause error:', err)
      addLogEntry('❌ Failed to pause', 'error')
    } finally {
      setActionLoading(false)
    }
  }

  const handleResume = async () => {
    setActionLoading(true)
    addLogEntry('▶️ Resuming automation...', 'info')
    try {
      await fetch(`${API_URL}/api/applymate/resume`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${session?.access_token}` }
      })
      addLogEntry('✅ Auto-Apply resumed', 'success')
      addLogEntry('🔍 Searching for next job...', 'info')
      await loadSession()
    } catch (err) {
      console.error('Resume error:', err)
      addLogEntry('❌ Failed to resume', 'error')
    } finally {
      setActionLoading(false)
    }
  }

  const handleStop = async () => {
    setActionLoading(true)
    addLogEntry('🛑 Stopping automation...', 'info')
    try {
      await fetch(`${API_URL}/api/applymate/stop`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${session?.access_token}` }
      })
      addLogEntry('🔒 Closing browser...', 'info')
      setTimeout(() => addLogEntry('✅ Session ended successfully', 'success'), 1000)
      setTimeout(() => addLogEntry(`📊 Summary: ${sessionData.jobs_applied} jobs applied`, 'success'), 1500)
      await loadSession()
      await loadApplications()
    } catch (err) {
      console.error('Stop error:', err)
      addLogEntry('❌ Error stopping session', 'error')
    } finally {
      setActionLoading(false)
    }
  }

  const isRunning = sessionData.status === 'running'
  const isPaused = sessionData.status === 'paused'
  const isActive = isRunning || isPaused

  if (loading) {
    return (
      <div className="p-8 bg-slate-900 min-h-screen flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    )
  }

  return (
    <div className="p-4 lg:p-8 bg-slate-900 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Auto Apply</h1>
        <p className="text-slate-400">Let AI automatically apply to jobs on SEEK matching your criteria</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Control Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Card */}
          <div className={`rounded-2xl p-6 border ${
            isRunning 
              ? 'bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border-emerald-500/30'
              : isPaused
              ? 'bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/30'
              : 'bg-slate-800 border-slate-700'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                  isRunning 
                    ? 'bg-gradient-to-br from-emerald-500 to-cyan-500 animate-pulse'
                    : isPaused
                    ? 'bg-gradient-to-br from-amber-500 to-orange-500'
                    : 'bg-slate-700'
                }`}>
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {isRunning ? 'Auto-Apply Running' : isPaused ? 'Auto-Apply Paused' : 'Auto-Apply Ready'}
                  </h2>
                  <p className="text-slate-400">
                    {isRunning 
                      ? sessionData.current_job 
                        ? `Applying to: ${sessionData.current_job}`
                        : `Searching for jobs... Applied: ${sessionData.jobs_applied}`
                      : isPaused
                      ? `Paused - ${sessionData.jobs_applied} applications submitted`
                      : 'Configure settings and start'
                    }
                  </p>
                </div>
              </div>
              {isRunning && (
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-emerald-400 font-medium">Active</span>
                </div>
              )}
              {isPaused && (
                <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/20 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                  <span className="text-amber-400 font-medium">Paused</span>
                </div>
              )}
            </div>

            {/* Current Job Info */}
            {isActive && sessionData.current_job && (
              <div className="mb-6 p-4 bg-slate-700/50 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span className="text-white font-medium">Currently Processing</span>
                </div>
                <p className="text-lg text-white">{sessionData.current_job}</p>
                {sessionData.current_company && (
                  <p className="text-slate-400">at {sessionData.current_company}</p>
                )}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                <div className="flex items-center gap-2 text-red-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>{error}</span>
                </div>
                {error.includes('settings') && (
                  <Link to="/applymate/settings" className="mt-2 inline-block text-emerald-400 hover:underline text-sm">
                    → Go to Settings
                  </Link>
                )}
              </div>
            )}

            {/* Control Buttons */}
            <div className="flex gap-3">
              {!isActive ? (
                <button
                  onClick={handleStart}
                  disabled={actionLoading}
                  className="flex-1 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {actionLoading ? (
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  )}
                  Start Auto-Apply
                </button>
              ) : (
                <>
                  {isRunning ? (
                    <button
                      onClick={handlePause}
                      disabled={actionLoading}
                      className="flex-1 py-4 bg-slate-700 text-white font-semibold rounded-xl hover:bg-slate-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Pause
                    </button>
                  ) : (
                    <button
                      onClick={handleResume}
                      disabled={actionLoading}
                      className="flex-1 py-4 bg-amber-500/20 text-amber-400 font-semibold rounded-xl hover:bg-amber-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Resume
                    </button>
                  )}
                  <button
                    onClick={handleStop}
                    disabled={actionLoading}
                    className="flex-1 py-4 bg-red-500/20 text-red-400 font-semibold rounded-xl hover:bg-red-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"></path>
                    </svg>
                    Stop
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Quick Settings Preview */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Quick Settings</h3>
              <Link to="/applymate/settings" className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-1">
                Edit Settings
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-700/50 rounded-xl">
                <p className="text-slate-400 text-sm mb-1">Platform</p>
                <p className="text-white font-medium flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-xs font-bold">S</span>
                  SEEK
                </p>
              </div>
              <div className="p-4 bg-slate-700/50 rounded-xl">
                <p className="text-slate-400 text-sm mb-1">Max Applications</p>
                <p className="text-white font-medium">100 per session</p>
              </div>
              <div className="p-4 bg-slate-700/50 rounded-xl">
                <p className="text-slate-400 text-sm mb-1">AI Cover Letters</p>
                <p className="text-emerald-400 font-medium flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Enabled
                </p>
              </div>
            </div>
          </div>

          {/* How it Works */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">How Auto-Apply Works</h3>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { step: 1, title: 'Search', desc: 'Bot searches SEEK for matching jobs' },
                { step: 2, title: 'Analyze', desc: 'AI reads job description' },
                { step: 3, title: 'Generate', desc: 'Creates tailored cover letter' },
                { step: 4, title: 'Apply', desc: 'Submits application automatically' },
              ].map(({ step, title, desc }) => (
                <div key={step} className="text-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center mx-auto mb-3">
                    {step}
                  </div>
                  <h4 className="text-white font-medium mb-1">{title}</h4>
                  <p className="text-slate-400 text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats Summary */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 text-center">
              <p className="text-2xl font-bold text-emerald-400">{sessionData.jobs_applied}</p>
              <p className="text-xs text-slate-500">Applied</p>
            </div>
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 text-center">
              <p className="text-2xl font-bold text-cyan-400">{sessionData.jobs_found}</p>
              <p className="text-xs text-slate-500">Found</p>
            </div>
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 text-center">
              <p className="text-2xl font-bold text-amber-400">{sessionData.jobs_skipped}</p>
              <p className="text-xs text-slate-500">Skipped</p>
            </div>
          </div>

          {/* Live Activity Log */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
                Activity Log
              </h3>
              {isRunning && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  Live
                </div>
              )}
            </div>
            <div 
              ref={logContainerRef}
              className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden max-h-80 overflow-y-auto"
            >
              {activityLog.length === 0 ? (
                <div className="p-6 text-center text-slate-500">
                  <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <p>No activity yet</p>
                  <p className="text-sm">Start auto-apply to see live updates here</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-700/50">
                  {activityLog.map((entry) => (
                    <div 
                      key={entry.id}
                      className={`px-4 py-3 text-sm ${
                        entry.type === 'error' ? 'bg-red-500/10' :
                        entry.type === 'success' ? 'bg-emerald-500/5' :
                        entry.type === 'start' ? 'bg-cyan-500/10' :
                        entry.type === 'job' ? 'bg-blue-500/5' :
                        entry.type === 'warning' ? 'bg-amber-500/5' :
                        ''
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <span className={`flex-1 ${
                          entry.type === 'error' ? 'text-red-400' :
                          entry.type === 'success' ? 'text-emerald-400' :
                          entry.type === 'start' ? 'text-cyan-400' :
                          entry.type === 'job' ? 'text-blue-400' :
                          entry.type === 'warning' ? 'text-amber-400' :
                          'text-slate-300'
                        }`}>
                          {entry.message}
                        </span>
                        <span className="text-xs text-slate-600 shrink-0">
                          {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {activityLog.length > 0 && (
              <button 
                onClick={() => setActivityLog([])}
                className="mt-3 text-xs text-slate-500 hover:text-slate-400 transition-colors"
              >
                Clear Log
              </button>
            )}
          </div>

          {/* Recent Applications */}
          {applications.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Recent Applications</h3>
              <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
                {applications.slice(0, 5).map((app, index) => (
                  <div 
                    key={app.id}
                    className={`p-4 flex items-start gap-3 ${
                      index !== Math.min(applications.length, 5) - 1 ? 'border-b border-slate-700' : ''
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-emerald-500/20 text-emerald-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">{app.company}</p>
                      <p className="text-sm text-slate-400 truncate">{app.job_title}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link 
                to="/applymate/applications" 
                className="mt-4 block text-center text-emerald-400 hover:text-emerald-300 text-sm"
              >
                View All Applications →
              </Link>
            </div>
          )}

          {/* Pro Tips */}
          <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-2xl p-6 border border-emerald-500/20">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Pro Tips
            </h3>
            <ul className="text-sm text-slate-400 space-y-2">
              <li>• Keep your profile bio detailed for better cover letters</li>
              <li>• Use stealth mode to avoid detection</li>
              <li>• Set a reasonable cooldown between applications</li>
              <li>• Block companies you've already applied to</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
