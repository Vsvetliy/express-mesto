const express = require('express');
const { celebrate, Joi } = require('celebrate');
const validator = require('../node_modules/validator');

const usersRout = express.Router();
const usersControl = require('../controllers/users');

const validateURL = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new Error('Неправильный формат ссылки');
  }
  return value;
};

usersRout.get('/', usersControl.usersGet);
usersRout.get('/me', usersControl.usersGetMe);
usersRout.get('/:id', usersControl.usersGetId);

usersRout.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),

  }),
}), usersControl.usersPatch);

usersRout.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL),
  }),
}),
usersControl.usersPatchAva);

module.exports = usersRout;
