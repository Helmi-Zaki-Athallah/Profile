import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Sparkles, Layers, Cpu, Code } from 'lucide-react';
import { stackingCards } from '../data/portfolioData';

const iconMap = {
  'pillar-1': Layers,
  'pillar-2': Cpu,
  'pillar-3': Code
};

export default function StackingCards() {
  return (
    <section className="relative py-24 px-4 sm:px-6 bg-zinc-950/80 border-t border-b border-white/5">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[500px] bg-brand-cyan/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-brand-cyan/30 text-brand-cyan text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CORE CAPABILITIES &amp; STACK</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            3 Pilar Utama Keahlian
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Perpaduan strategi digital, penguasaan CMS WordPress, dan ketelitian logika teknik elektro.
          </p>
        </div>

        {/* Stacked Cards Container */}
        <div className="relative flex flex-col gap-10">
          {stackingCards.map((card, index) => {
            const Icon = iconMap[card.id] || Layers;
            // Sticky top offset so each card stacks slightly lower or right on top of previous
            const topOffset = 100 + index * 24;

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                style={{
                  top: `${topOffset}px`,
                }}
                className="sticky rounded-3xl p-6 sm:p-10 glass-card border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] transition-all duration-300 backdrop-blur-2xl"
              >
                {/* Ambient Top Line Glow */}
                <div
                  className={`absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r ${card.accentColor} rounded-full`}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left Column: Info & Features */}
                  <div className="lg:col-span-8 flex flex-col">
                    
                    {/* Top Step & Badge */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="text-xs font-mono font-bold tracking-widest text-zinc-400 bg-zinc-900/90 px-3 py-1 rounded-lg border border-white/5">
                        {card.step}
                      </span>
                      <span className="text-xs font-semibold px-3 py-1 rounded-lg bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20">
                        {card.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                      {card.title}
                    </h3>
                    <p className="text-sm font-medium text-brand-cyan mb-4 font-mono">
                      {card.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
                      {card.description}
                    </p>

                    {/* Feature Checkpoints */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {card.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-brand-cyan flex-shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-zinc-300 font-normal">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Metric & Icon Display */}
                  <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-zinc-950/70 border border-white/5 text-center relative overflow-hidden">
                    <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-brand-cyan/30 flex items-center justify-center mb-4 text-brand-cyan shadow-lg">
                      <Icon className="w-8 h-8" />
                    </div>

                    <span className="text-4xl font-extrabold text-white font-mono tracking-tight mb-1">
                      {card.metric}
                    </span>
                    <span className="text-xs font-medium text-zinc-400">
                      {card.metricLabel}
                    </span>

                    <a
                      href="#projects"
                      className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-cyan hover:text-white transition-colors"
                    >
                      <span>Lihat Implementasi</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

