const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

class ApiClient {
  constructor() {
    this.baseUrl = API_URL
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    // Add auth token if available
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    const response = await fetch(url, config)
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'An error occurred' }))
      throw new Error(error.message || error.detail || 'Request failed')
    }

    return response.json()
  }

  // Invoices
  async getInvoices() {
    return this.request('/api/invoices')
  }

  async getInvoiceById(id) {
    return this.request(`/api/invoices/${id}`)
  }

  async downloadInvoice(id) {
    const response = await fetch(`${this.baseUrl}/api/invoices/${id}/download`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      },
    })
    return response.blob()
  }

  async processTimesheet(file) {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(`${this.baseUrl}/api/process-timesheet`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      },
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Upload failed' }))
      throw new Error(error.message || 'Upload failed')
    }

    return response.json()
  }

  // Workers
  async getWorkers() {
    return this.request('/api/workers')
  }

  async getWorkerById(id) {
    return this.request(`/api/workers/${id}`)
  }

  // Activity
  async getActivity() {
    return this.request('/api/activity')
  }

  // Dashboard Stats
  async getDashboardStats() {
    return this.request('/api/dashboard/stats')
  }

  // Service Breakdown
  async getServiceBreakdown() {
    return this.request('/api/service-breakdown')
  }

  // Top Performers
  async getTopPerformers() {
    return this.request('/api/top-performers')
  }

  // Compliance
  async getComplianceData() {
    return this.request('/api/compliance')
  }
}

export const api = new ApiClient()

