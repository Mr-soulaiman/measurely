import { Link } from '../../context/NavigationContext';
import { ArrowRight, Calculator, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';
import { GravelToolIcon } from '../../components/ToolIcons';

export function GravelGuidePage() {
  return (
    <main className="flex-1 max-w-3xl w-full mx-auto px-5 py-8 sm:py-12 space-y-10">
      {/* 1. Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-sans text-[#6E675E]">
        <Link href="/" className="hover:text-[#163A5F] transition-colors">Home</Link>
        <span>/</span>
        <Link href="/guides" className="hover:text-[#163A5F] transition-colors">Guides</Link>
        <span>/</span>
        <span className="text-[#1A1918] font-medium" aria-current="page">How Much Gravel Do I Need?</span>
      </nav>

      {/* 2. Article Header */}
      <header className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDF7F2] text-[#0B6E54] text-xs font-sans font-semibold">
          <GravelToolIcon className="w-4 h-4" />
          <span>Landscaping & Driveways</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-[#1A1918] tracking-tight leading-tight">
          How Much Gravel Do I Need?
        </h1>
        <p className="text-base sm:text-lg text-[#4E4942] leading-relaxed font-sans">
          A practical guide to calculating gravel volume, cubic yards, and tons for driveways, paths, garden borders, and French drains.
        </p>
      </header>

      {/* 3. Direct Quick Answer Box */}
      <section aria-labelledby="quick-answer-heading" className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#163A5F]/20 shadow-[0_4px_20px_-2px_rgba(22,58,95,0.08)] space-y-3">
        <h2 id="quick-answer-heading" className="text-sm font-sans font-bold uppercase tracking-wider text-[#163A5F]">
          Quick Answer
        </h2>
        <p className="text-base sm:text-lg text-[#1A1918] font-sans font-medium leading-relaxed">
          To calculate how much gravel you need, multiply the length of your area by the width and the desired layer depth to get the total volume. In standard US units, <strong>1 cubic yard of gravel covers approximately 100 square feet at 3 inches deep</strong> and weighs about <strong>1.4 tons (2,800 lbs)</strong>. In metric units, 1 cubic metre covers 10 square metres at 100 mm deep and weighs about 1.5 to 1.6 tonnes.
        </p>
        <p className="text-sm text-[#6E675E] font-sans">
          Always add a <strong>5% to 10% allowance</strong> to account for soil settling, compaction, and uneven ground.
        </p>
      </section>

      {/* 4. Calculator Callout Card */}
      <section className="p-5 sm:p-6 rounded-2xl bg-[#F4EDE2] border border-[#DFCFC0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-lg font-display font-bold text-[#1A1918]">
            Calculate your gravel in seconds
          </h2>
          <p className="text-sm text-[#4E4942] font-sans">
            Enter your driveway or garden dimensions directly into our free calculator.
          </p>
        </div>
        <Link
          href="/tools/gravel-calculator"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#163A5F] text-white font-sans text-sm font-bold shadow-[0_2px_8px_rgba(22,58,95,0.2)] hover:bg-[#112F4D] transition-all cursor-pointer whitespace-nowrap shrink-0"
        >
          <Calculator className="w-4 h-4" />
          <span>Open Gravel Calculator</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* 5. Step-by-Step Calculation Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          Step-by-Step Calculation Example
        </h2>
        <p className="text-sm sm:text-base text-[#4E4942] font-sans leading-relaxed">
          Let’s calculate the gravel required for a typical gravel driveway section measuring <strong>20 feet long by 10 feet wide</strong> with a target depth of <strong>3 inches</strong>.
        </p>

        <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-4 font-sans text-sm sm:text-base">
          <div className="space-y-2">
            <h3 className="font-bold text-[#1A1918] text-base">Step 1: Calculate the surface area</h3>
            <p className="text-[#4E4942]">Area = Length × Width = 20 ft × 10 ft = <strong>200 sq ft</strong></p>
          </div>

          <div className="space-y-2 border-t border-[#F0EAE1] pt-3">
            <h3 className="font-bold text-[#1A1918] text-base">Step 2: Convert depth to feet and calculate volume</h3>
            <p className="text-[#4E4942]">Depth in feet = 3 inches ÷ 12 = <strong>0.25 ft</strong></p>
            <p className="text-[#4E4942]">Volume = 200 sq ft × 0.25 ft = <strong>50 cubic feet</strong></p>
          </div>

          <div className="space-y-2 border-t border-[#F0EAE1] pt-3">
            <h3 className="font-bold text-[#1A1918] text-base">Step 3: Convert cubic feet to cubic yards</h3>
            <p className="text-[#4E4942]">Cubic Yards = 50 cu ft ÷ 27 = <strong>1.85 cubic yards</strong></p>
          </div>

          <div className="space-y-2 border-t border-[#F0EAE1] pt-3">
            <h3 className="font-bold text-[#1A1918] text-base">Step 4: Estimate weight in tons</h3>
            <p className="text-[#4E4942]">Using average gravel density (1.4 tons per cubic yard):</p>
            <p className="text-[#4E4942]">Weight = 1.85 cu yd × 1.4 tons/yd³ = <strong>2.59 tons</strong> (approx. 5,180 lbs)</p>
            <p className="text-[#0B6E54] font-semibold">With 10% compaction & safety buffer: <strong>~2.85 tons (or 2.05 cubic yards)</strong></p>
          </div>
        </div>
      </section>

      {/* 6. Recommended Depth by Project Type */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          Recommended Gravel Depth by Project
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1]">
            <h3 className="font-bold text-sm text-[#1A1918]">Walkways & Garden Paths</h3>
            <p className="text-xs text-[#6E675E] mt-1 font-sans">
              <strong>2 to 3 inches (50–75 mm)</strong> — Comfortable for foot traffic without sinking. Pea gravel or decorative chips work best.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1]">
            <h3 className="font-bold text-sm text-[#1A1918]">Driveways (Top Layer)</h3>
            <p className="text-xs text-[#6E675E] mt-1 font-sans">
              <strong>3 to 4 inches (75–100 mm)</strong> — Over a compacted base. Crushed stone with fines (#57 stone or crushed granite) locks firmly under tires.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1]">
            <h3 className="font-bold text-sm text-[#1A1918]">Sub-base for Patios & Pavers</h3>
            <p className="text-xs text-[#6E675E] mt-1 font-sans">
              <strong>4 to 6 inches (100–150 mm)</strong> — Compacted crushed run / road base to provide structural support and prevent paver sagging.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1]">
            <h3 className="font-bold text-sm text-[#1A1918]">French Drains & Drainage Trenches</h3>
            <p className="text-xs text-[#6E675E] mt-1 font-sans">
              <strong>4 to 8 inches (100–200 mm)</strong> — Clean washed round stone or drain rock (#57 washed) surrounding perforated pipe.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Factors That Affect Amount Needed */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          Key Factors That Affect How Much Gravel You Need
        </h2>
        <ul className="space-y-3">
          <li className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#0B6E54] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm text-[#1A1918]">Compaction and Settling</h3>
              <p className="text-xs sm:text-sm text-[#4E4942] mt-0.5 font-sans">
                Crushed aggregate with stone dust settles 10% to 15% when tamped down with a plate compactor. Account for this shrinkage by ordering extra volume.
              </p>
            </div>
          </li>
          <li className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#0B6E54] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm text-[#1A1918]">Gravel Type and Rock Density</h3>
              <p className="text-xs sm:text-sm text-[#4E4942] mt-0.5 font-sans">
                Different aggregates have different densities. Lava rock is light (~0.9 tons/yd³), whereas dense limestone and granite weigh around 1.35 to 1.5 tons/yd³.
              </p>
            </div>
          </li>
          <li className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#0B6E54] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm text-[#1A1918]">Subgrade Uniformity</h3>
              <p className="text-xs sm:text-sm text-[#4E4942] mt-0.5 font-sans">
                Excavated subsoil is rarely perfectly flat. Low spots and ruts in your base layer will naturally swallow more gravel than calculated.
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
              <h3 className="font-bold text-sm text-[#1A1918]">Always install geotextile landscape fabric first</h3>
              <p className="text-xs sm:text-sm text-[#4E4942] font-sans">
                Without a heavy-duty non-woven weed and separation fabric, gravel will gradually migrate downward into the native soil, requiring re-graveling within a couple of years.
              </p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E4DCD0] flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#D95D39] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-[#1A1918]">Check minimum delivery quantities</h3>
              <p className="text-xs sm:text-sm text-[#4E4942] font-sans">
                Quarries and landscape yards often have minimum delivery charges (usually 1 to 3 tons). For small planters, 50 lb bags from home improvement stores may be more convenient.
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
            href="/tools/sand-calculator"
            className="p-3.5 rounded-xl bg-[#FFFFFF] hover:bg-[#FAF6F0] border border-[#E6DDD1] text-left transition-colors group block"
          >
            <div className="font-semibold text-sm text-[#163A5F] group-hover:underline flex items-center justify-between">
              <span>Sand Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100" />
            </div>
            <p className="text-xs text-[#6E675E] mt-1 font-sans">Calculate leveling sand for paving or bedding.</p>
          </Link>
          <Link
            href="/tools/concrete-calculator"
            className="p-3.5 rounded-xl bg-[#FFFFFF] hover:bg-[#FAF6F0] border border-[#E6DDD1] text-left transition-colors group block"
          >
            <div className="font-semibold text-sm text-[#163A5F] group-hover:underline flex items-center justify-between">
              <span>Concrete Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100" />
            </div>
            <p className="text-xs text-[#6E675E] mt-1 font-sans">Calculate concrete slabs and sub-bases.</p>
          </Link>
          <Link
            href="/guides/how-much-sand-do-i-need"
            className="p-3.5 rounded-xl bg-[#FFFFFF] hover:bg-[#FAF6F0] border border-[#E6DDD1] text-left transition-colors group block"
          >
            <div className="font-semibold text-sm text-[#163A5F] group-hover:underline flex items-center justify-between">
              <span>Sand Guide</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100" />
            </div>
            <p className="text-xs text-[#6E675E] mt-1 font-sans">How much sand is needed for paver bedding?</p>
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
