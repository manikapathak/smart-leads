import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { leadSchema, type LeadInput } from '../../schemas/leads.schema';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import type { Lead } from '../../types/lead.types';

const statusOptions = [
  { label: 'Contacted', value: 'CONTACTED' },
  { label: 'Qualified', value: 'QUALIFIED' },
  { label: 'Lost', value: 'LOST' },
  { label: 'New', value: 'NEW' },
];

const sourceOptions = [
  { label: 'Website', value: 'WEBSITE' },
  { label: 'Instagram', value: 'INSTAGRAM' },
  { label: 'Referral', value: 'REFERRAL' },
  { label: 'LinkedIn', value: 'LINKEDIN' },
];

interface LeadFormProps {
  defaultValues?: Partial<Lead>;
  onSubmit: (data: LeadInput) => void;
  isLoading?: boolean;
  submitLabel?: string;
}

export function LeadForm({ defaultValues, onSubmit, isLoading, submitLabel = 'Save Lead' }: LeadFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: defaultValues?.name ?? '',
      email: defaultValues?.email ?? '',
      phone: defaultValues?.phone ?? '',
      company: defaultValues?.company ?? '',
      status: defaultValues?.status ?? 'NEW',
      source: defaultValues?.source ?? 'WEBSITE',
      notes: defaultValues?.notes ?? '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          placeholder="Jane Smith"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label="Email"
          type="email"
          placeholder="jane@example.com"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label="Phone"
          type="tel"
          placeholder="+91 98765 43210"
          error={errors.phone?.message}
          {...register('phone')}
        />
        <Input
          label="Company"
          placeholder="Acme Inc."
          error={errors.company?.message}
          {...register('company')}
        />
        <Select
          label="Status"
          options={statusOptions}
          error={errors.status?.message}
          {...register('status')}
        />
        <Select
          label="Source"
          options={sourceOptions}
          error={errors.source?.message}
          {...register('source')}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">Notes</label>
        <textarea
          rows={3}
          placeholder="Add any notes about this lead…"
          className="w-full px-3 py-2 rounded-lg border border-surface-300 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 hover:border-surface-400 resize-none transition-all"
          {...register('notes')}
        />
        {errors.notes && <p className="text-xs text-red-500">{errors.notes.message}</p>}
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="submit" loading={isLoading} size="md">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
