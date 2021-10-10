const mongoose = require('mongoose');
const validate = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        return validate.isURL(v);
      },
    },

  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  email: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validate.isEmail(v);
      },
    },
  },
  password: {
    type: String,
    minlength: 2,
    required: true,
    select: false,
  },
});
module.exports = mongoose.model('user', userSchema);
