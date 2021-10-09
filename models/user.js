const mongoose = require('mongoose');

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
        return /^(http|https):\/\/(www.)?[a-zA-Z0-9.\-_~:/?#[\]@%!$&'()*+,;=]*$/.test(v);
      },
      message: (props) => `${props.value} is not a valid`,
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
  },
  password: {
    type: String,
    minlength: 2,
    required: true,
    select: false,
  },
});
module.exports = mongoose.model('user', userSchema);
