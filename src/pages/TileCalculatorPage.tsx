import { useState, useEffect, useId, FormEvent, ChangeEvent } from 'react';
import { ArrowRight, ChevronDown, ChevronUp, FileDown, Info } from 'lucide-react';
import { Link } from '../context/NavigationContext';
import { exportTileCalculatorPdf } from '../utils/pdfExport';

type UnitSystem = 'metric' | 'us';
type MeasureMethod = 'rectangle' | 'circle' | 'custom';
type ExtraWastePercent = '0' | '5' | '10' | '15';

interface TileCalculationResult {
  area: number;
  singleTileArea: number;
  rawTilesNeeded: number;
  tilesNeeded: number;
  extraTiles: number;
  recommendedTiles: number;
  extraPercent: number;
  lenUnit: 'm' | 'ft';
  areaUnit: 'm²' | 'sq ft';
  tileDimUnit: 'cm' | 'in';
}

function formatAreaDisplay(val: number): string {
  if (val <= 0 || isNaN(val)) return '0';
  const rounded = Math.round(val * 100) / 100;
  return rounded.toString();
}

function formatTileAreaDisplay(val: number): string {
  if (val <= 0 || isNaN(val)) return '0';
  if (val < 0.01) {
    return (Math.round(val * 10000) / 10000).toString();
  }
  const rounded = Math.round(val * 1000) / 1000;
  return rounded.toString();
}

export function TileCalculatorPage() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');
  const [method, setMethod] = useState<MeasureMethod>('rectangle');
  const [length, setLength] = useState<string>('5');
  const [width, setWidth] = useState<string>('4');
  const [diameter, setDiameter] = useState<string>('4');
  const [customArea, setCustomArea] = useState<string>('20');
  const [tileLength, setTileLength] = useState<string>('30');
  const [tileWidth, setTileWidth] = useState<string>('30');
  const [extraWaste, setExtraWaste] = useState<ExtraWastePercent>('10');
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TileCalculationResult | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);

  const lengthId = useId();
  const widthId = useId();
  const diameterId = useId();
  const customAreaId = useId();
  const tileLengthId = useId();
  const tileWidthId = useId();

  const isMetric = unitSystem === 'metric';
  const lenUnit = isMetric ? 'm' : 'ft';
  const areaUnit = isMetric ? 'm²' : 'sq ft';
  const tileDimUnit = isMetric ? 'cm' : 'in';

  // Unit conversion handler
  const handleUnitChange = (nextSystem: UnitSystem) => {
    if (nextSystem === unitSystem) return;

    if (nextSystem === 'us') {
      // Metric -> US
      // Room dimensions: m -> ft (* 3.28084)
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
      // Tile dimensions: cm -> in (/ 2.54)
      if (tileLength && !isNaN(Number(tileLength))) {
        const val = Number(tileLength) / 2.54;
        setTileLength((Math.round(val * 10) / 10).toString());
      }
      if (tileWidth && !isNaN(Number(tileWidth))) {
        const val = Number(tileWidth) / 2.54;
        setTileWidth((Math.round(val * 10) / 10).toString());
      }
    } else {
      // US -> Metric
      // Room dimensions: ft -> m (/ 3.28084)
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
      // Tile dimensions: in -> cm (* 2.54)
      if (tileLength && !isNaN(Number(tileLength))) {
        const val = Number(tileLength) * 2.54;
        setTileLength((Math.round(val * 10) / 10).toString());
      }
      if (tileWidth && !isNaN(Number(tileWidth))) {
        const val = Number(tileWidth) * 2.54;
        setTileWidth((Math.round(val * 10) / 10).toString());
      }
    }

    setUnitSystem(nextSystem);
  };

  // Pure calculation logic
  const calculateTiles = (
    currentMethod: MeasureMethod,
    lStr: string,
    wStr: string,
    diaStr: string,
    customAreaStr: string,
    tLengthStr: string,
    tWidthStr: string,
    wastePctStr: ExtraWastePercent
  ): TileCalculationResult | null => {
    let surfaceArea = 0;

    if (currentMethod === 'rectangle') {
      const l = parseFloat(lStr);
      const w = parseFloat(wStr);
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

    const tL = parseFloat(tLengthStr);
    const tW = parseFloat(tWidthStr);
    if (isNaN(tL) || isNaN(tW) || tL <= 0 || tW <= 0) {
      return null;
    }

    // Tile area in surface units
    // Metric: cm * cm / 10,000 = m²
    // US: in * in / 144 = sq ft
    const singleTileArea = isMetric ? (tL * tW) / 10000 : (tL * tW) / 144;
    if (singleTileArea <= 0) return null;

    const rawTilesNeeded = surfaceArea / singleTileArea;
    const tilesNeeded = Math.ceil(rawTilesNeeded);

    const wastePercent = parseFloat(wastePctStr);
    const wasteFactor = wastePercent / 100;
    const rawRecommended = rawTilesNeeded * (1 + wasteFactor);
    const recommendedTiles = Math.ceil(rawRecommended);
    const extraTiles = Math.max(0, recommendedTiles - tilesNeeded);

    return {
      area: Math.round(surfaceArea * 100) / 100,
      singleTileArea,
      rawTilesNeeded,
      tilesNeeded,
      extraTiles,
      recommendedTiles,
      extraPercent: wastePercent,
      lenUnit,
      areaUnit,
      tileDimUnit,
    };
  };

  // Live recalculate
  useEffect(() => {
    const res = calculateTiles(
      method,
      length,
      width,
      diameter,
      customArea,
      tileLength,
      tileWidth,
      extraWaste
    );
    if (res) {
      setResult(res);
      setError(null);
    }
  }, [method, length, width, diameter, customArea, tileLength, tileWidth, extraWaste, unitSystem]);

  const handleCalculate = (e: FormEvent) => {
    e.preventDefault();
    const res = calculateTiles(
      method,
      length,
      width,
      diameter,
      customArea,
      tileLength,
      tileWidth,
      extraWaste
    );
    if (!res) {
      if (method === 'rectangle') {
        setError('Please enter a valid length, width, and tile dimensions greater than 0.');
      } else if (method === 'circle') {
        setError('Please enter a valid diameter and tile dimensions greater than 0.');
      } else {
        setError('Please enter a valid area and tile dimensions greater than 0.');
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
      await exportTileCalculatorPdf({
        unitSystem,
        method,
        length: method === 'rectangle' ? length : undefined,
        width: method === 'rectangle' ? width : undefined,
        diameter: method === 'circle' ? diameter : undefined,
        customArea: method === 'custom' ? customArea : undefined,
        tileLength,
        tileWidth,
        extraPercent: extraWaste,
        result,
      });
    } catch (err) {
      console.error('Failed to export Tile calculation PDF:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <main className="flex-1 max-w-xl w-full mx-auto px-5 py-8 sm:py-12 flex flex-col justify-center">
      {/* 1. Title & Intro */}
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-display font-extrabold text-[#1A1918] tracking-tight leading-tight mb-2.5">
          Tile Calculator
        </h1>
        <p className="text-base sm:text-lg text-[#4E4942] leading-relaxed font-sans">
          Calculate exactly how many tiles you need for floors, kitchen backsplashes, shower walls, and patios. Enter room dimensions and tile measurements to get precise piece counts, total area, and recommended extra allowance for cuts.
        </p>
      </div>

      {/* 2. Unit System Selector */}
      <section aria-label="Unit system selection" className="mb-7">
        <div className="grid grid-cols-2 gap-1.5 p-1.5 bg-[#EDE5DA] rounded-xl border border-[#DDD3C5] shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)]">
          <button
            id="unit-metric-btn"
            type="button"
            aria-label="Switch to Metric units (metres, square metres, centimetres)"
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
            aria-label="Switch to US Imperial units (feet, square feet, inches)"
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
      <form onSubmit={handleCalculate} aria-label="Tile calculation form" className="space-y-6">
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

          {/* Area / Dimensions Section */}
          <div className="space-y-4">
            {method === 'rectangle' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Length */}
                <div className="space-y-1.5">
                  <label
                    htmlFor={lengthId}
                    className="block text-xs sm:text-sm font-semibold text-[#1A1918] font-sans"
                  >
                    Surface length
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
                    Surface width
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
                <p className="text-xs text-[#6E675E] font-sans leading-relaxed">
                  For irregular surfaces, multiple rooms, or walls with cutouts, enter the total area to tile.
                </p>
              </div>
            )}
          </div>

          {/* Tile Size Inputs */}
          <div className="pt-4 border-t border-[#EAE0D5] space-y-3">
            <label className="block text-xs sm:text-sm font-semibold text-[#1A1918] font-sans">
              Tile dimensions ({tileDimUnit})
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Tile Length */}
              <div className="space-y-1.5">
                <label
                  htmlFor={tileLengthId}
                  className="block text-xs font-medium text-[#4E4942] font-sans"
                >
                  Tile length
                </label>
                <div className="relative">
                  <input
                    id={tileLengthId}
                    type="number"
                    step="any"
                    min="0"
                    placeholder={isMetric ? 'e.g. 30' : 'e.g. 12'}
                    value={tileLength}
                    onChange={handlePositiveInput(setTileLength)}
                    className="w-full bg-[#FDFBF7] border border-[#DFD5C6] focus:bg-[#FFFFFF] focus:border-[#163A5F] focus:ring-2 focus:ring-[#163A5F]/15 rounded-xl px-3.5 py-2.5 pr-10 text-base font-mono text-[#1A1918] font-semibold outline-hidden transition-all"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-[#6E675E] pointer-events-none">
                    {tileDimUnit}
                  </span>
                </div>
              </div>

              {/* Tile Width */}
              <div className="space-y-1.5">
                <label
                  htmlFor={tileWidthId}
                  className="block text-xs font-medium text-[#4E4942] font-sans"
                >
                  Tile width
                </label>
                <div className="relative">
                  <input
                    id={tileWidthId}
                    type="number"
                    step="any"
                    min="0"
                    placeholder={isMetric ? 'e.g. 30' : 'e.g. 12'}
                    value={tileWidth}
                    onChange={handlePositiveInput(setTileWidth)}
                    className="w-full bg-[#FDFBF7] border border-[#DFD5C6] focus:bg-[#FFFFFF] focus:border-[#163A5F] focus:ring-2 focus:ring-[#163A5F]/15 rounded-xl px-3.5 py-2.5 pr-10 text-base font-mono text-[#1A1918] font-semibold outline-hidden transition-all"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-[#6E675E] pointer-events-none">
                    {tileDimUnit}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Extra material / waste Selector */}
          <div className="pt-2 border-t border-[#EAE0D5] space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs sm:text-sm font-semibold text-[#1A1918] font-sans">
                Extra tiles for cuts & waste
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
              Adding 10% extra is standard to cover perimeter edge cuts, diagonal cuts, obstacle fitting, and accidental breakage.
            </p>
          </div>

          {/* Helper Note */}
          <div className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[#EAE0D5] flex items-start gap-2.5 text-xs text-[#5C554B] leading-relaxed font-sans">
            <Info className="w-4 h-4 text-[#163A5F] shrink-0 mt-0.5" />
            <span>
              This calculator estimates the number of tiles needed for floors, bathrooms, kitchens, backsplashes, and walls.
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
            id="calculate-tiles-btn"
            type="submit"
            className="w-full min-h-[50px] py-3.5 px-6 rounded-xl bg-[#163A5F] text-[#FFFFFF] text-base font-sans font-bold shadow-[0_3px_12px_rgba(22,58,95,0.2)] hover:bg-[#112F4D] active:scale-[0.99] transition-all cursor-pointer"
          >
            Calculate tiles ↓
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
                  {result.tilesNeeded.toLocaleString('en-US')}
                </span>
                <span className="text-2xl sm:text-3xl font-display font-bold text-[#0B6E54]">
                  tiles
                </span>
              </div>
              <div className="text-sm font-semibold text-[#0B6E54] font-sans mt-1">
                For {formatAreaDisplay(result.area)} {result.areaUnit} of coverage
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
                      {result.recommendedTiles.toLocaleString('en-US')}
                    </span>
                    <span className="text-xl sm:text-2xl font-display font-semibold text-[#163A5F]">
                      tiles
                    </span>
                  </div>
                </div>
                <p className="text-xs text-[#6E675E] font-sans mt-1">
                  {result.extraPercent > 0
                    ? `Includes +${result.extraPercent}% extra (${result.extraTiles.toLocaleString('en-US')} tiles) for corner cuts, edges & breakage.`
                    : 'Exact tile count without extra allowance.'}
                </p>
              </div>

              <button
                id="download-tile-pdf-btn"
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
                <span className="text-[#6E675E]">Surface area</span>
                <span className="font-semibold text-[#1A1918]">
                  {formatAreaDisplay(result.area)} {result.areaUnit}
                </span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="text-[#6E675E]">Tile dimensions</span>
                <span className="font-semibold text-[#1A1918]">
                  {tileLength} × {tileWidth} {result.tileDimUnit}
                </span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="text-[#6E675E]">Single tile coverage</span>
                <span className="font-semibold text-[#1A1918]">
                  {formatTileAreaDisplay(result.singleTileArea)} {result.areaUnit}
                </span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="text-[#6E675E]">Exact calculation</span>
                <span className="font-semibold text-[#1A1918]">
                  {result.rawTilesNeeded.toFixed(2)} tiles
                </span>
              </div>
              <div className="flex justify-between items-center py-0.5 border-t border-[#E4DCD0] pt-2">
                <span className="text-[#6E675E]">Minimum tiles needed</span>
                <span className="font-semibold text-[#1A1918]">
                  {result.tilesNeeded.toLocaleString('en-US')} tiles
                </span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="text-[#6E675E]">Extra allowance</span>
                <span className="font-semibold text-[#1A1918]">
                  +{result.extraTiles.toLocaleString('en-US')} tiles ({result.extraPercent}%)
                </span>
              </div>
              <div className="flex justify-between items-center py-0.5 border-t border-[#E4DCD0] pt-2 font-bold">
                <span className="text-[#1A1918]">Total tiles to order</span>
                <span className="text-[#0B6E54] text-sm">
                  {result.recommendedTiles.toLocaleString('en-US')} tiles
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
            How Many Tiles Do I Need?
          </h2>
          <p className="text-base text-[#4E4942] leading-relaxed">
            To calculate how many tiles you need for any project, you first determine the total surface area of your floor or wall, and divide it by the area of a single tile. Because tiles cannot be bought in fractions and room edges require cuts, always round up to the next full tile and add an extra allowance.
          </p>
        </div>

        {/* Calculation Formula */}
        <div className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-display font-bold text-[#1A1918]">
            Tile Calculation Formula
          </h3>
          <div className="p-5 bg-[#FAF6F0] rounded-xl border border-[#E4DCD0] font-mono text-sm text-[#1A1918] space-y-2">
            <p className="font-bold font-sans text-xs uppercase tracking-wider text-[#6E675E]">
              Core Formula
            </p>
            <p><strong>Tiles Needed = Total Surface Area ÷ Single Tile Area</strong></p>
            <div className="text-xs text-[#4E4942] font-sans pt-1 space-y-0.5">
              <p>• <strong>Metric (cm to m²):</strong> Tile Area (m²) = [Tile Length (cm) × Tile Width (cm)] ÷ 10,000</p>
              <p>• <strong>US (in to sq ft):</strong> Tile Area (sq ft) = [Tile Length (in) × Tile Width (in)] ÷ 144</p>
              <p>• <strong>Total with Extra:</strong> Order Quantity = Tiles Needed × (1 + Extra% ÷ 100)</p>
            </div>
          </div>
        </div>

        {/* Why Add Extra Tiles */}
        <div className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-display font-bold text-[#1A1918]">
            Why should you add 10% extra tiles?
          </h3>
          <p className="text-base text-[#4E4942] leading-relaxed">
            When tiling a room or wall, straight edges along perimeter borders, around pipes, and into corners require cutting tiles to size. Cut remnants often cannot be reused elsewhere. Ordering 10% extra ensures:
          </p>
          <ul className="space-y-2 text-sm sm:text-base text-[#4E4942] list-disc list-inside">
            <li><strong>Perimeter cutting:</strong> Edge cuts and diagonal patterns generate unusable offcuts.</li>
            <li><strong>Accidental breakage:</strong> Tiles can chip or crack during cutting, scoring, or handling.</li>
            <li><strong>Future repairs:</strong> Having leftover tiles from the same manufacturing batch and dye lot ensures a perfect match if a tile chips years later.</li>
          </ul>
        </div>

        {/* Common Tile Sizes */}
        <div className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-display font-bold text-[#1A1918]">
            Common Tile Sizes
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#4E4942]">
            <div className="p-3.5 bg-[#FAF6F0] rounded-xl border border-[#E4DCD0]">
              <p className="font-bold text-[#1A1918] mb-1 font-display">Metric Standards</p>
              <p>• 15 × 15 cm (Small wall & backsplash)</p>
              <p>• 30 × 30 cm (Standard bathroom & floor)</p>
              <p>• 30 × 60 cm (Rectangular wall & floor)</p>
              <p>• 60 × 60 cm (Large format living area)</p>
            </div>
            <div className="p-3.5 bg-[#FAF6F0] rounded-xl border border-[#E4DCD0]">
              <p className="font-bold text-[#1A1918] mb-1 font-display">US Imperial Standards</p>
              <p>• 4 × 4 in (Small square backsplash & shower)</p>
              <p>• 6 × 6 in (Classic bathroom wall)</p>
              <p>• 12 × 12 in (Standard square floor tile)</p>
              <p>• 12 × 24 in (Modern rectangular subway & floor)</p>
            </div>
          </div>
        </div>

        {/* Related Calculators & Internal Links */}
        <div className="pt-6 border-t border-[#EAE0D5] space-y-4">
          <h3 className="text-lg sm:text-xl font-display font-bold text-[#1A1918]">
            Related Home Renovation Calculators
          </h3>
          <p className="text-sm text-[#4E4942] font-sans">
            Tiling a bathroom, kitchen, or living room? Calculate complementary materials with these tools:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <Link
              href="/tools/flooring-calculator"
              className="p-3.5 rounded-xl bg-[#FAF6F0] hover:bg-[#F3ECE0] border border-[#E4DCD0] text-left transition-colors group block"
            >
              <div className="font-semibold text-sm text-[#163A5F] group-hover:underline flex items-center justify-between">
                <span>Flooring Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100" />
              </div>
              <p className="text-xs text-[#6E675E] mt-1 font-sans">Estimate planks and boxes for laminate, vinyl, or hardwood.</p>
            </Link>
            <Link
              href="/tools/paint-calculator"
              className="p-3.5 rounded-xl bg-[#FAF6F0] hover:bg-[#F3ECE0] border border-[#E4DCD0] text-left transition-colors group block"
            >
              <div className="font-semibold text-sm text-[#163A5F] group-hover:underline flex items-center justify-between">
                <span>Paint Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100" />
              </div>
              <p className="text-xs text-[#6E675E] mt-1 font-sans">Calculate paint for un-tiled wall sections and ceilings.</p>
            </Link>
            <Link
              href="/tools/drywall-calculator"
              className="p-3.5 rounded-xl bg-[#FAF6F0] hover:bg-[#F3ECE0] border border-[#E4DCD0] text-left transition-colors group block"
            >
              <div className="font-semibold text-sm text-[#163A5F] group-hover:underline flex items-center justify-between">
                <span>Drywall Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100" />
              </div>
              <p className="text-xs text-[#6E675E] mt-1 font-sans">Calculate cement board and moisture-resistant drywall sheets.</p>
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
