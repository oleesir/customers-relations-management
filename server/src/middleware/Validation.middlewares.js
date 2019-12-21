import Joi from '@hapi/joi';
import moment from 'moment';

const now = moment().format('YYYY-MM-DD,h:mm:ss');

const Validation = {
  validateSignup(req, res, next) {
    const schema = Joi.object().keys({
      firstName: Joi.string().regex(/^[a-zA-Z]+$/).min(2).max(30)
        .required(),
      lastName: Joi.string().regex(/^[a-zA-Z]+$/).min(3).max(30)
        .required(),
      email: Joi.string().email({ minDomainSegments: 2 }).lowercase().required(),
      password: Joi.string().min(8).required()
    });

    const result = schema.validate(req.body, { abortEarly: false });

    if (result.error) {
      const error = result.error.details.map((msg) => msg.message);
      return res.status(400).json({ status: 400, error });
    }
    return next();
  },

  validateSignin(req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string().email({ minDomainSegments: 2 }).lowercase().required(),
      password: Joi.string().min(8).required()
    });

    const result = schema.validate(req.body, { abortEarly: false });

    if (result.error) {
      const error = result.error.details.map((msg) => msg.message);
      return res.status(400).json({ status: 400, error });
    }
    return next();
  },

  validateCreateCustomer(req, res, next) {
    const schema = Joi.object().keys({
      firstName: Joi.string().regex(/^[a-zA-Z]+$/).min(2).max(30)
        .required(),
      lastName: Joi.string().regex(/^[a-zA-Z]+$/).min(3).max(30)
        .required(),
      email: Joi.string().email({ minDomainSegments: 2 }).lowercase().required(),
      phoneNumber: Joi.string().regex(/^\+[1-9]\d{1,14}$/).required(),
      address: Joi.string().required()
    });

    const result = schema.validate(req.body, { abortEarly: false });

    if (result.error) {
      const error = result.error.details.map((msg) => msg.message);
      return res.status(400).json({ status: 400, error });
    }
    return next();
  },

  validateGetCustomer(req, res, next) {
    const schema = Joi.object().keys({ id: Joi.number().integer().min(1) });
    const result = schema.validate(req.body, { abortEarly: false });

    if (result.error) {
      const error = result.error.details.map((msg) => msg.message);
      return res.status(400).json({ status: 400, error });
    }
    return next();
  },

  validateDeleteCustomer(req, res, next) {
    const schema = Joi.object().keys({
      id: Joi.number().integer().min(1)
    });

    const result = schema.validate(req.body, { abortEarly: false });

    if (result.error) {
      const error = result.error.details.map((msg) => msg.message);
      return res.status(400).json({ status: 400, error });
    }
    return next();
  },

  validateUpdateCustomer(req, res, next) {
    const schema = Joi.object().keys({
      id: Joi.number().integer().min(1),
      firstName: Joi.string().regex(/^[a-zA-Z]+$/).min(2).max(30),
      lastName: Joi.string().regex(/^[a-zA-Z]+$/).min(3).max(30),
      email: Joi.string().email({ minDomainSegments: 2 }).lowercase(),
      phoneNumber: Joi.string().regex(/^\+[1-9]\d{1,14}$/),
      address: Joi.string()
    });

    const result = schema.validate(req.body, { abortEarly: false });

    if (result.error) {
      const error = result.error.details.map((msg) => msg.message);
      return res.status(400).json({ status: 400, error });
    }
    return next();
  },

  validateCreateEmail(req, res, next) {
    const schema = Joi.object().keys({
      emails: Joi.array()
        .items(
          Joi.string()
            .email({ minDomainSegments: 2 })
            .lowercase()
            .required(),
        )
        .min(1)
        .required()
        .unique(),
      subject: Joi.string().required(),
      message: Joi.string().required(),
      deliveryDate: Joi.date().greater(now).less('2029-12-31')
        .required()
    });

    const result = schema.validate(req.body, { abortEarly: false });

    if (result.error) {
      const error = result.error.details.map((msg) => msg.message);
      return res.status(400).json({ status: 400, error });
    }
    return next();
  },

  validateAutomatedCreateEmail(req, res, next) {
    const schema = Joi.object().keys({
      emails: Joi.array()
        .items(
          Joi.string()
            .email({ minDomainSegments: 2 })
            .lowercase()
            .required(),
        )
        .min(1)
        .required()
        .unique(),
      subject: Joi.string().required(),
      message: Joi.string().required(),
      deliveryDate: Joi.date().greater(now).less('2029-12-31')
        .required()
    });

    const result = schema.validate(req.body, { abortEarly: false });

    if (result.error) {
      const error = result.error.details.map((msg) => msg.message);
      return res.status(400).json({ status: 400, error });
    }
    return next();
  },

  validateCreateSms(req, res, next) {
    const schema = Joi.object().keys({
      phoneNumbers: Joi.array()
        .items(
          Joi.string().regex(/^\+[1-9]\d{1,14}$/).required()
        )
        .min(1)
        .required()
        .unique(),
      message: Joi.string().required(),
      deliveryDate: Joi.date().greater(now).less('2029-12-31')
        .required()
    });

    const result = schema.validate(req.body, { abortEarly: false });

    if (result.error) {
      const error = result.error.details.map((msg) => msg.message);
      return res.status(400).json({ status: 400, error });
    }
    return next();
  },
};
export default Validation;
