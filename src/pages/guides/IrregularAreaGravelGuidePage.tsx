import { Link } from '../../context/NavigationContext';
import { GravelToolIcon } from '../../components/ToolIcons';
import { ArrowLeft, ArrowRight, Calculator, CheckCircle2, AlertTriangle, Grid } from 'lucide-react';

export function IrregularAreaGravelGuidePage() {
  return (
    <main className="flex-1 max-w-4xl w-full mx-auto px-5 py-8 sm:py-12 space-y-10">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[#6E675E] font-sans">
        <Link href="/guides" className="hover:text-[#163A5F] transition-colors">Guides</Link>
        <span aria-hidden="true">/</span>
        <span className="text-[#1A1918] font-medium truncate">How to Calculate Gravel for an Irregular Area</span>
      </nav>

      {/* Guide Header */}
      <header className="space-y-4 border-b border-[#E6DDD1] pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F4EDE4] text-[#7A5B3E] text-xs font-semibold uppercase tracking-wider">
          <Grid className="w-4 h-4 text-[#7A5B3E]" />
          Area Measurement Guide
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#1A1918] tracking-tight leading-tight">
          How to Calculate Gravel for an Irregular Area
        </h1>
        <p className="text-lg sm:text-xl text-[#4E4942] font-sans leading-relaxed">
          How to divide L-shaped driveways, curved garden paths, and parking spurs into simple geometric shapes, calculate total square footage, and order the exact stone volume needed.
        </p>
      </header>

      {/* Quick Answer Summary Callout */}
      <section className="p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] border-2 border-[#163A5F]/20 shadow-[0_4px_20px_-2px_rgba(22,58,95,0.08)] space-y-3">
        <div className="flex items-center gap-2.5 text-[#163A5F]">
          <CheckCircle2 className="w-5 h-5 text-[#0B6E54] shrink-0" />
          <h2 className="text-lg font-display font-bold text-[#1A1918]">The Core Strategy</h2>
        </div>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          Do not try to calculate an odd-shaped space in a single step. <strong>Divide the irregular area into separate rectangles, triangles, or trapezoids</strong>. Calculate the square footage of each section individually, sum them together into a <strong>total surface area</strong>, and then apply your desired gravel depth to the combined total.
        </p>
        <div className="pt-2">
          <Link
            href="/tools/gravel-calculator"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0B6E54] hover:text-[#08503D] transition-colors"
          >
            <span>Enter your combined square footage directly into the Measivo Gravel Calculator</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Section 1: Why Standard Length x Width Fails */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          Why Single &quot;Length × Width&quot; Causes Massive Ordering Errors
        </h2>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          Real outdoor spaces rarely look like textbook rectangles. Driveways branch into hammerhead turnarounds or side parking pads; walkways curve gracefully around garden beds; and street entrances flare wide to allow car turning radiuses.
        </p>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          If you measure an L-shaped driveway by taking the longest overall length and multiplying by the widest overall width, you calculate the area of an imaginary giant box that includes land occupied by your lawn or house. This mistake regularly causes homeowners to over-order gravel by 30% to 50%, leaving thousands of pounds of unwanted stone sitting in their yards.
        </p>

        {/* Visual 1: Dividing an L-shaped space */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#6E675E]">
            Visual Guide: Splitting an L-Driveway with Turnaround
          </div>

          <div className="w-full">
            <svg viewBox="0 0 490 190" className="w-full h-auto block font-sans" aria-label="Dividing irregular driveway into rectangles">
              {/* Grid hint */}
              <defs>
                <pattern id="irreg-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F0EAE1" strokeWidth="0.8" />
                </pattern>
              </defs>
              <rect width="490" height="190" fill="url(#irreg-grid)" rx="10" />

              {/* Section A: Main Driveway Run (Width 10ft, Length 45ft) */}
              <g transform="translate(42, 22)">
                {/* Section A Rect */}
                <rect x="0" y="24" width="250" height="88" fill="#EDF7F2" stroke="#0B6E54" strokeWidth="2.5" rx="4" />
                
                {/* Labels for A */}
                <text x="125" y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0B6E54">Section A: Main Run</text>
                <text x="125" y="80" textAnchor="middle" fontSize="13" fontWeight="semibold" fill="#2C2720">45 ft × 10 ft = 450 sq ft</text>

                {/* Dimension: Length of A */}
                <line x1="0" y1="12" x2="250" y2="12" stroke="#163A5F" strokeWidth="2" />
                <polygon points="0,12 8,8 8,16" fill="#163A5F" />
                <polygon points="250,12 242,8 242,16" fill="#163A5F" />
                <text x="125" y="6" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#163A5F">45 ft Length</text>

                {/* Dimension: Width of A */}
                <line x1="-14" y1="24" x2="-14" y2="112" stroke="#163A5F" strokeWidth="2" />
                <polygon points="-14,24 -18,32 -10,32" fill="#163A5F" />
                <polygon points="-14,112 -18,104 -10,104" fill="#163A5F" />
                <text x="-20" y="72" textAnchor="end" fontSize="12" fontWeight="bold" fill="#163A5F">10 ft</text>
              </g>

              {/* Section B: Side Parking Spur / Turnaround */}
              <g transform="translate(292, 46)">
                {/* Dotted split boundary */}
                <line x1="0" y1="0" x2="0" y2="135" stroke="#0B6E54" strokeWidth="3" strokeDasharray="5 3" />
                
                {/* Section B Rect */}
                <rect x="0" y="0" width="150" height="135" fill="#F4EDE4" stroke="#7A5B3E" strokeWidth="2.5" rx="4" />

                {/* Labels for B */}
                <text x="75" y="62" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#7A5B3E">Section B: Turnaround</text>
                <text x="75" y="84" textAnchor="middle" fontSize="13" fontWeight="semibold" fill="#2C2720">16 ft × 14 ft = 224 sq ft</text>

                {/* Dimension: Width of B */}
                <line x1="0" y1="-12" x2="150" y2="-12" stroke="#7A5B3E" strokeWidth="2" />
                <polygon points="0,-12 8,-16 8,-8" fill="#7A5B3E" />
                <polygon points="150,-12 142,-16 142,-8" fill="#7A5B3E" />
                <text x="75" y="-18" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7A5B3E">16 ft Width</text>

                {/* Dimension: Length of B */}
                <line x1="162" y1="0" x2="162" y2="135" stroke="#7A5B3E" strokeWidth="2" />
                <polygon points="162,0 158,8 166,8" fill="#7A5B3E" />
                <polygon points="162,135 158,127 166,127" fill="#7A5B3E" />
                <text x="172" y="72" textAnchor="start" fontSize="12" fontWeight="bold" fill="#7A5B3E">14 ft</text>
              </g>
            </svg>
          </div>

          {/* Dedicated Result Banner */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-[#FCFAF7] border-2 border-[#DFD5C6] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B6E54]">Subdivided Total Area</span>
              <div className="text-sm font-bold text-[#1A1918]">Add Section A + Section B</div>
              <p className="text-xs text-[#4E4942]">450 sq ft (main travel lane) + 224 sq ft (parking spur)</p>
            </div>
            <div className="px-3.5 py-2 rounded-lg bg-[#EDF7F2] border border-[#BCE5D6] text-right shrink-0">
              <div className="text-xs text-[#6E675E]">Total Area</div>
              <div className="text-base font-mono font-bold text-[#0B6E54]">= 674 sq ft</div>
            </div>
          </div>

          <div className="text-xs text-[#6E675E] leading-relaxed">
            Notice how the dashed line cleanly separates the main travel lane from the side parking pad without double-counting the overlap corner.
          </div>
        </div>
      </section>

      {/* Section 2: Step-by-Step Realistic Calculation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          Step-by-Step Example: Calculating an L-Driveway
        </h2>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          Here is how to calculate the gravel volume and tonnage for the L-shaped layout shown above, planned at a uniform 3-inch depth:
        </p>

        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#0B6E54]">Section A: Main Run</div>
              <div className="text-sm font-semibold text-[#1A1918]">45 feet long × 10 feet wide</div>
            </div>
            <div className="font-mono font-bold text-base text-[#1A1918]">450 sq ft</div>
          </div>

          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#7A5B3E]">Section B: Turnaround Spur</div>
              <div className="text-sm font-semibold text-[#1A1918]">16 feet wide × 14 feet long</div>
            </div>
            <div className="font-mono font-bold text-base text-[#1A1918]">224 sq ft</div>
          </div>

          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#163A5F]">Total Combined Surface Area</div>
              <div className="text-sm font-semibold text-[#1A1918]">450 sq ft + 224 sq ft</div>
            </div>
            <div className="font-mono font-extrabold text-lg text-[#163A5F]">674 sq ft</div>
          </div>

          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#6E675E]">Apply Depth to Total Area</div>
              <div className="text-sm font-semibold text-[#1A1918]">674 sq ft × (3 in ÷ 12 ft = 0.25 ft) = 168.5 cu ft ÷ 27</div>
            </div>
            <div className="font-mono font-bold text-base text-[#0B6E54]">6.24 cubic yards</div>
          </div>

          <div className="p-4 rounded-xl bg-[#EDF7F2] border border-[#BCE5D6] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#0B6E54]">Weight + 10% Compaction Allowance</div>
              <div className="text-sm font-semibold text-[#1A1918]">6.24 cu yd × 1.10 = 6.86 cu yd × 1.4 tons/yd</div>
            </div>
            <div className="font-mono font-extrabold text-xl text-[#0B6E54]">~9.6 Tons</div>
          </div>
        </div>
      </section>

      {/* Section 3: Handling Curves, Road Flares, and Walkways */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          How to Measure Curves, Road Flares, and Circles
        </h2>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          Not all non-rectangular areas divide neatly into square corners. Use these quick geometry shortcuts for organic shapes:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B6E54]">Curved Pathways</span>
            <h3 className="text-base font-bold text-[#1A1918]">The Centerline Method</h3>
            <p className="text-xs text-[#4E4942] leading-relaxed">
              Lay a garden hose or rope along the exact center of the curve from start to finish. Measure the total length of the rope, then multiply by the path&apos;s uniform width.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B6E54]">Flared Road Aprons</span>
            <h3 className="text-base font-bold text-[#1A1918]">The Trapezoid Formula</h3>
            <p className="text-xs text-[#4E4942] leading-relaxed">
              Where your driveway meets the street, it often flares wider. Add the street width and the driveway width together, divide by 2 to get the average width, and multiply by the flare length.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B6E54]">Circular Firepits</span>
            <h3 className="text-base font-bold text-[#1A1918]">Radius Squared (πr²)</h3>
            <p className="text-xs text-[#4E4942] leading-relaxed">
              Measure across the circle to find the diameter, divide by 2 for the radius (r). Area = 3.14 × r × r. For a 14 ft diameter circle: 3.14 × 7 × 7 = 153.8 sq ft.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Common Measurement Traps */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          4 Common Mistakes to Avoid on Irregular Areas
        </h2>

        <div className="space-y-3 text-sm text-[#4E4942]">
          <div className="p-4 rounded-xl bg-[#FFFBF0] border border-[#F0DCB8] flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#B88219] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="text-[#1A1918] block font-semibold">1. Measuring the diagonal hypotenuse instead of perpendiculars</strong>
              <p className="text-xs leading-relaxed">
                When dividing a shape, every rectangle must meet at right angles (90 degrees). Measuring diagonally across an angled corner distorts your width calculations.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#FFFBF0] border border-[#F0DCB8] flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#B88219] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="text-[#1A1918] block font-semibold">2. Forgetting the street flare apron</strong>
              <p className="text-xs leading-relaxed">
                Homeowners often measure their driveway from garage to property line, forgetting the 10-to-15-foot flared apron that connects to the public asphalt. That flare can easily consume an extra ton of stone.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#FFFBF0] border border-[#F0DCB8] flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#B88219] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="text-[#1A1918] block font-semibold">3. Assuming uniform depth on new vs old sections</strong>
              <p className="text-xs leading-relaxed">
                If you are refreshing an existing driveway (needs 2&quot;) while simultaneously adding a brand-new side parking pad over raw dirt (needs 6&quot;–8&quot; foundation), do not combine their areas. Calculate the refresh section and the new excavation section as separate projects.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#FFFBF0] border border-[#F0DCB8] flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#B88219] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="text-[#1A1918] block font-semibold">4. Measuring down steep slopes along the ground</strong>
              <p className="text-xs leading-relaxed">
                If your driveway has a steep hill, measuring along the incline gives a slightly longer surface than the horizontal footprint, which requires slightly more stone to maintain a level, crowned driving surface.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tool Banner */}
      <section className="p-6 rounded-2xl bg-gradient-to-br from-[#163A5F] to-[#0D243B] text-white space-y-3">
        <div className="flex items-center gap-2 text-[#80D4B6]">
          <Calculator className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Measivo Online Tool</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
          Use the Custom Area Feature
        </h2>
        <p className="text-sm text-white/80 max-w-2xl leading-relaxed">
          Once you sum the square footage of your irregular sections, select the &quot;Total Area&quot; mode in the Measivo Gravel Calculator to get your volume and truckload count immediately.
        </p>
        <div className="pt-2">
          <Link
            href="/tools/gravel-calculator"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFFFFF] text-[#163A5F] font-bold text-sm hover:bg-[#F6EFE6] transition-colors shadow-sm"
          >
            <span>Open Free Gravel Calculator</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Related Guides & Next Steps */}
      <footer className="pt-6 border-t border-[#E6DDD1] space-y-6">
        <h3 className="text-lg font-display font-bold text-[#1A1918]">Related Guides</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/guides/how-much-gravel-do-i-need-for-a-driveway"
            className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] hover:border-[#163A5F]/40 transition-all group"
          >
            <div className="text-xs font-semibold text-[#0B6E54] uppercase tracking-wider">Driveway Planning</div>
            <div className="text-base font-bold text-[#1A1918] group-hover:text-[#163A5F] transition-colors">
              How Much Gravel for a Driveway? →
            </div>
            <p className="text-xs text-[#6E675E] mt-1">
              Length, width, depth formulas, and delivery truck capacities.
            </p>
          </Link>

          <Link
            href="/guides/how-deep-should-driveway-gravel-be"
            className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] hover:border-[#163A5F]/40 transition-all group"
          >
            <div className="text-xs font-semibold text-[#0B6E54] uppercase tracking-wider">Depth Guide</div>
            <div className="text-base font-bold text-[#1A1918] group-hover:text-[#163A5F] transition-colors">
              How Deep Should Driveway Gravel Be? →
            </div>
            <p className="text-xs text-[#6E675E] mt-1">
              Find the right layer depth for surface refreshes and new base builds.
            </p>
          </Link>
        </div>

        <div className="flex items-center justify-between pt-2 text-sm text-[#6E675E]">
          <Link href="/guides" className="inline-flex items-center gap-1.5 hover:text-[#163A5F]">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all guides</span>
          </Link>
          <Link href="/tools/gravel-calculator" className="inline-flex items-center gap-1.5 font-bold text-[#163A5F] hover:underline">
            <Calculator className="w-4 h-4" />
            <span>Open Gravel Calculator</span>
          </Link>
        </div>
      </footer>
    </main>
  );
}
