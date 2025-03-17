import express from "express";
import { add, get } from "../data/user.js";
import { createJSONToken, isValidPassword } from "../util/auth.js";
import validate from "../util/validation.js";
import { userSchema } from "../schemas/userSchema.js";

export const router = express.Router();

router.post("/signup", validate(userSchema), async (req, res, next) => {
  const data = req.body;
  try {
    const existingUser = await get(data.email).catch((err) => {
      if (err.message.includes("not find")) return null;

      throw err;
    });
    if (existingUser) {
      throw new Error(`User with email ${existingUser.email} already exists.`);
    }
    const createdUser = await add(data);
    const authToken = createJSONToken(createdUser.email);
    res.status(201).json({
      message: "User created.",
      user: createdUser,
      token: authToken,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", validate(userSchema), async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  let user;
  try {
    user = await get(email);
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed." });
  }

  const pwIsValid = await isValidPassword(password, user.password);
  if (!pwIsValid) {
    return res.status(422).json({
      message: "Invalid credentials.",
      errors: { credentials: "Invalid email or password entered." },
    });
  }

  const token = createJSONToken(email);
  res.json({ token });
});
