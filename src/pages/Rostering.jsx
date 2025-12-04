import { useState, useEffect } from 'react'
import { api } from '../lib/api'

const DEMO_WORKERS = [
  { name: 'Sarah Mitchell', initials: 'SM', color: 'blue', role: 'Support Worker • Full-time', status: 'Available', hours: 32 },
  { name: 'Emily Roberts', initials: 'ER', color: 'green', role: 'Support Worker • Full-time', status: 'Available', hours: 40 },
  { name: 'James Kim', initials: 'JK', color: 'purple', role: 'Support Worker • Part-time', status: 'On Leave', hours: 24 },
  { name: 'Mike Thompson', initials: 'MT', color: 'amber', role: 'Support Worker • Casual', status: 'Available', hours: 16 },
  { name: 'Angela Patel', initials: 'AP', color: 'pink', role: 'Senior Support Worker • Full-time', status: 'Available', hours: 38 },
  { name: 'Tom Nguyen', initials: 'TN', color: 'cyan', role: 'Support Worker • Full-time', status: 'On Shift', hours: 36 },
  { name: 'Rachel Henderson', initials: 'RH', color: 'rose', role: 'Support Worker • Part-time', status: 'Available', hours: 20 },
  { name: 'Daniel Wilson', initials: 'DW', color: 'indigo', role: 'Support Coordinator • Full-time', status: 'Available', hours: 40 },
  { name: 'Karen Lee', initials: 'KL', color: 'teal', role: 'Support Worker • Casual', status: 'Unavailable', hours: 0 },
  { name: 'Ben Jackson', initials: 'BJ', color: 'orange', role: 'Support Worker • Full-time', status: 'Sick Leave', hours: 0 },
  { name: 'Sophie O\'Brien', initials: 'SO', color: 'violet', role: 'Support Worker • Part-time', status: 'Available', hours: 24 },
  { name: 'Alex Santos', initials: 'AS', color: 'lime', role: 'Support Worker • Casual', status: 'Available', hours: 12 },
]

const colorMap = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  purple: 'bg-purple-500',
  amber: 'bg-amber-500',
  pink: 'bg-pink-500',
  cyan: 'bg-cyan-500',
  rose: 'bg-rose-500',
  indigo: 'bg-indigo-500',
  teal: 'bg-teal-500',
  orange: 'bg-orange-500',
  violet: 'bg-violet-500',
  lime: 'bg-lime-500',
}

const statusColors = {
  'Available': 'bg-green-100 text-green-700',
  'On Shift': 'bg-blue-100 text-blue-700',
  'On Leave': 'bg-amber-100 text-amber-700',
  'Unavailable': 'bg-gray-100 text-gray-700',
  'Sick Leave': 'bg-red-100 text-red-700',
}

export default function Rostering() {
  const [workers, setWorkers] = useState(DEMO_WORKERS)

  useEffect(() => {
    async function loadWorkers() {
      try {
        const data = await api.getWorkers()
        if (data && data.length > 0) {
          setWorkers(data)
        }
      } catch (err) {
        console.log('Using demo workers')
      }
    }
    loadWorkers()
  }, [])

  return (
    <div className="p-8">
      {/* Hero Section */}
      <div className="mb-8 animate-fade-in">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-orange-600 to-amber-700 p-8 text-white">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid-roster" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid-roster)"/>
            </svg>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">NDISHub Rostering Agent</h1>
                <p className="text-orange-100 text-lg max-w-xl">AI-powered shift scheduling and workforce optimization. Manage your team's roster effortlessly.</p>
              </div>
              <div className="hidden lg:flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium">Live Roster</span>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4 mt-8 max-w-2xl">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <p className="text-3xl font-bold">12</p>
                <p className="text-orange-200 text-sm">Active Workers</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <p className="text-3xl font-bold">48</p>
                <p className="text-orange-200 text-sm">Shifts This Week</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <p className="text-3xl font-bold">96%</p>
                <p className="text-orange-200 text-sm">Coverage</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <p className="text-3xl font-bold">2</p>
                <p className="text-orange-200 text-sm">Open Shifts</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-orange-600 text-white font-medium rounded-xl hover:bg-orange-700 transition-colors flex items-center gap-2 shadow-lg shadow-orange-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Add Shift
          </button>
          <button className="px-4 py-2 bg-white text-gray-700 font-medium rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            Manage Workers
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <span className="font-semibold text-gray-900">November 2024</span>
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Weekly Calendar View */}
      <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden mb-8">
        <div className="grid grid-cols-7 border-b border-gray-100">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
            const dates = [25, 26, 27, 28, 29, 30, 1]
            const isToday = index === 3
            return (
              <div key={day} className={`p-4 text-center border-r border-gray-100 last:border-r-0 ${isToday ? 'bg-orange-50' : ''}`}>
                <p className={`text-xs uppercase font-medium ${isToday ? 'text-orange-600' : 'text-gray-500'}`}>{day}</p>
                <p className={`text-lg font-semibold ${isToday ? 'text-orange-600' : 'text-gray-900'}`}>{dates[index]}</p>
              </div>
            )
          })}
        </div>
        <div className="grid grid-cols-7 min-h-[300px]">
          {/* Monday */}
          <div className="p-2 border-r border-gray-100 space-y-2">
            <div className="p-2 bg-blue-100 rounded-lg border-l-4 border-blue-500">
              <p className="text-xs font-medium text-blue-900">Sarah M.</p>
              <p className="text-xs text-blue-700">9:00 - 17:00</p>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg border-l-4 border-purple-500">
              <p className="text-xs font-medium text-purple-900">James K.</p>
              <p className="text-xs text-purple-700">14:00 - 22:00</p>
            </div>
          </div>
          {/* Tuesday */}
          <div className="p-2 border-r border-gray-100 space-y-2">
            <div className="p-2 bg-green-100 rounded-lg border-l-4 border-green-500">
              <p className="text-xs font-medium text-green-900">Emily R.</p>
              <p className="text-xs text-green-700">8:00 - 16:00</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg border-l-4 border-blue-500">
              <p className="text-xs font-medium text-blue-900">Sarah M.</p>
              <p className="text-xs text-blue-700">9:00 - 17:00</p>
            </div>
          </div>
          {/* Wednesday */}
          <div className="p-2 border-r border-gray-100 space-y-2">
            <div className="p-2 bg-amber-100 rounded-lg border-l-4 border-amber-500">
              <p className="text-xs font-medium text-amber-900">Mike T.</p>
              <p className="text-xs text-amber-700">6:00 - 14:00</p>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg border-l-4 border-purple-500">
              <p className="text-xs font-medium text-purple-900">James K.</p>
              <p className="text-xs text-purple-700">14:00 - 22:00</p>
            </div>
          </div>
          {/* Thursday (Today) */}
          <div className="p-2 border-r border-gray-100 bg-orange-50/50 space-y-2">
            <div className="p-2 bg-green-100 rounded-lg border-l-4 border-green-500">
              <p className="text-xs font-medium text-green-900">Emily R.</p>
              <p className="text-xs text-green-700">8:00 - 16:00</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg border-l-4 border-blue-500">
              <p className="text-xs font-medium text-blue-900">Sarah M.</p>
              <p className="text-xs text-blue-700">9:00 - 17:00</p>
            </div>
            <div className="p-2 bg-red-100 rounded-lg border-l-4 border-dashed border-red-400">
              <p className="text-xs font-medium text-red-700">Open Shift</p>
              <p className="text-xs text-red-600">18:00 - 22:00</p>
            </div>
          </div>
          {/* Friday */}
          <div className="p-2 border-r border-gray-100 space-y-2">
            <div className="p-2 bg-amber-100 rounded-lg border-l-4 border-amber-500">
              <p className="text-xs font-medium text-amber-900">Mike T.</p>
              <p className="text-xs text-amber-700">6:00 - 14:00</p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg border-l-4 border-green-500">
              <p className="text-xs font-medium text-green-900">Emily R.</p>
              <p className="text-xs text-green-700">14:00 - 22:00</p>
            </div>
          </div>
          {/* Saturday */}
          <div className="p-2 border-r border-gray-100 space-y-2">
            <div className="p-2 bg-purple-100 rounded-lg border-l-4 border-purple-500">
              <p className="text-xs font-medium text-purple-900">James K.</p>
              <p className="text-xs text-purple-700">8:00 - 16:00</p>
            </div>
            <div className="p-2 bg-red-100 rounded-lg border-l-4 border-dashed border-red-400">
              <p className="text-xs font-medium text-red-700">Open Shift</p>
              <p className="text-xs text-red-600">16:00 - 22:00</p>
            </div>
          </div>
          {/* Sunday */}
          <div className="p-2 space-y-2">
            <div className="p-2 bg-blue-100 rounded-lg border-l-4 border-blue-500">
              <p className="text-xs font-medium text-blue-900">Sarah M.</p>
              <p className="text-xs text-blue-700">10:00 - 18:00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Workers List */}
      <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Team Members</h3>
                <p className="text-sm text-gray-500">Manage your workforce</p>
              </div>
            </div>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {workers.map((worker) => (
            <div key={worker.name} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full ${colorMap[worker.color]} flex items-center justify-center text-white font-semibold`}>
                  {worker.initials}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{worker.name}</p>
                  <p className="text-sm text-gray-500">{worker.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[worker.status]}`}>
                  {worker.status}
                </span>
                <span className="text-sm text-gray-500">{worker.hours}h this week</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

