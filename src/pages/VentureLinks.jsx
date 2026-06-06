import { useEffect, useId, useMemo, useRef, useState } from 'react'
import './VentureLinks.css'

const INITIATIVES = [
  {
    key: 'autoaihub',
    title: 'AutoAI Hub',
    eyebrow: 'AI automation platform',
    status: 'Live site',
    description: 'Custom AI systems, automations, dashboards, and business-agent deployments for Australian operators.',
    expanded: 'AutoAI Hub is the main product home for practical AI implementation: custom assistants, workflow automations, operational dashboards, internal tools, and agent deployments built around how a real business already works.',
    helps: [
      'Removes repetitive admin, follow-up, and handover work from busy teams.',
      'Turns messy processes into trackable systems with clearer ownership and reporting.',
      'Gives Australian SMBs useful AI without needing to hire an in-house AI team.',
    ],
    href: 'https://app.autoaihub.io/',
    label: 'Open AutoAI Hub',
    logo: 'autoaihub',
    tint: '#22F4D6',
    scene: 'Systems that turn business friction into automated operating leverage.',
  },
  {
    key: 'aurii',
    title: 'Aurii',
    eyebrow: 'Aesthetic intelligence',
    status: 'Live site',
    description: 'Pre-consult appearance analysis, feature planning, and high-trust aesthetic decision support.',
    expanded: 'Aurii brings structure to aesthetic decision-making. It helps people understand facial balance, presentation, profile quality, and possible improvement pathways before they walk into high-stakes consultations.',
    helps: [
      'Helps clients make calmer, better-informed appearance decisions.',
      'Gives clinics and consultants cleaner intake context before a conversation starts.',
      'Reduces confusion by translating visual goals into practical next steps.',
    ],
    href: 'https://aurii.me',
    label: 'Open Aurii',
    logo: 'aurii',
    tint: '#FF7AD9',
    scene: 'A premium diagnostic layer for appearance, trust, and visual decision-making.',
  },
  {
    key: 'kingklaw',
    title: 'King Klaw',
    eyebrow: 'Business-agent deployment',
    status: 'Live domain',
    description: 'Agent workflows packaged for Australian SMB operations and practical workflow execution.',
    expanded: 'King Klaw is the deployment face for focused business agents: capturing workflows, converting them into repeatable systems, and packaging automations that can actually run inside a small business.',
    helps: [
      'Finds the highest-leverage workflows instead of automating random busywork.',
      'Creates practical agents around sales, admin, fulfilment, and operations.',
      'Makes agent deployment feel like an operating upgrade, not a science project.',
    ],
    href: 'https://kingklaw.au',
    label: 'Visit King Klaw',
    logo: 'kingklaw',
    tint: '#F8D84E',
    scene: 'A sharper front door for agent deployment, workflow capture, and SMB execution.',
  },
  {
    key: 'clawhub',
    title: 'ClawHub',
    eyebrow: 'Agent workflow marketplace',
    status: 'Live domain',
    description: 'Curated skills and deployable workflow components for agent-powered operations.',
    expanded: 'ClawHub is designed as the reusable layer: a place for agent skills, workflows, templates, and deployment patterns that can be reused instead of rebuilt from scratch every time.',
    helps: [
      'Speeds up new AI builds with reusable workflow components.',
      'Keeps agent systems more consistent, auditable, and easier to improve.',
      'Turns one-off automation lessons into a compounding operations library.',
    ],
    href: 'https://clawhub.ai',
    label: 'Visit ClawHub',
    logo: 'clawhub',
    tint: '#90FF5A',
    scene: 'A marketplace spine for reusable agent workflows, skills, and deployment patterns.',
  },
  {
    key: 'seekmate',
    title: 'SeekMateAI',
    eyebrow: 'Application-ops agents',
    status: 'Public build proof',
    description: 'Job-search agents, inbox triage, application operations, and multi-bot workflow tooling.',
    expanded: 'SeekMateAI is build proof for messy personal-operations automation: job search workflows, inbox triage, application tracking, bot orchestration, and practical agent handoffs.',
    helps: [
      'Shows how repetitive personal admin can become a managed agent workflow.',
      'Proves the same automation patterns can be applied to business operations.',
      'Demonstrates real-world orchestration beyond a polished demo screen.',
    ],
    href: 'https://github.com/ashwilliams7-code/SeekMateAI',
    label: 'View GitHub repo',
    logo: 'seekmate',
    tint: '#38BDF8',
    scene: 'Proof that messy personal operations can be converted into agentic systems.',
  },
  {
    key: 'homerun',
    title: 'Homerun',
    eyebrow: 'Market alpha systems',
    status: 'Public build proof',
    description: 'Prediction-market research tooling for Polymarket/Kalshi-style workflows.',
    expanded: 'Homerun explores prediction-market intelligence: collecting signals, structuring research, and turning public information into faster market understanding.',
    helps: [
      'Organises market research into repeatable signal workflows.',
      'Makes complex public information easier to monitor and compare.',
      'Acts as proof of deeper data, research, and automation capability.',
    ],
    href: 'https://github.com/ashwilliams7-code/homerun',
    label: 'View GitHub repo',
    logo: 'homerun',
    tint: '#FF7A3D',
    scene: 'A research and signal layer for prediction-market information advantage.',
  },
  {
    key: 'ahs-backend',
    title: 'AHS Backend',
    eyebrow: 'Infrastructure proof',
    status: 'Public build proof',
    description: 'Backend services and operational tooling supporting AutoAI Hub systems.',
    expanded: 'AHS Backend is the systems layer underneath the public product: services, integrations, operational tooling, and the practical wiring needed for AI workflows to run reliably.',
    helps: [
      'Connects front-end experiences to real services and operational data.',
      'Supports automation, intake, reporting, and workflow execution behind the scenes.',
      'Shows the engineering foundation underneath the venture portfolio.',
    ],
    href: 'https://github.com/ashwilliams7-code/ahs-backend',
    label: 'View GitHub repo',
    logo: 'ahs-backend',
    tint: '#A78BFA',
    scene: 'The unglamorous systems layer underneath product, dashboards, workers, and ops data.',
  },
]

const LANDING_POINTS = [
  {
    title: 'Founder-led AI systems',
    text: 'Built close to the real workflow, not from a generic automation template.',
  },
  {
    title: 'Public proof, not just pitch decks',
    text: 'Live domains and repositories show the portfolio is moving from ideas into shipped systems.',
  },
  {
    title: 'Built for operators',
    text: 'The focus is practical leverage: fewer bottlenecks, cleaner handoffs, and faster execution.',
  },
]

const FOUNDER = {
  name: 'Ash Williams',
  role: 'Founder, Williams Group',
  image: '/assets/ash-founder.jpg',
  bio: 'Ash is a Brisbane-based AI builder and operator creating practical agent systems for businesses, creators, and high-trust consumer experiences. He combines product instinct, automation, research, and hands-on engineering to turn scattered workflows into systems that actually move.',
  highlights: [
    'Builder behind AutoAI Hub and the wider Williams Group venture stack.',
    'Focused on AI that saves time, clarifies decisions, and compounds operational leverage.',
    'Hands-on across product, automation, content, research, and agent orchestration.',
  ],
}

const PUBLIC_CHANNELS = [
  { label: 'GitHub', href: 'https://github.com/ashwilliams7-code?tab=repositories' },
  { label: 'AutoAI Hub', href: 'https://app.autoaihub.io/' },
  { label: 'Aurii', href: 'https://aurii.me' },
  { label: 'King Klaw', href: 'https://kingklaw.au' },
  { label: 'ClawHub', href: 'https://clawhub.ai' },
]

const INSTAGRAM_LINKS = []
const MOBILE_LINKS_QUERY = '(max-width: 760px)'
const PHONE_LINKS_QUERY = '(max-width: 430px)'
const TABLET_LINKS_QUERY = '(max-width: 900px)'
const LAPTOP_LINKS_QUERY = '(max-width: 1920px)'
const INTRO_EXIT_MS = 920
const INTRO_DONE_MS = 1280

function getInitialStageMode() {
  if (typeof window === 'undefined') return 'desktop'
  if (window.matchMedia(PHONE_LINKS_QUERY).matches) return 'phone'
  if (window.matchMedia(TABLET_LINKS_QUERY).matches) return 'compact'
  if (window.matchMedia(LAPTOP_LINKS_QUERY).matches) return 'laptop'
  return 'desktop'
}

function shouldRunMobileIntro() {
  if (typeof window === 'undefined') return false
  return window.matchMedia(MOBILE_LINKS_QUERY).matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function ExternalArrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M7 17L17 7M10 7h7v7" />
    </svg>
  )
}

function VentureLogo({ name, title }) {
  const rawId = useId().replace(/:/g, '')
  const metalId = `vl-metal-${rawId}`
  const glowId = `vl-glow-${rawId}`
  const darkId = `vl-dark-${rawId}`
  const nodeId = `vl-node-${rawId}`

  const gradients = (
    <defs>
      <linearGradient id={metalId} x1="12" y1="8" x2="52" y2="58" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#FFF2C9" />
        <stop offset="0.48" stopColor="#F8D84E" />
        <stop offset="1" stopColor="#FF7A3D" />
      </linearGradient>
      <linearGradient id={darkId} x1="11" y1="9" x2="53" y2="56" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#083B5F" />
        <stop offset="1" stopColor="#020617" />
      </linearGradient>
      <radialGradient id={glowId} cx="50%" cy="20%" r="72%">
        <stop offset="0" stopColor="#FFF7C7" stopOpacity="0.86" />
        <stop offset="0.5" stopColor="#F8D84E" stopOpacity="0.32" />
        <stop offset="1" stopColor="#F8D84E" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={nodeId} cx="36%" cy="25%" r="70%">
        <stop offset="0" stopColor="#FFF7C7" />
        <stop offset="1" stopColor="#47F3D2" />
      </radialGradient>
    </defs>
  )

  const commonStroke = {
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    vectorEffect: 'non-scaling-stroke',
  }

  const marks = {
    williams: (
      <>
        <path d="M32 7.5 50.5 15v15.2C50.5 43.8 42.8 53.4 32 58 21.2 53.4 13.5 43.8 13.5 30.2V15L32 7.5Z" fill={`url(#${darkId})`} stroke={`url(#${metalId})`} strokeWidth="2.4" {...commonStroke} />
        <path d="M20 21.5 25.3 14l6.8 8.4 6.7-8.4 5.2 7.5-3.1 8.4H23.1L20 21.5Z" fill={`url(#${metalId})`} opacity="0.96" {...commonStroke} />
        <path d="M19.8 34.2 25.8 45l6.3-13.6L38.5 45l5.7-10.8" fill="none" stroke="#FFF7C7" strokeWidth="4.1" {...commonStroke} />
        <path d="M24.2 48.6h15.6" fill="none" stroke={`url(#${metalId})`} strokeWidth="2.2" {...commonStroke} />
      </>
    ),
    autoaihub: (
      <>
        <path d="M22.4 12.8h19.2L52 31.9 41.6 51.2H22.4L12 31.9l10.4-19.1Z" fill={`url(#${darkId})`} stroke={`url(#${metalId})`} strokeWidth="2.4" {...commonStroke} />
        <path d="M19.7 32h-7.2M44.3 32h7.2M32 19.7v-7.2M32 44.3v7.2" fill="none" stroke="#47F3D2" strokeWidth="2.1" {...commonStroke} />
        <path d="M20.6 23.2c7.4-7.4 15.7-7.4 22.8 0M20.6 40.8c7.4 7.4 15.7 7.4 22.8 0" fill="none" stroke={`url(#${metalId})`} strokeWidth="2.1" opacity="0.82" {...commonStroke} />
        <circle cx="32" cy="32" r="7.4" fill={`url(#${metalId})`} />
        <circle cx="32" cy="32" r="3.1" fill="#062A37" />
        <circle cx="16" cy="32" r="3.1" fill={`url(#${nodeId})`} />
        <circle cx="48" cy="32" r="3.1" fill={`url(#${nodeId})`} />
        <circle cx="32" cy="16" r="3.1" fill={`url(#${nodeId})`} />
        <circle cx="32" cy="48" r="3.1" fill={`url(#${nodeId})`} />
      </>
    ),
    aurii: (
      <>
        <path d="M32 8.5C44.7 13.4 52.3 22 52.3 32c0 13.1-9.1 22-20.3 24-11.2-2-20.3-10.9-20.3-24 0-10 7.6-18.6 20.3-23.5Z" fill={`url(#${darkId})`} stroke={`url(#${metalId})`} strokeWidth="2.2" {...commonStroke} />
        <path d="M22.2 39.8c8.2 2.5 15.1.5 19.3-5.7 3.9-5.8 2.5-12.1-2.9-15.3-8.9 2.7-15.1 10.1-16.4 21Z" fill="none" stroke="#FFF7C7" strokeWidth="2.65" {...commonStroke} />
        <path d="M32.9 19c-1.1 6.6.7 12.2 5.8 16.1M22.2 39.9c3.8 7.1 11.2 9.6 19.7 7.3" fill="none" stroke={`url(#${metalId})`} strokeWidth="2.35" {...commonStroke} />
        <circle cx="41.4" cy="28.3" r="2.1" fill={`url(#${metalId})`} />
        <path d="M18.4 47.2c7.6 4.4 19.6 4.5 27.2 0" fill="none" stroke="#47F3D2" strokeWidth="2.1" opacity="0.88" {...commonStroke} />
        <path d="M24.3 15.4c4.8-3.1 10.6-3.1 15.4 0" fill="none" stroke={`url(#${metalId})`} strokeWidth="2.1" opacity="0.78" {...commonStroke} />
      </>
    ),
    kingklaw: (
      <>
        <path d="M15.4 23.1 22.2 13l9.8 10.5L41.8 13l6.8 10.1-4 9.6H19.4l-4-9.6Z" fill={`url(#${metalId})`} stroke="#FFF7C7" strokeWidth="1.3" {...commonStroke} />
        <path d="M19.1 36.7c5.8-2.4 11.9-2.5 18.4-.2 2.6.9 5.1.5 7.4-1.1" fill="none" stroke="#47F3D2" strokeWidth="2.2" {...commonStroke} />
        <path d="M24.2 51.4c5.8-6.9 6.6-14.7 2.2-23.2" fill="none" stroke={`url(#${metalId})`} strokeWidth="4" {...commonStroke} />
        <path d="M34 53.4c3.6-8.6 2.8-16.7-2.2-24.3" fill="none" stroke="#FFF7C7" strokeWidth="4" {...commonStroke} />
        <path d="M45 48.4c-1.6-8.7-5.4-15-11.5-18.9" fill="none" stroke={`url(#${metalId})`} strokeWidth="4" {...commonStroke} />
        <path d="M22.6 52.6 28 49.7l-2.2 6.1M32.2 54.7l4.7-4 .1 6.5M43.3 49.8l4.4-4.1.8 6.2" fill="#FFF7C7" stroke="none" />
      </>
    ),
    clawhub: (
      <>
        <path d="M32 8.8 51.8 20.2v23.6L32 55.2 12.2 43.8V20.2L32 8.8Z" fill={`url(#${darkId})`} stroke={`url(#${metalId})`} strokeWidth="2.3" {...commonStroke} />
        <path d="M22 42.6c-3.3-7.4-1-15 6.3-20.5M31.3 45.2c-2.8-8-.8-16.7 5.2-23.8M41.3 41.4c-1.6-6.8-5.1-12-10.3-15.8" fill="none" stroke="#FFF7C7" strokeWidth="3.1" {...commonStroke} />
        <path d="M21.8 43.8h20.6M20.4 25.3l11.6 6.8 11.6-6.8M32 32.1v12.5" fill="none" stroke="#47F3D2" strokeWidth="1.8" opacity="0.9" {...commonStroke} />
        <circle cx="20.4" cy="25.3" r="3" fill={`url(#${nodeId})`} />
        <circle cx="43.6" cy="25.3" r="3" fill={`url(#${nodeId})`} />
        <circle cx="32" cy="32.1" r="3.4" fill={`url(#${metalId})`} />
        <circle cx="21.8" cy="43.8" r="2.7" fill={`url(#${metalId})`} />
        <circle cx="42.4" cy="43.8" r="2.7" fill={`url(#${metalId})`} />
      </>
    ),
    seekmate: (
      <>
        <circle cx="31" cy="31" r="20.7" fill={`url(#${darkId})`} stroke={`url(#${metalId})`} strokeWidth="2.4" />
        <path d="M45.5 45.5 54 54" fill="none" stroke={`url(#${metalId})`} strokeWidth="4.2" {...commonStroke} />
        <path d="M24.1 40.2 30.2 24 42 18.7l-5.2 12.4-12.7 9.1Z" fill={`url(#${metalId})`} stroke="#FFF7C7" strokeWidth="1.3" {...commonStroke} />
        <path d="M30.2 24 36.8 31.1" fill="none" stroke="#062A37" strokeWidth="1.8" {...commonStroke} />
        <path d="M18.4 35.8c5.1 5.3 12.2 7 21.2 5.1" fill="none" stroke="#47F3D2" strokeWidth="2.1" opacity="0.86" strokeDasharray="1 4" {...commonStroke} />
        <circle cx="18.8" cy="35.7" r="2.5" fill={`url(#${nodeId})`} />
        <circle cx="39.6" cy="40.9" r="2.5" fill={`url(#${nodeId})`} />
      </>
    ),
    homerun: (
      <>
        <path d="M32 8.7 55.3 32 32 55.3 8.7 32 32 8.7Z" fill={`url(#${darkId})`} stroke={`url(#${metalId})`} strokeWidth="2.4" {...commonStroke} />
        <path d="M20.3 35.7 27.4 29l6.7 4.9 10.1-13.3" fill="none" stroke={`url(#${metalId})`} strokeWidth="3.4" {...commonStroke} />
        <path d="M44.2 20.6v13.7M39.6 24.7h9.2" fill="none" stroke="#FFF7C7" strokeWidth="2.3" {...commonStroke} />
        <path d="M18.4 45.6c8.7-1.9 18-1.9 27.2 0" fill="none" stroke="#47F3D2" strokeWidth="2" opacity="0.9" {...commonStroke} />
        <circle cx="32" cy="14.2" r="2.4" fill={`url(#${nodeId})`} />
        <circle cx="49.8" cy="32" r="2.4" fill={`url(#${nodeId})`} />
        <circle cx="32" cy="49.8" r="2.4" fill={`url(#${nodeId})`} />
        <circle cx="14.2" cy="32" r="2.4" fill={`url(#${nodeId})`} />
      </>
    ),
    'ahs-backend': (
      <>
        <path d="M17 16.5h30a4.6 4.6 0 0 1 4.6 4.6v7.2A4.6 4.6 0 0 1 47 33H17a4.6 4.6 0 0 1-4.6-4.6v-7.2A4.6 4.6 0 0 1 17 16.5Z" fill={`url(#${darkId})`} stroke={`url(#${metalId})`} strokeWidth="2.2" {...commonStroke} />
        <path d="M17 35h30a4.6 4.6 0 0 1 4.6 4.6v3.2A4.6 4.6 0 0 1 47 47.4H17a4.6 4.6 0 0 1-4.6-4.6v-3.2A4.6 4.6 0 0 1 17 35Z" fill="#062A37" stroke="#47F3D2" strokeWidth="2" {...commonStroke} />
        <path d="M20.1 24.7h14.2M20.1 41.2h10.6" fill="none" stroke="#FFF7C7" strokeWidth="2.2" {...commonStroke} />
        <circle cx="43.6" cy="24.7" r="3.3" fill={`url(#${metalId})`} />
        <circle cx="43.6" cy="41.2" r="3.3" fill={`url(#${nodeId})`} />
        <path d="M32 10.5v6M32 47.4v6M43.6 28.1l-7.7 7.3" fill="none" stroke={`url(#${metalId})`} strokeWidth="1.9" opacity="0.9" {...commonStroke} />
        <path d="M32 7.2 34 11l4.2.6-3 3 .7 4.2L32 16.7l-3.9 2.1.7-4.2-3-3 4.2-.6L32 7.2Z" fill={`url(#${metalId})`} />
      </>
    ),
    sky: (
      <>
        <circle cx="32" cy="32" r="22" fill={`url(#${darkId})`} stroke={`url(#${metalId})`} strokeWidth="2.3" />
        <path d="M32 13.5 35.6 25l11.9 3.5-11.9 3.9L32 50.5l-3.6-18.1-11.9-3.9L28.4 25 32 13.5Z" fill={`url(#${metalId})`} stroke="#FFF7C7" strokeWidth="1.1" {...commonStroke} />
        <path d="M15.6 38.3c9.8-8.6 22.8-12.4 36-10.5M12.8 29c11.9 8.4 24.6 11 38.4 7.8" fill="none" stroke="#47F3D2" strokeWidth="1.8" opacity="0.86" {...commonStroke} />
        <circle cx="18.6" cy="36" r="2.3" fill={`url(#${nodeId})`} />
        <circle cx="49.4" cy="28.2" r="2.3" fill={`url(#${nodeId})`} />
      </>
    ),
  }

  return (
    <svg className="vl-logo" viewBox="0 0 64 64" role={title ? 'img' : undefined} aria-hidden={title ? undefined : 'true'} focusable="false">
      {title ? <title>{title}</title> : null}
      {gradients}
      <circle cx="32" cy="32" r="29" fill={`url(#${glowId})`} opacity="0.22" />
      {marks[name] ?? marks.williams}
    </svg>
  )
}

function cardMotion(index, rawProgress, stageMode = 'desktop') {
  const distance = index - rawProgress
  const clamped = Math.max(-3.2, Math.min(3.2, distance))
  const abs = Math.abs(distance)
  const phone = stageMode === 'phone'
  const compact = stageMode === 'compact'

  const x = phone ? clamped * 24 : distance * (compact ? 34 : 58)
  const y = phone ? clamped * 66 + Math.sign(clamped) * Math.max(0, abs - 1) * 9 : distance * (compact ? 52 : 88)
  const z = phone ? 184 - abs * 124 : (compact ? 92 : 160) - abs * (compact ? 84 : 150)
  const scale = phone
    ? Math.max(0.58, 1 - abs * 0.088)
    : Math.max(compact ? 0.68 : 0.72, 1 - abs * (compact ? 0.065 : 0.075))
  const opacity = phone
    ? Math.max(0.08, 1 - abs * 0.25)
    : Math.max(0.18, 1 - abs * (compact ? 0.18 : 0.2))
  const blur = phone
    ? Math.min(5.4, abs * 0.78)
    : Math.min(compact ? 4.2 : 6, abs * (compact ? 0.85 : 1.45))
  const rotateX = phone ? 2.4 + clamped * -11 : distance * (compact ? -9.5 : -8)
  const rotateY = phone ? clamped * 24 : distance * (compact ? 16 : 11)
  const rotateZ = phone ? clamped * -3.2 : distance * (compact ? -1.5 : -2)
  const cardDepth = Math.max(0, 1 - Math.min(abs, 1))

  return {
    transform: `translate3d(${x}px, ${y}px, ${z}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
    opacity,
    filter: `blur(${blur}px)`,
    zIndex: 80 - Math.round(abs * 8),
    pointerEvents: abs < 0.65 ? 'auto' : 'none',
    '--vl-card-depth': cardDepth.toFixed(3),
    '--vl-card-shine-opacity': (0.16 + cardDepth * 0.34).toFixed(3),
  }
}

function VentureExpandCard({ link, index, variant = 'feature' }) {
  const isFeature = variant === 'feature'
  const summaryClass = isFeature ? 'vl-feature-summary' : 'vl-row-summary'
  const cardClass = isFeature ? 'vl-feature-card' : 'vl-row-card'
  const delay = `${index * (isFeature ? 70 : 65)}ms`

  return (
    <details
      className={`vl-expand-card ${cardClass} vl-reveal`}
      style={{ '--tint': link.tint, '--delay': delay }}
    >
      <summary className={summaryClass} aria-label={`Expand ${link.title} details`}>
        {isFeature ? (
          <>
            <span className="vl-card-shine" aria-hidden="true"></span>
            <span className="vl-card-meta">{link.eyebrow}</span>
            <span className="vl-feature-main">
              <span className="vl-feature-mark"><VentureLogo name={link.logo} /></span>
              <span>
                <strong>{link.title}</strong>
                <small>{link.description}</small>
              </span>
            </span>
            <span className="vl-feature-bottom">
              <span>{link.status}</span>
              <span className="vl-open-label vl-expand-toggle">
                <span className="vl-expand-closed">Tap for details</span>
                <span className="vl-expand-open">Hide details</span>
                <ExternalArrow />
              </span>
            </span>
          </>
        ) : (
          <>
            <span className="vl-row-mark"><VentureLogo name={link.logo} /></span>
            <span className="vl-row-copy">
              <span>
                <strong>{link.title}</strong>
                <em>{link.status}</em>
              </span>
              <small>{link.description}</small>
            </span>
            <span className="vl-row-arrow vl-expand-toggle" aria-hidden="true"><ExternalArrow /></span>
          </>
        )}
      </summary>

      <div className="vl-expand-body">
        <p>{link.expanded}</p>
        <div className="vl-help-list" aria-label={`How ${link.title} helps people`}>
          <strong>How it helps</strong>
          <ul>
            {link.helps.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
        <a className="vl-inline-cta" href={link.href} target="_blank" rel="noopener noreferrer">
          {link.label}<ExternalArrow />
        </a>
      </div>
    </details>
  )
}

export default function VentureLinks() {
  const shellRef = useRef(null)
  const storyRef = useRef(null)
  const [copied, setCopied] = useState(false)
  const [stageMode, setStageMode] = useState(getInitialStageMode)
  const [motion, setMotion] = useState({ progress: 0, raw: 0, activeIndex: 0 })
  const [introPhase, setIntroPhase] = useState(() => shouldRunMobileIntro() ? 'active' : 'done')
  const pageUrl = 'https://app.autoaihub.io/links'

  useEffect(() => {
    if (!shouldRunMobileIntro()) {
      setIntroPhase('done')
      return undefined
    }

    const exitTimer = window.setTimeout(() => setIntroPhase('exiting'), INTRO_EXIT_MS)
    const doneTimer = window.setTimeout(() => setIntroPhase('done'), INTRO_DONE_MS)

    return () => {
      window.clearTimeout(exitTimer)
      window.clearTimeout(doneTimer)
    }
  }, [])

  useEffect(() => {
    const originalTitle = document.title
    document.title = 'Williams Group — Venture Portfolio'

    const description = 'A premium public portfolio for Williams Group ventures: AutoAI Hub, Aurii, King Klaw, ClawHub, and selected build proof.'
    let meta = document.querySelector('meta[name="description"]')
    const hadDescriptionMeta = Boolean(meta)
    const originalDescription = meta?.getAttribute('content') ?? ''
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', description)

    const themeColor = '#020806'
    let themeMeta = document.querySelector('meta[name="theme-color"]')
    const hadThemeMeta = Boolean(themeMeta)
    const originalThemeColor = themeMeta?.getAttribute('content') ?? ''
    if (!themeMeta) {
      themeMeta = document.createElement('meta')
      themeMeta.setAttribute('name', 'theme-color')
      document.head.appendChild(themeMeta)
    }
    themeMeta.setAttribute('content', themeColor)

    return () => {
      document.title = originalTitle
      if (hadDescriptionMeta) {
        meta.setAttribute('content', originalDescription)
      } else {
        meta.remove()
      }
      if (hadThemeMeta) {
        themeMeta.setAttribute('content', originalThemeColor)
      } else {
        themeMeta.remove()
      }
    }
  }, [])

  useEffect(() => {
    const tabletQuery = window.matchMedia(TABLET_LINKS_QUERY)
    const phoneQuery = window.matchMedia(PHONE_LINKS_QUERY)
    const laptopQuery = window.matchMedia(LAPTOP_LINKS_QUERY)
    const updateStageMode = () => {
      setStageMode(phoneQuery.matches ? 'phone' : tabletQuery.matches ? 'compact' : laptopQuery.matches ? 'laptop' : 'desktop')
    }

    updateStageMode()
    const addListener = (query) => {
      if (query.addEventListener) {
        query.addEventListener('change', updateStageMode)
        return () => query.removeEventListener('change', updateStageMode)
      }
      query.addListener(updateStageMode)
      return () => query.removeListener(updateStageMode)
    }

    const removeTablet = addListener(tabletQuery)
    const removePhone = addListener(phoneQuery)
    const removeLaptop = addListener(laptopQuery)
    return () => {
      removeTablet()
      removePhone()
      removeLaptop()
    }
  }, [])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const directLinksLayout = window.matchMedia(LAPTOP_LINKS_QUERY).matches
    const shell = shellRef.current

    if (shell && (reduceMotion || directLinksLayout)) {
      shell.style.setProperty('--vl-scroll', '0')
      shell.style.setProperty('--vl-raw', '0')
      shell.setAttribute('data-scene', INITIATIVES[0].key)
    }

    if (reduceMotion || directLinksLayout) return undefined

    let frame = 0
    let lastActive = -1
    let lastRaw = -1

    const update = () => {
      const story = storyRef.current
      const shell = shellRef.current
      if (!story || !shell) return

      const rect = story.getBoundingClientRect()
      const range = Math.max(1, rect.height - window.innerHeight)
      const progress = Math.min(1, Math.max(0, -rect.top / range))
      const raw = progress * (INITIATIVES.length - 1)
      const activeIndex = Math.min(INITIATIVES.length - 1, Math.max(0, Math.round(raw)))

      shell.style.setProperty('--vl-scroll', progress.toFixed(4))
      shell.style.setProperty('--vl-raw', raw.toFixed(4))
      shell.setAttribute('data-scene', INITIATIVES[activeIndex].key)

      if (activeIndex !== lastActive || Math.abs(raw - lastRaw) > 0.035) {
        lastActive = activeIndex
        lastRaw = raw
        setMotion({ progress, raw, activeIndex })
      }
    }

    const requestUpdate = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [])

  useEffect(() => {
    const shell = shellRef.current
    if (!shell) return undefined

    const directLinksLayout = window.matchMedia(LAPTOP_LINKS_QUERY).matches
    if (directLinksLayout) {
      shell.style.setProperty('--vl-page-scroll', '0')
      return undefined
    }

    let frame = 0
    const update = () => {
      const scrollMax = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const pageScroll = Math.min(1, Math.max(0, window.scrollY / scrollMax))
      shell.style.setProperty('--vl-page-scroll', pageScroll.toFixed(4))
    }

    const requestUpdate = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      document.querySelectorAll('.vl-reveal').forEach((node) => node.classList.add('is-in-view'))
      return undefined
    }

    const nodes = Array.from(document.querySelectorAll('.vl-reveal'))
    if (!nodes.length) return undefined

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in-view')
        }
      })
    }, { threshold: 0.14, rootMargin: '0px 0px -10% 0px' })

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  const currentYear = useMemo(() => new Date().getFullYear(), [])
  const activeInitiative = INITIATIVES[motion.activeIndex] ?? INITIATIVES[0]

  const scrollToSection = (id) => {
    const section = document.getElementById(id)
    if (!section) return
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleShare = async () => {
    const shareData = {
      title: 'Williams Group — Venture Portfolio',
      text: 'A focused portfolio of Williams Group ventures across AI systems, aesthetic intelligence, agent infrastructure, and market research.',
      url: pageUrl,
    }

    const copyLink = async () => {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(pageUrl)
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1800)
      }
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await copyLink()
      }
    } catch {
      try {
        await copyLink()
      } catch {
        setCopied(false)
      }
    }
  }

  return (
    <main
      ref={shellRef}
      className="venture-links-shell"
      data-scene="autoaihub"
      data-stage={stageMode}
      data-links-layout={stageMode === 'desktop' ? 'cinematic' : 'direct'}
      data-intro={introPhase === 'done' ? undefined : introPhase}
      aria-label="Williams Group venture portfolio"
    >
      <div className="vl-ambient" aria-hidden="true">
        <div className="vl-glow vl-glow-one"></div>
        <div className="vl-glow vl-glow-two"></div>
        <div className="vl-grain"></div>
      </div>

      {introPhase !== 'done' ? (
        <div className={`vl-premium-loader${introPhase === 'exiting' ? ' is-exiting' : ''}`} aria-hidden="true">
          <div className="vl-loader-aura">
            <span></span>
            <span></span>
          </div>
          <div className="vl-loader-card vl-loader-logo-only">
            <span className="vl-loader-mark"><VentureLogo name="williams" /></span>
          </div>
        </div>
      ) : null}

      <section ref={storyRef} className="vl-scroll-story" aria-label="Cinematic venture portfolio">
        <div className="vl-cinema-stage">
          <div className="vl-stage-background" aria-hidden="true">
            <div className="vl-portal-ring vl-ring-one"></div>
            <div className="vl-portal-ring vl-ring-two"></div>
            <div className="vl-stage-grid"></div>
          </div>

          <div className="vl-stage-content">
            <header className="vl-hero">
              <div className="vl-topline">
                <span className="vl-live-dot"><span></span>Public venture portfolio</span>
                <button type="button" className="vl-share" onClick={handleShare}>
                  {copied ? 'Copied' : 'Share'}
                </button>
              </div>

              <div className="vl-identity-card">
                <div className="vl-monogram" aria-hidden="true">
                  <VentureLogo name="williams" />
                </div>
                <div>
                  <p className="vl-kicker">venture portfolio</p>
                  <h1>Williams Group</h1>
                  <p className="vl-subhead">
                    Founder-led venture studio building practical AI systems and product homes for Australian operators — from automation and agents to aesthetic intelligence and market-research tooling.
                  </p>
                </div>
              </div>

              <div className="vl-hero-actions" aria-label="Page shortcuts">
                <button type="button" onClick={() => scrollToSection('portfolio-ventures')}>Explore ventures</button>
                <button type="button" onClick={() => scrollToSection('founder')}>Meet the founder</button>
              </div>

              <div className="vl-command-strip" aria-label="Focus areas">
                <span>Venture studio</span>
                <span>Operator systems</span>
                <span>Agent infrastructure</span>
                <span>Public proof</span>
              </div>
            </header>

            <section className="vl-scene-panel">
              <div className="vl-scene-logo" style={{ '--tint': activeInitiative.tint }}>
                <VentureLogo name={activeInitiative.logo} title={`${activeInitiative.title} logo`} />
              </div>
              <div className="vl-scene-copy">
                <p>{activeInitiative.eyebrow}</p>
                <h2>{activeInitiative.title}</h2>
                <span>{activeInitiative.scene}</span>
                <a href={activeInitiative.href} target="_blank" rel="noopener noreferrer">
                  {activeInitiative.label}<ExternalArrow />
                </a>
              </div>
            </section>

            <div className="vl-initiative-orbit" aria-label="Scrollable initiative cards">
              {INITIATIVES.map((item, index) => (
                <a
                  className={`vl-orbit-card${index === motion.activeIndex ? ' is-active' : ''}`}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={item.key}
                  style={{ '--tint': item.tint, ...cardMotion(index, motion.raw, stageMode) }}
                  tabIndex={index === motion.activeIndex ? 0 : -1}
                  aria-label={`${item.title}: ${item.description}`}
                >
                  <span className="vl-card-shine" aria-hidden="true"></span>
                  <span className="vl-orbit-logo"><VentureLogo name={item.logo} /></span>
                  <span className="vl-orbit-copy">
                    <em>{item.status}</em>
                    <strong>{item.title}</strong>
                    <small>{item.description}</small>
                  </span>
                </a>
              ))}
            </div>

            <div className="vl-chapter-rail" aria-hidden="true">
              {INITIATIVES.map((item, index) => (
                <span
                  className={index === motion.activeIndex ? 'is-active' : ''}
                  key={item.key}
                ></span>
              ))}
            </div>

            <div className="vl-scroll-meter" aria-hidden="true">
              <span style={{ transform: `scaleX(${Math.max(0.04, motion.progress)})` }}></span>
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio-ventures" className="vl-phone-frame vl-directory" data-link-directory aria-label="Williams Group portfolio links">
        <div className="vl-section-heading vl-reveal">
          <p>Portfolio ventures</p>
          <span>tap a card to expand</span>
        </div>

        <div className="vl-featured-grid">
          {INITIATIVES.slice(0, 4).map((link, index) => (
            <VentureExpandCard link={link} index={index} key={link.key} />
          ))}
        </div>

        <section className="vl-landing-brief vl-reveal" aria-label="How Williams Group helps">
          <div className="vl-landing-copy">
            <p>What this is</p>
            <h2>A public front door for founder-led AI products.</h2>
            <span>
              Williams Group brings the ventures together in one place: what each product does, who it helps, and where to follow the proof as it ships.
            </span>
          </div>
          <div className="vl-landing-points">
            {LANDING_POINTS.map((point) => (
              <article className="vl-landing-point" key={point.title}>
                <strong>{point.title}</strong>
                <span>{point.text}</span>
              </article>
            ))}
          </div>
        </section>

        <section id="founder" className="vl-founder-section vl-reveal" aria-label="About the founder">
          <div className="vl-section-heading">
            <p>Founder</p>
            <span>builder and operator</span>
          </div>
          <article className="vl-founder-card">
            <div className="vl-founder-photo-wrap">
              <img className="vl-founder-photo" src={FOUNDER.image} alt="Ash Williams, founder of Williams Group" loading="lazy" />
              <span>Founder-led systems</span>
            </div>
            <div className="vl-founder-copy">
              <p className="vl-kicker">{FOUNDER.role}</p>
              <h2>{FOUNDER.name}</h2>
              <p>{FOUNDER.bio}</p>
              <ul>
                {FOUNDER.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <a className="vl-inline-cta" href="https://github.com/ashwilliams7-code?tab=repositories" target="_blank" rel="noopener noreferrer">
                View public build proof<ExternalArrow />
              </a>
            </div>
          </article>
        </section>

        <section className="vl-stack" aria-label="Public build proof">
          <div className="vl-section-heading vl-reveal">
            <p>Public build proof</p>
            <span>tap a card to expand</span>
          </div>

          {INITIATIVES.slice(4).map((link, index) => (
            <VentureExpandCard link={link} index={index} variant="row" key={link.key} />
          ))}
        </section>

        <aside className="vl-sky-panel vl-reveal" aria-label="Sky context">
          <span className="vl-sky-orb"><VentureLogo name="sky" /></span>
          <div>
            <strong>Sky is an omnipresent, military-grade hyperintelligence.</strong>
            <p>The AGI-style operating layer running Williams Group: coordinating ventures, automation, agents, decisions, and execution from one always-on command system.</p>
          </div>
        </aside>

        {INSTAGRAM_LINKS.length > 0 ? (
          <nav className="vl-socials vl-instagram" aria-label="Instagram pages">
            {INSTAGRAM_LINKS.map((link) => (
              <a href={link.href} target="_blank" rel="noopener noreferrer" key={link.label}>{link.label}</a>
            ))}
          </nav>
        ) : null}

        <nav className="vl-socials" aria-label="Public channels">
          {PUBLIC_CHANNELS.map((link) => (
            <a href={link.href} target="_blank" rel="noopener noreferrer" key={link.label}>{link.label}</a>
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
