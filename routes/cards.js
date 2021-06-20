const express = require('express');
const { celebrate, Joi } = require('celebrate');
const cardsRout = express.Router();
const cardsControl = require('../controllers/cards');

cardsRout.get('/', cardsControl.cardsGet);
cardsRout.post('/', celebrate({
    body: Joi.object().keys({
        name: Joi.string().required().min(2).max(30),
        link: Joi.string().required(),
        owner: Joi.string().required(),
    }),
}), cardsControl.cardsPost);
cardsRout.delete('/:cardId', cardsControl.cardsDel);

cardsRout.put('/:cardId/likes', cardsControl.cardsAddLikes);
cardsRout.delete('/:cardId/likes', cardsControl.cardsDelLikes);

module.exports = cardsRout;
