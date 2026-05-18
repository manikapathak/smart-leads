import { cn } from '../../utils/cn';
import type { LeadStatus, LeadSource } from '../../types/lead.types';

const statusConfig: Record<LeadStatus, { label: string; class: string }> = {
  CONTACTED: { label: 'Contacted', class: 'bg-amber-50 text-amber-700 border border-amber-200' },
  QUALIFIED: { label: 'Qualified', class: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
  LOST: { label: 'Lost', class: 'bg-rose-50 text-rose-700 border border-rose-200' },
  NEW: { label: 'New', class: 'bg-slate-50 text-slate-700 border border-slate-200' },
};

const sourceConfig: Record<LeadSource, { label: string; class: string }> = {
  WEBSITE: { label: 'Website', class: 'bg-violet-50 text-violet-700 border border-violet-200' },
  INSTAGRAM: { label: 'Instagram', class: 'bg-pink-50 text-pink-700 border border-pink-200' },
  REFERRAL: { label: 'Referral', class: 'bg-blue-50 text-blue-700 border border-blue-200' },
  LINKEDIN: { label: 'LinkedIn', class: 'bg-indigo-50 text-indigo-700 border border-indigo-200' },
};

export function StatusBadge({ status }: { status: LeadStatus }) {
  const config = statusConfig[status];
  return (
    <span className={cn('badge', config.class)}>{config.label}</span>
  );
}

export function SourceBadge({ source }: { source: LeadSource }) {
  const config = sourceConfig[source];
  return (
    <span className={cn('badge', config.class)}>{config.label}</span>
  );
}
