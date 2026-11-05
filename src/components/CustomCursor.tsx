import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorLabel, setCursorLabel] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isFinePointer, setIsFinePointer] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsFinePointer(mediaQuery.matches);

    if (!mediaQuery.matches) return;

    document.body.classList.add('custom-cursor-enabled');

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;
      }

      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest('[data-cursor]') as HTMLElement | null;
      const clickableEl = target?.closest('a, button, [role="button"], input') as HTMLElement | null;

      if (interactiveEl) {
        const label = interactiveEl.getAttribute('data-cursor') || '';
        setCursorLabel(label);
        setIsHovered(true);
      } else if (clickableEl) {
        setCursorLabel('');
        setIsHovered(true);
      } else {
        setCursorLabel('');
        setIsHovered(false);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const renderLoop = () => {
      ring.x += (mouse.x - ring.x) * 0.16;
      ring.y += (mouse.y - ring.y) * 0.16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    rafId = requestAnimationFrame(renderLoop);

    return () => {
      document.body.classList.remove('custom-cursor-enabled');
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (!isFinePointer) return null;

  const hasText = cursorLabel.length > 0;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[100] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Precision Inner Dot */}
      <div
        ref={dotRef}
        className={`fixed left-0 top-0 rounded-full bg-[#c89d66] transition-all duration-200 ${
          hasText ? 'h-1.5 w-1.5 opacity-0' : isHovered ? 'h-2 w-2 bg-[#f4f1ea]' : 'h-1.5 w-1.5'
        }`}
      />

      {/* Magnetic Lagging Outer Ring / Contextual Pill */}
      <div
        ref={ringRef}
        className={`fixed left-0 top-0 flex items-center justify-center rounded-full transition-[width,height,background-color,border-color,backdrop-filter] duration-300 ease-out ${
          hasText
            ? 'h-24 w-24 border border-[#c89d66]/80 bg-[#0c0d0e]/85 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.65)]'
            : isHovered
            ? 'h-12 w-12 border border-[#f4f1ea]/60 bg-[#f4f1ea]/10'
            : 'h-9 w-9 border border-[#f4f1ea]/30 bg-transparent'
        }`}
      >
        {hasText && (
          <span className="px-2 text-center font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#f4f1ea]">
            {cursorLabel}
          </span>
        )}
      </div>
    </div>
  );
};
