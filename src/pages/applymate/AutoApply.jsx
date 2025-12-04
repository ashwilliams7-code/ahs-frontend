import { useState } from 'react'

const applicationLog = [
  { id: 1, company: 'Google', role: 'Senior Engineer', status: 'success', time: '2 min ago' },
  { id: 2, company: 'Meta', role: 'Full Stack Dev', status: 'success', time: '5 min ago' },
  { id: 3, company: 'Amazon', role: 'Backend Engineer', status: 'skipped', reason: 'Already applied', time: '6 min ago' },
  { id: 4, company: 'Microsoft', role: 'Software Engineer', status: 'success', time: '8 min ago' },
  { id: 5, company: 'Apple', role: 'iOS Developer', status: 'failed', reason: 'Login required', time: '10 min ago' },
]

export default function AutoApply() {
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState({ current: 0, total: 50 })
  const [settings, setSettings] = useState({
    maxApplications: 50,
    platforms: ['seek', 'linkedin'],
    keywords: 'Software Engineer, Developer',
    location: 'Sydney, NSW',
    salaryMin: 100000,
    remoteOnly: false,
    skipApplied: true,
    generateCoverLetter: true,
  })

  const handleStart = () => {
    setIsRunning(true)
    // Simulate progress
    let current = 0
    const interval = setInterval(() => {
      current += 1
      setProgress({ current, total: settings.maxApplications })
      if (current >= settings.maxApplications) {
        clearInterval(interval)
        setIsRunning(false)
      }
    }, 2000)
  }

  return (
    <div className="p-4 lg:p-8 bg-slate-900 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Auto Apply</h1>
        <p className="text-slate-400">Let AI automatically apply to jobs matching your criteria</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Control Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Card */}
          <div className={`rounded-2xl p-6 border ${
            isRunning 
              ? 'bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border-emerald-500/30'
              : 'bg-slate-800 border-slate-700'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                  isRunning 
                    ? 'bg-gradient-to-br from-emerald-500 to-cyan-500 animate-pulse'
                    : 'bg-slate-700'
                }`}>
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {isRunning ? 'Auto-Apply Running' : 'Auto-Apply Ready'}
                  </h2>
                  <p className="text-slate-400">
                    {isRunning 
                      ? `Applying to jobs... ${progress.current}/${progress.total}`
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
            </div>

            {/* Progress Bar */}
            {isRunning && (
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">Progress</span>
                  <span className="text-emerald-400 font-medium">
                    {Math.round((progress.current / progress.total) * 100)}%
                  </span>
                </div>
                <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all duration-500"
                    style={{ width: `${(progress.current / progress.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Control Buttons */}
            <div className="flex gap-3">
              {!isRunning ? (
                <button
                  onClick={handleStart}
                  className="flex-1 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Start Auto-Apply
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setIsRunning(false)}
                    className="flex-1 py-4 bg-slate-700 text-white font-semibold rounded-xl hover:bg-slate-600 transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Pause
                  </button>
                  <button
                    onClick={() => { setIsRunning(false); setProgress({ current: 0, total: 50 }); }}
                    className="flex-1 py-4 bg-red-500/20 text-red-400 font-semibold rounded-xl hover:bg-red-500/30 transition-all flex items-center justify-center gap-2"
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

          {/* Settings */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Auto-Apply Settings</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Job Keywords</label>
                <input
                  type="text"
                  value={settings.keywords}
                  onChange={(e) => setSettings({ ...settings, keywords: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Software Engineer, Developer..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Location</label>
                <input
                  type="text"
                  value={settings.location}
                  onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Sydney, Melbourne..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Max Applications</label>
                <input
                  type="number"
                  value={settings.maxApplications}
                  onChange={(e) => setSettings({ ...settings, maxApplications: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Minimum Salary</label>
                <input
                  type="number"
                  value={settings.salaryMin}
                  onChange={(e) => setSettings({ ...settings, salaryMin: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="100000"
                />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.remoteOnly}
                  onChange={(e) => setSettings({ ...settings, remoteOnly: e.target.checked })}
                  className="w-5 h-5 rounded border-slate-600 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-800"
                />
                <span className="text-white">Remote jobs only</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.skipApplied}
                  onChange={(e) => setSettings({ ...settings, skipApplied: e.target.checked })}
                  className="w-5 h-5 rounded border-slate-600 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-800"
                />
                <span className="text-white">Skip already applied jobs</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.generateCoverLetter}
                  onChange={(e) => setSettings({ ...settings, generateCoverLetter: e.target.checked })}
                  className="w-5 h-5 rounded border-slate-600 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-800"
                />
                <span className="text-white">Auto-generate cover letters with AI</span>
              </label>
            </div>
          </div>
        </div>

        {/* Activity Log */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Activity Log</h3>
          <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
            {applicationLog.map((log, index) => (
              <div 
                key={log.id}
                className={`p-4 flex items-start gap-3 ${
                  index !== applicationLog.length - 1 ? 'border-b border-slate-700' : ''
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  log.status === 'success' ? 'bg-emerald-500/20 text-emerald-400' :
                  log.status === 'skipped' ? 'bg-amber-500/20 text-amber-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {log.status === 'success' ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  ) : log.status === 'skipped' ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{log.company}</p>
                  <p className="text-sm text-slate-400 truncate">{log.role}</p>
                  {log.reason && (
                    <p className="text-xs text-slate-500 mt-1">{log.reason}</p>
                  )}
                </div>
                <span className="text-xs text-slate-500 shrink-0">{log.time}</span>
              </div>
            ))}
          </div>

          {/* Stats Summary */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 text-center">
              <p className="text-2xl font-bold text-emerald-400">23</p>
              <p className="text-xs text-slate-500">Applied</p>
            </div>
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 text-center">
              <p className="text-2xl font-bold text-amber-400">5</p>
              <p className="text-xs text-slate-500">Skipped</p>
            </div>
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 text-center">
              <p className="text-2xl font-bold text-red-400">2</p>
              <p className="text-xs text-slate-500">Failed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

