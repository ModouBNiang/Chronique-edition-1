import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ArrowUp, Check, Mail } from 'lucide-react';
import { MagazineEdition } from '../data/magazineData';
import { EditorialVisual, VisualFilterMode } from './EditorialVisual';

gsap.registerPlugin(ScrollTrigger);

interface EditorialOutroProps {
  currentEdition: MagazineEdition;
  allEditions: MagazineEdition[];
  visualMode: VisualFilterMode;
  onSelectEdition: (editionId: string) => void;
  onBackToTop: () => void;
}

export const EditorialOutro: React.FC<EditorialOutroProps> = ({
  currentEdition,
  allEditions,
  visualMode,
  onSelectEdition,
  onBackToTop,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteWordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const otherEditions = allEditions.filter((ed) => ed.id !== currentEdition.id);
  const [hoveredEdition, setHoveredEdition] = useState<MagazineEdition>(
    otherEditions[0] || currentEdition
  );
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useLayoutEffect(() => {
    setHoveredEdition(otherEditions[0] || currentEdition);
  }, [currentEdition.id]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const validWords = quoteWordsRef.current.filter(Boolean);
      if (validWords.length > 0) {
        gsap.fromTo(
          validWords,
          { yPercent: 105, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.05,
            stagger: 0.045,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 72%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [currentEdition.id]);

  quoteWordsRef.current = [];
  const { epilogue } = currentEdition;
  const monumentalWords = epilogue.monumentalQuote.split(' ');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().length > 2) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer
      ref={sectionRef}
      id="epilogue-outro"
      className="relative bg-[#0c0d0e] pt-28 pb-16 md:pt-40"
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-12">
        {/* Part 1: Monumental Epilogue Quote & Editorial Conclusion */}
        <div className="pb-24 md:pb-32 hairline-b">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-2 w-2 bg-[#c89d66]" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#c89d66]">
              {epilogue.index}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.08] tracking-tight text-[#f4f1ea] max-w-6xl">
            {monumentalWords.map((word, idx) => (
              <span key={idx} className="inline-block overflow-hidden mr-[0.26em] py-1">
                <span
                  ref={(el) => {
                    quoteWordsRef.current[idx] = el;
                  }}
                  className={`inline-block will-change-transform ${
                    idx > 4 && idx < 9 ? 'italic text-[#c89d66]' : ''
                  }`}
                >
                  {word}
                </span>
              </span>
            ))}
          </h2>

          {/* Closing Reflection + Colophon Grid */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <p className="text-base sm:text-lg leading-[1.85] text-[#9e9a90] font-light">
                {epilogue.closingEssay}
              </p>
              <div className="pt-4 hairline-t">
                <p className="font-serif italic text-2xl text-[#f4f1ea]">
                  {epilogue.signature}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#c89d66]">
                  {epilogue.signatureRole}
                </p>
              </div>
            </div>

            {/* Colophon Table */}
            <div className="lg:col-span-7 lg:pl-12 lg:hairline-l">
              <div className="mb-4 pb-3 hairline-b flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#c89d66]">
                  OURS & COLOPHON TECHNIQUE
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9e9a90]">
                  {currentEdition.code}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {epilogue.colophon.map((credit, idx) => (
                  <div
                    key={idx}
                    className="border border-[#f4f1ea]/10 bg-[#141619]/60 p-4"
                  >
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#c89d66]">
                      {credit.role}
                    </span>
                    <p className="mt-1 font-serif text-lg text-[#f4f1ea]">
                      {credit.name}
                    </p>
                    <p className="mt-1 font-mono text-[10px] text-[#9e9a90]">
                      {credit.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Part 2: Interactive "Article Suivant / Prochaine Édition" Selector with Dynamic Hover Preview */}
        <div className="py-24 md:py-32 hairline-b">
          <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.26em] text-[#c89d66]">
                POURSUIVRE L’EXPLORATION // SÉLECTEUR D’ÉDITION
              </span>
              <h3 className="mt-2 font-serif text-3xl sm:text-5xl font-light text-[#f4f1ea]">
                Article Suivant{' '}
                <span className="italic text-[#9e9a90]">&amp; Archives</span>
              </h3>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9e9a90]">
              SURVOLEZ POUR PRÉVISUALISER • CLIQUEZ POUR CHARGER L’ÉDITION
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Interactive Edition Selector List */}
            <div className="lg:col-span-7 space-y-6">
              {otherEditions.map((ed) => {
                const isSelectedHover = hoveredEdition.id === ed.id;
                return (
                  <div
                    key={ed.id}
                    onMouseEnter={() => setHoveredEdition(ed)}
                    onClick={() => onSelectEdition(ed.id)}
                    data-cursor="LIRE L'ÉDITION"
                    className={`group relative cursor-pointer border p-6 sm:p-8 transition-all duration-500 ${
                      isSelectedHover
                        ? 'border-[#c89d66] bg-[#141619] translate-x-1'
                        : 'border-[#f4f1ea]/15 bg-[#0c0d0e] hover:border-[#f4f1ea]/35'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.24em]">
                      <span className="text-[#c89d66]">
                        {ed.editionNumber} — {ed.season}
                      </span>
                      <span className="text-[#9e9a90]">
                        LECTURE : {ed.readingTime} // {ed.locationHeader}
                      </span>
                    </div>

                    <div className="mt-4 flex items-baseline justify-between gap-4">
                      <h4 className="font-serif text-3xl sm:text-5xl font-light text-[#f4f1ea] group-hover:text-[#c89d66] transition-colors">
                        {ed.hero.titleLines.join(' ')}
                      </h4>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#f4f1ea]/20 text-[#f4f1ea] transition-all group-hover:border-[#c89d66] group-hover:bg-[#c89d66] group-hover:text-[#0c0d0e]">
                        <ArrowUpRight className="h-5 w-5" />
                      </span>
                    </div>

                    <p className="mt-3 max-w-xl text-sm text-[#9e9a90] leading-relaxed font-light">
                      {ed.hero.subtitle}
                    </p>

                    <div className="mt-5 pt-4 hairline-t flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-[#9e9a90]">
                      <span>PAR {ed.hero.author.toUpperCase()}</span>
                      <span className="text-[#c89d66] group-hover:translate-x-1 transition-transform">
                        CHARGER CE NUMÉRO →
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Dynamic Visual Preview Card Reacting to Hover */}
            <div className="lg:col-span-5">
              <div
                onClick={() => onSelectEdition(hoveredEdition.id)}
                data-cursor="LIRE"
                className="group cursor-pointer border border-[#c89d66]/45 bg-[#141619] p-4 shadow-[0_30px_80px_rgba(0,0,0,0.85)]"
              >
                <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em]">
                  <span className="text-[#c89d66]">
                    PRÉVISUALISATION DYNAMIQUE // {hoveredEdition.editionNumber}
                  </span>
                  <span className="text-[#f4f1ea]">{hoveredEdition.coordinates}</span>
                </div>

                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <EditorialVisual
                    key={hoveredEdition.id}
                    src={hoveredEdition.hero.heroImage}
                    alt={hoveredEdition.hero.titleLines.join(' ')}
                    schematicType={hoveredEdition.hero.schematicType}
                    visualMode={visualMode}
                    catalogCode={hoveredEdition.code}
                    coordinates={hoveredEdition.coordinates}
                    cursorLabel="OUVRIR"
                    className="h-full w-full"
                  />
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9e9a90]">
                      {hoveredEdition.themeTag}
                    </p>
                    <p className="mt-1 font-serif italic text-xl text-[#f4f1ea]">
                      {hoveredEdition.hero.leadQuote}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Part 3: Sober Architectural Footer, Newsletter & Credits */}
        <div className="pt-16 grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Brand & Manifesto */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-3xl tracking-[0.14em] text-[#f4f1ea]">
                CHRONIQUE
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#c89d66]">
                REVUE D’ART &amp; D’ESPACE
              </span>
            </div>
            <p className="max-w-sm text-xs leading-relaxed text-[#9e9a90]">
              Publication numérique et semestrielle consacrée à l’architecture radicale, à la scénographie de la lumière et aux écritures visuelles contemporaines. ISSN 2940-881X.
            </p>
          </div>

          {/* Archival Dispatch Subscription */}
          <div className="md:col-span-4 space-y-3">
            <span className="block font-mono text-[10px] uppercase tracking-[0.24em] text-[#c89d66]">
              TIRAGE ARCHIVE &amp; LETTRE CURATORIALE
            </span>
            {subscribed ? (
              <div className="flex items-center gap-2 border border-[#c89d66]/50 bg-[#141619] px-4 py-3 font-mono text-xs text-[#c89d66]">
                <Check className="h-4 w-4" />
                <span>INSCRIPTION ENREGISTRÉE AUX ARCHIVES CHRONIQUE.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex">
                <div className="relative flex-1">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9e9a90]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre.adresse@atelier.fr"
                    className="w-full border border-[#f4f1ea]/20 bg-[#141619] pl-9 pr-3 py-2.5 font-mono text-xs text-[#f4f1ea] placeholder-[#9e9a90]/50 focus:border-[#c89d66] focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  data-cursor="S'ABONNER"
                  className="border border-l-0 border-[#c89d66] bg-[#c89d66] px-4 py-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#0c0d0e] transition-colors hover:bg-[#f4f1ea]"
                >
                  OK
                </button>
              </form>
            )}
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#9e9a90]">
              AUCUN ENVOI PUBLICITAIRE • UNIQUEMENT LORS DES PARUTIONS
            </p>
          </div>

          {/* Social Links & Back to Top */}
          <div className="md:col-span-3 flex flex-col md:items-end justify-between space-y-6">
            <div className="flex flex-wrap gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9e9a90]">
              <a
                href="#hero-cover"
                onClick={(e) => {
                  e.preventDefault();
                  onBackToTop();
                }}
                data-cursor="INSTAGRAM"
                className="hover:text-[#c89d66] transition-colors"
              >
                ARE.NA
              </a>
              <a
                href="#hero-cover"
                onClick={(e) => {
                  e.preventDefault();
                  onBackToTop();
                }}
                data-cursor="ARCHIVE"
                className="hover:text-[#c89d66] transition-colors"
              >
                INSTAGRAM
              </a>
              <a
                href="#hero-cover"
                onClick={(e) => {
                  e.preventDefault();
                  onBackToTop();
                }}
                data-cursor="COLOPHON"
                className="hover:text-[#c89d66] transition-colors"
              >
                FONDATION
              </a>
            </div>

            <button
              type="button"
              onClick={onBackToTop}
              data-cursor="REMONTER"
              className="inline-flex items-center gap-2 border border-[#f4f1ea]/20 bg-[#141619] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#f4f1ea] transition-all hover:border-[#c89d66] hover:text-[#c89d66]"
            >
              <span>RETOUR EN HAUT DE PAGE</span>
              <ArrowUp className="h-3.5 w-3.5 text-[#c89d66]" />
            </button>
          </div>
        </div>

        {/* Bottom Copyright & Edition Stamp */}
        <div className="mt-14 pt-6 hairline-t flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9e9a90]/70">
          <span>© 2026 CHRONIQUE ÉDITIONS — PARIS • KYOTO • ZÜRICH. TOUS DROITS RÉSERVÉS.</span>
          <span className="text-[#c89d66]">
            IMPRIMÉ NUMÉRIQUEMENT SUR MATRICE OBSIDIENNE #0C0D0E
          </span>
        </div>
      </div>
    </footer>
  );
};
