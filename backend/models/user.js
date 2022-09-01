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
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Explorer',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
    validate: {
      validator: (v) => regexForAvatarLink.test(v),
    },
  },
});

module.exports = mongoose.model('user', userSchema);
