'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
  MessageSquare,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Download,
  Copy,
  Code2,
  FileSpreadsheet,
  FileText,
  TrendingUp,
  Mail,
  Bug,
  Hash,
} from 'lucide-react';
import { ToolShell } from './ToolShell';
import { ApiKeyModal } from './ApiKeyModal';
import {
  CommunityChatResult,
  ByokSettings,
} from '@/lib/tools/types';
import { CHAT_DIGEST_PRESETS } from '@/lib/tools/presets';
import {
  extractTextFromFile,
  estimateTokenCount,
} from '@/lib/tools/client-parser';

export function ChatDigestWorkbench() {
  // Preset Selection
  const [activePresetId, setActivePresetId] = useState<string>(
    CHAT_DIGEST_PRESETS[0]?.id || 'preset-discord-dev'
  );
  const currentPreset =
    CHAT_DIGEST_PRESETS.find((p) => p.id === activePresetId) ||
    CHAT_DIGEST_PRESETS[0];

  // Form Inputs
  const [communityName, setCommunityName] = useState(
    currentPreset?.communityName || 'SuperBase Developer Community'
  );
  const [platform, setPlatform] = useState<'Discord' | 'Telegram' | 'Slack'>(
    currentPreset?.platform || 'Discord'
  );
  const [timeframe, setTimeframe] = useState<'Last 24 Hours' | 'Past 7 Days'>(
    currentPreset?.timeframe || 'Last 24 Hours'
  );
  const [chatLogText, setChatLogText] = useState(
    currentPreset?.sampleChatLogText || ''
  );

  // File Upload State
  const [uploadedFiles, setUploadedFiles] = useState<
    Array<{ name: string; sizeBytes: number; tokens: number }>
  >([]);
  const [isParsingFiles, setIsParsingFiles] = useState(false);

  // Processing & Results State
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<CommunityChatResult | null>(
    currentPreset?.precomputedResult || null
  );
  const [activeTab, setActiveTab] = useState<
    'intelligence' | 'actions' | 'newsletter' | 'json'
  >('intelligence');
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
            'Live chat synthesis requires a Gemini API Key. Click "API Key" in the header to enter your key, or test with our precomputed presets instantly.'
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
      const msg =
        err instanceof Error ? err.message : 'Network error communicating with API.';
      setErrorMessage(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    handleSelectPreset('preset-discord-dev');
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
    let md = `---\ntitle: "Community Intelligence Digest - ${result.communityName}"\ntimeframe: "${result.timeframeCovered}"\nsentiment_score: ${result.sentimentScore}\ngenerated_by: "NorAI Chat Digest Engine"\n---\n\n`;
    md += `# ${result.communityName} — Community Digest\n\n`;
    md += `**Timeframe:** ${result.timeframeCovered} | **Messages Processed:** ${result.totalRawMessages.toLocaleString()} (${result.spamFilteredPercentage}% spam eliminated)\n\n`;
    md += `**Overall Sentiment:** ${result.overallSentiment} (${result.sentimentScore}/100)\n\n`;
    md += `## Executive Intelligence Brief\n${result.executiveBrief}\n\n`;

    md += `## Key Discussion Topics\n\n`;
    result.topicClusters.forEach((t) => {
      md += `### ${t.topicName} (${t.channelOrContext})\n`;
      md += `*Sentiment: ${t.sentiment} (${t.sentimentScore}/100) — ~${t.messageCount} messages*\n\n`;
      md += `${t.summary}\n\n`;
      md += `**Key Quotes:**\n`;
      t.keyQuotations.forEach((q) => (md += `- ${q}\n`));
      md += `\n`;
    });

    md += `## Action Items & Bug Reports\n\n`;
    result.actionItemsAndBugs.forEach((item) => {
      md += `### [${item.priority}] ${item.title} (${item.type})\n`;
      md += `**Reporter:** ${item.reporterHandle}\n`;
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
    link.setAttribute('download', `norai_chat_digest_${result.communityName.toLowerCase().replace(/[^a-z0-9]/g, '_')}.md`);
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
      `"${item.priority}"`,
      `"${item.title.replace(/"/g, '""')}"`,
      `"${item.reporterHandle}"`,
      `"${item.recommendedTriage.replace(/"/g, '""')}"`,
    ]);
    const csvContent = ['"ID","Type","Priority","Title","Reporter","Triage"', ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `action_items_${result.communityName.toLowerCase().replace(/[^a-z0-9]/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setCopiedFormat('csv');
    setTimeout(() => setCopiedFormat(null), 2000);
  };

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
        {/* Preset Dock */}
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
                        : 'bg-canvas-paper text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed border border-[rgba(13,37,61,0.08)]'
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
                    : 'bg-canvas-paper text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed border border-[rgba(13,37,61,0.08)]'
                )}
              >
                Custom Export (.json / .txt)
              </button>
            </div>
          </div>

          <div className="text-[11px] font-mono text-ink-secondary hidden md:block">
            Estimated Ingestion: ~{estimateTokenCount(chatLogText).toLocaleString()} tokens
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
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[640px] items-stretch">
          {/* Left Column: Intake & Configuration Dock (5 cols) */}
          <div className="lg:col-span-5 p-5 md:p-6 border-b lg:border-b-0 lg:border-r border-[rgba(13,37,61,0.08)] bg-canvas-paper flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              {/* Community Parameters */}
              <div className="space-y-3">
                <div>
                  <label htmlFor="community-name-input" className="text-xs font-semibold text-ink-primary block mb-1">
                    Community / Channel Name
                  </label>
                  <input
                    id="community-name-input"
                    type="text"
                    value={communityName}
                    onChange={(e) => {
                      setCommunityName(e.target.value);
                      setActivePresetId('custom');
                    }}
                    placeholder="e.g. Supabase Engineering Discord"
                    className="w-full px-3 py-2 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.15)] text-ink-primary text-xs focus:outline-none focus:ring-2 focus:ring-accent-500 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="platform-select" className="text-xs font-semibold text-ink-primary block mb-1">
                      Platform Source
                    </label>
                    <select
                      id="platform-select"
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value as 'Discord' | 'Telegram' | 'Slack')}
                      className="w-full px-3 py-1.5 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.15)] text-ink-primary text-xs font-mono focus:outline-none focus:ring-2 focus:ring-accent-500"
                    >
                      <option value="Discord">Discord Server</option>
                      <option value="Telegram">Telegram Group</option>
                      <option value="Slack">Slack Workspace</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="timeframe-select" className="text-xs font-semibold text-ink-primary block mb-1">
                      Timeframe Window
                    </label>
                    <select
                      id="timeframe-select"
                      value={timeframe}
                      onChange={(e) => setTimeframe(e.target.value as 'Last 24 Hours' | 'Past 7 Days')}
                      className="w-full px-3 py-1.5 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.15)] text-ink-primary text-xs font-mono focus:outline-none focus:ring-2 focus:ring-accent-500"
                    >
                      <option value="Last 24 Hours">Last 24 Hours</option>
                      <option value="Past 7 Days">Past 7 Days</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Message Ingestion Zone */}
              <div className="space-y-3 pt-2 border-t border-[rgba(13,37,61,0.08)]">
                <div className="flex items-center justify-between">
                  <label htmlFor="chatlog-textarea" className="text-xs font-semibold text-ink-primary flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-accent-500" />
                    <span>Raw Message Transcripts</span>
                  </label>
                  <span className="text-[10px] font-mono text-ink-secondary">
                    JSON / CSV / TXT / LOG
                  </span>
                </div>

                {/* Dropzone */}
                <div className="relative border-2 border-dashed border-[rgba(13,37,61,0.15)] hover:border-accent-500 rounded-xl p-4 text-center bg-canvas-base/60 transition-colors">
                  <input
                    type="file"
                    id="chatlog-file-upload"
                    multiple
                    accept=".txt,.json,.csv,.log,.md"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center space-y-1.5 pointer-events-none">
                    <Upload className="w-5 h-5 text-accent-500" />
                    <span className="text-xs font-medium text-ink-primary">
                      {isParsingFiles ? 'Parsing multi-channel logs...' : 'Drop chat exports, channel dumps, or logs'}
                    </span>
                    <span className="text-[10px] text-ink-secondary">
                      PII stripped in-memory. Zero chat logs stored.
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

                {/* Chat Log Editor */}
                <textarea
                  id="chatlog-textarea"
                  rows={7}
                  value={chatLogText}
                  onChange={(e) => {
                    setChatLogText(e.target.value);
                    setActivePresetId('custom');
                  }}
                  placeholder="Paste multi-channel chat logs e.g. [12:30] @user: Encountered a bug in..."
                  className="w-full p-3 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.15)] text-ink-primary text-xs font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-accent-500 resize-y"
                />
              </div>
            </div>

            {/* Ingestion Metric Badges */}
            <div className="p-3.5 rounded-xl bg-canvas-recessed/60 border border-[rgba(13,37,61,0.08)] text-xs text-ink-secondary space-y-1.5">
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span>Active Target Engine:</span>
                <strong className="text-ink-primary font-semibold">Gemini 3.5 Lite (Noise Filter)</strong>
              </div>
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span>Noise Reduction Rate:</span>
                <strong className="text-emerald-700 font-semibold">
                  {result?.spamFilteredPercentage || 0}% Spam Cleared
                </strong>
              </div>
            </div>
          </div>

          {/* Right Column: Multi-Tab Intelligence Canvas (7 cols) */}
          <div className="lg:col-span-7 bg-canvas-base flex flex-col justify-between">
            {/* Tab Controls Header */}
            <div className="px-5 py-3 bg-canvas-paper border-b border-[rgba(13,37,61,0.08)] flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setActiveTab('intelligence')}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-[0.97] flex items-center gap-1.5',
                    activeTab === 'intelligence'
                      ? 'bg-[#0D253D] text-white shadow-sm'
                      : 'text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed'
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
                      : 'text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed'
                  )}
                >
                  <Bug className="w-3.5 h-3.5 text-accent-500" />
                  <span>Action Items & Bugs ({result?.actionItemsAndBugs.length || 0})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('newsletter')}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-[0.97] flex items-center gap-1.5',
                    activeTab === 'newsletter'
                      ? 'bg-[#0D253D] text-white shadow-sm'
                      : 'text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed'
                  )}
                >
                  <Mail className="w-3.5 h-3.5 text-accent-secondary" />
                  <span>Newsletter Draft</span>
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
            <div className="p-5 md:p-6 flex-1 overflow-y-auto max-h-[640px] space-y-6">
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
                        {result.timeframeCovered} &bull; {result.filteredSignalMessages.toLocaleString()} signal messages from {result.totalRawMessages.toLocaleString()} ingested
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
                        <span>{result.sentimentScore}</span>
                        <span className="text-[8px] font-normal opacity-70">/100</span>
                      </div>
                    </div>
                  </div>

                  {/* Executive Brief Prose */}
                  <p className="text-xs text-ink-body leading-relaxed">
                    {result.executiveBrief}
                  </p>

                  {/* Signal Ratio Bar */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-[11px] font-mono text-ink-secondary">
                      <span>Signal Density ({result.filteredSignalMessages} messages)</span>
                      <span className="text-emerald-700 font-semibold">{result.spamFilteredPercentage}% Noise Filtered</span>
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

              {/* TAB 1: TOPIC CLUSTERS */}
              {activeTab === 'intelligence' && (
                <div className="space-y-4">
                  {result?.topicClusters.map((cluster) => (
                    <div
                      key={cluster.id}
                      className="p-5 rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.1)] shadow-sm space-y-3"
                    >
                      <div className="flex items-center justify-between gap-2 border-b border-[rgba(13,37,61,0.06)] pb-2.5">
                        <div className="flex items-center gap-2">
                          <Hash className="w-4 h-4 text-accent-500 shrink-0" />
                          <h4 className="font-semibold text-sm text-ink-primary">
                            {cluster.topicName}
                          </h4>
                        </div>
                        <div className="flex items-center gap-2 font-mono text-[11px]">
                          <span className="px-2 py-0.5 rounded bg-canvas-recessed text-ink-secondary">
                            {cluster.channelOrContext}
                          </span>
                          <span
                            className={cn(
                              'px-2 py-0.5 rounded font-semibold',
                              cluster.sentiment === 'Positive'
                                ? 'bg-emerald-50 text-emerald-800'
                                : cluster.sentiment === 'Negative'
                                ? 'bg-rose-50 text-rose-800'
                                : 'bg-amber-50 text-amber-800'
                            )}
                          >
                            {cluster.sentiment} ({cluster.sentimentScore}%)
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-ink-body leading-relaxed">
                        {cluster.summary}
                      </p>

                      {/* Quotations */}
                      {cluster.keyQuotations.length > 0 && (
                        <div className="space-y-1.5 pt-1">
                          <span className="text-[10px] font-mono uppercase font-bold text-accent-500 block">
                            Direct Community Voice:
                          </span>
                          {cluster.keyQuotations.map((quote, qIdx) => (
                            <blockquote
                              key={qIdx}
                              className="p-2.5 rounded-lg bg-canvas-recessed/50 border-l-2 border-accent-secondary text-xs text-ink-body font-mono italic leading-relaxed"
                            >
                              {quote}
                            </blockquote>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 2: ACTION ITEMS & BUGS */}
              {activeTab === 'actions' && (
                <div className="space-y-4">
                  {result?.actionItemsAndBugs.map((item) => (
                    <div
                      key={item.id}
                      className="p-5 rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.1)] shadow-sm space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={cn(
                                'text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase',
                                item.priority === 'Urgent'
                                  ? 'bg-rose-100 text-rose-800 border border-rose-400'
                                  : item.priority === 'High'
                                  ? 'bg-amber-100 text-amber-900 border border-amber-400'
                                  : 'bg-canvas-recessed text-ink-secondary'
                              )}
                            >
                              {item.priority} Priority
                            </span>
                            <span className="text-xs font-mono text-ink-secondary">
                              {item.type} &bull; Reported by <strong>{item.reporterHandle}</strong>
                            </span>
                          </div>
                          <h4 className="font-semibold text-sm text-ink-primary">
                            {item.title}
                          </h4>
                        </div>
                      </div>

                      <p className="text-xs text-ink-body leading-relaxed">
                        {item.description}
                      </p>

                      <div className="p-3 rounded-xl bg-canvas-recessed/70 border border-[rgba(13,37,61,0.08)] space-y-1 text-xs">
                        <span className="font-mono text-[10px] uppercase font-bold text-accent-500 block">
                          Recommended Engineering Triage:
                        </span>
                        <p className="text-ink-primary font-medium">{item.recommendedTriage}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 3: AUTOMATED NEWSLETTER DRAFT */}
              {activeTab === 'newsletter' && result?.formattedNewsletter && (
                <div className="p-6 rounded-3xl bg-canvas-paper border-2 border-[rgba(13,37,61,0.12)] shadow-md space-y-5">
                  <div className="border-b border-[rgba(13,37,61,0.08)] pb-3">
                    <span className="font-mono text-[10px] uppercase font-bold text-accent-500 block">
                      EMAIL NEWSLETTER DISPATCH
                    </span>
                    <h3 className="font-display text-2xl text-ink-primary font-normal mt-1">
                      {result.formattedNewsletter.headline}
                    </h3>
                  </div>

                  <p className="text-xs text-ink-body leading-relaxed">
                    {result.formattedNewsletter.introParagraph}
                  </p>

                  <div className="p-4 rounded-2xl bg-canvas-recessed/60 border border-[rgba(13,37,61,0.08)] space-y-2">
                    <span className="font-mono text-xs font-bold text-ink-primary block">
                      Spotlight Story
                    </span>
                    <p className="text-xs text-ink-body leading-relaxed">
                      {result.formattedNewsletter.spotlightSection}
                    </p>
                  </div>

                  {/* Shoutouts */}
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-ink-primary block">
                      Community Member Shoutouts:
                    </span>
                    {result.formattedNewsletter.communityShoutouts.map((shoutout, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 text-xs text-ink-body">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{shoutout}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-[rgba(13,37,61,0.06)] text-xs text-ink-secondary font-mono">
                    <strong>Closing Action:</strong> {result.formattedNewsletter.closingCallToAction}
                  </div>
                </div>
              )}

              {/* TAB 4: RAW JSON SPEC */}
              {activeTab === 'json' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-ink-secondary font-mono">
                    <span>STRUCTURED CHAT INTELLIGENCE PAYLOAD</span>
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
