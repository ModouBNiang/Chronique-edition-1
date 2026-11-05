import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Grid, Eye, Music, Play, Pause, Disc } from 'lucide-react';
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

const AUDIO_TRACKS = [
  {
    title: 'Gymnopédie N° 1',
    composer: 'Erik Satie',
    style: 'Piano Chill & Contemplation Minérale',
    localSrc: './audio/ambient-chill.mp3',
    fallbackSrc:
      'https://upload.wikimedia.org/wikipedia/commons/2/2a/Gymnopedie_No._1_%28ISRC_USUAN1100787%29.mp3',
  },
];

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.65);
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [trackLoaded, setTrackLoaded] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sourceIndexRef = useRef(0);

  // Format current date in refined French editorial format
  const formattedToday = new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
    .format(new Date())
    .toUpperCase();

  // Initialize and handle Audio player lifecycle
  useEffect(() => {
    const track = AUDIO_TRACKS[0];
    const audio = new Audio();
    audio.loop = true;
    audio.volume = volume;
    audio.preload = 'metadata';

    // Try local first, fallback to CDN if not found
    audio.src = track.localSrc;

    const onCanPlay = () => setTrackLoaded(true);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onError = () => {
      // If relative file fails, switch to remote CDN
      if (sourceIndexRef.current === 0) {
        sourceIndexRef.current = 1;
        audio.src = track.fallbackSrc;
        audio.load();
        if (isPlaying) {
          audio.play().catch(() => {});
        }
      }
    };

    audio.addEventListener('canplay', onCanPlay);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('error', onError);

    audioRef.current = audio;

    return () => {
      audio.removeEventListener('canplay', onCanPlay);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('error', onError);
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, []);

  // Sync volume updates
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlaySound = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Fallback directly to CDN stream if browser blocked local file
        if (audioRef.current && sourceIndexRef.current === 0) {
          sourceIndexRef.current = 1;
          audioRef.current.src = AUDIO_TRACKS[0].fallbackSrc;
          audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      });
    }
  };

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

        {/* Right: Optical Filter, Grid, Chill Soundscape & Full-Screen Index Trigger */}
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

          {/* Chill Ambient Soundtrack Button */}
          <div className="relative">
            <button
              onClick={togglePlaySound}
              onContextMenu={(e) => {
                e.preventDefault();
                setShowPlayerModal((prev) => !prev);
              }}
              data-cursor={isPlaying ? "PAUSE" : "MUSIQUE"}
              title="Musique : Erik Satie - Gymnopédie N° 1 (Clic droit pour options)"
              aria-label="Musique d'ambiance"
              className={`flex items-center justify-center gap-1.5 border px-2.5 py-1.5 font-mono text-[10px] transition-all ${
                isPlaying
                  ? 'border-[#c89d66] bg-[#c89d66]/20 text-[#c89d66] shadow-[0_0_15px_rgba(200,157,102,0.25)]'
                  : 'border-[#f4f1ea]/15 bg-[#141619]/60 text-[#9e9a90] hover:border-[#f4f1ea]/40 hover:text-[#f4f1ea]'
              }`}
            >
              <Music className="h-3.5 w-3.5" />
              {isPlaying && (
                <span className="flex items-end gap-[2px] h-3 w-3 justify-center py-[1px]">
                  <span className="w-[2px] bg-[#c89d66] rounded-full animate-eq-1 inline-block" />
                  <span className="w-[2px] bg-[#c89d66] rounded-full animate-eq-2 inline-block" />
                  <span className="w-[2px] bg-[#c89d66] rounded-full animate-eq-3 inline-block" />
                </span>
              )}
            </button>

            {/* Floating Audio Popover / Mini-Lecteur */}
            {showPlayerModal && (
              <div className="absolute right-0 top-12 z-50 w-72 border border-[#c89d66]/40 bg-[#141619] p-4 shadow-[0_15px_40px_rgba(0,0,0,0.85)] backdrop-blur-md">
                <div className="flex items-center justify-between pb-2 hairline-b">
                  <div className="flex items-center gap-2">
                    <Disc className={`h-3.5 w-3.5 text-[#c89d66] ${isPlaying ? 'animate-spin' : ''}`} />
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#c89d66]">
                      BANDE SONORE ÉDITORIALE
                    </span>
                  </div>
                  <button
                    onClick={() => setShowPlayerModal(false)}
                    className="font-mono text-[10px] text-[#9e9a90] hover:text-[#f4f1ea]"
                  >
                    ✕
                  </button>
                </div>

                <div className="my-3 space-y-1">
                  <p className="font-serif text-base text-[#f4f1ea] font-medium leading-snug">
                    {AUDIO_TRACKS[0].title}
                  </p>
                  <p className="font-mono text-[10px] text-[#c89d66]">
                    {AUDIO_TRACKS[0].composer}
                  </p>
                  <p className="text-[11px] text-[#9e9a90] italic">
                    {AUDIO_TRACKS[0].style}
                  </p>
                </div>

                {/* Volume Slider */}
                <div className="pt-2 hairline-t space-y-1.5">
                  <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-[#9e9a90]">
                    <span>VOLUME</span>
                    <span>{Math.round(volume * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-full accent-[#c89d66] h-1 bg-[#f4f1ea]/15 rounded cursor-pointer"
                  />
                </div>

                {/* Play/Pause Button */}
                <div className="mt-3 pt-2 hairline-t flex items-center justify-between">
                  <button
                    onClick={togglePlaySound}
                    className="flex w-full items-center justify-center gap-2 border border-[#c89d66] bg-[#c89d66]/15 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#f4f1ea] hover:bg-[#c89d66] hover:text-[#0c0d0e] transition-colors"
                  >
                    {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3 fill-current" />}
                    <span>{isPlaying ? 'PAUSE' : 'LANCER LA MUSIQUE'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

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
