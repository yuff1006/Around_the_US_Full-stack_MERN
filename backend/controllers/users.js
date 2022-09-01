const handleError = require('../helpers/utils');
const User = require('../models/user');

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
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      handleError(err, req, res);
    });
}

function updateUser(req, res) {
  const { name, about } = req.body;
  const owner = req.user._id;
  User.findByIdAndUpdate(owner, { name, about }, { new: true, runValidators: true })
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
