const Joi = require('joi');

const loginSchema = Joi.object({
  body: Joi.object({
    username: Joi.string()
      .max(50)
      .required(),
    password: Joi.string()
      .max(50)
      .required()
  })
})

module.exports = {
  loginSchema
};