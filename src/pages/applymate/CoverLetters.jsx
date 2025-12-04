import { useState } from 'react'

const savedLetters = [
  { id: 1, title: 'Google - Senior Engineer', createdAt: 'Dec 2, 2024', wordCount: 320 },
  { id: 2, title: 'Meta - Full Stack Developer', createdAt: 'Dec 1, 2024', wordCount: 285 },
  { id: 3, title: 'Amazon - Backend Engineer', createdAt: 'Nov 30, 2024', wordCount: 310 },
]

export default function CoverLetters() {
  const [jobDescription, setJobDescription] = useState('')
  const [generatedLetter, setGeneratedLetter] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [tone, setTone] = useState('professional')
  const [length, setLength] = useState('medium')

  const handleGenerate = () => {
    if (!jobDescription.trim()) return
    
    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedLetter(`Dear Hiring Manager,

I am writing to express my strong interest in the position at your company. With my background in software development and passion for building innovative solutions, I am confident I would be a valuable addition to your team.

Throughout my career, I have developed expertise in modern web technologies and have consistently delivered high-quality solutions. My experience includes working with React, Node.js, and cloud technologies, which aligns perfectly with the requirements outlined in the job description.

What excites me most about this opportunity is the chance to work on challenging problems while contributing to a team that values innovation and excellence. I am particularly drawn to your company's commitment to creating impactful products.

I would welcome the opportunity to discuss how my skills and experience could benefit your team. Thank you for considering my application.

Best regards,
[Your Name]`)
      setIsGenerating(false)
    }, 3000)
  }

  return (
    <div className="p-4 lg:p-8 bg-slate-900 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">AI Cover Letter Generator</h1>
        <p className="text-slate-400">Create personalized cover letters in seconds with AI</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="space-y-6">
          {/* Job Description Input */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Job Description</h3>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              rows={8}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
            />
            <p className="text-sm text-slate-500 mt-2">
              Paste the full job description for the best results
            </p>
          </div>

          {/* Options */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Options</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Tone</label>
                <div className="flex flex-wrap gap-2">
                  {['professional', 'friendly', 'enthusiastic', 'formal'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTone(t)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                        tone === t
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                          : 'bg-slate-700 text-slate-400 border border-slate-600 hover:border-slate-500'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Length</label>
                <div className="flex flex-wrap gap-2">
                  {['short', 'medium', 'long'].map((l) => (
                    <button
                      key={l}
                      onClick={() => setLength(l)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                        length === l
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                          : 'bg-slate-700 text-slate-400 border border-slate-600 hover:border-slate-500'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !jobDescription.trim()}
            className="w-full py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating with AI...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                Generate Cover Letter
              </>
            )}
          </button>
        </div>

        {/* Output Panel */}
        <div className="space-y-6">
          {/* Generated Letter */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 min-h-[400px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Generated Cover Letter</h3>
              {generatedLetter && (
                <div className="flex gap-2">
                  <button 
                    onClick={() => navigator.clipboard.writeText(generatedLetter)}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                    title="Copy"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                  </button>
                  <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors" title="Save">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path>
                    </svg>
                  </button>
                </div>
              )}
            </div>
            
            {generatedLetter ? (
              <textarea
                value={generatedLetter}
                onChange={(e) => setGeneratedLetter(e.target.value)}
                className="w-full h-80 px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none font-mono text-sm leading-relaxed"
              />
            ) : (
              <div className="h-80 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-slate-700 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </div>
                  <h3 className="text-white font-semibold mb-2">No letter generated yet</h3>
                  <p className="text-slate-400 text-sm">Paste a job description and click generate</p>
                </div>
              </div>
            )}
          </div>

          {/* Saved Letters */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Saved Letters</h3>
            <div className="space-y-3">
              {savedLetters.map((letter) => (
                <div 
                  key={letter.id}
                  className="flex items-center justify-between p-4 bg-slate-700/50 rounded-xl hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  <div>
                    <p className="text-white font-medium">{letter.title}</p>
                    <p className="text-sm text-slate-400">{letter.createdAt} • {letter.wordCount} words</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-600 rounded-lg transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

