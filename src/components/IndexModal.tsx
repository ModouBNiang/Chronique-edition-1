import React from 'react';
import { X, ArrowUpRight, Compass, BookOpen } from 'lucide-react';
import { MagazineEdition } from '../data/magazineData';

interface IndexModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentEdition: MagazineEdition;
  allEditions: MagazineEdition[];
  onSelectSection: (sectionId: string) => void;
  onSelectEdition: (editionId: string) => void;
}

export const IndexModal: React.FC<IndexModalProps> = ({
  isOpen,
  onClose,
  currentEdition,
  allEditions,
  onSelectSection,
  onSelectEdition,
}) => {
  if (!isOpen) return null;

  const chapters = [
    {
      number: '00',
      id: 'hero-cover',
      title: currentEdition.hero.titleLines.join(' '),
      subtitle: 'Couverture monumentale, coordonnées & manifeste d’ouverture',
      meta: 'COUVERTURE ÉDITORIALE',
    },
    {
      number: '01',
      id: 'chapitre-1',
      title: currentEdition.chapter1.title,
      subtitle: currentEdition.chapter1.subtitle,
      meta: 'RÉCIT, LETTRINE & PARALLAXE',
    },
    {
      number: '02',
      id: 'chapitre-2',
      title: currentEdition.chapter2.title,
      subtitle: currentEdition.chapter2.subtitle,
      meta: 'COMPARATEUR OPTIQUE & ENTRETIEN',
    },
    {
      number: '03',
      id: 'galerie-horizontale',
      title: currentEdition.artworksSection.title,
      subtitle: `${currentEdition.artworksSection.items.length} planches grand format avec fiches techniques`,
      meta: 'GALERIE HORIZONTALE INTERACTIVE',
    },
    {
      number: '04',
      id: 'epilogue-outro',
      title: 'Épilogue, Colophon & Tirage',
      subtitle: 'Conclusion typographique, ours éditorial et numéros suivants',
      meta: 'CONCLUSION & ARCHIVES',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#0c0d0e]/95 backdrop-blur-xl overflow-y-auto"
      data-lenis-prevent
    >
      {/* Top Modal Bar */}
      <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between px-4 sm:px-8 md:px-12 hairline-b">
        <div className="flex items-center gap-4">
          <span className="font-serif text-xl tracking-[0.14em] text-[#f4f1ea]">
            CHRONIQUE
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#c89d66]">
            // SOMMAIRE GÉNÉRAL &amp; ARCHIVES
          </span>
        </div>

        <button
          onClick={onClose}
          data-cursor="FERMER"
          className="flex items-center gap-2 border border-[#f4f1ea]/20 bg-[#141619] px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#f4f1ea] transition-colors hover:border-[#c89d66] hover:text-[#c89d66]"
        >
          <span>FERMER [ESC]</span>
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="mx-auto my-auto w-full max-w-[1600px] px-4 py-10 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column (7 cols): Active Edition Chapters */}
          <div className="lg:col-span-7">
            <div className="mb-6 flex items-center justify-between pb-3 hairline-b">
              <div className="flex items-center gap-2">
                <BookOpen className="h-3.5 w-3.5 text-[#c89d66]" />
                <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#c89d66]">
                  SOMMAIRE DE L’{currentEdition.editionNumber}
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9e9a90]">
                TEMPS DE LECTURE : {currentEdition.readingTime}
              </span>
            </div>

            <div className="divide-y divide-[#f4f1ea]/10">
              {chapters.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => {
                    onSelectSection(ch.id);
                    onClose();
                  }}
                  data-cursor="ALLER"
                  className="group flex w-full items-start justify-between gap-4 py-5 text-left transition-all hover:pl-3"
                >
                  <div className="flex items-baseline gap-5">
                    <span className="font-mono text-xs text-[#c89d66]">
                      {ch.number}
                    </span>
                    <div>
                      <span className="block font-mono text-[9px] uppercase tracking-[0.24em] text-[#9e9a90]">
                        {ch.meta}
                      </span>
                      <h3 className="mt-1 font-serif text-2xl sm:text-3xl font-light text-[#f4f1ea] group-hover:text-[#c89d66] transition-colors">
                        {ch.title}
                      </h3>
                      <p className="mt-1 text-xs text-[#9e9a90] font-light">
                        {ch.subtitle}
                      </p>
                    </div>
                  </div>

                  <span className="mt-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#f4f1ea]/15 text-[#9e9a90] transition-all group-hover:border-[#c89d66] group-hover:bg-[#c89d66] group-hover:text-[#0c0d0e]">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column (5 cols): Edition Switcher (3 Full Issues) */}
          <div className="lg:col-span-5 lg:pl-10 lg:hairline-l space-y-6">
            <div className="pb-3 hairline-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="h-3.5 w-3.5 text-[#c89d66]" />
                <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#c89d66]">
                  CATALOGUE DES ÉDITIONS
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9e9a90]">
                03 NUMÉROS DISPONIBLES
              </span>
            </div>

            <div className="space-y-4">
              {allEditions.map((ed) => {
                const isActive = ed.id === currentEdition.id;
                return (
                  <div
                    key={ed.id}
                    onClick={() => {
                      onSelectEdition(ed.id);
                      onClose();
                    }}
                    data-cursor="CHARGER"
                    className={`group cursor-pointer border p-5 transition-all ${
                      isActive
                        ? 'border-[#c89d66] bg-[#141619]'
                        : 'border-[#f4f1ea]/15 bg-[#0c0d0e] hover:border-[#f4f1ea]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em]">
                      <span className="text-[#c89d66]">{ed.editionNumber}</span>
                      {isActive ? (
                        <span className="bg-[#c89d66] px-2 py-0.5 text-[9px] font-semibold text-[#0c0d0e]">
                          EN LECTURE
                        </span>
                      ) : (
                        <span className="text-[#9e9a90] group-hover:text-[#f4f1ea]">
                          {ed.season}
                        </span>
                      )}
                    </div>

                    <h4 className="mt-2 font-serif text-2xl text-[#f4f1ea] group-hover:text-[#c89d66] transition-colors">
                      {ed.hero.titleLines.join(' ')}
                    </h4>
                    <p className="mt-1 text-xs text-[#9e9a90] line-clamp-2">
                      {ed.hero.subtitle}
                    </p>
                    <div className="mt-3 pt-2 hairline-t flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-[#9e9a90]">
                      <span>{ed.locationHeader}</span>
                      <span className="text-[#c89d66]">LECTURE {ed.readingTime}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Modal Status Bar */}
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-4 py-4 sm:px-8 md:px-12 hairline-t font-mono text-[10px] uppercase tracking-[0.22em] text-[#9e9a90]">
        <span>CHRONIQUE MICRO-MAGAZINE INTERACTIF</span>
        <span>NAVIGATION RAPIDE PAR CHAPITRE</span>
      </div>
    </div>
  );
};
