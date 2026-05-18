import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { LeadForm } from '../../components/leads/LeadForm';
import { Button } from '../../components/common/Button';
import { Loader } from '../../components/common/Loader';
import { useLead, useUpdateLead } from '../../hooks/useLeads';
import type { LeadInput } from '../../schemas/leads.schema';

export default function EditLeadPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: lead, isLoading } = useLead(id!);
  const updateMutation = useUpdateLead();

  const handleSubmit = async (data: LeadInput) => {
    await updateMutation.mutateAsync({ id: id!, payload: data });
    navigate(`/dashboard/leads/${id}`);
  };

  if (isLoading) return <Loader text="Loading lead…" />;

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
          Back
        </Button>
      </div>

      <div>
        <h1 className="text-xl font-semibold text-slate-800">Edit Lead</h1>
        <p className="text-sm text-slate-400 mt-0.5">
          Update details for <span className="text-slate-600 font-medium">{lead?.name}</span>
        </p>
      </div>

      <div className="card p-6">
        {lead && (
          <LeadForm
            defaultValues={lead}
            onSubmit={handleSubmit}
            isLoading={updateMutation.isPending}
            submitLabel="Save Changes"
          />
        )}
      </div>
    </div>
  );
}
