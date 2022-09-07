const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

const validateEmail = (value, helpers) => {
  if (validator.isEmail(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

const validateCardCreation = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .messages({ 'string.empty': 'Name cannot be empty' }),
    link: Joi.string().required().custom(validateURL).messages({
      'string.empty': 'URL cannot be empty',
    }),
  }),
});

const validateCredentials = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail).messages({
      'string.empty': 'Email cannot be empty',
    }),
    password: Joi.string().required().min(8).messages({
      'string.empty': 'Password cannot be empty',
      'string.min': 'The password field needs at least 8 characters',
    }),
  }),
});

const validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(validateUrl),
  }),
});

module.exports = {
  validateURL,
  validateEmail,
  validateCardCreation,
  validateCredentials,
};
