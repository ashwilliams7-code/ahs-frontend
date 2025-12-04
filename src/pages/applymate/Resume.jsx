import { useState, useRef } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from 'docx'
import { saveAs } from 'file-saver'

const defaultResumeData = {
  personalInfo: {
    fullName: '',
    jobTitle: '',
    tagline: '',
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
  languages: [],
  references: '',
}

// Template configurations with different LAYOUTS
const templates = [
  // Row 1 - Different Layout Styles
  { id: 'classic', name: 'Classic', category: 'Simple', layout: 'classic', color: '#1e40af' },
  { id: 'modern-sidebar', name: 'Modern', category: 'Two-column', layout: 'sidebar-left', color: '#0891b2' },
  { id: 'executive', name: 'Executive', category: 'Corporate', layout: 'executive', color: '#1e3a5f' },
  { id: 'minimal', name: 'Minimal', category: 'Minimalist', layout: 'minimal', color: '#374151' },
  
  // Row 2
  { id: 'professional', name: 'Professional', category: 'Professional', layout: 'professional', color: '#0f766e' },
  { id: 'creative', name: 'Creative', category: 'Creative', layout: 'creative', color: '#7c3aed' },
  { id: 'ats-simple', name: 'ATS Simple', category: 'ATS', layout: 'ats', color: '#334155' },
  { id: 'header-banner', name: 'Banner', category: 'Modern', layout: 'banner', color: '#0ea5e9' },
  
  // Row 3
  { id: 'sidebar-right', name: 'Sidebar Right', category: 'Two-column', layout: 'sidebar-right', color: '#059669' },
  { id: 'elegant', name: 'Elegant', category: 'Classic', layout: 'elegant', color: '#9333ea' },
  { id: 'bold', name: 'Bold', category: 'Creative', layout: 'bold', color: '#dc2626' },
  { id: 'corporate', name: 'Corporate', category: 'Corporate', layout: 'corporate', color: '#1e3a8a' },
  
  // Row 4
  { id: 'timeline', name: 'Timeline', category: 'Modern', layout: 'timeline', color: '#0369a1' },
  { id: 'clean', name: 'Clean', category: 'Simple', layout: 'clean', color: '#64748b' },
  { id: 'accent', name: 'Accent', category: 'Creative', layout: 'accent', color: '#f59e0b' },
  { id: 'formal', name: 'Formal', category: 'Classic', layout: 'formal', color: '#374151' },
]

const categories = ['All templates', 'Simple', 'Creative', 'Two-column', 'Classic', 'Corporate', 'Minimalist', 'ATS', 'Modern', 'Professional']

const colorOptions = [
  '#0891b2', // Cyan
  '#059669', // Emerald  
  '#1e40af', // Blue
  '#7c3aed', // Violet
  '#dc2626', // Red
  '#f59e0b', // Amber
  '#374151', // Gray
  '#000000', // Black
]

export default function Resume() {
  const [resumeData, setResumeData] = useState(defaultResumeData)
  const [activeTab, setActiveTab] = useState('templates')
  const [selectedTemplate, setSelectedTemplate] = useState('modern-sidebar')
  const [selectedColor, setSelectedColor] = useState('#0891b2')
  const [selectedCategory, setSelectedCategory] = useState('All templates')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showDownloadMenu, setShowDownloadMenu] = useState(false)
  const [newSkill, setNewSkill] = useState('')
  const [newCert, setNewCert] = useState('')
  const resumeRef = useRef(null)

  const currentTemplate = templates.find(t => t.id === selectedTemplate) || templates[0]

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

  // Skills & Certifications
  const addSkill = () => {
    if (newSkill.trim()) {
      setResumeData(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }))
      setNewSkill('')
    }
  }

  const removeSkill = (index) => {
    setResumeData(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }))
  }

  const addCertification = () => {
    if (newCert.trim()) {
      setResumeData(prev => ({ ...prev, certifications: [...prev.certifications, newCert.trim()] }))
      setNewCert('')
    }
  }

  const removeCertification = (index) => {
    setResumeData(prev => ({ ...prev, certifications: prev.certifications.filter((_, i) => i !== index) }))
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
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth * ratio, imgHeight * ratio)
      
      const fileName = resumeData.personalInfo.fullName 
        ? `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`
        : 'Resume.pdf'
      
      pdf.save(fileName)
    } catch (error) {
      console.error('PDF generation failed:', error)
    }
    
    setIsGenerating(false)
    setShowDownloadMenu(false)
  }

  // Generate DOCX
  const generateDOCX = async () => {
    setIsGenerating(true)
    
    try {
      const colorHex = selectedColor.replace('#', '')
      const children = []

      // Header
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: resumeData.personalInfo.fullName?.toUpperCase() || 'YOUR NAME', bold: true, size: 48, color: colorHex }),
          ],
          spacing: { after: 100 },
        })
      )

      if (resumeData.personalInfo.jobTitle) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: resumeData.personalInfo.jobTitle, size: 24, color: '666666' })],
            spacing: { after: 100 },
          })
        )
      }

      // Contact
      const contactParts = [resumeData.personalInfo.location, resumeData.personalInfo.email, resumeData.personalInfo.phone].filter(Boolean)
      if (contactParts.length > 0) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: contactParts.join(' | '), size: 20, color: '444444' })],
            spacing: { after: 300 },
            border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: colorHex } },
          })
        )
      }

      // Profile
      if (resumeData.summary) {
        children.push(
          new Paragraph({ children: [new TextRun({ text: 'PROFILE', bold: true, size: 24, color: colorHex })], heading: HeadingLevel.HEADING_2, spacing: { before: 200, after: 100 } })
        )
        children.push(
          new Paragraph({ children: [new TextRun({ text: resumeData.summary, size: 22 })], spacing: { after: 200 } })
        )
      }

      // Experience
      if (resumeData.experience.length > 0) {
        children.push(
          new Paragraph({ children: [new TextRun({ text: 'EMPLOYMENT HISTORY', bold: true, size: 24, color: colorHex })], heading: HeadingLevel.HEADING_2, spacing: { before: 200, after: 100 } })
        )
        resumeData.experience.filter(exp => exp.title || exp.company).forEach((exp) => {
          children.push(new Paragraph({ children: [new TextRun({ text: `${exp.title}${exp.company ? `, ${exp.company}` : ''}`, bold: true, size: 22 })], spacing: { before: 150 } }))
          children.push(new Paragraph({ children: [new TextRun({ text: `${exp.startDate} — ${exp.current ? 'PRESENT' : exp.endDate}`, size: 20, color: '666666', italics: true })], spacing: { after: 50 } }))
          exp.bullets.filter(b => b).forEach((bullet) => {
            children.push(new Paragraph({ children: [new TextRun({ text: `• ${bullet}`, size: 22 })], spacing: { after: 50 } }))
          })
        })
      }

      // Education
      if (resumeData.education.length > 0) {
        children.push(new Paragraph({ children: [new TextRun({ text: 'EDUCATION', bold: true, size: 24, color: colorHex })], heading: HeadingLevel.HEADING_2, spacing: { before: 200, after: 100 } }))
        resumeData.education.filter(edu => edu.degree || edu.school).forEach((edu) => {
          children.push(new Paragraph({ children: [new TextRun({ text: edu.degree, bold: true, size: 22 })], spacing: { before: 100 } }))
          children.push(new Paragraph({ children: [new TextRun({ text: `${edu.school} (${edu.graduationDate || ''})`, size: 22, color: '666666' })], spacing: { after: 100 } }))
        })
      }

      // Skills
      if (resumeData.skills.length > 0) {
        children.push(new Paragraph({ children: [new TextRun({ text: 'SKILLS', bold: true, size: 24, color: colorHex })], heading: HeadingLevel.HEADING_2, spacing: { before: 200, after: 100 } }))
        children.push(new Paragraph({ children: [new TextRun({ text: resumeData.skills.join(' • '), size: 22 })], spacing: { after: 200 } }))
      }

      const doc = new Document({ sections: [{ properties: {}, children }] })
      const blob = await Packer.toBlob(doc)
      const fileName = resumeData.personalInfo.fullName ? `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.docx` : 'Resume.docx'
      saveAs(blob, fileName)
    } catch (error) {
      console.error('DOCX generation failed:', error)
    }
    
    setIsGenerating(false)
    setShowDownloadMenu(false)
  }

  // ============================================
  // TEMPLATE LAYOUTS
  // ============================================

  // Layout 1: Sidebar Left (Two-column with left sidebar)
  const renderSidebarLeft = () => (
    <div className="flex" style={{ width: '210mm', minHeight: '297mm', fontFamily: 'Helvetica, Arial, sans-serif' }}>
      {/* Left Sidebar */}
      <div className="w-1/3 p-6 text-white" style={{ backgroundColor: selectedColor }}>
        {/* Photo placeholder */}
        <div className="w-24 h-24 rounded-full bg-white/20 mx-auto mb-4 flex items-center justify-center text-4xl">
          {resumeData.personalInfo.fullName?.charAt(0) || 'A'}
        </div>
        
        <h1 className="text-xl font-bold text-center mb-1">{resumeData.personalInfo.fullName}</h1>
        <p className="text-xs text-center opacity-90 mb-6">{resumeData.personalInfo.jobTitle}</p>
        
        {/* Details */}
        <div className="mb-6">
          <h3 className="text-sm font-bold uppercase tracking-wide border-b border-white/30 pb-1 mb-3">Details</h3>
          <div className="space-y-2 text-xs">
            <div><span className="opacity-70">Address</span><br/>{resumeData.personalInfo.location}</div>
            <div><span className="opacity-70">Phone</span><br/>{resumeData.personalInfo.phone}</div>
            <div><span className="opacity-70">Email</span><br/>{resumeData.personalInfo.email}</div>
          </div>
        </div>
        
        {/* Skills */}
        <div className="mb-6">
          <h3 className="text-sm font-bold uppercase tracking-wide border-b border-white/30 pb-1 mb-3">Skills</h3>
          <div className="space-y-1">
            {resumeData.skills.map((skill, i) => (
              <div key={i} className="text-xs">{skill}</div>
            ))}
          </div>
        </div>
        
        {/* Certifications */}
        {resumeData.certifications.length > 0 && (
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide border-b border-white/30 pb-1 mb-3">Certifications</h3>
            <div className="space-y-1">
              {resumeData.certifications.map((cert, i) => (
                <div key={i} className="text-xs">{cert}</div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Right Content */}
      <div className="w-2/3 p-8 bg-white">
        {/* Profile */}
        {resumeData.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase tracking-wide mb-3" style={{ color: selectedColor }}>Profile</h2>
            <p className="text-gray-700 text-sm leading-relaxed">{resumeData.summary}</p>
          </div>
        )}
        
        {/* Employment */}
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wide mb-4" style={{ color: selectedColor }}>Employment History</h2>
          {resumeData.experience.filter(exp => exp.title).map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-gray-900">{exp.title}, {exp.company}</h3>
                <span className="text-xs text-gray-500">{exp.location}</span>
              </div>
              <p className="text-xs text-gray-500 mb-2">{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</p>
              <ul className="space-y-1">
                {exp.bullets.filter(b => b).map((bullet, i) => (
                  <li key={i} className="text-sm text-gray-700 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-gray-400">{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Education */}
        <div>
          <h2 className="text-lg font-bold uppercase tracking-wide mb-4" style={{ color: selectedColor }}>Education</h2>
          {resumeData.education.filter(edu => edu.degree).map((edu) => (
            <div key={edu.id} className="mb-2">
              <h3 className="font-bold text-gray-900">{edu.degree}</h3>
              <p className="text-sm text-gray-600">{edu.school}, {edu.graduationDate}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // Layout 2: Sidebar Right
  const renderSidebarRight = () => (
    <div className="flex" style={{ width: '210mm', minHeight: '297mm', fontFamily: 'Helvetica, Arial, sans-serif' }}>
      {/* Left Content */}
      <div className="w-2/3 p-8 bg-white">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{resumeData.personalInfo.fullName}</h1>
        <p className="text-sm uppercase tracking-wide mb-6" style={{ color: selectedColor }}>{resumeData.personalInfo.jobTitle}</p>
        
        {resumeData.summary && (
          <div className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900 mb-2">Profile</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{resumeData.summary}</p>
          </div>
        )}
        
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900 mb-3">Employment History</h2>
          {resumeData.experience.filter(exp => exp.title).map((exp) => (
            <div key={exp.id} className="mb-4">
              <h3 className="font-semibold text-gray-900">{exp.title}</h3>
              <p className="text-sm" style={{ color: selectedColor }}>{exp.company}, {exp.location}</p>
              <p className="text-xs text-gray-400 mb-2">{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</p>
              <ul className="space-y-1">
                {exp.bullets.filter(b => b).map((bullet, i) => (
                  <li key={i} className="text-sm text-gray-600 pl-3 relative before:content-['•'] before:absolute before:left-0">{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900 mb-3">Education</h2>
          {resumeData.education.filter(edu => edu.degree).map((edu) => (
            <div key={edu.id} className="mb-2">
              <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
              <p className="text-sm text-gray-600">{edu.school}, {edu.graduationDate}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Right Sidebar */}
      <div className="w-1/3 p-6 text-white" style={{ backgroundColor: selectedColor }}>
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider mb-3 border-b border-white/30 pb-1">Contact</h3>
          <div className="space-y-2 text-xs">
            <div>{resumeData.personalInfo.location}</div>
            <div>{resumeData.personalInfo.phone}</div>
            <div>{resumeData.personalInfo.email}</div>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider mb-3 border-b border-white/30 pb-1">Skills</h3>
          <div className="space-y-1 text-xs">
            {resumeData.skills.map((skill, i) => <div key={i}>{skill}</div>)}
          </div>
        </div>
        
        {resumeData.certifications.length > 0 && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3 border-b border-white/30 pb-1">Certifications</h3>
            <div className="space-y-1 text-xs">
              {resumeData.certifications.map((cert, i) => <div key={i}>{cert}</div>)}
            </div>
          </div>
        )}
      </div>
    </div>
  )

  // Layout 3: Classic (One column, traditional)
  const renderClassic = () => (
    <div className="p-10 bg-white" style={{ width: '210mm', minHeight: '297mm', fontFamily: 'Georgia, serif' }}>
      {/* Header */}
      <div className="text-center border-b-2 pb-4 mb-6" style={{ borderColor: selectedColor }}>
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{resumeData.personalInfo.fullName}</h1>
        <p className="text-sm text-gray-600 mb-2">{resumeData.personalInfo.jobTitle}</p>
        <p className="text-xs text-gray-500">
          {resumeData.personalInfo.location} | {resumeData.personalInfo.phone} | {resumeData.personalInfo.email}
        </p>
      </div>
      
      {/* Profile */}
      {resumeData.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b pb-1 mb-2" style={{ borderColor: selectedColor, color: selectedColor }}>Professional Summary</h2>
          <p className="text-sm text-gray-700 leading-relaxed">{resumeData.summary}</p>
        </div>
      )}
      
      {/* Experience */}
      <div className="mb-6">
        <h2 className="text-lg font-bold border-b pb-1 mb-3" style={{ borderColor: selectedColor, color: selectedColor }}>Professional Experience</h2>
        {resumeData.experience.filter(exp => exp.title).map((exp) => (
          <div key={exp.id} className="mb-4">
            <div className="flex justify-between">
              <h3 className="font-bold text-gray-900">{exp.title}</h3>
              <span className="text-sm text-gray-500">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
            </div>
            <p className="text-sm text-gray-600 italic mb-2">{exp.company}, {exp.location}</p>
            <ul className="list-disc list-inside space-y-1">
              {exp.bullets.filter(b => b).map((bullet, i) => (
                <li key={i} className="text-sm text-gray-700">{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      {/* Education */}
      <div className="mb-6">
        <h2 className="text-lg font-bold border-b pb-1 mb-3" style={{ borderColor: selectedColor, color: selectedColor }}>Education</h2>
        {resumeData.education.filter(edu => edu.degree).map((edu) => (
          <div key={edu.id} className="flex justify-between mb-2">
            <div>
              <h3 className="font-bold text-gray-900">{edu.degree}</h3>
              <p className="text-sm text-gray-600">{edu.school}</p>
            </div>
            <span className="text-sm text-gray-500">{edu.graduationDate}</span>
          </div>
        ))}
      </div>
      
      {/* Skills */}
      <div>
        <h2 className="text-lg font-bold border-b pb-1 mb-2" style={{ borderColor: selectedColor, color: selectedColor }}>Skills</h2>
        <p className="text-sm text-gray-700">{resumeData.skills.join(' • ')}</p>
      </div>
    </div>
  )

  // Layout 4: Banner (Header with colored banner)
  const renderBanner = () => (
    <div className="bg-white" style={{ width: '210mm', minHeight: '297mm', fontFamily: 'Helvetica, Arial, sans-serif' }}>
      {/* Banner Header */}
      <div className="p-8 text-white" style={{ backgroundColor: selectedColor }}>
        <h1 className="text-3xl font-bold mb-1">{resumeData.personalInfo.fullName}</h1>
        <p className="text-lg opacity-90 mb-2">{resumeData.personalInfo.jobTitle}</p>
        <p className="text-sm opacity-80">{resumeData.personalInfo.tagline}</p>
        <div className="flex gap-4 mt-4 text-sm opacity-90">
          <span>{resumeData.personalInfo.location}</span>
          <span>•</span>
          <span>{resumeData.personalInfo.phone}</span>
          <span>•</span>
          <span>{resumeData.personalInfo.email}</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-8">
        {resumeData.summary && (
          <div className="mb-6">
            <h2 className="inline-block px-3 py-1 text-sm font-bold text-white mb-3" style={{ backgroundColor: selectedColor }}>PROFILE</h2>
            <p className="text-gray-700 text-sm leading-relaxed">{resumeData.summary}</p>
          </div>
        )}
        
        <div className="mb-6">
          <h2 className="inline-block px-3 py-1 text-sm font-bold text-white mb-3" style={{ backgroundColor: selectedColor }}>EMPLOYMENT HISTORY</h2>
          {resumeData.experience.filter(exp => exp.title).map((exp) => (
            <div key={exp.id} className="mb-4">
              <h3 className="font-bold text-gray-900">{exp.title}, {exp.company}, {exp.location}</h3>
              <p className="text-xs text-gray-500 uppercase mb-2">{exp.startDate} — {exp.current ? 'PRESENT' : exp.endDate}</p>
              <ul className="space-y-1">
                {exp.bullets.filter(b => b).map((bullet, i) => (
                  <li key={i} className="text-sm text-gray-700 flex"><span className="mr-2">•</span>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h2 className="inline-block px-3 py-1 text-sm font-bold text-white mb-3" style={{ backgroundColor: selectedColor }}>EDUCATION</h2>
            {resumeData.education.filter(edu => edu.degree).map((edu) => (
              <div key={edu.id} className="mb-2">
                <h3 className="font-bold text-gray-900 text-sm">{edu.degree}</h3>
                <p className="text-xs text-gray-600">{edu.school}, {edu.graduationDate}</p>
              </div>
            ))}
          </div>
          <div>
            <h2 className="inline-block px-3 py-1 text-sm font-bold text-white mb-3" style={{ backgroundColor: selectedColor }}>SKILLS</h2>
            <div className="flex flex-wrap gap-1">
              {resumeData.skills.map((skill, i) => (
                <span key={i} className="text-xs px-2 py-1 rounded text-white" style={{ backgroundColor: selectedColor }}>{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Layout 5: Minimal (Clean, lots of whitespace)
  const renderMinimal = () => (
    <div className="p-12 bg-white" style={{ width: '210mm', minHeight: '297mm', fontFamily: 'Helvetica, Arial, sans-serif' }}>
      <h1 className="text-4xl font-light text-gray-900 mb-2">{resumeData.personalInfo.fullName}</h1>
      <p className="text-lg text-gray-500 mb-8">{resumeData.personalInfo.jobTitle}</p>
      
      <div className="flex gap-6 text-sm text-gray-500 mb-12">
        <span>{resumeData.personalInfo.email}</span>
        <span>{resumeData.personalInfo.phone}</span>
        <span>{resumeData.personalInfo.location}</span>
      </div>
      
      {resumeData.summary && (
        <div className="mb-10">
          <p className="text-gray-600 leading-relaxed">{resumeData.summary}</p>
        </div>
      )}
      
      <div className="mb-10">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Experience</h2>
        {resumeData.experience.filter(exp => exp.title).map((exp) => (
          <div key={exp.id} className="mb-6">
            <div className="flex justify-between mb-1">
              <h3 className="font-medium text-gray-900">{exp.title}</h3>
              <span className="text-sm text-gray-400">{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
            </div>
            <p className="text-sm text-gray-500 mb-2">{exp.company}</p>
            <ul className="space-y-1">
              {exp.bullets.filter(b => b).map((bullet, i) => (
                <li key={i} className="text-sm text-gray-600">{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-2 gap-10">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Education</h2>
          {resumeData.education.filter(edu => edu.degree).map((edu) => (
            <div key={edu.id} className="mb-3">
              <h3 className="font-medium text-gray-900 text-sm">{edu.degree}</h3>
              <p className="text-xs text-gray-500">{edu.school}</p>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Skills</h2>
          <p className="text-sm text-gray-600">{resumeData.skills.join(', ')}</p>
        </div>
      </div>
    </div>
  )

  // Layout 6: ATS (Plain, no graphics, ATS-friendly)
  const renderATS = () => (
    <div className="p-10 bg-white" style={{ width: '210mm', minHeight: '297mm', fontFamily: 'Arial, sans-serif' }}>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-black mb-1">{resumeData.personalInfo.fullName}</h1>
        <p className="text-sm text-gray-700">{resumeData.personalInfo.location} | {resumeData.personalInfo.phone} | {resumeData.personalInfo.email}</p>
      </div>
      
      <hr className="border-gray-300 mb-4" />
      
      {resumeData.summary && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase text-black mb-2">PROFESSIONAL SUMMARY</h2>
          <p className="text-sm text-gray-800">{resumeData.summary}</p>
        </div>
      )}
      
      <div className="mb-4">
        <h2 className="text-sm font-bold uppercase text-black mb-2">PROFESSIONAL EXPERIENCE</h2>
        {resumeData.experience.filter(exp => exp.title).map((exp) => (
          <div key={exp.id} className="mb-3">
            <p className="font-bold text-sm">{exp.title}</p>
            <p className="text-sm">{exp.company}, {exp.location} | {exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
            <ul className="list-disc list-inside mt-1">
              {exp.bullets.filter(b => b).map((bullet, i) => (
                <li key={i} className="text-sm text-gray-800">{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="mb-4">
        <h2 className="text-sm font-bold uppercase text-black mb-2">EDUCATION</h2>
        {resumeData.education.filter(edu => edu.degree).map((edu) => (
          <p key={edu.id} className="text-sm">{edu.degree}, {edu.school}, {edu.graduationDate}</p>
        ))}
      </div>
      
      <div>
        <h2 className="text-sm font-bold uppercase text-black mb-2">SKILLS</h2>
        <p className="text-sm text-gray-800">{resumeData.skills.join(', ')}</p>
      </div>
    </div>
  )

  // Layout 7: Executive
  const renderExecutive = () => (
    <div className="p-10 bg-white" style={{ width: '210mm', minHeight: '297mm', fontFamily: 'Georgia, serif' }}>
      {/* Elegant Header */}
      <div className="border-b-4 pb-6 mb-8" style={{ borderColor: selectedColor }}>
        <h1 className="text-4xl font-bold tracking-tight" style={{ color: selectedColor }}>
          {resumeData.personalInfo.fullName}
        </h1>
        <p className="text-lg text-gray-600 mt-2">{resumeData.personalInfo.jobTitle}</p>
        <div className="flex gap-4 mt-4 text-sm text-gray-500">
          <span>{resumeData.personalInfo.email}</span>
          <span>|</span>
          <span>{resumeData.personalInfo.phone}</span>
          <span>|</span>
          <span>{resumeData.personalInfo.location}</span>
        </div>
      </div>
      
      {resumeData.summary && (
        <div className="mb-8">
          <h2 className="text-sm uppercase tracking-widest font-bold mb-3" style={{ color: selectedColor }}>Executive Profile</h2>
          <p className="text-gray-700 leading-relaxed italic border-l-4 pl-4" style={{ borderColor: selectedColor }}>{resumeData.summary}</p>
        </div>
      )}
      
      <div className="mb-8">
        <h2 className="text-sm uppercase tracking-widest font-bold mb-4" style={{ color: selectedColor }}>Career History</h2>
        {resumeData.experience.filter(exp => exp.title).map((exp) => (
          <div key={exp.id} className="mb-6 pl-4 border-l-2 border-gray-200">
            <h3 className="font-bold text-lg text-gray-900">{exp.title}</h3>
            <p className="text-sm font-medium" style={{ color: selectedColor }}>{exp.company} • {exp.location}</p>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</p>
            <ul className="space-y-1">
              {exp.bullets.filter(b => b).map((bullet, i) => (
                <li key={i} className="text-sm text-gray-700">• {bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-sm uppercase tracking-widest font-bold mb-3" style={{ color: selectedColor }}>Education</h2>
          {resumeData.education.filter(edu => edu.degree).map((edu) => (
            <div key={edu.id} className="mb-2">
              <p className="font-medium text-gray-900">{edu.degree}</p>
              <p className="text-sm text-gray-600">{edu.school}, {edu.graduationDate}</p>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-sm uppercase tracking-widest font-bold mb-3" style={{ color: selectedColor }}>Core Competencies</h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, i) => (
              <span key={i} className="text-xs px-2 py-1 border rounded" style={{ borderColor: selectedColor, color: selectedColor }}>{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  // Layout 8: Creative/Bold
  const renderCreative = () => (
    <div style={{ width: '210mm', minHeight: '297mm', fontFamily: 'Helvetica, Arial, sans-serif' }}>
      {/* Bold diagonal header */}
      <div className="relative overflow-hidden" style={{ backgroundColor: selectedColor, height: '200px' }}>
        <div className="absolute inset-0 flex items-center px-10">
          <div className="text-white">
            <h1 className="text-5xl font-black uppercase tracking-tight">{resumeData.personalInfo.fullName}</h1>
            <p className="text-xl mt-2 opacity-90">{resumeData.personalInfo.jobTitle}</p>
          </div>
        </div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-white/10"></div>
      </div>
      
      {/* Contact bar */}
      <div className="bg-gray-900 text-white px-10 py-3 flex gap-6 text-sm">
        <span>{resumeData.personalInfo.email}</span>
        <span>{resumeData.personalInfo.phone}</span>
        <span>{resumeData.personalInfo.location}</span>
      </div>
      
      <div className="p-10 bg-white">
        {resumeData.summary && (
          <div className="mb-8">
            <h2 className="text-2xl font-black uppercase mb-3" style={{ color: selectedColor }}>About Me</h2>
            <p className="text-gray-600 leading-relaxed">{resumeData.summary}</p>
          </div>
        )}
        
        <div className="mb-8">
          <h2 className="text-2xl font-black uppercase mb-4" style={{ color: selectedColor }}>Experience</h2>
          {resumeData.experience.filter(exp => exp.title).map((exp) => (
            <div key={exp.id} className="mb-5 pl-4 border-l-4" style={{ borderColor: selectedColor }}>
              <h3 className="font-bold text-lg">{exp.title}</h3>
              <p className="font-medium" style={{ color: selectedColor }}>{exp.company}</p>
              <p className="text-sm text-gray-400 mb-2">{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</p>
              <ul className="space-y-1">
                {exp.bullets.filter(b => b).map((bullet, i) => (
                  <li key={i} className="text-sm text-gray-600">▸ {bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-black uppercase mb-3" style={{ color: selectedColor }}>Education</h2>
            {resumeData.education.filter(edu => edu.degree).map((edu) => (
              <div key={edu.id} className="mb-2">
                <p className="font-bold">{edu.degree}</p>
                <p className="text-sm text-gray-600">{edu.school}</p>
              </div>
            ))}
          </div>
          <div>
            <h2 className="text-2xl font-black uppercase mb-3" style={{ color: selectedColor }}>Skills</h2>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, i) => (
                <span key={i} className="px-3 py-1 text-white text-sm rounded-full" style={{ backgroundColor: selectedColor }}>{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Render the correct template based on selection
  const renderResume = () => {
    const layout = currentTemplate.layout
    
    switch (layout) {
      case 'sidebar-left':
        return renderSidebarLeft()
      case 'sidebar-right':
        return renderSidebarRight()
      case 'classic':
      case 'formal':
      case 'elegant':
        return renderClassic()
      case 'banner':
      case 'professional':
      case 'corporate':
        return renderBanner()
      case 'minimal':
      case 'clean':
        return renderMinimal()
      case 'ats':
        return renderATS()
      case 'executive':
      case 'timeline':
        return renderExecutive()
      case 'creative':
      case 'bold':
      case 'accent':
        return renderCreative()
      default:
        return renderSidebarLeft()
    }
  }

  // Template thumbnail with different layout previews
  const TemplateThumbnail = ({ template, isSelected }) => {
    const getLayoutPreview = () => {
      switch (template.layout) {
        case 'sidebar-left':
          return (
            <div className="flex h-full">
              <div className="w-1/3 h-full" style={{ backgroundColor: template.color }}></div>
              <div className="w-2/3 p-1.5 space-y-1">
                <div className="h-1.5 w-3/4 bg-gray-300 rounded"></div>
                <div className="h-1 w-full bg-gray-200 rounded"></div>
                <div className="h-1 w-full bg-gray-200 rounded"></div>
              </div>
            </div>
          )
        case 'sidebar-right':
          return (
            <div className="flex h-full">
              <div className="w-2/3 p-1.5 space-y-1">
                <div className="h-1.5 w-3/4 bg-gray-300 rounded"></div>
                <div className="h-1 w-full bg-gray-200 rounded"></div>
              </div>
              <div className="w-1/3 h-full" style={{ backgroundColor: template.color }}></div>
            </div>
          )
        case 'banner':
        case 'professional':
        case 'corporate':
          return (
            <div className="h-full flex flex-col">
              <div className="h-1/4" style={{ backgroundColor: template.color }}></div>
              <div className="flex-1 p-1.5 space-y-1">
                <div className="h-1 w-full bg-gray-200 rounded"></div>
                <div className="h-1 w-full bg-gray-200 rounded"></div>
              </div>
            </div>
          )
        case 'classic':
        case 'formal':
        case 'elegant':
          return (
            <div className="h-full p-1.5 space-y-1">
              <div className="h-2 w-1/2 mx-auto rounded" style={{ backgroundColor: template.color }}></div>
              <div className="h-0.5 w-3/4 mx-auto bg-gray-200 rounded"></div>
              <div className="border-t mt-1 pt-1" style={{ borderColor: template.color }}>
                <div className="h-1 w-full bg-gray-200 rounded mb-0.5"></div>
                <div className="h-1 w-full bg-gray-200 rounded"></div>
              </div>
            </div>
          )
        case 'minimal':
        case 'clean':
          return (
            <div className="h-full p-2 space-y-1.5">
              <div className="h-2 w-3/4 bg-gray-300 rounded"></div>
              <div className="h-0.5 w-1/2 bg-gray-200 rounded"></div>
              <div className="mt-2 space-y-0.5">
                <div className="h-0.5 w-full bg-gray-100 rounded"></div>
                <div className="h-0.5 w-full bg-gray-100 rounded"></div>
              </div>
            </div>
          )
        case 'ats':
          return (
            <div className="h-full p-1.5 space-y-0.5">
              <div className="h-1.5 w-1/2 mx-auto bg-gray-400 rounded"></div>
              <div className="h-0.5 w-2/3 mx-auto bg-gray-300 rounded"></div>
              <hr className="my-1 border-gray-300" />
              <div className="space-y-0.5">
                <div className="h-0.5 w-full bg-gray-200 rounded"></div>
                <div className="h-0.5 w-full bg-gray-200 rounded"></div>
                <div className="h-0.5 w-full bg-gray-200 rounded"></div>
              </div>
            </div>
          )
        case 'executive':
        case 'timeline':
          return (
            <div className="h-full p-1.5">
              <div className="h-2 w-3/4 rounded" style={{ backgroundColor: template.color }}></div>
              <div className="border-b-2 pb-1 mb-1" style={{ borderColor: template.color }}></div>
              <div className="pl-1 border-l space-y-0.5" style={{ borderColor: template.color }}>
                <div className="h-0.5 w-full bg-gray-200 rounded"></div>
                <div className="h-0.5 w-3/4 bg-gray-200 rounded"></div>
              </div>
            </div>
          )
        case 'creative':
        case 'bold':
        case 'accent':
          return (
            <div className="h-full flex flex-col">
              <div className="h-1/3 relative overflow-hidden" style={{ backgroundColor: template.color }}>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-white/20"></div>
              </div>
              <div className="h-2 bg-gray-800"></div>
              <div className="flex-1 p-1.5 space-y-1">
                <div className="h-1.5 w-1/2 rounded" style={{ backgroundColor: template.color }}></div>
                <div className="h-0.5 w-full bg-gray-200 rounded"></div>
              </div>
            </div>
          )
        default:
          return (
            <div className="h-full p-1.5 space-y-1">
              <div className="h-2 w-1/2 rounded" style={{ backgroundColor: template.color }}></div>
              <div className="h-1 w-full bg-gray-200 rounded"></div>
            </div>
          )
      }
    }
    
    return (
      <div 
        className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-200 border-2 bg-white aspect-[0.77] group ${
          isSelected ? 'border-cyan-500 ring-2 ring-cyan-500/50 scale-[1.02]' : 'border-gray-200 hover:border-gray-400'
        }`}
        onClick={() => {
          setSelectedTemplate(template.id)
          setSelectedColor(template.color)
        }}
      >
        {getLayoutPreview()}
        
        {/* Format labels */}
        <div className="absolute bottom-1 right-1 flex gap-0.5">
          <span className="text-[5px] bg-red-500 text-white px-0.5 rounded font-medium">PDF</span>
          <span className="text-[5px] bg-blue-500 text-white px-0.5 rounded font-medium">DOCX</span>
        </div>

        {/* Selection checkmark */}
        {isSelected && (
          <div className="absolute top-1 right-1 w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}

        {/* Template name on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-white text-[10px] font-medium">{template.name}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Sidebar */}
      <div className="w-[380px] bg-white border-r border-slate-200 flex flex-col overflow-hidden">
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
              className={`flex-1 py-3 px-2 text-xs font-medium transition-colors ${
                activeTab === tab.id ? 'text-slate-900 border-b-2 border-cyan-500' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'templates' && (
          <div className="flex-1 overflow-y-auto p-4">
            {/* Color Picker */}
            <div className="mb-5">
              <label className="text-xs font-medium text-slate-700 mb-2 block">Main color</label>
              <div className="flex items-center gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-7 h-7 rounded-full transition-transform ${
                      selectedColor === color ? 'ring-2 ring-offset-2 ring-cyan-500 scale-110' : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-medium transition-colors ${
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
            <div className="grid grid-cols-4 gap-2">
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
          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            {/* Personal Info */}
            <div>
              <h3 className="text-xs font-semibold text-slate-900 mb-2">Personal Information</h3>
              <div className="space-y-2">
                <input type="text" value={resumeData.personalInfo.fullName} onChange={(e) => updatePersonalInfo('fullName', e.target.value)} className="w-full px-2 py-1.5 border border-slate-300 rounded text-sm" placeholder="Full Name" />
                <input type="text" value={resumeData.personalInfo.jobTitle} onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)} className="w-full px-2 py-1.5 border border-slate-300 rounded text-sm" placeholder="Job Title" />
                <div className="grid grid-cols-2 gap-2">
                  <input type="email" value={resumeData.personalInfo.email} onChange={(e) => updatePersonalInfo('email', e.target.value)} className="w-full px-2 py-1.5 border border-slate-300 rounded text-sm" placeholder="Email" />
                  <input type="tel" value={resumeData.personalInfo.phone} onChange={(e) => updatePersonalInfo('phone', e.target.value)} className="w-full px-2 py-1.5 border border-slate-300 rounded text-sm" placeholder="Phone" />
                </div>
                <input type="text" value={resumeData.personalInfo.location} onChange={(e) => updatePersonalInfo('location', e.target.value)} className="w-full px-2 py-1.5 border border-slate-300 rounded text-sm" placeholder="Location" />
              </div>
            </div>

            {/* Summary */}
            <div>
              <h3 className="text-xs font-semibold text-slate-900 mb-2">Profile Summary</h3>
              <textarea value={resumeData.summary} onChange={(e) => updateSummary(e.target.value)} rows={3} className="w-full px-2 py-1.5 border border-slate-300 rounded text-sm resize-none" placeholder="Professional summary..." />
            </div>

            {/* Experience */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-semibold text-slate-900">Experience</h3>
                <button onClick={addExperience} className="text-[10px] text-cyan-600 font-medium">+ Add</button>
              </div>
              {resumeData.experience.map((exp, i) => (
                <div key={exp.id} className="p-2 bg-slate-50 rounded border border-slate-200 mb-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] text-slate-500">Position {i + 1}</span>
                    {resumeData.experience.length > 1 && <button onClick={() => removeExperience(exp.id)} className="text-[10px] text-red-500">Remove</button>}
                  </div>
                  <input type="text" value={exp.title} onChange={(e) => updateExperience(exp.id, 'title', e.target.value)} className="w-full px-2 py-1 border border-slate-300 rounded text-xs mb-1" placeholder="Job Title" />
                  <div className="grid grid-cols-2 gap-1 mb-1">
                    <input type="text" value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} className="w-full px-2 py-1 border border-slate-300 rounded text-xs" placeholder="Company" />
                    <input type="text" value={exp.location} onChange={(e) => updateExperience(exp.id, 'location', e.target.value)} className="w-full px-2 py-1 border border-slate-300 rounded text-xs" placeholder="Location" />
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <input type="text" value={exp.startDate} onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)} className="w-full px-2 py-1 border border-slate-300 rounded text-xs" placeholder="Start" />
                    <input type="text" value={exp.current ? 'Present' : exp.endDate} onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)} disabled={exp.current} className="w-full px-2 py-1 border border-slate-300 rounded text-xs disabled:opacity-50" placeholder="End" />
                  </div>
                  <label className="flex items-center gap-1 mt-1 text-[10px] text-slate-600">
                    <input type="checkbox" checked={exp.current} onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)} className="rounded border-slate-300 text-cyan-500" />
                    Current job
                  </label>
                  <div className="mt-2">
                    {exp.bullets.map((bullet, bi) => (
                      <div key={bi} className="flex gap-1 mb-1">
                        <input type="text" value={bullet} onChange={(e) => updateBullet(exp.id, bi, e.target.value)} className="flex-1 px-2 py-0.5 border border-slate-300 rounded text-[10px]" placeholder="Achievement..." />
                        {exp.bullets.length > 1 && <button onClick={() => removeBullet(exp.id, bi)} className="text-red-400 px-1">×</button>}
                      </div>
                    ))}
                    <button onClick={() => addBullet(exp.id)} className="text-[10px] text-cyan-600">+ Bullet</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Education */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-semibold text-slate-900">Education</h3>
                <button onClick={addEducation} className="text-[10px] text-cyan-600 font-medium">+ Add</button>
              </div>
              {resumeData.education.map((edu, i) => (
                <div key={edu.id} className="p-2 bg-slate-50 rounded border border-slate-200 mb-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] text-slate-500">Education {i + 1}</span>
                    {resumeData.education.length > 1 && <button onClick={() => removeEducation(edu.id)} className="text-[10px] text-red-500">Remove</button>}
                  </div>
                  <input type="text" value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} className="w-full px-2 py-1 border border-slate-300 rounded text-xs mb-1" placeholder="Degree" />
                  <input type="text" value={edu.school} onChange={(e) => updateEducation(edu.id, 'school', e.target.value)} className="w-full px-2 py-1 border border-slate-300 rounded text-xs mb-1" placeholder="School" />
                  <input type="text" value={edu.graduationDate} onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)} className="w-full px-2 py-1 border border-slate-300 rounded text-xs" placeholder="Year" />
                </div>
              ))}
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-xs font-semibold text-slate-900 mb-2">Skills</h3>
              <div className="flex gap-1 mb-2">
                <input type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addSkill()} className="flex-1 px-2 py-1 border border-slate-300 rounded text-xs" placeholder="Add skill" />
                <button onClick={addSkill} className="px-2 py-1 bg-cyan-500 text-white rounded text-xs">+</button>
              </div>
              <div className="flex flex-wrap gap-1">
                {resumeData.skills.map((skill, i) => (
                  <span key={i} className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-cyan-50 text-cyan-700 rounded text-[10px] border border-cyan-200">
                    {skill} <button onClick={() => removeSkill(i)} className="hover:text-red-500">×</button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'layout' && (
          <div className="flex-1 overflow-y-auto p-4">
            <p className="text-xs text-slate-500">Drag sections to reorder (coming soon)</p>
            <div className="space-y-2 mt-4">
              {['Profile', 'Experience', 'Education', 'Skills', 'Certifications'].map((s, i) => (
                <div key={i} className="flex items-center gap-2 p-2 bg-slate-50 rounded border border-slate-200">
                  <span className="text-slate-400 cursor-move">≡</span>
                  <span className="text-sm text-slate-700">{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Preview */}
      <div className="flex-1 bg-slate-100 flex flex-col">
        {/* Toolbar */}
        <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-700">{currentTemplate.name}</span>
            <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-500 rounded">{currentTemplate.category}</span>
          </div>
          
          <div className="flex items-center gap-3 relative">
            <span className="text-sm text-green-600 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              AI Ready
            </span>
            <div className="relative">
              <button
                onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                disabled={isGenerating}
                className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-lg hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isGenerating ? 'Generating...' : 'Download'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showDownloadMenu && (
                <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden z-50">
                  <button onClick={generatePDF} className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2">
                    <span className="w-6 h-6 bg-red-500 text-white rounded flex items-center justify-center text-xs font-bold">PDF</span>
                    Download PDF
                  </button>
                  <button onClick={generateDOCX} className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2">
                    <span className="w-6 h-6 bg-blue-500 text-white rounded flex items-center justify-center text-xs font-bold">DOC</span>
                    Download DOCX
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="flex-1 overflow-auto p-8 flex justify-center">
          <div ref={resumeRef} className="shadow-2xl bg-white">
            {renderResume()}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-slate-200 px-6 py-2 flex items-center justify-center">
          <span className="text-xs text-slate-500">Page 1 of 1</span>
        </div>
      </div>
    </div>
  )
}
