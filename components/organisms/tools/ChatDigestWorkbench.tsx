'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';
import {
  MessageSquare,
  Upload,
  AlertTriangle,
  Download,
  Copy,
  Code2,
  FileSpreadsheet,
  FileText,
  TrendingUp,
  Mail,
  Bug,
  ChevronDown,
  ChevronUp,
  Send,
  Sliders,
  Check,
  Filter,
  Cpu,
  Users,
  CheckCircle2,
} from 'lucide-react';
import { ToolShell } from './ToolShell';
import { ApiKeyModal } from './ApiKeyModal';
import { MathText } from '@/components/atoms/MathRenderer';
import { CommunityChatResult, ByokSettings } from '@/lib/tools/types';
import { CHAT_DIGEST_PRESETS } from '@/lib/tools/presets';
import { extractTextFromFile, estimateTokenCount } from '@/lib/tools/client-parser';

export function ChatDigestWorkbench() {
  // Preset Selection
  const [activePresetId, setActivePresetId] = useState<string>(
    CHAT_DIGEST_PRESETS[0]?.id || 'preset-discord-dev',
  );
  const currentPreset =
    CHAT_DIGEST_PRESETS.find((p) => p.id === activePresetId) || CHAT_DIGEST_PRESETS[0];

  // Intake Segmentation Dock: 1. Community | 2. Ingestion | 3. Signal Knobs
  const [intakeTab, setIntakeTab] = useState<'community' | 'ingestion' | 'knobs'>('community');

  // Form Inputs
  const [communityName, setCommunityName] = useState(
    currentPreset?.communityName || 'SuperBase Developer Community',
  );
  const [platform, setPlatform] = useState<'Discord' | 'Telegram' | 'Slack'>(
    currentPreset?.platform || 'Discord',
  );
  const [timeframe, setTimeframe] = useState<'Last 24 Hours' | 'Past 7 Days'>(
    currentPreset?.timeframe || 'Last 24 Hours',
  );
  const [chatLogText, setChatLogText] = useState(currentPreset?.sampleChatLogText || '');

  // Signal & Triage Knobs
  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(75);
  const [noiseFilterMode, setNoiseFilterMode] = useState<'Strict' | 'Balanced' | 'Permissive'>(
    'Balanced',
  );
  const [selectedChannelFilter, setSelectedChannelFilter] = useState<string>('ALL');

  // File Upload State
  const [uploadedFiles, setUploadedFiles] = useState<
    Array<{ name: string; sizeBytes: number; tokens: number }>
  >([]);
  const [isParsingFiles, setIsParsingFiles] = useState(false);

  // Processing & Results State
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<CommunityChatResult | null>(
    currentPreset?.precomputedResult || null,
  );

  // Stage Navigation Tab
  const [activeTab, setActiveTab] = useState<
    'intelligence' | 'actions' | 'transcript' | 'newsletter' | 'json'
  >('intelligence');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Interactive Action Tracker States
  const [completedActionIds, setCompletedActionIds] = useState<Set<string>>(new Set(['bug-01']));
  const [expandedTopicIds, setExpandedTopicIds] = useState<Set<string>>(
    new Set(['topic-01', 'topic-02']),
  );
  const [dispatchedWebhooks, setDispatchedWebhooks] = useState<Record<string, string>>({});

  // BYOK Settings
  const [isByokModalOpen, setIsByokModalOpen] = useState(false);
  const [byokSettings, setByokSettings] = useState<ByokSettings>({
    apiKey: '',
    preferredModel: 'gemini-3.5-lite',
  });

  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const [copiedQuoteIdx, setCopiedQuoteIdx] = useState<string | null>(null);

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

  // Preset Selection Handler
  const handleSelectPreset = (presetId: string) => {
    setActivePresetId(presetId);
    const preset = CHAT_DIGEST_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setCommunityName(preset.communityName);
      setPlatform(preset.platform);
      setTimeframe(preset.timeframe);
      setChatLogText(preset.sampleChatLogText);
      setResult(preset.precomputedResult);
      setUploadedFiles([]);
      setErrorMessage(null);
      setSelectedChannelFilter('ALL');
      setCompletedActionIds(
        new Set(
          preset.precomputedResult.actionItemsAndBugs
            .filter((a) => a.status === 'Completed')
            .map((a) => a.id),
        ),
      );
      setExpandedTopicIds(new Set(preset.precomputedResult.topicClusters.map((t) => t.id)));
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
        combinedText += `\n\n--- CHANNEL EXPORT: ${parsed.name} ---\n${parsed.extractedText}`;
        newFileMeta.push({
          name: parsed.name,
          sizeBytes: parsed.sizeBytes,
          tokens: parsed.estimatedTokens,
        });
      }

      setChatLogText((prev) => (prev ? `${prev}\n${combinedText}` : combinedText));
      setUploadedFiles((prev) => [...prev, ...newFileMeta]);
      setActivePresetId('custom');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error parsing uploaded chat logs.';
      setErrorMessage(msg);
    } finally {
      setIsParsingFiles(false);
    }
  };

  // Run Synthesis
  const handleRunDigest = async () => {
    setIsProcessing(true);
    setErrorMessage(null);

    // Fast-path: Instant preset preview
    if (
      currentPreset &&
      activePresetId !== 'custom' &&
      chatLogText === currentPreset.sampleChatLogText &&
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

      const response = await fetch('/api/tools/chat-digest', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          communityName: communityName || 'Tech Community',
          platform,
          timeframe,
          chatLogText,
          preferredModel: byokSettings.preferredModel,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          setErrorMessage(
            'Live chat synthesis requires a Gemini API Key. Click "API Key" in the header to enter your key, or test with our precomputed presets instantly.',
          );
          setIsByokModalOpen(true);
        } else {
          setErrorMessage(data?.message || 'Error digesting community chat logs.');
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
    handleSelectPreset('preset-discord-dev');
  };

  // Toggle Action Completion
  const toggleActionCompleted = (id: string) => {
    setCompletedActionIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Toggle Topic Accordion
  const toggleTopicExpanded = (id: string) => {
    setExpandedTopicIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Simulate Webhook Dispatch
  const handleSimulateWebhook = (itemId: string, destination: string) => {
    setDispatchedWebhooks((prev) => ({
      ...prev,
      [itemId]: `Dispatched to ${destination} ✓`,
    }));
    setTimeout(() => {
      setDispatchedWebhooks((prev) => {
        const next = { ...prev };
        delete next[itemId];
        return next;
      });
    }, 4000);
  };

  // Copy Quotation
  const handleCopyQuote = (quote: string, key: string) => {
    navigator.clipboard?.writeText(quote);
    setCopiedQuoteIdx(key);
    setTimeout(() => setCopiedQuoteIdx(null), 2000);
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
    let md = `---\ntitle: "Community Intelligence Digest - ${result.communityName}"\ntimeframe: "${result.timeframeCovered}"\nsentiment_score: ${result.sentimentScore}\ngenerated_by: "NorAI Chat Digest & Signal Engine"\n---\n\n`;
    md += `# ${result.communityName} — Community Digest\n\n`;
    md += `**Timeframe:** ${result.timeframeCovered} | **Messages Processed:** ${result.totalRawMessages.toLocaleString()} (${result.spamFilteredPercentage}% noise eliminated)\n\n`;
    md += `**Overall Sentiment:** ${result.overallSentiment} (${result.sentimentScore}/100)\n\n`;
    md += `## Executive Intelligence Brief\n${result.executiveBrief}\n\n`;

    md += `## Key Discussion Topics\n\n`;
    result.topicClusters.forEach((t) => {
      md += `### [${t.status || 'RESOLVED'}] ${t.topicName} (${t.channelOrContext})\n`;
      md += `*Sentiment: ${t.sentiment} (${t.sentimentScore}/100) — ~${t.messageCount} messages*\n\n`;
      if (t.impactSummary) md += `**Impact:** ${t.impactSummary}\n\n`;
      md += `${t.summary}\n\n`;
      md += `**Key Quotations:**\n`;
      t.keyQuotations.forEach((q) => (md += `- ${q}\n`));
      md += `\n`;
    });

    md += `## Action Items & Bug Reports\n\n`;
    result.actionItemsAndBugs.forEach((item) => {
      const statusMark = completedActionIds.has(item.id) ? '[x]' : '[ ]';
      md += `### ${statusMark} [${item.priorityCode || 'P1'}] ${item.title} (${item.type})\n`;
      md += `**Reporter:** ${item.reporterHandle} | **Assignee:** ${item.assignee?.name || 'Unassigned'}\n`;
      md += `${item.description}\n\n`;
      md += `*Recommended Triage:* ${item.recommendedTriage}\n\n`;
    });

    md += `## Formatted Newsletter Draft\n\n`;
    md += `### ${result.formattedNewsletter.headline}\n\n`;
    md += `${result.formattedNewsletter.introParagraph}\n\n`;
    md += `**Spotlight:**\n${result.formattedNewsletter.spotlightSection}\n\n`;
    md += `**Community Shoutouts:**\n`;
    result.formattedNewsletter.communityShoutouts.forEach((s) => (md += `- ${s}\n`));
    md += `\n**Next Steps:** ${result.formattedNewsletter.closingCallToAction}\n`;

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `norai_chat_digest_${result.communityName.toLowerCase().replace(/[^a-z0-9]/g, '_')}.md`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setCopiedFormat('md');
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const handleDownloadCsv = () => {
    if (!result) return;
    const rows = result.actionItemsAndBugs.map((item) => [
      `"${item.id}"`,
      `"${item.type}"`,
      `"${item.priorityCode || item.priority}"`,
      `"${item.title.replace(/"/g, '""')}"`,
      `"${item.assignee?.name || ''}"`,
      `"${completedActionIds.has(item.id) ? 'Completed' : 'Open'}"`,
      `"${item.reporterHandle}"`,
      `"${item.recommendedTriage.replace(/"/g, '""')}"`,
    ]);
    const csvContent = [
      '"ID","Type","Priority","Title","Assignee","Status","Reporter","Triage"',
      ...rows.map((r) => r.join(',')),
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `action_items_${result.communityName.toLowerCase().replace(/[^a-z0-9]/g, '_')}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setCopiedFormat('csv');
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  // Channels for filter pill bar
  const availableChannels = useMemo(() => {
    if (!result) return [];
    if (result.activeChannels && result.activeChannels.length > 0) {
      return result.activeChannels;
    }
    const tags = new Set<string>();
    result.topicClusters.forEach((c) => {
      if (c.channelTags) {
        c.channelTags.forEach((t) => tags.add(t));
      } else {
        tags.add(c.channelOrContext);
      }
    });
    return Array.from(tags);
  }, [result]);

  // Filtered topic clusters
  const filteredTopicClusters = useMemo(() => {
    if (!result) return [];
    if (selectedChannelFilter === 'ALL') return result.topicClusters;
    return result.topicClusters.filter((c) => {
      if (c.channelTags) return c.channelTags.includes(selectedChannelFilter);
      return c.channelOrContext.includes(selectedChannelFilter);
    });
  }, [result, selectedChannelFilter]);

  // Filtered raw messages
  const filteredRawMessages = useMemo(() => {
    if (!result?.rawMessages) return [];
    return result.rawMessages.filter((msg) => {
      if (selectedChannelFilter !== 'ALL' && msg.channel !== selectedChannelFilter) {
        return false;
      }
      return true;
    });
  }, [result, selectedChannelFilter]);

  return (
    <>
      <ToolShell
        toolId="chat-digest"
        toolName="Community Chat Digest & Signal Engine"
        category="Community AI & NLP"
        isProcessing={isProcessing}
        telemetry={result?.telemetry}
        byokSettings={byokSettings}
        onOpenByokModal={() => setIsByokModalOpen(true)}
        onReset={handleReset}
        onRun={handleRunDigest}
        activePresetTitle={currentPreset?.title}
        isPresetMode={activePresetId !== 'custom' && !byokSettings.apiKey}
      >
        {/* Preset Command Strip */}
        <div className="px-5 py-3 bg-canvas-base border-b border-[rgba(13,37,61,0.08)] flex items-center justify-between gap-3 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-ink-secondary uppercase tracking-wider font-semibold whitespace-nowrap">
              Community Presets:
            </span>
            <div className="flex items-center gap-1.5">
              {CHAT_DIGEST_PRESETS.map((preset) => {
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
                    {preset.title}
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
                Custom Export (.json / .txt)
              </button>
            </div>
          </div>

          <div className="text-[11px] font-mono text-ink-secondary hidden md:block">
            Estimated Ingestion: ~
            <span className="tabular-nums font-semibold">
              {estimateTokenCount(chatLogText).toLocaleString()}
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

        {/* Dual-Pane Workbench Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[680px] items-stretch">
          {/* Left Column: Segmented Intake Dock (5 cols) */}
          <div className="lg:col-span-5 p-5 md:p-6 border-b lg:border-b-0 lg:border-r border-[rgba(13,37,61,0.08)] bg-canvas-paper flex flex-col justify-between gap-5 h-full">
            <div className="space-y-4">
              {/* Intake Step Tabs */}
              <div className="flex items-center p-1 bg-canvas-recessed rounded-xl border border-[rgba(13,37,61,0.08)]">
                <button
                  type="button"
                  onClick={() => setIntakeTab('community')}
                  className={cn(
                    'flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all active:scale-[0.98]',
                    intakeTab === 'community'
                      ? 'bg-canvas-paper text-ink-primary shadow-xs'
                      : 'text-ink-secondary hover:text-ink-primary',
                  )}
                >
                  1. Community
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
                  2. Ingestion
                </button>
                <button
                  type="button"
                  onClick={() => setIntakeTab('knobs')}
                  className={cn(
                    'flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all active:scale-[0.98]',
                    intakeTab === 'knobs'
                      ? 'bg-canvas-paper text-ink-primary shadow-xs'
                      : 'text-ink-secondary hover:text-ink-primary',
                  )}
                >
                  3. Triage Knobs
                </button>
              </div>

              {/* TAB 1: COMMUNITY & METADATA */}
              {intakeTab === 'community' && (
                <div className="space-y-3.5 animate-fadeIn">
                  <div>
                    <label
                      htmlFor="community-name-input"
                      className="text-xs font-semibold text-ink-primary block mb-1"
                    >
                      Community / Channel Hub Name
                    </label>
                    <input
                      id="community-name-input"
                      type="text"
                      value={communityName}
                      onChange={(e) => {
                        setCommunityName(e.target.value);
                        setActivePresetId('custom');
                      }}
                      placeholder="e.g. SuperBase Developer Community"
                      className="w-full px-3 py-2 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.15)] text-ink-primary text-xs focus:outline-none focus:ring-2 focus:ring-accent-500 font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="platform-select"
                        className="text-xs font-semibold text-ink-primary block mb-1"
                      >
                        Platform Source
                      </label>
                      <select
                        id="platform-select"
                        value={platform}
                        onChange={(e) =>
                          setPlatform(e.target.value as 'Discord' | 'Telegram' | 'Slack')
                        }
                        className="w-full px-3 py-2 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.15)] text-ink-primary text-xs font-mono focus:outline-none focus:ring-2 focus:ring-accent-500"
                      >
                        <option value="Discord">Discord Server</option>
                        <option value="Slack">Slack Workspace</option>
                        <option value="Telegram">Telegram Group</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="timeframe-select"
                        className="text-xs font-semibold text-ink-primary block mb-1"
                      >
                        Timeframe Window
                      </label>
                      <select
                        id="timeframe-select"
                        value={timeframe}
                        onChange={(e) =>
                          setTimeframe(e.target.value as 'Last 24 Hours' | 'Past 7 Days')
                        }
                        className="w-full px-3 py-2 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.15)] text-ink-primary text-xs font-mono focus:outline-none focus:ring-2 focus:ring-accent-500"
                      >
                        <option value="Last 24 Hours">Last 24 Hours</option>
                        <option value="Past 7 Days">Past 7 Days</option>
                      </select>
                    </div>
                  </div>

                  {/* Signal Intelligence & Noise Reduction Matrix */}
                  <div className="p-3.5 rounded-xl bg-canvas-base border border-[rgba(13,37,61,0.1)] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-ink-secondary uppercase tracking-wider font-semibold flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-accent-500" />
                        <span>Signal Extraction Pipeline:</span>
                      </span>
                      <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-semibold">
                        Active Triage
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                      <div className="p-2 rounded-lg bg-canvas-paper border border-[rgba(13,37,61,0.06)] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="font-medium text-ink-primary truncate">
                          Spam & Bot Filter
                        </span>
                      </div>
                      <div className="p-2 rounded-lg bg-canvas-paper border border-[rgba(13,37,61,0.06)] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="font-medium text-ink-primary truncate">
                          Action Item Tracker
                        </span>
                      </div>
                      <div className="p-2 rounded-lg bg-canvas-paper border border-[rgba(13,37,61,0.06)] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="font-medium text-ink-primary truncate">
                          Bug & Incident Radar
                        </span>
                      </div>
                      <div className="p-2 rounded-lg bg-canvas-paper border border-[rgba(13,37,61,0.06)] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="font-medium text-ink-primary truncate">
                          Sentiment & Morale
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Channel Ingestion Target Pills */}
                  <div className="p-3 rounded-xl bg-canvas-recessed/60 border border-[rgba(13,37,61,0.08)] space-y-1.5">
                    <span className="text-[10px] font-mono text-ink-secondary uppercase tracking-wider block font-semibold">
                      Ingestion Target Channels:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {availableChannels.map((ch) => (
                        <span
                          key={ch}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-canvas-paper border border-[rgba(13,37,61,0.1)] text-ink-primary"
                        >
                          {ch}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: INGESTION & RAW LOGS */}
              {intakeTab === 'ingestion' && (
                <div className="space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="chatlog-textarea"
                      className="text-xs font-semibold text-ink-primary flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-accent-500" />
                      <span>Chat Logs / Raw Exports</span>
                    </label>
                    <span className="text-[10px] font-mono text-ink-secondary tabular-nums">
                      {chatLogText.length} chars · ~{estimateTokenCount(chatLogText)} tokens
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
                        const p = CHAT_DIGEST_PRESETS[0];
                        if (p) {
                          setActivePresetId(p.id);
                          setChatLogText(p.sampleChatLogText);
                          setCommunityName(p.communityName);
                          setPlatform(p.platform);
                          setTimeframe(p.timeframe);
                          setResult(p.precomputedResult);
                        }
                      }}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-canvas-base border border-[rgba(13,37,61,0.12)] hover:border-accent-500 text-ink-primary hover:text-accent-600 transition-all"
                    >
                      Discord Dev
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const p = CHAT_DIGEST_PRESETS[1];
                        if (p) {
                          setActivePresetId(p.id);
                          setChatLogText(p.sampleChatLogText);
                          setCommunityName(p.communityName);
                          setPlatform(p.platform);
                          setTimeframe(p.timeframe);
                          setResult(p.precomputedResult);
                        }
                      }}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-canvas-base border border-[rgba(13,37,61,0.12)] hover:border-accent-500 text-ink-primary hover:text-accent-600 transition-all"
                    >
                      Slack Incidents
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const p = CHAT_DIGEST_PRESETS[2];
                        if (p) {
                          setActivePresetId(p.id);
                          setChatLogText(p.sampleChatLogText);
                          setCommunityName(p.communityName);
                          setPlatform(p.platform);
                          setTimeframe(p.timeframe);
                          setResult(p.precomputedResult);
                        }
                      }}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-canvas-base border border-[rgba(13,37,61,0.12)] hover:border-accent-500 text-ink-primary hover:text-accent-600 transition-all"
                    >
                      Telegram DAO
                    </button>
                  </div>

                  {/* Dropzone (Compact) */}
                  <div className="relative border border-dashed border-[rgba(13,37,61,0.15)] hover:border-accent-500 rounded-xl p-3 text-center bg-canvas-base/60 transition-colors">
                    <input
                      type="file"
                      id="chatlog-file-upload"
                      multiple
                      accept=".txt,.json,.csv,.log,.md"
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex items-center justify-center gap-2 pointer-events-none text-xs text-ink-secondary">
                      <Upload className="w-4 h-4 text-accent-500 shrink-0" />
                      <span>
                        {isParsingFiles
                          ? 'Parsing multi-channel logs...'
                          : 'Drop Discord/Slack export dumps or paste logs below'}
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

                  {/* Expansive Chat Log Editor */}
                  <textarea
                    id="chatlog-textarea"
                    rows={12}
                    value={chatLogText}
                    onChange={(e) => {
                      setChatLogText(e.target.value);
                      setActivePresetId('custom');
                    }}
                    placeholder="Paste multi-channel chat logs e.g. [12:30] @user (#general): Encountered a bug in..."
                    className="w-full p-3.5 rounded-xl bg-canvas-base border border-[rgba(13,37,61,0.15)] text-ink-primary text-xs font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-accent-500 resize-y min-h-[340px]"
                  />

                  {/* Parsing Status Bar */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-ink-secondary pt-0.5">
                    <span className="flex items-center gap-1 text-emerald-700">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>PII Stripped in-memory · Zero permanent logs</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setChatLogText('')}
                      className="hover:text-accent-500 transition-colors"
                    >
                      Clear logs
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: SIGNAL & TRIAGE KNOBS */}
              {intakeTab === 'knobs' && (
                <div className="space-y-3.5 animate-fadeIn">
                  <div className="p-3.5 rounded-xl bg-canvas-base border border-[rgba(13,37,61,0.1)] space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="confidence-slider"
                        className="text-xs font-semibold text-ink-primary flex items-center gap-1.5"
                      >
                        <Sliders className="w-3.5 h-3.5 text-accent-500" />
                        <span>Signal Confidence Threshold</span>
                      </label>
                      <span className="font-mono text-xs font-bold text-accent-500 tabular-nums">
                        {confidenceThreshold}%
                      </span>
                    </div>
                    <input
                      id="confidence-slider"
                      type="range"
                      min={50}
                      max={95}
                      step={5}
                      value={confidenceThreshold}
                      onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
                      className="w-full accent-accent-500 cursor-pointer"
                    />
                    <p className="text-[11px] text-ink-secondary leading-snug">
                      Messages below this threshold are categorized as noise or chatter and excluded
                      from topic clustering.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-canvas-base border border-[rgba(13,37,61,0.1)] space-y-2.5">
                    <label className="text-xs font-semibold text-ink-primary block">
                      Noise Elimination Aggressiveness
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Strict', 'Balanced', 'Permissive'] as const).map((mode) => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setNoiseFilterMode(mode)}
                          className={cn(
                            'py-1.5 text-xs font-medium rounded-lg border transition-all active:scale-[0.97]',
                            noiseFilterMode === mode
                              ? 'bg-[#0D253D] text-white border-[#0D253D] font-semibold'
                              : 'bg-canvas-paper text-ink-secondary border-[rgba(13,37,61,0.1)] hover:bg-canvas-recessed',
                          )}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Executive Briefing Blueprint Matrix */}
                  <div className="p-3.5 rounded-xl bg-canvas-base border border-[rgba(13,37,61,0.08)] space-y-2 text-xs">
                    <span className="text-[11px] font-mono text-ink-secondary uppercase font-semibold block">
                      Briefing Synthesis Format:
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                      <div className="p-2 rounded bg-canvas-paper border border-[rgba(13,37,61,0.06)]">
                        <span className="text-ink-secondary block text-[10px]">Triage Depth:</span>
                        <strong className="text-ink-primary">Executive Memo + PR Tracker</strong>
                      </div>
                      <div className="p-2 rounded bg-canvas-paper border border-[rgba(13,37,61,0.06)]">
                        <span className="text-ink-secondary block text-[10px]">
                          Sentiment Mode:
                        </span>
                        <strong className="text-emerald-700">Topic-by-Topic Radar</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Ingestion Metric Badges */}
            <div className="p-3.5 rounded-xl bg-canvas-recessed/60 border border-[rgba(13,37,61,0.08)] text-xs text-ink-secondary space-y-2">
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Target Engine:</span>
                </span>
                <strong className="text-ink-primary font-semibold">
                  Gemini 3.5 Lite (Noise Filter)
                </strong>
              </div>
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span>Noise Reduction Rate:</span>
                <strong className="text-emerald-700 font-semibold tabular-nums">
                  {result?.spamFilteredPercentage || 0}% Spam Cleared
                </strong>
              </div>
              <div className="flex items-center justify-between font-mono text-[10px] text-ink-secondary pt-1 border-t border-[rgba(13,37,61,0.06)]">
                <span>Security Protocol:</span>
                <span className="text-emerald-800 font-medium">PII Stripped · Ephemeral RAM</span>
              </div>
            </div>
          </div>

          {/* Right Column: Multi-Tab Intelligence Stage (7 cols) */}
          <div className="lg:col-span-7 bg-canvas-base flex flex-col justify-between">
            {/* Tab Controls Header */}
            <div className="px-5 py-3 bg-canvas-paper border-b border-[rgba(13,37,61,0.08)] flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => setActiveTab('intelligence')}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-[0.97] flex items-center gap-1.5',
                    activeTab === 'intelligence'
                      ? 'bg-[#0D253D] text-white shadow-sm'
                      : 'text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed',
                  )}
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Topic Clusters ({result?.topicClusters.length || 0})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('actions')}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-[0.97] flex items-center gap-1.5',
                    activeTab === 'actions'
                      ? 'bg-[#0D253D] text-white shadow-sm'
                      : 'text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed',
                  )}
                >
                  <Bug className="w-3.5 h-3.5 text-accent-500" />
                  <span>Action Items & Bugs ({result?.actionItemsAndBugs.length || 0})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('transcript')}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-[0.97] flex items-center gap-1.5',
                    activeTab === 'transcript'
                      ? 'bg-[#0D253D] text-white shadow-sm'
                      : 'text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed',
                  )}
                >
                  <Cpu className="w-3.5 h-3.5 text-amber-600" />
                  <span>Raw Transcript ({result?.rawMessages?.length || 0})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('newsletter')}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-[0.97] flex items-center gap-1.5',
                    activeTab === 'newsletter'
                      ? 'bg-[#0D253D] text-white shadow-sm'
                      : 'text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed',
                  )}
                >
                  <Mail className="w-3.5 h-3.5 text-accent-secondary" />
                  <span>Newsletter</span>
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
                  title="Export Action Items as CSV"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-accent-secondary" />
                  <span className="hidden sm:inline text-[11px]">CSV</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadMarkdown}
                  className="p-1.5 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.12)] text-ink-secondary hover:text-ink-primary hover:border-accent-500 transition-colors active:scale-[0.97] text-xs flex items-center gap-1"
                  title="Export Markdown Brief"
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

            {/* Results Canvas Body */}
            <div className="p-5 md:p-6 flex-1 overflow-y-auto space-y-6">
              {/* Executive Health Overview Bento */}
              {result && (
                <div className="p-5 rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] shadow-sm space-y-4">
                  <div className="flex items-start justify-between gap-4 flex-wrap border-b border-[rgba(13,37,61,0.08)] pb-3">
                    <div>
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-accent-50 text-accent-500 uppercase tracking-wider">
                        COMMUNITY INTELLIGENCE REPORT
                      </span>
                      <h3 className="font-display text-xl text-ink-primary font-normal mt-1">
                        {result.communityName}
                      </h3>
                      <p className="text-xs text-ink-secondary font-mono">
                        {result.timeframeCovered} &bull;{' '}
                        <span className="tabular-nums font-semibold">
                          {result.filteredSignalMessages.toLocaleString()}
                        </span>{' '}
                        signal messages from{' '}
                        <span className="tabular-nums font-semibold">
                          {result.totalRawMessages.toLocaleString()}
                        </span>{' '}
                        ingested
                      </p>
                    </div>

                    {/* Sentiment Radar Tag */}
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[10px] font-mono text-ink-secondary uppercase block">
                          Community Sentiment
                        </span>
                        <strong className="text-xs font-semibold text-ink-primary">
                          {result.overallSentiment}
                        </strong>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-[#0D253D] text-[#F9F6F0] flex flex-col items-center justify-center font-mono font-bold text-sm shadow-sm">
                        <span className="tabular-nums">{result.sentimentScore}</span>
                        <span className="text-[8px] font-normal opacity-70">/100</span>
                      </div>
                    </div>
                  </div>

                  {/* Executive Brief Prose */}
                  <div className="text-xs text-ink-body leading-relaxed">
                    <MathText text={result.executiveBrief} />
                  </div>

                  {/* Signal Ratio Bar */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-[11px] font-mono text-ink-secondary">
                      <span>
                        Signal Density (
                        <span className="tabular-nums font-semibold">
                          {result.filteredSignalMessages}
                        </span>{' '}
                        messages)
                      </span>
                      <span className="text-emerald-700 font-semibold tabular-nums">
                        {result.spamFilteredPercentage}% Noise Filtered
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-canvas-recessed overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${100 - result.spamFilteredPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Channel Filter Pill Strip */}
              {availableChannels.length > 1 && (
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  <span className="text-[10px] font-mono text-ink-secondary uppercase tracking-wider flex items-center gap-1 pr-1">
                    <Filter className="w-3 h-3" /> Filter:
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedChannelFilter('ALL')}
                    className={cn(
                      'px-2.5 py-1 rounded-lg text-xs font-medium font-mono transition-all active:scale-[0.97]',
                      selectedChannelFilter === 'ALL'
                        ? 'bg-[#0D253D] text-white shadow-xs'
                        : 'bg-canvas-paper text-ink-secondary hover:text-ink-primary border border-[rgba(13,37,61,0.08)]',
                    )}
                  >
                    All Channels ({result?.topicClusters.length || 0})
                  </button>
                  {availableChannels.map((ch) => (
                    <button
                      key={ch}
                      type="button"
                      onClick={() => setSelectedChannelFilter(ch)}
                      className={cn(
                        'px-2.5 py-1 rounded-lg text-xs font-medium font-mono transition-all active:scale-[0.97]',
                        selectedChannelFilter === ch
                          ? 'bg-[#0D253D] text-white shadow-xs'
                          : 'bg-canvas-paper text-ink-secondary hover:text-ink-primary border border-[rgba(13,37,61,0.08)]',
                      )}
                    >
                      {ch}
                    </button>
                  ))}
                </div>
              )}

              {/* TAB 1: TOPIC CLUSTERS */}
              {activeTab === 'intelligence' && (
                <div className="space-y-4">
                  {filteredTopicClusters.map((cluster) => {
                    const isExpanded = expandedTopicIds.has(cluster.id);
                    return (
                      <div
                        key={cluster.id}
                        className="rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.1)] shadow-sm overflow-hidden transition-all"
                      >
                        {/* Topic Header Card */}
                        <div
                          onClick={() => toggleTopicExpanded(cluster.id)}
                          className="p-5 cursor-pointer hover:bg-canvas-recessed/30 transition-colors flex items-start justify-between gap-4"
                        >
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span
                                className={cn(
                                  'text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider',
                                  cluster.status === 'ACTIVE DEBATE'
                                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                                    : cluster.status === 'IN PROGRESS'
                                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200',
                                )}
                              >
                                {cluster.status || 'RESOLVED'}
                              </span>
                              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-canvas-recessed text-ink-secondary">
                                {cluster.channelOrContext}
                              </span>
                              <span className="text-[11px] font-mono text-ink-secondary tabular-nums">
                                ~{cluster.messageCount} messages
                              </span>
                            </div>

                            <h4 className="font-semibold text-sm text-ink-primary">
                              {cluster.topicName}
                            </h4>

                            {cluster.impactSummary && (
                              <p className="text-xs text-accent-600 font-medium flex items-center gap-1.5">
                                <Cpu className="w-3.5 h-3.5 text-accent-500 shrink-0" />
                                <span>{cluster.impactSummary}</span>
                              </p>
                            )}

                            {/* Participant Handles Pill Strip */}
                            {cluster.participantHandles &&
                              cluster.participantHandles.length > 0 && (
                                <div className="flex items-center gap-1.5 pt-1 flex-wrap">
                                  <Users className="w-3 h-3 text-ink-secondary" />
                                  {cluster.participantHandles.map((handle) => (
                                    <span
                                      key={handle}
                                      className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-canvas-base border border-[rgba(13,37,61,0.08)] text-ink-secondary"
                                    >
                                      {handle}
                                    </span>
                                  ))}
                                </div>
                              )}
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span
                              className={cn(
                                'px-2.5 py-1 rounded-lg text-xs font-mono font-semibold tabular-nums',
                                cluster.sentiment === 'Positive'
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : cluster.sentiment === 'Mixed'
                                    ? 'bg-amber-50 text-amber-700'
                                    : 'bg-slate-100 text-slate-700',
                              )}
                            >
                              {cluster.sentiment} {cluster.sentimentScore}%
                            </span>
                            <button
                              type="button"
                              aria-label={isExpanded ? 'Collapse topic' : 'Expand topic'}
                              className="p-1 rounded-lg hover:bg-canvas-recessed text-ink-secondary"
                            >
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Inline Expandable Accordion Body */}
                        {isExpanded && (
                          <div className="px-5 pb-5 pt-2 border-t border-[rgba(13,37,61,0.06)] space-y-4 bg-canvas-paper/50 animate-fadeIn">
                            <div className="text-xs text-ink-body leading-relaxed">
                              <MathText text={cluster.summary} />
                            </div>

                            {/* Member Voice Quoted Pills */}
                            {cluster.keyQuotations.length > 0 && (
                              <div className="space-y-2 pt-1">
                                <span className="text-[10px] font-mono text-ink-secondary uppercase tracking-wider font-bold block">
                                  Verified Member Voices:
                                </span>
                                <div className="space-y-2">
                                  {cluster.keyQuotations.map((quote, qIdx) => {
                                    const quoteKey = `${cluster.id}-q-${qIdx}`;
                                    return (
                                      <div
                                        key={qIdx}
                                        className="p-3 rounded-xl bg-canvas-base border border-[rgba(13,37,61,0.08)] flex items-start justify-between gap-3 text-xs text-ink-primary font-mono"
                                      >
                                        <div className="flex items-start gap-2 flex-1">
                                          <div className="w-5 h-5 rounded-full bg-accent-100 text-accent-600 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                                            {quote.charAt(1) || 'U'}
                                          </div>
                                          <div className="leading-relaxed">
                                            <MathText text={quote} />
                                          </div>
                                        </div>
                                        <button
                                          type="button"
                                          onClick={() => handleCopyQuote(quote, quoteKey)}
                                          className="p-1 rounded hover:bg-canvas-recessed text-ink-secondary hover:text-ink-primary transition-colors shrink-0"
                                          title="Copy Quote"
                                        >
                                          {copiedQuoteIdx === quoteKey ? (
                                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                                          ) : (
                                            <Copy className="w-3.5 h-3.5" />
                                          )}
                                        </button>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* TAB 2: ACTION ITEMS & BUG TRACKER KANBAN */}
              {activeTab === 'actions' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-ink-secondary font-mono pb-1 border-b border-[rgba(13,37,61,0.08)]">
                    <span>
                      Total Tracked:{' '}
                      <strong className="text-ink-primary tabular-nums">
                        {result?.actionItemsAndBugs.length || 0}
                      </strong>
                    </span>
                    <span>
                      Completed:{' '}
                      <strong className="text-emerald-700 tabular-nums">
                        {completedActionIds.size}
                      </strong>
                    </span>
                  </div>

                  {result?.actionItemsAndBugs.map((item) => {
                    const isCompleted = completedActionIds.has(item.id);
                    const webhookFeedback = dispatchedWebhooks[item.id];
                    return (
                      <div
                        key={item.id}
                        className={cn(
                          'p-5 rounded-2xl bg-canvas-paper border transition-all space-y-3.5 shadow-sm',
                          isCompleted
                            ? 'border-emerald-500/30 bg-emerald-50/10 opacity-80'
                            : 'border-[rgba(13,37,61,0.12)]',
                        )}
                      >
                        <div className="flex items-start justify-between gap-3 flex-wrap">
                          <div className="flex items-center gap-2 flex-wrap">
                            <button
                              type="button"
                              onClick={() => toggleActionCompleted(item.id)}
                              className={cn(
                                'w-5 h-5 rounded flex items-center justify-center transition-colors border',
                                isCompleted
                                  ? 'bg-emerald-600 border-emerald-600 text-white'
                                  : 'border-[rgba(13,37,61,0.2)] hover:border-emerald-500 bg-canvas-base',
                              )}
                              title={isCompleted ? 'Mark as Open' : 'Mark as Completed'}
                            >
                              {isCompleted && <Check className="w-3.5 h-3.5" />}
                            </button>

                            <span
                              className={cn(
                                'text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider',
                                item.priorityCode === 'P0' || item.priority === 'Urgent'
                                  ? 'bg-accent-50 text-accent-600 border border-accent-200'
                                  : item.priorityCode === 'P1' || item.priority === 'High'
                                    ? 'bg-orange-50 text-orange-700 border border-orange-200'
                                    : 'bg-amber-50 text-amber-700 border border-amber-200',
                              )}
                            >
                              {item.priorityCode || item.priority}
                            </span>

                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-canvas-recessed text-ink-secondary">
                              {item.type}
                            </span>

                            {item.sourceMessageRef && (
                              <span className="text-[10px] font-mono text-ink-secondary">
                                Ref: {item.sourceMessageRef}
                              </span>
                            )}
                          </div>

                          {/* Assignee Pill */}
                          {item.assignee && (
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.08)]">
                              <div className="w-4 h-4 rounded-full bg-[#0D253D] text-[#F9F6F0] flex items-center justify-center font-bold text-[9px]">
                                {item.assignee.name.charAt(0)}
                              </div>
                              <span className="text-xs font-medium text-ink-primary">
                                {item.assignee.name}
                              </span>
                              <span className="text-[10px] font-mono text-ink-secondary">
                                ({item.assignee.role || item.assignee.handle})
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="space-y-1">
                          <h4
                            className={cn(
                              'font-semibold text-sm text-ink-primary',
                              isCompleted && 'line-through text-ink-secondary',
                            )}
                          >
                            {item.title}
                          </h4>
                          <p className="text-xs text-ink-body leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        {/* Triage & Simulated Webhook Strip */}
                        <div className="pt-2 border-t border-[rgba(13,37,61,0.06)] flex items-center justify-between gap-3 flex-wrap">
                          <div className="text-xs font-mono text-ink-secondary flex-1">
                            <span className="font-semibold text-ink-primary">Triage Action:</span>{' '}
                            {item.recommendedTriage}
                          </div>

                          <div className="flex items-center gap-2">
                            {webhookFeedback ? (
                              <span className="text-xs font-mono font-bold text-emerald-700 animate-fadeIn">
                                {webhookFeedback}
                              </span>
                            ) : (
                              <>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleSimulateWebhook(
                                      item.id,
                                      item.targetIntegration || 'Slack',
                                    )
                                  }
                                  className="px-2.5 py-1 rounded-lg text-xs font-medium font-mono bg-canvas-base border border-[rgba(13,37,61,0.15)] hover:border-accent-500 text-ink-primary hover:text-accent-500 transition-colors active:scale-[0.97] flex items-center gap-1"
                                >
                                  <Send className="w-3 h-3 text-accent-500" />
                                  <span>Push to {item.targetIntegration || 'Linear'}</span>
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* TAB 3: RAW TRANSCRIPT INSPECTOR */}
              {activeTab === 'transcript' && (
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-canvas-paper border border-[rgba(13,37,61,0.08)] flex items-center justify-between text-xs font-mono text-ink-secondary">
                    <span>
                      Ingested Messages:{' '}
                      <strong className="text-ink-primary tabular-nums">
                        {filteredRawMessages.length}
                      </strong>
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500" />{' '}
                      Signal
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-slate-300 ml-2" />{' '}
                      Filtered Noise
                    </span>
                  </div>

                  <div className="space-y-2">
                    {filteredRawMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={cn(
                          'p-3.5 rounded-xl border transition-all text-xs font-mono space-y-1.5',
                          msg.isSignal
                            ? 'bg-canvas-paper border-emerald-500/30'
                            : 'bg-canvas-recessed/40 border-transparent opacity-60',
                        )}
                      >
                        <div className="flex items-center justify-between gap-2 flex-wrap text-[11px]">
                          <div className="flex items-center gap-2">
                            <span className="text-ink-secondary">[{msg.timestamp}]</span>
                            <strong className="text-ink-primary font-semibold">{msg.author}</strong>
                            <span className="px-1.5 py-0.5 rounded bg-canvas-base text-ink-secondary text-[10px]">
                              {msg.channel}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {msg.category && (
                              <span className="px-1.5 py-0.5 rounded bg-canvas-recessed text-ink-secondary text-[10px]">
                                {msg.category}
                              </span>
                            )}
                            <span
                              className={cn(
                                'px-2 py-0.5 rounded text-[10px] font-bold tabular-nums',
                                msg.isSignal
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : 'bg-slate-100 text-slate-500',
                              )}
                            >
                              {msg.isSignal ? `Signal ${msg.signalConfidence}%` : 'Noise'}
                            </span>
                          </div>
                        </div>
                        <p className="text-ink-body font-sans text-xs leading-relaxed">
                          {msg.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: FORMATTED NEWSLETTER DRAFT */}
              {activeTab === 'newsletter' && result && (
                <div className="p-6 rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] shadow-sm space-y-5">
                  <div className="border-b border-[rgba(13,37,61,0.08)] pb-4">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-accent-50 text-accent-500 uppercase tracking-wider">
                      NEWSLETTER BROADCAST READY
                    </span>
                    <h3 className="font-display text-2xl text-ink-primary font-normal mt-2 leading-tight">
                      {result.formattedNewsletter.headline}
                    </h3>
                  </div>

                  <p className="text-sm text-ink-body leading-relaxed">
                    {result.formattedNewsletter.introParagraph}
                  </p>

                  <div className="p-4 rounded-xl bg-canvas-recessed/60 border border-[rgba(13,37,61,0.08)] space-y-2">
                    <h4 className="font-semibold text-xs text-ink-primary uppercase tracking-wider font-mono">
                      Community Spotlight
                    </h4>
                    <p className="text-xs text-ink-body leading-relaxed">
                      {result.formattedNewsletter.spotlightSection}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-xs text-ink-primary uppercase tracking-wider font-mono">
                      Community Shoutouts
                    </h4>
                    <ul className="space-y-1.5">
                      {result.formattedNewsletter.communityShoutouts.map((s, idx) => (
                        <li key={idx} className="text-xs text-ink-body flex items-start gap-2">
                          <span className="text-accent-500 font-bold">&bull;</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0D253D] text-[#F9F6F0] space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider opacity-70">
                      Call to Action
                    </span>
                    <p className="text-xs font-medium">
                      {result.formattedNewsletter.closingCallToAction}
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 5: JSON SPEC */}
              {activeTab === 'json' && result && (
                <div className="relative rounded-xl overflow-hidden border border-[rgba(13,37,61,0.15)] bg-[#07131F]">
                  <div className="p-3 bg-[#0D253D] border-b border-[rgba(255,255,255,0.08)] flex items-center justify-between text-xs text-[#F9F6F0]/70 font-mono">
                    <span>community_chat_digest.json</span>
                    <button
                      type="button"
                      onClick={handleCopyJson}
                      className="px-2 py-1 rounded bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] text-white text-[11px] transition-colors"
                    >
                      {copiedFormat === 'json' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre className="p-4 text-xs font-mono text-[#4ADE80] overflow-x-auto max-h-[500px] leading-relaxed scrollbar-none">
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
