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
    if (href === '/guides') {
      return currentPath === '/guides' || currentPath.startsWith('/guides/');
    }
    return currentPath === href;
  };

  return (
    <header className="w-full bg-[#F1F6FA]/95 backdrop-blur-md border-b border-[#E8DFD3] sticky top-0 z-40">
      {/* Top Architectural Accent Line */}
      <div className="h-1 bg-[#163A5F] w-full" />

      <div className="max-w-4xl mx-auto px-5 py-3.5 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="flex items-center group cursor-pointer focus-visible:outline-2 focus-visible:outline-[#163A5F] rounded-md transition-opacity hover:opacity-90 py-0.5"
          aria-label="Buildoser — Home"
        >
          <img
            src="/assets/buildoser-logo.png"
            alt="Buildoser"
            className="h-8 sm:h-9 w-auto object-contain block transition-transform group-hover:scale-[1.02]"
            width="1326"
            height="386"
            loading="eager"
            decoding="async"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden sm:flex items-center gap-1.5 p-1 rounded-xl bg-[#E5EFF8] border border-[#CFE0EF] shadow-[0_2px_8px_rgba(22,58,95,0.06)] ring-1 ring-[#163A5F]/5"
          aria-label="Main navigation"
        >
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`min-h-[36px] px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-sans tracking-wide transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
                  active
                    ? 'bg-[#163A5F] text-white font-semibold shadow-sm'
                    : 'text-[#335070] hover:text-[#163A5F] hover:bg-[#D7E6F3] font-medium'
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
            className="min-h-[44px] min-w-[44px] p-2 rounded-xl bg-[#E5EFF8] border border-[#CFE0EF] text-[#163A5F] shadow-[0_1px_4px_rgba(22,58,95,0.08)] flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
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
          className="sm:hidden border-t border-[#E8DFD3] bg-[#F1F6FA] px-5 py-3 shadow-[0_8px_20px_rgba(22,58,95,0.12)]"
          aria-label="Mobile navigation"
        >
          <div className="p-1.5 rounded-2xl bg-[#E5EFF8] border border-[#CFE0EF] shadow-[0_2px_8px_rgba(22,58,95,0.06)] space-y-1">
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
                  className={`w-full text-left min-h-[44px] px-4 py-2.5 rounded-xl text-sm font-sans tracking-wide transition-all duration-150 flex items-center justify-between cursor-pointer ${
                    active
                      ? 'bg-[#163A5F] text-white font-semibold shadow-sm'
                      : 'text-[#335070] hover:text-[#163A5F] hover:bg-[#D7E6F3] border border-transparent font-medium'
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
          </div>
        </nav>
      )}
    </header>
  );
}
