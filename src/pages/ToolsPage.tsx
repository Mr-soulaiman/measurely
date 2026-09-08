import { Link } from '../context/NavigationContext';
import { Paintbrush, ArrowRight } from 'lucide-react';

export function ToolsPage() {
  return (
    <main className="flex-1 max-w-2xl w-full mx-auto px-5 py-8 sm:py-12 space-y-10">
      {/* 1. Page Header */}
      <section aria-labelledby="tools-heading" className="space-y-2">
        <h1
          id="tools-heading"
          className="text-3xl sm:text-4xl font-display font-extrabold text-[#1A1918] tracking-tight"
        >
          Tools
        </h1>
        <p className="text-base sm:text-lg text-[#4E4942] leading-relaxed font-sans">
          Simple calculators for your home projects.
        </p>
      </section>

      {/* 2. Available Tools */}
      <section aria-labelledby="available-heading" className="space-y-4">
        {/* Paint Calculator Card */}
        <div className="p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] shadow-[0_4px_20px_-2px_rgba(180,150,125,0.12)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EDF7F2] text-[#0B6E54] flex items-center justify-center">
                  <Paintbrush className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-display font-bold text-[#1A1918]">
                  Paint Calculator
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[#4E4942] font-sans">
                Find out how much paint you need.
              </p>
            </div>

            <div className="pt-2 sm:pt-0 shrink-0">
              <Link
                href="/tools/paint-calculator"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#163A5F] text-white font-sans text-sm font-bold shadow-[0_2px_8px_rgba(22,58,95,0.2)] hover:bg-[#112F4D] transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Open calculator</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Coming Soon */}
      <section aria-labelledby="coming-soon-heading" className="space-y-4 pt-2">
        <h2
          id="coming-soon-heading"
          className="text-base font-display font-bold text-[#1A1918]"
        >
          More tools coming soon
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-[#FFFDF9]/80 border border-[#EAE0D5] select-none">
            <div className="font-display text-sm font-bold text-[#1A1918]">Tile Calculator</div>
            <div className="text-xs text-[#787168] font-sans mt-0.5">Coming soon</div>
          </div>

          <div className="p-4 rounded-xl bg-[#FFFDF9]/80 border border-[#EAE0D5] select-none">
            <div className="font-display text-sm font-bold text-[#1A1918]">Flooring Calculator</div>
            <div className="text-xs text-[#787168] font-sans mt-0.5">Coming soon</div>
          </div>

          <div className="p-4 rounded-xl bg-[#FFFDF9]/80 border border-[#EAE0D5] select-none">
            <div className="font-display text-sm font-bold text-[#1A1918]">Concrete Calculator</div>
            <div className="text-xs text-[#787168] font-sans mt-0.5">Coming soon</div>
          </div>

          <div className="p-4 rounded-xl bg-[#FFFDF9]/80 border border-[#EAE0D5] select-none">
            <div className="font-display text-sm font-bold text-[#1A1918]">Soil Calculator</div>
            <div className="text-xs text-[#787168] font-sans mt-0.5">Coming soon</div>
          </div>
        </div>
      </section>
    </main>
  );
}
