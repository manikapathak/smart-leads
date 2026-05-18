export type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'LOST';
export type LeadSource = 'WEBSITE' | 'INSTAGRAM' | 'REFERRAL' | 'LINKEDIN';

export interface Lead {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: LeadStatus;
  source: LeadSource;
  notes?: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadFilters {
  status?: LeadStatus | '';
  source?: LeadSource | '';
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface LeadsResponse {
  leads: Lead[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

export interface CreateLeadPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: LeadStatus;
  source: LeadSource;
  notes?: string;
}

export type UpdateLeadPayload = Partial<CreateLeadPayload>;
