// Schema - defines the shape of our object
const Joi = require('joi');


export const partyValidator = (body) => {
  const partySchema = Joi.object().keys({
    name: Joi.string().required(),
    hqAddress: Joi.string().required(),
    logoUrl: Joi.string(),
  });

  return Joi.validate(body, partySchema, { abortEarly: false });
};

export const officeValidator = (body) => {
  const officeSchema = Joi.object().keys({
    type: Joi.string().required(),
    name: Joi.string().required(),
  });

  return Joi.validate(body, officeSchema, { abortEarly: false });
