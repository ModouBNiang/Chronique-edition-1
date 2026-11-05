import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownRight, Compass, Maximize2 } from 'lucide-react';
import { MagazineEdition } from '../data/magazineData';
import { EditorialVisual, VisualFilterMode } from './EditorialVisual';

gsap.registerPlugin(ScrollTrigger);

interface HeroCoverProps {
  edition: MagazineEdition;
  visualMode: VisualFilterMode;
  onInspectHero: () => void;
  onExploreClick: () => void;
}

export const HeroCover: React.FC<HeroCoverProps> = ({
  edition,
  visualMode,
  onInspectHero,
  onExploreClick,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const titleWordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const metaRailRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Initial entrance animation for metadata rail, title words, and subtitle
      const validWords = titleWordsRef.current.filter(Boolean);

      gsap.fromTo(
        metaRailRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.1 }
      );

      gsap.fromTo(
        validWords,
        { yPercent: 115, rotateZ: 2.5, opacity: 0 },
        {
          yPercent: 0,
          rotateZ: 0,
          opacity: 1,
          duration: 1.25,
          stagger: 0.09,
          ease: 'power4.out',
          delay: 0.18,
        }
      );

      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', delay: 0.55 }
      );

      // Scroll-triggered subtle zoom-out and parallax on the central hero plate
      if (imageInnerRef.current && imageWrapRef.current) {
        gsap.fromTo(
          imageInnerRef.current,
          { scale: 1.18, yPercent: -4 },
          {
            scale: 1.0,
            yPercent: 6,
            ease: 'none',
            scrollTrigger: {
              trigger: imageWrapRef.current,
              start: 'top 85%',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [edition.id]);

  // Reset refs array on render
  titleWordsRef.current = [];

  return (
    <section
      ref={sectionRef}
      id="hero-cover"
      className="relative min-h-screen pt-24 pb-16 md:pt-28 md:pb-24 hairline-b"
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-12">
        {/* Top Metadata Sub-Rail */}
        <div
          ref={metaRailRef}
          className="mb-10 md:mb-14 grid grid-cols-1 md:grid-cols-12 gap-4 pb-5 hairline-b font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#9e9a90]"
        >
          <div className="md:col-span-4 flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#c89d66]" />
            <span className="text-[#f4f1ea]">{edition.code}</span>
          </div>
          <div className="md:col-span-5 flex items-center gap-2 text-[#9e9a90]">
            <Compass className="h-3.5 w-3.5 text-[#c89d66]" />
            <span>{edition.locationHeader}</span>
            <span className="hidden sm:inline text-[#f4f1ea]/30">//</span>
            <span className="hidden sm:inline text-[#c89d66]">{edition.coordinates}</span>
          </div>
          <div className="md:col-span-3 md:text-right text-[#9e9a90]">
            <span>{edition.season}</span>
          </div>
        </div>

        {/* Monumental Multi-line Editorial Cover Title */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12 md:mb-16">
          <div className="lg:col-span-9">
            <div className="mb-4 flex items-center gap-3">
              <span className="bg-[#a63a2b]/90 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.24em] text-[#f4f1ea]">
                {edition.editionNumber}
              </span>
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#c89d66]">
                {edition.hero.kicker}
              </span>
            </div>

            <h1 className="title-monumental font-light text-[#f4f1ea] tracking-tight">
              {edition.hero.titleLines.map((line, lineIdx) => {
                const isItalicLine = line === edition.hero.italicWord;
                return (
                  <span
                    key={lineIdx}
                    className={`block overflow-hidden py-1 ${
                      lineIdx === 1 ? 'pl-4 sm:pl-12 md:pl-24' : ''
                    } ${lineIdx === 2 ? 'pl-2 sm:pl-6 md:pl-10' : ''}`}
                  >
                    <span
                      ref={(el) => {
                        titleWordsRef.current[lineIdx] = el;
                      }}
                      className={`inline-block will-change-transform ${
                        isItalicLine
                          ? 'italic font-normal text-[#c89d66]'
                          : 'font-light text-[#f4f1ea]'
                      }`}
                    >
                      {line}
                    </span>
                  </span>
                );
              })}
            </h1>
          </div>

          {/* Right Column Editorial Lead & Reading Invitation */}
          <div className="lg:col-span-3 flex flex-col justify-between lg:pb-3">
            <p
              ref={subtitleRef}
              className="text-sm sm:text-base leading-relaxed text-[#9e9a90] font-light mb-6"
            >
              {edition.hero.subtitle}
            </p>

            <div className="pt-5 hairline-t flex items-center justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9e9a90]">
                  DIRECTION ÉDITORIALE
                </p>
                <p className="font-serif italic text-lg text-[#f4f1ea]">
                  {edition.hero.author}
                </p>
              </div>
              <button
                onClick={onExploreClick}
                data-cursor="LIRE"
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-[#f4f1ea]/20 text-[#f4f1ea] transition-all hover:border-[#c89d66] hover:bg-[#c89d66] hover:text-[#0c0d0e]"
                aria-label="Défiler vers le chapitre 1"
              >
                <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Central Monumental Visual Plate with Scroll Zoom Effect */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Technical Spec Rail */}
          <div className="lg:col-span-2 order-2 lg:order-1 flex flex-col justify-between space-y-6 pt-2 lg:hairline-t">
            <div className="space-y-4">
              <div>
                <span className="block font-mono text-[9px] uppercase tracking-[0.24em] text-[#9e9a90]">
                  RÉFÉRENCE ARCHIVE
                </span>
                <span className="font-mono text-xs text-[#f4f1ea]">
                  {edition.hero.heroSpecs.archiveRef}
                </span>
              </div>
              <div>
                <span className="block font-mono text-[9px] uppercase tracking-[0.24em] text-[#9e9a90]">
                  CHAMBRE OPTIQUE
                </span>
                <span className="font-mono text-xs text-[#f4f1ea]">
                  {edition.hero.heroSpecs.focalLength}
                </span>
              </div>
              <div>
                <span className="block font-mono text-[9px] uppercase tracking-[0.24em] text-[#9e9a90]">
                  ÉMULSION / TIRAGE
                </span>
                <span className="font-mono text-xs text-[#f4f1ea]">
                  {edition.hero.heroSpecs.filmStock}
                </span>
              </div>
              <div>
                <span className="block font-mono text-[9px] uppercase tracking-[0.24em] text-[#9e9a90]">
                  ALTITUDE DU SITE
                </span>
                <span className="font-mono text-xs text-[#c89d66]">
                  {edition.hero.heroSpecs.elevation}
                </span>
              </div>
            </div>

            <button
              onClick={onInspectHero}
              data-cursor="INSPECTER"
              className="inline-flex items-center gap-2 border border-[#f4f1ea]/15 bg-[#141619] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#f4f1ea] transition-colors hover:border-[#c89d66] hover:text-[#c89d66]"
            >
              <Maximize2 className="h-3 w-3 text-[#c89d66]" />
              <span>TABLE LUMINEUSE</span>
            </button>

            {/* Animated Scroll to Explore Indicator */}
            <div
              onClick={onExploreClick}
              data-cursor="EXPLORER"
              className="hidden lg:flex flex-col items-start pt-8 cursor-pointer group"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#9e9a90] group-hover:text-[#c89d66] transition-colors">
                SCROLL TO EXPLORE
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#f4f1ea]/40 mt-0.5">
                DÉFILER POUR EXPLORER
              </span>
              <div className="mt-4 h-16 w-[1px] bg-[#f4f1ea]/15 overflow-hidden relative">
                <div className="h-full w-full bg-[#c89d66] animate-scroll-line" />
              </div>
            </div>
          </div>

          {/* Central Hero Visual Container */}
          <div className="lg:col-span-10 order-1 lg:order-2">
            <div
              ref={imageWrapRef}
              className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden border border-[#f4f1ea]/15 bg-[#141619]"
            >
              <div ref={imageInnerRef} className="h-full w-full will-change-transform">
                <EditorialVisual
                  src={edition.hero.heroImage}
                  alt={edition.hero.heroCaption}
                  schematicType={edition.hero.schematicType}
                  visualMode={visualMode}
                  catalogCode={edition.hero.heroSpecs.archiveRef}
                  coordinates={edition.coordinates}
                  cursorLabel="DÉCOUVRIR"
                  onClick={onInspectHero}
                  className="h-full w-full"
                />
              </div>

              {/* Floating Editorial Epigraph Stamp inside Hero */}
              <div className="pointer-events-none absolute bottom-5 left-5 right-5 sm:right-auto sm:max-w-lg z-20 bg-[#0c0d0e]/85 backdrop-blur-md border border-[#f4f1ea]/15 p-4 sm:p-5">
                <p className="font-serif italic text-base sm:text-lg text-[#f4f1ea] leading-snug">
                  {edition.hero.leadQuote}
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#c89d66]">
                  — {edition.hero.photographyCredit}
                </p>
              </div>
            </div>

            {/* Bottom Caption Rail */}
            <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-[11px] text-[#9e9a90]">
              <p className="tracking-wide">{edition.hero.heroCaption}</p>
              <span className="shrink-0 uppercase tracking-[0.2em] text-[#c89d66]">
                [ CLIC POUR AGRANDIR LA PLANCHE ]
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
