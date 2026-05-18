import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    console.log('connecting to db...');
    await mongoose.connect(process.env.MONGO_URI as string)
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed', error);
    process.exit(1);
  }
};