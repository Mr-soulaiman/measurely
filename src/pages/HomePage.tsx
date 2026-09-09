import { Link } from '../context/NavigationContext';
import { Paintbrush, Layers, Boxes, Grid, ArrowRight } from 'lucide-react';

export function HomePage() {
  return (
    <main className="flex-1 max-w-2xl w-full mx-auto px-5 py-8 sm:py-12 space-y-10">
      {/* 1. Hero Section */}
      <section aria-labelledby="hero-heading" className="space-y-4">
        <h1
          id="hero-heading"
          className="text-3xl sm:text-4xl lg:text-[42px] font-display font-extrabold text-[#1A1918] tracking-tight leading-tight"
        >
          Calculate what your project needs.
        </h1>
        <p className="text-base sm:text-lg text-[#4E4942] leading-relaxed font-sans">
          Simple tools to help you estimate materials for home projects.
        </p>
        <div className="pt-1">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#DFD5C6] text-[#163A5F] font-sans text-sm font-semibold shadow-xs hover:border-[#163A5F] hover:bg-[#FDFBF7] transition-all cursor-pointer"
          >
            <span>Explore tools</span>
            <ArrowRight className="w-4 h-4 text-[#163A5F]" />
          </Link>
        </div>
      </section>

      {/* 2. Available Tools */}
      <section aria-labelledby="available-tools-heading" className="space-y-4">
        <h2 id="available-tools-heading" className="sr-only">
          Available Calculators
        </h2>

        {/* Flooring Calculator Card */}
        <div className="p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] shadow-[0_4px_20px_-2px_rgba(180,150,125,0.12)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EDF7F2] text-[#0B6E54] flex items-center justify-center">
                  <Grid className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-display font-bold text-[#1A1918]">
                  Flooring Calculator
                </h3>
              </div>
              <p className="text-sm sm:text-base text-[#4E4942] font-sans">
                Find out how much flooring you need.
              </p>
            </div>

            <div className="pt-2 sm:pt-0 shrink-0">
              <Link
                href="/tools/flooring-calculator"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#163A5F] text-white font-sans text-sm font-bold shadow-[0_2px_8px_rgba(22,58,95,0.2)] hover:bg-[#112F4D] transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Calculate flooring</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Paint Calculator Card */}
        <div className="p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] shadow-[0_4px_20px_-2px_rgba(180,150,125,0.12)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EDF7F2] text-[#0B6E54] flex items-center justify-center">
                  <Paintbrush className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-display font-bold text-[#1A1918]">
                  Paint Calculator
                </h3>
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
                <span>Calculate paint</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Gravel Calculator Card */}
        <div className="p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] shadow-[0_4px_20px_-2px_rgba(180,150,125,0.12)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EDF7F2] text-[#0B6E54] flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-display font-bold text-[#1A1918]">
                  Gravel Calculator
                </h3>
              </div>
              <p className="text-sm sm:text-base text-[#4E4942] font-sans">
                Find out how much gravel you need.
              </p>
            </div>

            <div className="pt-2 sm:pt-0 shrink-0">
              <Link
                href="/tools/gravel-calculator"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#163A5F] text-white font-sans text-sm font-bold shadow-[0_2px_8px_rgba(22,58,95,0.2)] hover:bg-[#112F4D] transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Calculate gravel</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Sand Calculator Card */}
        <div className="p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] shadow-[0_4px_20px_-2px_rgba(180,150,125,0.12)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EDF7F2] text-[#0B6E54] flex items-center justify-center">
                  <Boxes className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-display font-bold text-[#1A1918]">
                  Sand Calculator
                </h3>
              </div>
              <p className="text-sm sm:text-base text-[#4E4942] font-sans">
                Find out how much sand you need.
              </p>
            </div>

            <div className="pt-2 sm:pt-0 shrink-0">
              <Link
                href="/tools/sand-calculator"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#163A5F] text-white font-sans text-sm font-bold shadow-[0_2px_8px_rgba(22,58,95,0.2)] hover:bg-[#112F4D] transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Calculate sand</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
