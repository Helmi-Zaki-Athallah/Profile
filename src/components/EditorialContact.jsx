import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import Magnetic from './Magnetic';

export default function EditorialContact({ onShowToast }) {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    if (onShowToast) onShowToast(t.toasts.emailCopied);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="contact"
      className="relative pt-20 sm:pt-28 md:py-32 pb-10 px-4 sm:px-8 md:px-12 bg-[#0e0e11] text-zinc-300 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto flex flex-col justify-between">
        
        {/* Top Headline & Big CTA */}
        <div className="flex flex-col mb-16 sm:mb-20">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <span className="text-xs uppercase tracking-[3px] text-zinc-500 font-mono">
              {t.contact.tag}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 sm:gap-10">
            <h2 className="flex flex-col">
              <span className="font-editorial italic text-4xl sm:text-6xl md:text-7xl text-zinc-300 font-normal">
                {t.contact.headingItalic}
              </span>
              <span className="font-bebas text-6xl sm:text-8xl md:text-9xl lg:text-[130px] text-white leading-[0.88] tracking-tight uppercase">
                {t.contact.headingBold}
              </span>
            </h2>

            {/* Giant Round Magnetic Action Button */}
            <Magnetic strength={0.4} className="flex-shrink-0">
              <a
                href={personalInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-cobalt hover:bg-cobalt-hover text-white flex flex-col items-center justify-center p-3 text-center shadow-[0_10px_50px_rgba(69,92,233,0.45)] hover:shadow-[0_15px_60px_rgba(69,92,233,0.7)] hover:scale-108 active:scale-95 transition-all duration-300 group flex-shrink-0 cursor-pointer"
              >
                <span className="font-bebas text-lg sm:text-2xl tracking-wider uppercase">
                  {t.contact.touchBtn}
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono opacity-80 mt-0.5">
                  {t.contact.fastWa}
                </span>
                <div className="mt-1.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 text-xs">
                  &rarr;
                </div>
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Bottom Content & Grid Links */}
        <div className="pt-10 sm:pt-12 border-t border-zinc-800 flex flex-col gap-10">
          
          {/* 3 Column Grid Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Email Group */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                {t.contact.emailLabel}
              </span>
              <button
                onClick={handleCopyEmail}
                className="text-left font-mono text-xs sm:text-sm text-zinc-200 hover:text-cobalt transition-colors truncate group flex items-center gap-2 cursor-pointer"
              >
                <span>{personalInfo.email}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 group-hover:text-white">
                  {t.contact.copyEmail}
                </span>
              </button>
              <span className="text-[10px] sm:text-[11px] text-zinc-500 font-mono">
                {copied ? t.contact.copiedEmail : t.contact.clickCopy}
              </span>
            </div>

            {/* Phone & Location */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                {t.contact.phoneLoc}
              </span>
              <a
                href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
                className="font-mono text-xs sm:text-sm text-zinc-200 hover:text-cobalt transition-colors"
              >
                {personalInfo.phone}
              </a>
              <span className="text-[10px] sm:text-[11px] text-zinc-400 font-mono">
                {personalInfo.location}
              </span>
            </div>

            {/* Socials with Magnetic Hover */}
            <div className="flex flex-col gap-1.5 sm:col-span-2 md:col-span-1">
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                {t.contact.socials}
              </span>
              <div className="flex flex-wrap items-center gap-3.5 text-xs sm:text-sm font-mono text-zinc-300">
                <Magnetic strength={0.25}>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white hover:underline underline-offset-4 px-1"
                  >
                    LinkedIn
                  </a>
                </Magnetic>
                <Magnetic strength={0.25}>
                  <a
                    href={personalInfo.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white hover:underline underline-offset-4 px-1"
                  >
                    Instagram
                  </a>
                </Magnetic>
                <Magnetic strength={0.25}>
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white hover:underline underline-offset-4 px-1"
                  >
                    GitHub
                  </a>
                </Magnetic>
              </div>
            </div>

          </div>

          {/* Footer Metadata */}
          <div className="pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] font-mono text-zinc-500">
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <span>{t.contact.versionInfo}</span>
              <span>&bull;</span>
              <span>{t.contact.facultyInfo}</span>
            </div>

            <Magnetic strength={0.2}>
              <button
                onClick={scrollToTop}
                className="hover:text-white transition-colors flex items-center gap-1 p-1 cursor-pointer"
              >
                <span>{t.contact.backToTop}</span>
                <span>↑</span>
              </button>
            </Magnetic>
          </div>

        </div>

      </div>
    </footer>
  );
}
