const Joi = require("joi");

const schema = Joi.object({
  route: Joi.string()
    .pattern(/^\/[\dA-Za-z-&_]+$/)
    .required(),
  label: Joi.string()
    .pattern(/^[A-Za-z ]+$/)
    .min(2)
    .max(30)
    .required(),
});

module.exports = schema;