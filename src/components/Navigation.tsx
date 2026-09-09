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
          className="flex items-center group cursor-pointer focus-visible:outline-2 focus-visible:outline-[#163A5F] rounded-md transition-opacity hover:opacity-90 py-0.5"
          aria-label="Measurely — Home"
        >
          <img
            src="/assets/measurely-logo.png"
            alt="Measurely"
            className="h-8 sm:h-9 w-auto object-contain block transition-transform group-hover:scale-[1.02]"
            width="1098"
            height="251"
            loading="eager"
            decoding="async"
          />
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
