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
      icon: '🤖',
      title: 'Custom AI Development',
      description: 'Bespoke AI solutions built from scratch for your unique business needs. From concept to deployment.',
      color: 'from-indigo-500 to-purple-600',
    },
    {
      icon: '⚡',
      title: 'Process Automation',
      description: 'Eliminate repetitive tasks with intelligent automation. Save 10+ hours weekly on manual work.',
      color: 'from-emerald-500 to-cyan-500',
    },
    {
      icon: '🔗',
      title: 'AI Integration',
      description: 'Seamlessly connect AI capabilities to your existing systems, CRMs, and workflows.',
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: '📊',
      title: 'AI Strategy Consulting',
      description: 'Expert guidance on implementing AI in your business. We identify opportunities and build roadmaps.',
      color: 'from-pink-500 to-rose-500',
    },
  ]

  const stats = [
    { value: '50+', label: 'Custom Solutions Built' },
    { value: '500+', label: 'Hours Saved Weekly' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '24/7', label: 'AI Working For You' },
  ]

  const testimonials = [
    {
      quote: "They built us a custom quoting system that cut our response time from 2 days to 2 hours. Game changer for our tradie business.",
      author: "Dave M.",
      role: "Owner, Melbourne Electrical",
      avatar: "D",
    },
    {
      quote: "The NDIS automation they built saves us 15 hours a week on invoicing alone. Couldn't run our business without it now.",
      author: "Sarah K.",
      role: "Director, Care Connect NDIS",
      avatar: "S",
    },
    {
      quote: "Professional, fast, and actually understood our industry. The AI solution they built handles 80% of our customer enquiries automatically.",
      author: "Michael R.",
      role: "GM, Sydney Real Estate Group",
      avatar: "M",
    },
  ]

  // Industry solutions
  const industries = [
    {
      icon: '🏥',
      name: 'NDIS & Healthcare',
      gradient: 'from-indigo-500 to-purple-600',
      solutions: ['Auto-Invoicing', 'Smart Rostering', 'Compliance AI', 'Progress Notes', 'Participant Tracking']
    },
    {
      icon: '🔧',
      name: 'Trades & Construction',
      gradient: 'from-orange-500 to-red-500',
      solutions: ['Quote Generator', 'Job Scheduling', 'Invoice Automation', 'Safety Docs', 'Supply Chain']
    },
    {
      icon: '🏠',
      name: 'Real Estate',
      gradient: 'from-amber-500 to-orange-500',
      solutions: ['Listing AI', 'Lead Follow-up', 'Contract Gen', 'Market Analysis', 'Virtual Tours']
    },
    {
      icon: '⚖️',
      name: 'Legal & Accounting',
      gradient: 'from-blue-500 to-indigo-500',
      solutions: ['Doc Automation', 'Client Intake', 'Time Tracking', 'Compliance', 'Research AI']
    },
    {
      icon: '🛒',
      name: 'Retail & E-Commerce',
      gradient: 'from-violet-500 to-purple-500',
      solutions: ['Inventory AI', 'Support Bot', 'Email Campaigns', 'Reviews', 'Pricing AI']
    },
    {
      icon: '🍽️',
      name: 'Hospitality',
      gradient: 'from-teal-500 to-emerald-500',
      solutions: ['Bookings AI', 'Staff Rostering', 'Menu Optimization', 'Review Responses', 'Forecasting']
    },
  ]

  // Process steps
  const process = [
    { step: '01', title: 'Discovery Call', desc: 'We learn your business, pain points, and goals. Free 30-min consultation.' },
    { step: '02', title: 'Solution Design', desc: 'We map out a custom AI solution tailored to your specific needs.' },
    { step: '03', title: 'Build & Test', desc: 'Our team builds your solution with regular check-ins and demos.' },
    { step: '04', title: 'Deploy & Support', desc: 'We launch, train your team, and provide ongoing support.' },
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
            <a href="#services" className="text-slate-300 hover:text-white transition-colors">Services</a>
            <a href="#industries" className="text-slate-300 hover:text-white transition-colors">Industries</a>
            <a href="#process" className="text-slate-300 hover:text-white transition-colors">Process</a>
            <a href="#about" className="text-slate-300 hover:text-white transition-colors">About</a>
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
              Get a Quote
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-16 sm:pt-20 pb-24 sm:pb-32">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 animate-[fadeIn_0.6s_ease-out]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-sm text-slate-300">Custom AI Solutions for Australian Business</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight animate-[fadeIn_0.8s_ease-out]">
            We Build{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Custom AI
            </span>
            <br />For Your Business
          </h1>
          
          <p className="text-base sm:text-xl text-slate-400 max-w-3xl mx-auto mb-10 px-2 animate-[fadeIn_1s_ease-out]">
            Stop wasting time on repetitive tasks. We design, build, and deploy bespoke AI automation 
            solutions tailored specifically for Australian small & medium businesses. 
            <span className="text-white font-medium"> You tell us the problem — we build the AI to solve it.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-[fadeIn_1.2s_ease-out]">
            <button
              onClick={() => setShowContact(true)}
              className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-semibold text-lg hover:opacity-90 active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30"
            >
              Book Free Consultation
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
              See Our Work
            </button>
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

      {/* What We Do Section */}
      <section id="services" className="relative z-10 px-6 py-24 bg-gradient-to-b from-transparent to-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-6">
              <span className="text-sm text-indigo-400 font-medium">What We Do</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Custom AI Solutions That Actually Work</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              No cookie-cutter software. We build AI systems designed around how YOUR business operates.
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

      {/* Industry Solutions */}
      <section id="industries" className="relative z-10 px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
              <span className="text-sm text-emerald-400 font-medium">Industry Expertise</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">AI Solutions for Every Industry</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              We've built automation for businesses across Australia. Here's what we can do for yours.
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
            <p className="text-slate-400 mb-6">Don't see your industry? We build custom AI for any business.</p>
            <button
              onClick={() => setShowContact(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl font-semibold hover:opacity-90 active:scale-[0.97] transition-all"
            >
              <span>Tell Us About Your Business</span>
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
              <span className="text-sm text-amber-400 font-medium">Our Process</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How We Build Your AI Solution</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              From first call to live deployment — here's how we turn your business problems into automated solutions.
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
              Start With a Free Discovery Call
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="relative z-10 px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-full mb-6">
              <span className="text-sm text-pink-400 font-medium">Client Results</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-slate-400 text-lg">Real results from real Australian businesses</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 hover:border-slate-600 transition-all md:hover:-translate-y-1"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-slate-300 mb-6 italic leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-white font-medium">{testimonial.author}</p>
                    <p className="text-slate-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
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
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">About Us</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Australian-built AI solutions by people who understand Australian business
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 hover:border-slate-600 transition-all md:hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-6 text-2xl shadow-lg shadow-indigo-500/20">
                🏢
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Williams Group</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                We're part of Williams Group — a multi-venture Australian enterprise building high-performance companies across technology, automation, and digital commerce.
              </p>
              <p className="text-indigo-400 text-sm font-medium italic">
                "Be smarter, be faster, deliver results."
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 hover:border-slate-600 transition-all md:hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center mb-6 text-2xl shadow-lg shadow-emerald-500/20">
                🎯
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Our Approach</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                We don't do generic SaaS. Every solution we build is designed around YOUR specific business processes, challenges, and goals. If it doesn't save you time or money, we don't build it.
              </p>
              <p className="text-emerald-400 text-sm font-medium italic">
                "Your problem, our solution."
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 hover:border-slate-600 transition-all md:hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-6 text-2xl shadow-lg shadow-amber-500/20">
                👤
              </div>
              <h3 className="text-xl font-bold text-white mb-4">The Founder</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                <span className="text-white font-medium">Ash Williams</span> — builder, strategist, and operator with a background in consulting, project management, aviation, and AI systems. Known for solving big problems with elegant solutions.
              </p>
              <p className="text-amber-400 text-sm font-medium italic">
                "Build fast, iterate smarter."
              </p>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/5 border border-white/10 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-slate-300 text-sm">Proudly Australian • Built for SMBs • Powered by AI</span>
            </div>
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
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Automate Your Business?</h2>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
                Book a free 30-minute consultation. We'll discuss your challenges, identify automation opportunities, and show you what's possible.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => setShowContact(true)}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-semibold text-lg hover:opacity-90 active:scale-[0.97] transition-all shadow-lg shadow-indigo-500/30"
                >
                  Book Free Consultation
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
              <p className="text-slate-400 mt-1">Tell us about your business and we'll get back to you within 24 hours</p>
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
                <label className="block text-sm font-medium text-slate-400 mb-2">What do you want to automate?</label>
                <textarea required rows={4}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                  placeholder="Tell us about the manual tasks or processes you'd like to automate..."></textarea>
              </div>
              <button type="submit"
                className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all">
                Request Free Consultation
              </button>
            </form>

            <p className="mt-4 text-center text-xs text-slate-500">
              We'll respond within 24 hours • No spam, ever
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
