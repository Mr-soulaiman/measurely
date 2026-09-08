import { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Layers, CheckCircle2, Calculator, ShieldCheck } from 'lucide-react';

export function EducationalContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: 'How many square meters does 1 litre of paint cover on average?',
      a: 'Standard emulsion or latex interior wall paint typically covers 10 to 12 square meters per litre (m²/L) on smooth, primed walls. Porous masonry, fresh plaster, or deeply textured walls may absorb more paint, reducing coverage to 7–9 m²/L. Always check the specification badge on your paint manufacturer\'s tin.',
    },
    {
      q: 'Should I include the ceiling in this wall paint calculation?',
      a: 'No. Ceilings are usually painted with a dedicated flat/matte ceiling white formulation that has anti-reflective properties. Calculate the ceiling separately: Room Length × Room Width, applying 2 coats at standard 10 m²/L coverage.',
    },
    {
      q: 'Do I really need 2 coats of paint?',
      a: 'Yes, in almost all professional painting projects. Even high-grade "one-coat" paints require a second coat for uniform film thickness, durability, and true pigment depth. Two thin coats are always vastly superior to one thick coat, which tends to run, sag, or peel.',
    },
    {
      q: 'What is "waste allowance" and why is 10% recommended?',
      a: 'Waste allowance accounts for physical paint trapped in roller naps and brush bristles, paint clinging to the inside of the can or tray, minor roller spatter, cutting-in excess, and keeping a small leftover jar for future scuff touch-ups. 10% is the architectural industry standard for residential spaces.',
    },
    {
      q: 'How do I paint over a dark wall with a light color?',
      a: 'When making a major chromatic shift (e.g., navy blue or charcoal to warm white), applying a high-opacity stain-blocking primer coat first is essential. Without primer, you may need 3 to 4 coats of expensive topcoat paint to fully conceal the undertone.',
    },
    {
      q: 'Are doors and windows always excluded from wall paint?',
      a: 'Yes. Doors, door frames (architraves), and window trims are typically finished in satin, semi-gloss, or gloss woodwork enamels rather than matte wall emulsion. Excluded openings ensure you don\'t over-purchase wall paint.',
    },
  ];

  return (
    <section id="paint-guide" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-[#E5E3DD]">
      {/* Section Header */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-[#C2410C]">
          <BookOpen className="w-4 h-4" />
          <span>TECHNICAL SPECIFICATIONS & METHODOLOGY</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A1918] tracking-tight">
          The Science of Paint Measurement
        </h2>
        <p className="mt-3 text-base text-[#54524D] leading-relaxed">
          Accurate paint estimation bridges architectural surface geometry with fluid application rates. Below is the exact methodology, formula derivation, and practical guidelines used by professional decorators.
        </p>
      </div>

      {/* 2-Column Grid: Process & Core Formulas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Module 1: How the Calculator Works */}
        <div className="bg-[#FAF9F5] border border-[#E5E3DD] rounded-xl p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-xs font-bold text-[#C2410C] bg-[#FFF5EB] px-2 py-0.5 rounded border border-[#FED7AA]">
              01 / ARCHITECTURE
            </span>
            <h3 className="font-serif font-bold text-xl text-[#1A1918]">
              How the Paint Calculator Works
            </h3>
          </div>
          <p className="text-sm text-[#54524D] leading-relaxed mb-4">
            Rather than relying on vague room estimations, our engine calculates the true planar geometry of your room:
          </p>
          <ul className="space-y-3 text-sm text-[#54524D]">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#C2410C] shrink-0 mt-0.5" />
              <span>
                <strong>Gross Surface Area:</strong> Multiplies wall width by ceiling height across all room walls to establish the total bounding surface.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#C2410C] shrink-0 mt-0.5" />
              <span>
                <strong>Opening Subtraction:</strong> Accurately deducts the square meterage of all doors and windows, preventing costly paint over-orders.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#C2410C] shrink-0 mt-0.5" />
              <span>
                <strong>Spread Rate & Coats:</strong> Translates your paint’s spread rate (m²/L) across required coats to deliver exact volumetric volume in litres.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#C2410C] shrink-0 mt-0.5" />
              <span>
                <strong>Safety Margin:</strong> Integrates a 10% contingency for roller loading, cutting-in, wall porosity, and future touch-ups.
              </span>
            </li>
          </ul>
        </div>

        {/* Module 2: The Formula Explained */}
        <div className="bg-[#FAF9F5] border border-[#E5E3DD] rounded-xl p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-xs font-bold text-[#C2410C] bg-[#FFF5EB] px-2 py-0.5 rounded border border-[#FED7AA]">
              02 / MATHEMATICS
            </span>
            <h3 className="font-serif font-bold text-xl text-[#1A1918]">
              The Formula Explained
            </h3>
          </div>
          <p className="text-sm text-[#54524D] leading-relaxed mb-4">
            The calculation uses deterministic geometric equations:
          </p>
          
          <div className="bg-[#1A1918] text-[#F8F7F4] p-4 rounded-lg font-mono text-xs space-y-2 border border-[#33312E]">
            <div className="text-[#A8A29E]">// 1. Gross Wall Area</div>
            <div className="text-[#FBBF24]">Total Area = Width × Height × Wall Count</div>
            
            <div className="text-[#A8A29E] pt-1">// 2. Deduct Openings</div>
            <div className="text-[#FBBF24]">Paintable Area = Total Area − (Door Area + Window Area)</div>
            
            <div className="text-[#A8A29E] pt-1">// 3. Multi-coat Coverage</div>
            <div className="text-[#FBBF24]">Total Coverage = Paintable Area × Coats</div>
            
            <div className="text-[#A8A29E] pt-1">// 4. Volumetric Conversion & Waste</div>
            <div className="text-white font-bold">
              Final Litres = (Total Coverage ÷ Spread Rate) × (1 + Waste% / 100)
            </div>
          </div>
        </div>
      </div>

      {/* Module 3: Worked Example Walkthrough */}
      <div className="bg-[#F3F2ED] border border-[#E5E3DD] rounded-xl p-6 sm:p-10 mb-16">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold text-[#C2410C] uppercase tracking-wider">
            <Calculator className="w-4 h-4" />
            <span>STEP-BY-STEP WORKED EXAMPLE</span>
          </div>
          <h3 className="text-2xl font-serif font-bold text-[#1A1918] mb-3">
            Real-World Scenario: Standard 5m × 3m Bedroom
          </h3>
          <p className="text-sm text-[#54524D] leading-relaxed mb-6">
            Consider a typical bedroom: 4 walls measuring 5.0m wide by 3.0m high, with 1 standard door (0.9m × 2.1m) and 2 standard windows (1.2m × 1.2m), requiring 2 coats of emulsion with 10 m²/L coverage and a 10% waste allowance.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <div className="bg-[#FAF9F5] p-4 rounded-lg border border-[#E5E3DD]">
              <div className="text-[#73716B] uppercase text-[10px]">Step 1: Gross Area</div>
              <div className="text-base font-bold text-[#1A1918] mt-1">60.00 m²</div>
              <div className="text-[11px] text-[#73716B] mt-1">5m × 3m × 4 walls</div>
            </div>

            <div className="bg-[#FAF9F5] p-4 rounded-lg border border-[#E5E3DD]">
              <div className="text-[#73716B] uppercase text-[10px]">Step 2: Cutouts Area</div>
              <div className="text-base font-bold text-[#C2410C] mt-1">4.77 m²</div>
              <div className="text-[11px] text-[#73716B] mt-1">1.89m² door + 2.88m² windows</div>
            </div>

            <div className="bg-[#FAF9F5] p-4 rounded-lg border border-[#E5E3DD]">
              <div className="text-[#73716B] uppercase text-[10px]">Step 3: 2 Coats Coverage</div>
              <div className="text-base font-bold text-[#1A1918] mt-1">110.46 m²</div>
              <div className="text-[11px] text-[#73716B] mt-1">55.23 m² net × 2 coats</div>
            </div>

            <div className="bg-[#1A1918] text-white p-4 rounded-lg border border-[#33312E]">
              <div className="text-[#A8A29E] uppercase text-[10px]">Step 4: Final Paint</div>
              <div className="text-base font-bold text-[#C2410C] mt-1">12.15 L (Buy 13L)</div>
              <div className="text-[11px] text-[#A8A29E] mt-1">11.05L base + 10% waste</div>
            </div>
          </div>
        </div>
      </div>

      {/* Practical Painting Guides: Coats & Waste */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Guide 1: How many coats? */}
        <div className="border border-[#E5E3DD] bg-[#FAF9F5] rounded-xl p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-4 h-4 text-[#C2410C]" />
            <h4 className="font-serif font-bold text-lg text-[#1A1918]">
              How Many Coats of Paint Should You Use?
            </h4>
          </div>
          <div className="space-y-4 text-xs sm:text-sm text-[#54524D] leading-relaxed">
            <div className="border-l-2 border-[#C2410C] pl-3 py-0.5">
              <strong className="text-[#1A1918] block font-sans">1 Coat (Rare):</strong>
              Refreshing a wall with the exact same color, brand, and finish where the existing surface is clean and undamaged.
            </div>
            <div className="border-l-2 border-[#C2410C] pl-3 py-0.5">
              <strong className="text-[#1A1918] block font-sans">2 Coats (Standard Recommendation):</strong>
              Required for 90% of interior projects. Ensures complete opacity, rich pigmentation, and uniform film thickness to withstand scuffing.
            </div>
            <div className="border-l-2 border-[#C2410C] pl-3 py-0.5">
              <strong className="text-[#1A1918] block font-sans">3+ Coats or Primer + 2 Coats:</strong>
              Mandatory when covering bold contrasting colors (red to white), unpainted fresh drywall/plaster, or highly porous surfaces.
            </div>
          </div>
        </div>

        {/* Guide 2: How much extra paint? */}
        <div className="border border-[#E5E3DD] bg-[#FAF9F5] rounded-xl p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="w-4 h-4 text-[#C2410C]" />
            <h4 className="font-serif font-bold text-lg text-[#1A1918]">
              How Much Extra Paint Should You Buy?
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-[#54524D] leading-relaxed mb-3">
            Running out of paint halfway through a wall leads to visible lap marks and mismatched batches. Here is why a 10% waste buffer is critical:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-[#54524D]">
            <li className="flex items-start gap-2">
              <span className="text-[#C2410C] font-bold">•</span>
              <span><strong>Tool Absorption:</strong> A 9-inch medium pile roller sleeve permanently absorbs 200–300ml of paint before applying anything to the wall.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#C2410C] font-bold">•</span>
              <span><strong>Surface Texture:</strong> Stippled, rough, or previously patched walls require up to 15% more volume than smooth drywalls.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#C2410C] font-bold">•</span>
              <span><strong>Batch Consistency:</strong> Mixing all paint cans together into a bucket ("boxing") before painting prevents subtle tint variations between cans.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* FAQ Section */}
      <div id="paint-faq" className="max-w-3xl">
        <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-[#C2410C]">
          <span>KNOWLEDGE BASE</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1918] mb-6">
          Frequently Asked Questions
        </h3>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-[#E5E3DD] bg-[#FAF9F5] rounded-lg overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-sans text-sm font-semibold text-[#1A1918] hover:text-[#C2410C] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#73716B] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#73716B] shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#54524D] leading-relaxed border-t border-[#EAE8E1]/60">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
