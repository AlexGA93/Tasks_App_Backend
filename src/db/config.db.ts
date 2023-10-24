import { config } from 'dotenv';
config();
import mongoose from "mongoose";

// mongodb://127.0.0.1:27017/Tasks_App
const mongooseUri: string = `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`;

export const connectMongo = async () => {
    
  await mongoose
    .connect(mongooseUri, {
      directConnection: true,
      serverSelectionTimeoutMS: 2000,
    })
    .then(() => console.log('Connected to MongoDB database!'))
    .catch((err) => console.error(err));
};
