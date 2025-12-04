import { useState } from 'react'

const applications = [
  { id: 1, company: 'Google', role: 'Senior Software Engineer', status: 'Interview', appliedDate: 'Dec 2, 2024', platform: 'LinkedIn', salary: '$180,000', logo: 'G' },
  { id: 2, company: 'Meta', role: 'Full Stack Developer', status: 'Viewed', appliedDate: 'Dec 1, 2024', platform: 'SEEK', salary: '$150,000', logo: 'M' },
  { id: 3, company: 'Amazon', role: 'Backend Engineer', status: 'Applied', appliedDate: 'Dec 1, 2024', platform: 'LinkedIn', salary: '$170,000', logo: 'A' },
  { id: 4, company: 'Microsoft', role: 'Software Engineer II', status: 'Offer', appliedDate: 'Nov 28, 2024', platform: 'LinkedIn', salary: '$165,000', logo: 'M' },
  { id: 5, company: 'Apple', role: 'iOS Developer', status: 'Rejected', appliedDate: 'Nov 25, 2024', platform: 'SEEK', salary: '$140,000', logo: 'A' },
  { id: 6, company: 'Netflix', role: 'Senior Engineer', status: 'Applied', appliedDate: 'Nov 24, 2024', platform: 'LinkedIn', salary: '$200,000', logo: 'N' },
  { id: 7, company: 'Spotify', role: 'Backend Developer', status: 'Viewed', appliedDate: 'Nov 23, 2024', platform: 'SEEK', salary: '$130,000', logo: 'S' },
  { id: 8, company: 'Atlassian', role: 'Full Stack Engineer', status: 'Interview', appliedDate: 'Nov 22, 2024', platform: 'LinkedIn', salary: '$155,000', logo: 'A' },
]

const statusOptions = ['All', 'Applied', 'Viewed', 'Interview', 'Offer', 'Rejected']

export default function Applications() {
  const [filter, setFilter] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredApplications = applications.filter(app => {
    const matchesFilter = filter === 'All' || app.status === filter
    const matchesSearch = app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.role.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'Applied': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'Viewed': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'Interview': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
      case 'Rejected': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'Offer': return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30'
    }
  }

  const stats = {
    total: applications.length,
    interviews: applications.filter(a => a.status === 'Interview').length,
    offers: applications.filter(a => a.status === 'Offer').length,
    responseRate: Math.round((applications.filter(a => ['Viewed', 'Interview', 'Offer'].includes(a.status)).length / applications.length) * 100)
  }

  return (
    <div className="p-4 lg:p-8 bg-slate-900 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Applications</h1>
        <p className="text-slate-400">Track and manage all your job applications</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">
          <p className="text-3xl font-bold text-white mb-1">{stats.total}</p>
          <p className="text-sm text-slate-400">Total Applications</p>
        </div>
        <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">
          <p className="text-3xl font-bold text-emerald-400 mb-1">{stats.interviews}</p>
          <p className="text-sm text-slate-400">Interviews</p>
        </div>
        <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">
          <p className="text-3xl font-bold text-amber-400 mb-1">{stats.offers}</p>
          <p className="text-sm text-slate-400">Offers</p>
        </div>
        <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">
          <p className="text-3xl font-bold text-purple-400 mb-1">{stats.responseRate}%</p>
          <p className="text-sm text-slate-400">Response Rate</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by company or role..."
              className="w-full pl-12 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === status
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                    : 'bg-slate-700 text-slate-400 border border-slate-600 hover:border-slate-500'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-4 px-6 text-sm font-medium text-slate-400">Company</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-slate-400">Role</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-slate-400">Status</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-slate-400">Salary</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-slate-400">Applied</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-slate-400">Platform</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((app) => (
                <tr key={app.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center text-white font-bold">
                        {app.logo}
                      </div>
                      <span className="text-white font-medium">{app.company}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-300">{app.role}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-emerald-400 font-medium">{app.salary}</td>
                  <td className="py-4 px-6 text-slate-400">{app.appliedDate}</td>
                  <td className="py-4 px-6 text-slate-400">{app.platform}</td>
                  <td className="py-4 px-6 text-right">
                    <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-600 rounded-lg transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-slate-700">
          {filteredApplications.map((app) => (
            <div key={app.id} className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center text-white font-bold text-lg">
                  {app.logo}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold">{app.company}</h3>
                  <p className="text-slate-400 text-sm">{app.role}</p>
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(app.status)}`}>
                  {app.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-emerald-400 font-medium">{app.salary}</span>
                <span className="text-slate-500">{app.appliedDate} • {app.platform}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredApplications.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-700 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">No applications found</h3>
            <p className="text-slate-400 text-sm">Try adjusting your search or filter</p>
          </div>
        )}
      </div>
    </div>
  )
}

