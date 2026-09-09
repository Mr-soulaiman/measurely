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
  toolName: 'Gravel Calculator' | 'Sand Calculator';
  materialType: 'gravel' | 'sand';
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
    baseWeight: number;
    recommendedWeight: number;
    weightUnit: 'tonnes' | 'tons';
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
  const isGravel = data.materialType === 'gravel';
  const calculatorName = isGravel ? 'Gravel Calculator' : 'Sand Calculator';
  const unitLabel = data.result.unitLabel;
  const weightUnit = data.result.weightUnit;
  const depthUnit = data.result.depthUnit;

  // 1. HEADER
  let y = await drawPdfHeader(doc, calculatorName);

  // 2. YOUR RESULT
  y = drawSectionHeading(doc, 'YOUR RESULT', y);
  y = drawResultCards(
    doc,
    {
      tag: 'YOUR RESULT',
      mainValue: `${formatVolumeDisplay(data.result.baseVolume)} ${unitLabel}`,
      mainLabel: 'Volume needed',
      subValue: `≈ ${formatWeightDisplay(data.result.baseWeight)} ${weightUnit}`,
      subLabel: 'Estimated weight',
    },
    {
      tag: 'WHAT TO BUY',
      mainValue: `${formatVolumeDisplay(data.result.recommendedVolume)} ${unitLabel}`,
      mainLabel: 'Recommended amount',
      subValue: `≈ ${formatWeightDisplay(data.result.recommendedWeight)} ${weightUnit}`,
      subLabel: 'Estimated weight',
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

  const summaryRows = [
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

