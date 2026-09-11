import type { ComponentType } from 'react';
import { Link } from '../context/NavigationContext';
import { ArrowRight, BookOpen } from 'lucide-react';
import {
  GravelToolIcon,
  SandToolIcon,
  PaintToolIcon,
  FlooringToolIcon,
  ConcreteToolIcon,
} from '../components/ToolIcons';

interface GuideItem {
  id: string;
  title: string;
  description: string;
  href: string;
  category: string;
  icon: ComponentType<{ className?: string }>;
  calculatorHref: string;
  calculatorLabel: string;
}

const GUIDES: GuideItem[] = [
  {
    id: 'how-much-gravel-do-i-need',
    title: 'How Much Gravel Do I Need?',
    description: 'Calculate gravel volume, cubic yards, and tons for driveways, paths, garden borders, and French drains with practical depth recommendations.',
    href: '/guides/how-much-gravel-do-i-need',
    category: 'Landscaping & Driveways',
    icon: GravelToolIcon,
    calculatorHref: '/tools/gravel-calculator',
    calculatorLabel: 'Gravel Calculator',
  },
  {
    id: 'how-much-sand-do-i-need',
    title: 'How Much Sand Do I Need?',
    description: 'Estimate sand cubic yards, cubic metres, tonnes, and 50 lb bags for paver bedding, sandboxes, above-ground pools, and masonry mortar.',
    href: '/guides/how-much-sand-do-i-need',
    category: 'Paving & Masonry',
    icon: SandToolIcon,
    calculatorHref: '/tools/sand-calculator',
    calculatorLabel: 'Sand Calculator',
  },
  {
    id: 'how-much-paint-do-i-need',
    title: 'How Much Paint Do I Need for a Room?',
    description: 'Determine paint gallons or litres for interior walls, ceilings, doors, and trim with opening deductions and multi-coat allowances.',
    href: '/guides/how-much-paint-do-i-need',
    category: 'Interior Decorating',
    icon: PaintToolIcon,
    calculatorHref: '/tools/paint-calculator',
    calculatorLabel: 'Paint Calculator',
  },
  {
    id: 'how-much-flooring-do-i-need',
    title: 'How Much Flooring Do I Need?',
    description: 'Calculate room square footage, cutting waste factors (5% to 15%), and total box counts for laminate, vinyl plank (LVP), and hardwood.',
    href: '/guides/how-much-flooring-do-i-need',
    category: 'Flooring & Renovation',
    icon: FlooringToolIcon,
    calculatorHref: '/tools/flooring-calculator',
    calculatorLabel: 'Flooring Calculator',
  },
  {
    id: 'how-much-concrete-do-i-need',
    title: 'How Much Concrete Do I Need?',
    description: 'Calculate concrete volume in cubic yards or cubic metres and premix bag counts for slabs, footings, patios, driveways, and post holes.',
    href: '/guides/how-much-concrete-do-i-need',
    category: 'Concrete & Foundations',
    icon: ConcreteToolIcon,
    calculatorHref: '/tools/concrete-calculator',
    calculatorLabel: 'Concrete Calculator',
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
          Simple, step-by-step guides to help you estimate materials and plan your home and DIY projects.
        </p>
      </section>

      {/* 2. Guides List */}
      <section aria-label="Available Guides" className="space-y-4">
        {GUIDES.map((guide) => {
          const Icon = guide.icon;
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
                    <span className="text-[#C8BEB2]" aria-hidden="true">·</span>
                    <Link
                      href={guide.calculatorHref}
                      className="text-[#6E675E] hover:text-[#163A5F] transition-colors"
                    >
                      Matching {guide.calculatorLabel} →
                    </Link>
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

      {/* 3. Bottom CTA Section */}
      <section className="p-6 sm:p-8 rounded-2xl bg-[#F5EFE6] border border-[#DFD5C6] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#0B6E54] font-semibold text-sm">
            <BookOpen className="w-4 h-4" />
            <span>Need immediate numbers?</span>
          </div>
          <h2 className="font-display font-bold text-lg sm:text-xl text-[#1A1918]">
            Explore all 13 ProjectTally material calculators
          </h2>
          <p className="text-sm text-[#4E4942] font-sans">
            Calculate concrete, drywall, pavers, mulch, sod, and more.
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
