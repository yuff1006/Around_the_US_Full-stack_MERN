const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const Card = require('../models/card');

function getCards(req, res, next) {
  Card.find()
    .orFail(new NotFoundError())
    .then((cards) => res.send(cards))
    .catch(next);
}

function createCard(req, res, next) {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new UnauthorizedError('Invalid login credentials'));
      } else {
        next(err);
      }
    });
}

function deleteCard(req, res, next) {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new NotFoundError('Cannot find the card to delete'))
    .then((card) => res.send(card))
    .catch(next);
}

function likeCard(req, res, next) {
  const { cardId } = req.params;
  const owner = req.user._id;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: owner } }, { new: true })
    .orFail(new NotFoundError('Cannot find the card to like'))
    .then((card) => res.send(card))
    .catch(next);
}

function unlikeCard(req, res, next) {
  const { cardId } = req.params;
  const owner = req.user._id;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: owner } }, { new: true })
    .orFail(new NotFoundError('Cannot find the card to unlike'))
    .then((card) => res.send(card))
    .catch(next);
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
};
