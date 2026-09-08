import { PaintInputs, PaintCalculationResult, PresetExample, ColorSwatch } from '../types';

export const ARCHITECTURAL_SWATCHES: ColorSwatch[] = [
  { name: 'Chalk Mineral', hex: '#EAE6DF', textColor: '#1A1918', category: 'Neutral' },
  { name: 'Warm Terracotta', hex: '#C2410C', textColor: '#FFFFFF', category: 'Accent' },
  { name: 'Architectural Charcoal', hex: '#2B2A27', textColor: '#FFFFFF', category: 'Deep' },
  { name: 'Mineral Sage', hex: '#7E8F7C', textColor: '#FFFFFF', category: 'Botanical' },
  { name: 'Raw Ochre Clay', hex: '#C48A45', textColor: '#FFFFFF', category: 'Earth' },
  { name: 'Nordic Slate', hex: '#63707E', textColor: '#FFFFFF', category: 'Cool' },
];

export const PAINT_FINISH_PRESETS = [
  { id: 'vinyl-matt', name: 'Vinyl Matt (Standard Interior)', coverage: 12, description: 'Smooth, non-reflective finish for living rooms and bedrooms.' },
  { id: 'eggshell-satin', name: 'Eggshell / Satin', coverage: 10, description: 'Subtle sheen, durable and wipeable for hallways and kitchens.' },
  { id: 'silk-gloss', name: 'Silk / Soft Gloss', coverage: 11, description: 'Mid-to-high sheen finish for trim, doors, and moisture-prone walls.' },
  { id: 'porous-plaster', name: 'Fresh / Porous Plaster', coverage: 8, description: 'High absorption surfaces or unprimed dry lining.' },
  { id: 'exterior-masonry', name: 'Exterior Masonry', coverage: 6.5, description: 'Heavy weather-resistant textured paint for brick and render.' },
];

export const DEFAULT_PAINT_INPUTS: PaintInputs = {
  mode: 'room',
  roomLength: 5.0,
  roomWidth: 4.0,
  ceilingHeight: 2.8,
  wallWidth: 5.0,
  wallHeight: 2.8,
  wallCount: 4,
  doorCount: 1,
  doorWidth: 0.9,
  doorHeight: 2.1,
  windowCount: 2,
  windowWidth: 1.2,
  windowHeight: 1.2,
  coats: 2,
  paintCoverage: 11,
  wasteAllowance: 10,
  includeCeiling: false,
  ceilingCoats: 2,
  wallColorHex: '#EAE6DF',
  wallColorName: 'Chalk Mineral',
  costPerLitre: 0,
};

export const PRESET_EXAMPLES: PresetExample[] = [
  {
    id: 'standard-bedroom',
    name: 'Standard Bedroom (Room Mode)',
    description: '5.0m × 4.0m × 2.8m high, 1 door, 2 windows, 2 coats',
    values: { ...DEFAULT_PAINT_INPUTS },
  },
  {
    id: 'compact-studio',
    name: 'Small Studio / Office',
    description: '3.6m × 3.0m × 2.6m high, 1 door, 1 window, 2 coats',
    values: {
      mode: 'room',
      roomLength: 3.6,
      roomWidth: 3.0,
      ceilingHeight: 2.6,
      wallWidth: 3.6,
      wallHeight: 2.6,
      wallCount: 4,
      doorCount: 1,
      doorWidth: 0.85,
      doorHeight: 2.05,
      windowCount: 1,
      windowWidth: 1.0,
      windowHeight: 1.2,
      coats: 2,
      paintCoverage: 12,
      wasteAllowance: 10,
      includeCeiling: false,
      ceilingCoats: 2,
      wallColorHex: '#EAE6DF',
      wallColorName: 'Chalk Mineral',
      costPerLitre: 0,
    },
  },
  {
    id: 'living-room',
    name: 'Spacious Living Room',
    description: '6.5m × 4.5m × 3.0m high, 2 doors, 3 large windows, 2 coats',
    values: {
      mode: 'room',
      roomLength: 6.5,
      roomWidth: 4.5,
      ceilingHeight: 3.0,
      wallWidth: 6.5,
      wallHeight: 3.0,
      wallCount: 4,
      doorCount: 2,
      doorWidth: 1.2,
      doorHeight: 2.2,
      windowCount: 3,
      windowWidth: 1.6,
      windowHeight: 1.5,
      coats: 2,
      paintCoverage: 11,
      wasteAllowance: 10,
      includeCeiling: true,
      ceilingCoats: 2,
      wallColorHex: '#7E8F7C',
      wallColorName: 'Mineral Sage',
      costPerLitre: 18,
    },
  },
  {
    id: 'accent-feature-wall',
    name: 'Single Accent Wall (Span Mode)',
    description: '1 solid feature wall (4.2m × 2.8m), no openings, 2 saturated coats',
    values: {
      mode: 'walls',
      roomLength: 4.2,
      roomWidth: 3.0,
      ceilingHeight: 2.8,
      wallWidth: 4.2,
      wallHeight: 2.8,
      wallCount: 1,
      doorCount: 0,
      doorWidth: 0,
      doorHeight: 0,
      windowCount: 0,
      windowWidth: 0,
      windowHeight: 0,
      coats: 2,
      paintCoverage: 10,
      wasteAllowance: 5,
      includeCeiling: false,
      ceilingCoats: 2,
      wallColorHex: '#C2410C',
      wallColorName: 'Warm Terracotta',
      costPerLitre: 22,
    },
  },
];

/**
 * Calculates paint requirements with strict sanitization and edge-case guards.
 */
export function calculatePaint(inputs: PaintInputs): PaintCalculationResult {
  const mode = inputs.mode || 'room';

  // Room mode dimensions
  const roomLength = Math.max(0, Number(inputs.roomLength) || 0);
  const roomWidth = Math.max(0, Number(inputs.roomWidth) || 0);
  const ceilingHeight = Math.max(0, Number(inputs.ceilingHeight) || 0);

  // Walls mode dimensions
  const wallWidth = Math.max(0, Number(inputs.wallWidth) || 0);
  const wallHeight = Math.max(0, Number(inputs.wallHeight) || 0);
  const wallCount = Math.max(0, Math.floor(Number(inputs.wallCount) || 0));

  // Openings
  const doorCount = Math.max(0, Math.floor(Number(inputs.doorCount) || 0));
  const doorWidth = Math.max(0, Number(inputs.doorWidth) || 0);
  const doorHeight = Math.max(0, Number(inputs.doorHeight) || 0);

  const windowCount = Math.max(0, Math.floor(Number(inputs.windowCount) || 0));
  const windowWidth = Math.max(0, Number(inputs.windowWidth) || 0);
  const windowHeight = Math.max(0, Number(inputs.windowHeight) || 0);

  const coats = Math.max(1, Math.floor(Number(inputs.coats) || 1));
  const paintCoverage = Math.max(0.1, Number(inputs.paintCoverage) || 11);
  const wasteAllowance = Math.max(0, Number(inputs.wasteAllowance) || 0);
  const costPerLitre = Math.max(0, Number(inputs.costPerLitre) || 0);

  // Calculate gross wall area based on mode
  let totalWallArea = 0;
  let ceilingArea = 0;

  if (mode === 'room') {
    // 4 walls perimeter: 2 * (Length + Width) * Height
    totalWallArea = 2 * (roomLength + roomWidth) * ceilingHeight;
    ceilingArea = roomLength * roomWidth;
  } else {
    totalWallArea = wallWidth * wallHeight * wallCount;
    ceilingArea = wallWidth * (wallWidth * 0.8); // approximate if ceiling checked
  }

  // Openings deduction
  const doorArea = doorCount * doorWidth * doorHeight;
  const windowArea = windowCount * windowWidth * windowHeight;
  const excludedArea = doorArea + windowArea;

  const hasExcessiveOpenings = excludedArea > totalWallArea && totalWallArea > 0;
  const paintableArea = Math.max(0, totalWallArea - excludedArea);

  // Wall paint calculations
  const totalCoverageRequired = paintableArea * coats;
  const basePaintRequired = totalCoverageRequired / paintCoverage;
  const finalPaintRequired = basePaintRequired * (1 + wasteAllowance / 100);
  const wastePaintRequired = finalPaintRequired - basePaintRequired;

  // Recommended wall purchase: rounded up to nearest 0.5L
  const recommendedLitres = finalPaintRequired > 0 
    ? Math.ceil(finalPaintRequired * 2) / 2 
    : 0;

  // Ceiling calculations
  const includeCeiling = Boolean(inputs.includeCeiling);
  const ceilingCoats = Math.max(1, Math.floor(Number(inputs.ceilingCoats) || 2));
  let ceilingCoverageRequired = 0;
  let ceilingPaintRequired = 0;

  if (includeCeiling && ceilingArea > 0) {
    ceilingCoverageRequired = ceilingArea * ceilingCoats;
    ceilingPaintRequired = (ceilingCoverageRequired / paintCoverage) * (1 + wasteAllowance / 100);
  }

  const totalCombinedPaintRequired = finalPaintRequired + ceilingPaintRequired;
  const totalCombinedRecommendedLitres = totalCombinedPaintRequired > 0
    ? Math.ceil(totalCombinedPaintRequired * 2) / 2
    : 0;

  // Retail can distribution for total recommended litres
  const canBreakdown = computeCanBreakdown(totalCombinedRecommendedLitres);

  // Estimated cost
  const estimatedTotalCost = costPerLitre > 0
    ? Math.round(totalCombinedRecommendedLitres * costPerLitre * 100) / 100
    : 0;

  return {
    totalWallArea,
    ceilingArea,
    doorArea,
    windowArea,
    excludedArea,
    paintableArea,
    totalCoverageRequired,
    basePaintRequired,
    wastePaintRequired,
    finalPaintRequired,
    recommendedLitres,
    ceilingCoverageRequired,
    ceilingPaintRequired,
    totalCombinedPaintRequired,
    totalCombinedRecommendedLitres,
    canBreakdown,
    estimatedTotalCost,
    hasExcessiveOpenings,
  };
}

/**
 * Computes optimal retail paint can distribution (10L, 5L, 2.5L, 1L)
 */
export function computeCanBreakdown(totalLitres: number) {
  let remaining = totalLitres;
  const cans10L = Math.floor(remaining / 10);
  remaining -= cans10L * 10;

  const cans5L = Math.floor(remaining / 5);
  remaining -= cans5L * 5;

  const cans2_5L = Math.floor(remaining / 2.5);
  remaining -= cans2_5L * 2.5;

  const cans1L = remaining > 0 ? Math.ceil(remaining) : 0;

  return { cans10L, cans5L, cans2_5L, cans1L };
}

