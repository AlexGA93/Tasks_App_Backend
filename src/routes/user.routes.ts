import express, { Router } from "express";
import { getUser } from "../controllers";
import { authenticationByUser } from "../middleware";
const router: Router = express.Router();

router.get("/user", authenticationByUser, getUser);

export default router;
