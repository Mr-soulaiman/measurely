import { Link } from '../../context/NavigationContext';
import { FlooringToolIcon } from '../../components/ToolIcons';
import { ArrowLeft, ArrowRight, Calculator, CheckCircle2, Sliders } from 'lucide-react';

export function FlooringWasteGuidePage() {
  return (
    <main className="flex-1 max-w-4xl w-full mx-auto px-5 py-8 sm:py-12 space-y-10">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[#6E675E] font-sans">
        <Link href="/guides" className="hover:text-[#163A5F] transition-colors">Guides</Link>
        <span aria-hidden="true">/</span>
        <span className="text-[#1A1918] font-medium truncate">What Flooring Waste Percentage Should You Use?</span>
      </nav>

      {/* Guide Header */}
      <header className="space-y-4 border-b border-[#E6DDD1] pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EDF7F2] text-[#0B6E54] text-xs font-semibold uppercase tracking-wider">
          <Sliders className="w-3.5 h-3.5" />
          <span>Waste Factor Rules</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#1A1918] tracking-tight leading-tight">
          What Flooring Waste Percentage Should You Use?
        </h1>
        <p className="text-lg sm:text-xl text-[#4E4942] font-sans leading-relaxed">
          How to choose between 5%, 10%, 15%, or 20% waste allowance based on your room layout, flooring material, and pattern complexity.
        </p>
      </header>

      {/* Quick Summary Matrix */}
      <section className="p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] border-2 border-[#163A5F]/20 shadow-[0_4px_20px_-2px_rgba(22,58,95,0.08)] space-y-4">
        <div className="flex items-center gap-2 text-[#163A5F]">
          <CheckCircle2 className="w-5 h-5 text-[#0B6E54] shrink-0" />
          <h2 className="text-lg font-display font-bold text-[#1A1918]">At a Glance: Recommended Waste Percentages</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#E6DDD1] space-y-1">
            <div className="text-2xl font-display font-bold text-[#163A5F]">5%</div>
            <div className="text-xs font-bold text-[#1A1918]">Simple Rectangles</div>
            <p className="text-xs text-[#6E675E] leading-normal">
              Large open rooms, simple square layouts, straight parallel runs, experienced installers.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#EDF7F2] border border-[#BCE5D6] space-y-1">
            <div className="text-2xl font-display font-bold text-[#0B6E54]">10%</div>
            <div className="text-xs font-bold text-[#0B6E54]">Standard DIY Baseline</div>
            <p className="text-xs text-[#4E4942] leading-normal">
              Typical bedrooms, living rooms, and hallways with standard doorways and closets.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#E6DDD1] space-y-1">
            <div className="text-2xl font-display font-bold text-[#163A5F]">15%</div>
            <div className="text-xs font-bold text-[#1A1918]">Complex Layouts</div>
            <p className="text-xs text-[#6E675E] leading-normal">
              L-shaped rooms, multiple doorways, angled walls, bay windows, or natural ceramic tile.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#E6DDD1] space-y-1">
            <div className="text-2xl font-display font-bold text-[#163A5F]">20%</div>
            <div className="text-xs font-bold text-[#1A1918]">Herringbone / Diagonal</div>
            <p className="text-xs text-[#6E675E] leading-normal">
              45-degree angled layouts, herringbone, chevron patterns, and intricate custom borders.
            </p>
          </div>
        </div>
      </section>

      {/* Visual 1: Straight Run vs Diagonal Waste */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          How Installation Pattern Affects Waste
        </h2>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          The single biggest factor dictating your waste percentage is the direction and pattern of the planks. When planks run parallel to a straight wall, cuts only happen at the ends of rows. When planks run at a 45-degree angle or in a herringbone pattern, every single plank that touches a perimeter wall requires a diagonal cut, creating triangular off-cuts that rarely fit elsewhere.
        </p>

        {/* SVG Comparison Diagram */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#6E675E]">
            Visual Comparison: Straight Run (10%) vs Diagonal Installation (20%)
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Card: Straight Pattern */}
            <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#DFD5C6] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#1A1918]">Straight Run</span>
                <span className="px-2 py-0.5 rounded-full bg-[#EDF7F2] text-[#0B6E54] text-xs font-bold border border-[#BCE5D6]">10% Waste</span>
              </div>
              <svg viewBox="0 0 280 150" className="w-full h-auto block font-sans" aria-label="Straight run pattern diagram">
                <rect width="280" height="150" rx="6" fill="#FFFFFF" stroke="#E6DDD1" />
                {/* Rows */}
                <g transform="translate(10, 12)">
                  {/* Row 1 */}
                  <rect x="0" y="0" width="85" height="22" rx="3" fill="#E2D4C1" stroke="#A89278" />
                  <rect x="89" y="0" width="125" height="22" rx="3" fill="#E2D4C1" stroke="#A89278" />
                  <rect x="218" y="0" width="42" height="22" rx="3" fill="#F1C2B0" stroke="#C45A3C" strokeDasharray="3 2" />
                  
                  {/* Row 2 */}
                  <rect x="0" y="26" width="48" height="22" rx="3" fill="#E2D4C1" stroke="#A89278" />
                  <rect x="52" y="26" width="125" height="22" rx="3" fill="#E2D4C1" stroke="#A89278" />
                  <rect x="181" y="26" width="79" height="22" rx="3" fill="#F1C2B0" stroke="#C45A3C" strokeDasharray="3 2" />

                  {/* Row 3 */}
                  <rect x="0" y="52" width="105" height="22" rx="3" fill="#E2D4C1" stroke="#A89278" />
                  <rect x="109" y="52" width="125" height="22" rx="3" fill="#E2D4C1" stroke="#A89278" />
                  <rect x="238" y="52" width="22" height="22" rx="3" fill="#F1C2B0" stroke="#C45A3C" strokeDasharray="3 2" />

                  {/* Row 4 */}
                  <rect x="0" y="78" width="65" height="22" rx="3" fill="#E2D4C1" stroke="#A89278" />
                  <rect x="69" y="78" width="125" height="22" rx="3" fill="#E2D4C1" stroke="#A89278" />
                  <rect x="198" y="78" width="62" height="22" rx="3" fill="#F1C2B0" stroke="#C45A3C" strokeDasharray="3 2" />

                  {/* Row 5 */}
                  <rect x="0" y="104" width="115" height="22" rx="3" fill="#E2D4C1" stroke="#A89278" />
                  <rect x="119" y="104" width="115" height="22" rx="3" fill="#E2D4C1" stroke="#A89278" />
                  <rect x="238" y="104" width="22" height="22" rx="3" fill="#F1C2B0" stroke="#C45A3C" strokeDasharray="3 2" />
                </g>
              </svg>
              <div className="text-xs text-[#6E675E] flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-[#F1C2B0] border border-[#C45A3C] border-dashed shrink-0" />
                <span>Simple 90° cuts only at wall ends. Reusable starter off-cuts.</span>
              </div>
            </div>

            {/* Right Card: Diagonal Pattern */}
            <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#DFD5C6] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#1A1918]">Diagonal 45°</span>
                <span className="px-2 py-0.5 rounded-full bg-[#FFF1ED] text-[#C45A3C] text-xs font-bold border border-[#F1C2B0]">15–20% Waste</span>
              </div>
              <svg viewBox="0 0 280 150" className="w-full h-auto block font-sans" aria-label="Diagonal run pattern diagram">
                <defs>
                  <clipPath id="diagClipMob">
                    <rect x="0" y="0" width="280" height="150" rx="6" />
                  </clipPath>
                </defs>
                <rect width="280" height="150" rx="6" fill="#FFFFFF" stroke="#E6DDD1" />
                <g clipPath="url(#diagClipMob)">
                  {[-60, -20, 20, 60, 100, 140, 180, 220, 260, 300, 340].map((offset, i) => (
                    <line
                      key={i}
                      x1={offset}
                      y1="170"
                      x2={offset + 170}
                      y2="-20"
                      stroke="#E2D4C1"
                      strokeWidth="18"
                    />
                  ))}
                  {/* Perimeter cut line highlight */}
                  <rect x="2" y="2" width="276" height="146" fill="none" stroke="#C45A3C" strokeWidth="5" strokeDasharray="5 3" />
                </g>
              </svg>
              <div className="text-xs text-[#C45A3C] flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-[#F1C2B0] border border-[#C45A3C] border-dashed shrink-0" />
                <span>Every perimeter plank requires a 45° cut, creating high scrap.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed breakdown per percentage level */}
      <section className="space-y-6">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          When to Use Each Percentage
        </h2>

        {/* 5% section */}
        <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-display font-bold text-[#1A1918]">5% Waste: For Simple, Open Rooms</h3>
            <span className="px-3 py-1 rounded-full bg-[#F5EFE6] text-[#6E675E] text-xs font-bold">Best Case Only</span>
          </div>
          <p className="text-base text-[#4E4942] font-sans leading-relaxed">
            A 5% waste factor is only safe if <em>all</em> of the following conditions are met:
          </p>
          <ul className="space-y-1.5 text-sm text-[#4E4942] font-sans list-disc list-inside">
            <li>The room is a single simple square or rectangle without alcoves or jutting chimney breasts.</li>
            <li>There are minimal doorways (e.g., just one entrance, no walk-in closets or multiple transitions).</li>
            <li>You are installing high-quality click-lock vinyl plank or laminate with low factory defect rates.</li>
            <li>The person installing has done flooring before and knows how to use cut pieces efficiently as starter planks.</li>
          </ul>
          <p className="text-xs text-[#6E675E] italic">
            Warning: For rooms under 150 square feet, 5% is less than half a box of material. Any miscalculated cut will consume your entire buffer immediately.
          </p>
        </div>

        {/* 10% section */}
        <div className="p-6 rounded-2xl bg-[#FFFFFF] border-2 border-[#0B6E54]/30 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-display font-bold text-[#1A1918]">10% Waste: The Safe Standard for DIYers</h3>
            <span className="px-3 py-1 rounded-full bg-[#EDF7F2] text-[#0B6E54] text-xs font-bold">Recommended</span>
          </div>
          <p className="text-base text-[#4E4942] font-sans leading-relaxed">
            Most manufacturers and trade groups recommend 10% as the standard baseline. It accounts for:
          </p>
          <ul className="space-y-1.5 text-sm text-[#4E4942] font-sans list-disc list-inside">
            <li>Normal off-cut discards shorter than the required 8–10 inch plank stagger.</li>
            <li>Trimming around door frames, baseboards, and heating registers.</li>
            <li>Minor measuring errors and one or two accidental bad cuts.</li>
            <li>One or two damaged boards out of the box (minor scratches or snapped click tongues).</li>
          </ul>
        </div>

        {/* 15% section */}
        <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-display font-bold text-[#1A1918]">15% Waste: For Irregular Rooms and Tile</h3>
            <span className="px-3 py-1 rounded-full bg-[#F5EFE6] text-[#6E675E] text-xs font-bold">Complex Spaces</span>
          </div>
          <p className="text-base text-[#4E4942] font-sans leading-relaxed">
            You should bump your order to 15% extra if your room has any of these challenges:
          </p>
          <ul className="space-y-1.5 text-sm text-[#4E4942] font-sans list-disc list-inside">
            <li><strong>L-shaped layouts:</strong> Rooms that wrap around corners create two different end-of-row cut lines.</li>
            <li><strong>Ceramic or porcelain tile:</strong> Tiles crack when cut, and edges chip along wet-saw lines.</li>
            <li><strong>Solid hardwood:</strong> Natural wood contains knots, cracks, and color variations that you will want to cull before fastening.</li>
            <li><strong>Multiple closet nooks:</strong> Each closet door opening introduces new starter cuts and transition thresholds.</li>
          </ul>
        </div>

        {/* 20% section */}
        <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-display font-bold text-[#1A1918]">20% Waste: For Herringbone and Diagonal Runs</h3>
            <span className="px-3 py-1 rounded-full bg-[#F5EFE6] text-[#6E675E] text-xs font-bold">Specialty Patterns</span>
          </div>
          <p className="text-base text-[#4E4942] font-sans leading-relaxed">
            Do not underestimate herringbone or diagonal patterns. Because every piece ending at a wall must be cut at a 45-degree angle, you generate dozens of small triangular scraps. Most cannot be flipped and used on the other side due to tongue-and-groove orientation.
          </p>
        </div>
      </section>

      {/* Practical Calculation Walkthrough */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          How to Apply the Waste Percentage to Your Room
        </h2>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          The formula is simple: multiply your measured square footage by <code>(1 + waste percentage)</code>.
        </p>

        <div className="p-5 rounded-xl bg-[#F6EFE6] border border-[#DFD5C6] space-y-3">
          <div className="font-mono text-sm text-[#1A1918]">
            Total Area with Waste = Net Square Footage × (1 + (Waste % ÷ 100))
          </div>
          <div className="text-sm text-[#4E4942] space-y-1">
            <div><strong>Example:</strong> A 180 sq ft room with a 10% waste factor:</div>
            <div className="font-mono text-xs text-[#1A1918]">180 × 1.10 = 198 square feet</div>
            <div>If using a 15% waste factor for complex corners:</div>
            <div className="font-mono text-xs text-[#1A1918]">180 × 1.15 = 207 square feet</div>
          </div>
        </div>

        {/* Quick link to tool */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#EDF7F2] border border-[#BCE5D6] flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4">
          <div className="flex items-center gap-3">
            <FlooringToolIcon className="w-8 h-8 shrink-0" />
            <div>
              <div className="text-sm font-bold text-[#0B6E54]">Adjust waste percentage with one click</div>
              <div className="text-xs text-[#4E4942]">Our calculator lets you toggle between 5%, 10%, 15%, or custom waste instantly.</div>
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

      {/* Related Guides Navigation */}
      <footer className="pt-6 border-t border-[#E6DDD1] space-y-6">
        <h3 className="text-lg font-display font-bold text-[#1A1918]">Related Flooring Guides</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/guides/how-much-extra-flooring-should-you-buy"
            className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] hover:border-[#163A5F]/40 transition-all group"
          >
            <div className="text-xs font-semibold text-[#0B6E54] uppercase tracking-wider">Related Guide</div>
            <div className="text-base font-bold text-[#1A1918] group-hover:text-[#163A5F] transition-colors">
              How Much Extra Flooring Should You Buy? →
            </div>
            <p className="text-xs text-[#6E675E] mt-1">
              Understand box rounding, attic stock, and why exact square footage leaves you short.
            </p>
          </Link>

          <Link
            href="/guides/how-to-measure-an-l-shaped-room-for-flooring"
            className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] hover:border-[#163A5F]/40 transition-all group"
          >
            <div className="text-xs font-semibold text-[#0B6E54] uppercase tracking-wider">Measuring Guide</div>
            <div className="text-base font-bold text-[#1A1918] group-hover:text-[#163A5F] transition-colors">
              How to Measure an L-Shaped Room →
            </div>
            <p className="text-xs text-[#6E675E] mt-1">
              Step-by-step instructions for breaking irregular rooms into simple rectangles.
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
