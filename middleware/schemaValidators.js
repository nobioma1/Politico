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
