import { useState, useRef } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const defaultResumeData = {
  personalInfo: {
    fullName: 'Ash Williams',
    jobTitle: 'Senior Project, Program & Change Manager',
    tagline: 'Transformation & Operations Delivery | Government & Enterprise',
    email: 'ashawilliams988@gmail.com',
    phone: '0490077979',
    location: 'Brisbane, Australia',
    linkedin: 'linkedin.com/in/ashwilliams',
    portfolio: '',
  },
  summary: 'Accomplished Change and Project Director with over decade of experience in driving enterprise-wide transformation and delivering impactful change in complex environments. Expertise lies in executing strategic initiatives and redesigning operational models to enhance performance and foster stakeholder engagement. Proficient in integrating Agile, PRINCE2, and Lean methodologies to optimise project delivery and governance.',
  experience: [
    {
      id: 1,
      title: 'Strategic Change & Project Director',
      company: 'NDIA',
      location: 'Brisbane',
      startDate: 'Jan 2022',
      endDate: '',
      current: true,
      bullets: [
        'Drove strategic NDIS change initiatives that improved organisational performance and operational efficiency by 25% across multiple departments.',
        'Led cross-functional teams through complex, multi-phase projects using Agile and PRINCE2 frameworks, achieving on-time delivery rates above 95%.',
        'Strengthened stakeholder engagement and alignment, resulting in a 20% increase in executive buy-in.',
      ],
    },
    {
      id: 2,
      title: 'Associate Director - Project and Program Delivery',
      company: 'Townsville City Council',
      location: 'Townsville',
      startDate: 'Jan 2020',
      endDate: 'Dec 2022',
      current: false,
      bullets: [
        'Managed portfolio of $50M+ infrastructure and digital transformation projects.',
        'Implemented PMO governance framework reducing project overruns by 30%.',
      ],
    },
  ],
  education: [
    {
      id: 1,
      degree: 'Master of Business Administration',
      school: 'Queensland University of Technology',
      location: 'Brisbane, QLD',
      graduationDate: '2018',
      gpa: '',
    },
  ],
  skills: ['Project Management', 'Change Management', 'Agile', 'PRINCE2', 'Stakeholder Engagement', 'Strategic Planning', 'Risk Management', 'Team Leadership', 'Process Improvement', 'Business Analysis'],
  certifications: ['PRINCE2 Practitioner', 'Agile Certified Practitioner (PMI-ACP)', 'Change Management Professional'],
  languages: ['English (Native)', 'Spanish (Conversational)'],
  references: 'Available upon request',
}

// Template configurations
const templates = [
  // Row 1 - Classic & Traditional
  { id: 'classic', name: 'Classic', category: 'Simple', color: '#1e40af', preview: 'clean' },
  { id: 'traditional', name: 'Traditional', category: 'Classic', color: '#0369a1', preview: 'traditional' },
  { id: 'professional', name: 'Professional', category: 'Professional', color: '#0f766e', preview: 'professional' },
  { id: 'prime-ats', name: 'Prime ATS', category: 'ATS', color: '#374151', preview: 'ats' },
  // Row 2
  { id: 'balanced', name: 'Balanced', category: 'One column', color: '#4f46e5', preview: 'balanced' },
  { id: 'header-ats', name: 'Header ATS', category: 'ATS', color: '#0891b2', preview: 'header-ats' },
  { id: 'essential', name: 'Essential', category: 'Minimalist', color: '#64748b', preview: 'essential' },
  { id: 'polished', name: 'Polished', category: 'Modern', color: '#7c3aed', preview: 'polished' },
  // Row 3
  { id: 'vivid', name: 'Vivid', category: 'Creative', color: '#0d9488', preview: 'vivid' },
  { id: 'calligraphic', name: 'Calligraphic', category: 'Classic', color: '#1e3a8a', preview: 'calligraphic' },
  { id: 'harmonized', name: 'Harmonized', category: 'Modern', color: '#475569', preview: 'harmonized' },
  { id: 'defined', name: 'Defined', category: 'Two-column', color: '#0284c7', preview: 'defined' },
  // Row 4
  { id: 'minimalist', name: 'Minimalist', category: 'Minimalist', color: '#334155', preview: 'minimalist' },
  { id: 'industrial', name: 'Industrial', category: 'Modern', color: '#374151', preview: 'industrial' },
  { id: 'elegant', name: 'Elegant', category: 'Classic', color: '#9333ea', preview: 'elegant' },
  { id: 'bold', name: 'Bold', category: 'Creative', color: '#dc2626', preview: 'bold' },
  // Row 5
  { id: 'authority', name: 'Authority', category: 'Corporate', color: '#1e3a5f', preview: 'authority' },
  { id: 'half-tone', name: 'Half Tone', category: 'Creative', color: '#059669', preview: 'halftone' },
  { id: 'executive', name: 'Executive', category: 'Corporate', color: '#0f172a', preview: 'executive' },
  { id: 'statement', name: 'Statement', category: 'Modern', color: '#3b82f6', preview: 'statement' },
  // Row 6
  { id: 'modern', name: 'Modern', category: 'Modern', color: '#0ea5e9', preview: 'modern' },
  { id: 'creative', name: 'Creative', category: 'Creative', color: '#f59e0b', preview: 'creative' },
  { id: 'pastel', name: 'Pastel', category: 'Simple', color: '#c4b5fd', preview: 'pastel' },
  { id: 'visionary', name: 'Visionary', category: 'Picture', color: '#1f2937', preview: 'visionary' },
]

const categories = ['All templates', 'Simple', 'Creative', 'Picture', 'One column', 'Classic', 'One Page', 'Word', 'Corporate', 'Minimalist', 'ATS', 'Modern', 'Two-column', 'Professional', 'Google Docs']

const colorOptions = [
  '#f59e0b', // Amber
  '#10b981', // Emerald
  '#0ea5e9', // Sky
  '#f472b6', // Pink
  '#8b5cf6', // Violet
  '#1e40af', // Blue
  '#000000', // Black
]

export default function Resume() {
  const [resumeData, setResumeData] = useState(defaultResumeData)
  const [activeTab, setActiveTab] = useState('templates')
  const [selectedTemplate, setSelectedTemplate] = useState('header-ats')
  const [selectedColor, setSelectedColor] = useState('#0891b2')
  const [selectedCategory, setSelectedCategory] = useState('All templates')
  const [isGenerating, setIsGenerating] = useState(false)
  const [newSkill, setNewSkill] = useState('')
  const [newCert, setNewCert] = useState('')
  const resumeRef = useRef(null)

  // Filter templates by category
  const filteredTemplates = selectedCategory === 'All templates' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory)

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

  // Template preview thumbnails
  const TemplateThumbnail = ({ template, isSelected }) => {
    const baseStyle = "relative rounded-lg overflow-hidden cursor-pointer transition-all duration-200 border-2"
    const selectedStyle = isSelected ? "border-cyan-500 ring-2 ring-cyan-500/50 scale-[1.02]" : "border-transparent hover:border-slate-500"
    
    return (
      <div 
        className={`${baseStyle} ${selectedStyle} bg-white aspect-[0.77] group`}
        onClick={() => {
          setSelectedTemplate(template.id)
          setSelectedColor(template.color)
        }}
      >
        {/* Mini resume preview */}
        <div className="p-2 h-full text-[4px] leading-tight">
          {/* Header */}
          <div className="mb-1.5" style={{ borderBottom: `1px solid ${template.color}` }}>
            <div className="font-bold text-[6px] text-gray-800 pb-0.5">
              {resumeData.personalInfo.fullName || 'Your Name'}
            </div>
            <div className="text-[3px] text-gray-600 pb-1">
              {resumeData.personalInfo.email} | {resumeData.personalInfo.phone}
            </div>
          </div>
          
          {/* Profile section */}
          <div className="mb-1">
            <div className="font-bold text-[4px] px-1 py-0.5 inline-block rounded text-white mb-0.5" style={{ backgroundColor: template.color }}>
              PROFILE
            </div>
            <div className="text-gray-600 line-clamp-3">
              {resumeData.summary?.substring(0, 100)}...
            </div>
          </div>
          
          {/* Experience */}
          <div className="mb-1">
            <div className="font-bold text-[4px] px-1 py-0.5 inline-block rounded text-white mb-0.5" style={{ backgroundColor: template.color }}>
              EXPERIENCE
            </div>
            {resumeData.experience.slice(0, 2).map((exp, i) => (
              <div key={i} className="mb-0.5">
                <div className="font-semibold text-gray-800">{exp.title}</div>
                <div className="text-gray-500">{exp.company}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Format labels */}
        <div className="absolute bottom-1 right-1 flex gap-0.5">
          <span className="text-[6px] bg-red-500 text-white px-1 rounded font-medium">PDF</span>
          <span className="text-[6px] bg-blue-500 text-white px-1 rounded font-medium">DOCX</span>
        </div>

        {/* Selection checkmark */}
        {isSelected && (
          <div className="absolute top-1 right-1 w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}

        {/* Template name overlay on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-white text-xs font-medium">{template.name}</span>
        </div>
      </div>
    )
  }

  // Render resume based on template
  const renderResume = () => {
    const template = templates.find(t => t.id === selectedTemplate) || templates[0]
    
    return (
      <div 
        ref={resumeRef}
        className="bg-white text-black font-sans"
        style={{ 
          width: '210mm', 
          minHeight: '297mm', 
          padding: '0',
          fontFamily: template.id === 'calligraphic' ? 'Georgia, serif' : 
                     template.id === 'modern' ? 'Inter, sans-serif' : 
                     'Helvetica, Arial, sans-serif'
        }}
      >
        {/* Header with accent color */}
        <div 
          className="px-10 py-8"
          style={{ 
            backgroundColor: selectedColor,
            color: 'white'
          }}
        >
          <div className="text-sm text-white/80 mb-1">
            {resumeData.personalInfo.jobTitle}
          </div>
          <h1 className="text-4xl font-bold tracking-tight">
            {resumeData.personalInfo.fullName?.split(' ')[0]?.toUpperCase() || 'FIRST'}
            <br />
            {resumeData.personalInfo.fullName?.split(' ').slice(1).join(' ')?.toUpperCase() || 'LAST'}
          </h1>
          {resumeData.personalInfo.tagline && (
            <p className="text-sm mt-2 text-white/90 font-medium">
              | {resumeData.personalInfo.tagline}
            </p>
          )}
          <div className="mt-4 space-y-1 text-sm">
            <div>{resumeData.personalInfo.location}</div>
            <a href={`mailto:${resumeData.personalInfo.email}`} className="text-white underline">
              {resumeData.personalInfo.email}
            </a>
            <div>{resumeData.personalInfo.phone}</div>
          </div>
        </div>

        {/* Body */}
        <div className="px-10 py-8">
          {/* Profile Section */}
          {resumeData.summary && (
            <div className="mb-8">
              <h2 
                className="inline-block px-3 py-1 text-sm font-bold text-white mb-4"
                style={{ backgroundColor: selectedColor }}
              >
                PROFILE
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                {resumeData.summary}
              </p>
            </div>
          )}

          {/* Employment History */}
          {resumeData.experience.length > 0 && (
            <div className="mb-8">
              <h2 
                className="inline-block px-3 py-1 text-sm font-bold text-white mb-4"
                style={{ backgroundColor: selectedColor }}
              >
                EMPLOYMENT HISTORY
              </h2>
              
              {resumeData.experience.filter(exp => exp.title || exp.company).map((exp) => (
                <div key={exp.id} className="mb-6">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-900">
                      {exp.title}{exp.company && `, ${exp.company}`}{exp.location && `, ${exp.location}`}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                    {exp.startDate} — {exp.current ? 'PRESENT' : exp.endDate}
                  </p>
                  <ul className="space-y-2">
                    {exp.bullets.filter(b => b).map((bullet, i) => (
                      <li key={i} className="text-sm text-gray-700 flex">
                        <span className="mr-2 text-gray-400">•</span>
                        <span>
                          {bullet.split(/(\d+%|\d+\+?)/).map((part, j) => 
                            /\d+%|\d+\+?/.test(part) 
                              ? <strong key={j}>{part}</strong> 
                              : part
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {resumeData.education.length > 0 && resumeData.education.some(edu => edu.degree || edu.school) && (
            <div className="mb-8">
              <h2 
                className="inline-block px-3 py-1 text-sm font-bold text-white mb-4"
                style={{ backgroundColor: selectedColor }}
              >
                EDUCATION
              </h2>
              
              {resumeData.education.filter(edu => edu.degree || edu.school).map((edu) => (
                <div key={edu.id} className="mb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                      <p className="text-sm text-gray-700">{edu.school}{edu.location && `, ${edu.location}`}</p>
                    </div>
                    {edu.graduationDate && (
                      <span className="text-xs text-gray-500">{edu.graduationDate}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {resumeData.skills.length > 0 && (
            <div className="mb-8">
              <h2 
                className="inline-block px-3 py-1 text-sm font-bold text-white mb-4"
                style={{ backgroundColor: selectedColor }}
              >
                SKILLS
              </h2>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, i) => (
                  <span key={i} className="text-sm text-gray-700">
                    {skill}{i < resumeData.skills.length - 1 && ' • '}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {resumeData.certifications.length > 0 && (
            <div className="mb-8">
              <h2 
                className="inline-block px-3 py-1 text-sm font-bold text-white mb-4"
                style={{ backgroundColor: selectedColor }}
              >
                CERTIFICATIONS
              </h2>
              <ul className="space-y-1">
                {resumeData.certifications.map((cert, i) => (
                  <li key={i} className="text-sm text-gray-700">• {cert}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Sidebar - Template Selection */}
      <div className="w-[420px] bg-white border-r border-slate-200 flex flex-col overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-slate-200">
          {[
            { id: 'templates', label: 'Template & Colors' },
            { id: 'text', label: 'Text' },
            { id: 'layout', label: 'Layout' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-slate-900 border-b-2 border-cyan-500'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'templates' && (
          <div className="flex-1 overflow-y-auto p-4">
            {/* Color Picker */}
            <div className="mb-6">
              <label className="text-sm font-medium text-slate-700 mb-2 block">Main color</label>
              <div className="flex items-center gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full transition-transform ${
                      selectedColor === color ? 'ring-2 ring-offset-2 ring-cyan-500 scale-110' : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
                <button className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center text-white text-lg">
                  +
                </button>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.slice(0, 8).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-cyan-100 text-cyan-700 border border-cyan-300'
                      : 'bg-slate-100 text-slate-600 border border-transparent hover:bg-slate-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.slice(8).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-cyan-100 text-cyan-700 border border-cyan-300'
                      : 'bg-slate-100 text-slate-600 border border-transparent hover:bg-slate-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Template Grid */}
            <div className="grid grid-cols-4 gap-3">
              {filteredTemplates.map((template) => (
                <TemplateThumbnail 
                  key={template.id} 
                  template={template} 
                  isSelected={selectedTemplate === template.id}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'text' && (
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Personal Information</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  value={resumeData.personalInfo.fullName}
                  onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="Full Name"
                />
                <input
                  type="text"
                  value={resumeData.personalInfo.jobTitle}
                  onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="Job Title"
                />
                <input
                  type="text"
                  value={resumeData.personalInfo.tagline}
                  onChange={(e) => updatePersonalInfo('tagline', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="Tagline / Specialty"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="email"
                    value={resumeData.personalInfo.email}
                    onChange={(e) => updatePersonalInfo('email', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Email"
                  />
                  <input
                    type="tel"
                    value={resumeData.personalInfo.phone}
                    onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Phone"
                  />
                </div>
                <input
                  type="text"
                  value={resumeData.personalInfo.location}
                  onChange={(e) => updatePersonalInfo('location', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="Location"
                />
              </div>
            </div>

            {/* Profile Summary */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Profile Summary</h3>
              <textarea
                value={resumeData.summary}
                onChange={(e) => updateSummary(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
                placeholder="Write a brief professional summary..."
              />
            </div>

            {/* Work Experience */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-slate-900">Work Experience</h3>
                <button
                  onClick={addExperience}
                  className="text-xs text-cyan-600 hover:text-cyan-700 font-medium"
                >
                  + Add
                </button>
              </div>
              <div className="space-y-4">
                {resumeData.experience.map((exp, index) => (
                  <div key={exp.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex justify-between mb-2">
                      <span className="text-xs text-slate-500">Position {index + 1}</span>
                      {resumeData.experience.length > 1 && (
                        <button onClick={() => removeExperience(exp.id)} className="text-xs text-red-500">
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={exp.title}
                        onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                        className="w-full px-2 py-1.5 border border-slate-300 rounded text-sm"
                        placeholder="Job Title"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                          className="w-full px-2 py-1.5 border border-slate-300 rounded text-sm"
                          placeholder="Company"
                        />
                        <input
                          type="text"
                          value={exp.location}
                          onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                          className="w-full px-2 py-1.5 border border-slate-300 rounded text-sm"
                          placeholder="Location"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                          className="w-full px-2 py-1.5 border border-slate-300 rounded text-sm"
                          placeholder="Start Date"
                        />
                        <input
                          type="text"
                          value={exp.current ? 'Present' : exp.endDate}
                          onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                          disabled={exp.current}
                          className="w-full px-2 py-1.5 border border-slate-300 rounded text-sm disabled:opacity-50"
                          placeholder="End Date"
                        />
                      </div>
                      <label className="flex items-center gap-2 text-xs text-slate-600">
                        <input
                          type="checkbox"
                          checked={exp.current}
                          onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                          className="rounded border-slate-300 text-cyan-500"
                        />
                        Currently working here
                      </label>
                      <div className="pt-2">
                        <label className="text-xs text-slate-500 mb-1 block">Key Achievements</label>
                        {exp.bullets.map((bullet, bulletIndex) => (
                          <div key={bulletIndex} className="flex gap-1 mb-1">
                            <input
                              type="text"
                              value={bullet}
                              onChange={(e) => updateBullet(exp.id, bulletIndex, e.target.value)}
                              className="flex-1 px-2 py-1 border border-slate-300 rounded text-xs"
                              placeholder="Achievement..."
                            />
                            {exp.bullets.length > 1 && (
                              <button
                                onClick={() => removeBullet(exp.id, bulletIndex)}
                                className="text-red-400 hover:text-red-500 px-1"
                              >
                                ×
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          onClick={() => addBullet(exp.id)}
                          className="text-xs text-cyan-600 mt-1"
                        >
                          + Add bullet
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-slate-900">Education</h3>
                <button
                  onClick={addEducation}
                  className="text-xs text-cyan-600 hover:text-cyan-700 font-medium"
                >
                  + Add
                </button>
              </div>
              <div className="space-y-3">
                {resumeData.education.map((edu, index) => (
                  <div key={edu.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex justify-between mb-2">
                      <span className="text-xs text-slate-500">Education {index + 1}</span>
                      {resumeData.education.length > 1 && (
                        <button onClick={() => removeEducation(edu.id)} className="text-xs text-red-500">
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                        className="w-full px-2 py-1.5 border border-slate-300 rounded text-sm"
                        placeholder="Degree"
                      />
                      <input
                        type="text"
                        value={edu.school}
                        onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                        className="w-full px-2 py-1.5 border border-slate-300 rounded text-sm"
                        placeholder="School / University"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={edu.location}
                          onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                          className="w-full px-2 py-1.5 border border-slate-300 rounded text-sm"
                          placeholder="Location"
                        />
                        <input
                          type="text"
                          value={edu.graduationDate}
                          onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
                          className="w-full px-2 py-1.5 border border-slate-300 rounded text-sm"
                          placeholder="Year"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Skills</h3>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  className="flex-1 px-2 py-1.5 border border-slate-300 rounded text-sm"
                  placeholder="Add a skill"
                />
                <button
                  onClick={addSkill}
                  className="px-3 py-1.5 bg-cyan-500 text-white rounded text-sm hover:bg-cyan-600"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-1">
                {resumeData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-2 py-0.5 bg-cyan-50 text-cyan-700 rounded text-xs border border-cyan-200"
                  >
                    {skill}
                    <button onClick={() => removeSkill(index)} className="hover:text-red-500">×</button>
                  </span>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Certifications</h3>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newCert}
                  onChange={(e) => setNewCert(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addCertification()}
                  className="flex-1 px-2 py-1.5 border border-slate-300 rounded text-sm"
                  placeholder="Add a certification"
                />
                <button
                  onClick={addCertification}
                  className="px-3 py-1.5 bg-cyan-500 text-white rounded text-sm hover:bg-cyan-600"
                >
                  Add
                </button>
              </div>
              <div className="space-y-1">
                {resumeData.certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-2 py-1 bg-slate-50 rounded text-sm"
                  >
                    <span>{cert}</span>
                    <button onClick={() => removeCertification(index)} className="text-slate-400 hover:text-red-500">×</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'layout' && (
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Section Order</h3>
                <p className="text-xs text-slate-500 mb-3">Drag to reorder sections (coming soon)</p>
                <div className="space-y-2">
                  {['Profile', 'Employment History', 'Education', 'Skills', 'Certifications'].map((section, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-slate-400">≡</span>
                      <span className="text-sm text-slate-700">{section}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Page Settings</h3>
                <div className="space-y-3">
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Show page numbers</span>
                    <input type="checkbox" className="rounded border-slate-300 text-cyan-500" />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Single page only</span>
                    <input type="checkbox" className="rounded border-slate-300 text-cyan-500" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Side - Live Preview */}
      <div className="flex-1 bg-slate-100 flex flex-col">
        {/* Top Toolbar */}
        <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-50">
              Edit
            </button>
            <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-50">
              Customize
            </button>
            <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center gap-1">
              AI Review
              <span className="bg-orange-500 text-white text-[10px] px-1 rounded font-bold">NEW</span>
            </button>
            <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-50">
              Tailor
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-sm text-green-600 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              AI Ready
            </span>
            <button
              onClick={generatePDF}
              disabled={isGenerating}
              className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-lg hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  Download
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 overflow-auto p-8 flex justify-center">
          <div className="shadow-2xl">
            {renderResume()}
          </div>
        </div>

        {/* Page Navigation */}
        <div className="bg-white border-t border-slate-200 px-6 py-3 flex items-center justify-center gap-4">
          <button className="p-1 text-slate-400 hover:text-slate-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-sm text-slate-600">
            <span className="bg-slate-100 px-2 py-1 rounded">1</span>
            <span className="mx-2">/</span>
            <span>3</span>
          </span>
          <button className="p-1 text-slate-400 hover:text-slate-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
