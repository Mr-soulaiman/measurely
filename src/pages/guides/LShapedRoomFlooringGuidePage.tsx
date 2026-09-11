import { Link } from '../../context/NavigationContext';
import { FlooringToolIcon } from '../../components/ToolIcons';
import { ArrowLeft, ArrowRight, Calculator, CheckCircle2, Ruler, HelpCircle } from 'lucide-react';

export function LShapedRoomFlooringGuidePage() {
  return (
    <main className="flex-1 max-w-4xl w-full mx-auto px-5 py-8 sm:py-12 space-y-10">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[#6E675E] font-sans">
        <Link href="/guides" className="hover:text-[#163A5F] transition-colors">Guides</Link>
        <span aria-hidden="true">/</span>
        <span className="text-[#1A1918] font-medium truncate">How to Measure an L-Shaped Room for Flooring</span>
      </nav>

      {/* Guide Header */}
      <header className="space-y-4 border-b border-[#E6DDD1] pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EDF7F2] text-[#0B6E54] text-xs font-semibold uppercase tracking-wider">
          <Ruler className="w-3.5 h-3.5" />
          <span>Room Measuring Guide</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#1A1918] tracking-tight leading-tight">
          How to Measure an L-Shaped Room for Flooring
        </h1>
        <p className="text-lg sm:text-xl text-[#4E4942] font-sans leading-relaxed">
          The simple two-rectangle split method and subtraction trick to calculate exact square footage, doorway allowances, and box counts for irregular rooms.
        </p>
      </header>

      {/* Quick Answer */}
      <section className="p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] border-2 border-[#163A5F]/20 shadow-[0_4px_20px_-2px_rgba(22,58,95,0.08)] space-y-3">
        <div className="flex items-center gap-2.5 text-[#163A5F]">
          <CheckCircle2 className="w-5 h-5 text-[#0B6E54] shrink-0" />
          <h2 className="text-lg font-display font-bold text-[#1A1918]">The Quick Answer</h2>
        </div>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          Never measure an L-shaped room with a single length and width. Instead, draw an imaginary line across the room to <strong>divide the &ldquo;L&rdquo; into two separate rectangles</strong> (Section A and Section B). Calculate the square footage of each rectangle separately (Length × Width), then add them together. Add <strong>10% to 15% waste</strong> for the extra corner cuts.
        </p>
      </section>

      {/* Method 1: The Split Method with Diagram */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          Method 1: The Split Method (Simplest & Most Reliable)
        </h2>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          The easiest way to measure an irregular space is to turn it into two simple shapes you already know how to measure. Let us walk through an open-concept living and dining area with 6 walls.
        </p>

        {/* Visual 1: Split Room Diagram */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#6E675E]">
            Visual Diagram: Dividing the L-Room into Rectangle A and Rectangle B
          </div>
          <div className="w-full">
            <svg viewBox="0 0 540 330" className="w-full h-auto block font-sans" aria-label="L shaped room split measurement diagram">
              {/* Grid Background */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F0EAE1" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="540" height="330" fill="#FCFAF7" rx="10" />
              <rect width="540" height="330" fill="url(#grid)" rx="10" />

              {/* L-Shape Outline */}
              {/* Rectangle A (Main Area) */}
              <rect x="45" y="35" width="190" height="235" fill="#EDF7F2" stroke="#0B6E54" strokeWidth="2.5" />
              
              {/* Rectangle B (Nook Area) */}
              <rect x="235" y="125" width="240" height="145" fill="#F4EDE4" stroke="#163A5F" strokeWidth="2.5" />

              {/* Split Dotted Line between A and B */}
              <line x1="235" y1="125" x2="235" y2="270" stroke="#0B6E54" strokeWidth="2.5" strokeDasharray="6 4" />

              {/* Labels inside Section A */}
              <text x="140" y="130" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0B6E54">Section A</text>
              <text x="140" y="152" textAnchor="middle" fontSize="12" fill="#4E4942">11 ft × 13 ft</text>
              <text x="140" y="174" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1A1918">= 143 sq ft</text>

              {/* Labels inside Section B */}
              <text x="355" y="185" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#163A5F">Section B</text>
              <text x="355" y="207" textAnchor="middle" fontSize="12" fill="#4E4942">13 ft × 8 ft</text>
              <text x="355" y="229" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1A1918">= 104 sq ft</text>

              {/* Dimension Annotations */}
              {/* Wall 1: Top Wall of A (11 ft) */}
              <text x="140" y="25" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1A1918">11 ft (Top Wall)</text>

              {/* Wall 2: Left Wall of A (13 ft) */}
              <text x="25" y="155" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1A1918" transform="rotate(-90, 25, 155)">13 ft (Left)</text>

              {/* Wall 3: Bottom Total Wall */}
              <text x="260" y="295" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1A1918">Total Bottom Width = 24 ft</text>

              {/* Wall 4: Right Wall of B (8 ft) */}
              <text x="500" y="200" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1A1918" transform="rotate(90, 500, 200)">8 ft (Right)</text>

              {/* Wall 5: Top Step of B (13 ft) */}
              <text x="355" y="115" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1A1918">13 ft (Nook Wall)</text>

              {/* Wall 6: Inner Wall Step (5 ft) */}
              <text x="245" y="80" textAnchor="start" fontSize="11" fill="#6E675E">Inner Step = 5 ft</text>
            </svg>
          </div>
          <p className="text-xs text-[#6E675E] leading-relaxed">
            Measure the two sections separately: Section A (11 ft × 13 ft = 143 sq ft) plus Section B (13 ft × 8 ft = 104 sq ft) gives a net floor area of <strong>247 square feet</strong>.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <h3 className="text-xl font-display font-semibold text-[#1A1918]">Step-by-Step Walkthrough</h3>
          <ol className="space-y-2 text-base text-[#4E4942] font-sans list-decimal list-inside">
            <li><strong>Sketch the layout on paper:</strong> Stand in the room and draw a rough 6-sided L shape. You do not need to draw it to scale.</li>
            <li><strong>Measure all 6 wall segments:</strong> Measure along the baseboards from corner to corner. Always measure in feet and inches (e.g., 11 ft 2 in).</li>
            <li><strong>Pick your split line:</strong> Draw a dotted line on your sketch extending one of the inside corners to an outer wall. It does not matter whether you split vertically or horizontally—the total area is identical.</li>
            <li><strong>Calculate Section A:</strong> Multiply the length and width of the first rectangle.</li>
            <li><strong>Calculate Section B:</strong> Multiply the length and width of the second rectangle. Make sure you only use the length up to your dotted dividing line, not the full room length!</li>
            <li><strong>Add both totals:</strong> 143 sq ft + 104 sq ft = 247 sq ft.</li>
          </ol>
        </div>
      </section>

      {/* Method 2: The Subtraction Method */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          Method 2: The Subtraction Method (The Fast Cross-Check)
        </h2>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          Professional installers often use the <em>subtraction method</em> to double-check their tape measurements. Imagine your L-shaped room was a full, unbroken rectangle, then subtract the empty cut-out corner.
        </p>

        {/* Visual 2: Subtraction Diagram */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#6E675E]">
            Visual Check: Full Outer Box Minus Empty Corner
          </div>
          <div className="w-full">
            <svg viewBox="0 0 520 230" className="w-full h-auto block font-sans" aria-label="L shaped room subtraction check diagram">
              <rect width="520" height="230" fill="#FCFAF7" rx="10" />

              {/* Full Bounding Box: 24 ft wide by 13 ft tall */}
              <rect x="35" y="25" width="450" height="165" fill="#FFFFFF" stroke="#6E675E" strokeWidth="1.5" strokeDasharray="4 4" rx="6" />

              {/* Usable L-Room */}
              {/* Section A */}
              <rect x="35" y="25" width="200" height="165" fill="#EDF7F2" stroke="#0B6E54" strokeWidth="2" />
              {/* Section B */}
              <rect x="235" y="88" width="250" height="102" fill="#EDF7F2" stroke="#0B6E54" strokeWidth="2" />

              {/* Subtracted Corner */}
              <rect x="235" y="25" width="250" height="63" fill="#FCE8E6" stroke="#D32F2F" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="360" y="52" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#D32F2F">Subtracted Empty Corner</text>
              <text x="360" y="70" textAnchor="middle" fontSize="11" fill="#8C1D18">13 ft × 5 ft = 65 sq ft</text>

              {/* Bounding Box Labels */}
              <text x="260" y="16" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1A1918">Full Outer Length = 24 ft</text>
              <text x="20" y="112" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1A1918" transform="rotate(-90, 20, 112)">13 ft</text>
              <text x="260" y="212" textAnchor="middle" fontSize="12" fill="#4E4942">
                (24 ft × 13 ft = 312 sq ft) − 65 sq ft = <strong>247 sq ft</strong>
              </text>
            </svg>
          </div>
          <p className="text-xs text-[#6E675E]">
            Both methods arrive at the exact same number (247 sq ft). If your split calculation and subtraction calculation match, you know your measurements are 100% accurate.
          </p>
        </div>
      </section>

      {/* Doorways and Closets */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          Measuring Doorways and Transitions
        </h2>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          One spot DIYers regularly overlook in L-shaped rooms is doorway depth. Flooring does not stop at the wall; it extends halfway underneath the door slab so the transition molding is hidden when the door is closed.
        </p>
        <div className="p-4 rounded-xl bg-[#F6EFE6] border border-[#DFD5C6] space-y-2">
          <div className="flex items-center gap-2 text-sm font-bold text-[#1A1918]">
            <HelpCircle className="w-4 h-4 text-[#163A5F]" />
            <span>Rule of Thumb for Door Openings</span>
          </div>
          <p className="text-sm text-[#4E4942] leading-relaxed">
            For each standard interior door (30 to 36 inches wide in a 4.5-inch jamb wall), add approximately <strong>1 to 1.5 square feet</strong> to your room measurement. If your L-shaped room has three doorways (hallway, closet, bathroom), add 4 to 5 square feet to your total.
          </p>
        </div>
      </section>

      {/* Why L-Shaped Rooms Need 12-15% Waste */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          Why L-Shaped Rooms Require 12% to 15% Extra Material
        </h2>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          Standard rectangular rooms work well with a 10% waste buffer. However, in an L-shaped room, planks run continuously across an inside corner.
        </p>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          As you lay planks from the wide section into the narrow leg of the &ldquo;L&rdquo;, row lengths suddenly change. Planks that reach the inner wall must be cut along their length or notched around the corner. Because of this, we recommend bumping your order allowance to <strong>12% to 15%</strong>.
        </p>

        {/* Real-world box count calculation */}
        <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-2">
          <div className="text-xs font-bold uppercase text-[#0B6E54]">Putting It Together for Our 247 Sq Ft Room:</div>
          <ul className="space-y-1 text-sm text-[#4E4942]">
            <li>Net floor area = 247 sq ft</li>
            <li>Plus 12% waste factor (247 × 0.12) = 29.6 sq ft</li>
            <li>Total required flooring = <strong>276.6 sq ft</strong></li>
            <li>If boxes contain 20 sq ft each: 276.6 ÷ 20 = 13.83 → <strong>Order 14 boxes (280 sq ft)</strong></li>
          </ul>
        </div>

        {/* Direct Tool Link */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#EDF7F2] border border-[#BCE5D6] flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4">
          <div className="flex items-center gap-3">
            <FlooringToolIcon className="w-8 h-8 shrink-0" />
            <div>
              <div className="text-sm font-bold text-[#0B6E54]">Calculate your box count automatically</div>
              <div className="text-xs text-[#4E4942]">Add up your section square footages and get exact carton counts instantly.</div>
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
            href="/guides/what-flooring-waste-percentage-should-you-use"
            className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] hover:border-[#163A5F]/40 transition-all group"
          >
            <div className="text-xs font-semibold text-[#0B6E54] uppercase tracking-wider">Related Guide</div>
            <div className="text-base font-bold text-[#1A1918] group-hover:text-[#163A5F] transition-colors">
              What Flooring Waste Percentage Should You Use? →
            </div>
            <p className="text-xs text-[#6E675E] mt-1">
              Deep dive into 5%, 10%, 15%, and 20% waste scenarios.
            </p>
          </Link>

          <Link
            href="/guides/how-much-extra-flooring-should-you-buy"
            className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] hover:border-[#163A5F]/40 transition-all group"
          >
            <div className="text-xs font-semibold text-[#0B6E54] uppercase tracking-wider">Buying Advice</div>
            <div className="text-base font-bold text-[#1A1918] group-hover:text-[#163A5F] transition-colors">
              How Much Extra Flooring Should You Buy? →
            </div>
            <p className="text-xs text-[#6E675E] mt-1">
              Learn about attic stock, dye lot variations, and whole-box rounding.
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
