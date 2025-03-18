import Joi from "joi";

export const eventSchema = Joi.object({
  title: Joi.string().min(2).max(255).required(),
  description: Joi.string().min(2).max(500).required(),
  date: Joi.date().iso().greater("now").required(),
  time: Joi.string()
    .pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
    .required(),
});
