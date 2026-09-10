import { Link } from '../../context/NavigationContext';
import { ArrowRight, Calculator, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';
import { SandToolIcon } from '../../components/ToolIcons';

export function SandGuidePage() {
  return (
    <main className="flex-1 max-w-3xl w-full mx-auto px-5 py-8 sm:py-12 space-y-10">
      {/* 1. Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-sans text-[#6E675E]">
        <Link href="/" className="hover:text-[#163A5F] transition-colors">Home</Link>
        <span>/</span>
        <Link href="/guides" className="hover:text-[#163A5F] transition-colors">Guides</Link>
        <span>/</span>
        <span className="text-[#1A1918] font-medium" aria-current="page">How Much Sand Do I Need?</span>
      </nav>

      {/* 2. Article Header */}
      <header className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDF7F2] text-[#0B6E54] text-xs font-sans font-semibold">
          <SandToolIcon className="w-4 h-4" />
          <span>Paving & Masonry</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-[#1A1918] tracking-tight leading-tight">
          How Much Sand Do I Need?
        </h1>
        <p className="text-base sm:text-lg text-[#4E4942] leading-relaxed font-sans">
          Learn how to calculate sand volume, cubic yards, tonnes, and bag counts for paver bedding, sandboxes, mortar mixing, and above-ground pool bases.
        </p>
      </header>

      {/* 3. Direct Quick Answer Box */}
      <section aria-labelledby="quick-answer-heading" className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#163A5F]/20 shadow-[0_4px_20px_-2px_rgba(22,58,95,0.08)] space-y-3">
        <h2 id="quick-answer-heading" className="text-sm font-sans font-bold uppercase tracking-wider text-[#163A5F]">
          Quick Answer
        </h2>
        <p className="text-base sm:text-lg text-[#1A1918] font-sans font-medium leading-relaxed">
          To calculate how much sand you need, multiply your project area (length × width) by the target sand depth. As a benchmark, <strong>1 cubic yard of dry sand covers about 300 square feet at 1 inch deep</strong> (or 100 sq ft at 3 inches deep) and weighs approximately <strong>1.35 to 1.45 tons (2,700–2,900 lbs)</strong>. In metric units, 1 cubic metre covers 10 square metres at 100 mm depth and weighs approximately 1.6 tonnes.
        </p>
        <p className="text-sm text-[#6E675E] font-sans">
          For paver patios and walkways, a consistent <strong>1-inch (25 mm) screeded bedding layer</strong> of coarse concrete sand is standard.
        </p>
      </section>

      {/* 4. Calculator Callout Card */}
      <section className="p-5 sm:p-6 rounded-2xl bg-[#F4EDE2] border border-[#DFCFC0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-lg font-display font-bold text-[#1A1918]">
            Calculate your sand requirements instantly
          </h2>
          <p className="text-sm text-[#4E4942] font-sans">
            Convert area and depth to cubic yards, cubic metres, tonnes, and 50 lb bags.
          </p>
        </div>
        <Link
          href="/tools/sand-calculator"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#163A5F] text-white font-sans text-sm font-bold shadow-[0_2px_8px_rgba(22,58,95,0.2)] hover:bg-[#112F4D] transition-all cursor-pointer whitespace-nowrap shrink-0"
        >
          <Calculator className="w-4 h-4" />
          <span>Open Sand Calculator</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* 5. Step-by-Step Calculation Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          Step-by-Step Calculation Example
        </h2>
        <p className="text-sm sm:text-base text-[#4E4942] font-sans leading-relaxed">
          Suppose you are building a brick paver patio measuring <strong>15 feet by 10 feet</strong> with a standard <strong>1-inch sand bedding layer</strong>.
        </p>

        <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-4 font-sans text-sm sm:text-base">
          <div className="space-y-2">
            <h3 className="font-bold text-[#1A1918] text-base">Step 1: Calculate the surface area</h3>
            <p className="text-[#4E4942]">Area = Length × Width = 15 ft × 10 ft = <strong>150 sq ft</strong></p>
          </div>

          <div className="space-y-2 border-t border-[#F0EAE1] pt-3">
            <h3 className="font-bold text-[#1A1918] text-base">Step 2: Convert depth to feet and calculate volume</h3>
            <p className="text-[#4E4942]">Depth in feet = 1 inch ÷ 12 = <strong>0.0833 ft</strong></p>
            <p className="text-[#4E4942]">Volume = 150 sq ft × 0.0833 ft = <strong>12.5 cubic feet</strong></p>
          </div>

          <div className="space-y-2 border-t border-[#F0EAE1] pt-3">
            <h3 className="font-bold text-[#1A1918] text-base">Step 3: Convert to cubic yards and weight</h3>
            <p className="text-[#4E4942]">Cubic Yards = 12.5 cu ft ÷ 27 = <strong>0.46 cubic yards</strong></p>
            <p className="text-[#4E4942]">Weight = 0.46 cu yd × 1.35 tons/yd³ ≈ <strong>0.62 tons (1,240 lbs)</strong></p>
          </div>

          <div className="space-y-2 border-t border-[#F0EAE1] pt-3">
            <h3 className="font-bold text-[#1A1918] text-base">Step 4: Calculate bag count (if buying bagged sand)</h3>
            <p className="text-[#4E4942]">If using 50-lb retail bags: 1,240 lbs ÷ 50 lbs = 24.8 bags</p>
            <p className="text-[#0B6E54] font-semibold">With a 10% safety margin: <strong>27 bags (or 0.51 cubic yards bulk)</strong></p>
          </div>
        </div>
      </section>

      {/* 6. Typical Sand Depths by Project Type */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          Recommended Sand Depth by Application
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1]">
            <h3 className="font-bold text-sm text-[#1A1918]">Paver & Patio Bedding</h3>
            <p className="text-xs text-[#6E675E] mt-1 font-sans">
              <strong>1 inch (25 mm) strictly</strong> — Do not exceed 1 inch. Use coarse washed concrete sand (ASTM C33) to allow interlocking paver seating without shifting.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1]">
            <h3 className="font-bold text-sm text-[#1A1918]">Children’s Sandbox</h3>
            <p className="text-xs text-[#6E675E] mt-1 font-sans">
              <strong>4 to 6 inches (100–150 mm)</strong> — Clean, non-toxic, washed silica play sand that is dust-free and easy to mold.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1]">
            <h3 className="font-bold text-sm text-[#1A1918]">Above-Ground Pool Base</h3>
            <p className="text-xs text-[#6E675E] mt-1 font-sans">
              <strong>2 inches (50 mm)</strong> — Masonry sand cushioned beneath the pool liner to protect against sharp stones and puncturing.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1]">
            <h3 className="font-bold text-sm text-[#1A1918]">Paver Jointing / Polymeric Sand</h3>
            <p className="text-xs text-[#6E675E] mt-1 font-sans">
              <strong>Full joint depth (typically 1.5 to 2.5 inches)</strong> — Specialized polymeric sand swept dry into gaps between pavers to lock them and block weeds.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Key Factors That Affect Amount */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          Factors Influencing How Much Sand You Need
        </h2>
        <ul className="space-y-3">
          <li className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#0B6E54] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm text-[#1A1918]">Moisture Content and Bulking</h3>
              <p className="text-xs sm:text-sm text-[#4E4942] mt-0.5 font-sans">
                Damp sand swells in volume by up to 15–20% compared to completely dry sand (a phenomenon known as bulking). When compacted or wet, it settles back down.
              </p>
            </div>
          </li>
          <li className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#0B6E54] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm text-[#1A1918]">Sand Grain Classification</h3>
              <p className="text-xs sm:text-sm text-[#4E4942] mt-0.5 font-sans">
                Coarse concrete sand, fine masonry sand, and play sand pack differently. Always select the right grade for your specific task.
              </p>
            </div>
          </li>
          <li className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#0B6E54] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm text-[#1A1918]">Base Course Flatness</h3>
              <p className="text-xs sm:text-sm text-[#4E4942] mt-0.5 font-sans">
                Never use extra bedding sand to fix low spots in your sub-base. The compacted crushed stone base must be flat before screeding sand.
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
              <h3 className="font-bold text-sm text-[#1A1918]">Never compact the bedding sand before placing pavers</h3>
              <p className="text-xs sm:text-sm text-[#4E4942] font-sans">
                Screed the 1-inch bedding sand loose using screed pipes. Lay pavers directly onto the loose sand, then run a plate compactor over the installed pavers to seat them.
              </p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E4DCD0] flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#D95D39] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-[#1A1918]">Cover bulk sand piles from rainfall</h3>
              <p className="text-xs sm:text-sm text-[#4E4942] font-sans">
                Heavy rain saturates bulk sand, turning screeding into a muddy chore and making joint sand impossible to sweep into paver crevices.
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
            href="/tools/paver-calculator"
            className="p-3.5 rounded-xl bg-[#FFFFFF] hover:bg-[#FAF6F0] border border-[#E6DDD1] text-left transition-colors group block"
          >
            <div className="font-semibold text-sm text-[#163A5F] group-hover:underline flex items-center justify-between">
              <span>Paver Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100" />
            </div>
            <p className="text-xs text-[#6E675E] mt-1 font-sans">Calculate patio and walkway paver quantities.</p>
          </Link>
          <Link
            href="/tools/gravel-calculator"
            className="p-3.5 rounded-xl bg-[#FFFFFF] hover:bg-[#FAF6F0] border border-[#E6DDD1] text-left transition-colors group block"
          >
            <div className="font-semibold text-sm text-[#163A5F] group-hover:underline flex items-center justify-between">
              <span>Gravel Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100" />
            </div>
            <p className="text-xs text-[#6E675E] mt-1 font-sans">Calculate crushed stone base for your patio.</p>
          </Link>
          <Link
            href="/guides/how-much-gravel-do-i-need"
            className="p-3.5 rounded-xl bg-[#FFFFFF] hover:bg-[#FAF6F0] border border-[#E6DDD1] text-left transition-colors group block"
          >
            <div className="font-semibold text-sm text-[#163A5F] group-hover:underline flex items-center justify-between">
              <span>Gravel Guide</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100" />
            </div>
            <p className="text-xs text-[#6E675E] mt-1 font-sans">Learn how much sub-base gravel you need.</p>
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
