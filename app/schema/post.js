const Joi = require("joi");

const schema = Joi.object({
  category: Joi.string()
    .pattern(/^[A-Za-z ]+$/)
    .min(2)
    .max(30)
    .required(),
  slug: Joi.string()
    .pattern(/^[\dA-Za-z-]+$/)
    .required(),
  title: Joi.string()
    .required(),
  excerpt: Joi.string()
    .required(),
  content: Joi.string()
    .required(),
});

module.exports = schema;