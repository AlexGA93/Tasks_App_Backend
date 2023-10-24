import mongoose, { Types } from "mongoose";

export interface IUser {
    username: string;
    email: string;
    password: string;
}

export interface ITask {
    title: string;
    description: string;
    user: IUser
}

export type UserType = IUser & mongoose.Document;
export type TaskType = ITask & mongoose.Document;

export interface PayloadType {
  id: Types.ObjectId;
}