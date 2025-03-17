import Joi from "joi";

export const eventSchema = Joi.object({
  title: Joi.string().min(2).max(255).required(),
  description: Joi.string().max(500).required(),
  image: Joi.string().uri().required(),
  date: Joi.date().iso().required(),
});
