'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Container } from '@/components/foundation/Container';
import { useLanguage } from '@/hooks/useLanguage';

export function StudioManifesto() {
  const { t } = useLanguage();

  return (
    <section className="py-20 sm:py-28 bg-[#060919] text-[#F4F6FC] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#f5f5f0 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <Container size="default" className="relative z-10 max-w-[1080px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-display font-bold text-2xl sm:text-4xl md:text-5xl lg:text-[3.1rem] leading-[1.18] text-[#F4F6FC] mb-12 tracking-tight">
            {t.manifesto.quote}
          </p>
          <div className="pt-10 border-t border-white/15">
            <p className="font-sans text-xl sm:text-2xl text-white/70 mb-4 font-normal">
              {t.manifesto.subquote}
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-extrabold text-6xl sm:text-7xl md:text-8xl lg:text-9xl bg-gradient-to-r from-[#06A4E0] via-[#4A2BD8] to-[#9B13F0] bg-clip-text text-transparent tracking-[-0.04em] leading-none mb-6 select-none"
            >
              NorAI.
            </motion.div>
            <p className="text-xs sm:text-sm font-mono text-white/50 uppercase tracking-widest">
              {t.manifesto.footer}
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default StudioManifesto;
