import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Layout from './components/Layout'
import ApplyMateLayout from './components/ApplyMateLayout'
import Landing from './pages/Landing'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Contact from './pages/Contact'
import AppSelector from './pages/AppSelector'
// NDISHub Pages
import Dashboard from './pages/Dashboard'
import Invoicing from './pages/Invoicing'
import Rostering from './pages/Rostering'
import Compliance from './pages/Compliance'
import Sales from './pages/Sales'
import Marketing from './pages/Marketing'
import Settings from './pages/Settings'
// ApplyMate Pages
import ApplyMateDashboard from './pages/applymate/Dashboard'
import JobSearch from './pages/applymate/JobSearch'
import AutoApply from './pages/applymate/AutoApply'
import Applications from './pages/applymate/Applications'
import CoverLetters from './pages/applymate/CoverLetters'
import Resume from './pages/applymate/Resume'
import ApplyMateSettings from './pages/applymate/Settings'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="spinner w-12 h-12"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/" replace />
  }

  return children
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="spinner w-12 h-12"></div>
      </div>
    )
  }

  if (user) {
    return <Navigate to="/apps" replace />
  }

  return children
}

function App() {
  return (
    <Routes>
      {/* Landing page - Public */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <Landing />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Landing />
          </PublicRoute>
        }
      />

      {/* App Selector - First page after login */}
      <Route
        path="/apps"
        element={
          <ProtectedRoute>
            <AppSelector />
          </ProtectedRoute>
        }
      />

      {/* NDISHub App - Protected routes with Layout */}
      <Route
        path="/ndishub"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/ndishub/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="invoicing" element={<Invoicing />} />
        <Route path="rostering" element={<Rostering />} />
        <Route path="compliance" element={<Compliance />} />
        <Route path="sales" element={<Sales />} />
        <Route path="marketing" element={<Marketing />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Legacy routes - redirect to new paths */}
      <Route path="/dashboard" element={<Navigate to="/ndishub/dashboard" replace />} />
      <Route path="/invoicing" element={<Navigate to="/ndishub/invoicing" replace />} />
      <Route path="/rostering" element={<Navigate to="/ndishub/rostering" replace />} />
      <Route path="/compliance" element={<Navigate to="/ndishub/compliance" replace />} />
      <Route path="/sales" element={<Navigate to="/ndishub/sales" replace />} />
      <Route path="/marketing" element={<Navigate to="/ndishub/marketing" replace />} />
      <Route path="/settings" element={<Navigate to="/ndishub/settings" replace />} />

      {/* ApplyMate App - Protected routes with ApplyMateLayout */}
      <Route
        path="/applymate"
        element={
          <ProtectedRoute>
            <ApplyMateLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<ApplyMateDashboard />} />
        <Route path="search" element={<JobSearch />} />
        <Route path="auto-apply" element={<AutoApply />} />
        <Route path="applications" element={<Applications />} />
        <Route path="cover-letters" element={<CoverLetters />} />
        <Route path="resume" element={<Resume />} />
        <Route path="settings" element={<ApplyMateSettings />} />
      </Route>

      {/* Public Pages */}
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/contact" element={<Contact />} />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/apps" replace />} />
    </Routes>
  )
}

export default App

