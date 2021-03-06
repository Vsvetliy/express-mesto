const mongoose = require('mongoose');
const validator = require('../node_modules/validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
    },
    // validate: {
    //   validator(v) {
    //     return validator.isURL(v);
    //   },
    //   // message: (props) => `${props.value} is not a valid`,
    // },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
  },
  likes: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
    }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('card', cardSchema);
