import { Link } from 'react-router-dom'

export default function Terms() {
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
        <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-slate-400 mb-12">Last updated: December 2024</p>

        <div className="space-y-8 text-slate-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Agreement to Terms</h2>
            <p className="mb-4">
              By accessing or using AutoAI Hub services operated by Williams Group ("we", "our", or "us"), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
            </p>
            <p>
              These terms apply to all users of our services, including NDISHub, ApplyMate, and any future AI automation products.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Description of Services</h2>
            <p className="mb-4">AutoAI Hub provides AI-powered automation services including:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>NDISHub:</strong> NDIS provider management including invoicing, rostering, compliance tracking, and reporting automation</li>
              <li><strong>ApplyMate:</strong> Automated job application services across Australian job platforms including SEEK, Indeed, LinkedIn, and Jora</li>
              <li><strong>Future Products:</strong> Additional AI automation tools as they become available</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Account Registration</h2>
            <p className="mb-4">To use our services, you must:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Be at least 18 years of age</li>
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Be responsible for all activities under your account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. NDISHub Specific Terms</h2>
            <p className="mb-4">If you use NDISHub for NDIS provider management:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>You must be a registered NDIS provider or authorized representative</li>
              <li>You are responsible for the accuracy of participant and service data entered</li>
              <li>You must comply with all NDIS Quality and Safeguards Commission requirements</li>
              <li>You retain full responsibility for NDIS compliance; our tools assist but do not guarantee compliance</li>
              <li>You must have appropriate consent from participants to store their information</li>
              <li>Invoice generation is based on data you provide; verify all invoices before submission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. ApplyMate Specific Terms</h2>
            <p className="mb-4">If you use ApplyMate for automated job applications:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>You authorize us to submit job applications on your behalf to selected platforms</li>
              <li>You must provide accurate resume and personal information</li>
              <li>You are responsible for the content of AI-generated cover letters (review before submission where possible)</li>
              <li>We do not guarantee job interviews or employment outcomes</li>
              <li>You must comply with each job platform's terms of service</li>
              <li>You may set limits on application volume and target roles</li>
              <li>You acknowledge that some employers may identify automated applications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Subscription and Payments</h2>
            <p className="mb-4">For paid services:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Subscription fees are billed in advance on a monthly or annual basis</li>
              <li>All prices are in Australian Dollars (AUD) unless otherwise stated</li>
              <li>Prices include GST where applicable</li>
              <li>You authorize us to charge your payment method for recurring fees</li>
              <li>Refunds are provided in accordance with Australian Consumer Law</li>
              <li>We may change pricing with 30 days notice</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Acceptable Use</h2>
            <p className="mb-4">You agree NOT to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Use our services for any illegal purpose</li>
              <li>Submit false or misleading information</li>
              <li>Attempt to circumvent security measures</li>
              <li>Resell or redistribute our services without authorization</li>
              <li>Use automated scripts beyond intended service functionality</li>
              <li>Interfere with other users' access to services</li>
              <li>Upload malicious code or content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Intellectual Property</h2>
            <p className="mb-4">
              All content, features, and functionality of AutoAI Hub are owned by Williams Group and protected by Australian and international copyright, trademark, and other intellectual property laws.
            </p>
            <p>
              You retain ownership of data you input into our systems. You grant us a license to use this data solely to provide and improve our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. Limitation of Liability</h2>
            <p className="mb-4">
              To the maximum extent permitted by Australian law:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Our services are provided "as is" without warranties of any kind</li>
              <li>We are not liable for indirect, incidental, or consequential damages</li>
              <li>Our total liability is limited to fees paid in the 12 months preceding the claim</li>
              <li>We do not guarantee uninterrupted or error-free service</li>
              <li>AI-generated content should be reviewed; we are not liable for errors in AI outputs</li>
            </ul>
            <p className="mt-4">
              Nothing in these terms excludes or limits liability that cannot be excluded under Australian Consumer Law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">10. Termination</h2>
            <p className="mb-4">
              We may suspend or terminate your account if you breach these terms. You may cancel your subscription at any time through your account settings. Upon termination:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Your right to use services immediately ceases</li>
              <li>You may export your data within 30 days</li>
              <li>We may retain data as required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">11. Governing Law</h2>
            <p>
              These terms are governed by the laws of Australia. Any disputes will be resolved in the courts of Australia. We both agree to submit to the exclusive jurisdiction of those courts.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">12. Contact Us</h2>
            <p className="mb-4">For questions about these terms:</p>
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <p><strong>Williams Group - AutoAI Hub</strong></p>
              <p>Email: legal@autoaihub.io</p>
              <p>Address: Australia</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">13. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Material changes will be notified via email or in-app notification at least 30 days before taking effect. Continued use after changes constitutes acceptance of the new terms.
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

