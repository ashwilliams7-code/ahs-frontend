import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/api'
import StatsCard from '../components/StatsCard'
import RevenueChart from '../components/RevenueChart'
import ActivityFeed from '../components/ActivityFeed'
import TopPerformers from '../components/TopPerformers'
import ServiceBreakdown from '../components/ServiceBreakdown'

// Demo data fallback
const DEMO_DATA = {
  stats: {
    invoicesGenerated: 156,
    totalRevenue: 48752.64,
    hoursProcessed: 722,
    complianceScore: 94,
  },
  weeklyRevenue: [
    { day: 'Mon', amount: 1842.50, target: 2000 },
    { day: 'Tue', amount: 2156.80, target: 2000 },
    { day: 'Wed', amount: 1523.40, target: 2000 },
    { day: 'Thu', amount: 2845.60, target: 2000 },
    { day: 'Fri', amount: 2234.20, target: 2000 },
    { day: 'Sat', amount: 1156.30, target: 1500 },
    { day: 'Sun', amount: 698.00, target: 1000 },
  ],
  topPerformers: [
    { name: 'Sarah Mitchell', initials: 'SM', color: 'blue', hours: 40, shifts: 8, earnings: 2702.40, trend: 12 },
    { name: 'Emily Roberts', initials: 'ER', color: 'green', hours: 38, shifts: 7, earnings: 2567.28, trend: 8 },
    { name: 'Angela Patel', initials: 'AP', color: 'pink', hours: 36, shifts: 6, earnings: 2432.16, trend: 5 },
    { name: 'Tom Nguyen', initials: 'TN', color: 'cyan', hours: 34, shifts: 6, earnings: 2297.04, trend: 0 },
    { name: 'Daniel Wilson', initials: 'DW', color: 'indigo', hours: 32, shifts: 5, earnings: 2161.92, trend: 0 },
  ],
  recentActivity: [
    { type: 'invoice', title: 'Invoice INV-20241128143022 generated', subtitle: 'For Sarah Mitchell • $540.48', time: '2m ago', icon: 'invoice' },
    { type: 'compliance', title: 'Compliance check completed', subtitle: 'All worker screenings verified', time: '15m ago', icon: 'check' },
    { type: 'roster', title: 'Shift assigned to Emily Roberts', subtitle: 'Tomorrow 8:00 AM - 4:00 PM', time: '32m ago', icon: 'calendar' },
    { type: 'alert', title: 'Certificate expiring soon', subtitle: 'James Kim - First Aid expires in 14 days', time: '1h ago', icon: 'warning' },
    { type: 'team', title: 'New worker onboarded', subtitle: 'Alex Santos joined the team', time: '3h ago', icon: 'user' },
  ],
  serviceBreakdown: [
    { name: 'Personal Care', percentage: 45, color: 'primary' },
    { name: 'Community Access', percentage: 25, color: 'accent' },
    { name: 'Domestic Assistance', percentage: 18, color: 'blue' },
    { name: 'Transport', percentage: 12, color: 'purple' },
  ],
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState(DEMO_DATA.stats)
  const [activity, setActivity] = useState(DEMO_DATA.recentActivity)
  const [performers, setPerformers] = useState(DEMO_DATA.topPerformers)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [statsData, activityData, performersData] = await Promise.all([
          api.getDashboardStats().catch(() => null),
          api.getActivity().catch(() => null),
          api.getTopPerformers().catch(() => null),
        ])

        if (statsData) setStats(statsData)
        if (activityData) setActivity(activityData)
        if (performersData) setPerformers(performersData)
      } catch (err) {
        console.log('Using demo data')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
    }).format(amount)
  }

  return (
    <div className="p-8">
      <div className="animate-fade-in">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-indigo-900 p-8 text-white">
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-accent-500/20 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    All Systems Operational
                  </div>
                  <span className="text-primary-200 text-sm">
                    {new Date().toLocaleDateString('en-AU', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <h1 className="text-4xl font-bold mb-3">Welcome back! 👋</h1>
                <p className="text-primary-100 text-lg max-w-xl">
                  Here's your AHS command center. Monitor your agents, track invoices, and manage your team all in one place.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate('/invoicing')}
                  className="px-6 py-3 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-all shadow-lg shadow-primary-900/30 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  New Invoice
                </button>
                <button
                  onClick={() => navigate('/rostering')}
                  className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all border border-white/20 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  View Roster
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Invoices Generated"
            value={stats.invoicesGenerated}
            trend={12}
            icon="invoice"
            color="primary"
            footer="This month"
          />
          <StatsCard
            title="Total Revenue"
            value={formatCurrency(stats.totalRevenue)}
            trend={8}
            icon="revenue"
            color="accent"
            footer="75% of monthly goal"
            showProgress
            progress={75}
          />
          <StatsCard
            title="Hours Processed"
            value={stats.hoursProcessed}
            trend={15}
            icon="clock"
            color="blue"
            footer="12 workers active"
          />
          <StatsCard
            title="Compliance Score"
            value={`${stats.complianceScore}%`}
            badge="Good"
            icon="shield"
            color="purple"
            footer="2 items need attention"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <RevenueChart data={DEMO_DATA.weeklyRevenue} />
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Agent Status</h3>
            {/* Agent Cards */}
            <div
              onClick={() => navigate('/invoicing')}
              className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-5 text-white cursor-pointer hover:shadow-xl hover:shadow-primary-200 transition-all hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium">Active</span>
              </div>
              <h4 className="font-semibold text-lg mb-1">Invoicing Agent</h4>
              <p className="text-primary-100 text-sm mb-3">Process timesheets to invoices</p>
              <div className="flex items-center gap-4 text-sm">
                <span>24 today</span>
                <span className="w-1 h-1 bg-white/50 rounded-full"></span>
                <span>156 this week</span>
              </div>
            </div>

            <div
              onClick={() => navigate('/rostering')}
              className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl p-5 text-white cursor-pointer hover:shadow-xl hover:shadow-orange-200 transition-all hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium">Active</span>
              </div>
              <h4 className="font-semibold text-lg mb-1">Rostering Agent</h4>
              <p className="text-orange-100 text-sm mb-3">Smart shift scheduling</p>
              <div className="flex items-center gap-4 text-sm">
                <span>48 shifts</span>
                <span className="w-1 h-1 bg-white/50 rounded-full"></span>
                <span>2 open</span>
              </div>
            </div>

            <div
              onClick={() => navigate('/compliance')}
              className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-5 text-white cursor-pointer hover:shadow-xl hover:shadow-emerald-200 transition-all hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium">Active</span>
              </div>
              <h4 className="font-semibold text-lg mb-1">Compliance Agent</h4>
              <p className="text-emerald-100 text-sm mb-3">NDIS compliance monitoring</p>
              <div className="flex items-center gap-4 text-sm">
                <span>94% score</span>
                <span className="w-1 h-1 bg-white/50 rounded-full"></span>
                <span>2 alerts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          <ActivityFeed activities={activity} />
          <TopPerformers performers={performers} />
        </div>

        {/* Service Breakdown */}
        <div className="mt-8">
          <ServiceBreakdown data={DEMO_DATA.serviceBreakdown} totalHours={stats.hoursProcessed} />
        </div>
      </div>
    </div>
  )
}

