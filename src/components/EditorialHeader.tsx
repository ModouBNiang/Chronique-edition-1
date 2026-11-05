import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Grid, Eye } from 'lucide-react';
import { MagazineEdition } from '../data/magazineData';
import { VisualFilterMode } from './EditorialVisual';

interface EditorialHeaderProps {
  edition: MagazineEdition;
  scrollProgress: number;
  activeChapterLabel: string;
  onOpenIndex: () => void;
  visualMode: VisualFilterMode;
  onCycleVisualMode: () => void;
  showGrid: boolean;
  onToggleGrid: () => void;
  onLogoClick: () => void;
}

export const EditorialHeader: React.FC<EditorialHeaderProps> = ({
  edition,
  scrollProgress,
  activeChapterLabel,
  onOpenIndex,
  visualMode,
  onCycleVisualMode,
  showGrid,
  onToggleGrid,
  onLogoClick,
}) => {
  const [audioActive, setAudioActive] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Format current date in refined French editorial format
  const formattedToday = new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
    .format(new Date())
    .toUpperCase();

  // Optional Web Audio API museum ambient harmonic drone
  const toggleAmbientSound = () => {
    if (!audioActive) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + 1.8);
        masterGain.connect(ctx.destination);

        // Warm A2 + E3 + C#4 fifth chord in sine/triangle waves
        const freqs = [110, 164.81, 220, 277.18];
        freqs.forEach((f, idx) => {
          const osc = ctx.createOscillator();
          const oscGain = ctx.createGain();
          osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(f, ctx.currentTime);
          oscGain.gain.setValueAtTime(0.25 / (idx + 1), ctx.currentTime);
          osc.connect(oscGain);
          oscGain.connect(masterGain);
          osc.start();
        });

        audioCtxRef.current = ctx;
        gainNodeRef.current = masterGain;
        setAudioActive(true);
      } catch {
        setAudioActive(false);
      }
    } else {
      if (audioCtxRef.current && gainNodeRef.current) {
        try {
          gainNodeRef.current.gain.exponentialRampToValueAtTime(
            0.0001,
            audioCtxRef.current.currentTime + 0.5
          );
          setTimeout(() => {
            audioCtxRef.current?.close();
            audioCtxRef.current = null;
          }, 550);
        } catch {
          audioCtxRef.current?.close();
        }
      }
      setAudioActive(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const progressPercentage = Math.min(100, Math.max(0, Math.round(scrollProgress * 100)));

  const visualModeLabel =
    visualMode === 'cinematic'
      ? 'CINÉMA'
      : visualMode === 'monochrome'
      ? 'ARCHIVE N&B'
      : 'PLAN 1:100';

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0c0d0e]/85 backdrop-blur-md hairline-b">
      {/* Top 2px Minimalist Reading Progress Bar */}
      <div className="relative h-[2px] w-full bg-[#f4f1ea]/10 overflow-hidden">
        <div
          className="h-full bg-[#c89d66] transition-transform duration-150 ease-out origin-left"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 sm:px-8 md:px-12">
        {/* Left: Stylized Brand Mark + Edition Number + Date */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={onLogoClick}
            data-cursor="HAUT"
            className="group flex items-baseline gap-3 text-left focus:outline-none"
          >
            <span className="font-serif text-xl sm:text-2xl font-medium tracking-[0.14em] text-[#f4f1ea] transition-colors group-hover:text-[#c89d66]">
              CHRONIQUE
            </span>
            <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-[0.25em] text-[#c89d66] border border-[#c89d66]/40 px-2 py-0.5">
              {edition.editionNumber}
            </span>
          </button>

          <div className="hidden lg:flex items-center gap-3 pl-4 hairline-l font-mono text-[10px] uppercase tracking-[0.22em] text-[#9e9a90]">
            <span>{formattedToday}</span>
            <span className="text-[#c89d66]">•</span>
            <span>LECTURE : {edition.readingTime}</span>
          </div>
        </div>

        {/* Center: Dynamic Active Chapter & Completion Telemetry */}
        <div className="hidden xl:flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.22em]">
          <span className="text-[#9e9a90] transition-all duration-300">
            {activeChapterLabel}
          </span>
          <span className="text-[#f4f1ea]/25">//</span>
          <span className="tabular-nums text-[#c89d66] w-12">
            {String(progressPercentage).padStart(2, '0')}%
          </span>
        </div>

        {/* Right: Optical Filter, Grid, Soundscape & Full-Screen Index Trigger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Optical Mode Switcher */}
          <button
            onClick={onCycleVisualMode}
            data-cursor="OPTIQUE"
            title="Changer le filtre optique des planches"
            className="hidden md:flex items-center gap-2 border border-[#f4f1ea]/15 bg-[#141619]/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#9e9a90] transition-colors hover:border-[#c89d66]/60 hover:text-[#f4f1ea]"
          >
            <Eye className="h-3 w-3 text-[#c89d66]" />
            <span>{visualModeLabel}</span>
          </button>

          {/* Architectural Grid Toggle */}
          <button
            onClick={onToggleGrid}
            data-cursor="GRILLE"
            title="Afficher / Masquer la grille architecturale 12 colonnes"
            className={`hidden sm:flex items-center gap-1.5 border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
              showGrid
                ? 'border-[#c89d66] bg-[#c89d66]/15 text-[#f4f1ea]'
                : 'border-[#f4f1ea]/15 bg-transparent text-[#9e9a90] hover:border-[#f4f1ea]/35 hover:text-[#f4f1ea]'
            }`}
          >
            <Grid className="h-3 w-3" />
            <span className="hidden lg:inline">GRILLE</span>
          </button>

          {/* Ambient Soundscape Toggle */}
          <button
            onClick={toggleAmbientSound}
            data-cursor="AUDIO"
            title="Activer l'ambiance sonore minérale"
            className={`flex items-center gap-1.5 border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
              audioActive
                ? 'border-[#c89d66] bg-[#c89d66]/15 text-[#c89d66]'
                : 'border-[#f4f1ea]/15 text-[#9e9a90] hover:border-[#f4f1ea]/35 hover:text-[#f4f1ea]'
            }`}
          >
            {audioActive ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
          </button>

          {/* Minimalist Textual Hamburger / Index Trigger */}
          <button
            onClick={onOpenIndex}
            data-cursor="SOMMAIRE"
            className="group flex items-center gap-3 border border-[#f4f1ea]/20 bg-[#141619] px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-[#f4f1ea] transition-all hover:border-[#c89d66] hover:bg-[#c89d66] hover:text-[#0c0d0e]"
          >
            <span>INDEX</span>
            <span className="flex flex-col gap-[3px]">
              <span className="block h-[1px] w-3.5 bg-current transition-transform group-hover:translate-x-0.5" />
              <span className="block h-[1px] w-2.5 bg-current transition-all group-hover:w-3.5" />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
