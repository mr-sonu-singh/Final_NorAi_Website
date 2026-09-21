import { z } from 'zod';

export const envSchema = z.object({
  // Public client-exposed variables (must be prefixed with NEXT_PUBLIC_)
  NEXT_PUBLIC_SITE_URL: z.string().url().default('https://norai.tech'),
  NEXT_PUBLIC_ANALYTICS_ID: z.string().optional(),

  // Server-side contact addresses
  CONTACT_SALES_EMAIL: z.string().email().default('sales@noraitech.com'),
  CONTACT_CAREERS_EMAIL: z.string().email().default('careers@noraitech.com'),
  CONTACT_PRESS_EMAIL: z.string().email().default('press@noraitech.com'),

  // Server-side secrets & model credentials (NEVER prefix with NEXT_PUBLIC_)
  GEMINI_API_KEY: z.string().optional(),
  GEMINI_MODEL: z.string().optional().default('gemini-3.5-lite'),
  EMAIL_USER: z.string().optional(),
  EMAIL_PASS: z.string().optional(),
  ANALYZE: z.enum(['true', 'false']).optional(),
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(): Env {
  const result = envSchema.safeParse({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_ANALYTICS_ID: process.env.NEXT_PUBLIC_ANALYTICS_ID,
    CONTACT_SALES_EMAIL: process.env.CONTACT_SALES_EMAIL,
    CONTACT_CAREERS_EMAIL: process.env.CONTACT_CAREERS_EMAIL,
    CONTACT_PRESS_EMAIL: process.env.CONTACT_PRESS_EMAIL,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    GEMINI_MODEL: process.env.GEMINI_MODEL,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    ANALYZE: process.env.ANALYZE,
  });

  if (!result.success) {
    console.error('Environment validation failed:', result.error.flatten().fieldErrors);
    throw new Error('Invalid environment variables');
  }

  return result.data;
}
