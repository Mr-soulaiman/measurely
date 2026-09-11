import { Link } from '../context/NavigationContext';

export function TermsPage() {
  return (
    <main className="flex-1 max-w-3xl w-full mx-auto px-5 py-8 sm:py-12 space-y-8">
      {/* 1. Header */}
      <section aria-labelledby="terms-heading" className="space-y-2">
        <h1
          id="terms-heading"
          className="text-3xl sm:text-4xl font-display font-extrabold text-[#1A1918] tracking-tight"
        >
          Terms of Use
        </h1>
        <p className="text-sm text-[#787168] font-sans">
          Last updated: September 2026
        </p>
      </section>

      {/* 2. Content Container */}
      <article className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] shadow-[0_4px_20px_-2px_rgba(180,150,125,0.12)] space-y-7 text-[#4E4942] font-sans text-sm sm:text-base leading-relaxed">
        <section className="space-y-2">
          <p>
            Welcome to Measivo. By accessing or using our website and material calculators, you agree to comply with and be bound by these Terms of Use. If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-[#1A1918] font-display">
            1. Calculators Are for Estimation and Planning Purposes
          </h2>
          <p>
            Measivo provides free online calculation tools designed to help homeowners, builders, and DIY enthusiasts estimate quantities of paint, flooring, concrete, gravel, drywall, tiles, mulch, and other common materials.
          </p>
          <p>
            All figures, material counts, pack estimations, and waste allowances produced by our calculators are estimates intended solely for preliminary planning and budgeting.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-[#1A1918] font-display">
            2. Real-World Variances &amp; User Responsibility
          </h2>
          <p>
            Material requirements in actual construction and renovation projects vary based on numerous factors outside our control, including:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-[#4E4942]">
            <li>Surface porosity, roughness, texture, and substrate condition</li>
            <li>Specific manufacturer product dimensions, pack yields, and packaging standards</li>
            <li>Cut patterns, room angles, complex geometry, and site waste</li>
            <li>Soil settling, compaction rates, and ground sub-base preparation</li>
            <li>Application methods (e.g., spray vs. roller painting, joint spacing in masonry)</li>
          </ul>
          <p>
            You are solely responsible for verifying all physical measurements, consulting product packaging or technical specification sheets, and confirming quantities with your material supplier or contractor before purchasing.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-[#1A1918] font-display">
            3. No Professional Advice
          </h2>
          <p>
            The information, estimates, and guides provided on Measivo do not constitute professional engineering, structural, architectural, construction, or financial advice. If your project involves structural modifications, load-bearing considerations, permitting, or specialized technical codes, always consult a licensed engineer, architect, or qualified tradesperson.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-[#1A1918] font-display">
            4. Acceptable Use
          </h2>
          <p>
            You may use Measivo freely for personal and commercial project planning. You agree not to:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-[#4E4942]">
            <li>Use automated bots, scrapers, or scripts to extract data or disrupt website infrastructure</li>
            <li>Attempt to reverse-engineer, compromise, or inject harmful code into our platform</li>
            <li>Use the website in any manner that impairs the experience of other visitors</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-[#1A1918] font-display">
            5. Intellectual Property
          </h2>
          <p>
            All content on Measivo—including calculator interfaces, formulas, text, graphics, guides, icons, and branding—is the intellectual property of Measivo and protected by applicable copyright and intellectual property laws. You may download and print calculation summary PDFs for your personal project planning.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-[#1A1918] font-display">
            6. External Links
          </h2>
          <p>
            Measivo may contain links to third-party resources, articles, or manufacturer guidelines. We have no control over the content or practices of third-party websites and assume no responsibility for them.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-[#1A1918] font-display">
            7. Disclaimer of Warranties &amp; Limitation of Liability
          </h2>
          <p>
            Measivo is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind, whether express or implied. We do not warrant that our calculators will be uninterrupted, error-free, or completely accurate for every specific product brand.
          </p>
          <p>
            To the fullest extent permitted by law, Measivo and its operators shall not be liable for any direct, indirect, incidental, consequential, or financial damages resulting from your use of the website, including but not limited to material shortages, over-purchases, project delays, or installation errors.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-[#1A1918] font-display">
            8. Changes to These Terms
          </h2>
          <p>
            We reserve the right to revise or update these Terms of Use at any time. Your continued use of the website following any changes signifies your acceptance of the revised terms.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-[#1A1918] font-display">
            9. Contact Information
          </h2>
          <p>
            If you have any questions or feedback regarding these Terms of Use, please reach out through our{' '}
            <Link href="/contact" className="text-[#163A5F] underline font-medium hover:text-[#112F4D]">
              Contact page
            </Link>{' '}
            or email{' '}
            <a href="mailto:hello@measivo.com" className="text-[#163A5F] underline font-medium hover:text-[#112F4D]">
              hello@measivo.com
            </a>.
          </p>
        </section>
      </article>
    </main>
  );
}
