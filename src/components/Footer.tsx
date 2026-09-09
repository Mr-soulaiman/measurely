import { Link } from '../context/NavigationContext';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#EFE8DE] border-t border-[#E2D8CC] py-8 px-5 transition-colors" role="contentinfo">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand & Slogan */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-1.5">
          <Link
            href="/"
            className="flex items-center group cursor-pointer focus-visible:outline-2 focus-visible:outline-[#163A5F] rounded-md transition-opacity hover:opacity-90"
            aria-label="Measurely — Home"
          >
            <img
              src="/assets/measurely-logo.png"
              alt="Measurely"
              className="h-6 sm:h-7 w-auto object-contain block"
              width="1098"
              height="251"
              loading="lazy"
              decoding="async"
            />
          </Link>
          <p className="text-xs text-[#6B635A] font-sans">
            Measure. Calculate. Build.
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center text-xs font-sans tracking-wide" aria-label="Footer navigation">
          <Link
            href="/tools"
            className="text-[#5C554E] hover:text-[#163A5F] transition-colors py-1 cursor-pointer font-medium"
          >
            Tools
          </Link>
          <span className="text-[#C8BEB2] select-none" aria-hidden="true">·</span>
          <Link
            href="/guides"
            className="text-[#5C554E] hover:text-[#163A5F] transition-colors py-1 cursor-pointer font-medium"
          >
            Guides
          </Link>
          <span className="text-[#C8BEB2] select-none" aria-hidden="true">·</span>
          <Link
            href="/about"
            className="text-[#5C554E] hover:text-[#163A5F] transition-colors py-1 cursor-pointer font-medium"
          >
            About
          </Link>
          <span className="text-[#C8BEB2] select-none" aria-hidden="true">·</span>
          <Link
            href="/contact"
            className="text-[#5C554E] hover:text-[#163A5F] transition-colors py-1 cursor-pointer font-medium"
          >
            Contact
          </Link>
        </nav>
      </div>

      {/* Copyright Notice */}
      <div className="max-w-4xl mx-auto mt-6 pt-5 border-t border-[#E0D5C8] flex flex-col sm:flex-row items-center justify-between gap-2 text-center text-xs font-sans text-[#787168]">
        <span>© {currentYear} Measurely</span>
        <span>Simple material calculators</span>
      </div>
    </footer>
  );
}
