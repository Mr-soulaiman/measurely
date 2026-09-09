import { useState, useEffect, useId, FormEvent, ChangeEvent } from 'react';
import { ArrowRight, ChevronDown, ChevronUp, FileDown, Info } from 'lucide-react';
import { Link } from '../context/NavigationContext';
import { exportFlooringCalculatorPdf } from '../utils/pdfExport';

type UnitSystem = 'metric' | 'us';
type MeasureMethod = 'rectangle' | 'circle' | 'custom';
type ExtraWastePercent = '0' | '5' | '10' | '15';

interface FlooringCalculationResult {
  floorArea: number;
  extraArea: number;
  recommendedArea: number;
  extraPercent: number;
  lenUnit: 'm' | 'ft';
  areaUnit: 'm²' | 'sq ft';
}

function formatAreaDisplay(val: number): string {
  if (val <= 0 || isNaN(val)) return '0';
  const rounded = Math.round(val * 100) / 100;
  return rounded.toString();
}

export function FlooringCalculatorPage() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');
  const [method, setMethod] = useState<MeasureMethod>('rectangle');
  const [length, setLength] = useState<string>('5');
  const [width, setWidth] = useState<string>('4');
  const [diameter, setDiameter] = useState<string>('4');
  const [customArea, setCustomArea] = useState<string>('20');
  const [extraWaste, setExtraWaste] = useState<ExtraWastePercent>('10');
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<FlooringCalculationResult | null>(null);
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
  const calculateFlooring = (
    currentMethod: MeasureMethod,
    lStr: string,
    wStr: string,
    diaStr: string,
    customAreaStr: string,
    wastePctStr: ExtraWastePercent
  ): FlooringCalculationResult | null => {
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
      floorArea: Math.round(baseArea * 100) / 100,
      extraArea: Math.round(extra * 100) / 100,
      recommendedArea: Math.round(recommended * 100) / 100,
      extraPercent: wastePercent,
      lenUnit,
      areaUnit,
    };
  };

  // Live recalculate
  useEffect(() => {
    const res = calculateFlooring(method, length, width, diameter, customArea, extraWaste);
    if (res) {
      setResult(res);
      setError(null);
    }
  }, [method, length, width, diameter, customArea, extraWaste, unitSystem]);

  const handleCalculate = (e: FormEvent) => {
    e.preventDefault();
    const res = calculateFlooring(method, length, width, diameter, customArea, extraWaste);
    if (!res) {
      if (method === 'rectangle') {
        setError('Please enter a valid length and width greater than 0.');
      } else if (method === 'circle') {
        setError('Please enter a valid diameter greater than 0.');
      } else {
        setError('Please enter a valid area greater than 0.');
      }
      setResult(null);
      return;
    }

    setError(null);
    setResult(res);

    // Smooth scroll to result
    const resultElement = document.getElementById('result-box');
    if (resultElement) {
      resultElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handlePositiveInput = (setter: (v: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || (!val.includes('-') && !isNaN(Number(val)))) {
      setter(val);
    }
  };

  const handleDownloadPdf = async () => {
    if (!result) return;
    try {
      setIsGeneratingPdf(true);
      await exportFlooringCalculatorPdf({
        unitSystem,
        method,
        length: method === 'rectangle' ? length : undefined,
        width: method === 'rectangle' ? width : undefined,
        diameter: method === 'circle' ? diameter : undefined,
        customArea: method === 'custom' ? customArea : undefined,
        extraPercent: extraWaste,
        result,
      });
    } catch (err) {
      console.error('Failed to export Flooring calculation PDF:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <main className="flex-1 max-w-xl w-full mx-auto px-5 py-8 sm:py-12 flex flex-col justify-center">
      {/* 1. Title & Intro */}
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-display font-extrabold text-[#1A1918] tracking-tight leading-tight mb-2.5">
          Flooring Calculator
        </h1>
        <p className="text-base sm:text-lg text-[#4E4942] leading-relaxed font-sans">
          Find out how much flooring you need for a room or floor area. Enter your room dimensions or custom area and add extra material for cuts and waste.
        </p>
      </div>

      {/* 2. Unit System Selector */}
      <section aria-label="Unit system selection" className="mb-7">
        <div className="grid grid-cols-2 gap-1.5 p-1.5 bg-[#EDE5DA] rounded-xl border border-[#DDD3C5] shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)]">
          <button
            id="unit-metric-btn"
            type="button"
            aria-label="Switch to Metric units (metres, square metres)"
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
      <form onSubmit={handleCalculate} aria-label="Flooring calculation form" className="space-y-6">
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
                    Floor length
                  </label>
                  <div className="relative">
                    <input
                      id={lengthId}
                      type="number"
                      step="any"
                      min="0"
                      placeholder={isMetric ? 'e.g. 5' : 'e.g. 16'}
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
                    Floor width
                  </label>
                  <div className="relative">
                    <input
                      id={widthId}
                      type="number"
                      step="any"
                      min="0"
                      placeholder={isMetric ? 'e.g. 4' : 'e.g. 12'}
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
              /* Circle: Diameter */
              <div className="space-y-1.5">
                <label
                  htmlFor={diameterId}
                  className="block text-xs sm:text-sm font-semibold text-[#1A1918] font-sans"
                >
                  Diameter
                </label>
                <div className="relative">
                  <input
                    id={diameterId}
                    type="number"
                    step="any"
                    min="0"
                    placeholder={isMetric ? 'e.g. 4' : 'e.g. 12'}
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
              /* Custom Area */
              <div className="space-y-2">
                <div className="space-y-1.5">
                  <label
                    htmlFor={areaId}
                    className="block text-xs sm:text-sm font-semibold text-[#1A1918] font-sans"
                  >
                    Area
                  </label>
                  <div className="relative">
                    <input
                      id={areaId}
                      type="number"
                      step="any"
                      min="0"
                      placeholder={isMetric ? 'e.g. 20' : 'e.g. 200'}
                      value={customArea}
                      onChange={handlePositiveInput(setCustomArea)}
                      className="w-full bg-[#FDFBF7] border border-[#DFD5C6] focus:bg-[#FFFFFF] focus:border-[#163A5F] focus:ring-2 focus:ring-[#163A5F]/15 rounded-xl px-3.5 py-2.5 pr-12 text-base font-mono text-[#1A1918] font-semibold outline-hidden transition-all"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-[#6E675E] pointer-events-none">
                      {areaUnit}
                    </span>
                  </div>
                </div>
                <div className="space-y-1 text-xs text-[#6E675E] font-sans leading-relaxed">
                  <p>For irregular rooms or multiple areas, enter the total floor area you want to cover.</p>
                  <p>Measure each section separately and add the areas together.</p>
                </div>
              </div>
            )}
          </div>

          {/* Extra material / waste Selector */}
          <div className="pt-2 border-t border-[#EAE0D5] space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs sm:text-sm font-semibold text-[#1A1918] font-sans">
                Extra material / waste
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
              Adding 10% extra material helps cover room cuts, corner fitting, and waste during installation.
            </p>
          </div>

          {/* Helper Explanation Note */}
          <div className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[#EAE0D5] flex items-start gap-2.5 text-xs text-[#5C554B] leading-relaxed font-sans">
            <Info className="w-4 h-4 text-[#163A5F] shrink-0 mt-0.5" />
            <span>
              This calculator estimates the amount of flooring needed for a floor. It can be used for laminate, vinyl, hardwood, carpet, and similar flooring materials.
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
            id="calculate-flooring-btn"
            type="submit"
            className="w-full min-h-[50px] py-3.5 px-6 rounded-xl bg-[#163A5F] text-[#FFFFFF] text-base font-sans font-bold shadow-[0_3px_12px_rgba(22,58,95,0.2)] hover:bg-[#112F4D] active:scale-[0.99] transition-all cursor-pointer"
          >
            Calculate flooring ↓
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
                  {formatAreaDisplay(result.floorArea)}
                </span>
                <span className="text-2xl sm:text-3xl font-display font-bold text-[#0B6E54]">
                  {result.areaUnit}
                </span>
              </div>
              <div className="text-sm font-semibold text-[#0B6E54] font-sans mt-1">
                Floor area
              </div>
            </div>
          </div>

          {/* 2. WHAT TO BUY */}
          <div className="p-5 sm:p-6 rounded-xl bg-[#FAF6F0] border border-[#E6DDD1] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6E675E] font-sans">
                  WHAT TO BUY
                </span>
                <div className="flex items-baseline gap-2.5 flex-wrap mt-0.5">
                  <span className="text-4xl sm:text-5xl font-display font-bold text-[#1A1918] tracking-tight">
                    {formatAreaDisplay(result.recommendedArea)}
                  </span>
                  <span className="text-2xl sm:text-3xl font-display font-bold text-[#1A1918]">
                    {result.areaUnit}
                  </span>
                </div>
                <div className="text-sm font-semibold text-[#163A5F] font-sans mt-1">
                  Recommended amount
                </div>
                <p className="text-xs text-[#6E675E] font-sans mt-1">
                  {result.extraPercent > 0
                    ? `Includes ${result.extraPercent}% extra material for cuts and waste.`
                    : 'Does not include extra material for cuts.'}
                </p>
              </div>

              <button
                id="view-calculation-details-btn"
                type="button"
                onClick={() => setShowDetails((prev) => !prev)}
                className="inline-flex items-center gap-1.5 text-xs font-sans font-bold text-[#163A5F] hover:underline cursor-pointer py-1 self-start shrink-0"
                aria-expanded={showDetails}
                aria-controls="calculation-details-panel"
              >
                <span>{showDetails ? 'Hide calculation details' : 'View calculation details'}</span>
                {showDetails ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* 3. Collapsible Details */}
          {showDetails && (
            <div
              id="calculation-details-panel"
              className="p-5 rounded-xl bg-[#FAF6F0] border border-[#E4DCD0] space-y-2.5 font-sans text-xs sm:text-sm animate-in fade-in duration-150"
            >
              {method === 'rectangle' ? (
                <>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-[#6E675E]">Floor length</span>
                    <span className="font-semibold text-[#1A1918]">
                      {length} {result.lenUnit}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-[#6E675E]">Floor width</span>
                    <span className="font-semibold text-[#1A1918]">
                      {width} {result.lenUnit}
                    </span>
                  </div>
                </>
              ) : method === 'circle' ? (
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-[#6E675E]">Diameter</span>
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
                <span className="text-[#6E675E]">Floor area</span>
                <span className="font-semibold text-[#1A1918]">
                  {formatAreaDisplay(result.floorArea)} {result.areaUnit}
                </span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="text-[#6E675E]">Extra allowance ({result.extraPercent}%)</span>
                <span className="font-semibold text-[#163A5F]">
                  +{formatAreaDisplay(result.extraArea)} {result.areaUnit}
                </span>
              </div>
              <div className="flex justify-between items-center py-0.5 border-t border-[#E4DCD0] pt-2 font-bold text-sm">
                <span className="text-[#1A1918]">Recommended amount</span>
                <span className="text-[#0B6E54]">
                  {formatAreaDisplay(result.recommendedArea)} {result.areaUnit}
                </span>
              </div>
            </div>
          )}

          {/* Download PDF button below the final result */}
          <div className="pt-2 border-t border-[#EAE0D5]">
            <button
              id="download-pdf-btn"
              type="button"
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="w-full min-h-[46px] py-3 px-5 rounded-xl bg-[#FAF6F0] hover:bg-[#F3ECE0] border border-[#DDD3C5] text-[#163A5F] font-sans font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xs hover:border-[#163A5F]/30 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <FileDown className="w-4 h-4 text-[#163A5F]" />
              <span>{isGeneratingPdf ? 'Generating PDF...' : 'Download PDF'}</span>
            </button>
          </div>
        </section>
      )}

      {/* 5. SEO Content Below Calculator */}
      <section aria-labelledby="how-much-flooring-heading" className="mt-10 p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] shadow-[0_4px_20px_-2px_rgba(180,150,125,0.12)] space-y-3">
        <h2
          id="how-much-flooring-heading"
          className="text-xl sm:text-2xl font-display font-bold text-[#1A1918]"
        >
          How much flooring do I need?
        </h2>
        <p className="text-sm sm:text-base text-[#4E4942] leading-relaxed font-sans">
          This flooring calculator estimates the area you need to cover and adds your chosen extra amount for cuts, waste, and small measurement differences.
        </p>
      </section>

      <section aria-labelledby="how-it-works-heading" className="mt-6 p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] shadow-[0_4px_20px_-2px_rgba(180,150,125,0.12)] space-y-3">
        <h2
          id="how-it-works-heading"
          className="text-xl sm:text-2xl font-display font-bold text-[#1A1918]"
        >
          How the flooring calculator works
        </h2>
        <p className="text-sm sm:text-base text-[#4E4942] leading-relaxed font-sans">
          Enter the dimensions or custom area of your floor. The calculator works out the floor area and then adds your chosen extra percentage to give you the amount of flooring to buy.
        </p>
      </section>

      <section aria-labelledby="flooring-types-heading" className="mt-6 p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] shadow-[0_4px_20px_-2px_rgba(180,150,125,0.12)] space-y-3">
        <h2
          id="flooring-types-heading"
          className="text-xl sm:text-2xl font-display font-bold text-[#1A1918]"
        >
          What flooring can I use this calculator for?
        </h2>
        <p className="text-sm sm:text-base text-[#4E4942] leading-relaxed font-sans">
          You can use this calculator for laminate, vinyl, hardwood, carpet, and similar flooring materials. Check the coverage information for your specific product when buying.
        </p>
      </section>

      {/* 6. Internal Navigation Link */}
      <section aria-label="Explore more tools" className="mt-6">
        <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] shadow-[0_4px_20px_-2px_rgba(180,150,125,0.12)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="text-sm text-[#4E4942] font-sans">
            Need to estimate materials for another project?
          </span>
          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#163A5F] hover:underline shrink-0"
          >
            <span>Explore more calculators</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
