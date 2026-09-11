import { useState, useEffect, useId, FormEvent, ChangeEvent } from 'react';
import { ChevronDown, ChevronUp, FileDown, Info, ArrowRight } from 'lucide-react';
import { Link } from '../context/NavigationContext';
import { exportSodCalculatorPdf } from '../utils/pdfExport';

type UnitSystem = 'metric' | 'us';
type MeasureMethod = 'rectangle' | 'circle' | 'custom';
type ExtraWastePercent = '0' | '5' | '10' | '15';

interface SodCalculationResult {
  totalArea: number;
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

export function SodCalculatorPage() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');
  const [method, setMethod] = useState<MeasureMethod>('rectangle');
  const [length, setLength] = useState<string>('10');
  const [width, setWidth] = useState<string>('8');
  const [diameter, setDiameter] = useState<string>('10');
  const [customArea, setCustomArea] = useState<string>('80');
  const [extraWaste, setExtraWaste] = useState<ExtraWastePercent>('10');
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SodCalculationResult | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);

  const lengthId = useId();
  const widthId = useId();
  const diameterId = useId();
  const areaId = useId();

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
      if (width && !isNaN(Number(width))) {
        const val = Number(width) * 3.28084;
        setWidth((Math.round(val * 10) / 10).toString());
      }
      if (diameter && !isNaN(Number(diameter))) {
        const val = Number(diameter) * 3.28084;
        setDiameter((Math.round(val * 10) / 10).toString());
      }
      if (customArea && !isNaN(Number(customArea))) {
        const val = Number(customArea) * 10.7639;
        setCustomArea((Math.round(val * 10) / 10).toString());
      }
    } else {
      // US -> Metric (ft -> m: divide by 3.28084)
      if (length && !isNaN(Number(length))) {
        const val = Number(length) / 3.28084;
        setLength((Math.round(val * 10) / 10).toString());
      }
      if (width && !isNaN(Number(width))) {
        const val = Number(width) / 3.28084;
        setWidth((Math.round(val * 10) / 10).toString());
      }
      if (diameter && !isNaN(Number(diameter))) {
        const val = Number(diameter) / 3.28084;
        setDiameter((Math.round(val * 10) / 10).toString());
      }
      if (customArea && !isNaN(Number(customArea))) {
        const val = Number(customArea) / 10.7639;
        setCustomArea((Math.round(val * 10) / 10).toString());
      }
    }

    setUnitSystem(nextSystem);
  };

  // Pure calculation logic
  const calculateSod = (
    currentMethod: MeasureMethod,
    lStr: string,
    wStr: string,
    diaStr: string,
    customAreaStr: string,
    wastePctStr: ExtraWastePercent
  ): SodCalculationResult | null => {
    let baseArea = 0;

    if (currentMethod === 'rectangle') {
      const l = parseFloat(lStr);
      const w = parseFloat(wStr);
      if (isNaN(l) || isNaN(w) || l <= 0 || w <= 0) {
        return null;
      }
      baseArea = l * w;
    } else if (currentMethod === 'circle') {
      const dia = parseFloat(diaStr);
      if (isNaN(dia) || dia <= 0) {
        return null;
      }
      const radius = dia / 2;
      baseArea = Math.PI * radius * radius;
    } else {
      const ca = parseFloat(customAreaStr);
      if (isNaN(ca) || ca <= 0) {
        return null;
      }
      baseArea = ca;
    }

    if (baseArea <= 0) return null;

    const wastePercent = parseFloat(wastePctStr);
    const wasteFactor = wastePercent / 100;
    const extra = baseArea * wasteFactor;
    const recommended = baseArea * (1 + wasteFactor);

    return {
      totalArea: Math.round(baseArea * 100) / 100,
      extraArea: Math.round(extra * 100) / 100,
      recommendedArea: Math.round(recommended * 100) / 100,
      extraPercent: wastePercent,
      lenUnit,
      areaUnit,
    };
  };

  // Calculate on initial load and keep updated
  useEffect(() => {
    const res = calculateSod(method, length, width, diameter, customArea, extraWaste);
    if (res) {
      setResult(res);
      setError(null);
    }
  }, [unitSystem, method, length, width, diameter, customArea, extraWaste]);

  const handlePositiveInput = (setter: (val: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || (!isNaN(Number(val)) && Number(val) >= 0)) {
      setter(val);
      if (error) setError(null);
    }
  };

  const handleCalculate = (e: FormEvent) => {
    e.preventDefault();

    if (method === 'rectangle') {
      const l = parseFloat(length);
      const w = parseFloat(width);
      if (isNaN(l) || l <= 0 || isNaN(w) || w <= 0) {
        setError('Please enter positive numbers for lawn length and width.');
        return;
      }
    } else if (method === 'circle') {
      const dia = parseFloat(diameter);
      if (isNaN(dia) || dia <= 0) {
        setError('Please enter a positive diameter for the circular lawn area.');
        return;
      }
    } else {
      const ca = parseFloat(customArea);
      if (isNaN(ca) || ca <= 0) {
        setError('Please enter a valid lawn area.');
        return;
      }
    }

    const calculated = calculateSod(method, length, width, diameter, customArea, extraWaste);
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
      await exportSodCalculatorPdf({
        unitSystem,
        areaType: method,
        length: method === 'rectangle' ? length : undefined,
        width: method === 'rectangle' ? width : undefined,
        diameter: method === 'circle' ? diameter : undefined,
        customArea: method === 'custom' ? customArea : undefined,
        extraPercent: extraWaste,
        result: {
          totalArea: result.totalArea,
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
            Measivo
          </Link>
          <span>/</span>
          <Link href="/tools" className="hover:text-[#163A5F] transition-colors">
            Tools
          </Link>
          <span>/</span>
          <span className="text-[#1A1918]">Sod Calculator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-[#1A1918] tracking-tight">
          Sod Calculator
        </h1>
        <p className="text-sm sm:text-base text-[#6E675E] font-sans leading-relaxed">
          Calculate how much sod or turf you need for your new lawn in square feet or square meters. Enter your yard dimensions and select extra waste allowance for curved borders and edge trimming.
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
      <form onSubmit={handleCalculate} aria-label="Sod calculation form" className="space-y-6">
        <div className="bg-[#FFFFFF] border border-[#E6DDD1] rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-2px_rgba(180,150,125,0.12)] space-y-6">
          {/* Measurement Method Selector */}
          <div className="space-y-2.5 pb-4 border-b border-[#EAE0D5]">
            <label className="block text-xs sm:text-sm font-semibold text-[#1A1918] font-sans">
              Area shape
            </label>
            <div
              role="radiogroup"
              aria-label="Area shape"
              className="grid grid-cols-3 p-1 rounded-xl bg-[#F5EFE6] border border-[#DFD5C6]"
            >
              <button
                id="shape-rectangle-btn"
                type="button"
                role="radio"
                aria-checked={method === 'rectangle'}
                onClick={() => setMethod('rectangle')}
                className={`min-h-[42px] py-2 px-2.5 rounded-lg text-xs sm:text-sm font-sans font-bold transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer ${
                  method === 'rectangle'
                    ? 'bg-[#FFFFFF] text-[#163A5F] shadow-xs border border-[#E0D5C7]'
                    : 'text-[#6E675E] hover:text-[#1A1918]'
                }`}
              >
                <span>Rectangle</span>
              </button>
              <button
                id="shape-circle-btn"
                type="button"
                role="radio"
                aria-checked={method === 'circle'}
                onClick={() => setMethod('circle')}
                className={`min-h-[42px] py-2 px-2.5 rounded-lg text-xs sm:text-sm font-sans font-bold transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer ${
                  method === 'circle'
                    ? 'bg-[#FFFFFF] text-[#163A5F] shadow-xs border border-[#E0D5C7]'
                    : 'text-[#6E675E] hover:text-[#1A1918]'
                }`}
              >
                <span>Circle</span>
              </button>
              <button
                id="shape-custom-btn"
                type="button"
                role="radio"
                aria-checked={method === 'custom'}
                onClick={() => setMethod('custom')}
                className={`min-h-[42px] py-2 px-2.5 rounded-lg text-xs sm:text-sm font-sans font-bold transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer ${
                  method === 'custom'
                    ? 'bg-[#FFFFFF] text-[#163A5F] shadow-xs border border-[#E0D5C7]'
                    : 'text-[#6E675E] hover:text-[#1A1918]'
                }`}
              >
                <span>Custom area</span>
              </button>
            </div>
          </div>

          {/* Dimension Inputs */}
          <div className="space-y-4">
            {method === 'rectangle' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Length */}
                <div className="space-y-1.5">
                  <label
                    htmlFor={lengthId}
                    className="block text-xs sm:text-sm font-semibold text-[#1A1918] font-sans"
                  >
                    Lawn length
                  </label>
                  <div className="relative">
                    <input
                      id={lengthId}
                      type="number"
                      step="any"
                      min="0"
                      placeholder={isMetric ? 'e.g. 10' : 'e.g. 30'}
                      value={length}
                      onChange={handlePositiveInput(setLength)}
                      className="w-full bg-[#FDFBF7] border border-[#DFD5C6] focus:bg-[#FFFFFF] focus:border-[#163A5F] focus:ring-2 focus:ring-[#163A5F]/15 rounded-xl px-3.5 py-2.5 pr-10 text-base font-mono text-[#1A1918] font-semibold outline-hidden transition-all"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-[#6E675E] pointer-events-none">
                      {lenUnit}
                    </span>
                  </div>
                </div>

                {/* Width */}
                <div className="space-y-1.5">
                  <label
                    htmlFor={widthId}
                    className="block text-xs sm:text-sm font-semibold text-[#1A1918] font-sans"
                  >
                    Lawn width
                  </label>
                  <div className="relative">
                    <input
                      id={widthId}
                      type="number"
                      step="any"
                      min="0"
                      placeholder={isMetric ? 'e.g. 8' : 'e.g. 25'}
                      value={width}
                      onChange={handlePositiveInput(setWidth)}
                      className="w-full bg-[#FDFBF7] border border-[#DFD5C6] focus:bg-[#FFFFFF] focus:border-[#163A5F] focus:ring-2 focus:ring-[#163A5F]/15 rounded-xl px-3.5 py-2.5 pr-10 text-base font-mono text-[#1A1918] font-semibold outline-hidden transition-all"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-[#6E675E] pointer-events-none">
                      {lenUnit}
                    </span>
                  </div>
                </div>
              </div>
            ) : method === 'circle' ? (
              <div className="space-y-1.5 max-w-sm">
                <label
                  htmlFor={diameterId}
                  className="block text-xs sm:text-sm font-semibold text-[#1A1918] font-sans"
                >
                  Lawn diameter
                </label>
                <div className="relative">
                  <input
                    id={diameterId}
                    type="number"
                    step="any"
                    min="0"
                    placeholder={isMetric ? 'e.g. 10' : 'e.g. 30'}
                    value={diameter}
                    onChange={handlePositiveInput(setDiameter)}
                    className="w-full bg-[#FDFBF7] border border-[#DFD5C6] focus:bg-[#FFFFFF] focus:border-[#163A5F] focus:ring-2 focus:ring-[#163A5F]/15 rounded-xl px-3.5 py-2.5 pr-10 text-base font-mono text-[#1A1918] font-semibold outline-hidden transition-all"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-[#6E675E] pointer-events-none">
                    {lenUnit}
                  </span>
                </div>
              </div>
            ) : (
              /* Custom Area: ONLY Show Area and hide other dimensions */
              <div className="space-y-1.5 max-w-sm">
                <label
                  htmlFor={areaId}
                  className="block text-xs sm:text-sm font-semibold text-[#1A1918] font-sans"
                >
                  Lawn area
                </label>
                <div className="relative">
                  <input
                    id={areaId}
                    type="number"
                    step="any"
                    min="0"
                    placeholder={isMetric ? 'e.g. 80' : 'e.g. 800'}
                    value={customArea}
                    onChange={handlePositiveInput(setCustomArea)}
                    className="w-full bg-[#FDFBF7] border border-[#DFD5C6] focus:bg-[#FFFFFF] focus:border-[#163A5F] focus:ring-2 focus:ring-[#163A5F]/15 rounded-xl px-3.5 py-2.5 pr-14 text-base font-mono text-[#1A1918] font-semibold outline-hidden transition-all"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-[#6E675E] pointer-events-none">
                    {areaUnit}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Extra material / waste Selector */}
          <div className="pt-2 border-t border-[#EAE0D5] space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs sm:text-sm font-semibold text-[#1A1918] font-sans">
                Extra sod allowance / waste
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
              Adding 10% extra is standard practice for lawn sod to cover perimeter trimming, curved garden beds, and edge cuts.
            </p>
          </div>

          {/* Helper Explanation Note */}
          <div className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[#EAE0D5] flex items-start gap-2.5 text-xs text-[#5C554B] leading-relaxed font-sans">
            <Info className="w-4 h-4 text-[#163A5F] shrink-0 mt-0.5" />
            <span>
              This calculator provides the total lawn area and recommended sod needed to cover your yard with cutting waste included.
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
            id="calculate-sod-btn"
            type="submit"
            className="w-full min-h-[50px] py-3.5 px-6 rounded-xl bg-[#163A5F] text-[#FFFFFF] text-base font-sans font-bold shadow-[0_3px_12px_rgba(22,58,95,0.2)] hover:bg-[#112F4D] active:scale-[0.99] transition-all cursor-pointer"
          >
            Calculate sod ↓
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
                  {formatAreaDisplay(result.totalArea)}
                </span>
                <span className="text-2xl sm:text-3xl font-display font-bold text-[#0B6E54]">
                  {result.areaUnit}
                </span>
              </div>
              <div className="text-sm font-semibold text-[#0B6E54] font-sans mt-1">
                Lawn surface area
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
                    ? `Includes +${result.extraPercent}% extra for curves, borders, and cutting waste.`
                    : 'Exact lawn area without extra allowance.'}
                </p>
              </div>

              <button
                id="download-sod-pdf-btn"
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
              {method === 'rectangle' ? (
                <>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-[#6E675E]">Lawn length</span>
                    <span className="font-semibold text-[#1A1918]">
                      {length} {result.lenUnit}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-[#6E675E]">Lawn width</span>
                    <span className="font-semibold text-[#1A1918]">
                      {width} {result.lenUnit}
                    </span>
                  </div>
                </>
              ) : method === 'circle' ? (
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-[#6E675E]">Lawn diameter</span>
                  <span className="font-semibold text-[#1A1918]">
                    {diameter} {result.lenUnit}
                  </span>
                </div>
              ) : (
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-[#6E675E]">Custom area</span>
                  <span className="font-semibold text-[#1A1918]">
                    {customArea} {result.areaUnit}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center py-0.5 border-t border-[#E4DCD0] pt-2">
                <span className="text-[#6E675E]">Total lawn area</span>
                <span className="font-semibold text-[#1A1918]">
                  {formatAreaDisplay(result.totalArea)} {result.areaUnit}
                </span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="text-[#6E675E]">Extra allowance ({result.extraPercent}%)</span>
                <span className="font-semibold text-[#163A5F]">
                  +{formatAreaDisplay(result.extraArea)} {result.areaUnit}
                </span>
              </div>
              <div className="flex justify-between items-center py-0.5 border-t border-[#E4DCD0] pt-2 font-bold">
                <span className="text-[#1A1918]">Recommended sod amount</span>
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
            How Much Sod Do I Need?
          </h2>
          <p className="text-base text-[#4E4942] leading-relaxed">
            Planning a new turf installation or revitalizing your lawn requires accurate measurements to avoid running short during installation or paying for unused turf that quickly wilts. Using a precise <strong>sod calculator</strong> gives you the exact square footage or square meterage needed for your yard with an optimal cutting buffer.
          </p>
        </div>

        {/* How to Measure & Calculate Sod */}
        <div className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-display font-bold text-[#1A1918]">
            How to Calculate Sod for Your Lawn
          </h3>
          <p className="text-base text-[#4E4942] leading-relaxed">
            To determine how much sod you need, measure your lawn area according to its geometric shape:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E4DCD0] space-y-1.5">
              <h4 className="font-bold text-sm text-[#1A1918]">Rectangular Lawns</h4>
              <p className="text-xs text-[#6E675E] leading-relaxed">
                Multiply length by width in feet or meters:
              </p>
              <p className="font-mono font-bold text-xs text-[#163A5F]">
                Area = Length × Width
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E4DCD0] space-y-1.5">
              <h4 className="font-bold text-sm text-[#1A1918]">Circular Lawns</h4>
              <p className="text-xs text-[#6E675E] leading-relaxed">
                Divide the diameter by 2 to get the radius:
              </p>
              <p className="font-mono font-bold text-xs text-[#163A5F]">
                Area = π × (Diameter / 2)²
              </p>
            </div>
          </div>
        </div>

        {/* Why Add Extra Buffer */}
        <div className="space-y-3">
          <h3 className="text-xl sm:text-2xl font-display font-bold text-[#1A1918]">
            Why You Should Order Extra Sod
          </h3>
          <p className="text-base text-[#4E4942] leading-relaxed">
            Unlike painting or drywalling where spare materials can be stored for months, fresh sod is living grass that must be installed immediately upon delivery. Adding <strong>10% extra sod</strong> is strongly recommended to account for:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-sm sm:text-base text-[#4E4942] pl-1">
            <li>Curved landscaping borders, garden pathways, and flowerbeds</li>
            <li>Trimming around trees, irrigation boxes, and fence corners</li>
            <li>Fitting odd-angled property boundaries and slopes</li>
            <li>Replacing damaged or dried turf edges during transport</li>
          </ul>
        </div>

        {/* Quick Tips */}
        <div className="p-5 rounded-2xl bg-[#EDF7F2] border border-[#B4E2D3] space-y-2">
          <h4 className="font-bold text-sm text-[#0B6E54]">Sod Installation Pro Tip</h4>
          <p className="text-xs sm:text-sm text-[#0B6E54] leading-relaxed">
            Always measure your yard in sections if you have an irregular landscape. Calculate each rectangle or curved patch separately, then sum the areas together in the <strong>Custom area</strong> input to ensure comprehensive coverage.
          </p>
        </div>

        {/* Related Calculators & Internal Links */}
        <div className="pt-6 border-t border-[#EAE0D5] space-y-4">
          <h3 className="text-lg sm:text-xl font-display font-bold text-[#1A1918]">
            Related Landscaping & Yard Calculators
          </h3>
          <p className="text-sm text-[#4E4942] font-sans">
            Prepping your lawn base or enclosing your new sod turf? Calculate materials with these tools:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <Link
              href="/tools/topsoil-calculator"
              className="p-3.5 rounded-xl bg-[#FAF6F0] hover:bg-[#F3ECE0] border border-[#E4DCD0] text-left transition-colors group block"
            >
              <div className="font-semibold text-sm text-[#163A5F] group-hover:underline flex items-center justify-between">
                <span>Topsoil Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100" />
              </div>
              <p className="text-xs text-[#6E675E] mt-1 font-sans">Calculate screened soil for lawn underlay and seedbed prep.</p>
            </Link>
            <Link
              href="/tools/mulch-calculator"
              className="p-3.5 rounded-xl bg-[#FAF6F0] hover:bg-[#F3ECE0] border border-[#E4DCD0] text-left transition-colors group block"
            >
              <div className="font-semibold text-sm text-[#163A5F] group-hover:underline flex items-center justify-between">
                <span>Mulch Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100" />
              </div>
              <p className="text-xs text-[#6E675E] mt-1 font-sans">Estimate bark mulch for garden beds bordering your lawn.</p>
            </Link>
            <Link
              href="/tools/fence-calculator"
              className="p-3.5 rounded-xl bg-[#FAF6F0] hover:bg-[#F3ECE0] border border-[#E4DCD0] text-left transition-colors group block"
            >
              <div className="font-semibold text-sm text-[#163A5F] group-hover:underline flex items-center justify-between">
                <span>Fence Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100" />
              </div>
              <p className="text-xs text-[#6E675E] mt-1 font-sans">Calculate perimeter fencing and pickets around your yard.</p>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
