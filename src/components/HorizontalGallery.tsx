import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Maximize2, MapPin, Camera, Layers, Sparkles } from 'lucide-react';
import { ArtworkPlate, MagazineEdition } from '../data/magazineData';
import { EditorialVisual, VisualFilterMode } from './EditorialVisual';

gsap.registerPlugin(ScrollTrigger);

interface HorizontalGalleryProps {
  edition: MagazineEdition;
  visualMode: VisualFilterMode;
  onInspectArtwork: (artwork: ArtworkPlate) => void;
}

export const HorizontalGallery: React.FC<HorizontalGalleryProps> = ({
  edition,
  visualMode,
  onInspectArtwork,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerWrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [galleryProgress, setGalleryProgress] = useState<number>(0);

  const artworks = edition.artworksSection.items;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const wrap = triggerWrapRef.current;
      if (!track || !wrap) return;

      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        return Math.max(0, trackWidth - viewportWidth);
      };

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: () => `+=${Math.max(window.innerHeight * 2.4, getScrollAmount() * 1.15)}`,
          pin: true,
          scrub: 0.75,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setGalleryProgress(self.progress);
            const idx = Math.min(
              artworks.length - 1,
              Math.floor(self.progress * artworks.length + 0.15)
            );
            setActiveSlideIndex(idx);
          },
        },
      });

      return () => {
        tween.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [edition.id, artworks.length]);

  return (
    <section
      ref={sectionRef}
      id="galerie-horizontale"
      className="relative bg-[#0c0d0e] hairline-b"
    >
      {/* Pinned Viewport Wrapper */}
      <div
        ref={triggerWrapRef}
        className="relative flex h-screen w-full flex-col justify-between overflow-hidden pt-20 pb-8"
      >
        {/* Top Exhibition Header Bar */}
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-8 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 hairline-b">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 bg-[#c89d66]" />
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#c89d66]">
                  {edition.artworksSection.index} // GALERIE SCROLLER HORIZONTALE
                </span>
              </div>
              <h2 className="mt-1 font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#f4f1ea]">
                {edition.artworksSection.title}{' '}
                <span className="italic text-[#c89d66] text-2xl sm:text-3xl">
                  — Focus Artworks
                </span>
              </h2>
            </div>

            <div className="flex flex-col md:items-end justify-between gap-2">
              <p className="max-w-md font-mono text-[10px] uppercase tracking-[0.18em] text-[#9e9a90] md:text-right">
                {edition.artworksSection.curatorialStatement}
              </p>
              {/* Active Plate Telemetry */}
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em]">
                <span className="text-[#9e9a90]">PLANCHE ACTIVE :</span>
                <span className="text-[#c89d66] font-medium">
                  0{activeSlideIndex + 1} / 0{artworks.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Exhibition Track Driven by Vertical Scroll */}
        <div className="relative flex-1 flex items-center overflow-visible my-4">
          <div
            ref={trackRef}
            className="flex items-stretch gap-8 sm:gap-12 px-4 sm:px-8 md:px-16 will-change-transform"
          >
            {/* Intro Curatorial Plinth Card */}
            <div className="flex w-[84vw] sm:w-[420px] shrink-0 flex-col justify-between border border-[#f4f1ea]/15 bg-[#141619]/90 p-7 sm:p-9">
              <div>
                <span className="inline-block border border-[#c89d66]/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-[#c89d66]">
                  SALLE D’EXPOSITION LONGITUDINALE
                </span>
                <h3 className="mt-6 font-serif text-3xl sm:text-4xl font-light text-[#f4f1ea] leading-tight">
                  Cinq Monolithes, Cinq Régimes d’Ombre.
                </h3>
                <p className="mt-5 text-sm leading-relaxed text-[#9e9a90]">
                  Chaque création réunie dans ce portefeuille a été photographiée à la chambre grand format ou au moyen format numérique monochrome et trichromique, sans éclairage artificiel d’appoint.
                </p>
              </div>

              <div className="space-y-4 pt-6 hairline-t">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-[#9e9a90]">
                  <span>NOMBRE DE PLANCHES</span>
                  <span className="text-[#f4f1ea]">0{artworks.length} ARCHIVES</span>
                </div>
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-[#9e9a90]">
                  <span>NAVIGATION</span>
                  <span className="text-[#c89d66]">DÉFILEMENT VERTICAL ↓</span>
                </div>
              </div>
            </div>

            {/* Artwork Plates */}
            {artworks.map((art, index) => (
              <article
                key={art.id}
                className="group relative flex w-[88vw] sm:w-[760px] lg:w-[920px] shrink-0 flex-col lg:flex-row border border-[#f4f1ea]/15 bg-[#141619] overflow-hidden transition-colors hover:border-[#c89d66]/50"
              >
                {/* Left Visual Plate */}
                <div className="relative h-64 sm:h-80 lg:h-auto lg:w-[56%] shrink-0 overflow-hidden border-b lg:border-b-0 lg:border-r border-[#f4f1ea]/10">
                  <EditorialVisual
                    src={art.imageUrl}
                    alt={art.title}
                    schematicType={art.schematicType}
                    visualMode={visualMode}
                    catalogCode={art.catalogNumber}
                    coordinates={art.coordinates}
                    cursorLabel="INSPECTER"
                    onClick={() => onInspectArtwork(art)}
                    className="h-full w-full"
                  />

                  {/* Monumental Ghost Plate Index Number */}
                  <span className="pointer-events-none absolute bottom-3 left-4 z-20 font-serif italic text-5xl sm:text-6xl text-[#f4f1ea]/80 drop-shadow-lg">
                    {art.plateIndex}
                  </span>
                </div>

                {/* Right Technical Specification Sheet & Curatorial Legend */}
                <div className="flex flex-1 flex-col justify-between p-5 sm:p-7">
                  <div>
                    {/* Catalog Header & Palette Swatches */}
                    <div className="flex items-center justify-between gap-2 pb-3 hairline-b">
                      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#c89d66]">
                        {art.catalogNumber} // {art.year}
                      </span>
                      <div className="flex items-center gap-1.5" title="Gamme chromatique relevée">
                        {art.palette.map((hex, pIdx) => (
                          <span
                            key={pIdx}
                            className="h-3 w-3 rounded-full border border-[#f4f1ea]/25"
                            style={{ backgroundColor: hex }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="mt-4 font-serif text-2xl sm:text-3xl text-[#f4f1ea] font-normal">
                      {art.title}
                    </h3>
                    <p className="mt-0.5 font-serif italic text-sm sm:text-base text-[#c89d66]">
                      {art.subtitle}
                    </p>

                    {/* Description & Curatorial Note */}
                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#f4f1ea]/90 font-light">
                      {art.description}
                    </p>
                    <p className="mt-2.5 text-xs leading-relaxed text-[#9e9a90] border-l-2 border-[#c89d66]/50 pl-3 italic">
                      {art.curatorialNote}
                    </p>
                  </div>

                  {/* Technical Specification Grid */}
                  <div className="mt-5 pt-4 hairline-t space-y-3">
                    <div className="grid grid-cols-2 gap-3 font-mono text-[10px]">
                      <div>
                        <span className="flex items-center gap-1 text-[#9e9a90] uppercase tracking-[0.16em]">
                          <Sparkles className="h-3 w-3 text-[#c89d66]" /> STUDIO / ARTISTE
                        </span>
                        <p className="mt-0.5 text-[#f4f1ea] truncate">{art.artist}</p>
                      </div>
                      <div>
                        <span className="flex items-center gap-1 text-[#9e9a90] uppercase tracking-[0.16em]">
                          <MapPin className="h-3 w-3 text-[#c89d66]" /> LOCALISATION
                        </span>
                        <p className="mt-0.5 text-[#f4f1ea] truncate">{art.location}</p>
                      </div>
                      <div>
                        <span className="flex items-center gap-1 text-[#9e9a90] uppercase tracking-[0.16em]">
                          <Layers className="h-3 w-3 text-[#c89d66]" /> MATÉRIAUX
                        </span>
                        <p className="mt-0.5 text-[#f4f1ea] truncate" title={art.medium}>
                          {art.medium}
                        </p>
                      </div>
                      <div>
                        <span className="flex items-center gap-1 text-[#9e9a90] uppercase tracking-[0.16em]">
                          <Camera className="h-3 w-3 text-[#c89d66]" /> OPTIQUE & DIMENSIONS
                        </span>
                        <p className="mt-0.5 text-[#f4f1ea] truncate" title={art.optics}>
                          {art.dimensions}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#9e9a90]">
                        RÉVERBÉRATION : <strong className="text-[#f4f1ea]">{art.reverberation}</strong>
                      </span>

                      <button
                        type="button"
                        onClick={() => onInspectArtwork(art)}
                        data-cursor="OUVRIR"
                        className="inline-flex items-center gap-2 border border-[#c89d66]/60 bg-[#c89d66]/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#f4f1ea] transition-all hover:bg-[#c89d66] hover:text-[#0c0d0e]"
                      >
                        <Maximize2 className="h-3 w-3" />
                        <span>FICHE & PLANCHE</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Bottom Horizontal Track Progress Bar & Plate Indicators */}
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-8 md:px-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 hairline-t">
            <div className="flex items-center gap-2">
              {artworks.map((art, idx) => (
                <button
                  key={art.id}
                  type="button"
                  onClick={() => onInspectArtwork(art)}
                  data-cursor={`PLANCHE 0${idx + 1}`}
                  className={`px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] border transition-all ${
                    idx === activeSlideIndex
                      ? 'border-[#c89d66] bg-[#c89d66] text-[#0c0d0e] font-semibold'
                      : 'border-[#f4f1ea]/15 bg-[#141619] text-[#9e9a90] hover:border-[#f4f1ea]/40 hover:text-[#f4f1ea]'
                  }`}
                >
                  {art.plateIndex} — {art.title.split(' ')[0]}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9e9a90]">
                PROGRESSION GALERIE
              </span>
              <div className="h-1 w-36 sm:w-48 bg-[#f4f1ea]/10 overflow-hidden">
                <div
                  className="h-full bg-[#c89d66] transition-transform duration-150 origin-left"
                  style={{ transform: `scaleX(${galleryProgress})` }}
                />
              </div>
              <span className="font-mono text-[10px] tabular-nums text-[#c89d66]">
                {Math.round(galleryProgress * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
