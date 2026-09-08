export type MeasurementMode = 'room' | 'walls';

export interface PaintInputs {
  mode: MeasurementMode;
  // Room mode dimensions
  roomLength: number; // in meters
  roomWidth: number; // in meters
  ceilingHeight: number; // in meters
  // Walls mode dimensions
  wallWidth: number; // in meters
  wallHeight: number; // in meters
  wallCount: number;
  // Openings
  doorCount: number;
  doorWidth: number; // in meters
  doorHeight: number; // in meters
  windowCount: number;
  windowWidth: number; // in meters
  windowHeight: number; // in meters
  // Paint settings
  coats: number;
  paintCoverage: number; // m²/L
  wasteAllowance: number; // percentage, e.g. 10
  // Homeowner enhancements
  includeCeiling: boolean;
  ceilingCoats: number;
  wallColorHex: string;
  wallColorName: string;
  costPerLitre: number; // 0 if not calculated
}

export interface PaintCalculationResult {
  totalWallArea: number;
  ceilingArea: number;
  doorArea: number;
  windowArea: number;
  excludedArea: number;
  paintableArea: number;
  totalCoverageRequired: number;
  basePaintRequired: number;
  wastePaintRequired: number;
  finalPaintRequired: number;
  recommendedLitres: number;
  // Separate ceiling breakdown if included
  ceilingCoverageRequired: number;
  ceilingPaintRequired: number;
  totalCombinedPaintRequired: number;
  totalCombinedRecommendedLitres: number;
  canBreakdown: {
    cans10L: number;
    cans5L: number;
    cans2_5L: number;
    cans1L: number;
  };
  estimatedTotalCost: number;
  hasExcessiveOpenings: boolean;
}

export interface PresetExample {
  id: string;
  name: string;
  description: string;
  values: PaintInputs;
}

export interface ColorSwatch {
  name: string;
  hex: string;
  textColor: string;
  category: string;
}

