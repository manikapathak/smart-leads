import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { LeadForm } from '../../components/leads/LeadForm';
import { Button } from '../../components/common/Button';
import { useCreateLead } from '../../hooks/useLeads';
import type { LeadInput } from '../../schemas/leads.schema';

export default function CreateLeadPage() {
  const navigate = useNavigate();
  const createMutation = useCreateLead();

  const handleSubmit = async (data: LeadInput) => {
    await createMutation.mutateAsync(data);
    navigate('/dashboard/leads');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
          Back
        </Button>
      </div>

      <div>
        <h1 className="text-xl font-semibold text-slate-800">Create Lead</h1>
        <p className="text-sm text-slate-400 mt-0.5">Add a new lead to your pipeline</p>
      </div>

      <div className="card p-6">
        <LeadForm
          onSubmit={handleSubmit}
          isLoading={createMutation.isPending}
          submitLabel="Create Lead"
        />
      </div>
    </div>
  );
}
