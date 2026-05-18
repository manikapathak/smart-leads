import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { leadsService } from '../services/leads.service';
import type { LeadFilters, CreateLeadPayload, UpdateLeadPayload } from '../types/lead.types';

export const LEADS_QUERY_KEY = 'leads';

export function useLeads(filters: LeadFilters = {}) {
  return useQuery({
    queryKey: [LEADS_QUERY_KEY, filters],
    queryFn: () => leadsService.getLeads(filters),
    placeholderData: (prev) => prev,
  });
}

export function useLead(id: string) {
  return useQuery({
    queryKey: [LEADS_QUERY_KEY, id],
    queryFn: () => leadsService.getLead(id),
    enabled: !!id,
  });
}

export function useCreateLead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateLeadPayload) => leadsService.createLead(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [LEADS_QUERY_KEY] });
      toast.success('Lead created!');
    },
    onError: (err: { response?: { data?: { message?: string } } }) => {
      toast.error(err.response?.data?.message || 'Failed to create lead');
    },
  });
}

export function useUpdateLead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateLeadPayload }) =>
      leadsService.updateLead(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [LEADS_QUERY_KEY] });
      toast.success('Lead updated!');
    },
    onError: (err: { response?: { data?: { message?: string } } }) => {
      toast.error(err.response?.data?.message || 'Failed to update lead');
    },
  });
}

export function useDeleteLead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => leadsService.deleteLead(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [LEADS_QUERY_KEY] });
      toast.success('Lead deleted');
    },
    onError: () => {
      toast.error('Failed to delete lead');
    },
  });
}
