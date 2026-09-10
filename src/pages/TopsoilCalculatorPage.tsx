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

export function TopsoilCalculatorPage() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');
  const [method, setMethod] = useState<MeasureMethod>('rectangle');

  // Input states
  const [length, setLength] = useState<string>('5');
  const [width, setWidth] = useState<string>('3');
  const [diameter, setDiameter] = useState<string>('4');
  const [customArea, setCustomArea] = useState<string>('15');
  const [depth, setDepth] = useState<string>('10');
  const [extraTopsoil, setExtraTopsoil] = useState<'0' | '5' | '10' | '15'>('10');

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
  const calculateTopsoil = (): CalculationResult | null => {
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

    const extraPct = parseInt(extraTopsoil, 10) || 0;

    // Typical screened topsoil bulk density: ~1,250 kg/m³ (approx. 1.25 tonnes per m³)
    // In US: ~2,100 lbs per cubic yard, or ~1.05 short tons (2,000 lbs) per cubic yard
    if (isMetric) {
      const depthMeters = d / 100;
      const baseVol = areaVal * depthMeters; // m³
      const extraVol = baseVol * (extraPct / 100);
      const recVol = baseVol + extraVol;

      // 1 m³ = 1.30795 cubic yards
      const equivVol = baseVol * 1.30795;

      // Density ~ 1.25 tonnes/m³
      const densityTonnesPerM3 = 1.25;
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

      // Topsoil: approx 2,100 lbs/cu yd -> 1.05 short tons
      const tonsPerCubicYard = 1.05;
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
    const res = calculateTopsoil();
    setResult(res);
  }, [unitSystem, method, length, width, diameter, customArea, depth, extraTopsoil]);

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

    const res = calculateTopsoil();
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
        toolName: 'Topsoil Calculator',
        materialType: 'topsoil',
        unitSystem,
        method,
        length: method === 'rectangle' ? length : undefined,
        width: method === 'rectangle' ? width : undefined,
        diameter: method === 'circle' ? diameter : undefined,
        customArea: method === 'custom' ? customArea : undefined,
        depth,
        extraPercent: extraTopsoil,
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
          Topsoil Calculator
        </h1>
        <p className="text-base sm:text-lg text-[#4E4942] leading-relaxed font-sans">
          Calculate the volume and weight of topsoil needed for garden beds, lawn seeding, raised planters, and grading. Enter your dimensions and layer depth to get cubic yards, cubic metres, tonnes, tons, and bags.
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
      <form onSubmit={handleCalculate} aria-label="Topsoil calculation form" className="space-y-6">
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
                      placeholder={isMetric ? 'e.g. 5' : 'e.g. 16'}
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
              /* Custom Area: show ONLY Area and hide other dimensions */
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
                      placeholder={isMetric ? 'e.g. 15' : 'e.g. 160'}
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
                  <p>For curved garden beds, kidney-shaped borders, or multiple garden plots, enter the total area directly.</p>
                  <p>Calculate each section separately and add the values together.</p>
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
                  placeholder={isMetric ? 'e.g. 10' : 'e.g. 4'}
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
                  ? 'Typical depth: 1–2 cm for lawn top dressing, 10–15 cm for new turf/lawn seeding, 20–30 cm for raised planter beds.'
                  : 'Typical depth: 0.5–1 in for lawn top dressing, 4–6 in for new turf/lawn seeding, 8–12 in for raised planter beds.'}
              </p>
            </div>
          </div>

          {/* Extra Material (Topsoil) Selector */}
          <div className="pt-2 border-t border-[#EAE0D5] space-y-2">
            <label className="block text-xs sm:text-sm font-semibold text-[#1A1918] font-sans">
              Extra topsoil
            </label>
            <div
              role="radiogroup"
              aria-label="Extra topsoil percentage"
              className="grid grid-cols-4 gap-2"
            >
              {(['0', '5', '10', '15'] as const).map((pct) => (
                <button
                  key={pct}
                  id={`extra-topsoil-${pct}-btn`}
                  type="button"
                  role="radio"
                  aria-checked={extraTopsoil === pct}
                  onClick={() => setExtraTopsoil(pct)}
                  className={`min-h-[42px] py-2 px-2 text-xs sm:text-sm font-mono font-bold rounded-xl border transition-all cursor-pointer ${
                    extraTopsoil === pct
                      ? 'bg-[#163A5F] text-white border-[#112F4D] shadow-xs'
                      : 'bg-[#FDFBF7] text-[#4E4942] border-[#DFD5C6] hover:bg-[#FFFFFF] hover:border-[#163A5F]'
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
            <p className="text-xs text-[#6E675E] font-sans pt-1 leading-relaxed">
              Extra topsoil accounts for natural compaction, tamping down, settling, and ground unevenness.
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
            id="calculate-topsoil-btn"
            type="submit"
            className="w-full min-h-[50px] py-3.5 px-6 rounded-xl bg-[#163A5F] text-[#FFFFFF] text-base font-sans font-bold shadow-[0_3px_12px_rgba(22,58,95,0.2)] hover:bg-[#112F4D] active:scale-[0.99] transition-all cursor-pointer"
          >
            Calculate topsoil ↓
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
                Estimated using typical topsoil bulk density (~1,250 kg/m³ or ~2,100 lbs/yd³). Actual weight varies by moisture level, organic content, and compaction.
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
                      ? `Includes extra topsoil (${result.extraPercent}% extra for settling, compaction & ground unevenness).`
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
                <span className="text-[#6E675E]">Extra topsoil ({result.extraPercent}%)</span>
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
                  {isMetric ? '≈ 1,250 kg/m³ (1.25 t/m³)' : '≈ 2,100 lbs/cu yd (1.05 tons/cu yd)'}
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
            How much topsoil do I need?
          </h2>
          <p className="text-base text-[#4E4942] leading-relaxed mb-4">
            To calculate how much topsoil you need for your landscaping or garden project, multiply your garden area by your desired soil depth. This gives you the exact topsoil volume required in cubic metres (m³) or cubic yards.
          </p>
          <div className="p-5 bg-[#FAF6F0] rounded-xl border border-[#E4DCD0] font-mono text-sm text-[#1A1918] space-y-1.5 mb-4">
            <p className="font-bold font-sans text-xs uppercase tracking-wider text-[#6E675E]">
              Topsoil Volume Formula
            </p>
            <p><strong>Metric:</strong> Volume (m³) = Area (m²) × [Depth (cm) ÷ 100]</p>
            <p><strong>US / Imperial:</strong> Volume (cubic yards) = [Area (sq ft) × (Depth in inches ÷ 12)] ÷ 27</p>
          </div>
          <p className="text-base text-[#4E4942] leading-relaxed">
            Our <strong>topsoil volume calculator</strong> handles unit conversions instantly and automatically factors in an extra safety allowance (typically 10%) to account for soil settling, compaction during raking and watering, and sub-base hollows.
          </p>
        </div>

        {/* Recommended Depths */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#1A1918] mb-4">
            Recommended topsoil depth guide
          </h2>
          <p className="text-base text-[#4E4942] leading-relaxed mb-4">
            Using the appropriate depth ensures healthy root development, proper drainage, and long-term soil structure:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1]">
              <h3 className="font-sans font-bold text-[#1A1918] text-base mb-1">Lawn Top Dressing</h3>
              <p className="text-xs font-mono font-bold text-[#163A5F] mb-2">1–2 cm (0.5–1 inch)</p>
              <p className="text-sm text-[#4E4942] leading-relaxed">
                Rejuvenates existing lawn turf, smooths out lawn divots, and supplies organic nutrients without smothering the grass blades.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1]">
              <h3 className="font-sans font-bold text-[#1A1918] text-base mb-1">New Lawn Seeding & Turf Underlay</h3>
              <p className="text-xs font-mono font-bold text-[#163A5F] mb-2">10–15 cm (4–6 inches)</p>
              <p className="text-sm text-[#4E4942] leading-relaxed">
                Provides a rich root zone for young grass seed germination or new rolled sod turf establishment over compacted subsoil.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1]">
              <h3 className="font-sans font-bold text-[#1A1918] text-base mb-1">Flower Beds & Shrub Borders</h3>
              <p className="text-xs font-mono font-bold text-[#163A5F] mb-2">15–20 cm (6–8 inches)</p>
              <p className="text-sm text-[#4E4942] leading-relaxed">
                Allows perennials, flowering plants, and ornamental shrubs to establish deep root anchors and retain essential moisture.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1]">
              <h3 className="font-sans font-bold text-[#1A1918] text-base mb-1">Vegetable Beds & Raised Planters</h3>
              <p className="text-xs font-mono font-bold text-[#163A5F] mb-2">20–30 cm (8–12 inches)</p>
              <p className="text-sm text-[#4E4942] leading-relaxed">
                Essential depth for deep-root vegetables such as carrots, potatoes, and tomatoes. Blend screened topsoil with compost for best yields.
              </p>
            </div>
          </div>
        </div>

        {/* Bagged vs. Bulk */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#1A1918] mb-4">
            Bagged vs. bulk topsoil: what to buy
          </h2>
          <p className="text-base text-[#4E4942] leading-relaxed mb-4">
            Depending on your project scale, topsoil can be purchased in convenient plastic bags or ordered in bulk bulk bags / loose tipper truck loads:
          </p>
          <div className="space-y-3">
            <div className="p-5 rounded-xl bg-[#FAF6F0] border border-[#E6DDD1]">
              <h3 className="font-sans font-bold text-[#1A1918] text-sm">Bagged Topsoil (Small Projects)</h3>
              <p className="text-sm text-[#4E4942] mt-1 leading-relaxed">
                Standard garden centre bags typically contain <strong>25 L to 40 L</strong> (or 0.75–1.0 cu ft). They are ideal for potted planters, patching dead grass spots, or top-dressing small lawn areas. 1 cubic metre equals roughly 25 to 30 large bags (40 L each).
              </p>
            </div>
            <div className="p-5 rounded-xl bg-[#FAF6F0] border border-[#E6DDD1]">
              <h3 className="font-sans font-bold text-[#1A1918] text-sm">Bulk Delivery (Medium to Large Projects)</h3>
              <p className="text-sm text-[#4E4942] mt-1 leading-relaxed">
                For projects requiring over 1 m³ (or 1.3 cubic yards), ordering bulk bags (builders bags or tonne bags) or loose dump-truck delivery is vastly more economical and saves significant packaging waste.
              </p>
            </div>
          </div>
        </div>

        {/* Irregular Shapes */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#1A1918] mb-4">
            How to calculate topsoil for irregular garden shapes
          </h2>
          <p className="text-base text-[#4E4942] leading-relaxed mb-3">
            Garden beds often have curves, bends, or irregular boundaries. In our topsoil calculator, select <strong>Custom area</strong>:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-[#4E4942] leading-relaxed">
            <li><strong>Break into simple zones:</strong> Divide your plot into smaller rectangles, triangles, or semi-circles.</li>
            <li><strong>Calculate individual areas:</strong> Multiply width by length for rectangles, or (base × height) ÷ 2 for triangles.</li>
            <li><strong>Sum total area:</strong> Add the zone areas together, select <em>Custom area</em> in the tool, enter your total area, and input your depth.</li>
          </ul>
        </div>

        {/* Topsoil FAQs */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#1A1918] mb-4">
            Frequently asked questions about topsoil
          </h2>
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1]">
              <h3 className="text-sm font-bold text-[#1A1918]">How much does a cubic yard or cubic metre of topsoil weigh?</h3>
              <p className="text-sm text-[#4E4942] mt-1 leading-relaxed">
                A cubic metre of dry, screened topsoil typically weighs around 1,200 to 1,300 kg (1.2–1.3 tonnes). In US measurements, a cubic yard typically weighs between 2,000 to 2,200 lbs (approx. 1 to 1.1 short tons). Damp or wet soil will weigh more due to water retention.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1]">
              <h3 className="text-sm font-bold text-[#1A1918]">What is the difference between screened and unscreened topsoil?</h3>
              <p className="text-sm text-[#4E4942] mt-1 leading-relaxed">
                Screened topsoil has been sifted through meshes (usually 10 mm or 3/8-inch) to remove rocks, sticks, and large clumps, providing a uniform, smooth consistency for seeding and fine gardening. Unscreened topsoil is coarser and best used as sub-base bulk fill.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1]">
              <h3 className="text-sm font-bold text-[#1A1918]">Why should I add 10% extra topsoil to my order?</h3>
              <p className="text-sm text-[#4E4942] mt-1 leading-relaxed">
                Freshly delivered topsoil contains air pockets that naturally compress when watered, rolled, or walked on. Ordering 10% extra ensures your beds don't sink below your edging or pathway level after initial settling.
              </p>
            </div>
          </div>
        </div>

        {/* 6. Related Calculators */}
        <div className="pt-6 border-t border-[#E6DDD1]">
          <h2 className="text-lg font-display font-bold text-[#1A1918] mb-3">
            Related Landscaping & Garden Calculators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/tools/mulch-calculator"
              className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] hover:border-[#163A5F] hover:bg-[#FDFBF7] transition-all flex items-center justify-between group cursor-pointer"
            >
              <div>
                <h3 className="font-sans font-bold text-sm text-[#1A1918] group-hover:text-[#163A5F]">
                  Mulch Calculator
                </h3>
                <p className="text-xs text-[#6E675E] mt-0.5">Calculate mulch volume and bags for garden beds & trees</p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#6E675E] group-hover:text-[#163A5F] transition-transform group-hover:translate-x-0.5 shrink-0" />
            </Link>
            <Link
              href="/tools/sod-calculator"
              className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] hover:border-[#163A5F] hover:bg-[#FDFBF7] transition-all flex items-center justify-between group cursor-pointer"
            >
              <div>
                <h3 className="font-sans font-bold text-sm text-[#1A1918] group-hover:text-[#163A5F]">
                  Sod Calculator
                </h3>
                <p className="text-xs text-[#6E675E] mt-0.5">Calculate lawn turf rolls, pallets, and square footage</p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#6E675E] group-hover:text-[#163A5F] transition-transform group-hover:translate-x-0.5 shrink-0" />
            </Link>
            <Link
              href="/tools/sand-calculator"
              className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] hover:border-[#163A5F] hover:bg-[#FDFBF7] transition-all flex items-center justify-between group cursor-pointer"
            >
              <div>
                <h3 className="font-sans font-bold text-sm text-[#1A1918] group-hover:text-[#163A5F]">
                  Sand Calculator
                </h3>
                <p className="text-xs text-[#6E675E] mt-0.5">Calculate sand volume and weight for paving & leveling</p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#6E675E] group-hover:text-[#163A5F] transition-transform group-hover:translate-x-0.5 shrink-0" />
            </Link>
            <Link
              href="/tools/gravel-calculator"
              className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] hover:border-[#163A5F] hover:bg-[#FDFBF7] transition-all flex items-center justify-between group cursor-pointer"
            >
              <div>
                <h3 className="font-sans font-bold text-sm text-[#1A1918] group-hover:text-[#163A5F]">
                  Gravel Calculator
                </h3>
                <p className="text-xs text-[#6E675E] mt-0.5">Calculate gravel volume and weight for paths & driveways</p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#6E675E] group-hover:text-[#163A5F] transition-transform group-hover:translate-x-0.5 shrink-0" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
