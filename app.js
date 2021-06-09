const express = require('express');
const mongoose = require('mongoose');
const usersRout = require('./routes/users');
const cardsRout = require('./routes/cards');

const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '60c0c1fa57b01741c0f55a54', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});
app.use('/users', usersRout);
app.use('/cards', cardsRout);

app.use('/*', (req, res) => {
  res.status(404).send({
    message: 'Страница не найдена',
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
