import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import { buildMetadata, getOrganizationJsonLd, getWebSiteJsonLd, JsonLd } from '@/lib/seo';
import {
  MotionProvider,
  SmoothScrollProvider,
  AnalyticsProvider,
  ToastProvider,
} from '@/providers';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
  adjustFontFallback: true,
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
  preload: true,
  fallback: ['Georgia', 'serif'],
  adjustFontFallback: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  preload: true,
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
  adjustFontFallback: true,
});

export const metadata: Metadata = buildMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <JsonLd schema={getOrganizationJsonLd()} />
        <JsonLd schema={getWebSiteJsonLd()} />
      </head>
      <body className="min-h-screen bg-bg-page text-primary-800 font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:rounded-lg focus:bg-canvas-paper focus:text-ink-primary focus:border focus:border-accent-500 focus:shadow-lg focus:font-medium focus:text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
        >
          Skip to main content
        </a>
        <SmoothScrollProvider>
          <MotionProvider>
            <AnalyticsProvider>
              <ToastProvider>{children}</ToastProvider>
            </AnalyticsProvider>
          </MotionProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
