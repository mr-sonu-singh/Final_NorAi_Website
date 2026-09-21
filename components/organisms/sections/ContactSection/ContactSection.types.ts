import { BreadcrumbItem } from '@/components/molecules/Breadcrumb';
import { SocialLinkItem } from '@/components/molecules/SocialLinks';

export interface DirectEmailConfig {
  sales?: string;
  careers?: string;
  press?: string;
}

export type ContactSectionStatus = 'idle' | 'submitting' | 'success' | 'error';
export type ContactSectionVariant = 'split' | 'stacked';

export interface ContactFormData extends Record<string, unknown> {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormFieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

export interface ContactSectionProps {
  heading?: string;
  onSubmit: (data: ContactFormData) => void | Promise<void>;
  fieldErrors?: ContactFormFieldErrors;
  status?: ContactSectionStatus;
  directEmails?: DirectEmailConfig;
  variant?: ContactSectionVariant;
  breadcrumb?: BreadcrumbItem[];
  socialLinks?: SocialLinkItem[];
}
