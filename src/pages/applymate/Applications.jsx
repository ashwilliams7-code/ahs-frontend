import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'

const API_URL = import.meta.env.VITE_BACKEND_URL || 'https://ahs-backend.onrender.com'

const statusOptions = ['All', 'submitted', 'viewed', 'interview', 'rejected', 'offer']
const statusLabels = {
  'submitted': 'Applied',
  'viewed': 'Viewed',
  'interview': 'Interview',
  'rejected': 'Rejected',
  'offer': 'Offer'
}

export default function Applications() {
  const { session } = useAuth()
  const [applications, setApplications] = useState([])
  const [stats, setStats] = useState({ total: 0, thisWeek: 0, today: 0, byStatus: {} })
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [appsRes, statsRes] = await Promise.all([
        fetch(`${API_URL}/api/applymate/applications`, {
          headers: { 'Authorization': `Bearer ${session?.access_token}` }
        }),
        fetch(`${API_URL}/api/applymate/stats`, {
          headers: { 'Authorization': `Bearer ${session?.access_token}` }
        })
      ])
      
      if (appsRes.ok) {
        const appsData = await appsRes.json()
        setApplications(appsData)
      }
      
      if (statsRes.ok) {
        const statsData = await statsRes.json()
        setStats(statsData)
      }
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/api/applymate/applications/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({ status: newStatus })
      })
      
      if (res.ok) {
        setApplications(prev => prev.map(app => 
          app.id === id ? { ...app, status: newStatus } : app
        ))
      }
    } catch (error) {
      console.error('Failed to update status:', error)
    }
  }

  const filteredApplications = applications.filter(app => {
    const matchesFilter = filter === 'All' || app.status === filter
    const matchesSearch = (app.company?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                          (app.job_title?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'viewed': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'interview': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
      case 'rejected': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'offer': return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30'
    }
  }

  const responseRate = stats.total > 0 
    ? Math.round(((stats.byStatus.viewed || 0) + (stats.byStatus.interview || 0) + (stats.byStatus.offer || 0)) / stats.total * 100)
    : 0

  if (loading) {
    return (
      <div className="p-8 bg-slate-900 min-h-screen flex items-center justify-center">
        <div className="text-slate-400">Loading applications...</div>
      </div>
    )
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
          <p className="text-3xl font-bold text-emerald-400 mb-1">{stats.byStatus.interview || 0}</p>
          <p className="text-sm text-slate-400">Interviews</p>
        </div>
        <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">
          <p className="text-3xl font-bold text-amber-400 mb-1">{stats.byStatus.offer || 0}</p>
          <p className="text-sm text-slate-400">Offers</p>
        </div>
        <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">
          <p className="text-3xl font-bold text-purple-400 mb-1">{responseRate}%</p>
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
                {status === 'All' ? 'All' : statusLabels[status] || status}
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
                <th className="text-left py-4 px-6 text-sm font-medium text-slate-400">Applied</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((app) => (
                <tr key={app.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center text-white font-bold">
                        {(app.company || 'U')[0].toUpperCase()}
                      </div>
                      <span className="text-white font-medium">{app.company || 'Unknown'}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-300">{app.job_title || 'Unknown'}</td>
                  <td className="py-4 px-6">
                    <select
                      value={app.status}
                      onChange={(e) => updateStatus(app.id, e.target.value)}
                      className={`px-3 py-1 text-xs font-medium rounded-full border bg-transparent cursor-pointer ${getStatusColor(app.status)}`}
                    >
                      <option value="submitted">Applied</option>
                      <option value="viewed">Viewed</option>
                      <option value="interview">Interview</option>
                      <option value="offer">Offer</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="py-4 px-6 text-slate-400">
                    {app.applied_at ? new Date(app.applied_at).toLocaleDateString() : 'Unknown'}
                  </td>
                  <td className="py-4 px-6 text-right">
                    {app.job_url && (
                      <a 
                        href={app.job_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-slate-600 rounded-lg transition-colors inline-block"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                      </a>
                    )}
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
                  {(app.company || 'U')[0].toUpperCase()}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold">{app.company || 'Unknown'}</h3>
                  <p className="text-slate-400 text-sm">{app.job_title || 'Unknown'}</p>
                </div>
                <select
                  value={app.status}
                  onChange={(e) => updateStatus(app.id, e.target.value)}
                  className={`px-3 py-1 text-xs font-medium rounded-full border bg-transparent ${getStatusColor(app.status)}`}
                >
                  <option value="submitted">Applied</option>
                  <option value="viewed">Viewed</option>
                  <option value="interview">Interview</option>
                  <option value="offer">Offer</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  {app.applied_at ? new Date(app.applied_at).toLocaleDateString() : 'Unknown'}
                </span>
                {app.job_url && (
                  <a 
                    href={app.job_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline"
                  >
                    View Job →
                  </a>
                )}
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
            <p className="text-slate-400 text-sm">
              {applications.length === 0 
                ? 'Start auto-apply to track your applications here'
                : 'Try adjusting your search or filter'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
