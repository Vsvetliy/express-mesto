const express = require('express');

const cardsRout = express.Router();
const cardsControl = require('../controllers/cards');

cardsRout.get('/', cardsControl.cardsGet);
cardsRout.post('/', cardsControl.cardsPost);
cardsRout.delete('/:cardId', cardsControl.cardsDel);

cardsRout.put('/:cardId/likes', cardsControl.cardsAddLikes);
cardsRout.delete('/:cardId/likes', cardsControl.cardsDelLikes);

module.exports = cardsRout;
