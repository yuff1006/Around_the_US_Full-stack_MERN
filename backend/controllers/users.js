const handleError = require('../helpers/utils');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

function getUsers(req, res) {
  User.find()
    .orFail()
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      handleError(err, req, res);
    });
}
function getUserById(req, res) {
  User.findById(req.params.id)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      handleError(err, req, res);
    });
}

function createNewUser(req, res) {
  const { name, about, avatar, email, password } = req.body;
  User.findOne({ email }).then((user) => {
    if (user) {
      res.send({ error: 'This email has already been registered' });
      // TODO
    } else {
      bcrypt
        .hash(password, 10)
        .then((hash) =>
          User.create({ email, password: hash, about, avatar, name })
        )
        .then((user) => res.send(user))
        .catch((err) => res.status(400).send(err));
    }
  });
}

function updateUser(req, res) {
  const { name, about } = req.body;
  const owner = req.user._id;
  User.findByIdAndUpdate(
    owner,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      handleError(err, req, res);
    });
}

function updateAvatar(req, res) {
  const { avatar } = req.body;
  const owner = req.user._id;
  User.findByIdAndUpdate(owner, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      handleError(err, req, res);
    });
}
module.exports = {
  getUsers,
  getUserById,
  createNewUser,
  updateUser,
  updateAvatar,
};
