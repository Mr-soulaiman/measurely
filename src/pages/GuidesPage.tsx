import { Link } from '../context/NavigationContext';
import { BookOpen, ArrowRight } from 'lucide-react';

export function GuidesPage() {
  return (
    <main className="flex-1 max-w-2xl w-full mx-auto px-5 py-8 sm:py-12 space-y-8">
      {/* 1. Page Header */}
      <section aria-labelledby="guides-heading" className="space-y-2">
        <h1
          id="guides-heading"
          className="text-3xl sm:text-4xl font-display font-extrabold text-[#1A1918] tracking-tight"
        >
          Guides
        </h1>
        <p className="text-base sm:text-lg text-[#4E4942] leading-relaxed font-sans">
          Simple guides to help you plan your projects.
        </p>
      </section>

      {/* 2. Clean Empty State */}
      <section aria-labelledby="empty-state-heading">
        <div className="p-8 sm:p-12 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] shadow-[0_4px_20px_-2px_rgba(180,150,125,0.12)] text-center space-y-5">
          <div className="w-12 h-12 mx-auto rounded-xl bg-[#EDF7F2] text-[#0B6E54] flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>

          <div className="space-y-1.5 max-w-sm mx-auto">
            <h2
              id="empty-state-heading"
              className="text-xl font-display font-bold text-[#1A1918]"
            >
              Guides are coming soon.
            </h2>
            <p className="text-sm text-[#6E675E] font-sans leading-relaxed">
              We are working on clear, step-by-step guides for painting, flooring, tiling, and more.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#163A5F] text-white font-sans text-sm font-bold shadow-[0_2px_8px_rgba(22,58,95,0.2)] hover:bg-[#112F4D] transition-all cursor-pointer"
            >
              <span>Explore tools</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
