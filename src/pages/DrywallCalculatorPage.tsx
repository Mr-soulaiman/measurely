import { useState, useEffect, useId, FormEvent, ChangeEvent } from 'react';
import { ChevronDown, ChevronUp, FileDown, Info, ArrowRight } from 'lucide-react';
import { Link } from '../context/NavigationContext';
import { exportDrywallCalculatorPdf } from '../utils/pdfExport';

type UnitSystem = 'metric' | 'us';
type AreaType = 'rectangle' | 'custom';
type ExtraWastePercent = '0' | '5' | '10' | '15';

interface DrywallCalculationResult {
  totalArea: number;
  singleSheetArea: number;
  rawBaseSheets: number;
  baseSheets: number;
  areaWithWaste: number;
  rawRecommendedSheets: number;
  recommendedSheets: number;
  extraSheets: number;
  extraPercent: number;
  lenUnit: 'm' | 'ft';
  areaUnit: 'm²' | 'sq ft';
}

function formatAreaDisplay(val: number): string {
  if (val <= 0 || isNaN(val)) return '0';
  const rounded = Math.round(val * 100) / 100;
  return rounded.toString();
}

function formatSheetAreaDisplay(val: number): string {
  if (val <= 0 || isNaN(val)) return '0';
  const rounded = Math.round(val * 1000) / 1000;
  return rounded.toString();
}

export function DrywallCalculatorPage() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');
  const [areaType, setAreaType] = useState<AreaType>('rectangle');
  const [length, setLength] = useState<string>('5');
  const [width, setWidth] = useState<string>('3');
  const [customArea, setCustomArea] = useState<string>('15');
  const [sheetLength, setSheetLength] = useState<string>('2.4');
  const [sheetWidth, setSheetWidth] = useState<string>('1.2');
  const [extraWaste, setExtraWaste] = useState<ExtraWastePercent>('10');
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DrywallCalculationResult | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);

  const lengthId = useId();
  const widthId = useId();
  const customAreaId = useId();
  const sheetLengthId = useId();
  const sheetWidthId = useId();

  const isMetric = unitSystem === 'metric';
  const lenUnit = isMetric ? 'm' : 'ft';
  const areaUnit = isMetric ? 'm²' : 'sq ft';

  // Unit conversion handler
  const handleUnitChange = (nextSystem: UnitSystem) => {
    if (nextSystem === unitSystem) return;

    if (nextSystem === 'us') {
      // Metric -> US
      if (length && !isNaN(Number(length))) {
        const val = Number(length) * 3.28084;
        setLength((Math.round(val * 10) / 10).toString());
      }
      if (width && !isNaN(Number(width))) {
        const val = Number(width) * 3.28084;
        setWidth((Math.round(val * 10) / 10).toString());
      }
      if (customArea && !isNaN(Number(customArea))) {
        const val = Number(customArea) * 10.7639;
        setCustomArea((Math.round(val * 10) / 10).toString());
      }
      // Standard US Sheet is 8 ft x 4 ft
      setSheetLength('8');
      setSheetWidth('4');
    } else {
      // US -> Metric
      if (length && !isNaN(Number(length))) {
        const val = Number(length) / 3.28084;
        setLength((Math.round(val * 10) / 10).toString());
      }
      if (width && !isNaN(Number(width))) {
        const val = Number(width) / 3.28084;
        setWidth((Math.round(val * 10) / 10).toString());
      }
      if (customArea && !isNaN(Number(customArea))) {
        const val = Number(customArea) / 10.7639;
        setCustomArea((Math.round(val * 10) / 10).toString());
      }
      // Standard Metric Sheet is 2.4 m x 1.2 m
      setSheetLength('2.4');
      setSheetWidth('1.2');
    }

    setUnitSystem(nextSystem);
  };

  // Pure calculation logic
  const calculateDrywall = (
    currentAreaType: AreaType,
    lStr: string,
    wStr: string,
    caStr: string,
    sLengthStr: string,
    sWidthStr: string,
    wastePctStr: ExtraWastePercent
  ): DrywallCalculationResult | null => {
    let surfaceArea = 0;

    if (currentAreaType === 'rectangle') {
      const l = parseFloat(lStr);
      const w = parseFloat(wStr);
      if (isNaN(l) || isNaN(w) || l <= 0 || w <= 0) {
        return null;
      }
      surfaceArea = l * w;
    } else {
      const ca = parseFloat(caStr);
      if (isNaN(ca) || ca <= 0) {
        return null;
      }
      surfaceArea = ca;
    }

    if (surfaceArea <= 0) return null;

    const sL = parseFloat(sLengthStr);
    const sW = parseFloat(sWidthStr);
    if (isNaN(sL) || isNaN(sW) || sL <= 0 || sW <= 0) {
      return null;
    }

    const singleSheetArea = sL * sW;
    if (singleSheetArea <= 0) return null;

    const wastePercent = parseFloat(wastePctStr);
    const wasteFactor = wastePercent / 100;
    const areaWithWaste = surfaceArea * (1 + wasteFactor);

    const rawBaseSheets = surfaceArea / singleSheetArea;
    const baseSheets = Math.ceil(rawBaseSheets);

    const rawRecommendedSheets = areaWithWaste / singleSheetArea;
    const recommendedSheets = Math.ceil(rawRecommendedSheets);
    const extraSheets = Math.max(0, recommendedSheets - baseSheets);

    return {
      totalArea: Math.round(surfaceArea * 100) / 100,
      singleSheetArea,
      rawBaseSheets,
      baseSheets,
      areaWithWaste: Math.round(areaWithWaste * 100) / 100,
      rawRecommendedSheets,
      recommendedSheets,
      extraSheets,
      extraPercent: wastePercent,
      lenUnit,
      areaUnit,
    };
  };

  // Live recalculate
  useEffect(() => {
    const res = calculateDrywall(
      areaType,
      length,
      width,
      customArea,
      sheetLength,
      sheetWidth,
      extraWaste
    );
    if (res) {
      setResult(res);
      setError(null);
    }
  }, [areaType, length, width, customArea, sheetLength, sheetWidth, extraWaste, unitSystem]);

  const handleCalculate = (e: FormEvent) => {
    e.preventDefault();
    const res = calculateDrywall(
      areaType,
      length,
      width,
      customArea,
      sheetLength,
      sheetWidth,
      extraWaste
    );
    if (!res) {
      if (areaType === 'rectangle') {
        setError('Please enter a valid length, width, and drywall sheet dimensions greater than 0.');
      } else {
        setError('Please enter a valid area and drywall sheet dimensions greater than 0.');
      }
      setResult(null);
      return;
    }

    setError(null);
    setResult(res);

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
      await exportDrywallCalculatorPdf({
        unitSystem,
        areaType,
        length: areaType === 'rectangle' ? length : undefined,
        width: areaType === 'rectangle' ? width : undefined,
        customArea: areaType === 'custom' ? customArea : undefined,
        sheetLength,
        sheetWidth,
        extraPercent: extraWaste,
        result,
      });
    } catch (err) {
      console.error('Failed to export Drywall calculation PDF:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <main className="flex-1 max-w-xl w-full mx-auto px-5 py-8 sm:py-12 flex flex-col justify-center">
      {/* 1. Title & Intro */}
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-display font-extrabold text-[#1A1918] tracking-tight leading-tight mb-2.5">
          Drywall Calculator
        </h1>
        <p className="text-base sm:text-lg text-[#4E4942] leading-relaxed font-sans">
          Calculate how many drywall sheets, plasterboards, or gypsum panels you need for walls and ceilings. Select standard 4x8, 4x10, 4x12, or metric panel sizes and add waste allowances for openings and cuts.
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
      <form onSubmit={handleCalculate} aria-label="Drywall calculation form" className="space-y-6">
        <div className="bg-[#FFFFFF] border border-[#E6DDD1] rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-2px_rgba(180,150,125,0.12)] space-y-6">
          {/* Area Type Selector */}
          <div className="space-y-2.5 pb-4 border-b border-[#EAE0D5]">
            <label className="block text-xs sm:text-sm font-semibold text-[#1A1918] font-sans">
              Area
            </label>
            <div
              role="radiogroup"
              aria-label="Area calculation type"
              className="grid grid-cols-2 p-1 rounded-xl bg-[#F5EFE6] border border-[#DFD5C6]"
            >
              <button
                id="area-rectangle-btn"
                type="button"
                role="radio"
                aria-checked={areaType === 'rectangle'}
                onClick={() => setAreaType('rectangle')}
                className={`min-h-[42px] py-2 px-2.5 rounded-lg text-xs sm:text-sm font-sans font-bold transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer ${
                  areaType === 'rectangle'
                    ? 'bg-[#FFFFFF] text-[#163A5F] shadow-xs border border-[#E0D5C7]'
                    : 'text-[#6E675E] hover:text-[#1A1918]'
                }`}
              >
                <span>Rectangle</span>
              </button>
              <button
                id="area-custom-btn"
                type="button"
                role="radio"
                aria-checked={areaType === 'custom'}
                onClick={() => setAreaType('custom')}
                className={`min-h-[42px] py-2 px-2.5 rounded-lg text-xs sm:text-sm font-sans font-bold transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer ${
                  areaType === 'custom'
                    ? 'bg-[#FFFFFF] text-[#163A5F] shadow-xs border border-[#E0D5C7]'
                    : 'text-[#6E675E] hover:text-[#1A1918]'
                }`}
              >
                <span>Custom area</span>
              </button>
            </div>
          </div>

          {/* Area Dimensions Section */}
          <div className="space-y-4">
            {areaType === 'rectangle' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Wall/ceiling length */}
                <div className="space-y-1.5">
                  <label
                    htmlFor={lengthId}
                    className="block text-xs sm:text-sm font-semibold text-[#1A1918] font-sans"
                  >
                    Wall/ceiling length
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

                {/* Wall/ceiling width or height */}
                <div className="space-y-1.5">
                  <label
                    htmlFor={widthId}
                    className="block text-xs sm:text-sm font-semibold text-[#1A1918] font-sans"
                  >
                    Wall/ceiling width or height
                  </label>
                  <div className="relative">
                    <input
                      id={widthId}
                      type="number"
                      step="any"
                      min="0"
                      placeholder={isMetric ? 'e.g. 3' : 'e.g. 10'}
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
            ) : (
              /* Custom Area: Show only Area and hide other dimensions */
              <div className="space-y-2">
                <div className="space-y-1.5">
                  <label
                    htmlFor={customAreaId}
                    className="block text-xs sm:text-sm font-semibold text-[#1A1918] font-sans"
                  >
                    Area
                  </label>
                  <div className="relative">
                    <input
                      id={customAreaId}
                      type="number"
                      step="any"
                      min="0"
                      placeholder={isMetric ? 'e.g. 15' : 'e.g. 160'}
                      value={customArea}
                      onChange={handlePositiveInput(setCustomArea)}
                      className="w-full bg-[#FDFBF7] border border-[#DFD5C6] focus:bg-[#FFFFFF] focus:border-[#163A5F] focus:ring-2 focus:ring-[#163A5F]/15 rounded-xl px-3.5 py-2.5 pr-14 text-base font-mono text-[#1A1918] font-semibold outline-hidden transition-all"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-[#6E675E] pointer-events-none">
                      {areaUnit}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-[#6E675E] font-sans leading-relaxed">
                  Enter the total surface area to cover across multiple walls, ceilings, or rooms.
                </p>
              </div>
            )}
          </div>

          {/* Drywall Sheet Size Inputs */}
          <div className="pt-4 border-t border-[#EAE0D5] space-y-3">
            <label className="block text-xs sm:text-sm font-semibold text-[#1A1918] font-sans">
              Drywall sheet dimensions ({lenUnit})
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Sheet Length */}
              <div className="space-y-1.5">
                <label
                  htmlFor={sheetLengthId}
                  className="block text-xs font-medium text-[#4E4942] font-sans"
                >
                  Drywall sheet length
                </label>
                <div className="relative">
                  <input
                    id={sheetLengthId}
                    type="number"
                    step="any"
                    min="0"
                    placeholder={isMetric ? 'e.g. 2.4' : 'e.g. 8'}
                    value={sheetLength}
                    onChange={handlePositiveInput(setSheetLength)}
                    className="w-full bg-[#FDFBF7] border border-[#DFD5C6] focus:bg-[#FFFFFF] focus:border-[#163A5F] focus:ring-2 focus:ring-[#163A5F]/15 rounded-xl px-3.5 py-2.5 pr-10 text-base font-mono text-[#1A1918] font-semibold outline-hidden transition-all"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-[#6E675E] pointer-events-none">
                    {lenUnit}
                  </span>
                </div>
              </div>

              {/* Sheet Width */}
              <div className="space-y-1.5">
                <label
                  htmlFor={sheetWidthId}
                  className="block text-xs font-medium text-[#4E4942] font-sans"
                >
                  Drywall sheet width
                </label>
                <div className="relative">
                  <input
                    id={sheetWidthId}
                    type="number"
                    step="any"
                    min="0"
                    placeholder={isMetric ? 'e.g. 1.2' : 'e.g. 4'}
                    value={sheetWidth}
                    onChange={handlePositiveInput(setSheetWidth)}
                    className="w-full bg-[#FDFBF7] border border-[#DFD5C6] focus:bg-[#FFFFFF] focus:border-[#163A5F] focus:ring-2 focus:ring-[#163A5F]/15 rounded-xl px-3.5 py-2.5 pr-10 text-base font-mono text-[#1A1918] font-semibold outline-hidden transition-all"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-[#6E675E] pointer-events-none">
                    {lenUnit}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-xs text-[#6E675E] font-sans leading-relaxed">
              Standard sheets are {isMetric ? '2.4 m × 1.2 m (approx. 2.88 m²)' : '8 ft × 4 ft (32 sq ft)'}. For high ceilings, {isMetric ? '3.0 m' : '10 ft or 12 ft'} lengths are also common.
            </p>
          </div>

          {/* Extra material / waste Selector */}
          <div className="pt-2 border-t border-[#EAE0D5] space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs sm:text-sm font-semibold text-[#1A1918] font-sans">
                Extra allowance for waste & cuts
              </label>
            </div>
            <div
              role="radiogroup"
              aria-label="Extra waste percentage"
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
              10% extra is recommended to account for end cuts, door/window cutouts, corner fitting, and seam alignment.
            </p>
          </div>

          {/* Helper Note */}
          <div className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[#EAE0D5] flex items-start gap-2.5 text-xs text-[#5C554B] leading-relaxed font-sans">
            <Info className="w-4 h-4 text-[#163A5F] shrink-0 mt-0.5" />
            <span>
              This calculator provides accurate sheet counts for standard drywall, sheetrock, gypsum board, and plasterboard installations on walls and ceilings.
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
            id="calculate-drywall-btn"
            type="submit"
            className="w-full min-h-[50px] py-3.5 px-6 rounded-xl bg-[#163A5F] text-[#FFFFFF] text-base font-sans font-bold shadow-[0_3px_12px_rgba(22,58,95,0.2)] hover:bg-[#112F4D] active:scale-[0.99] transition-all cursor-pointer"
          >
            Calculate drywall sheets ↓
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
                  {result.baseSheets.toLocaleString('en-US')}
                </span>
                <span className="text-2xl sm:text-3xl font-display font-bold text-[#0B6E54]">
                  sheets
                </span>
              </div>
              <div className="text-sm font-semibold text-[#0B6E54] font-sans mt-1">
                For {formatAreaDisplay(result.totalArea)} {result.areaUnit} of coverage
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
                      {result.recommendedSheets.toLocaleString('en-US')}
                    </span>
                    <span className="text-xl sm:text-2xl font-display font-semibold text-[#163A5F]">
                      sheets
                    </span>
                  </div>
                </div>
                <p className="text-xs text-[#6E675E] font-sans mt-1">
                  {result.extraPercent > 0
                    ? `Includes +${result.extraPercent}% extra (${result.extraSheets.toLocaleString('en-US')} sheets) for waste & cutting offcuts.`
                    : 'Exact sheet count without extra allowance.'}
                </p>
              </div>

              <button
                id="download-drywall-pdf-btn"
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
                <span className="text-[#6E675E]">Total surface area</span>
                <span className="font-semibold text-[#1A1918]">
                  {formatAreaDisplay(result.totalArea)} {result.areaUnit}
                </span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="text-[#6E675E]">Drywall sheet size</span>
                <span className="font-semibold text-[#1A1918]">
                  {sheetLength} × {sheetWidth} {result.lenUnit}
                </span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="text-[#6E675E]">Single sheet coverage</span>
                <span className="font-semibold text-[#1A1918]">
                  {formatSheetAreaDisplay(result.singleSheetArea)} {result.areaUnit}
                </span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="text-[#6E675E]">Area including waste ({result.extraPercent}%)</span>
                <span className="font-semibold text-[#1A1918]">
                  {formatAreaDisplay(result.areaWithWaste)} {result.areaUnit}
                </span>
              </div>
              <div className="flex justify-between items-center py-0.5 border-t border-[#E4DCD0] pt-2">
                <span className="text-[#6E675E]">Base sheets needed</span>
                <span className="font-semibold text-[#1A1918]">
                  {result.baseSheets.toLocaleString('en-US')} sheets ({result.rawBaseSheets.toFixed(2)} exact)
                </span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="text-[#6E675E]">Extra allowance</span>
                <span className="font-semibold text-[#1A1918]">
                  +{result.extraSheets.toLocaleString('en-US')} sheets ({result.extraPercent}%)
                </span>
              </div>
              <div className="flex justify-between items-center py-0.5 border-t border-[#E4DCD0] pt-2 font-bold">
                <span className="text-[#1A1918]">Recommended sheets to buy</span>
                <span className="text-[#0B6E54] text-sm">
                  {result.recommendedSheets.toLocaleString('en-US')} sheets
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
            How Many Drywall Sheets Do I Need?
          </h2>
          <p className="text-base text-[#4E4942] leading-relaxed">
            When planning a remodeling or new construction project, estimating how many drywall sheets you need is essential to prevent costly mid-job supply runs. Using a reliable <strong>drywall calculator</strong> ensures you order the exact right amount of plasterboard or gypsum boards with sufficient waste allowance for corners and cuts.
          </p>
        </div>

        {/* Calculation Formula */}
        <div className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-display font-bold text-[#1A1918]">
            How to Calculate Drywall Sheets
          </h3>
          <p className="text-base text-[#4E4942] leading-relaxed">
            The basic formula to determine drywall sheet requirements is straightforward:
          </p>
          <div className="p-5 bg-[#FAF6F0] rounded-xl border border-[#E4DCD0] font-mono text-sm text-[#1A1918] space-y-2">
            <p className="font-bold font-sans text-xs uppercase tracking-wider text-[#6E675E]">
              Drywall Calculation Formula
            </p>
            <p><strong>Total Wall/Ceiling Area = Length × Height (or Width)</strong></p>
            <p><strong>Sheet Area = Sheet Length × Sheet Width</strong></p>
            <p><strong>Sheets Needed = Total Area ÷ Sheet Area</strong></p>
            <p className="text-xs text-[#4E4942] font-sans pt-1">
              <strong>Order Quantity (with 10% waste):</strong> Sheets Needed × 1.10 (always rounded up to the nearest whole sheet)
            </p>
          </div>
        </div>

        {/* Standard Sheet Sizes */}
        <div className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-display font-bold text-[#1A1918]">
            Standard Drywall Sheet Sizes
          </h3>
          <p className="text-base text-[#4E4942] leading-relaxed">
            Drywall panels (also called Sheetrock, plasterboard, or gypsum board) come in standardized dimensions designed to align with typical wall stud spacing (16 or 24 inches on center / 400 or 600 mm):
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#4E4942]">
            <div className="p-3.5 bg-[#FAF6F0] rounded-xl border border-[#E4DCD0]">
              <p className="font-bold text-[#1A1918] mb-1 font-display">US Imperial Sheet Sizes</p>
              <p>• <strong>4 ft × 8 ft (32 sq ft):</strong> The most common drywall sheet, easy to transport and carry.</p>
              <p>• <strong>4 ft × 10 ft (40 sq ft):</strong> Designed for 9-foot or 10-foot ceilings to reduce horizontal seams.</p>
              <p>• <strong>4 ft × 12 ft (48 sq ft):</strong> Used for long spans and large rooms to minimize butt joints.</p>
            </div>
            <div className="p-3.5 bg-[#FAF6F0] rounded-xl border border-[#E4DCD0]">
              <p className="font-bold text-[#1A1918] mb-1 font-display">Metric Sheet Sizes</p>
              <p>• <strong>2.4 m × 1.2 m (2.88 m²):</strong> The universal standard panel for residential walls and ceilings.</p>
              <p>• <strong>2.7 m × 1.2 m (3.24 m²):</strong> Suitable for taller modern ceiling heights (2.7 m / 9 ft).</p>
              <p>• <strong>3.0 m × 1.2 m (3.60 m²):</strong> Ideal for commercial partitions and 3-meter high walls.</p>
            </div>
          </div>
        </div>

        {/* Why Add Extra Waste */}
        <div className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-display font-bold text-[#1A1918]">
            Why Should You Add 10% Extra Drywall?
          </h3>
          <p className="text-base text-[#4E4942] leading-relaxed">
            Professional drywall installers always add a 10% buffer to their sheet estimates for several practical reasons:
          </p>
          <ul className="space-y-2 text-sm sm:text-base text-[#4E4942] list-disc list-inside">
            <li><strong>Door and window cutouts:</strong> While openings reduce net area, drywall sheets are hung over the openings and then routed out, which wastes the cut out portions.</li>
            <li><strong>Staggered seams:</strong> Drywall joints must be staggered across framing members to prevent long continuous cracks, creating cut-off remnants.</li>
            <li><strong>Corner fitting & angled cuts:</strong> Rooms are rarely perfectly square, requiring trimming along edges.</li>
            <li><strong>Handling & accidental breakage:</strong> Gypsum cores can fracture if dropped, bent, or bumped during transport.</li>
          </ul>
        </div>

        {/* Related Calculators & Internal Links */}
        <div className="pt-6 border-t border-[#EAE0D5] space-y-4">
          <h3 className="text-lg sm:text-xl font-display font-bold text-[#1A1918]">
            Related Interior Renovation Calculators
          </h3>
          <p className="text-sm text-[#4E4942] font-sans">
            Once your drywall is hung and finished, estimate complementary materials with these ProjectTally tools:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <Link
              href="/tools/paint-calculator"
              className="p-3.5 rounded-xl bg-[#FAF6F0] hover:bg-[#F3ECE0] border border-[#E4DCD0] text-left transition-colors group block"
            >
              <div className="font-semibold text-sm text-[#163A5F] group-hover:underline flex items-center justify-between">
                <span>Paint Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100" />
              </div>
              <p className="text-xs text-[#6E675E] mt-1 font-sans">Calculate primer and paint gallons or litres for new drywall.</p>
            </Link>
            <Link
              href="/tools/flooring-calculator"
              className="p-3.5 rounded-xl bg-[#FAF6F0] hover:bg-[#F3ECE0] border border-[#E4DCD0] text-left transition-colors group block"
            >
              <div className="font-semibold text-sm text-[#163A5F] group-hover:underline flex items-center justify-between">
                <span>Flooring Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100" />
              </div>
              <p className="text-xs text-[#6E675E] mt-1 font-sans">Estimate laminate, hardwood, or vinyl flooring for the room.</p>
            </Link>
            <Link
              href="/tools/tile-calculator"
              className="p-3.5 rounded-xl bg-[#FAF6F0] hover:bg-[#F3ECE0] border border-[#E4DCD0] text-left transition-colors group block"
            >
              <div className="font-semibold text-sm text-[#163A5F] group-hover:underline flex items-center justify-between">
                <span>Tile Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100" />
              </div>
              <p className="text-xs text-[#6E675E] mt-1 font-sans">Calculate tile quantities over cement backer boards.</p>
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
