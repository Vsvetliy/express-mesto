const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');
const usersRout = require('./routes/users');
const usersControl = require('./controllers/users');
const cardsRout = require('./routes/cards');
const auth = require('./middlewares/auth');
const errors = require('./middlewares/errors');
const NotFoundError = require('./errors/not-found-err');

const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const app = express();

app.use(express.json());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).max(30),
    password: Joi.string().required().min(2),
  }),
}), usersControl.usersLogin);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
    email: Joi.string().required().min(2).max(30),
    password: Joi.string().required().min(2),
  }),
}), usersControl.usersPost);

app.use(auth);
app.use('/users', usersRout);

app.use('/cards', cardsRout);

app.use('/*', (req, res) => {
  throw new NotFoundError('Cтраница не найдена');
});

app.use(errors);

app.listen(PORT, () => {
  console.log(`App listening on porl ${PORT}`);
});
