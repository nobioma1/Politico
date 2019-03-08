// Schema - Validating user request payload
import Joi from 'joi';

// Joi Validations Schema
const schema = {
  partySchema: Joi.object().keys({
    name: Joi.string().min(6).required(),
    hqAddress: Joi.string().min(10).max(100).required(),
    logoUrl: Joi.string().allow(''),
  }),

  officeSchema: Joi.object().keys({
    type: Joi.string().required(),
    name: Joi.string().required(),
  }),

  userSchema: Joi.object().keys({
    firstName: Joi.string().required(),
    otherNames: Joi.string().optional(),
    lastName: Joi.string().required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().min(6).required(),
    phoneNumber: Joi.number().required(),
    passportURL: Joi.string().allow(''),
  }),

  candidateSchema: Joi.object().keys({
    office_id: Joi.number().required(),
    candidate_id: Joi.number().required(),
  }),

  voteSchema: Joi.object().keys({
    office: Joi.number().required(),
    candidate: Joi.number().required(),
  }),

  loginSchema: Joi.object().keys({
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().required(),
  }),
};

// Validator
const validate = reqSchema => (req, res, next) => {
  Joi.validate(req.body, reqSchema, { abortEarly: false }, (err) => {
    if (err) {
      return res.status(422).json({
        status: 422,
        error: err.details.map(m => m.message.replace(/[^a-zA-Z0-9 ]/g, '')),
      });
    }
    next();
  });
};

export { schema, validate };
