const mongoose = require('mongoose');
const user = require('./user');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: () => validator.isURL,
      message: 'You must enter a valid URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
    required: true,
  },
  likes: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
