import { useState } from 'react'

export default function ApplyMateSettings() {
  const [settings, setSettings] = useState({
    // Account Credentials
    seekEmail: '',
    seekPassword: '',
    linkedinEmail: '',
    linkedinPassword: '',
    // Preferences
    defaultLocation: 'Sydney, NSW',
    salaryMin: 100000,
    remotePreference: 'hybrid',
    jobTypes: ['full-time'],
    // AI Settings
    openaiKey: '',
    autoGenerateCoverLetter: true,
    useGPT4: false,
    // Notifications
    emailNotifications: true,
    dailySummary: true,
  })

  return (
    <div className="p-4 lg:p-8 bg-slate-900 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-slate-400">Configure your ApplyMate preferences</p>
      </div>

      <div className="max-w-4xl space-y-6">
        {/* Job Platform Credentials */}
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
                <span className="ml-auto px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full">Connected</span>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                  <input
                    type="email"
                    value={settings.seekEmail}
                    onChange={(e) => setSettings({ ...settings, seekEmail: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Password</label>
                  <input
                    type="password"
                    value={settings.seekPassword}
                    onChange={(e) => setSettings({ ...settings, seekPassword: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            {/* LinkedIn */}
            <div className="p-4 bg-slate-700/50 rounded-xl border border-slate-600">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
                  in
                </div>
                <div>
                  <h4 className="text-white font-semibold">LinkedIn</h4>
                  <p className="text-xs text-slate-400">Professional network</p>
                </div>
                <span className="ml-auto px-3 py-1 bg-slate-600 text-slate-400 text-xs font-medium rounded-full">Not Connected</span>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                  <input
                    type="email"
                    value={settings.linkedinEmail}
                    onChange={(e) => setSettings({ ...settings, linkedinEmail: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Password</label>
                  <input
                    type="password"
                    value={settings.linkedinPassword}
                    onChange={(e) => setSettings({ ...settings, linkedinPassword: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Job Preferences */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-2">Job Preferences</h3>
          <p className="text-sm text-slate-400 mb-6">Set your default job search criteria</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Default Location</label>
              <input
                type="text"
                value={settings.defaultLocation}
                onChange={(e) => setSettings({ ...settings, defaultLocation: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Minimum Salary (AUD)</label>
              <input
                type="number"
                value={settings.salaryMin}
                onChange={(e) => setSettings({ ...settings, salaryMin: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Work Arrangement</label>
              <select
                value={settings.remotePreference}
                onChange={(e) => setSettings({ ...settings, remotePreference: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="any">Any</option>
                <option value="remote">Remote Only</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">On-site</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Job Types</label>
              <div className="flex flex-wrap gap-2">
                {['full-time', 'part-time', 'contract'].map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      if (settings.jobTypes.includes(type)) {
                        setSettings({ ...settings, jobTypes: settings.jobTypes.filter(t => t !== type) })
                      } else {
                        setSettings({ ...settings, jobTypes: [...settings.jobTypes, type] })
                      }
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                      settings.jobTypes.includes(type)
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                        : 'bg-slate-700 text-slate-400 border border-slate-600'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI Settings */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-2">AI Configuration</h3>
          <p className="text-sm text-slate-400 mb-6">Configure AI features for cover letters and applications</p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">OpenAI API Key</label>
              <input
                type="password"
                value={settings.openaiKey}
                onChange={(e) => setSettings({ ...settings, openaiKey: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="sk-..."
              />
              <p className="text-xs text-slate-500 mt-2">Required for AI cover letter generation</p>
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
                  <p className="text-xs text-slate-500">Automatically create tailored cover letters for each application</p>
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
                  <p className="text-xs text-slate-500">Higher quality but slower and more expensive</p>
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
                checked={settings.emailNotifications}
                onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                className="w-5 h-5 rounded border-slate-600 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-800"
              />
              <div>
                <span className="text-white">Email notifications</span>
                <p className="text-xs text-slate-500">Receive updates about your applications via email</p>
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
                <span className="text-white">Daily summary</span>
                <p className="text-xs text-slate-500">Get a daily report of applications sent and responses received</p>
              </div>
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}

