// Schema - Validating user request payload
const Joi = require('joi');


export const partyValidator = (body) => {
  const partySchema = Joi.object().keys({
    name: Joi.string().required(),
    hqAddress: Joi.string().required(),
    logoUrl: Joi.string().allow(''),
  });

  return Joi.validate(body, partySchema, { abortEarly: false });
};

export const officeValidator = (body) => {
  const officeSchema = Joi.object().keys({
    type: Joi.string().required(),
    name: Joi.string().required(),
  });

  return Joi.validate(body, officeSchema, { abortEarly: false });
};

export const userValidator = (body) => {
  const userSchema = Joi.object().keys({
    firstName: Joi.string().required(),
    otherNames: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().regex(/[^\w+@{2,3}$]/),
    password: Joi.string().min(6).required(),
    phoneNumber: Joi.string().required(),
    passportURL: Joi.string().allow(''),
    isAdmin: Joi.string().allow('').optional(),
  });
  return Joi.validate(body, userSchema, { abortEarly: false });
};
