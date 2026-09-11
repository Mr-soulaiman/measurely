import { Paintbrush, Grid, Layers, Shovel, Box, Trees, Sparkles, ArrowUpRight } from 'lucide-react';

interface WorkshopShowcaseProps {
  onSelectPaintTool: () => void;
}

export function WorkshopShowcase({ onSelectPaintTool }: WorkshopShowcaseProps) {
  const categories = [
    {
      category: 'HOME & FINISHES',
      code: 'SEC-01',
      description: 'Interior coatings, surface tiling, and architectural flooring geometry.',
      tools: [
        {
          name: 'Paint Calculator',
          status: 'Active Tool',
          active: true,
          unit: 'Litres & Coats',
          icon: Paintbrush,
          accent: 'text-[#C2410C]',
          border: 'border-[#C2410C]/40 bg-[#FFF5EB]/60',
        },
        {
          name: 'Tile & Grout Calculator',
          status: 'Phase 1 Queue',
          active: false,
          unit: 'Grid & Waste m²',
          icon: Grid,
          accent: 'text-[#73716B]',
          border: 'border-[#E5E3DD] bg-[#FAF9F5]',
        },
        {
          name: 'Flooring Plank Estimator',
          status: 'Phase 1 Queue',
          active: false,
          unit: 'Pack Quantities',
          icon: Layers,
          accent: 'text-[#73716B]',
          border: 'border-[#E5E3DD] bg-[#FAF9F5]',
        },
      ],
    },
    {
      category: 'BUILD & STRUCTURAL',
      code: 'SEC-02',
      description: 'Volumetric aggregate, slab pours, and sub-base compaction.',
      tools: [
        {
          name: 'Concrete Slab Calculator',
          status: 'Phase 2 Queue',
          active: false,
          unit: 'Cubic Metres (m³)',
          icon: Box,
          accent: 'text-[#73716B]',
          border: 'border-[#E5E3DD] bg-[#FAF9F5]',
        },
        {
          name: 'Gravel & Sub-Base',
          status: 'Phase 2 Queue',
          active: false,
          unit: 'Metric Tonnes',
          icon: Box,
          accent: 'text-[#73716B]',
          border: 'border-[#E5E3DD] bg-[#FAF9F5]',
        },
        {
          name: 'Mortar & Cement Ratio',
          status: 'Phase 2 Queue',
          active: false,
          unit: 'Bags & Sand',
          icon: Box,
          accent: 'text-[#73716B]',
          border: 'border-[#E5E3DD] bg-[#FAF9F5]',
        },
      ],
    },
    {
      category: 'GARDEN & LANDSCAPE',
      code: 'SEC-03',
      description: 'Organic bulk materials, mulch depth, and raised planter bed soil volumes.',
      tools: [
        {
          name: 'Raised Bed Soil Volume',
          status: 'Phase 3 Queue',
          active: false,
          unit: 'Blend Percentages',
          icon: Sparkles,
          accent: 'text-[#73716B]',
          border: 'border-[#E5E3DD] bg-[#FAF9F5]',
        },
      ],
    },
  ];

  return (
    <section id="workshop-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-[#E5E3DD]">
      {/* Editorial Statement */}
      <div className="mb-14">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C2410C]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#73716B]">
            WORKSHOP CATALOGUE & PIPELINE
          </span>
        </div>
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A1918] tracking-tight">
            “Measure once. Calculate twice.”
          </h2>
          <p className="mt-3 text-base text-[#54524D] leading-relaxed">
            Measivo is building the single most precise suite of architectural and DIY measurement instruments. Starting with our calibrated Paint Engine, each calculator treats physical materials with engineering precision.
          </p>
        </div>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="border border-[#E5E3DD] rounded-xl p-6 bg-[#FAF9F5] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#EAE8E1] mb-4">
                <span className="font-mono text-xs font-bold text-[#1A1918] tracking-wider">
                  {cat.category}
                </span>
                <span className="font-mono text-[10px] text-[#A8A29E]">
                  {cat.code}
                </span>
              </div>
              <p className="text-xs text-[#73716B] leading-relaxed mb-6">
                {cat.description}
              </p>

              <div className="space-y-3">
                {cat.tools.map((tool, tIdx) => {
                  const Icon = tool.icon;
                  if (tool.active) {
                    return (
                      <button
                        key={tIdx}
                        onClick={onSelectPaintTool}
                        className={`w-full text-left p-3.5 rounded-lg border ${tool.border} flex items-center justify-between hover:border-[#C2410C] transition-all cursor-pointer shadow-xs group`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-[#FFF5EB] border border-[#FED7AA] flex items-center justify-center">
                            <Icon className="w-4 h-4 text-[#C2410C]" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-[#1A1918] group-hover:text-[#C2410C] transition-colors flex items-center gap-1.5">
                              <span>{tool.name}</span>
                              <ArrowUpRight className="w-3.5 h-3.5 text-[#C2410C]" />
                            </div>
                            <div className="text-[11px] font-mono text-[#73716B]">
                              {tool.unit}
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#C2410C] text-white">
                          READY
                        </span>
                      </button>
                    );
                  }

                  return (
                    <div
                      key={tIdx}
                      className={`p-3.5 rounded-lg border ${tool.border} flex items-center justify-between opacity-80`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-[#F3F2ED] flex items-center justify-center text-[#73716B]">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-[#54524D]">
                            {tool.name}
                          </div>
                          <div className="text-[11px] font-mono text-[#A8A29E]">
                            {tool.unit}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-[#A8A29E] bg-[#EAE8E1] px-2 py-0.5 rounded">
                        {tool.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#EAE8E1] text-[11px] font-mono text-[#A8A29E]">
              STANDARDIZED ESTIMATION SYSTEM
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
