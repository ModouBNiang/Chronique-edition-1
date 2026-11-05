import React, { useRef, useState } from 'react';
import { Sun, Moon, MoveHorizontal } from 'lucide-react';
import { MagazineEdition } from '../data/magazineData';
import { EditorialVisual, VisualFilterMode } from './EditorialVisual';

interface LightStudyChapterProps {
  edition: MagazineEdition;
  visualMode: VisualFilterMode;
}

export const LightStudyChapter: React.FC<LightStudyChapterProps> = ({
  edition,
  visualMode,
}) => {
  const [splitPercent, setSplitPercent] = useState<number>(52);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);

  const { chapter2 } = edition;
  const { lightStudy } = chapter2;

  const updateSliderFromClientX = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relX = clientX - rect.left;
    const pct = Math.max(4, Math.min(96, (relX / rect.width) * 100));
    setSplitPercent(Math.round(pct));
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateSliderFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    updateSliderFromClientX(e.clientX);
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <section id="chapitre-2" className="relative py-24 md:py-36 hairline-b bg-[#0e1012]">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-12">
        {/* Chapter Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 hairline-b">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 bg-[#c89d66]" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#c89d66]">
                {chapter2.index}
              </span>
            </div>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[#9e9a90]">
              {lightStudy.title}
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#c89d66]">
              {lightStudy.location}
            </p>
          </div>

          <div className="lg:col-span-8">
            <h2 className="title-chapter font-light text-[#f4f1ea]">
              {chapter2.title.split('&')[0]}
              {chapter2.title.includes('&') && (
                <span className="italic text-[#c89d66]">
                  &amp;{chapter2.title.split('&')[1]}
                </span>
              )}
            </h2>
            <p className="mt-4 max-w-2xl text-sm sm:text-base text-[#9e9a90] leading-relaxed font-light">
              {chapter2.intro}
            </p>
          </div>
        </div>

        {/* Interactive Photometric Light Comparator */}
        <div className="mt-12">
          {/* Top Preset Controls & Telemetry Bar */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4 border border-[#f4f1ea]/15 bg-[#141619] px-4 py-3">
            <div className="flex items-center gap-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em]">
              <Sun className="h-3.5 w-3.5 text-[#c89d66]" />
              <span className="text-[#f4f1ea]">{lightStudy.dayState.label}</span>
              <span className="hidden sm:inline text-[#9e9a90]">
                ({lightStudy.dayState.lux} // {lightStudy.dayState.kelvin})
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSplitPercent(88)}
                data-cursor="ZÉNITH"
                className={`px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] border transition-colors ${
                  splitPercent > 70
                    ? 'border-[#c89d66] bg-[#c89d66] text-[#0c0d0e]'
                    : 'border-[#f4f1ea]/15 text-[#9e9a90] hover:text-[#f4f1ea]'
                }`}
              >
                ZÉNITH
              </button>
              <button
                type="button"
                onClick={() => setSplitPercent(50)}
                data-cursor="50 / 50"
                className={`px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] border transition-colors ${
                  splitPercent >= 35 && splitPercent <= 70
                    ? 'border-[#c89d66] bg-[#c89d66] text-[#0c0d0e]'
                    : 'border-[#f4f1ea]/15 text-[#9e9a90] hover:text-[#f4f1ea]'
                }`}
              >
                DIPTYQUE 50%
              </button>
              <button
                type="button"
                onClick={() => setSplitPercent(12)}
                data-cursor="CRÉPUSCULE"
                className={`px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] border transition-colors ${
                  splitPercent < 35
                    ? 'border-[#c89d66] bg-[#c89d66] text-[#0c0d0e]'
                    : 'border-[#f4f1ea]/15 text-[#9e9a90] hover:text-[#f4f1ea]'
                }`}
              >
                CRÉPUSCULE
              </button>
            </div>

            <div className="flex items-center gap-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em]">
              <span className="hidden sm:inline text-[#9e9a90]">
                ({lightStudy.duskState.lux} // {lightStudy.duskState.kelvin})
              </span>
              <span className="text-[#f4f1ea]">{lightStudy.duskState.label}</span>
              <Moon className="h-3.5 w-3.5 text-[#c89d66]" />
            </div>
          </div>

          {/* Interactive Split Viewport */}
          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            data-cursor="GLISSER"
            className="relative aspect-[16/10] sm:aspect-[21/10] w-full overflow-hidden border border-[#f4f1ea]/20 bg-[#0c0d0e] select-none touch-none"
          >
            {/* Base Layer: Dusk / Mineral Twilight State */}
            <div className="absolute inset-0">
              <EditorialVisual
                src={lightStudy.duskState.imageUrl}
                alt={lightStudy.duskState.label}
                schematicType="vault"
                visualMode={visualMode}
                showCornerCrosshairs={false}
                className="h-full w-full"
              />
              <div className="pointer-events-none absolute bottom-4 right-4 z-20 max-w-xs bg-[#0c0d0e]/85 backdrop-blur-md border border-[#f4f1ea]/15 p-3.5 text-right">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#c89d66]">
                  {lightStudy.duskState.time} — {lightStudy.duskState.lux}
                </span>
                <p className="mt-1 text-xs text-[#f4f1ea]/90 leading-relaxed">
                  {lightStudy.duskState.note}
                </p>
              </div>
            </div>

            {/* Clipped Foreground Layer: Zenith Daylight State */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - splitPercent}% 0 0)` }}
            >
              <EditorialVisual
                src={lightStudy.dayState.imageUrl}
                alt={lightStudy.dayState.label}
                schematicType="monolith"
                visualMode={visualMode}
                showCornerCrosshairs={false}
                className="h-full w-full"
              />
              <div className="pointer-events-none absolute bottom-4 left-4 z-20 max-w-xs bg-[#0c0d0e]/85 backdrop-blur-md border border-[#f4f1ea]/15 p-3.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#c89d66]">
                  {lightStudy.dayState.time} — {lightStudy.dayState.lux}
                </span>
                <p className="mt-1 text-xs text-[#f4f1ea]/90 leading-relaxed">
                  {lightStudy.dayState.note}
                </p>
              </div>
            </div>

            {/* Vertical Architectural Split Line & Handle */}
            <div
              className="pointer-events-none absolute top-0 bottom-0 z-30 w-[1px] bg-[#c89d66]"
              style={{ left: `${splitPercent}%` }}
            >
              <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-[#c89d66] bg-[#0c0d0e]/90 text-[#f4f1ea] shadow-[0_0_25px_rgba(0,0,0,0.85)]">
                <MoveHorizontal className="h-4 w-4 text-[#c89d66]" />
              </div>
              <div className="absolute top-3 -translate-x-1/2 bg-[#0c0d0e]/90 border border-[#c89d66]/50 px-2 py-0.5 font-mono text-[9px] tracking-widest text-[#c89d66]">
                {splitPercent}%
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Dialogue / Entretien Croisé */}
        <div className="mt-20 pt-14 hairline-t">
          <div className="mb-10 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#c89d66]">
              ENTRETIEN CROISÉ // CONVERSATION EN ATELIER
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9e9a90]">
              ARCHIVE AUDIO TRANSCRITE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {chapter2.dialogue.map((item, idx) => (
              <div
                key={idx}
                className="border border-[#f4f1ea]/15 bg-[#141619]/70 p-6 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 hairline-b">
                    <div>
                      <h3 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-[#f4f1ea]">
                        {item.speaker}
                      </h3>
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#c89d66]">
                        {item.role}
                      </p>
                    </div>
                    <span className="font-serif italic text-2xl text-[#c89d66]/60">
                      0{idx + 1}
                    </span>
                  </div>

                  <p className="mt-6 font-mono text-xs uppercase tracking-[0.12em] text-[#9e9a90] leading-relaxed">
                    Q : « {item.question} »
                  </p>

                  <p className="mt-5 font-serif text-xl sm:text-2xl text-[#f4f1ea] leading-relaxed font-light italic">
                    « {item.answer} »
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
