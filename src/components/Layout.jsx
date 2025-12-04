import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopNav from './TopNav'

const pageConfig = {
  '/dashboard': {
    title: 'Dashboard',
    status: 'Overview',
    statusColor: 'bg-gray-100 text-gray-700',
  },
  '/invoicing': {
    title: 'Invoicing Agent',
    status: 'Active',
    statusColor: 'bg-accent-100 text-accent-700',
  },
  '/rostering': {
    title: 'Rostering Agent',
    status: 'Active',
    statusColor: 'bg-orange-100 text-orange-700',
  },
  '/compliance': {
    title: 'Compliance Agent',
    status: 'Active',
    statusColor: 'bg-green-100 text-green-700',
  },
  '/sales': {
    title: 'Sales Agent',
    status: 'Active',
    statusColor: 'bg-accent-100 text-accent-700',
  },
  '/marketing': {
    title: 'Marketing Agent',
    status: 'Active',
    statusColor: 'bg-accent-100 text-accent-700',
  },
  '/settings': {
    title: 'Settings',
    status: 'Configuration',
    statusColor: 'bg-gray-100 text-gray-700',
  },
}

export default function Layout() {
  const location = useLocation()
  const config = pageConfig[location.pathname] || pageConfig['/dashboard']
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Close sidebar when route changes (mobile navigation)
  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  return (
    <div className="flex min-h-screen">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="flex-1 lg:ml-64">
        <TopNav 
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

