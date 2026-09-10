import { useState, useId, FormEvent, useEffect, ChangeEvent } from 'react';
import { ChevronDown, ChevronUp, ArrowRight, FileDown } from 'lucide-react';
import { Link } from '../context/NavigationContext';
import { exportBulkMaterialPdf } from '../utils/pdfExport';

type UnitSystem = 'metric' | 'us';
type MeasureMethod = 'rectangle' | 'circle' | 'custom';

interface CalculationResult {
  area: number;
  depth: number;
  depthUnit: 'cm' | 'in';
  areaUnit: 'm²' | 'sq ft';
  baseVolume: number;
  extraVolume: number;
  recommendedVolume: number;
  extraPercent: number;
  unitLabel: 'm³' | 'cubic yards';
  equivalentVolume: number;
  equivalentUnit: 'cubic yards' | 'm³';
  baseWeight: number;
  recommendedWeight: number;
  weightUnit: 'tonnes' | 'tons';
}

function formatVolumeDisplay(val: number): string {
  if (val <= 0 || isNaN(val)) return '0';
  const rounded = Math.round(val * 100) / 100;
  return rounded % 1 === 0 ? rounded.toFixed(1) : rounded.toString();
}

function formatWeightDisplay(val: number): string {
  if (val <= 0 || isNaN(val)) return '0';
  const rounded = Math.round(val * 10) / 10;
  return rounded % 1 === 0 ? rounded.toFixed(1) : rounded.toString();
}

export function MulchCalculatorPage() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');
  const [method, setMethod] = useState<MeasureMethod>('rectangle');

  // Input states
  const [length, setLength] = useState<string>('6');
  const [width, setWidth] = useState<string>('3');
  const [diameter, setDiameter] = useState<string>('4');
  const [customArea, setCustomArea] = useState<string>('18');
  const [depth, setDepth] = useState<string>('7.5');
  const [extraMulch, setExtraMulch] = useState<'0' | '5' | '10' | '15'>('10');

  // Result & UI state
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);

  // Unique IDs for accessibility
  const lengthId = useId();
  const widthId = useId();
  const diameterId = useId();
  const areaId = useId();
  const depthId = useId();

  const isMetric = unitSystem === 'metric';

  // Handle switching unit systems with value conversion
  const handleUnitChange = (newSystem: UnitSystem) => {
    if (newSystem === unitSystem) return;

    if (newSystem === 'us') {
      // Metric to US
      const l = parseFloat(length);
      const w = parseFloat(width);
      const dia = parseFloat(diameter);
      const ca = parseFloat(customArea);
      const d = parseFloat(depth);

      if (!isNaN(l) && l > 0) setLength((Math.round(l * 3.28084 * 10) / 10).toString());
      if (!isNaN(w) && w > 0) setWidth((Math.round(w * 3.28084 * 10) / 10).toString());
      if (!isNaN(dia) && dia > 0) setDiameter((Math.round(dia * 3.28084 * 10) / 10).toString());
      if (!isNaN(ca) && ca > 0) setCustomArea((Math.round(ca * 10.7639 * 10) / 10).toString());
      if (!isNaN(d) && d > 0) setDepth((Math.round((d / 2.54) * 10) / 10).toString());
    } else {
      // US to Metric
      const l = parseFloat(length);
      const w = parseFloat(width);
      const dia = parseFloat(diameter);
      const ca = parseFloat(customArea);
      const d = parseFloat(depth);

      if (!isNaN(l) && l > 0) setLength((Math.round((l / 3.28084) * 10) / 10).toString());
      if (!isNaN(w) && w > 0) setWidth((Math.round((w / 3.28084) * 10) / 10).toString());
      if (!isNaN(dia) && dia > 0) setDiameter((Math.round((dia / 3.28084) * 10) / 10).toString());
      if (!isNaN(ca) && ca > 0) setCustomArea((Math.round((ca / 10.7639) * 10) / 10).toString());
      if (!isNaN(d) && d > 0) setDepth((Math.round(d * 2.54 * 10) / 10).toString());
    }

    setUnitSystem(newSystem);
  };

  // Calculation core function
  const calculateMulch = (): CalculationResult | null => {
    setError(null);

    const d = parseFloat(depth);
    if (isNaN(d) || d <= 0) {
      return null;
    }

    let areaVal = 0;
    if (method === 'rectangle') {
      const l = parseFloat(length);
      const w = parseFloat(width);
      if (isNaN(l) || l <= 0 || isNaN(w) || w <= 0) {
        return null;
      }
      areaVal = l * w;
    } else if (method === 'circle') {
      const dia = parseFloat(diameter);
      if (isNaN(dia) || dia <= 0) {
        return null;
      }
      const radius = dia / 2;
      areaVal = Math.PI * radius * radius;
    } else {
      const ca = parseFloat(customArea);
      if (isNaN(ca) || ca <= 0) {
        return null;
      }
      areaVal = ca;
    }

    const extraPct = parseInt(extraMulch, 10) || 0;

    // Typical mulch bulk density: ~400 kg/m³ (approx. 0.4 tonnes per m³)
    // In US: ~675 lbs per cubic yard, or ~0.3375 short tons (2,000 lbs) per cubic yard
    if (isMetric) {
      const depthMeters = d / 100;
      const baseVol = areaVal * depthMeters; // m³
      const extraVol = baseVol * (extraPct / 100);
      const recVol = baseVol + extraVol;

      // 1 m³ = 1.30795 cubic yards
      const equivVol = baseVol * 1.30795;

      // Density ~ 0.40 tonnes/m³
      const densityTonnesPerM3 = 0.40;
      const baseWt = baseVol * densityTonnesPerM3;
      const recWt = recVol * densityTonnesPerM3;

      return {
        area: areaVal,
        depth: d,
        depthUnit: 'cm',
        areaUnit: 'm²',
        baseVolume: baseVol,
        extraVolume: extraVol,
        recommendedVolume: recVol,
        extraPercent: extraPct,
        unitLabel: 'm³',
        equivalentVolume: equivVol,
        equivalentUnit: 'cubic yards',
        baseWeight: baseWt,
        recommendedWeight: recWt,
        weightUnit: 'tonnes',
      };
    } else {
      const depthFeet = d / 12;
      const volCuFt = areaVal * depthFeet;
      const baseVol = volCuFt / 27; // cubic yards
      const extraVol = baseVol * (extraPct / 100);
      const recVol = baseVol + extraVol;

      // 1 cubic yard = 0.764555 m³
      const equivVol = baseVol * 0.764555;

      // Mulch: approx 675 lbs/cu yd -> 0.3375 short tons
      const tonsPerCubicYard = 0.3375;
      const baseWt = baseVol * tonsPerCubicYard;
      const recWt = recVol * tonsPerCubicYard;

      return {
        area: areaVal,
        depth: d,
        depthUnit: 'in',
        areaUnit: 'sq ft',
        baseVolume: baseVol,
        extraVolume: extraVol,
        recommendedVolume: recVol,
        extraPercent: extraPct,
        unitLabel: 'cubic yards',
        equivalentVolume: equivVol,
        equivalentUnit: 'm³',
        baseWeight: baseWt,
        recommendedWeight: recWt,
        weightUnit: 'tons',
      };
    }
  };

  // Run calculation on every change
  useEffect(() => {
    const res = calculateMulch();
    setResult(res);
  }, [unitSystem, method, length, width, diameter, customArea, depth, extraMulch]);

  // Form submission handler with validation
  const handleCalculate = (e: FormEvent) => {
    e.preventDefault();

    if (method === 'rectangle') {
      const l = parseFloat(length);
      const w = parseFloat(width);
      if (isNaN(l) || l <= 0 || isNaN(w) || w <= 0) {
        setError('Please enter valid positive numbers for length and width.');
        return;
      }
    } else if (method === 'circle') {
      const dia = parseFloat(diameter);
      if (isNaN(dia) || dia <= 0) {
        setError('Please enter a valid positive number for diameter.');
        return;
      }
    } else {
      const ca = parseFloat(customArea);
      if (isNaN(ca) || ca <= 0) {
        setError('Please enter a valid positive number for custom area.');
        return;
      }
    }

    const d = parseFloat(depth);
    if (isNaN(d) || d <= 0) {
      setError('Please enter a valid positive number for depth.');
      return;
    }

    const res = calculateMulch();
    if (res) {
      setResult(res);
      setError(null);
      const el = document.getElementById('result-box');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  };

  // PDF Export
  const handleDownloadPdf = async () => {
    if (!result) return;
    setIsGeneratingPdf(true);
    try {
      await exportBulkMaterialPdf({
        toolName: 'Mulch Calculator',
        materialType: 'mulch',
        unitSystem,
        method,
        length: method === 'rectangle' ? length : undefined,
        width: method === 'rectangle' ? width : undefined,
        diameter: method === 'circle' ? diameter : undefined,
        customArea: method === 'custom' ? customArea : undefined,
        depth,
        extraPercent: extraMulch,
        result,
      });
    } catch (err) {
      console.error('Failed to export PDF', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePositiveInput = (setter: (val: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || (!val.includes('-') && !isNaN(Number(val)))) {
      setter(val);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* 1. Title & Intro */}
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-display font-extrabold text-[#1A1918] tracking-tight leading-tight mb-2.5">
          Mulch Calculator
        </h1>
        <p className="text-base sm:text-lg text-[#4E4942] leading-relaxed font-sans">
          Calculate the exact mulch volume needed for garden beds, tree rings, and landscape borders. Enter your dimensions and target depth to get cubic yards, cubic metres, bulk tons, and individual bag counts.
        </p>
      </div>

      {/* 2. Unit System Selector */}
      <section aria-label="Unit system selection" className="mb-7">
        <div className="grid grid-cols-2 gap-1.5 p-1.5 bg-[#EDE5DA] rounded-xl border border-[#DDD3C5] shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)]">
          <button
            id="unit-metric-btn"
            type="button"
            aria-label="Switch to Metric units (metres, centimetres, cubic metres)"
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
            aria-label="Switch to US Imperial units (feet, inches, cubic yards)"
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
      <form onSubmit={handleCalculate} aria-label="Mulch calculation form" className="space-y-6">
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
                    Length
                  </label>
                  <div className="relative">
                    <input
                      id={lengthId}
                      type="number"
                      step="any"
                      min="0"
                      placeholder={isMetric ? 'e.g. 6' : 'e.g. 20'}
                      value={length}
                      onChange={handlePositiveInput(setLength)}
                      className="w-full bg-[#FDFBF7] border border-[#DFD5C6] focus:bg-[#FFFFFF] focus:border-[#163A5F] focus:ring-2 focus:ring-[#163A5F]/15 rounded-xl px-3.5 py-2.5 pr-10 text-base font-mono text-[#1A1918] font-semibold outline-hidden transition-all"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-[#6E675E] pointer-events-none">
                      {isMetric ? 'm' : 'ft'}
                    </span>
                  </div>
                </div>

                {/* Width */}
                <div className="space-y-1.5">
                  <label
                    htmlFor={widthId}
                    className="block text-xs sm:text-sm font-semibold text-[#1A1918] font-sans"
                  >
                    Width
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
                      {isMetric ? 'm' : 'ft'}
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
                    {isMetric ? 'm' : 'ft'}
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
                      placeholder={isMetric ? 'e.g. 18' : 'e.g. 200'}
                      value={customArea}
                      onChange={handlePositiveInput(setCustomArea)}
                      className="w-full bg-[#FDFBF7] border border-[#DFD5C6] focus:bg-[#FFFFFF] focus:border-[#163A5F] focus:ring-2 focus:ring-[#163A5F]/15 rounded-xl px-3.5 py-2.5 pr-12 text-base font-mono text-[#1A1918] font-semibold outline-hidden transition-all"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-[#6E675E] pointer-events-none">
                      {isMetric ? 'm²' : 'ft²'}
                    </span>
                  </div>
                </div>
                <div className="space-y-1 text-xs text-[#6E675E] font-sans leading-relaxed">
                  <p>For irregular garden beds, curves, or multiple garden zones, enter the total area you want to cover.</p>
                  <p>Measure each section separately and add the areas together.</p>
                </div>
              </div>
            )}

            {/* Depth Input */}
            <div className="space-y-1.5">
              <label
                htmlFor={depthId}
                className="block text-xs sm:text-sm font-semibold text-[#1A1918] font-sans"
              >
                Depth
              </label>
              <div className="relative">
                <input
                  id={depthId}
                  type="number"
                  step="any"
                  min="0"
                  placeholder={isMetric ? 'e.g. 7.5' : 'e.g. 3'}
                  value={depth}
                  onChange={handlePositiveInput(setDepth)}
                  className="w-full bg-[#FDFBF7] border border-[#DFD5C6] focus:bg-[#FFFFFF] focus:border-[#163A5F] focus:ring-2 focus:ring-[#163A5F]/15 rounded-xl px-3.5 py-2.5 pr-12 text-base font-mono text-[#1A1918] font-semibold outline-hidden transition-all"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-[#6E675E] pointer-events-none">
                  {isMetric ? 'cm' : 'in'}
                </span>
              </div>
              <p className="text-xs text-[#6E675E] font-sans">
                {isMetric
                  ? 'Typical depth: 5–8 cm for garden beds & weed control, 8–10 cm around trees & shrubs.'
                  : 'Typical depth: 2–3 in for garden beds & weed control, 3–4 in around trees & shrubs.'}
              </p>
            </div>
          </div>

          {/* Extra Mulch Selector */}
          <div className="pt-2 border-t border-[#EAE0D5] space-y-2">
            <label className="block text-xs sm:text-sm font-semibold text-[#1A1918] font-sans">
              Extra mulch
            </label>
            <div
              role="radiogroup"
              aria-label="Extra mulch percentage"
              className="grid grid-cols-4 gap-2"
            >
              {(['0', '5', '10', '15'] as const).map((pct) => (
                <button
                  key={pct}
                  id={`extra-mulch-${pct}-btn`}
                  type="button"
                  role="radio"
                  aria-checked={extraMulch === pct}
                  onClick={() => setExtraMulch(pct)}
                  className={`min-h-[42px] py-2 px-2 text-xs sm:text-sm font-mono font-bold rounded-xl border transition-all cursor-pointer ${
                    extraMulch === pct
                      ? 'bg-[#163A5F] text-white border-[#112F4D] shadow-xs'
                      : 'bg-[#FDFBF7] text-[#4E4942] border-[#DFD5C6] hover:bg-[#FFFFFF] hover:border-[#163A5F]'
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
            <p className="text-xs text-[#6E675E] font-sans pt-1 leading-relaxed">
              Extra mulch accounts for natural settling, uneven ground, and compaction.
            </p>
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
            id="calculate-mulch-btn"
            type="submit"
            className="w-full min-h-[50px] py-3.5 px-6 rounded-xl bg-[#163A5F] text-[#FFFFFF] text-base font-sans font-bold shadow-[0_3px_12px_rgba(22,58,95,0.2)] hover:bg-[#112F4D] active:scale-[0.99] transition-all cursor-pointer"
          >
            Calculate mulch ↓
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
          {/* 1. YOU NEED & ESTIMATED WEIGHT */}
          <div className="p-6 sm:p-7 rounded-xl bg-[#EDF7F2] border border-[#B4E2D3] space-y-4">
            <div>
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#0B6E54]">
                YOU NEED
              </span>
              <div className="flex items-baseline gap-2.5 flex-wrap mt-1">
                <span className="text-5xl sm:text-6xl font-display font-extrabold text-[#0B6E54] tracking-tight">
                  {formatVolumeDisplay(result.baseVolume)}
                </span>
                <span className="text-2xl sm:text-3xl font-display font-bold text-[#0B6E54]">
                  {result.unitLabel}
                </span>
              </div>
              <div className="text-xs text-[#0B6E54]/80 font-sans mt-0.5">
                Equivalent: ~{formatVolumeDisplay(result.equivalentVolume)} {result.equivalentUnit}
              </div>
            </div>

            <div className="pt-3 border-t border-[#B4E2D3]/80">
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#0B6E54]">
                ESTIMATED WEIGHT
              </span>
              <div className="text-2xl sm:text-3xl font-display font-bold text-[#0B6E54] mt-0.5">
                ≈ {formatWeightDisplay(result.baseWeight)} {result.weightUnit}
              </div>
              <p className="text-xs text-[#0B6E54]/90 font-sans mt-1">
                Estimated using typical mulch bulk density. Actual weight varies significantly by wood type and moisture content.
              </p>
            </div>
          </div>

          {/* 2. WHAT TO BUY & ESTIMATED WEIGHT */}
          <div className="p-5 sm:p-6 rounded-xl bg-[#FAF6F0] border border-[#E6DDD1] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#6E675E] font-sans">
                    WHAT TO BUY
                  </span>
                  <div className="text-3xl sm:text-4xl font-display font-bold text-[#1A1918] mt-0.5">
                    {formatVolumeDisplay(result.recommendedVolume)} {result.unitLabel}
                  </div>
                </div>

                <div>
                  <div className="text-xl sm:text-2xl font-display font-bold text-[#163A5F]">
                    ≈ {formatWeightDisplay(result.recommendedWeight)} {result.weightUnit}
                  </div>
                  <p className="text-xs text-[#6E675E] font-sans mt-1">
                    {result.extraPercent > 0
                      ? `Includes extra mulch (${result.extraPercent}% extra for settling & ground unevenness).`
                      : 'Rounded up volume.'}
                  </p>
                </div>
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
              <div className="flex justify-between items-center py-0.5">
                <span className="text-[#6E675E]">Area</span>
                <span className="font-semibold text-[#1A1918]">
                  {result.area.toFixed(2)} {result.areaUnit}
                </span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="text-[#6E675E]">Depth</span>
                <span className="font-semibold text-[#1A1918]">
                  {result.depth} {result.depthUnit}
                </span>
              </div>
              <div className="flex justify-between items-center py-0.5 border-t border-[#E4DCD0] pt-2">
                <span className="text-[#6E675E]">Base volume</span>
                <span className="font-semibold text-[#1A1918]">
                  {formatVolumeDisplay(result.baseVolume)} {result.unitLabel}
                </span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="text-[#6E675E]">Extra mulch ({result.extraPercent}%)</span>
                <span className="font-semibold text-[#163A5F]">
                  +{formatVolumeDisplay(result.extraVolume)} {result.unitLabel}
                </span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="text-[#6E675E]">Final volume</span>
                <span className="font-semibold text-[#0B6E54]">
                  {formatVolumeDisplay(result.recommendedVolume)} {result.unitLabel}
                </span>
              </div>
              <div className="flex justify-between items-center py-0.5 border-t border-[#E4DCD0] pt-2">
                <span className="text-[#6E675E]">Estimated density</span>
                <span className="font-semibold text-[#1A1918]">
                  {isMetric ? '≈ 400 kg/m³' : '≈ 675 lbs/cu yd'}
                </span>
              </div>
              <div className="pt-1 flex justify-between items-center font-bold text-sm">
                <span className="text-[#1A1918]">Estimated weight</span>
                <span className="text-[#0B6E54]">
                  ≈ {formatWeightDisplay(result.recommendedWeight)} {result.weightUnit}
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
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[#DFD5C6] bg-[#FFFFFF] hover:bg-[#FDFBF7] text-[#163A5F] text-sm font-sans font-bold shadow-xs hover:border-[#163A5F] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FileDown className="w-4 h-4 text-[#163A5F]" />
              <span>{isGeneratingPdf ? 'Generating PDF...' : 'Download calculation PDF'}</span>
            </button>
          </div>
        </section>
      )}

      {/* 5. Educational Content & SEO Guide */}
      <section className="mt-14 pt-10 border-t border-[#E6DDD1] space-y-10">
        <div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#1A1918] mb-4">
            How much mulch do I need?
          </h2>
          <p className="text-base text-[#4E4942] leading-relaxed mb-4">
            To determine how much mulch you need for your landscaping or garden project, multiply your garden bed area by the desired mulch depth. This gives you the total mulch volume needed in cubic metres (m³) or cubic yards.
          </p>
          <div className="p-5 bg-[#FAF6F0] rounded-xl border border-[#E4DCD0] font-mono text-sm text-[#1A1918] space-y-1.5 mb-4">
            <p className="font-bold font-sans text-xs uppercase tracking-wider text-[#6E675E]">
              Mulch Volume Formula
            </p>
            <p><strong>Metric:</strong> Volume (m³) = Area (m²) × [Depth (cm) ÷ 100]</p>
            <p><strong>US / Imperial:</strong> Volume (cubic yards) = [Area (sq ft) × (Depth in inches ÷ 12)] ÷ 27</p>
          </div>
          <p className="text-sm text-[#4E4942] leading-relaxed">
            Our <strong>mulch calculator</strong> automates this calculation instantly and adds an extra safety allowance (typically 10%) to account for compaction, settling into soil crevices, and irregular contours.
          </p>
        </div>

        {/* Depth Guide */}
        <div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-[#1A1918] mb-4">
            Recommended mulch depth guide
          </h2>
          <p className="text-sm text-[#4E4942] leading-relaxed mb-4">
            Applying the right thickness is essential. Too little mulch will not suppress weeds or retain soil moisture; too much mulch can suffocate plant roots.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-[#FAF6F0] border border-[#E6DDD1] space-y-2">
              <h3 className="font-sans font-bold text-[#1A1918] text-base">Flower Beds & Borders</h3>
              <p className="text-xs text-[#0B6E54] font-bold">5–8 cm (2–3 inches)</p>
              <p className="text-xs text-[#4E4942] leading-relaxed">
                Ideal for annual flower beds, perennial borders, and shrub beds. Blocks weed seeds and keeps soil moist.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-[#FAF6F0] border border-[#E6DDD1] space-y-2">
              <h3 className="font-sans font-bold text-[#1A1918] text-base">Trees & Large Shrubs</h3>
              <p className="text-xs text-[#0B6E54] font-bold">8–10 cm (3–4 inches)</p>
              <p className="text-xs text-[#4E4942] leading-relaxed">
                Protects root systems from lawnmowers and temperature extremes. Keep mulch 5–10 cm away from tree trunks.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-[#FAF6F0] border border-[#E6DDD1] space-y-2">
              <h3 className="font-sans font-bold text-[#1A1918] text-base">Annual Top-Dressing</h3>
              <p className="text-xs text-[#0B6E54] font-bold">2.5–5 cm (1–2 inches)</p>
              <p className="text-xs text-[#4E4942] leading-relaxed">
                Freshening up an existing mulch layer that has partially decomposed from the previous season.
              </p>
            </div>
          </div>
        </div>

        {/* Bagged vs Bulk */}
        <div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-[#1A1918] mb-4">
            Bagged vs. bulk mulch: what to buy
          </h2>
          <p className="text-sm text-[#4E4942] leading-relaxed mb-4">
            Depending on the scale of your landscaping project, you can buy mulch in individual bags from garden centres or order bulk delivery by the cubic metre or cubic yard.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-[#FAF6F0] border border-[#E6DDD1] space-y-2">
              <h3 className="font-sans font-bold text-[#1A1918] text-sm">Bagged Mulch (Small to Medium Projects)</h3>
              <ul className="text-xs text-[#4E4942] space-y-1.5 list-disc list-inside">
                <li><strong>2 cubic foot bags:</strong> 1 cubic yard = 13.5 bags (27 cu ft total).</li>
                <li><strong>3 cubic foot bags:</strong> 1 cubic yard = 9 bags.</li>
                <li><strong>50 litre bags:</strong> 1 cubic metre (1,000 L) = 20 bags.</li>
                <li><strong>60 litre bags:</strong> 1 cubic metre = ~17 bags.</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-[#FAF6F0] border border-[#E6DDD1] space-y-2">
              <h3 className="font-sans font-bold text-[#1A1918] text-sm">Bulk Mulch (Large Landscaping)</h3>
              <ul className="text-xs text-[#4E4942] space-y-1.5 list-disc list-inside">
                <li>Delivered loose by truck or in 1 m³ builder bulk bags.</li>
                <li>Significantly cheaper per unit volume when needing over 2 m³ or 3 cubic yards.</li>
                <li>Easier to shovel directly into wheelbarrows for distribution.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Measuring irregular beds */}
        <div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-[#1A1918] mb-4">
            How to calculate mulch for irregular garden shapes
          </h2>
          <p className="text-sm text-[#4E4942] leading-relaxed mb-3">
            Many garden borders and landscape beds have curved edges or kidney shapes. Use the <strong>Custom area</strong> option in our mulch calculator:
          </p>
          <ol className="text-sm text-[#4E4942] space-y-2 list-decimal list-inside leading-relaxed">
            <li><strong>Break into simple zones:</strong> Divide the garden bed into smaller rectangles, triangles, or circles.</li>
            <li><strong>Measure and calculate each zone:</strong> Multiply length by average width for each rectangular section.</li>
            <li><strong>Sum the total area:</strong> Add the areas together and type the final number into the <em>Custom area</em> input.</li>
          </ol>
        </div>

        {/* Common Questions */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-display font-bold text-[#1A1918]">
            Frequently asked questions about mulch
          </h2>
          <div className="space-y-3">
            <div className="p-5 rounded-xl bg-[#FAF6F0] border border-[#E6DDD1] space-y-1.5">
              <h3 className="text-sm font-bold text-[#1A1918]">How much does a cubic yard of mulch weigh?</h3>
              <p className="text-xs text-[#4E4942] leading-relaxed">
                A cubic yard of dry wood chips or shredded bark typically weighs between 400 to 600 lbs (0.2–0.3 tons). Damp or wet mulch can weigh 700 to 1,000 lbs (0.35–0.5 tons).
              </p>
            </div>
            <div className="p-5 rounded-xl bg-[#FAF6F0] border border-[#E6DDD1] space-y-1.5">
              <h3 className="text-sm font-bold text-[#1A1918]">Why should I avoid "mulch volcanoes" around trees?</h3>
              <p className="text-xs text-[#4E4942] leading-relaxed">
                Piling mulch directly against tree bark traps moisture, causing bark rot, fungal infections, and encouraging rodents. Always leave a 5–10 cm (2–4 inch) ring of bare soil around the trunk flare.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-[#FAF6F0] border border-[#E6DDD1] space-y-1.5">
              <h3 className="text-sm font-bold text-[#1A1918]">How often should I add fresh mulch?</h3>
              <p className="text-xs text-[#4E4942] leading-relaxed">
                Organic wood bark mulch breaks down over 1 to 2 years, improving the soil underneath. A light top-up of 2.5–5 cm (1–2 inches) once a year keeps beds looking fresh and inhibits weed germination.
              </p>
            </div>
          </div>
        </div>

        {/* Explore Other Calculators */}
        <div className="pt-6 border-t border-[#E6DDD1]">
          <h2 className="text-lg font-display font-bold text-[#1A1918] mb-3">
            Related Landscaping & Garden Calculators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <Link
              href="/tools/topsoil-calculator"
              className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[#E6DDD1] hover:border-[#163A5F] transition-all group flex items-center justify-between"
            >
              <div>
                <div className="font-bold text-xs text-[#1A1918] group-hover:text-[#163A5F]">
                  Topsoil Calculator
                </div>
                <div className="text-[11px] text-[#6E675E]">Garden beds & grading</div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#6E675E] group-hover:text-[#163A5F] group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/tools/sod-calculator"
              className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[#E6DDD1] hover:border-[#163A5F] transition-all group flex items-center justify-between"
            >
              <div>
                <div className="font-bold text-xs text-[#1A1918] group-hover:text-[#163A5F]">
                  Sod Calculator
                </div>
                <div className="text-[11px] text-[#6E675E]">Lawn rolls & pallets</div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#6E675E] group-hover:text-[#163A5F] group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/tools/gravel-calculator"
              className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[#E6DDD1] hover:border-[#163A5F] transition-all group flex items-center justify-between"
            >
              <div>
                <div className="font-bold text-xs text-[#1A1918] group-hover:text-[#163A5F]">
                  Gravel Calculator
                </div>
                <div className="text-[11px] text-[#6E675E]">Driveways & pathways</div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#6E675E] group-hover:text-[#163A5F] group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/tools/sand-calculator"
              className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[#E6DDD1] hover:border-[#163A5F] transition-all group flex items-center justify-between"
            >
              <div>
                <div className="font-bold text-xs text-[#1A1918] group-hover:text-[#163A5F]">
                  Sand Calculator
                </div>
                <div className="text-[11px] text-[#6E675E]">Patios & sandboxes</div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#6E675E] group-hover:text-[#163A5F] group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
