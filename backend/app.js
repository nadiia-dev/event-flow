import bodyParser from "body-parser";
import express from "express";
import { router as eventRoutes } from "./routes/events.js";
import { router as authRoutes } from "./routes/auth.js";
import cors from "cors";

import "./db.js";

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use("/events", eventRoutes);
app.use(authRoutes);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });
});

app.listen(8080);
