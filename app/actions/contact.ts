'use server';

import { headers } from 'next/headers';
import { submitContactForm, type ServiceResponse } from '@/lib/services/contact';
import type { ContactFormData } from '@/lib/schemas/contact';
import { checkRateLimit, getClientIp } from '@/lib/security';

export async function handleContactSubmission(formData: ContactFormData): Promise<ServiceResponse> {
  const reqHeaders = await headers();
  const clientIp = getClientIp(reqHeaders);

  const rateLimit = checkRateLimit(`contact:${clientIp}`, {
    maxRequests: 5,
    windowMs: 15 * 60 * 1000,
  });

  if (!rateLimit.success) {
    return {
      success: false,
      message: 'Too many contact requests from your IP. Please try again later.',
    };
  }

  return await submitContactForm(formData);
}
