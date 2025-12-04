const colorMap = {
  blue: 'from-blue-500 to-blue-600',
  green: 'from-green-500 to-green-600',
  pink: 'from-pink-500 to-pink-600',
  cyan: 'from-cyan-500 to-cyan-600',
  indigo: 'from-indigo-500 to-indigo-600',
}

export default function TopPerformers({ performers }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
    }).format(amount)
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Top Performers</h3>
              <p className="text-sm text-gray-500">This week's leading workers</p>
            </div>
          </div>
          <button className="text-sm text-primary-600 font-medium hover:text-primary-700">View All</button>
        </div>
      </div>
      <div className="p-6 space-y-4">
        {performers.map((performer, index) => (
          <div key={performer.name} className="flex items-center gap-4">
            <div className="relative">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${colorMap[performer.color]} flex items-center justify-center text-white font-semibold`}>
                {performer.initials}
              </div>
              {index < 3 && (
                <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs ${
                  index === 0 ? 'bg-amber-400' : index === 1 ? 'bg-gray-300' : 'bg-amber-600'
                }`}>
                  {index === 0 ? '🏆' : index + 1}
                </div>
              )}
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{performer.name}</p>
              <p className="text-sm text-gray-500">{performer.hours} hours • {performer.shifts} shifts</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">{formatCurrency(performer.earnings)}</p>
              {performer.trend > 0 ? (
                <p className="text-xs text-accent-600">+{performer.trend}% vs avg</p>
              ) : (
                <p className="text-xs text-gray-500">On target</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

