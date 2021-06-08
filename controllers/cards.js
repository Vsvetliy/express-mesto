const Cards = require('../models/card');

const formattedCards = function (cards) {
  return {
    name: cards.name,
    link: cards.about,
    id: Cards.id,
  };
};

const catchError = function (err, res) {
  if (err.name === 'ValidationError') {
    return res.status(400).send({ message: 'Переданы некорректные данные' });
  }
  if (err.name === 'CastError') {
    return res.status(404).send({ message: 'Карточка или пользователь не найден' });
  }

  return res.status(500).send({ message: 'Внутренняя ошибка сервера' });
};

exports.cardsGet = function (req, res) {
  Cards.find({})
    .then((cards) => res.send({ data: cards.map(formattedCards) }))
    .catch((err) => catchError(err, res));
};
exports.cardsPost = function (req, res) {
  const { name, link, owner } = req.body;
  Cards.create({ name, link, owner })
    .then((cards) => res.send({ data: formattedCards(cards) }))
    .catch((err) => catchError(err, res));
};

exports.cardsDel = function (req, res) {
  Cards.findByIdAndRemove(req.params.cardId)
    .then((cards) => res.send({ data: formattedCards(cards) }))
    .catch((err) => catchError(err, res));
};

exports.cardsAddLikes = function (req, res) {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((cards) => res.send({ data: formattedCards(cards) }))
    .catch((err) => catchError(err, res));
};

exports.cardsDelLikes = function (req, res) {
  Cards.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true })
    .then((cards) => res.send({ data: formattedCards(cards) }))
    .catch((err) => catchError(err, res));
};
