'use client';

import React, { useState } from 'react';
import { ShieldCheck, Clock, Globe, Bell } from 'lucide-react';

export function VignetteDainikNews() {
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [isAlertSubscribed, setIsAlertSubscribed] = useState(false);

  const content = {
    en: {
      dept: 'UTTAR PRADESH TECHNICAL EDUCATION DEPT',
      title: 'UP Technical Education Dept — Junior Lecturer 2026',
      summary:
        'Official state gazette notification for polytechnic engineering faculty recruitment across 75 districts.',
      eligibility: ['Degree / Diploma in Tech', 'Age: 21–35', 'Pay Scale: Level 9A'],
      deadline: 'Applications close in: 4 days, 12 hours',
      linkVerified: 'Official Notification Link Verified ✓',
      source: 'upsc.up.nic.in (Govt Gazette Vol. 48)',
    },
    hi: {
      dept: 'उत्तर प्रदेश प्राविधिक शिक्षा विभाग',
      title: 'उत्तर प्रदेश तकनीकी शिक्षा विभाग — कनिष्ठ प्रवक्ता भर्ती २०२६',
      summary:
        'उत्तर प्रदेश के राजकीय पॉलिटेक्निक संस्थानों में इंजीनियरिंग संकाय भर्ती हेतु आधिकारिक राजपत्र अधिसूचना।',
      eligibility: ['इंजीनियरिंग डिग्री / डिप्लोमा', 'आयु: २१–३५ वर्ष', 'वेतनमान: लेवल ९ए'],
      deadline: 'आवेदन की अंतिम तिथि: ४ दिन, १२ घंटे शेष',
      linkVerified: 'आधिकारिक भर्ती लिंक सत्यापित ✓',
      source: 'upsc.up.nic.in (सरकारी राजपत्र खंड ४८)',
    },
  }[lang];

  return (
    <div className="w-full rounded-xl bg-[#090C13] border border-white/10 overflow-hidden shadow-2xl transition-all duration-200 hover:border-white/20 select-none">
      {/* Window Chrome Header */}
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-white/8 bg-[#0B0E17]/90 backdrop-blur-sm">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" aria-hidden="true" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" aria-hidden="true" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" aria-hidden="true" />
          <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-text-secondary">
            VERIFIED JOB GAZETTE · BILINGUAL FEED
          </span>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-mono text-[#34D399]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" aria-hidden="true" />
          <span>75 Districts · No Fake News</span>
        </div>
      </div>

      {/* Main Vignette Content */}
      <div className="p-4 sm:p-5 space-y-3.5">
        {/* Bilingual Switcher Bar */}
        <div className="flex items-center justify-between gap-2 bg-white/[0.03] border border-white/8 p-1.5 rounded-lg">
          <div className="flex items-center gap-1.5 text-xs text-text-secondary pl-1.5">
            <Globe className="w-3.5 h-3.5 text-[#34D399]" />
            <span className="font-mono text-[10px] uppercase">Language:</span>
          </div>
          <div className="flex items-center p-0.5 rounded-md bg-white/5 border border-white/10">
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-all duration-150 active:scale-[0.97] cursor-pointer ${
                lang === 'en'
                  ? 'bg-[#34D399] text-[#07080D] font-bold shadow-sm'
                  : 'text-text-secondary hover:text-white'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLang('hi')}
              className={`px-2.5 py-1 rounded text-xs font-sans transition-all duration-150 active:scale-[0.97] cursor-pointer ${
                lang === 'hi'
                  ? 'bg-[#34D399] text-[#07080D] font-bold shadow-sm'
                  : 'text-text-secondary hover:text-white'
              }`}
            >
              हिन्दी
            </button>
          </div>
        </div>

        {/* Notice Card */}
        <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10 space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#34D399] bg-[#34D399]/10 px-2 py-0.5 rounded border border-[#34D399]/20 font-bold">
              {content.dept}
            </span>
            <span className="font-mono text-[10px] text-text-muted truncate">
              {content.source}
            </span>
          </div>

          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-white leading-snug">
              {content.title}
            </h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              {content.summary}
            </p>
          </div>

          {/* Eligibility Badges */}
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {content.eligibility.map((badge, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-text-secondary"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Real-time Indicator & Verification Link */}
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 rounded-lg bg-[#34D399]/[0.08] border border-[#34D399]/25 text-xs">
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#34D399]">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              <span className="font-semibold">{content.deadline}</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" aria-hidden="true" />
          </div>

          <div className="flex items-center justify-between text-xs px-1">
            <div className="flex items-center gap-1.5 text-text-secondary">
              <ShieldCheck className="w-3.5 h-3.5 text-[#34D399]" />
              <span className="text-[11px] font-medium text-white">{content.linkVerified}</span>
            </div>
            <button
              type="button"
              onClick={() => setIsAlertSubscribed(!isAlertSubscribed)}
              className="text-[10px] font-mono text-[#34D399] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Bell className="w-3 h-3" />
              <span>{isAlertSubscribed ? 'Subscribed ✓' : 'Get Free SMS Alert'}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-text-muted border-t border-white/5">
          <span>Zero phishing links</span>
          <span className="text-[#34D399]">Direct Govt Portal &rarr;</span>
        </div>
      </div>
    </div>
  );
}
