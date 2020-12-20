const Joi = require('joi');

const HouseOwnershipStatusEnum = require('../../shared/enums/HouseOwnershipStatus');
const MaritalStatusEnum = require('../../shared/enums/MaritalStatus');

const postSchema = Joi.object({
  age: Joi.number().integer().min(0).required(),

  dependents: Joi.number().integer().min(0).required(),

  house: Joi.object({
    ownership_status: Joi.string()
      .valid(HouseOwnershipStatusEnum.OWNED, HouseOwnershipStatusEnum.MORTGAGED)
      .required(),
  })
    .unknown()
    .required()
    .allow(null),

  income: Joi.number().integer().min(0).required(),

  marital_status: Joi.string()
    .valid(MaritalStatusEnum.SINGLE, MaritalStatusEnum.MARRIED)
    .required(),

  risk_questions: Joi.array()
    .length(3)
    .items(Joi.number().integer().strict().valid(0, 1))
    .required(),

  vehicle: Joi.object({
    year: Joi.number()
      .integer()
      .min(1886)
      .max(new Date().getFullYear() + 1)
      .required(),
  })
    .unknown()
    .required()
    .allow(null),
}).unknown();

const a = {
  age: 22,
  dependents: 2,
  house: { ownership_status: 'owned' },
  income: 180000,
  marital_status: 'married',
  risk_questions: ['0', 1, 0],
  vehicle: { year: 2018 },
};

module.exports = {
  postSchema,
};
