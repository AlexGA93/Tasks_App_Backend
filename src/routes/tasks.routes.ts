import express, { Router } from "express";
import {
  createTasks,
  deleteTasks,
  getTask,
  getTasks,
  updateTasks,
} from "../controllers";
import { authenticationByUser } from "../middleware";
const router: Router = express.Router();

router.get("/", authenticationByUser, getTasks);
router.get("/:id", authenticationByUser, getTask);
router.post("/", authenticationByUser, createTasks);
router.put("/:id", authenticationByUser, updateTasks);
router.delete("/:id", authenticationByUser, deleteTasks);

export default router;
