'use client';

import React from 'react';
import { Container } from '@/components/foundation/Container';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import { Reveal } from '@/components/foundation/AnimatedSection';
import { ArrowRight } from 'lucide-react';

export function SkillMissionSection() {
  return (
    <section
      id="skill-mission"
      aria-label="NorAI Grassroots AI Skill Mission Monograph"
      className="py-14 md:py-20 bg-surface-canvas border-b border-border-subtle"
    >
      <Container size="default">
        <Reveal delay={0} y={20}>
          <div className="rounded-xl bg-surface-panel-subtle/50 border border-border-strong p-6 sm:p-10 md:p-12 text-left">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Editorial Monograph (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                <p className="text-xs font-mono font-semibold uppercase tracking-[0.14em] text-accent-primary">
                  Regional Initiative · Uttar Pradesh
                </p>

                <h3 className="font-display text-4xl sm:text-5xl font-normal text-text-primary leading-[1.08] tracking-display">
                  Engineered in Uttar Pradesh. <br />
                  <span className="italic text-accent-primary font-normal">Committed to Grassroots Scale.</span>
                </h3>

                <p className="fluid-body text-text-secondary leading-relaxed text-pretty">
                  Alongside our commercial enterprise automation pipelines, NorAI actively sponsors and powers grassroots computational literacy across all 75 districts of Uttar Pradesh. From teaching village elders everyday AI voice safety to training college engineers on local open-weight inference and MCP protocols.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-text-muted">
                  <Link href="/mission">
                    <Button variant="primary" size="sm" className="group active:scale-[0.98] transition-transform cursor-pointer">
                      <span>Read the Mission Monograph</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  </Link>
                  <span>100% Free &amp; Open to Public Educational Institutions</span>
                </div>
              </div>

              {/* Right Pillar Stat Card (5 cols) */}
              <div className="lg:col-span-5 rounded-xl bg-surface-panel border border-border-subtle p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-border-subtle pb-4 text-xs font-mono">
                  <span className="text-text-muted uppercase tracking-wider font-semibold">
                    Mission Architecture
                  </span>
                  <span className="text-xs font-mono text-text-muted font-medium">
                    Active Initiative
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded bg-surface-panel-subtle flex items-center justify-center font-mono text-xs font-semibold text-text-primary shrink-0 mt-0.5">
                      01
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-text-primary">Tier 1 · Everyday Vernacular AI</h4>
                      <p className="text-xs text-text-secondary">
                        Hindi voice prompts, welfare scheme access, and fraud/scam awareness for village citizens.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded bg-surface-panel-subtle flex items-center justify-center font-mono text-xs font-semibold text-text-primary shrink-0 mt-0.5">
                      02
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-text-primary">Tier 2 · Youth STEM Tutoring</h4>
                      <p className="text-xs text-text-secondary">
                        Socratic STEM inquiry, automated flashcard synthesis, and secondary school study tools.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded bg-surface-panel-subtle flex items-center justify-center font-mono text-xs font-semibold text-text-primary shrink-0 mt-0.5">
                      03
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-text-primary">Tier 3 · Collegiate Builder Hubs</h4>
                      <p className="text-xs text-text-secondary">
                        Model Context Protocol (MCP), local vLLM quantization, and production micro-SaaS deployments.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border-subtle flex items-center justify-between text-xs font-mono text-text-muted">
                  <span className="text-accent-primary font-medium">
                    75 Districts Covered
                  </span>
                  <span>Non-Profit Track</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export default SkillMissionSection;
