import express from "express";
import { getAll, get, add, replace, remove } from "../data/event.js";
import { checkAuthMiddleware } from "../util/auth.js";
import validate from "../util/validation.js";
import { eventSchema } from "../schemas/eventSchema.js";
import isValidId from "../util/isValidId.js";
import upload from "../util/upload.js";

export const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { max, search } = req.query;
    let events = await getAll();
    if (search) {
      events = events.filter(
        (event) =>
          event.title.toLowerCase().includes(search.toLowerCase()) ||
          event.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (max) {
      events = events.slice(events.length - max, events.length);
    }

    res.json({ events: events });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", isValidId, async (req, res, next) => {
  try {
    const event = await get(req.params.id);
    res.json({ event: event });
  } catch (error) {
    next(error);
  }
});

router.use(checkAuthMiddleware);

router.post(
  "/",
  // validate(eventSchema),
  upload.single("image"),
  async (req, res, next) => {
    console.log(req.token);

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { title, description, date, time } = req.body;
    if (!title || !description || !date || !time) {
      return res
        .status(400)
        .json({ message: "Title, description, date, and time are required" });
    }

    try {
      const savedData = await add({
        title,
        description,
        date,
        time,
        image: req.file,
      });
      res.status(201).json({ message: "Event saved.", event: savedData });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  isValidId,
  validate(eventSchema),
  async (req, res, next) => {
    const data = req.body;

    try {
      await replace(req.params.id, data);
      res.json({ message: "Event updated.", event: data });
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", isValidId, async (req, res, next) => {
  try {
    await remove(req.params.id);
    res.json({ message: "Event deleted." });
  } catch (error) {
    next(error);
  }
});
