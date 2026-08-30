'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Download,
  Copy,
  ChevronRight,
  UserCheck,
  UserX,
  Sliders,
  Code2,
  FileSpreadsheet,
  Layers,
  Search,
} from 'lucide-react';
import { ToolShell } from './ToolShell';
import { ApiKeyModal } from './ApiKeyModal';
import {
  CandidateEvaluation,
  ResumeShortlistResult,
  ByokSettings,
} from '@/lib/tools/types';
import { SHORTLIST_PRESETS } from '@/lib/tools/presets';
import {
  extractTextFromFile,
  estimateTokenCount,
} from '@/lib/tools/client-parser';

export function ResumeShortlisterWorkbench() {
  // Active Preset State
  const [activePresetId, setActivePresetId] = useState<string>(
    SHORTLIST_PRESETS[0]?.id || 'preset-backend-sr'
  );
  const currentPreset =
    SHORTLIST_PRESETS.find((p) => p.id === activePresetId) ||
    SHORTLIST_PRESETS[0];

  // Inputs
  const [jobTitle, setJobTitle] = useState(currentPreset?.jobTitle || '');
  const [jobDescription, setJobDescription] = useState(
    currentPreset?.jobDescription || ''
  );
  const [customWeights, setCustomWeights] = useState<{ [skill: string]: number }>(
    currentPreset?.customWeights || {}
  );
  const [resumesText, setResumesText] = useState(
    currentPreset?.sampleResumesText || ''
  );
  const [minThreshold, setMinThreshold] = useState<number>(75);

  // File Upload State
  const [uploadedFiles, setUploadedFiles] = useState<
    Array<{ name: string; sizeBytes: number; tokens: number }>
  >([]);
  const [isParsingFiles, setIsParsingFiles] = useState(false);

  // Evaluation & Results State
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<ResumeShortlistResult | null>(
    currentPreset?.precomputedResult || null
  );
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>(
    currentPreset?.precomputedResult?.candidates[0]?.id || 'cand-01'
  );
  const [activeTab, setActiveTab] = useState<
    'leaderboard' | 'vectors' | 'inspector' | 'json'
  >('leaderboard');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // BYOK Settings
  const [isByokModalOpen, setIsByokModalOpen] = useState(false);
  const [byokSettings, setByokSettings] = useState<ByokSettings>({
    apiKey: '',
    preferredModel: 'gemini-3.5-lite',
  });

  // Export Copied State
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  // Load BYOK from localStorage on mount
  useEffect(() => {
    try {
      const storedKey = localStorage.getItem('norai_byok_gemini_key');
      const storedModel = localStorage.getItem('norai_byok_gemini_model');
      if (storedKey) {
        setByokSettings({
          apiKey: storedKey,
          preferredModel:
            (storedModel as ByokSettings['preferredModel']) ||
            'gemini-2.5-flash',
        });
      }
    } catch {
      // Ignore localStorage read errors
    }
  }, []);

  // Save BYOK settings
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
      // Ignore localStorage write errors
    }
  };

  // Handle Preset Selection
  const handleSelectPreset = (presetId: string) => {
    setActivePresetId(presetId);
    const preset = SHORTLIST_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setJobTitle(preset.jobTitle);
      setJobDescription(preset.jobDescription);
      setCustomWeights(preset.customWeights);
      setResumesText(preset.sampleResumesText);
      setResult(preset.precomputedResult);
      setSelectedCandidateId(preset.precomputedResult.candidates[0]?.id || 'cand-01');
      setUploadedFiles([]);
      setErrorMessage(null);
    }
  };

  // Handle File Drops / Uploads
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
        combinedText += `\n\n--- RESUME FILE: ${parsed.name} ---\n${parsed.extractedText}`;
        newFileMeta.push({
          name: parsed.name,
          sizeBytes: parsed.sizeBytes,
          tokens: parsed.estimatedTokens,
        });
      }

      setResumesText((prev) => (prev ? `${prev}\n${combinedText}` : combinedText));
      setUploadedFiles((prev) => [...prev, ...newFileMeta]);
      setActivePresetId('custom');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error extracting text from file.';
      setErrorMessage(msg);
    } finally {
      setIsParsingFiles(false);
    }
  };

  // Run Evaluation (API / Local Preset Fallback)
  const handleRunEvaluation = async () => {
    setIsProcessing(true);
    setErrorMessage(null);

    // If using matching preset text without custom changes and without BYOK key, load preset result instantly
    if (
      currentPreset &&
      activePresetId !== 'custom' &&
      resumesText === currentPreset.sampleResumesText &&
      jobTitle === currentPreset.jobTitle &&
      !byokSettings.apiKey
    ) {
      setTimeout(() => {
        setResult(currentPreset.precomputedResult);
        setSelectedCandidateId(
          currentPreset.precomputedResult.candidates[0]?.id || 'cand-01'
        );
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

      const response = await fetch('/api/tools/resume-shortlister', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          jobTitle,
          jobDescription,
          customWeights,
          minThreshold,
          resumesText,
          preferredModel: byokSettings.preferredModel,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          setErrorMessage(
            'Live evaluation requires a Gemini API Key. Click "API Key" in the header to enter your key, or select a pre-computed Industry Preset below to test instantly.'
          );
          setIsByokModalOpen(true);
        } else {
          setErrorMessage(data?.message || 'Error executing candidate evaluation.');
        }
        setIsProcessing(false);
        return;
      }

      if (data?.data) {
        setResult(data.data);
        if (data.data.candidates?.[0]) {
          setSelectedCandidateId(data.data.candidates[0].id);
        }
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
    handleSelectPreset('preset-backend-sr');
  };

  // Export handlers
  const handleCopyJson = () => {
    if (!result) return;
    navigator.clipboard?.writeText(JSON.stringify(result, null, 2));
    setCopiedFormat('json');
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const handleDownloadCsv = () => {
    if (!result) return;
    const headers = ['Candidate ID', 'Name', 'Role', 'Experience', 'Score', 'Status', 'Verdict'];
    const rows = result.candidates.map((c) => [
      `"${c.id}"`,
      `"${c.name.replace(/"/g, '""')}"`,
      `"${c.currentRole.replace(/"/g, '""')}"`,
      `"${c.experienceYears}"`,
      c.compositeScore,
      `"${c.status}"`,
      `"${c.oneLineVerdict.replace(/"/g, '""')}"`,
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `norai_candidates_${result.batchId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setCopiedFormat('csv');
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const handleDownloadMarkdown = () => {
    if (!result) return;
    let md = `# Candidate Evaluation Report: ${result.jobTitle}\n`;
    md += `**Batch ID**: ${result.batchId} | **Evaluated**: ${result.totalEvaluated} candidates | **Shortlisted**: ${result.shortlistedCount}\n\n`;
    md += `## Executive Summary\n${result.summaryOverview}\n\n`;
    md += `## Ranked Candidates\n\n`;

    result.candidates.forEach((c, idx) => {
      md += `### ${idx + 1}. ${c.name} — Score: ${c.compositeScore}/100 (${c.status})\n`;
      md += `- **Role**: ${c.currentRole} (${c.experienceYears})\n`;
      md += `- **Verdict**: ${c.oneLineVerdict}\n`;
      md += `\n**Skill Vectors:**\n`;
      c.skillVectors.forEach((sv) => {
        md += `- **${sv.label}** (${sv.matchScore}%): ${sv.evidence}\n`;
      });
      md += `\n**Key Strengths:**\n`;
      c.keyStrengths.forEach((str) => (md += `- ${str}\n`));
      if (c.missingRequirements.length > 0) {
        md += `\n**Missing Requirements / Gaps:**\n`;
        c.missingRequirements.forEach((gap) => (md += `- ${gap}\n`));
      }
      if (c.potentialRedFlags.length > 0) {
        md += `\n**Potential Red Flags:**\n`;
        c.potentialRedFlags.forEach((rf) => (md += `- ${rf}\n`));
      }
      md += `\n**Calibrated Probing Questions:**\n`;
      c.interviewQuestions.forEach((q) => (md += `- ${q}\n`));
      md += `\n---\n\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `norai_shortlist_${result.batchId}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setCopiedFormat('md');
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const selectedCandidate: CandidateEvaluation | undefined =
    result?.candidates.find((c) => c.id === selectedCandidateId) ||
    result?.candidates[0];

  const candidateCount = result?.candidates.length || 0;
  const filteredCandidates =
    result?.candidates.filter((c) => c.compositeScore >= minThreshold) || [];

  return (
    <>
      <ToolShell
        toolId="resume-shortlister"
        toolName="AI Resume Shortlister"
        category="Recruitment AI"
        isProcessing={isProcessing}
        telemetry={result?.telemetry}
        byokSettings={byokSettings}
        onOpenByokModal={() => setIsByokModalOpen(true)}
        onReset={handleReset}
        onRun={handleRunEvaluation}
        activePresetTitle={currentPreset?.title}
        isPresetMode={activePresetId !== 'custom' && !byokSettings.apiKey}
      >
        {/* Preset Selector Strip */}
        <div className="px-5 py-3 bg-canvas-base border-b border-[rgba(13,37,61,0.08)] flex items-center justify-between gap-3 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-ink-secondary uppercase tracking-wider font-semibold whitespace-nowrap">
              Industry Presets:
            </span>
            <div className="flex items-center gap-1.5">
              {SHORTLIST_PRESETS.map((preset) => {
                const isSelected = activePresetId === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSelectPreset(preset.id)}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap',
                      isSelected
                        ? 'bg-[#0D253D] text-white shadow-sm font-semibold'
                        : 'bg-canvas-paper text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed border border-[rgba(13,37,61,0.08)]'
                    )}
                  >
                    {preset.category}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => setActivePresetId('custom')}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap',
                  activePresetId === 'custom'
                    ? 'bg-[#0D253D] text-white shadow-sm font-semibold'
                    : 'bg-canvas-paper text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed border border-[rgba(13,37,61,0.08)]'
                )}
              >
                Custom Job & Resumes
              </button>
            </div>
          </div>

          <div className="text-[11px] font-mono text-ink-secondary hidden md:block">
            Estimated Ingestion: ~{estimateTokenCount(resumesText).toLocaleString()} tokens
          </div>
        </div>

        {/* Error Notification Banner */}
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

        {/* Dual-Pane Workbench Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[640px] items-stretch">
          {/* Left Column: Intake & Parameters Dock (5 cols) */}
          <div className="lg:col-span-5 p-5 md:p-6 border-b lg:border-b-0 lg:border-r border-[rgba(13,37,61,0.08)] bg-canvas-paper flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              {/* Job Specification Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="target-job-title" className="text-xs font-semibold text-ink-primary flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-accent-500" />
                    <span>Target Job Title</span>
                  </label>
                  <span className="text-[11px] font-mono text-ink-secondary">Required</span>
                </div>
                <input
                  id="target-job-title"
                  type="text"
                  value={jobTitle}
                  onChange={(e) => {
                    setJobTitle(e.target.value);
                    setActivePresetId('custom');
                  }}
                  placeholder="e.g. Senior Backend Engineer (FastAPI / High-Concurrency)"
                  className="w-full px-3 py-2 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.15)] text-ink-primary text-xs focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all font-medium"
                />

                <div className="flex items-center justify-between pt-1">
                  <label htmlFor="job-description-textarea" className="text-xs font-semibold text-ink-primary flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-accent-secondary" />
                    <span>Job Description & Requirements</span>
                  </label>
                </div>
                <textarea
                  id="job-description-textarea"
                  rows={4}
                  value={jobDescription}
                  onChange={(e) => {
                    setJobDescription(e.target.value);
                    setActivePresetId('custom');
                  }}
                  placeholder="Paste core responsibilities, tech stack, and experience qualifications..."
                  className="w-full p-3 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.15)] text-ink-primary text-xs font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-accent-500 resize-y"
                />
              </div>

              {/* Candidate Ingestion Section */}
              <div className="space-y-3 pt-2 border-t border-[rgba(13,37,61,0.08)]">
                <div className="flex items-center justify-between">
                  <label htmlFor="candidate-resumes-textarea" className="text-xs font-semibold text-ink-primary flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-accent-secondary" />
                    <span>Candidate Resumes Ingestion</span>
                  </label>
                  <span className="text-[10px] font-mono text-ink-secondary">
                    PDF / DOCX / TXT / MD
                  </span>
                </div>

                {/* File Upload Zone */}
                <div className="relative border-2 border-dashed border-[rgba(13,37,61,0.15)] hover:border-accent-500 rounded-xl p-4 text-center bg-canvas-base/60 transition-all">
                  <input
                    type="file"
                    id="resume-file-upload"
                    multiple
                    accept=".pdf,.docx,.doc,.txt,.json,.md,.csv"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center space-y-1.5 pointer-events-none">
                    <Upload className="w-5 h-5 text-accent-500" />
                    <span className="text-xs font-medium text-ink-primary">
                      {isParsingFiles ? 'Extracting text in-browser...' : 'Drag & drop resumes or click to browse'}
                    </span>
                    <span className="text-[10px] text-ink-secondary">
                      Ephemeral processing. Zero files stored.
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

                {/* Raw Resumes Editor */}
                <textarea
                  id="candidate-resumes-textarea"
                  rows={5}
                  value={resumesText}
                  onChange={(e) => {
                    setResumesText(e.target.value);
                    setActivePresetId('custom');
                  }}
                  placeholder="Paste plain text resumes or multi-candidate transcripts here..."
                  className="w-full p-3 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.15)] text-ink-primary text-xs font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-accent-500 resize-y"
                />
              </div>

              {/* Threshold Filter Slider */}
              <div className="space-y-1.5 pt-2 border-t border-[rgba(13,37,61,0.08)]">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-ink-primary flex items-center gap-1">
                    <Sliders className="w-3.5 h-3.5 text-accent-500" />
                    <span>Cutoff Threshold Filter</span>
                  </span>
                  <span className="font-mono font-bold text-accent-500">
                    &ge; {minThreshold}% Match
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="95"
                  value={minThreshold}
                  onChange={(e) => setMinThreshold(Number(e.target.value))}
                  className="w-full accent-accent-500 cursor-pointer"
                  aria-label="Score qualification cutoff threshold"
                />
                <div className="flex justify-between text-[10px] text-ink-secondary font-mono">
                  <span>50% (Broad Pipeline)</span>
                  <span>75% (Standard)</span>
                  <span>95% (Strict Vector Fit)</span>
                </div>
              </div>
            </div>

            {/* Ingestion Statistics Box */}
            <div className="p-3.5 rounded-xl bg-canvas-recessed/60 border border-[rgba(13,37,61,0.08)] text-xs text-ink-secondary space-y-1.5">
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span>In-Memory Buffer:</span>
                <strong className="text-emerald-700">ACTIVE (RAM ONLY)</strong>
              </div>
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span>Parsed Candidates:</span>
                <strong className="text-ink-primary">{candidateCount} candidates</strong>
              </div>
            </div>
          </div>

          {/* Right Column: Results & Deep Scorecard Inspector (7 cols) */}
          <div className="lg:col-span-7 bg-canvas-base flex flex-col justify-between">
            {/* Top Results Navigation Tabs */}
            <div className="px-5 py-3 bg-canvas-paper border-b border-[rgba(13,37,61,0.08)] flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setActiveTab('leaderboard')}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5',
                    activeTab === 'leaderboard'
                      ? 'bg-[#0D253D] text-white shadow-sm'
                      : 'text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed'
                  )}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Leaderboard ({filteredCandidates.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('vectors')}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5',
                    activeTab === 'vectors'
                      ? 'bg-[#0D253D] text-white shadow-sm'
                      : 'text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed'
                  )}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Skill Vectors</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('inspector')}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5',
                    activeTab === 'inspector'
                      ? 'bg-[#0D253D] text-white shadow-sm'
                      : 'text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed'
                  )}
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Candidate Scorecard</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('json')}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5',
                    activeTab === 'json'
                      ? 'bg-[#0D253D] text-white shadow-sm'
                      : 'text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed'
                  )}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>JSON Spec</span>
                </button>
              </div>

              {/* Quick Export Tools */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleDownloadCsv}
                  className="p-1.5 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.12)] text-ink-secondary hover:text-ink-primary hover:border-accent-500 transition-all text-xs flex items-center gap-1"
                  title="Export Leaderboard as CSV"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-accent-secondary" />
                  <span className="hidden sm:inline text-[11px]">CSV</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadMarkdown}
                  className="p-1.5 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.12)] text-ink-secondary hover:text-ink-primary hover:border-accent-500 transition-all text-xs flex items-center gap-1"
                  title="Download Formatted Markdown Brief"
                >
                  <Download className="w-3.5 h-3.5 text-accent-500" />
                  <span className="hidden sm:inline text-[11px]">Markdown</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyJson}
                  className="p-1.5 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.12)] text-ink-secondary hover:text-ink-primary hover:border-accent-500 transition-all text-xs flex items-center gap-1"
                  title="Copy Structured JSON"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-[11px]">
                    {copiedFormat === 'json' ? 'Copied!' : 'JSON'}
                  </span>
                </button>
              </div>
            </div>

            {/* Results Content Area */}
            <div className="p-5 md:p-6 flex-1 overflow-y-auto max-h-[640px] space-y-6">
              {/* Batch Overview Banner */}
              {result?.summaryOverview && (
                <div className="p-4 rounded-xl bg-canvas-paper border border-[rgba(13,37,61,0.1)] shadow-sm space-y-1 text-xs">
                  <div className="flex items-center justify-between text-ink-secondary font-mono text-[11px]">
                    <span>EVALUATION SUMMARY</span>
                    <span>BATCH: {result.batchId}</span>
                  </div>
                  <p className="text-ink-body leading-relaxed">
                    {result.summaryOverview}
                  </p>
                </div>
              )}

              {/* TAB 1: RANKED LEADERBOARD */}
              {activeTab === 'leaderboard' && (
                <div className="space-y-3">
                  {filteredCandidates.length === 0 ? (
                    <div className="p-8 text-center rounded-xl bg-canvas-paper border border-[rgba(13,37,61,0.08)] space-y-2">
                      <UserX className="w-8 h-8 text-ink-secondary mx-auto opacity-50" />
                      <p className="text-sm font-semibold text-ink-primary">
                        No candidates passed the &ge; {minThreshold}% threshold.
                      </p>
                      <p className="text-xs text-ink-secondary">
                        Adjust the cutoff slider on the left to review additional applicants.
                      </p>
                    </div>
                  ) : (
                    filteredCandidates.map((candidate, idx) => {
                      const isSelected = selectedCandidateId === candidate.id;
                      const isTopMatch = candidate.status === 'Top Match';

                      return (
                        <div
                          key={candidate.id}
                          onClick={() => {
                            setSelectedCandidateId(candidate.id);
                            setActiveTab('inspector');
                          }}
                          className={cn(
                            'p-4 rounded-xl border transition-all cursor-pointer space-y-3 group',
                            isSelected
                              ? 'bg-canvas-paper border-accent-500 shadow-md ring-1 ring-accent-500'
                              : 'bg-canvas-paper border-[rgba(13,37,61,0.1)] hover:border-accent-500/50 hover:shadow-sm'
                          )}
                        >
                          {/* Row Header */}
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <span className="font-mono text-xs font-bold text-ink-secondary w-5">
                                #{idx + 1}
                              </span>
                              <div>
                                <h4 className="font-display text-lg text-ink-primary font-normal group-hover:text-accent-500 transition-colors">
                                  {candidate.name}
                                </h4>
                                <p className="text-xs text-ink-secondary">
                                  {candidate.currentRole} &bull; {candidate.experienceYears}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2.5">
                              {/* Status Badge */}
                              <span
                                className={cn(
                                  'font-mono text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider',
                                  isTopMatch
                                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-500/30'
                                    : candidate.status === 'Shortlisted'
                                    ? 'bg-blue-50 text-blue-800 border border-blue-500/30'
                                    : 'bg-amber-50 text-amber-800 border border-amber-500/30'
                                )}
                              >
                                {candidate.status}
                              </span>

                              {/* Score Badge */}
                              <div className="text-right">
                                <span className="font-mono text-xl font-bold text-ink-primary tabular-nums block">
                                  {candidate.compositeScore}
                                </span>
                                <span className="font-mono text-[9px] text-ink-secondary uppercase">
                                  Score / 100
                                </span>
                              </div>

                              <ChevronRight className="w-4 h-4 text-ink-secondary group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>

                          {/* Verdict */}
                          <p className="text-xs text-ink-body leading-relaxed border-l-2 border-accent-500/40 pl-3">
                            {candidate.oneLineVerdict}
                          </p>

                          {/* Top Matching Skill Chips */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {candidate.skillVectors.map((vector, vIdx) => (
                              <span
                                key={vIdx}
                                className="text-[10px] font-mono px-2 py-0.5 rounded bg-canvas-recessed text-ink-primary border border-[rgba(13,37,61,0.06)]"
                              >
                                {vector.label}: <strong>{vector.matchScore}%</strong>
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}

              {/* TAB 2: SKILL VECTORS COMPARATIVE MATRIX */}
              {activeTab === 'vectors' && (
                <div className="space-y-4">
                  {result?.candidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      className="p-5 rounded-xl bg-canvas-paper border border-[rgba(13,37,61,0.1)] shadow-sm space-y-4"
                    >
                      <div className="flex items-center justify-between border-b border-[rgba(13,37,61,0.08)] pb-2.5">
                        <div>
                          <h4 className="font-display text-lg text-ink-primary font-normal">
                            {candidate.name}
                          </h4>
                          <p className="text-xs text-ink-secondary">{candidate.currentRole}</p>
                        </div>
                        <span className="font-mono text-sm font-bold text-accent-500 px-2.5 py-1 rounded bg-canvas-recessed">
                          {candidate.compositeScore}% Match
                        </span>
                      </div>

                      {/* Vectors Bars */}
                      <div className="space-y-3">
                        {candidate.skillVectors.map((v, vIdx) => (
                          <div key={vIdx} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="font-medium text-ink-primary">{v.label}</span>
                              <span className="font-mono font-bold text-ink-primary">
                                {v.matchScore}%
                              </span>
                            </div>
                            {/* Visual Progress Bar */}
                            <div className="w-full h-2 rounded-full bg-canvas-recessed overflow-hidden">
                              <div
                                className={cn(
                                  'h-full rounded-full transition-all duration-500',
                                  v.matchScore >= 90
                                    ? 'bg-emerald-600'
                                    : v.matchScore >= 75
                                    ? 'bg-accent-500'
                                    : 'bg-amber-600'
                                )}
                                style={{ width: `${v.matchScore}%` }}
                              />
                            </div>
                            <p className="text-[11px] text-ink-secondary leading-relaxed pt-0.5">
                              {v.evidence}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 3: DEEP CANDIDATE SCORECARD INSPECTOR */}
              {activeTab === 'inspector' && selectedCandidate && (
                <div className="space-y-6">
                  {/* Candidate Header Profile */}
                  <div className="p-6 rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] shadow-sm space-y-4">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-accent-50 text-accent-500 border border-accent-500/20 uppercase tracking-wider mb-2 inline-block">
                          {selectedCandidate.status}
                        </span>
                        <h3 className="font-display text-2xl text-ink-primary font-normal">
                          {selectedCandidate.name}
                        </h3>
                        <p className="text-xs text-ink-secondary">
                          {selectedCandidate.currentRole} &bull; {selectedCandidate.experienceYears}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="font-mono text-3xl font-bold text-accent-500 tabular-nums">
                          {selectedCandidate.compositeScore}
                        </span>
                        <span className="font-mono text-[10px] text-ink-secondary uppercase block">
                          Composite Score
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-ink-body leading-relaxed bg-canvas-recessed/50 p-3.5 rounded-xl border border-[rgba(13,37,61,0.06)]">
                      <strong>Executive Verdict:</strong> {selectedCandidate.oneLineVerdict}
                    </p>
                  </div>

                  {/* Strengths vs Missing Requirements */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Strengths */}
                    <div className="p-5 rounded-xl bg-canvas-paper border border-[rgba(13,37,61,0.1)] shadow-sm space-y-3">
                      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Verified Strengths & Accomplishments</span>
                      </div>
                      <div className="space-y-2 text-xs text-ink-body">
                        {selectedCandidate.keyStrengths.map((str, sIdx) => (
                          <div key={sIdx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                            <span className="leading-relaxed">{str}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Missing Requirements / Gaps */}
                    <div className="p-5 rounded-xl bg-canvas-paper border border-[rgba(13,37,61,0.1)] shadow-sm space-y-3">
                      <div className="flex items-center gap-2 text-xs font-semibold text-accent-600">
                        <AlertTriangle className="w-4 h-4 text-accent-500 shrink-0" />
                        <span>Missing Requirements & Risks</span>
                      </div>
                      <div className="space-y-2 text-xs text-ink-body">
                        {selectedCandidate.missingRequirements.length === 0 ? (
                          <p className="text-[11px] text-ink-secondary italic">
                            No critical requirements missing against the job description.
                          </p>
                        ) : (
                          selectedCandidate.missingRequirements.map((gap, gIdx) => (
                            <div key={gIdx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent-500 mt-1.5 shrink-0" />
                              <span className="leading-relaxed">{gap}</span>
                            </div>
                          ))
                        )}
                        {selectedCandidate.potentialRedFlags.length > 0 && (
                          <div className="pt-2 border-t border-[rgba(13,37,61,0.06)] space-y-1">
                            <span className="text-[10px] font-mono uppercase font-bold text-accent-500 block">
                              Red Flag Checks:
                            </span>
                            {selectedCandidate.potentialRedFlags.map((rf, rIdx) => (
                              <p key={rIdx} className="text-[11px] text-ink-secondary leading-relaxed">
                                &bull; {rf}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Calibrated Interview Probing Questions */}
                  <div className="p-5 rounded-xl bg-canvas-paper border border-[rgba(13,37,61,0.1)] shadow-sm space-y-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-ink-primary">
                      <HelpCircle className="w-4 h-4 text-accent-secondary shrink-0" />
                      <span>Calibrated Technical Probing Questions</span>
                    </div>
                    <p className="text-[11px] text-ink-secondary">
                      Tailored specifically to verify this candidate&apos;s architectural claims and probe unverified boundaries:
                    </p>
                    <div className="space-y-2.5 text-xs text-ink-body">
                      {selectedCandidate.interviewQuestions.map((q, qIdx) => (
                        <div
                          key={qIdx}
                          className="p-3 rounded-lg bg-canvas-recessed/40 border border-[rgba(13,37,61,0.06)] flex items-start gap-2.5"
                        >
                          <span className="font-mono text-accent-500 font-bold text-[11px]">
                            0{qIdx + 1}.
                          </span>
                          <p className="leading-relaxed font-medium text-ink-primary">{q}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: RAW JSON SPEC */}
              {activeTab === 'json' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-ink-secondary font-mono">
                    <span>STRUCTURED OUTPUT PAYLOAD (ZOD VALIDATED)</span>
                    <button
                      type="button"
                      onClick={handleCopyJson}
                      className="text-accent-500 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedFormat === 'json' ? 'Copied to clipboard' : 'Copy JSON'}</span>
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

      {/* BYOK Key Modal */}
      <ApiKeyModal
        isOpen={isByokModalOpen}
        onClose={() => setIsByokModalOpen(false)}
        settings={byokSettings}
        onSave={handleSaveByok}
      />
    </>
  );
}
