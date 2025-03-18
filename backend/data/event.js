import { Jimp } from "jimp";
import * as Path from "node:path";
import fs from "fs";
import NotFoundError from "../util/errors.js";
import event from "../models/event.js";

async function getAll() {
  const storedData = await event.find({});
  if (!storedData) {
    throw new NotFoundError("Could not find any events.");
  }
  return storedData;
}

async function get(id) {
  const storedData = await event.findById(id);
  if (!storedData) {
    throw new NotFoundError(`Could not find event for id ${id}`);
  }
  return storedData;
}

async function add(data) {
  const { path } = data.image;
  const correctedPath = path.replace(/\\/g, "/");
  const image = await Jimp.read(correctedPath);

  image.resize({ w: 200 });
  const imageFilename = Date.now() + Path.extname(path);
  await image.write(`public/images/${imageFilename}`);

  fs.unlink(path, function (err) {
    if (err) return console.log(err);
    console.log("file deleted successfully");
  });
  const normalizedImage = `/images/${imageFilename}`;

  const storedData = await event.create({ ...data, image: normalizedImage });
  return storedData;
}

async function replace(id, data) {
  const storedData = await event.findByIdAndUpdate(id, data, { new: true });
  if (!storedData) {
    throw new NotFoundError(`Could not find event for id ${id}`);
  }

  return storedData;
}

async function remove(id) {
  const storedData = await event.findByIdAndDelete(id);
  return storedData;
}

export { getAll, get, add, replace, remove };
