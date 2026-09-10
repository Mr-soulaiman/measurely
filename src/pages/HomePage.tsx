import { Link } from '../context/NavigationContext';
import { ArrowRight } from 'lucide-react';
import { FlooringToolIcon, PaintToolIcon, GravelToolIcon, SandToolIcon, MulchToolIcon, TopsoilToolIcon, ConcreteToolIcon, TileToolIcon, DrywallToolIcon, PaverToolIcon, SodToolIcon, RoofingToolIcon, FenceToolIcon } from '../components/ToolIcons';

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
                <div className="w-12 h-12 rounded-xl bg-[#EDF7F2] text-[#0B6E54] flex items-center justify-center shrink-0">
                  <FlooringToolIcon className="w-[30px] h-[30px]" />
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
                <div className="w-12 h-12 rounded-xl bg-[#EDF7F2] text-[#0B6E54] flex items-center justify-center shrink-0">
                  <PaintToolIcon className="w-[30px] h-[30px]" />
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
                <div className="w-12 h-12 rounded-xl bg-[#EDF7F2] text-[#0B6E54] flex items-center justify-center shrink-0">
                  <GravelToolIcon className="w-[30px] h-[30px]" />
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
                <div className="w-12 h-12 rounded-xl bg-[#EDF7F2] text-[#0B6E54] flex items-center justify-center shrink-0">
                  <SandToolIcon className="w-[30px] h-[30px]" />
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

        {/* Mulch Calculator Card */}
        <div className="p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] shadow-[0_4px_20px_-2px_rgba(180,150,125,0.12)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#EDF7F2] text-[#0B6E54] flex items-center justify-center shrink-0">
                  <MulchToolIcon className="w-[30px] h-[30px]" />
                </div>
                <h3 className="text-2xl font-display font-bold text-[#1A1918]">
                  Mulch Calculator
                </h3>
              </div>
              <p className="text-sm sm:text-base text-[#4E4942] font-sans">
                Find out how much mulch you need.
              </p>
            </div>

            <div className="pt-2 sm:pt-0 shrink-0">
              <Link
                href="/tools/mulch-calculator"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#163A5F] text-white font-sans text-sm font-bold shadow-[0_2px_8px_rgba(22,58,95,0.2)] hover:bg-[#112F4D] transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Calculate mulch</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Topsoil Calculator Card */}
        <div className="p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] shadow-[0_4px_20px_-2px_rgba(180,150,125,0.12)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#EDF7F2] text-[#0B6E54] flex items-center justify-center shrink-0">
                  <TopsoilToolIcon className="w-[30px] h-[30px]" />
                </div>
                <h3 className="text-2xl font-display font-bold text-[#1A1918]">
                  Topsoil Calculator
                </h3>
              </div>
              <p className="text-sm sm:text-base text-[#4E4942] font-sans">
                Find out how much topsoil you need.
              </p>
            </div>

            <div className="pt-2 sm:pt-0 shrink-0">
              <Link
                href="/tools/topsoil-calculator"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#163A5F] text-white font-sans text-sm font-bold shadow-[0_2px_8px_rgba(22,58,95,0.2)] hover:bg-[#112F4D] transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Calculate topsoil</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Concrete Calculator Card */}
        <div className="p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] shadow-[0_4px_20px_-2px_rgba(180,150,125,0.12)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#EDF7F2] text-[#0B6E54] flex items-center justify-center shrink-0">
                  <ConcreteToolIcon className="w-[30px] h-[30px]" />
                </div>
                <h3 className="text-2xl font-display font-bold text-[#1A1918]">
                  Concrete Calculator
                </h3>
              </div>
              <p className="text-sm sm:text-base text-[#4E4942] font-sans">
                Find out how much concrete you need.
              </p>
            </div>

            <div className="pt-2 sm:pt-0 shrink-0">
              <Link
                href="/tools/concrete-calculator"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#163A5F] text-white font-sans text-sm font-bold shadow-[0_2px_8px_rgba(22,58,95,0.2)] hover:bg-[#112F4D] transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Calculate concrete</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Tile Calculator Card */}
        <div className="p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] shadow-[0_4px_20px_-2px_rgba(180,150,125,0.12)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#EDF7F2] text-[#0B6E54] flex items-center justify-center shrink-0">
                  <TileToolIcon className="w-[30px] h-[30px]" />
                </div>
                <h3 className="text-2xl font-display font-bold text-[#1A1918]">
                  Tile Calculator
                </h3>
              </div>
              <p className="text-sm sm:text-base text-[#4E4942] font-sans">
                Find out how many tiles you need.
              </p>
            </div>

            <div className="pt-2 sm:pt-0 shrink-0">
              <Link
                href="/tools/tile-calculator"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#163A5F] text-white font-sans text-sm font-bold shadow-[0_2px_8px_rgba(22,58,95,0.2)] hover:bg-[#112F4D] transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Calculate tiles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Drywall Calculator Card */}
        <div className="p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] shadow-[0_4px_20px_-2px_rgba(180,150,125,0.12)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#EDF7F2] text-[#0B6E54] flex items-center justify-center shrink-0">
                  <DrywallToolIcon className="w-[30px] h-[30px]" />
                </div>
                <h3 className="text-2xl font-display font-bold text-[#1A1918]">
                  Drywall Calculator
                </h3>
              </div>
              <p className="text-sm sm:text-base text-[#4E4942] font-sans">
                Find out how many drywall sheets you need.
              </p>
            </div>

            <div className="pt-2 sm:pt-0 shrink-0">
              <Link
                href="/tools/drywall-calculator"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#163A5F] text-white font-sans text-sm font-bold shadow-[0_2px_8px_rgba(22,58,95,0.2)] hover:bg-[#112F4D] transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Calculate drywall</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Paver Calculator Card */}
        <div className="p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] shadow-[0_4px_20px_-2px_rgba(180,150,125,0.12)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#EDF7F2] text-[#0B6E54] flex items-center justify-center shrink-0">
                  <PaverToolIcon className="w-[30px] h-[30px]" />
                </div>
                <h3 className="text-2xl font-display font-bold text-[#1A1918]">
                  Paver Calculator
                </h3>
              </div>
              <p className="text-sm sm:text-base text-[#4E4942] font-sans">
                Find out how many pavers you need.
              </p>
            </div>

            <div className="pt-2 sm:pt-0 shrink-0">
              <Link
                href="/tools/paver-calculator"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#163A5F] text-white font-sans text-sm font-bold shadow-[0_2px_8px_rgba(22,58,95,0.2)] hover:bg-[#112F4D] transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Calculate pavers</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Sod Calculator Card */}
        <div className="p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] shadow-[0_4px_20px_-2px_rgba(180,150,125,0.12)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#EDF7F2] text-[#0B6E54] flex items-center justify-center shrink-0">
                  <SodToolIcon className="w-[30px] h-[30px]" />
                </div>
                <h3 className="text-2xl font-display font-bold text-[#1A1918]">
                  Sod Calculator
                </h3>
              </div>
              <p className="text-sm sm:text-base text-[#4E4942] font-sans">
                Find out how much sod you need.
              </p>
            </div>

            <div className="pt-2 sm:pt-0 shrink-0">
              <Link
                href="/tools/sod-calculator"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#163A5F] text-white font-sans text-sm font-bold shadow-[0_2px_8px_rgba(22,58,95,0.2)] hover:bg-[#112F4D] transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Calculate sod</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Roofing Calculator Card */}
        <div className="p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] shadow-[0_4px_20px_-2px_rgba(180,150,125,0.12)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#FFF7ED] text-[#C2410C] flex items-center justify-center shrink-0">
                  <RoofingToolIcon className="w-[30px] h-[30px]" />
                </div>
                <h3 className="text-2xl font-display font-bold text-[#1A1918]">
                  Roofing Calculator
                </h3>
              </div>
              <p className="text-sm sm:text-base text-[#4E4942] font-sans">
                Find out how much roofing material you need.
              </p>
            </div>

            <div className="pt-2 sm:pt-0 shrink-0">
              <Link
                href="/tools/roofing-calculator"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#163A5F] text-white font-sans text-sm font-bold shadow-[0_2px_8px_rgba(22,58,95,0.2)] hover:bg-[#112F4D] transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Calculate roofing</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Fence Calculator Card */}
        <div className="p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] shadow-[0_4px_20px_-2px_rgba(180,150,125,0.12)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#FEF3C7] text-[#B45309] flex items-center justify-center shrink-0">
                  <FenceToolIcon className="w-[30px] h-[30px]" />
                </div>
                <h3 className="text-2xl font-display font-bold text-[#1A1918]">
                  Fence Calculator
                </h3>
              </div>
              <p className="text-sm sm:text-base text-[#4E4942] font-sans">
                Find out how much fencing material you need.
              </p>
            </div>

            <div className="pt-2 sm:pt-0 shrink-0">
              <Link
                href="/tools/fence-calculator"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#163A5F] text-white font-sans text-sm font-bold shadow-[0_2px_8px_rgba(22,58,95,0.2)] hover:bg-[#112F4D] transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Calculate fence</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
