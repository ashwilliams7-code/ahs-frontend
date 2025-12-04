import { useState } from 'react'

// Demo campaigns data
const DEMO_CAMPAIGNS = [
  { id: 1, name: 'NDIS Provider Awareness', type: 'Email', status: 'Active', sent: 2450, opened: 1820, clicked: 645, date: '2024-12-01' },
  { id: 2, name: 'Community Support Services', type: 'Social', status: 'Active', sent: 15000, opened: 8500, clicked: 2100, date: '2024-11-28' },
  { id: 3, name: 'New Year Promotion', type: 'Email', status: 'Scheduled', sent: 0, opened: 0, clicked: 0, date: '2024-12-15' },
  { id: 4, name: 'Client Testimonials', type: 'Social', status: 'Completed', sent: 12000, opened: 9200, clicked: 3400, date: '2024-11-20' },
  { id: 5, name: 'Service Introduction', type: 'Email', status: 'Draft', sent: 0, opened: 0, clicked: 0, date: '2024-12-10' },
]

const SOCIAL_POSTS = [
  { id: 1, platform: 'LinkedIn', content: 'Exciting news! Our NDIS support services are now available in...', scheduled: 'Today, 2:00 PM', status: 'Scheduled', engagement: null },
  { id: 2, platform: 'Facebook', content: 'Meet our amazing support workers who make a difference...', scheduled: 'Tomorrow, 9:00 AM', status: 'Scheduled', engagement: null },
  { id: 3, platform: 'Instagram', content: 'Behind the scenes at AHS - see how we support our clients...', scheduled: 'Dec 6, 10:00 AM', status: 'Draft', engagement: null },
]

export default function Marketing() {
  const [campaigns, setCampaigns] = useState(DEMO_CAMPAIGNS)
  const [posts, setPosts] = useState(SOCIAL_POSTS)
  const [activeTab, setActiveTab] = useState('campaigns')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showPostModal, setShowPostModal] = useState(false)

  const getStatusColor = (status) => {
    const colors = {
      'Active': 'bg-green-100 text-green-700',
      'Scheduled': 'bg-blue-100 text-blue-700',
      'Completed': 'bg-gray-100 text-gray-700',
      'Draft': 'bg-amber-100 text-amber-700',
      'Paused': 'bg-red-100 text-red-700',
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'LinkedIn':
        return (
          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        )
      case 'Facebook':
        return (
          <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        )
      case 'Instagram':
        return (
          <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Marketing Agent</h1>
          <p className="text-gray-500">Manage campaigns, social media, and analytics</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowPostModal(true)}
            className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
            Schedule Post
          </button>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-xl hover:from-pink-600 hover:to-rose-700 transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
            New Campaign
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Emails Sent</p>
              <p className="text-2xl font-bold text-gray-900">14,450</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Open Rate</p>
              <p className="text-2xl font-bold text-gray-900">68.4%</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Click Rate</p>
              <p className="text-2xl font-bold text-gray-900">24.2%</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">New Subscribers</p>
              <p className="text-2xl font-bold text-gray-900">+342</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="border-b border-gray-200 px-6">
          <div className="flex gap-6">
            <button 
              onClick={() => setActiveTab('campaigns')}
              className={`py-4 border-b-2 transition-colors ${activeTab === 'campaigns' ? 'border-pink-500 text-pink-600 font-semibold' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              Email Campaigns
            </button>
            <button 
              onClick={() => setActiveTab('social')}
              className={`py-4 border-b-2 transition-colors ${activeTab === 'social' ? 'border-pink-500 text-pink-600 font-semibold' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              Social Media
            </button>
            <button 
              onClick={() => setActiveTab('analytics')}
              className={`py-4 border-b-2 transition-colors ${activeTab === 'analytics' ? 'border-pink-500 text-pink-600 font-semibold' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              Analytics
            </button>
          </div>
        </div>

        {/* Campaigns Tab */}
        {activeTab === 'campaigns' && (
          <div className="p-6">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="pb-4 text-xs font-semibold text-gray-500 uppercase">Campaign</th>
                  <th className="pb-4 text-xs font-semibold text-gray-500 uppercase">Type</th>
                  <th className="pb-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="pb-4 text-xs font-semibold text-gray-500 uppercase">Sent</th>
                  <th className="pb-4 text-xs font-semibold text-gray-500 uppercase">Opened</th>
                  <th className="pb-4 text-xs font-semibold text-gray-500 uppercase">Clicked</th>
                  <th className="pb-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-gray-50">
                    <td className="py-4">
                      <p className="font-medium text-gray-900">{campaign.name}</p>
                      <p className="text-sm text-gray-500">{campaign.date}</p>
                    </td>
                    <td className="py-4 text-gray-600">{campaign.type}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                        {campaign.status}
                      </span>
                    </td>
                    <td className="py-4 text-gray-900">{campaign.sent.toLocaleString()}</td>
                    <td className="py-4 text-gray-900">{campaign.opened.toLocaleString()}</td>
                    <td className="py-4 text-gray-900">{campaign.clicked.toLocaleString()}</td>
                    <td className="py-4">
                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-all">
                          View
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
        )}

        {/* Social Media Tab */}
        {activeTab === 'social' && (
          <div className="p-6">
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                      {getPlatformIcon(post.platform)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">{post.platform}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                          {post.status}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{post.content}</p>
                      <p className="text-sm text-gray-400">Scheduled: {post.scheduled}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-all">
                        Edit
                      </button>
                      <button className="px-3 py-1.5 bg-pink-100 text-pink-700 text-sm rounded-lg hover:bg-pink-200 transition-all">
                        Post Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="p-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Email Performance</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Open Rate</span>
                      <span className="font-semibold">68.4%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-pink-500 h-2 rounded-full" style={{ width: '68.4%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Click Rate</span>
                      <span className="font-semibold">24.2%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-violet-500 h-2 rounded-full" style={{ width: '24.2%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Bounce Rate</span>
                      <span className="font-semibold">2.1%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full" style={{ width: '2.1%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Social Media Reach</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getPlatformIcon('LinkedIn')}
                      <span className="text-gray-600">LinkedIn</span>
                    </div>
                    <span className="font-semibold">12.4K followers</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getPlatformIcon('Facebook')}
                      <span className="text-gray-600">Facebook</span>
                    </div>
                    <span className="font-semibold">8.2K followers</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getPlatformIcon('Instagram')}
                      <span className="text-gray-600">Instagram</span>
                    </div>
                    <span className="font-semibold">5.6K followers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Create Email Campaign</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject Line</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Audience</label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500">
                  <option>All Subscribers</option>
                  <option>New Leads</option>
                  <option>Active Clients</option>
                  <option>Inactive Clients</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Schedule</label>
                <input type="datetime-local" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500" />
              </div>
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-lg hover:from-pink-600 hover:to-rose-700 transition-all"
                >
                  Create Campaign
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Post Modal */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Schedule Social Post</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 border border-blue-500 bg-blue-50 text-blue-700 rounded-lg flex items-center justify-center gap-2">
                    {getPlatformIcon('LinkedIn')} LinkedIn
                  </button>
                  <button className="flex-1 py-2 border border-gray-200 text-gray-600 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50">
                    {getPlatformIcon('Facebook')} Facebook
                  </button>
                  <button className="flex-1 py-2 border border-gray-200 text-gray-600 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50">
                    {getPlatformIcon('Instagram')} Instagram
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                  placeholder="Write your post..."
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Schedule</label>
                <input type="datetime-local" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500" />
              </div>
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setShowPostModal(false)}
                  className="flex-1 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowPostModal(false)}
                  className="flex-1 py-2 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-lg hover:from-pink-600 hover:to-rose-700 transition-all"
                >
                  Schedule Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
