const mongoose = require('mongoose');
const validator = require('validator');

const regexForAvatarLink =
  /https?:\/\/(www\.)?\S+\/[-._~:/?%#[\]@!$&'()*+,;=\w]*#?$/;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'You must enter a valid email address',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => regexForAvatarLink.test(v),
    },
  },
});

module.exports = mongoose.model('user', userSchema);
