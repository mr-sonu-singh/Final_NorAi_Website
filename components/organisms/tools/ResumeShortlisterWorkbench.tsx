'use client';

import React, { useState, useEffect, useMemo } from 'react';
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
  ChevronDown,
  UserCheck,
  UserX,
  Sliders,
  Code2,
  FileSpreadsheet,
  Layers,
  Search,
  Plus,
  Trash2,
  Sparkles,
  BarChart3,
  Users,
  Target,
  FileCode,
  ShieldCheck,
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

  // Intake Dock Navigation Tab: 'criteria' | 'resumes' | 'weights'
  const [intakeTab, setIntakeTab] = useState<'criteria' | 'resumes' | 'weights'>('criteria');

  // Upload sub-mode: 'files' | 'paste'
  const [resumesInputMode, setResumesInputMode] = useState<'files' | 'paste'>('files');

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

  // New custom skill key input
  const [newSkillName, setNewSkillName] = useState('');

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
    'leaderboard' | 'matrix' | 'inspector' | 'json'
  >('leaderboard');

  // Inline Leaderboard Accordion Expanded IDs
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // BYOK Settings
  const [isByokModalOpen, setIsByokModalOpen] = useState(false);
  const [byokSettings, setByokSettings] = useState<ByokSettings>({
    apiKey: '',
    preferredModel: 'gemini-3.5-lite',
  });

  // Export Copied State
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const [liveAnnouncement, setLiveAnnouncement] = useState<string>('');

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
      setExpandedCards({});
      setErrorMessage(null);
      setLiveAnnouncement(`Loaded preset ${preset.category}: ${preset.title} with ${preset.precomputedResult.candidates.length} profiles.`);
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

  // Remove an uploaded file
  const handleRemoveFile = (indexToRemove: number) => {
    const fileToRemove = uploadedFiles[indexToRemove];
    if (!fileToRemove) return;
    setUploadedFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    // Remove snippet from resumesText if possible
    const marker = `--- RESUME FILE: ${fileToRemove.name} ---`;
    if (resumesText.includes(marker)) {
      const parts = resumesText.split(marker);
      setResumesText(parts[0]?.trim() || '');
    }
  };

  // Add custom skill weight
  const handleAddCustomWeight = () => {
    if (!newSkillName.trim()) return;
    setCustomWeights((prev) => ({
      ...prev,
      [newSkillName.trim()]: 20,
    }));
    setNewSkillName('');
    setActivePresetId('custom');
  };

  // Remove skill weight
  const handleRemoveWeight = (skill: string) => {
    setCustomWeights((prev) => {
      const next = { ...prev };
      delete next[skill];
      return next;
    });
    setActivePresetId('custom');
  };

  // Update skill weight percentage
  const handleUpdateWeight = (skill: string, value: number) => {
    setCustomWeights((prev) => ({
      ...prev,
      [skill]: value,
    }));
    setActivePresetId('custom');
  };

  // Run Evaluation (API / Local Preset Fallback)
  const handleRunEvaluation = async () => {
    setIsProcessing(true);
    setErrorMessage(null);
    setLiveAnnouncement('Evaluating resumes against target job criteria...');

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
        setActiveTab('leaderboard');
        setLiveAnnouncement(
          `Evaluation complete for ${currentPreset.jobTitle}. Evaluated ${currentPreset.precomputedResult.candidates.length} candidates, ${currentPreset.precomputedResult.shortlistedCount} shortlisted.`
        );
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
          const err =
            'Live evaluation requires a Gemini API Key. Click "API Key" in the header to enter your key, or select a pre-computed Industry Preset below to test instantly.';
          setErrorMessage(err);
          setLiveAnnouncement(`Error: ${err}`);
          setIsByokModalOpen(true);
        } else {
          const err = data?.message || 'Error executing candidate evaluation.';
          setErrorMessage(err);
          setLiveAnnouncement(`Error: ${err}`);
        }
        setIsProcessing(false);
        return;
      }

      if (data?.data) {
        setResult(data.data);
        if (data.data.candidates?.[0]) {
          setSelectedCandidateId(data.data.candidates[0].id);
        }
        setActiveTab('leaderboard');
        setLiveAnnouncement(
          `Evaluation complete for ${data.data.jobTitle}. Evaluated ${data.data.candidates.length} candidates, ${data.data.shortlistedCount} shortlisted.`
        );
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Network error communicating with API.';
      setErrorMessage(msg);
      setLiveAnnouncement(`Error: ${msg}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    handleSelectPreset('preset-backend-sr');
  };

  // Toggle inline accordion expansion on leaderboard card
  const toggleCardExpansion = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Export handlers
  const handleCopyJson = () => {
    if (!result) return;
    navigator.clipboard?.writeText(JSON.stringify(result, null, 2));
    setCopiedFormat('json');
    setLiveAnnouncement('Candidate evaluation JSON copied to clipboard.');
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
    setLiveAnnouncement('Downloaded candidate evaluation CSV report.');
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
    setLiveAnnouncement('Downloaded candidate evaluation Markdown report.');
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const selectedCandidate: CandidateEvaluation | undefined =
    result?.candidates.find((c) => c.id === selectedCandidateId) ||
    result?.candidates[0];

  const candidateCount = result?.candidates.length || 0;
  const filteredCandidates =
    result?.candidates.filter((c) => c.compositeScore >= minThreshold) || [];

  // Parse candidate names roughly from resumes text for live count pills
  const parsedApplicantNames = useMemo(() => {
    const names: string[] = [];
    const lines = resumesText.split('\n');
    for (const line of lines) {
      if (line.toLowerCase().includes('candidate name:')) {
        const name = line.split(':')[1]?.trim();
        if (name) names.push(name);
      }
    }
    return names;
  }, [resumesText]);

  // Aggregate all unique skill vector labels for the comparative matrix
  const matrixSkillLabels = useMemo(() => {
    if (!result?.candidates) return [];
    const set = new Set<string>();
    result.candidates.forEach((c) => {
      c.skillVectors.forEach((sv) => set.add(sv.label));
    });
    return Array.from(set);
  }, [result]);

  return (
    <>
      {/* Stable live region for screen readers */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {liveAnnouncement}
      </div>

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
        {/* =========================================================================
            TOP COMMAND STRIP: PRESETS & BATCH STATUS
            ========================================================================= */}
        <div className="px-5 py-3 bg-canvas-base border-b border-[rgba(13,37,61,0.08)] flex flex-wrap items-center justify-between gap-3">
          {/* Preset Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-mono text-ink-secondary uppercase tracking-wider font-semibold whitespace-nowrap flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-accent-500" />
              <span>Industry Presets:</span>
            </span>

            <div className="flex items-center gap-1.5 flex-wrap">
              {SHORTLIST_PRESETS.map((preset) => {
                const isSelected = activePresetId === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSelectPreset(preset.id)}
                    className={cn(
                      'px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex items-center gap-2',
                      isSelected
                        ? 'bg-[#0D253D] text-white shadow-sm font-semibold ring-1 ring-[#0D253D]'
                        : 'bg-canvas-paper text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed border border-[rgba(13,37,61,0.08)] active:scale-[0.98]'
                    )}
                  >
                    <span>{preset.category}</span>
                    <span
                      className={cn(
                        'text-[10px] font-mono px-1.5 py-0.2 rounded',
                        isSelected ? 'bg-white/20 text-white' : 'bg-canvas-recessed text-ink-secondary'
                      )}
                    >
                      {preset.precomputedResult.candidates.length} profiles
                    </span>
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => setActivePresetId('custom')}
                className={cn(
                  'px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5',
                  activePresetId === 'custom'
                    ? 'bg-[#0D253D] text-white shadow-sm font-semibold ring-1 ring-[#0D253D]'
                    : 'bg-canvas-paper text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed border border-[rgba(13,37,61,0.08)] active:scale-[0.98]'
                )}
              >
                <Plus className="w-3 h-3 text-accent-500" />
                <span>Custom Batch & Criteria</span>
              </button>
            </div>
          </div>

          {/* Ingestion & Memory Status Indicator */}
          <div className="flex items-center gap-3 text-[11px] font-mono text-ink-secondary">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-canvas-recessed/70 border border-[rgba(13,37,61,0.06)]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>Buffer: <strong>{parsedApplicantNames.length || candidateCount} Resumes</strong></span>
            </div>
            <div className="hidden md:flex items-center gap-1 text-ink-secondary">
              <span>Tokens:</span>
              <strong className="text-ink-primary tabular-nums">
                ~{estimateTokenCount(resumesText).toLocaleString()}
              </strong>
            </div>
          </div>
        </div>

        {/* Error Notification Banner */}
        {errorMessage && (
          <div className="px-5 py-3 bg-accent-50 border-b border-accent-500/30 text-xs text-accent-600 flex items-start justify-between gap-3">
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

        {/* =========================================================================
            DUAL-PANE WORKBENCH CANVAS
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[680px] items-stretch">
          {/* =========================================================================
              LEFT COLUMN: SEGMENTED INTAKE & PARAMETERS DOCK (5 cols)
              ========================================================================= */}
          <div className="lg:col-span-5 p-5 md:p-6 border-b lg:border-b-0 lg:border-r border-[rgba(13,37,61,0.08)] bg-canvas-paper flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              {/* Segmented Intake Nav Tabs */}
              <div className="grid grid-cols-3 p-1 rounded-xl bg-canvas-recessed/70 border border-[rgba(13,37,61,0.08)] text-xs">
                <button
                  type="button"
                  onClick={() => setIntakeTab('criteria')}
                  className={cn(
                    'py-2 px-2 rounded-lg font-medium transition-all text-center flex items-center justify-center gap-1.5 whitespace-nowrap',
                    intakeTab === 'criteria'
                      ? 'bg-canvas-paper text-ink-primary font-semibold shadow-sm border border-[rgba(13,37,61,0.08)]'
                      : 'text-ink-secondary hover:text-ink-primary active:scale-[0.98]'
                  )}
                >
                  <FileText className="w-3.5 h-3.5 text-accent-500 shrink-0" />
                  <span>1. Job Role</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIntakeTab('resumes')}
                  className={cn(
                    'py-2 px-2 rounded-lg font-medium transition-all text-center flex items-center justify-center gap-1.5 whitespace-nowrap',
                    intakeTab === 'resumes'
                      ? 'bg-canvas-paper text-ink-primary font-semibold shadow-sm border border-[rgba(13,37,61,0.08)]'
                      : 'text-ink-secondary hover:text-ink-primary active:scale-[0.98]'
                  )}
                >
                  <Users className="w-3.5 h-3.5 text-accent-secondary shrink-0" />
                  <span>2. Resumes</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIntakeTab('weights')}
                  className={cn(
                    'py-2 px-2 rounded-lg font-medium transition-all text-center flex items-center justify-center gap-1.5 whitespace-nowrap',
                    intakeTab === 'weights'
                      ? 'bg-canvas-paper text-ink-primary font-semibold shadow-sm border border-[rgba(13,37,61,0.08)]'
                      : 'text-ink-secondary hover:text-ink-primary active:scale-[0.98]'
                  )}
                >
                  <Sliders className="w-3.5 h-3.5 text-accent-500 shrink-0" />
                  <span>3. Rubric</span>
                </button>
              </div>

              {/* INTAKE TAB 1: JOB ROLE & SPECIFICATION */}
              {intakeTab === 'criteria' && (
                <div className="space-y-4 animate-fadeIn">
                  {/* Job Title Input */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="target-job-title"
                        className="text-xs font-semibold text-ink-primary flex items-center gap-1.5"
                      >
                        <Target className="w-3.5 h-3.5 text-accent-500" />
                        <span>Target Role Title</span>
                      </label>
                      <span className="text-[10px] font-mono text-accent-secondary uppercase font-semibold">
                        Step 1 of 3
                      </span>
                    </div>
                    <input
                      id="target-job-title"
                      type="text"
                      value={jobTitle}
                      onChange={(e) => {
                        setJobTitle(e.target.value);
                        setActivePresetId('custom');
                      }}
                      placeholder="e.g. Senior Backend Engineer (Distributed Systems)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-base border border-[rgba(13,37,61,0.15)] text-ink-primary text-xs focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all font-medium"
                    />
                  </div>

                  {/* Job Description Textarea */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="job-description-textarea"
                        className="text-xs font-semibold text-ink-primary flex items-center gap-1.5"
                      >
                        <FileText className="w-3.5 h-3.5 text-accent-secondary" />
                        <span>Requirements & Technical Scope</span>
                      </label>
                      <span className="text-[10px] font-mono text-ink-secondary">
                        {jobDescription.length} chars
                      </span>
                    </div>
                    <textarea
                      id="job-description-textarea"
                      rows={9}
                      value={jobDescription}
                      onChange={(e) => {
                        setJobDescription(e.target.value);
                        setActivePresetId('custom');
                      }}
                      placeholder="Paste core responsibilities, qualifications, required stack (e.g. Python, Kafka, PostgreSQL, sub-50ms latency), and architecture expectations..."
                      className="w-full p-3.5 rounded-xl bg-canvas-base border border-[rgba(13,37,61,0.15)] text-ink-primary text-xs font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all resize-y min-h-[200px]"
                    />
                  </div>

                  {/* Next Step Action Helper */}
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-ink-secondary">
                      Ready to add candidates?
                    </span>
                    <button
                      type="button"
                      onClick={() => setIntakeTab('resumes')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-canvas-recessed text-ink-primary text-xs font-semibold hover:bg-[#0D253D] hover:text-white transition-all active:scale-[0.98]"
                    >
                      <span>Next: Ingest Resumes</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* INTAKE TAB 2: RESUMES INGESTION */}
              {intakeTab === 'resumes' && (
                <div className="space-y-4 animate-fadeIn">
                  {/* Mode Toggle: Drag & Drop vs Plain Text */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setResumesInputMode('files')}
                        className={cn(
                          'px-3 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5',
                          resumesInputMode === 'files'
                            ? 'bg-[#0D253D] text-white font-semibold shadow-sm'
                            : 'bg-canvas-recessed text-ink-secondary hover:text-ink-primary'
                        )}
                      >
                        <Upload className="w-3 h-3" />
                        <span>Upload Files</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setResumesInputMode('paste')}
                        className={cn(
                          'px-3 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5',
                          resumesInputMode === 'paste'
                            ? 'bg-[#0D253D] text-white font-semibold shadow-sm'
                            : 'bg-canvas-recessed text-ink-secondary hover:text-ink-primary'
                        )}
                      >
                        <FileCode className="w-3 h-3" />
                        <span>Batch Editor (Text)</span>
                      </button>
                    </div>

                    <span className="text-[10px] font-mono text-ink-secondary">
                      PDF / DOCX / TXT / MD
                    </span>
                  </div>

                  {/* Mode A: Drag & Drop Files */}
                  {resumesInputMode === 'files' && (
                    <div className="space-y-3">
                      <div className="relative border-2 border-dashed border-[rgba(13,37,61,0.18)] hover:border-accent-500 rounded-2xl p-6 text-center bg-canvas-base/70 transition-all cursor-pointer group">
                        <input
                          type="file"
                          id="resume-file-upload"
                          multiple
                          accept=".pdf,.docx,.doc,.txt,.json,.md,.csv"
                          onChange={handleFileUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
                          <div className="w-10 h-10 rounded-xl bg-accent-50 group-hover:bg-accent-100 text-accent-500 flex items-center justify-center transition-colors">
                            <Upload className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-semibold text-ink-primary">
                            {isParsingFiles
                              ? 'Extracting raw text in-browser...'
                              : 'Drag & drop multi-candidate PDFs or click to browse'}
                          </span>
                          <span className="text-[11px] text-ink-secondary max-w-xs leading-normal">
                            Parsed strictly in client-side memory. Zero permanent storage.
                          </span>
                        </div>
                      </div>

                      {/* Uploaded File List */}
                      {uploadedFiles.length > 0 && (
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-mono text-ink-secondary uppercase font-semibold block">
                            Uploaded Documents ({uploadedFiles.length}):
                          </span>
                          <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                            {uploadedFiles.map((f, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between p-2 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.08)] text-xs"
                              >
                                <div className="flex items-center gap-2 truncate">
                                  <FileText className="w-3.5 h-3.5 text-accent-500 shrink-0" />
                                  <span className="font-mono text-[11px] text-ink-primary truncate">
                                    {f.name}
                                  </span>
                                  <span className="text-[10px] font-mono text-ink-secondary">
                                    ({Math.round(f.sizeBytes / 1024)} KB)
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveFile(idx)}
                                  className="text-ink-secondary hover:text-accent-500 p-1"
                                  title="Remove file"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Mode B: Raw Text / Batch Editor */}
                  {resumesInputMode === 'paste' && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => {
                            setResumesText(
                              (prev) =>
                                `${prev}\n\n--- RESUME ${parsedApplicantNames.length + 1} ---\nCandidate Name: \nCurrent Role: \nExperience: \nSkills: \n`
                            );
                            setActivePresetId('custom');
                          }}
                          className="text-[11px] font-semibold text-accent-500 hover:underline flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Insert Candidate Template</span>
                        </button>
                        <span className="text-[10px] font-mono text-ink-secondary">
                          ~{estimateTokenCount(resumesText).toLocaleString()} tokens
                        </span>
                      </div>

                      <textarea
                        id="candidate-resumes-textarea"
                        rows={10}
                        value={resumesText}
                        onChange={(e) => {
                          setResumesText(e.target.value);
                          setActivePresetId('custom');
                        }}
                        placeholder="Paste plain text resumes formatted with '--- RESUME ---' delimiters or standard recruitment text dumps..."
                        className="w-full p-3.5 rounded-xl bg-canvas-base border border-[rgba(13,37,61,0.15)] text-ink-primary text-xs font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-accent-500 resize-y min-h-[220px]"
                      />
                    </div>
                  )}

                  {/* Detected Candidate Buffer Pill */}
                  <div className="p-3 rounded-xl bg-canvas-recessed/60 border border-[rgba(13,37,61,0.08)] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-accent-500" />
                      <span className="text-ink-secondary">
                        Detected Candidates:{' '}
                        <strong className="text-ink-primary">
                          {parsedApplicantNames.length > 0
                            ? parsedApplicantNames.join(', ')
                            : `${candidateCount} loaded from preset`}
                        </strong>
                      </span>
                    </div>
                  </div>

                  {/* Next Step Helper */}
                  <div className="pt-1 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setIntakeTab('criteria')}
                      className="text-xs font-medium text-ink-secondary hover:text-ink-primary"
                    >
                      ← Back to Job Criteria
                    </button>
                    <button
                      type="button"
                      onClick={() => setIntakeTab('weights')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-canvas-recessed text-ink-primary text-xs font-semibold hover:bg-[#0D253D] hover:text-white transition-all active:scale-[0.98]"
                    >
                      <span>Next: Weights & Rubric</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* INTAKE TAB 3: RUBRIC WEIGHTS & CUTOFF THRESHOLD */}
              {intakeTab === 'weights' && (
                <div className="space-y-4 animate-fadeIn">
                  {/* Skill Weights Configurator */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-ink-primary flex items-center gap-1.5">
                        <Sliders className="w-3.5 h-3.5 text-accent-500" />
                        <span>Evaluation Rubric Weights</span>
                      </span>
                      <span className="text-[10px] font-mono text-ink-secondary">
                        Normalized
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {Object.entries(customWeights).map(([skill, weight]) => (
                        <div
                          key={skill}
                          className="p-3 rounded-xl bg-canvas-base border border-[rgba(13,37,61,0.08)] space-y-1.5"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-medium text-ink-primary truncate max-w-[200px]">
                              {skill}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-accent-500 text-xs">
                                {weight}%
                              </span>
                              <button
                                type="button"
                                onClick={() => handleRemoveWeight(skill)}
                                className="text-ink-secondary hover:text-accent-500 p-0.5"
                                title="Remove weight criterion"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          <input
                            type="range"
                            min="5"
                            max="60"
                            step="5"
                            value={weight}
                            onChange={(e) => handleUpdateWeight(skill, Number(e.target.value))}
                            className="w-full accent-accent-500 cursor-pointer h-1.5"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Add Custom Skill Weight */}
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="text"
                        value={newSkillName}
                        onChange={(e) => setNewSkillName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddCustomWeight();
                          }
                        }}
                        placeholder="Add skill criterion (e.g. Distributed Tracing)..."
                        className="flex-1 px-3 py-1.5 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.12)] text-xs text-ink-primary focus:outline-none focus:ring-1 focus:ring-accent-500"
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomWeight}
                        disabled={!newSkillName.trim()}
                        className="px-3 py-1.5 rounded-lg bg-canvas-recessed text-ink-primary hover:bg-[#0D253D] hover:text-white disabled:opacity-40 text-xs font-semibold transition-all"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Threshold Filter Slider */}
                  <div className="space-y-2 pt-3 border-t border-[rgba(13,37,61,0.08)]">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-ink-primary flex items-center gap-1.5">
                        <Target className="w-3.5 h-3.5 text-accent-500" />
                        <span>Cutoff Qualification Threshold</span>
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
                      <span>50% (Broad)</span>
                      <span>75% (Standard)</span>
                      <span>95% (Strict Fit)</span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-accent-50/70 border border-accent-500/20 text-xs text-accent-700 flex items-center justify-between">
                      <span>Filter Result:</span>
                      <strong>
                        {filteredCandidates.length} of {candidateCount} candidates qualify
                      </strong>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Ingestion & Memory Policy Callout */}
            <div className="p-4 rounded-xl bg-canvas-recessed/50 border border-[rgba(13,37,61,0.08)] text-xs text-ink-secondary space-y-2">
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="flex items-center gap-1.5 text-ink-primary font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Zero-Retention Policy</span>
                </span>
                <span className="text-emerald-700 font-bold">EPHEMERAL RAM</span>
              </div>
              <p className="text-[11px] text-ink-secondary leading-relaxed">
                Candidate data is parsed strictly in-memory during this session and wiped upon exit.
              </p>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: RESULTS, COMPARATIVE MATRIX & DEEP INSPECTOR (7 cols)
              ========================================================================= */}
          <div className="lg:col-span-7 bg-canvas-base flex flex-col justify-between">
            {/* Top Navigation Tabs & Quick Export Tools */}
            <div className="px-5 py-3 bg-canvas-paper border-b border-[rgba(13,37,61,0.08)] flex items-center justify-between gap-3 flex-wrap">
              {/* Result View Switchers */}
              <div role="tablist" aria-label="Candidate Result Views" className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'leaderboard'}
                  onClick={() => {
                    setActiveTab('leaderboard');
                    setLiveAnnouncement(`Switched to Leaderboard view with ${filteredCandidates.length} qualifying candidates.`);
                  }}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5',
                    activeTab === 'leaderboard'
                      ? 'bg-[#0D253D] text-white shadow-sm ring-1 ring-[#0D253D]'
                      : 'text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed active:scale-[0.98]'
                  )}
                >
                  <UserCheck className="w-3.5 h-3.5 text-accent-500" />
                  <span>Leaderboard ({filteredCandidates.length})</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'matrix'}
                  onClick={() => {
                    setActiveTab('matrix');
                    setLiveAnnouncement('Switched to Comparative Matrix view.');
                  }}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5',
                    activeTab === 'matrix'
                      ? 'bg-[#0D253D] text-white shadow-sm ring-1 ring-[#0D253D]'
                      : 'text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed active:scale-[0.98]'
                  )}
                >
                  <BarChart3 className="w-3.5 h-3.5 text-accent-secondary" />
                  <span>Comparative Matrix</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'inspector'}
                  onClick={() => {
                    setActiveTab('inspector');
                    setLiveAnnouncement(`Switched to Candidate Scorecard inspector view for ${selectedCandidate?.name || 'candidate'}.`);
                  }}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5',
                    activeTab === 'inspector'
                      ? 'bg-[#0D253D] text-white shadow-sm ring-1 ring-[#0D253D]'
                      : 'text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed active:scale-[0.98]'
                  )}
                >
                  <Search className="w-3.5 h-3.5 text-accent-500" />
                  <span>Candidate Scorecard</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'json'}
                  onClick={() => {
                    setActiveTab('json');
                    setLiveAnnouncement('Switched to JSON Contract payload view.');
                  }}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5',
                    activeTab === 'json'
                      ? 'bg-[#0D253D] text-white shadow-sm ring-1 ring-[#0D253D]'
                      : 'text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed active:scale-[0.98]'
                  )}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>JSON Contract</span>
                </button>
              </div>

              {/* Quick Export Tools */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleDownloadCsv}
                  className="px-2.5 py-1.5 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.12)] text-ink-secondary hover:text-ink-primary hover:border-accent-500 transition-all text-xs flex items-center gap-1.5 active:scale-[0.98]"
                  title="Export Ranked Batch as CSV"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-accent-secondary" />
                  <span className="text-[11px] font-medium">CSV</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadMarkdown}
                  className="px-2.5 py-1.5 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.12)] text-ink-secondary hover:text-ink-primary hover:border-accent-500 transition-all text-xs flex items-center gap-1.5 active:scale-[0.98]"
                  title="Download Markdown Executive Brief"
                >
                  <Download className="w-3.5 h-3.5 text-accent-500" />
                  <span className="text-[11px] font-medium">Markdown</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyJson}
                  className="px-2.5 py-1.5 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.12)] text-ink-secondary hover:text-ink-primary hover:border-accent-500 transition-all text-xs flex items-center gap-1.5 active:scale-[0.98]"
                  title="Copy Structured Output JSON"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-medium">
                    {copiedFormat === 'json' ? 'Copied!' : 'JSON'}
                  </span>
                </button>
              </div>
            </div>

            {/* Results Content Viewport */}
            <div className="p-5 md:p-6 flex-1 overflow-y-auto space-y-6">
              {/* Executive Evaluation Summary Banner */}
              {result?.summaryOverview && (
                <div className="p-4 rounded-xl bg-canvas-paper border border-[rgba(13,37,61,0.1)] shadow-sm space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-ink-secondary font-mono text-[11px]">
                    <span className="flex items-center gap-1 text-ink-primary font-semibold">
                      <Sparkles className="w-3.5 h-3.5 text-accent-500" />
                      <span>EXECUTIVE BATCH EVALUATION</span>
                    </span>
                    <span>BATCH: {result.batchId}</span>
                  </div>
                  <p className="text-ink-body leading-relaxed">
                    {result.summaryOverview}
                  </p>
                </div>
              )}

              {/* =========================================================================
                  TAB 1: RANKED CANDIDATE LEADERBOARD (WITH INLINE ACCORDION)
                  ========================================================================= */}
              {activeTab === 'leaderboard' && (
                <div className="space-y-4 animate-fadeIn">
                  {filteredCandidates.length === 0 ? (
                    <div className="p-10 text-center rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.08)] space-y-3">
                      <UserX className="w-10 h-10 text-ink-secondary mx-auto opacity-50" />
                      <p className="text-base font-semibold text-ink-primary font-display">
                        No candidates passed the &ge; {minThreshold}% cutoff.
                      </p>
                      <p className="text-xs text-ink-secondary max-w-sm mx-auto">
                        Adjust the cutoff threshold slider on the left to include candidates in the secondary review queue.
                      </p>
                    </div>
                  ) : (
                    filteredCandidates.map((candidate, idx) => {
                      const isSelected = selectedCandidateId === candidate.id;
                      const isTopMatch = candidate.status === 'Top Match';
                      const isExpanded = Boolean(expandedCards[candidate.id]);

                      return (
                        <div
                          key={candidate.id}
                          className={cn(
                            'p-5 rounded-2xl border transition-all duration-200 space-y-4 group bg-canvas-paper',
                            isSelected
                              ? 'border-accent-500 shadow-md ring-1 ring-accent-500/30'
                              : 'border-[rgba(13,37,61,0.1)] hover:border-accent-500/50 hover:shadow-sm'
                          )}
                        >
                          {/* Row Header */}
                          <div className="flex items-start justify-between gap-4 flex-wrap sm:flex-nowrap">
                            <div className="flex items-start gap-3.5">
                              {/* Rank Indicator */}
                              <span
                                className={cn(
                                  'font-mono text-xs font-bold w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5',
                                  idx === 0
                                    ? 'bg-[#0D253D] text-white'
                                    : 'bg-canvas-recessed text-ink-secondary'
                                )}
                              >
                                #{idx + 1}
                              </span>

                              <div>
                                <div className="flex items-center gap-2.5 flex-wrap">
                                  <h4 className="font-display text-xl text-ink-primary font-normal group-hover:text-accent-500 transition-colors">
                                    {candidate.name}
                                  </h4>
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
                                </div>
                                <p className="text-xs text-ink-secondary mt-0.5">
                                  {candidate.currentRole} &bull;{' '}
                                  <span className="font-mono tabular-nums font-semibold">
                                    {candidate.experienceYears}
                                  </span>
                                </p>
                              </div>
                            </div>

                            {/* Score & Action Hub */}
                            <div className="flex items-center gap-3 self-start sm:self-center shrink-0">
                              <div className="text-right">
                                <span className="font-mono text-2xl font-bold text-accent-500 tabular-nums block leading-tight">
                                  {candidate.compositeScore}
                                </span>
                                <span className="font-mono text-[9px] text-ink-secondary uppercase">
                                  Score / 100
                                </span>
                              </div>

                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={(e) => toggleCardExpansion(candidate.id, e)}
                                  className="p-1.5 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.1)] text-ink-secondary hover:text-ink-primary hover:border-accent-500 transition-all text-xs"
                                  title={isExpanded ? 'Collapse breakdown' : 'Quick breakdown preview'}
                                >
                                  {isExpanded ? (
                                    <ChevronDown className="w-4 h-4 text-accent-500" />
                                  ) : (
                                    <ChevronRight className="w-4 h-4" />
                                  )}
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedCandidateId(candidate.id);
                                    setActiveTab('inspector');
                                  }}
                                  className="px-2.5 py-1.5 rounded-lg bg-accent-50 hover:bg-accent-100 text-accent-600 text-xs font-semibold border border-accent-500/20 transition-all flex items-center gap-1"
                                >
                                  <span>Scorecard</span>
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Executive Verdict Quote */}
                          <p className="text-xs text-ink-body leading-relaxed border-l-2 border-accent-500/50 pl-3.5 py-0.5">
                            {candidate.oneLineVerdict}
                          </p>

                          {/* Top Skill Vector Chips */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {candidate.skillVectors.map((vector, vIdx) => (
                              <span
                                key={vIdx}
                                className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-canvas-recessed text-ink-primary border border-[rgba(13,37,61,0.06)]"
                              >
                                {vector.label}:{' '}
                                <strong
                                  className={cn(
                                    vector.matchScore >= 90
                                      ? 'text-emerald-700'
                                      : vector.matchScore >= 75
                                      ? 'text-accent-500'
                                      : 'text-ink-secondary'
                                  )}
                                >
                                  {vector.matchScore}%
                                </strong>
                              </span>
                            ))}
                          </div>

                          {/* INLINE QUICK-INSPECT ACCORDION */}
                          {isExpanded && (
                            <div className="pt-3 border-t border-[rgba(13,37,61,0.08)] space-y-3 animate-fadeIn">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                                {/* Key Strengths Preview */}
                                <div className="p-3 rounded-xl bg-canvas-base border border-[rgba(13,37,61,0.06)] space-y-1.5">
                                  <span className="font-semibold text-emerald-800 flex items-center gap-1.5">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>Verified Strengths</span>
                                  </span>
                                  <ul className="space-y-1 text-[11px] text-ink-body">
                                    {candidate.keyStrengths.slice(0, 2).map((str, sIdx) => (
                                      <li key={sIdx} className="flex items-start gap-1.5">
                                        <span className="text-emerald-600 font-bold">&bull;</span>
                                        <span className="leading-snug">{str}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Probing Question Preview */}
                                <div className="p-3 rounded-xl bg-canvas-base border border-[rgba(13,37,61,0.06)] space-y-1.5">
                                  <span className="font-semibold text-ink-primary flex items-center gap-1.5">
                                    <HelpCircle className="w-3.5 h-3.5 text-accent-secondary" />
                                    <span>Recommended Interview Probe</span>
                                  </span>
                                  <p className="text-[11px] text-ink-body leading-snug italic">
                                    &ldquo;{candidate.interviewQuestions[0] || 'Discuss architectural scaling strategy under peak load.'}&rdquo;
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              )}

              {/* =========================================================================
                  TAB 2: COMPARATIVE SKILL MATRIX (ACROSS ALL CANDIDATES)
                  ========================================================================= */}
              {activeTab === 'matrix' && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="p-4 rounded-xl bg-canvas-paper border border-[rgba(13,37,61,0.08)] flex items-center justify-between">
                    <div>
                      <h4 className="font-display text-lg text-ink-primary font-normal">
                        Multi-Candidate Vector Matrix
                      </h4>
                      <p className="text-xs text-ink-secondary">
                        Side-by-side skill alignment comparison across all evaluated applicants.
                      </p>
                    </div>
                    <span className="font-mono text-xs text-accent-500 font-semibold px-2.5 py-1 rounded bg-accent-50 border border-accent-500/20">
                      {result?.candidates.length} Profiles Grouped
                    </span>
                  </div>

                  {/* Matrix Rows by Skill Label */}
                  <div className="space-y-4">
                    {matrixSkillLabels.map((skillLabel, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-5 rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.1)] shadow-sm space-y-3.5"
                      >
                        <div className="flex items-center justify-between border-b border-[rgba(13,37,61,0.06)] pb-2">
                          <span className="font-semibold text-xs text-ink-primary flex items-center gap-2">
                            <Layers className="w-3.5 h-3.5 text-accent-500" />
                            <span>{skillLabel}</span>
                          </span>
                          <span className="text-[10px] font-mono text-ink-secondary">
                            Skill Vector #{sIdx + 1}
                          </span>
                        </div>

                        {/* Candidates compared side-by-side */}
                        <div className="space-y-3">
                          {result?.candidates.map((cand) => {
                            const vector = cand.skillVectors.find((v) => v.label === skillLabel);
                            const score = vector?.matchScore || 0;

                            return (
                              <div key={cand.id} className="space-y-1">
                                <div className="flex items-center justify-between text-xs">
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-ink-primary">
                                      {cand.name}
                                    </span>
                                    <span className="text-[10px] font-mono text-ink-secondary">
                                      ({cand.status})
                                    </span>
                                  </div>
                                  <span className="font-mono font-bold text-accent-500 tabular-nums">
                                    {score}%
                                  </span>
                                </div>

                                <div className="w-full h-2 rounded-full bg-canvas-recessed overflow-hidden">
                                  <div
                                    className={cn(
                                      'h-full rounded-full transition-all duration-500',
                                      score >= 90
                                        ? 'bg-emerald-600'
                                        : score >= 75
                                        ? 'bg-accent-500'
                                        : 'bg-amber-600'
                                    )}
                                    style={{ width: `${score}%` }}
                                  />
                                </div>

                                {vector?.evidence && (
                                  <p className="text-[11px] text-ink-secondary leading-snug pt-0.5">
                                    {vector.evidence}
                                  </p>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* =========================================================================
                  TAB 3: DEEP CANDIDATE SCORECARD INSPECTOR
                  ========================================================================= */}
              {activeTab === 'inspector' && selectedCandidate && (
                <div className="space-y-5 animate-fadeIn">
                  {/* Candidate Selector Switcher Pill Strip */}
                  <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
                    <span className="text-[11px] font-mono text-ink-secondary uppercase font-semibold whitespace-nowrap">
                      Select Profile:
                    </span>
                    {result?.candidates.map((cand) => {
                      const isSelected = selectedCandidateId === cand.id;
                      return (
                        <button
                          key={cand.id}
                          type="button"
                          onClick={() => setSelectedCandidateId(cand.id)}
                          className={cn(
                            'px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 active:scale-[0.98]',
                            isSelected
                              ? 'bg-[#0D253D] text-white font-semibold shadow-sm ring-1 ring-[#0D253D]'
                              : 'bg-canvas-paper text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed border border-[rgba(13,37,61,0.08)]'
                          )}
                        >
                          <span>{cand.name}</span>
                          <span
                            className={cn(
                              'font-mono text-[10px] px-1.5 py-0.2 rounded',
                              isSelected ? 'bg-white/20 text-white' : 'bg-canvas-recessed text-accent-500 font-bold'
                            )}
                          >
                            {cand.compositeScore}%
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Candidate Hero Card */}
                  <div className="p-6 rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] shadow-sm space-y-4">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <span className="font-mono text-[10px] font-bold px-2.5 py-0.5 rounded bg-accent-50 text-accent-500 border border-accent-500/20 uppercase tracking-wider mb-2 inline-block">
                          {selectedCandidate.status}
                        </span>
                        <h3 className="font-display text-3xl text-ink-primary font-normal">
                          {selectedCandidate.name}
                        </h3>
                        <p className="text-xs text-ink-secondary mt-0.5">
                          {selectedCandidate.currentRole} &bull;{' '}
                          <span className="font-mono font-semibold">
                            {selectedCandidate.experienceYears}
                          </span>
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="font-mono text-4xl font-bold text-accent-500 tabular-nums">
                          {selectedCandidate.compositeScore}
                        </span>
                        <span className="font-mono text-[10px] text-ink-secondary uppercase block">
                          Composite Score / 100
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-ink-body leading-relaxed bg-canvas-recessed/60 p-4 rounded-xl border border-[rgba(13,37,61,0.06)]">
                      <strong className="text-ink-primary">Executive Verdict:</strong>{' '}
                      {selectedCandidate.oneLineVerdict}
                    </p>
                  </div>

                  {/* Strengths vs Missing Requirements 2-Column Bento */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Strengths */}
                    <div className="p-5 rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.1)] shadow-sm space-y-3">
                      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Verified Strengths & Evidence</span>
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

                    {/* Missing Requirements & Risks */}
                    <div className="p-5 rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.1)] shadow-sm space-y-3">
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
                  <div className="p-5 rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.1)] shadow-sm space-y-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-ink-primary">
                      <HelpCircle className="w-4 h-4 text-accent-secondary shrink-0" />
                      <span>Calibrated Technical Probing Questions</span>
                    </div>
                    <p className="text-[11px] text-ink-secondary">
                      Engineered for hiring managers to test architectural claims and probe unverified boundaries:
                    </p>
                    <div className="space-y-2.5 text-xs text-ink-body">
                      {selectedCandidate.interviewQuestions.map((q, qIdx) => (
                        <div
                          key={qIdx}
                          className="p-3.5 rounded-xl bg-canvas-recessed/40 border border-[rgba(13,37,61,0.06)] flex items-start gap-3"
                        >
                          <span className="font-mono text-accent-500 font-bold text-xs shrink-0">
                            0{qIdx + 1}.
                          </span>
                          <p className="leading-relaxed font-medium text-ink-primary">{q}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* =========================================================================
                  TAB 4: RAW JSON SPEC & CONTRACT
                  ========================================================================= */}
              {activeTab === 'json' && (
                <div className="space-y-3 animate-fadeIn">
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
                  <pre className="p-5 rounded-2xl bg-[#0D253D] text-[#F9F6F0] font-mono text-[11px] leading-relaxed overflow-x-auto max-h-[480px] border border-[rgba(255,255,255,0.1)] selection:bg-accent-500">
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
