const router = require('express').Router();

const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');
const {
  validateCredentials,
  validateAvatar,
  validateUserProfile,
  validateUniqueId,
} = require('../middlewares/validation');

router.get('/users/me', validateCredentials, getCurrentUser);

router.get('/users', getUsers);

router.get('/users/:id', validateUniqueId, getUserById);

router.patch('/users/me', validateUserProfile, updateUser);

router.patch('/users/me/avatar', validateAvatar, updateAvatar);

module.exports = router;
