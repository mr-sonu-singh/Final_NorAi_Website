'use client';

import React, { useState } from 'react';
import { Button } from '@/components/atoms/Button';
import { Key, Eye, EyeOff, X, CheckCircle2, ShieldAlert } from 'lucide-react';
import { ByokSettings } from '@/lib/tools/types';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ByokSettings;
  onSave: (newSettings: ByokSettings) => void;
}

export function ApiKeyModal({
  isOpen,
  onClose,
  settings,
  onSave,
}: ApiKeyModalProps) {
  const [apiKey, setApiKey] = useState(settings.apiKey);
  const [showKey, setShowKey] = useState(false);
  const [preferredModel, setPreferredModel] = useState(settings.preferredModel);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      apiKey: apiKey.trim(),
      preferredModel,
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  const handleClear = () => {
    setApiKey('');
    onSave({
      apiKey: '',
      preferredModel: 'gemini-3.5-lite',
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0D253D]/60 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="api-key-modal-title"
    >
      <div className="relative w-full max-w-lg rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.15)] shadow-2xl p-6 md:p-8 space-y-6 text-left font-sans text-ink-primary">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[rgba(13,37,61,0.08)] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-50 text-accent-500 flex items-center justify-center">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 id="api-key-modal-title" className="font-display text-xl text-ink-primary font-normal">
                Bring Your Own Key (BYOK)
              </h3>
              <p className="text-xs text-ink-secondary">
                Direct browser-to-API inference with zero middleware logging.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed transition-colors"
            aria-label="Close API Key modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security Assurance Notice */}
        <div className="p-3.5 rounded-xl bg-accent-50/70 border border-accent-500/20 text-xs text-ink-body space-y-1">
          <div className="flex items-center gap-1.5 font-semibold text-accent-500">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>Client-Side Local Storage Only</span>
          </div>
          <p className="text-[11px] leading-relaxed text-ink-secondary">
            Your key is stored strictly inside your browser&apos;s localStorage and attached as a direct request header. It is never logged or stored in any database.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="gemini-api-key-input" className="block text-xs font-semibold text-ink-primary">
              Google Gemini API Key
            </label>
            <div className="relative">
              <input
                id="gemini-api-key-input"
                type={showKey ? 'text' : 'password'}
                placeholder="AIzaSy..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-3.5 py-2.5 pr-10 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.15)] text-ink-primary text-xs font-mono focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-secondary hover:text-ink-primary"
                aria-label={showKey ? 'Hide key' : 'Show key'}
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-ink-secondary">
              Get a free API key with generous free tier from{' '}
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-500 hover:underline font-medium"
              >
                Google AI Studio &rarr;
              </a>
            </p>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="preferred-model-select" className="block text-xs font-semibold text-ink-primary">
              Target High-Context Model
            </label>
            <select
              id="preferred-model-select"
              value={preferredModel}
              onChange={(e) =>
                setPreferredModel(e.target.value as ByokSettings['preferredModel'])
              }
              className="w-full px-3 py-2 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.15)] text-ink-primary text-xs font-mono focus:outline-none focus:ring-2 focus:ring-accent-500"
            >
              <option value="gemini-3.5-lite">Gemini 3.5 Lite (Recommended: High-Throughput & Structured)</option>
              <option value="gemini-1.5-flash">Gemini 1.5 Flash (1M Tokens Context)</option>
              <option value="gemini-1.5-pro">Gemini 1.5 Pro (Deep Reasoning & Multimodal)</option>
            </select>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 flex items-center justify-between border-t border-[rgba(13,37,61,0.08)]">
            <button
              type="button"
              onClick={handleClear}
              className="text-xs text-accent-500 hover:underline font-medium"
            >
              Clear Stored Key
            </button>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                className="gap-1.5"
              >
                {savedSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <span>Save Configuration</span>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
