const router = require('express').Router();

const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:id', getUserById);

router.patch('/users/me', updateUser);

router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
