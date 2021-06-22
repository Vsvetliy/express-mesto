module.exports = (err, req, res, next) => {
  if (!err.statusCode) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: err.message });
    }
    if (err.message === 'celebrate request validation failed') {
      return res.status(400).send({ message: 'Не заполнены обязательные поля' });
    }
    return res.status(500).send({ message: err.message });
  }

  res.status(err.statusCode).send({ message: err.message });
};
