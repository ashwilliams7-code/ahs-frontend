import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'

export default function ApplyMateSettings() {
  const { session } = useAuth()
  const [loading, setLoading] = useState(true)
  const [settings, setSettings] = useState({
    full_name: '',
    location: 'Brisbane, Australia',
    background_bio: '',
    seek_email: '',
    expected_salary: 100000,
    job_titles: ['project manager', 'program manager'],
    blocked_companies: [],
    blocked_titles: ['sales', 'customer service'],
    scan_speed: 50,
    apply_speed: 50,
    cooldown_delay: 5,
    stealth_mode: false,
    max_jobs: 100,
    openai_api_key: ''
  })

  const [newJobTitle, setNewJobTitle] = useState('')
  const [newBlockedCompany, setNewBlockedCompany] = useState('')
  const [newBlockedTitle, setNewBlockedTitle] = useState('')
  const [saveStatus, setSaveStatus] = useState('')

  // Load settings on mount
  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const res = await fetch(`${API_URL}/api/applymate/settings`, {
        headers: {
          'Authorization': `Bearer ${session?.access_token}`
        }
      })
      if (res.ok) {
        const data = await res.json()
        setSettings(data)
      }
    } catch (error) {
      console.error('Failed to load settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const addJobTitle = () => {
    if (newJobTitle.trim() && !settings.job_titles.includes(newJobTitle.trim().toLowerCase())) {
      setSettings(prev => ({
        ...prev,
        job_titles: [...prev.job_titles, newJobTitle.trim().toLowerCase()]
      }))
      setNewJobTitle('')
    }
  }

  const removeJobTitle = (index) => {
    setSettings(prev => ({
      ...prev,
      job_titles: prev.job_titles.filter((_, i) => i !== index)
    }))
  }

  const addBlockedCompany = () => {
    if (newBlockedCompany.trim()) {
      setSettings(prev => ({
        ...prev,
        blocked_companies: [...prev.blocked_companies, newBlockedCompany.trim().toLowerCase()]
      }))
      setNewBlockedCompany('')
    }
  }

  const removeBlockedCompany = (index) => {
    setSettings(prev => ({
      ...prev,
      blocked_companies: prev.blocked_companies.filter((_, i) => i !== index)
    }))
  }

  const addBlockedTitle = () => {
    if (newBlockedTitle.trim()) {
      setSettings(prev => ({
        ...prev,
        blocked_titles: [...prev.blocked_titles, newBlockedTitle.trim().toLowerCase()]
      }))
      setNewBlockedTitle('')
    }
  }

  const removeBlockedTitle = (index) => {
    setSettings(prev => ({
      ...prev,
      blocked_titles: prev.blocked_titles.filter((_, i) => i !== index)
    }))
  }

  const handleSave = async () => {
    setSaveStatus('saving')
    try {
      const res = await fetch(`${API_URL}/api/applymate/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`
        },
        body: JSON.stringify(settings)
      })
      
      if (res.ok) {
        setSaveStatus('saved')
        setTimeout(() => setSaveStatus(''), 2000)
      } else {
        throw new Error('Failed to save')
      }
    } catch (error) {
      console.error('Save error:', error)
      setSaveStatus('error')
      setTimeout(() => setSaveStatus(''), 3000)
    }
  }

  if (loading) {
    return (
      <div className="p-8 bg-slate-900 min-h-screen flex items-center justify-center">
        <div className="text-slate-400">Loading settings...</div>
      </div>
    )
  }

  return (
    <div className="p-4 lg:p-8 bg-slate-900 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">ApplyMate Settings</h1>
        <p className="text-slate-400">Configure your job automation preferences</p>
      </div>

      <div className="max-w-4xl space-y-6">
        {/* User Profile */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-2">Your Profile</h3>
          <p className="text-sm text-slate-400 mb-6">This information will be used in cover letters and applications</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Full Name *</label>
              <input
                type="text"
                value={settings.full_name}
                onChange={(e) => setSettings({ ...settings, full_name: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Location *</label>
              <input
                type="text"
                value={settings.location}
                onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Sydney, Australia"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-400 mb-2">Background Bio</label>
              <textarea
                value={settings.background_bio}
                onChange={(e) => setSettings({ ...settings, background_bio: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                placeholder="Experienced professional with 10+ years in project management, specializing in agile methodologies and digital transformation..."
              />
              <p className="text-xs text-slate-500 mt-2">This will be used by AI to generate tailored cover letters</p>
            </div>
          </div>
        </div>

        {/* Job Titles */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-2">Target Job Titles</h3>
          <p className="text-sm text-slate-400 mb-6">The bot will search and apply to jobs matching these titles</p>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newJobTitle}
              onChange={(e) => setNewJobTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addJobTitle()}
              className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="e.g., Project Manager, Scrum Master..."
            />
            <button
              onClick={addJobTitle}
              className="px-6 py-3 bg-emerald-500/20 text-emerald-400 rounded-xl hover:bg-emerald-500/30 transition-colors"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {settings.job_titles.map((title, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20 flex items-center gap-2"
              >
                {title}
                <button
                  onClick={() => removeJobTitle(index)}
                  className="text-emerald-400/50 hover:text-red-400 transition-colors"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Job Preferences */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-2">Job Preferences</h3>
          <p className="text-sm text-slate-400 mb-6">Set your application limits and salary expectations</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Max Applications per Session</label>
              <input
                type="number"
                value={settings.max_jobs}
                onChange={(e) => setSettings({ ...settings, max_jobs: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                min="1"
                max="500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Expected Salary (AUD)</label>
              <input
                type="number"
                value={settings.expected_salary}
                onChange={(e) => setSettings({ ...settings, expected_salary: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="100000"
              />
              <p className="text-xs text-slate-500 mt-2">Used to auto-fill salary expectation fields</p>
            </div>
          </div>
        </div>

        {/* Speed Settings */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-2">Speed Settings</h3>
          <p className="text-sm text-slate-400 mb-6">Control how fast the bot operates</p>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-slate-400">Scan Speed</label>
                <span className="text-emerald-400 font-medium">{settings.scan_speed}%</span>
              </div>
              <input
                type="range"
                value={settings.scan_speed}
                onChange={(e) => setSettings({ ...settings, scan_speed: parseInt(e.target.value) })}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                min="1"
                max="100"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>Slow (Safe)</span>
                <span>Fast (Risky)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-slate-400">Apply Speed</label>
                <span className="text-emerald-400 font-medium">{settings.apply_speed}%</span>
              </div>
              <input
                type="range"
                value={settings.apply_speed}
                onChange={(e) => setSettings({ ...settings, apply_speed: parseInt(e.target.value) })}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                min="1"
                max="100"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-slate-400">Cooldown Between Jobs (seconds)</label>
                <span className="text-emerald-400 font-medium">{settings.cooldown_delay}s</span>
              </div>
              <input
                type="range"
                value={settings.cooldown_delay}
                onChange={(e) => setSettings({ ...settings, cooldown_delay: parseInt(e.target.value) })}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                min="0"
                max="30"
              />
            </div>

            <label className="flex items-center gap-3 cursor-pointer p-4 bg-slate-700/50 rounded-xl">
              <input
                type="checkbox"
                checked={settings.stealth_mode}
                onChange={(e) => setSettings({ ...settings, stealth_mode: e.target.checked })}
                className="w-5 h-5 rounded border-slate-600 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-800"
              />
              <div>
                <span className="text-white font-medium">🥷 Stealth Mode</span>
                <p className="text-xs text-slate-500">Add human-like delays, random scrolling, and mouse movements</p>
              </div>
            </label>
          </div>
        </div>

        {/* Blocklists */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-2">Blocklists</h3>
          <p className="text-sm text-slate-400 mb-6">Skip jobs from specific companies or with certain keywords</p>

          <div className="space-y-6">
            {/* Blocked Companies */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Blocked Companies</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newBlockedCompany}
                  onChange={(e) => setNewBlockedCompany(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addBlockedCompany()}
                  className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-xl text-white text-sm focus:ring-2 focus:ring-emerald-500"
                  placeholder="Company name to avoid..."
                />
                <button
                  onClick={addBlockedCompany}
                  className="px-4 py-2 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30"
                >
                  Block
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {settings.blocked_companies.map((company, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-red-500/10 text-red-400 rounded-lg border border-red-500/20 flex items-center gap-2 text-sm"
                  >
                    🚫 {company}
                    <button onClick={() => removeBlockedCompany(index)} className="hover:text-white">×</button>
                  </span>
                ))}
              </div>
            </div>

            {/* Blocked Titles */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Blocked Title Keywords</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newBlockedTitle}
                  onChange={(e) => setNewBlockedTitle(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addBlockedTitle()}
                  className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-xl text-white text-sm focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g., sales, customer service..."
                />
                <button
                  onClick={addBlockedTitle}
                  className="px-4 py-2 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30"
                >
                  Block
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {settings.blocked_titles.map((title, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-red-500/10 text-red-400 rounded-lg border border-red-500/20 flex items-center gap-2 text-sm"
                  >
                    🚫 {title}
                    <button onClick={() => removeBlockedTitle(index)} className="hover:text-white">×</button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Platform Credentials */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-2">Job Platform Accounts</h3>
          <p className="text-sm text-slate-400 mb-6">Connect your job portal accounts for auto-apply</p>

          <div className="space-y-6">
            {/* SEEK */}
            <div className="p-4 bg-slate-700/50 rounded-xl border border-slate-600">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white font-bold">
                  S
                </div>
                <div>
                  <h4 className="text-white font-semibold">SEEK</h4>
                  <p className="text-xs text-slate-400">Australia's #1 job site</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">SEEK Account Email</label>
                <input
                  type="email"
                  value={settings.seek_email}
                  onChange={(e) => setSettings({ ...settings, seek_email: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-emerald-500"
                  placeholder="your@email.com"
                />
                <p className="text-xs text-slate-500 mt-2">Note: You'll need to be logged into SEEK in your browser session</p>
              </div>
            </div>

            {/* LinkedIn - Coming Soon */}
            <div className="p-4 bg-slate-700/50 rounded-xl border border-slate-600 opacity-60">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                  in
                </div>
                <div>
                  <h4 className="text-white font-semibold">LinkedIn</h4>
                  <p className="text-xs text-slate-400">Professional network</p>
                </div>
                <span className="ml-auto px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-medium rounded-full">Coming Soon</span>
              </div>
            </div>

            {/* Indeed - Coming Soon */}
            <div className="p-4 bg-slate-700/50 rounded-xl border border-slate-600 opacity-60">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  IN
                </div>
                <div>
                  <h4 className="text-white font-semibold">Indeed</h4>
                  <p className="text-xs text-slate-400">Global job search</p>
                </div>
                <span className="ml-auto px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-medium rounded-full">Coming Soon</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Settings */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-2">AI Configuration</h3>
          <p className="text-sm text-slate-400 mb-6">Configure AI for cover letters and screening questions</p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">OpenAI API Key *</label>
              <input
                type="password"
                value={settings.openai_api_key}
                onChange={(e) => setSettings({ ...settings, openai_api_key: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="sk-..."
              />
              <p className="text-xs text-slate-500 mt-2">
                Required for AI-generated cover letters and answers. Get your key at{' '}
                <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
                  platform.openai.com
                </a>
              </p>
            </div>

            {/* API Key Status */}
            {settings.openai_api_key && (
              <div className={`p-4 rounded-xl ${settings.openai_api_key.startsWith('sk-') ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
                <div className="flex items-center gap-2">
                  {settings.openai_api_key.startsWith('sk-') ? (
                    <>
                      <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-emerald-400">API key format looks valid</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                      </svg>
                      <span className="text-red-400">API key should start with "sk-"</span>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-between pt-4">
          <div>
            {saveStatus === 'saved' && (
              <span className="text-emerald-400 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Settings saved successfully!
              </span>
            )}
            {saveStatus === 'error' && (
              <span className="text-red-400 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                Failed to save settings
              </span>
            )}
          </div>
          <button
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
            className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {saveStatus === 'saving' ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Saving...
              </>
            ) : (
              'Save Settings'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
