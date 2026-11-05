import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { MagazineEdition, NarrativeIllustration } from '../data/magazineData';
import { EditorialVisual, VisualFilterMode } from './EditorialVisual';

gsap.registerPlugin(ScrollTrigger);

interface NarrativeChapterProps {
  edition: MagazineEdition;
  visualMode: VisualFilterMode;
  onInspectIllustration: (ill: NarrativeIllustration) => void;
}

export const NarrativeChapter: React.FC<NarrativeChapterProps> = ({
  edition,
  visualMode,
  onInspectIllustration,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleWordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const pullQuoteWordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const parallaxCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const floatingQuoteBoxRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Word-by-word chapter title reveal
      const validTitleWords = titleWordsRef.current.filter(Boolean);
      if (validTitleWords.length > 0) {
        gsap.fromTo(
          validTitleWords,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.08,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
            },
          }
        );
      }

      // Word-by-word pull-quote reveal on scroll
      const validQuoteWords = pullQuoteWordsRef.current.filter(Boolean);
      if (validQuoteWords.length > 0 && floatingQuoteBoxRef.current) {
        gsap.fromTo(
          validQuoteWords,
          { opacity: 0.15, y: 12 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.04,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: floatingQuoteBoxRef.current,
              start: 'top 82%',
              end: 'bottom 45%',
              scrub: 0.6,
            },
          }
        );

        // Floating pull-quote subtle vertical parallax
        gsap.fromTo(
          floatingQuoteBoxRef.current,
          { y: 35 },
          {
            y: -35,
            ease: 'none',
            scrollTrigger: {
              trigger: floatingQuoteBoxRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      // Multi-speed Parallax for Floating Illustration Cards
      parallaxCardsRef.current.forEach((card, idx) => {
        if (!card) return;
        const illustration = edition.chapter1.illustrations[idx];
        const speed = illustration ? illustration.parallaxSpeed : -0.12;
        const yOffset = speed * 420;

        gsap.fromTo(
          card,
          { y: -yOffset },
          {
            y: yOffset,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [edition.id]);

  titleWordsRef.current = [];
  pullQuoteWordsRef.current = [];
  parallaxCardsRef.current = [];

  const { chapter1 } = edition;
  const titleWords = chapter1.title.split(' ');
  const pullQuoteWords = chapter1.pullQuote.text.split(' ');

  return (
    <section
      ref={sectionRef}
      id="chapitre-1"
      className="relative py-24 md:py-36 hairline-b overflow-hidden"
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-12">
        {/* Chapter Header Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-14 hairline-b">
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 bg-[#c89d66]" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#c89d66]">
                {chapter1.index}
              </span>
            </div>

            <div className="mt-8 lg:mt-0 pr-6 border-l border-[#c89d66]/40 pl-4">
              <p className="font-serif italic text-lg text-[#f4f1ea]/90 leading-relaxed">
                « {chapter1.epigraph} »
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9e9a90]">
                — {chapter1.epigraphAuthor}
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <h2 className="title-chapter font-light text-[#f4f1ea] mb-4">
              {titleWords.map((word, idx) => (
                <span key={idx} className="inline-block overflow-hidden mr-[0.26em] py-1">
                  <span
                    ref={(el) => {
                      titleWordsRef.current[idx] = el;
                    }}
                    className={`inline-block will-change-transform ${
                      idx === titleWords.length - 1 ? 'italic text-[#c89d66]' : ''
                    }`}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h2>
            <p className="font-serif text-xl sm:text-2xl text-[#9e9a90] font-light">
              {chapter1.subtitle}
            </p>
          </div>
        </div>

        {/* Asymmetric Paper-Magazine Spread: Margin Notes + Drop-Cap Essay + Floating Illustration 1 */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* Column 1-3: Technical Margin Annotations (Folio Notes) */}
          <aside className="lg:col-span-3 space-y-8 lg:pr-6 lg:hairline-r">
            <div className="pb-4 hairline-b">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#c89d66]">
                NOTES DE MARGE & RELEVÉS
              </span>
            </div>

            {chapter1.marginNotes.map((note, idx) => (
              <div
                key={idx}
                className="group border border-[#f4f1ea]/10 bg-[#141619]/60 p-4 transition-colors hover:border-[#c89d66]/50"
              >
                <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-[#c89d66]">
                  {note.code}
                </span>
                <h3 className="mt-1 font-mono text-xs font-medium uppercase tracking-[0.14em] text-[#f4f1ea]">
                  {note.label}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#9e9a90]">
                  {note.content}
                </p>
              </div>
            ))}

            {/* Acoustic Telemetry Highlight Box */}
            <div className="border border-[#c89d66]/35 bg-[#141619] p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#9e9a90]">
                  {chapter1.secondaryQuote.metricLabel}
                </span>
                <Sparkles className="h-3.5 w-3.5 text-[#c89d66]" />
              </div>
              <p className="font-mono text-xl font-medium tracking-wider text-[#c89d66]">
                {chapter1.secondaryQuote.metricValue}
              </p>
              <p className="mt-3 font-serif italic text-sm text-[#f4f1ea]/85 leading-relaxed">
                {chapter1.secondaryQuote.text}
              </p>
            </div>
          </aside>

          {/* Column 4-8: Lead Drop-Cap Narrative & Staggered Columns */}
          <div className="lg:col-span-5 lg:px-4 space-y-8">
            {/* Lead Paragraph with Giant 4-line Editorial Lettrine */}
            <p className="editorial-dropcap text-base sm:text-lg leading-[1.85] text-[#f4f1ea]/95 font-light">
              {chapter1.dropCapParagraph}
            </p>

            {/* Staggered Multi-Column Editorial Body */}
            <div className="space-y-6 pt-4 hairline-t">
              {chapter1.bodyColumns.map((paragraph, pIdx) => (
                <p
                  key={pIdx}
                  className={`text-sm sm:text-[15px] leading-[1.85] text-[#9e9a90] font-normal ${
                    pIdx === 1 ? 'pl-4 sm:pl-8 border-l border-[#f4f1ea]/15 text-[#f4f1ea]/85' : ''
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Floating Pull-Quote (Citation en Exergue) that detaches from the dark canvas */}
            <div
              ref={floatingQuoteBoxRef}
              className="relative my-12 border border-[#c89d66]/45 bg-gradient-to-br from-[#181a1f] to-[#0f1012] p-7 sm:p-9 shadow-[0_25px_70px_rgba(0,0,0,0.75)]"
            >
              <span className="absolute -top-3 left-6 bg-[#0c0d0e] px-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#c89d66] border border-[#c89d66]/40">
                CITATION EN EXERGUE
              </span>

              <blockquote className="title-pullquote font-light italic text-[#f4f1ea]">
                {pullQuoteWords.map((word, wIdx) => (
                  <span
                    key={wIdx}
                    ref={(el) => {
                      pullQuoteWordsRef.current[wIdx] = el;
                    }}
                    className="inline-block mr-[0.26em] will-change-transform"
                  >
                    {word}
                  </span>
                ))}
              </blockquote>

              <div className="mt-6 pt-4 hairline-t flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#c89d66]">
                  — {chapter1.pullQuote.attribution}
                </span>
                <span className="font-mono text-[10px] tracking-[0.12em] text-[#9e9a90]">
                  {chapter1.pullQuote.context}
                </span>
              </div>
            </div>
          </div>

          {/* Column 9-12: Floating Parallax Illustration Card 01 */}
          <div className="lg:col-span-4">
            {chapter1.illustrations[0] && (
              <div
                ref={(el) => {
                  parallaxCardsRef.current[0] = el;
                }}
                className="border border-[#f4f1ea]/15 bg-[#141619] p-3 sm:p-4 shadow-2xl will-change-transform"
              >
                <div className="mb-2.5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-[#9e9a90]">
                  <span className="text-[#c89d66]">
                    {chapter1.illustrations[0].figureNumber}
                  </span>
                  <span>{chapter1.illustrations[0].year}</span>
                </div>

                <EditorialVisual
                  src={chapter1.illustrations[0].imageUrl}
                  alt={chapter1.illustrations[0].title}
                  schematicType={chapter1.illustrations[0].schematicType}
                  visualMode={visualMode}
                  catalogCode={chapter1.illustrations[0].figureNumber}
                  coordinates={chapter1.illustrations[0].coordinates}
                  cursorLabel="INSPECTER"
                  onClick={() => onInspectIllustration(chapter1.illustrations[0])}
                  className="aspect-[4/5] w-full"
                />

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-xl text-[#f4f1ea]">
                      {chapter1.illustrations[0].title}
                    </h4>
                    <button
                      onClick={() => onInspectIllustration(chapter1.illustrations[0])}
                      data-cursor="VOIR"
                      className="text-[#c89d66] hover:text-[#f4f1ea] transition-colors"
                      aria-label="Inspecter la figure 1"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-xs leading-relaxed text-[#9e9a90]">
                    {chapter1.illustrations[0].caption}
                  </p>
                  <div className="pt-2 hairline-t flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-[#9e9a90]/80">
                    <span>{chapter1.illustrations[0].location}</span>
                    <span>{chapter1.illustrations[0].optics}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Lower Asymmetric Parallax Spread: Floating Cards 02 & 03 */}
        {chapter1.illustrations.length > 1 && (
          <div className="mt-20 md:mt-32 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Illustration 02 (Wide Asymmetric Left-Center) */}
            {chapter1.illustrations[1] && (
              <div className="lg:col-span-7">
                <div
                  ref={(el) => {
                    parallaxCardsRef.current[1] = el;
                  }}
                  className="border border-[#f4f1ea]/15 bg-[#141619] p-4 sm:p-5 will-change-transform"
                >
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.2em]">
                    <span className="text-[#c89d66]">
                      {chapter1.illustrations[1].figureNumber}
                    </span>
                    <span className="text-[#9e9a90]">
                      PARALLAXE // VITESSE +{chapter1.illustrations[1].parallaxSpeed}
                    </span>
                  </div>

                  <EditorialVisual
                    src={chapter1.illustrations[1].imageUrl}
                    alt={chapter1.illustrations[1].title}
                    schematicType={chapter1.illustrations[1].schematicType}
                    visualMode={visualMode}
                    catalogCode={chapter1.illustrations[1].figureNumber}
                    coordinates={chapter1.illustrations[1].coordinates}
                    cursorLabel="DÉCOUVRIR"
                    onClick={() => onInspectIllustration(chapter1.illustrations[1])}
                    className="aspect-[16/10] w-full"
                  />

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
                    <div className="sm:col-span-8">
                      <h4 className="font-serif text-2xl text-[#f4f1ea]">
                        {chapter1.illustrations[1].title}
                      </h4>
                      <p className="mt-1 text-xs sm:text-sm text-[#9e9a90] leading-relaxed">
                        {chapter1.illustrations[1].caption}
                      </p>
                    </div>
                    <div className="sm:col-span-4 sm:text-right font-mono text-[10px] uppercase tracking-[0.18em] text-[#c89d66]">
                      <p>{chapter1.illustrations[1].location}</p>
                      <p className="text-[#9e9a90] mt-0.5">
                        {chapter1.illustrations[1].optics}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Illustration 03 (Offset Right Column) */}
            {chapter1.illustrations[2] && (
              <div className="lg:col-span-5 lg:pl-8">
                <div
                  ref={(el) => {
                    parallaxCardsRef.current[2] = el;
                  }}
                  className="border border-[#f4f1ea]/15 bg-[#141619] p-4 will-change-transform"
                >
                  <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em]">
                    <span className="text-[#c89d66]">
                      {chapter1.illustrations[2].figureNumber}
                    </span>
                    <span className="text-[#9e9a90]">
                      {chapter1.illustrations[2].location}
                    </span>
                  </div>

                  <EditorialVisual
                    src={chapter1.illustrations[2].imageUrl}
                    alt={chapter1.illustrations[2].title}
                    schematicType={chapter1.illustrations[2].schematicType}
                    visualMode={visualMode}
                    catalogCode={chapter1.illustrations[2].figureNumber}
                    coordinates={chapter1.illustrations[2].coordinates}
                    cursorLabel="INSPECTER"
                    onClick={() => onInspectIllustration(chapter1.illustrations[2])}
                    className="aspect-[3/4] w-full"
                  />

                  <div className="mt-4">
                    <h4 className="font-serif text-xl text-[#f4f1ea]">
                      {chapter1.illustrations[2].title}
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-[#9e9a90]">
                      {chapter1.illustrations[2].caption}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
