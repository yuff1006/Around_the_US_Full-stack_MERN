const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.message('The URL is not valid');
};

const validateEmail = (value, helpers) => {
  if (validator.isEmail(value)) {
    return value;
  }
  return helpers.message('The email is not valid');
};

const validateCardCreation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      'string.empty': 'Name cannot be empty',
      'string.min': 'Name needs to be at least 2 characters long',
      'string.max': 'Name needs to be shorter than 30 characters long',
    }),
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
    avatar: Joi.string().custom(validateURL),
  }),
});

const validateUserProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).messages({
      'string.min': 'Name needs to be at least 2 characters long',
    }),
    about: Joi.string().min(2).messages({
      'string.min': 'Name needs to be at least 2 characters long',
    }),
  }),
});

const validateUniqueId = celebrate({
  body: Joi.object().keys({
    _id: Joi.string().hex().length(24).messages({
      'any.invalid': 'Invalid User Name',
    }),
  }),
});

module.exports = {
  validateCardCreation,
  validateCredentials,
  validateAvatar,
  validateUserProfile,
  validateUniqueId,
};
