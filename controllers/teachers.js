const Teacher = require('../models/teacher');

const { ValidationError } = require('../errors/validation-error');
const { NotFoundError } = require('../errors/not-found-error');
const { ForbiddenError } = require('../errors/forbidden-error');

module.exports.getAllTeachers = (req, res, next) => {
  Teacher.find({})
    // .populate(['owner', 'likes'])
    .sort({ lastName: 'asc' })
    .then((teachers) => res.send(teachers))
    .catch(next); //  то же самое что .catch(err => next(err));
};

module.exports.getCurrentTeacher = (req, res, next) => {
  Teacher.findById(req.params.teacherId)
    .then((teacher) => {
      if (!teacher) {
        throw new NotFoundError(`Teacher с _id: ${req.params.teacherId} не найден.`);
      } else {
        return res.send(teacher);
      }
    })
    .catch(next); //  то же самое что .catch(err => next(err));
};

module.exports.createTeacher = (req, res, next) => {
  const teacherData = req.body;
  // console.log(teacherData);
  Teacher.create(teacherData)
    .then((teacher) => res.status(201).send(teacher))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new ValidationError(`Переданы некорректные данные при создании УЧИТЕЛЯ. - ${err.message}`);
        return next(error);
      }
      return next(err);
    });
};

module.exports.updateTeacher = (req, res, next) => {
  const teacherData = req.body;
  Teacher.findByIdAndUpdate(
    req.params.teacherId, // 632dd2b94ceb7519db223be0
    teacherData,
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      upsert: false, // если пользователь не найден, он будет создан
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(`Teacher с _id: ${req.params.teacherId} не найден.`);
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new ValidationError(`Передан некорректный _id: ${req.params.teacherId} Teacher. -> ${err.name}`);
        return next(error);
      }
      return next(err);
    });
};

module.exports.deleteTeacher = (req, res, next) => {
  Teacher.findById(req.params.teacherId)
    .then((teacher) => {
      if (!teacher) {
        throw new NotFoundError({ message: `Учителя с указанным _id: ${req.params.teacherId} не найдено.` });
      }
      // if (teacher.owner.toString() !== req.user._id) {
      //   throw new ForbiddenError('Нельзя удалить чужое сообщение');
      // }
      Teacher.findByIdAndRemove(req.params.teacherId)
      // .populate('owner')
        .then(() => {
          res.send({ message: ` Teacher с _id: ${req.params.teacherId} удален` });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new ValidationError(`Передан некорректный _id: ${req.params.teacherId} сообщения. ${err.name}`);
        return next(error);
      }
      return next(err);
    });
};
