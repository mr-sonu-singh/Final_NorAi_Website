'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/atoms/Button';
import {
  BookOpen,
  Upload,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Download,
  Copy,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Code2,
  FileSpreadsheet,
  Layers,
  GraduationCap,
  Check,
  FileText,
  Atom,
} from 'lucide-react';
import { ToolShell } from './ToolShell';
import { ApiKeyModal } from './ApiKeyModal';
import {
  CourseNotesResult,
  ByokSettings,
  Flashcard,
} from '@/lib/tools/types';
import { COURSE_NOTES_PRESETS } from '@/lib/tools/presets';
import {
  extractTextFromFile,
  estimateTokenCount,
} from '@/lib/tools/client-parser';

export function CourseNoteTakerWorkbench() {
  // Preset Selection
  const [activePresetId, setActivePresetId] = useState<string>(
    COURSE_NOTES_PRESETS[0]?.id || 'preset-mit-raft'
  );
  const currentPreset =
    COURSE_NOTES_PRESETS.find((p) => p.id === activePresetId) ||
    COURSE_NOTES_PRESETS[0];

  // Input Fields
  const [lectureTitle, setLectureTitle] = useState(
    currentPreset?.precomputedResult?.lectureTitle || ''
  );
  const [subject, setSubject] = useState(currentPreset?.subject || '');
  const [instructor, setInstructor] = useState(currentPreset?.instructor || '');
  const [focusMode, setFocusMode] = useState<
    'Comprehensive Study Guide' | 'Formulas & Axioms' | 'Exam Cram & Quizzes'
  >(currentPreset?.focusMode || 'Comprehensive Study Guide');
  const [transcriptText, setTranscriptText] = useState(
    currentPreset?.sampleTranscriptText || ''
  );

  // File Upload State
  const [uploadedFiles, setUploadedFiles] = useState<
    Array<{ name: string; sizeBytes: number; tokens: number }>
  >([]);
  const [isParsingFiles, setIsParsingFiles] = useState(false);

  // Evaluation & Results State
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<CourseNotesResult | null>(
    currentPreset?.precomputedResult || null
  );
  const [activeTab, setActiveTab] = useState<
    'notes' | 'flashcards' | 'quiz' | 'json'
  >('notes');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Flashcards Study Interactive State
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState<Record<string, boolean>>({});

  // Quiz Engine Interactive State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // BYOK Settings
  const [isByokModalOpen, setIsByokModalOpen] = useState(false);
  const [byokSettings, setByokSettings] = useState<ByokSettings>({
    apiKey: '',
    preferredModel: 'gemini-3.5-lite',
  });

  // Export Copied State
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
      // Ignore localStorage read errors
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
      // Ignore localStorage write errors
    }
  };

  // Handle Preset Switch
  const handleSelectPreset = (presetId: string) => {
    setActivePresetId(presetId);
    const preset = COURSE_NOTES_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setLectureTitle(preset.precomputedResult.lectureTitle);
      setSubject(preset.subject);
      setInstructor(preset.instructor);
      setFocusMode(preset.focusMode);
      setTranscriptText(preset.sampleTranscriptText);
      setResult(preset.precomputedResult);
      setUploadedFiles([]);
      setCurrentCardIdx(0);
      setIsCardFlipped(false);
      setSelectedAnswers({});
      setQuizSubmitted(false);
      setErrorMessage(null);
    }
  };

  // File Upload Handler
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
        combinedText += `\n\n--- SOURCE FILE: ${parsed.name} ---\n${parsed.extractedText}`;
        newFileMeta.push({
          name: parsed.name,
          sizeBytes: parsed.sizeBytes,
          tokens: parsed.estimatedTokens,
        });
      }

      setTranscriptText((prev) => (prev ? `${prev}\n${combinedText}` : combinedText));
      setUploadedFiles((prev) => [...prev, ...newFileMeta]);
      setActivePresetId('custom');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error parsing uploaded transcript.';
      setErrorMessage(msg);
    } finally {
      setIsParsingFiles(false);
    }
  };

  // Run Synthesis (Live API or Instant Preset)
  const handleRunSynthesis = async () => {
    setIsProcessing(true);
    setErrorMessage(null);

    // Fast-path: If matching preset transcript and no BYOK, load precomputed result
    if (
      currentPreset &&
      activePresetId !== 'custom' &&
      transcriptText === currentPreset.sampleTranscriptText &&
      !byokSettings.apiKey
    ) {
      setTimeout(() => {
        setResult(currentPreset.precomputedResult);
        setCurrentCardIdx(0);
        setIsCardFlipped(false);
        setSelectedAnswers({});
        setQuizSubmitted(false);
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

      const response = await fetch('/api/tools/course-note-taker', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          lectureTitle: lectureTitle || 'Untitled Technical Lecture',
          subject: subject || 'Computer Science / Engineering',
          instructor,
          focusMode,
          transcriptText,
          preferredModel: byokSettings.preferredModel,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          setErrorMessage(
            'Live lecture synthesis requires a Gemini API Key. Click "API Key" in the header to enter your key, or select a pre-computed Industry Preset below to test instantly.'
          );
          setIsByokModalOpen(true);
        } else {
          setErrorMessage(data?.message || 'Error processing lecture transcript.');
        }
        setIsProcessing(false);
        return;
      }

      if (data?.data) {
        setResult(data.data);
        setCurrentCardIdx(0);
        setIsCardFlipped(false);
        setSelectedAnswers({});
        setQuizSubmitted(false);
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
    handleSelectPreset('preset-mit-raft');
  };

  // Export handlers
  const handleCopyJson = () => {
    if (!result) return;
    navigator.clipboard?.writeText(JSON.stringify(result, null, 2));
    setCopiedFormat('json');
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const handleDownloadMarkdown = () => {
    if (!result) return;
    let md = `---\ntitle: "${result.lectureTitle}"\ninstructor: "${result.instructorOrSource}"\nduration: "${result.estimatedDuration}"\ngenerated_by: "NorAI Course Note-Taker"\n---\n\n`;
    md += `# ${result.lectureTitle}\n\n`;
    md += `**Instructor / Source:** ${result.instructorOrSource} | **Duration:** ${result.estimatedDuration}\n\n`;
    md += `## Executive Abstract\n${result.executiveAbstract}\n\n`;
    md += `## Core Invariants & Axioms\n`;
    result.coreAxioms.forEach((ax, idx) => {
      md += `${idx + 1}. **${ax}**\n`;
    });
    md += `\n---\n\n## Chapterized Detailed Notes\n\n`;

    result.chapters.forEach((ch) => {
      md += `### [${ch.timestamp}] ${ch.title}\n`;
      md += `${ch.summary}\n\n`;
      md += `**Key Takeaways:**\n`;
      ch.keyTakeaways.forEach((t) => (md += `- ${t}\n`));
      if (ch.formulasOrCode && ch.formulasOrCode.length > 0) {
        md += `\n**Key Formulas & Theorems:**\n`;
        ch.formulasOrCode.forEach((f) => {
          md += `- **${f.label}**: \`${f.formulaOrSnippet}\` — *${f.explanation}*\n`;
        });
      }
      md += `\n`;
    });

    md += `---\n\n## Active Recall Flashcards\n\n`;
    result.flashcards.forEach((fc, idx) => {
      md += `**Card ${idx + 1} (${fc.category} — ${fc.difficulty})**\n`;
      md += `- **Q:** ${fc.frontPrompt}\n`;
      md += `- **A:** ${fc.backAnswer}\n\n`;
    });

    md += `---\n\n## Practice Quiz & Concept Verification\n\n`;
    result.quiz.forEach((q, idx) => {
      md += `**Question ${idx + 1}: ${q.question}** (${q.topic})\n`;
      q.options.forEach((opt, oIdx) => {
        md += `${String.fromCharCode(65 + oIdx)}. ${opt}\n`;
      });
      md += `\n*Correct Answer: Option ${String.fromCharCode(65 + q.correctAnswerIndex)}*\n`;
      md += `*Explanation: ${q.explanation}*\n\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `norai_notes_${result.lectureTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setCopiedFormat('md');
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const handleDownloadAnkiCsv = () => {
    if (!result) return;
    const rows = result.flashcards.map((fc) => [
      `"${fc.frontPrompt.replace(/"/g, '""')}"`,
      `"${fc.backAnswer.replace(/"/g, '""')}"`,
      `"${fc.category}"`,
      `"${fc.difficulty}"`,
    ]);
    const csvContent = ['"Front","Back","Category","Difficulty"', ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `anki_deck_${result.lectureTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setCopiedFormat('anki');
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  // Flashcards state helpers
  const activeFlashcard: Flashcard | undefined =
    result?.flashcards[currentCardIdx] || result?.flashcards[0];
  const totalCards = result?.flashcards.length || 0;

  const handleNextCard = () => {
    if (currentCardIdx < totalCards - 1) {
      setCurrentCardIdx((prev) => prev + 1);
      setIsCardFlipped(false);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIdx > 0) {
      setCurrentCardIdx((prev) => prev - 1);
      setIsCardFlipped(false);
    }
  };

  const handleToggleMastered = (cardId: string) => {
    setMasteredCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  // Quiz grading
  const handleSelectOption = (questionId: string, optionIdx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  };

  const quizQuestions = result?.quiz || [];
  const correctCount = quizQuestions.filter(
    (q) => selectedAnswers[q.id] === q.correctAnswerIndex
  ).length;

  return (
    <>
      <ToolShell
        toolId="course-note-taker"
        toolName="Course Note-Taker & Study Engine"
        category="EdTech & Cognitive AI"
        isProcessing={isProcessing}
        telemetry={result?.telemetry}
        byokSettings={byokSettings}
        onOpenByokModal={() => setIsByokModalOpen(true)}
        onReset={handleReset}
        onRun={handleRunSynthesis}
        activePresetTitle={currentPreset?.title}
        isPresetMode={activePresetId !== 'custom' && !byokSettings.apiKey}
      >
        {/* Presets Header Dock */}
        <div className="px-5 py-3 bg-canvas-base border-b border-[rgba(13,37,61,0.08)] flex items-center justify-between gap-3 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-ink-secondary uppercase tracking-wider font-semibold whitespace-nowrap">
              Lecture Presets:
            </span>
            <div className="flex items-center gap-1.5">
              {COURSE_NOTES_PRESETS.map((preset) => {
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
                    {preset.subject}
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
                Custom Transcript / Audio
              </button>
            </div>
          </div>

          <div className="text-[11px] font-mono text-ink-secondary hidden md:block">
            Estimated Ingestion: ~{estimateTokenCount(transcriptText).toLocaleString()} tokens
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

        {/* Dual-Pane Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[640px] items-stretch">
          {/* Left Column: Intake & Synthesis Dock (5 cols) */}
          <div className="lg:col-span-5 p-5 md:p-6 border-b lg:border-b-0 lg:border-r border-[rgba(13,37,61,0.08)] bg-canvas-paper flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              {/* Lecture Metadata */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="course-title-input" className="text-xs font-semibold text-ink-primary flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-accent-500" />
                    <span>Lecture Title / Topic</span>
                  </label>
                  <span className="text-[11px] font-mono text-ink-secondary">Required</span>
                </div>
                <input
                  id="course-title-input"
                  type="text"
                  value={lectureTitle}
                  onChange={(e) => {
                    setLectureTitle(e.target.value);
                    setActivePresetId('custom');
                  }}
                  placeholder="e.g. Distributed Consensus & Raft Invariants"
                  className="w-full px-3 py-2 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.15)] text-ink-primary text-xs focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all font-medium"
                />

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label htmlFor="course-subject-input" className="text-xs font-semibold text-ink-primary block mb-1">
                      Subject / Domain
                    </label>
                    <input
                      id="course-subject-input"
                      type="text"
                      value={subject}
                      onChange={(e) => {
                        setSubject(e.target.value);
                        setActivePresetId('custom');
                      }}
                      placeholder="e.g. Distributed Systems"
                      className="w-full px-3 py-1.5 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.15)] text-ink-primary text-xs font-medium focus:outline-none focus:ring-2 focus:ring-accent-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="course-instructor-input" className="text-xs font-semibold text-ink-primary block mb-1">
                      Instructor / Source
                    </label>
                    <input
                      id="course-instructor-input"
                      type="text"
                      value={instructor}
                      onChange={(e) => {
                        setInstructor(e.target.value);
                        setActivePresetId('custom');
                      }}
                      placeholder="e.g. MIT CSAIL / Prof. Morris"
                      className="w-full px-3 py-1.5 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.15)] text-ink-primary text-xs font-medium focus:outline-none focus:ring-2 focus:ring-accent-500"
                    />
                  </div>
                </div>

                {/* Synthesis Mode */}
                <div className="space-y-1.5 pt-2">
                  <label htmlFor="course-focus-mode-select" className="text-xs font-semibold text-ink-primary block">
                    Pedagogical Focus Mode
                  </label>
                  <select
                    id="course-focus-mode-select"
                    value={focusMode}
                    onChange={(e) =>
                      setFocusMode(
                        e.target.value as
                          | 'Comprehensive Study Guide'
                          | 'Formulas & Axioms'
                          | 'Exam Cram & Quizzes'
                      )
                    }
                    className="w-full px-3 py-2 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.15)] text-ink-primary text-xs font-mono focus:outline-none focus:ring-2 focus:ring-accent-500"
                  >
                    <option value="Comprehensive Study Guide">Comprehensive Study Guide (Detailed Chapters + All Assets)</option>
                    <option value="Formulas & Axioms">Formulas & Axioms (Heavy Math & LaTeX Extraction)</option>
                    <option value="Exam Cram & Quizzes">Exam Cram & Quizzes (Max Flashcards & Assessment)</option>
                  </select>
                </div>
              </div>

              {/* Transcript & Lecture Ingestion */}
              <div className="space-y-3 pt-2 border-t border-[rgba(13,37,61,0.08)]">
                <div className="flex items-center justify-between">
                  <label htmlFor="transcript-textarea" className="text-xs font-semibold text-ink-primary flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-accent-secondary" />
                    <span>Transcript / Audio Notes</span>
                  </label>
                  <span className="text-[10px] font-mono text-ink-secondary">
                    VTT / SRT / PDF / TXT / MD
                  </span>
                </div>

                {/* Dropzone */}
                <div className="relative border-2 border-dashed border-[rgba(13,37,61,0.15)] hover:border-accent-500 rounded-xl p-4 text-center bg-canvas-base/60 transition-all">
                  <input
                    type="file"
                    id="transcript-file-upload"
                    multiple
                    accept=".txt,.pdf,.docx,.md,.vtt,.srt,.csv,.json"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center space-y-1.5 pointer-events-none">
                    <Upload className="w-5 h-5 text-accent-500" />
                    <span className="text-xs font-medium text-ink-primary">
                      {isParsingFiles ? 'Extracting text in-browser...' : 'Upload transcript, subtitles, or lecture notes'}
                    </span>
                    <span className="text-[10px] text-ink-secondary">
                      Zero audio files retained. Ephemeral parsing.
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

                {/* Raw Transcript Area */}
                <textarea
                  id="transcript-textarea"
                  rows={6}
                  value={transcriptText}
                  onChange={(e) => {
                    setTranscriptText(e.target.value);
                    setActivePresetId('custom');
                  }}
                  placeholder="Paste timestamped transcript, YouTube auto-generated captions, or raw lecture notes here..."
                  className="w-full p-3 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.15)] text-ink-primary text-xs font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-accent-500 resize-y"
                />
              </div>
            </div>

            {/* Ingestion Specs Footer */}
            <div className="p-3.5 rounded-xl bg-canvas-recessed/60 border border-[rgba(13,37,61,0.08)] text-xs text-ink-secondary space-y-1.5">
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span>Active Target Model:</span>
                <strong className="text-ink-primary font-semibold">Gemini 3.5 Lite (1M Context)</strong>
              </div>
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span>Chapters Detected:</span>
                <strong className="text-emerald-700 font-semibold">
                  {result?.chapters.length || 0} segments
                </strong>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Study Canvas (7 cols) */}
          <div className="lg:col-span-7 bg-canvas-base flex flex-col justify-between">
            {/* Top Canvas Tabs */}
            <div className="px-5 py-3 bg-canvas-paper border-b border-[rgba(13,37,61,0.08)] flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setActiveTab('notes')}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5',
                    activeTab === 'notes'
                      ? 'bg-[#0D253D] text-white shadow-sm'
                      : 'text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed'
                  )}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Executive Notes ({result?.chapters.length || 0})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('flashcards')}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5',
                    activeTab === 'flashcards'
                      ? 'bg-[#0D253D] text-white shadow-sm'
                      : 'text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed'
                  )}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Flashcards ({result?.flashcards.length || 0})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('quiz')}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5',
                    activeTab === 'quiz'
                      ? 'bg-[#0D253D] text-white shadow-sm'
                      : 'text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed'
                  )}
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Recall Quiz ({result?.quiz.length || 0})</span>
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

              {/* Exports Suite */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleDownloadAnkiCsv}
                  className="p-1.5 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.12)] text-ink-secondary hover:text-ink-primary hover:border-accent-500 transition-all text-xs flex items-center gap-1"
                  title="Export Flashcards as Anki CSV"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-accent-secondary" />
                  <span className="hidden sm:inline text-[11px]">Anki CSV</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadMarkdown}
                  className="p-1.5 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.12)] text-ink-secondary hover:text-ink-primary hover:border-accent-500 transition-all text-xs flex items-center gap-1"
                  title="Export Notion / Markdown Study Guide"
                >
                  <Download className="w-3.5 h-3.5 text-accent-500" />
                  <span className="hidden sm:inline text-[11px]">Markdown</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyJson}
                  className="p-1.5 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.12)] text-ink-secondary hover:text-ink-primary hover:border-accent-500 transition-all text-xs flex items-center gap-1"
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
              {/* Executive Abstract Banner */}
              {result?.executiveAbstract && (
                <div className="p-5 rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] shadow-sm space-y-3">
                  <div className="flex items-center justify-between gap-2 border-b border-[rgba(13,37,61,0.08)] pb-2.5">
                    <div>
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-accent-50 text-accent-500 uppercase tracking-wider">
                        EXECUTIVE SYNTHESIS
                      </span>
                      <h3 className="font-display text-xl text-ink-primary font-normal mt-1">
                        {result.lectureTitle}
                      </h3>
                      <p className="text-xs text-ink-secondary">
                        {result.instructorOrSource} &bull; {result.estimatedDuration}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-ink-body leading-relaxed">
                    {result.executiveAbstract}
                  </p>

                  {/* Core Axioms */}
                  <div className="space-y-1.5 pt-2 border-t border-[rgba(13,37,61,0.06)]">
                    <span className="font-mono text-[10px] uppercase font-bold text-accent-500 block">
                      Core Invariants & Fundamental Axioms:
                    </span>
                    <div className="space-y-1.5">
                      {result.coreAxioms.map((axiom, aIdx) => (
                        <div
                          key={aIdx}
                          className="flex items-start gap-2 p-2 rounded-lg bg-canvas-recessed/40 text-xs text-ink-body font-medium"
                        >
                          <Atom className="w-3.5 h-3.5 text-accent-secondary mt-0.5 shrink-0" />
                          <span>{axiom}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 1: CHAPTERIZED NOTES */}
              {activeTab === 'notes' && (
                <div className="space-y-4">
                  {result?.chapters.map((chapter, idx) => (
                    <div
                      key={chapter.id || idx}
                      className="p-5 rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.1)] shadow-sm space-y-3"
                    >
                      {/* Chapter Header */}
                      <div className="flex items-center justify-between gap-3 border-b border-[rgba(13,37,61,0.08)] pb-2.5">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-accent-50 text-accent-500 border border-accent-500/20">
                            {chapter.timestamp}
                          </span>
                          <h4 className="font-display text-lg text-ink-primary font-normal">
                            {chapter.title}
                          </h4>
                        </div>
                      </div>

                      {/* Chapter Summary */}
                      <p className="text-xs text-ink-body leading-relaxed">
                        {chapter.summary}
                      </p>

                      {/* Takeaways */}
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[11px] font-mono font-semibold text-ink-secondary block">
                          Key Takeaways:
                        </span>
                        {chapter.keyTakeaways.map((takeaway, tIdx) => (
                          <div key={tIdx} className="flex items-start gap-2 text-xs text-ink-body">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                            <span className="leading-relaxed">{takeaway}</span>
                          </div>
                        ))}
                      </div>

                      {/* LaTeX / Code Formulas */}
                      {chapter.formulasOrCode && chapter.formulasOrCode.length > 0 && (
                        <div className="space-y-2 pt-2 border-t border-[rgba(13,37,61,0.06)]">
                          <span className="text-[10px] font-mono uppercase font-bold text-accent-500 block">
                            Formulas & Formal Invariants:
                          </span>
                          <div className="space-y-2">
                            {chapter.formulasOrCode.map((f, fIdx) => (
                              <div
                                key={fIdx}
                                className="p-3 rounded-xl bg-canvas-recessed/70 border border-[rgba(13,37,61,0.08)] space-y-1"
                              >
                                <div className="flex items-center justify-between text-xs font-semibold text-ink-primary">
                                  <span>{f.label}</span>
                                </div>
                                <code className="block p-2 rounded-lg bg-canvas-paper border border-[rgba(13,37,61,0.1)] text-accent-500 font-mono text-xs font-semibold">
                                  {f.formulaOrSnippet}
                                </code>
                                <p className="text-[11px] text-ink-secondary leading-relaxed pt-0.5">
                                  {f.explanation}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 2: INTERACTIVE 3D FLIP FLASHCARDS */}
              {activeTab === 'flashcards' && activeFlashcard && (
                <div className="space-y-6">
                  {/* Card Deck Controller */}
                  <div className="flex items-center justify-between text-xs font-mono text-ink-secondary">
                    <span className="font-semibold text-ink-primary">
                      Card {currentCardIdx + 1} of {totalCards}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-canvas-paper border border-[rgba(13,37,61,0.1)]">
                        {activeFlashcard.category}
                      </span>
                      <span
                        className={cn(
                          'text-[10px] px-2 py-0.5 rounded font-semibold',
                          activeFlashcard.difficulty === 'Foundational'
                            ? 'bg-emerald-50 text-emerald-800'
                            : activeFlashcard.difficulty === 'Intermediate'
                            ? 'bg-blue-50 text-blue-800'
                            : 'bg-amber-50 text-amber-800'
                        )}
                      >
                        {activeFlashcard.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* 3D Flip Card */}
                  <div
                    onClick={() => setIsCardFlipped(!isCardFlipped)}
                    className="group cursor-pointer min-h-[260px] rounded-3xl bg-canvas-paper border-2 border-[rgba(13,37,61,0.15)] hover:border-accent-500 p-8 shadow-md flex flex-col justify-between transition-all relative overflow-hidden"
                  >
                    {/* Corner Tag */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-ink-secondary">
                      <span>{isCardFlipped ? 'ANSWER (BACK)' : 'QUESTION (FRONT)'}</span>
                      <span className="text-accent-500 font-semibold group-hover:underline">
                        Click to flip &rarr;
                      </span>
                    </div>

                    {/* Card Content */}
                    <div className="py-4 text-center">
                      {!isCardFlipped ? (
                        <h3 className="font-display text-2xl md:text-3xl text-ink-primary font-normal leading-relaxed">
                          {activeFlashcard.frontPrompt}
                        </h3>
                      ) : (
                        <div className="space-y-3">
                          <p className="text-sm md:text-base text-ink-body leading-relaxed">
                            {activeFlashcard.backAnswer}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Footer Status */}
                    <div className="flex items-center justify-between pt-2 border-t border-[rgba(13,37,61,0.06)] text-[11px] text-ink-secondary font-mono">
                      <span>Space to flip / Click card</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleMastered(activeFlashcard.id);
                        }}
                        className={cn(
                          'px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 transition-all',
                          masteredCards[activeFlashcard.id]
                            ? 'bg-emerald-600 text-white'
                            : 'bg-canvas-recessed text-ink-secondary hover:text-ink-primary'
                        )}
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{masteredCards[activeFlashcard.id] ? 'Mastered' : 'Mark as Mastered'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between gap-4">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handlePrevCard}
                      disabled={currentCardIdx === 0}
                      className="gap-1.5 text-xs"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous Card</span>
                    </Button>

                    <span className="text-xs font-mono text-ink-secondary">
                      Mastered:{' '}
                      <strong className="text-emerald-700">
                        {Object.values(masteredCards).filter(Boolean).length} / {totalCards}
                      </strong>
                    </span>

                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleNextCard}
                      disabled={currentCardIdx === totalCards - 1}
                      className="gap-1.5 text-xs"
                    >
                      <span>Next Card</span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* TAB 3: ACTIVE RECALL PRACTICE QUIZ */}
              {activeTab === 'quiz' && (
                <div className="space-y-6">
                  {/* Quiz Scorecard Header */}
                  <div className="p-4 rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] shadow-sm flex items-center justify-between gap-4 flex-wrap">
                    <div>
                      <h4 className="font-display text-xl text-ink-primary font-normal">
                        Active Recall Concept Verification
                      </h4>
                      <p className="text-xs text-ink-secondary">
                        Test your comprehension against core lecture axioms.
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {quizSubmitted ? (
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-lg font-bold text-accent-500">
                            {correctCount} / {quizQuestions.length} Correct
                          </span>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => {
                              setSelectedAnswers({});
                              setQuizSubmitted(false);
                            }}
                            className="text-xs gap-1"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Retry</span>
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => setQuizSubmitted(true)}
                          disabled={Object.keys(selectedAnswers).length < quizQuestions.length}
                          className="text-xs font-semibold"
                        >
                          Submit & Check Answers
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Questions List */}
                  <div className="space-y-5">
                    {quizQuestions.map((q, qIdx) => {
                      const userSelected = selectedAnswers[q.id];
                      const isCorrect = userSelected === q.correctAnswerIndex;

                      return (
                        <div
                          key={q.id || qIdx}
                          className="p-5 rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.1)] shadow-sm space-y-4"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-mono text-xs font-bold text-accent-500">
                              Question {qIdx + 1} &bull; {q.topic}
                            </span>
                            {quizSubmitted && (
                              <span
                                className={cn(
                                  'font-mono text-[10px] font-bold px-2 py-0.5 rounded uppercase',
                                  isCorrect
                                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-500/30'
                                    : 'bg-rose-50 text-rose-800 border border-rose-500/30'
                                )}
                              >
                                {isCorrect ? 'Correct' : 'Incorrect'}
                              </span>
                            )}
                          </div>

                          <h4 className="font-semibold text-sm text-ink-primary leading-relaxed">
                            {q.question}
                          </h4>

                          {/* Options */}
                          <div className="space-y-2">
                            {q.options.map((opt, oIdx) => {
                              const isOptionSelected = userSelected === oIdx;
                              const isCorrectOption = oIdx === q.correctAnswerIndex;

                              let optionStyle =
                                'bg-canvas-base border-[rgba(13,37,61,0.12)] text-ink-body hover:border-accent-500';

                              if (quizSubmitted) {
                                if (isCorrectOption) {
                                  optionStyle =
                                    'bg-emerald-50 border-emerald-600 text-emerald-950 font-semibold ring-1 ring-emerald-600';
                                } else if (isOptionSelected && !isCorrectOption) {
                                  optionStyle =
                                    'bg-rose-50 border-rose-500 text-rose-950 line-through';
                                }
                              } else if (isOptionSelected) {
                                optionStyle =
                                  'bg-[#0D253D] text-white border-[#0D253D] font-medium shadow-sm';
                              }

                              return (
                                <button
                                  key={oIdx}
                                  type="button"
                                  onClick={() => handleSelectOption(q.id, oIdx)}
                                  disabled={quizSubmitted}
                                  className={cn(
                                    'w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start gap-3',
                                    optionStyle
                                  )}
                                >
                                  <span className="font-mono font-bold text-[11px] shrink-0">
                                    {String.fromCharCode(65 + oIdx)}.
                                  </span>
                                  <span className="leading-relaxed">{opt}</span>
                                </button>
                              );
                            })}
                          </div>

                          {/* Explanation (Shown when submitted) */}
                          {quizSubmitted && (
                            <div className="p-3.5 rounded-xl bg-canvas-recessed/60 border border-[rgba(13,37,61,0.08)] space-y-1 text-xs">
                              <span className="font-mono text-[10px] uppercase font-bold text-accent-500 block">
                                Conceptual Rationale:
                              </span>
                              <p className="text-ink-body leading-relaxed">{q.explanation}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 4: RAW JSON SPEC */}
              {activeTab === 'json' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-ink-secondary font-mono">
                    <span>STRUCTURED STUDY SUITE PAYLOAD (ZOD VALIDATED)</span>
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

      {/* BYOK Modal */}
      <ApiKeyModal
        isOpen={isByokModalOpen}
        onClose={() => setIsByokModalOpen(false)}
        settings={byokSettings}
        onSave={handleSaveByok}
      />
    </>
  );
}
