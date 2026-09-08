import { useId } from 'react';
import { PaintInputs, PaintCalculationResult } from '../types';

interface WallVisualizerProps {
  inputs: PaintInputs;
  result: PaintCalculationResult;
}

export function WallVisualizer({ inputs, result }: WallVisualizerProps) {
  const patternId = useId();
  const hatchId = useId();
  const ceilingPatternId = useId();

  const isRoomMode = inputs.mode === 'room';
  const effectiveW = isRoomMode
    ? Math.max(0.1, inputs.roomLength || 1)
    : Math.max(0.1, inputs.wallWidth || 1);
  const effectiveH = isRoomMode
    ? Math.max(0.1, inputs.ceilingHeight || 1)
    : Math.max(0.1, inputs.wallHeight || 1);

  const doorW = Math.max(0, inputs.doorWidth || 0);
  const doorH = Math.max(0, inputs.doorHeight || 0);
  const winW = Math.max(0, inputs.windowWidth || 0);
  const winH = Math.max(0, inputs.windowHeight || 0);

  // Canvas bounds & margins for dimension lines
  const svgWidth = 640;
  const svgHeight = 360;
  const paddingLeft = 95;
  const paddingRight = 45;
  const paddingTop = inputs.includeCeiling ? 75 : 65;
  const paddingBottom = 65;

  const maxDrawW = svgWidth - paddingLeft - paddingRight;
  const maxDrawH = svgHeight - paddingTop - paddingBottom;

  // Compute aspect ratio fit
  const wallAspect = effectiveW / effectiveH;
  const boxAspect = maxDrawW / maxDrawH;

  let drawW: number;
  let drawH: number;

  if (wallAspect > boxAspect) {
    drawW = maxDrawW;
    drawH = maxDrawW / wallAspect;
  } else {
    drawH = maxDrawH;
    drawW = maxDrawH * wallAspect;
  }

  // Position wall centered in the drawing zone, flush to bottom floor line
  const wallX = paddingLeft + (maxDrawW - drawW) / 2;
  const wallY = paddingTop + (maxDrawH - drawH);
  const scale = drawW / effectiveW; // pixels per meter

  // Scaled dimensions
  const sDoorW = doorW * scale;
  const sDoorH = Math.min(drawH * 0.95, doorH * scale);
  const sWinW = winW * scale;
  const sWinH = Math.min(drawH * 0.7, winH * scale);

  const hasDoors = inputs.doorCount > 0 && doorW > 0 && doorH > 0;
  const hasWindows = inputs.windowCount > 0 && winW > 0 && winH > 0;

  // Door position (placed on floor)
  const doorX = wallX + Math.min(drawW * 0.12, 35);
  const doorY = wallY + drawH - sDoorH;

  // Window positions
  const numVisibleWindows = Math.min(inputs.windowCount, 2);
  const winY = wallY + Math.max(15, (drawH - sWinH) * 0.35);

  const wallColor = inputs.wallColorHex || '#EAE6DF';

  return (
    <div className="w-full bg-[#FAF9F5] border border-[#E5E3DD] rounded-xl p-4 sm:p-6 shadow-xs relative overflow-hidden">
      {/* Blueprint Header / Title bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-2 border-b border-[#EAE8E1]">
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-3 h-3 rounded-xs border border-black/20"
            style={{ backgroundColor: wallColor }}
            title={`Selected color: ${inputs.wallColorName || 'Standard'}`}
          />
          <span className="font-mono text-xs tracking-wider uppercase font-semibold text-[#1A1918]">
            {isRoomMode
              ? `ROOM ELEVATION / LENGTH SPAN (${effectiveW.toFixed(1)}m × ${effectiveH.toFixed(1)}m)`
              : `WALL ELEVATION / SPAN 1 OF ${inputs.wallCount}`}
          </span>
          <span className="text-[11px] font-mono text-[#73716B] bg-[#F1EFEA] px-1.5 py-0.5 rounded">
            {inputs.wallColorName || 'Chalk'}
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono text-[#73716B] flex-wrap">
          <span className="hidden sm:inline">SCALE: 1:{(100 / (scale / 3.78)).toFixed(0)}</span>
          <span>{inputs.coats}× COATS</span>
          <span className="px-2 py-0.5 bg-[#1A1918] text-white rounded font-medium">
            NET AREA: {result.paintableArea.toFixed(1)} m²
          </span>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full aspect-[16/9] max-h-[360px]">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-full select-none"
          role="img"
          aria-label={`Elevation schematic diagram showing wall dimensions ${effectiveW.toFixed(1)}m by ${effectiveH.toFixed(1)}m, with door and window cutouts`}
        >
          <defs>
            {/* Paint coating texture */}
            <pattern
              id={patternId}
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <line
                x1="0"
                y1="10"
                x2="10"
                y2="0"
                stroke="#1A1918"
                strokeWidth="0.5"
                strokeOpacity="0.08"
              />
            </pattern>

            {/* Ceiling soffit texture */}
            <pattern
              id={ceilingPatternId}
              width="6"
              height="6"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="3" cy="3" r="0.8" fill="#1A1918" fillOpacity="0.15" />
            </pattern>

            {/* Excluded openings crosshatch pattern */}
            <pattern
              id={hatchId}
              width="8"
              height="8"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4"
                stroke="#A8A29E"
                strokeWidth="1"
                strokeOpacity="0.4"
              />
            </pattern>

            {/* Dimension arrow markers */}
            <marker
              id="dim-arrow-start"
              viewBox="0 0 10 10"
              refX="1"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 10 1 L 0 5 L 10 9 z" fill="#1A1918" />
            </marker>
            <marker
              id="dim-arrow-end"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#1A1918" />
            </marker>
          </defs>

          {/* Background drafting lines / floor guide */}
          <line
            x1="20"
            y1={wallY + drawH}
            x2={svgWidth - 20}
            y2={wallY + drawH}
            stroke="#D6D3CD"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <text
            x={svgWidth - 30}
            y={wallY + drawH + 16}
            className="font-mono text-[9px] fill-[#73716B] tracking-widest text-right"
          >
            FINISHED FLOOR DATUM ±0.00
          </text>

          {/* OPTIONAL CEILING SOFFIT BAND */}
          {inputs.includeCeiling && (
            <g>
              {/* Ceiling slab above wall */}
              <rect
                x={wallX - 8}
                y={wallY - 14}
                width={drawW + 16}
                height="12"
                fill="#F1EFEA"
                stroke="#A8A29E"
                strokeWidth="1"
                rx="1"
              />
              <rect
                x={wallX - 8}
                y={wallY - 14}
                width={drawW + 16}
                height="12"
                fill={`url(#${ceilingPatternId})`}
              />
              <text
                x={wallX + drawW / 2}
                y={wallY - 5}
                textAnchor="middle"
                className="font-mono text-[9px] font-semibold fill-[#54524D] tracking-wider uppercase"
              >
                CEILING PLANE ({result.ceilingArea.toFixed(1)} m² • {result.ceilingPaintRequired.toFixed(1)}L REQ)
              </text>
            </g>
          )}

          {/* Wall Base Shape (with chosen architectural color swatch & texture) */}
          <rect
            x={wallX}
            y={wallY}
            width={drawW}
            height={drawH}
            fill={wallColor}
            stroke="#1A1918"
            strokeWidth="2"
            rx="2"
          />

          {/* Layered paint overlay pattern */}
          <rect
            x={wallX}
            y={wallY}
            width={drawW}
            height={drawH}
            fill={`url(#${patternId})`}
            rx="2"
          />

          {/* DOORS: Representative Door Placement */}
          {hasDoors && (
            <g>
              {/* Door Cutout */}
              <rect
                x={doorX}
                y={doorY}
                width={Math.min(sDoorW, drawW * 0.45)}
                height={sDoorH}
                fill="#FAF9F5"
                stroke="#57534E"
                strokeWidth="1.5"
              />
              <rect
                x={doorX}
                y={doorY}
                width={Math.min(sDoorW, drawW * 0.45)}
                height={sDoorH}
                fill={`url(#${hatchId})`}
              />
              {/* Door frame & handle detail */}
              <line
                x1={doorX + Math.min(sDoorW, drawW * 0.45) - 6}
                y1={doorY + sDoorH * 0.52}
                x2={doorX + Math.min(sDoorW, drawW * 0.45) - 6}
                y2={doorY + sDoorH * 0.52 + 7}
                stroke="#1A1918"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <text
                x={doorX + Math.min(sDoorW, drawW * 0.45) / 2}
                y={doorY + sDoorH / 2}
                textAnchor="middle"
                className="font-mono text-[10px] font-semibold fill-[#1A1918]"
              >
                DOOR {doorW}×{doorH}m
              </text>
            </g>
          )}

          {/* WINDOWS: Representative Window Placements */}
          {hasWindows && (
            <g>
              {Array.from({ length: numVisibleWindows }).map((_, idx) => {
                const totalWinSlot = drawW * 0.52;
                const slotWidth = totalWinSlot / numVisibleWindows;
                const winX = wallX + drawW * 0.44 + idx * slotWidth + 8;
                const actualWinW = Math.min(sWinW, slotWidth - 14);

                return (
                  <g key={`win-${idx}`}>
                    <rect
                      x={winX}
                      y={winY}
                      width={actualWinW}
                      height={sWinH}
                      fill="#FFFFFF"
                      stroke="#57534E"
                      strokeWidth="1.5"
                    />
                    <rect
                      x={winX}
                      y={winY}
                      width={actualWinW}
                      height={sWinH}
                      fill={`url(#${hatchId})`}
                    />
                    {/* Window Mullions */}
                    <line
                      x1={winX + actualWinW / 2}
                      y1={winY}
                      x2={winX + actualWinW / 2}
                      y2={winY + sWinH}
                      stroke="#78716C"
                      strokeWidth="1"
                    />
                    <line
                      x1={winX}
                      y1={winY + sWinH / 2}
                      x2={winX + actualWinW}
                      y2={winY + sWinH / 2}
                      stroke="#78716C"
                      strokeWidth="1"
                    />
                    <text
                      x={winX + actualWinW / 2}
                      y={winY + sWinH / 2 - 3}
                      textAnchor="middle"
                      className="font-mono text-[9px] font-semibold fill-[#1A1918]"
                    >
                      WIN {winW}×{winH}m
                    </text>
                  </g>
                );
              })}
            </g>
          )}

          {/* DIMENSION LINES: Horizontal Top (Width/Length) */}
          <g>
            {/* Extension lines */}
            <line
              x1={wallX}
              y1={inputs.includeCeiling ? wallY - 18 : wallY - 4}
              x2={wallX}
              y2={inputs.includeCeiling ? wallY - 40 : wallY - 32}
              stroke="#A8A29E"
              strokeWidth="1"
            />
            <line
              x1={wallX + drawW}
              y1={inputs.includeCeiling ? wallY - 18 : wallY - 4}
              x2={wallX + drawW}
              y2={inputs.includeCeiling ? wallY - 40 : wallY - 32}
              stroke="#A8A29E"
              strokeWidth="1"
            />
            {/* Dimension arrow line */}
            <line
              x1={wallX + 4}
              y1={inputs.includeCeiling ? wallY - 28 : wallY - 20}
              x2={wallX + drawW - 4}
              y2={inputs.includeCeiling ? wallY - 28 : wallY - 20}
              stroke="#1A1918"
              strokeWidth="1.2"
              markerStart="url(#dim-arrow-start)"
              markerEnd="url(#dim-arrow-end)"
            />
            {/* Badge container for dimension text */}
            <rect
              x={wallX + drawW / 2 - 40}
              y={inputs.includeCeiling ? wallY - 38 : wallY - 30}
              width="80"
              height="20"
              fill="#FAF9F5"
              stroke="#E5E3DD"
              rx="4"
            />
            <text
              x={wallX + drawW / 2}
              y={inputs.includeCeiling ? wallY - 24 : wallY - 16}
              textAnchor="middle"
              className="font-mono text-xs font-semibold fill-[#1A1918]"
            >
              {effectiveW.toFixed(2)} m
            </text>
          </g>

          {/* DIMENSION LINES: Vertical Left (Height) */}
          <g>
            {/* Extension lines */}
            <line
              x1={wallX - 4}
              y1={wallY}
              x2={wallX - 38}
              y2={wallY}
              stroke="#A8A29E"
              strokeWidth="1"
            />
            <line
              x1={wallX - 4}
              y1={wallY + drawH}
              x2={wallX - 38}
              y2={wallY + drawH}
              stroke="#A8A29E"
              strokeWidth="1"
            />
            {/* Dimension arrow line */}
            <line
              x1={wallX - 22}
              y1={wallY + 4}
              x2={wallX - 22}
              y2={wallY + drawH - 4}
              stroke="#1A1918"
              strokeWidth="1.2"
              markerStart="url(#dim-arrow-start)"
              markerEnd="url(#dim-arrow-end)"
            />
            {/* Text on height line rotated */}
            <g
              transform={`translate(${wallX - 34}, ${wallY + drawH / 2}) rotate(-90)`}
            >
              <rect
                x="-34"
                y="-10"
                width="68"
                height="20"
                fill="#FAF9F5"
                stroke="#E5E3DD"
                rx="4"
              />
              <text
                x="0"
                y="4"
                textAnchor="middle"
                className="font-mono text-xs font-semibold fill-[#1A1918]"
              >
                {effectiveH.toFixed(2)} m
              </text>
            </g>
          </g>

          {/* Excluded Area Overlay Warning if invalid */}
          {result.hasExcessiveOpenings && (
            <g>
              <rect
                x={wallX + 10}
                y={wallY + 10}
                width={drawW - 20}
                height="32"
                fill="#FEF2F2"
                stroke="#DC2626"
                strokeWidth="1"
                rx="4"
              />
              <text
                x={wallX + drawW / 2}
                y={wallY + 30}
                textAnchor="middle"
                className="font-mono text-xs font-medium fill-[#991B1B]"
              >
                WARNING: Cutouts ({result.excludedArea.toFixed(1)} m²) exceed gross wall area ({result.totalWallArea.toFixed(1)} m²)
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Legend & Details below schematic */}
      <div className="mt-3 pt-3 border-t border-[#EAE8E1] flex flex-wrap items-center justify-between gap-y-2 text-xs text-[#73716B]">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded-xs border border-black/30"
              style={{ backgroundColor: wallColor }}
            />
            <span>Wall Coating ({result.paintableArea.toFixed(1)} m² net)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs border border-[#78716C] bg-[#FAF9F5]" />
            <span>Openings Cutout ({result.excludedArea.toFixed(1)} m²)</span>
          </span>
          {inputs.includeCeiling && (
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs border border-[#A8A29E] bg-[#F1EFEA]" />
              <span>Ceiling ({result.ceilingArea.toFixed(1)} m²)</span>
            </span>
          )}
        </div>
        <div className="font-mono text-[11px] text-[#54524D]">
          {isRoomMode
            ? `Room Perimeter: ${(2 * (inputs.roomLength + inputs.roomWidth)).toFixed(1)} m`
            : `Span Total: ${(inputs.wallWidth * inputs.wallCount).toFixed(1)} m linear`}
        </div>
      </div>
    </div>
  );
}

