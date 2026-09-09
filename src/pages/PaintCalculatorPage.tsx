import { useState, useId, FormEvent, useEffect, ChangeEvent } from 'react';
import { Ruler, DoorClosed, Paintbrush, CheckCircle2, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { Link } from '../context/NavigationContext';

type UnitSystem = 'metric' | 'us';
type MeasureMethod = 'room' | 'area';

interface CalculationResult {
  baseVolume: number;
  extraVolume: number;
  exactVolume: number;
  volume: number;
  wastePercentage: number;
  recommendedPurchase: number;
  unitLabel: 'litres' | 'gallons';
  unitShort: 'L' | 'gal';
  areaUnit: 'm²' | 'ft²';
  lenUnit: 'm' | 'ft';
  measureMethod: MeasureMethod;
  roomPerimeter: number | null;
  totalWallArea: number;
  ceilingArea: number;
  includeCeiling: boolean;
  doorArea: number;
  windowArea: number;
  paintableArea: number;
}

// Formats paint volume to maximum 2 decimal places, displaying clean representations like "11.37", "7.2", "3.1", or "12"
function formatVolumeDisplay(val: number): string {
  const rounded = Math.round(val * 100) / 100;
  if (Number.isInteger(rounded)) {
    return rounded.toString();
  }
  if (Math.round(rounded * 10) === rounded * 10) {
    return rounded.toFixed(1);
  }
  return rounded.toFixed(2);
}

// Conversion constants
const M_TO_FT = 3.28084;
const SQM_TO_SQFT = 10.7639;
const GAL_TO_L = 3.78541;

function convertLengthStr(val: string, target: UnitSystem): string {
  const num = parseFloat(val);
  if (isNaN(num) || num <= 0) return val;
  if (target === 'us') {
    // meters to feet: round to 1 decimal place
    const ft = num * M_TO_FT;
    return (Math.round(ft * 10) / 10).toString();
  } else {
    // feet to meters: round to 1 decimal place
    const m = num / M_TO_FT;
    return (Math.round(m * 10) / 10).toString();
  }
}

function convertCoverageStr(val: string, target: UnitSystem): string {
  const num = parseFloat(val);
  if (isNaN(num) || num <= 0) return val;
  if (target === 'us') {
    // Standard default 10 m²/L translates to standard US 400 ft²/gal
    if (Math.abs(num - 10) < 0.1) return '400';
    // m²/L to ft²/gal: num * SQM_TO_SQFT * GAL_TO_L
    const ft2Gal = num * SQM_TO_SQFT * GAL_TO_L;
    return Math.round(ft2Gal).toString();
  } else {
    // Standard US 400 ft²/gal translates to standard metric 10 m²/L
    if (Math.abs(num - 400) < 5) return '10';
    // ft²/gal to m²/L
    const m2L = num / (SQM_TO_SQFT * GAL_TO_L);
    return (Math.round(m2L * 10) / 10).toString();
  }
}

function convertAreaStr(val: string, target: UnitSystem): string {
  const num = parseFloat(val);
  if (isNaN(num) || num <= 0) return val;
  if (target === 'us') {
    // m² to ft²
    const sqft = num * SQM_TO_SQFT;
    return (Math.round(sqft * 10) / 10).toString();
  } else {
    // ft² to m²
    const sqm = num / SQM_TO_SQFT;
    return (Math.round(sqm * 10) / 10).toString();
  }
}

export function PaintCalculatorPage() {
  // Unit System state: 'metric' or 'us'
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');

  // Measurement method: 'room' (Room dimensions) or 'area' (Total wall area)
  const [measureMethod, setMeasureMethod] = useState<MeasureMethod>('room');

  // Room & paint inputs (Metric defaults: 5m length, 4m width, 2.5m height)
  const [roomLength, setRoomLength] = useState<string>('5');
  const [roomWidth, setRoomWidth] = useState<string>('4');
  const [wallHeight, setWallHeight] = useState<string>('2.5');

  // Direct Total Wall Area input (Default: 45 m² in metric, equivalent to 2*(5+4)*2.5)
  const [directWallArea, setDirectWallArea] = useState<string>('45');

  const [coats, setCoats] = useState<string>('2');
  const [coverage, setCoverage] = useState<string>('10');

  // Openings: Doors (defaults to 0 per instructions)
  const [doorCount, setDoorCount] = useState<string>('0');
  const [doorWidth, setDoorWidth] = useState<string>('0.9');
  const [doorHeight, setDoorHeight] = useState<string>('2.1');

  // Openings: Windows (defaults to 0 per instructions)
  const [windowCount, setWindowCount] = useState<string>('0');
  const [windowWidth, setWindowWidth] = useState<string>('1.2');
  const [windowHeight, setWindowHeight] = useState<string>('1.2');

  // Waste allowance state
  const [wasteAllowance, setWasteAllowance] = useState<string>('10');
  const [isCustomWaste, setIsCustomWaste] = useState<boolean>(false);
  const [customWasteValue, setCustomWasteValue] = useState<string>('10');

  // Ceiling state (Default: No)
  const [includeCeiling, setIncludeCeiling] = useState<boolean>(false);
  const [customCeilingArea, setCustomCeilingArea] = useState<string>('');

  // Calculation output state
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [highlightResult, setHighlightResult] = useState<boolean>(false);

  const roomLengthId = useId();
  const roomWidthId = useId();
  const wallHeightId = useId();
  const directWallAreaId = useId();
  const ceilingAreaId = useId();
  const coatsId = useId();
  const coverageId = useId();
  const customWasteId = useId();

  const doorCountId = useId();
  const doorWidthId = useId();
  const doorHeightId = useId();

  const windowCountId = useId();
  const windowWidthId = useId();
  const windowHeightId = useId();

  const isMetric = unitSystem === 'metric';
  const lenUnit = isMetric ? 'm' : 'ft';
  const areaUnit = isMetric ? 'm²' : 'ft²';
  const coverageUnit = isMetric ? 'm²/L' : 'ft²/gal';
  const paintUnit = isMetric ? 'litres' : 'gallons';

  // Derived visibility state for doors and windows
  const parsedDoors = parseFloat(doorCount);
  const hasDoors = !isNaN(parsedDoors) && parsedDoors >= 1;

  const parsedWindows = parseFloat(windowCount);
  const hasWindows = !isNaN(parsedWindows) && parsedWindows >= 1;

  // Input helper to cleanly prevent negative values or invalid characters on mobile/desktop
  const handleNonNegativeInput = (setter: (val: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || (!val.includes('-') && (parseFloat(val) >= 0 || val === '.'))) {
      setter(val);
    }
  };

  const handlePositiveIntInput = (setter: (val: string) => void, minVal: number = 0) => (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || (!val.includes('-') && !val.includes('.') && parseInt(val, 10) >= minVal)) {
      setter(val);
    }
  };

  const calculateWithValues = (params: {
    method: MeasureMethod;
    roomLenStr: string;
    roomWStr: string;
    wallHStr: string;
    directAreaStr: string;
    includeCeilingBool: boolean;
    ceilingAreaStr: string;
    coatsStr: string;
    covStr: string;
    wasteStr: string;
    dCountStr: string;
    dWStr: string;
    dHStr: string;
    winCountStr: string;
    winWStr: string;
    winHStr: string;
    activeUnit: UnitSystem;
    isAuto?: boolean;
  }): boolean => {
    const {
      method,
      roomLenStr,
      roomWStr,
      wallHStr,
      directAreaStr,
      includeCeilingBool,
      ceilingAreaStr,
      coatsStr,
      covStr,
      wasteStr,
      dCountStr,
      dWStr,
      dHStr,
      winCountStr,
      winWStr,
      winHStr,
      activeUnit,
      isAuto = false,
    } = params;

    const currLenUnit = activeUnit === 'metric' ? 'm' : 'ft';
    const currAreaUnit = activeUnit === 'metric' ? 'm²' : 'ft²';
    const currPaintUnit = activeUnit === 'metric' ? 'litres' : 'gallons';
    const currUnitShort: 'L' | 'gal' = activeUnit === 'metric' ? 'L' : 'gal';
    const currCoverageUnit = activeUnit === 'metric' ? 'm²/L' : 'ft²/gal';

    let roomPerimeter: number | null = null;
    let totalWallArea = 0;
    let ceilingArea = 0;

    if (method === 'room') {
      const rLen = parseFloat(roomLenStr);
      const rWidth = parseFloat(roomWStr);
      const wallH = parseFloat(wallHStr);

      if (isNaN(rLen) || rLen <= 0) {
        if (!isAuto) setError(`Please enter a valid room length in ${currLenUnit}.`);
        return false;
      }
      if (isNaN(rWidth) || rWidth <= 0) {
        if (!isAuto) setError(`Please enter a valid room width in ${currLenUnit}.`);
        return false;
      }
      if (isNaN(wallH) || wallH <= 0) {
        if (!isAuto) setError(`Please enter a valid wall height in ${currLenUnit}.`);
        return false;
      }

      // Room Perimeter = 2 × (Room Length + Room Width)
      // Total Wall Area = Room Perimeter × Wall Height
      // Ceiling Area = Room Length × Room Width
      roomPerimeter = 2 * (rLen + rWidth);
      totalWallArea = roomPerimeter * wallH;
      if (includeCeilingBool) {
        ceilingArea = rLen * rWidth;
      }
    } else {
      const directArea = parseFloat(directAreaStr);
      if (isNaN(directArea) || directArea <= 0) {
        if (!isAuto) setError(`Please enter a valid total wall area in ${currAreaUnit}.`);
        return false;
      }
      totalWallArea = directArea;
      if (includeCeilingBool) {
        const parsedCeiling = parseFloat(ceilingAreaStr);
        if (!isNaN(parsedCeiling) && parsedCeiling > 0) {
          ceilingArea = parsedCeiling;
        }
      }
    }

    const c = parseFloat(coatsStr);
    const cov = parseFloat(covStr);
    const waste = parseFloat(wasteStr);

    const dCount = parseFloat(dCountStr);
    const dW = parseFloat(dWStr);
    const dH = parseFloat(dHStr);

    const winCount = parseFloat(winCountStr);
    const winW = parseFloat(winWStr);
    const winH = parseFloat(winHStr);

    if (isNaN(c) || c <= 0) {
      if (!isAuto) setError('Please enter at least 1 coat of paint.');
      return false;
    }
    if (isNaN(cov) || cov <= 0) {
      if (!isAuto) setError(`Please enter a valid paint coverage rate (${currCoverageUnit}).`);
      return false;
    }
    if (isNaN(waste) || waste < 0 || waste > 100) {
      if (!isAuto) setError('Please enter a valid extra paint allowance between 0% and 100%.');
      return false;
    }

    // Validate doors
    if (isNaN(dCount) || dCount < 0) {
      if (!isAuto) setError('Number of doors cannot be negative.');
      return false;
    }
    if (dCount > 0 && (isNaN(dW) || dW <= 0 || isNaN(dH) || dH <= 0)) {
      if (!isAuto) setError('Please enter valid door dimensions.');
      return false;
    }

    // Validate windows
    if (isNaN(winCount) || winCount < 0) {
      if (!isAuto) setError('Number of windows cannot be negative.');
      return false;
    }
    if (winCount > 0 && (isNaN(winW) || winW <= 0 || isNaN(winH) || winH <= 0)) {
      if (!isAuto) setError('Please enter valid window dimensions.');
      return false;
    }

    const totalDoorArea = dCount > 0 ? dCount * dW * dH : 0;
    const totalWindowArea = winCount > 0 ? winCount * winW * winH : 0;
    const totalOpeningsArea = totalDoorArea + totalWindowArea;

    // Check if openings exceed wall area
    if (totalOpeningsArea > totalWallArea) {
      setError(
        `The total area of doors and windows (${totalOpeningsArea.toFixed(2)} ${currAreaUnit}) exceeds the total wall area (${totalWallArea.toFixed(2)} ${currAreaUnit}). Please adjust your measurements.`
      );
      setResult(null);
      return false;
    }

    // Net paintable area: Wall Area − Doors − Windows + Ceiling Area
    const netWallArea = Math.max(0, totalWallArea - totalDoorArea - totalWindowArea);
    const paintableArea = netWallArea + ceilingArea;

    if (paintableArea === 0) {
      setError(`The net paintable area is 0 ${currAreaUnit}. No paint is needed.`);
      setResult(null);
      return false;
    }

    setError(null);

    // Base paint needed = (Paintable Area * Coats) / Coverage
    const totalCoatedArea = paintableArea * c;
    const basePaintNeeded = totalCoatedArea / cov;

    // Waste allowance calculation
    const extraPaintAllowance = basePaintNeeded * (waste / 100);
    const finalPaintNeeded = basePaintNeeded + extraPaintAllowance;

    // Exact calculations (rounded to 2 decimals to eliminate floating-point precision artifacts)
    const exactVolume = Math.round(finalPaintNeeded * 100) / 100;
    const roundedBaseVolume = Math.round(basePaintNeeded * 100) / 100;
    const roundedExtraVolume = Math.round(extraPaintAllowance * 100) / 100;

    // Intelligently round UP to the next practical whole unit
    const safeVolumeForCeil = Math.round(finalPaintNeeded * 10000) / 10000;
    const recommendedPurchase = Math.max(1, Math.ceil(safeVolumeForCeil));

    setResult({
      baseVolume: roundedBaseVolume,
      extraVolume: roundedExtraVolume,
      exactVolume,
      volume: exactVolume,
      wastePercentage: waste,
      recommendedPurchase,
      unitLabel: currPaintUnit,
      unitShort: currUnitShort,
      areaUnit: currAreaUnit,
      lenUnit: currLenUnit,
      measureMethod: method,
      roomPerimeter,
      totalWallArea,
      ceilingArea,
      includeCeiling: includeCeilingBool,
      doorArea: totalDoorArea,
      windowArea: totalWindowArea,
      paintableArea,
    });
    return true;
  };

  // Auto-calculation whenever inputs change
  useEffect(() => {
    const effectiveWaste = isCustomWaste ? customWasteValue : wasteAllowance;
    calculateWithValues({
      method: measureMethod,
      roomLenStr: roomLength,
      roomWStr: roomWidth,
      wallHStr: wallHeight,
      directAreaStr: directWallArea,
      includeCeilingBool: includeCeiling,
      ceilingAreaStr: customCeilingArea,
      coatsStr: coats,
      covStr: coverage,
      wasteStr: effectiveWaste,
      dCountStr: doorCount,
      dWStr: doorWidth,
      dHStr: doorHeight,
      winCountStr: windowCount,
      winWStr: windowWidth,
      winHStr: windowHeight,
      activeUnit: unitSystem,
      isAuto: true,
    });
  }, [
    measureMethod,
    roomLength,
    roomWidth,
    wallHeight,
    directWallArea,
    includeCeiling,
    customCeilingArea,
    coats,
    coverage,
    wasteAllowance,
    isCustomWaste,
    customWasteValue,
    doorCount,
    doorWidth,
    doorHeight,
    windowCount,
    windowWidth,
    windowHeight,
    unitSystem,
  ]);

  const handleCalculate = (e?: FormEvent) => {
    if (e) e.preventDefault();
    const effectiveWaste = isCustomWaste ? customWasteValue : wasteAllowance;
    const success = calculateWithValues({
      method: measureMethod,
      roomLenStr: roomLength,
      roomWStr: roomWidth,
      wallHStr: wallHeight,
      directAreaStr: directWallArea,
      includeCeilingBool: includeCeiling,
      ceilingAreaStr: customCeilingArea,
      coatsStr: coats,
      covStr: coverage,
      wasteStr: effectiveWaste,
      dCountStr: doorCount,
      dWStr: doorWidth,
      dHStr: doorHeight,
      winCountStr: windowCount,
      winWStr: windowWidth,
      winHStr: windowHeight,
      activeUnit: unitSystem,
      isAuto: false,
    });

    if (success) {
      setHighlightResult(true);
      setTimeout(() => {
        const resultElem = document.getElementById('result-box');
        if (resultElem) {
          resultElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);

      setTimeout(() => {
        setHighlightResult(false);
      }, 1200);
    }
  };

  const handleUnitChange = (newUnit: UnitSystem) => {
    if (newUnit === unitSystem) return;

    const nextRoomLen = convertLengthStr(roomLength, newUnit);
    const nextRoomW = convertLengthStr(roomWidth, newUnit);
    const nextWallH = convertLengthStr(wallHeight, newUnit);
    const nextDirectArea = convertAreaStr(directWallArea, newUnit);
    const nextCeilingArea = convertAreaStr(customCeilingArea, newUnit);
    const nextDW = convertLengthStr(doorWidth, newUnit);
    const nextDH = convertLengthStr(doorHeight, newUnit);
    const nextWinW = convertLengthStr(windowWidth, newUnit);
    const nextWinH = convertLengthStr(windowHeight, newUnit);
    const nextCov = convertCoverageStr(coverage, newUnit);

    setUnitSystem(newUnit);
    setRoomLength(nextRoomLen);
    setRoomWidth(nextRoomW);
    setWallHeight(nextWallH);
    setDirectWallArea(nextDirectArea);
    setCustomCeilingArea(nextCeilingArea);
    setDoorWidth(nextDW);
    setDoorHeight(nextDH);
    setWindowWidth(nextWinW);
    setWindowHeight(nextWinH);
    setCoverage(nextCov);
  };

  return (
    <main className="flex-1 max-w-xl w-full mx-auto px-5 py-8 sm:py-12 flex flex-col justify-center">
      {/* 2. Title: Paint Calculator & 3. One short sentence */}
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-display font-extrabold text-[#1A1918] tracking-tight leading-tight mb-2.5">
          Paint Calculator
        </h1>
        <p className="text-base sm:text-lg text-[#4E4942] leading-relaxed font-sans">
          Find out how much paint you need for your walls and ceiling. Enter your room dimensions, doors and windows, number of coats, and paint coverage to get a simple estimate.
        </p>
      </div>

      {/* Unit System Selector */}
      <section aria-label="Unit system selection" className="mb-7">
        <div className="grid grid-cols-2 gap-1.5 p-1.5 bg-[#EDE5DA] rounded-xl border border-[#DDD3C5] shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)]">
          <button
            id="unit-metric-btn"
            type="button"
            aria-label="Switch to Metric units (litres, metres, square metres)"
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
            aria-label="Switch to US Imperial units (gallons, feet, square feet)"
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

      {/* Form Workspace */}
      <form onSubmit={handleCalculate} aria-label="Paint calculation form" className="space-y-6">
        {/* Main Form Container */}
        <div className="bg-[#FFFFFF] border border-[#E6DDD1] rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-2px_rgba(180,150,125,0.12)] space-y-7">
          {/* SECTION: MEASUREMENT METHOD & DIMENSIONS */}
          <section aria-labelledby="dimensions-heading" className="space-y-5">
            {/* Measurement Method Selector */}
            <div className="space-y-2.5 pb-4 border-b border-[#EAE0D5]">
              <label className="block text-xs sm:text-sm font-semibold text-[#1A1918] font-sans">
                Measurement method
              </label>
              <div
                role="radiogroup"
                aria-label="Measurement method"
                className="grid grid-cols-2 p-1 rounded-xl bg-[#F5EFE6] border border-[#DFD5C6]"
              >
                <button
                  id="measure-method-room-btn"
                  type="button"
                  role="radio"
                  aria-checked={measureMethod === 'room'}
                  onClick={() => setMeasureMethod('room')}
                  className={`min-h-[42px] py-2 px-3 rounded-lg text-xs sm:text-sm font-sans font-bold transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer ${
                    measureMethod === 'room'
                      ? 'bg-[#FFFFFF] text-[#163A5F] shadow-xs border border-[#E0D5C7]'
                      : 'text-[#6E675E] hover:text-[#1A1918]'
                  }`}
                >
                  <span>Room dimensions</span>
                </button>
                <button
                  id="measure-method-area-btn"
                  type="button"
                  role="radio"
                  aria-checked={measureMethod === 'area'}
                  onClick={() => {
                    if (measureMethod !== 'area') {
                      const rL = parseFloat(roomLength);
                      const rW = parseFloat(roomWidth);
                      const wH = parseFloat(wallHeight);
                      if (!isNaN(rL) && !isNaN(rW) && !isNaN(wH) && rL > 0 && rW > 0 && wH > 0) {
                        const calcArea = 2 * (rL + rW) * wH;
                        const formatted = (Math.round(calcArea * 10) / 10).toString();
                        setDirectWallArea(formatted);
                      }
                      setMeasureMethod('area');
                    }
                  }}
                  className={`min-h-[42px] py-2 px-3 rounded-lg text-xs sm:text-sm font-sans font-bold transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer ${
                    measureMethod === 'area'
                      ? 'bg-[#FFFFFF] text-[#163A5F] shadow-xs border border-[#E0D5C7]'
                      : 'text-[#6E675E] hover:text-[#1A1918]'
                  }`}
                >
                  <span>Total wall area</span>
                </button>
              </div>
            </div>

            {/* METHOD 1: ROOM DIMENSIONS */}
            {measureMethod === 'room' ? (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h2 id="dimensions-heading" className="text-base font-display font-bold text-[#1A1918]">
                    Room dimensions
                  </h2>
                  <p className="text-xs sm:text-sm text-[#4E4942] font-sans">
                    Enter length, width, and height to calculate wall area.
                  </p>
                </div>

                {/* Room Dimensions Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  {/* Room Length */}
                  <div>
                    <label
                      htmlFor={roomLengthId}
                      className="block text-xs sm:text-sm font-medium text-[#1A1918] mb-1.5 font-sans"
                    >
                      Length
                    </label>
                    <div className="relative flex items-center">
                      <input
                        id={roomLengthId}
                        type="number"
                        inputMode="decimal"
                        step="any"
                        min="0.1"
                        required={measureMethod === 'room'}
                        value={roomLength}
                        onChange={handleNonNegativeInput(setRoomLength)}
                        placeholder={isMetric ? 'e.g. 5.0' : 'e.g. 16.4'}
                        className="w-full bg-[#FDFBF7] border border-[#DFD5C6] focus:bg-[#FFFFFF] focus:border-[#163A5F] focus:ring-2 focus:ring-[#163A5F]/15 rounded-xl px-3.5 py-3 pr-12 text-base font-mono text-[#1A1918] font-semibold placeholder:text-[#9A9185] shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] outline-hidden transition-all"
                      />
                      <span className="absolute right-3 text-xs font-mono font-bold text-[#163A5F] pointer-events-none">
                        {lenUnit}
                      </span>
                    </div>
                  </div>

                  {/* Room Width */}
                  <div>
                    <label
                      htmlFor={roomWidthId}
                      className="block text-xs sm:text-sm font-medium text-[#1A1918] mb-1.5 font-sans"
                    >
                      Width
                    </label>
                    <div className="relative flex items-center">
                      <input
                        id={roomWidthId}
                        type="number"
                        inputMode="decimal"
                        step="any"
                        min="0.1"
                        required={measureMethod === 'room'}
                        value={roomWidth}
                        onChange={handleNonNegativeInput(setRoomWidth)}
                        placeholder={isMetric ? 'e.g. 4.0' : 'e.g. 13.1'}
                        className="w-full bg-[#FDFBF7] border border-[#DFD5C6] focus:bg-[#FFFFFF] focus:border-[#163A5F] focus:ring-2 focus:ring-[#163A5F]/15 rounded-xl px-3.5 py-3 pr-12 text-base font-mono text-[#1A1918] font-semibold placeholder:text-[#9A9185] shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] outline-hidden transition-all"
                      />
                      <span className="absolute right-3 text-xs font-mono font-bold text-[#163A5F] pointer-events-none">
                        {lenUnit}
                      </span>
                    </div>
                  </div>

                  {/* Wall Height */}
                  <div>
                    <label
                      htmlFor={wallHeightId}
                      className="block text-xs sm:text-sm font-medium text-[#1A1918] mb-1.5 font-sans"
                    >
                      Wall height
                    </label>
                    <div className="relative flex items-center">
                      <input
                        id={wallHeightId}
                        type="number"
                        inputMode="decimal"
                        step="any"
                        min="0.1"
                        required={measureMethod === 'room'}
                        value={wallHeight}
                        onChange={handleNonNegativeInput(setWallHeight)}
                        placeholder={isMetric ? 'e.g. 2.5' : 'e.g. 8.2'}
                        className="w-full bg-[#FDFBF7] border border-[#DFD5C6] focus:bg-[#FFFFFF] focus:border-[#163A5F] focus:ring-2 focus:ring-[#163A5F]/15 rounded-xl px-3.5 py-3 pr-12 text-base font-mono text-[#1A1918] font-semibold placeholder:text-[#9A9185] shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] outline-hidden transition-all"
                      />
                      <span className="absolute right-3 text-xs font-mono font-bold text-[#163A5F] pointer-events-none">
                        {lenUnit}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Include ceiling option */}
                <div className="pt-2 flex items-center justify-between gap-3">
                  <span className="text-xs sm:text-sm font-medium text-[#1A1918] font-sans">
                    Include ceiling?
                  </span>
                  <div
                    role="radiogroup"
                    aria-label="Include ceiling"
                    className="grid grid-cols-2 p-0.5 rounded-lg bg-[#F5EFE6] border border-[#DFD5C6] w-28"
                  >
                    <button
                      type="button"
                      role="radio"
                      aria-checked={!includeCeiling}
                      onClick={() => setIncludeCeiling(false)}
                      className={`min-h-[34px] py-1 px-3 text-xs font-sans font-bold rounded-md transition-all cursor-pointer ${
                        !includeCeiling
                          ? 'bg-[#FFFFFF] text-[#163A5F] shadow-xs border border-[#E0D5C7]'
                          : 'text-[#6E675E] hover:text-[#1A1918]'
                      }`}
                    >
                      No
                    </button>
                    <button
                      type="button"
                      role="radio"
                      aria-checked={includeCeiling}
                      onClick={() => setIncludeCeiling(true)}
                      className={`min-h-[34px] py-1 px-3 text-xs font-sans font-bold rounded-md transition-all cursor-pointer ${
                        includeCeiling
                          ? 'bg-[#163A5F] text-white shadow-xs font-bold'
                          : 'text-[#6E675E] hover:text-[#1A1918]'
                      }`}
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* METHOD 2: TOTAL WALL AREA */
              <div className="space-y-4">
                <div className="space-y-1">
                  <h2 id="dimensions-heading" className="text-base font-display font-bold text-[#1A1918]">
                    Total wall area
                  </h2>
                  <p className="text-xs sm:text-sm text-[#4E4942] font-sans">
                    Enter the total area of walls you plan to paint.
                  </p>
                </div>

                {/* Total Wall Area Input */}
                <div>
                  <label
                    htmlFor={directWallAreaId}
                    className="block text-xs sm:text-sm font-medium text-[#1A1918] mb-1.5 font-sans"
                  >
                    Wall area
                  </label>
                  <div className="relative flex items-center">
                    <input
                      id={directWallAreaId}
                      type="number"
                      inputMode="decimal"
                      step="any"
                      min="0.1"
                      required={measureMethod === 'area'}
                      value={directWallArea}
                      onChange={handleNonNegativeInput(setDirectWallArea)}
                      placeholder={isMetric ? 'e.g. 45' : 'e.g. 484'}
                      className="w-full bg-[#FDFBF7] border border-[#DFD5C6] focus:bg-[#FFFFFF] focus:border-[#163A5F] focus:ring-2 focus:ring-[#163A5F]/15 rounded-xl px-3.5 py-3 pr-16 text-base font-mono text-[#1A1918] font-semibold placeholder:text-[#9A9185] shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] outline-hidden transition-all"
                    />
                    <span className="absolute right-3 text-xs font-mono font-bold text-[#163A5F] pointer-events-none">
                      {areaUnit}
                    </span>
                  </div>
                </div>

                {/* Include ceiling option for direct area mode */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs sm:text-sm font-medium text-[#1A1918] font-sans">
                      Include ceiling?
                    </span>
                    <div
                      role="radiogroup"
                      aria-label="Include ceiling"
                      className="grid grid-cols-2 p-0.5 rounded-lg bg-[#F5EFE6] border border-[#DFD5C6] w-28"
                    >
                      <button
                        type="button"
                        role="radio"
                        aria-checked={!includeCeiling}
                        onClick={() => setIncludeCeiling(false)}
                        className={`min-h-[34px] py-1 px-3 text-xs font-sans font-bold rounded-md transition-all cursor-pointer ${
                          !includeCeiling
                            ? 'bg-[#FFFFFF] text-[#163A5F] shadow-xs border border-[#E0D5C7]'
                            : 'text-[#6E675E] hover:text-[#1A1918]'
                        }`}
                      >
                        No
                      </button>
                      <button
                        type="button"
                        role="radio"
                        aria-checked={includeCeiling}
                        onClick={() => setIncludeCeiling(true)}
                        className={`min-h-[34px] py-1 px-3 text-xs font-sans font-bold rounded-md transition-all cursor-pointer ${
                          includeCeiling
                            ? 'bg-[#163A5F] text-white shadow-xs font-bold'
                            : 'text-[#6E675E] hover:text-[#1A1918]'
                        }`}
                      >
                        Yes
                      </button>
                    </div>
                  </div>

                  {includeCeiling && (
                    <div>
                      <label
                        htmlFor={ceilingAreaId}
                        className="block text-xs sm:text-sm font-medium text-[#1A1918] mb-1.5 font-sans"
                      >
                        Ceiling area (optional)
                      </label>
                      <div className="relative flex items-center">
                        <input
                          id={ceilingAreaId}
                          type="number"
                          inputMode="decimal"
                          step="any"
                          min="0.1"
                          value={customCeilingArea}
                          onChange={handleNonNegativeInput(setCustomCeilingArea)}
                          placeholder={isMetric ? 'e.g. 20' : 'e.g. 215'}
                          className="w-full bg-[#FDFBF7] border border-[#DFD5C6] focus:bg-[#FFFFFF] focus:border-[#163A5F] focus:ring-2 focus:ring-[#163A5F]/15 rounded-xl px-3.5 py-3 pr-16 text-base font-mono text-[#1A1918] font-semibold placeholder:text-[#9A9185] shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] outline-hidden transition-all"
                        />
                        <span className="absolute right-3 text-xs font-mono font-bold text-[#163A5F] pointer-events-none">
                          {areaUnit}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Number of Coats */}
            <div className="pt-1">
              <label
                htmlFor={coatsId}
                className="block text-xs sm:text-sm font-medium text-[#1A1918] mb-1.5 font-sans"
              >
                Number of coats
              </label>
              <input
                id={coatsId}
                type="number"
                inputMode="numeric"
                step="1"
                min="1"
                required
                value={coats}
                onChange={handlePositiveIntInput(setCoats, 1)}
                placeholder="e.g. 2"
                className="w-full bg-[#FDFBF7] border border-[#DFD5C6] focus:bg-[#FFFFFF] focus:border-[#163A5F] focus:ring-2 focus:ring-[#163A5F]/15 rounded-xl px-3.5 py-3 text-base font-mono text-[#1A1918] font-semibold placeholder:text-[#9A9185] shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] outline-hidden transition-all"
              />
            </div>
          </section>

          {/* SECTION: OPENINGS */}
          <section aria-labelledby="openings-heading" className="pt-6 border-t border-[#EAE0D5] space-y-5">
            <div className="space-y-1">
              <h2 id="openings-heading" className="text-base font-display font-bold text-[#1A1918]">
                Doors & windows (optional)
              </h2>
              <p className="text-xs sm:text-sm text-[#4E4942] font-sans">
                Subtract doors and windows from the wall area.
              </p>
            </div>

            {/* DOORS */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 items-start">
                <div>
                  <label
                    htmlFor={doorCountId}
                    className="block text-xs sm:text-sm font-medium text-[#4E4942] mb-1.5 font-sans"
                  >
                    Number of doors
                  </label>
                  <input
                    id={doorCountId}
                    type="number"
                    inputMode="numeric"
                    step="1"
                    min="0"
                    value={doorCount}
                    onChange={handlePositiveIntInput(setDoorCount)}
                    className="w-full bg-[#FDFBF7] border border-[#DFD5C6] focus:bg-[#FFFFFF] focus:border-[#163A5F] focus:ring-2 focus:ring-[#163A5F]/15 rounded-xl px-3.5 py-2.5 text-base font-mono text-[#1A1918] font-semibold shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] outline-hidden transition-all"
                  />
                </div>
                {hasDoors && (
                  <>
                    <div>
                      <label
                        htmlFor={doorWidthId}
                        className="block text-xs sm:text-sm font-medium text-[#4E4942] mb-1.5 font-sans"
                      >
                        Door width ({lenUnit})
                      </label>
                      <div className="relative flex items-center">
                        <input
                          id={doorWidthId}
                          type="number"
                          inputMode="decimal"
                          step="any"
                          min="0.1"
                          value={doorWidth}
                          onChange={handleNonNegativeInput(setDoorWidth)}
                          className="w-full bg-[#FDFBF7] border border-[#DFD5C6] focus:bg-[#FFFFFF] focus:border-[#163A5F] focus:ring-2 focus:ring-[#163A5F]/15 rounded-xl px-3.5 py-2.5 pr-10 text-base font-mono text-[#1A1918] font-semibold shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] outline-hidden transition-all"
                        />
                        <span className="absolute right-2.5 text-xs font-mono font-bold text-[#163A5F] pointer-events-none">
                          {lenUnit}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor={doorHeightId}
                        className="block text-xs sm:text-sm font-medium text-[#4E4942] mb-1.5 font-sans"
                      >
                        Door height ({lenUnit})
                      </label>
                      <div className="relative flex items-center">
                        <input
                          id={doorHeightId}
                          type="number"
                          inputMode="decimal"
                          step="any"
                          min="0.1"
                          value={doorHeight}
                          onChange={handleNonNegativeInput(setDoorHeight)}
                          className="w-full bg-[#FDFBF7] border border-[#DFD5C6] focus:bg-[#FFFFFF] focus:border-[#163A5F] focus:ring-2 focus:ring-[#163A5F]/15 rounded-xl px-3.5 py-2.5 pr-10 text-base font-mono text-[#1A1918] font-semibold shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] outline-hidden transition-all"
                        />
                        <span className="absolute right-2.5 text-xs font-mono font-bold text-[#163A5F] pointer-events-none">
                          {lenUnit}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* WINDOWS */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 items-start">
                <div>
                  <label
                    htmlFor={windowCountId}
                    className="block text-xs sm:text-sm font-medium text-[#4E4942] mb-1.5 font-sans"
                  >
                    Number of windows
                  </label>
                  <input
                    id={windowCountId}
                    type="number"
                    inputMode="numeric"
                    step="1"
                    min="0"
                    value={windowCount}
                    onChange={handlePositiveIntInput(setWindowCount)}
                    className="w-full bg-[#FDFBF7] border border-[#DFD5C6] focus:bg-[#FFFFFF] focus:border-[#163A5F] focus:ring-2 focus:ring-[#163A5F]/15 rounded-xl px-3.5 py-2.5 text-base font-mono text-[#1A1918] font-semibold shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] outline-hidden transition-all"
                  />
                </div>
                {hasWindows && (
                  <>
                    <div>
                      <label
                        htmlFor={windowWidthId}
                        className="block text-xs sm:text-sm font-medium text-[#4E4942] mb-1.5 font-sans"
                      >
                        Window width ({lenUnit})
                      </label>
                      <div className="relative flex items-center">
                        <input
                          id={windowWidthId}
                          type="number"
                          inputMode="decimal"
                          step="any"
                          min="0.1"
                          value={windowWidth}
                          onChange={handleNonNegativeInput(setWindowWidth)}
                          className="w-full bg-[#FDFBF7] border border-[#DFD5C6] focus:bg-[#FFFFFF] focus:border-[#163A5F] focus:ring-2 focus:ring-[#163A5F]/15 rounded-xl px-3.5 py-2.5 pr-10 text-base font-mono text-[#1A1918] font-semibold shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] outline-hidden transition-all"
                        />
                        <span className="absolute right-2.5 text-xs font-mono font-bold text-[#163A5F] pointer-events-none">
                          {lenUnit}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor={windowHeightId}
                        className="block text-xs sm:text-sm font-medium text-[#4E4942] mb-1.5 font-sans"
                      >
                        Window height ({lenUnit})
                      </label>
                      <div className="relative flex items-center">
                        <input
                          id={windowHeightId}
                          type="number"
                          inputMode="decimal"
                          step="any"
                          min="0.1"
                          value={windowHeight}
                          onChange={handleNonNegativeInput(setWindowHeight)}
                          className="w-full bg-[#FDFBF7] border border-[#DFD5C6] focus:bg-[#FFFFFF] focus:border-[#163A5F] focus:ring-2 focus:ring-[#163A5F]/15 rounded-xl px-3.5 py-2.5 pr-10 text-base font-mono text-[#1A1918] font-semibold shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] outline-hidden transition-all"
                        />
                        <span className="absolute right-2.5 text-xs font-mono font-bold text-[#163A5F] pointer-events-none">
                          {lenUnit}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>

          {/* SECTION: PAINT SETTINGS */}
          <section aria-labelledby="paint-settings-heading" className="pt-6 border-t border-[#EAE0D5] space-y-5">
            <h2 id="paint-settings-heading" className="text-base font-display font-bold text-[#1A1918]">
              Paint coverage & extra paint
            </h2>

            {/* Paint Coverage */}
            <div>
              <label
                htmlFor={coverageId}
                className="block text-xs sm:text-sm font-medium text-[#1A1918] mb-1.5 font-sans"
              >
                Paint coverage ({coverageUnit})
              </label>
              <div className="relative flex items-center">
                <input
                  id={coverageId}
                  type="number"
                  inputMode="decimal"
                  step="any"
                  min="0.1"
                  required
                  value={coverage}
                  onChange={handleNonNegativeInput(setCoverage)}
                  placeholder={isMetric ? 'e.g. 10' : 'e.g. 400'}
                  className="w-full bg-[#FDFBF7] border border-[#DFD5C6] focus:bg-[#FFFFFF] focus:border-[#163A5F] focus:ring-2 focus:ring-[#163A5F]/15 rounded-xl px-3.5 py-3 pr-20 text-base font-mono text-[#1A1918] font-semibold placeholder:text-[#9A9185] shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] outline-hidden transition-all"
                />
                <span className="absolute right-3 text-xs font-mono font-bold text-[#163A5F] pointer-events-none">
                  {coverageUnit}
                </span>
              </div>
              <p className="text-xs text-[#6E675E] mt-1.5 font-sans">
                {isMetric
                  ? 'Standard wall paint covers around 10–12 m² per litre.'
                  : 'Standard wall paint covers around 350–400 sq ft per gallon.'}
              </p>
            </div>

            {/* Extra paint allowance */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-[#1A1918] mb-1.5 font-sans">
                Extra paint
              </label>

              {/* Percentage selector: 0% | 5% | 10% | 15% */}
              <div className="grid grid-cols-4 gap-1.5 p-1 bg-[#F5EFE6] rounded-xl border border-[#DFD5C6]">
                {[0, 5, 10, 15].map((pct) => {
                  const isSelected = !isCustomWaste && wasteAllowance === pct.toString();
                  return (
                    <button
                      key={pct}
                      id={`waste-btn-${pct}`}
                      type="button"
                      onClick={() => {
                        setIsCustomWaste(false);
                        setWasteAllowance(pct.toString());
                      }}
                      className={`min-h-[40px] py-2 px-1 text-sm font-mono rounded-lg transition-all duration-150 cursor-pointer flex items-center justify-center ${
                        isSelected
                          ? 'bg-[#163A5F] text-white shadow-xs font-bold'
                          : 'text-[#4E4942] hover:text-[#163A5F] hover:bg-[#FFFFFF]/60 font-semibold'
                      }`}
                    >
                      <span>{pct}%</span>
                    </button>
                  );
                })}
              </div>

              {/* Custom Percentage toggle */}
              <div className="mt-2">
                {!isCustomWaste ? (
                  <button
                    id="custom-waste-toggle-btn"
                    type="button"
                    onClick={() => setIsCustomWaste(true)}
                    className="text-xs font-sans font-semibold text-[#163A5F] hover:underline cursor-pointer py-1"
                  >
                    + Custom percentage
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <input
                        id={customWasteId}
                        type="number"
                        inputMode="decimal"
                        min="0"
                        max="100"
                        step="any"
                        value={customWasteValue}
                        onChange={handleNonNegativeInput(setCustomWasteValue)}
                        placeholder="e.g. 12"
                        className="w-full bg-[#FDFBF7] border border-[#DFD5C6] focus:bg-[#FFFFFF] focus:border-[#163A5F] focus:ring-2 focus:ring-[#163A5F]/15 rounded-xl px-3.5 py-2 pr-8 text-sm font-mono text-[#1A1918] font-semibold outline-hidden"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-[#163A5F] pointer-events-none">
                        %
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsCustomWaste(false);
                        setWasteAllowance('10');
                      }}
                      className="text-xs font-sans text-[#6E675E] hover:text-[#1A1918] px-3 py-2 rounded-xl border border-[#DFD5C6] bg-[#F5EFE6] font-semibold cursor-pointer"
                    >
                      Reset (10%)
                    </button>
                  </div>
                )}
              </div>

              <p className="text-xs text-[#6E675E] mt-1.5 font-sans">
                Accounts for waste, roller absorption, and future touch-ups.
              </p>
            </div>
          </section>
        </div>

        {/* Validation / Error Message */}
        {error && (
          <div
            className="p-4 rounded-xl bg-[#FAF0EB] border border-[#F5D8CE] text-[#D95D39] text-sm font-sans leading-relaxed"
            role="alert"
          >
            {error}
          </div>
        )}

        {/* Calculate Button */}
        <div>
          <button
            id="calculate-btn"
            type="submit"
            className="w-full min-h-[50px] py-3.5 px-6 rounded-xl bg-[#163A5F] text-[#FFFFFF] text-base font-sans font-bold shadow-[0_3px_12px_rgba(22,58,95,0.2)] hover:bg-[#112F4D] active:scale-[0.99] transition-all cursor-pointer"
          >
            Calculate paint
          </button>
        </div>
      </form>

      {/* Results Box */}
      {result !== null && (
        <section
          id="result-box"
          aria-labelledby="results-heading"
          className="scroll-mt-6 mt-8 p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] shadow-[0_4px_24px_rgba(180,150,125,0.12)] space-y-6 animate-in fade-in duration-200"
          role="region"
          aria-live="polite"
        >
          {/* 1. What to buy - Hero Result */}
          <div className="p-6 sm:p-7 rounded-xl bg-[#EDF7F2] border border-[#B4E2D3] space-y-2">
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#0B6E54]">
              What to buy
            </span>
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-5xl sm:text-6xl font-display font-extrabold text-[#0B6E54] tracking-tight">
                {result.recommendedPurchase}
              </span>
              <span className="text-2xl sm:text-3xl font-display font-bold text-[#0B6E54]">
                {result.unitLabel}
              </span>
              <span className="text-sm font-mono text-[#0B6E54] font-semibold">
                ({result.unitShort})
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#0B6E54] font-medium font-sans pt-1">
              Rounded up so you have enough paint
              {result.wastePercentage > 0 ? ` (includes ${result.wastePercentage}% extra)` : ''}.
            </p>
          </div>

          {/* 2. Paint Needed Row */}
          <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E6DDD1] flex items-center justify-between gap-4">
            <div>
              <span className="text-xs font-medium text-[#6E675E] font-sans">
                Exact paint needed
              </span>
              <div className="text-xl font-display font-bold text-[#1A1918]">
                {formatVolumeDisplay(result.exactVolume)} {result.unitShort}
              </div>
            </div>
            <button
              id="view-calculation-details-btn"
              type="button"
              onClick={() => setShowDetails((prev) => !prev)}
              className="inline-flex items-center gap-1.5 text-xs font-sans font-bold text-[#163A5F] hover:underline cursor-pointer py-1"
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

          {/* 3. Breakdown details */}
          {showDetails && (
            <div
              id="calculation-details-panel"
              className="p-5 rounded-xl bg-[#FAF6F0] border border-[#E4DCD0] space-y-2.5 font-sans text-xs sm:text-sm animate-in fade-in duration-150"
            >
              <div className="flex justify-between items-center py-0.5">
                <span className="text-[#6E675E]">Total wall area</span>
                <span className="font-semibold text-[#1A1918]">
                  {result.totalWallArea.toFixed(2)} {result.areaUnit}
                </span>
              </div>
              {result.includeCeiling && result.ceilingArea > 0 && (
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-[#6E675E]">Ceiling area</span>
                  <span className="font-semibold text-[#1A1918]">
                    +{result.ceilingArea.toFixed(2)} {result.areaUnit}
                  </span>
                </div>
              )}
              {result.doorArea > 0 && (
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-[#6E675E]">Doors excluded</span>
                  <span className="text-[#D95D39] font-medium">
                    −{result.doorArea.toFixed(2)} {result.areaUnit}
                  </span>
                </div>
              )}
              {result.windowArea > 0 && (
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-[#6E675E]">Windows excluded</span>
                  <span className="text-[#D95D39] font-medium">
                    −{result.windowArea.toFixed(2)} {result.areaUnit}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center py-0.5 font-medium border-t border-[#E4DCD0] pt-2">
                <span className="text-[#6E675E]">Paintable area</span>
                <span className="text-[#1A1918]">
                  {result.paintableArea.toFixed(2)} {result.areaUnit}
                </span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="text-[#6E675E]">Coats</span>
                <span className="font-semibold text-[#1A1918]">{coats}</span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="text-[#6E675E]">Base paint</span>
                <span className="font-semibold text-[#1A1918]">
                  {formatVolumeDisplay(result.baseVolume)} {result.unitLabel}
                </span>
              </div>
              {result.wastePercentage > 0 && (
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-[#6E675E]">Extra allowance ({result.wastePercentage}%)</span>
                  <span className="font-semibold text-[#163A5F]">
                    +{formatVolumeDisplay(result.extraVolume)} {result.unitLabel}
                  </span>
                </div>
              )}
              <div className="pt-2 border-t border-[#E4DCD0] flex justify-between items-center font-bold text-sm">
                <span className="text-[#1A1918]">Total needed</span>
                <span className="text-[#163A5F]">
                  {formatVolumeDisplay(result.exactVolume)} {result.unitShort}
                </span>
              </div>
            </div>
          )}
        </section>
      )}

      {/* SEO Explanatory Content */}
      <section aria-labelledby="how-much-paint-heading" className="mt-10 p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] shadow-[0_4px_20px_-2px_rgba(180,150,125,0.12)] space-y-3">
        <h2
          id="how-much-paint-heading"
          className="text-xl sm:text-2xl font-display font-bold text-[#1A1918]"
        >
          How much paint do I need?
        </h2>
        <p className="text-sm sm:text-base text-[#4E4942] leading-relaxed font-sans">
          This room paint calculator estimates how much paint you need based on your wall and ceiling area, number of coats, doors and windows, and paint coverage. It also adds extra paint for waste and touch-ups.
        </p>
      </section>

      <section aria-labelledby="how-it-works-heading" className="mt-6 p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] shadow-[0_4px_20px_-2px_rgba(180,150,125,0.12)] space-y-3">
        <h2
          id="how-it-works-heading"
          className="text-xl sm:text-2xl font-display font-bold text-[#1A1918]"
        >
          How the paint calculator works
        </h2>
        <p className="text-sm sm:text-base text-[#4E4942] leading-relaxed font-sans">
          Enter your room measurements, choose how many coats you need, and add any doors or windows. The calculator works out the paintable area, then tells you how much paint you need and how much to buy.
        </p>
      </section>

      {/* Internal Navigation Link */}
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
