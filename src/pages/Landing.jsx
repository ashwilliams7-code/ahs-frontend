import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Landing() {
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [showDemo, setShowDemo] = useState(false)
  const [showContact, setShowContact] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email, password)
      navigate('/apps')
    } catch (err) {
      setError(err.message || 'Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signUp(email, password)
      navigate('/apps')
    } catch (err) {
      setError(err.message || 'Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  // Services we offer
  const services = [
    {
      icon: '📞',
      title: 'AI reception & inbox triage',
      description: 'Capture calls, emails and website enquiries, sort urgency, route work, and draft fast replies before leads go cold.',
      color: 'from-emerald-500 to-cyan-500',
    },
    {
      icon: '📈',
      title: 'Lead follow-up systems',
      description: 'Automatically chase enquiries, qualify interest, send reminders, book appointments and update your CRM without relying on memory.',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: '🧾',
      title: 'Quoting & admin automation',
      description: 'Turn forms, emails, PDFs and job notes into structured quote briefs, tasks and handoffs your team can approve.',
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: '📊',
      title: 'Owner dashboards & integrations',
      description: 'Connect CRMs, spreadsheets, inboxes and job tools so owners can see leads, quotes, workload and bottlenecks in one place.',
      color: 'from-violet-500 to-purple-600',
    },
  ]

  const stats = [
    { value: 'Faster', label: 'Enquiry response + follow-up' },
    { value: 'Less', label: 'Manual admin + double handling' },
    { value: 'Clearer', label: 'Owner visibility across ops' },
    { value: 'Safer', label: 'Human approval where it matters' },
  ]

  const painPoints = [
    {
      title: 'Missed leads',
      text: 'Customers call, email or submit a form while your team is already busy. By the time someone replies, they may have gone elsewhere.',
    },
    {
      title: 'Slow replies',
      text: 'New enquiries sit in a shared inbox waiting to be read, sorted, assigned and answered. Every delay makes the job harder to win.',
    },
    {
      title: 'Manual quoting',
      text: 'Job details arrive through emails, PDFs, photos and forms. Staff chase missing information and rebuild the same quote brief by hand.',
    },
    {
      title: 'Messy handoffs',
      text: 'Sales, admin, operations and accounts all use different notes and spreadsheets. Work gets duplicated, forgotten or handed over without context.',
    },
    {
      title: 'Spreadsheet chaos',
      text: 'Owners cannot see the full picture without opening five tools or asking three people for an update.',
    },
    {
      title: 'Staff stuck in repeat work',
      text: 'Good people lose hours answering the same questions, sending the same reminders and copying the same data between systems.',
    },
  ]

  const trustCards = [
    {
      icon: '🧭',
      title: 'Business-first discovery',
      text: 'We start with the workflow, not the technology. If automation will not save time, reduce errors or improve response speed, we will tell you.',
    },
    {
      icon: '🔗',
      title: 'Built around your tools',
      text: 'Where practical, we connect the systems you already use — email, forms, CRMs, spreadsheets, booking tools, accounting platforms and dashboards.',
    },
    {
      icon: '🛡️',
      title: 'Human approval where it matters',
      text: 'For quotes, compliance-sensitive replies and customer commitments, AI can prepare the work while your team keeps final control.',
    },
  ]

  // Industry solutions
  const industries = [
    {
      icon: '🏥',
      name: 'NDIS & Healthcare',
      gradient: 'from-indigo-500 to-purple-600',
      copy: 'Reduce repetitive admin while keeping sensitive workflows controlled, reviewed and properly documented.',
      solutions: ['Participant intake', 'Progress notes', 'Rostering', 'Invoice support', 'Compliance reminders']
    },
    {
      icon: '🔧',
      name: 'Trades & Construction',
      gradient: 'from-orange-500 to-red-500',
      copy: 'Respond faster, quote sooner and keep job information organised from first enquiry to final invoice.',
      solutions: ['Missed-call follow-up', 'Quote intake', 'Job scheduling', 'Customer reminders', 'Owner dashboards']
    },
    {
      icon: '🏠',
      name: 'Real Estate',
      gradient: 'from-amber-500 to-orange-500',
      copy: 'Keep buyers, tenants, vendors and owners updated without manually chasing every message.',
      solutions: ['Lead triage', 'Inspection bookings', 'Appraisal follow-up', 'Maintenance sorting', 'Listing admin']
    },
    {
      icon: '⚖️',
      name: 'Legal & Accounting',
      gradient: 'from-blue-500 to-indigo-500',
      copy: 'Reduce admin drag so your team spends more time on client work and less time chasing information.',
      solutions: ['Client intake', 'Document chasing', 'Matter summaries', 'Deadline reminders', 'Email drafts']
    },
    {
      icon: '🛒',
      name: 'Retail & E-Commerce',
      gradient: 'from-violet-500 to-purple-500',
      copy: 'Help customers faster, reduce support load and see what is selling, slipping or stuck.',
      solutions: ['Support triage', 'Order updates', 'Review requests', 'Inventory alerts', 'Sales dashboards']
    },
    {
      icon: '🍽️',
      name: 'Hospitality & Local Services',
      gradient: 'from-teal-500 to-emerald-500',
      copy: 'Handle repetitive booking, customer and admin work while your team focuses on service.',
      solutions: ['Booking enquiries', 'Customer FAQs', 'Roster reminders', 'Supplier admin', 'Review responses']
    },
  ]

  // Process steps
  const process = [
    { step: '01', title: 'Automation audit', desc: 'We review your workflow, tools and bottlenecks. You do not need an AI brief — just show us where work gets stuck.' },
    { step: '02', title: 'Workflow design', desc: 'We map what AI should handle, where humans stay involved, which systems connect and what success looks like.' },
    { step: '03', title: 'Build & test', desc: 'We build with real examples from your business, test edge cases and refine before anything goes live.' },
    { step: '04', title: 'Launch & support', desc: 'We train your team, monitor the automation and improve the system as your business changes.' },
  ]

  const faqs = [
    {
      question: 'Do I need to know what AI system I want?',
      answer: 'No. Most owners come with a workflow problem: missed leads, slow replies, admin overload, messy handoffs or poor visibility. We help identify the best first automation.',
    },
    {
      question: 'Will this replace my staff?',
      answer: 'The goal is to remove repetitive chasing, sorting, copying and follow-up work so your team can focus on customers, decisions and higher-value work.',
    },
    {
      question: 'Can it work with the tools we already use?',
      answer: 'In many cases, yes. We can often connect email, forms, CRMs, spreadsheets, booking systems, phone/SMS tools, accounting platforms and dashboards.',
    },
    {
      question: 'What if AI gets something wrong?',
      answer: 'We design controls into the workflow. For quotes, compliance-sensitive replies or customer commitments, AI can draft and prepare while a human approves the final action.',
    },
    {
      question: 'Can we start small?',
      answer: 'Yes — usually that is the smartest path. We start with one high-impact workflow, prove the value, then expand into the next bottleneck.',
    },
    {
      question: 'What happens on the free audit?',
      answer: 'We ask about your current tools, where work gets stuck and what outcomes matter most. You leave with practical automation opportunities and a recommended first step.',
    },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="hidden md:block">
          <div className="absolute top-0 -left-40 w-80 h-80 bg-purple-500/30 rounded-full blur-[128px]"></div>
          <div className="absolute top-1/3 -right-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-[128px]"></div>
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-500/20 rounded-full blur-[128px]"></div>
        </div>
        <div className="md:hidden absolute inset-0 bg-gradient-to-br from-purple-500/10 via-slate-950 to-emerald-500/10"></div>
        <div className="hidden md:block absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 group cursor-pointer">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 md:group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-base sm:text-lg">AI</span>
            </div>
            <div>
              <span className="font-bold text-base sm:text-xl md:group-hover:text-indigo-400 transition-colors block leading-tight">AutoAI Hub</span>
              <span className="text-[8px] sm:text-[10px] text-slate-400 block leading-tight">A Williams Group Company</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-slate-300 hover:text-white transition-colors">What We Automate</a>
            <a href="#examples" className="text-slate-300 hover:text-white transition-colors">Use Cases</a>
            <a href="#industries" className="text-slate-300 hover:text-white transition-colors">Industries</a>
            <a href="#process" className="text-slate-300 hover:text-white transition-colors">How It Works</a>
            <a href="#about" className="text-slate-300 hover:text-white transition-colors">Why Us</a>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setShowLogin(true)}
              className="px-3 sm:px-5 py-2 text-slate-300 hover:text-white transition-colors font-medium text-sm sm:text-base"
            >
              Client Login
            </button>
            <button
              onClick={() => setShowContact(true)}
              className="px-3 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/30 transition-all text-sm sm:text-base"
            >
              Free Audit
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-16 sm:pt-20 pb-24 sm:pb-32">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 animate-[fadeIn_0.6s_ease-out]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-sm text-slate-300">Practical AI automation for Australian SMBs</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight animate-[fadeIn_0.8s_ease-out]">
            Stop losing{' '}
            <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              leads and hours
            </span>{' '}
            <br />to manual admin
          </h1>
          
          <p className="text-base sm:text-xl text-slate-400 max-w-3xl mx-auto mb-10 px-2 animate-[fadeIn_1s_ease-out]">
            AutoAI Hub designs and builds AI automation systems that help your business respond faster, follow up every lead, prepare quotes, update your CRM and give owners clearer visibility.{' '}
            <span className="text-white font-medium">No jargon. No generic chatbot theatre. Just practical systems that remove work.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-[fadeIn_1.2s_ease-out]">
            <button
              onClick={() => setShowContact(true)}
              className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-semibold text-lg hover:opacity-90 active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30"
            >
              Book a Free Automation Audit
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </button>
            <button 
              onClick={() => setShowDemo(true)}
              className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-semibold text-lg hover:bg-white/10 active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              See What We Automate
            </button>
          </div>

          <p className="text-sm text-slate-500 max-w-2xl mx-auto mb-12 animate-[fadeIn_1.25s_ease-out]">
            30 minutes. No pressure. We’ll help you identify the highest-value workflow to automate first.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 text-xs sm:text-sm text-slate-300 animate-[fadeIn_1.3s_ease-out]">
            {['Lead follow-up', 'Admin automation', 'Quote workflows', 'Owner dashboards', 'Human approval'].map((item) => (
              <span key={item} className="px-3 py-2 bg-white/5 border border-white/10 rounded-full">{item}</span>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-slate-500 mt-1 text-xs sm:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Section */}
      <section className="relative z-10 px-6 py-24 bg-gradient-to-b from-slate-950 to-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full mb-6">
              <span className="text-sm text-red-300 font-medium">Where SMBs lose time, leads and margin</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Your team is busy. But the same work keeps falling through the cracks.</h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              Most small businesses do not need another app. They need fewer bottlenecks. When enquiries, quotes, handoffs and admin rely on manual effort, good leads get missed and owners lose visibility.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {painPoints.map((pain) => (
              <article key={pain.title} className="bg-slate-900/80 rounded-2xl p-6 border border-white/10 hover:border-red-300/30 transition-colors">
                <h3 className="text-lg font-bold text-white mb-3">{pain.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{pain.text}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-slate-300 max-w-3xl mx-auto">
              If this is happening every week, automation is not a nice-to-have — it is how you protect revenue, reduce admin pressure and give your team time back.
            </p>
          </div>
        </div>
      </section>

      {/* What We Automate Section */}
      <section id="services" className="relative z-10 px-6 py-24 bg-gradient-to-b from-transparent to-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-6">
              <span className="text-sm text-indigo-400 font-medium">What We Automate</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Useful AI systems that do real work inside your business.</h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              We connect the tools your business already uses — inboxes, CRMs, forms, calendars, spreadsheets, phone/SMS and dashboards — then automate the repeat steps safely.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group relative rounded-2xl p-1 transition-all duration-300 md:hover:-translate-y-2"
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm`}></div>
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-20`}></div>
                <div className="relative bg-slate-900/95 rounded-2xl p-6 border border-white/10 group-hover:border-white/20 transition-colors h-full">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 text-2xl shadow-lg`}>
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Examples Section */}
      <section id="examples" className="relative z-10 px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6">
              <span className="text-sm text-cyan-400 font-medium">Use Case</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">From enquiry to follow-up — without manual chasing.</h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              Here is the kind of practical workflow we build for service businesses that rely on fast replies, accurate quotes and consistent follow-up.
            </p>
          </div>

          {/* AI Voice Agent Example */}
          <div className="bg-slate-800/50 rounded-3xl p-6 sm:p-10 border border-slate-700 mb-8">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* Left: Description */}
              <div className="lg:w-1/3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-4">
                  <span className="text-xs text-emerald-400 font-medium">Example Workflow</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">AI Lead & Quote Assistant</h3>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  A new enquiry comes in through your website, email, phone or social channel. The assistant captures the details, asks for missing information, updates your workflow and prepares the next step for your team to approve.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span className="text-slate-300 text-sm">Captures enquiries from email, forms, phone or social</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span className="text-slate-300 text-sm">Asks qualifying questions before your team steps in</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span className="text-slate-300 text-sm">Drafts replies, quote notes and follow-up reminders</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span className="text-slate-300 text-sm">Updates your CRM or dashboard so owners can see status</span>
                  </div>
                </div>
              </div>

              {/* Right: Architecture Diagram */}
              <div className="lg:w-2/3">
                <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-700">
                  <h4 className="text-sm font-semibold text-slate-400 mb-6 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                    </svg>
                    Workflow Map
                  </h4>
                  
                  {/* Architecture Flow */}
                  <div className="relative">
                    {/* Mobile: Stack layout */}
                    <div className="flex flex-col gap-4 lg:hidden">
                      {/* CRM */}
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl shadow-lg flex-shrink-0">
                          📊
                        </div>
                        <div>
                          <p className="font-semibold text-white">Lead Source</p>
                          <p className="text-xs text-slate-500">Email, phone, forms</p>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                      </div>
                      {/* GPT */}
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-2xl shadow-lg flex-shrink-0">
                          🧠
                        </div>
                        <div>
                          <p className="font-semibold text-white">AI Assistant</p>
                          <p className="text-xs text-slate-500">Sorts + drafts</p>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                      </div>
                      {/* Eleven Labs */}
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-2xl shadow-lg flex-shrink-0">
                          🎙️
                        </div>
                        <div>
                          <p className="font-semibold text-white">Team Review</p>
                          <p className="text-xs text-slate-500">Approves key steps</p>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                      </div>
                      {/* Follow-up */}
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center text-2xl shadow-lg flex-shrink-0">
                          📞
                        </div>
                        <div>
                          <p className="font-semibold text-white">Follow-up</p>
                          <p className="text-xs text-slate-500">SMS, email, calls</p>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                      </div>
                      {/* Customer */}
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-2xl shadow-lg flex-shrink-0">
                          👤
                        </div>
                        <div>
                          <p className="font-semibold text-white">Customer / Owner</p>
                          <p className="text-xs text-slate-500">Gets update</p>
                        </div>
                      </div>
                    </div>

                    {/* Desktop: Horizontal flow */}
                    <div className="hidden lg:block">
                      <div className="flex items-center justify-between">
                        {/* CRM */}
                        <div className="flex flex-col items-center">
                          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-3xl shadow-lg shadow-blue-500/30">
                            📊
                          </div>
                          <p className="mt-3 font-semibold text-white text-sm">Lead Source</p>
                          <p className="text-xs text-slate-500">Lead details</p>
                        </div>

                        {/* Arrow */}
                        <div className="flex-1 flex items-center justify-center px-2">
                          <div className="h-0.5 flex-1 bg-gradient-to-r from-blue-500 to-emerald-500"></div>
                          <svg className="w-4 h-4 text-emerald-500 -ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
                          </svg>
                        </div>

                        {/* GPT */}
                        <div className="flex flex-col items-center">
                          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-3xl shadow-lg shadow-emerald-500/30">
                            🧠
                          </div>
                          <p className="mt-3 font-semibold text-white text-sm">AI Assistant</p>
                          <p className="text-xs text-slate-500">Workflow brain</p>
                        </div>

                        {/* Arrow */}
                        <div className="flex-1 flex items-center justify-center px-2">
                          <div className="h-0.5 flex-1 bg-gradient-to-r from-emerald-500 to-purple-500"></div>
                          <svg className="w-4 h-4 text-purple-500 -ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
                          </svg>
                        </div>

                        {/* Team review */}
                        <div className="flex flex-col items-center">
                          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-3xl shadow-lg shadow-purple-500/30">
                            🎙️
                          </div>
                          <p className="mt-3 font-semibold text-white text-sm">Team Review</p>
                          <p className="text-xs text-slate-500">Approval</p>
                        </div>

                        {/* Arrow */}
                        <div className="flex-1 flex items-center justify-center px-2">
                          <div className="h-0.5 flex-1 bg-gradient-to-r from-purple-500 to-red-500"></div>
                          <svg className="w-4 h-4 text-red-500 -ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
                          </svg>
                        </div>

                        {/* Follow-up */}
                        <div className="flex flex-col items-center">
                          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center text-3xl shadow-lg shadow-red-500/30">
                            📞
                          </div>
                          <p className="mt-3 font-semibold text-white text-sm">Follow-up</p>
                          <p className="text-xs text-slate-500">Comms</p>
                        </div>

                        {/* Arrow */}
                        <div className="flex-1 flex items-center justify-center px-2">
                          <div className="h-0.5 flex-1 bg-gradient-to-r from-red-500 to-amber-500"></div>
                          <svg className="w-4 h-4 text-amber-500 -ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
                          </svg>
                        </div>

                        {/* Customer */}
                        <div className="flex flex-col items-center">
                          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-3xl shadow-lg shadow-amber-500/30">
                            👤
                          </div>
                          <p className="mt-3 font-semibold text-white text-sm">Customer / Owner</p>
                          <p className="text-xs text-slate-500">Gets update</p>
                        </div>
                      </div>

                      {/* Flow description */}
                      <div className="mt-8 grid grid-cols-5 gap-4 text-center">
                        <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
                          <p className="text-xs text-blue-400">1. Capture enquiry details</p>
                        </div>
                        <div className="bg-emerald-500/10 rounded-lg p-3 border border-emerald-500/20">
                          <p className="text-xs text-emerald-400">2. Qualify and structure</p>
                        </div>
                        <div className="bg-purple-500/10 rounded-lg p-3 border border-purple-500/20">
                          <p className="text-xs text-purple-400">3. Draft next action</p>
                        </div>
                        <div className="bg-red-500/10 rounded-lg p-3 border border-red-500/20">
                          <p className="text-xs text-red-400">4. Send or assign follow-up</p>
                        </div>
                        <div className="bg-amber-500/10 rounded-lg p-3 border border-amber-500/20">
                          <p className="text-xs text-amber-400">5. Update dashboard</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="mt-8 pt-6 border-t border-slate-700">
                    <p className="text-xs text-slate-500 mb-3">Connected tools can include:</p>
                    <div className="flex flex-wrap gap-2">
                      {['Website forms', 'Email inbox', 'Phone/SMS', 'CRM', 'Calendar', 'Quote templates', 'Dashboards', 'Human approval'].map((tech) => (
                        <span key={tech} className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs border border-slate-700">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Outcome Snapshot */}
            <div className="mt-6 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-2xl p-6 border border-emerald-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-white">What the workflow handles</h4>
                  <p className="text-xs text-slate-400">The goal is fewer dropped balls, faster replies and cleaner handoffs.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {[
                  ['Capture', 'Every enquiry lands in one process'],
                  ['Qualify', 'Missing details are chased early'],
                  ['Draft', 'Replies and quote notes are prepared'],
                  ['Update', 'CRM, tasks and dashboards stay current'],
                  ['Follow up', 'Leads do not rely on staff memory'],
                ].map(([title, body]) => (
                  <div key={title} className="bg-slate-900/60 rounded-xl p-4 border border-slate-700">
                    <p className="text-sm font-bold text-emerald-300 mb-2">{title}</p>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 bg-emerald-500/10 rounded-lg px-4 py-3 border border-emerald-500/20">
                <p className="text-xs text-emerald-300">💡 Best for service businesses that lose revenue when enquiries, quotes or follow-ups move slowly.</p>
              </div>
            </div>
          </div>

          {/* More Examples Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '📧',
                title: 'AI inbox assistant',
                desc: 'Reads incoming emails, sorts requests by urgency, drafts replies, creates tasks and escalates anything important.',
                techs: ['Email', 'CRM', 'Tasks'],
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                icon: '📋',
                title: 'Smart quote preparation',
                desc: 'Collects job details from forms, emails and files, then prepares a clean quote brief for approval.',
                techs: ['Forms', 'Files', 'CRM'],
                gradient: 'from-orange-500 to-red-500'
              },
              {
                icon: '💬',
                title: 'Customer support assistant',
                desc: 'Answers common questions, drafts responses, summarises conversations and escalates complex issues to humans.',
                techs: ['FAQs', 'Inbox', 'Escalation'],
                gradient: 'from-violet-500 to-purple-500'
              },
            ].map((example, idx) => (
              <div key={idx} className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 hover:border-slate-600 transition-all">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${example.gradient} flex items-center justify-center text-2xl mb-4 shadow-lg`}>
                  {example.icon}
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{example.title}</h4>
                <p className="text-slate-400 text-sm mb-4">{example.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {example.techs.map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-slate-900 text-slate-400 rounded text-xs border border-slate-700">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-400 mb-4">These are examples. The best first build is the workflow costing your business the most time or revenue.</p>
            <button
              onClick={() => setShowContact(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-semibold hover:opacity-90 active:scale-[0.97] transition-all"
            >
              <span>Find My Highest-Value Workflow</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section id="industries" className="relative z-10 px-6 py-24 bg-gradient-to-b from-transparent to-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
              <span className="text-sm text-emerald-400 font-medium">Built Around Your Industry</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Practical AI automation for the way your business actually runs.</h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              Every business has repeatable work hiding inside emails, calls, forms, spreadsheets and admin processes. We design automation around those workflows without forcing you to rebuild everything overnight.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {industries.map((industry, idx) => (
              <div 
                key={idx}
                className="group relative rounded-2xl p-1 transition-all duration-300 md:hover:-translate-y-2 cursor-pointer"
                onClick={() => setShowContact(true)}
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${industry.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm`}></div>
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${industry.gradient} opacity-20`}></div>
                
                <div className="relative bg-slate-900/95 rounded-2xl p-6 border border-white/10 group-hover:border-white/20 transition-colors h-full">
                  <div className="flex items-center gap-4 mb-5">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${industry.gradient} flex items-center justify-center text-2xl shadow-lg`}>
                      {industry.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white">{industry.name}</h3>
                  </div>
                  
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">{industry.copy}</p>
                  <div className="flex flex-wrap gap-2">
                    {industry.solutions.map((solution, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1.5 bg-white/5 text-slate-300 rounded-lg text-sm border border-white/10 group-hover:bg-white/10 transition-colors"
                      >
                        {solution}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-slate-400 mb-6">Don’t see your industry? If your team repeats the same admin, follow-up, quoting or reporting tasks every week, there is likely a workflow we can automate.</p>
            <button
              onClick={() => setShowContact(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl font-semibold hover:opacity-90 active:scale-[0.97] transition-all"
            >
              <span>Tell Us About Your Workflow</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section id="process" className="relative z-10 px-6 py-24 bg-gradient-to-b from-transparent to-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6">
              <span className="text-sm text-amber-400 font-medium">How It Works</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">A clear path from messy workflow to working automation.</h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              We keep the process practical: find the workflow costing the most time or revenue, design the right controls, build it, test it and launch it with your team.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((item, index) => (
              <div key={index} className="relative">
                {/* Connector line */}
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-indigo-500/50 to-transparent"></div>
                )}
                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 hover:border-slate-600 transition-all h-full relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4 text-lg font-bold shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => setShowContact(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-semibold text-lg hover:opacity-90 active:scale-[0.97] transition-all shadow-lg shadow-indigo-500/30"
            >
              Book Your Free Automation Audit
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section id="testimonials" className="relative z-10 px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-full mb-6">
              <span className="text-sm text-pink-400 font-medium">Why Businesses Trust AutoAI Hub</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Built for daily operations, not demo day.</h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              The work is only successful if your team can use it every day. That means practical workflows, clear controls, clean handover and support after launch.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {trustCards.map((card) => (
              <article
                key={card.title}
                className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 hover:border-slate-600 transition-all md:hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl mb-5 shadow-lg shadow-indigo-500/20">
                  {card.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{card.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 px-6 py-24 bg-gradient-to-b from-slate-900/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-6">
              <span className="text-sm text-indigo-400 font-medium">A Williams Group Company</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Built by operators, not AI hype merchants.</h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              We do not sell generic AI tools and leave you to figure them out. We map the workflow, build the automation, connect it to your systems, train your team and support the process after launch.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 hover:border-slate-600 transition-all md:hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-6 text-2xl shadow-lg shadow-indigo-500/20">
                🏢
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Williams Group</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                AutoAI Hub is part of Williams Group — an Australian venture stack focused on practical AI systems, automation and operational leverage for growing businesses.
              </p>
              <p className="text-indigo-400 text-sm font-medium italic">
                "Useful before it is fancy."
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 hover:border-slate-600 transition-all md:hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center mb-6 text-2xl shadow-lg shadow-emerald-500/20">
                🎯
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Our Approach</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                We start with the workflow. If automation will not save time, reduce errors, improve response speed or create clearer visibility, we will tell you before we build it.
              </p>
              <p className="text-emerald-400 text-sm font-medium italic">
                "Workflow first. AI second."
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 hover:border-slate-600 transition-all md:hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-6 text-2xl shadow-lg shadow-amber-500/20">
                👤
              </div>
              <h3 className="text-xl font-bold text-white mb-4">The Founder</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                <span className="text-white font-medium">Ash Williams</span> — Brisbane-based builder and operator working across product, automation, research and agent systems. The focus is practical AI that runs inside real businesses.
              </p>
              <p className="text-amber-400 text-sm font-medium italic">
                "Build close to the work."
              </p>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/5 border border-white/10 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-slate-300 text-sm">Australian-owned • Built for SMB workflows • Human approval where it matters</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 px-6 py-24 bg-gradient-to-b from-slate-900/50 to-transparent">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6">
              <span className="text-sm text-cyan-300 font-medium">Questions Owners Ask</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">New to AI automation? Start here.</h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              You do not need to know the tech. You only need to know where your business is losing time, leads or visibility.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {faqs.map((item) => (
              <article key={item.question} className="bg-slate-900/80 rounded-2xl p-6 border border-white/10">
                <h3 className="text-white font-bold mb-3">{item.question}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden">
            <div className="hidden md:block">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Find the workflow costing your business the most time.</h2>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
                Book a free 30-minute automation audit. We’ll help identify where AI can reduce admin, speed up replies, improve follow-up and give you clearer visibility.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => setShowContact(true)}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-semibold text-lg hover:opacity-90 active:scale-[0.97] transition-all shadow-lg shadow-indigo-500/30"
                >
                  Book a Free Automation Audit
                </button>
                <a 
                  href="mailto:hello@autoaihub.io"
                  className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  hello@autoaihub.io
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="font-semibold">AutoAI Hub</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
            <p className="text-sm text-slate-500">© 2024 AutoAI Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowLogin(false)}></div>
          <div className="relative bg-slate-900 rounded-3xl p-8 w-full max-w-md border border-slate-700 shadow-2xl">
            <button onClick={() => setShowLogin(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">AI</span>
              </div>
              <h2 className="text-2xl font-bold text-white">Client Portal</h2>
              <p className="text-slate-400 mt-1">Sign in to access your dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="••••••••" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 disabled:opacity-50 transition-all">
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-400">
              Need an account?{' '}
              <button onClick={() => { setShowLogin(false); setShowContact(true); }} className="text-indigo-400 hover:text-indigo-300 font-medium">
                Contact us
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Signup Modal - kept for existing users */}
      {showSignup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowSignup(false)}></div>
          <div className="relative bg-slate-900 rounded-3xl p-8 w-full max-w-md border border-slate-700 shadow-2xl">
            <button onClick={() => setShowSignup(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">AI</span>
              </div>
              <h2 className="text-2xl font-bold text-white">Create Account</h2>
              <p className="text-slate-400 mt-1">Access your AI solutions</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="••••••••" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 disabled:opacity-50 transition-all">
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-400">
              Already have an account?{' '}
              <button onClick={() => { setShowSignup(false); setShowLogin(true); }} className="text-indigo-400 hover:text-indigo-300 font-medium">
                Sign in
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Contact/Quote Modal */}
      {showContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowContact(false)}></div>
          <div className="relative bg-slate-900 rounded-3xl p-8 w-full max-w-lg border border-slate-700 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowContact(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">AI</span>
              </div>
              <h2 className="text-2xl font-bold text-white">Let's Talk</h2>
              <p className="text-slate-400 mt-1">Tell us where work gets stuck and we’ll help find the best first automation.</p>
            </div>

            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Thanks! We\'ll be in touch within 24 hours.'); setShowContact(false); }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">First Name</label>
                  <input type="text" required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Last Name</label>
                  <input type="text" required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="Smith" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                <input type="email" required
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="john@company.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Phone</label>
                <input type="tel"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="0400 000 000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Business Name</label>
                <input type="text" required
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Your Company Pty Ltd" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Industry</label>
                <select required className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all">
                  <option value="">Select your industry</option>
                  <option value="ndis">NDIS / Healthcare</option>
                  <option value="trades">Trades / Construction</option>
                  <option value="realestate">Real Estate</option>
                  <option value="legal">Legal / Accounting</option>
                  <option value="retail">Retail / E-Commerce</option>
                  <option value="hospitality">Hospitality / Food</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Where is your team losing time?</label>
                <textarea required rows={4}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                  placeholder="Example: missed leads, slow quoting, inbox overload, manual reports, CRM updates, support tickets..."></textarea>
              </div>
              <button type="submit"
                className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all">
                Request Free Automation Audit
              </button>
            </form>

            <p className="mt-4 text-center text-xs text-slate-500">
              No pressure • No jargon • We’ll respond within 24 hours
            </p>
          </div>
        </div>
      )}

      {/* Demo Modal */}
      {showDemo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowDemo(false)}></div>
          <div className="relative w-full max-w-4xl">
            <button onClick={() => setShowDemo(false)} className="absolute -top-12 right-0 text-white/70 hover:text-white flex items-center gap-2 text-sm">
              Close
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <div className="relative pt-[56.25%] rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/20 border border-white/10">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/rA6Ml2qalUw?autoplay=1&rel=0&modestbranding=1&playsinline=1"
                title="AutoAI Hub Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                allowFullScreen
              ></iframe>
            </div>
            <p className="text-center text-slate-400 mt-4 text-sm">See examples of custom AI solutions we've built</p>
          </div>
        </div>
      )}
    </div>
  )
}
