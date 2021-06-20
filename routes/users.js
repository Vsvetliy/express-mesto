const express = require('express');
const auth = require('../middlewares/auth');
const { celebrate, Joi } = require('celebrate');

const usersRout = express.Router();
const usersControl = require('../controllers/users');

usersRout.get('/', auth, usersControl.usersGet);
usersRout.get('/me', auth, usersControl.usersGetMe);
usersRout.get('/:id', auth,  usersControl.usersGetId);


usersRout.post('/signin', celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().min(2).max(30),
        password: Joi.string().required().min(2),
    }),
}), usersControl.usersLogin);




usersRout.post('/signup', celebrate({
    body: Joi.object().keys({
        name: Joi.string().required().min(2).max(30),
        about: Joi.string().required().min(2).max(30),
        avatar: Joi.string().required(),
        email: Joi.string().required().min(2).max(30),
        password: Joi.string().required().min(2),
    }),
}), usersControl.usersPost); 

usersRout.patch('/me', auth, celebrate({
    body: Joi.object().keys({
        name: Joi.string().required().min(2).max(30),
        about: Joi.string().required().min(2).max(30),
        
    }),
}), usersControl.usersPatch);

usersRout.patch('/me/avatar', auth, celebrate({
    body: Joi.object().keys({
        avatar: Joi.string().required(),
    }),
}),
     usersControl.usersPatchAva);

module.exports = usersRout;
