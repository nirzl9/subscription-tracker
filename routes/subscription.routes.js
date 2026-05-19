import { Router } from "express";
import {
  createSubscription,
  getSubscriptions,
  getSubscriptionById,
  cancelSubscription,
  updateSubscription,
} from "../controllers/subscription.controller.js";
import { get } from "mongoose";
import authorize from "../middleware/auth.middleware.js";

const subscriptionrouter = Router();

subscriptionrouter.post("/", authorize, createSubscription);

subscriptionrouter.get("/", authorize, getSubscriptions);

subscriptionrouter.get("/user/:id", authorize, getSubscriptionById);

subscriptionrouter.put("/:id", authorize, updateSubscription);

subscriptionrouter.delete("/:id", authorize, cancelSubscription);

subscriptionrouter.get("/upcoming-renewals", authorize, (req, res) =>
  res.send({ title: "GET upcoming renewal subscriptions" }),
);

export default subscriptionrouter;
