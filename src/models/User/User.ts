import mongoose from "mongoose";
import { UserType } from "../../types/types";

const UserSchema = new mongoose.Schema<UserType>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


export default mongoose.model("user", UserSchema);