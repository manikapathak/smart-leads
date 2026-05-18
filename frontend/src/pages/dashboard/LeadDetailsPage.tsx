import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Edit2, Trash2, Mail, Phone, Building2, CalendarDays, FileText } from 'lucide-react';
import { useLead, useDeleteLead } from '../../hooks/useLeads';
import { StatusBadge, SourceBadge } from '../../components/leads/LeadCard';
import { DeleteLeadModal } from '../../components/leads/DeleteLeadModal';
import { Button } from '../../components/common/Button';
import { Loader } from '../../components/common/Loader';
import { formatDateTime } from '../../utils/formatDate';
import { useAuth } from '../../hooks/useAuth';

function DetailRow({ icon, label, value }: { icon: React.ReactNode; label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-surface-100 flex items-center justify-center shrink-0 mt-0.5">
        <span className="text-slate-400">{icon}</span>
      </div>
      <div>
        <p className="text-xs text-slate-400">{label}</p>
        <p className="text-sm font-medium text-slate-700">{value}</p>
      </div>
    </div>
  );
}

export default function LeadDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const { data: lead, isLoading } = useLead(id!);
  const deleteMutation = useDeleteLead();
  const [showDelete, setShowDelete] = useState(false);

  const handleDelete = async () => {
    await deleteMutation.mutateAsync(id!);
    navigate('/dashboard/leads');
  };

  if (isLoading) return <Loader text="Loading lead…" />;
  if (!lead) return <p className="text-center text-slate-500 py-12">Lead not found.</p>;

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
          Back
        </Button>
        <div className="flex items-center gap-2">
          <Link to={`/dashboard/leads/${id}/edit`}>
            <Button variant="outline" size="sm" leftIcon={<Edit2 className="w-3.5 h-3.5" />}>
              Edit
            </Button>
          </Link>
          {isAdmin && (
            <Button variant="danger" size="sm" onClick={() => setShowDelete(true)} leftIcon={<Trash2 className="w-3.5 h-3.5" />}>
              Delete
            </Button>
          )}
        </div>
      </div>

      <div className="card p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-100 flex items-center justify-center">
              <span className="text-lg font-bold text-brand-700">{lead.name[0].toUpperCase()}</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-800">{lead.name}</h1>
              {lead.company && <p className="text-sm text-slate-500">{lead.company}</p>}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <StatusBadge status={lead.status} />
            <SourceBadge source={lead.source} />
          </div>
        </div>

        <hr className="border-surface-100" />

        {/* Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DetailRow icon={<Mail className="w-4 h-4" />} label="Email" value={lead.email} />
          <DetailRow icon={<Phone className="w-4 h-4" />} label="Phone" value={lead.phone} />
          <DetailRow icon={<Building2 className="w-4 h-4" />} label="Company" value={lead.company} />
          <DetailRow
            icon={<CalendarDays className="w-4 h-4" />}
            label="Created"
            value={formatDateTime(lead.createdAt)}
          />
        </div>

        {lead.notes && (
          <>
            <hr className="border-surface-100" />
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-surface-100 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-slate-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">Notes</p>
                <p className="text-sm text-slate-700 whitespace-pre-wrap">{lead.notes}</p>
              </div>
            </div>
          </>
        )}
      </div>

      <DeleteLeadModal
        lead={showDelete ? lead : null}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
