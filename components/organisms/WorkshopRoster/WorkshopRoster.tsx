'use client';

import React from 'react';
import Image from 'next/image';
import { Award, ShieldCheck, Cpu, Palette, TrendingUp, Bot } from 'lucide-react';

export interface Founder {
  name: string;
  role: string;
  degree: string;
  pedigree: string;
  focus: string;
  bio: string;
  image: string;
  icon: typeof Award;
}

export const FOUNDERS: Founder[] = [
  {
    name: 'Dhruw Singh',
    role: 'Founder & Head of Strategic Operations',
    degree: 'B.Sc',
    pedigree: 'Retd. Indian Army (Corps of Signals) · 30 Years Distinguished Military Service',
    focus: 'Operational discipline, institutional governance, administrative leadership, and execution rigor.',
    bio: 'Retd. Indian Army (Corps of Signals) after 30 years of distinguished military service. Leads strategic operations and administrative leadership.',
    image: '/images/team/dhruw-singh.jpg',
    icon: ShieldCheck,
  },
  {
    name: 'Sonu Singh',
    role: 'Co-Founder & AR-VR / AI Engineer',
    degree: 'BCA',
    pedigree: 'Spatial Computing Specialist · Returned from Japan VR/AR Summit',
    focus: 'Spatial computing, immersive tech, multi-modal interaction, and modern AI model pipelines.',
    bio: 'Returned from Japan VR/AR Summit. Specializes in spatial computing, immersive tech, and modern AI model pipelines.',
    image: '/images/team/sonu-singh.jpg',
    icon: Cpu,
  },
  {
    name: 'Annanta Singh',
    role: 'Digital Marketing Lead',
    degree: 'B.Com',
    pedigree: 'Brand Development & Inbound Growth Specialist',
    focus: 'Brand development, inbound marketing pipelines, SEO strategies, and corporate client acquisition.',
    bio: 'Drives brand development, inbound marketing pipelines, SEO strategies, and corporate client acquisition.',
    image: '/images/team/annanta-singh.jpg',
    icon: TrendingUp,
  },
  {
    name: 'Rishabh Singh',
    role: 'Design & Visualisation Lead',
    degree: 'B.Tech',
    pedigree: 'UI/UX Architect & Visual Rendering Specialist',
    focus: 'UI/UX architecture, visual rendering, interactive frontend design, and product aesthetics.',
    bio: 'Focuses on UI/UX architecture, visual rendering, interactive frontend design, and product aesthetics.',
    image: '/images/team/rishabh-singh.jpg',
    icon: Palette,
  },
  {
    name: 'Gourav Singh',
    role: 'AI Engineer / Orchestration Lead',
    degree: 'B.Tech',
    pedigree: 'Agent Systems Architect & Autonomous Workflows Specialist',
    bio: 'Builds AI agents, workflows, and automation using modern AI models, ensuring smart, reliable, and scalable AI solutions.',
    focus: 'AI agents, autonomous workflows, deterministic schema validation, and scalable model orchestration.',
    image: '/images/team/gourav-singh.jpg',
    icon: Bot,
  },
];

export function WorkshopRoster() {
  return (
    <div className="w-full text-left font-sans space-y-6">
      <div className="divide-y divide-[rgba(13,37,61,0.1)]">
        {FOUNDERS.map((founder) => {
          const Icon = founder.icon;
          return (
            <div
              key={founder.name}
              className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start hover:bg-canvas-paper/40 transition-colors p-4 rounded-2xl"
            >
              {/* Photo, Name and Role */}
              <div className="lg:col-span-5 flex items-start gap-4">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-[rgba(13,37,61,0.12)] bg-canvas-recessed shrink-0 shadow-sm">
                  <Image
                    src={founder.image}
                    alt={`Portrait of ${founder.name}, ${founder.role}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-2xl sm:text-3xl text-ink-primary font-normal">
                      {founder.name}
                    </h3>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-canvas-recessed border border-[rgba(13,37,61,0.08)] text-ink-secondary font-medium">
                      {founder.degree}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-terra-600 flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{founder.role}</span>
                  </span>
                  <span className="font-mono text-xs text-ink-secondary block pt-0.5 leading-snug">
                    {founder.pedigree}
                  </span>
                </div>
              </div>

              {/* Focus and Narrative */}
              <div className="lg:col-span-7 space-y-2.5">
                <p className="text-xs font-mono font-semibold uppercase tracking-wider text-terra-600">
                  Core Responsibility:{' '}
                  <span className="text-ink-secondary font-normal font-sans text-sm">
                    {founder.focus}
                  </span>
                </p>
                <p className="text-sm md:text-base text-ink-body leading-relaxed">
                  {founder.bio}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
