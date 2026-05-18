import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import type { LeadFilters as ILeadFilters } from '../../types/lead.types';

const statusOptions = [
  { label: 'All Statuses', value: '' },
  { label: 'Contacted', value: 'CONTACTED' },
  { label: 'Qualified', value: 'QUALIFIED' },
];

const sourceOptions = [
  { label: 'All Sources', value: '' },
  { label: 'Website', value: 'WEBSITE' },
  { label: 'Instagram', value: 'INSTAGRAM' },
];

interface LeadFiltersProps {
  filters: ILeadFilters;
  onChange: (filters: Partial<ILeadFilters>) => void;
  onReset: () => void;
}

export function LeadFilters({ filters, onChange, onReset }: LeadFiltersProps) {
  const hasFilters = !!(filters.search || filters.status || filters.source);

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
      <div className="flex items-center gap-1.5 text-slate-500 shrink-0">
        <SlidersHorizontal className="w-4 h-4" />
        <span className="text-sm font-medium">Filters</span>
      </div>

      {/* Search */}
      <div className="flex-1 min-w-[180px]">
        <Input
          placeholder="Search by name, email, company…"
          value={filters.search ?? ''}
          onChange={(e) => onChange({ search: e.target.value, page: 1 })}
          leftAddon={<Search className="w-3.5 h-3.5" />}
        />
      </div>

      {/* Status */}
      <div className="w-full sm:w-40">
        <Select
          options={statusOptions}
          value={filters.status ?? ''}
          onChange={(e) => onChange({ status: e.target.value as ILeadFilters['status'], page: 1 })}
        />
      </div>

      {/* Source */}
      <div className="w-full sm:w-40">
        <Select
          options={sourceOptions}
          value={filters.source ?? ''}
          onChange={(e) => onChange({ source: e.target.value as ILeadFilters['source'], page: 1 })}
        />
      </div>

      {/* Reset */}
      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={onReset} leftIcon={<X className="w-3.5 h-3.5" />}>
          Clear
        </Button>
      )}

    </div>
  );
}
