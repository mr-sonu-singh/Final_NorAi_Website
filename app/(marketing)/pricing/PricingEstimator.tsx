'use client';

import React, { useState, useId } from 'react';
import { Container } from '@/components/foundation/Container';
import { Section } from '@/components/foundation/Section';
import { Heading } from '@/components/foundation/Heading';
import { Text } from '@/components/foundation/Text';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import { Zap, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

export function PricingEstimator() {
  const [resumes, setResumes] = useState(500);
  const [audioHours, setAudioHours] = useState(12);
  const [chatMessages, setChatMessages] = useState(25000);

  const resumesId = useId();
  const audioId = useId();
  const chatId = useId();

  // Compute total monthly operations / requests estimate
  // 1 resume parsing & scoring = ~4 API ops (text extraction, vector scoring, summary, rubric)
  // 1 hour audio parsing & note taking = ~15 API ops (chunking, whisper transcription, latex extraction, quiz generation)
  // 1,000 chat messages = ~2 API ops (batch deduplication, topic clustering, sentiment extraction)
  const totalOps = Math.round(
    resumes * 4 + audioHours * 15 + (chatMessages / 1000) * 2
  );

  // Determine recommended tier
  let recommendedTier = 'Starter';
  let tierPrice = 29;
  let annualPrice = 23;
  let latencySpec = '< 950ms';
  let tierLimit = '5,000 ops / mo';
  let planId = 'starter';

  if (totalOps > 5000 && totalOps <= 50000) {
    recommendedTier = 'Pro';
    tierPrice = 99;
    annualPrice = 79;
    latencySpec = '< 350ms (Dedicated Pool)';
    tierLimit = '50,000 ops / mo';
    planId = 'pro';
  } else if (totalOps > 50000) {
    recommendedTier = 'Enterprise';
    tierPrice = 0;
    annualPrice = 0;
    latencySpec = '< 100ms (Dedicated VPC)';
    tierLimit = 'Unlimited ops';
    planId = 'enterprise';
  }

  // Estimated human recruiter & student hours saved
  // ~15 mins per resume (0.25 hrs), ~45 mins per lecture hour (0.75 hrs), ~3 hrs per 10k messages
  const hoursSaved = Math.round(
    resumes * 0.25 + audioHours * 0.75 + (chatMessages / 10000) * 3
  );

  // Effective cost per operation
  const effectiveCostPerOp =
    tierPrice > 0 ? (tierPrice / totalOps).toFixed(4) : 'Custom';

  return (
    <Section variant="sunken" className="py-16 lg:py-20 border-y border-line-subtle">
      <Container size="default">
        <div className="mx-auto max-w-2xl text-center space-y-3 mb-12">
          <p className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-accent-primary">
            Interactive Telemetry
          </p>
          <Heading as="h2" variant="display-md" className="text-balance text-ink-primary">
            Workload & Efficiency Estimator
          </Heading>
          <Text variant="body-md" className="text-ink-body">
            Dial your estimated monthly workload to calculate compute throughput, latency SLA, and time saved.
          </Text>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch">
          {/* Controls Panel */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-line-subtle bg-canvas-paper p-6 sm:p-8 shadow-sm space-y-8">
            <div className="space-y-6">
              {/* Slider 1: Resumes */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor={resumesId} className="text-sm font-semibold text-ink-primary">
                    Candidate Resumes / month
                  </label>
                  <span className="font-mono text-sm font-bold text-accent-primary tabular-nums">
                    {resumes.toLocaleString()} resumes
                  </span>
                </div>
                <input
                  id={resumesId}
                  type="range"
                  min={50}
                  max={5000}
                  step={50}
                  value={resumes}
                  onChange={(e) => setResumes(Number(e.target.value))}
                  className="w-full h-2 bg-canvas-recessed rounded-lg appearance-none cursor-pointer accent-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20"
                />
                <div className="flex justify-between text-[11px] font-mono text-ink-muted">
                  <span>50 / mo</span>
                  <span>2,500 / mo</span>
                  <span>5,000+ / mo</span>
                </div>
              </div>

              {/* Slider 2: Audio Hours */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor={audioId} className="text-sm font-semibold text-ink-primary">
                    Lecture & Video Audio / month
                  </label>
                  <span className="font-mono text-sm font-bold text-accent-primary tabular-nums">
                    {audioHours.toLocaleString()} hours
                  </span>
                </div>
                <input
                  id={audioId}
                  type="range"
                  min={2}
                  max={100}
                  step={2}
                  value={audioHours}
                  onChange={(e) => setAudioHours(Number(e.target.value))}
                  className="w-full h-2 bg-canvas-recessed rounded-lg appearance-none cursor-pointer accent-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20"
                />
                <div className="flex justify-between text-[11px] font-mono text-ink-muted">
                  <span>2 hrs</span>
                  <span>50 hrs</span>
                  <span>100+ hrs</span>
                </div>
              </div>

              {/* Slider 3: Community Messages */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor={chatId} className="text-sm font-semibold text-ink-primary">
                    Community Chat Messages / month
                  </label>
                  <span className="font-mono text-sm font-bold text-accent-primary tabular-nums">
                    {chatMessages.toLocaleString()} msgs
                  </span>
                </div>
                <input
                  id={chatId}
                  type="range"
                  min={1000}
                  max={100000}
                  step={1000}
                  value={chatMessages}
                  onChange={(e) => setChatMessages(Number(e.target.value))}
                  className="w-full h-2 bg-canvas-recessed rounded-lg appearance-none cursor-pointer accent-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20"
                />
                <div className="flex justify-between text-[11px] font-mono text-ink-muted">
                  <span>1,000</span>
                  <span>50,000</span>
                  <span>100,000+</span>
                </div>
              </div>
            </div>

            {/* Spec breakdown footer */}
            <div className="rounded-xl border border-line-subtle bg-canvas-recessed/60 p-4 font-mono text-xs text-ink-secondary space-y-1.5">
              <div className="flex justify-between">
                <span>Estimated Compute Load:</span>
                <span className="font-bold text-ink-primary tabular-nums">
                  ~{totalOps.toLocaleString()} API operations / mo
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-ink-muted">
                <span>Memory Footprint:</span>
                <span>Zero persistence (Ephemeral in-RAM)</span>
              </div>
            </div>
          </div>

          {/* Results Telemetry Dashboard Card */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border-2 border-accent-primary bg-canvas-paper p-6 sm:p-8 shadow-md">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-line-subtle">
                <div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink-muted">
                    Recommended Plan
                  </span>
                  <h3 className="font-display text-3xl font-semibold text-ink-primary">
                    {recommendedTier}
                  </h3>
                </div>
                <span className="rounded-full bg-accent-subtle px-3 py-1 font-mono text-xs font-bold text-accent-primary">
                  {tierLimit}
                </span>
              </div>

              {/* Price calculation */}
              <div className="py-6 border-b border-line-subtle">
                <div className="flex items-baseline gap-1">
                  {tierPrice === 0 ? (
                    <span className="text-3xl font-bold font-mono tracking-tight text-ink-primary">
                      Custom Quote
                    </span>
                  ) : (
                    <>
                      <span className="font-mono text-4xl font-bold tracking-tight text-ink-primary tabular-nums">
                        ${tierPrice}
                      </span>
                      <span className="text-sm font-sans text-ink-secondary">
                        / mo ({annualPrice > 0 ? `$${annualPrice}/mo billed annually` : ''})
                      </span>
                    </>
                  )}
                </div>
                <p className="mt-1 text-xs text-ink-secondary">
                  Effective cost:{' '}
                  <strong className="font-mono text-ink-primary">
                    {effectiveCostPerOp === 'Custom' ? 'Tailored to VPC' : `$${effectiveCostPerOp} / operation`}
                  </strong>
                </p>
              </div>

              {/* Metric Callouts */}
              <div className="py-6 space-y-3.5">
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-subtle text-accent-primary">
                    <Zap className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-ink-primary">Latency SLA Guarantee: </span>
                    <span className="font-mono text-xs text-ink-secondary">{latencySpec}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sage-100 text-sage-700">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-ink-primary">Estimated Human Hours Saved: </span>
                    <span className="font-mono text-xs font-bold text-sage-700">
                      ~{hoursSaved} hours / month
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-canvas-recessed text-ink-secondary">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-ink-primary">Data Privacy: </span>
                    <span className="text-xs text-ink-secondary">Zero public model training</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href={planId === 'enterprise' ? '/contact?service=enterprise-capacity' : `/contact?tier=${planId}`}
                variant="unstyled"
                aria-label={`Get started with ${recommendedTier} plan based on your calculation`}
              >
                <Button variant="primary" size="lg" fullWidth className="group justify-between">
                  <span>
                    {planId === 'enterprise'
                      ? 'Discuss Enterprise Capacity'
                      : `Select ${recommendedTier} Plan`}
                  </span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default PricingEstimator;
