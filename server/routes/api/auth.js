const Joi = require("joi");

module.exports = user => {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(30)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(300)
      .required()
  };
  return Joi.validate(user, schema);
};
