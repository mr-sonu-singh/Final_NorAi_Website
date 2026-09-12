/**
 * Client-side file and text parsing utilities for in-browser ephemeral processing.
 */

export interface ParsedCandidateFile {
  name: string;
  sizeBytes: number;
  extractedText: string;
  characterCount: number;
  estimatedTokens: number;
}

/**
 * Extracts plain text from an uploaded File object in the browser.
 */
export async function extractTextFromFile(file: File): Promise<ParsedCandidateFile> {
  const name = file.name;
  const sizeBytes = file.size;

  // Handle plain text, markdown, json, csv, and code files
  if (
    file.type.startsWith('text/') ||
    name.endsWith('.txt') ||
    name.endsWith('.md') ||
    name.endsWith('.json') ||
    name.endsWith('.csv') ||
    name.endsWith('.doc') ||
    name.endsWith('.docx')
  ) {
    const text = await file.text();
    const cleanText = sanitizeExtractedText(text);
    return {
      name,
      sizeBytes,
      extractedText: cleanText,
      characterCount: cleanText.length,
      estimatedTokens: estimateTokenCount(cleanText),
    };
  }

  // Handle PDF files (browser-friendly extraction fallback)
  if (file.type === 'application/pdf' || name.endsWith('.pdf')) {
    try {
      const buffer = await file.arrayBuffer();
      // Simple text stream reader fallback for PDF streams
      const decoder = new TextDecoder('utf-8');
      const raw = decoder.decode(buffer);
      // Extract readable ASCII string blocks from PDF binary
      const textMatches = raw.match(/[(]([a-zA-Z0-9\s.,;:\-@_#%/()]{3,})[)]/g);
      let pdfText = '';
      if (textMatches && textMatches.length > 5) {
        pdfText = textMatches
          .map((m) => m.replace(/^[()]+|[()]+$/g, ''))
          .join(' ')
          .replace(/\s+/g, ' ');
      }

      if (!pdfText || pdfText.length < 50) {
        // Fallback: decode text directly
        const cleanRaw = raw
          .replace(/[\x00-\x1F\x7F-\x9F]/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
        pdfText = cleanRaw.slice(0, 8000);
      }

      const cleanText = sanitizeExtractedText(pdfText);
      return {
        name,
        sizeBytes,
        extractedText: cleanText,
        characterCount: cleanText.length,
        estimatedTokens: estimateTokenCount(cleanText),
      };
    } catch {
      throw new Error(
        `Could not parse text from PDF file "${name}". Please paste the resume text directly.`,
      );
    }
  }

  // Default fallback for any other file
  const text = await file.text();
  const cleanText = sanitizeExtractedText(text);
  return {
    name,
    sizeBytes,
    extractedText: cleanText,
    characterCount: cleanText.length,
    estimatedTokens: estimateTokenCount(cleanText),
  };
}

/**
 * Strips non-printable characters and normalizes whitespace.
 */
export function sanitizeExtractedText(text: string): string {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\t/g, '  ')
    .replace(/[^\x20-\x7E\n\u0900-\u097F]/g, ' ') // Preserves ASCII and Devanagari Unicode
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Roughly estimates LLM token count (~4 characters per token on average).
 */
export function estimateTokenCount(text: string): number {
  if (!text) return 0;
  return Math.ceil(text.length / 4);
}

/**
 * Calculates estimated API cost for Gemini 3.5 Lite / 1.5 Flash.
 * Pricing reference: ~$0.075 per 1M input tokens, ~$0.30 per 1M output tokens.
 */
export function estimateApiCost(inputTokens: number, outputTokens: number): number {
  const inputCost = (inputTokens / 1_000_000) * 0.075;
  const outputCost = (outputTokens / 1_000_000) * 0.3;
  return Math.max(0.00001, Number((inputCost + outputCost).toFixed(5)));
}
