const Cards = require('../models/card');

const catchError = function (err, res) {
  if (err.name === 'ValidationError') {
    return res.status(400).send({ message: 'Переданы некорректные данные' });
  }
  if (err.name === 'CastError') {
    return res.status(400).send({ message: 'Переданы некорректные данные' });
  }

  return res.status(500).send({ message: 'Внутренняя ошибка сервера' });
};

const cathIdError = function (res, card) {
  if (!card) {
    return res.status(404).send({ message: 'Данные не найдены' });
  }
  return res.send({ data: card });
};

exports.cardsGet = function (req, res) {
  Cards.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => catchError(err, res));
};
exports.cardsPost = function (req, res) {
  const { name, link, owner } = req.body;
  Cards.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => catchError(err, res));
};

exports.cardsDel = function (req, res) {
  Cards.findByIdAndRemove(req.params.cardId)
    .then((card) => cathIdError(res, card))
    .catch((err) => catchError(err, res));
};

exports.cardsAddLikes = function (req, res) {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => cathIdError(res, card))
    .catch((err) => catchError(err, res));
};

exports.cardsDelLikes = function (req, res) {
  Cards.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true })
    .then((card) => cathIdError(res, card))
    .catch((err) => catchError(err, res));
};
