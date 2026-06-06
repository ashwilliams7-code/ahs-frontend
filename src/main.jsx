import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

const LINKS_ROUTES = new Set(['/links', '/linktree', '/ventures'])

function normalisePath(pathname) {
  const trimmed = pathname.replace(/\/+$/, '')
  return trimmed || '/'
}

async function boot() {
  const root = ReactDOM.createRoot(document.getElementById('root'))
  const path = normalisePath(window.location.pathname)

  if (LINKS_ROUTES.has(path)) {
    const { default: VentureLinks } = await import('./pages/VentureLinks.jsx')

    if (path !== '/links') {
      window.history.replaceState(null, '', '/links')
    }

    root.render(
      <React.StrictMode>
        <VentureLinks />
      </React.StrictMode>,
    )
    return
  }

  const [{ default: App }, { AuthProvider }, { BrowserRouter }] = await Promise.all([
    import('./App.jsx'),
    import('./context/AuthContext.jsx'),
    import('react-router-dom'),
  ])

  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>,
  )
}

boot()

