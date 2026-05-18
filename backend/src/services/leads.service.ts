import mongoose from 'mongoose';

import leadsRepository from '../repositories/leads.repository'

import {ILead, LeadSource,LeadStatus} from '../models/lead.model';

interface CreateLeadPayload {
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdBy: string;
}

interface UpdateLeadPayload {
  name?: string;
  email?: string;
  status?: LeadStatus;
  source?: LeadSource;
}

interface GetAllLeadsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: LeadStatus;
  source?: LeadSource;
  sort?: 'latest' | 'oldest';
}

export const leadsService = {
  async createLead(payload: CreateLeadPayload) {
    const existingLead = await leadsRepository.getAllLeads({
        search: payload.email,
        limit: 1
      });

    if (existingLead.leads.length > 0) {
      throw new Error('Lead with this email already exists');
    }

    const lead = await leadsRepository.createLead({
      ...payload,
      createdBy: new mongoose.Types.ObjectId(payload.createdBy)
    });

    return lead;
  },


  async getAllLeads(params: GetAllLeadsParams) {
    const leads =
      await leadsRepository.getAllLeads(params);

    return leads;
  },


  async getLeadById(leadId: string) {

    if (!mongoose.Types.ObjectId.isValid(leadId)) {
      throw new Error('Invalid lead ID');
    }

    const lead = await leadsRepository.getLeadById(leadId);

    if (!lead) {
      throw new Error('Lead not found');
    }

    return lead;
  },


  async updateLead(
    leadId: string,
    payload: UpdateLeadPayload
    ) {

    if (!mongoose.Types.ObjectId.isValid(leadId)) {
      throw new Error('Invalid lead ID');
    }

    const existingLead =
      await leadsRepository.getLeadById(leadId);

    if (!existingLead) {
      throw new Error('Lead not found');
    }
    const updatedLead =
      await leadsRepository.updateLead(
        leadId,
        payload
      );

    return updatedLead;
  },

  async deleteLead(leadId: string) {

    if (!mongoose.Types.ObjectId.isValid(leadId)) {
      throw new Error('Invalid lead ID');
    }

    const existingLead =
      await leadsRepository.getLeadById(leadId);

    if (!existingLead) {
      throw new Error('Lead not found');
    }

    await leadsRepository.deleteLead(leadId);

    return {
      message: 'Lead deleted successfully'
    };
  }
};

export default leadsService