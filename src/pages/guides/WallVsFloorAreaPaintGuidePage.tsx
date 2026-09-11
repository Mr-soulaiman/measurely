import { ArrowLeft, ArrowRight, Paintbrush, Ruler, CheckCircle2, Maximize2, AlertCircle, Sparkles } from 'lucide-react';
import { Link } from '../../context/NavigationContext';

export function WallVsFloorAreaPaintGuidePage() {
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
          Do You Calculate Paint From Wall Area or Floor Area?
        </h1>
        <p className="text-lg text-[#4E4942] font-sans leading-relaxed">
          It is one of the most common mistakes in home renovation: using floor square footage to estimate wall paint. Here is why walls and floors are completely different calculations, and how your floor plan still helps.
        </p>
      </header>

      {/* Direct Answer Callout */}
      <section className="p-5 sm:p-6 rounded-2xl bg-[#FCFAF7] border-2 border-[#DFD5C6] space-y-3">
        <div className="flex items-center gap-2 text-[#7A5B3E] font-bold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          The Direct Answer
        </div>
        <p className="text-base sm:text-lg font-medium text-[#1A1918] leading-snug">
          You must <strong>always calculate paint from Wall Area</strong>, never Floor Area. Floor area measures horizontal surface for carpet or hardwood; paint goes on four vertical walls standing along the room’s perimeter.
        </p>
        <p className="text-sm text-[#4E4942] leading-relaxed">
          In an average room, your total wall area is typically <strong>2.5 to 3.5 times larger</strong> than your floor area. If you buy paint based on floor square footage, you will run out of paint before finishing even the second wall.
        </p>
      </section>

      {/* Section 1: Visual Comparison - Floor vs Wall Surface */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          Why Floor Area and Wall Area Are Not the Same
        </h2>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          Think of your room as an open cardboard box. The floor is just the bottom flap. The walls are the four tall side panels that fold upward into the ceiling.
        </p>

        {/* Responsive Visual 1: Floor vs Wall Comparison Cards (Stacks on mobile, 2-column on desktop) */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F0EAE1] pb-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#6E675E]">
              Surface Area Comparison: 10 ft × 12 ft Room (8 ft Ceilings)
            </div>
            <span className="text-xs text-[#0B6E54] font-semibold">Same Room, Vastly Different Sq Footage</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Floor Area Card */}
            <div className="p-5 rounded-xl border-2 border-[#DFD5C6] bg-[#FCFAF7] space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-[#E8DED1] text-[#2C2720] text-xs font-bold">
                    Floor Area (Horizontal Plane)
                  </span>
                  <span className="text-xs font-mono font-bold text-[#6E675E]">Length × Width</span>
                </div>
                <div className="text-2xl font-display font-extrabold text-[#1A1918]">120 sq ft</div>
                <p className="text-xs sm:text-sm text-[#4E4942] leading-relaxed">
                  <code className="px-1.5 py-0.5 rounded bg-white text-xs font-mono text-[#1A1918]">10 ft × 12 ft = 120 sq ft</code>.<br />
                  This represents the ground footprint for flooring, tiles, or rug pads.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-800">
                <strong>If used for paint:</strong> 120 sq ft would suggest you need only 1/3 of a gallon, leaving you completely stranded mid-project.
              </div>
            </div>

            {/* Wall Area Card */}
            <div className="p-5 rounded-xl border-2 border-[#0B6E54] bg-[#EDF7F2]/40 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-[#0B6E54] text-white text-xs font-bold">
                    Wall Area (Vertical Planes)
                  </span>
                  <span className="text-xs font-mono font-bold text-[#0B6E54]">Perimeter × Height</span>
                </div>
                <div className="text-2xl font-display font-extrabold text-[#0B6E54]">352 sq ft Gross</div>
                <p className="text-xs sm:text-sm text-[#4E4942] leading-relaxed">
                  Perimeter: <code className="px-1.5 py-0.5 rounded bg-white text-xs font-mono text-[#1A1918]">(10 + 12) × 2 = 44 ft</code>.<br />
                  Wall Area: <code className="px-1.5 py-0.5 rounded bg-white text-xs font-mono font-bold text-[#0B6E54]">44 ft × 8 ft = 352 sq ft</code>.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-[#EDF7F2] border border-[#BCE5D6] text-xs text-[#0B6E54]">
                <strong>The Real Paint Area:</strong> Nearly <strong>3 times larger</strong> than the floor. For 2 coats, you need ~2 gallons.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: How Floor Dimensions Still Help */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          How Floor Measurements Help Calculate Wall Area
        </h2>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          While floor <em>area</em> is not used, your floor <em>dimensions</em> (length and width) are essential because they define the <strong>perimeter</strong> of the room:
        </p>

        <div className="p-5 sm:p-6 rounded-2xl bg-[#FCFAF7] border border-[#E6DDD1] space-y-3">
          <div className="text-sm font-bold text-[#1A1918]">The 2-Step Wall Area Formula:</div>
          <div className="space-y-2">
            <div className="p-3.5 rounded-xl bg-white border border-[#DFD5C6] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-bold text-[#7A5B3E] uppercase tracking-wider">Step 1: Room Perimeter</span>
              <code className="text-sm font-mono font-bold text-[#1A1918]">Perimeter = 2 × (Length + Width)</code>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-[#0B6E54] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-bold text-[#0B6E54] uppercase tracking-wider">Step 2: Total Wall Surface</span>
              <code className="text-sm font-mono font-bold text-[#0B6E54]">Gross Wall Area = Perimeter × Ceiling Height</code>
            </div>
          </div>
          <p className="text-xs text-[#6E675E] leading-relaxed pt-1">
            By running a tape measure along the baseboards (or floor line), you find the perimeter without having to climb a ladder to measure each wall individually.
          </p>
        </div>
      </section>

      {/* Section 3: The Massive Impact of Ceiling Height */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          How Ceiling Height Dramatically Changes Your Paint Order
        </h2>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          Because floor area only measures two dimensions (<code className="text-xs font-mono text-[#1A1918]">L × W</code>), it completely ignores the vertical height of your room. Here is what happens to a <strong>12 ft × 15 ft room (180 sq ft floor, 54 ft perimeter)</strong> as ceiling height increases:
        </p>

        {/* Responsive Visual 2: Ceiling Height Comparison Cards */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#6E675E]">
            Same 180 sq ft Floor Footprint — 4 Different Ceiling Heights
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* 8 ft Ceilings */}
            <div className="p-4 rounded-xl border border-[#DFD5C6] bg-[#FCFAF7] space-y-2 text-center">
              <span className="px-2 py-0.5 rounded-full bg-[#E8DED1] text-[#2C2720] text-[11px] font-bold">
                8 ft Standard
              </span>
              <div className="text-xl font-display font-extrabold text-[#1A1918]">432 sq ft</div>
              <p className="text-xs text-[#6E675E]">54 ft × 8 ft</p>
              <div className="text-xs font-bold text-[#0B6E54] pt-1">~2 Gallons (2 coats)</div>
            </div>

            {/* 9 ft Ceilings */}
            <div className="p-4 rounded-xl border border-[#DFD5C6] bg-[#FCFAF7] space-y-2 text-center">
              <span className="px-2 py-0.5 rounded-full bg-[#EDF7F2] text-[#0B6E54] text-[11px] font-bold">
                9 ft Modern
              </span>
              <div className="text-xl font-display font-extrabold text-[#1A1918]">486 sq ft</div>
              <p className="text-xs text-[#6E675E]">54 ft × 9 ft (+12.5%)</p>
              <div className="text-xs font-bold text-[#0B6E54] pt-1">~2.5 Gallons (2 coats)</div>
            </div>

            {/* 10 ft Ceilings */}
            <div className="p-4 rounded-xl border-2 border-[#0B6E54] bg-[#EDF7F2]/30 space-y-2 text-center">
              <span className="px-2 py-0.5 rounded-full bg-[#0B6E54] text-white text-[11px] font-bold">
                10 ft Tall
              </span>
              <div className="text-xl font-display font-extrabold text-[#0B6E54]">540 sq ft</div>
              <p className="text-xs text-[#6E675E]">54 ft × 10 ft (+25%)</p>
              <div className="text-xs font-bold text-[#0B6E54] pt-1">~3 Gallons (2 coats)</div>
            </div>

            {/* 12 ft Ceilings */}
            <div className="p-4 rounded-xl border border-[#163A5F] bg-[#163A5F]/5 space-y-2 text-center">
              <span className="px-2 py-0.5 rounded-full bg-[#163A5F] text-white text-[11px] font-bold">
                12 ft Vaulted
              </span>
              <div className="text-xl font-display font-extrabold text-[#163A5F]">648 sq ft</div>
              <p className="text-xs text-[#6E675E]">54 ft × 12 ft (+50%)</p>
              <div className="text-xs font-bold text-[#163A5F] pt-1">~3.5 Gallons (2 coats)</div>
            </div>
          </div>

          <div className="text-xs text-[#6E675E] leading-relaxed pt-1 border-t border-[#F0EAE1]">
            Notice how increasing ceiling height from 8 ft to 10 ft adds over 100 square feet of paintable surface on the exact same floor plan.
          </div>
        </div>
      </section>

      {/* Section 4: What About Doors and Windows? */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          Subtracting Doors and Windows from Gross Wall Area
        </h2>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          Once you have your gross wall area (<code className="text-xs font-mono text-[#1A1918]">Perimeter × Height</code>), you don’t paint over door openings or glass windows. Subtract these standard deductions:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white border border-[#E6DDD1] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#7A5B3E] uppercase tracking-wider">Standard Interior Door</span>
              <span className="text-xs font-mono font-bold text-[#7A5B3E]">Subtract ~21 sq ft</span>
            </div>
            <p className="text-xs text-[#4E4942] leading-relaxed">
              Standard 3 ft × 7 ft door opening (or 2 ft 8 in × 6 ft 8 in) accounts for approximately 20 to 21 square feet per door.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#E6DDD1] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#163A5F] uppercase tracking-wider">Standard Window</span>
              <span className="text-xs font-mono font-bold text-[#163A5F]">Subtract ~15 sq ft</span>
            </div>
            <p className="text-xs text-[#4E4942] leading-relaxed">
              Standard 3 ft × 5 ft double-hung bedroom window accounts for approximately 15 square feet of unpainted glass and trim.
            </p>
          </div>
        </div>

        <p className="text-xs text-[#6E675E] leading-relaxed">
          <strong>DIY Rule of Thumb:</strong> If your room only has one door and one small window, some painters don&apos;t bother subtracting them because the saved paint acts as the built-in 10% safety buffer for spills and roller roller cover absorption.
        </p>
      </section>

      {/* Interactive Tool Banner */}
      <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#163A5F] to-[#0D243B] text-white space-y-4 shadow-sm">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold tracking-wide">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#BCE5D6]" />
            Free Paint Tool
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold">
            Calculate Net Wall Area Automatically
          </h2>
          <p className="text-sm sm:text-base text-[#D5CEC2] max-w-xl leading-relaxed">
            Our Paint Calculator automatically takes your floor dimensions, multiplies by your ceiling height, and subtracts your doors and windows to give you exact paintable wall square footage and paint cans needed.
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
            href="/guides/how-much-paint-do-i-need-for-one-room"
            className="p-4 rounded-xl bg-white border border-[#E6DDD1] hover:border-[#0B6E54] transition-colors space-y-1 block group"
          >
            <div className="text-xs font-bold text-[#7A5B3E]">Room Estimation</div>
            <div className="text-sm font-bold text-[#1A1918] group-hover:text-[#7A5B3E] transition-colors">
              How Much Paint Do I Need for One Room?
            </div>
            <p className="text-xs text-[#6E675E]">
              Step-by-step room measuring blueprint from tape measure to can purchasing.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
