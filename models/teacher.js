const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema(
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
    familyName: {
      type: String,
      minlength: 2,
      maxlength: 50,
      required: true,
    },
    subject: {
      type: String,
      minlength: 2,
      maxlength: 50,
      required: true,
    },
    phone: {
      type: String,
      minlength: 2,
      maxlength: 50,
      required: true,
    },
    email: {
      type: String,
      minlength: 2,
      maxlength: 50,
      required: false,
    },
    birthday: {
      type: Date,
      required: false,
    },
    dateCriminalRecord: {
      type: Date,
      required: false,
    },
    education: {
      type: String,
      minlength: 2,
      maxlength: 50,
      required: false,
    },
    category: {
      type: String,
      minlength: 2,
      maxlength: 50,
      required: false,
    },
    dateAttestat: {
      type: Date,
      required: false,
    },
    dateWork: {
      type: Date,
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

module.exports = mongoose.model('teacher', teacherSchema);
