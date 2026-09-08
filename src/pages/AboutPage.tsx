export function AboutPage() {
  return (
    <main className="flex-1 max-w-2xl w-full mx-auto px-5 py-8 sm:py-12 space-y-8">
      {/* 1. Header */}
      <section aria-labelledby="about-heading" className="space-y-2">
        <h1
          id="about-heading"
          className="text-3xl sm:text-4xl font-display font-extrabold text-[#1A1918] tracking-tight"
        >
          About Measurely
        </h1>
      </section>

      {/* 2. Content */}
      <section className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] shadow-[0_4px_20px_-2px_rgba(180,150,125,0.12)] space-y-4">
        <p className="text-base sm:text-lg text-[#1A1918] leading-relaxed font-sans">
          Measurely creates simple calculators that help you estimate the materials needed for everyday home and DIY projects.
        </p>
        <p className="text-sm sm:text-base text-[#4E4942] leading-relaxed font-sans">
          Our goal is to make project planning easier without complicated calculations, confusing formulas, or unnecessary steps.
        </p>
      </section>
    </main>
  );
}
