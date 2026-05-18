
import mongoose, { Schema, Document } from 'mongoose';

export enum UserRole {
  ADMIN = 'ADMIN',
  SALES = 'SALES'
}

export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password_hash: string;
  role: UserRole;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    username: {type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.SALES
    }
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);
