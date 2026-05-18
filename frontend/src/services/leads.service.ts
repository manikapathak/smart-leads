import api from '../api/axios';
import { ENDPOINTS } from '../api/endpoints';
import type {
  Lead,
  LeadFilters,
  LeadsResponse,
  CreateLeadPayload,
  UpdateLeadPayload,
} from '../types/lead.types';

export const leadsService = {
  async getLeads(filters: LeadFilters = {}): Promise<LeadsResponse> {
    const params: Record<string, string | number> = {};
    if (filters.page) params.page = filters.page;
    if (filters.limit) params.limit = filters.limit;
    if (filters.search) params.search = filters.search;
    if (filters.status) params.status = filters.status;
    if (filters.source) params.source = filters.source;
    if (filters.sortBy || filters.sortOrder) {
      const sortOrder = filters.sortOrder === 'asc' ? 'oldest' : 'latest';
      params.sort = sortOrder;
    }

    const { data } = await api.get<{ success: boolean; message: string; data: LeadsResponse }>(
      ENDPOINTS.LEADS_ALL,
      { params }
    );
    return data.data;
  },
  async getLead(id: string): Promise<Lead> {
    const { data } = await api.get<{ success: boolean; message: string; data: Lead }>(ENDPOINTS.LEAD_BY_ID, {
      params: { id },
    });
    return data.data;
  },

  async createLead(payload: CreateLeadPayload): Promise<Lead> {
    const { data } = await api.post<{ success: boolean; message: string; data: Lead }>(
      ENDPOINTS.LEADS_CREATE,
      payload
    );
    return data.data;
  },

  async updateLead(id: string, payload: UpdateLeadPayload): Promise<Lead> {
    const { data } = await api.patch<{ success: boolean; message: string; data: Lead }>(
      ENDPOINTS.LEAD_UPDATE,
      payload,
      {
        params: { id },
      }
    );
    return data.data;
  },

  async deleteLead(id: string): Promise<void> {
    await api.delete<{ success: boolean; message: string; data: unknown }>(ENDPOINTS.LEAD_DELETE, {
      params: { id },
    });
  },
};
