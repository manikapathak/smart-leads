import { z } from 'zod';

export const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Enter a valid email'),
  phone: z.string().optional(),
  company: z.string().optional(),
  status: z.enum(['QUALIFIED', 'CONTACTED', 'LOST', 'NEW']),
  source: z.enum(['WEBSITE', 'INSTAGRAM', 'REFERRAL', 'LINKEDIN']),
  notes: z.string().max(1000).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
