import { Request, Response } from "express";
import Task from "../../models/Task/Task";
import { verifyToken } from "../../middleware";

export const getTasks = async (req: Request, res: Response) => {
  try {
    // extract user id from token
    const userId: string = verifyToken(
      req.headers["x-auth-token"] as string
    ).id;
    const tasks = await Task.find({ user: userId });
    return res.status(200).json({ tasks });
  } catch (error) {
    return res.status(500).json({ mssg: "error getting tasks" });
  }
};

export const getTask = async (req: Request, res: Response) => {
  // extract task id
  try {
    const userId: string = verifyToken(
      req.headers["x-auth-token"] as string
    ).id;
    const [task] = await Task.find({ _id: req.params.id, user: userId });

    if (!task) {
      return res.status(404).json({ mssg: "task not found" });
    }

    return res.status(200).json({ title: task.title, description: task.description });
  } catch (error) {
    return res.status(500).json({ mssg: "error getting task" });
  }
};

export const createTasks = async (req: Request, res: Response) => {
  try {
    // extract info from body
    const { title, description } = req.body;
    // prepare new task body
    const newTask = new Task({
      title,
      description,
      user: verifyToken(req.headers["x-auth-token"] as string).id,
    });
    // store in database
    await newTask.save();

    return res.status(200).json({ status: 'ok', mssg: "Task created successfully" });
  } catch (error) {
    return res.status(500).json({ mssg: "error inserting new task" });
  }
};

export const updateTasks = async (req: Request, res: Response) => {
  try {
    const userId: string = verifyToken(
      req.headers["x-auth-token"] as string
    ).id;
    const taskId: string = req.params.id;

    const { title, description } = req.body;

    const taskUpdated = await Task.findOneAndUpdate(
      { _id: taskId, user: userId },
      { title, description },
      { new: true }
    );

    if (!taskUpdated) {
      return res.status(404).json({ mssg: "task not found" });
    }

    return res.status(200).json({ taskUpdated });
  } catch (error) {
    return res.status(500).json({ mssg: "error updating task" });
  }
};

export const deleteTasks = async (req: Request, res: Response) => {
  try {
    const userId: string = verifyToken(
      req.headers["x-auth-token"] as string
    ).id;
    const taskId: string = req.params.id;

    const deletedTask = await Task.deleteOne({ _id: taskId, user: userId });

    if (deletedTask.deletedCount === 0) {
      return res.status(404).json({ mssg: "task not found" });
    }

    return res.status(200).json({ deletedTask });
  } catch (error) {
    return res.status(500).json({ mssg: "error deleting task" });
  }
};
