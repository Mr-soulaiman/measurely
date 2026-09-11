import { Link } from '../../context/NavigationContext';
import { FlooringToolIcon } from '../../components/ToolIcons';
import { ArrowLeft, ArrowRight, Calculator, CheckCircle2, DollarSign, Package } from 'lucide-react';

export function TenByTenFlooringGuidePage() {
  return (
    <main className="flex-1 max-w-4xl w-full mx-auto px-5 py-8 sm:py-12 space-y-10">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[#6E675E] font-sans">
        <Link href="/guides" className="hover:text-[#163A5F] transition-colors">Guides</Link>
        <span aria-hidden="true">/</span>
        <span className="text-[#1A1918] font-medium truncate">How Much Flooring for a 10×10 Room?</span>
      </nav>

      {/* Guide Header */}
      <header className="space-y-4 border-b border-[#E6DDD1] pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EDF7F2] text-[#0B6E54] text-xs font-semibold uppercase tracking-wider">
          <Package className="w-3.5 h-3.5" />
          <span>Real-World Room Example</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#1A1918] tracking-tight leading-tight">
          How Much Flooring Do I Need for a 10×10 Room?
        </h1>
        <p className="text-lg sm:text-xl text-[#4E4942] font-sans leading-relaxed">
          A complete real-world walkthrough of calculating square footage, waste allowance, and exact box counts for a 10-foot by 10-foot bedroom or home office.
        </p>
      </header>

      {/* Quick Answer */}
      <section className="p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] border-2 border-[#163A5F]/20 shadow-[0_4px_20px_-2px_rgba(22,58,95,0.08)] space-y-3">
        <div className="flex items-center gap-2.5 text-[#163A5F]">
          <CheckCircle2 className="w-5 h-5 text-[#0B6E54] shrink-0" />
          <h2 className="text-lg font-display font-bold text-[#1A1918]">The Quick Answer</h2>
        </div>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          A 10×10 foot room has a net floor area of <strong>100 square feet</strong>. Adding a standard 10% cutting waste allowance means you need <strong>110 square feet</strong> of flooring. Because flooring is sold in sealed cartons (typically 18 to 24 sq ft per carton), you will purchase <strong>5 to 6 full boxes</strong>.
        </p>
      </section>

      {/* Visual 1: 10x10 Room Plan with Waste Buffer */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          The Floor Area and Waste Calculation
        </h2>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          The basic math for a square bedroom or home office is straightforward:
        </p>

        {/* Visual Diagram: 10x10 Plan */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#6E675E]">
            Visual Diagram: 10 ft × 10 ft Layout with Waste Buffer
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            {/* Left: Room Floor Plan SVG */}
            <div className="p-3 bg-[#FCFAF7] rounded-xl border border-[#E6DDD1] flex flex-col items-center">
              <svg viewBox="0 0 240 240" className="w-full max-w-[220px] h-auto block font-sans" aria-label="10x10 room floor plan">
                {/* Room Square */}
                <rect x="25" y="25" width="190" height="190" rx="6" fill="#FFFFFF" stroke="#163A5F" strokeWidth="2.5" />
                
                {/* Simulated Planks */}
                {[55, 85, 115, 145, 175].map((y, i) => (
                  <line key={i} x1="25" y1={y} x2="215" y2={y} stroke="#F0EAE1" strokeWidth="1.5" />
                ))}

                {/* Dimension Labels */}
                <text x="120" y="16" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1A1918">10 ft width</text>
                <text x="14" y="125" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1A1918" transform="rotate(-90, 14, 125)">10 ft length</text>
                
                {/* Center text in room */}
                <text x="120" y="115" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#163A5F">100 Sq Ft</text>
                <text x="120" y="135" textAnchor="middle" fontSize="11" fill="#6E675E">Net Floor Area</text>

                {/* Door Opening */}
                <rect x="95" y="213" width="50" height="5" fill="#FFFFFF" stroke="#163A5F" strokeWidth="1" />
                <text x="120" y="233" textAnchor="middle" fontSize="10" fill="#6E675E">3 ft Door Opening</text>
              </svg>
            </div>

            {/* Right: Purchase Breakdown Card */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#EDF7F2] border border-[#BCE5D6] space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#0B6E54]">
                Purchase Breakdown
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-[#4E4942]">Measured Room Area:</span>
                  <span className="font-bold text-[#1A1918]">100 sq ft</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#4E4942]">+ 10% Cut &amp; Waste:</span>
                  <span className="font-bold text-[#0B6E54]">+10 sq ft</span>
                </div>
                <div className="pt-2 border-t border-[#BCE5D6] flex justify-between items-center">
                  <span className="font-bold text-[#1A1918]">Total Flooring Needed:</span>
                  <span className="font-extrabold text-base text-[#0B6E54]">110 sq ft</span>
                </div>
                <div className="pt-2 border-t border-[#BCE5D6] flex justify-between items-center">
                  <span className="text-xs text-[#6E675E]">Boxes to Buy (20 sf/box):</span>
                  <span className="font-bold text-xs text-[#1A1918]">6 boxes (120 sf)</span>
                </div>
              </div>
              <p className="text-xs text-[#6E675E] pt-1">
                Rounding up to 6 whole boxes gives you a full 10 sq ft spare box for future board replacements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual 2: The Box Packaging Math */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          Converting 110 Sq Ft to Actual Store Boxes
        </h2>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          Flooring retailers do not sell loose planks by the single square foot. You must buy sealed boxes, and each manufacturer uses a different box size based on plank width, thickness, and weight limits.
        </p>

        {/* Mobile View: Stacked Cards (No sliding needed on phones) */}
        <div className="sm:hidden space-y-3">
          {[
            {
              size: '18.5 sq ft',
              math: '110 ÷ 18.5 = 5.94',
              order: '6 boxes',
              purchased: '111.0 sq ft',
              buffer: '11.0 sq ft (~10%)',
            },
            {
              size: '20.0 sq ft',
              math: '110 ÷ 20.0 = 5.50',
              order: '6 boxes',
              purchased: '120.0 sq ft',
              buffer: '20.0 sq ft (1 full spare box)',
            },
            {
              size: '22.4 sq ft',
              math: '110 ÷ 22.4 = 4.91',
              order: '5 boxes',
              purchased: '112.0 sq ft',
              buffer: '12.0 sq ft (~11%)',
            },
            {
              size: '24.0 sq ft',
              math: '110 ÷ 24.0 = 4.58',
              order: '5 boxes',
              purchased: '120.0 sq ft',
              buffer: '20.0 sq ft (1 full spare box)',
            },
          ].map((item) => (
            <div
              key={item.size}
              className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-2.5 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#1A1918] text-base">{item.size} / box</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#EDF7F2] text-[#0B6E54] font-bold text-xs border border-[#BCE5D6]">
                  Order {item.order}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#F0EAE1] text-xs">
                <div>
                  <span className="text-[#6E675E] block text-[11px] uppercase tracking-wider font-semibold">Raw Math</span>
                  <span className="font-mono text-[#1A1918] font-medium">{item.math}</span>
                </div>
                <div>
                  <span className="text-[#6E675E] block text-[11px] uppercase tracking-wider font-semibold">Purchased</span>
                  <span className="font-mono text-[#1A1918] font-semibold">{item.purchased}</span>
                </div>
                <div className="col-span-2 pt-1 border-t border-[#F0EAE1]">
                  <span className="text-[#6E675E] text-[11px] uppercase tracking-wider font-semibold mr-1.5">Leftover Buffer:</span>
                  <span className="text-[#0B6E54] font-semibold">{item.buffer}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tablet & Desktop View: Table */}
        <div className="hidden sm:block rounded-xl border border-[#E6DDD1] overflow-hidden">
          <table className="w-full text-left text-sm font-sans bg-[#FFFFFF]">
            <thead className="bg-[#F6EFE6] border-b border-[#E6DDD1] text-[#1A1918] font-bold text-xs uppercase tracking-wider">
              <tr>
                <th className="p-3.5 sm:p-4">Box Size</th>
                <th className="p-3.5 sm:p-4">Math (110 ÷ Box)</th>
                <th className="p-3.5 sm:p-4">Boxes to Order</th>
                <th className="p-3.5 sm:p-4">Total Purchased</th>
                <th className="p-3.5 sm:p-4">Leftover Buffer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EAE1] text-[#4E4942]">
              <tr>
                <td className="p-3.5 sm:p-4 font-semibold text-[#1A1918]">18.5 sq ft / box</td>
                <td className="p-3.5 sm:p-4 font-mono text-xs">110 ÷ 18.5 = 5.94</td>
                <td className="p-3.5 sm:p-4 font-bold text-[#0B6E54]">6 boxes</td>
                <td className="p-3.5 sm:p-4 font-mono text-xs">111.0 sq ft</td>
                <td className="p-3.5 sm:p-4 text-xs">11.0 sq ft (~10%)</td>
              </tr>
              <tr className="bg-[#FBF9F5]">
                <td className="p-3.5 sm:p-4 font-semibold text-[#1A1918]">20.0 sq ft / box</td>
                <td className="p-3.5 sm:p-4 font-mono text-xs">110 ÷ 20.0 = 5.50</td>
                <td className="p-3.5 sm:p-4 font-bold text-[#0B6E54]">6 boxes</td>
                <td className="p-3.5 sm:p-4 font-mono text-xs">120.0 sq ft</td>
                <td className="p-3.5 sm:p-4 text-xs">20.0 sq ft (1 full box)</td>
              </tr>
              <tr>
                <td className="p-3.5 sm:p-4 font-semibold text-[#1A1918]">22.4 sq ft / box</td>
                <td className="p-3.5 sm:p-4 font-mono text-xs">110 ÷ 22.4 = 4.91</td>
                <td className="p-3.5 sm:p-4 font-bold text-[#0B6E54]">5 boxes</td>
                <td className="p-3.5 sm:p-4 font-mono text-xs">112.0 sq ft</td>
                <td className="p-3.5 sm:p-4 text-xs">12.0 sq ft (~11%)</td>
              </tr>
              <tr className="bg-[#FBF9F5]">
                <td className="p-3.5 sm:p-4 font-semibold text-[#1A1918]">24.0 sq ft / box</td>
                <td className="p-3.5 sm:p-4 font-mono text-xs">110 ÷ 24.0 = 4.58</td>
                <td className="p-3.5 sm:p-4 font-bold text-[#0B6E54]">5 boxes</td>
                <td className="p-3.5 sm:p-4 font-mono text-xs">120.0 sq ft</td>
                <td className="p-3.5 sm:p-4 text-xs">20.0 sq ft (1 full box)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs text-[#6E675E]">
          Notice that even if the raw math equals 5.1 boxes, you <strong>must round up to 6 boxes</strong>. Buying 5 boxes would give you only 100 sq ft or 102 sq ft, leaving you with zero room for perimeter cut waste.
        </p>
      </section>

      {/* Realistic Cost Estimates */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-[#0B6E54]" />
          <h2 className="text-2xl font-display font-bold text-[#1A1918]">
            Estimated Material Cost for a 10×10 Room
          </h2>
        </div>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          Flooring prices vary significantly based on material quality. Here is what you can expect to spend for 110 to 120 square feet of purchased material:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-2">
            <div className="text-xs font-semibold uppercase text-[#6E675E]">Laminate Flooring</div>
            <div className="text-xl font-display font-bold text-[#1A1918]">$1.50 – $3.50 / sq ft</div>
            <p className="text-xs text-[#4E4942]">
              <strong>Total: $170 – $400</strong><br />
              Budget-friendly, durable, snap-together DIY installation.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#EDF7F2] border border-[#BCE5D6] space-y-2">
            <div className="text-xs font-semibold uppercase text-[#0B6E54]">Luxury Vinyl Plank (LVP)</div>
            <div className="text-xl font-display font-bold text-[#0B6E54]">$2.50 – $5.50 / sq ft</div>
            <p className="text-xs text-[#4E4942]">
              <strong>Total: $280 – $660</strong><br />
              100% waterproof, click-lock, pre-attached acoustic underlayment.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-2">
            <div className="text-xs font-semibold uppercase text-[#6E675E]">Engineered Hardwood</div>
            <div className="text-xl font-display font-bold text-[#1A1918]">$5.00 – $10.00 / sq ft</div>
            <p className="text-xs text-[#4E4942]">
              <strong>Total: $570 – $1,150</strong><br />
              Real timber veneer surface, premium resale appeal.
            </p>
          </div>
        </div>
      </section>

      {/* 4 Practical Tips Before Buying */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          4 Practical Tips for a 10×10 Room Install
        </h2>
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-1">
            <h3 className="text-base font-bold text-[#1A1918]">1. Measure the exact wall lengths with baseboards removed</h3>
            <p className="text-sm text-[#4E4942]">
              Baseboards and shoe molding often take up 0.5 to 0.75 inches on every wall. If a room is nominally called 10×10, its actual subfloor might be 9 ft 10 in or 10 ft 2 in.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-1">
            <h3 className="text-base font-bold text-[#1A1918]">2. Check if the door opens inward</h3>
            <p className="text-sm text-[#4E4942]">
              New flooring plus underlayment adds 6 mm to 12 mm of thickness. Verify your door bottom clears the new floor, or plan to trim 1/4 inch off the bottom of the door slab.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-1">
            <h3 className="text-base font-bold text-[#1A1918]">3. Don&apos;t forget the doorway threshold</h3>
            <p className="text-sm text-[#4E4942]">
              You will need one transition strip (T-molding or reducer) where the room meets the hallway carpet or hardwood. Measure your door opening width (typically 30 or 32 inches).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-1">
            <h3 className="text-base font-bold text-[#1A1918]">4. Acclimate your planks for 48 hours</h3>
            <p className="text-sm text-[#4E4942]">
              Bring all 5 or 6 boxes inside the room 48 hours prior to installation so the planks adjust to your home&apos;s humidity and temperature.
            </p>
          </div>
        </div>

        {/* Direct Tool Link */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#EDF7F2] border border-[#BCE5D6] flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4">
          <div className="flex items-center gap-3">
            <FlooringToolIcon className="w-8 h-8 shrink-0" />
            <div>
              <div className="text-sm font-bold text-[#0B6E54]">Planning a different room size?</div>
              <div className="text-xs text-[#4E4942]">Enter your exact dimensions in our free calculator to see your box count.</div>
            </div>
          </div>
          <Link
            href="/tools/flooring-calculator"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0B6E54] text-white text-xs font-bold shadow-sm hover:bg-[#085541] transition-all whitespace-nowrap self-start sm:self-center"
          >
            <span>Open Flooring Calculator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Related Guides Footer */}
      <footer className="pt-6 border-t border-[#E6DDD1] space-y-6">
        <h3 className="text-lg font-display font-bold text-[#1A1918]">Related Flooring Guides</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/guides/how-much-extra-flooring-should-you-buy"
            className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] hover:border-[#163A5F]/40 transition-all group"
          >
            <div className="text-xs font-semibold text-[#0B6E54] uppercase tracking-wider">Buying Advice</div>
            <div className="text-base font-bold text-[#1A1918] group-hover:text-[#163A5F] transition-colors">
              How Much Extra Flooring Should You Buy? →
            </div>
            <p className="text-xs text-[#6E675E] mt-1">
              Why buying exact room dimensions leaves you short and how to plan attic stock.
            </p>
          </Link>

          <Link
            href="/guides/what-flooring-waste-percentage-should-you-use"
            className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] hover:border-[#163A5F]/40 transition-all group"
          >
            <div className="text-xs font-semibold text-[#0B6E54] uppercase tracking-wider">Waste Factor Guide</div>
            <div className="text-base font-bold text-[#1A1918] group-hover:text-[#163A5F] transition-colors">
              What Flooring Waste Percentage Should You Use? →
            </div>
            <p className="text-xs text-[#6E675E] mt-1">
              Compare 5%, 10%, 15%, and 20% waste scenarios by room layout and pattern.
            </p>
          </Link>
        </div>

        <div className="flex items-center justify-between pt-2 text-sm text-[#6E675E]">
          <Link href="/guides" className="inline-flex items-center gap-1.5 hover:text-[#163A5F]">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all guides</span>
          </Link>
          <Link href="/tools/flooring-calculator" className="inline-flex items-center gap-1.5 font-bold text-[#163A5F] hover:underline">
            <Calculator className="w-4 h-4" />
            <span>Open Flooring Calculator</span>
          </Link>
        </div>
      </footer>
    </main>
  );
}
