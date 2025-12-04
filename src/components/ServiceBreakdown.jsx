const colorMap = {
  primary: { fill: '#6366F1', bg: 'bg-primary-500' },
  accent: { fill: '#10B981', bg: 'bg-accent-500' },
  blue: { fill: '#3B82F6', bg: 'bg-blue-500' },
  purple: { fill: '#A855F7', bg: 'bg-purple-500' },
}

export default function ServiceBreakdown({ data, totalHours }) {
  // Calculate stroke dasharray values for the donut chart
  const circumference = 2 * Math.PI * 40 // radius = 40
  let offset = 0

  return (
    <div className="grid lg:grid-cols-4 gap-6">
      {/* Donut Chart */}
      <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Service Breakdown</h3>
            <p className="text-sm text-gray-500">By NDIS support type</p>
          </div>
        </div>
        
        {/* Donut Chart SVG */}
        <div className="relative w-44 h-44 mx-auto mb-6">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="12"/>
            {/* Data segments */}
            {data.map((item, index) => {
              const strokeLength = (item.percentage / 100) * circumference
              const currentOffset = offset
              offset += strokeLength
              
              return (
                <circle
                  key={item.name}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke={colorMap[item.color].fill}
                  strokeWidth="12"
                  strokeDasharray={`${strokeLength} ${circumference - strokeLength}`}
                  strokeDashoffset={-currentOffset}
                  strokeLinecap="round"
                />
              )
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{totalHours}</p>
              <p className="text-xs text-gray-500">Total Hours</p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-3">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${colorMap[item.color].bg}`}></div>
                <span className="text-sm text-gray-700">{item.name}</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Stats Cards */}
      <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h4 className="font-semibold text-gray-900">Invoice Status</h4>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Paid</span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <span className="text-sm font-semibold text-gray-900">132</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Pending</span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '10%' }}></div>
              </div>
              <span className="text-sm font-semibold text-gray-900">18</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Overdue</span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: '5%' }}></div>
              </div>
              <span className="text-sm font-semibold text-gray-900">6</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <h4 className="font-semibold text-gray-900">Processing</h4>
        </div>
        <div className="text-center">
          <p className="text-4xl font-bold text-gray-900 mb-1">2.3<span className="text-xl">s</span></p>
          <p className="text-sm text-gray-500 mb-3">Avg. Invoice Time</p>
          <div className="flex items-center justify-center gap-2 text-sm">
            <svg className="w-4 h-4 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
            </svg>
            <span className="text-accent-600 font-medium">42% faster</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
            </svg>
          </div>
          <h4 className="font-semibold text-gray-900">Accuracy</h4>
        </div>
        <div className="text-center">
          <p className="text-4xl font-bold text-gray-900 mb-1">98.5<span className="text-xl">%</span></p>
          <p className="text-sm text-gray-500 mb-3">OCR Success Rate</p>
          <div className="flex items-center justify-center gap-1">
            <span className="text-yellow-400">★</span>
            <span className="text-yellow-400">★</span>
            <span className="text-yellow-400">★</span>
            <span className="text-yellow-400">★</span>
            <span className="text-yellow-400">★</span>
          </div>
        </div>
      </div>
    </div>
  )
}

