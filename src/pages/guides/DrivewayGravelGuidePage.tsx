import { Link } from '../../context/NavigationContext';
import { GravelToolIcon } from '../../components/ToolIcons';
import { ArrowLeft, ArrowRight, Calculator, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';

export function DrivewayGravelGuidePage() {
  return (
    <main className="flex-1 max-w-4xl w-full mx-auto px-5 py-8 sm:py-12 space-y-10">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[#6E675E] font-sans">
        <Link href="/guides" className="hover:text-[#163A5F] transition-colors">Guides</Link>
        <span aria-hidden="true">/</span>
        <span className="text-[#1A1918] font-medium truncate">How Much Gravel Do I Need for a Driveway?</span>
      </nav>

      {/* Guide Header */}
      <header className="space-y-4 border-b border-[#E6DDD1] pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F4EDE4] text-[#7A5B3E] text-xs font-semibold uppercase tracking-wider">
          <GravelToolIcon className="w-4 h-4" />
          Driveway Planning Guide
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#1A1918] tracking-tight leading-tight">
          How Much Gravel Do I Need for a Driveway?
        </h1>
        <p className="text-lg sm:text-xl text-[#4E4942] font-sans leading-relaxed">
          How to measure driveway dimensions, calculate volume in cubic yards or cubic metres, convert to tons, and order the right amount without running short.
        </p>
      </header>

      {/* Quick Answer Summary Callout */}
      <section className="p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] border-2 border-[#163A5F]/20 shadow-[0_4px_20px_-2px_rgba(22,58,95,0.08)] space-y-3">
        <div className="flex items-center gap-2.5 text-[#163A5F]">
          <CheckCircle2 className="w-5 h-5 text-[#0B6E54] shrink-0" />
          <h2 className="text-lg font-display font-bold text-[#1A1918]">The Quick Answer</h2>
        </div>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          To calculate driveway gravel: multiply <strong>Length (ft) × Width (ft) × Depth (in feet)</strong>, divide by <strong>27</strong> to get cubic yards, and multiply by <strong>1.4</strong> to estimate tons. For example, a typical 50 ft long by 10 ft wide driveway with a 3-inch top layer requires <strong>4.6 cubic yards (approx. 6.5 tons)</strong>. For a brand-new driveway built from bare dirt, you need a heavier multi-layer base.
        </p>
        <div className="pt-2">
          <Link
            href="/tools/gravel-calculator"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0B6E54] hover:text-[#08503D] transition-colors"
          >
            <span>Calculate your exact driveway volume in the Measivo Gravel Calculator</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Section 1: The Three Measurements */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          The 3 Measurements You Need
        </h2>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          Ordering bulk aggregate requires three numbers: total length, average width, and target layer depth. Getting any of these three wrong by even a fraction causes noticeable errors when a dump truck drops stone on your lawn.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B6E54]">1. Length</span>
            <h3 className="text-base font-bold text-[#1A1918]">Measure the Centerline</h3>
            <p className="text-xs text-[#4E4942] leading-relaxed">
              Use a long 100-foot measuring tape or measuring wheel down the middle of the driveway. If your driveway curves, follow the curve rather than cutting a straight hypotenuse.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B6E54]">2. Width</span>
            <h3 className="text-base font-bold text-[#1A1918]">Take Multiple Width Checks</h3>
            <p className="text-xs text-[#4E4942] leading-relaxed">
              Standard single-car driveways measure 10 to 12 feet wide; two-car driveways measure 18 to 22 feet. Measure at the street, in the middle, and near the garage, then use the average.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B6E54]">3. Depth</span>
            <h3 className="text-base font-bold text-[#1A1918]">Refresh vs New Build</h3>
            <p className="text-xs text-[#4E4942] leading-relaxed">
              Refreshing an existing packed gravel driveway requires <strong>2 to 3 inches</strong> of top-dressing. A new driveway built on bare soil requires a <strong>6 to 10 inch</strong> excavated foundation.
            </p>
          </div>
        </div>

        {/* Responsive Diagram: Driveway Measurement & Volume */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-4">
          <div className="flex items-center justify-between border-b border-[#F0EAE1] pb-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#6E675E]">
              Visual Diagram: Dimensions to Volume Conversion
            </div>
            <span className="text-xs text-[#0B6E54] font-semibold">Step 1: Length × Width</span>
          </div>
          
          <div className="w-full">
            <svg viewBox="0 0 460 160" className="w-full h-auto block font-sans" aria-label="Driveway dimensions diagram">
              {/* Background ground */}
              <rect width="460" height="160" rx="10" fill="#FCFAF7" />

              {/* Overhead Driveway Surface */}
              <g transform="translate(15, 15)">
                {/* Road connection */}
                <rect x="0" y="24" width="36" height="96" rx="4" fill="#D5CEC2" stroke="#8E8578" strokeWidth="1.5" />
                <text x="18" y="78" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#5A5348" transform="rotate(-90, 18, 78)">STREET</text>

                {/* Driveway body */}
                <rect x="36" y="30" width="310" height="84" rx="4" fill="#E8DED1" stroke="#A89278" strokeWidth="2" />
                
                {/* Texture dots representing gravel */}
                <circle cx="80" cy="55" r="2.5" fill="#8E785F" opacity="0.6" />
                <circle cx="140" cy="75" r="3" fill="#8E785F" opacity="0.6" />
                <circle cx="200" cy="50" r="2" fill="#8E785F" opacity="0.6" />
                <circle cx="260" cy="90" r="2.5" fill="#8E785F" opacity="0.6" />
                <circle cx="310" cy="60" r="3" fill="#8E785F" opacity="0.6" />

                {/* Dimension Arrows */}
                {/* Length: Top */}
                <line x1="36" y1="14" x2="346" y2="14" stroke="#163A5F" strokeWidth="2" />
                <polygon points="36,14 46,9 46,19" fill="#163A5F" />
                <polygon points="346,14 336,9 336,19" fill="#163A5F" />
                <text x="191" y="8" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#163A5F">Length: 60 ft</text>

                {/* Width: Right side */}
                <line x1="362" y1="30" x2="362" y2="114" stroke="#163A5F" strokeWidth="2" />
                <polygon points="362,30 357,40 367,40" fill="#163A5F" />
                <polygon points="362,114 357,104 367,104" fill="#163A5F" />
                <text x="375" y="76" textAnchor="start" fontSize="12" fontWeight="bold" fill="#163A5F">Width: 12 ft</text>

                {/* Surface area text in center */}
                <text x="191" y="72" textAnchor="middle" fontSize="17" fontWeight="extrabold" fill="#1A1918">720 sq ft Area</text>
                <text x="191" y="90" textAnchor="middle" fontSize="12" fill="#5A5348">60 ft length × 12 ft width</text>
              </g>
            </svg>
          </div>

          {/* Depth Callout Box */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-[#FCFAF7] border-2 border-[#DFD5C6] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B6E54]">Step 2: Depth Conversion</span>
              <div className="text-sm font-bold text-[#1A1918]">Convert Depth to Feet Before Multiplying</div>
              <p className="text-xs text-[#4E4942]">Divide inches by 12: <strong>3 inches ÷ 12 = 0.25 feet</strong></p>
            </div>
            <div className="px-3 py-2 rounded-lg bg-[#EDF7F2] border border-[#BCE5D6] text-right shrink-0">
              <div className="text-xs text-[#6E675E]">Total Volume</div>
              <div className="text-base font-mono font-bold text-[#0B6E54]">720 × 0.25 = 180 cu ft (6.67 cu yd)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Step-by-Step Realistic Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          Realistic Example: Refreshing a 60 ft × 12 ft Driveway
        </h2>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          Suppose your driveway has an existing compacted base that has developed shallow wheel ruts and thin spots over the years. You want to apply a fresh 3-inch top dressing of crushed stone.
        </p>

        {/* Step-by-step breakdown */}
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#6E675E]">Step 1: Calculate Surface Area</span>
              <div className="text-sm font-semibold text-[#1A1918] mt-0.5">Length × Width</div>
              <div className="text-xs text-[#6E675E]">60 ft × 12 ft</div>
            </div>
            <div className="text-left sm:text-right font-mono font-bold text-lg text-[#1A1918]">
              720 sq ft
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#6E675E]">Step 2: Calculate Cubic Feet</span>
              <div className="text-sm font-semibold text-[#1A1918] mt-0.5">Area × Depth in Feet</div>
              <div className="text-xs text-[#6E675E]">720 sq ft × (3 inches ÷ 12) = 720 × 0.25 ft</div>
            </div>
            <div className="text-left sm:text-right font-mono font-bold text-lg text-[#1A1918]">
              180 cu ft
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#6E675E]">Step 3: Convert to Cubic Yards</span>
              <div className="text-sm font-semibold text-[#1A1918] mt-0.5">Divide Cubic Feet by 27</div>
              <div className="text-xs text-[#6E675E]">180 cu ft ÷ 27 (since 1 yard = 3×3×3 = 27 cu ft)</div>
            </div>
            <div className="text-left sm:text-right font-mono font-bold text-lg text-[#0B6E54]">
              6.67 cu yd
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#EDF7F2] border border-[#BCE5D6] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0B6E54]">Step 4: Add 10% Compaction Buffer &amp; Convert to Tons</span>
              <div className="text-sm font-semibold text-[#1A1918] mt-0.5">6.67 × 1.10 = 7.34 cu yd × 1.4 tons/yd</div>
              <div className="text-xs text-[#0B6E54]">Crushed stone compacts under vehicle traffic and wheel pressure</div>
            </div>
            <div className="text-left sm:text-right font-mono font-extrabold text-xl text-[#0B6E54]">
              ~10.3 Tons
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Why Compaction and Settling Matter */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          Why You Must Add a 10% Compaction Allowance
        </h2>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          When loose gravel is dumped out of a haul truck bed, it is fluffed with air pockets. Once spread and driven over by cars, trucks, or rolled with a plate compactor, loose rock settles significantly.
        </p>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          A fresh 3-inch layer of loose stone typically packs down into approximately 2.5 to 2.7 inches of firm surface. In addition, some gravel presses into soft spots in the sub-base, and minor material is pushed to the edges during spreading. If you purchase the exact mathematical volume without a 10% buffer, your finished driveway will end up thinner than planned.
        </p>

        <div className="p-4 rounded-xl bg-[#FFFBF0] border border-[#F0DCB8] flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-[#B88219] shrink-0 mt-0.5" />
          <div className="space-y-1 text-sm text-[#4E4942]">
            <strong className="text-[#1A1918] block">The Second Truckload Penalty</strong>
            <p>
              Ordering an extra ton of stone on your initial bulk delivery costs very little. If you come up short by just half a ton, however, scheduling a second small delivery triggers a full delivery fee ($75 to $150 minimum haul charge) that can exceed the cost of the stone itself.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Practical Delivery Units (Truckloads vs Tons) */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          Understanding Quarry Delivery: Yards vs Tons
        </h2>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          Quarries and landscape yards sell gravel by two different units depending on regional convention:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-2">
            <h3 className="text-base font-bold text-[#1A1918]">Sold by Weight (Tons)</h3>
            <p className="text-xs text-[#4E4942] leading-relaxed">
              Most bulk aggregate quarries weigh trucks on heavy-duty drive-on scales before and after loading. Standard crushed driveway stone (#57 limestone or granite) weighs approximately <strong>1.35 to 1.45 tons per cubic yard</strong>.
            </p>
            <p className="text-xs text-[#6E675E] pt-1">
              Read our guide on{' '}
              <Link href="/guides/how-many-tons-of-gravel-do-i-need" className="text-[#163A5F] underline font-medium">
                how many tons of gravel you need
              </Link>{' '}
              for specific stone density conversions.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-2">
            <h3 className="text-base font-bold text-[#1A1918]">Sold by Volume (Cubic Yards)</h3>
            <p className="text-xs text-[#4E4942] leading-relaxed">
              Many local garden and landscape supply centers sell by the scoop using front-end loaders with 1-yard or 1/2-yard buckets. One cubic yard covers <strong>108 square feet at 3 inches deep</strong> (or 81 sq ft at 4 inches deep).
            </p>
            <p className="text-xs text-[#6E675E] pt-1">
              A standard single-axle dump truck carries 5 to 7 cubic yards; a tandem dump truck carries 10 to 14 yards.
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
          Calculate Your Driveway in Seconds
        </h2>
        <p className="text-sm text-white/80 max-w-2xl leading-relaxed">
          Switch effortlessly between feet, meters, cubic yards, and estimated tonnage. Includes preset depths and custom area calculations.
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
            href="/guides/how-deep-should-driveway-gravel-be"
            className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] hover:border-[#163A5F]/40 transition-all group"
          >
            <div className="text-xs font-semibold text-[#0B6E54] uppercase tracking-wider">Depth Guide</div>
            <div className="text-base font-bold text-[#1A1918] group-hover:text-[#163A5F] transition-colors">
              How Deep Should Driveway Gravel Be? →
            </div>
            <p className="text-xs text-[#6E675E] mt-1">
              Compare 2-inch refreshes versus 8-inch layered new driveways.
            </p>
          </Link>

          <Link
            href="/guides/how-many-tons-of-gravel-do-i-need"
            className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] hover:border-[#163A5F]/40 transition-all group"
          >
            <div className="text-xs font-semibold text-[#0B6E54] uppercase tracking-wider">Weight &amp; Tonnage</div>
            <div className="text-base font-bold text-[#1A1918] group-hover:text-[#163A5F] transition-colors">
              How Many Tons of Gravel Do I Need? →
            </div>
            <p className="text-xs text-[#6E675E] mt-1">
              Convert cubic yards to tons with accurate stone density tables.
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
