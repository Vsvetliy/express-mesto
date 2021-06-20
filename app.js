const express = require('express');
const mongoose = require('mongoose');
const usersRout = require('./routes/users');
const cardsRout = require('./routes/cards');
const auth = require('./middlewares/auth');
const errors = require('./middlewares/errors');
const NotFoundError = require('./errors/not-found-err');

const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const app = express();


app.use(express.json());
app.use('/users', usersRout);

app.use(auth);

app.use('/cards', cardsRout);

app.use('/*', (req, res) => {
  throw new NotFoundError('Cтраница не найдена');
    
});

app.use(errors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
