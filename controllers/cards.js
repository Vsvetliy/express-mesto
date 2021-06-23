const Cards = require('../models/card');

const NotFoundError = require('../errors/not-found-err');

const Forbidden = require('../errors/forbidden');

const cathIdError = function (res, card) {
  if (!card) {
    throw new NotFoundError('Данные не найдены');
  }
  return res.send({ data: card });
};

exports.cardsGet = function (req, res, next) {
  Cards.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};
exports.cardsPost = function (req, res, next) {
  const { name, link } = req.body;
  const owner = req.user._id;

  Cards.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

// удаление карточки
exports.cardsDel = function (req, res, next) {
  Cards.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Данные не найдены');
      }

      if (req.user._id != card.owner._id) {
        throw new Forbidden('Доступ запрещён');
      }
      return Cards.findByIdAndRemove(req.params.cardId);
    })

    .then((card) => cathIdError(res, card))
    .catch(next);
};

exports.cardsAddLikes = function (req, res, next) {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => cathIdError(res, card))
    .catch(next);
};

exports.cardsDelLikes = function (req, res, next) {
  Cards.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true })
    .then((card) => cathIdError(res, card))
    .catch(next);
};
