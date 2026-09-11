import { useState, useEffect, useId, FormEvent, ChangeEvent } from 'react';
import { ChevronDown, ChevronUp, FileDown, Info, ArrowRight } from 'lucide-react';
import { Link } from '../context/NavigationContext';
import { exportFenceCalculatorPdf } from '../utils/pdfExport';

type UnitSystem = 'metric' | 'us';
type ExtraWastePercent = '0' | '5' | '10' | '15';

interface FenceCalculationResult {
  fenceArea: number;
  extraArea: number;
  recommendedArea: number;
  extraPercent: number;
  lenUnit: 'm' | 'ft';
  areaUnit: 'm²' | 'sq ft';
}

function formatAreaDisplay(val: number): string {
  if (val <= 0 || isNaN(val)) return '0';
  const rounded = Math.round(val * 100) / 100;
  return rounded.toLocaleString('en-US', { maximumFractionDigits: 2 });
}

export function FenceCalculatorPage() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');
  const [length, setLength] = useState<string>('20');
  const [height, setHeight] = useState<string>('1.8');
  const [extraWaste, setExtraWaste] = useState<ExtraWastePercent>('10');
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<FenceCalculationResult | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);

  const lengthId = useId();
  const heightId = useId();

  const isMetric = unitSystem === 'metric';
  const lenUnit = isMetric ? 'm' : 'ft';
  const areaUnit = isMetric ? 'm²' : 'sq ft';

  // Unit conversion handler
  const handleUnitChange = (nextSystem: UnitSystem) => {
    if (nextSystem === unitSystem) return;

    if (nextSystem === 'us') {
      // Metric -> US (m -> ft: multiply by 3.28084)
      if (length && !isNaN(Number(length))) {
        const val = Number(length) * 3.28084;
        setLength((Math.round(val * 10) / 10).toString());
      }
      if (height && !isNaN(Number(height))) {
        const val = Number(height) * 3.28084;
        setHeight((Math.round(val * 10) / 10).toString());
      }
    } else {
      // US -> Metric (ft -> m: divide by 3.28084)
      if (length && !isNaN(Number(length))) {
        const val = Number(length) / 3.28084;
        setLength((Math.round(val * 10) / 10).toString());
      }
      if (height && !isNaN(Number(height))) {
        const val = Number(height) / 3.28084;
        setHeight((Math.round(val * 10) / 10).toString());
      }
    }

    setUnitSystem(nextSystem);
  };

  // Pure calculation logic
  const calculateFence = (
    lStr: string,
    hStr: string,
    wastePctStr: ExtraWastePercent
  ): FenceCalculationResult | null => {
    const l = parseFloat(lStr);
    const h = parseFloat(hStr);
    if (isNaN(l) || isNaN(h) || l <= 0 || h <= 0) {
      return null;
    }

    const baseArea = l * h;
    if (baseArea <= 0) return null;

    const wastePercent = parseFloat(wastePctStr);
    const wasteFactor = wastePercent / 100;
    const extra = baseArea * wasteFactor;
    const recommended = baseArea * (1 + wasteFactor);

    return {
      fenceArea: Math.round(baseArea * 100) / 100,
      extraArea: Math.round(extra * 100) / 100,
      recommendedArea: Math.round(recommended * 100) / 100,
      extraPercent: wastePercent,
      lenUnit,
      areaUnit,
    };
  };

  // Calculate on initial load and keep updated
  useEffect(() => {
    const res = calculateFence(length, height, extraWaste);
    if (res) {
      setResult(res);
      setError(null);
    }
  }, [unitSystem, length, height, extraWaste]);

  const handlePositiveInput = (setter: (val: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || (!isNaN(Number(val)) && Number(val) >= 0)) {
      setter(val);
      if (error) setError(null);
    }
  };

  const handleCalculate = (e: FormEvent) => {
    e.preventDefault();

    const l = parseFloat(length);
    const h = parseFloat(height);
    if (isNaN(l) || l <= 0 || isNaN(h) || h <= 0) {
      setError('Please enter positive numbers for fence length and height.');
      return;
    }

    const calculated = calculateFence(length, height, extraWaste);
    if (!calculated) {
      setError('Please check your input values.');
      return;
    }

    setResult(calculated);
    setError(null);

    // Scroll to results on mobile
    const resBox = document.getElementById('result-box');
    if (resBox) {
      resBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleDownloadPdf = async () => {
    if (!result) return;
    setIsGeneratingPdf(true);
    try {
      await exportFenceCalculatorPdf({
        unitSystem,
        length,
        height,
        extraPercent: extraWaste,
        result: {
          fenceArea: result.fenceArea,
          extraArea: result.extraArea,
          recommendedArea: result.recommendedArea,
          extraPercent: result.extraPercent,
          lenUnit: result.lenUnit,
          areaUnit: result.areaUnit,
        },
      });
    } catch (err) {
      console.error('Failed to export PDF:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 font-sans text-[#1A1918]">
      {/* 1. Page Header */}
      <div className="mb-6 sm:mb-8 space-y-2">
        <div className="flex items-center gap-2 text-xs text-[#6E675E] font-medium font-sans">
          <Link href="/" className="hover:text-[#163A5F] transition-colors">
            ProjectTally
          </Link>
          <span>/</span>
          <Link href="/tools" className="hover:text-[#163A5F] transition-colors">
            Tools
          </Link>
          <span>/</span>
          <span className="text-[#1A1918]">Fence Calculator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-[#1A1918] tracking-tight">
          Fence Calculator
        </h1>
        <p className="text-sm sm:text-base text-[#6E675E] font-sans leading-relaxed">
          Calculate how much fencing material you need for your property perimeter, privacy screen, or garden enclosure. Enter fence length and height to get total surface area and recommended extra material.
        </p>
      </div>

      {/* 2. Unit System Selector */}
      <section aria-labelledby="unit-system-heading" className="mb-6">
        <h2 id="unit-system-heading" className="sr-only">
          Measurement System
        </h2>
        <div
          role="radiogroup"
          aria-label="Measurement unit system"
          className="grid grid-cols-2 p-1 rounded-xl bg-[#F5EFE6] border border-[#DFD5C6] shadow-inner"
        >
          <button
            id="unit-metric-btn"
            type="button"
            aria-label="Switch to Metric units (meters, square meters)"
            aria-pressed={isMetric}
            onClick={() => handleUnitChange('metric')}
            className={`min-h-[46px] py-2.5 px-3.5 text-xs sm:text-sm md:text-base font-mono tracking-wider uppercase rounded-lg transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 ${
              isMetric
                ? 'bg-[#163A5F] text-white border border-[#112F4D] shadow-[0_2px_6px_rgba(22,58,95,0.25)] font-bold'
                : 'text-[#6E675E] hover:text-[#163A5F] hover:bg-[#FAF6F0]/60 font-semibold'
            }`}
          >
            {isMetric && <span className="w-2 h-2 rounded-full bg-[#38BDF8]" aria-hidden="true" />}
            Metric
          </button>
          <button
            id="unit-us-btn"
            type="button"
            aria-label="Switch to US Imperial units (feet, square feet)"
            aria-pressed={!isMetric}
            onClick={() => handleUnitChange('us')}
            className={`min-h-[46px] py-2.5 px-3.5 text-xs sm:text-sm md:text-base font-mono tracking-wider uppercase rounded-lg transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 ${
              !isMetric
                ? 'bg-[#163A5F] text-white border border-[#112F4D] shadow-[0_2px_6px_rgba(22,58,95,0.25)] font-bold'
                : 'text-[#6E675E] hover:text-[#163A5F] hover:bg-[#FAF6F0]/60 font-semibold'
            }`}
          >
            {!isMetric && <span className="w-2 h-2 rounded-full bg-[#38BDF8]" aria-hidden="true" />}
            US / Imperial
          </button>
        </div>
      </section>

      {/* 3. Form Workspace */}
      <form onSubmit={handleCalculate} aria-label="Fence calculation form" className="space-y-6">
        <div className="bg-[#FFFFFF] border border-[#E6DDD1] rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-2px_rgba(180,150,125,0.12)] space-y-6">
          {/* Dimension Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Length */}
            <div className="space-y-1.5">
              <label
                htmlFor={lengthId}
                className="block text-xs sm:text-sm font-semibold text-[#1A1918] font-sans"
              >
                Fence length / perimeter
              </label>
              <div className="relative">
                <input
                  id={lengthId}
                  type="number"
                  step="any"
                  min="0"
                  placeholder={isMetric ? 'e.g. 20' : 'e.g. 65'}
                  value={length}
                  onChange={handlePositiveInput(setLength)}
                  className="w-full bg-[#FDFBF7] border border-[#DFD5C6] focus:bg-[#FFFFFF] focus:border-[#163A5F] focus:ring-2 focus:ring-[#163A5F]/15 rounded-xl px-3.5 py-2.5 pr-10 text-base font-mono text-[#1A1918] font-semibold outline-hidden transition-all"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-[#6E675E] pointer-events-none">
                  {lenUnit}
                </span>
              </div>
            </div>

            {/* Height */}
            <div className="space-y-1.5">
              <label
                htmlFor={heightId}
                className="block text-xs sm:text-sm font-semibold text-[#1A1918] font-sans"
              >
                Fence height
              </label>
              <div className="relative">
                <input
                  id={heightId}
                  type="number"
                  step="any"
                  min="0"
                  placeholder={isMetric ? 'e.g. 1.8' : 'e.g. 6'}
                  value={height}
                  onChange={handlePositiveInput(setHeight)}
                  className="w-full bg-[#FDFBF7] border border-[#DFD5C6] focus:bg-[#FFFFFF] focus:border-[#163A5F] focus:ring-2 focus:ring-[#163A5F]/15 rounded-xl px-3.5 py-2.5 pr-10 text-base font-mono text-[#1A1918] font-semibold outline-hidden transition-all"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-[#6E675E] pointer-events-none">
                  {lenUnit}
                </span>
              </div>
            </div>
          </div>

          {/* Extra material / waste Selector */}
          <div className="pt-2 border-t border-[#EAE0D5] space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs sm:text-sm font-semibold text-[#1A1918] font-sans">
                Extra fencing allowance / waste
              </label>
            </div>
            <div
              role="radiogroup"
              aria-label="Extra material percentage"
              className="grid grid-cols-4 gap-2"
            >
              {(['0', '5', '10', '15'] as const).map((pct) => (
                <button
                  key={pct}
                  id={`extra-waste-${pct}-btn`}
                  type="button"
                  role="radio"
                  aria-checked={extraWaste === pct}
                  onClick={() => setExtraWaste(pct)}
                  className={`min-h-[42px] py-2 px-2 text-xs sm:text-sm font-mono font-bold rounded-xl border transition-all cursor-pointer ${
                    extraWaste === pct
                      ? 'bg-[#163A5F] text-white border-[#112F4D] shadow-xs'
                      : 'bg-[#FDFBF7] text-[#4E4942] border-[#DFD5C6] hover:bg-[#FFFFFF] hover:border-[#163A5F]'
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
            <p className="text-xs text-[#6E675E] font-sans pt-1 leading-relaxed">
              Adding 10% extra is recommended for fencing to cover corner joints, trimming, post-overlap, and cut waste.
            </p>
          </div>

          {/* Helper Explanation Note */}
          <div className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[#EAE0D5] flex items-start gap-2.5 text-xs text-[#5C554B] leading-relaxed font-sans">
            <Info className="w-4 h-4 text-[#163A5F] shrink-0 mt-0.5" />
            <span>
              This calculator estimates total fence face area and recommended surface material required to enclose your boundary with cutting waste included.
            </span>
          </div>
        </div>

        {/* Validation Error Message */}
        {error && (
          <div
            className="p-4 rounded-xl bg-[#FAF0EB] border border-[#F5D8CE] text-[#D95D39] text-sm font-sans leading-relaxed"
            role="alert"
          >
            {error}
          </div>
        )}

        {/* Submit Button */}
        <div>
          <button
            id="calculate-fence-btn"
            type="submit"
            className="w-full min-h-[50px] py-3.5 px-6 rounded-xl bg-[#163A5F] text-[#FFFFFF] text-base font-sans font-bold shadow-[0_3px_12px_rgba(22,58,95,0.2)] hover:bg-[#112F4D] active:scale-[0.99] transition-all cursor-pointer"
          >
            Calculate fencing ↓
          </button>
        </div>
      </form>

      {/* 4. Results Box */}
      {result !== null && (
        <section
          id="result-box"
          aria-labelledby="results-heading"
          className="scroll-mt-6 mt-8 p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] shadow-[0_4px_24px_rgba(180,150,125,0.12)] space-y-4 animate-in fade-in duration-200"
          role="region"
          aria-live="polite"
        >
          {/* 1. YOU NEED */}
          <div className="p-6 sm:p-7 rounded-xl bg-[#EDF7F2] border border-[#B4E2D3] space-y-2">
            <div>
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#0B6E54]">
                YOU NEED
              </span>
              <div className="flex items-baseline gap-2.5 flex-wrap mt-1">
                <span className="text-5xl sm:text-6xl font-display font-extrabold text-[#0B6E54] tracking-tight">
                  {formatAreaDisplay(result.fenceArea)}
                </span>
                <span className="text-2xl sm:text-3xl font-display font-bold text-[#0B6E54]">
                  {result.areaUnit}
                </span>
              </div>
              <div className="text-sm font-semibold text-[#0B6E54] font-sans mt-1">
                Fence surface area
              </div>
            </div>
          </div>

          {/* 2. WHAT TO BUY */}
          <div className="p-5 sm:p-6 rounded-xl bg-[#FAF6F0] border border-[#E6DDD1] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-1">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#6E675E] font-sans">
                    WHAT TO BUY
                  </span>
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-3xl sm:text-4xl font-display font-bold text-[#163A5F]">
                      {formatAreaDisplay(result.recommendedArea)}
                    </span>
                    <span className="text-xl sm:text-2xl font-display font-semibold text-[#163A5F]">
                      {result.areaUnit}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-[#6E675E] font-sans mt-1">
                  {result.extraPercent > 0
                    ? `Includes +${result.extraPercent}% extra for ends, corner overlaps, and cutting waste.`
                    : 'Exact fence surface area without extra allowance.'}
                </p>
              </div>

              <button
                id="download-fence-pdf-btn"
                type="button"
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#DFD5C6] bg-[#FFFFFF] hover:bg-[#FAF6F0] text-[#163A5F] text-xs sm:text-sm font-sans font-bold shadow-xs hover:border-[#163A5F] transition-all cursor-pointer shrink-0 disabled:opacity-50"
              >
                <FileDown className="w-4 h-4 text-[#163A5F]" />
                <span>{isGeneratingPdf ? 'Creating PDF...' : 'Download PDF'}</span>
              </button>
            </div>
          </div>

          {/* 3. VIEW CALCULATION DETAILS */}
          <div className="pt-2">
            <button
              id="toggle-details-btn"
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="w-full flex items-center justify-between py-2 text-xs font-sans font-semibold text-[#6E675E] hover:text-[#1A1918] transition-colors cursor-pointer"
            >
              <span>{showDetails ? 'Hide calculation details' : 'View calculation details'}</span>
              {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {showDetails && (
            <div
              id="details-panel"
              className="p-4 rounded-xl bg-[#FAF6F0] border border-[#EAE0D5] text-xs font-sans space-y-2 animate-in fade-in duration-150"
            >
              <div className="flex justify-between items-center py-0.5">
                <span className="text-[#6E675E]">Fence length / perimeter</span>
                <span className="font-semibold text-[#1A1918]">
                  {length} {result.lenUnit}
                </span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="text-[#6E675E]">Fence height</span>
                <span className="font-semibold text-[#1A1918]">
                  {height} {result.lenUnit}
                </span>
              </div>
              <div className="flex justify-between items-center py-0.5 border-t border-[#E4DCD0] pt-2">
                <span className="text-[#6E675E]">Total fence area</span>
                <span className="font-semibold text-[#1A1918]">
                  {formatAreaDisplay(result.fenceArea)} {result.areaUnit}
                </span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="text-[#6E675E]">Extra allowance ({result.extraPercent}%)</span>
                <span className="font-semibold text-[#163A5F]">
                  +{formatAreaDisplay(result.extraArea)} {result.areaUnit}
                </span>
              </div>
              <div className="flex justify-between items-center py-0.5 border-t border-[#E4DCD0] pt-2 font-bold">
                <span className="text-[#1A1918]">Recommended fence material</span>
                <span className="text-[#0B6E54] text-sm">
                  {formatAreaDisplay(result.recommendedArea)} {result.areaUnit}
                </span>
              </div>
            </div>
          )}
        </section>
      )}

      {/* 5. Informational & SEO Content */}
      <article className="mt-12 pt-8 border-t border-[#EAE0D5] space-y-8 font-sans">
        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#1A1918]">
            How Much Fencing Do I Need?
          </h2>
          <p className="text-base text-[#4E4942] leading-relaxed">
            Whether installing a new privacy screen, wooden picket fence, or boundary enclosure around your garden, knowing the exact surface area is the foundational step. Using an accurate <strong>fence calculator</strong> allows you to calculate total square meters or square footage with a built-in safety margin for cuts and fitting.
          </p>
        </div>

        {/* How to Calculate Fence Surface Area */}
        <div className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-display font-bold text-[#1A1918]">
            How to Calculate Fence Surface Area
          </h3>
          <p className="text-base text-[#4E4942] leading-relaxed">
            The total face area of a fence is calculated by multiplying its total running length by its finished height:
          </p>
          <div className="p-5 rounded-xl bg-[#FAF6F0] border border-[#E4DCD0] space-y-2 max-w-xl">
            <div className="font-mono font-bold text-sm text-[#163A5F]">
              Fence Area = Total Length × Fence Height
            </div>
            <p className="text-xs text-[#6E675E] leading-relaxed">
              For example, a 20-meter perimeter fence that is 1.8 meters high gives 36 m² of fence face area.
            </p>
          </div>
        </div>

        {/* Why Add Extra Buffer */}
        <div className="space-y-3">
          <h3 className="text-xl sm:text-2xl font-display font-bold text-[#1A1918]">
            Why Add an Extra Material Buffer?
          </h3>
          <p className="text-base text-[#4E4942] leading-relaxed">
            Fencing materials often require trimming to match sloped terrain, corner intersections, and end posts. Adding <strong>10% extra allowance</strong> provides a buffer to cover:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-sm sm:text-base text-[#4E4942] pl-1">
            <li>End cuts and custom spacing adjustments</li>
            <li>Board trimming on undulating or sloping ground</li>
            <li>Natural wood defects or damaged slats during assembly</li>
            <li>Matching panel overlap and capping strips</li>
          </ul>
        </div>

        {/* Quick Tips */}
        <div className="p-5 rounded-2xl bg-[#EDF7F2] border border-[#B4E2D3] space-y-2">
          <h4 className="font-bold text-sm text-[#0B6E54]">Fence Planning Tip</h4>
          <p className="text-xs sm:text-sm text-[#0B6E54] leading-relaxed">
            Measure your property boundaries along the ground contour. If your fence has multiple height steps (e.g. 1.8m in the back and 1.2m on the side), calculate each section individually and combine them for accurate material ordering.
          </p>
        </div>

        {/* Related Calculators & Internal Links */}
        <div className="pt-6 border-t border-[#EAE0D5] space-y-4">
          <h3 className="text-lg sm:text-xl font-display font-bold text-[#1A1918]">
            Related Outdoor & Yard Calculators
          </h3>
          <p className="text-sm text-[#4E4942] font-sans">
            Complement your fencing installation with these related ProjectTally tools:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <Link
              href="/tools/sod-calculator"
              className="p-3.5 rounded-xl bg-[#FAF6F0] hover:bg-[#F3ECE0] border border-[#E4DCD0] text-left transition-colors group block"
            >
              <div className="font-semibold text-sm text-[#163A5F] group-hover:underline flex items-center justify-between">
                <span>Sod Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100" />
              </div>
              <p className="text-xs text-[#6E675E] mt-1 font-sans">Calculate lawn turf to lay up to your new fence boundary.</p>
            </Link>
            <Link
              href="/tools/concrete-calculator"
              className="p-3.5 rounded-xl bg-[#FAF6F0] hover:bg-[#F3ECE0] border border-[#E4DCD0] text-left transition-colors group block"
            >
              <div className="font-semibold text-sm text-[#163A5F] group-hover:underline flex items-center justify-between">
                <span>Concrete Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100" />
              </div>
              <p className="text-xs text-[#6E675E] mt-1 font-sans">Calculate premix concrete volume for setting fence posts.</p>
            </Link>
            <Link
              href="/tools/paint-calculator"
              className="p-3.5 rounded-xl bg-[#FAF6F0] hover:bg-[#F3ECE0] border border-[#E4DCD0] text-left transition-colors group block"
            >
              <div className="font-semibold text-sm text-[#163A5F] group-hover:underline flex items-center justify-between">
                <span>Paint Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100" />
              </div>
              <p className="text-xs text-[#6E675E] mt-1 font-sans">Estimate exterior wood stain or fence paint quantities.</p>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
