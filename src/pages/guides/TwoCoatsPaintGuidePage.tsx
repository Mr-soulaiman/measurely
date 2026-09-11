import { ArrowLeft, ArrowRight, Paintbrush, Layers, CheckCircle2, AlertTriangle, Sparkles, Droplet } from 'lucide-react';
import { Link } from '../../context/NavigationContext';

export function TwoCoatsPaintGuidePage() {
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
          How Much Paint Do I Need for 2 Coats?
        </h1>
        <p className="text-lg text-[#4E4942] font-sans leading-relaxed">
          Two coats are the universal standard for durable, uniform wall color. Here is how to calculate your exact paint purchase without buying too much or running dry mid-wall.
        </p>
      </header>

      {/* Direct Answer Callout */}
      <section className="p-5 sm:p-6 rounded-2xl bg-[#FCFAF7] border-2 border-[#DFD5C6] space-y-3">
        <div className="flex items-center gap-2 text-[#7A5B3E] font-bold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          Quick Answer
        </div>
        <p className="text-base sm:text-lg font-medium text-[#1A1918] leading-snug">
          To calculate paint for 2 coats, take your <strong>net paintable wall area</strong> (total wall area minus doors and windows), multiply it by <strong>2</strong>, and divide by your paint’s coverage rate (typically <strong>350 to 400 square feet per gallon</strong>).
        </p>
        <p className="text-sm text-[#4E4942] leading-relaxed">
          For a standard 12 ft × 14 ft bedroom with 8-foot ceilings, you will need roughly <strong>2 gallons of paint</strong>. While the second coat glides on easier and consumes slightly less paint than the first, you should always plan for two full passes to ensure rich opacity and washability.
        </p>
      </section>

      {/* Section 1: The Coverage Difference Between Coat 1 and Coat 2 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          Why Coat 1 and Coat 2 Do Not Use the Exact Same Paint
        </h2>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          Many DIYers assume that if coat 1 uses exactly one gallon, coat 2 will require an identical gallon. In reality, the two coats perform fundamentally different jobs on the wall surface:
        </p>

        {/* Responsive Visual 1: One Coat vs Two Coats Comparison (Stacked on mobile, 2-col on desktop) */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F0EAE1] pb-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#6E675E]">
              Visual Comparison: Coat 1 vs Coat 2 On Drywall
            </div>
            <span className="text-xs text-[#0B6E54] font-semibold">Surface Interaction</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Coat 1 Card */}
            <div className="p-4 sm:p-5 rounded-xl border-2 border-[#DFD5C6] bg-[#FCFAF7] space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-[#E8DED1] text-[#2C2720] text-xs font-bold">
                    First Coat (Sealer &amp; Grip)
                  </span>
                  <span className="text-xs font-mono font-bold text-[#7A5B3E]">~350 sq ft/gal</span>
                </div>
                <h3 className="text-base font-bold text-[#1A1918]">The Absorption Pass</h3>
                <p className="text-xs sm:text-sm text-[#4E4942] leading-relaxed">
                  Porous drywall, old flat paint, and joint compound draw liquid out of the paint rapidly. The roller meets drag as resin soaks into microscopic pores, using more volume per square foot.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-[#F6EFE6] border border-[#DFD5C6] text-xs text-[#6E675E]">
                <strong>Look:</strong> Slight blotchiness, minor roller overlap lines, and underlying wall tones still faintly visible.
              </div>
            </div>

            {/* Coat 2 Card */}
            <div className="p-4 sm:p-5 rounded-xl border-2 border-[#0B6E54] bg-[#EDF7F2]/40 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-[#0B6E54] text-white text-xs font-bold">
                    Second Coat (Depth &amp; Sheen)
                  </span>
                  <span className="text-xs font-mono font-bold text-[#0B6E54]">~400 sq ft/gal</span>
                </div>
                <h3 className="text-base font-bold text-[#0B6E54]">The True Color Film</h3>
                <p className="text-xs sm:text-sm text-[#4E4942] leading-relaxed">
                  Because the wall is now sealed, the second coat glides freely with lower roller friction. The pigments link together to form a continuous, washable barrier with true manufacturer color depth.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-[#EDF7F2] border border-[#BCE5D6] text-xs text-[#0B6E54]">
                <strong>Look:</strong> 100% uniform sheen, solid depth, no lap marks, and maximum scrub resistance.
              </div>
            </div>
          </div>

          <p className="text-xs text-[#6E675E] leading-relaxed pt-1">
            Even though coat 2 stretches slightly further, paint is sold by the whole gallon or quart. You should still budget 2 full theoretical passes so you do not run dry on the final wall.
          </p>
        </div>
      </section>

      {/* Section 2: Step-by-Step Realistic Room Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          Realistic Example: 12 ft × 14 ft Bedroom (8 ft Ceilings)
        </h2>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          Let’s walk through a realistic master bedroom measuring 12 feet wide by 14 feet long with standard 8-foot ceilings, one standard entrance door, and two standard windows.
        </p>

        {/* Step Breakdown Cards */}
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0B6E54]">Step 1: Calculate Gross Wall Area</span>
              <span className="font-mono text-xs font-bold text-[#1A1918]">416 sq ft</span>
            </div>
            <p className="text-xs sm:text-sm text-[#4E4942] leading-relaxed">
              Find the room’s perimeter: <code className="px-1.5 py-0.5 rounded bg-[#F6EFE6] text-xs font-mono text-[#1A1918]">(12 ft + 14 ft) × 2 = 52 ft</code>.<br />
              Multiply perimeter by wall height: <code className="px-1.5 py-0.5 rounded bg-[#F6EFE6] text-xs font-mono text-[#1A1918]">52 ft × 8 ft = 416 sq ft</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7A5B3E]">Step 2: Subtract Major Openings</span>
              <span className="font-mono text-xs font-bold text-[#7A5B3E]">- 51 sq ft</span>
            </div>
            <p className="text-xs sm:text-sm text-[#4E4942] leading-relaxed">
              1 standard interior door: <code className="px-1.5 py-0.5 rounded bg-[#F6EFE6] text-xs font-mono text-[#1A1918]">3 ft × 7 ft = 21 sq ft</code>.<br />
              2 standard windows: <code className="px-1.5 py-0.5 rounded bg-[#F6EFE6] text-xs font-mono text-[#1A1918]">2 × (3 ft × 5 ft) = 30 sq ft</code>.<br />
              Total unpainted openings: <code className="px-1.5 py-0.5 rounded bg-[#F6EFE6] text-xs font-mono text-[#1A1918]">21 + 30 = 51 sq ft</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#163A5F]">Step 3: Net Paintable Area</span>
              <span className="font-mono text-xs font-bold text-[#163A5F]">365 sq ft</span>
            </div>
            <p className="text-xs sm:text-sm text-[#4E4942] leading-relaxed">
              Gross wall area minus openings: <code className="px-1.5 py-0.5 rounded bg-[#F6EFE6] text-xs font-mono text-[#1A1918]">416 sq ft - 51 sq ft = 365 sq ft</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#EDF7F2] border-2 border-[#0B6E54] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0B6E54]">Step 4: Calculate 2 Coats Needed</span>
              <span className="font-mono text-xs font-bold text-[#0B6E54]">730 sq ft Total Coverage</span>
            </div>
            <p className="text-xs sm:text-sm text-[#1A1918] leading-relaxed">
              Total coverage needed: <code className="px-1.5 py-0.5 rounded bg-white text-xs font-mono font-bold text-[#0B6E54]">365 sq ft × 2 coats = 730 sq ft</code>.<br />
              Dividing by standard coverage (375 sq ft/gal): <code className="px-1.5 py-0.5 rounded bg-white text-xs font-mono font-bold text-[#0B6E54]">730 ÷ 375 = 1.95 gallons</code>.
            </p>
          </div>
        </div>

        {/* Visual 2: Practical Purchasing Decision Card */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#FCFAF7] border-2 border-[#DFD5C6] space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#7A5B3E]">
            Purchasing Decision: What to Buy at the Paint Store
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white border border-[#DFD5C6] space-y-2">
              <div className="text-xs font-bold uppercase text-[#6E675E]">Exact Required</div>
              <div className="text-xl font-mono font-extrabold text-[#1A1918]">1.95 Gallons</div>
              <p className="text-xs text-[#4E4942]">
                With a 10% roller grid/tray residue and touch-up reserve, this comes to <strong>2.15 gallons</strong>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#EDF7F2] border border-[#BCE5D6] space-y-2">
              <div className="text-xs font-bold uppercase text-[#0B6E54]">Recommended Order</div>
              <div className="text-xl font-mono font-extrabold text-[#0B6E54]">2 Gallons + 1 Quart</div>
              <p className="text-xs text-[#2C2720]">
                Or buy 3 single gallons if the store runs a buy-2-get-1 or contractor discount. Never risk stopping midway through coat two.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: When You Might Need More Than 2 Coats */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          When Will You Need a 3rd Coat (or Primer)?
        </h2>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          While two coats handle 85% of interior painting jobs, specific situations will swallow more paint:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white border border-[#E6DDD1] space-y-2">
            <div className="flex items-center gap-1.5 text-[#C45A3C] font-bold text-xs">
              <AlertTriangle className="w-4 h-4" />
              Dark to Light Shifts
            </div>
            <h3 className="text-sm font-bold text-[#1A1918]">Navy or Burgundy to White</h3>
            <p className="text-xs text-[#6E675E] leading-relaxed">
              Painting an off-white over deep navy or bright red will bleed through two coats. Use one coat of dedicated high-hiding primer first, followed by two finish coats.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#E6DDD1] space-y-2">
            <div className="flex items-center gap-1.5 text-[#7A5B3E] font-bold text-xs">
              <Droplet className="w-4 h-4" />
              Raw Drywall Patches
            </div>
            <h3 className="text-sm font-bold text-[#1A1918]">Unprimed Joint Compound</h3>
            <p className="text-xs text-[#6E675E] leading-relaxed">
              Fresh spackle and drywall mud drink water instantly, causing &quot;flashing&quot; (dull spots). Always spot-prime patched areas with PVA primer before rolling coat one.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#E6DDD1] space-y-2">
            <div className="flex items-center gap-1.5 text-[#163A5F] font-bold text-xs">
              <Layers className="w-4 h-4" />
              Heavily Textured Walls
            </div>
            <h3 className="text-sm font-bold text-[#1A1918]">Knockdown &amp; Orange Peel</h3>
            <p className="text-xs text-[#6E675E] leading-relaxed">
              Texture creates peaks and valleys that expand total surface area by 15% to 25%. Lower your estimated coverage from 400 down to 300–320 sq ft per gallon.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: What About "One-Coat Guarantee" Paints? */}
      <section className="p-5 sm:p-6 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-3">
        <h2 className="text-xl font-display font-bold text-[#1A1918]">
          The Truth About &quot;One-Coat Guarantee&quot; Paints
        </h2>
        <p className="text-sm sm:text-base text-[#4E4942] leading-relaxed">
          Premium paints advertised as &quot;one-coat coverage&quot; do have higher pigment density. However, if you read the fine print on the can, that guarantee only applies when painting over a similar, pre-primed shade. 
        </p>
        <p className="text-sm text-[#4E4942] leading-relaxed">
          More importantly, a single coat leaves a thinner dry film thickness (approx 1.5 mils vs 3.0 mils for two coats). Thinner paint films scratch easier, cannot withstand repeated scrubbing in hallways or kids&apos; rooms, and reveal subtle roller lap marks under bright side-lighting. Two coats remain the gold standard.
        </p>
      </section>

      {/* Interactive Tool Banner */}
      <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#163A5F] to-[#0D243B] text-white space-y-4 shadow-sm">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold tracking-wide">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#BCE5D6]" />
            Free Online Estimator
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold">
            Calculate Exact Paint for Your Room
          </h2>
          <p className="text-sm sm:text-base text-[#D5CEC2] max-w-xl leading-relaxed">
            Enter your room length, width, ceiling height, and number of doors and windows into our Paint Calculator to get instant 1-coat or 2-coat volume estimates in gallons or litres.
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
            href="/guides/how-much-paint-do-i-need-for-one-room"
            className="p-4 rounded-xl bg-white border border-[#E6DDD1] hover:border-[#0B6E54] transition-colors space-y-1 block group"
          >
            <div className="text-xs font-bold text-[#0B6E54]">Room Estimation</div>
            <div className="text-sm font-bold text-[#1A1918] group-hover:text-[#0B6E54] transition-colors">
              How Much Paint Do I Need for One Room?
            </div>
            <p className="text-xs text-[#6E675E]">
              Step-by-step room measuring blueprint from perimeter to can purchasing.
            </p>
          </Link>

          <Link
            href="/guides/do-you-calculate-paint-from-wall-area-or-floor-area"
            className="p-4 rounded-xl bg-white border border-[#E6DDD1] hover:border-[#0B6E54] transition-colors space-y-1 block group"
          >
            <div className="text-xs font-bold text-[#7A5B3E]">Area Calculation</div>
            <div className="text-sm font-bold text-[#1A1918] group-hover:text-[#7A5B3E] transition-colors">
              Do You Calculate Paint From Wall Area or Floor Area?
            </div>
            <p className="text-xs text-[#6E675E]">
              Why floor area alone causes major ordering mistakes and how wall height changes everything.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
