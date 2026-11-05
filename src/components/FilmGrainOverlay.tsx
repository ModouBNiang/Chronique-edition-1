import React from 'react';

interface FilmGrainOverlayProps {
  showGrid: boolean;
}

export const FilmGrainOverlay: React.FC<FilmGrainOverlayProps> = ({ showGrid }) => {
  return (
    <>
      {/* Subtle Analog Film Grain Overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-50 overflow-hidden opacity-[0.038]"
        aria-hidden="true"
      >
        <svg className="h-[200%] w-[200%] -left-1/2 -top-1/2 relative animate-grain">
          <filter id="chronique-film-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.78"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#chronique-film-grain)" />
        </svg>
      </div>

      {/* Optional Architectural 12-Column Swiss Grid Overlay */}
      {showGrid && (
        <div
          className="pointer-events-none fixed inset-0 z-40 mx-auto max-w-[1600px] px-4 sm:px-8 md:px-12"
          aria-hidden="true"
        >
          <div className="grid h-full grid-cols-4 md:grid-cols-12 gap-4 md:gap-6 border-x border-[#c89d66]/20">
            {Array.from({ length: 12 }).map((_, idx) => (
              <div
                key={idx}
                className={`h-full border-r border-[#c89d66]/10 relative ${
                  idx >= 4 ? 'hidden md:block' : ''
                }`}
              >
                <span className="absolute top-20 left-1 font-mono text-[9px] tracking-widest text-[#c89d66]/45">
                  C.{String(idx + 1).padStart(2, '0')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
