const express = require('express');
const { celebrate, Joi } = require('celebrate');

const usersRout = express.Router();
const usersControl = require('../controllers/users');

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
    avatar: Joi.string().required(),
  }),
}),
usersControl.usersPatchAva);

module.exports = usersRout;
