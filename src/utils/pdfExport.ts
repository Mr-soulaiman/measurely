import { jsPDF } from 'jspdf';

// High-contrast, saturated Measurely palette
const COLOR_PRIMARY_NAVY = [14, 38, 70] as const; // #0E2646 - deep navy for headings
const COLOR_RESULT_BLUE = [10, 68, 125] as const; // #0A447D - strong Measurely blue for primary figures
const COLOR_DARK_TEXT = [18, 22, 28] as const; // #12161C - dark charcoal for values
const COLOR_LABEL_NAVY = [50, 70, 95] as const; // #32465F - medium-dark blue for secondary labels
const COLOR_CARD_BG = [245, 248, 252] as const; // #F5F8FC - soft background for result & input cards
const COLOR_CARD_BORDER = [210, 222, 235] as const; // #D2DEEB - clean subtle card border
const COLOR_BUY_BG = [237, 245, 253] as const; // #EDF5FD - soft blue tint for "What to buy"
const COLOR_BUY_BORDER = [139, 182, 224] as const; // #8BB6E0 - accent border for "What to buy"
const COLOR_SUMMARY_BG = [250, 252, 254] as const; // #FAFCFE - calculation summary container
const COLOR_ROW_DIVIDER = [234, 240, 246] as const; // #EAF0F6 - divider between summary rows
const COLOR_BORDER = [210, 222, 235] as const; // #D2DEEB - divider lines
const COLOR_WHITE = [255, 255, 255] as const;

// Cache loaded logo
let cachedLogoBase64: string | null = null;

async function getLogoBase64(): Promise<string | null> {
  if (cachedLogoBase64) return cachedLogoBase64;
  try {
    if (typeof window === 'undefined') {
      try {
        const fs = await import('fs');
        const path = await import('path');
        const filePath = path.join(process.cwd(), 'public', 'assets', 'measurely-logo.png');
        if (fs.existsSync(filePath)) {
          const buffer = fs.readFileSync(filePath);
          cachedLogoBase64 = `data:image/png;base64,${buffer.toString('base64')}`;
          return cachedLogoBase64;
        }
      } catch {
        return null;
      }
      return null;
    }
    const res = await fetch('/assets/measurely-logo.png');
    if (!res.ok) return null;
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        cachedLogoBase64 = reader.result as string;
        resolve(cachedLogoBase64);
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    console.warn('Unable to load Measurely logo for PDF export', e);
    return null;
  }
}

export interface PaintPdfData {
  unitSystem: 'metric' | 'us';
  measureMethod: 'room' | 'area';
  roomLength?: string;
  roomWidth?: string;
  wallHeight?: string;
  directWallArea?: string;
  coats: string;
  coverage: string;
  includeCeiling: boolean;
  ceilingArea?: string;
  doorCount: string;
  doorWidth?: string;
  doorHeight?: string;
  windowCount: string;
  windowWidth?: string;
  windowHeight?: string;
  wasteAllowance: string;
  result: {
    recommendedPurchase: number;
    exactVolume: number;
    baseVolume: number;
    extraVolume: number;
    wastePercentage: number;
    unitLabel: string;
    unitShort: string;
    areaUnit: string;
    lenUnit: string;
    roomPerimeter: number | null;
    totalWallArea: number;
    ceilingArea: number;
    doorArea: number;
    windowArea: number;
    paintableArea: number;
  };
}

export interface BulkMaterialPdfData {
  toolName?: 'Gravel Calculator' | 'Sand Calculator' | 'Mulch Calculator' | 'Topsoil Calculator' | 'Concrete Calculator' | string;
  materialType: 'gravel' | 'sand' | 'mulch' | 'topsoil' | 'concrete';
  unitSystem: 'metric' | 'us';
  method: 'rectangle' | 'circle' | 'custom';
  length?: string;
  width?: string;
  diameter?: string;
  customArea?: string;
  depth: string;
  extraPercent: string;
  result: {
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
    baseWeight?: number;
    recommendedWeight?: number;
    weightUnit?: 'tonnes' | 'tons';
    baseWeightDisplay?: string;
    recommendedWeightDisplay?: string;
  };
}

export interface FlooringPdfData {
  unitSystem: 'metric' | 'us';
  method: 'rectangle' | 'circle' | 'custom';
  length?: string;
  width?: string;
  diameter?: string;
  customArea?: string;
  extraPercent: string;
  result: {
    floorArea: number;
    extraArea: number;
    recommendedArea: number;
    extraPercent: number;
    lenUnit: 'm' | 'ft';
    areaUnit: 'm²' | 'sq ft';
  };
}

export interface TilePdfData {
  unitSystem: 'metric' | 'us';
  method: 'rectangle' | 'circle' | 'custom';
  length?: string;
  width?: string;
  diameter?: string;
  customArea?: string;
  tileLength: string;
  tileWidth: string;
  extraPercent: string;
  result: {
    area: number;
    singleTileArea: number;
    tilesNeeded: number;
    recommendedTiles: number;
    extraTiles: number;
    extraPercent: number;
    lenUnit: 'm' | 'ft';
    areaUnit: 'm²' | 'sq ft';
    tileDimUnit: 'cm' | 'in';
  };
}

export interface DrywallPdfData {
  unitSystem: 'metric' | 'us';
  areaType: 'rectangle' | 'custom';
  length?: string;
  width?: string;
  customArea?: string;
  sheetLength: string;
  sheetWidth: string;
  extraPercent: string;
  result: {
    totalArea: number;
    singleSheetArea: number;
    areaWithWaste: number;
    baseSheets: number;
    recommendedSheets: number;
    extraSheets: number;
    extraPercent: number;
    lenUnit: 'm' | 'ft';
    areaUnit: 'm²' | 'sq ft';
  };
}

export interface PaverPdfData {
  unitSystem: 'metric' | 'us';
  areaType: 'rectangle' | 'circle' | 'custom';
  length?: string;
  width?: string;
  diameter?: string;
  customArea?: string;
  paverLength: string;
  paverWidth: string;
  extraPercent: string;
  result: {
    totalArea: number;
    areaWithExtra: number;
    singlePaverArea: number;
    paversNeeded: number;
    recommendedPavers: number;
    extraPavers: number;
    extraPercent: number;
    lenUnit: 'm' | 'ft';
    areaUnit: 'm²' | 'sq ft';
    paverDimUnit: 'cm' | 'in';
  };
}

export interface SodPdfData {
  unitSystem: 'metric' | 'us';
  areaType: 'rectangle' | 'circle' | 'custom';
  length?: string;
  width?: string;
  diameter?: string;
  customArea?: string;
  extraPercent: string;
  result: {
    totalArea: number;
    extraArea: number;
    recommendedArea: number;
    extraPercent: number;
    lenUnit: 'm' | 'ft';
    areaUnit: 'm²' | 'sq ft';
  };
}

export interface RoofingPdfData {
  unitSystem: 'metric' | 'us';
  areaType: 'rectangle' | 'custom';
  length?: string;
  width?: string;
  customArea?: string;
  extraPercent: string;
  result: {
    roofArea: number;
    extraArea: number;
    recommendedArea: number;
    extraPercent: number;
    lenUnit: 'm' | 'ft';
    areaUnit: 'm²' | 'sq ft';
  };
}

export interface FencePdfData {
  unitSystem: 'metric' | 'us';
  length: string;
  height: string;
  extraPercent: string;
  result: {
    fenceArea: number;
    extraArea: number;
    recommendedArea: number;
    extraPercent: number;
    lenUnit: 'm' | 'ft';
    areaUnit: 'm²' | 'sq ft';
  };
}

function formatDate(date: Date): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

// Exactly matches website volume formatting
function formatVolumeDisplay(val: number): string {
  if (val <= 0 || isNaN(val)) return '0';
  const rounded = Math.round(val * 100) / 100;
  return rounded % 1 === 0 ? rounded.toFixed(1) : rounded.toString();
}

// Exactly matches website weight formatting
function formatWeightDisplay(val: number): string {
  if (val <= 0 || isNaN(val)) return '0';
  const rounded = Math.round(val * 10) / 10;
  return rounded % 1 === 0 ? rounded.toFixed(1) : rounded.toString();
}

// Exactly matches website area formatting
function formatAreaDisplay(val: number): string {
  if (val <= 0 || isNaN(val)) return '0';
  const rounded = Math.round(val * 100) / 100;
  return rounded.toString();
}

/**
 * 1. HEADER
 * Shows Measurely logo, calculator title (24pt), "Calculation report · <Date>" (10pt).
 */
async function drawPdfHeader(doc: jsPDF, calculatorName: string): Promise<number> {
  const logoData = await getLogoBase64();
  const leftX = 20;
  const rightX = 190;
  const headerY = 16;

  if (logoData) {
    // Aspect ratio: ~4.3745
    const logoW = 44;
    const logoH = logoW / 4.3745; // ~10.06mm
    try {
      doc.addImage(logoData, 'PNG', leftX, headerY, logoW, logoH);
    } catch {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.setTextColor(...COLOR_PRIMARY_NAVY);
      doc.text('Measurely', leftX, headerY + 8);
    }
  } else {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(...COLOR_PRIMARY_NAVY);
    doc.text('Measurely', leftX, headerY + 8);
  }

  // Right-aligned header info
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(...COLOR_PRIMARY_NAVY);
  doc.text(calculatorName, rightX, headerY + 6.5, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...COLOR_LABEL_NAVY);
  doc.text(`Calculation report  ·  ${formatDate(new Date())}`, rightX, headerY + 12.5, { align: 'right' });

  // Divider line
  const dividerY = headerY + 18;
  doc.setDrawColor(...COLOR_BORDER);
  doc.setLineWidth(0.35);
  doc.line(leftX, dividerY, rightX, dividerY);

  return dividerY + 7;
}

/**
 * 5. FOOTER
 * Simple, readable footer.
 */
function drawPdfFooter(doc: jsPDF): void {
  const leftX = 20;
  const rightX = 190;
  const footerY = 282;

  doc.setDrawColor(...COLOR_BORDER);
  doc.setLineWidth(0.35);
  doc.line(leftX, footerY, rightX, footerY);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...COLOR_PRIMARY_NAVY);
  doc.text('Calculated with Measurely', leftX, footerY + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...COLOR_LABEL_NAVY);
  doc.text('•  Measure. Calculate. Build.', leftX + 43, footerY + 5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...COLOR_RESULT_BLUE);
  doc.text('measurely-tools.vercel.app', rightX, footerY + 5, { align: 'right' });
}

/**
 * Section heading (16pt bold deep navy)
 */
function drawSectionHeading(doc: jsPDF, title: string, y: number): number {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(...COLOR_PRIMARY_NAVY);
  doc.text(title, 20, y);
  return y + 4.5;
}

/**
 * 2. YOUR RESULT
 * Two large, highly visible cards:
 * Left: YOUR RESULT (Volume / Paint needed)
 * Right: WHAT TO BUY (Recommended amount)
 */
function drawResultCards(
  doc: jsPDF,
  leftCard: {
    tag: string;
    mainValue: string;
    mainLabel: string;
    subValue?: string;
    subLabel?: string;
  },
  rightCard: {
    tag: string;
    mainValue: string;
    mainLabel: string;
    subValue?: string;
    subLabel?: string;
  },
  startY: number
): number {
  const leftX = 20;
  const cardW = 82; // 170 - 6 / 2
  const cardGap = 6;
  const rightX = leftX + cardW + cardGap; // 108
  const hasSub = !!(leftCard.subValue || rightCard.subValue);
  const cardH = hasSub ? 42 : 32;

  // Left Card: YOUR RESULT
  doc.setFillColor(...COLOR_CARD_BG);
  doc.setDrawColor(...COLOR_CARD_BORDER);
  doc.setLineWidth(0.35);
  doc.roundedRect(leftX, startY, cardW, cardH, 3, 3, 'FD');

  // Small section tag
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...COLOR_LABEL_NAVY);
  doc.text(leftCard.tag, leftX + 6, startY + 7.5);

  // Big primary number (28pt)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(...COLOR_RESULT_BLUE);
  doc.text(leftCard.mainValue, leftX + 6, startY + 19);

  // Main label (11.5pt)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11.5);
  doc.setTextColor(...COLOR_DARK_TEXT);
  doc.text(leftCard.mainLabel, leftX + 6, startY + 25.5);

  if (leftCard.subValue) {
    // Secondary value (13.5pt) & label (10pt)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13.5);
    doc.setTextColor(...COLOR_DARK_TEXT);
    doc.text(leftCard.subValue, leftX + 6, startY + 34.5);

    if (leftCard.subLabel) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(...COLOR_LABEL_NAVY);
      doc.text(leftCard.subLabel, leftX + 6, startY + 39);
    }
  }

  // Right Card: WHAT TO BUY (Highlighted)
  doc.setFillColor(...COLOR_BUY_BG);
  doc.setDrawColor(...COLOR_BUY_BORDER);
  doc.setLineWidth(0.5);
  doc.roundedRect(rightX, startY, cardW, cardH, 3, 3, 'FD');

  // Small section tag
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...COLOR_RESULT_BLUE);
  doc.text(rightCard.tag, rightX + 6, startY + 7.5);

  // Big primary number (28pt)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(...COLOR_RESULT_BLUE);
  doc.text(rightCard.mainValue, rightX + 6, startY + 19);

  // Main label (11.5pt)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11.5);
  doc.setTextColor(...COLOR_DARK_TEXT);
  doc.text(rightCard.mainLabel, rightX + 6, startY + 25.5);

  if (rightCard.subValue) {
    // Secondary value (13.5pt) & label (10pt)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13.5);
    doc.setTextColor(...COLOR_DARK_TEXT);
    doc.text(rightCard.subValue, rightX + 6, startY + 34.5);

    if (rightCard.subLabel) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(...COLOR_LABEL_NAVY);
      doc.text(rightCard.subLabel, rightX + 6, startY + 39);
    }
  }

  return startY + cardH;
}

/**
 * 3. YOUR INPUTS
 * Shows ONLY user entered information in clean 2-column cards.
 * Card label: 11.5pt
 * Card value: 15pt bold
 */
function drawInputCards(
  doc: jsPDF,
  inputs: Array<{ label: string; value: string }>,
  startY: number
): number {
  const leftX = 20;
  const cardW = 82;
  const cardGap = 6;
  const cardH = 17;
  const rowGap = 3.5;

  let curY = startY;

  for (let i = 0; i < inputs.length; i += 2) {
    const first = inputs[i];
    const second = inputs[i + 1];

    if (second) {
      [first, second].forEach((item, colIdx) => {
        const x = leftX + colIdx * (cardW + cardGap);

        doc.setFillColor(...COLOR_CARD_BG);
        doc.setDrawColor(...COLOR_CARD_BORDER);
        doc.setLineWidth(0.3);
        doc.roundedRect(x, curY, cardW, cardH, 2.5, 2.5, 'FD');

        // Label: 11.5 pt
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11.5);
        doc.setTextColor(...COLOR_LABEL_NAVY);
        doc.text(item.label, x + 5, curY + 5.5);

        // Value: 15 pt bold
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(15);
        doc.setTextColor(...COLOR_DARK_TEXT);
        doc.text(item.value, x + 5, curY + 12.8);
      });
    } else {
      const fullW = 170;
      doc.setFillColor(...COLOR_CARD_BG);
      doc.setDrawColor(...COLOR_CARD_BORDER);
      doc.setLineWidth(0.3);
      doc.roundedRect(leftX, curY, fullW, cardH, 2.5, 2.5, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11.5);
      doc.setTextColor(...COLOR_LABEL_NAVY);
      doc.text(first.label, leftX + 5, curY + 5.5);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(15);
      doc.setTextColor(...COLOR_DARK_TEXT);
      doc.text(first.value, leftX + 5, curY + 12.8);
    }

    curY += cardH + rowGap;
  }

  return curY - rowGap;
}

/**
 * 4. CALCULATION SUMMARY
 * Very short, 3 rows only.
 * Labels: 12pt
 * Values: 14-15pt bold
 */
function drawCalculationSummary(
  doc: jsPDF,
  rows: Array<{ label: string; value: string; isFinal?: boolean }>,
  startY: number
): number {
  const leftX = 20;
  const totalW = 170;
  const rowH = 9;
  const totalH = rows.length * rowH;

  // Outer container
  doc.setFillColor(...COLOR_SUMMARY_BG);
  doc.setDrawColor(...COLOR_CARD_BORDER);
  doc.setLineWidth(0.35);
  doc.roundedRect(leftX, startY, totalW, totalH, 2.5, 2.5, 'FD');

  rows.forEach((row, idx) => {
    const rowY = startY + idx * rowH;

    // Divider line between rows
    if (idx > 0) {
      doc.setDrawColor(...COLOR_ROW_DIVIDER);
      doc.setLineWidth(0.2);
      doc.line(leftX + 5, rowY, leftX + totalW - 5, rowY);
    }

    // Label
    doc.setFont('helvetica', row.isFinal ? 'bold' : 'normal');
    doc.setFontSize(12);
    if (row.isFinal) {
      doc.setTextColor(...COLOR_PRIMARY_NAVY);
    } else {
      doc.setTextColor(...COLOR_LABEL_NAVY);
    }
    doc.text(row.label, leftX + 6, rowY + 6.2);

    // Value
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(row.isFinal ? 15 : 14);
    if (row.isFinal) {
      doc.setTextColor(...COLOR_RESULT_BLUE);
    } else {
      doc.setTextColor(...COLOR_DARK_TEXT);
    }
    doc.text(row.value, leftX + totalW - 6, rowY + 6.2, { align: 'right' });
  });

  return startY + totalH;
}

/**
 * Builds the PDF Document for Paint Calculator
 */
export async function createPaintCalculatorPdfDoc(data: PaintPdfData): Promise<jsPDF> {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const isMetric = data.unitSystem === 'metric';
  const unitLabel = data.result.unitLabel;
  const unitShort = data.result.unitShort;
  const areaUnit = data.result.areaUnit;
  const lenUnit = data.result.lenUnit;

  // 1. HEADER
  let y = await drawPdfHeader(doc, 'Paint Calculator');

  // 2. YOUR RESULT
  y = drawSectionHeading(doc, 'YOUR RESULT', y);
  y = drawResultCards(
    doc,
    {
      tag: 'YOUR RESULT',
      mainValue: `${formatVolumeDisplay(data.result.exactVolume)} ${unitShort}`,
      mainLabel: 'Paint needed',
      subValue: `${formatVolumeDisplay(data.result.baseVolume)} ${unitShort}`,
      subLabel: 'Base paint needed',
    },
    {
      tag: 'WHAT TO BUY',
      mainValue: `${data.result.recommendedPurchase} ${unitLabel.toUpperCase()}`,
      mainLabel: 'Recommended purchase',
      subValue: `+${data.result.wastePercentage}% extra`,
      subLabel: 'Allowance included',
    },
    y
  );

  y += 9;

  // 3. YOUR INPUTS (Only user entered inputs)
  y = drawSectionHeading(doc, 'YOUR INPUTS', y);

  const inputs: Array<{ label: string; value: string }> = [];

  if (data.measureMethod === 'room') {
    inputs.push({
      label: 'Room dimensions',
      value: `${data.roomLength || '0'} × ${data.roomWidth || '0'} × ${data.wallHeight || '0'} ${lenUnit}`,
    });
  } else {
    inputs.push({
      label: 'Wall area',
      value: `${data.directWallArea || '0'} ${areaUnit}`,
    });
  }

  inputs.push({
    label: 'Coats',
    value: `${data.coats}`,
  });

  inputs.push({
    label: 'Paint coverage',
    value: `${data.coverage} ${isMetric ? 'm²/L' : 'ft²/gal'}`,
  });

  inputs.push({
    label: 'Extra allowance',
    value: `${data.wasteAllowance}%`,
  });

  const parsedDoors = parseFloat(data.doorCount);
  if (!isNaN(parsedDoors) && parsedDoors > 0) {
    inputs.push({
      label: 'Doors',
      value: `${parsedDoors} · ${data.doorWidth || '0.9'} × ${data.doorHeight || '2.1'} ${lenUnit}`,
    });
  } else {
    inputs.push({
      label: 'Doors',
      value: '0',
    });
  }

  const parsedWindows = parseFloat(data.windowCount);
  if (!isNaN(parsedWindows) && parsedWindows > 0) {
    inputs.push({
      label: 'Windows',
      value: `${parsedWindows} · ${data.windowWidth || '1.2'} × ${data.windowHeight || '1.2'} ${lenUnit}`,
    });
  } else {
    inputs.push({
      label: 'Windows',
      value: '0',
    });
  }

  if (data.includeCeiling) {
    inputs.push({
      label: 'Ceiling',
      value: 'Included',
    });
  }

  inputs.push({
    label: 'Unit system',
    value: isMetric ? 'Metric' : 'US / Imperial',
  });

  y = drawInputCards(doc, inputs, y);
  y += 9;

  // 4. CALCULATION SUMMARY (Short, key steps only)
  y = drawSectionHeading(doc, 'CALCULATION SUMMARY', y);

  const coatsNum = parseFloat(data.coats || '1');
  const summaryRows = [
    {
      label: 'Paintable area',
      value: `${formatVolumeDisplay(data.result.paintableArea)} ${areaUnit}`,
    },
    {
      label: `After ${coatsNum} coat${coatsNum > 1 ? 's' : ''}`,
      value: `${formatVolumeDisplay(data.result.paintableArea * coatsNum)} ${areaUnit}`,
    },
    {
      label: `With ${data.result.wastePercentage}% extra`,
      value: `${formatVolumeDisplay(data.result.exactVolume)} ${unitShort}`,
      isFinal: true,
    },
  ];

  drawCalculationSummary(doc, summaryRows, y);

  // 5. FOOTER
  drawPdfFooter(doc);

  return doc;
}

/**
 * Generate and download PDF for Paint Calculator
 */
export async function exportPaintCalculatorPdf(data: PaintPdfData): Promise<void> {
  const doc = await createPaintCalculatorPdfDoc(data);
  doc.save('measurely-paint-calculation.pdf');
}

/**
 * Builds the PDF Document for Gravel and Sand Calculators
 */
export async function createBulkMaterialPdfDoc(data: BulkMaterialPdfData): Promise<jsPDF> {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const isMetric = data.unitSystem === 'metric';
  const calculatorName =
    data.toolName ||
    (data.materialType === 'gravel'
      ? 'Gravel Calculator'
      : data.materialType === 'sand'
      ? 'Sand Calculator'
      : data.materialType === 'mulch'
      ? 'Mulch Calculator'
      : data.materialType === 'topsoil'
      ? 'Topsoil Calculator'
      : 'Concrete Calculator');
  const unitLabel = data.result.unitLabel;
  const weightUnit = data.result.weightUnit;
  const depthUnit = data.result.depthUnit;

  // 1. HEADER
  let y = await drawPdfHeader(doc, calculatorName);

  // 2. YOUR RESULT
  y = drawSectionHeading(doc, 'YOUR RESULT', y);
  const baseSubVal =
    data.result.baseWeightDisplay ||
    (data.result.baseWeight !== undefined && weightUnit ? `≈ ${formatWeightDisplay(data.result.baseWeight)} ${weightUnit}` : undefined);
  const recSubVal =
    data.result.recommendedWeightDisplay ||
    (data.result.recommendedWeight !== undefined && weightUnit ? `≈ ${formatWeightDisplay(data.result.recommendedWeight)} ${weightUnit}` : undefined);

  y = drawResultCards(
    doc,
    {
      tag: 'YOUR RESULT',
      mainValue: `${formatVolumeDisplay(data.result.baseVolume)} ${unitLabel}`,
      mainLabel: 'Volume needed',
      subValue: baseSubVal,
      subLabel: baseSubVal ? 'Estimated weight' : undefined,
    },
    {
      tag: 'WHAT TO BUY',
      mainValue: `${formatVolumeDisplay(data.result.recommendedVolume)} ${unitLabel}`,
      mainLabel: 'Recommended amount',
      subValue: recSubVal,
      subLabel: recSubVal ? 'Estimated weight' : undefined,
    },
    y
  );

  y += 9;

  // 3. YOUR INPUTS (Only user entered inputs)
  y = drawSectionHeading(doc, 'YOUR INPUTS', y);

  const inputs: Array<{ label: string; value: string }> = [];

  if (data.method === 'custom') {
    inputs.push({
      label: 'Area',
      value: `${data.customArea || '0'} ${isMetric ? 'm²' : 'sq ft'}`,
    });
    inputs.push({
      label: 'Shape',
      value: 'Custom area',
    });
  } else if (data.method === 'rectangle') {
    inputs.push({
      label: 'Area',
      value: `${data.length || '0'} × ${data.width || '0'} ${isMetric ? 'm' : 'ft'}`,
    });
    inputs.push({
      label: 'Shape',
      value: 'Rectangle',
    });
  } else {
    inputs.push({
      label: 'Diameter',
      value: `${data.diameter || '0'} ${isMetric ? 'm' : 'ft'}`,
    });
    inputs.push({
      label: 'Shape',
      value: 'Circle',
    });
  }

  inputs.push({
    label: 'Depth',
    value: `${data.depth} ${depthUnit}`,
  });

  inputs.push({
    label: 'Extra',
    value: `${data.extraPercent}%`,
  });

  inputs.push({
    label: 'Unit',
    value: isMetric ? 'Metric' : 'US / Imperial',
  });

  y = drawInputCards(doc, inputs, y);
  y += 9;

  // 4. CALCULATION SUMMARY (Short, key steps only)
  y = drawSectionHeading(doc, 'CALCULATION SUMMARY', y);

  const summaryRows: Array<{ label: string; value: string; isFinal?: boolean }> = [
    {
      label: 'Base volume',
      value: `${formatVolumeDisplay(data.result.baseVolume)} ${unitLabel}`,
    },
    {
      label: 'Extra allowance',
      value: `+${formatVolumeDisplay(data.result.extraVolume)} ${unitLabel}`,
    },
    {
      label: 'Final volume',
      value: `${formatVolumeDisplay(data.result.recommendedVolume)} ${unitLabel}`,
      isFinal: true,
    },
  ];

  if (recSubVal) {
    summaryRows.push({
      label: 'Estimated weight',
      value: recSubVal.replace(/^≈\s*/, ''),
    });
  }

  drawCalculationSummary(doc, summaryRows, y);

  // 5. FOOTER
  drawPdfFooter(doc);

  return doc;
}

/**
 * Generate and download PDF for Gravel and Sand Calculators
 */
export async function exportBulkMaterialPdf(data: BulkMaterialPdfData): Promise<void> {
  const doc = await createBulkMaterialPdfDoc(data);
  doc.save(`measurely-${data.materialType}-calculation.pdf`);
}

/**
 * Creates the PDF document for Flooring Calculator
 */
export async function createFlooringCalculatorPdfDoc(data: FlooringPdfData): Promise<jsPDF> {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const isMetric = data.unitSystem === 'metric';
  const lenUnit = data.result.lenUnit;
  const areaUnit = data.result.areaUnit;

  // 1. HEADER
  let y = await drawPdfHeader(doc, 'Flooring Calculator');

  // 2. YOUR RESULT
  y = drawSectionHeading(doc, 'YOUR RESULT', y);
  y = drawResultCards(
    doc,
    {
      tag: 'YOUR RESULT',
      mainValue: `${formatAreaDisplay(data.result.floorArea)} ${areaUnit}`,
      mainLabel: 'Floor area',
    },
    {
      tag: 'WHAT TO BUY',
      mainValue: `${formatAreaDisplay(data.result.recommendedArea)} ${areaUnit}`,
      mainLabel: 'Recommended amount',
    },
    y
  );

  y += 9;

  // 3. YOUR INPUTS
  y = drawSectionHeading(doc, 'YOUR INPUTS', y);

  const inputs: Array<{ label: string; value: string }> = [];

  if (data.method === 'custom') {
    inputs.push({
      label: 'Area',
      value: `${data.customArea || '0'} ${isMetric ? 'm²' : 'sq ft'}`,
    });
    inputs.push({
      label: 'Shape',
      value: 'Custom area',
    });
  } else if (data.method === 'circle') {
    inputs.push({
      label: 'Diameter',
      value: `${data.diameter || '0'} ${lenUnit}`,
    });
    inputs.push({
      label: 'Shape',
      value: 'Circle',
    });
  } else {
    inputs.push({
      label: 'Floor dimensions',
      value: `${data.length || '0'} × ${data.width || '0'} ${lenUnit}`,
    });
    inputs.push({
      label: 'Shape',
      value: 'Rectangle',
    });
  }

  inputs.push({
    label: 'Extra',
    value: `${data.extraPercent}%`,
  });

  inputs.push({
    label: 'Unit',
    value: isMetric ? 'Metric' : 'US / Imperial',
  });

  y = drawInputCards(doc, inputs, y);
  y += 9;

  // 4. CALCULATION SUMMARY
  y = drawSectionHeading(doc, 'CALCULATION SUMMARY', y);

  const summaryRows = [
    {
      label: 'Floor area',
      value: `${formatAreaDisplay(data.result.floorArea)} ${areaUnit}`,
    },
    {
      label: 'Extra allowance',
      value: `+${formatAreaDisplay(data.result.extraArea)} ${areaUnit}`,
    },
    {
      label: 'Recommended amount',
      value: `${formatAreaDisplay(data.result.recommendedArea)} ${areaUnit}`,
      isFinal: true,
    },
  ];

  drawCalculationSummary(doc, summaryRows, y);

  // 5. FOOTER
  drawPdfFooter(doc);

  return doc;
}

/**
 * Generate and download PDF for Flooring Calculator
 */
export async function exportFlooringCalculatorPdf(data: FlooringPdfData): Promise<void> {
  const doc = await createFlooringCalculatorPdfDoc(data);
  doc.save('Measurely-Flooring-Calculator.pdf');
}

/**
 * 8. TILE CALCULATOR PDF
 */
export async function createTileCalculatorPdfDoc(data: TilePdfData): Promise<jsPDF> {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const isMetric = data.unitSystem === 'metric';
  const lenUnit = data.result.lenUnit;
  const areaUnit = data.result.areaUnit;
  const tileDimUnit = data.result.tileDimUnit;

  // 1. HEADER
  let y = await drawPdfHeader(doc, 'Tile Calculator');

  // 2. YOUR RESULT
  y = drawSectionHeading(doc, 'YOUR RESULT', y);
  y = drawResultCards(
    doc,
    {
      tag: 'YOU NEED',
      mainValue: `${data.result.tilesNeeded.toLocaleString('en-US')} tiles`,
      mainLabel: 'Base tiles needed',
      subValue: `For ${formatAreaDisplay(data.result.area)} ${areaUnit}`,
      subLabel: 'Surface area coverage',
    },
    {
      tag: 'WHAT TO BUY',
      mainValue: `${data.result.recommendedTiles.toLocaleString('en-US')} tiles`,
      mainLabel: 'Recommended amount',
      subValue: `Includes ${data.extraPercent}% extra`,
      subLabel: 'Allowance for cuts & waste',
    },
    y
  );

  y += 9;

  // 3. YOUR INPUTS
  y = drawSectionHeading(doc, 'YOUR INPUTS', y);

  const inputs: Array<{ label: string; value: string }> = [];

  if (data.method === 'custom') {
    inputs.push({
      label: 'Area',
      value: `${data.customArea || '0'} ${areaUnit}`,
    });
    inputs.push({
      label: 'Shape',
      value: 'Custom area',
    });
  } else if (data.method === 'circle') {
    inputs.push({
      label: 'Diameter',
      value: `${data.diameter || '0'} ${lenUnit}`,
    });
    inputs.push({
      label: 'Shape',
      value: 'Circle',
    });
  } else {
    inputs.push({
      label: 'Surface dimensions',
      value: `${data.length || '0'} × ${data.width || '0'} ${lenUnit}`,
    });
    inputs.push({
      label: 'Shape',
      value: 'Rectangle',
    });
  }

  inputs.push({
    label: 'Tile size',
    value: `${data.tileLength} × ${data.tileWidth} ${tileDimUnit}`,
  });

  inputs.push({
    label: 'Extra',
    value: `${data.extraPercent}%`,
  });

  inputs.push({
    label: 'Unit',
    value: isMetric ? 'Metric' : 'US / Imperial',
  });

  y = drawInputCards(doc, inputs, y);
  y += 9;

  // 4. CALCULATION SUMMARY
  y = drawSectionHeading(doc, 'CALCULATION SUMMARY', y);

  const summaryRows = [
    {
      label: 'Surface area',
      value: `${formatAreaDisplay(data.result.area)} ${areaUnit}`,
    },
    {
      label: 'Single tile size',
      value: `${data.tileLength} × ${data.tileWidth} ${tileDimUnit}`,
    },
    {
      label: 'Single tile coverage',
      value: `${formatAreaDisplay(data.result.singleTileArea)} ${areaUnit}`,
    },
    {
      label: 'Base tiles needed',
      value: `${data.result.tilesNeeded.toLocaleString('en-US')} tiles`,
    },
    {
      label: 'Extra allowance',
      value: `+${data.result.extraTiles.toLocaleString('en-US')} tiles (${data.extraPercent}%)`,
    },
    {
      label: 'Recommended tiles to buy',
      value: `${data.result.recommendedTiles.toLocaleString('en-US')} tiles`,
      isFinal: true,
    },
  ];

  drawCalculationSummary(doc, summaryRows, y);

  // 5. FOOTER
  drawPdfFooter(doc);

  return doc;
}

/**
 * Generate and download PDF for Tile Calculator
 */
export async function exportTileCalculatorPdf(data: TilePdfData): Promise<void> {
  const doc = await createTileCalculatorPdfDoc(data);
  doc.save('Measurely-Tile-Calculator.pdf');
}

/**
 * 9. DRYWALL CALCULATOR PDF
 */
export async function createDrywallCalculatorPdfDoc(data: DrywallPdfData): Promise<jsPDF> {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const isMetric = data.unitSystem === 'metric';
  const lenUnit = data.result.lenUnit;
  const areaUnit = data.result.areaUnit;

  // 1. HEADER
  let y = await drawPdfHeader(doc, 'Drywall Calculator');

  // 2. YOUR RESULT
  y = drawSectionHeading(doc, 'YOUR RESULT', y);
  y = drawResultCards(
    doc,
    {
      tag: 'YOU NEED',
      mainValue: `${data.result.baseSheets.toLocaleString('en-US')} sheets`,
      mainLabel: 'Base sheets needed',
      subValue: `For ${formatAreaDisplay(data.result.totalArea)} ${areaUnit}`,
      subLabel: 'Surface area coverage',
    },
    {
      tag: 'WHAT TO BUY',
      mainValue: `${data.result.recommendedSheets.toLocaleString('en-US')} sheets`,
      mainLabel: 'Recommended amount',
      subValue: `Includes ${data.extraPercent}% extra`,
      subLabel: 'Allowance for cuts & waste',
    },
    y
  );

  y += 9;

  // 3. YOUR INPUTS
  y = drawSectionHeading(doc, 'YOUR INPUTS', y);

  const inputs: Array<{ label: string; value: string }> = [];

  if (data.areaType === 'custom') {
    inputs.push({
      label: 'Area',
      value: `${data.customArea || '0'} ${areaUnit}`,
    });
    inputs.push({
      label: 'Area type',
      value: 'Custom area',
    });
  } else {
    inputs.push({
      label: 'Wall/ceiling dimensions',
      value: `${data.length || '0'} × ${data.width || '0'} ${lenUnit}`,
    });
    inputs.push({
      label: 'Area type',
      value: 'Rectangle',
    });
  }

  inputs.push({
    label: 'Drywall sheet size',
    value: `${data.sheetLength} × ${data.sheetWidth} ${lenUnit}`,
  });

  inputs.push({
    label: 'Extra',
    value: `${data.extraPercent}%`,
  });

  inputs.push({
    label: 'Unit',
    value: isMetric ? 'Metric' : 'US / Imperial',
  });

  y = drawInputCards(doc, inputs, y);
  y += 9;

  // 4. CALCULATION SUMMARY
  y = drawSectionHeading(doc, 'CALCULATION SUMMARY', y);

  const summaryRows = [
    {
      label: 'Total area',
      value: `${formatAreaDisplay(data.result.totalArea)} ${areaUnit}`,
    },
    {
      label: 'Drywall sheet size',
      value: `${data.sheetLength} × ${data.sheetWidth} ${lenUnit}`,
    },
    {
      label: 'Single sheet coverage',
      value: `${formatAreaDisplay(data.result.singleSheetArea)} ${areaUnit}`,
    },
    {
      label: 'Area including waste',
      value: `${formatAreaDisplay(data.result.areaWithWaste)} ${areaUnit}`,
    },
    {
      label: 'Base sheets needed',
      value: `${data.result.baseSheets.toLocaleString('en-US')} sheets`,
    },
    {
      label: 'Extra allowance',
      value: `+${data.result.extraSheets.toLocaleString('en-US')} sheets (${data.extraPercent}%)`,
    },
    {
      label: 'Recommended sheets to buy',
      value: `${data.result.recommendedSheets.toLocaleString('en-US')} sheets`,
      isFinal: true,
    },
  ];

  drawCalculationSummary(doc, summaryRows, y);

  // 5. FOOTER
  drawPdfFooter(doc);

  return doc;
}

/**
 * Generate and download PDF for Drywall Calculator
 */
export async function exportDrywallCalculatorPdf(data: DrywallPdfData): Promise<void> {
  const doc = await createDrywallCalculatorPdfDoc(data);
  doc.save('Measurely-Drywall-Calculator.pdf');
}

/**
 * 10. PAVER CALCULATOR PDF
 */
export async function createPaverCalculatorPdfDoc(data: PaverPdfData): Promise<jsPDF> {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const isMetric = data.unitSystem === 'metric';
  const lenUnit = data.result.lenUnit;
  const areaUnit = data.result.areaUnit;
  const paverDimUnit = data.result.paverDimUnit;

  // 1. HEADER
  let y = await drawPdfHeader(doc, 'Paver Calculator');

  // 2. YOUR RESULT
  y = drawSectionHeading(doc, 'YOUR RESULT', y);
  y = drawResultCards(
    doc,
    {
      tag: 'YOU NEED',
      mainValue: `${data.result.paversNeeded.toLocaleString('en-US')} pavers`,
      mainLabel: 'Base pavers needed',
      subValue: `For ${formatAreaDisplay(data.result.totalArea)} ${areaUnit}`,
      subLabel: 'Surface area coverage',
    },
    {
      tag: 'WHAT TO BUY',
      mainValue: `${data.result.recommendedPavers.toLocaleString('en-US')} pavers`,
      mainLabel: 'Recommended amount',
      subValue: `Includes ${data.extraPercent}% extra`,
      subLabel: 'Allowance for cuts & breakage',
    },
    y
  );

  y += 9;

  // 3. YOUR INPUTS
  y = drawSectionHeading(doc, 'YOUR INPUTS', y);

  const inputs: Array<{ label: string; value: string }> = [];

  if (data.areaType === 'custom') {
    inputs.push({
      label: 'Area',
      value: `${data.customArea || '0'} ${areaUnit}`,
    });
    inputs.push({
      label: 'Area type',
      value: 'Custom area',
    });
  } else if (data.areaType === 'circle') {
    inputs.push({
      label: 'Diameter',
      value: `${data.diameter || '0'} ${lenUnit}`,
    });
    inputs.push({
      label: 'Area type',
      value: 'Circle',
    });
  } else {
    inputs.push({
      label: 'Surface dimensions',
      value: `${data.length || '0'} × ${data.width || '0'} ${lenUnit}`,
    });
    inputs.push({
      label: 'Area type',
      value: 'Rectangle',
    });
  }

  inputs.push({
    label: 'Paver size',
    value: `${data.paverLength} × ${data.paverWidth} ${paverDimUnit}`,
  });

  inputs.push({
    label: 'Extra',
    value: `${data.extraPercent}%`,
  });

  inputs.push({
    label: 'Unit',
    value: isMetric ? 'Metric' : 'US / Imperial',
  });

  y = drawInputCards(doc, inputs, y);
  y += 9;

  // 4. CALCULATION SUMMARY
  y = drawSectionHeading(doc, 'CALCULATION SUMMARY', y);

  const summaryRows = [
    {
      label: 'Total area',
      value: `${formatAreaDisplay(data.result.totalArea)} ${areaUnit}`,
    },
    {
      label: 'Area including extra',
      value: `${formatAreaDisplay(data.result.areaWithExtra)} ${areaUnit}`,
    },
    {
      label: 'Single paver size',
      value: `${data.paverLength} × ${data.paverWidth} ${paverDimUnit}`,
    },
    {
      label: 'Single paver coverage',
      value: `${formatAreaDisplay(data.result.singlePaverArea)} ${areaUnit}`,
    },
    {
      label: 'Base pavers needed',
      value: `${data.result.paversNeeded.toLocaleString('en-US')} pavers`,
    },
    {
      label: 'Extra allowance',
      value: `+${data.result.extraPavers.toLocaleString('en-US')} pavers (${data.extraPercent}%)`,
    },
    {
      label: 'Recommended pavers to buy',
      value: `${data.result.recommendedPavers.toLocaleString('en-US')} pavers`,
      isFinal: true,
    },
  ];

  drawCalculationSummary(doc, summaryRows, y);

  // 5. FOOTER
  drawPdfFooter(doc);

  return doc;
}

/**
 * Generate and download PDF for Paver Calculator
 */
export async function exportPaverCalculatorPdf(data: PaverPdfData): Promise<void> {
  const doc = await createPaverCalculatorPdfDoc(data);
  doc.save('Measurely-Paver-Calculator.pdf');
}

/**
 * 12. SOD CALCULATOR PDF
 */
export async function createSodCalculatorPdfDoc(data: SodPdfData): Promise<jsPDF> {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const isMetric = data.unitSystem === 'metric';
  const lenUnit = data.result.lenUnit;
  const areaUnit = data.result.areaUnit;

  // 1. HEADER
  let y = await drawPdfHeader(doc, 'Sod Calculator');

  // 2. YOUR RESULT
  y = drawSectionHeading(doc, 'YOUR RESULT', y);
  y = drawResultCards(
    doc,
    {
      tag: 'YOU NEED',
      mainValue: `${formatAreaDisplay(data.result.totalArea)} ${areaUnit}`,
      mainLabel: 'Lawn surface area',
      subValue: 'Exact area',
      subLabel: 'Base measurement',
    },
    {
      tag: 'WHAT TO BUY',
      mainValue: `${formatAreaDisplay(data.result.recommendedArea)} ${areaUnit}`,
      mainLabel: 'Recommended sod to buy',
      subValue: `Includes ${data.extraPercent}% extra`,
      subLabel: 'Cut & edge allowance',
    },
    y
  );

  y += 9;

  // 3. YOUR INPUTS
  y = drawSectionHeading(doc, 'YOUR INPUTS', y);

  const inputs: Array<{ label: string; value: string }> = [];

  if (data.areaType === 'custom') {
    inputs.push({
      label: 'Area',
      value: `${data.customArea || '0'} ${areaUnit}`,
    });
    inputs.push({
      label: 'Area type',
      value: 'Custom area',
    });
  } else if (data.areaType === 'circle') {
    inputs.push({
      label: 'Lawn diameter',
      value: `${data.diameter || '0'} ${lenUnit}`,
    });
    inputs.push({
      label: 'Area type',
      value: 'Circle',
    });
  } else {
    inputs.push({
      label: 'Lawn dimensions',
      value: `${data.length || '0'} × ${data.width || '0'} ${lenUnit}`,
    });
    inputs.push({
      label: 'Area type',
      value: 'Rectangle',
    });
  }

  inputs.push({
    label: 'Extra',
    value: `${data.extraPercent}%`,
  });

  inputs.push({
    label: 'Unit',
    value: isMetric ? 'Metric' : 'US / Imperial',
  });

  y = drawInputCards(doc, inputs, y);
  y += 9;

  // 4. CALCULATION SUMMARY
  y = drawSectionHeading(doc, 'CALCULATION SUMMARY', y);

  const summaryRows = [
    {
      label: 'Total lawn area',
      value: `${formatAreaDisplay(data.result.totalArea)} ${areaUnit}`,
    },
    {
      label: 'Extra allowance',
      value: `+${formatAreaDisplay(data.result.extraArea)} ${areaUnit} (${data.extraPercent}%)`,
    },
    {
      label: 'Recommended sod amount',
      value: `${formatAreaDisplay(data.result.recommendedArea)} ${areaUnit}`,
      isFinal: true,
    },
  ];

  drawCalculationSummary(doc, summaryRows, y);

  // 5. FOOTER
  drawPdfFooter(doc);

  return doc;
}

/**
 * Generate and download PDF for Sod Calculator
 */
export async function exportSodCalculatorPdf(data: SodPdfData): Promise<void> {
  const doc = await createSodCalculatorPdfDoc(data);
  doc.save('Measurely-Sod-Calculator.pdf');
}

/**
 * 13. ROOFING CALCULATOR PDF
 */
export async function createRoofingCalculatorPdfDoc(data: RoofingPdfData): Promise<jsPDF> {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const isMetric = data.unitSystem === 'metric';
  const lenUnit = data.result.lenUnit;
  const areaUnit = data.result.areaUnit;

  // 1. HEADER
  let y = await drawPdfHeader(doc, 'Roofing Calculator');

  // 2. YOUR RESULT
  y = drawSectionHeading(doc, 'YOUR RESULT', y);
  y = drawResultCards(
    doc,
    {
      tag: 'YOU NEED',
      mainValue: `${formatAreaDisplay(data.result.roofArea)} ${areaUnit}`,
      mainLabel: 'Roof surface area',
      subValue: 'Exact area',
      subLabel: 'Base measurement',
    },
    {
      tag: 'WHAT TO BUY',
      mainValue: `${formatAreaDisplay(data.result.recommendedArea)} ${areaUnit}`,
      mainLabel: 'Recommended roofing material',
      subValue: `Includes ${data.extraPercent}% extra`,
      subLabel: 'Ridge, valley & cut allowance',
    },
    y
  );

  y += 9;

  // 3. YOUR INPUTS
  y = drawSectionHeading(doc, 'YOUR INPUTS', y);

  const inputs: Array<{ label: string; value: string }> = [];

  if (data.areaType === 'custom') {
    inputs.push({
      label: 'Area',
      value: `${data.customArea || '0'} ${areaUnit}`,
    });
    inputs.push({
      label: 'Area type',
      value: 'Custom area',
    });
  } else {
    inputs.push({
      label: 'Roof dimensions',
      value: `${data.length || '0'} × ${data.width || '0'} ${lenUnit}`,
    });
    inputs.push({
      label: 'Area type',
      value: 'Rectangle',
    });
  }

  inputs.push({
    label: 'Extra',
    value: `${data.extraPercent}%`,
  });

  inputs.push({
    label: 'Unit',
    value: isMetric ? 'Metric' : 'US / Imperial',
  });

  y = drawInputCards(doc, inputs, y);
  y += 9;

  // 4. CALCULATION SUMMARY
  y = drawSectionHeading(doc, 'CALCULATION SUMMARY', y);

  const summaryRows = [
    {
      label: 'Total roof area',
      value: `${formatAreaDisplay(data.result.roofArea)} ${areaUnit}`,
    },
    {
      label: 'Extra allowance',
      value: `+${formatAreaDisplay(data.result.extraArea)} ${areaUnit} (${data.extraPercent}%)`,
    },
    {
      label: 'Recommended roofing material area',
      value: `${formatAreaDisplay(data.result.recommendedArea)} ${areaUnit}`,
      isFinal: true,
    },
  ];

  drawCalculationSummary(doc, summaryRows, y);

  // 5. FOOTER
  drawPdfFooter(doc);

  return doc;
}

/**
 * Generate and download PDF for Roofing Calculator
 */
export async function exportRoofingCalculatorPdf(data: RoofingPdfData): Promise<void> {
  const doc = await createRoofingCalculatorPdfDoc(data);
  doc.save('Measurely-Roofing-Calculator.pdf');
}

/**
 * 14. FENCE CALCULATOR PDF
 */
export async function createFenceCalculatorPdfDoc(data: FencePdfData): Promise<jsPDF> {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const isMetric = data.unitSystem === 'metric';
  const lenUnit = data.result.lenUnit;
  const areaUnit = data.result.areaUnit;

  // 1. HEADER
  let y = await drawPdfHeader(doc, 'Fence Calculator');

  // 2. YOUR RESULT
  y = drawSectionHeading(doc, 'YOUR RESULT', y);
  y = drawResultCards(
    doc,
    {
      tag: 'YOU NEED',
      mainValue: `${formatAreaDisplay(data.result.fenceArea)} ${areaUnit}`,
      mainLabel: 'Fence surface area',
      subValue: 'Exact area',
      subLabel: 'Base measurement',
    },
    {
      tag: 'WHAT TO BUY',
      mainValue: `${formatAreaDisplay(data.result.recommendedArea)} ${areaUnit}`,
      mainLabel: 'Recommended fence material',
      subValue: `Includes ${data.extraPercent}% extra`,
      subLabel: 'Cutting, trimming & waste buffer',
    },
    y
  );

  y += 9;

  // 3. YOUR INPUTS
  y = drawSectionHeading(doc, 'YOUR INPUTS', y);

  const inputs = [
    {
      label: 'Fence length',
      value: `${data.length || '0'} ${lenUnit}`,
    },
    {
      label: 'Fence height',
      value: `${data.height || '0'} ${lenUnit}`,
    },
    {
      label: 'Extra',
      value: `${data.extraPercent}%`,
    },
    {
      label: 'Unit',
      value: isMetric ? 'Metric' : 'US / Imperial',
    },
  ];

  y = drawInputCards(doc, inputs, y);
  y += 9;

  // 4. CALCULATION SUMMARY
  y = drawSectionHeading(doc, 'CALCULATION SUMMARY', y);

  const summaryRows = [
    {
      label: 'Total fence area',
      value: `${formatAreaDisplay(data.result.fenceArea)} ${areaUnit}`,
    },
    {
      label: 'Extra allowance',
      value: `+${formatAreaDisplay(data.result.extraArea)} ${areaUnit} (${data.extraPercent}%)`,
    },
    {
      label: 'Recommended fence material area',
      value: `${formatAreaDisplay(data.result.recommendedArea)} ${areaUnit}`,
      isFinal: true,
    },
  ];

  drawCalculationSummary(doc, summaryRows, y);

  // 5. FOOTER
  drawPdfFooter(doc);

  return doc;
}

/**
 * Generate and download PDF for Fence Calculator
 */
export async function exportFenceCalculatorPdf(data: FencePdfData): Promise<void> {
  const doc = await createFenceCalculatorPdfDoc(data);
  doc.save('Measurely-Fence-Calculator.pdf');
}




