'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import {
  Newspaper,
  Upload,
  AlertTriangle,
  Download,
  Copy,
  Code2,
  FileSpreadsheet,
  FileText,
  ShieldCheck,
  ExternalLink,
  Briefcase,
  Languages,
  Scale,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Building2,
  GraduationCap,
  Cpu,
  Sliders,
  Award,
  Check,
} from 'lucide-react';
import { ToolShell } from './ToolShell';
import { ApiKeyModal } from './ApiKeyModal';
import { DainikNewsResult, GazetteAlertCard, ByokSettings } from '@/lib/tools/types';
import { DAINIK_NEWS_PRESETS } from '@/lib/tools/presets';
import { extractTextFromFile, estimateTokenCount } from '@/lib/tools/client-parser';
import { SmartDainikAlertCard } from './SmartDainikAlertCard';

export function SmartDainikNewsWorkbench() {
  // Preset Selection
  const [activePresetId, setActivePresetId] = useState<string>(
    DAINIK_NEWS_PRESETS[0]?.id || 'preset-uppsc-gazette',
  );
  const currentPreset =
    DAINIK_NEWS_PRESETS.find((p) => p.id === activePresetId) || DAINIK_NEWS_PRESETS[0];

  // Intake Segmentation Dock: 1. Region & Stream | 2. Gazette Ingestion | 3. Eligibility Matcher
  const [intakeTab, setIntakeTab] = useState<'region' | 'ingestion' | 'matcher'>('region');

  // Form Inputs
  const [stateOrRegion, setStateOrRegion] = useState(
    currentPreset?.stateOrRegion || 'Uttar Pradesh, India',
  );
  const [domain, setDomain] = useState(
    currentPreset?.domain || 'Public Engineering & Technical Services',
  );
  const [languageMode, setLanguageMode] = useState<
    'Bilingual (Hindi + English)' | 'English' | 'Hindi'
  >(currentPreset?.languageMode || 'Bilingual (Hindi + English)');
  const [gazetteText, setGazetteText] = useState(currentPreset?.sampleGazetteText || '');

  // Active Display Language for Instant Bilingual Switcher
  const [displayLanguage, setDisplayLanguage] = useState<'bilingual' | 'english' | 'hindi'>(
    'bilingual',
  );

  // Category Filter for Regional Gazette Feed Stream
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('ALL');

  // Interactive 1-Click Eligibility Criteria Matcher State
  const [userAge, setUserAge] = useState<number>(27);
  const [userDegree, setUserDegree] = useState<string>('B.Tech / B.E. (Civil Engineering)');
  const [userCategory, setUserCategory] = useState<'General' | 'EWS' | 'OBC' | 'SC/ST' | 'PwD'>(
    'OBC',
  );
  const [userDomicile, setUserDomicile] = useState<'UP Resident' | 'Other State'>('UP Resident');

  // File Upload State
  const [uploadedFiles, setUploadedFiles] = useState<
    Array<{ name: string; sizeBytes: number; tokens: number }>
  >([]);
  const [isParsingFiles, setIsParsingFiles] = useState(false);

  // Processing & Results
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<DainikNewsResult | null>(
    currentPreset?.precomputedResult || null,
  );
  const [activeTab, setActiveTab] = useState<
    'alerts' | 'matcher' | 'matrix' | 'bilingual' | 'json'
  >('alerts');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // BYOK Settings
  const [isByokModalOpen, setIsByokModalOpen] = useState(false);
  const [byokSettings, setByokSettings] = useState<ByokSettings>({
    apiKey: '',
    preferredModel: 'gemini-3.5-lite',
  });

  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  // Load BYOK from localStorage
  useEffect(() => {
    try {
      const storedKey = localStorage.getItem('norai_byok_gemini_key');
      const storedModel = localStorage.getItem('norai_byok_gemini_model');
      if (storedKey) {
        setByokSettings({
          apiKey: storedKey,
          preferredModel: (storedModel as ByokSettings['preferredModel']) || 'gemini-3.5-lite',
        });
      }
    } catch {
      // Ignore
    }
  }, []);

  const handleSaveByok = (newSettings: ByokSettings) => {
    setByokSettings(newSettings);
    try {
      if (newSettings.apiKey) {
        localStorage.setItem('norai_byok_gemini_key', newSettings.apiKey);
        localStorage.setItem('norai_byok_gemini_model', newSettings.preferredModel);
      } else {
        localStorage.removeItem('norai_byok_gemini_key');
        localStorage.removeItem('norai_byok_gemini_model');
      }
    } catch {
      // Ignore
    }
  };

  // Switch Preset
  const handleSelectPreset = (presetId: string) => {
    setActivePresetId(presetId);
    const preset = DAINIK_NEWS_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setStateOrRegion(preset.stateOrRegion);
      setDomain(preset.domain);
      setLanguageMode(preset.languageMode);
      setGazetteText(preset.sampleGazetteText);
      setResult(preset.precomputedResult);
      setUploadedFiles([]);
      setErrorMessage(null);
      setSelectedCategoryFilter('ALL');

      // Sync default degree for presets
      if (preset.id === 'preset-uppsc-gazette') {
        setUserDegree('B.Tech / B.E. (Civil Engineering)');
      } else if (preset.id === 'preset-up-smartcity-gazette') {
        setUserDegree('Registered MSME / Private Limited Company');
      } else if (preset.id === 'preset-up-scholarship-gazette') {
        setUserDegree('Undergraduate (B.Tech / B.Sc / B.Com / B.A.)');
      }
    }
  };

  // Upload File
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsParsingFiles(true);
    setErrorMessage(null);
    let combinedText = '';
    const newFileMeta: Array<{ name: string; sizeBytes: number; tokens: number }> = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file) continue;
        const parsed = await extractTextFromFile(file);
        combinedText += `\n\n--- OFFICIAL GAZETTE: ${parsed.name} ---\n${parsed.extractedText}`;
        newFileMeta.push({
          name: parsed.name,
          sizeBytes: parsed.sizeBytes,
          tokens: parsed.estimatedTokens,
        });
      }

      setGazetteText((prev) => (prev ? `${prev}\n${combinedText}` : combinedText));
      setUploadedFiles((prev) => [...prev, ...newFileMeta]);
      setActivePresetId('custom');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error parsing gazette document.';
      setErrorMessage(msg);
    } finally {
      setIsParsingFiles(false);
    }
  };

  // Run Synthesis
  const handleRunAnalysis = async () => {
    setIsProcessing(true);
    setErrorMessage(null);

    // Fast-path: Instant preset
    if (
      currentPreset &&
      activePresetId !== 'custom' &&
      gazetteText === currentPreset.sampleGazetteText &&
      !byokSettings.apiKey
    ) {
      setTimeout(() => {
        setResult(currentPreset.precomputedResult);
        setIsProcessing(false);
      }, 350);
      return;
    }

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (byokSettings.apiKey) {
        headers['x-gemini-api-key'] = byokSettings.apiKey;
      }

      const response = await fetch('/api/tools/smart-dainik-news', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          stateOrRegion: stateOrRegion || 'India',
          domain,
          languageMode,
          gazetteText,
          preferredModel: byokSettings.preferredModel,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          setErrorMessage(
            'Live gazette analysis requires a Gemini API Key. Click "API Key" in the header to enter your key, or test with our precomputed presets instantly.',
          );
          setIsByokModalOpen(true);
        } else {
          setErrorMessage(data?.message || 'Error processing gazette notification.');
        }
        setIsProcessing(false);
        return;
      }

      if (data?.data) {
        setResult(data.data);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Network error communicating with API.';
      setErrorMessage(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    handleSelectPreset('preset-uppsc-gazette');
  };

  // Filtered Alert Cards
  const filteredAlertCards = useMemo(() => {
    if (!result?.alertCards) return [];
    if (selectedCategoryFilter === 'ALL') return result.alertCards;
    return result.alertCards.filter(
      (c) =>
        c.category === selectedCategoryFilter ||
        (selectedCategoryFilter === 'Govt Recruitment & Jobs' && c.category === 'Govt Employment'),
    );
  }, [result, selectedCategoryFilter]);

  // Primary Active Alert Card for Deep Scorecard / Matcher
  const primaryAlertCard: GazetteAlertCard | undefined = useMemo(() => {
    return filteredAlertCards[0] || result?.alertCards[0];
  }, [filteredAlertCards, result]);

  // Dynamic Eligibility Match Evaluation Engine
  const eligibilityVerdict = useMemo(() => {
    if (!primaryAlertCard) {
      return {
        isEligible: true,
        status: 'ELIGIBLE' as const,
        ageMessage: 'Age criteria met.',
        hindiAgeMessage: 'आयु सीमा के अंतर्गत।',
        degreeMessage: 'Degree matches notification requirements.',
        hindiDegreeMessage: 'शैक्षणिक योग्यता अधिसूचना के अनुसार मान्य है।',
        feeMessage: 'Standard application fee applies.',
        hindiFeeMessage: 'मानक आवेदन शुल्क लागू।',
        applicableFee: '₹225',
        relaxationAppliedYears: 0,
      };
    }

    const minAge = primaryAlertCard.minAge ?? 21;
    const baseMaxAge = primaryAlertCard.maxAge ?? 40;
    const relaxation =
      userDomicile === 'UP Resident'
        ? (primaryAlertCard.categoryRelaxations?.[userCategory] ?? 0)
        : 0;
    const maxPermissibleAge = baseMaxAge + relaxation;

    // Degree matching
    const requiredDegs = primaryAlertCard.requiredDegrees || [];
    const isDegreeMatched =
      requiredDegs.length === 0 ||
      requiredDegs.some(
        (deg) =>
          deg.toLowerCase().includes(userDegree.toLowerCase().slice(0, 7)) ||
          userDegree.toLowerCase().includes(deg.toLowerCase().slice(0, 7)),
      );

    const isAgeValid = userAge >= minAge && userAge <= maxPermissibleAge;
    const isRelaxationActive = relaxation > 0 && userAge > baseMaxAge && isAgeValid;

    // Fee calculation
    let fee = '₹225';
    let hindiFee = '₹225';
    if (primaryAlertCard.feeStructure) {
      if (userCategory === 'SC/ST') {
        fee = primaryAlertCard.feeStructure['SC / ST'] || '₹105';
        hindiFee =
          primaryAlertCard.hindiFeeStructure?.['अनुसूचित जाति / अनुसूचित जनजाति'] || '₹105';
      } else if (userCategory === 'PwD') {
        fee = primaryAlertCard.feeStructure['PwD (Specially Abled)'] || '₹25';
        hindiFee = primaryAlertCard.hindiFeeStructure?.['दिव्यांग अभ्यर्थी'] || '₹25';
      } else {
        fee = primaryAlertCard.feeStructure['General / EWS / OBC'] || '₹225';
        hindiFee =
          primaryAlertCard.hindiFeeStructure?.['सामान्य / ई.डब्ल्यू.एस. / ओ.बी.सी.'] || '₹225';
      }
    }

    if (!isAgeValid) {
      return {
        isEligible: false,
        status: 'AGE_INELIGIBLE' as const,
        ageMessage:
          userAge < minAge
            ? `Under minimum age threshold (${userAge} yrs vs required min ${minAge} yrs).`
            : `Exceeds maximum age limit of ${maxPermissibleAge} yrs (Base: ${baseMaxAge} + ${relaxation} yrs relaxation for ${userCategory}).`,
        hindiAgeMessage:
          userAge < minAge
            ? `न्यूनतम आयु सीमा से कम (${userAge} वर्ष बनाम आवश्यक ${minAge} वर्ष)।`
            : `अधिकतम आयु सीमा (${maxPermissibleAge} वर्ष) से अधिक। (मूल सीमा: ${baseMaxAge} + ${relaxation} वर्ष छूट ${userCategory} वर्ग हेतु)।`,
        degreeMessage: isDegreeMatched
          ? `Educational qualifications (${userDegree}) are verified and valid.`
          : `Degree (${userDegree}) does not directly fulfill primary engineering/scheme prerequisite.`,
        hindiDegreeMessage: isDegreeMatched
          ? `शैक्षणिक योग्यता (${userDegree}) मान्य है।`
          : `शैक्षणिक योग्यता (${userDegree}) इस पद हेतु सीधे तौर पर मेल नहीं खाती।`,
        feeMessage: `Estimated fee: ${fee}`,
        hindiFeeMessage: `अनुमानित शुल्क: ${hindiFee}`,
        applicableFee: fee,
        relaxationAppliedYears: relaxation,
      };
    }

    if (!isDegreeMatched) {
      return {
        isEligible: false,
        status: 'DEGREE_INELIGIBLE' as const,
        ageMessage: `Age (${userAge} yrs) is within permissible limits (${minAge}–${maxPermissibleAge} yrs).`,
        hindiAgeMessage: `आयु (${userAge} वर्ष) निर्धारित सीमा (${minAge}–${maxPermissibleAge} वर्ष) के अंतर्गत है।`,
        degreeMessage: `Selected qualification (${userDegree}) does not meet the mandatory criteria (${requiredDegs.join(', ')}).`,
        hindiDegreeMessage: `चयनित शैक्षणिक योग्यता (${userDegree}) अनिवार्य मापदंड (${requiredDegs.join(', ')}) से मेल नहीं खाती।`,
        feeMessage: `Estimated fee: ${fee}`,
        hindiFeeMessage: `अनुमानित शुल्क: ${hindiFee}`,
        applicableFee: fee,
        relaxationAppliedYears: relaxation,
      };
    }

    if (isRelaxationActive) {
      return {
        isEligible: true,
        status: 'RELAXATION_APPLIED' as const,
        ageMessage: `Eligible via ${relaxation}-Year ${userCategory} Category Age Relaxation (Max limit extended from ${baseMaxAge} to ${maxPermissibleAge} yrs).`,
        hindiAgeMessage: `${userCategory} वर्ग की ${relaxation} वर्ष आयु छूट के तहत पात्र (अधिकतम सीमा ${baseMaxAge} से बढ़कर ${maxPermissibleAge} वर्ष)।`,
        degreeMessage: `Qualification (${userDegree}) verified against official gazette branch requirements.`,
        hindiDegreeMessage: `शैक्षणिक योग्यता (${userDegree}) आधिकारिक राजपत्र के अनुसार सत्यापित।`,
        feeMessage: `Category Concession Applied: ${fee} payable.`,
        hindiFeeMessage: `वर्ग छूट लागू: ${hindiFee} देय।`,
        applicableFee: fee,
        relaxationAppliedYears: relaxation,
      };
    }

    return {
      isEligible: true,
      status: 'ELIGIBLE' as const,
      ageMessage: `Age (${userAge} yrs) is within direct general bracket (${minAge}–${baseMaxAge} yrs).`,
      hindiAgeMessage: `आयु (${userAge} वर्ष) सीधी सामान्य सीमा (${minAge}–${baseMaxAge} वर्ष) के अंतर्गत है।`,
      degreeMessage: `Qualification (${userDegree}) fully matches gazette prerequisites.`,
      hindiDegreeMessage: `शैक्षणिक योग्यता (${userDegree}) राजपत्र के आवश्यक मापदंडों से पूर्णतः मेल खाती है।`,
      feeMessage: `Applicable application fee: ${fee}`,
      hindiFeeMessage: `लागू आवेदन शुल्क: ${hindiFee}`,
      applicableFee: fee,
      relaxationAppliedYears: relaxation,
    };
  }, [primaryAlertCard, userAge, userDegree, userCategory, userDomicile]);

  // Exports
  const handleCopyJson = () => {
    if (!result) return;
    navigator.clipboard?.writeText(JSON.stringify(result, null, 2));
    setCopiedFormat('json');
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const handleDownloadMarkdown = () => {
    if (!result) return;
    let md = `---\ntitle: "${result.englishSummaryHeadline}"\nregion: "${result.stateOrRegion}"\nedition_date: "${result.editionDate}"\ngenerated_by: "NorAI Smart Dainik Gazette Engine"\n---\n\n`;
    md += `# ${result.englishSummaryHeadline}\n\n`;
    md += `## ${result.hindiSummaryHeadline}\n\n`;
    md += `**Jurisdiction:** ${result.stateOrRegion} | **Date:** ${result.editionDate} | **Verified Gazettes:** ${result.verifiedGazetteCount}\n\n`;
    md += `### English Executive Brief\n${result.executiveBriefEnglish}\n\n`;
    md += `### हिन्दी कार्यकारी सारांश\n${result.executiveBriefHindi}\n\n`;

    md += `## Actionable Gazette Alerts\n\n`;
    result.alertCards.forEach((c) => {
      md += `### ${c.title} (${c.hindiTitle})\n`;
      md += `- **Department:** ${c.departmentOrMinistry} | ${c.hindiDepartmentOrMinistry || ''}\n`;
      md += `- **Status:** ${c.urgencyLevel} (${c.daysRemaining} days remaining till ${c.deadlineDate})\n`;
      md += `- **Vacancies / Scope:** ${c.vacanciesOrScope}\n`;
      md += `- **Pay Scale / Budget:** ${c.salaryBandOrBudget}\n`;
      md += `- **Eligibility:** ${c.eligibilitySnippet}\n`;
      md += `- **Official Dispatch Ref:** ${c.officialSealReference || c.verifiedSourceRef}\n`;
      md += `- **Portal URL:** ${c.officialPortalUrl}\n`;
      if (c.antiRumorNote) md += `- **Anti-Rumor Clause:** ${c.antiRumorNote}\n`;
      md += `\n`;
    });

    md += `## Eligibility & Criteria Matrix\n\n`;
    result.eligibilityMatrix.forEach((m) => {
      md += `### ${m.postOrNotification}\n`;
      md += `- **Age Limit:** ${m.ageCriteria}\n`;
      md += `- **Qualifications:** ${m.qualification}\n`;
      md += `- **Reservation Quotas:** ${m.reservationQuotas}\n`;
      md += `- **Fee:** ${m.applicationFee}\n`;
      md += `- **Selection Process:** ${m.selectionProcess}\n\n`;
    });

    md += `## Official Verification & Anti-Rumor Notes\n`;
    result.factValidationNotes.forEach((n) => (md += `- ${n}\n`));

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `gazette_digest_${result.stateOrRegion.toLowerCase().replace(/[^a-z0-9]/g, '_')}.md`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setCopiedFormat('md');
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const handleDownloadCsv = () => {
    if (!result) return;
    const rows = result.eligibilityMatrix.map((m) => [
      `"${m.postOrNotification.replace(/"/g, '""')}"`,
      `"${m.ageCriteria.replace(/"/g, '""')}"`,
      `"${m.qualification.replace(/"/g, '""')}"`,
      `"${m.reservationQuotas.replace(/"/g, '""')}"`,
      `"${m.applicationFee.replace(/"/g, '""')}"`,
      `"${m.selectionProcess.replace(/"/g, '""')}"`,
    ]);
    const csvContent = [
      '"Post / Scheme","Age Criteria","Qualification","Reservation Quotas","Fee","Selection Process"',
      ...rows.map((r) => r.join(',')),
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `eligibility_matrix_${result.stateOrRegion.toLowerCase().replace(/[^a-z0-9]/g, '_')}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setCopiedFormat('csv');
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  return (
    <>
      <ToolShell
        toolId="smart-dainik-news"
        toolName="Smart Dainik News & Gazette Engine"
        category="Regional Intelligence & GovTech"
        isProcessing={isProcessing}
        telemetry={result?.telemetry}
        byokSettings={byokSettings}
        onOpenByokModal={() => setIsByokModalOpen(true)}
        onReset={handleReset}
        onRun={handleRunAnalysis}
        activePresetTitle={currentPreset?.title}
        isPresetMode={activePresetId !== 'custom' && !byokSettings.apiKey}
      >
        {/* Preset Command Strip */}
        <div className="px-5 py-3 bg-canvas-base border-b border-[rgba(13,37,61,0.08)] flex items-center justify-between gap-3 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-ink-secondary uppercase tracking-wider font-semibold whitespace-nowrap">
              Regional Gazettes:
            </span>
            <div className="flex items-center gap-1.5">
              {DAINIK_NEWS_PRESETS.map((preset) => {
                const isSelected = activePresetId === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSelectPreset(preset.id)}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-xs font-medium transition-all active:scale-[0.97] whitespace-nowrap',
                      isSelected
                        ? 'bg-[#0D253D] text-white shadow-sm font-semibold'
                        : 'bg-canvas-paper text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed border border-[rgba(13,37,61,0.08)]',
                    )}
                  >
                    {preset.id === 'preset-uppsc-gazette' && '💼 UPPSC Engineers (1,450 Posts)'}
                    {preset.id === 'preset-up-smartcity-gazette' && '🏗️ Smart City IT Corridor'}
                    {preset.id === 'preset-up-scholarship-gazette' && '🎓 STEM Merit Scholarship'}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => setActivePresetId('custom')}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-all active:scale-[0.97] whitespace-nowrap',
                  activePresetId === 'custom'
                    ? 'bg-[#0D253D] text-white shadow-sm'
                    : 'bg-canvas-paper text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed border border-[rgba(13,37,61,0.08)]',
                )}
              >
                Custom Gazette / PDF
              </button>
            </div>
          </div>

          <div className="text-[11px] font-mono text-ink-secondary hidden md:block">
            Estimated Ingestion: ~
            <span className="tabular-nums font-semibold">
              {estimateTokenCount(gazetteText).toLocaleString()}
            </span>{' '}
            tokens
          </div>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="px-5 py-3 bg-accent-50/90 border-b border-accent-500/20 text-xs text-accent-600 flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-accent-500 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setErrorMessage(null)}
              className="text-xs font-semibold hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Dual-Pane Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[680px] items-stretch">
          {/* Left Column: Segmented Intake Dock (5 cols) */}
          <div className="lg:col-span-5 p-5 md:p-6 border-b lg:border-b-0 lg:border-r border-[rgba(13,37,61,0.08)] bg-canvas-paper flex flex-col justify-between gap-5 h-full">
            <div className="space-y-4">
              {/* Intake Step Tabs */}
              <div className="flex items-center p-1 bg-canvas-recessed rounded-xl border border-[rgba(13,37,61,0.08)]">
                <button
                  type="button"
                  onClick={() => setIntakeTab('region')}
                  className={cn(
                    'flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all active:scale-[0.98]',
                    intakeTab === 'region'
                      ? 'bg-canvas-paper text-ink-primary shadow-xs'
                      : 'text-ink-secondary hover:text-ink-primary',
                  )}
                >
                  1. Region & Stream
                </button>
                <button
                  type="button"
                  onClick={() => setIntakeTab('ingestion')}
                  className={cn(
                    'flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all active:scale-[0.98]',
                    intakeTab === 'ingestion'
                      ? 'bg-canvas-paper text-ink-primary shadow-xs'
                      : 'text-ink-secondary hover:text-ink-primary',
                  )}
                >
                  2. Gazette Ingestion
                </button>
                <button
                  type="button"
                  onClick={() => setIntakeTab('matcher')}
                  className={cn(
                    'flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all active:scale-[0.98]',
                    intakeTab === 'matcher'
                      ? 'bg-canvas-paper text-ink-primary shadow-xs'
                      : 'text-ink-secondary hover:text-ink-primary',
                  )}
                >
                  3. Eligibility Checker
                </button>
              </div>

              {/* STEP 1: REGION & STREAM */}
              {intakeTab === 'region' && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <label
                      htmlFor="state-region-input"
                      className="text-xs font-semibold text-ink-primary block mb-1"
                    >
                      State / Jurisdiction
                    </label>
                    <input
                      id="state-region-input"
                      type="text"
                      value={stateOrRegion}
                      onChange={(e) => {
                        setStateOrRegion(e.target.value);
                        setActivePresetId('custom');
                      }}
                      placeholder="e.g. Uttar Pradesh, Bihar, Central Govt"
                      className="w-full px-3 py-2 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.15)] text-ink-primary text-xs focus:outline-none focus:ring-2 focus:ring-accent-500 font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="domain-select"
                        className="text-xs font-semibold text-ink-primary block mb-1"
                      >
                        Domain Stream
                      </label>
                      <select
                        id="domain-select"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.15)] text-ink-primary text-xs font-mono focus:outline-none focus:ring-2 focus:ring-accent-500"
                      >
                        <option value="Public Engineering & Technical Services">
                          Govt Recruitment & Jobs
                        </option>
                        <option value="Infrastructure & Smart City">
                          Infrastructure & Smart City
                        </option>
                        <option value="Education & Scholarships">Education & Scholarships</option>
                        <option value="Civic Policy & Schemes">Civic Welfare & Schemes</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="lang-mode-select"
                        className="text-xs font-semibold text-ink-primary block mb-1"
                      >
                        Primary Gazette NLP
                      </label>
                      <select
                        id="lang-mode-select"
                        value={languageMode}
                        onChange={(e) =>
                          setLanguageMode(
                            e.target.value as 'Bilingual (Hindi + English)' | 'English' | 'Hindi',
                          )
                        }
                        className="w-full px-3 py-2 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.15)] text-ink-primary text-xs font-mono focus:outline-none focus:ring-2 focus:ring-accent-500"
                      >
                        <option value="Bilingual (Hindi + English)">Bilingual (Hindi + Eng)</option>
                        <option value="English">English Authority</option>
                        <option value="Hindi">हिन्दी (Devanagari Only)</option>
                      </select>
                    </div>
                  </div>

                  {/* Official State Gazette Radar / Quick Jurisdictions */}
                  <div className="p-3.5 rounded-xl bg-canvas-base border border-[rgba(13,37,61,0.1)] space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-ink-secondary uppercase tracking-wider font-semibold flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-accent-500" />
                        <span>Official Gazette Portals:</span>
                      </span>
                      <span className="text-[10px] font-mono text-accent-500 font-medium">
                        1-Click Load
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        {
                          name: 'UPPSC Allahabad',
                          sub: 'Engineering & Admin',
                          state: 'Uttar Pradesh, India',
                          domain: 'Public Engineering & Technical Services',
                        },
                        {
                          name: 'UPSIDA Industrial',
                          sub: 'Tech Corridors & Land',
                          state: 'Uttar Pradesh (UPSIDA)',
                          domain: 'Infrastructure & Smart City',
                        },
                        {
                          name: 'UP Social Welfare',
                          sub: 'Scholarships & Grants',
                          state: 'Uttar Pradesh (SWD)',
                          domain: 'Education & Scholarships',
                        },
                        {
                          name: 'SSC North Central',
                          sub: 'Combined Grad Level',
                          state: 'Central Govt (Northern Region)',
                          domain: 'Public Engineering & Technical Services',
                        },
                      ].map((item) => (
                        <button
                          key={item.name}
                          type="button"
                          onClick={() => {
                            setStateOrRegion(item.state);
                            setDomain(item.domain);
                            setActivePresetId('custom');
                          }}
                          className="p-2 rounded-lg bg-canvas-paper border border-[rgba(13,37,61,0.08)] hover:border-accent-500/50 hover:bg-accent-50/30 text-left transition-all group"
                        >
                          <span className="text-[11px] font-semibold text-ink-primary group-hover:text-accent-600 block truncate">
                            {item.name}
                          </span>
                          <span className="text-[9px] font-mono text-ink-secondary block truncate">
                            {item.sub}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Anti-Rumor & Verification Protocol Callout */}
                  <div className="p-3.5 rounded-xl bg-[#FFFBEB] dark:bg-[#2A2410] border border-amber-500/20 space-y-1.5 text-xs text-amber-900 dark:text-amber-200">
                    <div className="flex items-center gap-1.5 font-semibold text-[11px] text-amber-800 dark:text-amber-300">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      <span>Anti-Rumor & Gazette Verification Engine</span>
                    </div>
                    <p className="text-[11px] text-amber-800 dark:text-amber-300/90 leading-relaxed font-sans">
                      All circulars are cross-referenced against whitelisted government subdomains (
                      <code className="font-mono text-[10px] bg-amber-100/80 dark:bg-white/10 px-1 py-0.5 rounded">
                        .gov.in
                      </code>
                      ,{' '}
                      <code className="font-mono text-[10px] bg-amber-100/80 dark:bg-white/10 px-1 py-0.5 rounded">
                        .nic.in
                      </code>
                      ) with cryptographic dispatch ID matching.
                    </p>
                  </div>
                </div>
              )}

              {/* STEP 2: GAZETTE INGESTION & OCR */}
              {intakeTab === 'ingestion' && (
                <div className="space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="gazette-textarea"
                      className="text-xs font-semibold text-ink-primary flex items-center gap-1.5"
                    >
                      <Newspaper className="w-3.5 h-3.5 text-accent-500" />
                      <span>Gazette Notification / Circular</span>
                    </label>
                    <span className="text-[10px] font-mono text-ink-secondary tabular-nums">
                      {gazetteText.length} chars · ~{estimateTokenCount(gazetteText)} tokens
                    </span>
                  </div>

                  {/* Quick Sample Presets Toolbar */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-mono text-ink-secondary uppercase font-semibold">
                      Load Sample:
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const p = DAINIK_NEWS_PRESETS[0];
                        if (p) {
                          setActivePresetId(p.id);
                          setGazetteText(p.sampleGazetteText);
                          setStateOrRegion(p.stateOrRegion);
                          setDomain(p.domain);
                          setResult(p.precomputedResult);
                        }
                      }}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-canvas-base border border-[rgba(13,37,61,0.12)] hover:border-accent-500 text-ink-primary hover:text-accent-600 transition-all"
                    >
                      UPPSC 1,450 AEs
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const p = DAINIK_NEWS_PRESETS[1];
                        if (p) {
                          setActivePresetId(p.id);
                          setGazetteText(p.sampleGazetteText);
                          setStateOrRegion(p.stateOrRegion);
                          setDomain(p.domain);
                          setResult(p.precomputedResult);
                        }
                      }}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-canvas-base border border-[rgba(13,37,61,0.12)] hover:border-accent-500 text-ink-primary hover:text-accent-600 transition-all"
                    >
                      Smart City Corridor
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const p = DAINIK_NEWS_PRESETS[2];
                        if (p) {
                          setActivePresetId(p.id);
                          setGazetteText(p.sampleGazetteText);
                          setStateOrRegion(p.stateOrRegion);
                          setDomain(p.domain);
                          setResult(p.precomputedResult);
                        }
                      }}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-canvas-base border border-[rgba(13,37,61,0.12)] hover:border-accent-500 text-ink-primary hover:text-accent-600 transition-all"
                    >
                      STEM Scholarship
                    </button>
                  </div>

                  {/* Dropzone (Compact) */}
                  <div className="relative border border-dashed border-[rgba(13,37,61,0.15)] hover:border-accent-500 rounded-xl p-3 text-center bg-canvas-base/60 transition-colors">
                    <input
                      type="file"
                      id="gazette-file-upload"
                      multiple
                      accept=".pdf,.txt,.docx,.md"
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex items-center justify-center gap-2 pointer-events-none text-xs text-ink-secondary">
                      <Upload className="w-4 h-4 text-accent-500 shrink-0" />
                      <span>
                        {isParsingFiles
                          ? 'Parsing Gazette PDF in-browser...'
                          : 'Drop PDF / Notification scan, or paste text below'}
                      </span>
                    </div>
                  </div>

                  {/* Uploaded File Chips */}
                  {uploadedFiles.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {uploadedFiles.map((f, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-canvas-recessed text-ink-primary border border-[rgba(13,37,61,0.1)]"
                        >
                          <FileText className="w-3 h-3 text-accent-500" />
                          <span>{f.name}</span>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Expansive Gazette Text Area */}
                  <textarea
                    id="gazette-textarea"
                    rows={12}
                    value={gazetteText}
                    onChange={(e) => {
                      setGazetteText(e.target.value);
                      setActivePresetId('custom');
                    }}
                    placeholder="Paste Hindi or English official gazette notification, job advertisement, or circular..."
                    className="w-full p-3.5 rounded-xl bg-canvas-base border border-[rgba(13,37,61,0.15)] text-ink-primary text-xs font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-accent-500 min-h-[340px] resize-y"
                  />

                  {/* Ingestion Status Bar */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-ink-secondary pt-1">
                    <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-300">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-300" />
                      <span>Bilingual Devanagari + English OCR active</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setGazetteText('')}
                      className="hover:text-accent-500 transition-colors"
                    >
                      Clear editor
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: ELIGIBILITY CHECKER KNOBS */}
              {intakeTab === 'matcher' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-ink-primary flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-accent-500" />
                      <span>Applicant Profile Matcher</span>
                    </span>
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                      1-Click Dynamic Check
                    </span>
                  </div>

                  {/* Age Range Slider */}
                  <div className="p-3.5 rounded-xl bg-canvas-base border border-[rgba(13,37,61,0.1)] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-ink-primary">Applicant Age:</span>
                      <span className="font-mono font-bold text-accent-500 text-sm tabular-nums">
                        {userAge} Years
                      </span>
                    </div>
                    <input
                      type="range"
                      min={18}
                      max={55}
                      value={userAge}
                      onChange={(e) => setUserAge(Number(e.target.value))}
                      className="w-full accent-accent-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-ink-secondary">
                      <span>18 yrs</span>
                      <span>28 yrs</span>
                      <span>40 yrs (General Max)</span>
                      <span>55 yrs</span>
                    </div>
                  </div>

                  {/* Degree Selector */}
                  <div>
                    <label
                      htmlFor="degree-select"
                      className="text-xs font-semibold text-ink-primary block mb-1"
                    >
                      Highest Qualification / Degree
                    </label>
                    <select
                      id="degree-select"
                      value={userDegree}
                      onChange={(e) => setUserDegree(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.15)] text-ink-primary text-xs font-mono focus:outline-none focus:ring-2 focus:ring-accent-500"
                    >
                      <option value="B.Tech / B.E. (Civil Engineering)">
                        B.Tech / B.E. (Civil Engineering)
                      </option>
                      <option value="B.Tech / B.E. (Electrical Engineering)">
                        B.Tech / B.E. (Electrical Engineering)
                      </option>
                      <option value="B.Tech / B.E. (Mechanical Engineering)">
                        B.Tech / B.E. (Mechanical Engineering)
                      </option>
                      <option value="Undergraduate (B.Tech / B.Sc / B.Com / B.A.)">
                        Graduation in Any Discipline (B.Sc / B.Com / B.A.)
                      </option>
                      <option value="Polytechnic Diploma Student">Diploma / Polytechnic</option>
                      <option value="Registered MSME / Private Limited Company">
                        Registered Entity / MSME Corporate Unit
                      </option>
                      <option value="Class 12th / Intermediate Passed">
                        Class 12th / Intermediate
                      </option>
                    </select>
                  </div>

                  {/* Category & Domicile Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="category-select"
                        className="text-xs font-semibold text-ink-primary block mb-1"
                      >
                        Reservation Category
                      </label>
                      <select
                        id="category-select"
                        value={userCategory}
                        onChange={(e) => setUserCategory(e.target.value as typeof userCategory)}
                        className="w-full px-3 py-2 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.15)] text-ink-primary text-xs font-mono focus:outline-none focus:ring-2 focus:ring-accent-500"
                      >
                        <option value="General">General (Unreserved)</option>
                        <option value="OBC">OBC (Non-Creamy)</option>
                        <option value="SC/ST">SC / ST (+5 Yrs)</option>
                        <option value="EWS">EWS</option>
                        <option value="PwD">PwD (+10 Yrs)</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="domicile-select"
                        className="text-xs font-semibold text-ink-primary block mb-1"
                      >
                        Domicile Status
                      </label>
                      <select
                        id="domicile-select"
                        value={userDomicile}
                        onChange={(e) => setUserDomicile(e.target.value as typeof userDomicile)}
                        className="w-full px-3 py-2 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.15)] text-ink-primary text-xs font-mono focus:outline-none focus:ring-2 focus:ring-accent-500"
                      >
                        <option value="UP Resident">UP Resident (State Quota)</option>
                        <option value="Other State">Other State (All India UR)</option>
                      </select>
                    </div>
                  </div>

                  {/* Live Quick Verdict Chip */}
                  <div
                    className={cn(
                      'p-3 rounded-xl border text-xs flex items-center justify-between',
                      eligibilityVerdict.isEligible
                        ? 'bg-emerald-50/80 border-emerald-500/20 text-emerald-800'
                        : 'bg-rose-50/80 border-rose-500/20 text-rose-800',
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {eligibilityVerdict.isEligible ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-300 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-300 shrink-0" />
                      )}
                      <span className="font-semibold">
                        {eligibilityVerdict.status === 'ELIGIBLE' && 'Fully Eligible'}
                        {eligibilityVerdict.status === 'RELAXATION_APPLIED' &&
                          'Eligible (Relaxation Active)'}
                        {eligibilityVerdict.status === 'AGE_INELIGIBLE' && 'Age Bar Exceeded'}
                        {eligibilityVerdict.status === 'DEGREE_INELIGIBLE' && 'Degree Ineligible'}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] font-bold">
                      Fee: {eligibilityVerdict.applicableFee}
                    </span>
                  </div>

                  {/* Category-Wise Relaxation & Document Matrix */}
                  <div className="p-3 rounded-xl bg-canvas-base border border-[rgba(13,37,61,0.08)] space-y-2 text-xs">
                    <span className="text-[11px] font-mono text-ink-secondary uppercase font-semibold block">
                      Relaxation & Fee Schedule (UP Govt):
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                      <div className="p-2 rounded bg-canvas-paper border border-[rgba(13,37,61,0.06)]">
                        <span className="text-ink-secondary block text-[10px]">Age Ceiling:</span>
                        <strong className="text-ink-primary">
                          {userCategory === 'SC/ST'
                            ? '45 Yrs (+5)'
                            : userCategory === 'PwD'
                              ? '50 Yrs (+10)'
                              : userCategory === 'OBC'
                                ? '43 Yrs (+3)'
                                : '40 Yrs (Max)'}
                        </strong>
                      </div>
                      <div className="p-2 rounded bg-canvas-paper border border-[rgba(13,37,61,0.06)]">
                        <span className="text-ink-secondary block text-[10px]">Govt Exam Fee:</span>
                        <strong className="text-emerald-700 dark:text-emerald-300">
                          {userCategory === 'SC/ST'
                            ? '₹65 (Relaxed)'
                            : userCategory === 'PwD'
                              ? '₹25 (Online Only)'
                              : '₹125–₹225'}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Ingestion Specs Footer */}
            <div className="p-3.5 rounded-xl bg-canvas-recessed/60 border border-[rgba(13,37,61,0.08)] text-xs text-ink-secondary space-y-2">
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Gazette Engine:</span>
                </span>
                <strong className="text-ink-primary font-semibold">
                  Gemini 3.5 Lite (Bilingual)
                </strong>
              </div>
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span>Verified Alerts:</span>
                <strong className="text-emerald-700 dark:text-emerald-300 font-semibold tabular-nums">
                  {result?.alertCards.length || 0} Opportunities Verified
                </strong>
              </div>
              <div className="flex items-center justify-between font-mono text-[10px] text-ink-secondary pt-1 border-t border-[rgba(13,37,61,0.06)]">
                <span>Domain Match:</span>
                <span className="text-emerald-800 dark:text-emerald-300 font-medium">uppsc.up.nic.in Whitelisted</span>
              </div>
            </div>
          </div>

          {/* Right Column: Multi-Tab Gazette Canvas (7 cols) */}
          <div className="lg:col-span-7 bg-canvas-base flex flex-col justify-between">
            {/* Top Command Bar: Tabs, Bilingual Switcher & Exports */}
            <div className="p-4 bg-canvas-paper border-b border-[rgba(13,37,61,0.08)] space-y-3">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                {/* Stage Tabs */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setActiveTab('alerts')}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-[0.97] flex items-center gap-1.5',
                      activeTab === 'alerts'
                        ? 'bg-[#0D253D] text-white shadow-sm'
                        : 'text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed',
                    )}
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Verified Alerts ({result?.alertCards.length || 0})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('matcher')}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-[0.97] flex items-center gap-1.5',
                      activeTab === 'matcher'
                        ? 'bg-[#0D253D] text-white shadow-sm'
                        : 'text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed',
                    )}
                  >
                    <Cpu className="w-3.5 h-3.5 text-accent-500" />
                    <span>1-Click Eligibility Check</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('matrix')}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-[0.97] flex items-center gap-1.5',
                      activeTab === 'matrix'
                        ? 'bg-[#0D253D] text-white shadow-sm'
                        : 'text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed',
                    )}
                  >
                    <Scale className="w-3.5 h-3.5 text-accent-500" />
                    <span>Criteria Matrix</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('bilingual')}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-[0.97] flex items-center gap-1.5',
                      activeTab === 'bilingual'
                        ? 'bg-[#0D253D] text-white shadow-sm'
                        : 'text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed',
                    )}
                  >
                    <Languages className="w-3.5 h-3.5 text-accent-secondary" />
                    <span>हिन्दी / Eng Brief</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('json')}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-[0.97] flex items-center gap-1.5',
                      activeTab === 'json'
                        ? 'bg-[#0D253D] text-white shadow-sm'
                        : 'text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed',
                    )}
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>JSON</span>
                  </button>
                </div>

                {/* Exports Suite */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleDownloadCsv}
                    className="p-1.5 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.12)] text-ink-secondary hover:text-ink-primary hover:border-accent-500 transition-colors active:scale-[0.97] text-xs flex items-center gap-1"
                    title="Export Eligibility Matrix as CSV"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-accent-secondary" />
                    <span className="hidden sm:inline text-[11px]">CSV</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadMarkdown}
                    className="p-1.5 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.12)] text-ink-secondary hover:text-ink-primary hover:border-accent-500 transition-colors active:scale-[0.97] text-xs flex items-center gap-1"
                    title="Export Markdown Gazette Report"
                  >
                    <Download className="w-3.5 h-3.5 text-accent-500" />
                    <span className="hidden sm:inline text-[11px]">Markdown</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyJson}
                    className="p-1.5 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.12)] text-ink-secondary hover:text-ink-primary hover:border-accent-500 transition-colors active:scale-[0.97] text-xs flex items-center gap-1"
                    title="Copy JSON Payload"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline text-[11px]">
                      {copiedFormat === 'json' ? 'Copied!' : 'JSON'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Sub-Header: Bilingual Switcher Pill Strip & Category Filter */}
              <div className="flex items-center justify-between gap-3 flex-wrap pt-2 border-t border-[rgba(13,37,61,0.06)]">
                {/* Instant Bilingual Switcher */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-ink-secondary uppercase tracking-wider font-semibold">
                    Language:
                  </span>
                  <div className="flex items-center p-0.5 rounded-lg bg-canvas-recessed border border-[rgba(13,37,61,0.1)]">
                    <button
                      type="button"
                      onClick={() => setDisplayLanguage('bilingual')}
                      className={cn(
                        'px-2.5 py-1 rounded text-xs font-semibold transition-all active:scale-[0.97]',
                        displayLanguage === 'bilingual'
                          ? 'bg-canvas-paper text-ink-primary shadow-xs'
                          : 'text-ink-secondary hover:text-ink-primary',
                      )}
                    >
                      Bilingual (द्विभाषी)
                    </button>
                    <button
                      type="button"
                      onClick={() => setDisplayLanguage('english')}
                      className={cn(
                        'px-2.5 py-1 rounded text-xs font-semibold transition-all active:scale-[0.97]',
                        displayLanguage === 'english'
                          ? 'bg-canvas-paper text-ink-primary shadow-xs'
                          : 'text-ink-secondary hover:text-ink-primary',
                      )}
                    >
                      English
                    </button>
                    <button
                      type="button"
                      onClick={() => setDisplayLanguage('hindi')}
                      className={cn(
                        'px-2.5 py-1 rounded text-xs font-semibold transition-all active:scale-[0.97]',
                        displayLanguage === 'hindi'
                          ? 'bg-canvas-paper text-ink-primary shadow-xs'
                          : 'text-ink-secondary hover:text-ink-primary',
                      )}
                    >
                      हिन्दी
                    </button>
                  </div>
                </div>

                {/* Stream Category Filter Chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                  <button
                    type="button"
                    onClick={() => setSelectedCategoryFilter('ALL')}
                    className={cn(
                      'px-2 py-1 rounded-md text-[11px] font-medium transition-all active:scale-[0.97]',
                      selectedCategoryFilter === 'ALL'
                        ? 'bg-[var(--bg-dark)] text-white font-semibold'
                        : 'bg-canvas-recessed text-ink-secondary hover:text-ink-primary',
                    )}
                  >
                    All Streams ({result?.alertCards.length || 0})
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCategoryFilter('Govt Recruitment & Jobs')}
                    className={cn(
                      'px-2 py-1 rounded-md text-[11px] font-medium transition-all active:scale-[0.97]',
                      selectedCategoryFilter === 'Govt Recruitment & Jobs'
                        ? 'bg-[var(--bg-dark)] text-white font-semibold'
                        : 'bg-canvas-recessed text-ink-secondary hover:text-ink-primary',
                    )}
                  >
                    💼 Recruitment
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCategoryFilter('Infrastructure & Smart City')}
                    className={cn(
                      'px-2 py-1 rounded-md text-[11px] font-medium transition-all active:scale-[0.97]',
                      selectedCategoryFilter === 'Infrastructure & Smart City'
                        ? 'bg-[var(--bg-dark)] text-white font-semibold'
                        : 'bg-canvas-recessed text-ink-secondary hover:text-ink-primary',
                    )}
                  >
                    🏗️ Smart City
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCategoryFilter('Education & Scholarships')}
                    className={cn(
                      'px-2 py-1 rounded-md text-[11px] font-medium transition-all active:scale-[0.97]',
                      selectedCategoryFilter === 'Education & Scholarships'
                        ? 'bg-[var(--bg-dark)] text-white font-semibold'
                        : 'bg-canvas-recessed text-ink-secondary hover:text-ink-primary',
                    )}
                  >
                    🎓 Scholarships
                  </button>
                </div>
              </div>
            </div>

            {/* Results Body */}
            <div className="p-5 md:p-6 flex-1 overflow-y-auto space-y-6">
              {/* Official Gazette Verification & Countdown Banner */}
              {result && (
                <div className="p-5 rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] shadow-sm space-y-4">
                  {/* Top Bar: Official Seal & Jurisdiction */}
                  <div className="flex items-start justify-between gap-4 flex-wrap border-b border-[rgba(13,37,61,0.08)] pb-4">
                    <div className="space-y-1.5 max-w-xl">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-200 border border-emerald-500/20 dark:border-emerald-400/30 uppercase tracking-wider">
                          <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-300" />
                          <span>VERIFIED OFFICIAL GAZETTE DISPATCH</span>
                        </span>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-canvas-recessed text-ink-secondary border border-[rgba(13,37,61,0.08)]">
                          {primaryAlertCard?.officialSealReference || 'UP-GAZETTE-DISPATCH-2026'}
                        </span>
                      </div>

                      <AnimatePresence mode="wait">
                        <motion.div
                          key={displayLanguage}
                          initial={{ opacity: 0, filter: 'blur(2px)' }}
                          animate={{ opacity: 1, filter: 'blur(0px)' }}
                          exit={{ opacity: 0, filter: 'blur(2px)' }}
                          transition={{ duration: 0.18 }}
                        >
                          {displayLanguage !== 'hindi' && (
                            <h3 className="font-display text-xl md:text-2xl text-ink-primary font-normal leading-snug">
                              {result.englishSummaryHeadline}
                            </h3>
                          )}
                          {displayLanguage !== 'english' && (
                            <h4
                              className={cn(
                                'text-ink-secondary font-medium leading-relaxed',
                                displayLanguage === 'hindi'
                                  ? 'font-display text-xl text-ink-primary font-normal'
                                  : 'text-xs mt-1',
                              )}
                            >
                              {result.hindiSummaryHeadline}
                            </h4>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Live Deadline Countdown Clock */}
                    {primaryAlertCard && (
                      <div className="p-3.5 rounded-xl bg-canvas-recessed/90 border border-[rgba(13,37,61,0.1)] text-right font-mono min-w-[170px] shadow-xs">
                        <div className="flex items-center justify-end gap-1.5 text-[10px] text-emerald-800 dark:text-emerald-300 font-bold uppercase tracking-wider pb-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span>ACTIVE WINDOW</span>
                        </div>
                        <div className="text-xl font-extrabold text-accent-500 tabular-nums">
                          {primaryAlertCard.daysRemaining} Days
                        </div>
                        <span className="text-[10px] text-ink-secondary block pt-0.5">
                          till {primaryAlertCard.deadlineDate}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Fact-Checking & Anti-Rumor Callout */}
                  <div className="p-3 rounded-xl bg-[#FFF8F0] dark:bg-[#241A12] border border-amber-400/30 text-xs text-amber-900 dark:text-amber-200 space-y-1.5">
                    <div className="flex items-center gap-1.5 font-semibold text-[11px] text-amber-950 dark:text-amber-200 uppercase tracking-wider">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                      <span>ANTI-RUMOR & OFFICIAL VERIFICATION PROTOCOL</span>
                    </div>
                    {result.factValidationNotes.map((note, nIdx) => (
                      <div
                        key={nIdx}
                        className="flex items-start gap-2 text-[11px] text-[#4A5468] dark:text-[#E8DCC8] font-mono leading-relaxed"
                      >
                        <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-300 mt-0.5 shrink-0" />
                        <span>{note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 1: VERIFIED ALERTS FEED */}
              {activeTab === 'alerts' && (
                <div className="space-y-4">
                  {filteredAlertCards.map((card) => {
                    const statusType =
                      card.urgencyLevel === 'Critical Deadline' || card.daysRemaining <= 2
                        ? 'deadline-urgent'
                        : 'verified';
                    return (
                      <SmartDainikAlertCard
                        key={card.id}
                        card={card}
                        statusType={statusType}
                        initialLanguage={displayLanguage}
                      />
                    );
                  })}
                </div>
              )}

              {/* TAB 2: INTERACTIVE 1-CLICK ELIGIBILITY MATCHER */}
              {activeTab === 'matcher' && (
                <div className="space-y-5">
                  {/* Verdict Hero Banner */}
                  <div
                    className={cn(
                      'p-6 rounded-2xl border shadow-sm space-y-3',
                      eligibilityVerdict.isEligible
                        ? 'bg-emerald-50/90 border-emerald-500/30 text-emerald-900'
                        : 'bg-rose-50/90 border-rose-500/30 text-rose-900',
                    )}
                  >
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-3">
                        {eligibilityVerdict.isEligible ? (
                          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                            <CheckCircle2 className="w-6 h-6" />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-sm">
                            <XCircle className="w-6 h-6" />
                          </div>
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/70">
                              ELIGIBILITY STATUS
                            </span>
                            <span className="text-xs font-mono">
                              {userDomicile} &bull; {userCategory} Category
                            </span>
                          </div>
                          <h3 className="text-xl font-bold font-display mt-0.5">
                            {eligibilityVerdict.status === 'ELIGIBLE' &&
                              'QUALIFIED & ELIGIBLE TO APPLY'}
                            {eligibilityVerdict.status === 'RELAXATION_APPLIED' &&
                              'ELIGIBLE WITH CATEGORY AGE RELAXATION'}
                            {eligibilityVerdict.status === 'AGE_INELIGIBLE' &&
                              'AGE THRESHOLD EXCEEDED'}
                            {eligibilityVerdict.status === 'DEGREE_INELIGIBLE' &&
                              'DEGREE PREREQUISITE MISMATCH'}
                          </h3>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-white/80 border border-current/10 font-mono text-right">
                        <span className="text-[10px] uppercase block text-ink-secondary">
                          Fee Payable
                        </span>
                        <span className="text-lg font-bold text-accent-500 tabular-nums">
                          {eligibilityVerdict.applicableFee}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs font-medium leading-relaxed pt-1">
                      {displayLanguage === 'hindi'
                        ? eligibilityVerdict.hindiAgeMessage
                        : eligibilityVerdict.ageMessage}{' '}
                      {displayLanguage === 'hindi'
                        ? eligibilityVerdict.hindiDegreeMessage
                        : eligibilityVerdict.degreeMessage}
                    </p>
                  </div>

                  {/* 4-Corner Verification Bento */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Age Criteria */}
                    <div className="p-4 rounded-xl bg-canvas-paper border border-[rgba(13,37,61,0.08)] space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-[10px] uppercase font-bold text-accent-500">
                          1. Age Window & Relaxation
                        </span>
                        <Clock className="w-3.5 h-3.5 text-ink-secondary" />
                      </div>
                      <p className="text-xs text-ink-body leading-relaxed">
                        {displayLanguage === 'hindi'
                          ? eligibilityVerdict.hindiAgeMessage
                          : eligibilityVerdict.ageMessage}
                      </p>
                    </div>

                    {/* Degree Verification */}
                    <div className="p-4 rounded-xl bg-canvas-paper border border-[rgba(13,37,61,0.08)] space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-[10px] uppercase font-bold text-accent-500">
                          2. Degree Qualification
                        </span>
                        <GraduationCap className="w-3.5 h-3.5 text-ink-secondary" />
                      </div>
                      <p className="text-xs text-ink-body leading-relaxed">
                        {displayLanguage === 'hindi'
                          ? eligibilityVerdict.hindiDegreeMessage
                          : eligibilityVerdict.degreeMessage}
                      </p>
                    </div>

                    {/* Reservation & Quotas */}
                    <div className="p-4 rounded-xl bg-canvas-paper border border-[rgba(13,37,61,0.08)] space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-[10px] uppercase font-bold text-accent-500">
                          3. Quota & Domicile Status
                        </span>
                        <Building2 className="w-3.5 h-3.5 text-ink-secondary" />
                      </div>
                      <p className="text-xs text-ink-body leading-relaxed">
                        {userDomicile === 'UP Resident'
                          ? 'UP State Domicile verified: full state vertical & horizontal reservation benefits apply.'
                          : 'Non-UP Domicile: applicant is treated under All-India Unreserved (General) category rules.'}
                      </p>
                    </div>

                    {/* Application Fee */}
                    <div className="p-4 rounded-xl bg-canvas-paper border border-[rgba(13,37,61,0.08)] space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-[10px] uppercase font-bold text-accent-500">
                          4. Application Fee
                        </span>
                        <Award className="w-3.5 h-3.5 text-ink-secondary" />
                      </div>
                      <p className="text-xs text-ink-body leading-relaxed">
                        {displayLanguage === 'hindi'
                          ? eligibilityVerdict.hindiFeeMessage
                          : eligibilityVerdict.feeMessage}
                      </p>
                    </div>
                  </div>

                  {/* Submission Steps Checklist */}
                  <div className="p-5 rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.1)] space-y-3">
                    <h4 className="font-semibold text-xs text-ink-primary font-mono uppercase tracking-wider">
                      Recommended Application Submission Checklist:
                    </h4>
                    <div className="space-y-2 text-xs text-ink-body">
                      <div className="flex items-center gap-2.5 p-2 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.06)]">
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-300 shrink-0" />
                        <span>
                          1. Complete One-Time Registration (OTR) on official state commission
                          portal.
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5 p-2 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.06)]">
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-300 shrink-0" />
                        <span>
                          2. Upload scanned degree marksheet and category certificate issued by UP
                          authority.
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5 p-2 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.06)]">
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-300 shrink-0" />
                        <span>
                          3. Submit fee online via net banking / SBI e-pay before the fee deadline.
                        </span>
                      </div>
                    </div>

                    {primaryAlertCard && (
                      <div className="pt-2 flex justify-end">
                        <a
                          href={primaryAlertCard.officialPortalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0D253D] text-white hover:bg-[#1B3A5C] transition-colors text-xs font-semibold active:scale-[0.97]"
                        >
                          <span>Proceed to {primaryAlertCard.portalName || 'Official Portal'}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: ELIGIBILITY & VACANCY MATRIX */}
              {activeTab === 'matrix' && (
                <div className="space-y-4">
                  {result?.eligibilityMatrix.map((row, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.1)] shadow-sm space-y-3"
                    >
                      <h4 className="font-display text-lg text-ink-primary font-normal border-b border-[rgba(13,37,61,0.08)] pb-2">
                        {displayLanguage === 'hindi'
                          ? row.hindiPostOrNotification || row.postOrNotification
                          : row.postOrNotification}
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-canvas-base border border-[rgba(13,37,61,0.08)] space-y-1">
                          <span className="font-mono text-[10px] uppercase font-bold text-accent-500 block">
                            Age Criteria & Relaxation:
                          </span>
                          <p className="text-ink-body leading-relaxed">
                            {displayLanguage === 'hindi'
                              ? row.hindiAgeCriteria || row.ageCriteria
                              : row.ageCriteria}
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-canvas-base border border-[rgba(13,37,61,0.08)] space-y-1">
                          <span className="font-mono text-[10px] uppercase font-bold text-accent-500 block">
                            Educational Qualification:
                          </span>
                          <p className="text-ink-body leading-relaxed">
                            {displayLanguage === 'hindi'
                              ? row.hindiQualification || row.qualification
                              : row.qualification}
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-canvas-base border border-[rgba(13,37,61,0.08)] space-y-1">
                          <span className="font-mono text-[10px] uppercase font-bold text-accent-500 block">
                            Reservation Quotas:
                          </span>
                          <p className="text-ink-body leading-relaxed">
                            {displayLanguage === 'hindi'
                              ? row.hindiReservationQuotas || row.reservationQuotas
                              : row.reservationQuotas}
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-canvas-base border border-[rgba(13,37,61,0.08)] space-y-1">
                          <span className="font-mono text-[10px] uppercase font-bold text-accent-500 block">
                            Application Fee & Process:
                          </span>
                          <p className="text-ink-body leading-relaxed">
                            Fee:{' '}
                            {displayLanguage === 'hindi'
                              ? row.hindiApplicationFee || row.applicationFee
                              : row.applicationFee}
                          </p>
                          <p className="text-[11px] text-ink-secondary pt-0.5">
                            Selection:{' '}
                            {displayLanguage === 'hindi'
                              ? row.hindiSelectionProcess || row.selectionProcess
                              : row.selectionProcess}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 4: BILINGUAL EXECUTIVE BRIEF */}
              {activeTab === 'bilingual' && result && (
                <div className="space-y-5">
                  {/* English Brief */}
                  <div className="p-5 rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.1)] shadow-sm space-y-2">
                    <span className="font-mono text-[10px] uppercase font-bold text-accent-500 block">
                      ENGLISH EXECUTIVE INTELLIGENCE BRIEF
                    </span>
                    <p className="text-xs text-ink-body leading-relaxed">
                      {result.executiveBriefEnglish}
                    </p>
                  </div>

                  {/* Hindi Brief */}
                  <div className="p-5 rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.1)] shadow-sm space-y-2">
                    <span className="font-mono text-[10px] uppercase font-bold text-accent-secondary block">
                      हिन्दी आधिकारिक सारांश (DEVANAGARI SCRIPT)
                    </span>
                    <p className="text-xs text-ink-body leading-relaxed">
                      {result.executiveBriefHindi}
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 5: RAW JSON SPEC */}
              {activeTab === 'json' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-ink-secondary font-mono">
                    <span>STRUCTURED GAZETTE PAYLOAD</span>
                    <button
                      type="button"
                      onClick={handleCopyJson}
                      className="text-accent-500 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedFormat === 'json' ? 'Copied!' : 'Copy JSON'}</span>
                    </button>
                  </div>
                  <pre className="p-4 rounded-xl bg-[#0D253D] text-[#F9F6F0] font-mono text-[11px] leading-relaxed overflow-x-auto max-h-[460px] border border-[rgba(255,255,255,0.1)] selection:bg-[#38BDF8] selection:text-[#040A5C]">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </ToolShell>

      <ApiKeyModal
        isOpen={isByokModalOpen}
        onClose={() => setIsByokModalOpen(false)}
        settings={byokSettings}
        onSave={handleSaveByok}
      />
    </>
  );
}
