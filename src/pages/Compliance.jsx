import { useState, useEffect } from 'react'
import { api } from '../lib/api'

const DEMO_CERTIFICATIONS = [
  { name: 'Sarah Mitchell', initials: 'SM', color: 'blue', ndis: 'Valid', wwcc: 'Valid', firstAid: 'Valid', cpr: 'Valid', manual: 'Valid' },
  { name: 'Emily Roberts', initials: 'ER', color: 'green', ndis: 'Valid', wwcc: 'Valid', firstAid: 'Valid', cpr: 'Valid', manual: 'Valid' },
  { name: 'James Kim', initials: 'JK', color: 'purple', ndis: 'Valid', wwcc: 'Valid', firstAid: 'Expiring', cpr: 'Valid', manual: 'Valid' },
  { name: 'Mike Thompson', initials: 'MT', color: 'amber', ndis: 'Valid', wwcc: 'Valid', firstAid: 'Valid', cpr: 'Valid', manual: 'N/A' },
]

const colorMap = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  purple: 'bg-purple-500',
  amber: 'bg-amber-500',
}

const statusBadge = {
  'Valid': 'bg-green-100 text-green-700',
  'Expiring': 'bg-amber-100 text-amber-700',
  'Expired': 'bg-red-100 text-red-700',
  'N/A': 'bg-gray-100 text-gray-500',
}

export default function Compliance() {
  const [certifications, setCertifications] = useState(DEMO_CERTIFICATIONS)

  useEffect(() => {
    async function loadData() {
      try {
        const data = await api.getComplianceData()
        if (data && data.certifications) {
          setCertifications(data.certifications)
        }
      } catch (err) {
        console.log('Using demo compliance data')
      }
    }
    loadData()
  }, [])

  return (
    <div className="p-8">
      {/* Hero Section */}
      <div className="mb-8 animate-fade-in">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 p-8 text-white">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid-compliance" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid-compliance)"/>
            </svg>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">AHS Compliance Agent</h1>
                <p className="text-emerald-100 text-lg max-w-xl">Automated NDIS compliance monitoring and audit readiness. Stay compliant effortlessly.</p>
              </div>
              <div className="hidden lg:flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium">All Systems OK</span>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4 mt-8 max-w-2xl">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <p className="text-3xl font-bold">94%</p>
                <p className="text-emerald-200 text-sm">Compliance Score</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <p className="text-3xl font-bold">12</p>
                <p className="text-emerald-200 text-sm">Workers Verified</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <p className="text-3xl font-bold">2</p>
                <p className="text-emerald-200 text-sm">Pending Items</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <p className="text-3xl font-bold">0</p>
                <p className="text-emerald-200 text-sm">Critical Issues</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Compliance Score Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Overall Compliance</h3>
            <div className="relative w-40 h-40 mx-auto mb-4">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="10"/>
                <circle cx="50" cy="50" r="45" fill="none" stroke="#10B981" strokeWidth="10" 
                  strokeDasharray="282.7" strokeDashoffset="16.96" strokeLinecap="round"/>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-4xl font-bold text-gray-900">94%</p>
                  <p className="text-sm text-gray-500">Compliant</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Worker Checks</span>
                <span className="font-medium text-green-600">100%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Documentation</span>
                <span className="font-medium text-green-600">95%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Training</span>
                <span className="font-medium text-amber-600">85%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Incident Reports</span>
                <span className="font-medium text-green-600">100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts & Actions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Alerts */}
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Action Required</h3>
                  <p className="text-sm text-gray-500">2 items need your attention</p>
                </div>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              <div className="flex items-start gap-4 p-4 hover:bg-amber-50/50 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">First Aid Certificate Expiring</p>
                  <p className="text-sm text-gray-500">James Kim's certificate expires in 14 days</p>
                </div>
                <button className="px-3 py-1.5 text-sm font-medium text-amber-700 bg-amber-100 rounded-lg hover:bg-amber-200 transition-colors">
                  Remind
                </button>
              </div>
              <div className="flex items-start gap-4 p-4 hover:bg-amber-50/50 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Missing Service Agreement</p>
                  <p className="text-sm text-gray-500">Client: Jane Doe - Agreement not uploaded</p>
                </div>
                <button className="px-3 py-1.5 text-sm font-medium text-amber-700 bg-amber-100 rounded-lg hover:bg-amber-200 transition-colors">
                  Upload
                </button>
              </div>
            </div>
          </div>

          {/* Recent Checks */}
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Recent Compliance Checks</h3>
                  <p className="text-sm text-gray-500">Automated verification results</p>
                </div>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">NDIS Worker Screening</p>
                    <p className="text-xs text-gray-500">All 12 workers verified</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">Today</span>
              </div>
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Working With Children Check</p>
                    <p className="text-xs text-gray-500">All checks current</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">Today</span>
              </div>
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Insurance Verification</p>
                    <p className="text-xs text-gray-500">Public liability & professional indemnity valid</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">Yesterday</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications Table */}
      <div className="mt-8 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Worker Certifications</h3>
                <p className="text-sm text-gray-500">Track all mandatory certifications</p>
              </div>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-lg hover:bg-emerald-200 transition-colors">
              Export Report
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Worker</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">NDIS Screening</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">WWCC</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">First Aid</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">CPR</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Manual Handling</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {certifications.map((cert) => (
                <tr key={cert.name} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${colorMap[cert.color]} flex items-center justify-center text-white text-xs font-semibold`}>
                        {cert.initials}
                      </div>
                      <span className="font-medium text-gray-900">{cert.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusBadge[cert.ndis]}`}>{cert.ndis}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusBadge[cert.wwcc]}`}>{cert.wwcc}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusBadge[cert.firstAid]}`}>{cert.firstAid}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusBadge[cert.cpr]}`}>{cert.cpr}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusBadge[cert.manual]}`}>{cert.manual}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

