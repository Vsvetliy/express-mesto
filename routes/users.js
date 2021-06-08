const express = require('express');

const usersRout = express.Router();
const usersControl = require('../controllers/users');

usersRout.get('/', usersControl.usersGet);
usersRout.get('/:id', usersControl.usersGetId);
usersRout.post('/', usersControl.usersPost);
usersRout.patch('/me', usersControl.usersPatch);
usersRout.patch('/me/avatar', usersControl.usersPatchAva);

module.exports = usersRout;
