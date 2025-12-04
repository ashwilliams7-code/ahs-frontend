import { useState } from 'react'

const jobPlatforms = [
  { id: 'seek', name: 'SEEK', icon: '🔵', enabled: true },
  { id: 'linkedin', name: 'LinkedIn', icon: '💼', enabled: true },
  { id: 'indeed', name: 'Indeed', icon: '🟣', enabled: false },
  { id: 'glassdoor', name: 'Glassdoor', icon: '🟢', enabled: false },
]

const sampleJobs = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    company: 'TechCorp Australia',
    location: 'Sydney, NSW',
    salary: '$150,000 - $180,000',
    posted: '2 hours ago',
    platform: 'SEEK',
    match: 95,
    skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
    type: 'Full-time',
    remote: true,
  },
  {
    id: 2,
    title: 'Full Stack Developer',
    company: 'StartupXYZ',
    location: 'Melbourne, VIC',
    salary: '$120,000 - $140,000',
    posted: '5 hours ago',
    platform: 'LinkedIn',
    match: 88,
    skills: ['Python', 'Django', 'React', 'PostgreSQL'],
    type: 'Full-time',
    remote: false,
  },
  {
    id: 3,
    title: 'Backend Engineer',
    company: 'FinanceApp',
    location: 'Brisbane, QLD',
    salary: '$130,000 - $160,000',
    posted: '1 day ago',
    platform: 'SEEK',
    match: 82,
    skills: ['Java', 'Spring Boot', 'Microservices', 'Kubernetes'],
    type: 'Full-time',
    remote: true,
  },
  {
    id: 4,
    title: 'DevOps Engineer',
    company: 'CloudNative Co',
    location: 'Remote',
    salary: '$140,000 - $170,000',
    posted: '1 day ago',
    platform: 'LinkedIn',
    match: 76,
    skills: ['Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
    type: 'Contract',
    remote: true,
  },
  {
    id: 5,
    title: 'Frontend Developer',
    company: 'DesignStudio',
    location: 'Perth, WA',
    salary: '$100,000 - $120,000',
    posted: '2 days ago',
    platform: 'SEEK',
    match: 71,
    skills: ['Vue.js', 'TypeScript', 'Tailwind CSS', 'Figma'],
    type: 'Full-time',
    remote: false,
  },
]

export default function JobSearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('')
  const [selectedPlatforms, setSelectedPlatforms] = useState(['seek', 'linkedin'])
  const [jobs, setJobs] = useState(sampleJobs)
  const [isSearching, setIsSearching] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)

  const handleSearch = () => {
    setIsSearching(true)
    // Simulate search
    setTimeout(() => {
      setIsSearching(false)
    }, 2000)
  }

  const getMatchColor = (match) => {
    if (match >= 90) return 'text-emerald-400 bg-emerald-500/20'
    if (match >= 75) return 'text-amber-400 bg-amber-500/20'
    return 'text-slate-400 bg-slate-500/20'
  }

  return (
    <div className="p-4 lg:p-8 bg-slate-900 min-h-screen">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Job Search</h1>
        <p className="text-slate-400">Search across multiple job platforms with AI-powered matching</p>
      </div>

      {/* Search Form */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 mb-6">
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-slate-400 mb-2">Job Title / Keywords</label>
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Software Engineer, Developer..."
                className="w-full pl-12 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-slate-400 mb-2">Location</label>
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Sydney, Melbourne, Remote..."
                className="w-full pl-12 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
          <div className="md:col-span-1 flex items-end">
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all disabled:opacity-50"
            >
              {isSearching ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </span>
              ) : (
                'Search Jobs'
              )}
            </button>
          </div>
        </div>

        {/* Platform toggles */}
        <div className="flex flex-wrap gap-3">
          <span className="text-sm text-slate-400 self-center">Platforms:</span>
          {jobPlatforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => {
                if (selectedPlatforms.includes(platform.id)) {
                  setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform.id))
                } else {
                  setSelectedPlatforms([...selectedPlatforms, platform.id])
                }
              }}
              disabled={!platform.enabled}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                selectedPlatforms.includes(platform.id)
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                  : platform.enabled
                  ? 'bg-slate-700 text-slate-400 border border-slate-600 hover:border-slate-500'
                  : 'bg-slate-800 text-slate-600 border border-slate-700 cursor-not-allowed'
              }`}
            >
              <span>{platform.icon}</span>
              {platform.name}
              {!platform.enabled && <span className="text-xs">(Soon)</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Job List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">{jobs.length} Jobs Found</h2>
            <select className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-emerald-500">
              <option>Best Match</option>
              <option>Most Recent</option>
              <option>Highest Salary</option>
            </select>
          </div>

          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className={`bg-slate-800 rounded-2xl p-5 border cursor-pointer transition-all hover:-translate-y-1 ${
                  selectedJob?.id === job.id
                    ? 'border-emerald-500 shadow-lg shadow-emerald-500/10'
                    : 'border-slate-700 hover:border-slate-600'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-white font-semibold mb-1">{job.title}</h3>
                    <p className="text-slate-400 text-sm">{job.company}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-bold rounded-lg ${getMatchColor(job.match)}`}>
                    {job.match}% Match
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded-lg flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    </svg>
                    {job.location}
                  </span>
                  <span className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded-lg">
                    {job.type}
                  </span>
                  {job.remote && (
                    <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-lg">
                      Remote
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-emerald-400 font-medium text-sm">{job.salary}</p>
                  <p className="text-slate-500 text-xs">{job.posted} • {job.platform}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Job Details Panel */}
        <div className="lg:sticky lg:top-24 h-fit">
          {selectedJob ? (
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">{selectedJob.title}</h2>
                  <p className="text-slate-400">{selectedJob.company}</p>
                </div>
                <span className={`px-3 py-1 text-sm font-bold rounded-lg ${getMatchColor(selectedJob.match)}`}>
                  {selectedJob.match}% Match
                </span>
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-3 py-1 bg-slate-700 text-slate-300 text-sm rounded-lg flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  </svg>
                  {selectedJob.location}
                </span>
                <span className="px-3 py-1 bg-slate-700 text-slate-300 text-sm rounded-lg flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {selectedJob.salary}
                </span>
                <span className="px-3 py-1 bg-slate-700 text-slate-300 text-sm rounded-lg">
                  {selectedJob.type}
                </span>
              </div>

              <div className="mb-6">
                <h3 className="text-white font-semibold mb-3">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-sm rounded-lg border border-emerald-500/20">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all">
                  Quick Apply
                </button>
                <button className="px-4 py-3 bg-slate-700 text-white rounded-xl hover:bg-slate-600 transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                  </svg>
                </button>
                <button className="px-4 py-3 bg-slate-700 text-white rounded-xl hover:bg-slate-600 transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-700 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path>
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Select a Job</h3>
              <p className="text-slate-400 text-sm">Click on a job listing to view details and apply</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

