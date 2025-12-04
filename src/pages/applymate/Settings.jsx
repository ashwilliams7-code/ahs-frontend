import { useState } from 'react'

export default function ApplyMateSettings() {
  const [settings, setSettings] = useState({
    // User Profile
    fullName: '',
    location: 'Sydney, Australia',
    backgroundBio: '',
    
    // Job Search Settings
    jobTitles: ['project manager', 'program manager'],
    maxJobs: 100,
    expectedSalary: 100000,
    
    // Speed Settings
    scanSpeed: 50,
    applySpeed: 50,
    cooldownDelay: 5,
    stealthMode: false,
    
    // Blocklists
    blockedCompanies: [],
    blockedTitles: [],
    
    // Platform Credentials
    seekEmail: '',
    seekPassword: '',
    linkedinEmail: '',
    linkedinPassword: '',
    
    // AI Settings
    openaiKey: '',
    useGPT4: false,
    autoGenerateCoverLetter: true,
    
    // Notifications
    notificationsEnabled: true,
    dailySummary: true,
  })

  const [newJobTitle, setNewJobTitle] = useState('')
  const [newBlockedCompany, setNewBlockedCompany] = useState('')
  const [newBlockedTitle, setNewBlockedTitle] = useState('')
  const [saveStatus, setSaveStatus] = useState('')

  const addJobTitle = () => {
    if (newJobTitle.trim() && !settings.jobTitles.includes(newJobTitle.trim().toLowerCase())) {
      setSettings(prev => ({
        ...prev,
        jobTitles: [...prev.jobTitles, newJobTitle.trim().toLowerCase()]
      }))
      setNewJobTitle('')
    }
  }

  const removeJobTitle = (index) => {
    setSettings(prev => ({
      ...prev,
      jobTitles: prev.jobTitles.filter((_, i) => i !== index)
    }))
  }

  const addBlockedCompany = () => {
    if (newBlockedCompany.trim()) {
      setSettings(prev => ({
        ...prev,
        blockedCompanies: [...prev.blockedCompanies, newBlockedCompany.trim().toLowerCase()]
      }))
      setNewBlockedCompany('')
    }
  }

  const removeBlockedCompany = (index) => {
    setSettings(prev => ({
      ...prev,
      blockedCompanies: prev.blockedCompanies.filter((_, i) => i !== index)
    }))
  }

  const addBlockedTitle = () => {
    if (newBlockedTitle.trim()) {
      setSettings(prev => ({
        ...prev,
        blockedTitles: [...prev.blockedTitles, newBlockedTitle.trim().toLowerCase()]
      }))
      setNewBlockedTitle('')
    }
  }

  const removeBlockedTitle = (index) => {
    setSettings(prev => ({
      ...prev,
      blockedTitles: prev.blockedTitles.filter((_, i) => i !== index)
    }))
  }

  const handleSave = async () => {
    setSaveStatus('saving')
    // In production, this would save to backend/database
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaveStatus('saved')
    setTimeout(() => setSaveStatus(''), 2000)
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
                value={settings.fullName}
                onChange={(e) => setSettings({ ...settings, fullName: e.target.value })}
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
                value={settings.backgroundBio}
                onChange={(e) => setSettings({ ...settings, backgroundBio: e.target.value })}
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
            {settings.jobTitles.map((title, index) => (
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
                value={settings.maxJobs}
                onChange={(e) => setSettings({ ...settings, maxJobs: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                min="1"
                max="500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Expected Salary (AUD)</label>
              <input
                type="number"
                value={settings.expectedSalary}
                onChange={(e) => setSettings({ ...settings, expectedSalary: parseInt(e.target.value) || 0 })}
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
                <span className="text-emerald-400 font-medium">{settings.scanSpeed}%</span>
              </div>
              <input
                type="range"
                value={settings.scanSpeed}
                onChange={(e) => setSettings({ ...settings, scanSpeed: parseInt(e.target.value) })}
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
                <span className="text-emerald-400 font-medium">{settings.applySpeed}%</span>
              </div>
              <input
                type="range"
                value={settings.applySpeed}
                onChange={(e) => setSettings({ ...settings, applySpeed: parseInt(e.target.value) })}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                min="1"
                max="100"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-slate-400">Cooldown Between Jobs (seconds)</label>
                <span className="text-emerald-400 font-medium">{settings.cooldownDelay}s</span>
              </div>
              <input
                type="range"
                value={settings.cooldownDelay}
                onChange={(e) => setSettings({ ...settings, cooldownDelay: parseInt(e.target.value) })}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                min="0"
                max="30"
              />
            </div>

            <label className="flex items-center gap-3 cursor-pointer p-4 bg-slate-700/50 rounded-xl">
              <input
                type="checkbox"
                checked={settings.stealthMode}
                onChange={(e) => setSettings({ ...settings, stealthMode: e.target.checked })}
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
                {settings.blockedCompanies.map((company, index) => (
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
                {settings.blockedTitles.map((title, index) => (
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
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                  <input
                    type="email"
                    value={settings.seekEmail}
                    onChange={(e) => setSettings({ ...settings, seekEmail: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-emerald-500"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Password</label>
                  <input
                    type="password"
                    value={settings.seekPassword}
                    onChange={(e) => setSettings({ ...settings, seekPassword: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-emerald-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            {/* LinkedIn */}
            <div className="p-4 bg-slate-700/50 rounded-xl border border-slate-600">
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
              <div className="grid md:grid-cols-2 gap-4 opacity-50">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                  <input
                    type="email"
                    disabled
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white cursor-not-allowed"
                    placeholder="Coming soon..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Password</label>
                  <input
                    type="password"
                    disabled
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white cursor-not-allowed"
                    placeholder="Coming soon..."
                  />
                </div>
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
                value={settings.openaiKey}
                onChange={(e) => setSettings({ ...settings, openaiKey: e.target.value })}
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

            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoGenerateCoverLetter}
                  onChange={(e) => setSettings({ ...settings, autoGenerateCoverLetter: e.target.checked })}
                  className="w-5 h-5 rounded border-slate-600 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-800"
                />
                <div>
                  <span className="text-white">Auto-generate cover letters</span>
                  <p className="text-xs text-slate-500">Create tailored cover letters for each application</p>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.useGPT4}
                  onChange={(e) => setSettings({ ...settings, useGPT4: e.target.checked })}
                  className="w-5 h-5 rounded border-slate-600 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-800"
                />
                <div>
                  <span className="text-white">Use GPT-4 (Premium)</span>
                  <p className="text-xs text-slate-500">Higher quality but slower and more expensive (~$0.03/letter)</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-2">Notifications</h3>
          <p className="text-sm text-slate-400 mb-6">Manage your notification preferences</p>

          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notificationsEnabled}
                onChange={(e) => setSettings({ ...settings, notificationsEnabled: e.target.checked })}
                className="w-5 h-5 rounded border-slate-600 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-800"
              />
              <div>
                <span className="text-white">Enable notifications</span>
                <p className="text-xs text-slate-500">Get notified about application status changes</p>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.dailySummary}
                onChange={(e) => setSettings({ ...settings, dailySummary: e.target.checked })}
                className="w-5 h-5 rounded border-slate-600 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-800"
              />
              <div>
                <span className="text-white">Daily summary email</span>
                <p className="text-xs text-slate-500">Receive a daily report of applications and responses</p>
              </div>
            </label>
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
