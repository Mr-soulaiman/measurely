import { ArrowLeft, ArrowRight, Paintbrush, Home, CheckCircle2, Ruler, DoorClosed, Sparkles } from 'lucide-react';
import { Link } from '../../context/NavigationContext';

export function PaintForOneRoomGuidePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb">
        <Link
          href="/guides"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B6E54] hover:text-[#095843] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Guides
        </Link>
      </nav>

      {/* Guide Header */}
      <header className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDF7F2] border border-[#BCE5D6] text-xs font-bold text-[#0B6E54]">
          <Paintbrush className="w-3.5 h-3.5" />
          Paint &amp; Walls Guide
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-[#1A1918] tracking-tight leading-tight">
          How Much Paint Do I Need for One Room?
        </h1>
        <p className="text-lg text-[#4E4942] font-sans leading-relaxed">
          Whether you are repainting a spare bedroom, a home office, or a master suite, here is the complete step-by-step formula to calculate your room’s square footage and buy the right number of gallons.
        </p>
      </header>

      {/* Direct Answer Callout */}
      <section className="p-5 sm:p-6 rounded-2xl bg-[#FCFAF7] border-2 border-[#DFD5C6] space-y-3">
        <div className="flex items-center gap-2 text-[#7A5B3E] font-bold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          Quick Answer
        </div>
        <p className="text-base sm:text-lg font-medium text-[#1A1918] leading-snug">
          For an average 12 ft × 14 ft bedroom with 8-foot ceilings, you will need <strong>2 gallons of paint</strong> for two standard coats. For smaller rooms (like a 10 ft × 10 ft guest room), 1.5 gallons is required, which usually means purchasing <strong>1 gallon plus 1 or 2 quarts</strong> (or 2 full gallons for better value).
        </p>
        <p className="text-sm text-[#4E4942] leading-relaxed">
          If your room has 9-foot or 10-foot ceilings, deep closets, or textured walls, budget <strong>3 gallons</strong> to avoid running dry during the second coat.
        </p>
      </section>

      {/* Section 1: The 4-Step Room Measuring Formula */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          The 4-Step Room Paint Calculation
        </h2>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          Estimating a room does not require measuring each individual wall separately. You can calculate the entire space in four simple steps:
        </p>

        {/* Responsive Diagram: Unfolded Wall Concept (Full width, responsive) */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-4">
          <div className="flex items-center justify-between border-b border-[#F0EAE1] pb-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#6E675E]">
              Visual Concept: Unfolding 4 Walls into One Long Rectangle
            </div>
            <span className="text-xs text-[#0B6E54] font-semibold">Perimeter × Height</span>
          </div>

          <div className="w-full">
            <svg viewBox="0 0 480 160" className="w-full h-auto block font-sans" aria-label="Unfolded wall diagram">
              <rect width="480" height="160" rx="10" fill="#FCFAF7" />

              {/* Four walls laid out side by side */}
              <g transform="translate(20, 25)">
                {/* Wall 1 */}
                <rect x="0" y="20" width="105" height="85" fill="#EDF7F2" stroke="#0B6E54" strokeWidth="1.5" rx="3" />
                <text x="52" y="55" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0B6E54">Wall 1</text>
                <text x="52" y="70" textAnchor="middle" fontSize="10" fill="#2C2720">13 ft Length</text>

                {/* Wall 2 with Window */}
                <rect x="110" y="20" width="115" height="85" fill="#EDF7F2" stroke="#0B6E54" strokeWidth="1.5" rx="3" />
                <rect x="145" y="38" width="45" height="40" fill="#FFFFFF" stroke="#163A5F" strokeWidth="1.5" rx="2" />
                <text x="167" y="55" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#163A5F">Window</text>
                <text x="167" y="65" textAnchor="middle" fontSize="7" fill="#6E675E">15 sq ft</text>
                <text x="167" y="94" textAnchor="middle" fontSize="10" fill="#2C2720">15 ft Length</text>

                {/* Wall 3 with Door */}
                <rect x="230" y="20" width="105" height="85" fill="#EDF7F2" stroke="#0B6E54" strokeWidth="1.5" rx="3" />
                <rect x="265" y="45" width="35" height="60" fill="#FFFFFF" stroke="#7A5B3E" strokeWidth="1.5" rx="2" />
                <text x="282" y="72" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#7A5B3E">Door</text>
                <text x="282" y="82" textAnchor="middle" fontSize="7" fill="#6E675E">21 sq ft</text>
                <text x="282" y="32" textAnchor="middle" fontSize="10" fill="#2C2720">13 ft Length</text>

                {/* Wall 4 */}
                <rect x="340" y="20" width="100" height="85" fill="#EDF7F2" stroke="#0B6E54" strokeWidth="1.5" rx="3" />
                <text x="390" y="55" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0B6E54">Wall 4</text>
                <text x="390" y="70" textAnchor="middle" fontSize="10" fill="#2C2720">15 ft Length</text>

                {/* Total Perimeter Dimension Top Arrow */}
                <line x1="0" y1="8" x2="440" y2="8" stroke="#0B6E54" strokeWidth="2" />
                <polygon points="0,8 8,4 8,12" fill="#0B6E54" />
                <polygon points="440,8 432,4 432,12" fill="#0B6E54" />
                <text x="220" y="3" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0B6E54">
                  Total Perimeter = 13 + 15 + 13 + 15 = 56 ft
                </text>

                {/* Ceiling Height Arrow Right */}
                <line x1="452" y1="20" x2="452" y2="105" stroke="#163A5F" strokeWidth="2" />
                <polygon points="452,20 448,28 456,28" fill="#163A5F" />
                <polygon points="452,105 448,97 456,97" fill="#163A5F" />
                <text x="445" y="65" textAnchor="end" fontSize="10" fontWeight="bold" fill="#163A5F">9 ft</text>
              </g>

              {/* Bottom formula banner */}
              <text x="240" y="145" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1A1918">
                Gross Wall Area = 56 ft Perimeter × 9 ft Height = 504 sq ft
              </text>
            </svg>
          </div>

          <div className="text-xs text-[#6E675E] leading-relaxed pt-1">
            Measuring the floor perimeter and multiplying by ceiling height gives you the total wall surface as one combined continuous plane.
          </div>
        </div>
      </section>

      {/* Section 2: Step-by-Step Realistic Master Bedroom Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          Realistic Complete Example: 13 ft × 15 ft Master Bedroom (9 ft Ceilings)
        </h2>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          Let’s run the exact math for a typical master bedroom with higher 9-foot ceilings, two doors (entry and closet), and two standard windows:
        </p>

        {/* Calculation Cards Stack (No horizontal slide on mobile) */}
        <div className="space-y-3">
          {/* Step 1 */}
          <div className="p-4 rounded-xl bg-white border border-[#DFD5C6] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B6E54]">Step 1: Gross Wall Area</span>
              <div className="text-sm font-bold text-[#1A1918]">Perimeter × Ceiling Height</div>
              <p className="text-xs text-[#4E4942] mt-0.5">
                Perimeter: <code className="font-mono">(13 + 15) × 2 = 56 ft</code>. Wall area: <code className="font-mono">56 ft × 9 ft</code>.
              </p>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-[#F6EFE6] text-sm font-mono font-bold text-[#1A1918] shrink-0 text-right">
              504 sq ft
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-xl bg-white border border-[#DFD5C6] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A5B3E]">Step 2: Subtract Openings</span>
              <div className="text-sm font-bold text-[#1A1918]">2 Doors + 2 Windows</div>
              <p className="text-xs text-[#4E4942] mt-0.5">
                2 doors (<code className="font-mono">2 × 21 = 42 sq ft</code>) + 2 windows (<code className="font-mono">2 × 15 = 30 sq ft</code>).
              </p>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-[#F6EFE6] text-sm font-mono font-bold text-[#7A5B3E] shrink-0 text-right">
              - 72 sq ft
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-xl bg-white border border-[#0B6E54] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B6E54]">Step 3: Net Paintable Area</span>
              <div className="text-sm font-bold text-[#0B6E54]">True Wall Surface to Cover</div>
              <p className="text-xs text-[#4E4942] mt-0.5">
                <code className="font-mono">504 sq ft - 72 sq ft = 432 sq ft</code>.
              </p>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-[#EDF7F2] text-base font-mono font-bold text-[#0B6E54] shrink-0 text-right">
              432 sq ft
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-4 rounded-xl bg-[#EDF7F2] border-2 border-[#0B6E54] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B6E54]">Step 4: Two Full Coats Required</span>
              <div className="text-sm font-bold text-[#1A1918]">Coverage Calculation at 375 sq ft / Gallon</div>
              <p className="text-xs text-[#4E4942] mt-0.5">
                Total coverage: <code className="font-mono">432 sq ft × 2 = 864 sq ft</code>. Paint needed: <code className="font-mono">864 ÷ 375</code>.
              </p>
            </div>
            <div className="px-3.5 py-2 rounded-lg bg-white border border-[#BCE5D6] text-base font-mono font-extrabold text-[#0B6E54] shrink-0 text-right">
              2.30 Gallons
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: When to Round Up (Quarts vs Gallons Pricing) */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          When to Buy Quarts vs Rounding Up to Full Gallons
        </h2>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          In the example above, you need <strong>2.30 gallons</strong>. Homeowners often wonder: should I buy 2 gallons and 1 quart, or simply buy 3 full gallons?
        </p>

        {/* Responsive Comparison Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-[#DFD5C6] bg-[#FCFAF7] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-[#7A5B3E]">Option A</span>
              <span className="text-xs font-semibold text-[#6E675E]">Exact Match</span>
            </div>
            <h3 className="text-base font-bold text-[#1A1918]">2 Gallons + 1 or 2 Quarts</h3>
            <p className="text-xs text-[#4E4942] leading-relaxed">
              Quarts are handy for minor needs, but beware retail pricing: <strong>two individual quarts typically cost 75% to 85% of a full gallon can</strong>. If your color requires custom tinting, tinting individual quarts can sometimes lead to minute shade differences.
            </p>
          </div>

          <div className="p-5 rounded-xl border-2 border-[#0B6E54] bg-[#EDF7F2]/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-[#0B6E54]">Option B (Recommended)</span>
              <span className="text-xs font-bold text-[#0B6E54]">Best Value</span>
            </div>
            <h3 className="text-base font-bold text-[#0B6E54]">Buy 3 Full Gallons</h3>
            <p className="text-xs text-[#4E4942] leading-relaxed">
              Rounding up to 3 gallons provides three major benefits:
              <br />1. You can &quot;box&quot; your paint (mixing all cans together in a 5-gallon bucket) for 100% color consistency.
              <br />2. You will never stop mid-wall to make an emergency trip to the hardware store.
              <br />3. You retain a sealed leftover can for future scuff touch-ups that matches perfectly.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Tool Banner */}
      <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#163A5F] to-[#0D243B] text-white space-y-4 shadow-sm">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold tracking-wide">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#BCE5D6]" />
            Free Online Estimator
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold">
            Estimate Your Room in Under 30 Seconds
          </h2>
          <p className="text-sm sm:text-base text-[#D5CEC2] max-w-xl leading-relaxed">
            Plug your room’s length, width, and ceiling height into our Paint Calculator to get instant wall area breakdowns, door and window deductions, and recommended gallon or litre purchases.
          </p>
        </div>
        <div className="pt-2">
          <Link
            href="/tools/paint-calculator"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#EDF7F2] hover:bg-[#D8EFE4] text-[#0B6E54] font-bold text-sm transition-colors shadow-sm"
          >
            Open Paint Calculator
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Related Guides Cross-linking */}
      <section className="space-y-4 pt-4 border-t border-[#E6DDD1]">
        <h2 className="text-lg font-display font-bold text-[#1A1918]">
          Related Paint Guides
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/guides/how-much-paint-do-i-need-for-2-coats"
            className="p-4 rounded-xl bg-white border border-[#E6DDD1] hover:border-[#0B6E54] transition-colors space-y-1 block group"
          >
            <div className="text-xs font-bold text-[#0B6E54]">Coat Calculation</div>
            <div className="text-sm font-bold text-[#1A1918] group-hover:text-[#0B6E54] transition-colors">
              How Much Paint Do I Need for 2 Coats?
            </div>
            <p className="text-xs text-[#6E675E]">
              Why coat 1 and coat 2 absorb differently, and realistic purchasing math.
            </p>
          </Link>

          <Link
            href="/guides/how-much-paint-do-i-need-for-a-ceiling"
            className="p-4 rounded-xl bg-white border border-[#E6DDD1] hover:border-[#0B6E54] transition-colors space-y-1 block group"
          >
            <div className="text-xs font-bold text-[#163A5F]">Ceiling Painting</div>
            <div className="text-sm font-bold text-[#1A1918] group-hover:text-[#163A5F] transition-colors">
              How Much Paint Do I Need for a Ceiling?
            </div>
            <p className="text-xs text-[#6E675E]">
              Calculate ceiling area, texture absorption on popcorn ceilings, and flat paint coverage.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
