import React, { useState } from 'react';
import { X, Compass, Camera, Layers, Maximize, Eye } from 'lucide-react';
import { EditorialVisual, VisualFilterMode } from './EditorialVisual';

export interface InspectedPlateData {
  catalogNumber: string;
  title: string;
  subtitle?: string;
  artist: string;
  location: string;
  coordinates: string;
  year: string;
  medium: string;
  dimensions: string;
  optics: string;
  reverberation?: string;
  imageUrl: string;
  description: string;
  curatorialNote?: string;
  palette?: string[];
  schematicType: 'monolith' | 'vault' | 'oculus' | 'cantilever' | 'colonnade';
}

interface ArtworkLightboxProps {
  plate: InspectedPlateData | null;
  onClose: () => void;
  defaultVisualMode: VisualFilterMode;
}

export const ArtworkLightbox: React.FC<ArtworkLightboxProps> = ({
  plate,
  onClose,
  defaultVisualMode,
}) => {
  const [localMode, setLocalMode] = useState<VisualFilterMode>(defaultVisualMode);
  const [zoomed, setZoomed] = useState<boolean>(false);

  if (!plate) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#0c0d0e]/95 backdrop-blur-xl overflow-y-auto"
      data-lenis-prevent
    >
      {/* Top Bar */}
      <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between px-4 sm:px-8 md:px-12 hairline-b">
        <div className="flex items-center gap-3 font-mono text-[10px] sm:text-xs uppercase tracking-[0.24em]">
          <span className="text-[#c89d66]">{plate.catalogNumber}</span>
          <span className="text-[#f4f1ea]/30">//</span>
          <span className="text-[#f4f1ea]">TABLE LUMINEUSE D’INSPECTION</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Local Optical Mode Toggle */}
          <button
            type="button"
            onClick={() =>
              setLocalMode((prev) =>
                prev === 'cinematic'
                  ? 'blueprint'
                  : prev === 'blueprint'
                  ? 'monochrome'
                  : 'cinematic'
              )
            }
            data-cursor="CALQUE"
            className="flex items-center gap-1.5 border border-[#f4f1ea]/20 bg-[#141619] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#f4f1ea] hover:border-[#c89d66]"
          >
            <Eye className="h-3.5 w-3.5 text-[#c89d66]" />
            <span>
              {localMode === 'cinematic'
                ? 'OPTIQUE : FILM'
                : localMode === 'blueprint'
                ? 'OPTIQUE : RELEVÉ 1:100'
                : 'OPTIQUE : ARCHIVE N&B'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setZoomed((z) => !z)}
            data-cursor="ZOOM"
            className="hidden sm:flex items-center gap-1.5 border border-[#f4f1ea]/20 bg-[#141619] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#f4f1ea] hover:border-[#c89d66]"
          >
            <Maximize className="h-3.5 w-3.5 text-[#c89d66]" />
            <span>{zoomed ? 'CADRAGE 100%' : 'LOUPE 135%'}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            data-cursor="FERMER"
            className="flex items-center gap-2 border border-[#c89d66] bg-[#c89d66] px-3.5 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[#0c0d0e] hover:bg-[#f4f1ea]"
          >
            <span>FERMER</span>
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Main Inspection Content */}
      <div className="mx-auto my-auto w-full max-w-[1600px] px-4 py-8 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: High-Res Visual Plate (8 cols) */}
          <div className="lg:col-span-8">
            <div className="relative aspect-[16/11] w-full overflow-hidden border border-[#f4f1ea]/20 bg-[#141619]">
              <div
                className={`h-full w-full transition-transform duration-700 ease-editorial ${
                  zoomed ? 'scale-125' : 'scale-100'
                }`}
              >
                <EditorialVisual
                  src={plate.imageUrl}
                  alt={plate.title}
                  schematicType={plate.schematicType}
                  visualMode={localMode}
                  catalogCode={plate.catalogNumber}
                  coordinates={plate.coordinates}
                  cursorLabel={zoomed ? 'DÉZOOMER' : 'ZOOMER'}
                  onClick={() => setZoomed((z) => !z)}
                  className="h-full w-full"
                />
              </div>
            </div>
          </div>

          {/* Right: Complete Technical Specification Sheet (4 cols) */}
          <div className="lg:col-span-4 space-y-6 border border-[#f4f1ea]/15 bg-[#141619] p-6 sm:p-8">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#c89d66]">
                {plate.catalogNumber} // {plate.year}
              </span>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-light text-[#f4f1ea]">
                {plate.title}
              </h2>
              {plate.subtitle && (
                <p className="mt-1 font-serif italic text-lg text-[#c89d66]">
                  {plate.subtitle}
                </p>
              )}
            </div>

            <p className="text-sm leading-relaxed text-[#f4f1ea]/90 font-light">
              {plate.description}
            </p>

            {plate.curatorialNote && (
              <p className="border-l-2 border-[#c89d66] pl-4 text-xs italic leading-relaxed text-[#9e9a90]">
                {plate.curatorialNote}
              </p>
            )}

            <div className="pt-4 hairline-t space-y-3 font-mono text-xs">
              <div className="flex justify-between py-1 hairline-b">
                <span className="text-[#9e9a90] uppercase tracking-[0.16em]">ARTISTE / ATELIER</span>
                <span className="text-[#f4f1ea] text-right">{plate.artist}</span>
              </div>
              <div className="flex justify-between py-1 hairline-b">
                <span className="text-[#9e9a90] uppercase tracking-[0.16em] flex items-center gap-1">
                  <Compass className="h-3 w-3 text-[#c89d66]" /> SITE
                </span>
                <span className="text-[#f4f1ea] text-right">{plate.location}</span>
              </div>
              <div className="flex justify-between py-1 hairline-b">
                <span className="text-[#9e9a90] uppercase tracking-[0.16em]">COORDONNÉES</span>
                <span className="text-[#c89d66] text-right">{plate.coordinates}</span>
              </div>
              <div className="flex justify-between py-1 hairline-b">
                <span className="text-[#9e9a90] uppercase tracking-[0.16em] flex items-center gap-1">
                  <Layers className="h-3 w-3 text-[#c89d66]" /> MATÉRIAUX
                </span>
                <span className="text-[#f4f1ea] text-right max-w-[200px] truncate" title={plate.medium}>
                  {plate.medium}
                </span>
              </div>
              <div className="flex justify-between py-1 hairline-b">
                <span className="text-[#9e9a90] uppercase tracking-[0.16em] flex items-center gap-1">
                  <Camera className="h-3 w-3 text-[#c89d66]" /> OPTIQUE
                </span>
                <span className="text-[#f4f1ea] text-right">{plate.optics}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#9e9a90] uppercase tracking-[0.16em]">DIMENSIONS</span>
                <span className="text-[#f4f1ea] text-right">{plate.dimensions}</span>
              </div>
            </div>

            {plate.palette && plate.palette.length > 0 && (
              <div className="pt-4 hairline-t">
                <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#9e9a90] mb-2">
                  SPECTRE CHROMATIQUE DE LA PLANCHE
                </span>
                <div className="flex items-center gap-2">
                  {plate.palette.map((hex, i) => (
                    <div
                      key={i}
                      className="flex-1 h-6 border border-[#f4f1ea]/20 flex items-end justify-center pb-0.5"
                      style={{ backgroundColor: hex }}
                    >
                      <span className="font-mono text-[8px] text-[#f4f1ea]/80 bg-[#0c0d0e]/60 px-1">
                        {hex}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
