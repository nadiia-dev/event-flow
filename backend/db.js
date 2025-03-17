import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

const DB_URI = process.env.DB_URI;

mongoose
  .connect(DB_URI)
  .then(() => console.log("DB connected!"))
  .catch((e) => {
    console.log("Database connection error", e);
    process.exit(1);
  });
