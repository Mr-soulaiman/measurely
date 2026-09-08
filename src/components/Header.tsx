import { Compass, Ruler } from 'lucide-react';

interface HeaderProps {
  onScrollToCalculator: () => void;
  onScrollToGuide: () => void;
  onScrollToFaq: () => void;
  onScrollToTools: () => void;
}

export function Header({
  onScrollToCalculator,
  onScrollToGuide,
  onScrollToFaq,
  onScrollToTools,
}: HeaderProps) {
  return (
    <header className="w-full border-b border-[#E5E3DD] bg-[#F8F7F4]/90 backdrop-blur-xs sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand & Studio ID */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-9 h-9 bg-[#1A1918] text-[#F8F7F4] flex items-center justify-center rounded-lg shadow-xs">
              <Compass className="w-5 h-5 text-[#C2410C]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-lg sm:text-xl tracking-tight text-[#1A1918]">
                  Digital Workshop
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-[#EAE8E1] text-[#73716B] rounded">
                  v1.0
                </span>
              </div>
              <p className="text-[11px] font-mono text-[#73716B] tracking-wide -mt-0.5">
                ARCHITECTURAL MATERIAL CALCULATORS
              </p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono uppercase tracking-wider text-[#54524D]">
            <button
              onClick={onScrollToCalculator}
              className="hover:text-[#C2410C] transition-colors py-1 cursor-pointer"
            >
              [ 01 Paint Tool ]
            </button>
            <button
              onClick={onScrollToGuide}
              className="hover:text-[#C2410C] transition-colors py-1 cursor-pointer"
            >
              Formula & Guide
            </button>
            <button
              onClick={onScrollToTools}
              className="hover:text-[#C2410C] transition-colors py-1 cursor-pointer"
            >
              Workshop Catalog
            </button>
            <button
              onClick={onScrollToFaq}
              className="hover:text-[#C2410C] transition-colors py-1 cursor-pointer"
            >
              FAQ
            </button>
          </nav>

          {/* Metric Status Pill */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF9F5] border border-[#E5E3DD] rounded-full text-xs font-mono text-[#54524D]">
              <Ruler className="w-3.5 h-3.5 text-[#C2410C]" />
              <span className="hidden sm:inline text-[#73716B]">SYSTEM:</span>
              <span className="font-medium text-[#1A1918]">METRIC (M / L)</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
