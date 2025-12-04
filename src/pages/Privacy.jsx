import { Link } from 'react-router-dom'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <nav className="px-6 py-6 border-b border-slate-800">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <div>
              <span className="font-bold text-xl block">AutoAI Hub</span>
              <span className="text-[10px] text-slate-400">A Williams Group Company</span>
            </div>
          </Link>
          <Link to="/" className="text-slate-400 hover:text-white transition-colors">
            ← Back to Home
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-slate-400 mb-12">Last updated: December 2024</p>

        <div className="space-y-8 text-slate-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
            <p className="mb-4">
              AutoAI Hub, operated by Williams Group ABN [Your ABN], ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI automation services.
            </p>
            <p>
              We comply with the Australian Privacy Principles (APPs) contained in the Privacy Act 1988 (Cth) and applicable state and territory privacy legislation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
            <p className="mb-4">We may collect the following types of information:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Personal Information:</strong> Name, email address, phone number, business name, ABN</li>
              <li><strong>Account Information:</strong> Login credentials, account preferences, subscription details</li>
              <li><strong>Usage Data:</strong> How you interact with our services, features used, time spent</li>
              <li><strong>Business Data:</strong> NDIS participant information, invoices, rosters, compliance documents (for NDISHub users)</li>
              <li><strong>Job Application Data:</strong> Resume information, job preferences, application history (for ApplyMate users)</li>
              <li><strong>Technical Data:</strong> IP address, browser type, device information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">We use collected information to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide and maintain our AI automation services</li>
              <li>Process your NDIS invoicing, rostering, and compliance management</li>
              <li>Automate job applications on your behalf (with your explicit consent)</li>
              <li>Improve and personalize your experience</li>
              <li>Communicate with you about updates, support, and marketing (with consent)</li>
              <li>Comply with legal obligations, including NDIS Quality and Safeguards Commission requirements</li>
              <li>Detect and prevent fraud or unauthorized access</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Data Storage and Security</h2>
            <p className="mb-4">
              Your data is stored securely on Australian-based servers where possible. We implement industry-standard security measures including:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>256-bit SSL/TLS encryption for data in transit</li>
              <li>AES-256 encryption for data at rest</li>
              <li>Multi-factor authentication options</li>
              <li>Regular security audits and penetration testing</li>
              <li>Access controls and audit logging</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Third-Party Services</h2>
            <p className="mb-4">We may share data with trusted third parties including:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Cloud Infrastructure:</strong> Supabase, Vercel, Render (data processing)</li>
              <li><strong>AI Services:</strong> OpenAI (for AI-powered features - data is not used to train models)</li>
              <li><strong>Job Platforms:</strong> SEEK, Indeed, LinkedIn, Jora (for ApplyMate job applications)</li>
              <li><strong>Payment Processors:</strong> Stripe (for subscription billing)</li>
              <li><strong>Analytics:</strong> Privacy-focused analytics tools</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Your Rights</h2>
            <p className="mb-4">Under Australian privacy law, you have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate or outdated information</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent for marketing communications</li>
              <li>Lodge a complaint with the Office of the Australian Information Commissioner (OAIC)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Data Retention</h2>
            <p>
              We retain your data for as long as your account is active or as needed to provide services. NDIS-related records are retained in accordance with NDIS Commission requirements (minimum 7 years). You may request deletion of your account and associated data at any time, subject to legal retention requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Contact Us</h2>
            <p className="mb-4">
              For privacy-related inquiries or to exercise your rights, contact our Privacy Officer:
            </p>
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <p><strong>Williams Group - AutoAI Hub</strong></p>
              <p>Email: privacy@autoaihub.io</p>
              <p>Address: Australia</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of our services after changes constitutes acceptance of the updated policy.
            </p>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center text-slate-500 text-sm">
          © 2024 AutoAI Hub. A Williams Group Company. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

