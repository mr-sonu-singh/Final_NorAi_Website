'use client';

import React, { useState, useEffect } from 'react';
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
} from 'lucide-react';
import { ToolShell } from './ToolShell';
import { ApiKeyModal } from './ApiKeyModal';
import {
  DainikNewsResult,
  ByokSettings,
} from '@/lib/tools/types';
import { DAINIK_NEWS_PRESETS } from '@/lib/tools/presets';
import {
  extractTextFromFile,
  estimateTokenCount,
} from '@/lib/tools/client-parser';

export function SmartDainikNewsWorkbench() {
  // Preset Selection
  const [activePresetId, setActivePresetId] = useState<string>(
    DAINIK_NEWS_PRESETS[0]?.id || 'preset-uppsc-gazette'
  );
  const currentPreset =
    DAINIK_NEWS_PRESETS.find((p) => p.id === activePresetId) ||
    DAINIK_NEWS_PRESETS[0];

  // Inputs
  const [stateOrRegion, setStateOrRegion] = useState(
    currentPreset?.stateOrRegion || 'Uttar Pradesh, India'
  );
  const [domain, setDomain] = useState(
    currentPreset?.domain || 'Public Engineering & Technical Services'
  );
  const [languageMode, setLanguageMode] = useState<
    'Bilingual (Hindi + English)' | 'English' | 'Hindi'
  >(currentPreset?.languageMode || 'Bilingual (Hindi + English)');
  const [gazetteText, setGazetteText] = useState(
    currentPreset?.sampleGazetteText || ''
  );

  // File Upload State
  const [uploadedFiles, setUploadedFiles] = useState<
    Array<{ name: string; sizeBytes: number; tokens: number }>
  >([]);
  const [isParsingFiles, setIsParsingFiles] = useState(false);

  // Processing & Results
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<DainikNewsResult | null>(
    currentPreset?.precomputedResult || null
  );
  const [activeTab, setActiveTab] = useState<
    'alerts' | 'matrix' | 'bilingual' | 'json'
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
          preferredModel:
            (storedModel as ByokSettings['preferredModel']) ||
            'gemini-3.5-lite',
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
        localStorage.setItem(
          'norai_byok_gemini_model',
          newSettings.preferredModel
        );
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
            'Live gazette analysis requires a Gemini API Key. Click "API Key" in the header to enter your key, or test with our precomputed presets instantly.'
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
      const msg =
        err instanceof Error ? err.message : 'Network error communicating with API.';
      setErrorMessage(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    handleSelectPreset('preset-uppsc-gazette');
  };

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
      md += `- **Department:** ${c.departmentOrMinistry}\n`;
      md += `- **Status:** ${c.urgencyLevel} (${c.daysRemaining} days remaining till ${c.deadlineDate})\n`;
      md += `- **Vacancies:** ${c.vacanciesOrScope} | **Pay Scale:** ${c.salaryBandOrBudget}\n`;
      md += `- **Eligibility:** ${c.eligibilitySnippet}\n`;
      md += `- **Official Portal:** ${c.officialPortalUrl}\n`;
      md += `- **Source Ref:** ${c.verifiedSourceRef}\n\n`;
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
    link.setAttribute('download', `gazette_digest_${result.stateOrRegion.toLowerCase().replace(/[^a-z0-9]/g, '_')}.md`);
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
    const csvContent = ['"Post","Age Criteria","Qualification","Reservation","Fee","Selection Process"', ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `eligibility_matrix_${result.stateOrRegion.toLowerCase().replace(/[^a-z0-9]/g, '_')}.csv`);
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
        {/* Presets Header Dock */}
        <div className="px-5 py-3 bg-canvas-base border-b border-[rgba(13,37,61,0.08)] flex items-center justify-between gap-3 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-ink-secondary uppercase tracking-wider font-semibold whitespace-nowrap">
              Gazette Presets:
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
                        : 'bg-canvas-paper text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed border border-[rgba(13,37,61,0.08)]'
                    )}
                  >
                    {preset.stateOrRegion}
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
                    : 'bg-canvas-paper text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed border border-[rgba(13,37,61,0.08)]'
                )}
              >
                Custom Gazette / PDF
              </button>
            </div>
          </div>

          <div className="text-[11px] font-mono text-ink-secondary hidden md:block">
            Estimated Ingestion: ~{estimateTokenCount(gazetteText).toLocaleString()} tokens
          </div>
        </div>

        {/* Error Banner */}
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
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[640px] items-stretch">
          {/* Left Column: Intake & Parameters Dock (5 cols) */}
          <div className="lg:col-span-5 p-5 md:p-6 border-b lg:border-b-0 lg:border-r border-[rgba(13,37,61,0.08)] bg-canvas-paper flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              {/* Jurisdiction Metadata */}
              <div className="space-y-3">
                <div>
                  <label htmlFor="state-region-input" className="text-xs font-semibold text-ink-primary block mb-1">
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
                    <label htmlFor="domain-select" className="text-xs font-semibold text-ink-primary block mb-1">
                      Domain Focus
                    </label>
                    <select
                      id="domain-select"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.15)] text-ink-primary text-xs font-mono focus:outline-none focus:ring-2 focus:ring-accent-500"
                    >
                      <option value="Public Engineering & Technical Services">Govt Recruitment & Jobs</option>
                      <option value="Civic Policy & Schemes">Civic Schemes & Welfare</option>
                      <option value="Industrial Incentives">Industrial Incentives</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="lang-mode-select" className="text-xs font-semibold text-ink-primary block mb-1">
                      Language Mode
                    </label>
                    <select
                      id="lang-mode-select"
                      value={languageMode}
                      onChange={(e) =>
                        setLanguageMode(
                          e.target.value as
                            | 'Bilingual (Hindi + English)'
                            | 'English'
                            | 'Hindi'
                        )
                      }
                      className="w-full px-3 py-1.5 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.15)] text-ink-primary text-xs font-mono focus:outline-none focus:ring-2 focus:ring-accent-500"
                    >
                      <option value="Bilingual (Hindi + English)">Bilingual (Hindi + Eng)</option>
                      <option value="English">English Only</option>
                      <option value="Hindi">हिन्दी (Hindi Only)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Gazette Ingestion Area */}
              <div className="space-y-3 pt-2 border-t border-[rgba(13,37,61,0.08)]">
                <div className="flex items-center justify-between">
                  <label htmlFor="gazette-textarea" className="text-xs font-semibold text-ink-primary flex items-center gap-1.5">
                    <Newspaper className="w-3.5 h-3.5 text-accent-500" />
                    <span>Gazette PDF / Press Release Text</span>
                  </label>
                  <span className="text-[10px] font-mono text-ink-secondary">
                    Hindi & English Supported
                  </span>
                </div>

                {/* Dropzone */}
                <div className="relative border-2 border-dashed border-[rgba(13,37,61,0.15)] hover:border-accent-500 rounded-xl p-4 text-center bg-canvas-base/60 transition-colors">
                  <input
                    type="file"
                    id="gazette-file-upload"
                    multiple
                    accept=".pdf,.txt,.docx,.md"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center space-y-1.5 pointer-events-none">
                    <Upload className="w-5 h-5 text-accent-500" />
                    <span className="text-xs font-medium text-ink-primary">
                      {isParsingFiles ? 'Parsing Gazette PDF in-browser...' : 'Drop Gazette PDF, Notification scan, or text'}
                    </span>
                    <span className="text-[10px] text-ink-secondary">
                      Multi-lingual OCR & text parsing.
                    </span>
                  </div>
                </div>

                {/* Uploaded File Chips */}
                {uploadedFiles.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
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

                {/* Raw Gazette Text Area */}
                <textarea
                  id="gazette-textarea"
                  rows={7}
                  value={gazetteText}
                  onChange={(e) => {
                    setGazetteText(e.target.value);
                    setActivePresetId('custom');
                  }}
                  placeholder="Paste Hindi or English official gazette notification, job advertisement, or circular..."
                  className="w-full p-3 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.15)] text-ink-primary text-xs font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-accent-500 resize-y"
                />
              </div>
            </div>

            {/* Ingestion Specs Footer */}
            <div className="p-3.5 rounded-xl bg-canvas-recessed/60 border border-[rgba(13,37,61,0.08)] text-xs text-ink-secondary space-y-1.5">
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span>Active Gazette Engine:</span>
                <strong className="text-ink-primary font-semibold">Gemini 3.5 Lite (Bilingual)</strong>
              </div>
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span>Verified Alerts:</span>
                <strong className="text-emerald-700 font-semibold">
                  {result?.alertCards.length || 0} Opportunities Verified
                </strong>
              </div>
            </div>
          </div>

          {/* Right Column: Multi-Tab Gazette Canvas (7 cols) */}
          <div className="lg:col-span-7 bg-canvas-base flex flex-col justify-between">
            {/* Top Tabs */}
            <div className="px-5 py-3 bg-canvas-paper border-b border-[rgba(13,37,61,0.08)] flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setActiveTab('alerts')}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-[0.97] flex items-center gap-1.5',
                    activeTab === 'alerts'
                      ? 'bg-[#0D253D] text-white shadow-sm'
                      : 'text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed'
                  )}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Actionable Alerts ({result?.alertCards.length || 0})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('matrix')}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-[0.97] flex items-center gap-1.5',
                    activeTab === 'matrix'
                      ? 'bg-[#0D253D] text-white shadow-sm'
                      : 'text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed'
                  )}
                >
                  <Scale className="w-3.5 h-3.5 text-accent-500" />
                  <span>Eligibility Matrix</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('bilingual')}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-[0.97] flex items-center gap-1.5',
                    activeTab === 'bilingual'
                      ? 'bg-[#0D253D] text-white shadow-sm'
                      : 'text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed'
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
                      : 'text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed'
                  )}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>JSON Spec</span>
                </button>
              </div>

              {/* Exports */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleDownloadCsv}
                  className="p-1.5 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.12)] text-ink-secondary hover:text-ink-primary hover:border-accent-500 transition-colors active:scale-[0.97] text-xs flex items-center gap-1"
                  title="Export Eligibility Matrix as CSV"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-accent-secondary" />
                  <span className="hidden sm:inline text-[11px]">Matrix CSV</span>
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

            {/* Results Body */}
            <div className="p-5 md:p-6 flex-1 overflow-y-auto max-h-[640px] space-y-6">
              {/* Executive Headline Banner */}
              {result && (
                <div className="p-5 rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] shadow-sm space-y-3">
                  <div className="flex items-start justify-between gap-4 flex-wrap border-b border-[rgba(13,37,61,0.08)] pb-3">
                    <div>
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-accent-50 text-accent-500 uppercase tracking-wider">
                        OFFICIAL GAZETTE INTELLIGENCE
                      </span>
                      <h3 className="font-display text-xl text-ink-primary font-normal mt-1">
                        {result.englishSummaryHeadline}
                      </h3>
                      <h4 className="text-xs text-ink-secondary font-medium mt-0.5">
                        {result.hindiSummaryHeadline}
                      </h4>
                    </div>

                    <div className="text-right font-mono text-[11px] text-ink-secondary">
                      <span>Jurisdiction: </span>
                      <strong className="text-ink-primary font-semibold block">{result.stateOrRegion}</strong>
                    </div>
                  </div>

                  {/* Fact Checking Verification */}
                  <div className="space-y-1 pt-1">
                    {result.factValidationNotes.map((note, nIdx) => (
                      <div key={nIdx} className="flex items-start gap-2 text-xs text-ink-body">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span className="font-mono text-[11px] leading-relaxed">{note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 1: ACTIONABLE ALERT CARDS */}
              {activeTab === 'alerts' && (
                <div className="space-y-4">
                  {result?.alertCards.map((card) => (
                    <div
                      key={card.id}
                      className="p-5 rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.1)] shadow-sm space-y-4"
                    >
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={cn(
                                'text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase',
                                card.urgencyLevel === 'Critical Deadline'
                                  ? 'bg-rose-100 text-rose-800 border border-rose-400'
                                  : 'bg-emerald-50 text-emerald-800 border border-emerald-500/20'
                              )}
                            >
                              {card.urgencyLevel}
                            </span>
                            <span className="text-xs font-mono text-ink-secondary">
                              {card.category} &bull; {card.departmentOrMinistry}
                            </span>
                          </div>
                          <h4 className="font-semibold text-sm text-ink-primary">
                            {card.title}
                          </h4>
                          <p className="text-xs text-ink-secondary">
                            {card.hindiTitle}
                          </p>
                        </div>

                        {/* Countdown Badge */}
                        <div className="p-2.5 rounded-xl bg-canvas-recessed/80 border border-[rgba(13,37,61,0.08)] text-right font-mono">
                          <span className="text-[10px] text-ink-secondary uppercase block">
                            Days Remaining
                          </span>
                          <strong className="text-base text-accent-500 font-bold">
                            {card.daysRemaining} Days
                          </strong>
                          <span className="text-[10px] text-ink-secondary block">
                            till {card.deadlineDate}
                          </span>
                        </div>
                      </div>

                      {/* Specs Bento */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <div className="p-3 rounded-xl bg-canvas-base border border-[rgba(13,37,61,0.08)] space-y-0.5">
                          <span className="text-[10px] font-mono text-ink-secondary uppercase block">
                            Vacancies / Scope
                          </span>
                          <span className="text-xs font-semibold text-ink-primary">
                            {card.vacanciesOrScope}
                          </span>
                        </div>
                        <div className="p-3 rounded-xl bg-canvas-base border border-[rgba(13,37,61,0.08)] space-y-0.5">
                          <span className="text-[10px] font-mono text-ink-secondary uppercase block">
                            Salary Band / Scale
                          </span>
                          <span className="text-xs font-semibold text-ink-primary">
                            {card.salaryBandOrBudget}
                          </span>
                        </div>
                      </div>

                      {/* Eligibility Snippet */}
                      <div className="p-3 rounded-xl bg-canvas-recessed/60 border border-[rgba(13,37,61,0.08)] space-y-1 text-xs">
                        <span className="font-mono text-[10px] uppercase font-bold text-accent-500 block">
                          Eligibility Criteria:
                        </span>
                        <p className="text-ink-body font-medium leading-relaxed">
                          {card.eligibilitySnippet}
                        </p>
                      </div>

                      {/* Footer Actions */}
                      <div className="flex items-center justify-between pt-2 border-t border-[rgba(13,37,61,0.06)] text-xs">
                        <span className="font-mono text-[11px] text-ink-secondary">
                          Ref: <strong>{card.verifiedSourceRef}</strong>
                        </span>
                        <a
                          href={card.officialPortalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-accent-500 hover:underline active:scale-[0.97] transition-all"
                        >
                          <span>Official Portal Link</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 2: ELIGIBILITY & VACANCY MATRIX */}
              {activeTab === 'matrix' && (
                <div className="space-y-4">
                  {result?.eligibilityMatrix.map((row, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.1)] shadow-sm space-y-3"
                    >
                      <h4 className="font-display text-lg text-ink-primary font-normal border-b border-[rgba(13,37,61,0.08)] pb-2">
                        {row.postOrNotification}
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-canvas-base border border-[rgba(13,37,61,0.08)] space-y-1">
                          <span className="font-mono text-[10px] uppercase font-bold text-accent-500 block">
                            Age Criteria & Relaxation:
                          </span>
                          <p className="text-ink-body leading-relaxed">{row.ageCriteria}</p>
                        </div>

                        <div className="p-3 rounded-xl bg-canvas-base border border-[rgba(13,37,61,0.08)] space-y-1">
                          <span className="font-mono text-[10px] uppercase font-bold text-accent-500 block">
                            Educational Qualification:
                          </span>
                          <p className="text-ink-body leading-relaxed">{row.qualification}</p>
                        </div>

                        <div className="p-3 rounded-xl bg-canvas-base border border-[rgba(13,37,61,0.08)] space-y-1">
                          <span className="font-mono text-[10px] uppercase font-bold text-accent-500 block">
                            Reservation Quotas:
                          </span>
                          <p className="text-ink-body leading-relaxed">{row.reservationQuotas}</p>
                        </div>

                        <div className="p-3 rounded-xl bg-canvas-base border border-[rgba(13,37,61,0.08)] space-y-1">
                          <span className="font-mono text-[10px] uppercase font-bold text-accent-500 block">
                            Application Fee & Process:
                          </span>
                          <p className="text-ink-body leading-relaxed">
                            Fee: {row.applicationFee}
                          </p>
                          <p className="text-[11px] text-ink-secondary pt-0.5">
                            Selection: {row.selectionProcess}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 3: BILINGUAL EXECUTIVE BRIEF */}
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

              {/* TAB 4: RAW JSON SPEC */}
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
                  <pre className="p-4 rounded-xl bg-[#0D253D] text-[#F9F6F0] font-mono text-[11px] leading-relaxed overflow-x-auto max-h-[460px] border border-[rgba(255,255,255,0.1)] selection:bg-accent-500">
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
