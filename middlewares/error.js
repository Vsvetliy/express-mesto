module.exports = (err, req, res, next) => {
  if (!err.statusCode) {
    // if (!err.statusCode || err.statusCode === 500) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: err.message });
    }
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Неверный id' });
    }
    if (err.message === 'celebrate request validation failed') {
      return res.status(400).send({ message: 'Не заполнены обязательные поля' });
    }
    res.status(500).send({ message: 'Ошибка сервера' });
  } else {
    res.status(err.statusCode).send({ message: err.message });
  }
};
