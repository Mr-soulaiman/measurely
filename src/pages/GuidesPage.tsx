import type { ComponentType } from 'react';
import { Link } from '../context/NavigationContext';
import { ArrowRight, BookOpen, Calculator } from 'lucide-react';
import { FlooringToolIcon, GravelToolIcon, PaintToolIcon } from '../components/ToolIcons';

export interface GuideItem {
  id: string;
  title: string;
  description: string;
  href: string;
  category: string;
  icon?: ComponentType<{ className?: string }>;
  calculatorHref?: string;
  calculatorLabel?: string;
}

export const GUIDES: GuideItem[] = [
  {
    id: 'how-much-paint-do-i-need-for-2-coats',
    title: 'How Much Paint Do I Need for 2 Coats?',
    description: 'Understand coverage differences between coats, why drywall absorbs coat 1 faster, and how to calculate exact gallon and quart purchases.',
    href: '/guides/how-much-paint-do-i-need-for-2-coats',
    category: 'Paint & Walls',
    icon: PaintToolIcon,
    calculatorHref: '/tools/paint-calculator',
    calculatorLabel: 'Paint Calculator',
  },
  {
    id: 'do-you-calculate-paint-from-wall-area-or-floor-area',
    title: 'Do You Calculate Paint From Wall Area or Floor Area?',
    description: 'Learn why floor area alone causes major shortages, how room perimeter links the two, and how ceiling height changes wall square footage.',
    href: '/guides/do-you-calculate-paint-from-wall-area-or-floor-area',
    category: 'Paint & Walls',
    icon: PaintToolIcon,
    calculatorHref: '/tools/paint-calculator',
    calculatorLabel: 'Paint Calculator',
  },
  {
    id: 'how-much-paint-do-i-need-for-one-room',
    title: 'How Much Paint Do I Need for One Room?',
    description: 'A step-by-step measuring blueprint: perimeter formulas, door and window deductions, 2-coat math, and when to buy quarts vs full gallons.',
    href: '/guides/how-much-paint-do-i-need-for-one-room',
    category: 'Paint & Walls',
    icon: PaintToolIcon,
    calculatorHref: '/tools/paint-calculator',
    calculatorLabel: 'Paint Calculator',
  },
  {
    id: 'how-much-paint-do-i-need-for-a-ceiling',
    title: 'How Much Paint Do I Need for a Ceiling?',
    description: 'Calculate ceiling square footage, compare smooth drywall vs popcorn texture absorption, and learn why ceiling paint is formulated dead flat.',
    href: '/guides/how-much-paint-do-i-need-for-a-ceiling',
    category: 'Paint & Walls',
    icon: PaintToolIcon,
    calculatorHref: '/tools/paint-calculator',
    calculatorLabel: 'Paint Calculator',
  },
  {
    id: 'how-much-gravel-do-i-need-for-a-driveway',
    title: 'How Much Gravel Do I Need for a Driveway?',
    description: 'Calculate exact volume in cubic yards or tonnes, measure length and width, account for compaction, and convert to bulk truckloads.',
    href: '/guides/how-much-gravel-do-i-need-for-a-driveway',
    category: 'Gravel & Driveways',
    icon: GravelToolIcon,
    calculatorHref: '/tools/gravel-calculator',
    calculatorLabel: 'Gravel Calculator',
  },
  {
    id: 'how-deep-should-driveway-gravel-be',
    title: 'How Deep Should Driveway Gravel Be?',
    description: 'Learn why depth changes material orders drastically, comparing 2–3 inch surface refreshes against 8–10 inch layered new foundations.',
    href: '/guides/how-deep-should-driveway-gravel-be',
    category: 'Gravel & Driveways',
    icon: GravelToolIcon,
    calculatorHref: '/tools/gravel-calculator',
    calculatorLabel: 'Gravel Calculator',
  },
  {
    id: 'how-many-tons-of-gravel-do-i-need',
    title: 'How Many Tons of Gravel Do I Need?',
    description: 'Understand the difference between volume and weight, compare gravel densities (crushed rock vs crusher run), and avoid rainy-day scale surprises.',
    href: '/guides/how-many-tons-of-gravel-do-i-need',
    category: 'Gravel & Driveways',
    icon: GravelToolIcon,
    calculatorHref: '/tools/gravel-calculator',
    calculatorLabel: 'Gravel Calculator',
  },
  {
    id: 'how-to-calculate-gravel-for-an-irregular-area',
    title: 'How to Calculate Gravel for an Irregular Area',
    description: 'Split L-shaped driveways, parking turnarounds, and curved walkways into simple geometric zones to get an accurate total square footage.',
    href: '/guides/how-to-calculate-gravel-for-an-irregular-area',
    category: 'Gravel & Driveways',
    icon: GravelToolIcon,
    calculatorHref: '/tools/gravel-calculator',
    calculatorLabel: 'Gravel Calculator',
  },
  {
    id: 'how-much-extra-flooring-should-you-buy',
    title: 'How Much Extra Flooring Should You Buy?',
    description: 'Learn why purchasing exact room square footage leaves you stranded, how end-of-row cut scraps work, and how whole-box rounding protects your project.',
    href: '/guides/how-much-extra-flooring-should-you-buy',
    category: 'Flooring & Renovation',
    icon: FlooringToolIcon,
    calculatorHref: '/tools/flooring-calculator',
    calculatorLabel: 'Flooring Calculator',
  },
  {
    id: 'what-flooring-waste-percentage-should-you-use',
    title: 'What Flooring Waste Percentage Should You Use?',
    description: 'Decide whether to add 5%, 10%, 15%, or 20% waste based on your room shape, layout complexity, and installation pattern like herringbone or diagonal runs.',
    href: '/guides/what-flooring-waste-percentage-should-you-use',
    category: 'Flooring & Renovation',
    icon: FlooringToolIcon,
    calculatorHref: '/tools/flooring-calculator',
    calculatorLabel: 'Flooring Calculator',
  },
  {
    id: 'how-to-measure-an-l-shaped-room-for-flooring',
    title: 'How to Measure an L-Shaped Room for Flooring',
    description: 'Use the two-rectangle split method and outer subtraction trick to accurately calculate square footage, doorway depth, and box counts for irregular rooms.',
    href: '/guides/how-to-measure-an-l-shaped-room-for-flooring',
    category: 'Room Measuring',
    icon: FlooringToolIcon,
    calculatorHref: '/tools/flooring-calculator',
    calculatorLabel: 'Flooring Calculator',
  },
  {
    id: 'how-much-flooring-do-i-need-for-a-10x10-room',
    title: 'How Much Flooring Do I Need for a 10×10 Room?',
    description: 'A realistic, step-by-step example showing how a 100 sq ft room translates into 110 sq ft with waste, actual carton counts (5 to 6 boxes), and estimated material costs.',
    href: '/guides/how-much-flooring-do-i-need-for-a-10x10-room',
    category: 'Real-World Example',
    icon: FlooringToolIcon,
    calculatorHref: '/tools/flooring-calculator',
    calculatorLabel: 'Flooring Calculator',
  },
];

export function GuidesPage() {
  return (
    <main className="flex-1 max-w-3xl w-full mx-auto px-5 py-8 sm:py-12 space-y-10">
      {/* 1. Page Header */}
      <section aria-labelledby="guides-heading" className="space-y-2">
        <h1
          id="guides-heading"
          className="text-3xl sm:text-4xl font-display font-extrabold text-[#1A1918] tracking-tight"
        >
          Guides
        </h1>
        <p className="text-base sm:text-lg text-[#4E4942] leading-relaxed font-sans">
          Simple, practical guides to help you calculate materials and plan your home and DIY projects.
        </p>
      </section>

      {/* 2. Guides Content or Empty State */}
      {GUIDES.length > 0 ? (
        <section aria-label="Available Guides" className="space-y-4">
          {GUIDES.map((guide) => {
            const Icon = guide.icon || BookOpen;
            return (
              <article
                key={guide.id}
                className="p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] shadow-[0_4px_20px_-2px_rgba(180,150,125,0.12)] hover:border-[#163A5F]/40 transition-all group"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5">
                  <div className="space-y-2.5 flex-1">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-[#EDF7F2] text-[#0B6E54] flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-sans font-semibold uppercase tracking-wider text-[#6E675E]">
                        {guide.category}
                      </span>
                    </div>

                    <Link href={guide.href} className="block group-hover:text-[#163A5F] transition-colors">
                      <h2 className="text-xl sm:text-2xl font-display font-bold text-[#1A1918] group-hover:text-[#163A5F] transition-colors">
                        {guide.title}
                      </h2>
                    </Link>

                    <p className="text-sm sm:text-base text-[#4E4942] font-sans leading-relaxed">
                      {guide.description}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-sans">
                      <Link
                        href={guide.href}
                        className="inline-flex items-center gap-1.5 font-bold text-[#163A5F] hover:underline"
                      >
                        <span>Read guide</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      {guide.calculatorHref && (
                        <>
                          <span className="text-[#C8BEB2]" aria-hidden="true">·</span>
                          <Link
                            href={guide.calculatorHref}
                            className="text-[#6E675E] hover:text-[#163A5F] transition-colors"
                          >
                            Matching {guide.calculatorLabel || 'Calculator'} →
                          </Link>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 sm:pt-1 shrink-0 self-start sm:self-center">
                    <Link
                      href={guide.href}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#163A5F] text-white font-sans text-sm font-bold shadow-[0_2px_8px_rgba(22,58,95,0.2)] hover:bg-[#112F4D] transition-all cursor-pointer whitespace-nowrap"
                    >
                      <span>Read guide</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      ) : (
        <section
          aria-label="Guides in preparation"
          className="p-8 sm:p-12 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] text-center space-y-5 shadow-[0_4px_20px_-2px_rgba(180,150,125,0.12)]"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#F5EFE6] border border-[#E6DDD1] text-[#163A5F] flex items-center justify-center mx-auto">
            <BookOpen className="w-7 h-7" />
          </div>
          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[#1A1918]">
              New guides in progress
            </h2>
            <p className="text-sm sm:text-base text-[#4E4942] font-sans leading-relaxed">
              We are preparing brand-new, practical guides for home and DIY measuring and planning. In the meantime, explore all material calculators below.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/tools"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#163A5F] text-white font-sans text-sm font-bold shadow-[0_2px_8px_rgba(22,58,95,0.2)] hover:bg-[#112F4D] transition-all cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              <span>Browse all calculators</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      {/* 3. Bottom CTA Section */}
      <section className="p-6 sm:p-8 rounded-2xl bg-[#F5EFE6] border border-[#DFD5C6] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#0B6E54] font-semibold text-sm">
            <BookOpen className="w-4 h-4" />
            <span>Need immediate numbers?</span>
          </div>
          <h2 className="font-display font-bold text-lg sm:text-xl text-[#1A1918]">
            Explore all 13 Measivo material calculators
          </h2>
          <p className="text-sm text-[#4E4942] font-sans">
            Calculate concrete, flooring, drywall, pavers, mulch, sod, and more.
          </p>
        </div>
        <Link
          href="/tools"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#163A5F] text-white text-sm font-sans font-bold hover:bg-[#112F4D] transition-all cursor-pointer whitespace-nowrap shrink-0"
        >
          <span>Browse all tools</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </main>
  );
}

