import { hash } from "bcryptjs";
import NotFoundError from "../util/errors.js";
import user from "../models/user.js";

async function add(data) {
  const hashedPw = await hash(data.password, 12);

  const storedData = await user.create({
    email: data.email,
    password: hashedPw,
  });

  return { _id: storedData._id, email: storedData.email };
}

async function get(email) {
  const storedData = await user.findOne({ email });
  if (!storedData) {
    throw new NotFoundError(`Could not find user for email ${email}`);
  }

  return storedData;
}

export { add, get };
