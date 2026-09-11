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
  baseWeightKg: number;
  baseWeightTonnes: number;
  baseWeightLb: number;
  baseWeightTons: number;
  recommendedWeightKg: number;
  recommendedWeightTonnes: number;
  recommendedWeightLb: number;
  recommendedWeightTons: number;
  baseWeight: number;
  recommendedWeight: number;
  weightUnit: 'tonnes' | 'tons';
  baseWeightDisplay: string;
  recommendedWeightDisplay: string;
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

function formatNumberWithCommas(val: number): string {
  if (val <= 0 || isNaN(val)) return '0';
  return Math.round(val).toLocaleString('en-US');
}

export function ConcreteCalculatorPage() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');
  const [method, setMethod] = useState<MeasureMethod>('rectangle');

  // Input states (default: 4m x 3m slab, 10cm depth)
  const [length, setLength] = useState<string>('4');
  const [width, setWidth] = useState<string>('3');
  const [diameter, setDiameter] = useState<string>('3.5');
  const [customArea, setCustomArea] = useState<string>('12');
  const [depth, setDepth] = useState<string>('10');
  const [extraConcrete, setExtraConcrete] = useState<'0' | '5' | '10' | '15'>('10');

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
  const calculateConcrete = (): CalculationResult | null => {
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

    const extraPct = parseInt(extraConcrete, 10) || 0;

    if (isMetric) {
      // Metric: Area in m², depth in cm -> depthMeters = depth / 100
      const depthMeters = d / 100;
      const baseVol = areaVal * depthMeters; // m³
      const extraVol = baseVol * (extraPct / 100);
      const recVol = baseVol + extraVol;

      // 1 m³ = 1.30795 cubic yards
      const equivVol = baseVol * 1.30795;

      // Concrete Density: 2,400 kg/m³
      const densityKgPerM3 = 2400;
      const baseWtKg = baseVol * densityKgPerM3;
      const baseWtTonnes = baseWtKg / 1000;
      const recWtKg = recVol * densityKgPerM3;
      const recWtTonnes = recWtKg / 1000;

      // Convert to lb & tons for completeness
      const baseWtLb = baseWtKg * 2.20462;
      const baseWtTons = baseWtLb / 2000;
      const recWtLb = recWtKg * 2.20462;
      const recWtTons = recWtLb / 2000;

      const baseDisplay = `≈ ${formatNumberWithCommas(baseWtKg)} kg (${formatWeightDisplay(baseWtTonnes)} tonnes)`;
      const recDisplay = `≈ ${formatNumberWithCommas(recWtKg)} kg (${formatWeightDisplay(recWtTonnes)} tonnes)`;

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
        baseWeightKg: baseWtKg,
        baseWeightTonnes: baseWtTonnes,
        baseWeightLb: baseWtLb,
        baseWeightTons: baseWtTons,
        recommendedWeightKg: recWtKg,
        recommendedWeightTonnes: recWtTonnes,
        recommendedWeightLb: recWtLb,
        recommendedWeightTons: recWtTons,
        baseWeight: baseWtTonnes,
        recommendedWeight: recWtTonnes,
        weightUnit: 'tonnes',
        baseWeightDisplay: baseDisplay,
        recommendedWeightDisplay: recDisplay,
      };
    } else {
      // US Imperial: Area in sq ft, depth in inches
      const depthFeet = d / 12;
      const baseCubicFeet = areaVal * depthFeet;
      const baseVolYards = baseCubicFeet / 27; // 27 cu ft in 1 cubic yard
      const extraVolYards = baseVolYards * (extraPct / 100);
      const recVolYards = baseVolYards + extraVolYards;
      const recCubicFeet = recVolYards * 27;

      // 1 cubic yard = 0.764555 m³
      const equivVolMeters = baseVolYards * 0.764555;

      // Concrete Density: 150 lb/ft³
      const densityLbPerCuFt = 150;
      const baseWtLb = baseCubicFeet * densityLbPerCuFt;
      const baseWtTons = baseWtLb / 2000; // US short tons
      const recWtLb = recCubicFeet * densityLbPerCuFt;
      const recWtTons = recWtLb / 2000;

      // Convert to kg & tonnes for completeness
      const baseWtKg = baseWtLb / 2.20462;
      const baseWtTonnes = baseWtKg / 1000;
      const recWtKg = recWtLb / 2.20462;
      const recWtTonnes = recWtKg / 1000;

      const baseDisplay = `≈ ${formatNumberWithCommas(baseWtLb)} lb (${formatWeightDisplay(baseWtTons)} tons)`;
      const recDisplay = `≈ ${formatNumberWithCommas(recWtLb)} lb (${formatWeightDisplay(recWtTons)} tons)`;

      return {
        area: areaVal,
        depth: d,
        depthUnit: 'in',
        areaUnit: 'sq ft',
        baseVolume: baseVolYards,
        extraVolume: extraVolYards,
        recommendedVolume: recVolYards,
        extraPercent: extraPct,
        unitLabel: 'cubic yards',
        equivalentVolume: equivVolMeters,
        equivalentUnit: 'm³',
        baseWeightKg: baseWtKg,
        baseWeightTonnes: baseWtTonnes,
        baseWeightLb: baseWtLb,
        baseWeightTons: baseWtTons,
        recommendedWeightKg: recWtKg,
        recommendedWeightTonnes: recWtTonnes,
        recommendedWeightLb: recWtLb,
        recommendedWeightTons: recWtTons,
        baseWeight: baseWtTons,
        recommendedWeight: recWtTons,
        weightUnit: 'tons',
        baseWeightDisplay: baseDisplay,
        recommendedWeightDisplay: recDisplay,
      };
    }
  };

  // Run calculation on every input change
  useEffect(() => {
    const res = calculateConcrete();
    setResult(res);
  }, [unitSystem, method, length, width, diameter, customArea, depth, extraConcrete]);

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
      setError('Please enter a valid positive number for slab depth.');
      return;
    }

    const res = calculateConcrete();
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
        toolName: 'Concrete Calculator',
        materialType: 'concrete',
        unitSystem,
        method,
        length: method === 'rectangle' ? length : undefined,
        width: method === 'rectangle' ? width : undefined,
        diameter: method === 'circle' ? diameter : undefined,
        customArea: method === 'custom' ? customArea : undefined,
        depth,
        extraPercent: extraConcrete,
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
          Concrete Calculator
        </h1>
        <p className="text-base sm:text-lg text-[#4E4942] leading-relaxed font-sans">
          Calculate the exact concrete volume and weight for slabs, footings, driveways, patios, and posts. Enter your dimensions and slab thickness to get cubic yards, cubic metres, tonnes, and premix bag counts.
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
      <form onSubmit={handleCalculate} aria-label="Concrete calculation form" className="space-y-6">
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
                      placeholder={isMetric ? 'e.g. 4' : 'e.g. 14'}
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
                    placeholder={isMetric ? 'e.g. 3.5' : 'e.g. 12'}
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
                      placeholder={isMetric ? 'e.g. 12' : 'e.g. 130'}
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
                  <p>For L-shaped patios, irregular pads, or multiple slab sections, enter the total surface area directly.</p>
                  <p>Calculate each section separately and add the areas together.</p>
                </div>
              </div>
            )}

            {/* Depth Input */}
            <div className="space-y-1.5">
              <label
                htmlFor={depthId}
                className="block text-xs sm:text-sm font-semibold text-[#1A1918] font-sans"
              >
                Depth / Thickness
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
                  ? 'Typical depth: 10 cm for sidewalks, shed bases & residential patios; 12.5–15 cm for driveways; 20 cm+ for heavy vehicle slabs or structural footings.'
                  : 'Typical depth: 4 in for walkways, shed pads & residential patios; 5–6 in for standard driveways; 8 in+ for heavy vehicle slabs or structural footings.'}
              </p>
            </div>
          </div>

          {/* Extra Material Selector */}
          <div className="pt-2 border-t border-[#EAE0D5] space-y-2">
            <label className="block text-xs sm:text-sm font-semibold text-[#1A1918] font-sans">
              Extra concrete
            </label>
            <div
              role="radiogroup"
              aria-label="Extra concrete percentage"
              className="grid grid-cols-4 gap-2"
            >
              {(['0', '5', '10', '15'] as const).map((pct) => (
                <button
                  key={pct}
                  id={`extra-concrete-${pct}-btn`}
                  type="button"
                  role="radio"
                  aria-checked={extraConcrete === pct}
                  onClick={() => setExtraConcrete(pct)}
                  className={`min-h-[42px] py-2 px-2 text-xs sm:text-sm font-mono font-bold rounded-xl border transition-all cursor-pointer ${
                    extraConcrete === pct
                      ? 'bg-[#163A5F] text-white border-[#112F4D] shadow-xs'
                      : 'bg-[#FDFBF7] text-[#4E4942] border-[#DFD5C6] hover:bg-[#FFFFFF] hover:border-[#163A5F]'
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
            <p className="text-xs text-[#6E675E] font-sans pt-1 leading-relaxed">
              Adding 10% extra is standard practice to account for formwork flex, ground settling, base unevenness, and spillage during the pour.
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
            id="calculate-concrete-btn"
            type="submit"
            className="w-full min-h-[50px] py-3.5 px-6 rounded-xl bg-[#163A5F] text-[#FFFFFF] text-base font-sans font-bold shadow-[0_3px_12px_rgba(22,58,95,0.2)] hover:bg-[#112F4D] active:scale-[0.99] transition-all cursor-pointer"
          >
            Calculate concrete ↓
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
                {result.baseWeightDisplay}
              </div>
              <p className="text-xs text-[#0B6E54]/90 font-sans mt-1">
                Estimated using a typical concrete density of {isMetric ? '2,400 kg/m³' : '150 lb/ft³'}. Actual weight is an estimate because concrete density varies depending on aggregate type, water content, mix design, and steel reinforcement.
              </p>
            </div>
          </div>

          {/* 2. WHAT TO BUY */}
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
                    {result.recommendedWeightDisplay}
                  </div>
                  <p className="text-xs text-[#6E675E] font-sans mt-1">
                    {result.extraPercent > 0
                      ? `Includes extra concrete (${result.extraPercent}% extra for formwork flex, sub-base unevenness & spillage).`
                      : 'Exact volume needed without extra allowance.'}
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
                <span className="text-[#6E675E]">Extra concrete ({result.extraPercent}%)</span>
                <span className="font-semibold text-[#163A5F]">
                  +{formatVolumeDisplay(result.extraVolume)} {result.unitLabel}
                </span>
              </div>
              <div className="flex justify-between items-center py-0.5 border-t border-[#E4DCD0] pt-2 font-bold text-sm">
                <span className="text-[#1A1918]">Final recommended volume</span>
                <span className="text-[#0B6E54]">
                  {formatVolumeDisplay(result.recommendedVolume)} {result.unitLabel}
                </span>
              </div>
              <div className="flex justify-between items-center py-0.5 border-t border-[#E4DCD0] pt-2">
                <span className="text-[#6E675E]">Estimated base weight</span>
                <span className="font-semibold text-[#1A1918]">
                  {result.baseWeightDisplay.replace(/^≈\s*/, '')}
                </span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="text-[#6E675E]">Estimated order weight</span>
                <span className="font-semibold text-[#0B6E54]">
                  {result.recommendedWeightDisplay.replace(/^≈\s*/, '')}
                </span>
              </div>
              <div className="flex justify-between items-center py-0.5 text-xs text-[#6E675E]">
                <span>Concrete density used</span>
                <span>{isMetric ? '2,400 kg/m³' : '150 lb/ft³ (~4,050 lb/yd³)'}</span>
              </div>
            </div>
          )}

          {/* Download PDF button */}
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
            How much concrete do I need?
          </h2>
          <p className="text-base text-[#4E4942] leading-relaxed mb-4">
            To determine how much concrete you need for any project, multiply the surface area of your pour by its depth. This gives you the raw geometric volume in cubic metres (m³) or cubic yards. Adding 10% extra is strongly recommended for every pour to prevent running short before finishing.
          </p>
          <div className="p-5 bg-[#FAF6F0] rounded-xl border border-[#E4DCD0] font-mono text-sm text-[#1A1918] space-y-1.5 mb-4">
            <p className="font-bold font-sans text-xs uppercase tracking-wider text-[#6E675E]">
              Concrete Volume Formula
            </p>
            <p><strong>Metric:</strong> Volume (m³) = Area (m²) × [Depth (cm) ÷ 100]</p>
            <p><strong>US / Imperial:</strong> Volume (cubic yards) = [Area (sq ft) × (Depth in inches ÷ 12)] ÷ 27</p>
          </div>
          <p className="text-sm text-[#4E4942] leading-relaxed">
            Running short on wet concrete creates a cold joint where two batches harden at different times, causing structural weakness and visible cracking. Always round up your order.
          </p>
        </div>

        {/* Recommended Depths by Project Type */}
        <div className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-display font-bold text-[#1A1918]">
            Standard concrete slab depths
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-sans">
            <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] shadow-xs space-y-1.5">
              <h4 className="font-bold text-[#1A1918]">Sidewalks & Walkways</h4>
              <p className="text-[#4E4942]">10 cm (4 inches) with a well-compacted gravel base is standard for garden paths and pedestrian sidewalks.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] shadow-xs space-y-1.5">
              <h4 className="font-bold text-[#1A1918]">Patios & Shed Slabs</h4>
              <p className="text-[#4E4942]">10 cm (4 inches) for domestic garden sheds and outdoor dining patios carrying standard furniture.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] shadow-xs space-y-1.5">
              <h4 className="font-bold text-[#1A1918]">Standard Driveways</h4>
              <p className="text-[#4E4942]">12.5 cm to 15 cm (5 to 6 inches) to comfortably support passenger cars, SUVs, and light trucks without cracking.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDD1] shadow-xs space-y-1.5">
              <h4 className="font-bold text-[#1A1918]">Heavy Duty & Commercial Slabs</h4>
              <p className="text-[#4E4942]">15 cm to 20 cm (6 to 8 inches) for heavy motorhomes, delivery vehicle access, or industrial equipment.</p>
            </div>
          </div>
        </div>

        {/* Concrete Weight & Density */}
        <div className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-display font-bold text-[#1A1918]">
            How heavy is concrete? Concrete weight & density
          </h3>
          <p className="text-base text-[#4E4942] leading-relaxed">
            Normal-weight cured concrete has a standard bulk density of approximately <strong>2,400 kg/m³</strong> (equivalent to <strong>150 lb/ft³</strong>, or approximately <strong>4,050 lb per cubic yard / ~2.03 short tons</strong>).
          </p>
          <div className="p-5 bg-[#FAF6F0] rounded-xl border border-[#E4DCD0] font-mono text-sm text-[#1A1918] space-y-1.5">
            <p className="font-bold font-sans text-xs uppercase tracking-wider text-[#6E675E]">
              Concrete Weight Formula
            </p>
            <p><strong>Weight = Concrete Volume × Density</strong></p>
            <div className="text-xs text-[#4E4942] font-sans pt-1 space-y-0.5">
              <p>• <strong>Metric:</strong> Weight (kg) = Volume (m³) × 2,400 kg/m³ | Weight (tonnes) = kg ÷ 1,000</p>
              <p>• <strong>US / Imperial:</strong> Weight (lb) = Volume (cu ft) × 150 lb/ft³ | Weight (short tons) = lb ÷ 2,000</p>
            </div>
          </div>
          <p className="text-sm text-[#4E4942] leading-relaxed">
            <strong>Why weight is an estimate:</strong> The exact density of concrete varies depending on the type of aggregates used (such as gravel, limestone, or dense basalt), the water-to-cement ratio, air-entraining admixtures, and the amount of embedded steel rebar. Calculating estimated weight helps plan transport, mixer truck payload limits, and site wheelbarrow hauling.
          </p>
        </div>

        {/* Ordering Tips */}
        <div className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-display font-bold text-[#1A1918]">
            Tips for ordering ready-mix concrete
          </h3>
          <ul className="space-y-2.5 text-sm sm:text-base text-[#4E4942] list-disc list-inside leading-relaxed">
            <li><strong>Measure formwork accurately:</strong> Measure the inside dimensions of your wooden forms right before pouring to ensure the forms have not bowed or shifted.</li>
            <li><strong>Inspect your sub-base depth:</strong> High and low spots in the crushed stone base change the concrete volume. If ground prep is uneven, opt for 10% to 15% extra material.</li>
            <li><strong>Order in truck intervals:</strong> Ready-mix concrete trucks typically carry 6 to 9 cubic metres (8 to 10 cubic yards). Small orders below a minimum threshold may incur a short-load fee.</li>
            <li><strong>Plan your access route:</strong> Ensure clear wheelbarrow routes or verify pump truck clearance before the mixer arrives at your site.</li>
          </ul>
        </div>

        {/* Related Calculators & Internal Links */}
        <div className="pt-6 border-t border-[#E6DDD1]">
          <h3 className="text-lg sm:text-xl font-display font-bold text-[#1A1918] mb-3">
            Related Hardscaping & Construction Calculators
          </h3>
          <p className="text-sm text-[#4E4942] font-sans mb-4">
            Pouring a slab often requires ground preparation and bedding. Check out these related Measivo tools:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href="/tools/gravel-calculator"
              className="p-3.5 rounded-xl bg-[#FAF6F0] hover:bg-[#F3ECE0] border border-[#E4DCD0] text-left transition-colors group block"
            >
              <div className="font-semibold text-sm text-[#163A5F] group-hover:underline flex items-center justify-between">
                <span>Gravel Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100" />
              </div>
              <p className="text-xs text-[#6E675E] mt-1 font-sans">Calculate crushed rock and base aggregate for concrete sub-bases.</p>
            </Link>
            <Link
              href="/tools/sand-calculator"
              className="p-3.5 rounded-xl bg-[#FAF6F0] hover:bg-[#F3ECE0] border border-[#E4DCD0] text-left transition-colors group block"
            >
              <div className="font-semibold text-sm text-[#163A5F] group-hover:underline flex items-center justify-between">
                <span>Sand Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100" />
              </div>
              <p className="text-xs text-[#6E675E] mt-1 font-sans">Estimate sand volume and weight for mortar, leveling, and paving.</p>
            </Link>
            <Link
              href="/tools/paver-calculator"
              className="p-3.5 rounded-xl bg-[#FAF6F0] hover:bg-[#F3ECE0] border border-[#E4DCD0] text-left transition-colors group block"
            >
              <div className="font-semibold text-sm text-[#163A5F] group-hover:underline flex items-center justify-between">
                <span>Paver Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100" />
              </div>
              <p className="text-xs text-[#6E675E] mt-1 font-sans">Compare concrete slab requirements against stone or brick pavers.</p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
