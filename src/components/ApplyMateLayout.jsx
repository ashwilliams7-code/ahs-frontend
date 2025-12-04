import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import ApplyMateSidebar from './ApplyMateSidebar'
import ApplyMateTopNav from './ApplyMateTopNav'

const pageConfig = {
  '/applymate': {
    title: 'Dashboard',
    status: 'Overview',
    statusColor: 'bg-slate-700 text-slate-300',
  },
  '/applymate/search': {
    title: 'Job Search',
    status: 'Find Jobs',
    statusColor: 'bg-emerald-500/20 text-emerald-400',
  },
  '/applymate/auto-apply': {
    title: 'Auto Apply',
    status: 'AI Powered',
    statusColor: 'bg-cyan-500/20 text-cyan-400',
  },
  '/applymate/applications': {
    title: 'Applications',
    status: 'Tracking',
    statusColor: 'bg-purple-500/20 text-purple-400',
  },
  '/applymate/cover-letters': {
    title: 'Cover Letters',
    status: 'AI Generator',
    statusColor: 'bg-pink-500/20 text-pink-400',
  },
  '/applymate/resume': {
    title: 'Resume Builder',
    status: 'AI Enhanced',
    statusColor: 'bg-amber-500/20 text-amber-400',
  },
  '/applymate/settings': {
    title: 'Settings',
    status: 'Configuration',
    statusColor: 'bg-slate-700 text-slate-300',
  },
}

export default function ApplyMateLayout() {
  const location = useLocation()
  const config = pageConfig[location.pathname] || pageConfig['/applymate']
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Close sidebar when route changes (mobile navigation)
  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  return (
    <div className="flex min-h-screen bg-slate-900">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <ApplyMateSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="flex-1 lg:ml-64">
        <ApplyMateTopNav 
          title={config.title} 
          status={config.status} 
          statusColor={config.statusColor}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <Outlet />
      </main>
    </div>
  )
}

