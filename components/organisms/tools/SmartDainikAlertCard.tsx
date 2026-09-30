'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  Calendar,
  Users,
  GraduationCap,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  Bell,
  Check,
  FileText,
  Building2,
  Share2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { GazetteAlertCard } from '@/lib/tools/types';

export type SurfaceDStatusType =
  | 'verified' // Cache HIT / 2xx OK -> "Up to Date (Verified)"
  | 'checking' // Cache MISS / Staging -> "Checking for Updates"
  | 'refreshing' // STALE / Revalidating -> "Refreshing Listing"
  | 'new-alert' // PRERENDER -> "New Alert Available"
  | 'deadline-urgent' // 4xx WARN -> "Deadline Approaching"
  | 'board-review' // Triage Staging -> "Under Review by Board"
  | 'unavailable'; // 5xx ERROR -> "Temporarily Unavailable"

export interface SmartDainikAlertCardProps {
  card?: Partial<GazetteAlertCard>;
  statusType?: SurfaceDStatusType;
  initialLanguage?: 'bilingual' | 'english' | 'hindi';
  onCheckEligibility?: () => void;
  onSetAlert?: () => void;
  className?: string;
}

// Default benchmark data matching UP Police / UPPSC gazettes
const DEFAULT_CARD_DATA: GazetteAlertCard = {
  id: 'alert-uppbpb-constable-2026',
  title: 'UP Police Constable & Fireman Direct Recruitment 2026',
  hindiTitle: 'उत्तर प्रदेश पुलिस आरक्षी एवं फायरमैन सीधी भर्ती 2026',
  departmentOrMinistry: 'Uttar Pradesh Police Recruitment & Promotion Board (UPPRPB)',
  hindiDepartmentOrMinistry: 'उत्तर प्रदेश पुलिस भर्ती एवं प्रोन्नति बोर्ड (लखनऊ)',
  category: 'Govt Employment',
  urgencyLevel: 'Active Window',
  deadlineDate: '15 October 2026',
  hindiDeadlineDate: '15 अक्टूबर 2026',
  daysRemaining: 14,
  vacanciesOrScope: '19,200 Verified Vacancies',
  hindiVacanciesOrScope: '19,200 पद (आरक्षी एवं फायरमैन)',
  salaryBandOrBudget: 'Pay Level 3 (₹21,700 – ₹69,100 per month)',
  hindiSalaryBandOrBudget: 'वेतनमान पे मैट्रिक्स लेवल 3 (₹21,700 – ₹69,100)',
  eligibilitySnippet:
    'Candidate must have passed 12th Standard (Intermediate) from a recognized board. Minimum age is 18 years and maximum age is 22 years.',
  hindiEligibilitySnippet:
    'अभ्यर्थी किसी मान्यता प्राप्त बोर्ड से 12वीं (इंटरमीडिएट) उत्तीर्ण होना चाहिए। न्यूनतम आयु 18 वर्ष एवं अधिकतम 22 वर्ष निर्धारित है।',
  officialPortalUrl: 'https://uppbpb.gov.in',
  verifiedSourceRef: 'Gazette Dispatch UP-POL-2026/088',
  officialSealReference: 'Advt. No. PRPB-1(88)/2026',
  antiRumorNote:
    'Official advertisement published on uppbpb.gov.in. No offline application forms are accepted.',
  hindiAntiRumorNote:
    'आधिकारिक विज्ञापन uppbpb.gov.in पर जारी। कोई भी ऑफलाइन फॉर्म स्वीकार्य नहीं है।',
  minAge: 18,
  maxAge: 22,
  requiredDegrees: ['12th Pass (Intermediate)', '10+2 Any Stream'],
  categoryRelaxations: {
    General: 0,
    EWS: 0,
    OBC: 3,
    'SC/ST': 5,
    PwD: 0,
  },
  feeStructure: {
    'General / OBC / EWS': '₹400',
    'SC / ST': '₹400',
    'Female Candidates': '₹400',
  },
};

export function SmartDainikAlertCard({
  card = DEFAULT_CARD_DATA,
  statusType = 'verified',
  initialLanguage = 'bilingual',
  onCheckEligibility,
  onSetAlert,
  className,
}: SmartDainikAlertCardProps) {
  const mergedCard = { ...DEFAULT_CARD_DATA, ...card };

  // Language state: 'bilingual' | 'english' | 'hindi'
  const [language, setLanguage] = useState<'bilingual' | 'english' | 'hindi'>(initialLanguage);

  // Interactive inline eligibility checker drawer
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);
  const [userAge, setUserAge] = useState<number>(20);
  const [userCategory, setUserCategory] = useState<'General' | 'EWS' | 'OBC' | 'SC/ST'>('General');
  const [userEducation, setUserEducation] = useState<'12th Pass' | 'Graduate' | 'Below 12th'>(
    '12th Pass',
  );

  // Copy feedback state
  const [copiedLink, setCopiedLink] = useState(false);
  const [alertSaved, setAlertSaved] = useState(false);

  // Surface D Plain-Language Status Badge Mapper (DESIGN.md §4.5)
  const renderPlainLanguageBadge = () => {
    switch (statusType) {
      case 'verified':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-medium bg-[#ECFDF5] text-[#047857] border border-[#059669]/20">
            <span className="w-2 h-2 rounded-full bg-[#059669]" />
            <span>Up to Date (Verified)</span>
          </span>
        );
      case 'checking':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-medium bg-[#EEF2FF] text-[#4338CA] border border-[#4F46E5]/20">
            <span className="w-2 h-2 rounded-full bg-[#4F46E5] animate-pulse" />
            <span>Checking for Updates</span>
          </span>
        );
      case 'refreshing':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-medium bg-[#FFFBEB] text-[#B45309] border border-[#D97706]/20">
            <span className="w-2 h-2 rounded-full bg-[#D97706] animate-pulse" />
            <span>Refreshing Listing</span>
          </span>
        );
      case 'new-alert':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-semibold bg-[#141C2B] text-[#F5F0EA] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#A34420] animate-ping" />
            <span>New Alert Available</span>
          </span>
        );
      case 'deadline-urgent':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-semibold bg-[#FEF2F2] text-[#B91C1C] border border-[#DC2626]/30">
            <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
            <span>Deadline Approaching</span>
          </span>
        );
      case 'board-review':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-medium bg-[#F1F5F9] text-[#475569] border border-[#64748B]/20">
            <span className="w-2 h-2 rounded-full bg-[#64748B]" />
            <span>Under Review by Board</span>
          </span>
        );
      case 'unavailable':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-medium bg-[#FEF2F2] text-[#B91C1C] border border-[#DC2626]/20">
            <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
            <span>Temporarily Unavailable</span>
          </span>
        );
    }
  };

  // Plain-Language Eligibility Calculator
  const minAge = mergedCard.minAge ?? 18;
  const baseMaxAge = mergedCard.maxAge ?? 22;
  const relaxationYears = mergedCard.categoryRelaxations?.[userCategory] ?? 0;
  const maxAllowedAge = baseMaxAge + relaxationYears;

  const isAgeValid = userAge >= minAge && userAge <= maxAllowedAge;
  const isEducationValid = userEducation !== 'Below 12th';
  const isOverallEligible = isAgeValid && isEducationValid;

  const handleCopyNotice = () => {
    const text = `${mergedCard.title} (${mergedCard.hindiTitle})\nDepartment: ${mergedCard.departmentOrMinistry}\nVacancies: ${mergedCard.vacanciesOrScope}\nDeadline: ${mergedCard.daysRemaining} days remaining (${mergedCard.deadlineDate})\nApply: ${mergedCard.officialPortalUrl}`;
    navigator.clipboard?.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleToggleAlert = () => {
    setAlertSaved(!alertSaved);
    if (onSetAlert) onSetAlert();
  };

  return (
    <article
      className={cn(
        'paper-card w-full max-w-2xl mx-auto rounded-2xl bg-[#FAF7F2] border border-[#141C2B]/12 shadow-sm text-[#141C2B] overflow-hidden transition-all',
        className,
      )}
    >
      {/* 1. TOP HEADER STRIP: Notice Reference & Language Pill Switcher */}
      <div className="px-4 py-3 sm:px-5 bg-[#F5F0EA] border-b border-[#141C2B]/8 flex items-center justify-between gap-3 flex-wrap">
        {/* Plain-Language Notice Reference ID */}
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-[#526075] shrink-0" />
          <span className="text-[13px] font-mono text-[#526075]">
            Notice Reference ID:{' '}
            <strong className="text-[#141C2B] font-semibold">
              {mergedCard.officialSealReference || 'Advt. 04-Exam/2026'}
            </strong>
          </span>
        </div>

        {/* Instant Language Switcher — Oversized Touch Targets (Min 44px touch area) */}
        <div className="flex items-center gap-1 bg-[#FAF7F2] p-1 rounded-xl border border-[#141C2B]/10">
          <button
            type="button"
            onClick={() => setLanguage('bilingual')}
            className={cn(
              'min-h-[38px] px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all active:scale-[0.98]',
              language === 'bilingual'
                ? 'bg-[#141C2B] text-[#F5F0EA] font-semibold shadow-xs'
                : 'text-[#526075] hover:text-[#141C2B]',
            )}
            aria-label="View Bilingual English and Hindi"
          >
            Bilingual
          </button>
          <button
            type="button"
            onClick={() => setLanguage('english')}
            className={cn(
              'min-h-[38px] px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all active:scale-[0.98]',
              language === 'english'
                ? 'bg-[#141C2B] text-[#F5F0EA] font-semibold shadow-xs'
                : 'text-[#526075] hover:text-[#141C2B]',
            )}
            aria-label="View in English"
          >
            English
          </button>
          <button
            type="button"
            onClick={() => setLanguage('hindi')}
            className={cn(
              'min-h-[38px] px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all active:scale-[0.98]',
              language === 'hindi'
                ? 'bg-[#141C2B] text-[#F5F0EA] font-semibold shadow-xs'
                : 'text-[#526075] hover:text-[#141C2B]',
            )}
            aria-label="View in Hindi Devanagari"
          >
            हिन्दी
          </button>
        </div>
      </div>

      {/* 2. CARD CONTENT: Stacked, Generous 16px-20px Padding */}
      <div className="p-4 sm:p-5 md:p-6 space-y-5">
        {/* Authority & Plain-Language Status Bar */}
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="space-y-1">
            <span className="text-[13px] font-medium text-[#526075] block">
              {language === 'hindi'
                ? mergedCard.hindiDepartmentOrMinistry || mergedCard.departmentOrMinistry
                : mergedCard.departmentOrMinistry}
            </span>
            <div className="flex items-center gap-2 pt-0.5">{renderPlainLanguageBadge()}</div>
          </div>

          {/* Days Remaining Pill */}
          <div className="px-3.5 py-2 rounded-xl bg-[#F5F0EA] border border-[#141C2B]/10 text-right">
            <span className="text-[12px] font-medium text-[#526075] block">
              Application Deadline
            </span>
            <span className="text-base font-bold text-[#A34420] tabular-nums">
              {mergedCard.daysRemaining} Days Remaining
            </span>
          </div>
        </div>

        {/* Alert Title with Declarative Clarity */}
        <div className="space-y-1">
          {language !== 'hindi' && (
            <h3 className="text-lg sm:text-xl font-bold text-[#141C2B] leading-snug">
              {mergedCard.title}
            </h3>
          )}
          {language !== 'english' && (
            <h4
              className={cn(
                'text-[#526075] font-medium leading-relaxed',
                language === 'hindi'
                  ? 'text-lg sm:text-xl font-bold text-[#141C2B]'
                  : 'text-[15px] pt-0.5',
              )}
            >
              {mergedCard.hindiTitle}
            </h4>
          )}
        </div>

        {/* 3. ISOLATED NUMERICAL ANCHORS: High-contrast Key Attribute Metric Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Vacancy Metric Box */}
          <div className="p-3.5 rounded-xl bg-[#F5F0EA] border border-[#141C2B]/10 space-y-1">
            <div className="flex items-center gap-1.5 text-[#526075] text-[13px] font-medium">
              <Users className="w-4 h-4 text-[#A34420]" />
              <span>Vacancies</span>
            </div>
            <div className="text-base font-bold text-[#141C2B] tabular-nums">
              {language === 'hindi'
                ? mergedCard.hindiVacanciesOrScope || mergedCard.vacanciesOrScope
                : mergedCard.vacanciesOrScope}
            </div>
          </div>

          {/* Age Limit Metric Box */}
          <div className="p-3.5 rounded-xl bg-[#F5F0EA] border border-[#141C2B]/10 space-y-1">
            <div className="flex items-center gap-1.5 text-[#526075] text-[13px] font-medium">
              <Calendar className="w-4 h-4 text-[#A34420]" />
              <span>Age Criteria</span>
            </div>
            <div className="text-base font-bold text-[#141C2B] tabular-nums">
              {minAge} – {baseMaxAge} Years
            </div>
          </div>

          {/* Qualification Metric Box */}
          <div className="p-3.5 rounded-xl bg-[#F5F0EA] border border-[#141C2B]/10 space-y-1">
            <div className="flex items-center gap-1.5 text-[#526075] text-[13px] font-medium">
              <GraduationCap className="w-4 h-4 text-[#A34420]" />
              <span>Qualification</span>
            </div>
            <div className="text-base font-bold text-[#141C2B]">12th Pass (10+2)</div>
          </div>
        </div>

        {/* 4. PLAIN-LANGUAGE ELIGIBILITY SUMMARY: Base size 16px, Line-height 1.6 */}
        <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#141C2B]/10 space-y-2">
          <span className="text-[13px] font-bold uppercase tracking-wider text-[#A34420] flex items-center gap-1.5">
            <FileText className="w-4 h-4" />
            <span>Eligibility Summary</span>
          </span>
          <p className="text-base text-[#141C2B] font-normal leading-[1.6]">
            {language === 'hindi'
              ? mergedCard.hindiEligibilitySnippet || mergedCard.eligibilitySnippet
              : mergedCard.eligibilitySnippet}
          </p>
        </div>

        {/* 5. ANTI-RUMOR OFFICIAL VERIFICATION CLAUSE: Plain Language */}
        <div className="p-3.5 rounded-xl bg-[#FFFBEB] border border-[#D97706]/30 text-[#78350F] flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
          <div className="space-y-0.5 text-[13px] leading-relaxed">
            <strong className="font-semibold block text-[#92400E]">Verified Official Notice</strong>
            <p>
              {language === 'hindi'
                ? mergedCard.hindiAntiRumorNote || mergedCard.antiRumorNote
                : mergedCard.antiRumorNote}
            </p>
          </div>
        </div>

        {/* 6. EXPANDABLE 1-CLICK ELIGIBILITY CHECKER (Full-Width Touch Target) */}
        <div className="border border-[#141C2B]/12 rounded-xl bg-[#F5F0EA] overflow-hidden">
          <button
            type="button"
            onClick={() => {
              setIsEligibilityOpen(!isEligibilityOpen);
              if (onCheckEligibility) onCheckEligibility();
            }}
            className="w-full min-h-[48px] px-4 py-3 flex items-center justify-between text-left text-[15px] font-semibold text-[#141C2B] hover:bg-[#ECE5DA] transition-colors"
            aria-expanded={isEligibilityOpen}
          >
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#A34420]" />
              <span>Check My Eligibility (Single Tap)</span>
            </div>
            {isEligibilityOpen ? (
              <ChevronUp className="w-5 h-5 text-[#526075]" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#526075]" />
            )}
          </button>

          <AnimatePresence>
            {isEligibilityOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="p-4 border-t border-[#141C2B]/10 space-y-4 bg-[#FAF7F2]"
              >
                {/* Age Slider with large touch target */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[14px]">
                    <span className="font-medium text-[#141C2B]">Your Current Age:</span>
                    <strong className="text-base font-bold text-[#A34420] tabular-nums">
                      {userAge} Years
                    </strong>
                  </div>
                  <input
                    type="range"
                    min={16}
                    max={35}
                    value={userAge}
                    onChange={(e) => setUserAge(Number(e.target.value))}
                    className="w-full h-3 bg-[#E0D5C5] rounded-lg accent-[#A34420] cursor-pointer min-h-[44px]"
                    aria-label="Select applicant age"
                  />
                  <div className="flex justify-between text-[12px] text-[#526075]">
                    <span>16 yrs</span>
                    <span>18 yrs (Min)</span>
                    <span>22 yrs (Base Max)</span>
                    <span>35 yrs</span>
                  </div>
                </div>

                {/* Category & Qualification Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label
                      htmlFor="card-user-category"
                      className="text-[13px] font-medium text-[#141C2B] block"
                    >
                      Reservation Category
                    </label>
                    <select
                      id="card-user-category"
                      value={userCategory}
                      onChange={(e) => setUserCategory(e.target.value as typeof userCategory)}
                      className="w-full min-h-[44px] px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#141C2B]/20 text-[#141C2B] text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-[#A34420]"
                    >
                      <option value="General">General (Unreserved)</option>
                      <option value="OBC">OBC (+3 Years Relaxation)</option>
                      <option value="SC/ST">SC / ST (+5 Years Relaxation)</option>
                      <option value="EWS">EWS (Economically Weaker)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="card-user-edu"
                      className="text-[13px] font-medium text-[#141C2B] block"
                    >
                      Your Highest Education
                    </label>
                    <select
                      id="card-user-edu"
                      value={userEducation}
                      onChange={(e) => setUserEducation(e.target.value as typeof userEducation)}
                      className="w-full min-h-[44px] px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#141C2B]/20 text-[#141C2B] text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-[#A34420]"
                    >
                      <option value="12th Pass">12th Pass (Intermediate)</option>
                      <option value="Graduate">Graduate (B.A. / B.Sc / B.Tech)</option>
                      <option value="Below 12th">Below 12th Standard</option>
                    </select>
                  </div>
                </div>

                {/* Live Plain-Language Result Banner */}
                <div
                  className={cn(
                    'p-3.5 rounded-xl border text-[14px] flex items-start gap-3',
                    isOverallEligible
                      ? 'bg-[#ECFDF5] border-[#059669]/30 text-[#065F46]'
                      : 'bg-[#FEF2F2] border-[#DC2626]/30 text-[#991B1B]',
                  )}
                >
                  {isOverallEligible ? (
                    <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-0.5 leading-relaxed">
                    <strong className="font-semibold block">
                      {isOverallEligible
                        ? relaxationYears > 0 && userAge > baseMaxAge
                          ? `Eligible to Apply (Using ${relaxationYears}-year ${userCategory} relaxation)`
                          : 'You are Eligible to Apply'
                        : !isAgeValid
                          ? `Age limit exceeded (Maximum age for ${userCategory} is ${maxAllowedAge} years)`
                          : '12th Pass is required for this post'}
                    </strong>
                    <p className="text-[13px]">
                      {isOverallEligible
                        ? `Application fee is ₹400. Submission deadline is ${mergedCard.deadlineDate}.`
                        : 'Please check other recruitment notices suited to your current qualifications.'}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 7. FULL-WIDTH PRIMARY & SECONDARY ACTIONS: Minimum 48px Height, 8px+ Gap */}
        <div className="space-y-3 pt-2">
          {/* Primary Action Button */}
          <a
            href={mergedCard.officialPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-h-[48px] px-5 py-3 rounded-xl bg-[#141C2B] text-[#F5F0EA] hover:bg-[#A34420] font-semibold text-[15px] flex items-center justify-center gap-2 transition-colors active:scale-[0.99] shadow-xs"
          >
            <span>VIEW OFFICIAL NOTICE (PDF)</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          {/* Secondary Actions Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleToggleAlert}
              className={cn(
                'w-full min-h-[48px] px-4 py-2.5 rounded-xl border-2 font-semibold text-[14px] flex items-center justify-center gap-2 transition-all active:scale-[0.99]',
                alertSaved
                  ? 'bg-[#ECFDF5] border-[#059669] text-[#065F46]'
                  : 'bg-[#FAF7F2] border-[#141C2B]/15 text-[#141C2B] hover:bg-[#ECE5DA]',
              )}
            >
              {alertSaved ? (
                <>
                  <Check className="w-4 h-4 text-[#059669]" />
                  <span>Alert Saved (WhatsApp / SMS)</span>
                </>
              ) : (
                <>
                  <Bell className="w-4 h-4 text-[#A34420]" />
                  <span>Set WhatsApp / SMS Alert</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleCopyNotice}
              className="w-full min-h-[48px] px-4 py-2.5 rounded-xl bg-[#FAF7F2] border-2 border-[#141C2B]/15 text-[#141C2B] hover:bg-[#ECE5DA] font-semibold text-[14px] flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-[#059669]" />
                  <span>Copied Summary!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-[#526075]" />
                  <span>Share / Copy Notice</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
