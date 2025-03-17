const bodyParser = require("body-parser");
const express = require("express");

const eventRoutes = require("./routes/events");
const authRoutes = require("./routes/auth");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:5173", // або твій порт фронтенду
    methods: "GET, POST, PATCH, DELETE",
    allowedHeaders: "Content-Type, Authorization",
  })
);

app.use("/events", eventRoutes);
app.use(authRoutes);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });
});

app.listen(8080);
