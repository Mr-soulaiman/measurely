import { Link } from '../../context/NavigationContext';
import { FlooringToolIcon } from '../../components/ToolIcons';
import { ArrowLeft, ArrowRight, Calculator, CheckCircle2, AlertTriangle } from 'lucide-react';

export function ExtraFlooringGuidePage() {
  return (
    <main className="flex-1 max-w-4xl w-full mx-auto px-5 py-8 sm:py-12 space-y-10">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[#6E675E] font-sans">
        <Link href="/guides" className="hover:text-[#163A5F] transition-colors">Guides</Link>
        <span aria-hidden="true">/</span>
        <span className="text-[#1A1918] font-medium truncate">How Much Extra Flooring Should You Buy?</span>
      </nav>

      {/* Guide Header */}
      <header className="space-y-4 border-b border-[#E6DDD1] pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EDF7F2] text-[#0B6E54] text-xs font-semibold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-[#0B6E54]" />
          Flooring Buying Advice
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#1A1918] tracking-tight leading-tight">
          How Much Extra Flooring Should You Buy?
        </h1>
        <p className="text-lg sm:text-xl text-[#4E4942] font-sans leading-relaxed">
          Why buying exact room dimensions leaves DIYers stranded midway through an install, how cut scraps affect your order, and how to calculate your final box count.
        </p>
      </header>

      {/* Quick Answer Callout */}
      <section className="p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] border-2 border-[#163A5F]/20 shadow-[0_4px_20px_-2px_rgba(22,58,95,0.08)] space-y-3">
        <div className="flex items-center gap-2.5 text-[#163A5F]">
          <CheckCircle2 className="w-5 h-5 text-[#0B6E54] shrink-0" />
          <h2 className="text-lg font-display font-bold text-[#1A1918]">The Short Answer</h2>
        </div>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          For a standard rectangular room installing vinyl plank (LVP), laminate, or engineered hardwood, buy <strong>10% extra</strong> over your measured square footage. If your space has odd angles, multiple doorways, or diagonal walls, increase that to <strong>15%</strong>. For herringbone patterns, plan for <strong>20%</strong>. Finally, always round up to the nearest whole box.
        </p>
      </section>

      {/* Visual 1: What happens to planks when cutting */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          Why You Cannot Buy Just the Room&apos;s Exact Square Footage
        </h2>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          If your bedroom measures 12 feet by 15 feet, the floor area is exactly 180 square feet. If you buy exactly 180 square feet of flooring, you will run out before completing the last two rows.
        </p>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          This happens because flooring planks are manufactured in fixed lengths (usually 36 to 48 inches). When you reach the opposite wall at the end of each row, you must cut the plank to fit. Some cut pieces can start the next row, but many end up unusable.
        </p>

        {/* Diagram 1: Plank Cutting & Scrap Reality */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#6E675E]">
            Visual Diagram: Where Material Is Lost During Installation
          </div>
          <div className="w-full">
            <svg viewBox="0 0 460 176" className="w-full h-auto block font-sans" aria-label="Plank cutting waste diagram">
              {/* Room perimeter */}
              <rect x="6" y="6" width="448" height="164" rx="10" fill="#FBF9F5" stroke="#DFD5C6" strokeWidth="2" />
              
              {/* Wall Labels */}
              <text x="230" y="21" textAnchor="middle" fill="#6E675E" fontSize="11" fontWeight="700" letterSpacing="0.5">STARTING WALL</text>
              <text x="230" y="162" textAnchor="middle" fill="#6E675E" fontSize="11" fontWeight="700" letterSpacing="0.5">ENDING WALL (CUT ROW)</text>
              
              {/* Row 1 */}
              <g transform="translate(18, 28)">
                <rect x="0" y="0" width="136" height="34" rx="4" fill="#E2D4C1" stroke="#A89278" strokeWidth="1.5" />
                <text x="68" y="21" textAnchor="middle" fontSize="11" fontWeight="600" fill="#3D372E">Full Plank (48&quot;)</text>
                
                <rect x="142" y="0" width="136" height="34" rx="4" fill="#E2D4C1" stroke="#A89278" strokeWidth="1.5" />
                <text x="210" y="21" textAnchor="middle" fontSize="11" fontWeight="600" fill="#3D372E">Full Plank (48&quot;)</text>
                
                <rect x="284" y="0" width="86" height="34" rx="4" fill="#E2D4C1" stroke="#A89278" strokeWidth="1.5" />
                <text x="327" y="21" textAnchor="middle" fontSize="10" fontWeight="600" fill="#3D372E">Full Plank</text>
                
                <rect x="375" y="0" width="48" height="34" rx="4" fill="#F1C2B0" stroke="#C45A3C" strokeWidth="1.5" strokeDasharray="3 2" />
                <text x="399" y="21" textAnchor="middle" fontSize="10" fontWeight="700" fill="#942D15">Scrap</text>
              </g>

              {/* Row 2 - Staggered */}
              <g transform="translate(18, 68)">
                <rect x="0" y="0" width="76" height="34" rx="4" fill="#D3C3AD" stroke="#8E785F" strokeWidth="1.5" />
                <text x="38" y="21" textAnchor="middle" fontSize="10" fontWeight="700" fill="#2C2720">Starter</text>
                
                <rect x="82" y="0" width="136" height="34" rx="4" fill="#E2D4C1" stroke="#A89278" strokeWidth="1.5" />
                <text x="150" y="21" textAnchor="middle" fontSize="11" fontWeight="600" fill="#3D372E">Full Plank (48&quot;)</text>
                
                <rect x="224" y="0" width="136" height="34" rx="4" fill="#E2D4C1" stroke="#A89278" strokeWidth="1.5" />
                <text x="292" y="21" textAnchor="middle" fontSize="11" fontWeight="600" fill="#3D372E">Full Plank (48&quot;)</text>
                
                <rect x="365" y="0" width="58" height="34" rx="4" fill="#F1C2B0" stroke="#C45A3C" strokeWidth="1.5" strokeDasharray="3 2" />
                <text x="394" y="21" textAnchor="middle" fontSize="10" fontWeight="700" fill="#942D15">Cut (&lt;8&quot;)</text>
              </g>

              {/* Row 3 - Doorway Obstacle */}
              <g transform="translate(18, 108)">
                <rect x="0" y="0" width="126" height="34" rx="4" fill="#E2D4C1" stroke="#A89278" strokeWidth="1.5" />
                <text x="63" y="21" textAnchor="middle" fontSize="11" fontWeight="600" fill="#3D372E">Full Plank</text>
                
                <rect x="132" y="0" width="126" height="34" rx="4" fill="#E2D4C1" stroke="#A89278" strokeWidth="1.5" />
                <text x="195" y="21" textAnchor="middle" fontSize="11" fontWeight="600" fill="#3D372E">Full Plank</text>
                
                {/* Notched plank around door trim */}
                <path d="M 264 0 L 360 0 L 360 12 L 372 12 L 372 34 L 264 34 Z" fill="#F9E2AF" stroke="#B88219" strokeWidth="1.5" />
                <text x="314" y="22" textAnchor="middle" fontSize="10" fontWeight="700" fill="#754E05">Door Notch</text>
                
                <rect x="378" y="0" width="45" height="34" rx="4" fill="#F1C2B0" stroke="#C45A3C" strokeWidth="1.5" strokeDasharray="3 2" />
                <text x="400" y="21" textAnchor="middle" fontSize="9" fontWeight="700" fill="#942D15">Cut</text>
              </g>
            </svg>
          </div>

          {/* Mobile-Friendly HTML Legend (No sliding needed) */}
          <div className="pt-3 border-t border-[#F0EAE1] grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-[#E2D4C1] border border-[#A89278] shrink-0" />
              <span className="text-[#4E4942] font-medium">Usable full planks</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-[#F1C2B0] border border-[#C45A3C] border-dashed shrink-0" />
              <span className="text-[#4E4942] font-medium">End-row scrap (&lt; 8&quot; unusable)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-[#F9E2AF] border border-[#B88219] shrink-0" />
              <span className="text-[#4E4942] font-medium">Doorway / trim cutout</span>
            </div>
          </div>

          <p className="text-xs text-[#6E675E] leading-relaxed">
            Most manufacturers require starter planks to be at least 8 to 12 inches long for joint stability. If your row ends with an off-cut shorter than that, it cannot start the next row and becomes scrap.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <h3 className="text-xl font-display font-semibold text-[#1A1918]">Where Extra Material Actually Goes</h3>
          <ul className="space-y-2 text-base text-[#4E4942] font-sans">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#163A5F] mt-2.5 shrink-0" />
              <span><strong>Wall-end off-cuts:</strong> Pieces shorter than the manufacturer&apos;s minimum stagger rule (usually 8 to 12 inches) cannot be used and must be thrown away.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#163A5F] mt-2.5 shrink-0" />
              <span><strong>Doorway and casing notches:</strong> Planks cut around door jambs, closets, heat registers, or hallway transitions rarely leave reusable remnants.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#163A5F] mt-2.5 shrink-0" />
              <span><strong>Out-of-square walls:</strong> Most homes (especially older ones) have walls that bow slightly. The first and last rows frequently need tapered lengthwise cuts that waste significant width.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#163A5F] mt-2.5 shrink-0" />
              <span><strong>Damaged click-lock edges:</strong> Thin tongue-and-groove click locks can crack if tapped awkwardly or dropped during handling.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Visual 2: The Step-by-Step Purchase Math */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          Step-by-Step: Calculating How Much to Order
        </h2>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          Let us walk through a real-world living room example measuring <strong>13 feet 4 inches by 16 feet 2 inches</strong>.
        </p>

        <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-5">
          {/* Step 1 */}
          <div className="space-y-1.5 border-b border-[#F0EAE1] pb-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0B6E54]">Step 1</div>
            <h3 className="text-lg font-display font-bold text-[#1A1918]">Convert measurements to decimal feet and multiply</h3>
            <p className="text-sm text-[#4E4942]">
              13 ft 4 in = 13.33 ft<br />
              16 ft 2 in = 16.17 ft<br />
              13.33 ft × 16.17 ft = <strong>215.5 square feet</strong> (net room area)
            </p>
          </div>

          {/* Step 2 */}
          <div className="space-y-1.5 border-b border-[#F0EAE1] pb-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0B6E54]">Step 2</div>
            <h3 className="text-lg font-display font-bold text-[#1A1918]">Add your 10% cutting waste factor</h3>
            <p className="text-sm text-[#4E4942]">
              215.5 sq ft × 0.10 = 21.55 sq ft extra<br />
              Total needed with waste = 215.5 + 21.55 = <strong>237.1 square feet</strong>
            </p>
          </div>

          {/* Step 3 */}
          <div className="space-y-1.5">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0B6E54]">Step 3</div>
            <h3 className="text-lg font-display font-bold text-[#1A1918]">Divide by box coverage and round up</h3>
            <p className="text-sm text-[#4E4942]">
              Flooring is sold in full boxes only. If your chosen luxury vinyl plank covers <strong>22.4 square feet per box</strong>:
            </p>
            <div className="p-4 rounded-xl bg-[#F6EFE6] border border-[#DFD5C6] font-mono text-sm text-[#1A1918]">
              237.1 sq ft ÷ 22.4 sq ft/box = 10.58 boxes → <strong>Round up to 11 full boxes</strong>
            </div>
            <p className="text-sm text-[#4E4942]">
              11 boxes × 22.4 sq ft = <strong>246.4 square feet purchased</strong>.<br />
              Because of box rounding, your effective waste cushion is now 14.3%, which gives you comfortable breathing room.
            </p>
          </div>
        </div>

        {/* Try the tool link */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#EDF7F2] border border-[#BCE5D6] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <FlooringToolIcon className="w-8 h-8 shrink-0" />
            <div>
              <div className="text-sm font-bold text-[#0B6E54]">Skip the manual multiplication</div>
              <div className="text-xs text-[#4E4942]">Enter room dimensions and box sizes directly in our tool.</div>
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

      {/* Visual 3: Why Attic Stock Matters */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          The One Box You Will Thank Yourself for in 3 Years (&quot;Attic Stock&quot;)
        </h2>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          When your installation finishes, you ideally want about half a box to one full box of undamaged planks remaining. In construction, this is called <em>attic stock</em>.
        </p>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          Keeping one unopened box tucked in a dry closet, basement shelf, or attic provides three major protections:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-2">
            <div className="text-xs font-semibold uppercase text-[#163A5F]">1. Dye Lot Differences</div>
            <p className="text-xs text-[#4E4942] leading-relaxed">
              Flooring manufactured 6 months apart uses different production dye lots. Even if the brand name matches, color and sheen vary between batches.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-2">
            <div className="text-xs font-semibold uppercase text-[#163A5F]">2. Locking Mechanism Changes</div>
            <p className="text-xs text-[#4E4942] leading-relaxed">
              Manufacturers update click-lock groove designs periodically. A 2026 plank often will not snap into a 2024 plank from the same product line.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-2">
            <div className="text-xs font-semibold uppercase text-[#163A5F]">3. Spot Repairs</div>
            <p className="text-xs text-[#4E4942] leading-relaxed">
              A dishwasher leak or dropped cast-iron skillet might only damage two planks. Having matching planks means replacing just those two instead of re-flooring the entire room.
            </p>
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          Common Mistakes Homeowners Make When Ordering
        </h2>
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-[#FFFBF0] border border-[#F0DCB8] flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#B88219] shrink-0 mt-0.5" />
            <div className="space-y-1 text-sm text-[#4E4942]">
              <strong className="text-[#1A1918] block">Rounding down instead of up to save money</strong>
              <p>
                If your calculation calls for 8.2 boxes, buying 8 boxes to save $45 almost always guarantees you will run out on the final row. Returning to the store later risks encountering out-of-stock items or mismatched dye lots.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#FFFBF0] border border-[#F0DCB8] flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#B88219] shrink-0 mt-0.5" />
            <div className="space-y-1 text-sm text-[#4E4942]">
              <strong className="text-[#1A1918] block">Treating irregular rooms like basic rectangles</strong>
              <p>
                If your room has an alcove, hallway, or L-shape, measuring only the longest length and width overestimates some areas while ignoring perimeter cut complexity. Learn how to divide your room into clean sections in our{' '}
                <Link href="/guides/how-to-measure-an-l-shaped-room-for-flooring" className="text-[#163A5F] underline font-medium">
                  L-shaped room measuring guide
                </Link>.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#FFFBF0] border border-[#F0DCB8] flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#B88219] shrink-0 mt-0.5" />
            <div className="space-y-1 text-sm text-[#4E4942]">
              <strong className="text-[#1A1918] block">Forgetting closet interiors</strong>
              <p>
                Walk-in closets, reach-in closets, and under-stair storage need flooring too. A standard 2×6 ft closet adds 12 square feet plus perimeter cuts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Guides & Calculator Navigation */}
      <footer className="pt-6 border-t border-[#E6DDD1] space-y-6">
        <h3 className="text-lg font-display font-bold text-[#1A1918]">Next Steps & Related Reading</h3>
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
              Compare 5%, 10%, 15%, and 20% waste rates by room layout and pattern.
            </p>
          </Link>

          <Link
            href="/guides/how-much-flooring-do-i-need-for-a-10x10-room"
            className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] hover:border-[#163A5F]/40 transition-all group"
          >
            <div className="text-xs font-semibold text-[#0B6E54] uppercase tracking-wider">Practical Example</div>
            <div className="text-base font-bold text-[#1A1918] group-hover:text-[#163A5F] transition-colors">
              How Much Flooring for a 10×10 Room? →
            </div>
            <p className="text-xs text-[#6E675E] mt-1">
              See the exact box math and square footage breakdown for a 100 sq ft room.
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
