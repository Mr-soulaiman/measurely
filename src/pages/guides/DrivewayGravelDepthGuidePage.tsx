import { Link } from '../../context/NavigationContext';
import { GravelToolIcon } from '../../components/ToolIcons';
import { ArrowLeft, ArrowRight, Calculator, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';

export function DrivewayGravelDepthGuidePage() {
  return (
    <main className="flex-1 max-w-4xl w-full mx-auto px-5 py-8 sm:py-12 space-y-10">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[#6E675E] font-sans">
        <Link href="/guides" className="hover:text-[#163A5F] transition-colors">Guides</Link>
        <span aria-hidden="true">/</span>
        <span className="text-[#1A1918] font-medium truncate">How Deep Should Driveway Gravel Be?</span>
      </nav>

      {/* Guide Header */}
      <header className="space-y-4 border-b border-[#E6DDD1] pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F4EDE4] text-[#7A5B3E] text-xs font-semibold uppercase tracking-wider">
          <Layers className="w-4 h-4 text-[#7A5B3E]" />
          Gravel Depth &amp; Structure
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#1A1918] tracking-tight leading-tight">
          How Deep Should Driveway Gravel Be?
        </h1>
        <p className="text-lg sm:text-xl text-[#4E4942] font-sans leading-relaxed">
          Why driveway depth dictates both your budget and longevity, how layer thickness changes between refreshes and new builds, and the risks of making gravel too shallow or too deep.
        </p>
      </header>

      {/* Quick Answer Summary Callout */}
      <section className="p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] border-2 border-[#163A5F]/20 shadow-[0_4px_20px_-2px_rgba(22,58,95,0.08)] space-y-3">
        <div className="flex items-center gap-2.5 text-[#163A5F]">
          <CheckCircle2 className="w-5 h-5 text-[#0B6E54] shrink-0" />
          <h2 className="text-lg font-display font-bold text-[#1A1918]">The Short Answer</h2>
        </div>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          For an <strong>existing driveway with a hard, solid foundation</strong>, aim for a top-dressing layer of <strong>2 to 3 inches (50 to 75 mm)</strong>. For a <strong>brand-new driveway built over raw ground</strong>, you need <strong>8 to 12 inches (200 to 300 mm) of total foundation</strong> installed in graded layers: heavy crushed stone at the bottom, a dense binding middle layer, and a 2-inch surface stone on top.
        </p>
      </section>

      {/* Section 1: Why Depth Changes the Quantity So Dramatically */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          Why Depth Changes Your Quantity Dramatically
        </h2>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          When measuring a driveway, length and width are fixed by your property boundaries. Depth is the single variable you control, and small adjustments have a massive impact on the bill.
        </p>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          For a standard 12 ft × 60 ft driveway (720 square feet), increasing your target thickness by just <strong>1 single inch</strong> adds:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1]">
            <div className="text-xs text-[#6E675E] font-semibold uppercase">Additional Volume</div>
            <div className="text-2xl font-bold font-mono text-[#1A1918] mt-1">+2.22 cu yd</div>
            <div className="text-xs text-[#4E4942] mt-0.5">60 cu ft of stone</div>
          </div>
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1]">
            <div className="text-xs text-[#6E675E] font-semibold uppercase">Additional Weight</div>
            <div className="text-2xl font-bold font-mono text-[#0B6E54] mt-1">+3.1 Tons</div>
            <div className="text-xs text-[#4E4942] mt-0.5">At ~1.4 tons per yard</div>
          </div>
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1]">
            <div className="text-xs text-[#6E675E] font-semibold uppercase">Typical Extra Cost</div>
            <div className="text-2xl font-bold font-mono text-[#163A5F] mt-1">+$100 to $170</div>
            <div className="text-xs text-[#4E4942] mt-0.5">Material &amp; haulage</div>
          </div>
        </div>

        <p className="text-xs text-[#6E675E]">
          Going from a 2-inch layer to a 4-inch layer exactly doubles your material tonnage and hauling expense. That is why choosing the right depth before ordering is essential.
        </p>
      </section>

      {/* Visual Diagram: Cross Section (Refresh vs New Construction) */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          Cross-Section: Surface Refresh vs New Multi-Layer Build
        </h2>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          Dumping 8 inches of small decorative gravel directly into dirt will fail. Without a structured base, heavy vehicle tires push small stones into the mud while pumping wet subsoil up to the surface.
        </p>

        <div className="p-4 sm:p-6 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F0EAE1] pb-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#6E675E]">
              Visual Cross-Section: Structural Layer Comparison
            </div>
            <span className="text-xs text-[#0B6E54] font-medium">
              Mobile-optimized layer view
            </span>
          </div>

          {/* Responsive 2-Card Cross-Section Comparison (Stacks on mobile, side-by-side on desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Left Card: Existing Refresh */}
            <div className="rounded-2xl border-2 border-[#DFD5C6] bg-[#FCFAF7] p-4 sm:p-5 space-y-4 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-display font-bold text-[#1A1918]">Existing Driveway Refresh</h3>
                    <p className="text-xs text-[#6E675E] mt-0.5">For driveways with an established hard base</p>
                  </div>
                  <span className="inline-block px-2.5 py-1 rounded-full bg-[#E8DED1] text-[#2C2720] text-xs font-bold shrink-0">
                    2″–3″ Total
                  </span>
                </div>

                {/* Layer Stacks */}
                <div className="space-y-2.5 mt-4">
                  {/* Surface Layer */}
                  <div className="p-3.5 rounded-xl bg-[#D3C3AD] border-2 border-[#8E785F] text-[#2C2720] flex items-start gap-3">
                    <span className="px-2 py-1 rounded-md bg-[#8E785F] text-white text-xs font-mono font-bold shrink-0">
                      2″–3″
                    </span>
                    <div className="space-y-0.5">
                      <div className="text-sm font-bold text-[#1A1918]">Surface Top-Dressing</div>
                      <p className="text-xs text-[#4E4942]">#57 crushed stone or chips. Provides fresh traction and fills shallow tire ruts.</p>
                    </div>
                  </div>

                  {/* Existing Compacted Base */}
                  <div className="p-3.5 rounded-xl bg-[#E8DED1] border-2 border-dashed border-[#B8AEA0] text-[#5A5348] flex items-start gap-3">
                    <span className="px-2 py-1 rounded-md bg-[#B8AEA0] text-white text-xs font-mono font-bold shrink-0">
                      Base
                    </span>
                    <div className="space-y-0.5">
                      <div className="text-sm font-bold text-[#1A1918]">Compacted Existing Base</div>
                      <p className="text-xs text-[#6E675E]">Hard rock and fines already packed solid over years of vehicular use.</p>
                    </div>
                  </div>

                  {/* Native Subsoil */}
                  <div className="p-3 rounded-xl bg-[#DDD7CF] text-[#6E675E] flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded bg-[#C7BFB5] text-[#4E4942] text-[11px] font-mono font-bold shrink-0">
                      Subsoil
                    </span>
                    <div className="text-xs font-medium text-[#4E4942]">Undisturbed Native Ground</div>
                  </div>
                </div>
              </div>

              <div className="text-xs font-semibold text-[#7A5B3E] pt-2 border-t border-[#E8DED1]">
                ✓ Fast installation • Low tonnage • Minimal excavation
              </div>
            </div>

            {/* Right Card: New Build */}
            <div className="rounded-2xl border-2 border-[#0B6E54] bg-[#FCFAF7] p-4 sm:p-5 space-y-4 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-display font-bold text-[#0B6E54]">New Driveway Build</h3>
                    <p className="text-xs text-[#6E675E] mt-0.5">Built on bare dirt, lawn, or excavated ground</p>
                  </div>
                  <span className="inline-block px-2.5 py-1 rounded-full bg-[#EDF7F2] text-[#0B6E54] text-xs font-bold shrink-0">
                    8″–10″ Total
                  </span>
                </div>

                {/* Layer Stacks */}
                <div className="space-y-2.5 mt-4">
                  {/* Top Layer */}
                  <div className="p-3.5 rounded-xl bg-[#D3C3AD] border-2 border-[#8E785F] text-[#2C2720] flex items-start gap-3">
                    <span className="px-2 py-1 rounded-md bg-[#8E785F] text-white text-xs font-mono font-bold shrink-0">
                      2″ Top
                    </span>
                    <div className="space-y-0.5">
                      <div className="text-sm font-bold text-[#1A1918]">Washed Surface Stone</div>
                      <p className="text-xs text-[#4E4942]">Clean #57 angular gravel for smooth driving, tire grip, and rainwater shedding.</p>
                    </div>
                  </div>

                  {/* Middle Layer */}
                  <div className="p-3.5 rounded-xl bg-[#D5CEC2] border-2 border-[#8E8578] text-[#1A1918] flex items-start gap-3">
                    <span className="px-2 py-1 rounded-md bg-[#8E8578] text-white text-xs font-mono font-bold shrink-0">
                      3″–4″
                    </span>
                    <div className="space-y-0.5">
                      <div className="text-sm font-bold text-[#1A1918]">Crusher Run Intermediate Base</div>
                      <p className="text-xs text-[#4E4942]">3/4″ rock mixed with stone dust fines. Interlocks under compaction like cement.</p>
                    </div>
                  </div>

                  {/* Bottom Foundation Layer */}
                  <div className="p-3.5 rounded-xl bg-[#B8AEA0] border-2 border-[#6E675E] text-white flex items-start gap-3">
                    <span className="px-2 py-1 rounded-md bg-[#6E675E] text-white text-xs font-mono font-bold shrink-0">
                      4″–5″
                    </span>
                    <div className="space-y-0.5">
                      <div className="text-sm font-bold text-[#1A1918]">Coarse #3 / #4 Ballast Stone</div>
                      <p className="text-xs text-[#4E4942]">Large 2″–3″ angular bedrock foundation that bridges soft ground and drains water.</p>
                    </div>
                  </div>

                  {/* Geotextile Fabric Divider */}
                  <div className="py-2 px-3 rounded-lg bg-[#163A5F]/10 border border-dashed border-[#163A5F] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#163A5F] shrink-0"></span>
                    <span className="text-xs font-bold text-[#163A5F]">
                      Heavy-Duty Geotextile Stabilization Fabric (prevents rock sinking into clay)
                    </span>
                  </div>

                  {/* Excavated Trench */}
                  <div className="p-2.5 rounded-xl bg-[#DDD7CF] text-[#6E675E] flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded bg-[#C7BFB5] text-[#4E4942] text-[11px] font-mono font-bold shrink-0">
                      Trench
                    </span>
                    <div className="text-xs font-medium text-[#4E4942]">Excavated Subgrade Dirt Trench</div>
                  </div>
                </div>
              </div>

              <div className="text-xs font-semibold text-[#0B6E54] pt-2 border-t border-[#BCE5D6]">
                ✓ Full vehicle weight support • No sinking • Decades of durability
              </div>
            </div>
          </div>

          <div className="pt-2 text-xs text-[#6E675E] leading-relaxed border-t border-[#F0EAE1]">
            <strong>Pro Tip:</strong> Never pour fine gravel directly on top of wet clay without heavy-duty geotextile fabric. The fabric allows rainwater to drain through while preventing heavy vehicles from pushing gravel down into the mud.
          </div>
        </div>
      </section>

      {/* Section 2: What Happens When Gravel is Too Shallow vs Too Deep */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          The Goldilocks Zone: What Happens When Depth is Off
        </h2>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          Homeowners frequently make one of two mistakes: skimping on depth to save money, or over-ordering loose gravel assuming &quot;thicker is always better.&quot;
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Too Shallow */}
          <div className="p-4 rounded-xl bg-[#FFF5F5] border border-[#F5C2C2] space-y-2">
            <div className="flex items-center gap-1.5 text-[#C45A3C] font-bold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>Too Shallow (&lt; 1.5&quot;)</span>
            </div>
            <h3 className="text-base font-bold text-[#1A1918]">Rutting &amp; Soil Pumping</h3>
            <ul className="text-xs text-[#4E4942] space-y-1.5 list-disc list-inside">
              <li>Tires displace the thin stones, exposing bare dirt or landscape fabric within weeks.</li>
              <li>Water easily pools in tire tracks, turning low spots into muddy puddles.</li>
              <li>Weed seeds find direct purchase in the exposed dirt below.</li>
            </ul>
          </div>

          {/* Ideal Depth */}
          <div className="p-4 rounded-xl bg-[#EDF7F2] border border-[#BCE5D6] space-y-2">
            <div className="flex items-center gap-1.5 text-[#0B6E54] font-bold text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Ideal Depth (2&quot;–3&quot;)</span>
            </div>
            <h3 className="text-base font-bold text-[#1A1918]">Interlocking Stability</h3>
            <ul className="text-xs text-[#4E4942] space-y-1.5 list-disc list-inside">
              <li>Individual stones pack together firmly under vehicle weight.</li>
              <li>Rainwater drains freely through the surface to the crowned base.</li>
              <li>Cars, delivery vans, and wheelbarrows drive without slipping.</li>
            </ul>
          </div>

          {/* Too Deep */}
          <div className="p-4 rounded-xl bg-[#FFFBF0] border border-[#F0DCB8] space-y-2">
            <div className="flex items-center gap-1.5 text-[#B88219] font-bold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>Too Deep (&gt; 4&quot; Loose)</span>
            </div>
            <h3 className="text-base font-bold text-[#1A1918]">The &quot;Beach Sand&quot; Effect</h3>
            <ul className="text-xs text-[#4E4942] space-y-1.5 list-disc list-inside">
              <li>Car tires sink into the deep loose gravel, requiring high throttle to move.</li>
              <li>Bicycles, strollers, and trash bins become almost impossible to push.</li>
              <li>Loose rocks constantly spray into your lawn whenever cars accelerate.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 3: Ground Conditions and Soil Factors */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          How Your Ground and Climate Influence Depth
        </h2>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          No single depth number works for every property. When planning your project, take these site factors into account:
        </p>

        <div className="space-y-3 text-sm text-[#4E4942]">
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-1">
            <strong className="text-[#1A1918] block font-semibold">1. Heavy Clay Soil vs Sandy Soil</strong>
            <p className="text-xs leading-relaxed">
              Clay soil expands when wet and contracts when dry. During spring thaws or heavy rainfall, clay turns to soft mud that swallows gravel whole. If you have clay soil, excavate at least 10 inches deep and install woven geotextile fabric beneath your foundation rock. Sandy soil drains naturally and usually requires 2 to 3 fewer inches of base.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-1">
            <strong className="text-[#1A1918] block font-semibold">2. Vehicle Weight (Cars vs Delivery Trucks)</strong>
            <p className="text-xs leading-relaxed">
              A standard passenger car weighs 3,000 to 4,500 pounds. However, home driveways regularly support heating oil trucks, septic pumpers, and parcel delivery vans weighing 15,000 to 30,000 pounds. If large service vehicles regularly use your driveway, build the bottom base layer with larger 2- to 3-inch ballast stone.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] space-y-1">
            <strong className="text-[#1A1918] block font-semibold">3. Winter Snow Removal</strong>
            <p className="text-xs leading-relaxed">
              If you use a snow plow or snowblower in winter, keep your loose top layer to no more than 2 inches, and choose angular crushed stone rather than round pea gravel. Angular stones lock into place, making them much less likely to be scooped into your lawn by a plow blade.
            </p>
          </div>
        </div>
      </section>

      {/* Realistic Calculation Comparison */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-[#1A1918]">
          Real-World Comparison: 50 ft × 12 ft Driveway
        </h2>
        <p className="text-base text-[#4E4942] font-sans leading-relaxed">
          Here is how your total gravel quantity scales across different depths for a standard 50-foot residential driveway (600 sq ft):
        </p>

        <div className="overflow-x-auto rounded-xl border border-[#E6DDD1]">
          <table className="w-full text-left text-sm font-sans bg-[#FFFFFF]">
            <thead className="bg-[#F6EFE6] border-b border-[#E6DDD1] text-[#1A1918] font-bold text-xs uppercase tracking-wider">
              <tr>
                <th className="p-3.5 sm:p-4">Depth</th>
                <th className="p-3.5 sm:p-4">Best Used For</th>
                <th className="p-3.5 sm:p-4">Volume</th>
                <th className="p-3.5 sm:p-4">Est. Tonnage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EAE1] text-[#4E4942]">
              <tr>
                <td className="p-3.5 sm:p-4 font-semibold text-[#1A1918]">1.5 inches (38 mm)</td>
                <td className="p-3.5 sm:p-4 text-xs">Light cosmetic touch-up on solid stone</td>
                <td className="p-3.5 sm:p-4 font-mono text-xs">2.78 cu yd</td>
                <td className="p-3.5 sm:p-4 font-bold text-[#0B6E54]">~3.9 Tons</td>
              </tr>
              <tr className="bg-[#FBF9F5]">
                <td className="p-3.5 sm:p-4 font-semibold text-[#1A1918]">2.5 inches (64 mm)</td>
                <td className="p-3.5 sm:p-4 text-xs">Standard refresh on existing driveway</td>
                <td className="p-3.5 sm:p-4 font-mono text-xs">4.63 cu yd</td>
                <td className="p-3.5 sm:p-4 font-bold text-[#0B6E54]">~6.5 Tons</td>
              </tr>
              <tr>
                <td className="p-3.5 sm:p-4 font-semibold text-[#1A1918]">4.0 inches (100 mm)</td>
                <td className="p-3.5 sm:p-4 text-xs">Crushed base layer over subgrade</td>
                <td className="p-3.5 sm:p-4 font-mono text-xs">7.41 cu yd</td>
                <td className="p-3.5 sm:p-4 font-bold text-[#0B6E54]">~10.4 Tons</td>
              </tr>
              <tr className="bg-[#FBF9F5]">
                <td className="p-3.5 sm:p-4 font-semibold text-[#1A1918]">8.0 inches (200 mm)</td>
                <td className="p-3.5 sm:p-4 text-xs">Full multi-layer excavation (total project)</td>
                <td className="p-3.5 sm:p-4 font-mono text-xs">14.81 cu yd</td>
                <td className="p-3.5 sm:p-4 font-bold text-[#0B6E54]">~20.7 Tons</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Interactive Tool Banner */}
      <section className="p-6 rounded-2xl bg-gradient-to-br from-[#163A5F] to-[#0D243B] text-white space-y-3">
        <div className="flex items-center gap-2 text-[#80D4B6]">
          <Calculator className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Measivo Online Tool</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
          Experiment with Custom Depths
        </h2>
        <p className="text-sm text-white/80 max-w-2xl leading-relaxed">
          Plug in your exact driveway measurements and test 2-inch, 3-inch, or full 8-inch depths to immediately see volume and truckload estimates.
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
              Step-by-step calculations, area measurements, and delivery truck capacities.
            </p>
          </Link>

          <Link
            href="/guides/how-to-calculate-gravel-for-an-irregular-area"
            className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] hover:border-[#163A5F]/40 transition-all group"
          >
            <div className="text-xs font-semibold text-[#0B6E54] uppercase tracking-wider">Complex Layouts</div>
            <div className="text-base font-bold text-[#1A1918] group-hover:text-[#163A5F] transition-colors">
              Gravel for Irregular &amp; L-Shaped Areas →
            </div>
            <p className="text-xs text-[#6E675E] mt-1">
              How to measure parking spurs, turnarounds, and curved driveway sections.
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
