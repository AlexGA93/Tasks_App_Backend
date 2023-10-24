import mongoose from "mongoose";
import { TaskType } from "../../types/types";

const TaskSchema = new mongoose.Schema<TaskType>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);


export default mongoose.model("task", TaskSchema);