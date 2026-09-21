'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { initAnalytics } from '@/lib/services/analytics';

const AnalyticsContext = createContext<boolean>(true);

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initAnalytics(process.env.NEXT_PUBLIC_ANALYTICS_ID);
  }, []);

  return <AnalyticsContext.Provider value={true}>{children}</AnalyticsContext.Provider>;
}

export const useAnalytics = () => useContext(AnalyticsContext);
