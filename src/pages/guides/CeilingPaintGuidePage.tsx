import { ArrowLeft, ArrowRight, Paintbrush, Square, CheckCircle2, AlertTriangle, Sparkles, Layers } from 'lucide-react';
import { Link } from '../../context/NavigationContext';

export function CeilingPaintGuidePage() {
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
          How Much Paint Do I Need for a Ceiling?
        </h1>
        <p className="text-lg text-[#4E4942] font-sans leading-relaxed">
          Ceilings are much simpler to measure than walls because there are no doors or windows to subtract. However, texture and stains drastically alter how much paint you need. Here is the realistic guide to buying ceiling paint.
        </p>
      </header>

      {/* Direct Answer Callout */}
      <section className="p-5 sm:p-6 rounded-2xl bg-[#FCFAF7] border-2 border-[#DFD5C6] space-y-3">
        <div className="flex items-center gap-2 text-[#7A5B3E] font-bold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          Quick Answer
        </div>
        <p className="text-base sm:text-lg font-medium text-[#1A1918] leading-snug">
          To calculate ceiling area, multiply your room’s <strong>Length × Width</strong>. For most standard rooms up to 350 square feet (e.g., up to 18 ft × 19 ft), <strong>1 gallon of ceiling paint</strong> is sufficient for a single refresh coat on smooth drywall.
        </p>
        <p className="text-sm text-[#4E4942] leading-relaxed">
          If your ceiling has <strong>popcorn or heavy acoustic texture</strong>, or if you are covering dark water stains or fresh unpainted drywall, you will need <strong>2 coats</strong> (or 1 coat primer + 1 coat paint). Textured ceilings drink paint heavily, reducing coverage from 400 down to 250 sq ft per gallon.
        </p>
      </section>

      {/* Section 1: How Ceiling Area Differs from Wall Area */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          How Ceiling Area Differs from Wall Area
        </h2>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          Calculating a ceiling is the exact opposite of calculating walls:
        </p>

        {/* Responsive Visual 1: Ceiling Measurement Diagram */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-4">
          <div className="flex items-center justify-between border-b border-[#F0EAE1] pb-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#6E675E]">
              Visual Diagram: Overhead Ceiling Plane (14 ft × 16 ft)
            </div>
            <span className="text-xs text-[#0B6E54] font-semibold">Zero Deductions</span>
          </div>

          <div className="w-full">
            <svg viewBox="0 0 460 160" className="w-full h-auto block font-sans" aria-label="Ceiling dimensions diagram">
              <rect width="460" height="160" rx="10" fill="#FCFAF7" />

              {/* Ceiling Box */}
              <g transform="translate(40, 20)">
                {/* Ceiling Plane */}
                <rect x="0" y="16" width="360" height="88" rx="6" fill="#F8FBF9" stroke="#0B6E54" strokeWidth="2" strokeDasharray="6 3" />
                
                {/* Center Light Fixture indicator */}
                <circle cx="180" cy="60" r="10" fill="#E8DED1" stroke="#8E785F" strokeWidth="1.5" />
                <circle cx="180" cy="60" r="3" fill="#8E785F" />
                <text x="180" y="80" textAnchor="middle" fontSize="9" fill="#7A5B3E">Light Fixture (no deduction)</text>

                {/* Length Dimension Arrow (Top) */}
                <line x1="0" y1="6" x2="360" y2="6" stroke="#163A5F" strokeWidth="2" />
                <polygon points="0,6 8,2 8,10" fill="#163A5F" />
                <polygon points="360,6 352,2 352,10" fill="#163A5F" />
                <text x="180" y="0" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#163A5F">Length: 16 ft</text>

                {/* Width Dimension Arrow (Right) */}
                <line x1="375" y1="16" x2="375" y2="104" stroke="#163A5F" strokeWidth="2" />
                <polygon points="375,16 371,24 379,24" fill="#163A5F" />
                <polygon points="375,104 371,96 379,96" fill="#163A5F" />
                <text x="388" y="65" textAnchor="start" fontSize="11" fontWeight="bold" fill="#163A5F">Width: 14 ft</text>

                {/* Center square footage */}
                <text x="180" y="50" textAnchor="middle" fontSize="16" fontWeight="extrabold" fill="#0B6E54">
                  Ceiling Area = 224 sq ft
                </text>
              </g>

              {/* Bottom rule banner */}
              <text x="230" y="145" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1A1918">
                Ceiling Area = Floor Area. No doors, windows, or baseboards to subtract!
              </text>
            </svg>
          </div>

          <div className="text-xs text-[#6E675E] leading-relaxed pt-1">
            Because a ceiling mirrors your floor footprint exactly, you can simply measure your room’s floor length and width with a tape measure on the carpet.
          </div>
        </div>
      </section>

      {/* Section 2: Texture Absorption: Smooth vs Popcorn Ceilings */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          Texture Factor: Smooth Drywall vs Popcorn Ceilings
        </h2>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          The single biggest variable in ceiling paint consumption is surface texture. Acoustic textures create millions of tiny crevices that drastically increase true surface area:
        </p>

        {/* Responsive Visual 2: Surface Texture Comparison (Stacked on mobile, 2-col on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Smooth Drywall Card */}
          <div className="p-5 rounded-xl border-2 border-[#0B6E54] bg-[#FCFAF7] space-y-3 flex flex-col justify-between shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-[#EDF7F2] text-[#0B6E54] text-xs font-bold">
                  Smooth Drywall
                </span>
                <span className="text-xs font-mono font-bold text-[#0B6E54]">375–400 sq ft/gal</span>
              </div>
              <h3 className="text-base font-bold text-[#1A1918]">Standard Flat Drywall</h3>
              <p className="text-xs sm:text-sm text-[#4E4942] leading-relaxed">
                Smooth plaster or taped drywall allows a standard 3/8-inch nap roller to transfer paint evenly with minimal drag. Paint spreads to its full rated capacity.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-[#EDF7F2] border border-[#BCE5D6] text-xs text-[#0B6E54]">
              <strong>Typical 224 sq ft room:</strong> ~0.6 gallons for 1 refresh coat. <strong>1 Gallon can</strong> is plenty.
            </div>
          </div>

          {/* Popcorn / Acoustic Texture Card */}
          <div className="p-5 rounded-xl border-2 border-[#7A5B3E] bg-[#FCFAF7] space-y-3 flex flex-col justify-between shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-[#F6EFE6] text-[#7A5B3E] text-xs font-bold">
                  Popcorn / Acoustic
                </span>
                <span className="text-xs font-mono font-bold text-[#7A5B3E]">225–275 sq ft/gal</span>
              </div>
              <h3 className="text-base font-bold text-[#1A1918]">Heavy Texture &amp; Stipple</h3>
              <p className="text-xs sm:text-sm text-[#4E4942] leading-relaxed">
                Vermiculite particles and rough knockdown patterns absorb moisture like a sponge. Requires a thicker 3/4-inch nap roller to push paint into deep hollows.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-[#F6EFE6] border border-[#DFD5C6] text-xs text-[#7A5B3E]">
              <strong>Typical 224 sq ft room:</strong> ~0.9 gallons for 1 coat, or ~1.7 gallons for 2 coats. <strong>Buy 2 Gallons</strong>.
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Do You Need 1 Coat or 2 Coats for a Ceiling? */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          When Is 1 Coat Enough vs When You Need 2?
        </h2>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          Unlike high-traffic walls that face fingerprints, scuffs, and daily wear, ceilings endure virtually zero physical contact. This affects coat planning:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white border border-[#E6DDD1] space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B6E54]">Single Coat Scenario</span>
            <h3 className="text-base font-bold text-[#1A1918]">1 Coat: Routine Clean Refresh</h3>
            <p className="text-xs text-[#4E4942] leading-relaxed">
              If the ceiling was already white and has no grease, smoke stains, or structural repairs, a single coat of high-quality flat ceiling paint will restore brightness and eliminate minor dust shadows.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#E6DDD1] space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C45A3C]">Two Coat Scenarios</span>
            <h3 className="text-base font-bold text-[#1A1918]">2 Coats: Stains or Color Shifts</h3>
            <p className="text-xs text-[#4E4942] leading-relaxed">
              Water stains from old roof leaks will bleed right through standard water-based ceiling paint. Seal the stain with an oil-based or shellac-based stain blocker first, then roll two finish coats.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Why True Ceiling Paint Is Formulated "Dead Flat" */}
      <section className="p-5 sm:p-6 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-3">
        <h2 className="text-xl font-display font-bold text-[#1A1918]">
          Why You Should Never Use Leftover Wall Paint on a Ceiling
        </h2>
        <p className="text-sm sm:text-base text-[#4E4942] leading-relaxed">
          It is tempting to use leftover eggshell or satin wall paint on the ceiling, but you will almost certainly regret it. 
        </p>
        <p className="text-sm text-[#4E4942] leading-relaxed">
          Daylight entering windows strikes a ceiling at an extreme horizontal &quot;raking&quot; angle. Any sheen—even slight eggshell or satin—reflects light off roller overlap lines, drywall seams, and fastener dimples. Dedicated ceiling paint is formulated <strong>dead flat (0% to 2% sheen)</strong> to scatter light in all directions, rendering the ceiling completely seamless to the eye.
        </p>
      </section>

      {/* Interactive Tool Banner */}
      <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#163A5F] to-[#0D243B] text-white space-y-4 shadow-sm">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold tracking-wide">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#BCE5D6]" />
            Free Material Calculator
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold">
            Calculate Walls and Ceilings Together
          </h2>
          <p className="text-sm sm:text-base text-[#D5CEC2] max-w-xl leading-relaxed">
            Our Paint Calculator features a dedicated ceiling toggle. Calculate your wall paint and ceiling paint simultaneously with independent coat counts and coverage presets.
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
              Calculate entire room wall surfaces, perimeter formulas, and opening deductions.
            </p>
          </Link>

          <Link
            href="/guides/how-much-paint-do-i-need-for-2-coats"
            className="p-4 rounded-xl bg-white border border-[#E6DDD1] hover:border-[#0B6E54] transition-colors space-y-1 block group"
          >
            <div className="text-xs font-bold text-[#7A5B3E]">Coat Calculation</div>
            <div className="text-sm font-bold text-[#1A1918] group-hover:text-[#7A5B3E] transition-colors">
              How Much Paint Do I Need for 2 Coats?
            </div>
            <p className="text-xs text-[#6E675E]">
              Why coat 1 and coat 2 absorb differently, and realistic purchasing math.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
