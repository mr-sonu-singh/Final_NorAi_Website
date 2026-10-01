import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/foundation/Container';
import { ContactFormClient, ContactFormFallback } from './ContactFormClient';
import { Mail, MapPin, Globe, ShieldCheck, Clock } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import { SubpageHeroAtmosphere } from '@/components/organisms';

export const metadata: Metadata = buildMetadata({
  path: '/contact',
  title: 'Contact the Studio',
  description:
    'Talk to the founding engineers of NorAI Technologies Private Limited in Ghazipur, Uttar Pradesh. Enquiries go to a person, not a queue.',
});

export default function ContactPage() {
  return (
    <div className="min-h-screen font-sans bg-[#f5f5f0] dark:bg-[#060919] text-[var(--pine)] dark:text-[#F4F6FC] selection:bg-[#B278E3]/30 selection:text-[#060919]">
      {/* No page-level JSON-LD: the root layout already emits the site-wide
          Organization and WebSite entities for every route. */}

      {/* CINEMATIC HERO CHAMBER WITH DIRECT DESK BACKDROP */}
      <section className="relative min-h-[60vh] lg:min-h-[66vh] flex flex-col justify-center overflow-hidden bg-[#060919] text-[#F4F6FC] border-b border-white/10 pt-28 pb-16 sm:pt-36 sm:pb-20">
        <SubpageHeroAtmosphere
          imageSrc="/images/bg-services-observatory.webp"
          imageAlt="Ghazipur Studio Desk Direct Dialogue"
          imagePosition="object-cover object-[78%_center] md:object-[82%_center]"
          glowGradient="radial-gradient(ellipse 60% 40% at 75% 60%, rgba(30,244,180,0.20), transparent 70%), radial-gradient(ellipse 50% 50% at 20% 30%, rgba(255,162,77,0.15), transparent 70%)"
        />

        <Container size="default" className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-6 text-left">
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-white leading-[1.04] tracking-[-0.035em]">
              Start a project.{' '}
              <span className="text-[#38BDF8]">Talk with builders.</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#A8B6D8] leading-relaxed max-w-2xl font-normal text-pretty">
              Whether you need pragmatic AI workflows, high-speed custom web software, spatial computing environments, or want to collaborate on student workshops—speak directly with our founding engineering team. Every message reaches an engineer who reads it; reply time follows our current load.
            </p>
          </div>
        </Container>
      </section>

      {/* 3-STEP INTAKE PROTOCOL */}
      <section className="py-8 bg-[#fffdf7] dark:bg-[#060919] border-b border-[var(--line)] dark:border-white/10">
        <Container size="default" className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="flex items-start gap-3 p-5 rounded-2xl bg-[var(--porcelain)] dark:bg-white/5 border border-[var(--line)] dark:border-white/10 transition-all hover:shadow-sm">
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[var(--pine)] text-[#f5f5f0] dark:bg-white/15 dark:text-white">
                01
              </span>
              <div>
                <h4 className="font-display text-sm font-bold text-[var(--pine)] dark:text-white">Define Requirements</h4>
                <p className="text-xs text-[var(--pine)]/70 dark:text-white/70 mt-0.5">Share your workflow, latency goals, or cohort details.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-5 rounded-2xl bg-[var(--porcelain)] dark:bg-white/5 border border-[var(--line)] dark:border-white/10 transition-all hover:shadow-sm">
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[var(--pine)] text-[#f5f5f0] dark:bg-white/15 dark:text-white">
                02
              </span>
              <div>
                <h4 className="font-display text-sm font-bold text-[var(--pine)] dark:text-white">Architecture Review</h4>
                <p className="text-xs text-[var(--pine)]/70 dark:text-white/70 mt-0.5">We review feasibility and propose a functional blueprint.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-5 rounded-2xl bg-[var(--porcelain)] dark:bg-white/5 border border-[var(--line)] dark:border-white/10 transition-all hover:shadow-sm">
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[var(--pine)] text-[#f5f5f0] dark:bg-white/15 dark:text-white">
                03
              </span>
              <div>
                <h4 className="font-display text-sm font-bold text-[var(--pine)] dark:text-white">Sprint Execution</h4>
                <p className="text-xs text-[var(--pine)]/70 dark:text-white/70 mt-0.5">5-day working prototype or live in-person workshop.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* MAIN CONTACT STAGE */}
      <section className="py-14 sm:py-20 border-b border-[var(--line)]">
        <Container size="default" className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
            
            {/* Left Column: Verified Corporate Credentials */}
            <div className="space-y-6 lg:col-span-5 text-left">
              <div className="rounded-[22px] border border-[var(--line)] dark:border-white/10 bg-[#fffdf7] dark:bg-[#060919] p-7 sm:p-8 space-y-6 shadow-xs">
                {/* Active Status */}
                <div className="flex items-center justify-between border-b border-[var(--line)] dark:border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-[var(--mint-ink)] dark:bg-[#38BDF8] animate-pulse" />
                    <span className="font-mono text-xs font-bold text-[var(--mint-ink)] dark:text-[#38BDF8] tracking-wider uppercase">
                      STUDIO DESK ACTIVE
                    </span>
                  </div>
                  <span className="font-mono text-xs text-[var(--pine)]/80 dark:text-white/70">
                    Mon–Sat · 9 AM – 7 PM IST
                  </span>
                </div>



                {/* Direct Channels */}
                <div className="space-y-4 text-xs font-mono text-[var(--pine)] dark:text-white">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-[var(--pine)]/60 dark:text-white/60 block font-bold">
                      Direct Email
                    </span>
                    <a
                      href="mailto:noraitechnologies@gmail.com"
                      className="text-sm font-semibold text-[var(--mint-ink)] dark:text-[#38BDF8] hover:underline inline-flex items-center gap-2 break-all"
                    >
                      <Mail className="h-4 w-4 shrink-0" />
                      <span>noraitechnologies@gmail.com</span>
                    </a>
                  </div>



                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-[var(--pine)]/60 dark:text-white/60 block font-bold">
                      Studio &amp; Registered Address
                    </span>
                    <p className="text-xs text-[var(--pine)]/90 dark:text-white/90 flex items-start gap-2 leading-relaxed">
                      <MapPin className="h-4 w-4 text-[var(--mint-ink)] dark:text-[#38BDF8] shrink-0 mt-0.5" />
                      <span>Umarganj, Zamania, Ghazipur, Uttar Pradesh, India</span>
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-[var(--pine)]/60 dark:text-white/60 block font-bold">
                      Official Domain
                    </span>
                    <p className="text-xs font-semibold text-[var(--pine)] dark:text-white flex items-center gap-2">
                      <Globe className="h-4 w-4 text-[var(--mint-ink)] dark:text-[#38BDF8] shrink-0" />
                      <span>www.norai.tech</span>
                    </p>
                  </div>
                </div>

                {/* Desk Commitments */}
                <div className="pt-4 border-t border-[var(--line)] dark:border-white/10 space-y-2.5">
                  <div className="flex items-start gap-2 text-xs text-[var(--pine)]/80 dark:text-white/80 leading-normal">
                    <Clock className="h-4 w-4 text-[var(--mint-ink)] dark:text-[#38BDF8] shrink-0 mt-0.5" />
                    <span>
                      <strong className="font-semibold text-[var(--pine)] dark:text-white">Engineer Reviewed:</strong> Every message is read by founding engineers.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-[var(--pine)]/80 dark:text-white/80 leading-normal">
                    <ShieldCheck className="h-4 w-4 text-[var(--mint-ink)] dark:text-[#38BDF8] shrink-0 mt-0.5" />
                    <span>
                      <strong className="font-semibold text-[var(--pine)] dark:text-white">Zero Sales Bots:</strong> Direct technical consultation without deflection.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Contact Form */}
            <div className="lg:col-span-7">
              <div className="rounded-[22px] border border-[var(--line)] dark:border-white/10 bg-[#fffdf7] dark:bg-[#060919] p-6 sm:p-8 shadow-xs">
                {/* The form reads ?service= via useSearchParams. Without a
                    Suspense boundary that hook deopts the entire route to
                    client-side rendering, so the page ships as an empty shell
                    with no server-rendered heading or copy. The boundary keeps
                    the rest of the page server-rendered and streams only the
                    form. */}
                <Suspense fallback={<ContactFormFallback />}>
                  <ContactFormClient />
                </Suspense>
              </div>
            </div>

          </div>
        </Container>
      </section>
    </div>
  );
}
