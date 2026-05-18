import { useNavigate } from 'react-router-dom';
import { ArrowUpDown, ChevronLeft, ChevronRight, Edit2, Trash2, Eye } from 'lucide-react';
import { Table } from '../common/Table';
import { Button } from '../common/Button';
import { Loader } from '../common/Loader';
import { EmptyState } from '../common/EmptyState';
import { StatusBadge, SourceBadge } from './LeadCard';
import type { Lead, LeadFilters } from '../../types/lead.types';
import { formatDate } from '../../utils/formatDate';
import { cn } from '../../utils/cn';

interface LeadsTableProps {
  leads: Lead[];
  total: number;
  totalPages: number;
  isLoading: boolean;
  filters: LeadFilters;
  onFilterChange: (f: Partial<LeadFilters>) => void;
  onDelete: (lead: Lead) => void;
  canDelete?: boolean;
}

export function LeadsTable({
  leads,
  total,
  totalPages,
  isLoading,
  filters,
  onFilterChange,
  onDelete,
  canDelete = false,
}: LeadsTableProps) {
  const navigate = useNavigate();
  const page = filters.page ?? 1;
  const limit = filters.limit ?? 10;

  const handleSort = (field: string) => {
    const sameField = filters.sortBy === field;
    onFilterChange({
      sortBy: field,
      sortOrder: sameField && filters.sortOrder === 'asc' ? 'desc' : 'asc',
    });
  };

  const SortIcon = ({ field }: { field: string }) => (
    <ArrowUpDown
      className={cn(
        'inline w-3 h-3 ml-1 transition-opacity',
        filters.sortBy === field ? 'opacity-100 text-brand-500' : 'opacity-30'
      )}
    />
  );

  const columns = [
    {
      key: 'name',
      header: (
        <button onClick={() => handleSort('name')} className="flex items-center hover:text-slate-700">
          Name <SortIcon field="name" />
        </button>
      ),
      cell: (lead: Lead) => (
        <div>
          <p className="font-medium text-slate-800">{lead.name}</p>
          <p className="text-xs text-slate-400">{lead.email}</p>
        </div>
      ),
    },
    {
      key: 'company',
      header: 'Company',
      cell: (lead: Lead) => (
        <span className="text-slate-600">{lead.company || <span className="text-slate-300">—</span>}</span>
      ),
    },
    {
      key: 'status',
      header: (
        <button onClick={() => handleSort('status')} className="flex items-center hover:text-slate-700">
          Status <SortIcon field="status" />
        </button>
      ),
      cell: (lead: Lead) => <StatusBadge status={lead.status} />,
    },
    {
      key: 'source',
      header: 'Source',
      cell: (lead: Lead) => <SourceBadge source={lead.source} />,
    },
    {
      key: 'createdAt',
      header: (
        <button onClick={() => handleSort('createdAt')} className="flex items-center hover:text-slate-700">
          Created <SortIcon field="createdAt" />
        </button>
      ),
      cell: (lead: Lead) => (
        <span className="text-slate-500 text-xs">{formatDate(lead.createdAt)}</span>
      ),
    },
    {
      key: 'actions',
      header: '',
      className: 'w-24',
      cell: (lead: Lead) => (
        <div className="flex items-center gap-1 justify-end">
          <button
            onClick={(e) => { e.stopPropagation(); navigate(`/dashboard/leads/${lead._id}`); }}
            className="p-1.5 rounded hover:bg-surface-100 text-slate-400 hover:text-brand-600 transition-colors"
            title="View"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); navigate(`/dashboard/leads/${lead._id}/edit`); }}
            className="p-1.5 rounded hover:bg-surface-100 text-slate-400 hover:text-brand-600 transition-colors"
            title="Edit"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          {canDelete && (
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(lead); }}
              className="p-1.5 rounded hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
              title="Delete"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      ),
    },
  ];

  if (isLoading) return <Loader text="Loading leads…" />;
  if (!leads.length) {
    return (
      <EmptyState
        title="No leads found"
        description="Try adjusting your filters or create a new lead."
      />
    );
  }

  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <div className="flex flex-col gap-4">
      <Table
        columns={columns}
        data={leads}
        keyExtractor={(l) => l._id}
        onRowClick={(lead) => navigate(`/dashboard/leads/${lead._id}`)}
      />

      {/* Pagination */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-slate-500">
          Showing {from}–{to} of {total} leads
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => onFilterChange({ page: page - 1 })}
            leftIcon={<ChevronLeft className="w-3.5 h-3.5" />}
          >
            Prev
          </Button>
          {/* Page numbers */}
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const p = i + 1;
              return (
                <button
                  key={p}
                  onClick={() => onFilterChange({ page: p })}
                  className={cn(
                    'w-8 h-8 rounded-lg text-sm font-medium transition-colors',
                    p === page
                      ? 'bg-brand-600 text-white'
                      : 'text-slate-600 hover:bg-surface-100'
                  )}
                >
                  {p}
                </button>
              );
            })}
          </div>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => onFilterChange({ page: page + 1 })}
            rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
