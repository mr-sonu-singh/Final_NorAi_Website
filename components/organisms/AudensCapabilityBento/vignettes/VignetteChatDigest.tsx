'use client';

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Zap } from 'lucide-react';

interface DigestAction {
  id: string;
  tag: string;
  tagColor: string;
  tagBg: string;
  title: string;
  time: string;
  owner: string;
}

const SAMPLE_ACTIONS: DigestAction[] = [
  {
    id: 'act-1',
    tag: 'LAUNCHED',
    tagColor: '#4ADE80',
    tagBg: 'rgba(74, 222, 128, 0.08)',
    title: 'Payment gateway upgrade deployed successfully to production.',
    time: '11:42 AM',
    owner: '@devops-lead',
  },
  {
    id: 'act-2',
    tag: 'RESOLVED',
    tagColor: '#FFB699',
    tagBg: 'rgba(255, 182, 153, 0.08)',
    title: 'Mobile Safari session expiry bug fixed and verified by QA.',
    time: '01:15 PM',
    owner: '@core-eng',
  },
  {
    id: 'act-3',
    tag: 'ASSIGNED',
    tagColor: '#E9D5FF',
    tagBg: 'rgba(233, 213, 255, 0.08)',
    title: 'API documentation and security audit assigned to team leads.',
    time: '03:30 PM',
    owner: '@tech-lead',
  },
];

export function VignetteChatDigest() {
  const [activeChannel, setActiveChannel] = useState<'engineering' | 'product'>('engineering');
  const [readItems, setReadItems] = useState<Record<string, boolean>>({});

  const toggleItemRead = (id: string) => {
    setReadItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full rounded-xl bg-[var(--forest)] border border-white/10 overflow-hidden shadow-2xl transition-all duration-200 hover:border-white/20 select-none">
      {/* Window Chrome Header */}
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-white/8 bg-[var(--pine)]/90 backdrop-blur-sm">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" aria-hidden="true" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" aria-hidden="true" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" aria-hidden="true" />
          <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-white/70">
            DAILY BRIEF · #{activeChannel.toUpperCase()}-UPDATES
          </span>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-mono text-[#FFA07A]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFA07A] animate-pulse" aria-hidden="true" />
          <span>Discord · Slack · Telegram</span>
        </div>
      </div>

      {/* Main Vignette Content */}
      <div className="p-4 sm:p-5 space-y-3.5">
        {/* Visual Transformation Bar */}
        <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-[#FFA07A]/[0.08] border border-[#FFA07A]/25">
          <div className="flex items-center gap-2 min-w-0">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/10 text-white line-through opacity-80">
              4,820 messages
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-[#FFA07A] shrink-0" />
            <span className="font-mono text-xs font-bold text-[#FFA07A] truncate">
              3 Key Decisions
            </span>
          </div>
          <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-white/10 text-white shrink-0">
            99.2% Condensed
          </span>
        </div>

        {/* Channel Switcher Tabs */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveChannel('engineering')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all duration-150 active:scale-[0.97] cursor-pointer ${
              activeChannel === 'engineering'
                ? 'bg-white/10 text-white font-medium border border-white/15'
                : 'text-white/70 hover:text-white'
            }`}
          >
            #engineering-updates
          </button>
          <button
            type="button"
            onClick={() => setActiveChannel('product')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all duration-150 active:scale-[0.97] cursor-pointer ${
              activeChannel === 'product'
                ? 'bg-white/10 text-white font-medium border border-white/15'
                : 'text-white/70 hover:text-white'
            }`}
          >
            #product-launches
          </button>
        </div>

        {/* Scannable Action Cards */}
        <div className="space-y-2">
          {SAMPLE_ACTIONS.map((action) => {
            const isRead = !!readItems[action.id];
            return (
              <div
                key={action.id}
                onClick={() => toggleItemRead(action.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleItemRead(action.id);
                  }
                }}
                className={`p-2.5 rounded-lg border text-left transition-all duration-150 cursor-pointer active:scale-[0.98] ${
                  isRead
                    ? 'bg-white/[0.01] border-white/5 opacity-60'
                    : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        style={{ color: action.tagColor, backgroundColor: action.tagBg }}
                        className="px-1.5 py-0.5 rounded font-mono text-[9px] font-bold tracking-wider"
                      >
                        {action.tag}
                      </span>
                      <span className="font-mono text-[10px] text-white/70">{action.owner}</span>
                    </div>
                    <p className="text-xs text-white leading-snug">{action.title}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="font-mono text-[9px] text-white/60">{action.time}</span>
                    <CheckCircle2
                      className={`w-3.5 h-3.5 transition-colors ${
                        isRead ? 'text-[#34D399]' : 'text-white/60 hover:text-white'
                      }`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Efficiency Tag */}
        <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-white/70 border-t border-white/5">
          <div className="flex items-center gap-1.5 text-[#FFA07A]">
            <Zap className="w-3.5 h-3.5" />
            <span className="font-medium">Read in 90 seconds instead of 45 minutes</span>
          </div>
          <span className="hidden sm:inline">Zero API data stored</span>
        </div>
      </div>
    </div>
  );
}
