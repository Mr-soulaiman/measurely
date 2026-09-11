import { Link } from '../../context/NavigationContext';
import { GravelToolIcon } from '../../components/ToolIcons';
import { ArrowLeft, ArrowRight, Calculator, CheckCircle2, AlertTriangle, Scale } from 'lucide-react';

export function TonsOfGravelGuidePage() {
  return (
    <main className="flex-1 max-w-4xl w-full mx-auto px-5 py-8 sm:py-12 space-y-10">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[#6E675E] font-sans">
        <Link href="/guides" className="hover:text-[#163A5F] transition-colors">Guides</Link>
        <span aria-hidden="true">/</span>
        <span className="text-[#1A1918] font-medium truncate">How Many Tons of Gravel Do I Need?</span>
      </nav>

      {/* Guide Header */}
      <header className="space-y-4 border-b border-[#E6DDD1] pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F4EDE4] text-[#7A5B3E] text-xs font-semibold uppercase tracking-wider">
          <Scale className="w-4 h-4 text-[#7A5B3E]" />
          Weight &amp; Tonnage Guide
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#1A1918] tracking-tight leading-tight">
          How Many Tons of Gravel Do I Need?
        </h1>
        <p className="text-lg sm:text-xl text-[#4E4942] font-sans leading-relaxed">
          How to convert cubic yards or cubic metres of stone into short tons or metric tonnes, how rock density and moisture affect your order, and how to get an accurate quarry estimate.
        </p>
      </header>

      {/* Quick Answer Summary Callout */}
      <section className="p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] border-2 border-[#163A5F]/20 shadow-[0_4px_20px_-2px_rgba(22,58,95,0.08)] space-y-3">
        <div className="flex items-center gap-2.5 text-[#163A5F]">
          <CheckCircle2 className="w-5 h-5 text-[#0B6E54] shrink-0" />
          <h2 className="text-lg font-display font-bold text-[#1A1918]">The Quick Rule of Thumb</h2>
        </div>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          As a practical general rule: <strong>1 cubic yard of standard driveway gravel weighs approximately 1.4 US tons (2,800 lbs)</strong>. In metric units, <strong>1 cubic metre of gravel weighs roughly 1.5 to 1.7 metric tonnes (1,500 to 1,700 kg)</strong>. To estimate tons: calculate your total cubic yards, multiply by 1.4, and add 10% for compaction and waste.
        </p>
        <div className="pt-2">
          <Link
            href="/tools/gravel-calculator"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0B6E54] hover:text-[#08503D] transition-colors"
          >
            <span>Convert your area directly to tons in the Measivo Gravel Calculator</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Section 1: Volume vs Weight */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          Volume vs Weight: Why They Are Not the Same
        </h2>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          When you measure your driveway, patio, or garden bed with a tape measure, you calculate <strong>volume</strong> (physical space measured in cubic feet, cubic yards, or cubic metres). However, commercial quarries do not sell gravel by volume scoops—they weigh massive haul trucks on certified drive-on platform scales and charge by the <strong>ton (2,000 lbs)</strong> or <strong>metric tonne (1,000 kg)</strong>.
        </p>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          This bridge between volume and weight is called <strong>bulk density</strong>. Depending on the size of the stones and the mineral they are mined from (granite, limestone, quartz, or basalt), one cubic yard can weigh anywhere from 2,400 to 3,100 pounds.
        </p>

        {/* Visual 1: Conversion Flow Diagram */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-5">
          <div className="flex items-center justify-between border-b border-[#F0EAE1] pb-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#6E675E]">
              Visual Flow: How Volume Translates into Quarry Weight
            </div>
            <span className="text-xs text-[#0B6E54] font-semibold">3-Step Conversion</span>
          </div>

          {/* Large Responsive Flow Cards (Stacked on mobile, 3-column on desktop) */}
          <div className="space-y-3 md:space-y-0 md:grid md:grid-cols-3 md:gap-4 items-stretch">
            {/* Step 1: Physical Space */}
            <div className="rounded-2xl border-2 border-[#DFD5C6] bg-[#FCFAF7] p-5 flex flex-col items-center text-center space-y-3 shadow-sm">
              <div className="w-full flex items-center justify-between border-b border-[#EFE8DC] pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7A5B3E]">1. Physical Space</span>
                <span className="px-2 py-0.5 rounded-full bg-[#F6EFE6] text-[#7A5B3E] text-[11px] font-bold">Tape Measure</span>
              </div>

              {/* Large 3D Isometric Cube Graphic */}
              <div className="w-24 h-24 flex items-center justify-center my-1">
                <svg viewBox="0 0 100 100" className="w-20 h-20 drop-shadow-sm" aria-hidden="true">
                  {/* Top face */}
                  <polygon points="50,15 85,32 50,49 15,32" fill="#E8DED1" stroke="#A89278" strokeWidth="2" strokeLinejoin="round" />
                  {/* Left face */}
                  <polygon points="15,32 50,49 50,85 15,68" fill="#D3C3AD" stroke="#8E785F" strokeWidth="2" strokeLinejoin="round" />
                  {/* Right face */}
                  <polygon points="50,49 85,32 85,68 50,85" fill="#BAA993" stroke="#8E785F" strokeWidth="2" strokeLinejoin="round" />
                  {/* Dimension hint lines */}
                  <line x1="12" y1="28" x2="48" y2="10" stroke="#163A5F" strokeWidth="1.5" strokeDasharray="3 2" />
                  <line x1="88" y1="36" x2="88" y2="64" stroke="#163A5F" strokeWidth="1.5" strokeDasharray="3 2" />
                </svg>
              </div>

              <div className="space-y-1">
                <div className="text-lg font-display font-bold text-[#1A1918]">Cubic Yards / m³</div>
                <div className="text-xs font-mono font-semibold text-[#6E675E]">Length × Width × Depth</div>
                <p className="text-xs text-[#4E4942] pt-1 leading-relaxed">
                  The physical volume calculated from your job site measurements.
                </p>
              </div>
            </div>

            {/* Mobile Downward Connector 1 */}
            <div className="md:hidden flex justify-center py-0.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDF7F2] border border-[#BCE5D6] text-[#0B6E54] text-xs font-bold shadow-xs">
                <span>↓</span>
                <span>Multiply by Material Bulk Density</span>
                <span className="font-mono text-sm font-black">×</span>
              </div>
            </div>

            {/* Step 2: Bulk Density */}
            <div className="rounded-2xl border-2 border-[#0B6E54] bg-[#FCFAF7] p-5 flex flex-col items-center text-center space-y-3 shadow-sm relative">
              <div className="w-full flex items-center justify-between border-b border-[#EFE8DC] pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0B6E54]">2. Bulk Density</span>
                <span className="px-2 py-0.5 rounded-full bg-[#EDF7F2] text-[#0B6E54] text-[11px] font-bold">Stone Factor</span>
              </div>

              {/* Large Density Circle Graphic */}
              <div className="w-24 h-24 flex items-center justify-center my-1">
                <div className="w-20 h-20 rounded-full bg-[#F4EDE4] border-3 border-[#0B6E54] flex flex-col items-center justify-center shadow-inner">
                  <span className="text-sm font-mono font-black text-[#0B6E54] tracking-tight">~1.40</span>
                  <span className="text-[10px] font-semibold text-[#5A5348] uppercase tracking-tighter">Tons / Yard</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-lg font-display font-bold text-[#0B6E54]">Density Factor</div>
                <div className="text-xs font-semibold text-[#5A5348]">1.40 t/yd³ (1.60 tonnes/m³)</div>
                <p className="text-xs text-[#4E4942] pt-1 leading-relaxed">
                  Varies by rock type and how tightly stone particles pack together.
                </p>
              </div>
            </div>

            {/* Mobile Downward Connector 2 */}
            <div className="md:hidden flex justify-center py-0.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDF7F2] border border-[#BCE5D6] text-[#0B6E54] text-xs font-bold shadow-xs">
                <span>↓</span>
                <span>Yields Delivered Certified Weight</span>
                <span className="font-mono text-sm font-black">=</span>
              </div>
            </div>

            {/* Step 3: Quarry Weight */}
            <div className="rounded-2xl border-2 border-[#163A5F] bg-[#EDF7F2] p-5 flex flex-col items-center text-center space-y-3 shadow-sm">
              <div className="w-full flex items-center justify-between border-b border-[#BCE5D6] pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#163A5F]">3. Quarry Weight</span>
                <span className="px-2 py-0.5 rounded-full bg-[#163A5F] text-white text-[11px] font-bold">Scale Ticket</span>
              </div>

              {/* Large Scale Delivery Truck Graphic */}
              <div className="w-24 h-24 flex items-center justify-center my-1">
                <svg viewBox="0 0 100 80" className="w-22 h-18 drop-shadow-sm" aria-hidden="true">
                  {/* Ground scale platform */}
                  <rect x="5" y="65" width="90" height="5" rx="2" fill="#8E8578" />
                  <rect x="15" y="70" width="10" height="4" fill="#6E675E" />
                  <rect x="75" y="70" width="10" height="4" fill="#6E675E" />
                  {/* Truck dump body */}
                  <path d="M 12 25 L 62 25 L 62 55 L 12 55 Z" fill="#163A5F" rx="3" />
                  {/* Cab */}
                  <path d="M 64 35 L 80 35 L 86 48 L 86 55 L 64 55 Z" fill="#205080" />
                  <rect x="68" y="38" width="12" height="9" rx="1" fill="#E8DED1" />
                  {/* SCALE text */}
                  <rect x="18" y="32" width="38" height="15" rx="2" fill="#0D243B" />
                  <text x="37" y="43" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#FFFFFF" letterSpacing="1">SCALE</text>
                  {/* Wheels */}
                  <circle cx="25" cy="58" r="8" fill="#1A1918" />
                  <circle cx="25" cy="58" r="3.5" fill="#D5CEC2" />
                  <circle cx="48" cy="58" r="8" fill="#1A1918" />
                  <circle cx="48" cy="58" r="3.5" fill="#D5CEC2" />
                  <circle cx="76" cy="58" r="8" fill="#1A1918" />
                  <circle cx="76" cy="58" r="3.5" fill="#D5CEC2" />
                </svg>
              </div>

              <div className="space-y-1">
                <div className="text-lg font-display font-bold text-[#1A1918]">Tons to Order</div>
                <div className="text-xs font-semibold text-[#0B6E54]">+ 10% Compaction buffer</div>
                <p className="text-xs text-[#4E4942] pt-1 leading-relaxed">
                  The actual tonnage billed by the quarry on drive-on platform scales.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 text-xs text-[#6E675E] leading-relaxed border-t border-[#F0EAE1]">
            <strong>Summary Formula:</strong> Volume (Cubic Yards) × Material Density (~1.4 Tons/yd) × 1.10 (Compaction buffer) = Total Tons to Order.
          </div>
        </div>
      </section>

      {/* Section 2: Density Comparison by Material Type */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          Different Gravel Types Weigh Different Amounts
        </h2>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          Why doesn&apos;t every gravel have the exact same weight per yard? The answer lies in <strong>air voids</strong>. When stones are uniformly sized and washed, there is empty air between each rock. When stone dust and small fines are mixed in, those voids are filled, creating a substantially heavier material.
        </p>

        {/* Responsive Stone Density Comparison Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6E675E]">Rounded &amp; Uniform</span>
            <h3 className="text-base font-bold text-[#1A1918]">Pea Gravel</h3>
            <div className="font-mono text-xl font-extrabold text-[#0B6E54]">
              ~1.35 Tons <span className="text-xs font-normal text-[#6E675E]">/ cu yd</span>
            </div>
            <p className="text-xs text-[#4E4942] leading-relaxed">
              Rounded river pebbles (3/8&quot;) pack loosely with substantial air space. 1 cubic metre weighs approx. 1,600 kg (1.6 tonnes).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B6E54]">Most Common Driveway</span>
            <h3 className="text-base font-bold text-[#1A1918]">#57 Crushed Stone</h3>
            <div className="font-mono text-xl font-extrabold text-[#0B6E54]">
              ~1.42 Tons <span className="text-xs font-normal text-[#6E675E]">/ cu yd</span>
            </div>
            <p className="text-xs text-[#4E4942] leading-relaxed">
              Angular 3/4-inch crushed limestone or granite. The jagged edges interlock, giving it moderate density. Approx. 1,680 kg per m³.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7A5B3E]">Heavy Binding Base</span>
            <h3 className="text-base font-bold text-[#1A1918]">Crusher Run / Dense Graded</h3>
            <div className="font-mono text-xl font-extrabold text-[#7A5B3E]">
              ~1.55 Tons <span className="text-xs font-normal text-[#6E675E]">/ cu yd</span>
            </div>
            <p className="text-xs text-[#4E4942] leading-relaxed">
              Crushed stone mixed with stone dust. Because fine particles fill all voids, it is significantly heavier. Approx. 1,840 kg per m³.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Step-by-Step Calculation Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          Step-by-Step Calculation: A 20 ft × 20 ft Parking Pad
        </h2>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          Let&apos;s walk through a complete real-world example so you can see how the units convert from your tape measure to the scale ticket.
        </p>

        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#6E675E]">1. Surface Area</div>
              <div className="text-sm font-semibold text-[#1A1918]">20 ft length × 20 ft width</div>
            </div>
            <div className="font-mono font-bold text-lg text-[#1A1918]">400 sq ft</div>
          </div>

          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#6E675E]">2. Volume at 3 Inches Depth</div>
              <div className="text-sm font-semibold text-[#1A1918]">400 sq ft × (3 ÷ 12 ft) = 100 cu ft ÷ 27</div>
            </div>
            <div className="font-mono font-bold text-lg text-[#1A1918]">3.70 cubic yards</div>
          </div>

          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#6E675E]">3. Raw Weight (at 1.4 tons/yd)</div>
              <div className="text-sm font-semibold text-[#1A1918]">3.70 cu yd × 1.4 tons/yd</div>
            </div>
            <div className="font-mono font-bold text-lg text-[#0B6E54]">5.18 tons</div>
          </div>

          <div className="p-4 rounded-xl bg-[#EDF7F2] border border-[#BCE5D6] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#0B6E54]">4. Add 10% Compaction &amp; Round Up</div>
              <div className="text-sm font-semibold text-[#1A1918]">5.18 tons × 1.10 = 5.70 tons → Round to safe order</div>
            </div>
            <div className="font-mono font-extrabold text-xl text-[#0B6E54]">6.0 Tons to Order</div>
          </div>
        </div>
      </section>

      {/* Section 4: Why Delivered Weight Can Vary */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          Why Delivered Quarry Weight Varies in the Real World
        </h2>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          No online calculator can tell you down to the exact single pound what a delivery truck will register on the scale. When you order gravel, keep these three physical factors in mind:
        </p>

        <div className="space-y-3 text-sm text-[#4E4942]">
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-1">
            <strong className="text-[#1A1918] block font-semibold">Moisture &amp; Rainwater Content</strong>
            <p className="text-xs leading-relaxed">
              Quarry stockpiles sit outdoors under open skies. After a heavy rainfall, fine aggregate and stone dust absorb significant water. Wet gravel can weigh 5% to 8% more than completely dry stone. When you buy by weight on a rainy morning, a fraction of what you purchase is water.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-1">
            <strong className="text-[#1A1918] block font-semibold">Rock Mineral Variations</strong>
            <p className="text-xs leading-relaxed">
              Limestone is typically lighter than dense igneous basalt or granite. A quarry in Indiana mining sedimentary dolomite will have slightly different density specs than a quarry in North Carolina crushing blue granite.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-1">
            <strong className="text-[#1A1918] block font-semibold">Loader Bucket Precision</strong>
            <p className="text-xs leading-relaxed">
              When a quarry operator scoops gravel into a dump truck, each front-end loader bucket holds 2 to 4 tons. Operators aim close to your requested tonnage, but delivery tickets routinely vary by 0.2 to 0.5 tons above or below your target. You are billed for the exact weight on the scale ticket.
            </p>
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
          Calculate Both Volume and Weight Instantly
        </h2>
        <p className="text-sm text-white/80 max-w-2xl leading-relaxed">
          The Measivo Gravel Calculator automatically provides your result in cubic feet, cubic yards, metric tonnes, and US tons so you can speak your local supplier&apos;s language.
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
              Length, width, and depth measuring guide with real truckload capacities.
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
              Why adding just 1 inch of depth increases your delivery weight by tons.
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
