import { useState, useRef } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const defaultResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    portfolio: '',
  },
  summary: '',
  experience: [
    {
      id: 1,
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      bullets: [''],
    },
  ],
  education: [
    {
      id: 1,
      degree: '',
      school: '',
      location: '',
      graduationDate: '',
      gpa: '',
    },
  ],
  skills: [],
  certifications: [],
}

export default function Resume() {
  const [resumeData, setResumeData] = useState(defaultResumeData)
  const [activeTab, setActiveTab] = useState('edit')
  const [template, setTemplate] = useState('classic')
  const [isGenerating, setIsGenerating] = useState(false)
  const [newSkill, setNewSkill] = useState('')
  const [newCert, setNewCert] = useState('')
  const resumeRef = useRef(null)

  // Update personal info
  const updatePersonalInfo = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }))
  }

  // Update summary
  const updateSummary = (value) => {
    setResumeData(prev => ({ ...prev, summary: value }))
  }

  // Experience functions
  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        id: Date.now(),
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        bullets: [''],
      }]
    }))
  }

  const updateExperience = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }))
  }

  const removeExperience = (id) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }))
  }

  const addBullet = (expId) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === expId ? { ...exp, bullets: [...exp.bullets, ''] } : exp
      )
    }))
  }

  const updateBullet = (expId, bulletIndex, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === expId ? {
          ...exp,
          bullets: exp.bullets.map((b, i) => i === bulletIndex ? value : b)
        } : exp
      )
    }))
  }

  const removeBullet = (expId, bulletIndex) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === expId ? {
          ...exp,
          bullets: exp.bullets.filter((_, i) => i !== bulletIndex)
        } : exp
      )
    }))
  }

  // Education functions
  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, {
        id: Date.now(),
        degree: '',
        school: '',
        location: '',
        graduationDate: '',
        gpa: '',
      }]
    }))
  }

  const updateEducation = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }))
  }

  const removeEducation = (id) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }))
  }

  // Skills functions
  const addSkill = () => {
    if (newSkill.trim()) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }))
      setNewSkill('')
    }
  }

  const removeSkill = (index) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }))
  }

  // Certification functions
  const addCertification = () => {
    if (newCert.trim()) {
      setResumeData(prev => ({
        ...prev,
        certifications: [...prev.certifications, newCert.trim()]
      }))
      setNewCert('')
    }
  }

  const removeCertification = (index) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }))
  }

  // Generate PDF
  const generatePDF = async () => {
    if (!resumeRef.current) return
    
    setIsGenerating(true)
    
    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      })
      
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
      const imgX = (pdfWidth - imgWidth * ratio) / 2
      const imgY = 0
      
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio)
      
      const fileName = resumeData.personalInfo.fullName 
        ? `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`
        : 'Resume.pdf'
      
      pdf.save(fileName)
    } catch (error) {
      console.error('PDF generation failed:', error)
    }
    
    setIsGenerating(false)
  }

  return (
    <div className="p-4 lg:p-8 bg-slate-900 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">ATS Resume Builder</h1>
        <p className="text-slate-400">Create ATS-optimized resumes that pass automated screening systems</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['edit', 'preview'].map((tab) => (
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
        
        <div className="ml-auto flex gap-2">
          <select
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
          >
            <option value="classic">Classic Template</option>
            <option value="modern">Modern Template</option>
            <option value="minimal">Minimal Template</option>
          </select>
          
          <button
            onClick={generatePDF}
            disabled={isGenerating}
            className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {isGenerating ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Generating...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Download PDF
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Edit Form */}
        {activeTab === 'edit' && (
          <div className="space-y-6">
            {/* Personal Information */}
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={resumeData.personalInfo.fullName}
                    onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Email *</label>
                    <input
                      type="email"
                      value={resumeData.personalInfo.email}
                      onChange={(e) => updatePersonalInfo('email', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Phone *</label>
                    <input
                      type="tel"
                      value={resumeData.personalInfo.phone}
                      onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="+61 400 000 000"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Location</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.location}
                      onChange={(e) => updatePersonalInfo('location', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Sydney, NSW"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">LinkedIn</label>
                    <input
                      type="url"
                      value={resumeData.personalInfo.linkedin}
                      onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="linkedin.com/in/johndoe"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">Professional Summary</h3>
              <textarea
                value={resumeData.summary}
                onChange={(e) => updateSummary(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                placeholder="Results-driven professional with X years of experience in..."
              />
              <p className="text-xs text-slate-500 mt-2">Tip: Use keywords from job descriptions. Keep it 2-4 sentences.</p>
            </div>

            {/* Work Experience */}
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Work Experience</h3>
                <button
                  onClick={addExperience}
                  className="px-4 py-2 bg-slate-700 text-white text-sm rounded-lg hover:bg-slate-600 transition-colors"
                >
                  + Add Experience
                </button>
              </div>

              <div className="space-y-6">
                {resumeData.experience.map((exp, expIndex) => (
                  <div key={exp.id} className="p-4 bg-slate-700/50 rounded-xl border border-slate-600">
                    <div className="flex justify-between mb-4">
                      <span className="text-sm text-slate-400">Experience #{expIndex + 1}</span>
                      {resumeData.experience.length > 1 && (
                        <button
                          onClick={() => removeExperience(exp.id)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    
                    <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-slate-400 mb-1">Job Title *</label>
                          <input
                            type="text"
                            value={exp.title}
                            onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm"
                            placeholder="Senior Software Engineer"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-slate-400 mb-1">Company *</label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm"
                            placeholder="Tech Company"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm text-slate-400 mb-1">Location</label>
                          <input
                            type="text"
                            value={exp.location}
                            onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm"
                            placeholder="Sydney, NSW"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-slate-400 mb-1">Start Date</label>
                          <input
                            type="text"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm"
                            placeholder="Jan 2020"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-slate-400 mb-1">End Date</label>
                          <input
                            type="text"
                            value={exp.current ? 'Present' : exp.endDate}
                            onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                            disabled={exp.current}
                            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm disabled:opacity-50"
                            placeholder="Present"
                          />
                        </div>
                      </div>

                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={exp.current}
                          onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                          className="w-4 h-4 rounded border-slate-600 text-emerald-500"
                        />
                        <span className="text-sm text-slate-400">Currently working here</span>
                      </label>

                      <div>
                        <label className="block text-sm text-slate-400 mb-2">Key Achievements (bullet points)</label>
                        {exp.bullets.map((bullet, bulletIndex) => (
                          <div key={bulletIndex} className="flex gap-2 mb-2">
                            <span className="text-slate-500 mt-2">•</span>
                            <input
                              type="text"
                              value={bullet}
                              onChange={(e) => updateBullet(exp.id, bulletIndex, e.target.value)}
                              className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm"
                              placeholder="Achieved X by doing Y, resulting in Z..."
                            />
                            {exp.bullets.length > 1 && (
                              <button
                                onClick={() => removeBullet(exp.id, bulletIndex)}
                                className="text-red-400 hover:text-red-300 px-2"
                              >
                                ×
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          onClick={() => addBullet(exp.id)}
                          className="text-sm text-emerald-400 hover:text-emerald-300 mt-1"
                        >
                          + Add bullet point
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Education</h3>
                <button
                  onClick={addEducation}
                  className="px-4 py-2 bg-slate-700 text-white text-sm rounded-lg hover:bg-slate-600 transition-colors"
                >
                  + Add Education
                </button>
              </div>

              <div className="space-y-4">
                {resumeData.education.map((edu, index) => (
                  <div key={edu.id} className="p-4 bg-slate-700/50 rounded-xl border border-slate-600">
                    <div className="flex justify-between mb-3">
                      <span className="text-sm text-slate-400">Education #{index + 1}</span>
                      {resumeData.education.length > 1 && (
                        <button
                          onClick={() => removeEducation(edu.id)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-slate-400 mb-1">Degree *</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm"
                          placeholder="Bachelor of Computer Science"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-400 mb-1">School/University *</label>
                        <input
                          type="text"
                          value={edu.school}
                          onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm"
                          placeholder="University of Sydney"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-400 mb-1">Graduation Date</label>
                        <input
                          type="text"
                          value={edu.graduationDate}
                          onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
                          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm"
                          placeholder="Dec 2020"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-400 mb-1">Location</label>
                        <input
                          type="text"
                          value={edu.location}
                          onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm"
                          placeholder="Sydney, NSW"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">Skills</h3>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm"
                  placeholder="Type a skill and press Enter"
                />
                <button
                  onClick={addSkill}
                  className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20 flex items-center gap-2 text-sm"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(index)}
                      className="text-emerald-400/50 hover:text-red-400"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-3">Tip: Include keywords from job descriptions for better ATS matching</p>
            </div>

            {/* Certifications */}
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">Certifications</h3>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newCert}
                  onChange={(e) => setNewCert(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addCertification()}
                  className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm"
                  placeholder="AWS Solutions Architect, PMP, etc."
                />
                <button
                  onClick={addCertification}
                  className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30"
                >
                  Add
                </button>
              </div>
              <div className="space-y-2">
                {resumeData.certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-3 py-2 bg-slate-700/50 rounded-lg"
                  >
                    <span className="text-white text-sm">{cert}</span>
                    <button
                      onClick={() => removeCertification(index)}
                      className="text-slate-400 hover:text-red-400"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Preview */}
        <div className={`${activeTab === 'preview' ? 'lg:col-span-2' : ''}`}>
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Preview</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-emerald-400 bg-emerald-500/20 px-2 py-1 rounded">ATS Optimized</span>
              </div>
            </div>
            
            {/* Resume Preview - ATS Friendly Format */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <div 
                ref={resumeRef}
                className={`p-8 text-black min-h-[800px] ${
                  template === 'modern' ? 'font-sans' : 
                  template === 'minimal' ? 'font-mono' : 'font-serif'
                }`}
                style={{ width: '210mm', minHeight: '297mm', backgroundColor: 'white' }}
              >
                {/* Header */}
                <div className={`text-center mb-6 pb-4 ${template !== 'minimal' ? 'border-b-2 border-gray-300' : ''}`}>
                  <h1 className={`font-bold text-gray-900 ${
                    template === 'modern' ? 'text-3xl' : 'text-2xl'
                  }`}>
                    {resumeData.personalInfo.fullName || 'Your Name'}
                  </h1>
                  <div className="flex flex-wrap justify-center gap-3 mt-2 text-sm text-gray-600">
                    {resumeData.personalInfo.email && (
                      <span>{resumeData.personalInfo.email}</span>
                    )}
                    {resumeData.personalInfo.phone && (
                      <span>| {resumeData.personalInfo.phone}</span>
                    )}
                    {resumeData.personalInfo.location && (
                      <span>| {resumeData.personalInfo.location}</span>
                    )}
                    {resumeData.personalInfo.linkedin && (
                      <span>| {resumeData.personalInfo.linkedin}</span>
                    )}
                  </div>
                </div>

                {/* Professional Summary */}
                {resumeData.summary && (
                  <div className="mb-6">
                    <h2 className={`font-bold text-gray-900 mb-2 ${
                      template === 'modern' ? 'text-lg uppercase tracking-wide border-b border-gray-300 pb-1' : 
                      template === 'minimal' ? 'text-base' : 'text-lg'
                    }`}>
                      Professional Summary
                    </h2>
                    <p className="text-gray-700 text-sm leading-relaxed">{resumeData.summary}</p>
                  </div>
                )}

                {/* Work Experience */}
                {resumeData.experience.some(exp => exp.title || exp.company) && (
                  <div className="mb-6">
                    <h2 className={`font-bold text-gray-900 mb-3 ${
                      template === 'modern' ? 'text-lg uppercase tracking-wide border-b border-gray-300 pb-1' : 
                      template === 'minimal' ? 'text-base' : 'text-lg'
                    }`}>
                      Professional Experience
                    </h2>
                    {resumeData.experience.filter(exp => exp.title || exp.company).map((exp) => (
                      <div key={exp.id} className="mb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                            <p className="text-gray-700 text-sm">{exp.company}{exp.location && `, ${exp.location}`}</p>
                          </div>
                          <span className="text-gray-600 text-sm">
                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                          </span>
                        </div>
                        <ul className="mt-2 space-y-1">
                          {exp.bullets.filter(b => b).map((bullet, i) => (
                            <li key={i} className="text-gray-700 text-sm pl-4 relative">
                              <span className="absolute left-0">•</span>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {/* Education */}
                {resumeData.education.some(edu => edu.degree || edu.school) && (
                  <div className="mb-6">
                    <h2 className={`font-bold text-gray-900 mb-3 ${
                      template === 'modern' ? 'text-lg uppercase tracking-wide border-b border-gray-300 pb-1' : 
                      template === 'minimal' ? 'text-base' : 'text-lg'
                    }`}>
                      Education
                    </h2>
                    {resumeData.education.filter(edu => edu.degree || edu.school).map((edu) => (
                      <div key={edu.id} className="mb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                            <p className="text-gray-700 text-sm">{edu.school}{edu.location && `, ${edu.location}`}</p>
                          </div>
                          {edu.graduationDate && (
                            <span className="text-gray-600 text-sm">{edu.graduationDate}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Skills */}
                {resumeData.skills.length > 0 && (
                  <div className="mb-6">
                    <h2 className={`font-bold text-gray-900 mb-2 ${
                      template === 'modern' ? 'text-lg uppercase tracking-wide border-b border-gray-300 pb-1' : 
                      template === 'minimal' ? 'text-base' : 'text-lg'
                    }`}>
                      Skills
                    </h2>
                    <p className="text-gray-700 text-sm">
                      {resumeData.skills.join(' • ')}
                    </p>
                  </div>
                )}

                {/* Certifications */}
                {resumeData.certifications.length > 0 && (
                  <div>
                    <h2 className={`font-bold text-gray-900 mb-2 ${
                      template === 'modern' ? 'text-lg uppercase tracking-wide border-b border-gray-300 pb-1' : 
                      template === 'minimal' ? 'text-base' : 'text-lg'
                    }`}>
                      Certifications
                    </h2>
                    <ul className="text-gray-700 text-sm">
                      {resumeData.certifications.map((cert, i) => (
                        <li key={i}>• {cert}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ATS Tips */}
          <div className="mt-6 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-2xl p-6 border border-emerald-500/20">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <span className="text-xl">💡</span> ATS Optimization Tips
            </h3>
            <ul className="text-slate-300 text-sm space-y-2">
              <li>• Use standard section headings (Experience, Education, Skills)</li>
              <li>• Include keywords from the job description</li>
              <li>• Use bullet points for achievements</li>
              <li>• Quantify results with numbers (increased sales by 25%)</li>
              <li>• Avoid tables, graphics, and fancy formatting</li>
              <li>• Use standard fonts (Arial, Calibri, Times New Roman)</li>
              <li>• Save as PDF to preserve formatting</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
