import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, TrendingUp, UserCheck, UserX, Plus, ArrowUpRight } from 'lucide-react';
import { useLeads, useDeleteLead } from '../../hooks/useLeads';
import { LeadsTable } from '../../components/leads/LeadsTable';
import { LeadFilters } from '../../components/leads/LeadFilters';
import { DeleteLeadModal } from '../../components/leads/DeleteLeadModal';
import { Button } from '../../components/common/Button';
import { useDebounce } from '../../hooks/useDebounce';
import { useAuth } from '../../hooks/useAuth';
import type { Lead, LeadFilters as ILeadFilters } from '../../types/lead.types';

interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
  trend?: string;
}

function StatCard({ label, value, icon, color, trend }: StatCardProps) {
  return (
    <div className="card p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">{label}</span>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
          {icon}
        </div>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-semibold text-slate-800">{value}</span>
        {trend && (
          <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
            <ArrowUpRight className="w-3 h-3" />
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}

const DEFAULT_FILTERS: ILeadFilters = { page: 1, limit: 10 };

export default function DashboardPage() {
  const { isAdmin } = useAuth();
  const [filters, setFilters] = useState<ILeadFilters>(DEFAULT_FILTERS);
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);
  const debouncedSearch = useDebounce(filters.search ?? '', 400);

  const { data, isLoading } = useLeads({ ...filters, search: debouncedSearch });
  const deleteMutation = useDeleteLead();

  // Stats from the full dataset
  const { data: statsData } = useLeads({ limit: 1000 });
  const leads = statsData?.leads ?? [];
  const stats = {
    total: statsData?.total ?? 0,
    qualified: leads.filter((l) => l.status === 'QUALIFIED').length,
    contacted: leads.filter((l) => l.status === 'CONTACTED').length,
    lost: leads.filter((l) => l.status === 'LOST').length,
  };

  const handleFilterChange = (partial: Partial<ILeadFilters>) =>
    setFilters((prev) => ({ ...prev, ...partial }));

  const handleReset = () => setFilters(DEFAULT_FILTERS);

  const handleDeleteConfirm = async () => {
    if (!leadToDelete) return;
    await deleteMutation.mutateAsync(leadToDelete._id);
    setLeadToDelete(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Dashboard</h1>
          <p className="text-sm text-slate-400 mt-0.5">Manage and track your leads</p>
        </div>
        <Link to="/dashboard/leads/create">
          <Button leftIcon={<Plus className="w-4 h-4" />}>New Lead</Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Leads"
          value={stats.total}
          icon={<Users className="w-4 h-4 text-brand-600" />}
          color="bg-brand-50"
        />
        <StatCard
          label="Qualified"
          value={stats.qualified}
          icon={<UserCheck className="w-4 h-4 text-emerald-600" />}
          color="bg-emerald-50"
        />
        <StatCard
          label="Contacted"
          value={stats.contacted}
          icon={<TrendingUp className="w-4 h-4 text-amber-600" />}
          color="bg-amber-50"
        />
        <StatCard
          label="Lost"
          value={stats.lost}
          icon={<UserX className="w-4 h-4 text-red-500" />}
          color="bg-red-50"
        />
      </div>

      {/* Leads table card */}
      <div className="card">
        <div className="px-5 py-4 border-b border-surface-100">
          <LeadFilters
            filters={filters}
            onChange={handleFilterChange}
            onReset={handleReset}
          />
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
