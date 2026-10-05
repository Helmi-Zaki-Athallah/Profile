import React, { useRef, useEffect } from 'react';
import { personalInfo, getLocalized } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import Magnetic from './Magnetic';

/**
 * 3-Track Infinite Sliding Window (Ala Kush Agrawal & Locomotive)
 * Permanently eliminates any jumping or teleporting when changing directions.
 */
function ScrollRunningText({ items }) {
  const trackLeftRef = useRef(null);
  const trackCenterRef = useRef(null);
  const trackRightRef = useRef(null);

  const xPercent = useRef(0);
  const prevScrollY = useRef(0);
  const currentSpeed = useRef(0.018); // calm, elegant idle drift
  const targetSpeed = useRef(0.018);

  useEffect(() => {
    prevScrollY.current = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - prevScrollY.current;

      if (Math.abs(delta) > 0.5) {
        // Controlled, comfortable scroll boost (capped at ~0.18 instead of 1.8)
        const boost = Math.min(0.06 + Math.abs(delta) * 0.0006, 0.18);
        if (delta > 0) {
          // Scroll down -> move to the right
          targetSpeed.current = boost;
        } else {
          // Scroll up -> move to the left
          targetSpeed.current = -boost;
        }
      }

      prevScrollY.current = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    let reqId;
    const animate = () => {
      // Gentle LERP smoothing for velocity
      currentSpeed.current += (targetSpeed.current - currentSpeed.current) * 0.045;

      // Relax target speed back to calm idle cruise (0.018% per frame)
      const idle = targetSpeed.current >= 0 ? 0.018 : -0.018;
      targetSpeed.current += (idle - targetSpeed.current) * 0.02;

      // Advance position smoothly
      xPercent.current += currentSpeed.current;

      // Seamless wrap: exactly 100% of one track
      if (xPercent.current >= 100) {
        xPercent.current -= 100;
      } else if (xPercent.current <= -100) {
        xPercent.current += 100;
      }

      // Apply transform directly to GPU
      const transformStr = `translate3d(${xPercent.current}%, 0, 0)`;
      if (trackLeftRef.current) trackLeftRef.current.style.transform = transformStr;
      if (trackCenterRef.current) trackCenterRef.current.style.transform = transformStr;
      if (trackRightRef.current) trackRightRef.current.style.transform = transformStr;

      reqId = requestAnimationFrame(animate);
    };

    reqId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(reqId);
    };
  }, []);

  const renderContent = () => (
    <div className="flex items-center flex-nowrap whitespace-nowrap will-change-transform">
      {items.map((item, itemIdx) => (
        <div key={itemIdx} className="flex items-center flex-nowrap">
          <span
            className={`font-bebas text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wider uppercase transition-colors duration-300 ${
              item.type === 'highlight'
                ? 'text-cobalt'
                : item.type === 'accent'
                ? 'text-zinc-300'
                : 'text-white/90'
            }`}
          >
            {item.text}
          </span>
          <span className="text-zinc-700/80 font-bebas text-2xl sm:text-4xl lg:text-5xl px-4 sm:px-8 select-none">
            —
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative z-20 w-full overflow-hidden py-3 sm:py-5 select-none pointer-events-none">
      <div className="relative w-max flex whitespace-nowrap">
        {/* Track Left (-100%) */}
        <div
          ref={trackLeftRef}
          style={{ position: 'absolute', top: 0, left: '-100%' }}
        >
          {renderContent()}
        </div>

        {/* Track Center (0%) - relative defines container width & height */}
        <div ref={trackCenterRef} style={{ position: 'relative' }}>
          {renderContent()}
        </div>

        {/* Track Right (+100%) */}
        <div
          ref={trackRightRef}
          style={{ position: 'absolute', top: 0, left: '100%' }}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default function CinematicHero({ onDownloadResume }) {
  const { language, t } = useLanguage();

  // Styled Marquee items with distinct typography treatments
  const marqueeItems = [
    { text: personalInfo.name, type: 'primary' },
    { text: t.hero.marquee.wpSpecialist, type: 'accent' },
    { text: t.hero.marquee.logisticsCoord, type: 'outline' },
    { text: t.hero.marquee.frontendCreator, type: 'highlight' },
    { text: t.hero.marquee.unpam, type: 'accent' },
    { text: t.hero.marquee.cleanArch, type: 'outline' },
  ];

  return (
    <section
      id="home"
      className="relative min-h-[100svh] w-full flex flex-col justify-between overflow-hidden bg-[#0e0e11] pt-20 sm:pt-24 select-none"
    >
      {/* Background Film Grain & Soft Vignette */}
      <div className="absolute inset-0 film-grain pointer-events-none z-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0e0e11] pointer-events-none z-10" />
      
      {/* Static Lightweight Ambient Cobalt Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] md:w-[750px] h-[350px] sm:h-[600px] rounded-full pointer-events-none opacity-60"
        style={{
          background: 'radial-gradient(circle, rgba(69, 92, 233, 0.18) 0%, rgba(0, 240, 255, 0.08) 40%, transparent 70%)',
        }}
      />

      {/* Giant Static Background Typography Layer (Bebas Neue) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        <div className="flex flex-col items-center leading-none text-center">
          <span className="font-bebas text-[18vw] sm:text-[15vw] text-zinc-800/25 uppercase tracking-tighter">
            HELMI ZAKI
          </span>
          <span className="font-bebas text-[18vw] sm:text-[15vw] text-outline uppercase tracking-tight -mt-[4vw]">
            ATHALLAH
          </span>
        </div>
      </div>

      {/* Main Center Hero Portrait Cutout Silhouette */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-end max-w-5xl mx-auto px-4 w-full h-full pointer-events-none">
        <div className="relative flex items-end justify-center w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[460px] md:max-w-[540px] lg:max-w-[600px] h-[50vh] xs:h-[55vh] sm:h-[62vh] md:h-[68vh] lg:h-[72vh] max-h-[740px]">
          
          {/* Subtle Ambient Light under Photo */}
          <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#0e0e11] via-[#0e0e11]/50 to-transparent z-10" />

          {/* Full Portrait Cutout */}
          <img
            src="/foto/Helmi-live.png"
            alt="Helmi Zaki Athallah"
            loading="eager"
            fetchpriority="high"
            decoding="async"
            className="w-full h-full object-contain object-bottom contrast-[1.02] brightness-[1.02] pointer-events-auto"
            style={{
              filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.85))',
              transform: 'translateZ(0)',
            }}
            onError={(e) => {
              e.currentTarget.src = '/foto/Helmi.png';
            }}
          />
        </div>
      </div>

      {/* Transparent Scroll-Driven Running Text (Scroll down -> Right, Scroll up -> Left) */}
      <ScrollRunningText items={marqueeItems} />

      {/* Bottom Hero Info Bar (Left Description + Right Magnetic Résumé Button) */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-8 md:px-12 py-6 sm:py-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-5">
        
        {/* Left: Role & Academic Focus Tagline */}
        <div className="flex flex-col gap-1 sm:gap-1.5 max-w-lg">
          <div className="flex items-center gap-2">
            <span className="text-[11px] sm:text-xs uppercase tracking-[2px] text-zinc-400 font-mono">
              {t.hero.availableStatus}
            </span>
          </div>
          <p className="text-xs sm:text-sm font-mono text-zinc-400 leading-relaxed">
            {getLocalized(personalInfo.subHeadline, language)}
          </p>
        </div>

        {/* Right: Direct High-Impact Action CTAs */}
        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
          <Magnetic strength={0.3}>
            <a
              href={personalInfo.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <span>{t.hero.quickChat}</span>
              <span className="text-[10px]">&rarr;</span>
            </a>
          </Magnetic>

          <Magnetic strength={0.35}>
            <button
              onClick={onDownloadResume}
              className="group relative px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-cobalt hover:bg-cobalt-hover text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-[0_4px_30px_rgba(69,92,233,0.4)] hover:shadow-[0_6px_40px_rgba(69,92,233,0.6)] hover:scale-105 active:scale-95 flex items-center gap-3 cursor-pointer"
            >
              <span>{t.hero.downloadCv}</span>
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] group-hover:translate-y-0.5 transition-transform">
                &darr;
              </span>
            </button>
          </Magnetic>
        </div>

      </div>
    </section>
  );
}
