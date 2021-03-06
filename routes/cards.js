const express = require('express');
const { celebrate, Joi } = require('celebrate');
const validator = require('../node_modules/validator');

const cardsRout = express.Router();
const cardsControl = require('../controllers/cards');

const validateURL = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new Error('Неправильный формат ссылки');
  }
  return value;
};

cardsRout.get('/', cardsControl.cardsGet);
cardsRout.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateURL),

  }),
}), cardsControl.cardsPost);
cardsRout.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}),
cardsControl.cardsDel);

cardsRout.put('/likes/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}),
cardsControl.cardsAddLikes);

cardsRout.delete('/likes/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}),
cardsControl.cardsDelLikes);

module.exports = cardsRout;
