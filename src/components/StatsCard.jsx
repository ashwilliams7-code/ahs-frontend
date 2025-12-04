const iconMap = {
  invoice: (
    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
    </svg>
  ),
  revenue: (
    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
  ),
  clock: (
    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
  ),
  shield: (
    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
    </svg>
  ),
}

const colorMap = {
  primary: {
    gradient: 'from-primary-500 to-primary-600',
    shadow: 'shadow-primary-200',
    hoverShadow: 'hover:shadow-primary-100/50',
    trend: 'text-accent-600',
    progress: 'from-accent-500 to-emerald-500',
  },
  accent: {
    gradient: 'from-accent-500 to-emerald-600',
    shadow: 'shadow-accent-200',
    hoverShadow: 'hover:shadow-accent-100/50',
    trend: 'text-accent-600',
    progress: 'from-accent-500 to-emerald-500',
  },
  blue: {
    gradient: 'from-blue-500 to-cyan-600',
    shadow: 'shadow-blue-200',
    hoverShadow: 'hover:shadow-blue-100/50',
    trend: 'text-blue-600',
    progress: 'from-blue-500 to-cyan-500',
  },
  purple: {
    gradient: 'from-purple-500 to-violet-600',
    shadow: 'shadow-purple-200',
    hoverShadow: 'hover:shadow-purple-100/50',
    trend: 'text-purple-600',
    progress: 'from-purple-500 to-violet-500',
  },
}

export default function StatsCard({ 
  title, 
  value, 
  trend, 
  badge, 
  icon, 
  color = 'primary', 
  footer, 
  showProgress, 
  progress 
}) {
  const colors = colorMap[color]

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-xl ${colors.hoverShadow} transition-all group`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-lg ${colors.shadow} group-hover:scale-110 transition-transform`}>
          {iconMap[icon]}
        </div>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 ${colors.trend}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
            </svg>
            <span className="text-sm font-semibold">{trend}%</span>
          </div>
        )}
        {badge && (
          <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">{badge}</span>
        )}
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-sm text-gray-500">{title}</p>
      {footer && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          {showProgress ? (
            <>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${colors.progress} rounded-full`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">{footer}</p>
            </>
          ) : (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">{footer}</span>
              <span className="font-medium text-primary-600">View all →</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

