const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
} = require('../controllers/cards');
const {
  validateCardCreation,
  validateUniqueId,
} = require('../middlewares/validation');

router.get('/cards', getCards);

router.post('/cards', validateCardCreation, createCard);

router.delete('/cards/:cardId', validateUniqueId, deleteCard);

router.put('/cards/:cardId/likes', validateUniqueId, likeCard);

router.delete('/cards/:cardId/likes', validateUniqueId, unlikeCard);

module.exports = router;
