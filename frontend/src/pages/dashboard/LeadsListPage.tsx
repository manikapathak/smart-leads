import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useLeads, useDeleteLead } from '../../hooks/useLeads';
import { LeadsTable } from '../../components/leads/LeadsTable';
import { LeadFilters } from '../../components/leads/LeadFilters';
import { DeleteLeadModal } from '../../components/leads/DeleteLeadModal';
import { Button } from '../../components/common/Button';
import { useDebounce } from '../../hooks/useDebounce';
import { useAuth } from '../../hooks/useAuth';
import type { Lead, LeadFilters as ILeadFilters } from '../../types/lead.types';

const DEFAULT_FILTERS: ILeadFilters = { page: 1, limit: 10 };

export default function LeadsListPage() {
  const { isAdmin } = useAuth();
  const [filters, setFilters] = useState<ILeadFilters>(DEFAULT_FILTERS);
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);
  const debouncedSearch = useDebounce(filters.search ?? '', 400);

  const { data, isLoading } = useLeads({ ...filters, search: debouncedSearch });
  const deleteMutation = useDeleteLead();

  const handleFilterChange = (partial: Partial<ILeadFilters>) =>
    setFilters((prev) => ({ ...prev, ...partial }));

  const handleDeleteConfirm = async () => {
    if (!leadToDelete) return;
    await deleteMutation.mutateAsync(leadToDelete._id);
    setLeadToDelete(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">All Leads</h1>
          <p className="text-sm text-slate-400 mt-0.5">{data?.total ?? 0} leads total</p>
        </div>
        <Link to="/dashboard/leads/create">
          <Button leftIcon={<Plus className="w-4 h-4" />}>New Lead</Button>
        </Link>
      </div>

      <div className="card">
        <div className="px-5 py-4 border-b border-surface-100">
          <LeadFilters filters={filters} onChange={handleFilterChange} onReset={() => setFilters(DEFAULT_FILTERS)} />
        </div>
        <div className="p-5">
          <LeadsTable
            leads={data?.leads ?? []}
            total={data?.total ?? 0}
            totalPages={data?.totalPages ?? 1}
            isLoading={isLoading}
            filters={filters}
            onFilterChange={handleFilterChange}
            onDelete={setLeadToDelete}
            canDelete={isAdmin}
          />
        </div>
      </div>

      <DeleteLeadModal
        lead={leadToDelete}
        onClose={() => setLeadToDelete(null)}
        onConfirm={handleDeleteConfirm}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
