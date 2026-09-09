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

export function SandCalculatorPage() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');
  const [method, setMethod] = useState<MeasureMethod>('rectangle');

  // Input states
  const [length, setLength] = useState<string>('4');
  const [width, setWidth] = useState<string>('3');
  const [diameter, setDiameter] = useState<string>('3');
  const [customArea, setCustomArea] = useState<string>('12');
  const [depth, setDepth] = useState<string>('5');
  const [extraSand, setExtraSand] = useState<'0' | '5' | '10' | '15'>('10');

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
  const calculateSand = (
    currentUnit: UnitSystem,
    currentMethod: MeasureMethod,
    lenVal: string,
    widVal: string,
    diaVal: string,
    customAreaVal: string,
    depVal: string,
    extraVal: string
  ): CalculationResult | null => {
    const d = parseFloat(depVal);
    const extraPct = parseFloat(extraVal) || 0;

    if (isNaN(d) || d <= 0) {
      return null;
    }

    let area = 0;

    if (currentMethod === 'rectangle') {
      const l = parseFloat(lenVal);
      const w = parseFloat(widVal);
      if (isNaN(l) || isNaN(w) || l <= 0 || w <= 0) {
        return null;
      }
      area = l * w;
    } else if (currentMethod === 'circle') {
      const dia = parseFloat(diaVal);
      if (isNaN(dia) || dia <= 0) {
        return null;
      }
      const radius = dia / 2;
      area = Math.PI * radius * radius;
    } else {
      const ca = parseFloat(customAreaVal);
      if (isNaN(ca) || ca <= 0) {
        return null;
      }
      area = ca;
    }

    if (area <= 0) return null;

    let baseVol = 0;
    let unitLabel: 'm³' | 'cubic yards' = 'm³';
    let equivVol = 0;
    let equivUnit: 'cubic yards' | 'm³' = 'cubic yards';
    const areaUnit: 'm²' | 'sq ft' = currentUnit === 'metric' ? 'm²' : 'sq ft';
    const depthUnit: 'cm' | 'in' = currentUnit === 'metric' ? 'cm' : 'in';

    if (currentUnit === 'metric') {
      // Depth in cm -> meters
      const depthMeters = d / 100;
      baseVol = area * depthMeters; // m³
      unitLabel = 'm³';
      // 1 m³ = 1.30795 cubic yards
      equivVol = baseVol * 1.30795;
      equivUnit = 'cubic yards';
    } else {
      // Depth in inches -> feet
      const depthFeet = d / 12;
      const volumeCuFt = area * depthFeet; // cubic feet
      baseVol = volumeCuFt / 27; // cubic yards
      unitLabel = 'cubic yards';
      // 1 cubic yard = 1 / 1.30795 m³
      equivVol = baseVol / 1.30795;
      equivUnit = 'm³';
    }

    const extraVol = baseVol * (extraPct / 100);
    const recVol = baseVol + extraVol;

    // Weight calculation using bulk sand density of 1,600 kg/m³
    let baseWeight = 0;
    let recWeight = 0;
    let weightUnit: 'tonnes' | 'tons' = 'tonnes';

    if (currentUnit === 'metric') {
      // Metric: 1 m³ = 1,600 kg = 1.6 tonnes
      baseWeight = baseVol * 1.6;
      recWeight = recVol * 1.6;
      weightUnit = 'tonnes';
    } else {
      // US: Convert volume to cubic yards -> m³ -> kg -> lbs -> short tons (2,000 lbs)
      // 1 cubic yard = 1 / 1.30795 m³
      // 1 m³ = 1,600 kg; 1 kg = 2.20462262 lbs
      const tonsPerCubicYard = (1600 / 1.30795) * (2.20462262 / 2000);
      baseWeight = baseVol * tonsPerCubicYard;
      recWeight = recVol * tonsPerCubicYard;
      weightUnit = 'tons';
    }

    return {
      area,
      depth: d,
      depthUnit,
      areaUnit,
      baseVolume: baseVol,
      extraVolume: extraVol,
      recommendedVolume: recVol,
      extraPercent: extraPct,
      unitLabel,
      equivalentVolume: equivVol,
      equivalentUnit: equivUnit,
      baseWeight,
      recommendedWeight: recWeight,
      weightUnit,
    };
  };

  // Recalculate live when any input changes
  useEffect(() => {
    const res = calculateSand(unitSystem, method, length, width, diameter, customArea, depth, extraSand);
    if (res) {
      setResult(res);
      setError(null);
    }
  }, [unitSystem, method, length, width, diameter, customArea, depth, extraSand]);

  // Form submit handler with validation and smooth scrolling
  const handleCalculate = (e: FormEvent) => {
    e.preventDefault();

    const res = calculateSand(unitSystem, method, length, width, diameter, customArea, depth, extraSand);
    if (!res) {
      if (method === 'rectangle') {
        setError('Please enter a valid length, width, and depth greater than 0.');
      } else if (method === 'circle') {
        setError('Please enter a valid diameter and depth greater than 0.');
      } else {
        setError('Please enter a valid area and depth greater than 0.');
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
      await exportBulkMaterialPdf({
        toolName: 'Sand Calculator',
        materialType: 'sand',
        unitSystem,
        method,
        length: method === 'rectangle' ? length : undefined,
        width: method === 'rectangle' ? width : undefined,
        diameter: method === 'circle' ? diameter : undefined,
        customArea: method === 'custom' ? customArea : undefined,
        depth,
        extraPercent: extraSand,
        result,
      });
    } catch (err) {
      console.error('Failed to export Sand calculation PDF:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <main className="flex-1 max-w-xl w-full mx-auto px-5 py-8 sm:py-12 flex flex-col justify-center">
      {/* 1. Title & Intro */}
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-display font-extrabold text-[#1A1918] tracking-tight leading-tight mb-2.5">
          Sand Calculator
        </h1>
        <p className="text-base sm:text-lg text-[#4E4942] leading-relaxed font-sans">
          Find out how much sand you need for your garden, landscaping, patio, sandbox, or other project. Enter your area and sand depth to get the volume and estimated weight you need.
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
      <form onSubmit={handleCalculate} aria-label="Sand calculation form" className="space-y-6">
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
                      placeholder={isMetric ? 'e.g. 4' : 'e.g. 12'}
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
                    placeholder={isMetric ? 'e.g. 3' : 'e.g. 10'}
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
                      placeholder={isMetric ? 'e.g. 12' : 'e.g. 120'}
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
                  <p>For irregular or multiple areas, enter the total area you want to cover.</p>
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
                  placeholder={isMetric ? 'e.g. 5' : 'e.g. 2'}
                  value={depth}
                  onChange={handlePositiveInput(setDepth)}
                  className="w-full bg-[#FDFBF7] border border-[#DFD5C6] focus:bg-[#FFFFFF] focus:border-[#163A5F] focus:ring-2 focus:ring-[#163A5F]/15 rounded-xl px-3.5 py-2.5 pr-12 text-base font-mono text-[#1A1918] font-semibold outline-hidden transition-all"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-[#6E675E] pointer-events-none">
                  {isMetric ? 'cm' : 'in'}
                </span>
              </div>
              <p className="text-xs text-[#6E675E] font-sans">
                {isMetric ? 'Typical depth: 2–5 cm for paver bedding, 5–10 cm for sandboxes.' : 'Typical depth: 1–2 in for paver base, 2–4 in for sandboxes.'}
              </p>
            </div>
          </div>

          {/* Extra Sand Selector */}
          <div className="pt-2 border-t border-[#EAE0D5] space-y-2">
            <label className="block text-xs sm:text-sm font-semibold text-[#1A1918] font-sans">
              Extra sand
            </label>
            <div
              role="radiogroup"
              aria-label="Extra sand percentage"
              className="grid grid-cols-4 gap-2"
            >
              {(['0', '5', '10', '15'] as const).map((pct) => (
                <button
                  key={pct}
                  id={`extra-sand-${pct}-btn`}
                  type="button"
                  role="radio"
                  aria-checked={extraSand === pct}
                  onClick={() => setExtraSand(pct)}
                  className={`min-h-[42px] py-2 px-2 text-xs sm:text-sm font-mono font-bold rounded-xl border transition-all cursor-pointer ${
                    extraSand === pct
                      ? 'bg-[#163A5F] text-white border-[#112F4D] shadow-xs'
                      : 'bg-[#FDFBF7] text-[#4E4942] border-[#DFD5C6] hover:bg-[#FFFFFF] hover:border-[#163A5F]'
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
            <p className="text-xs text-[#6E675E] font-sans pt-1 leading-relaxed">
              Extra sand helps account for compaction, settling, and uneven ground.
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
            id="calculate-sand-btn"
            type="submit"
            className="w-full min-h-[50px] py-3.5 px-6 rounded-xl bg-[#163A5F] text-[#FFFFFF] text-base font-sans font-bold shadow-[0_3px_12px_rgba(22,58,95,0.2)] hover:bg-[#112F4D] active:scale-[0.99] transition-all cursor-pointer"
          >
            Calculate sand ↓
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
                Estimated using a typical sand density. Actual weight can vary by sand type and moisture.
              </p>
            </div>
          </div>

          {/* 2. RECOMMENDED AMOUNT & ESTIMATED WEIGHT */}
          <div className="p-5 sm:p-6 rounded-xl bg-[#FAF6F0] border border-[#E6DDD1] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#6E675E] font-sans">
                    RECOMMENDED AMOUNT
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
                      ? `Rounded up with extra sand (${result.extraPercent}% extra).`
                      : 'Rounded up with extra sand.'}
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
                <span className="text-[#6E675E]">Extra sand ({result.extraPercent}%)</span>
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
                <span className="font-semibold text-[#1A1918]">1,600 kg/m³</span>
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
              className="w-full min-h-[46px] py-3 px-5 rounded-xl bg-[#FAF6F0] hover:bg-[#F3ECE0] border border-[#DDD3C5] text-[#163A5F] font-sans font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xs hover:border-[#163A5F]/30 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <FileDown className="w-4 h-4 text-[#163A5F]" />
              <span>{isGeneratingPdf ? 'Generating PDF...' : 'Download PDF'}</span>
            </button>
          </div>
        </section>
      )}

      {/* 5. SEO & Helpful Context Sections */}
      <section aria-labelledby="how-much-sand-heading" className="mt-8 p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] shadow-[0_4px_20px_-2px_rgba(180,150,125,0.12)] space-y-3">
        <h2
          id="how-much-sand-heading"
          className="text-xl sm:text-2xl font-display font-bold text-[#1A1918]"
        >
          How much sand do I need?
        </h2>
        <p className="text-sm sm:text-base text-[#4E4942] leading-relaxed font-sans">
          This sand calculator estimates how much sand you need based on the area you want to cover and the depth required. It gives you the volume in cubic metres or cubic yards and an estimated weight in tonnes or US tons.
        </p>
      </section>

      <section aria-labelledby="how-it-works-heading" className="mt-6 p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] shadow-[0_4px_20px_-2px_rgba(180,150,125,0.12)] space-y-3">
        <h2
          id="how-it-works-heading"
          className="text-xl sm:text-2xl font-display font-bold text-[#1A1918]"
        >
          How the sand calculator works
        </h2>
        <p className="text-sm sm:text-base text-[#4E4942] leading-relaxed font-sans">
          Enter the length and width of your area, or use the circle option for a round area. Then enter the depth of sand you need. The calculator works out the volume and adds your chosen extra amount.
        </p>
      </section>

      <section aria-labelledby="sand-depth-heading" className="mt-6 p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] shadow-[0_4px_20px_-2px_rgba(180,150,125,0.12)] space-y-3">
        <h2
          id="sand-depth-heading"
          className="text-xl sm:text-2xl font-display font-bold text-[#1A1918]"
        >
          How deep should sand be?
        </h2>
        <p className="text-sm sm:text-base text-[#4E4942] leading-relaxed font-sans">
          The right depth depends on your project. A shallow layer may be enough for some landscaping uses, while sand for a sandbox or base may require a different depth. Check the recommended depth for your specific project.
        </p>
      </section>

      {/* 6. Internal Navigation Link */}
      <section aria-label="Explore more tools" className="mt-8">
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
