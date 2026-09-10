import { Link } from '../../context/NavigationContext';
import { ArrowRight, Calculator, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';
import { ConcreteToolIcon } from '../../components/ToolIcons';

export function ConcreteGuidePage() {
  return (
    <main className="flex-1 max-w-3xl w-full mx-auto px-5 py-8 sm:py-12 space-y-10">
      {/* 1. Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-sans text-[#6E675E]">
        <Link href="/" className="hover:text-[#163A5F] transition-colors">Home</Link>
        <span>/</span>
        <Link href="/guides" className="hover:text-[#163A5F] transition-colors">Guides</Link>
        <span>/</span>
        <span className="text-[#1A1918] font-medium" aria-current="page">How Much Concrete Do I Need?</span>
      </nav>

      {/* 2. Article Header */}
      <header className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDF7F2] text-[#0B6E54] text-xs font-sans font-semibold">
          <ConcreteToolIcon className="w-4 h-4" />
          <span>Concrete & Foundations</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-[#1A1918] tracking-tight leading-tight">
          How Much Concrete Do I Need?
        </h1>
        <p className="text-base sm:text-lg text-[#4E4942] leading-relaxed font-sans">
          Calculate concrete volume in cubic yards, cubic metres, tonnes, and 60-lb or 80-lb premix bags for slabs, footings, patios, driveways, and post holes.
        </p>
      </header>

      {/* 3. Direct Quick Answer Box */}
      <section aria-labelledby="quick-answer-heading" className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#163A5F]/20 shadow-[0_4px_20px_-2px_rgba(22,58,95,0.08)] space-y-3">
        <h2 id="quick-answer-heading" className="text-sm font-sans font-bold uppercase tracking-wider text-[#163A5F]">
          Quick Answer
        </h2>
        <p className="text-base sm:text-lg text-[#1A1918] font-sans font-medium leading-relaxed">
          To calculate concrete volume, multiply your slab's length by width and depth (in feet) and divide by 27 to get <strong>cubic yards</strong> (or length × width × depth in metres to get <strong>cubic metres</strong>). Always add a <strong>10% safety margin</strong> for spillage, formwork deflection, and subgrade variations.
        </p>
        <p className="text-sm text-[#6E675E] font-sans">
          One cubic yard of concrete equals 27 cubic feet and requires <strong>45 bags of 80-lb pre-mix</strong> (or <strong>60 bags of 60-lb pre-mix</strong>). For projects over 1.5 to 2 cubic yards, ordering a ready-mix delivery truck is usually more practical.
        </p>
      </section>

      {/* 4. Calculator Callout Card */}
      <section className="p-5 sm:p-6 rounded-2xl bg-[#F4EDE2] border border-[#DFCFC0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-lg font-display font-bold text-[#1A1918]">
            Calculate concrete volume and bags instantly
          </h2>
          <p className="text-sm text-[#4E4942] font-sans">
            Enter slab or footing dimensions into our concrete calculator.
          </p>
        </div>
        <Link
          href="/tools/concrete-calculator"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#163A5F] text-white font-sans text-sm font-bold shadow-[0_2px_8px_rgba(22,58,95,0.2)] hover:bg-[#112F4D] transition-all cursor-pointer whitespace-nowrap shrink-0"
        >
          <Calculator className="w-4 h-4" />
          <span>Open Concrete Calculator</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* 5. Step-by-Step Calculation Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          Step-by-Step Calculation Example
        </h2>
        <p className="text-sm sm:text-base text-[#4E4942] font-sans leading-relaxed">
          Let’s calculate the concrete needed for a <strong>10 ft × 10 ft garden shed slab</strong> with a standard <strong>4-inch thickness</strong>.
        </p>

        <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-4 font-sans text-sm sm:text-base">
          <div className="space-y-2">
            <h3 className="font-bold text-[#1A1918] text-base">Step 1: Calculate surface area</h3>
            <p className="text-[#4E4942]">Area = Length × Width = 10 ft × 10 ft = <strong>100 sq ft</strong></p>
          </div>

          <div className="space-y-2 border-t border-[#F0EAE1] pt-3">
            <h3 className="font-bold text-[#1A1918] text-base">Step 2: Convert depth to feet and calculate volume</h3>
            <p className="text-[#4E4942]">Depth in feet = 4 inches ÷ 12 = <strong>0.333 ft</strong></p>
            <p className="text-[#4E4942]">Volume = 100 sq ft × 0.333 ft = <strong>33.3 cubic feet</strong></p>
          </div>

          <div className="space-y-2 border-t border-[#F0EAE1] pt-3">
            <h3 className="font-bold text-[#1A1918] text-base">Step 3: Convert to cubic yards</h3>
            <p className="text-[#4E4942]">Cubic Yards = 33.3 cu ft ÷ 27 = <strong>1.23 cubic yards</strong></p>
            <p className="text-[#4E4942]">With 10% safety margin: 1.23 × 1.10 = <strong>1.35 cubic yards</strong></p>
          </div>

          <div className="space-y-2 border-t border-[#F0EAE1] pt-3">
            <h3 className="font-bold text-[#1A1918] text-base">Step 4: Calculate bag count</h3>
            <p className="text-[#4E4942]">Using 80-lb pre-mix bags (45 bags per cu yd): 1.35 × 45 ≈ <strong>61 bags</strong></p>
            <p className="text-[#0B6E54] font-semibold">Total: <strong>1.35 cubic yards (or 61 bags of 80 lb / 81 bags of 60 lb)</strong></p>
          </div>
        </div>
      </section>

      {/* 6. Standard Concrete Slab Depths */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          Recommended Slab Thickness by Use
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1]">
            <h3 className="font-bold text-sm text-[#1A1918]">Sidewalks & Walkways</h3>
            <p className="text-xs text-[#6E675E] mt-1 font-sans">
              <strong>4 inches (100 mm)</strong> — Suitable for foot traffic, bicycles, and wheelbarrows over a compacted gravel sub-base.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1]">
            <h3 className="font-bold text-sm text-[#1A1918]">Patios & Light Storage Sheds</h3>
            <p className="text-xs text-[#6E675E] mt-1 font-sans">
              <strong>4 inches (100 mm)</strong> — Poured with welded wire mesh or fiber reinforcement for crack control.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1]">
            <h3 className="font-bold text-sm text-[#1A1918]">Residential Driveways</h3>
            <p className="text-xs text-[#6E675E] mt-1 font-sans">
              <strong>5 to 6 inches (125–150 mm)</strong> — Designed for vehicle axle weights with rebar reinforcement grid.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1]">
            <h3 className="font-bold text-sm text-[#1A1918]">Fence & Mailbox Post Footings</h3>
            <p className="text-xs text-[#6E675E] mt-1 font-sans">
              <strong>Depth 1/3 to 1/2 the post height</strong> (typically 24–36 inches / 600–900 mm) to reach below local frost lines.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Key Factors That Affect Amount */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          Factors Influencing Concrete Quantities
        </h2>
        <ul className="space-y-3">
          <li className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#0B6E54] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm text-[#1A1918]">Uneven Ground & Excavation Depth</h3>
              <p className="text-xs sm:text-sm text-[#4E4942] mt-0.5 font-sans">
                If the ground excavation is even half an inch deeper across a 200 sq ft slab, it will consume an additional 0.3 cubic yards of concrete.
              </p>
            </div>
          </li>
          <li className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#0B6E54] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm text-[#1A1918]">Formwork Bowing and Hydrostatic Pressure</h3>
              <p className="text-xs sm:text-sm text-[#4E4942] mt-0.5 font-sans">
                Wet concrete is heavy (~4,000 lbs per cubic yard). Wooden forms can bow outwards slightly under pressure, adding extra volume.
              </p>
            </div>
          </li>
          <li className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#0B6E54] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm text-[#1A1918]">Thickened Edge Footings (Monolithic Pours)</h3>
              <p className="text-xs sm:text-sm text-[#4E4942] mt-0.5 font-sans">
                Shed and garage slabs frequently require a perimeter edge footing (e.g. 12 inches deep × 12 inches wide) that requires separate calculation.
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
              <h3 className="font-bold text-sm text-[#1A1918]">Never run short on a ready-mix truck pour</h3>
              <p className="text-xs sm:text-sm text-[#4E4942] font-sans">
                Running out of concrete mid-pour leads to unsightly "cold joints" (weak structural seams where wet concrete cures against setting concrete) and steep rush delivery surcharges.
              </p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E4DCD0] flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#D95D39] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-[#1A1918]">Prepare a compacted gravel sub-base first</h3>
              <p className="text-xs sm:text-sm text-[#4E4942] font-sans">
                Never pour concrete directly onto soft topsoil or mud. A 3–4 inch compacted crushed stone gravel base provides frost drainage and uniform weight distribution.
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
            href="/tools/gravel-calculator"
            className="p-3.5 rounded-xl bg-[#FFFFFF] hover:bg-[#FAF6F0] border border-[#E6DDD1] text-left transition-colors group block"
          >
            <div className="font-semibold text-sm text-[#163A5F] group-hover:underline flex items-center justify-between">
              <span>Gravel Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100" />
            </div>
            <p className="text-xs text-[#6E675E] mt-1 font-sans">Calculate crushed stone sub-base for slabs.</p>
          </Link>
          <Link
            href="/tools/paver-calculator"
            className="p-3.5 rounded-xl bg-[#FFFFFF] hover:bg-[#FAF6F0] border border-[#E6DDD1] text-left transition-colors group block"
          >
            <div className="font-semibold text-sm text-[#163A5F] group-hover:underline flex items-center justify-between">
              <span>Paver Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100" />
            </div>
            <p className="text-xs text-[#6E675E] mt-1 font-sans">Compare concrete slabs with stone or brick pavers.</p>
          </Link>
          <Link
            href="/guides/how-much-gravel-do-i-need"
            className="p-3.5 rounded-xl bg-[#FFFFFF] hover:bg-[#FAF6F0] border border-[#E6DDD1] text-left transition-colors group block"
          >
            <div className="font-semibold text-sm text-[#163A5F] group-hover:underline flex items-center justify-between">
              <span>Gravel Guide</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100" />
            </div>
            <p className="text-xs text-[#6E675E] mt-1 font-sans">How much sub-base gravel do I need?</p>
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
