const jwt = require('jsonwebtoken');
const LoginPasswordError = require('../errors/login-password-error');

module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const authorization = req.headers.cookie;

  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('jwt=')) {
    throw new LoginPasswordError('Необходима авторизация');
  }

  const token = authorization.replace('jwt=', '');
  let payload;
  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    // отправим ошибку, если не получилось
    throw new LoginPasswordError('Необходима авторизация');
  }
  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальш
};
