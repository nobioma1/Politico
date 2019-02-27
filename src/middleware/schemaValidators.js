// Schema - Validating user request payload
const Joi = require('joi');


export const partyValidator = (body) => {
  const partySchema = Joi.object().keys({
    name: Joi.string().min(6).required(),
    hqAddress: Joi.string().min(10).max(100).required(),
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
    otherNames: Joi.string().optional(),
    lastName: Joi.string().required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().min(6).required(),
    phoneNumber: Joi.number().required(),
    passportURL: Joi.string().allow(''),
  });
  return Joi.validate(body, userSchema, { abortEarly: false });
};

export const candidateValidator = (body) => {
  const candidateSchema = Joi.object().keys({
    office_id: Joi.number(),
    user_id: Joi.number(),
  });
  return Joi.validate(body, candidateSchema);
};

export const voteValidator = (body) => {
  const voteSchema = Joi.object().keys({
    office: Joi.number(),
    candidate: Joi.number(),
  });
  return Joi.validate(body, voteSchema);
};

export const loginValidator = (body) => {
  const loginSchema = Joi.object().keys({
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().required(),
  });
  return Joi.validate(body, loginSchema);
};
