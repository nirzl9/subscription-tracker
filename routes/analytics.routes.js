import { Router } from "express";
import { getAnalytics } from "../controllers/analytics.controller.js";
import authorize from "../middleware/auth.middleware.js";

const analyticsRouter = Router();

analyticsRouter.get("/", authorize, getAnalytics);

export default analyticsRouter;
