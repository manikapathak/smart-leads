import { Request, Response } from 'express';

import leadsService  from '../services/leads.service';

import asyncHandler  from '../utils/asyncHandler'

import { sendApiResponse  } from '../utils/ApiResponse';

const leadsController = {
  createLead: asyncHandler(
    async (req: Request, res: Response) => {
        const userId = req.user?.id;
      const lead =
        await leadsService.createLead({
          ...req.body,

          createdBy: userId
        });

      return sendApiResponse( 
          res,
          201,
          true,
          lead,
          'Lead created successfully'
        )
    }
  ),


  getAllLeads: asyncHandler(
    async (req: Request, res: Response) => {
      const {
        page,
        limit,
        search,
        status,
        source,
        sort
      } = req.query;

      const leads =
        await leadsService.getAllLeads({
          page: Number(page) || 1,

          limit: Number(limit) || 10,

          search: search as string,

          status: status as any,

          source: source as any,

          sort: sort as 'latest' | 'oldest'
        });
      return sendApiResponse(
          res,
          200,
          true,
          {
            leads: leads.leads,
            total: leads.pagination.total,
            page: leads.pagination.page,
            totalPages: leads.pagination.totalPages,
            limit: leads.pagination.limit,
          },
          'Leads fetched successfully'
        )
    }
  ),

  getLeadById: asyncHandler(
    async (req: Request, res: Response) => {
      const leadId = req.query.id as string;
      const lead = await leadsService.getLeadById(leadId);

      return sendApiResponse(
          res,
          200,
          true,
          lead,
          'Lead found successfully'
        )
    }
  ),


  updateLead: asyncHandler(
    async (req: Request, res: Response) => {
      const leadId = req.query.id as string;

      const updatedLead = await leadsService.updateLead(leadId, req.body);

      return sendApiResponse(
          res,
          200,
          true,
          updatedLead,
          'Lead updated successfully'
        )
    }
  ),


  deleteLead: asyncHandler(
    async (req: Request, res: Response) => {
      const leadId = req.query.id as string;

      const result = await leadsService.deleteLead(leadId);

      return sendApiResponse(
          res,
          200,
          true,
          result,
          'Lead deleted successfully'
        )
    }
  )
};

export default leadsController