import { useState, useMemo } from 'react';
import { PaintInputs, MeasurementMode } from '../types';
import {
  DEFAULT_PAINT_INPUTS,
  PRESET_EXAMPLES,
  ARCHITECTURAL_SWATCHES,
  PAINT_FINISH_PRESETS,
  calculatePaint,
} from '../utils/paintMath';
import { WallVisualizer } from './WallVisualizer';
import { ResultPanel } from './ResultPanel';
import {
  RotateCcw,
  Sparkles,
  Square,
  DoorOpen,
  Palette,
  Plus,
  Minus,
  Home,
  LayoutGrid,
  ArrowDown,
  Layers,
  Coins,
} from 'lucide-react';

export function PaintCalculator() {
  const [inputs, setInputs] = useState<PaintInputs>({ ...DEFAULT_PAINT_INPUTS });
  const [activePreset, setActivePreset] = useState<string>('standard-bedroom');

  const result = useMemo(() => calculatePaint(inputs), [inputs]);

  const handleChange = <K extends keyof PaintInputs>(field: K, val: PaintInputs[K]) => {
    setInputs((prev) => ({
      ...prev,
      [field]: typeof val === 'number' && isNaN(val) ? 0 : val,
    }));
    setActivePreset('custom');
  };

  const handleStep = (field: keyof PaintInputs, step: number, min = 0, max = 100) => {
    const current = Number(inputs[field]) || 0;
    const next = Math.min(max, Math.max(min, Math.round((current + step) * 100) / 100));
    handleChange(field, next as any);
  };

  const handleReset = () => {
    setInputs({ ...DEFAULT_PAINT_INPUTS });
    setActivePreset('standard-bedroom');
  };

  const handleSelectPreset = (presetId: string) => {
    const found = PRESET_EXAMPLES.find((p) => p.id === presetId);
    if (found) {
      setInputs({ ...found.values });
      setActivePreset(found.id);
    }
  };

  const setMode = (mode: MeasurementMode) => {
    setInputs((prev) => ({ ...prev, mode }));
    setActivePreset('custom');
  };

  const scrollToResults = () => {
    const el = document.getElementById('calculation-certificate');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="paint-calculator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Editorial Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 mb-8 border-b border-[#E5E3DD]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block px-2 py-0.5 rounded bg-[#1A1918] text-[#F8F7F4] font-mono text-xs font-semibold tracking-wider">
              TOOL NO. 01
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-[#73716B]">
              SURFACE & COATINGS WORKSHOP
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-[#1A1918]">
            Paint Volume Calculator
          </h1>
          <p className="mt-2 text-base text-[#54524D] max-w-2xl leading-relaxed">
            Determine the exact litres of wall and ceiling paint required for your room, accounting for architectural doors, windows, multi-coat coverage, and roller waste margins.
          </p>
        </div>

        {/* Quick Presets & Reset Bar */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-1.5 bg-[#FAF9F5] border border-[#E5E3DD] p-1 rounded-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#C2410C] ml-1.5" />
            <span className="text-[11px] font-mono text-[#73716B] uppercase mr-1">
              Preset:
            </span>
            <select
              id="preset-selector"
              value={activePreset}
              onChange={(e) => handleSelectPreset(e.target.value)}
              className="text-xs font-medium text-[#1A1918] bg-transparent border-0 focus:ring-0 focus:outline-hidden py-1 pr-6 cursor-pointer font-sans"
              aria-label="Select room preset example"
            >
              <option value="custom" disabled={activePreset !== 'custom'}>
                Custom Measurement
              </option>
              {PRESET_EXAMPLES.map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {preset.name}
                </option>
              ))}
            </select>
          </div>

          <button
            id="reset-calculator-btn"
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5E3DD] bg-[#FAF9F5] hover:bg-[#EAE8E1] text-[#54524D] text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
            title="Reset to default standard room"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Layout: Two-Column Form + Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Inputs Workspace (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* SECTION 1: PROJECT DIMENSIONS & MEASUREMENT METHOD */}
          <div className="bg-[#FAF9F5] border border-[#E5E3DD] rounded-xl p-5 sm:p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-4 border-b border-[#EAE8E1]">
              <div className="flex items-center gap-2">
                <Square className="w-4 h-4 text-[#C2410C]" />
                <h2 className="font-mono text-xs uppercase tracking-wider font-bold text-[#1A1918]">
                  1. PROJECT DIMENSIONS
                </h2>
              </div>

              {/* Mode Switcher Tabs */}
              <div className="flex items-center bg-[#EAE8E1] p-0.5 rounded-lg self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setMode('room')}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-md transition-colors cursor-pointer ${
                    inputs.mode === 'room'
                      ? 'bg-[#1A1918] text-white font-semibold shadow-xs'
                      : 'text-[#54524D] hover:text-[#1A1918]'
                  }`}
                  aria-pressed={inputs.mode === 'room'}
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Room Mode (L × W)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMode('walls')}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-md transition-colors cursor-pointer ${
                    inputs.mode === 'walls'
                      ? 'bg-[#1A1918] text-white font-semibold shadow-xs'
                      : 'text-[#54524D] hover:text-[#1A1918]'
                  }`}
                  aria-pressed={inputs.mode === 'walls'}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Wall Span Mode</span>
                </button>
              </div>
            </div>

            {/* Conditional Inputs based on Mode */}
            {inputs.mode === 'room' ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Room Length */}
                  <div>
                    <label
                      htmlFor="input-room-length"
                      className="block text-xs font-semibold text-[#1A1918] mb-1"
                    >
                      Room Length
                    </label>
                    <div className="relative flex items-center">
                      <input
                        id="input-room-length"
                        type="number"
                        min="0.1"
                        max="100"
                        step="0.1"
                        value={inputs.roomLength || ''}
                        onChange={(e) => handleChange('roomLength', parseFloat(e.target.value))}
                        className="w-full bg-white border border-[#D6D3CD] focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C] rounded-lg pl-3 pr-16 py-2 text-sm font-mono text-[#1A1918] outline-hidden"
                      />
                      <div className="absolute right-1 flex items-center gap-0.5">
                        <button
                          type="button"
                          onClick={() => handleStep('roomLength', -0.5, 0.5, 100)}
                          className="w-6 h-6 rounded bg-[#F1EFEA] hover:bg-[#E5E3DD] text-[#54524D] flex items-center justify-center cursor-pointer text-xs"
                          aria-label="Decrease room length by 0.5 meters"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStep('roomLength', 0.5, 0.5, 100)}
                          className="w-6 h-6 rounded bg-[#F1EFEA] hover:bg-[#E5E3DD] text-[#54524D] flex items-center justify-center cursor-pointer text-xs"
                          aria-label="Increase room length by 0.5 meters"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <p className="text-[11px] font-mono text-[#73716B] mt-1">Longest room dimension</p>
                  </div>

                  {/* Room Width */}
                  <div>
                    <label
                      htmlFor="input-room-width"
                      className="block text-xs font-semibold text-[#1A1918] mb-1"
                    >
                      Room Width
                    </label>
                    <div className="relative flex items-center">
                      <input
                        id="input-room-width"
                        type="number"
                        min="0.1"
                        max="100"
                        step="0.1"
                        value={inputs.roomWidth || ''}
                        onChange={(e) => handleChange('roomWidth', parseFloat(e.target.value))}
                        className="w-full bg-white border border-[#D6D3CD] focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C] rounded-lg pl-3 pr-16 py-2 text-sm font-mono text-[#1A1918] outline-hidden"
                      />
                      <div className="absolute right-1 flex items-center gap-0.5">
                        <button
                          type="button"
                          onClick={() => handleStep('roomWidth', -0.5, 0.5, 100)}
                          className="w-6 h-6 rounded bg-[#F1EFEA] hover:bg-[#E5E3DD] text-[#54524D] flex items-center justify-center cursor-pointer text-xs"
                          aria-label="Decrease room width by 0.5 meters"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStep('roomWidth', 0.5, 0.5, 100)}
                          className="w-6 h-6 rounded bg-[#F1EFEA] hover:bg-[#E5E3DD] text-[#54524D] flex items-center justify-center cursor-pointer text-xs"
                          aria-label="Increase room width by 0.5 meters"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <p className="text-[11px] font-mono text-[#73716B] mt-1">Shorter room dimension</p>
                  </div>

                  {/* Ceiling Height */}
                  <div>
                    <label
                      htmlFor="input-ceiling-height"
                      className="block text-xs font-semibold text-[#1A1918] mb-1"
                    >
                      Ceiling Height
                    </label>
                    <div className="relative flex items-center">
                      <input
                        id="input-ceiling-height"
                        type="number"
                        min="0.1"
                        max="50"
                        step="0.1"
                        value={inputs.ceilingHeight || ''}
                        onChange={(e) => handleChange('ceilingHeight', parseFloat(e.target.value))}
                        className="w-full bg-white border border-[#D6D3CD] focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C] rounded-lg pl-3 pr-16 py-2 text-sm font-mono text-[#1A1918] outline-hidden"
                      />
                      <div className="absolute right-1 flex items-center gap-0.5">
                        <button
                          type="button"
                          onClick={() => handleStep('ceilingHeight', -0.1, 0.5, 50)}
                          className="w-6 h-6 rounded bg-[#F1EFEA] hover:bg-[#E5E3DD] text-[#54524D] flex items-center justify-center cursor-pointer text-xs"
                          aria-label="Decrease ceiling height by 0.1 meters"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStep('ceilingHeight', 0.1, 0.5, 50)}
                          className="w-6 h-6 rounded bg-[#F1EFEA] hover:bg-[#E5E3DD] text-[#54524D] flex items-center justify-center cursor-pointer text-xs"
                          aria-label="Increase ceiling height by 0.1 meters"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <p className="text-[11px] font-mono text-[#73716B] mt-1">Floor to finished ceiling</p>
                  </div>
                </div>

                {/* Subtle Gross Area & Perimeter Indicator */}
                <div className="pt-2 flex flex-wrap items-center justify-between text-xs font-mono text-[#73716B] border-t border-[#EAE8E1]/80">
                  <span>Room Perimeter: 2 × ({inputs.roomLength}m + {inputs.roomWidth}m) = {(2 * (inputs.roomLength + inputs.roomWidth)).toFixed(1)} m</span>
                  <span className="font-semibold text-[#1A1918]">
                    Gross Wall Area: {result.totalWallArea.toFixed(2)} m²
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Wall Width */}
                  <div>
                    <label
                      htmlFor="input-wall-width"
                      className="block text-xs font-semibold text-[#1A1918] mb-1"
                    >
                      Wall Width
                    </label>
                    <div className="relative flex items-center">
                      <input
                        id="input-wall-width"
                        type="number"
                        min="0.1"
                        max="100"
                        step="0.1"
                        value={inputs.wallWidth || ''}
                        onChange={(e) => handleChange('wallWidth', parseFloat(e.target.value))}
                        className="w-full bg-white border border-[#D6D3CD] focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C] rounded-lg pl-3 pr-16 py-2 text-sm font-mono text-[#1A1918] outline-hidden"
                      />
                      <div className="absolute right-1 flex items-center gap-0.5">
                        <button
                          type="button"
                          onClick={() => handleStep('wallWidth', -0.5, 0.5, 100)}
                          className="w-6 h-6 rounded bg-[#F1EFEA] hover:bg-[#E5E3DD] text-[#54524D] flex items-center justify-center cursor-pointer text-xs"
                          aria-label="Decrease wall width"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStep('wallWidth', 0.5, 0.5, 100)}
                          className="w-6 h-6 rounded bg-[#F1EFEA] hover:bg-[#E5E3DD] text-[#54524D] flex items-center justify-center cursor-pointer text-xs"
                          aria-label="Increase wall width"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <p className="text-[11px] font-mono text-[#73716B] mt-1">Single wall span</p>
                  </div>

                  {/* Wall Height */}
                  <div>
                    <label
                      htmlFor="input-wall-height"
                      className="block text-xs font-semibold text-[#1A1918] mb-1"
                    >
                      Wall Height
                    </label>
                    <div className="relative flex items-center">
                      <input
                        id="input-wall-height"
                        type="number"
                        min="0.1"
                        max="50"
                        step="0.1"
                        value={inputs.wallHeight || ''}
                        onChange={(e) => handleChange('wallHeight', parseFloat(e.target.value))}
                        className="w-full bg-white border border-[#D6D3CD] focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C] rounded-lg pl-3 pr-16 py-2 text-sm font-mono text-[#1A1918] outline-hidden"
                      />
                      <div className="absolute right-1 flex items-center gap-0.5">
                        <button
                          type="button"
                          onClick={() => handleStep('wallHeight', -0.1, 0.5, 50)}
                          className="w-6 h-6 rounded bg-[#F1EFEA] hover:bg-[#E5E3DD] text-[#54524D] flex items-center justify-center cursor-pointer text-xs"
                          aria-label="Decrease wall height"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStep('wallHeight', 0.1, 0.5, 50)}
                          className="w-6 h-6 rounded bg-[#F1EFEA] hover:bg-[#E5E3DD] text-[#54524D] flex items-center justify-center cursor-pointer text-xs"
                          aria-label="Increase wall height"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <p className="text-[11px] font-mono text-[#73716B] mt-1">Floor to ceiling</p>
                  </div>

                  {/* Number of Walls */}
                  <div>
                    <label
                      htmlFor="input-wall-count"
                      className="block text-xs font-semibold text-[#1A1918] mb-1"
                    >
                      Number of Walls
                    </label>
                    <div className="relative flex items-center">
                      <input
                        id="input-wall-count"
                        type="number"
                        min="1"
                        max="50"
                        step="1"
                        value={inputs.wallCount || ''}
                        onChange={(e) => handleChange('wallCount', parseInt(e.target.value, 10))}
                        className="w-full bg-white border border-[#D6D3CD] focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C] rounded-lg pl-3 pr-16 py-2 text-sm font-mono text-[#1A1918] outline-hidden"
                      />
                      <div className="absolute right-1 flex items-center gap-0.5">
                        <button
                          type="button"
                          onClick={() => handleStep('wallCount', -1, 1, 50)}
                          className="w-6 h-6 rounded bg-[#F1EFEA] hover:bg-[#E5E3DD] text-[#54524D] flex items-center justify-center cursor-pointer text-xs"
                          aria-label="Decrease wall count"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStep('wallCount', 1, 1, 50)}
                          className="w-6 h-6 rounded bg-[#F1EFEA] hover:bg-[#E5E3DD] text-[#54524D] flex items-center justify-center cursor-pointer text-xs"
                          aria-label="Increase wall count"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <p className="text-[11px] font-mono text-[#73716B] mt-1">Standard room = 4 walls</p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs font-mono text-[#73716B] border-t border-[#EAE8E1]/80">
                  <span>Gross span: {inputs.wallWidth}m × {inputs.wallHeight}m × {inputs.wallCount} walls</span>
                  <span className="font-semibold text-[#1A1918]">
                    Gross Area: {result.totalWallArea.toFixed(2)} m²
                  </span>
                </div>
              </div>
            )}

            {/* HOMEOWNER ENHANCEMENT: Optional Ceiling Calculation Toggle */}
            <div className="mt-4 pt-4 border-t border-[#EAE8E1]">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inputs.includeCeiling}
                    onChange={(e) => handleChange('includeCeiling', e.target.checked)}
                    className="w-4 h-4 rounded border-[#D6D3CD] text-[#C2410C] focus:ring-[#C2410C] cursor-pointer"
                  />
                  <div>
                    <span className="text-xs font-semibold text-[#1A1918]">
                      Include Ceiling Painting in Estimate
                    </span>
                    <span className="block text-[11px] text-[#73716B]">
                      Adds overhead surface area ({result.ceilingArea.toFixed(1)} m²) to the project calculation
                    </span>
                  </div>
                </label>

                {inputs.includeCeiling && (
                  <div className="flex items-center gap-2 bg-white px-2.5 py-1 rounded-md border border-[#D6D3CD]">
                    <span className="text-[11px] font-mono text-[#54524D]">Ceiling Coats:</span>
                    {[1, 2].map((coat) => (
                      <button
                        key={coat}
                        type="button"
                        onClick={() => handleChange('ceilingCoats', coat)}
                        className={`px-2 py-0.5 text-xs font-mono rounded cursor-pointer ${
                          inputs.ceilingCoats === coat
                            ? 'bg-[#1A1918] text-white font-bold'
                            : 'bg-[#F1EFEA] text-[#54524D]'
                        }`}
                      >
                        {coat}×
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SECTION 2: OPENINGS (DOORS & WINDOWS) */}
          <div className="bg-[#FAF9F5] border border-[#E5E3DD] rounded-xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#EAE8E1]">
              <div className="flex items-center gap-2">
                <DoorOpen className="w-4 h-4 text-[#C2410C]" />
                <h2 className="font-mono text-xs uppercase tracking-wider font-bold text-[#1A1918]">
                  2. EXCLUDED OPENINGS
                </h2>
              </div>
              <span className="text-[11px] font-mono text-[#C2410C] font-semibold">
                Total Cutout: −{result.excludedArea.toFixed(2)} m²
              </span>
            </div>

            {/* Doors Subgroup */}
            <div className="mb-5 pb-5 border-b border-[#EAE8E1]/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[#1A1918] uppercase font-mono">
                  Doors (Standard internal ~0.9 × 2.1m)
                </span>
                <span className="text-[11px] font-mono text-[#73716B]">
                  Subtotal: {result.doorArea.toFixed(2)} m²
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label htmlFor="input-door-count" className="block text-[11px] text-[#54524D] mb-1">
                    Door Quantity
                  </label>
                  <div className="relative flex items-center">
                    <input
                      id="input-door-count"
                      type="number"
                      min="0"
                      max="20"
                      step="1"
                      value={inputs.doorCount}
                      onChange={(e) => handleChange('doorCount', parseInt(e.target.value, 10))}
                      className="w-full bg-white border border-[#D6D3CD] focus:border-[#C2410C] rounded px-3 py-1.5 text-xs font-mono text-[#1A1918]"
                    />
                    <div className="absolute right-1 flex items-center gap-0.5">
                      <button
                        type="button"
                        onClick={() => handleStep('doorCount', -1, 0, 20)}
                        className="w-5 h-5 rounded bg-[#F1EFEA] text-[#54524D] flex items-center justify-center cursor-pointer"
                        aria-label="Decrease door count"
                      >
                        <Minus className="w-2.5 h-2.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStep('doorCount', 1, 0, 20)}
                        className="w-5 h-5 rounded bg-[#F1EFEA] text-[#54524D] flex items-center justify-center cursor-pointer"
                        aria-label="Increase door count"
                      >
                        <Plus className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="input-door-width" className="block text-[11px] text-[#54524D] mb-1">
                    Door Width (m)
                  </label>
                  <input
                    id="input-door-width"
                    type="number"
                    min="0"
                    max="10"
                    step="0.05"
                    disabled={inputs.doorCount === 0}
                    value={inputs.doorWidth || ''}
                    onChange={(e) => handleChange('doorWidth', parseFloat(e.target.value))}
                    className="w-full bg-white border border-[#D6D3CD] focus:border-[#C2410C] rounded px-3 py-1.5 text-xs font-mono text-[#1A1918] disabled:bg-stone-100"
                  />
                </div>

                <div>
                  <label htmlFor="input-door-height" className="block text-[11px] text-[#54524D] mb-1">
                    Door Height (m)
                  </label>
                  <input
                    id="input-door-height"
                    type="number"
                    min="0"
                    max="10"
                    step="0.05"
                    disabled={inputs.doorCount === 0}
                    value={inputs.doorHeight || ''}
                    onChange={(e) => handleChange('doorHeight', parseFloat(e.target.value))}
                    className="w-full bg-white border border-[#D6D3CD] focus:border-[#C2410C] rounded px-3 py-1.5 text-xs font-mono text-[#1A1918] disabled:bg-stone-100"
                  />
                </div>
              </div>
            </div>

            {/* Windows Subgroup */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[#1A1918] uppercase font-mono">
                  Windows (Standard ~1.2 × 1.2m)
                </span>
                <span className="text-[11px] font-mono text-[#73716B]">
                  Subtotal: {result.windowArea.toFixed(2)} m²
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label htmlFor="input-window-count" className="block text-[11px] text-[#54524D] mb-1">
                    Window Quantity
                  </label>
                  <div className="relative flex items-center">
                    <input
                      id="input-window-count"
                      type="number"
                      min="0"
                      max="30"
                      step="1"
                      value={inputs.windowCount}
                      onChange={(e) => handleChange('windowCount', parseInt(e.target.value, 10))}
                      className="w-full bg-white border border-[#D6D3CD] focus:border-[#C2410C] rounded px-3 py-1.5 text-xs font-mono text-[#1A1918]"
                    />
                    <div className="absolute right-1 flex items-center gap-0.5">
                      <button
                        type="button"
                        onClick={() => handleStep('windowCount', -1, 0, 30)}
                        className="w-5 h-5 rounded bg-[#F1EFEA] text-[#54524D] flex items-center justify-center cursor-pointer"
                        aria-label="Decrease window count"
                      >
                        <Minus className="w-2.5 h-2.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStep('windowCount', 1, 0, 30)}
                        className="w-5 h-5 rounded bg-[#F1EFEA] text-[#54524D] flex items-center justify-center cursor-pointer"
                        aria-label="Increase window count"
                      >
                        <Plus className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="input-window-width" className="block text-[11px] text-[#54524D] mb-1">
                    Window Width (m)
                  </label>
                  <input
                    id="input-window-width"
                    type="number"
                    min="0"
                    max="15"
                    step="0.05"
                    disabled={inputs.windowCount === 0}
                    value={inputs.windowWidth || ''}
                    onChange={(e) => handleChange('windowWidth', parseFloat(e.target.value))}
                    className="w-full bg-white border border-[#D6D3CD] focus:border-[#C2410C] rounded px-3 py-1.5 text-xs font-mono text-[#1A1918] disabled:bg-stone-100"
                  />
                </div>

                <div>
                  <label htmlFor="input-window-height" className="block text-[11px] text-[#54524D] mb-1">
                    Window Height (m)
                  </label>
                  <input
                    id="input-window-height"
                    type="number"
                    min="0"
                    max="15"
                    step="0.05"
                    disabled={inputs.windowCount === 0}
                    value={inputs.windowHeight || ''}
                    onChange={(e) => handleChange('windowHeight', parseFloat(e.target.value))}
                    className="w-full bg-white border border-[#D6D3CD] focus:border-[#C2410C] rounded px-3 py-1.5 text-xs font-mono text-[#1A1918] disabled:bg-stone-100"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: PAINT & APPLICATION SETTINGS */}
          <div className="bg-[#FAF9F5] border border-[#E5E3DD] rounded-xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#EAE8E1]">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-[#C2410C]" />
                <h2 className="font-mono text-xs uppercase tracking-wider font-bold text-[#1A1918]">
                  3. PAINT FORMULATION & FINISH
                </h2>
              </div>
              <span className="text-[11px] font-mono text-[#73716B]">
                Fluid mechanics & spread rate
              </span>
            </div>

            {/* Quick Paint Finish Presets Selector */}
            <div className="mb-5 pb-4 border-b border-[#EAE8E1]/80">
              <label htmlFor="finish-selector" className="block text-xs font-semibold text-[#1A1918] mb-1.5">
                Select Paint Type / Finish (Auto-sets Spread Rate)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {PAINT_FINISH_PRESETS.slice(0, 3).map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleChange('paintCoverage', preset.coverage)}
                    className={`p-2 rounded-lg text-left border transition-all cursor-pointer ${
                      inputs.paintCoverage === preset.coverage
                        ? 'border-[#C2410C] bg-[#FFF5EB] ring-1 ring-[#C2410C]'
                        : 'border-[#D6D3CD] bg-white hover:border-[#1A1918]'
                    }`}
                  >
                    <div className="text-xs font-semibold text-[#1A1918]">{preset.name}</div>
                    <div className="text-[11px] font-mono text-[#C2410C]">{preset.coverage} m²/L</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* Number of Coats */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="input-coats" className="text-xs font-semibold text-[#1A1918]">
                    Number of Coats
                  </label>
                  <span className="text-[10px] font-mono text-[#C2410C] font-semibold">
                    {inputs.coats}× coats
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => handleChange('coats', num)}
                      className={`flex-1 py-1.5 text-xs font-mono rounded border transition-colors cursor-pointer ${
                        inputs.coats === num
                          ? 'bg-[#1A1918] text-white border-[#1A1918] font-bold'
                          : 'bg-white text-[#54524D] border-[#D6D3CD] hover:border-[#1A1918]'
                      }`}
                    >
                      {num} {num === 1 ? 'Coat' : 'Coats'}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-[#73716B] mt-1.5">
                  2 coats standard for even opacity
                </p>
              </div>

              {/* Paint Coverage (m²/L) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="input-coverage" className="text-xs font-semibold text-[#1A1918]">
                    Spread Rate (m²/L)
                  </label>
                  <span className="text-[10px] font-mono text-[#73716B]">
                    Current: {inputs.paintCoverage}
                  </span>
                </div>
                <div className="relative">
                  <input
                    id="input-coverage"
                    type="number"
                    min="1"
                    max="25"
                    step="0.5"
                    value={inputs.paintCoverage || ''}
                    onChange={(e) => handleChange('paintCoverage', parseFloat(e.target.value))}
                    className="w-full bg-white border border-[#D6D3CD] focus:border-[#C2410C] rounded px-3 py-1.5 text-xs font-mono text-[#1A1918]"
                  />
                  <span className="absolute right-3 top-1.5 text-xs font-mono text-[#73716B] pointer-events-none">
                    m²/L
                  </span>
                </div>
                <div className="flex gap-1 mt-1.5">
                  {[8, 10, 12].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handleChange('paintCoverage', val)}
                      className={`px-1.5 py-0.5 text-[10px] font-mono rounded cursor-pointer ${
                        inputs.paintCoverage === val
                          ? 'bg-[#1A1918] text-white'
                          : 'bg-[#EAE8E1] hover:bg-[#D6D3CD] text-[#54524D]'
                      }`}
                    >
                      {val} m²
                    </button>
                  ))}
                </div>
              </div>

              {/* Waste Allowance */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="input-waste" className="text-xs font-semibold text-[#1A1918]">
                    Waste Allowance
                  </label>
                  <span className="text-[10px] font-mono text-[#C2410C] font-semibold">
                    +{inputs.wasteAllowance}%
                  </span>
                </div>
                <div className="relative">
                  <input
                    id="input-waste"
                    type="number"
                    min="0"
                    max="50"
                    step="1"
                    value={inputs.wasteAllowance}
                    onChange={(e) => handleChange('wasteAllowance', parseFloat(e.target.value))}
                    className="w-full bg-white border border-[#D6D3CD] focus:border-[#C2410C] rounded px-3 py-1.5 text-xs font-mono text-[#1A1918]"
                  />
                  <span className="absolute right-3 top-1.5 text-xs font-mono text-[#73716B] pointer-events-none">
                    %
                  </span>
                </div>
                <div className="flex gap-1 mt-1.5">
                  {[5, 10, 15].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handleChange('wasteAllowance', val)}
                      className={`px-1.5 py-0.5 text-[10px] font-mono rounded cursor-pointer ${
                        inputs.wasteAllowance === val
                          ? 'bg-[#1A1918] text-white'
                          : 'bg-[#EAE8E1] hover:bg-[#D6D3CD] text-[#54524D]'
                      }`}
                    >
                      +{val}%
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ARCHITECTURAL COLOR SWATCHES SELECTOR */}
            <div className="mt-5 pt-4 border-t border-[#EAE8E1]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[#1A1918]">
                  Architectural Tone / Palette Preview
                </span>
                <span className="text-[11px] font-mono text-[#73716B]">
                  Selected: {inputs.wallColorName}
                </span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {ARCHITECTURAL_SWATCHES.map((swatch) => (
                  <button
                    key={swatch.name}
                    type="button"
                    onClick={() => {
                      handleChange('wallColorHex', swatch.hex);
                      handleChange('wallColorName', swatch.name);
                    }}
                    className={`flex flex-col items-center p-2 rounded-lg border transition-all cursor-pointer ${
                      inputs.wallColorHex === swatch.hex
                        ? 'border-[#1A1918] ring-2 ring-[#C2410C]/30 bg-white shadow-xs'
                        : 'border-[#E5E3DD] bg-[#FAF9F5] hover:border-[#A8A29E]'
                    }`}
                  >
                    <span
                      className="w-6 h-6 rounded-full border border-black/20 shadow-2xs mb-1"
                      style={{ backgroundColor: swatch.hex }}
                    />
                    <span className="text-[10px] font-medium text-[#1A1918] truncate w-full text-center">
                      {swatch.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* OPTIONAL BUDGET / COST ESTIMATOR */}
            <div className="mt-4 pt-4 border-t border-[#EAE8E1]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-[#C2410C]" />
                  <div>
                    <span className="text-xs font-semibold text-[#1A1918]">
                      Optional: Estimate Paint Cost
                    </span>
                    <span className="block text-[11px] text-[#73716B]">
                      Enter average retail price per litre to budget your purchase
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative w-28">
                    <input
                      type="number"
                      min="0"
                      max="500"
                      step="1"
                      placeholder="e.g. 18"
                      value={inputs.costPerLitre || ''}
                      onChange={(e) => handleChange('costPerLitre', parseFloat(e.target.value))}
                      className="w-full bg-white border border-[#D6D3CD] focus:border-[#C2410C] rounded px-3 py-1.5 text-xs font-mono text-[#1A1918] pl-6"
                      aria-label="Price per litre in your currency"
                    />
                    <span className="absolute left-2.5 top-1.5 text-xs font-mono text-[#73716B]">$</span>
                  </div>
                  <span className="text-xs font-mono text-[#73716B]">/ L</span>
                </div>
              </div>
            </div>
          </div>

          {/* WALL SCHEMATIC VISUALIZER */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs uppercase tracking-wider font-bold text-[#1A1918]">
                ARCHITECTURAL WALL SCHEMATIC
              </span>
              <span className="text-[11px] font-mono text-[#73716B]">
                Proportional live rendering
              </span>
            </div>
            <WallVisualizer inputs={inputs} result={result} />
          </div>
        </div>

        {/* RIGHT COLUMN: Results Workspace (5 cols sticky) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <ResultPanel inputs={inputs} result={result} />
        </div>
      </div>

      {/* DOCKED MOBILE SUMMARY BAR (for seamless mobile usability) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#1A1918] text-[#F8F7F4] border-t border-[#383531] px-4 py-3 shadow-2xl flex items-center justify-between">
        <div>
          <div className="text-[10px] font-mono text-[#A8A29E] uppercase tracking-wider">
            Required Volume
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-serif font-bold text-white">
              {(inputs.includeCeiling ? result.totalCombinedPaintRequired : result.finalPaintRequired).toFixed(1)}L
            </span>
            <span className="text-xs font-mono text-[#C2410C]">
              ({(inputs.includeCeiling ? result.totalCombinedRecommendedLitres : result.recommendedLitres).toFixed(1)}L recommended)
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={scrollToResults}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
        >
          <span>View Specs</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
}
