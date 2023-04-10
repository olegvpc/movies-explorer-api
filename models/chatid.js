const mongoose = require('mongoose');

const chatidSchema = new mongoose.Schema(
  {
    lastName: {
      type: String,
      minlength: 2,
      maxlength: 50,
      required: true,
    },
    firstName: {
      type: String,
      minlength: 2,
      maxlength: 50,
      required: true,
    },
    chatId: {
      type: String,
      minlength: 2,
      maxlength: 50,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('chatid', chatidSchema);
