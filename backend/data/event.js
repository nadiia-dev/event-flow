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
  const storedData = await event.create(data);
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
