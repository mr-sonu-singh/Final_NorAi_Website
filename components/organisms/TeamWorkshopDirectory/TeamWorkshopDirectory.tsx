'use client';

import React, { useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useSpring, useReducedMotion } from 'motion/react';
import {
  ShieldCheck,
  Cpu,
  Palette,
  TrendingUp,
  Bot,
  LayoutGrid,
  Table as TableIcon,
  X,
  ArrowRight,
  GraduationCap,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export type DisciplineType =
  | 'all'
  | 'operations'
  | 'ar-vr'
  | 'orchestration'
  | 'design'
  | 'marketing';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  discipline: DisciplineType;
  disciplineLabel: string;
  degree: string;
  pedigree: string;
  bio: string;
  focus: string;
  systemsOwned: string[];
  primaryStack: string[];
  image: string;
  verifiedBadge: string;
  icon: typeof ShieldCheck;
  tenet: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'dhruw-singh',
    name: 'Dhruw Singh',
    role: 'Founder & Head of Strategic Operations',
    discipline: 'operations',
    disciplineLabel: 'Strategic Operations',
    degree: 'B.Sc',
    pedigree: 'Retd. Indian Army (Corps of Signals) · 30 Years Distinguished Military Service',
    bio: 'Retd. Indian Army (Corps of Signals) after 30 years of distinguished military service. Leads strategic operations and administrative leadership.',
    focus: 'Operational discipline, institutional governance, administrative architecture, and zero-compromise execution rigor.',
    systemsOwned: [
      'Strategic Operations & Governance',
      'Institutional & State Outreach',
      'SLA & Security Guardrails',
      'Administrative Leadership',
    ],
    primaryStack: [
      'Defense Ops Rigor',
      'Institutional Governance',
      'Security Protocols',
      'Operational SLAs',
    ],
    image: '/images/team/dhruw-singh.jpg',
    verifiedBadge: '30-Yr Indian Army Signals Veteran',
    icon: ShieldCheck,
    tenet:
      'Reliability is not an afterthought; it is built into the operational chain of command from day zero.',
  },
  {
    id: 'sonu-singh',
    name: 'Sonu Singh',
    role: 'Co-Founder & AR-VR / AI Engineer',
    discipline: 'ar-vr',
    disciplineLabel: 'AR-VR & Spatial AI',
    degree: 'BCA',
    pedigree: 'Spatial Computing Specialist · Returned from Japan VR/AR Summit',
    bio: 'Returned from Japan VR/AR Summit. Specializes in spatial computing, immersive tech, and modern AI model pipelines.',
    focus: 'Spatial computing architectures, immersive 3D interfaces, multi-modal interaction models, and next-generation sensory pipelines.',
    systemsOwned: [
      'Spatial Computing Engine',
      'Immersive 3D Interaction Pipeline',
      'Multi-Modal Model Connectors',
      'WebGPU & Spatial Shaders',
    ],
    primaryStack: [
      'Spatial Computing / AR-VR',
      'WebGPU & Three.js',
      'Multi-Modal AI Connectors',
      'Python / vLLM',
    ],
    image: '/images/team/sonu-singh.jpg',
    verifiedBadge: 'Japan VR/AR Summit Finalist',
    icon: Cpu,
    tenet:
      'The boundary between screen and physical space is dissolving; interfaces must become tactile and spatial.',
  },
  {
    id: 'annanta-singh',
    name: 'Annanta Singh',
    role: 'Digital Marketing Lead',
    discipline: 'marketing',
    disciplineLabel: 'Digital Marketing',
    degree: 'B.Com',
    pedigree: 'Brand Development & Inbound Growth Specialist',
    bio: 'Drives brand development, inbound marketing pipelines, SEO strategies, and corporate client acquisition.',
    focus: 'Inbound customer acquisition funnels, digital product positioning, search engine optimization, and enterprise partnership outreach.',
    systemsOwned: [
      'Inbound Acquisition Engine',
      'Product Positioning Strategy',
      'Multi-Channel SEO Pipeline',
      'Corporate Client Outreach',
    ],
    primaryStack: [
      'Inbound Growth Funnels',
      'Technical SEO & Analytics',
      'B2B Client Pipelines',
      'Brand Architecture',
    ],
    image: '/images/team/annanta-singh.jpg',
    verifiedBadge: 'Growth & Inbound Lead',
    icon: TrendingUp,
    tenet:
      'A great tool is only as good as the speed with which it reaches the hands of people who need it.',
  },
  {
    id: 'rishabh-singh',
    name: 'Rishabh Singh',
    role: 'Design & Visualisation Lead',
    discipline: 'design',
    disciplineLabel: 'Design & UI/UX',
    degree: 'B.Tech',
    pedigree: 'UI/UX Architect & Visual Rendering Specialist',
    bio: 'Focuses on UI/UX architecture, visual rendering, interactive frontend design, and product aesthetics.',
    focus: 'Design systems architecture, visual rendering, tactile parchment & terracotta component craft, and WCAG AAA accessibility.',
    systemsOwned: [
      'Parchment & Terracotta Design Tokens',
      'Tactile Hardware UI Atoms & Molecules',
      'Visual Rendering Engine',
      'Motion & Micro-Interaction Curves',
    ],
    primaryStack: [
      'Design Token Systems',
      'Tailwind CSS & Next.js 15',
      'motion/react Spring Physics',
      'UI/UX Architecture',
    ],
    image: '/images/team/rishabh-singh.jpg',
    verifiedBadge: 'UI/UX & Visual Architect',
    icon: Palette,
    tenet:
      'Every pixel must serve utility. Software should feel as substantial and satisfying as a fine physical instrument.',
  },
  {
    id: 'gourav-singh',
    name: 'Gourav Singh',
    role: 'AI Engineer / Orchestration Lead',
    discipline: 'orchestration',
    disciplineLabel: 'AI Orchestration',
    degree: 'B.Tech',
    pedigree: 'Agent Systems Architect & Autonomous Workflows Specialist',
    bio: 'Builds AI agents, workflows, and automation using modern AI models, ensuring smart, reliable, and scalable AI solutions.',
    focus: 'Deterministic multi-agent state machines, structured Zod schema contracts, ephemeral RAM isolation, and sub-second tool execution.',
    systemsOwned: [
      'AI Resume Shortlister Core Engine',
      'Course Note-Taker Extraction Pipeline',
      'Community Chat Digest Deduplicator',
      'Deterministic Agent State Machines',
    ],
    primaryStack: [
      'TypeScript & Next.js App Router',
      'Local vLLM / Ollama Serving',
      'Zod Schema Contracts',
      'Vector Retrieval & RAG',
    ],
    image: '/images/team/gourav-singh.jpg',
    verifiedBadge: 'AI Orchestration & Agents Lead',
    icon: Bot,
    tenet:
      'Zero hallucination, deterministic typed outputs, and sub-second execution outrank ungrounded promises.',
  },
];

const DISCIPLINE_TABS: Array<{ id: DisciplineType; label: string; count: number }> = [
  { id: 'all', label: 'All Builders', count: 5 },
  { id: 'operations', label: 'Strategic Operations', count: 1 },
  { id: 'ar-vr', label: 'AR-VR & Spatial AI', count: 1 },
  { id: 'orchestration', label: 'AI Orchestration', count: 1 },
  { id: 'design', label: 'Design & UI/UX', count: 1 },
  { id: 'marketing', label: 'Digital Marketing', count: 1 },
];

/* ─── Motion constants (better-ui skill: exact values, not ranges) ─── */
const SPRING_CARD = { type: 'spring' as const, duration: 0.5, bounce: 0 };
const SPRING_SNAPPY = { type: 'spring' as const, duration: 0.3, bounce: 0 };
const STAGGER_GRID = 0.1; // 100ms per card
const STAGGER_CHIP = 0.04; // 40ms per chip

/* ─── Variant definitions ─── */
const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: STAGGER_GRID, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: SPRING_CARD,
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    y: 12,
    transition: { duration: 0.25, ease: [0.2, 0, 0, 1] as const },
  },
};

const chipContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: STAGGER_CHIP, delayChildren: 0.15 },
  },
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0.8, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: SPRING_SNAPPY,
  },
};

const tableRowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: SPRING_CARD,
  },
};

const tableGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/* ─── 3D Tilt Card Wrapper ─── */
function TiltCard({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring-smoothed rotation values
  const rotateX = useSpring(mouseX, { stiffness: 200, damping: 25, mass: 0.5 });
  const rotateY = useSpring(mouseY, { stiffness: 200, damping: 25, mass: 0.5 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (shouldReduceMotion) return;
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Map mouse position to rotation (-6deg to 6deg — subtle, not exaggerated)
      const x = ((e.clientY - centerY) / (rect.height / 2)) * -4;
      const y = ((e.clientX - centerX) / (rect.width / 2)) * 4;

      mouseX.set(x);
      mouseY.set(y);
    },
    [shouldReduceMotion, mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={cardRef}
      className={className}
      style={{
        rotateX: shouldReduceMotion ? 0 : rotateX,
        rotateY: shouldReduceMotion ? 0 : rotateY,
        transformPerspective: 800,
        transformStyle: 'preserve-3d',
      }}
      variants={cardVariants}
      whileHover={{ y: -6, transition: SPRING_SNAPPY }}
      whileTap={{ scale: 0.96 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

/* ─── Modal inner content animations ─── */
const modalOverlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const modalContentVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring' as const, duration: 0.45, bounce: 0.08 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.2, ease: [0.2, 0, 0, 1] as const },
  },
};

const modalSectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: SPRING_SNAPPY,
  },
};

const modalStaggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
};

export function TeamWorkshopDirectory() {
  const [activeDiscipline, setActiveDiscipline] = useState<DisciplineType>('all');
  const [viewMode, setViewMode] = useState<'bento' | 'matrix'>('bento');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const filteredMembers =
    activeDiscipline === 'all'
      ? TEAM_MEMBERS
      : TEAM_MEMBERS.filter((m) => m.discipline === activeDiscipline);

  return (
    <div className="w-full space-y-8 font-sans">
      {/* Control Dock: Filter Pills + View Switcher */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-[rgba(13,37,61,0.08)] pb-6">
        {/* Discipline Filter Strip */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-canvas-sunken/70 border border-[rgba(13,37,61,0.08)]">
          {DISCIPLINE_TABS.map((tab) => {
            const isActive = activeDiscipline === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveDiscipline(tab.id)}
                className={`relative px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terra-500 ${
                  isActive
                    ? 'text-ink-primary font-semibold shadow-xs'
                    : 'text-ink-secondary hover:text-ink-primary'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeDisciplinePill"
                    className="absolute inset-0 rounded-lg bg-canvas-paper border border-[rgba(13,37,61,0.12)] shadow-xs"
                    transition={{ type: 'spring', duration: 0.35, bounce: 0 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {tab.label}
                  <span
                    className={`px-1.5 py-0.2 rounded text-[10px] ${
                      isActive
                        ? 'bg-terra-50 text-terra-600 border border-terra-500/20'
                        : 'bg-canvas-base text-ink-secondary'
                    }`}
                  >
                    {tab.count}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* View Toggle Mode */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-canvas-sunken/70 border border-[rgba(13,37,61,0.08)] self-end lg:self-auto">
          <button
            type="button"
            onClick={() => setViewMode('bento')}
            aria-label="Editorial Bento Cards View"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              viewMode === 'bento'
                ? 'bg-canvas-paper text-ink-primary shadow-xs font-semibold border border-[rgba(13,37,61,0.08)]'
                : 'text-ink-secondary hover:text-ink-primary'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Bento Cards</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('matrix')}
            aria-label="Systems Matrix View"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              viewMode === 'matrix'
                ? 'bg-canvas-paper text-ink-primary shadow-xs font-semibold border border-[rgba(13,37,61,0.08)]'
                : 'text-ink-secondary hover:text-ink-primary'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>Systems Matrix</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: EDITORIAL BENTO CARDS — Staggered + 3D Tilt + Hover Lift */}
      {viewMode === 'bento' && (
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeDiscipline}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={gridVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {filteredMembers.map((member) => {
              const Icon = member.icon;
              return (
                <TiltCard
                  key={member.id}
                  className="group relative rounded-3xl bg-canvas-paper border border-[rgba(13,37,61,0.10)] p-6 shadow-xs hover:shadow-lg hover:border-terra-500/30 transition-shadow duration-300 flex flex-col justify-between space-y-6 cursor-pointer"
                  onClick={() => setSelectedMember(member)}
                >
                  {/* Top Profile Header */}
                  <div className="space-y-4" style={{ transform: 'translateZ(20px)' }}>
                    {/* Portrait + Verified Badge */}
                    <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-canvas-recessed border border-[rgba(13,37,61,0.08)] shadow-inner">
                      <Image
                        src={member.image}
                        alt={`35mm documentary portrait of ${member.name}`}
                        fill
                        loading="eager"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Hover gradient overlay for depth */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-3 right-3 transition-transform duration-300 group-hover:-translate-y-0.5">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-canvas-paper/90 backdrop-blur-md border border-[rgba(13,37,61,0.12)] text-[11px] font-mono font-semibold text-ink-primary shadow-xs">
                          <GraduationCap className="w-3 h-3 text-terra-600" />
                          <span>{member.degree}</span>
                        </span>
                      </div>
                    </div>

                    {/* Name & Role */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display text-2xl sm:text-3xl text-ink-primary font-normal">
                          {member.name}
                        </h3>
                        <div className="w-8 h-8 rounded-lg bg-terra-50 border border-terra-500/20 text-terra-600 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110">
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>

                      <div className="text-xs font-semibold text-terra-600 font-sans">
                        {member.role}
                      </div>

                      <div className="font-mono text-xs text-ink-secondary leading-snug pt-0.5">
                        {member.pedigree}
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-xs sm:text-sm text-ink-body leading-relaxed border-t border-[rgba(13,37,61,0.06)] pt-3">
                      {member.bio}
                    </p>
                  </div>

                  {/* Systems & Bottom Actions — with staggered chip reveal */}
                  <div className="space-y-4 pt-2 border-t border-[rgba(13,37,61,0.08)]" style={{ transform: 'translateZ(10px)' }}>
                    {/* Systems Chips — Staggered entrance */}
                    <div className="space-y-1.5">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-ink-secondary block font-semibold">
                        Flagship Systems Owned:
                      </span>
                      <motion.div
                        className="flex flex-wrap gap-1.5"
                        variants={chipContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        {member.systemsOwned.slice(0, 3).map((sys) => (
                          <motion.span
                            key={sys}
                            variants={chipVariants}
                            className="px-2 py-0.5 rounded bg-canvas-sunken/80 border border-[rgba(13,37,61,0.08)] text-[11px] font-mono text-ink-primary"
                          >
                            {sys}
                          </motion.span>
                        ))}
                      </motion.div>
                    </div>

                    {/* Trigger Detail Drawer */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMember(member);
                      }}
                      className="w-full inline-flex items-center justify-between rounded-xl bg-canvas-base border border-line-default px-4 py-2.5 font-sans text-xs font-semibold text-ink-primary hover:text-terra-600 hover:border-terra-500/40 hover:bg-canvas-paper transition-all shadow-2xs group/btn active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terra-500"
                    >
                      <span>Read Architecture Profile</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1 text-ink-secondary group-hover/btn:text-terra-600" />
                    </button>
                  </div>
                </TiltCard>
              );
            })}
          </motion.div>
        </AnimatePresence>
      )}

      {/* VIEW 2: HIGH-DENSITY SYSTEMS MATRIX — Staggered row entrance */}
      {viewMode === 'matrix' && (
        <div className="overflow-hidden rounded-3xl border border-[rgba(13,37,61,0.12)] bg-canvas-paper shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[rgba(13,37,61,0.10)] bg-canvas-sunken/60 font-mono text-xs font-semibold text-ink-primary">
                  <th className="py-4 px-6">Builder</th>
                  <th className="py-4 px-4">Role &amp; Discipline</th>
                  <th className="py-4 px-4">Degree &amp; Pedigree</th>
                  <th className="py-4 px-4">Core Systems Owned</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <motion.tbody
                className="divide-y divide-[rgba(13,37,61,0.08)] font-sans text-xs"
                variants={tableGridVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredMembers.map((member) => (
                  <motion.tr
                    key={member.id}
                    variants={tableRowVariants}
                    className="hover:bg-canvas-base/80 transition-colors group cursor-pointer"
                    onClick={() => setSelectedMember(member)}
                    whileHover={{ x: 4 }}
                  >
                    {/* Photo + Name */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-[rgba(13,37,61,0.10)] bg-canvas-recessed shrink-0 transition-transform duration-300 group-hover:scale-105">
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            loading="eager"
                            className="object-cover"
                            sizes="44px"
                          />
                        </div>
                        <div>
                          <span className="font-display text-lg text-ink-primary font-normal block leading-tight">
                            {member.name}
                          </span>
                          <span className="font-mono text-[11px] text-terra-600 font-semibold">
                            {member.degree}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Role & Discipline */}
                    <td className="py-4 px-4">
                      <div className="font-semibold text-ink-primary">{member.role}</div>
                      <div className="font-mono text-[11px] text-ink-secondary">
                        {member.disciplineLabel}
                      </div>
                    </td>

                    {/* Pedigree */}
                    <td className="py-4 px-4 max-w-xs">
                      <div className="text-ink-body leading-relaxed">{member.pedigree}</div>
                    </td>

                    {/* Systems */}
                    <td className="py-4 px-4 max-w-sm">
                      <div className="flex flex-wrap gap-1">
                        {member.systemsOwned.map((sys) => (
                          <span
                            key={sys}
                            className="px-2 py-0.5 rounded bg-canvas-sunken text-[10px] font-mono text-ink-primary border border-[rgba(13,37,61,0.06)]"
                          >
                            {sys}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Action */}
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMember(member);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-canvas-base border border-line-default text-xs font-semibold text-ink-primary hover:text-terra-600 hover:border-terra-500 transition-all group-hover:bg-canvas-paper active:scale-[0.96]"
                      >
                        <span>Profile</span>
                        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </div>
        </div>
      )}

      {/* INTERACTIVE PROFILE MODAL / DRAWER — Choreographed entrance */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              variants={modalOverlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setSelectedMember(null)}
              className="absolute inset-0 bg-ink-primary/40 backdrop-blur-xs"
            />

            {/* Modal Content — Spring entrance with staggered inner sections */}
            <motion.div
              variants={modalContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-6 sm:p-8 shadow-2xl z-10 text-left"
            >
              <motion.div
                className="space-y-6"
                variants={modalStaggerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Top Bar with Close */}
                <motion.div variants={modalSectionVariants} className="flex items-center justify-between border-b border-[rgba(13,37,61,0.08)] pb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-terra-600 font-semibold">
                      Engineering Profile
                    </span>
                    <span className="text-ink-secondary">·</span>
                    <span className="font-mono text-xs text-ink-secondary">
                      {selectedMember.disciplineLabel}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedMember(null)}
                    className="w-8 h-8 rounded-full bg-canvas-sunken border border-[rgba(13,37,61,0.08)] flex items-center justify-center text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terra-500 active:scale-[0.96]"
                    aria-label="Close Profile Modal"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>

                {/* Profile Header */}
                <motion.div variants={modalSectionVariants} className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-[rgba(13,37,61,0.12)] bg-canvas-recessed shrink-0 shadow-sm">
                    <Image
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      fill
                      loading="eager"
                      className="object-cover"
                      sizes="112px"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h2 className="font-display text-3xl sm:text-4xl text-ink-primary font-normal">
                        {selectedMember.name}
                      </h2>
                      <span className="px-2 py-0.5 rounded-full bg-terra-50 border border-terra-500/20 text-terra-600 text-xs font-mono font-semibold">
                        {selectedMember.degree}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-terra-600">
                      {selectedMember.role}
                    </div>
                    <div className="font-mono text-xs text-ink-secondary">
                      {selectedMember.pedigree}
                    </div>
                  </div>
                </motion.div>

                {/* Verified Biography */}
                <motion.div variants={modalSectionVariants} className="space-y-2 rounded-2xl bg-canvas-base border border-[rgba(13,37,61,0.08)] p-4">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-secondary flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-terra-500" />
                    <span>Verified Background</span>
                  </span>
                  <p className="text-sm text-ink-body leading-relaxed">
                    {selectedMember.bio}
                  </p>
                </motion.div>

                {/* Core Responsibility & Operating Tenet */}
                <motion.div variants={modalSectionVariants} className="space-y-4">
                  <div className="space-y-1.5">
                    <span className="font-mono text-xs uppercase tracking-wider text-ink-secondary font-semibold">
                      Core Architectural Focus
                    </span>
                    <p className="text-sm text-ink-primary leading-relaxed">
                      {selectedMember.focus}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-terra-50/60 border border-terra-500/20 p-4 space-y-1">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-terra-600 font-semibold">
                      Builder Tenet
                    </span>
                    <blockquote className="font-display text-lg italic text-ink-primary">
                      &ldquo;{selectedMember.tenet}&rdquo;
                    </blockquote>
                  </div>
                </motion.div>

                {/* Flagship Systems Owned — Staggered chip entrance */}
                <motion.div variants={modalSectionVariants} className="space-y-2.5">
                  <span className="font-mono text-xs uppercase tracking-wider text-ink-secondary font-semibold">
                    Flagship Systems &amp; Responsibilities
                  </span>
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                    variants={chipContainerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {selectedMember.systemsOwned.map((sys) => (
                      <motion.div
                        key={sys}
                        variants={chipVariants}
                        className="flex items-center gap-2 rounded-xl bg-canvas-base border border-[rgba(13,37,61,0.08)] p-2.5 text-xs text-ink-primary"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-sage-600 shrink-0" />
                        <span>{sys}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Primary Stack — Staggered chip entrance */}
                <motion.div variants={modalSectionVariants} className="space-y-2.5">
                  <span className="font-mono text-xs uppercase tracking-wider text-ink-secondary font-semibold">
                    Primary Tooling &amp; Stack
                  </span>
                  <motion.div
                    className="flex flex-wrap gap-2"
                    variants={chipContainerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {selectedMember.primaryStack.map((tech) => (
                      <motion.span
                        key={tech}
                        variants={chipVariants}
                        className="px-3 py-1 rounded-lg bg-canvas-sunken border border-[rgba(13,37,61,0.08)] text-xs font-mono text-ink-primary font-medium"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Close Action */}
                <motion.div variants={modalSectionVariants} className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setSelectedMember(null)}
                    className="px-5 py-2.5 rounded-xl bg-terra-500 text-white font-sans text-xs font-semibold hover:bg-terra-600 transition-colors shadow-sm active:scale-[0.96]"
                  >
                    Done Exploring
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
