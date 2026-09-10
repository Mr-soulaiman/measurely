import { Link } from '../../context/NavigationContext';
import { ArrowRight, Calculator, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';
import { PaintToolIcon } from '../../components/ToolIcons';

export function PaintGuidePage() {
  return (
    <main className="flex-1 max-w-3xl w-full mx-auto px-5 py-8 sm:py-12 space-y-10">
      {/* 1. Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-sans text-[#6E675E]">
        <Link href="/" className="hover:text-[#163A5F] transition-colors">Home</Link>
        <span>/</span>
        <Link href="/guides" className="hover:text-[#163A5F] transition-colors">Guides</Link>
        <span>/</span>
        <span className="text-[#1A1918] font-medium" aria-current="page">How Much Paint Do I Need for a Room?</span>
      </nav>

      {/* 2. Article Header */}
      <header className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDF7F2] text-[#0B6E54] text-xs font-sans font-semibold">
          <PaintToolIcon className="w-4 h-4" />
          <span>Interior Decorating</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-[#1A1918] tracking-tight leading-tight">
          How Much Paint Do I Need for a Room?
        </h1>
        <p className="text-base sm:text-lg text-[#4E4942] leading-relaxed font-sans">
          A straightforward guide to calculating paint gallons or litres for interior walls, ceilings, doors, and trim with accurate coverage estimates.
        </p>
      </header>

      {/* 3. Direct Quick Answer Box */}
      <section aria-labelledby="quick-answer-heading" className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#163A5F]/20 shadow-[0_4px_20px_-2px_rgba(22,58,95,0.08)] space-y-3">
        <h2 id="quick-answer-heading" className="text-sm font-sans font-bold uppercase tracking-wider text-[#163A5F]">
          Quick Answer
        </h2>
        <p className="text-base sm:text-lg text-[#1A1918] font-sans font-medium leading-relaxed">
          As a standard rule, <strong>1 gallon of interior paint covers 350 to 400 square feet</strong> (or 1 litre covers 10 to 12 square metres) with a single coat. For an average 12 ft × 12 ft room (with 8 ft ceilings), you will need approximately <strong>2 gallons (7 to 8 litres) for two coats on the walls</strong>, plus 1 gallon for the ceiling.
        </p>
        <p className="text-sm text-[#6E675E] font-sans">
          Always deduct doors (approx. 21 sq ft each) and standard windows (approx. 15 sq ft each) before calculating final gallon counts.
        </p>
      </section>

      {/* 4. Calculator Callout Card */}
      <section className="p-5 sm:p-6 rounded-2xl bg-[#F4EDE2] border border-[#DFCFC0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-lg font-display font-bold text-[#1A1918]">
            Calculate your paint requirements precisely
          </h2>
          <p className="text-sm text-[#4E4942] font-sans">
            Input room dimensions, doors, windows, and coats into our paint calculator.
          </p>
        </div>
        <Link
          href="/tools/paint-calculator"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#163A5F] text-white font-sans text-sm font-bold shadow-[0_2px_8px_rgba(22,58,95,0.2)] hover:bg-[#112F4D] transition-all cursor-pointer whitespace-nowrap shrink-0"
        >
          <Calculator className="w-4 h-4" />
          <span>Open Paint Calculator</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* 5. Step-by-Step Calculation Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          Step-by-Step Calculation Example
        </h2>
        <p className="text-sm sm:text-base text-[#4E4942] font-sans leading-relaxed">
          Let’s calculate the paint for a <strong>14 ft × 12 ft bedroom</strong> with <strong>8-foot ceilings</strong>, containing <strong>1 entry door</strong> and <strong>2 standard windows</strong>, painted with <strong>2 coats</strong>.
        </p>

        <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-4 font-sans text-sm sm:text-base">
          <div className="space-y-2">
            <h3 className="font-bold text-[#1A1918] text-base">Step 1: Calculate total wall perimeter & gross area</h3>
            <p className="text-[#4E4942]">Perimeter = (14 ft + 12 ft) × 2 = <strong>52 ft</strong></p>
            <p className="text-[#4E4942]">Gross Wall Area = 52 ft × 8 ft ceiling height = <strong>416 sq ft</strong></p>
          </div>

          <div className="space-y-2 border-t border-[#F0EAE1] pt-3">
            <h3 className="font-bold text-[#1A1918] text-base">Step 2: Subtract openings (doors and windows)</h3>
            <p className="text-[#4E4942]">1 Door = 3 ft × 7 ft = 21 sq ft</p>
            <p className="text-[#4E4942]">2 Windows = 2 × (3 ft × 5 ft) = 30 sq ft</p>
            <p className="text-[#4E4942]">Total Openings = 21 + 30 = 51 sq ft</p>
            <p className="text-[#4E4942]">Net Wall Area = 416 - 51 = <strong>365 sq ft</strong></p>
          </div>

          <div className="space-y-2 border-t border-[#F0EAE1] pt-3">
            <h3 className="font-bold text-[#1A1918] text-base">Step 3: Multiply by number of coats</h3>
            <p className="text-[#4E4942]">Total Coverage Needed = 365 sq ft × 2 coats = <strong>730 sq ft</strong></p>
          </div>

          <div className="space-y-2 border-t border-[#F0EAE1] pt-3">
            <h3 className="font-bold text-[#1A1918] text-base">Step 4: Divide by coverage per gallon</h3>
            <p className="text-[#4E4942]">Gallons needed = 730 sq ft ÷ 350 sq ft/gallon = <strong>2.08 gallons</strong></p>
            <p className="text-[#0B6E54] font-semibold">Recommended purchase: <strong>2 Gallons + 1 Quart (or 3 full gallons if priming bare spots)</strong></p>
          </div>
        </div>
      </section>

      {/* 6. Standard Paint Coverage Rates */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          Average Paint Coverage Rates
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1]">
            <h3 className="font-bold text-sm text-[#1A1918]">Smooth Drywall / Plaster</h3>
            <p className="text-xs text-[#6E675E] mt-1 font-sans">
              <strong>350 to 400 sq ft / gallon (10–12 m² / L)</strong> — Standard smooth surfaces with a prior base coat.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1]">
            <h3 className="font-bold text-sm text-[#1A1918]">Textured Drywall / Orange Peel</h3>
            <p className="text-xs text-[#6E675E] mt-1 font-sans">
              <strong>250 to 300 sq ft / gallon (7–8.5 m² / L)</strong> — Surface texture increases microscopic surface area.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1]">
            <h3 className="font-bold text-sm text-[#1A1918]">Unprimed Bare Drywall / Masonry</h3>
            <p className="text-xs text-[#6E675E] mt-1 font-sans">
              <strong>200 to 250 sq ft / gallon (5.5–7 m² / L)</strong> — Highly porous surface that rapidly absorbs liquid binder.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1]">
            <h3 className="font-bold text-sm text-[#1A1918]">Flat Ceiling Paint</h3>
            <p className="text-xs text-[#6E675E] mt-1 font-sans">
              <strong>350 sq ft / gallon (9.5 m² / L)</strong> — Typically applied in 1–2 coats using low-splatter ultra-flat white paint.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Key Factors That Affect Amount */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          Factors Influencing How Much Paint You Need
        </h2>
        <ul className="space-y-3">
          <li className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#0B6E54] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm text-[#1A1918]">Color Transition (Dark to Light)</h3>
              <p className="text-xs sm:text-sm text-[#4E4942] mt-0.5 font-sans">
                Painting a light cream or white over a deep red or navy wall often requires a dedicated high-hide stain-blocking primer plus two full topcoats.
              </p>
            </div>
          </li>
          <li className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#0B6E54] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm text-[#1A1918]">Application Method & Roller Nap</h3>
              <p className="text-xs sm:text-sm text-[#4E4942] mt-0.5 font-sans">
                A 3/8-inch nap roller holds and deposits paint smoothly on standard drywall. Thicker 1/2-inch or 3/4-inch naps use more paint per square foot.
              </p>
            </div>
          </li>
          <li className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#0B6E54] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm text-[#1A1918]">Ceilings, Baseboards, and Trim</h3>
              <p className="text-xs sm:text-sm text-[#4E4942] mt-0.5 font-sans">
                Trim and baseboards usually require semi-gloss or satin enamel paint, which should be estimated separately from matte or eggshell wall paint.
              </p>
            </div>
          </li>
        </ul>
      </section>

      {/* 8. Practical Tips & Common Mistakes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          Practical Tips & Common Mistakes
        </h2>
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E4DCD0] flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#D95D39] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-[#1A1918]">Always box your paint cans</h3>
              <p className="text-xs sm:text-sm text-[#4E4942] font-sans">
                If you buy multiple cans of the same tint, combine them into one large 5-gallon bucket before painting ("boxing"). This eliminates slight color variations between individual cans.
              </p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E4DCD0] flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#D95D39] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-[#1A1918]">Keep leftover paint sealed for future touch-ups</h3>
              <p className="text-xs sm:text-sm text-[#4E4942] font-sans">
                Never discard leftover paint immediately. Keep half a quart labeled with the room name, brand, formula code, and date for scuff repairs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Related Calculators & Internal Links */}
      <footer className="pt-6 border-t border-[#E6DDD1] space-y-4">
        <h2 className="text-xl font-display font-bold text-[#1A1918]">
          Related Calculators & Guides
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/tools/drywall-calculator"
            className="p-3.5 rounded-xl bg-[#FFFFFF] hover:bg-[#FAF6F0] border border-[#E6DDD1] text-left transition-colors group block"
          >
            <div className="font-semibold text-sm text-[#163A5F] group-hover:underline flex items-center justify-between">
              <span>Drywall Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100" />
            </div>
            <p className="text-xs text-[#6E675E] mt-1 font-sans">Calculate sheets for wall or ceiling construction.</p>
          </Link>
          <Link
            href="/tools/flooring-calculator"
            className="p-3.5 rounded-xl bg-[#FFFFFF] hover:bg-[#FAF6F0] border border-[#E6DDD1] text-left transition-colors group block"
          >
            <div className="font-semibold text-sm text-[#163A5F] group-hover:underline flex items-center justify-between">
              <span>Flooring Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100" />
            </div>
            <p className="text-xs text-[#6E675E] mt-1 font-sans">Estimate flooring boxes for full room remodels.</p>
          </Link>
          <Link
            href="/guides/how-much-flooring-do-i-need"
            className="p-3.5 rounded-xl bg-[#FFFFFF] hover:bg-[#FAF6F0] border border-[#E6DDD1] text-left transition-colors group block"
          >
            <div className="font-semibold text-sm text-[#163A5F] group-hover:underline flex items-center justify-between">
              <span>Flooring Guide</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100" />
            </div>
            <p className="text-xs text-[#6E675E] mt-1 font-sans">Learn how to estimate plank flooring & waste.</p>
          </Link>
        </div>

        <div className="pt-4 flex items-center justify-between">
          <Link
            href="/guides"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#163A5F] hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all guides</span>
          </Link>
        </div>
      </footer>
    </main>
  );
}
