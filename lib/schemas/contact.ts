import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be 100 characters or fewer'),
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .email('Invalid email address')
    .max(255, 'Email must be 255 characters or fewer'),
  company: z
    .string()
    .trim()
    .max(120, 'Company name must be 120 characters or fewer')
    .optional()
    .default(''),
  service: z
    .string({ required_error: 'Service selection is required' })
    .trim()
    .min(1, 'Service is required')
    .max(100, 'Service selection must be 100 characters or fewer')
    .default('AI Resume Shortlister'),
  message: z
    .string({ required_error: 'Message is required' })
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be 5000 characters or fewer'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
