import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Layout from './components/Layout'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AppSelector from './pages/AppSelector'
import Dashboard from './pages/Dashboard'
import Invoicing from './pages/Invoicing'
import Rostering from './pages/Rostering'
import Compliance from './pages/Compliance'
import Sales from './pages/Sales'
import Marketing from './pages/Marketing'
import Settings from './pages/Settings'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="spinner w-12 h-12"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
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
      {/* Public routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
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

      {/* AHS App - Protected routes with Layout */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/apps" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="invoicing" element={<Invoicing />} />
        <Route path="rostering" element={<Rostering />} />
        <Route path="compliance" element={<Compliance />} />
        <Route path="sales" element={<Sales />} />
        <Route path="marketing" element={<Marketing />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/apps" replace />} />
    </Routes>
  )
}

export default App

