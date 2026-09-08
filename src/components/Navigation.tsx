import { useState } from 'react';
import { useNavigation, Link } from '../context/NavigationContext';
import { Menu, X, ChevronRight } from 'lucide-react';

export function Navigation() {
  const { currentPath, navigate } = useNavigation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Tools', href: '/tools' },
    { label: 'Guides', href: '/guides' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/tools') {
      return currentPath === '/tools' || currentPath.startsWith('/tools/');
    }
    return currentPath === href;
  };

  return (
    <header className="w-full bg-[#F8F3EC]/95 backdrop-blur-md border-b border-[#E8DFD3] sticky top-0 z-40">
      {/* Top Architectural Accent Line */}
      <div className="h-1 bg-[#163A5F] w-full" />

      <div className="max-w-4xl mx-auto px-5 py-3.5 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group cursor-pointer focus-visible:outline-2 focus-visible:outline-[#163A5F] rounded-md"
          aria-label="Measurely — Home"
        >
          <div
            className="w-8 h-8 rounded-lg bg-[#FFFFFF] border border-[#E2D8CC] shadow-[0_2px_6px_rgba(180,150,125,0.15)] flex items-center justify-center transition-transform group-hover:scale-105"
            aria-hidden="true"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#163A5F]"
            >
              <path d="M2.5 13.5H15.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              <path d="M4 13.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M7 13.5V11" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
              <path d="M10 13.5V8.5" stroke="#D95D39" strokeWidth="1.75" strokeLinecap="round" />
              <path d="M13 13.5V11" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
              <path d="M15.5 13.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="10" cy="5" r="1.5" fill="#D95D39" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl font-extrabold text-[#1A1918] group-hover:text-[#163A5F] transition-colors leading-none tracking-tight">
              Measurely
            </span>
            <span className="text-[10px] sm:text-[11px] text-[#787168] font-sans font-medium tracking-wide mt-1 leading-none">
              Measure · Calculate · Build
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden sm:flex items-center gap-1.5" aria-label="Main navigation">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`min-h-[38px] px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-sans tracking-wide transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
                  active
                    ? 'bg-[#163A5F] text-white font-semibold shadow-sm'
                    : 'text-[#5A544C] hover:text-[#1A1918] hover:bg-[#EDE5DA] font-medium'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                {active && <span className="w-1.5 h-1.5 rounded-full bg-[#D95D39]" aria-hidden="true" />}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="sm:hidden flex items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-h-[44px] min-w-[44px] p-2 rounded-lg bg-[#FFFFFF] border border-[#E2D8CC] text-[#1A1918] shadow-[0_1px_3px_rgba(180,150,125,0.15)] flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Menu */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation"
          className="sm:hidden border-t border-[#E8DFD3] bg-[#F8F3EC] px-5 py-4 space-y-2 shadow-[0_8px_20px_rgba(180,150,125,0.15)]"
          aria-label="Mobile navigation"
        >
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <button
                key={item.href}
                type="button"
                onClick={() => {
                  navigate(item.href);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left min-h-[44px] px-4 py-3 rounded-xl text-sm font-sans tracking-wide transition-all duration-150 flex items-center justify-between cursor-pointer ${
                  active
                    ? 'bg-[#163A5F] text-white font-semibold shadow-sm'
                    : 'text-[#2C2A27] hover:bg-[#EDE5DA] border border-transparent font-medium'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                <div className="flex items-center gap-2.5">
                  {active && <span className="w-2 h-2 rounded-full bg-[#D95D39]" aria-hidden="true" />}
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
}
