import { FilterQuery, SortOrder } from 'mongoose';

import { ILead, Lead, LeadSource, LeadStatus} from '../models/lead.model'

interface GetAllLeadsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: LeadStatus;
  source?: LeadSource;
  sort?: 'latest' | 'oldest';
}

const leadsRepository  = {
  async createLead(payload: Partial<ILead>):
  Promise<ILead> {
    const lead = await Lead.create(payload);

    return lead;
  },

async getAllLeads({page = 1, limit = 10, search, status, source, sort = 'latest'}: 
    GetAllLeadsParams) {
    const skip = (page - 1) * limit;

    const filters: FilterQuery<ILead> = {};

    if (search) {
      filters.$or = [
        {
          name: {
            $regex: search,
            $options: 'i'
          }
        },
        {
          email: {
            $regex: search,
            $options: 'i'
          }
        }
      ];
    }
    if (status) {
      filters.status = status;
    }
    if (source) {
      filters.source = source;
    }

    const sortOption : {createdAt : SortOrder} =
      sort === 'latest'
        ? { createdAt: -1 }
        : { createdAt: 1 };

    const [leads, total] = await Promise.all([
      Lead.find(filters)
        .populate('createdBy', 'name email role')
        .sort(sortOption)
        .skip(skip)
        .limit(limit),

      Lead.countDocuments(filters)
    ]);

    return {
      leads,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  },

  async getLeadById(
    leadId: string
  ): Promise<ILead | null> {
    const lead = await Lead.findById(leadId)
      .populate('createdBy', 'name email role');

    return lead;
  },

  async updateLead(
    leadId: string,
    payload: Partial<ILead>
  ): Promise<ILead | null> {
    const updatedLead = await Lead.findByIdAndUpdate(
      leadId,
      payload,
      {
        new: true,
        runValidators: true
      }
    );

    return updatedLead;
  },

  async deleteLead(
    leadId: string
  ): Promise<ILead | null> {
    const deletedLead = await Lead.findByIdAndDelete(
      leadId
    );

    return deletedLead;
  }
}

export default leadsRepository