import { useEffect, useMemo, useState } from 'react'
import './VentureLinks.css'

const FEATURED_LINKS = [
  {
    key: 'autoaihub',
    title: 'AutoAI Hub',
    eyebrow: 'AHS domain',
    description: 'Custom AI systems, automations, dashboards, and business-agent deployments for Australian operators.',
    href: 'https://app.autoaihub.io/',
    label: 'Open AHS',
    mark: 'AI',
    tint: '#C9A646',
    metric: 'AI ops',
  },
  {
    key: 'aurii',
    title: 'Aurii',
    eyebrow: 'aesthetic intelligence',
    description: 'Pre-consult appearance ROI, feature audit, and high-trust aesthetic planning.',
    href: 'https://aurii.me',
    label: 'View Aurii',
    mark: 'Au',
    tint: '#F4E6BE',
    metric: 'beauty tech',
  },
  {
    key: 'kingklaw',
    title: 'King Klaw',
    eyebrow: 'agent deployment',
    description: 'OpenClaw-style business agents packaged for Australian SMB workflows.',
    href: 'https://kingklaw.au',
    label: 'Visit King Klaw',
    mark: 'KK',
    tint: '#8FA092',
    metric: 'AU agents',
  },
]

const VENTURE_LINKS = [
  {
    title: 'ClawHub',
    description: 'Marketplace layer for curated OpenClaw skills and deployable agent workflows.',
    href: 'https://clawhub.ai',
    mark: 'CH',
    tint: '#0D3B2A',
    type: 'marketplace',
  },
  {
    title: 'SeekMateAI',
    description: 'Job-search agents, inbox triage, application operations, and multi-bot workflow tooling.',
    href: 'https://github.com/ashwilliams7-code/SeekMateAI',
    mark: 'SM',
    tint: '#8FA092',
    type: 'github proof',
  },
  {
    title: 'Homerun',
    description: 'Prediction-market alpha OS for Polymarket/Kalshi-style research and trading systems.',
    href: 'https://github.com/ashwilliams7-code/homerun',
    mark: 'HR',
    tint: '#C9A646',
    type: 'markets',
  },
  {
    title: 'AHS backend',
    description: 'Express/Supabase API layer for invoices, activity, workers, ApplyMate, and operations data.',
    href: 'https://github.com/ashwilliams7-code/ahs-backend',
    mark: 'API',
    tint: '#F4E6BE',
    type: 'infrastructure',
  },
]

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/ashwilliams7-code?tab=repositories' },
  { label: 'Aurii', href: 'https://aurii.me' },
  { label: 'AHS', href: 'https://app.autoaihub.io/' },
  { label: 'King Klaw', href: 'https://kingklaw.au' },
]

function ExternalArrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M7 17L17 7M10 7h7v7" />
    </svg>
  )
}

export default function VentureLinks() {
  const [copied, setCopied] = useState(false)
  const pageUrl = 'https://app.autoaihub.io/links'

  useEffect(() => {
    const originalTitle = document.title
    document.title = 'Ash Williams — Venture Links'

    const description = 'Ash Williams venture link hub: AutoAI Hub, Aurii, King Klaw, ClawHub, SeekMateAI, Homerun, and public project proof.'
    let meta = document.querySelector('meta[name="description"]')
    const originalDescription = meta?.getAttribute('content')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', description)

    return () => {
      document.title = originalTitle
      if (originalDescription) {
        meta.setAttribute('content', originalDescription)
      }
    }
  }, [])

  const currentYear = useMemo(() => new Date().getFullYear(), [])

  const handleShare = async () => {
    const shareData = {
      title: 'Ash Williams — Venture Links',
      text: 'AI systems, aesthetic intelligence, business agents, markets, and Sky.',
      url: pageUrl,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(pageUrl)
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1800)
      }
    } catch {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(pageUrl)
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1800)
      }
    }
  }

  return (
    <main className="venture-links-shell" aria-label="Ash Williams venture links">
      <div className="vl-ambient" aria-hidden="true">
        <div className="vl-glow vl-glow-one"></div>
        <div className="vl-glow vl-glow-two"></div>
        <div className="vl-grain"></div>
      </div>

      <section className="vl-phone-frame">
        <header className="vl-hero">
          <div className="vl-topline">
            <span className="vl-live-dot"><span></span>Live on AHS</span>
            <button type="button" className="vl-share" onClick={handleShare}>
              {copied ? 'Copied' : 'Share'}
            </button>
          </div>

          <div className="vl-identity-card">
            <div className="vl-monogram" aria-hidden="true">
              <span>A</span>
              <small>W</small>
            </div>
            <div>
              <p className="vl-kicker">venture switchboard</p>
              <h1>Ash Williams</h1>
              <p className="vl-subhead">
                AI systems, aesthetic intelligence, business-agent deployments, market alpha, and Sky — the private operating layer underneath it all.
              </p>
            </div>
          </div>

          <div className="vl-command-strip" aria-label="Focus areas">
            <span>AI agents</span>
            <span>Beauty tech</span>
            <span>Ops systems</span>
            <span>Markets</span>
          </div>
        </header>

        <section className="vl-featured-grid" aria-label="Featured ventures">
          {FEATURED_LINKS.map((link, index) => (
            <a
              className="vl-feature-card"
              href={link.href}
              target="_blank"
              rel="noreferrer"
              key={link.key}
              style={{ '--tint': link.tint, '--delay': `${index * 70}ms` }}
            >
              <span className="vl-card-shine" aria-hidden="true"></span>
              <span className="vl-card-meta">{link.eyebrow}</span>
              <span className="vl-feature-main">
                <span className="vl-feature-mark">{link.mark}</span>
                <span>
                  <strong>{link.title}</strong>
                  <small>{link.description}</small>
                </span>
              </span>
              <span className="vl-feature-bottom">
                <span>{link.metric}</span>
                <span className="vl-open-label">{link.label}<ExternalArrow /></span>
              </span>
            </a>
          ))}
        </section>

        <section className="vl-stack" aria-label="All venture links">
          <div className="vl-section-heading">
            <p>More in the orbit</p>
            <span>public-safe links only</span>
          </div>

          {VENTURE_LINKS.map((link, index) => (
            <a
              className="vl-row-card"
              href={link.href}
              target="_blank"
              rel="noreferrer"
              key={link.title}
              style={{ '--tint': link.tint, '--delay': `${index * 65}ms` }}
            >
              <span className="vl-row-mark">{link.mark}</span>
              <span className="vl-row-copy">
                <span>
                  <strong>{link.title}</strong>
                  <em>{link.type}</em>
                </span>
                <small>{link.description}</small>
              </span>
              <span className="vl-row-arrow"><ExternalArrow /></span>
            </a>
          ))}
        </section>

        <aside className="vl-sky-panel" aria-label="Sky context">
          <span className="vl-sky-orb">S</span>
          <div>
            <strong>Sky is the operating layer.</strong>
            <p>Memory, voice, automations, tools, and operator workflows connecting the ventures behind the scenes.</p>
          </div>
        </aside>

        <nav className="vl-socials" aria-label="Social and public links">
          {SOCIAL_LINKS.map((link) => (
            <a href={link.href} target="_blank" rel="noreferrer" key={link.label}>{link.label}</a>
          ))}
        </nav>

        <footer className="vl-footer">
          <span>app.autoaihub.io/links</span>
          <span>© {currentYear} Williams Group</span>
        </footer>
      </section>
    </main>
  )
}
