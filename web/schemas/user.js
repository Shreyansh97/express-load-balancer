const Joi = require('joi');

const addDomain = Joi.object({
  body: Joi.object({
    name: Joi.string()
      .hostname()
      .required(),
    type: Joi.string()
      .valid(['1','2','3'])
      .required(),
    protocol: Joi.string()
      .valid(['http','https'])
      .required()
  })
});

const deleteDomain = Joi.object({
  body: Joi.object({
    id: Joi.number()
      .integer()
      .positive()
      .required()
  })
});

const addServer = Joi.object({
  body: Joi.object({
    ip: Joi.string()
      .required(),
    weight: Joi.number()
      .integer()
      .positive()
      .required(),
    domainId: Joi.number()
      .integer()
      .positive()
      .required(),
    max_conns: Joi.number()
      .integer()
      .required(),
    max_fails: Joi.number()
      .integer()
      .required(),
    fail_timeout: Joi.number()
      .integer()
      .required(),
    backup: Joi.bool()
      .required(),
    down: Joi.bool()
      .required()
  })
})

module.exports = {
  addDomain,
  deleteDomain,
  addServer
}