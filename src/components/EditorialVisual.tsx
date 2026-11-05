import React, { useState } from 'react';

export type VisualFilterMode = 'cinematic' | 'monochrome' | 'blueprint';

interface EditorialVisualProps {
  src: string;
  alt: string;
  schematicType?: 'monolith' | 'vault' | 'oculus' | 'cantilever' | 'colonnade';
  visualMode: VisualFilterMode;
  coordinates?: string;
  catalogCode?: string;
  className?: string;
  imageClassName?: string;
  cursorLabel?: string;
  onClick?: () => void;
  showCornerCrosshairs?: boolean;
  overlayGradient?: boolean;
}

export const EditorialVisual: React.FC<EditorialVisualProps> = ({
  src,
  alt,
  schematicType = 'monolith',
  visualMode,
  coordinates,
  catalogCode,
  className = '',
  imageClassName = '',
  cursorLabel = 'INSPECTER',
  onClick,
  showCornerCrosshairs = true,
  overlayGradient = true,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const filterClasses =
    visualMode === 'monochrome'
      ? 'grayscale contrast-125 brightness-90'
      : visualMode === 'blueprint'
      ? 'grayscale contrast-150 brightness-50 sepia-[0.25]'
      : 'contrast-[1.06] brightness-[0.94] saturate-[0.88]';

  return (
    <div
      className={`group relative overflow-hidden bg-[#121417] select-none ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      data-cursor={onClick ? cursorLabel : undefined}
      onClick={onClick}
    >
      {/* Procedural Architectural Engraving / Fallback & Blueprint Layer */}
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
          visualMode === 'blueprint'
            ? 'z-20 opacity-95'
            : !imageLoaded || imageError
            ? 'z-10 opacity-100'
            : 'z-20 opacity-0 group-hover:opacity-35'
        }`}
      >
        <svg
          viewBox="0 0 800 600"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id={`grad-${schematicType}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#141619" stopOpacity="0.9" />
              <stop offset="55%" stopColor="#0c0d0e" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#1d1a16" stopOpacity="0.9" />
            </linearGradient>
            <pattern
              id="arch-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#c89d66"
                strokeWidth="0.4"
                strokeOpacity="0.22"
              />
            </pattern>
          </defs>

          {(!imageLoaded || imageError) && (
            <rect width="800" height="600" fill={`url(#grad-${schematicType})`} />
          )}
          <rect width="800" height="600" fill="url(#arch-grid)" />

          {/* Architectural Geometry by Schematic Type */}
          {schematicType === 'monolith' && (
            <g stroke="#c89d66" strokeWidth="1" fill="none" opacity="0.65">
              <rect x="220" y="90" width="360" height="420" strokeOpacity="0.5" />
              <line x1="400" y1="40" x2="400" y2="560" strokeDasharray="4 6" />
              <line x1="120" y1="300" x2="680" y2="300" strokeDasharray="4 6" />
              <polygon
                points="280,460 400,130 520,460"
                stroke="#f4f1ea"
                strokeOpacity="0.35"
              />
              <circle cx="400" cy="300" r="110" strokeOpacity="0.4" />
            </g>
          )}

          {schematicType === 'oculus' && (
            <g stroke="#c89d66" strokeWidth="1" fill="none" opacity="0.7">
              <circle cx="400" cy="300" r="190" strokeOpacity="0.45" />
              <circle cx="400" cy="300" r="120" stroke="#f4f1ea" strokeOpacity="0.4" />
              <circle cx="400" cy="300" r="48" strokeDasharray="3 3" />
              <line x1="160" y1="300" x2="640" y2="300" strokeOpacity="0.35" />
              <line x1="400" y1="60" x2="400" y2="540" strokeOpacity="0.35" />
              <line x1="230" y1="130" x2="570" y2="470" strokeDasharray="4 4" strokeOpacity="0.3" />
            </g>
          )}

          {schematicType === 'vault' && (
            <g stroke="#c89d66" strokeWidth="1" fill="none" opacity="0.65">
              <path d="M 160 520 L 160 260 A 240 240 0 0 1 640 260 L 640 520" />
              <path
                d="M 240 520 L 240 290 A 160 160 0 0 1 560 290 L 560 520"
                stroke="#f4f1ea"
                strokeOpacity="0.35"
              />
              <line x1="160" y1="520" x2="640" y2="520" />
              <line x1="400" y1="20" x2="400" y2="520" strokeDasharray="5 5" />
            </g>
          )}

          {schematicType === 'cantilever' && (
            <g stroke="#c89d66" strokeWidth="1" fill="none" opacity="0.65">
              <rect x="140" y="180" width="520" height="110" />
              <rect x="140" y="290" width="160" height="230" stroke="#f4f1ea" strokeOpacity="0.4" />
              <line x1="300" y1="290" x2="660" y2="180" strokeDasharray="4 4" />
              <line x1="100" y1="520" x2="700" y2="520" strokeOpacity="0.4" />
            </g>
          )}

          {schematicType === 'colonnade' && (
            <g stroke="#c89d66" strokeWidth="1" fill="none" opacity="0.65">
              {[180, 290, 400, 510, 620].map((xPos, i) => (
                <g key={i}>
                  <rect x={xPos - 18} y="120" width="36" height="380" strokeOpacity="0.45" />
                  <line x1={xPos} y1="90" x2={xPos} y2="530" strokeDasharray="3 5" strokeOpacity="0.3" />
                </g>
              ))}
              <line x1="120" y1="120" x2="680" y2="120" />
              <line x1="120" y1="500" x2="680" y2="500" />
            </g>
          )}

          {/* Blueprint Technical Callout Text */}
          <text
            x="28"
            y="572"
            fill="#c89d66"
            fontSize="10"
            fontFamily="JetBrains Mono, monospace"
            letterSpacing="3"
            opacity="0.75"
          >
            {`RELEVÉ GÉOMÉTRIQUE // ${schematicType.toUpperCase()} — ÉCHELLE 1:100`}
          </text>
        </svg>
      </div>

      {/* Main High-Resolution Photograph */}
      {!imageError && (
        <img
          src={src}
          alt={alt}
          loading="eager"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          className={`h-full w-full object-cover transition-all duration-1000 ease-editorial group-hover:scale-[1.035] ${filterClasses} ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } ${imageClassName}`}
        />
      )}

      {/* Subtle Cinematic Vignette & Contrast Gradient */}
      {overlayGradient && (
        <div
          className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#0c0d0e]/80 via-transparent to-[#0c0d0e]/30"
          aria-hidden="true"
        />
      )}

      {/* Corner Architectural Crosshairs */}
      {showCornerCrosshairs && (
        <div className="pointer-events-none absolute inset-3 z-20 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#f4f1ea]/60 bg-[#0c0d0e]/55 px-2 py-0.5 backdrop-blur-sm border border-[#f4f1ea]/10">
              {catalogCode || 'ARCH // 2026'}
            </span>
            <span className="font-mono text-xs text-[#c89d66]/70">+</span>
          </div>
          <div className="flex items-end justify-between">
            <span className="font-mono text-xs text-[#c89d66]/70">+</span>
            {coordinates && (
              <span className="font-mono text-[10px] tracking-[0.18em] text-[#f4f1ea]/70 bg-[#0c0d0e]/60 px-2 py-0.5 backdrop-blur-sm border border-[#f4f1ea]/10">
                {coordinates}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
