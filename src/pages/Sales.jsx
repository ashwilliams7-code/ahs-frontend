import { useState } from 'react'

// Demo leads data
const DEMO_LEADS = [
  { id: 1, name: 'Sunshine Care Services', contact: 'Maria Garcia', email: 'maria@sunshinecare.com', phone: '0412 345 678', status: 'New', value: '$12,500', source: 'Website', date: '2024-12-04' },
  { id: 2, name: 'Community First NDIS', contact: 'James Wilson', email: 'james@communityfirst.org', phone: '0423 456 789', status: 'Contacted', value: '$8,200', source: 'Referral', date: '2024-12-03' },
  { id: 3, name: 'Ability Plus Support', contact: 'Sarah Chen', email: 'sarah@abilityplus.com.au', phone: '0434 567 890', status: 'Meeting Scheduled', value: '$15,000', source: 'LinkedIn', date: '2024-12-02' },
  { id: 4, name: 'Inclusive Living Co', contact: 'David Brown', email: 'david@inclusiveliving.com', phone: '0445 678 901', status: 'Proposal Sent', value: '$22,000', source: 'Conference', date: '2024-12-01' },
  { id: 5, name: 'Care Connect Australia', contact: 'Emma Taylor', email: 'emma@careconnect.au', phone: '0456 789 012', status: 'Negotiating', value: '$18,500', source: 'Cold Call', date: '2024-11-30' },
]

const PIPELINE_STAGES = [
  { name: 'New Leads', count: 12, value: '$45,200', color: 'blue' },
  { name: 'Contacted', count: 8, value: '$32,100', color: 'amber' },
  { name: 'Meeting', count: 5, value: '$28,500', color: 'purple' },
  { name: 'Proposal', count: 3, value: '$42,000', color: 'cyan' },
  { name: 'Negotiating', count: 2, value: '$36,500', color: 'green' },
]

export default function Sales() {
  const [leads, setLeads] = useState(DEMO_LEADS)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showCallModal, setShowCallModal] = useState(false)
  const [selectedLead, setSelectedLead] = useState(null)
  const [callStatus, setCallStatus] = useState('idle') // idle, calling, connected, ended

  const getStatusColor = (status) => {
    const colors = {
      'New': 'bg-blue-100 text-blue-700',
      'Contacted': 'bg-amber-100 text-amber-700',
      'Meeting Scheduled': 'bg-purple-100 text-purple-700',
      'Proposal Sent': 'bg-cyan-100 text-cyan-700',
      'Negotiating': 'bg-green-100 text-green-700',
      'Won': 'bg-emerald-100 text-emerald-700',
      'Lost': 'bg-red-100 text-red-700',
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  const handleAICall = (lead) => {
    setSelectedLead(lead)
    setShowCallModal(true)
    setCallStatus('idle')
  }

  const startCall = () => {
    setCallStatus('calling')
    setTimeout(() => setCallStatus('connected'), 2000)
  }

  const endCall = () => {
    setCallStatus('ended')
    setTimeout(() => {
      setShowCallModal(false)
      setCallStatus('idle')
    }, 1500)
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales Agent</h1>
          <p className="text-gray-500">Manage leads, track pipeline, and automate outreach</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Add Lead
          </button>
        </div>
      </div>

      {/* Pipeline Overview */}
      <div className="grid grid-cols-5 gap-4">
        {PIPELINE_STAGES.map((stage) => (
          <div key={stage.name} className="bg-white rounded-xl p-4 border border-gray-200">
            <div className={`w-3 h-3 rounded-full bg-${stage.color}-500 mb-3`}></div>
            <h3 className="font-semibold text-gray-900">{stage.name}</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stage.count}</p>
            <p className="text-sm text-gray-500">{stage.value}</p>
          </div>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Leads</p>
              <p className="text-2xl font-bold text-gray-900">30</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Pipeline Value</p>
              <p className="text-2xl font-bold text-gray-900">$184,300</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">AI Calls Today</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">24%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-200 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Active Leads</h2>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Search leads..." 
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Company</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Contact</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Value</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Source</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="px-5 py-4">
                  <div>
                    <p className="font-medium text-gray-900">{lead.name}</p>
                    <p className="text-sm text-gray-500">{lead.email}</p>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div>
                    <p className="text-gray-900">{lead.contact}</p>
                    <p className="text-sm text-gray-500">{lead.phone}</p>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-5 py-4 font-semibold text-gray-900">{lead.value}</td>
                <td className="px-5 py-4 text-gray-600">{lead.source}</td>
                <td className="px-5 py-4">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleAICall(lead)}
                      className="px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                      AI Call
                    </button>
                    <button className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-all">
                      Email
                    </button>
                    <button className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-all">
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* AI Call Modal */}
      {showCallModal && selectedLead && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">
                  {selectedLead.contact.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-1">{selectedLead.contact}</h3>
              <p className="text-gray-500 mb-2">{selectedLead.name}</p>
              <p className="text-gray-400 text-sm mb-6">{selectedLead.phone}</p>

              {/* Call Status */}
              {callStatus === 'idle' && (
                <div className="space-y-4">
                  <div className="bg-cyan-50 rounded-xl p-4 text-left">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                      </svg>
                      <span className="font-semibold text-cyan-900">AI Human Voice</span>
                    </div>
                    <p className="text-sm text-cyan-700">Our AI will call and speak naturally with the lead about your NDIS services.</p>
                  </div>
                  <button 
                    onClick={startCall}
                    className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    Start AI Call
                  </button>
                </div>
              )}

              {callStatus === 'calling' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
                    <span className="text-amber-600 font-medium">Calling...</span>
                  </div>
                  <div className="flex justify-center gap-1">
                    <div className="w-2 h-8 bg-gray-300 rounded animate-pulse"></div>
                    <div className="w-2 h-12 bg-gray-400 rounded animate-pulse delay-75"></div>
                    <div className="w-2 h-6 bg-gray-300 rounded animate-pulse delay-100"></div>
                    <div className="w-2 h-10 bg-gray-400 rounded animate-pulse delay-150"></div>
                    <div className="w-2 h-8 bg-gray-300 rounded animate-pulse delay-200"></div>
                  </div>
                </div>
              )}

              {callStatus === 'connected' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-600 font-medium">Connected • AI Speaking</span>
                  </div>
                  <div className="flex justify-center gap-1">
                    <div className="w-2 h-8 bg-green-400 rounded animate-bounce"></div>
                    <div className="w-2 h-12 bg-green-500 rounded animate-bounce delay-75"></div>
                    <div className="w-2 h-6 bg-green-400 rounded animate-bounce delay-100"></div>
                    <div className="w-2 h-10 bg-green-500 rounded animate-bounce delay-150"></div>
                    <div className="w-2 h-8 bg-green-400 rounded animate-bounce delay-200"></div>
                  </div>
                  <p className="text-sm text-gray-500 italic">"Hi, I'm calling from NDISHub about your NDIS support services inquiry..."</p>
                  <button 
                    onClick={endCall}
                    className="w-full py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-all"
                  >
                    End Call
                  </button>
                </div>
              )}

              {callStatus === 'ended' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-green-600 font-medium">Call Completed</span>
                  </div>
                  <p className="text-sm text-gray-500">Call summary will be saved to the lead's profile.</p>
                </div>
              )}

              {callStatus === 'idle' && (
                <button 
                  onClick={() => setShowCallModal(false)}
                  className="mt-4 w-full py-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Lead Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Add New Lead</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="tel" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Value</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="$" />
              </div>
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Add Lead
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
