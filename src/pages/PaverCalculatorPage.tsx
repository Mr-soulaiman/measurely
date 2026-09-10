import { useState, useEffect, useId, FormEvent, ChangeEvent } from 'react';
import { ArrowRight, ChevronDown, ChevronUp, FileDown, Info } from 'lucide-react';
import { Link } from '../context/NavigationContext';
import { exportPaverCalculatorPdf } from '../utils/pdfExport';

type UnitSystem = 'metric' | 'us';
type MeasureMethod = 'rectangle' | 'circle' | 'custom';
type ExtraWastePercent = '0' | '5' | '10' | '15';

interface PaverCalculationResult {
  totalArea: number;
  areaWithExtra: number;
  singlePaverArea: number;
  rawPaversNeeded: number;
  paversNeeded: number;
  extraPavers: number;
  recommendedPavers: number;
  extraPercent: number;
  lenUnit: 'm' | 'ft';
  areaUnit: 'm²' | 'sq ft';
  paverDimUnit: 'cm' | 'in';
}

function formatAreaDisplay(val: number): string {
  if (val <= 0 || isNaN(val)) return '0';
  const rounded = Math.round(val * 100) / 100;
  return rounded.toString();
}

function formatPaverAreaDisplay(val: number): string {
  if (val <= 0 || isNaN(val)) return '0';
  if (val < 0.01) {
    return (Math.round(val * 10000) / 10000).toString();
  }
  const rounded = Math.round(val * 1000) / 1000;
  return rounded.toString();
}

export function PaverCalculatorPage() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');
  const [method, setMethod] = useState<MeasureMethod>('rectangle');
  const [length, setLength] = useState<string>('5');
  const [width, setWidth] = useState<string>('4');
  const [diameter, setDiameter] = useState<string>('4');
  const [customArea, setCustomArea] = useState<string>('20');
  const [paverLength, setPaverLength] = useState<string>('20');
  const [paverWidth, setPaverWidth] = useState<string>('10');
  const [extraWaste, setExtraWaste] = useState<ExtraWastePercent>('10');
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PaverCalculationResult | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);

  const lengthId = useId();
  const widthId = useId();
  const diameterId = useId();
  const customAreaId = useId();
  const paverLengthId = useId();
  const paverWidthId = useId();

  const isMetric = unitSystem === 'metric';
  const lenUnit = isMetric ? 'm' : 'ft';
  const areaUnit = isMetric ? 'm²' : 'sq ft';
  const paverDimUnit = isMetric ? 'cm' : 'in';

  // Unit conversion handler
  const handleUnitChange = (nextSystem: UnitSystem) => {
    if (nextSystem === unitSystem) return;

    if (nextSystem === 'us') {
      // Metric -> US
      // Surface dimensions: m -> ft (* 3.28084)
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
      // Paver dimensions: cm -> in (/ 2.54)
      if (paverLength && !isNaN(Number(paverLength))) {
        const val = Number(paverLength) / 2.54;
        setPaverLength((Math.round(val * 10) / 10).toString());
      }
      if (paverWidth && !isNaN(Number(paverWidth))) {
        const val = Number(paverWidth) / 2.54;
        setPaverWidth((Math.round(val * 10) / 10).toString());
      }
    } else {
      // US -> Metric
      // Surface dimensions: ft -> m (/ 3.28084)
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
      // Paver dimensions: in -> cm (* 2.54)
      if (paverLength && !isNaN(Number(paverLength))) {
        const val = Number(paverLength) * 2.54;
        setPaverLength((Math.round(val * 10) / 10).toString());
      }
      if (paverWidth && !isNaN(Number(paverWidth))) {
        const val = Number(paverWidth) * 2.54;
        setPaverWidth((Math.round(val * 10) / 10).toString());
      }
    }

    setUnitSystem(nextSystem);
  };

  // Pure calculation logic
  const calculatePavers = (
    currentMethod: MeasureMethod,
    lenStr: string,
    widStr: string,
    diaStr: string,
    customAreaStr: string,
    pLengthStr: string,
    pWidthStr: string,
    wastePctStr: ExtraWastePercent
  ): PaverCalculationResult | null => {
    let surfaceArea = 0;

    if (currentMethod === 'rectangle') {
      const l = parseFloat(lenStr);
      const w = parseFloat(widStr);
      if (isNaN(l) || isNaN(w) || l <= 0 || w <= 0) {
        return null;
      }
      surfaceArea = l * w;
    } else if (currentMethod === 'circle') {
      const dia = parseFloat(diaStr);
      if (isNaN(dia) || dia <= 0) {
        return null;
      }
      const radius = dia / 2;
      surfaceArea = Math.PI * radius * radius;
    } else {
      const ca = parseFloat(customAreaStr);
      if (isNaN(ca) || ca <= 0) {
        return null;
      }
      surfaceArea = ca;
    }

    if (surfaceArea <= 0) return null;

    const pL = parseFloat(pLengthStr);
    const pW = parseFloat(pWidthStr);
    if (isNaN(pL) || isNaN(pW) || pL <= 0 || pW <= 0) {
      return null;
    }

    // Paver area in surface units
    // Metric: cm * cm / 10,000 = m²
    // US: in * in / 144 = sq ft
    const singlePaverArea = isMetric ? (pL * pW) / 10000 : (pL * pW) / 144;
    if (singlePaverArea <= 0) return null;

    const rawPaversNeeded = surfaceArea / singlePaverArea;
    const paversNeeded = Math.ceil(rawPaversNeeded);

    const wastePercent = parseFloat(wastePctStr);
    const wasteFactor = wastePercent / 100;
    const rawRecommended = rawPaversNeeded * (1 + wasteFactor);
    const recommendedPavers = Math.ceil(rawRecommended);
    const extraPavers = Math.max(0, recommendedPavers - paversNeeded);
    const areaWithExtra = surfaceArea * (1 + wasteFactor);

    return {
      totalArea: Math.round(surfaceArea * 100) / 100,
      areaWithExtra: Math.round(areaWithExtra * 100) / 100,
      singlePaverArea,
      rawPaversNeeded,
      paversNeeded,
      extraPavers,
      recommendedPavers,
      extraPercent: wastePercent,
      lenUnit,
      areaUnit,
      paverDimUnit,
    };
  };

  // Live recalculate
  useEffect(() => {
    const res = calculatePavers(
      method,
      length,
      width,
      diameter,
      customArea,
      paverLength,
      paverWidth,
      extraWaste
    );
    if (res) {
      setResult(res);
      setError(null);
    }
  }, [method, length, width, diameter, customArea, paverLength, paverWidth, extraWaste, unitSystem]);

  const handleCalculate = (e: FormEvent) => {
    e.preventDefault();
    const res = calculatePavers(
      method,
      length,
      width,
      diameter,
      customArea,
      paverLength,
      paverWidth,
      extraWaste
    );
    if (!res) {
      if (method === 'rectangle') {
        setError('Please enter a valid length, width, and paver dimensions greater than 0.');
      } else if (method === 'circle') {
        setError('Please enter a valid diameter and paver dimensions greater than 0.');
      } else {
        setError('Please enter a valid area and paver dimensions greater than 0.');
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
      await exportPaverCalculatorPdf({
        unitSystem,
        areaType: method,
        length: method === 'rectangle' ? length : undefined,
        width: method === 'rectangle' ? width : undefined,
        diameter: method === 'circle' ? diameter : undefined,
        customArea: method === 'custom' ? customArea : undefined,
        paverLength,
        paverWidth,
        extraPercent: extraWaste,
        result,
      });
    } catch (err) {
      console.error('Failed to export Paver calculation PDF:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <main className="flex-1 max-w-xl w-full mx-auto px-5 py-8 sm:py-12 flex flex-col justify-center">
      {/* 1. Title & Intro */}
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-display font-extrabold text-[#1A1918] tracking-tight leading-tight mb-2.5">
          Paver Calculator
        </h1>
        <p className="text-base sm:text-lg text-[#4E4942] leading-relaxed font-sans">
          Calculate how many brick pavers, patio slabs, or stone cobbles you need for patios, walkways, and driveways. Enter area dimensions and paver sizes to get exact piece counts and recommended waste margins.
        </p>
      </div>

      {/* 2. Unit System Selector */}
      <section aria-label="Unit system selection" className="mb-7">
        <div className="grid grid-cols-2 gap-1.5 p-1.5 bg-[#EDE5DA] rounded-xl border border-[#DDD3C5] shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)]">
          <button
            id="unit-metric-btn"
            type="button"
            onClick={() => handleUnitChange('metric')}
            className={`py-2.5 px-4 rounded-lg font-sans text-sm font-bold transition-all ${
              unitSystem === 'metric'
                ? 'bg-[#163A5F] text-white shadow-sm'
                : 'text-[#4E4942] hover:text-[#1A1918] hover:bg-[#E5DCD0]'
            }`}
          >
            Metric (m, cm, m²)
          </button>
          <button
            id="unit-us-btn"
            type="button"
            onClick={() => handleUnitChange('us')}
            className={`py-2.5 px-4 rounded-lg font-sans text-sm font-bold transition-all ${
              unitSystem === 'us'
                ? 'bg-[#163A5F] text-white shadow-sm'
                : 'text-[#4E4942] hover:text-[#1A1918] hover:bg-[#E5DCD0]'
            }`}
          >
            US (ft, in, sq ft)
          </button>
        </div>
      </section>

      {/* 3. Calculator Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] shadow-[0_4px_24px_-2px_rgba(180,150,125,0.14)] mb-8">
        <form onSubmit={handleCalculate} className="space-y-6">
          {/* Surface Shape Tabs: Rectangle / Circle / Custom area */}
          <div>
            <label className="block text-sm font-semibold text-[#1A1918] mb-2 font-sans">
              Area shape
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#F5EFE6] rounded-xl border border-[#E0D5C7]">
              <button
                type="button"
                id="shape-rectangle-btn"
                onClick={() => setMethod('rectangle')}
                className={`py-2 px-3 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                  method === 'rectangle'
                    ? 'bg-[#FFFFFF] text-[#163A5F] shadow-xs'
                    : 'text-[#4E4942] hover:text-[#1A1918]'
                }`}
              >
                Rectangle
              </button>
              <button
                type="button"
                id="shape-circle-btn"
                onClick={() => setMethod('circle')}
                className={`py-2 px-3 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                  method === 'circle'
                    ? 'bg-[#FFFFFF] text-[#163A5F] shadow-xs'
                    : 'text-[#4E4942] hover:text-[#1A1918]'
                }`}
              >
                Circle
              </button>
              <button
                type="button"
                id="shape-custom-btn"
                onClick={() => setMethod('custom')}
                className={`py-2 px-3 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                  method === 'custom'
                    ? 'bg-[#FFFFFF] text-[#163A5F] shadow-xs'
                    : 'text-[#4E4942] hover:text-[#1A1918]'
                }`}
              >
                Custom area
              </button>
            </div>
          </div>

          {/* Area Inputs based on Shape */}
          {method === 'rectangle' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor={lengthId}
                  className="block text-sm font-semibold text-[#1A1918] mb-1.5 font-sans"
                >
                  Patio / walkway length
                </label>
                <div className="relative">
                  <input
                    id={lengthId}
                    type="number"
                    step="any"
                    min="0"
                    placeholder="e.g. 5"
                    value={length}
                    onChange={handlePositiveInput(setLength)}
                    className="w-full px-4 py-3 bg-[#FAF8F5] rounded-xl border border-[#DFD5C6] text-[#1A1918] font-sans text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#163A5F] focus:border-transparent transition-all pr-12"
                    required
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#8C827A] pointer-events-none">
                    {lenUnit}
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor={widthId}
                  className="block text-sm font-semibold text-[#1A1918] mb-1.5 font-sans"
                >
                  Patio / walkway width
                </label>
                <div className="relative">
                  <input
                    id={widthId}
                    type="number"
                    step="any"
                    min="0"
                    placeholder="e.g. 4"
                    value={width}
                    onChange={handlePositiveInput(setWidth)}
                    className="w-full px-4 py-3 bg-[#FAF8F5] rounded-xl border border-[#DFD5C6] text-[#1A1918] font-sans text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#163A5F] focus:border-transparent transition-all pr-12"
                    required
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#8C827A] pointer-events-none">
                    {lenUnit}
                  </span>
                </div>
              </div>
            </div>
          )}

          {method === 'circle' && (
            <div>
              <label
                htmlFor={diameterId}
                className="block text-sm font-semibold text-[#1A1918] mb-1.5 font-sans"
              >
                Circle diameter
              </label>
              <div className="relative">
                <input
                  id={diameterId}
                  type="number"
                  step="any"
                  min="0"
                  placeholder="e.g. 4"
                  value={diameter}
                  onChange={handlePositiveInput(setDiameter)}
                  className="w-full px-4 py-3 bg-[#FAF8F5] rounded-xl border border-[#DFD5C6] text-[#1A1918] font-sans text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#163A5F] focus:border-transparent transition-all pr-12"
                  required
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#8C827A] pointer-events-none">
                  {lenUnit}
                </span>
              </div>
            </div>
          )}

          {method === 'custom' && (
            <div>
              <label
                htmlFor={customAreaId}
                className="block text-sm font-semibold text-[#1A1918] mb-1.5 font-sans"
              >
                Total surface area
              </label>
              <div className="relative">
                <input
                  id={customAreaId}
                  type="number"
                  step="any"
                  min="0"
                  placeholder="e.g. 20"
                  value={customArea}
                  onChange={handlePositiveInput(setCustomArea)}
                  className="w-full px-4 py-3 bg-[#FAF8F5] rounded-xl border border-[#DFD5C6] text-[#1A1918] font-sans text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#163A5F] focus:border-transparent transition-all pr-16"
                  required
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#8C827A] pointer-events-none">
                  {areaUnit}
                </span>
              </div>
            </div>
          )}

          {/* Paver Dimensions */}
          <div className="pt-2 border-t border-[#F0EAE1]">
            <span className="block text-sm font-semibold text-[#1A1918] mb-2 font-sans">
              Paver dimensions
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor={paverLengthId}
                  className="block text-xs font-semibold text-[#4E4942] mb-1 font-sans"
                >
                  Paver length
                </label>
                <div className="relative">
                  <input
                    id={paverLengthId}
                    type="number"
                    step="any"
                    min="0"
                    placeholder={isMetric ? 'e.g. 20' : 'e.g. 8'}
                    value={paverLength}
                    onChange={handlePositiveInput(setPaverLength)}
                    className="w-full px-4 py-3 bg-[#FAF8F5] rounded-xl border border-[#DFD5C6] text-[#1A1918] font-sans text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#163A5F] focus:border-transparent transition-all pr-12"
                    required
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#8C827A] pointer-events-none">
                    {paverDimUnit}
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor={paverWidthId}
                  className="block text-xs font-semibold text-[#4E4942] mb-1 font-sans"
                >
                  Paver width
                </label>
                <div className="relative">
                  <input
                    id={paverWidthId}
                    type="number"
                    step="any"
                    min="0"
                    placeholder={isMetric ? 'e.g. 10' : 'e.g. 4'}
                    value={paverWidth}
                    onChange={handlePositiveInput(setPaverWidth)}
                    className="w-full px-4 py-3 bg-[#FAF8F5] rounded-xl border border-[#DFD5C6] text-[#1A1918] font-sans text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#163A5F] focus:border-transparent transition-all pr-12"
                    required
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#8C827A] pointer-events-none">
                    {paverDimUnit}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Extra Waste Allowance */}
          <div className="pt-2 border-t border-[#F0EAE1]">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-[#1A1918] font-sans">
                Extra allowance for cuts & breakage
              </label>
              <span className="text-xs text-[#8C827A] font-medium font-sans">
                10% recommended
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {(['0', '5', '10', '15'] as ExtraWastePercent[]).map((pct) => (
                <button
                  key={pct}
                  type="button"
                  id={`extra-${pct}-btn`}
                  onClick={() => setExtraWaste(pct)}
                  className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                    extraWaste === pct
                      ? 'bg-[#163A5F] border-[#163A5F] text-white shadow-xs'
                      : 'bg-[#FAF8F5] border-[#DFD5C6] text-[#4E4942] hover:bg-[#F2ECE4] hover:text-[#1A1918]'
                  }`}
                >
                  +{pct}%
                </button>
              ))}
            </div>
          </div>

          {/* Validation Error */}
          {error && (
            <div
              role="alert"
              className="p-4 rounded-xl bg-[#FDF2F2] border border-[#F8D7DA] text-[#991B1B] text-sm flex items-start gap-2.5"
            >
              <Info className="w-5 h-5 shrink-0 mt-0.5 text-[#DC2626]" />
              <p>{error}</p>
            </div>
          )}

          {/* Action Button */}
          <button
            id="calculate-pavers-btn"
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl bg-[#163A5F] text-white font-sans text-base font-bold shadow-[0_2px_10px_rgba(22,58,95,0.25)] hover:bg-[#112F4D] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Calculate pavers</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>

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
                  {result.paversNeeded.toLocaleString('en-US')}
                </span>
                <span className="text-2xl sm:text-3xl font-display font-bold text-[#0B6E54]">
                  pavers
                </span>
              </div>
              <div className="text-sm font-semibold text-[#0B6E54] font-sans mt-1">
                {formatAreaDisplay(result.totalArea)} {result.areaUnit} surface area
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
                      {result.recommendedPavers.toLocaleString('en-US')}
                    </span>
                    <span className="text-xl sm:text-2xl font-display font-semibold text-[#163A5F]">
                      pavers
                    </span>
                  </div>
                </div>
                <p className="text-xs text-[#6E675E] font-sans mt-1">
                  Includes {result.extraPercent}% extra
                </p>
              </div>

              <button
                id="download-paver-pdf-btn"
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
                <span className="text-[#6E675E]">Area including extra</span>
                <span className="font-semibold text-[#1A1918]">
                  {formatAreaDisplay(result.areaWithExtra)} {result.areaUnit}
                </span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="text-[#6E675E]">Single paver size</span>
                <span className="font-semibold text-[#1A1918]">
                  {paverLength} × {paverWidth} {result.paverDimUnit}
                </span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="text-[#6E675E]">Single paver coverage</span>
                <span className="font-semibold text-[#1A1918]">
                  {formatPaverAreaDisplay(result.singlePaverArea)} {result.areaUnit}
                </span>
              </div>
              <div className="flex justify-between items-center py-0.5 border-t border-[#E4DCD0] pt-2">
                <span className="text-[#6E675E]">Base pavers needed</span>
                <span className="font-semibold text-[#1A1918]">
                  {result.paversNeeded.toLocaleString('en-US')} pavers (exact: {result.rawPaversNeeded.toFixed(2)})
                </span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="text-[#6E675E]">Extra allowance</span>
                <span className="font-semibold text-[#0B6E54]">
                  +{result.extraPavers.toLocaleString('en-US')} pavers ({result.extraPercent}%)
                </span>
              </div>
              <div className="flex justify-between items-center py-0.5 border-t border-[#E4DCD0] pt-2 font-bold">
                <span className="text-[#1A1918]">Recommended pavers to buy</span>
                <span className="text-[#0B6E54] text-sm">
                  {result.recommendedPavers.toLocaleString('en-US')} pavers
                </span>
              </div>
            </div>
          )}
        </section>
      )}

      {/* 5. Informational & Educational SEO Content */}
      <section className="space-y-8 pt-6 border-t border-[#E6DDD1]">
        {/* Guide Article */}
        <article className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-[#1A1918]">
            How Many Pavers Do I Need?
          </h2>
          <p className="text-sm sm:text-base text-[#4E4942] leading-relaxed font-sans">
            Calculating how many pavers you need for a patio, walkway, or driveway is straightforward once you know your project surface area and the surface dimensions of your selected pavers. The basic formula is:
          </p>
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DFD5C6] font-mono text-xs sm:text-sm text-[#1A1918] leading-relaxed">
            Total Pavers Needed = Total Surface Area ÷ Single Paver Area
          </div>
          <p className="text-sm sm:text-base text-[#4E4942] leading-relaxed font-sans">
            Always round up to the nearest whole paver, and then add a waste factor (typically 10%) to account for edge cuts, curved perimeters, pattern transitions (such as herringbone or basketweave), and occasional damaged blocks.
          </p>
        </article>

        {/* Step by Step Breakdown */}
        <div className="space-y-4">
          <h3 className="text-xl font-display font-bold text-[#1A1918]">
            How to Calculate Pavers Step by Step
          </h3>
          <ol className="space-y-3 font-sans text-sm sm:text-base text-[#4E4942] list-decimal list-inside leading-relaxed">
            <li>
              <strong className="text-[#1A1918]">Measure the Project Area:</strong> For rectangular patios or paths, multiply length by width. For circular features, use <span className="font-mono text-xs">π × (diameter / 2)²</span>. For irregular shapes, divide the space into smaller rectangles or measure the total custom area directly.
            </li>
            <li>
              <strong className="text-[#1A1918]">Calculate the Area of One Paver:</strong> Multiply the paver length by its width in the same unit system. In metric, divide square centimeters by 10,000 to get square meters. In US units, divide square inches by 144 to get square feet.
            </li>
            <li>
              <strong className="text-[#1A1918]">Divide Area by Paver Size:</strong> Divide your total project square footage or square meters by the single paver area.
            </li>
            <li>
              <strong className="text-[#1A1918]">Add 10% Extra for Waste:</strong> Multiply by 1.10 (or 1.15 for complex diagonal, circular, or herringbone patterns) so you do not run short midway through laying the stones.
            </li>
          </ol>
        </div>

        {/* Common Paver Sizes Reference */}
        <div className="space-y-3">
          <h3 className="text-xl font-display font-bold text-[#1A1918]">
            Standard Paver Sizes Reference
          </h3>
          <p className="text-sm text-[#4E4942] font-sans">
            Here are common residential paver dimensions and their coverage:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm font-sans border-collapse">
              <thead>
                <tr className="border-b border-[#DFD5C6] text-[#1A1918]">
                  <th className="py-2.5 pr-4 font-bold">Paver Type</th>
                  <th className="py-2.5 px-4 font-bold">Standard Size</th>
                  <th className="py-2.5 px-4 font-bold">Coverage per Paver</th>
                  <th className="py-2.5 pl-4 font-bold">Pavers per Unit Area</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0EAE1] text-[#4E4942]">
                <tr>
                  <td className="py-2.5 pr-4 font-medium text-[#1A1918]">Standard Brick Paver</td>
                  <td className="py-2.5 px-4">200 × 100 mm (8 × 4 in)</td>
                  <td className="py-2.5 px-4">0.02 m² (0.22 sq ft)</td>
                  <td className="py-2.5 pl-4">50 per m² (4.5 per sq ft)</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-medium text-[#1A1918]">Square Patio Slab</td>
                  <td className="py-2.5 px-4">400 × 400 mm (16 × 16 in)</td>
                  <td className="py-2.5 px-4">0.16 m² (1.78 sq ft)</td>
                  <td className="py-2.5 pl-4">6.25 per m² (0.56 per sq ft)</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-medium text-[#1A1918]">Large Format Slab</td>
                  <td className="py-2.5 px-4">600 × 600 mm (24 × 24 in)</td>
                  <td className="py-2.5 px-4">0.36 m² (4.0 sq ft)</td>
                  <td className="py-2.5 pl-4">2.78 per m² (0.25 per sq ft)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="space-y-4">
          <h3 className="text-xl font-display font-bold text-[#1A1918]">
            Frequently Asked Questions
          </h3>
          <div className="space-y-3">
            <details className="group p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] text-sm text-[#4E4942]">
              <summary className="font-semibold text-[#1A1918] cursor-pointer list-none flex items-center justify-between">
                <span>How much extra paver material should I order?</span>
                <span className="text-[#8C827A] group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-2.5 leading-relaxed font-sans">
                For simple rectangular layouts like running bond or stacked bond, 5% to 10% extra is usually sufficient. If you are laying pavers in a 45-degree herringbone pattern, around curved garden borders, or have circular seating areas, order 10% to 15% extra to account for angled edge cuts.
              </p>
            </details>

            <details className="group p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] text-sm text-[#4E4942]">
              <summary className="font-semibold text-[#1A1918] cursor-pointer list-none flex items-center justify-between">
                <span>Do paver joints affect the number of pavers needed?</span>
                <span className="text-[#8C827A] group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-2.5 leading-relaxed font-sans">
                Standard interlocking pavers have built-in spacer nibs that create a 2 mm to 3 mm sand joint. Over typical patio dimensions, standard joint spacing has a minor effect on total count. The extra 10% allowance provides plenty of buffer for both joints and cuts.
              </p>
            </details>

            <details className="group p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] text-sm text-[#4E4942]">
              <summary className="font-semibold text-[#1A1918] cursor-pointer list-none flex items-center justify-between">
                <span>Can I calculate pavers for an irregular shaped patio?</span>
                <span className="text-[#8C827A] group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-2.5 leading-relaxed font-sans">
                Yes. Select the "Custom area" tab at the top of the calculator and enter your total known surface area in square meters or square feet. You can measure irregular areas by breaking them into smaller geometric shapes on a sketch pad and summing the totals.
              </p>
            </details>
          </div>
        </div>

        {/* Related Calculators & Internal Links */}
        <div className="pt-6 border-t border-[#E6DDD1] space-y-4">
          <h3 className="text-lg sm:text-xl font-display font-bold text-[#1A1918]">
            Related Hardscaping Calculators
          </h3>
          <p className="text-sm text-[#4E4942] font-sans">
            Laying a sturdy paver patio requires base gravel and bedding sand. Calculate project layers with these tools:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <Link
              href="/tools/sand-calculator"
              className="p-3.5 rounded-xl bg-[#FAF6F0] hover:bg-[#F3ECE0] border border-[#E4DCD0] text-left transition-colors group block"
            >
              <div className="font-semibold text-sm text-[#163A5F] group-hover:underline flex items-center justify-between">
                <span>Sand Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100" />
              </div>
              <p className="text-xs text-[#6E675E] mt-1 font-sans">Estimate bedding and jointing sand volume for your pavers.</p>
            </Link>
            <Link
              href="/tools/gravel-calculator"
              className="p-3.5 rounded-xl bg-[#FAF6F0] hover:bg-[#F3ECE0] border border-[#E4DCD0] text-left transition-colors group block"
            >
              <div className="font-semibold text-sm text-[#163A5F] group-hover:underline flex items-center justify-between">
                <span>Gravel Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100" />
              </div>
              <p className="text-xs text-[#6E675E] mt-1 font-sans">Calculate crushed stone base course required under patio pavers.</p>
            </Link>
            <Link
              href="/tools/concrete-calculator"
              className="p-3.5 rounded-xl bg-[#FAF6F0] hover:bg-[#F3ECE0] border border-[#E4DCD0] text-left transition-colors group block"
            >
              <div className="font-semibold text-sm text-[#163A5F] group-hover:underline flex items-center justify-between">
                <span>Concrete Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100" />
              </div>
              <p className="text-xs text-[#6E675E] mt-1 font-sans">Calculate concrete edging restraints or compare slab vs paver costs.</p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
