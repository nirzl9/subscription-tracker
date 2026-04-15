import express from "express";

import { PORT } from "./config/env.js";
import authrouter from "./routes/auth.routes.js";
import subscriptionrouter from "./routes/subscription.routes.js";
import userRouter from "./routes/user.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authrouter);
app.use("/api/v1/subscriptions", subscriptionrouter);
app.use("/api/v1/users", userRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("This is the Subscription Management API");
});

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectToDatabase();
});

export default app;
