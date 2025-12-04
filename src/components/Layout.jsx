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
    status: 'Locked',
    statusColor: 'bg-gray-200 text-gray-600',
  },
  '/marketing': {
    title: 'Marketing Agent',
    status: 'Locked',
    statusColor: 'bg-gray-200 text-gray-600',
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

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64">
        <TopNav title={config.title} status={config.status} statusColor={config.statusColor} />
        <Outlet />
      </main>
    </div>
  )
}

