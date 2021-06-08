const express = require('express');
const mongoose = require('mongoose');
const usersRout = require('./routes/users');
const cardsRout = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '60be5dd259e9973884bf53fb', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});
app.use('/users', usersRout);
app.use('/cards', cardsRout);

mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
