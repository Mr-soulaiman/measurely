import { Link } from '../context/NavigationContext';

export function PrivacyPolicyPage() {
  return (
    <main className="flex-1 max-w-3xl w-full mx-auto px-5 py-8 sm:py-12 space-y-8">
      {/* 1. Header */}
      <section aria-labelledby="privacy-heading" className="space-y-2">
        <h1
          id="privacy-heading"
          className="text-3xl sm:text-4xl font-display font-extrabold text-[#1A1918] tracking-tight"
        >
          Privacy Policy
        </h1>
        <p className="text-sm text-[#787168] font-sans">
          Last updated: September 2026
        </p>
      </section>

      {/* 2. Content Container */}
      <article className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] shadow-[0_4px_20px_-2px_rgba(180,150,125,0.12)] space-y-7 text-[#4E4942] font-sans text-sm sm:text-base leading-relaxed">
        <section className="space-y-2">
          <p>
            At Measivo, we value your privacy. This Privacy Policy explains how we handle information when you visit our website and use our material calculators.
          </p>
          <p>
            Measivo is a free online tool suite designed to help you estimate materials for home improvement and DIY projects without needing to create an account.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-[#1A1918] font-display">
            1. No Account Required
          </h2>
          <p>
            You do not need to register, sign in, or provide any personal details (such as your name, email address, or phone number) to use our calculators, guides, or downloadable PDF tools.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-[#1A1918] font-display">
            2. Calculator Inputs &amp; Measurements
          </h2>
          <p>
            When you enter project measurements—such as room length, width, paint coat preferences, or waste percentages—these values are processed in your browser to compute estimates instantly. Measivo does not store your project dimensions on our servers or associate them with your identity.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-[#1A1918] font-display">
            3. Information We May Collect Automatically
          </h2>
          <p>
            Like most websites, when you visit Measivo, our web servers and analytics tools may automatically record standard technical log data, such as:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-[#4E4942]">
            <li>Browser type, version, and operating system</li>
            <li>Referring website and pages viewed on Measivo</li>
            <li>Date, time, and general geographic location (e.g., country or region)</li>
            <li>Standard device screen dimensions to ensure proper responsive formatting</li>
          </ul>
          <p>
            This information is aggregated and used solely to understand site performance, fix errors, and improve our calculators.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-[#1A1918] font-display">
            4. Cookies &amp; Similar Technologies
          </h2>
          <p>
            Measivo may use cookies and local storage to remember your preferred unit settings (such as metric vs. imperial measurements) between calculator visits.
          </p>
          <p>
            You can configure your browser to decline cookies or alert you when cookies are being sent. Note that core calculator functionality remains accessible even if cookies are disabled.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-[#1A1918] font-display">
            5. Analytics &amp; Advertising
          </h2>
          <p>
            We may use privacy-respecting analytics services to measure traffic trends and identify popular calculators.
          </p>
          <p>
            To keep Measivo free, we may also display advertisements served by third-party ad networks, including Google AdSense. These advertising partners may use cookies and web beacons to serve ads based on prior visits to this or other websites. You can learn more about how Google uses data and manage your personalization settings at{' '}
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#163A5F] underline hover:text-[#112F4D]"
            >
              Google Ads Settings
            </a>.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-[#1A1918] font-display">
            6. How We Use Information
          </h2>
          <p>
            Any information collected is used strictly to:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-[#4E4942]">
            <li>Deliver and maintain fast, accurate material calculators</li>
            <li>Improve interface usability, calculation tools, and instructional guides</li>
            <li>Diagnose technical bugs and protect the security of our platform</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-[#1A1918] font-display">
            7. Information Sharing
          </h2>
          <p>
            Measivo does not sell, rent, or trade your personal information. We may only share aggregated, non-identifiable technical data with service providers (such as hosting providers and analytics partners) that assist us in operating our website, or when required by applicable law.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-[#1A1918] font-display">
            8. Data Retention &amp; Security
          </h2>
          <p>
            Because we do not maintain user accounts or store personal measurement records, we do not keep user-identifiable project archives. We implement standard security practices to safeguard all website infrastructure.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-[#1A1918] font-display">
            9. Your Choices &amp; Rights
          </h2>
          <p>
            You have full control over your browsing experience. You can clear your browser storage, disable cookies in your browser settings, and adjust ad tracking preferences at any time.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-[#1A1918] font-display">
            10. Children&apos;s Privacy
          </h2>
          <p>
            Measivo is a general audience website intended for homeowners, tradespeople, and DIY builders. We do not knowingly collect personal information from children under the age of 13.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-[#1A1918] font-display">
            11. Changes to This Privacy Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time to reflect improvements to our tools or changes in legal requirements. Any updates will be posted on this page with an updated &ldquo;Last updated&rdquo; date.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-[#1A1918] font-display">
            12. Contact Us
          </h2>
          <p>
            If you have questions about this Privacy Policy or our practices, please visit our{' '}
            <Link href="/contact" className="text-[#163A5F] underline font-medium hover:text-[#112F4D]">
              Contact page
            </Link>{' '}
            or email us at{' '}
            <a href="mailto:hello@measivo.com" className="text-[#163A5F] underline font-medium hover:text-[#112F4D]">
              hello@measivo.com
            </a>.
          </p>
        </section>
      </article>
    </main>
  );
}
