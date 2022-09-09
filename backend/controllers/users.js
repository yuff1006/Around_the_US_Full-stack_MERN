const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ConflictError = require('../errors/ConflictError');
const User = require('../models/user');

const { JWT_SECRET = 'dev' } = process.env;

function getUsers(req, res, next) {
  User.find()
    .orFail(new NotFoundError('No users are found'))
    .then((users) => res.send(users))
    .catch(next);
}

function getUserById(req, res, next) {
  User.findById(req.params.id)
    .orFail(new NotFoundError())
    .then((user) => res.send(user))
    .catch(next);
}

function signup(req, res, next) {
  const { name, about, avatar, email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (user) {
        throw new ConflictError('This email has already been registered');
      } else {
        bcrypt
          .hash(password, 10)
          .then((hash) =>
            User.create({ email, password: hash, about, avatar, name }),
          )
          .then((userRes) => res.send(userRes))
          .catch(next);
      }
    })
    .catch(next);
}

function getCurrentUser(req, res, next) {
  const currentUserId = req.user._id;
  User.findOne({ _id: currentUserId })
    .orFail(new NotFoundError('User ID not found'))
    .then((user) => res.send(user))
    .catch(next);
}

function login(req, res, next) {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Invalid login credentials');
      }
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      res.send({ token });
    })
    .catch(next);
}

function updateUser(req, res, next) {
  const { name, about } = req.body;
  const owner = req.user._id;
  User.findByIdAndUpdate(
    owner,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(new BadRequestError())
    .then((user) => res.send(user))
    .catch(next);
}
function createNewUser(req, res, next) {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Missing or invalid email or password'));
      } else {
        next(err);
      }
    });
}
function updateAvatar(req, res, next) {
  const { avatar } = req.body;
  const owner = req.user._id;
  User.findByIdAndUpdate(owner, { avatar }, { new: true, runValidators: true })
    .orFail(new BadRequestError())
    .then((user) => res.send(user))
    .catch(next);
}
module.exports = {
  getUsers,
  getUserById,
  signup,
  updateUser,
  updateAvatar,
  login,
  getCurrentUser,
  createNewUser,
};
