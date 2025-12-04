import { useState, useCallback, useEffect } from 'react'
import { api } from '../lib/api'

// Demo invoices data
const DEMO_INVOICES = [
  { id: 'INV-20241128143022', worker: 'Sarah Mitchell', client: 'Jane Doe', amount: 540.48, date: '2024-11-28', hours: 8 },
  { id: 'INV-20241128112015', worker: 'Emily Roberts', client: 'Mark Wilson', amount: 675.60, date: '2024-11-28', hours: 10 },
  { id: 'INV-20241127163042', worker: 'James Kim', client: 'Lisa Chen', amount: 405.36, date: '2024-11-27', hours: 6 },
  { id: 'INV-20241127091122', worker: 'Mike Thompson', client: 'Jane Doe', amount: 810.72, date: '2024-11-27', hours: 12 },
  { id: 'INV-20241126154533', worker: 'Angela Patel', client: 'Tom Brown', amount: 472.92, date: '2024-11-26', hours: 7 },
]

export default function Invoicing() {
  const [file, setFile] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [invoices, setInvoices] = useState(DEMO_INVOICES)

  useEffect(() => {
    loadInvoices()
  }, [])

  const loadInvoices = async () => {
    try {
      const data = await api.getInvoices()
      if (data.invoices && data.invoices.length > 0) {
        setInvoices([...data.invoices, ...DEMO_INVOICES])
      }
    } catch (err) {
      console.log('Using demo invoices')
    }
  }

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    setDragOver(false)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragOver(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      validateAndSetFile(droppedFile)
    }
  }, [])

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      validateAndSetFile(selectedFile)
    }
  }

  const validateAndSetFile = (file) => {
    const validTypes = ['.pdf', '.png', '.jpg', '.jpeg', '.csv', '.xlsx', '.txt']
    const fileExt = '.' + file.name.split('.').pop().toLowerCase()
    
    if (!validTypes.includes(fileExt)) {
      setError(`Invalid file type. Please upload: ${validTypes.join(', ')}`)
      return
    }
    
    if (file.size > 10 * 1024 * 1024) {
      setError('File too large. Maximum size is 10MB.')
      return
    }
    
    setFile(file)
    setError(null)
    setResult(null)
  }

  const clearFile = () => {
    setFile(null)
    setError(null)
    setResult(null)
  }

  const processTimesheet = async () => {
    if (!file) return
    
    setProcessing(true)
    setError(null)
    
    try {
      const data = await api.processTimesheet(file)
      setResult(data)
      loadInvoices()
    } catch (err) {
      setError(err.message || 'Failed to process timesheet')
    } finally {
      setProcessing(false)
    }
  }

  const downloadInvoice = async (invoiceId) => {
    if (invoiceId.startsWith('INV-202411')) {
      alert('This is a demo invoice. Upload a real timesheet to generate downloadable invoices!')
      return
    }
    
    try {
      const blob = await api.downloadInvoice(invoiceId)
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${invoiceId}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
      setError('Failed to download invoice')
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
    }).format(amount)
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-AU', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <div className="p-8">
      {/* Hero Section */}
      <div className="mb-8 animate-fade-in-up opacity-0" style={{ animationFillMode: 'forwards' }}>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 p-8 text-white">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)"/>
            </svg>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">AHS Invoicing Agent</h1>
                <p className="text-primary-200 text-lg max-w-xl">Upload your timesheet and automatically generate a compliant NDIS invoice in seconds.</p>
              </div>
              <div className="hidden lg:flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium">AI Powered</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-8 max-w-lg">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <p className="text-3xl font-bold">98%</p>
                <p className="text-primary-200 text-sm">Accuracy</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <p className="text-3xl font-bold">&lt;5s</p>
                <p className="text-primary-200 text-sm">Processing</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <p className="text-3xl font-bold">NDIS</p>
                <p className="text-primary-200 text-sm">Compliant</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload Card */}
        <div className="animate-fade-in-up opacity-0 animate-delay-100" style={{ animationFillMode: 'forwards' }}>
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Upload Timesheet</h3>
                  <p className="text-sm text-gray-500">Drag & drop or click to browse</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Upload Zone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`upload-zone relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer hover:border-primary-400 hover:bg-primary-50/50 ${
                  dragOver ? 'dragover border-primary-500 bg-primary-50' : 'border-gray-200'
                }`}
              >
                <input
                  type="file"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept=".pdf,.png,.jpg,.jpeg,.csv,.xlsx,.txt"
                />
                
                <div className="upload-icon mb-4 mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center transition-transform">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                
                <p className="text-gray-700 font-medium mb-1">Drop file here or click to upload</p>
                <p className="text-sm text-gray-500">PDF, PNG, JPG, CSV, XLSX up to 10MB</p>
              </div>

              {/* File Info */}
              {file && (
                <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{file.name}</p>
                      <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                    <button
                      onClick={clearFile}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Process Button */}
              <button
                onClick={processTimesheet}
                disabled={!file || processing}
                className="btn-glow w-full mt-6 px-6 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl shadow-lg shadow-primary-200 hover:shadow-xl hover:shadow-primary-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <div className="spinner w-5 h-5 border-2 border-white/20 border-t-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                    <span>Process Timesheet</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="animate-fade-in-up opacity-0 animate-delay-200" style={{ animationFillMode: 'forwards' }}>
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden h-full">
            {processing ? (
              <div className="p-8 h-full flex flex-col items-center justify-center">
                <div className="spinner w-12 h-12 mb-4"></div>
                <p className="text-gray-600 font-medium">Processing your timesheet...</p>
                <p className="text-sm text-gray-400 mt-1">This may take a few seconds</p>
              </div>
            ) : error ? (
              <div className="p-8 h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Processing Failed</h3>
                <p className="text-gray-500 text-sm max-w-xs">{error}</p>
                <button onClick={clearFile} className="mt-4 px-4 py-2 text-primary-600 font-medium hover:bg-primary-50 rounded-lg transition-colors">
                  Try Again
                </button>
              </div>
            ) : result ? (
              <>
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-accent-50 to-emerald-50">
                  <div className="flex items-center gap-3">
                    <div className="success-checkmark w-10 h-10 rounded-xl bg-accent-500 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Invoice Generated!</h3>
                      <p className="text-sm text-gray-500">Invoice #{result.invoice_number}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <p className="text-sm text-gray-500 mb-1">Total Hours</p>
                      <p className="text-2xl font-bold text-gray-900">{result.total_hours?.toFixed(2)}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-100">
                      <p className="text-sm text-primary-600 mb-1">Total Amount</p>
                      <p className="text-2xl font-bold text-primary-700">{formatCurrency(result.total_amount)}</p>
                    </div>
                  </div>

                  {result.line_items && result.line_items.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">Line Items</h4>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {result.line_items.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-600 text-xs font-semibold flex items-center justify-center">{index + 1}</span>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{item.date || 'Unknown Date'}</p>
                                <p className="text-xs text-gray-500">{item.hours}h @ {formatCurrency(item.rate)}/hr</p>
                              </div>
                            </div>
                            <span className="font-semibold text-gray-900">{formatCurrency(item.line_total)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => downloadInvoice(result.invoice_number)}
                    className="w-full px-6 py-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold rounded-xl shadow-lg shadow-accent-200 hover:shadow-xl hover:shadow-accent-300 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <span>Download Invoice PDF</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="p-8 h-full flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">No Invoice Yet</h3>
                <p className="text-gray-500 text-sm max-w-xs">Upload a timesheet file to generate your NDIS compliant invoice automatically.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Invoices */}
      <div className="mt-8 animate-fade-in-up opacity-0 animate-delay-300" style={{ animationFillMode: 'forwards' }}>
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Recent Invoices</h3>
                  <p className="text-sm text-gray-500">View your generated invoices</p>
                </div>
              </div>
              <button onClick={loadInvoices} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="data-table w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Invoice #</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Worker</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {invoices.slice(0, 10).map((invoice) => (
                  <tr key={invoice.id || invoice.invoice_number}>
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm font-medium text-primary-600">{invoice.id || invoice.invoice_number}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{invoice.worker || invoice.worker_name || '-'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{invoice.client || invoice.client_name || '-'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-gray-900">{formatCurrency(invoice.amount || invoice.total_amount)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-500">{formatDate(invoice.date || invoice.created_at)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => downloadInvoice(invoice.id || invoice.invoice_number)}
                        className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                        </svg>
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

