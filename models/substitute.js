const mongoose = require('mongoose');
const { requiredValidationMessage } = require('../utils/constants');

const substititeSchema = new mongoose.Schema(
  {
    // teacherSubstitute: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'teacher',
    //   required: [true, requiredValidationMessage('teacher')],
    // },
    teacherSubstitute: {
      type: String,
      minlength: 2,
      maxlength: 50,
      required: true,
    },
    status: {
      type: String,
      minlength: 2,
      maxlength: 50,
      default: 'No data',
    },
    dateSubstitute: {
      type: Date,
      required: false,
    },
    teacherIll: {
      type: String,
      minlength: 2,
      maxlength: 50,
      required: false,
    },
    comment: {
      type: String,
      minlength: 2,
      maxlength: 50,
      required: false,
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

module.exports = mongoose.model('substitute', substititeSchema);
