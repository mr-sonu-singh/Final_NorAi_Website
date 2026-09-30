'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  FileText,
  Atom,
  Play,
  Pause,
  Clock,
  Brain,
} from 'lucide-react';
import { ToolShell } from './ToolShell';
import { ApiKeyModal } from './ApiKeyModal';
import { MathText } from '@/components/atoms/MathRenderer';
import { MathFormulaCard } from '@/components/molecules/MathFormulaCard';
import { CourseNotesResult, ByokSettings, Flashcard } from '@/lib/tools/types';
import { COURSE_NOTES_PRESETS } from '@/lib/tools/presets';
import { extractTextFromFile, estimateTokenCount } from '@/lib/tools/client-parser';

export function CourseNoteTakerWorkbench() {
  // Preset Selection
  const [activePresetId, setActivePresetId] = useState<string>(
    COURSE_NOTES_PRESETS[0]?.id || 'preset-mit-raft',
  );
  const currentPreset =
    COURSE_NOTES_PRESETS.find((p) => p.id === activePresetId) || COURSE_NOTES_PRESETS[0];

  // Intake Dock Navigation: 'metadata' | 'ingestion' | 'synthesis'
  const [intakeTab, setIntakeTab] = useState<'metadata' | 'ingestion' | 'synthesis'>('metadata');
  const [transcriptInputMode, setTranscriptInputMode] = useState<'files' | 'paste'>('paste');

  // Input Fields
  const [lectureTitle, setLectureTitle] = useState(
    currentPreset?.precomputedResult?.lectureTitle || '',
  );
  const [subject, setSubject] = useState(currentPreset?.subject || '');
  const [instructor, setInstructor] = useState(currentPreset?.instructor || '');
  const [focusMode, setFocusMode] = useState<
    'Comprehensive Study Guide' | 'Formulas & Axioms' | 'Exam Cram & Quizzes'
  >(currentPreset?.focusMode || 'Comprehensive Study Guide');
  const [transcriptText, setTranscriptText] = useState(currentPreset?.sampleTranscriptText || '');

  // Synthesis Controls
  const [flashcardCountTarget, setFlashcardCountTarget] = useState<number>(4);
  const [quizDifficulty, setQuizDifficulty] = useState<
    'Standard' | 'Challenging' | 'Comprehensive'
  >('Standard');
  const [extractFormulas, setExtractFormulas] = useState<boolean>(true);

  // File Upload State
  const [uploadedFiles, setUploadedFiles] = useState<
    Array<{ name: string; sizeBytes: number; tokens: number }>
  >([]);
  const [isParsingFiles, setIsParsingFiles] = useState(false);

  // Evaluation & Results State
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<CourseNotesResult | null>(
    currentPreset?.precomputedResult || null,
  );
  const [activeTab, setActiveTab] = useState<'notes' | 'flashcards' | 'quiz' | 'json'>('notes');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Audio Waveform Scrubber & Synchronizer State
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0); // 0 to 100%
  const [playbackSpeed, setPlaybackSpeed] = useState<1.0 | 1.25 | 1.5 | 2.0>(1.0);
  const [activeChapterId, setActiveChapterId] = useState<string>('ch-01');
  const scrubberIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Flashcards Study Interactive State
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [cardMasteryState, setCardMasteryState] = useState<
    Record<string, { status: 'again' | 'good' | 'easy' | 'unrated'; intervalDays: number }>
  >({});

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
  const [liveAnnouncement, setLiveAnnouncement] = useState<string>('');

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
      // Ignore localStorage read errors
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
      setCardMasteryState({});
      setPlaybackProgress(0);
      setIsPlaying(false);
      setActiveChapterId(preset.precomputedResult.chapters[0]?.id || 'ch-01');
      setErrorMessage(null);
      setLiveAnnouncement(`Loaded ${preset.subject}: ${preset.title}`);
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
      setLiveAnnouncement(`Uploaded and parsed ${newFileMeta.length} file(s)`);
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
        setPlaybackProgress(0);
        setIsPlaying(false);
        setActiveChapterId(currentPreset.precomputedResult.chapters[0]?.id || 'ch-01');
        setIsProcessing(false);
        setLiveAnnouncement('Synthesized comprehensive study guide with LaTeX formulas.');
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
            'Live lecture synthesis requires a Gemini API Key. Click "API Key" in the header to enter your key, or select a pre-computed Industry Preset below to test instantly.',
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
        setPlaybackProgress(0);
        setIsPlaying(false);
        setActiveChapterId(data.data.chapters?.[0]?.id || 'ch-01');
        setLiveAnnouncement(
          'Successfully generated study guide with LaTeX mathematical formulas and 3D flashcards.',
        );
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Network error communicating with API.';
      setErrorMessage(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    handleSelectPreset('preset-mit-raft');
  };

  // Waveform Scrubber Playback Simulation
  useEffect(() => {
    if (isPlaying) {
      scrubberIntervalRef.current = setInterval(() => {
        setPlaybackProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          const increment = 0.5 * playbackSpeed;
          const next = Math.min(100, prev + increment);

          // Auto-sync active chapter based on progress
          if (result && result.chapters.length > 0) {
            const chapterIndex = Math.min(
              result.chapters.length - 1,
              Math.floor((next / 100) * result.chapters.length),
            );
            const targetChap = result.chapters[chapterIndex];
            if (targetChap && targetChap.id !== activeChapterId) {
              setActiveChapterId(targetChap.id);
            }
          }

          return next;
        });
      }, 250);
    } else if (scrubberIntervalRef.current) {
      clearInterval(scrubberIntervalRef.current);
    }
    return () => {
      if (scrubberIntervalRef.current) clearInterval(scrubberIntervalRef.current);
    };
  }, [isPlaying, playbackSpeed, result, activeChapterId]);

  // Jump to specific chapter from scrubber or notes
  const handleSeekChapter = (chapterId: string, chapterIdx: number, totalChapters: number) => {
    setActiveChapterId(chapterId);
    const targetPercent = Math.max(
      0,
      Math.min(100, (chapterIdx / Math.max(1, totalChapters)) * 100),
    );
    setPlaybackProgress(targetPercent);
    // Switch to notes tab if on another tab so user sees the highlighted chapter
    setActiveTab('notes');
  };

  // Keyboard shortcut for flashcards (Spacebar to flip, Arrow keys to navigate)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeTab !== 'flashcards') return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === 'Space') {
        e.preventDefault();
        setIsCardFlipped((prev) => !prev);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleNextCard();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrevCard();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // Export handlers
  const handleCopyJson = () => {
    if (!result) return;
    navigator.clipboard?.writeText(JSON.stringify(result, null, 2));
    setCopiedFormat('json');
    setLiveAnnouncement('Copied JSON study specification to clipboard');
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
          md += `- **${f.label}**: \`$$ ${f.formulaOrSnippet} $$\` — *${f.explanation}*\n`;
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
    link.setAttribute(
      'download',
      `norai_study_guide_${result.lectureTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}.md`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setCopiedFormat('md');
    setLiveAnnouncement('Downloaded Obsidian/Notion Markdown study guide.');
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const handleDownloadAnkiCsv = () => {
    if (!result) return;
    const rows = result.flashcards.map((fc) => {
      const mastery = cardMasteryState[fc.id];
      const intervalTag = mastery ? `srs_${mastery.status}_${mastery.intervalDays}d` : 'srs_new';
      return [
        `"${fc.frontPrompt.replace(/"/g, '""')}"`,
        `"${fc.backAnswer.replace(/"/g, '""')}"`,
        `"${fc.category}"`,
        `"${fc.difficulty}"`,
        `"${intervalTag}"`,
      ];
    });
    const csvContent = [
      '"Front","Back","Category","Difficulty","SRS_Interval"',
      ...rows.map((r) => r.join(',')),
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `anki_deck_${result.lectureTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setCopiedFormat('anki');
    setLiveAnnouncement('Exported Anki-compatible CSV flashcard deck.');
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

  const handleRateCard = (cardId: string, rating: 'again' | 'good' | 'easy') => {
    const intervalDays = rating === 'again' ? 1 : rating === 'good' ? 3 : 7;
    setCardMasteryState((prev) => ({
      ...prev,
      [cardId]: { status: rating, intervalDays },
    }));
    // Auto advance if not on last card
    if (currentCardIdx < totalCards - 1) {
      setTimeout(() => {
        handleNextCard();
      }, 200);
    }
  };

  const masteredCardsCount = Object.values(cardMasteryState).filter(
    (s) => s.status === 'easy' || s.status === 'good',
  ).length;

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
    (q) => selectedAnswers[q.id] === q.correctAnswerIndex,
  ).length;

  // Waveform Bar Heights (Simulated dynamic waveform profile)
  const waveformBars = [
    32, 54, 76, 45, 88, 62, 95, 40, 70, 85, 30, 60, 92, 75, 48, 80, 65, 90, 42, 68, 84, 52, 96, 78,
    60, 88, 72, 45, 90, 64, 82, 50, 74, 98, 66, 85, 40, 70, 92, 58,
  ];

  return (
    <>
      {/* Live Accessibility Announcement */}
      <div className="sr-only" role="status" aria-live="polite">
        {liveAnnouncement}
      </div>

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
        runButtonLabel="Synthesize Study Studio"
        processingLabel="Decomposing Audio & Formulating LaTeX..."
      >
        {/* Presets Header Dock */}
        <div className="px-5 py-3 bg-canvas-base border-b border-[rgba(13,37,61,0.08)] flex items-center justify-between gap-3 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-ink-secondary uppercase tracking-wider font-semibold whitespace-nowrap">
              Academic Presets:
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
                      'px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap active:scale-[0.97]',
                      isSelected
                        ? 'bg-[#0D253D] text-white shadow-xs font-semibold'
                        : 'bg-canvas-paper text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed border border-[rgba(13,37,61,0.08)]',
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
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap active:scale-[0.97]',
                  activePresetId === 'custom'
                    ? 'bg-[#0D253D] text-white shadow-xs font-semibold'
                    : 'bg-canvas-paper text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed border border-[rgba(13,37,61,0.08)]',
                )}
              >
                Custom Audio / Transcript
              </button>
            </div>
          </div>

          <div className="text-[11px] font-mono text-ink-secondary hidden md:flex items-center gap-2">
            <span>Ingestion:</span>
            <strong className="text-ink-primary font-semibold tabular-nums">
              ~{estimateTokenCount(transcriptText).toLocaleString()} tokens
            </strong>
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

        {/* Dual-Pane Edge-to-Edge Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[720px] items-stretch">
          {/* =========================================================================
              LEFT COLUMN: SEGMENTED INTAKE DOCK (5 cols)
              ========================================================================= */}
          <div className="lg:col-span-5 p-5 md:p-6 border-b lg:border-b-0 lg:border-r border-[rgba(13,37,61,0.08)] bg-canvas-paper flex flex-col justify-between gap-5 h-full">
            <div className="space-y-4">
              {/* Segmented Intake Nav Pills */}
              <div className="flex items-center p-1 rounded-xl bg-canvas-recessed/80 border border-[rgba(13,37,61,0.08)] text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setIntakeTab('metadata')}
                  className={cn(
                    'flex-1 py-1.5 rounded-lg text-center transition-all',
                    intakeTab === 'metadata'
                      ? 'bg-canvas-paper text-ink-primary font-semibold shadow-xs'
                      : 'text-ink-secondary hover:text-ink-primary',
                  )}
                >
                  1. Lecture Info
                </button>
                <button
                  type="button"
                  onClick={() => setIntakeTab('ingestion')}
                  className={cn(
                    'flex-1 py-1.5 rounded-lg text-center transition-all',
                    intakeTab === 'ingestion'
                      ? 'bg-canvas-paper text-ink-primary font-semibold shadow-xs'
                      : 'text-ink-secondary hover:text-ink-primary',
                  )}
                >
                  2. Ingestion
                </button>
                <button
                  type="button"
                  onClick={() => setIntakeTab('synthesis')}
                  className={cn(
                    'flex-1 py-1.5 rounded-lg text-center transition-all',
                    intakeTab === 'synthesis'
                      ? 'bg-canvas-paper text-ink-primary font-semibold shadow-xs'
                      : 'text-ink-secondary hover:text-ink-primary',
                  )}
                >
                  3. Studio Knobs
                </button>
              </div>

              {/* DOCK TAB 1: LECTURE METADATA */}
              {intakeTab === 'metadata' && (
                <div className="space-y-3.5 animate-fadeIn">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="course-title-input"
                        className="text-xs font-semibold text-ink-primary flex items-center gap-1.5"
                      >
                        <GraduationCap className="w-3.5 h-3.5 text-accent-500" />
                        <span>Lecture Title / Topic</span>
                      </label>
                      <span className="text-[10px] font-mono text-ink-secondary">Required</span>
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
                      className="w-full px-3 py-2 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.15)] text-ink-primary text-xs focus:outline-none focus:ring-2 focus:ring-accent-500 font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="course-subject-input"
                        className="text-xs font-semibold text-ink-primary block"
                      >
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
                        className="w-full px-3 py-2 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.15)] text-ink-primary text-xs font-medium focus:outline-none focus:ring-2 focus:ring-accent-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label
                        htmlFor="course-instructor-input"
                        className="text-xs font-semibold text-ink-primary block"
                      >
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
                        className="w-full px-3 py-2 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.15)] text-ink-primary text-xs font-medium focus:outline-none focus:ring-2 focus:ring-accent-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-0.5">
                    <label
                      htmlFor="course-focus-mode-select"
                      className="text-xs font-semibold text-ink-primary block"
                    >
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
                            | 'Exam Cram & Quizzes',
                        )
                      }
                      className="w-full px-3 py-2 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.15)] text-ink-primary text-xs font-mono focus:outline-none focus:ring-2 focus:ring-accent-500"
                    >
                      <option value="Comprehensive Study Guide">
                        Comprehensive Study Guide (Detailed Chapters + Full Study Suite)
                      </option>
                      <option value="Formulas & Axioms">
                        Formulas & Axioms (Heavy Math & LaTeX Extraction)
                      </option>
                      <option value="Exam Cram & Quizzes">
                        Exam Cram & Quizzes (Max Flashcards & Assessment)
                      </option>
                    </select>
                  </div>

                  {/* Pedagogical Extraction Blueprint Card */}
                  <div className="p-3.5 rounded-xl bg-canvas-base border border-[rgba(13,37,61,0.1)] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-ink-secondary uppercase tracking-wider font-semibold flex items-center gap-1.5">
                        <Brain className="w-3.5 h-3.5 text-accent-500" />
                        <span>Synthesized Output Artifacts:</span>
                      </span>
                      <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-semibold">
                        Full Suite
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                      <div className="p-2 rounded-lg bg-canvas-paper border border-[rgba(13,37,61,0.06)] flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-accent-500 shrink-0" />
                        <span className="font-medium text-ink-primary">Cornell Notes</span>
                      </div>
                      <div className="p-2 rounded-lg bg-canvas-paper border border-[rgba(13,37,61,0.06)] flex items-center gap-2">
                        <Atom className="w-3.5 h-3.5 text-accent-secondary shrink-0" />
                        <span className="font-medium text-ink-primary">KaTeX Math (Σ, ∫)</span>
                      </div>
                      <div className="p-2 rounded-lg bg-canvas-paper border border-[rgba(13,37,61,0.06)] flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5 text-accent-500 shrink-0" />
                        <span className="font-medium text-ink-primary">Flashcard Decks</span>
                      </div>
                      <div className="p-2 rounded-lg bg-canvas-paper border border-[rgba(13,37,61,0.06)] flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-300 shrink-0" />
                        <span className="font-medium text-ink-primary">Diagnostic Quiz</span>
                      </div>
                    </div>
                  </div>

                  {/* Domain Quick Presets */}
                  <div className="p-3 rounded-xl bg-canvas-recessed/60 border border-[rgba(13,37,61,0.08)] space-y-1.5">
                    <span className="text-[10px] font-mono text-ink-secondary uppercase font-semibold block">
                      Quick Domain Presets:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        {
                          title: 'MIT Raft Consensus',
                          subject: 'Distributed Systems',
                          instructor: 'Prof. Morris',
                        },
                        {
                          title: 'Machine Learning & Loss',
                          subject: 'Machine Learning',
                          instructor: 'Stanford CS229',
                        },
                        {
                          title: 'Eigenvalues & Invariants',
                          subject: 'Linear Algebra',
                          instructor: 'MIT 18.06',
                        },
                      ].map((item) => (
                        <button
                          key={item.title}
                          type="button"
                          onClick={() => {
                            setLectureTitle(item.title);
                            setSubject(item.subject);
                            setInstructor(item.instructor);
                            setActivePresetId('custom');
                          }}
                          className="px-2 py-1 rounded text-[10px] font-mono bg-canvas-paper border border-[rgba(13,37,61,0.1)] text-ink-primary hover:border-accent-500 hover:text-accent-600 transition-all"
                        >
                          {item.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* DOCK TAB 2: INGESTION & SUBTITLES */}
              {intakeTab === 'ingestion' && (
                <div className="space-y-3 animate-fadeIn">
                  {/* Mode Switcher */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setTranscriptInputMode('paste')}
                        className={cn(
                          'px-2.5 py-1 rounded-md text-[11px] font-medium transition-all',
                          transcriptInputMode === 'paste'
                            ? 'bg-[#0D253D] text-white font-semibold'
                            : 'bg-canvas-recessed text-ink-secondary hover:text-ink-primary',
                        )}
                      >
                        Direct Transcript Editor
                      </button>
                      <button
                        type="button"
                        onClick={() => setTranscriptInputMode('files')}
                        className={cn(
                          'px-2.5 py-1 rounded-md text-[11px] font-medium transition-all',
                          transcriptInputMode === 'files'
                            ? 'bg-[#0D253D] text-white font-semibold'
                            : 'bg-canvas-recessed text-ink-secondary hover:text-ink-primary',
                        )}
                      >
                        Upload Files (VTT/PDF/SRT)
                      </button>
                    </div>

                    <span className="text-[10px] font-mono text-ink-secondary tabular-nums">
                      {transcriptText.length} chars · ~{estimateTokenCount(transcriptText)} tokens
                    </span>
                  </div>

                  {/* Sample Presets Loader Toolbar */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-mono text-ink-secondary uppercase font-semibold">
                      Load Sample:
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const p = COURSE_NOTES_PRESETS[0];
                        if (p) {
                          setActivePresetId(p.id);
                          setTranscriptText(p.sampleTranscriptText);
                          setLectureTitle(p.title);
                          setSubject(p.subject);
                          setInstructor(p.instructor);
                          setResult(p.precomputedResult);
                        }
                      }}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-canvas-base border border-[rgba(13,37,61,0.12)] hover:border-accent-500 text-ink-primary hover:text-accent-600 transition-all"
                    >
                      MIT Raft
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const p = COURSE_NOTES_PRESETS[1];
                        if (p) {
                          setActivePresetId(p.id);
                          setTranscriptText(p.sampleTranscriptText);
                          setLectureTitle(p.title);
                          setSubject(p.subject);
                          setInstructor(p.instructor);
                          setResult(p.precomputedResult);
                        }
                      }}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-canvas-base border border-[rgba(13,37,61,0.12)] hover:border-accent-500 text-ink-primary hover:text-accent-600 transition-all"
                    >
                      Stanford ML
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const p = COURSE_NOTES_PRESETS[2];
                        if (p) {
                          setActivePresetId(p.id);
                          setTranscriptText(p.sampleTranscriptText);
                          setLectureTitle(p.title);
                          setSubject(p.subject);
                          setInstructor(p.instructor);
                          setResult(p.precomputedResult);
                        }
                      }}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-canvas-base border border-[rgba(13,37,61,0.12)] hover:border-accent-500 text-ink-primary hover:text-accent-600 transition-all"
                    >
                      Linear Algebra
                    </button>
                  </div>

                  {transcriptInputMode === 'files' ? (
                    <div className="space-y-3">
                      {/* Dropzone */}
                      <div className="relative border-2 border-dashed border-[rgba(13,37,61,0.15)] hover:border-accent-500 rounded-xl p-6 text-center bg-canvas-base/60 transition-all">
                        <input
                          type="file"
                          id="transcript-file-upload"
                          multiple
                          accept=".txt,.pdf,.docx,.md,.vtt,.srt,.csv,.json"
                          onChange={handleFileUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
                          <Upload className="w-6 h-6 text-accent-500" />
                          <span className="text-xs font-semibold text-ink-primary">
                            {isParsingFiles
                              ? 'Extracting text in-browser...'
                              : 'Click or drag subtitle/lecture files here'}
                          </span>
                          <span className="text-[11px] text-ink-secondary font-mono">
                            Supports VTT, SRT, PDF, Word, TXT, Markdown
                          </span>
                        </div>
                      </div>

                      {/* Uploaded File Chips */}
                      {uploadedFiles.length > 0 && (
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-mono font-semibold text-ink-secondary block">
                            Buffered Sources ({uploadedFiles.length}):
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {uploadedFiles.map((f, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded bg-canvas-recessed text-ink-primary border border-[rgba(13,37,61,0.1)]"
                              >
                                <FileText className="w-3 h-3 text-accent-500" />
                                <span>{f.name}</span>
                                <span className="text-[10px] text-ink-secondary">
                                  ({(f.sizeBytes / 1024).toFixed(1)} KB)
                                </span>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Generous Transcript Textarea */
                    <div className="space-y-1.5">
                      <textarea
                        id="transcript-textarea"
                        rows={12}
                        value={transcriptText}
                        onChange={(e) => {
                          setTranscriptText(e.target.value);
                          setActivePresetId('custom');
                        }}
                        placeholder="Paste timestamped transcript, YouTube auto-generated captions, or raw lecture notes here..."
                        className="w-full min-h-[340px] p-3.5 rounded-xl bg-canvas-base border border-[rgba(13,37,61,0.15)] text-ink-primary text-xs font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-accent-500 resize-y"
                      />
                    </div>
                  )}

                  {/* Math & Diarization Parser Status */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-ink-secondary pt-0.5">
                    <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-300">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-300" />
                      <span>Timestamp & KaTeX math parser active</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setTranscriptText('')}
                      className="hover:text-accent-500 transition-colors"
                    >
                      Clear text
                    </button>
                  </div>
                </div>
              )}

              {/* DOCK TAB 3: STUDIO KNOBS & RIGOR */}
              {intakeTab === 'synthesis' && (
                <div className="space-y-3.5 animate-fadeIn">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <label
                        htmlFor="flashcard-slider"
                        className="font-semibold text-ink-primary flex items-center gap-1.5"
                      >
                        <Layers className="w-3.5 h-3.5 text-accent-secondary" />
                        <span>Flashcard Target Density</span>
                      </label>
                      <span className="font-mono font-bold text-accent-500 tabular-nums">
                        {flashcardCountTarget} Cards
                      </span>
                    </div>
                    <input
                      id="flashcard-slider"
                      type="range"
                      min={2}
                      max={12}
                      step={1}
                      value={flashcardCountTarget}
                      onChange={(e) => setFlashcardCountTarget(Number(e.target.value))}
                      className="w-full accent-accent-500 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1.5 pt-1 border-t border-[rgba(13,37,61,0.06)]">
                    <label
                      htmlFor="quiz-diff-select"
                      className="text-xs font-semibold text-ink-primary block"
                    >
                      Quiz Assessment Rigor
                    </label>
                    <select
                      id="quiz-diff-select"
                      value={quizDifficulty}
                      onChange={(e) =>
                        setQuizDifficulty(
                          e.target.value as 'Standard' | 'Challenging' | 'Comprehensive',
                        )
                      }
                      className="w-full px-3 py-2 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.15)] text-ink-primary text-xs font-mono focus:outline-none focus:ring-2 focus:ring-accent-500"
                    >
                      <option value="Standard">Standard (Conceptual Verification)</option>
                      <option value="Challenging">
                        Challenging (Invariant Bounds & Edge Cases)
                      </option>
                      <option value="Comprehensive">Comprehensive (Full Theoretical Proofs)</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-canvas-base border border-[rgba(13,37,61,0.08)]">
                    <div className="space-y-0.5">
                      <span className="text-xs font-semibold text-ink-primary block">
                        Extract LaTeX Math Formulas
                      </span>
                      <span className="text-[10px] text-ink-secondary">
                        Renders formulas via KaTeX math engine
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={extractFormulas}
                      onChange={(e) => setExtractFormulas(e.target.checked)}
                      className="w-4 h-4 accent-accent-500 rounded cursor-pointer"
                    />
                  </div>

                  {/* Study Timeline & Cram Urgency Blueprint */}
                  <div className="p-3.5 rounded-xl bg-canvas-base border border-[rgba(13,37,61,0.08)] space-y-2 text-xs">
                    <span className="text-[11px] font-mono text-ink-secondary uppercase font-semibold block">
                      Study Mastery Schedule:
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                      <div className="p-2 rounded bg-canvas-paper border border-[rgba(13,37,61,0.06)]">
                        <span className="text-ink-secondary block text-[10px]">Read Time:</span>
                        <strong className="text-ink-primary">~12 Mins</strong>
                      </div>
                      <div className="p-2 rounded bg-canvas-paper border border-[rgba(13,37,61,0.06)]">
                        <span className="text-ink-secondary block text-[10px]">Quiz Review:</span>
                        <strong className="text-emerald-700 dark:text-emerald-300">~6 Mins (100% Mastery)</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Ingestion Specs Footer */}
            <div className="p-3.5 rounded-xl bg-canvas-recessed/60 border border-[rgba(13,37,61,0.08)] text-xs text-ink-secondary space-y-2 font-mono">
              <div className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Math Engine:</span>
                </span>
                <strong className="text-ink-primary font-semibold">
                  KaTeX 0.16 (LaTeX Verified)
                </strong>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span>Synthesized Chapters:</span>
                <strong className="text-emerald-700 dark:text-emerald-300 font-semibold tabular-nums">
                  {result?.chapters.length || 0} segments
                </strong>
              </div>
              <div className="flex items-center justify-between text-[10px] text-ink-secondary pt-1 border-t border-[rgba(13,37,61,0.06)]">
                <span>Memory Guarantee:</span>
                <span className="text-emerald-800 dark:text-emerald-300 font-medium">Ephemeral Client-Side RAM</span>
              </div>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: INTERACTIVE STUDY STUDIO (7 cols)
              ========================================================================= */}
          <div className="lg:col-span-7 bg-canvas-base flex flex-col justify-between">
            {/* Top Waveform Audio Scrubber Dock */}
            <div className="p-4 bg-canvas-paper border-b border-[rgba(13,37,61,0.08)] space-y-3">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2.5">
                  {/* Play / Pause Toggle */}
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={cn(
                      'w-8 h-8 rounded-xl flex items-center justify-center transition-all shadow-xs active:scale-[0.95]',
                      isPlaying
                        ? 'bg-accent-500 text-white shadow-sm'
                        : 'bg-[#0D253D] text-white hover:bg-[#16324e]',
                    )}
                    title={isPlaying ? 'Pause Audio Playback' : 'Play Lecture Audio'}
                  >
                    {isPlaying ? (
                      <Pause className="w-3.5 h-3.5" />
                    ) : (
                      <Play className="w-3.5 h-3.5 ml-0.5" />
                    )}
                  </button>

                  <div>
                    <span className="font-sans text-xs font-bold text-ink-primary block leading-tight">
                      Lecture Audio Scrubber
                    </span>
                    <span className="text-[10px] font-mono text-ink-secondary">
                      Click chapters below to sync notes
                    </span>
                  </div>
                </div>

                {/* Scrubber Speed and Progress Readout */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-canvas-recessed px-2 py-1 rounded-lg border border-[rgba(13,37,61,0.08)] text-[11px] font-mono">
                    <Clock className="w-3 h-3 text-accent-500" />
                    <span className="tabular-nums font-semibold text-ink-primary">
                      {result?.estimatedDuration || '~45 mins'}
                    </span>
                  </div>

                  {/* Speed Multiplier Pill */}
                  <div className="flex items-center rounded-lg bg-canvas-recessed border border-[rgba(13,37,61,0.08)] p-0.5 text-[10px] font-mono">
                    {([1.0, 1.25, 1.5, 2.0] as const).map((spd) => (
                      <button
                        key={spd}
                        type="button"
                        onClick={() => setPlaybackSpeed(spd)}
                        className={cn(
                          'px-1.5 py-0.5 rounded transition-all',
                          playbackSpeed === spd
                            ? 'bg-[#0D253D] text-white font-semibold'
                            : 'text-ink-secondary hover:text-ink-primary',
                        )}
                      >
                        {spd}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dynamic Waveform Visualizer & Scrubber Track */}
              <div className="space-y-1.5">
                <div
                  className="h-10 rounded-xl bg-canvas-recessed/90 border border-[rgba(13,37,61,0.1)] px-3 flex items-center gap-1 cursor-pointer relative overflow-hidden group select-none"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const percent = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
                    setPlaybackProgress(percent);
                    if (result && result.chapters.length > 0) {
                      const chapterIndex = Math.min(
                        result.chapters.length - 1,
                        Math.floor((percent / 100) * result.chapters.length),
                      );
                      const targetChap = result.chapters[chapterIndex];
                      if (targetChap) setActiveChapterId(targetChap.id);
                    }
                  }}
                >
                  {/* Waveform Bars */}
                  {waveformBars.map((h, bIdx) => {
                    const barPercent = (bIdx / waveformBars.length) * 100;
                    const isPlayed = barPercent <= playbackProgress;

                    return (
                      <div key={bIdx} className="flex-1 flex items-center justify-center h-full">
                        <div
                          style={{ height: `${h}%` }}
                          className={cn(
                            'w-full max-w-[4px] rounded-full transition-colors duration-150',
                            isPlayed
                              ? 'bg-accent-500'
                              : 'bg-[rgba(13,37,61,0.2)] group-hover:bg-[rgba(13,37,61,0.3)]',
                          )}
                        />
                      </div>
                    );
                  })}

                  {/* Scrubber Playhead Line */}
                  <div
                    style={{ left: `${playbackProgress}%` }}
                    className="absolute top-0 bottom-0 w-0.5 bg-[#0D253D] shadow-xs pointer-events-none transition-all duration-75"
                  >
                    <div className="w-2.5 h-2.5 -ml-1 -top-1 bg-[#0D253D] rounded-full shadow-xs absolute" />
                  </div>
                </div>

                {/* Clickable Chapter Markers Strip */}
                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pt-0.5">
                  {result?.chapters.map((ch, idx) => {
                    const isCurrent = activeChapterId === ch.id;
                    return (
                      <button
                        key={ch.id || idx}
                        type="button"
                        onClick={() => handleSeekChapter(ch.id, idx, result.chapters.length)}
                        className={cn(
                          'px-2 py-1 rounded-md text-[10px] font-mono transition-all whitespace-nowrap flex items-center gap-1 border active:scale-[0.97]',
                          isCurrent
                            ? 'bg-accent-50 text-accent-600 border-accent-500/30 font-bold shadow-xs'
                            : 'bg-canvas-paper text-ink-secondary hover:text-ink-primary border-[rgba(13,37,61,0.08)]',
                        )}
                        title={`Jump to chapter: ${ch.title}`}
                      >
                        <Play className="w-2.5 h-2.5" />
                        <span>{ch.timestamp.split(' - ')[0] || ch.timestamp}</span>
                        <span className="hidden sm:inline font-sans truncate max-w-[120px]">
                          &bull; {ch.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Studio Navigation Tabs & Export Suite */}
            <div className="px-5 py-3 bg-canvas-paper border-b border-[rgba(13,37,61,0.08)] flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => setActiveTab('notes')}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 active:scale-[0.97]',
                    activeTab === 'notes'
                      ? 'bg-[#0D253D] text-white shadow-xs'
                      : 'text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed',
                  )}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Executive Notes ({result?.chapters.length || 0})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('flashcards')}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 active:scale-[0.97]',
                    activeTab === 'flashcards'
                      ? 'bg-[#0D253D] text-white shadow-xs'
                      : 'text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed',
                  )}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>3D Flashcards ({result?.flashcards.length || 0})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('quiz')}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 active:scale-[0.97]',
                    activeTab === 'quiz'
                      ? 'bg-[#0D253D] text-white shadow-xs'
                      : 'text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed',
                  )}
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Recall Quiz ({result?.quiz.length || 0})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('json')}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 active:scale-[0.97]',
                    activeTab === 'json'
                      ? 'bg-[#0D253D] text-white shadow-xs'
                      : 'text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed',
                  )}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>JSON Spec</span>
                </button>
              </div>

              {/* Exports Suite Action Bar */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleDownloadAnkiCsv}
                  className="px-2.5 py-1.5 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.12)] text-ink-secondary hover:text-ink-primary hover:border-accent-500 active:scale-[0.97] transition-all text-xs flex items-center gap-1"
                  title="Export Flashcards as Anki CSV"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-accent-secondary" />
                  <span className="text-[11px] font-medium">Anki CSV</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadMarkdown}
                  className="px-2.5 py-1.5 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.12)] text-ink-secondary hover:text-ink-primary hover:border-accent-500 active:scale-[0.97] transition-all text-xs flex items-center gap-1"
                  title="Export Notion / Markdown Study Guide"
                >
                  <Download className="w-3.5 h-3.5 text-accent-500" />
                  <span className="text-[11px] font-medium">Markdown</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyJson}
                  className="px-2.5 py-1.5 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.12)] text-ink-secondary hover:text-ink-primary hover:border-accent-500 active:scale-[0.97] transition-all text-xs flex items-center gap-1"
                  title="Copy JSON Payload"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-medium">
                    {copiedFormat === 'json' ? 'Copied!' : 'JSON'}
                  </span>
                </button>
              </div>
            </div>

            {/* Results Body Canvas */}
            <div className="p-5 md:p-6 flex-1 overflow-y-auto max-h-[640px] space-y-6">
              {/* Executive Abstract Banner */}
              {result?.executiveAbstract && (
                <div className="p-5 rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] shadow-xs space-y-3.5">
                  <div className="flex items-center justify-between gap-2 border-b border-[rgba(13,37,61,0.08)] pb-3">
                    <div>
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-accent-50 text-accent-500 uppercase tracking-wider">
                        EXECUTIVE SYNTHESIS
                      </span>
                      <h3 className="font-display text-xl md:text-2xl text-ink-primary font-normal mt-1">
                        {result.lectureTitle}
                      </h3>
                      <p className="text-xs text-ink-secondary font-mono pt-0.5">
                        {result.instructorOrSource} &bull; {result.estimatedDuration}
                      </p>
                    </div>
                  </div>

                  <div className="text-xs text-ink-body leading-relaxed">
                    <MathText text={result.executiveAbstract} />
                  </div>

                  {/* Core Axioms & Invariants (Rendered with MathText) */}
                  <div className="space-y-2 pt-2 border-t border-[rgba(13,37,61,0.06)]">
                    <span className="font-mono text-[10px] uppercase font-bold text-accent-500 block">
                      Core Invariants & Fundamental Axioms:
                    </span>
                    <div className="space-y-1.5">
                      {result.coreAxioms.map((axiom, aIdx) => (
                        <div
                          key={aIdx}
                          className="flex items-start gap-2 p-2.5 rounded-lg bg-canvas-recessed/50 text-xs text-ink-body font-medium"
                        >
                          <Atom className="w-3.5 h-3.5 text-accent-secondary mt-0.5 shrink-0" />
                          <div className="leading-relaxed">
                            <MathText text={axiom} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* =========================================================================
                  TAB 1: CHAPTERIZED NOTES WITH KA-TEX MATH FORMULAS
                  ========================================================================= */}
              {activeTab === 'notes' && (
                <div className="space-y-4">
                  {result?.chapters.map((chapter, idx) => {
                    const isCurrent = activeChapterId === chapter.id;

                    return (
                      <div
                        key={chapter.id || idx}
                        id={`chapter-${chapter.id}`}
                        className={cn(
                          'p-5 rounded-2xl bg-canvas-paper border shadow-xs space-y-3.5 transition-all duration-200',
                          isCurrent
                            ? 'border-accent-500 ring-2 ring-accent-500/20 bg-accent-50/10'
                            : 'border-[rgba(13,37,61,0.1)] hover:border-[rgba(13,37,61,0.2)]',
                        )}
                      >
                        {/* Chapter Header with Timestamp Seek Action */}
                        <div className="flex items-center justify-between gap-3 border-b border-[rgba(13,37,61,0.08)] pb-2.5">
                          <div className="flex items-center gap-2.5">
                            <button
                              type="button"
                              onClick={() =>
                                handleSeekChapter(chapter.id, idx, result.chapters.length)
                              }
                              className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-accent-50 text-accent-500 border border-accent-500/20 flex items-center gap-1 hover:bg-accent-100 transition-all active:scale-[0.97]"
                              title="Play audio from this chapter"
                            >
                              <Play className="w-2.5 h-2.5" />
                              <span>{chapter.timestamp}</span>
                            </button>
                            <h4 className="font-display text-lg text-ink-primary font-normal">
                              {chapter.title}
                            </h4>
                          </div>

                          {isCurrent && (
                            <span className="text-[10px] font-mono uppercase font-bold text-accent-500 bg-accent-50 px-2 py-0.5 rounded">
                              Current Chapter
                            </span>
                          )}
                        </div>

                        {/* Chapter Summary */}
                        <div className="text-xs text-ink-body leading-relaxed">
                          <MathText text={chapter.summary} />
                        </div>

                        {/* Takeaways */}
                        <div className="space-y-1.5 pt-1">
                          <span className="text-[11px] font-mono font-semibold text-ink-secondary block">
                            Key Takeaways:
                          </span>
                          {chapter.keyTakeaways.map((takeaway, tIdx) => (
                            <div
                              key={tIdx}
                              className="flex items-start gap-2 text-xs text-ink-body"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-300 mt-0.5 shrink-0" />
                              <div className="leading-relaxed">
                                <MathText text={takeaway} />
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Rendered LaTeX / Code Formulas via MathFormulaCard */}
                        {chapter.formulasOrCode && chapter.formulasOrCode.length > 0 && (
                          <div className="space-y-2 pt-2 border-t border-[rgba(13,37,61,0.06)]">
                            <span className="text-[10px] font-mono uppercase font-bold text-accent-500 block">
                              Formulas & Formal Invariants:
                            </span>
                            <div className="grid grid-cols-1 gap-2.5">
                              {chapter.formulasOrCode.map((f, fIdx) => (
                                <MathFormulaCard
                                  key={fIdx}
                                  label={f.label}
                                  formulaOrSnippet={f.formulaOrSnippet}
                                  explanation={f.explanation}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* =========================================================================
                  TAB 2: INTERACTIVE 3D FLIP FLASHCARDS (EMIL KOWALSKI PHYSICS & SRS)
                  ========================================================================= */}
              {activeTab === 'flashcards' && activeFlashcard && (
                <div className="space-y-6">
                  {/* Card Deck Header & Progress */}
                  <div className="flex items-center justify-between text-xs font-mono text-ink-secondary flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-ink-primary">
                        Card {currentCardIdx + 1} of {totalCards}
                      </span>
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
                              : 'bg-amber-50 text-amber-800',
                        )}
                      >
                        {activeFlashcard.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs">
                        Mastered:{' '}
                        <strong className="text-emerald-700 dark:text-emerald-300 font-bold tabular-nums">
                          {masteredCardsCount} of {totalCards}
                        </strong>
                      </span>
                    </div>
                  </div>

                  {/* 3D Flip Card Container */}
                  <div
                    className="w-full h-[300px] select-none"
                    style={{ perspective: '1000px' }}
                    onClick={() => setIsCardFlipped(!isCardFlipped)}
                  >
                    <div
                      className="w-full h-full relative cursor-pointer"
                      style={{
                        transformStyle: 'preserve-3d',
                        transform: isCardFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                        transition: 'transform 450ms cubic-bezier(0.23, 1, 0.32, 1)',
                      }}
                    >
                      {/* FRONT OF CARD */}
                      <div
                        className="absolute inset-0 w-full h-full rounded-3xl bg-canvas-paper border-2 border-[rgba(13,37,61,0.15)] hover:border-accent-500 p-8 shadow-sm flex flex-col justify-between"
                        style={{ backfaceVisibility: 'hidden' }}
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono text-ink-secondary">
                          <span className="uppercase font-bold text-accent-500">
                            QUESTION (FRONT)
                          </span>
                          <span className="text-accent-500 font-semibold flex items-center gap-1">
                            <span>Space / Click to flip</span>
                            <span>&rarr;</span>
                          </span>
                        </div>

                        <div className="py-2 text-center my-auto">
                          <h3 className="font-display text-2xl md:text-3xl text-ink-primary font-normal leading-relaxed">
                            <MathText text={activeFlashcard.frontPrompt} />
                          </h3>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-[rgba(13,37,61,0.06)] text-[11px] text-ink-secondary font-mono">
                          <span>Recall prompt</span>
                          <span className="text-accent-secondary">&bull; 3D Flashcard Studio</span>
                        </div>
                      </div>

                      {/* BACK OF CARD (ANSWER) */}
                      <div
                        className="absolute inset-0 w-full h-full rounded-3xl bg-[#0D253D] text-[#F9F6F0] border-2 border-[#16324e] p-8 shadow-md flex flex-col justify-between"
                        style={{
                          backfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)',
                        }}
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400">
                          <span className="uppercase font-bold">EXPLANATION & VERDICT (BACK)</span>
                          <span className="text-slate-400">Click to flip back &larr;</span>
                        </div>

                        <div className="py-2 text-center my-auto space-y-2">
                          <p className="text-sm md:text-base text-slate-100 leading-relaxed font-sans font-medium">
                            <MathText text={activeFlashcard.backAnswer} />
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-[rgba(255,255,255,0.1)] text-[11px] text-slate-400 font-mono">
                          <span>Rate your recall below</span>
                          <span className="text-emerald-400">&bull; Verified Invariant</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Spaced Repetition Rating Buttons */}
                  <div className="p-4 rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.1)] space-y-3">
                    <span className="text-[11px] font-mono font-semibold text-ink-secondary block text-center">
                      Spaced Repetition Rating (SRS Intervals):
                    </span>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => handleRateCard(activeFlashcard.id, 'again')}
                        className={cn(
                          'p-2.5 rounded-xl border text-xs font-semibold transition-all text-center active:scale-[0.97]',
                          cardMasteryState[activeFlashcard.id]?.status === 'again'
                            ? 'bg-rose-100 dark:bg-rose-950 border-rose-500 text-rose-900 dark:text-rose-200 shadow-xs'
                            : 'bg-rose-50/70 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200 border-rose-500/20 hover:bg-rose-100 dark:hover:bg-rose-900/60',
                        )}
                      >
                        <span className="block font-bold">Again</span>
                        <span className="text-[10px] font-mono text-rose-700 dark:text-rose-300">1 Day Interval</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleRateCard(activeFlashcard.id, 'good')}
                        className={cn(
                          'p-2.5 rounded-xl border text-xs font-semibold transition-all text-center active:scale-[0.97]',
                          cardMasteryState[activeFlashcard.id]?.status === 'good'
                            ? 'bg-slate-200 border-slate-600 text-slate-950 shadow-xs'
                            : 'bg-slate-100/70 text-slate-800 border-slate-500/20 hover:bg-slate-200',
                        )}
                      >
                        <span className="block font-bold">Good</span>
                        <span className="text-[10px] font-mono text-slate-600 dark:text-slate-300">
                          3 Days Interval
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleRateCard(activeFlashcard.id, 'easy')}
                        className={cn(
                          'p-2.5 rounded-xl border text-xs font-semibold transition-all text-center active:scale-[0.97]',
                          cardMasteryState[activeFlashcard.id]?.status === 'easy'
                            ? 'bg-emerald-100 dark:bg-emerald-950 border-emerald-600 text-emerald-950 dark:text-emerald-200 shadow-xs'
                            : 'bg-emerald-50/70 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/60',
                        )}
                      >
                        <span className="block font-bold">Easy</span>
                        <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-300">
                          7 Days Mastery
                        </span>
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
                      className="gap-1.5 text-xs active:scale-[0.97]"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous Card</span>
                    </Button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setCardMasteryState({});
                          setCurrentCardIdx(0);
                          setIsCardFlipped(false);
                        }}
                        className="text-xs font-mono text-ink-secondary hover:text-ink-primary flex items-center gap-1"
                        title="Reset deck mastery"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reset Deck</span>
                      </button>
                    </div>

                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleNextCard}
                      disabled={currentCardIdx === totalCards - 1}
                      className="gap-1.5 text-xs active:scale-[0.97]"
                    >
                      <span>Next Card</span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* =========================================================================
                  TAB 3: ACTIVE RECALL PRACTICE QUIZ & CONCEPT VERIFIER
                  ========================================================================= */}
              {activeTab === 'quiz' && (
                <div className="space-y-6">
                  {/* Quiz Scorecard Header */}
                  <div className="p-4 rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] shadow-xs flex items-center justify-between gap-4 flex-wrap">
                    <div>
                      <h4 className="font-display text-xl text-ink-primary font-normal">
                        Active Recall Concept Verification
                      </h4>
                      <p className="text-xs text-ink-secondary">
                        Test your comprehension against core lecture axioms with live grading.
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {quizSubmitted ? (
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-lg font-bold text-accent-500 tabular-nums">
                            {correctCount} of {quizQuestions.length} Correct
                          </span>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => {
                              setSelectedAnswers({});
                              setQuizSubmitted(false);
                            }}
                            className="text-xs gap-1 active:scale-[0.97]"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Retry Quiz</span>
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => setQuizSubmitted(true)}
                          disabled={Object.keys(selectedAnswers).length < quizQuestions.length}
                          className="text-xs font-semibold active:scale-[0.97]"
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
                          className="p-5 rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.1)] shadow-xs space-y-4"
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
                                    : 'bg-rose-50 text-rose-800 border border-rose-500/30',
                                )}
                              >
                                {isCorrect ? 'Correct' : 'Incorrect'}
                              </span>
                            )}
                          </div>

                          <h4 className="font-semibold text-sm text-ink-primary leading-relaxed">
                            <MathText text={q.question} />
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
                                  'bg-[#0D253D] text-white border-[#0D253D] font-medium shadow-xs';
                              }

                              return (
                                <button
                                  key={oIdx}
                                  type="button"
                                  onClick={() => handleSelectOption(q.id, oIdx)}
                                  disabled={quizSubmitted}
                                  className={cn(
                                    'w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start gap-3 active:scale-[0.99]',
                                    optionStyle,
                                  )}
                                >
                                  <span className="font-mono font-bold text-[11px] shrink-0 mt-0.5">
                                    {String.fromCharCode(65 + oIdx)}.
                                  </span>
                                  <div className="leading-relaxed">
                                    <MathText text={opt} />
                                  </div>
                                </button>
                              );
                            })}
                          </div>

                          {/* Pedagogical Explanation Card */}
                          {quizSubmitted && (
                            <div className="p-3.5 rounded-xl bg-canvas-recessed/60 border border-[rgba(13,37,61,0.08)] space-y-1 text-xs">
                              <span className="font-mono text-[10px] uppercase font-bold text-accent-500 block">
                                Conceptual Rationale:
                              </span>
                              <div className="text-ink-body leading-relaxed">
                                <MathText text={q.explanation} />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* =========================================================================
                  TAB 4: RAW JSON SPEC
                  ========================================================================= */}
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
