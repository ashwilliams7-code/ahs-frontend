export default function RevenueChart({ data }) {
  const maxAmount = Math.max(...data.map(d => d.amount))
  
  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">Revenue Overview</h3>
            <p className="text-sm text-gray-500">Weekly revenue performance</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm font-medium bg-primary-100 text-primary-700 rounded-lg">Week</button>
            <button className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">Month</button>
            <button className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">Year</button>
          </div>
        </div>
      </div>
      <div className="p-6">
        {/* Bar Chart */}
        <div className="flex items-end justify-between h-48 gap-4">
          {data.map((item, index) => {
            const heightPercent = (item.amount / maxAmount) * 100
            const targetPercent = (item.target / maxAmount) * 100
            const isToday = index === 3 // Thursday
            
            return (
              <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full bg-primary-100 rounded-t-lg relative"
                  style={{ height: `${targetPercent}%` }}
                >
                  <div 
                    className={`absolute bottom-0 w-full rounded-t-lg ${
                      isToday 
                        ? 'bg-gradient-to-t from-accent-500 to-accent-400' 
                        : 'bg-gradient-to-t from-primary-600 to-primary-400'
                    }`}
                    style={{ height: `${(heightPercent / targetPercent) * 100}%` }}
                  ></div>
                </div>
                <span className={`text-xs ${isToday ? 'font-medium text-primary-600' : 'text-gray-500'}`}>
                  {item.day}
                </span>
              </div>
            )
          })}
        </div>
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              ${data.reduce((sum, d) => sum + d.amount, 0).toLocaleString('en-AU', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-sm text-gray-500">This week's revenue</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-accent-600">+23% vs last week</p>
            <p className="text-xs text-gray-500">$10,123.45 last week</p>
          </div>
        </div>
      </div>
    </div>
  )
}

