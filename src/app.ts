import express, { Express, Request, Response } from "express";
import { config } from "dotenv";
import cors from 'cors';
import { authRoutes, tasksRoutes, userRoutes } from "./routes";
config();

const app: Express = express();

app.use(cors());
app.use(express.json());

// routes
app.get("/", (req: Request, res: Response) =>
  res.status(200).json({ mssg: "Welcome to Tasks App" })
);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", tasksRoutes);

export default app;
