
import mongoose, { Schema, Document } from 'mongoose';

export enum LeadStatus {
  NEW = 'NEW',
  CONTACTED = 'CONTACTED',
  QUALIFIED = 'QUALIFIED',
  LOST = 'LOST'
}

export enum LeadSource {
  WEBSITE = 'WEBSITE',
  INSTAGRAM = 'INSTAGRAM',
  REFERRAL = 'REFERRAL',
  LINKEDIN = 'LINKEDIN'
}

export interface ILead extends Document {
  name: string;
  email: string;
  phone: string;
  company: string;
  status: LeadStatus;
  source: LeadSource;
  notes: string;
  createdBy: mongoose.Types.ObjectId;
}

const leadSchema = new Schema<ILead>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: {type: String},
    company: {type: String},
    notes : {type: String},
    status: {
      type: String,
      enum: Object.values(LeadStatus),
      default: LeadStatus.NEW
    },
    source: {
      type: String,
      enum: Object.values(LeadSource),
      required: true
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

export const Lead = mongoose.model<ILead>('Lead', leadSchema);
