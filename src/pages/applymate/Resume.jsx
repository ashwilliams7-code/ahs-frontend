import { useState } from 'react'

export default function Resume() {
  const [activeTab, setActiveTab] = useState('edit')

  return (
    <div className="p-4 lg:p-8 bg-slate-900 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Resume Builder</h1>
        <p className="text-slate-400">AI-powered resume tailoring for each application</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {['edit', 'preview', 'versions'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-xl text-sm font-medium capitalize transition-all ${
              activeTab === tab
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Info */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue="John Doe"
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                <input
                  type="email"
                  defaultValue="john@example.com"
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Phone</label>
                <input
                  type="tel"
                  defaultValue="+61 400 000 000"
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Location</label>
                <input
                  type="text"
                  defaultValue="Sydney, NSW"
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Professional Summary</h3>
              <button className="px-4 py-2 bg-emerald-500/20 text-emerald-400 text-sm font-medium rounded-lg hover:bg-emerald-500/30 transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                AI Improve
              </button>
            </div>
            <textarea
              rows={4}
              defaultValue="Experienced software engineer with 5+ years of experience in full-stack development. Passionate about building scalable applications and leading technical teams."
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Experience */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Work Experience</h3>
              <button className="px-4 py-2 bg-slate-700 text-white text-sm font-medium rounded-lg hover:bg-slate-600 transition-colors">
                + Add Experience
              </button>
            </div>

            <div className="space-y-4">
              {/* Experience Item */}
              <div className="p-4 bg-slate-700/50 rounded-xl border border-slate-600">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-white font-semibold">Senior Software Engineer</h4>
                    <p className="text-slate-400 text-sm">TechCorp Australia • 2021 - Present</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-600 rounded-lg transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                      </svg>
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <ul className="text-slate-300 text-sm space-y-1 list-disc list-inside">
                  <li>Led development of microservices architecture serving 1M+ users</li>
                  <li>Mentored team of 5 junior developers</li>
                  <li>Reduced deployment time by 60% through CI/CD improvements</li>
                </ul>
              </div>

              {/* Another Experience Item */}
              <div className="p-4 bg-slate-700/50 rounded-xl border border-slate-600">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-white font-semibold">Software Engineer</h4>
                    <p className="text-slate-400 text-sm">StartupXYZ • 2019 - 2021</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-600 rounded-lg transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                      </svg>
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <ul className="text-slate-300 text-sm space-y-1 list-disc list-inside">
                  <li>Built real-time chat features using WebSockets</li>
                  <li>Implemented payment integration with Stripe</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker', 'PostgreSQL', 'GraphQL', 'Git', 'Agile'].map((skill) => (
                <span 
                  key={skill}
                  className="px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20 flex items-center gap-2"
                >
                  {skill}
                  <button className="text-emerald-400/50 hover:text-red-400 transition-colors">×</button>
                </span>
              ))}
              <button className="px-4 py-2 bg-slate-700 text-slate-400 rounded-lg border border-slate-600 hover:border-slate-500 transition-colors">
                + Add Skill
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Tailor */}
          <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-2xl p-6 border border-emerald-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">AI Tailor</h3>
                <p className="text-sm text-slate-400">Customize for a job</p>
              </div>
            </div>
            <textarea
              placeholder="Paste job description to tailor your resume..."
              rows={4}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none mb-4"
            />
            <button className="w-full py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all">
              Tailor Resume
            </button>
          </div>

          {/* Resume Score */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Resume Score</h3>
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="none" className="text-slate-700" />
                  <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="none" strokeDasharray="351.86" strokeDashoffset="70.37" className="text-emerald-500" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">80</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm">Keywords</span>
                <span className="text-emerald-400 text-sm font-medium">Good</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm">Experience</span>
                <span className="text-emerald-400 text-sm font-medium">Excellent</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm">Education</span>
                <span className="text-amber-400 text-sm font-medium">Add more</span>
              </div>
            </div>
          </div>

          {/* Download Options */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Export</h3>
            <div className="space-y-3">
              <button className="w-full py-3 bg-slate-700 text-white font-medium rounded-xl hover:bg-slate-600 transition-all flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Download PDF
              </button>
              <button className="w-full py-3 bg-slate-700 text-white font-medium rounded-xl hover:bg-slate-600 transition-all flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Download DOCX
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

