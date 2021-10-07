const jwt = require('jsonwebtoken');
const LoginPasswordError = require('../errors/login-password-error');

module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  // const authorization = req.headers.cookie;
  const { authorization } = req.headers;

  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
  // if (!authorization || !authorization.startsWith('jwt=')) {
    throw new LoginPasswordError('Необходима авторизация1');
  }
  const token = authorization.replace('Bearer ', '');
  // const token = authorization.replace('jwt=', '');
  console.log(token);
  let payload;
  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    // отправим ошибку, если не получилось
    throw new LoginPasswordError('Необходима авторизация2');
  }
  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальш
};
