interface IconProps {
  className?: string;
}

/**
 * Custom minimal line icon: Flooring (floor planks + measurement detail)
 */
export function FlooringToolIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Floor planks with staggered seam layout */}
      <rect x="3" y="3.5" width="18" height="12" rx="1.5" />
      <path d="M3 9.5h18" />
      <path d="M9.5 3.5v6" />
      <path d="M14.5 9.5v6" />
      {/* Measurement dimension line & end ticks */}
      <path d="M3 19.5h18" />
      <path d="M3 17.5v4" />
      <path d="M21 17.5v4" />
      <path d="M6.5 18l-2 1.5 2 1.5" />
      <path d="M17.5 18l2 1.5-2 1.5" />
    </svg>
  );
}

/**
 * Custom minimal line icon: Paint (paint roller + paint stroke)
 */
export function PaintToolIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Paint stroke swatch trailing above roller */}
      <path d="M3 3.5h13a1.5 1.5 0 0 1 1.5 1.5v0a1.5 1.5 0 0 1-1.5 1.5H3" />
      {/* Paint roller cylinder */}
      <rect x="3" y="7.5" width="13" height="5.5" rx="1.25" />
      {/* Frame arm connecting to handle */}
      <path d="M16 10.25h2.5a1.5 1.5 0 0 1 1.5 1.5v2.25a1.5 1.5 0 0 1-1.5 1.5H13v5" />
      {/* Handle grip detail */}
      <path d="M11 20.5h4" />
    </svg>
  );
}

/**
 * Custom minimal line icon: Gravel (irregular gravel stones)
 */
export function GravelToolIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Top irregular stone */}
      <path d="M8.5 7.5c.5-2.5 2.5-4 5-3.5 2 .5 3.5 2 3 4s-2 3.5-4 3c-2.5-.5-3.5-1.5-4-3.5z" />
      <path d="M11.5 5.5l2 2.5" />
      {/* Large bottom-left irregular stone */}
      <path d="M3.5 15.5c.3-2.5 2.2-4.5 5-4 2.5.3 4.2 2 3.8 4.2-.5 2.5-2.3 4.3-5 4-2.8-.3-4.1-1.8-3.8-4.2z" />
      <path d="M6.5 13.5l2.5 2" />
      {/* Bottom-right irregular stone */}
      <path d="M13.5 16c.3-2 2-3.5 4.2-3 2 .3 3.3 1.8 3 3.5s-1.8 3.5-3.8 3.2c-2-.3-3.7-1.7-3.4-3.7z" />
      <path d="M16 14.5l2 1.5" />
    </svg>
  );
}

/**
 * Custom minimal line icon: Sand (small sand pile + subtle sand grains)
 */
export function SandToolIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Sand pile / dune curve */}
      <path d="M2 19c3.5-2 6.5-6.5 10-6.5s6.5 4.5 10 6.5" />
      {/* Sand contour ridges */}
      <path d="M12 12.5c-1 2-3.5 4-7.5 5" />
      <path d="M12 12.5c1.5 2 4.5 3.5 7.5 4" />
      {/* Base ground line */}
      <path d="M2 19.5h20" />
      {/* Subtle falling sand grains */}
      <path d="M12 3.5v.01" />
      <path d="M8.5 6.5v.01" />
      <path d="M15.5 6.5v.01" />
      <path d="M12 8.5v.01" />
      <path d="M6 10.5v.01" />
      <path d="M18 10.5v.01" />
    </svg>
  );
}
