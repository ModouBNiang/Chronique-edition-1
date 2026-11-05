import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArtworkPlate,
  MAGAZINE_EDITIONS,
  NarrativeIllustration,
} from './data/magazineData';
import { FilmGrainOverlay } from './components/FilmGrainOverlay';
import { CustomCursor } from './components/CustomCursor';
import { EditorialHeader } from './components/EditorialHeader';
import { HeroCover } from './components/HeroCover';
import { NarrativeChapter } from './components/NarrativeChapter';
import { LightStudyChapter } from './components/LightStudyChapter';
import { HorizontalGallery } from './components/HorizontalGallery';
import { EditorialOutro } from './components/EditorialOutro';
import { IndexModal } from './components/IndexModal';
import { ArtworkLightbox, InspectedPlateData } from './components/ArtworkLightbox';
import { VisualFilterMode } from './components/EditorialVisual';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [activeEditionId, setActiveEditionId] = useState<string>('edition-01');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeChapterLabel, setActiveChapterLabel] = useState<string>(
    '00 // COUVERTURE ÉDITORIALE'
  );
  const [visualMode, setVisualMode] = useState<VisualFilterMode>('cinematic');
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [isIndexOpen, setIsIndexOpen] = useState<boolean>(false);
  const [inspectedPlate, setInspectedPlate] = useState<InspectedPlateData | null>(null);
  const [isTransitioningEdition, setIsTransitioningEdition] = useState<boolean>(false);

  const lenisRef = useRef<Lenis | null>(null);

  const currentEdition =
    MAGAZINE_EDITIONS.find((ed) => ed.id === activeEditionId) || MAGAZINE_EDITIONS[0];

  // Initialize Lenis Smooth Scroll & Sync with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    const handleLenisScroll = () => {
      ScrollTrigger.update();

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      setScrollProgress(progress);

      // Update active chapter indicator based on viewport position
      const sections = [
        { id: 'epilogue-outro', label: '04 // ÉPILOGUE & COLOPHON' },
        { id: 'galerie-horizontale', label: '03 // GALERIE FOCUS ARTWORKS' },
        { id: 'chapitre-2', label: '02 // MATIÈRE & CONTRE-JOUR' },
        { id: 'chapitre-1', label: '01 // RÉCIT & PARALLAXE' },
        { id: 'hero-cover', label: '00 // COUVERTURE ÉDITORIALE' },
      ];

      const viewportMid = window.innerHeight * 0.42;
      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= viewportMid) {
            setActiveChapterLabel(sec.label);
            break;
          }
        }
      }
    };

    lenis.on('scroll', handleLenisScroll);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Pause Lenis when a full-screen modal is open
  useEffect(() => {
    if (!lenisRef.current) return;
    if (isIndexOpen || inspectedPlate) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
    }
  }, [isIndexOpen, inspectedPlate]);

  // Escape key handler for modals
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsIndexOpen(false);
        setInspectedPlate(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target && lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: -64, duration: 1.4 });
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectEdition = (editionId: string) => {
    if (editionId === activeEditionId) {
      scrollToTop();
      return;
    }
    setIsTransitioningEdition(true);
    setTimeout(() => {
      setActiveEditionId(editionId);
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
      setTimeout(() => {
        ScrollTrigger.refresh();
        setIsTransitioningEdition(false);
      }, 150);
    }, 380);
  };

  const cycleVisualMode = () => {
    setVisualMode((prev) =>
      prev === 'cinematic'
        ? 'monochrome'
        : prev === 'monochrome'
        ? 'blueprint'
        : 'cinematic'
    );
  };

  const handleInspectHero = () => {
    setInspectedPlate({
      catalogNumber: currentEdition.hero.heroSpecs.archiveRef,
      title: currentEdition.hero.titleLines.join(' '),
      subtitle: currentEdition.hero.kicker,
      artist: currentEdition.hero.photographyCredit,
      location: currentEdition.locationHeader,
      coordinates: currentEdition.coordinates,
      year: currentEdition.publicationDate,
      medium: currentEdition.hero.heroSpecs.filmStock,
      dimensions: currentEdition.hero.heroSpecs.elevation,
      optics: currentEdition.hero.heroSpecs.focalLength,
      imageUrl: currentEdition.hero.heroImage,
      description: currentEdition.hero.heroCaption,
      curatorialNote: currentEdition.hero.leadQuote,
      schematicType: currentEdition.hero.schematicType,
    });
  };

  const handleInspectIllustration = (ill: NarrativeIllustration) => {
    setInspectedPlate({
      catalogNumber: ill.figureNumber,
      title: ill.title,
      artist: currentEdition.hero.photographyCredit,
      location: ill.location,
      coordinates: ill.coordinates,
      year: ill.year,
      medium: 'Tirage Archival sur Papier Baryté',
      dimensions: 'Cadrage Architectural 1:100',
      optics: ill.optics,
      imageUrl: ill.imageUrl,
      description: ill.caption,
      schematicType: ill.schematicType,
    });
  };

  const handleInspectArtwork = (art: ArtworkPlate) => {
    setInspectedPlate({
      catalogNumber: art.catalogNumber,
      title: art.title,
      subtitle: art.subtitle,
      artist: art.artist,
      location: art.location,
      coordinates: art.coordinates,
      year: art.year,
      medium: art.medium,
      dimensions: art.dimensions,
      optics: art.optics,
      reverberation: art.reverberation,
      imageUrl: art.imageUrl,
      description: art.description,
      curatorialNote: art.curatorialNote,
      palette: art.palette,
      schematicType: art.schematicType,
    });
  };

  return (
    <div className="relative min-h-screen bg-[#0c0d0e] text-[#f4f1ea] selection:bg-[#c89d66]/30 selection:text-[#f4f1ea]">
      {/* Custom Magnetic Cursor */}
      <CustomCursor />

      {/* Film Grain & Optional Swiss 12-Col Grid Overlay */}
      <FilmGrainOverlay showGrid={showGrid} />

      {/* Edition Transition Curtain */}
      <div
        className={`pointer-events-none fixed inset-0 z-[60] flex items-center justify-center bg-[#0c0d0e] transition-opacity duration-500 ${
          isTransitioningEdition ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="text-center">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#c89d66]">
            CHARGEMENT DU TIRAGE ARCHIVE...
          </span>
        </div>
      </div>

      {/* Fixed Minimalist Editorial Header & Progress Bar */}
      <EditorialHeader
        edition={currentEdition}
        scrollProgress={scrollProgress}
        activeChapterLabel={activeChapterLabel}
        onOpenIndex={() => setIsIndexOpen(true)}
        visualMode={visualMode}
        onCycleVisualMode={cycleVisualMode}
        showGrid={showGrid}
        onToggleGrid={() => setShowGrid((g) => !g)}
        onLogoClick={scrollToTop}
      />

      {/* Main Editorial Scrollytelling Stream */}
      <main>
        {/* 1. Immersive Hero Cover */}
        <HeroCover
          edition={currentEdition}
          visualMode={visualMode}
          onInspectHero={handleInspectHero}
          onExploreClick={() => scrollToSection('chapitre-1')}
        />

        {/* 2. Narrative & Multi-Speed Parallax Spread (Chapitre 1) */}
        <NarrativeChapter
          edition={currentEdition}
          visualMode={visualMode}
          onInspectIllustration={handleInspectIllustration}
        />

        {/* 3. Photometric Light Comparator & Atelier Dialogue (Chapitre 2) */}
        <LightStudyChapter edition={currentEdition} visualMode={visualMode} />

        {/* 4. Scroll-Driven Horizontal Exhibition Gallery (Chapitre 3) */}
        <HorizontalGallery
          edition={currentEdition}
          visualMode={visualMode}
          onInspectArtwork={handleInspectArtwork}
        />

        {/* 5. Monumental Outro, Dynamic "Next Edition" Selector & Sober Footer */}
        <EditorialOutro
          currentEdition={currentEdition}
          allEditions={MAGAZINE_EDITIONS}
          visualMode={visualMode}
          onSelectEdition={handleSelectEdition}
          onBackToTop={scrollToTop}
        />
      </main>

      {/* Full-Screen Index / Sommaire Modal */}
      <IndexModal
        isOpen={isIndexOpen}
        onClose={() => setIsIndexOpen(false)}
        currentEdition={currentEdition}
        allEditions={MAGAZINE_EDITIONS}
        onSelectSection={scrollToSection}
        onSelectEdition={handleSelectEdition}
      />

      {/* Full-Screen Lighttable Artwork Inspector Modal */}
      <ArtworkLightbox
        plate={inspectedPlate}
        onClose={() => setInspectedPlate(null)}
        defaultVisualMode={visualMode}
      />
    </div>
  );
}

export default App;
