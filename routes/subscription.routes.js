import { Router } from "express";
import { createSubscription } from "../controllers/subscription.controller.js";

const subscriptionrouter = Router();

subscriptionrouter.get("/", (req, res) =>
  res.send({ title: "GET all subscriptions" }),
);

subscriptionrouter.get("/", (req, res) =>
  res.send({ title: "GET all user subscriptions" }),
);

subscriptionrouter.put("/:id", (req, res) =>
  res.send({ title: "UPDATE User subscription" }),
);

subscriptionrouter.delete("/:id", (req, res) =>
  res.send({ title: "DELETE User subscription" }),
);

subscriptionrouter.post("/", createSubscription);

subscriptionrouter.get("/user/:id", (req, res) =>
  res.send({ title: "GET user subscription details" }),
);

subscriptionrouter.put("/:id/cancel", (req, res) =>
  res.send({ title: "CANCEL user subscription" }),
);

subscriptionrouter.get("/upcoming-renewals", (req, res) =>
  res.send({ title: "GET upcoming renewal subscriptions" }),
);

export default subscriptionrouter;
