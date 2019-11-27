import Joi from '@hapi/joi';


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

      return res.status(400).json({
        status: 400,
        error,
      });
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

      return res.status(400).json({
        status: 400,
        error,
      });
    }
    return next();
  }
};

export default Validation;
