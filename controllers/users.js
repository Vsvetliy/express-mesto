const User = require('../models/user');

const formattedUser = function (user) {
  return {
    name: user.name,
    about: user.about,
    id: user.id,
  };
};

const catchError = function (err, res) {
  if (err.name === 'ValidationError') {
    return res.status(400).send({ message: 'Переданы некорректные данные' });
  }
  if (err.name === 'CastError') {
    return res.status(404).send({ message: 'Пользователь не найден' });
  }

  return res.status(500).send({ message: 'Внутренняя ошибка сервера' });
};

exports.usersGet = function (req, res) {
  User.find({})
    .then((users) => res.send({ data: users.map(formattedUser) }))
    .catch((err) => catchError(err, res));
};

exports.usersGetId = function (req, res) {
  User.findById(req.params.id)
    .then((user) => res.send({ data: formattedUser(user) }))
    .catch((err) => catchError(err, res));
};

exports.usersPost = function (req, res) {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: formattedUser(user) }))
    .catch((err) => catchError(err, res));
};

exports.usersPatch = function (req, res) {
  User.findByIdAndUpdate(req.user._id, { name: req.body.name, about: req.body.about })
    .then((user) => res.send({ data: formattedUser(user) }))
    .catch((err) => catchError(err, res));
};
exports.usersPatchAva = function (req, res) {
  User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar })
    .then((user) => res.send({ data: formattedUser(user) }))
    .catch((err) => catchError(err, res));
};
