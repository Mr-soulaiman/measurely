import { Link } from '../../context/NavigationContext';
import { ArrowRight, Calculator, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';
import { FlooringToolIcon } from '../../components/ToolIcons';

export function FlooringGuidePage() {
  return (
    <main className="flex-1 max-w-3xl w-full mx-auto px-5 py-8 sm:py-12 space-y-10">
      {/* 1. Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-sans text-[#6E675E]">
        <Link href="/" className="hover:text-[#163A5F] transition-colors">Home</Link>
        <span>/</span>
        <Link href="/guides" className="hover:text-[#163A5F] transition-colors">Guides</Link>
        <span>/</span>
        <span className="text-[#1A1918] font-medium" aria-current="page">How Much Flooring Do I Need?</span>
      </nav>

      {/* 2. Article Header */}
      <header className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDF7F2] text-[#0B6E54] text-xs font-sans font-semibold">
          <FlooringToolIcon className="w-4 h-4" />
          <span>Flooring & Renovation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-[#1A1918] tracking-tight leading-tight">
          How Much Flooring Do I Need?
        </h1>
        <p className="text-base sm:text-lg text-[#4E4942] leading-relaxed font-sans">
          A step-by-step guide to calculating square footage, cutting waste factors, and box quantities for laminate, vinyl plank (LVP), hardwood, and engineered flooring.
        </p>
      </header>

      {/* 3. Direct Quick Answer Box */}
      <section aria-labelledby="quick-answer-heading" className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#163A5F]/20 shadow-[0_4px_20px_-2px_rgba(22,58,95,0.08)] space-y-3">
        <h2 id="quick-answer-heading" className="text-sm font-sans font-bold uppercase tracking-wider text-[#163A5F]">
          Quick Answer
        </h2>
        <p className="text-base sm:text-lg text-[#1A1918] font-sans font-medium leading-relaxed">
          To calculate how much flooring you need, measure your room's length and width to find the total square footage (or square metres), then add a <strong>10% waste allowance</strong> for cuts, offcuts, and fitting around doorways. Divide the total square footage by the coverage per box, and <strong>always round up to the nearest full box</strong>.
        </p>
        <p className="text-sm text-[#6E675E] font-sans">
          For diagonal or herringbone patterns, increase your waste allowance to <strong>15% to 20%</strong>.
        </p>
      </section>

      {/* 4. Calculator Callout Card */}
      <section className="p-5 sm:p-6 rounded-2xl bg-[#F4EDE2] border border-[#DFCFC0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-lg font-display font-bold text-[#1A1918]">
            Calculate your flooring boxes automatically
          </h2>
          <p className="text-sm text-[#4E4942] font-sans">
            Enter room measurements and box sizes to get exact carton counts.
          </p>
        </div>
        <Link
          href="/tools/flooring-calculator"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#163A5F] text-white font-sans text-sm font-bold shadow-[0_2px_8px_rgba(22,58,95,0.2)] hover:bg-[#112F4D] transition-all cursor-pointer whitespace-nowrap shrink-0"
        >
          <Calculator className="w-4 h-4" />
          <span>Open Flooring Calculator</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* 5. Step-by-Step Calculation Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          Step-by-Step Calculation Example
        </h2>
        <p className="text-sm sm:text-base text-[#4E4942] font-sans leading-relaxed">
          Suppose you want to install luxury vinyl planks (LVP) in a living room measuring <strong>16 feet by 14 feet</strong>, plus a small entryway closet measuring <strong>4 feet by 3 feet</strong>. Each box covers <strong>22 square feet</strong>.
        </p>

        <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-4 font-sans text-sm sm:text-base">
          <div className="space-y-2">
            <h3 className="font-bold text-[#1A1918] text-base">Step 1: Calculate total base floor area</h3>
            <p className="text-[#4E4942]">Living Room = 16 ft × 14 ft = 224 sq ft</p>
            <p className="text-[#4E4942]">Closet = 4 ft × 3 ft = 12 sq ft</p>
            <p className="text-[#4E4942]">Total Base Area = 224 + 12 = <strong>236 sq ft</strong></p>
          </div>

          <div className="space-y-2 border-t border-[#F0EAE1] pt-3">
            <h3 className="font-bold text-[#1A1918] text-base">Step 2: Add 10% cutting and fitting waste</h3>
            <p className="text-[#4E4942]">Waste Allowance = 236 sq ft × 0.10 = 23.6 sq ft</p>
            <p className="text-[#4E4942]">Total Flooring with Waste = 236 + 23.6 = <strong>259.6 sq ft</strong></p>
          </div>

          <div className="space-y-2 border-t border-[#F0EAE1] pt-3">
            <h3 className="font-bold text-[#1A1918] text-base">Step 3: Divide by box coverage</h3>
            <p className="text-[#4E4942]">Boxes needed = 259.6 sq ft ÷ 22 sq ft/box = <strong>11.8 boxes</strong></p>
          </div>

          <div className="space-y-2 border-t border-[#F0EAE1] pt-3">
            <h3 className="font-bold text-[#1A1918] text-base">Step 4: Round up to the nearest full box</h3>
            <p className="text-[#4E4942]">Retailers sell flooring exclusively in complete, sealed cartons.</p>
            <p className="text-[#0B6E54] font-semibold">Order: <strong>12 full boxes (264 sq ft total)</strong></p>
          </div>
        </div>
      </section>

      {/* 6. Recommended Waste Allowances by Installation Type */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          Recommended Waste Percentages
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1]">
            <h3 className="font-bold text-sm text-[#1A1918]">Simple Rectangular Rooms</h3>
            <p className="text-xs text-[#6E675E] mt-1 font-sans">
              <strong>5% to 7% waste</strong> — Straight walls with few obstacles or alcoves. Minimal offcut scrap.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1]">
            <h3 className="font-bold text-sm text-[#1A1918]">Standard Layout with Closets</h3>
            <p className="text-xs text-[#6E675E] mt-1 font-sans">
              <strong>10% waste</strong> — Recommended for most home installations with door frames, stairs, or closets.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1]">
            <h3 className="font-bold text-sm text-[#1A1918]">Diagonal or Curved Layouts</h3>
            <p className="text-xs text-[#6E675E] mt-1 font-sans">
              <strong>15% waste</strong> — Planks laid at a 45-degree angle require triangular cutoffs on both ends.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1]">
            <h3 className="font-bold text-sm text-[#1A1918]">Herringbone & Intricate Parquet</h3>
            <p className="text-xs text-[#6E675E] mt-1 font-sans">
              <strong>15% to 20% waste</strong> — Frequent end cuts and border perimeter balancing increase scrap rate.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Key Factors That Affect Amount */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          Factors Influencing Flooring Requirements
        </h2>
        <ul className="space-y-3">
          <li className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#0B6E54] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm text-[#1A1918]">Room Geometry & Out-of-Square Walls</h3>
              <p className="text-xs sm:text-sm text-[#4E4942] mt-0.5 font-sans">
                Older homes rarely have perfectly 90-degree square corners. Tapered cuts along walls can consume extra material.
              </p>
            </div>
          </li>
          <li className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#0B6E54] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm text-[#1A1918]">Plank Stagger & Joint Spacing</h3>
              <p className="text-xs sm:text-sm text-[#4E4942] mt-0.5 font-sans">
                Manufacturers require staggering end joints by at least 6 to 8 inches. Some starter offcuts may be too short to reuse.
              </p>
            </div>
          </li>
          <li className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#0B6E54] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm text-[#1A1918]">Underlayment and Transitions</h3>
              <p className="text-xs sm:text-sm text-[#4E4942] mt-0.5 font-sans">
                Don’t forget acoustic underlayment rolls (if not pre-attached to your planks) and T-moldings for doorways.
              </p>
            </div>
          </li>
        </ul>
      </section>

      {/* 8. Practical Tips & Common Mistakes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          Practical Tips & Common Mistakes
        </h2>
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E4DCD0] flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#D95D39] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-[#1A1918]">Keep 1 full spare box in climate-controlled storage</h3>
              <p className="text-xs sm:text-sm text-[#4E4942] font-sans">
                Flooring product lines and dye lots are frequently discontinued by manufacturers. Having an extra box makes replacing a scratched or water-damaged plank in future years hassle-free.
              </p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E4DCD0] flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#D95D39] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-[#1A1918]">Acclimate flooring before laying</h3>
              <p className="text-xs sm:text-sm text-[#4E4942] font-sans">
                Allow laminate and hardwood boxes to acclimate flat inside the room for 48 hours prior to installation to prevent post-installation expansion buckling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Related Calculators & Internal Links */}
      <footer className="pt-6 border-t border-[#E6DDD1] space-y-4">
        <h2 className="text-xl font-display font-bold text-[#1A1918]">
          Related Calculators & Guides
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/tools/tile-calculator"
            className="p-3.5 rounded-xl bg-[#FFFFFF] hover:bg-[#FAF6F0] border border-[#E6DDD1] text-left transition-colors group block"
          >
            <div className="font-semibold text-sm text-[#163A5F] group-hover:underline flex items-center justify-between">
              <span>Tile Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100" />
            </div>
            <p className="text-xs text-[#6E675E] mt-1 font-sans">Calculate floor and wall tile quantities.</p>
          </Link>
          <Link
            href="/tools/paint-calculator"
            className="p-3.5 rounded-xl bg-[#FFFFFF] hover:bg-[#FAF6F0] border border-[#E6DDD1] text-left transition-colors group block"
          >
            <div className="font-semibold text-sm text-[#163A5F] group-hover:underline flex items-center justify-between">
              <span>Paint Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100" />
            </div>
            <p className="text-xs text-[#6E675E] mt-1 font-sans">Estimate wall and ceiling paint for the room.</p>
          </Link>
          <Link
            href="/guides/how-much-paint-do-i-need"
            className="p-3.5 rounded-xl bg-[#FFFFFF] hover:bg-[#FAF6F0] border border-[#E6DDD1] text-left transition-colors group block"
          >
            <div className="font-semibold text-sm text-[#163A5F] group-hover:underline flex items-center justify-between">
              <span>Paint Guide</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100" />
            </div>
            <p className="text-xs text-[#6E675E] mt-1 font-sans">How much paint is needed for room walls?</p>
          </Link>
        </div>

        <div className="pt-4 flex items-center justify-between">
          <Link
            href="/guides"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#163A5F] hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all guides</span>
          </Link>
        </div>
      </footer>
    </main>
  );
}
