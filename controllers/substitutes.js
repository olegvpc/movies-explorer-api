const Substitute = require('../models/substitute');

const { ValidationError } = require('../errors/validation-error');
const { NotFoundError } = require('../errors/not-found-error');
const { ForbiddenError } = require('../errors/forbidden-error');

module.exports.getAllSubsToday = (req, res, next) => {
  const dateTodayShort = new Date().toISOString().substring(0, 10);
  const dateToday = new Date(dateTodayShort);
  const midnightDate = new Date(dateTodayShort);
  midnightDate.setDate(midnightDate.getDate() + 1);
//   console.log(dateToday, currentDate); // 2023-04-10T00:00:00.000Z 2023-04-11T00:00:00.000Z
  Substitute.find({
    createdAt: {
      $gte: dateToday,
      $lt: midnightDate,
    },
  })
    // .populate('teacher')
    // .sort({ createdAt: 'desc' })
    .then((response) => {
    //   console.log(response);
      return res.status(200).send(response);
    })
    .catch(next); //  то же самое что .catch(err => next(err));
};

module.exports.getAllSubsByInteval = (req, res, next) => {
  const { start } = req.body;
  const { end } = req.body;
  const dateStart = new Date(start);
  const dateEnd = new Date(end);
  dateEnd.setDate(dateEnd.getDate() + 1);

//   console.log(dateStart, dateEnd);
  Substitute.find({
    dateSubstitute: {
      $gte: dateStart,
      $lt: dateEnd,
    },
  })
    // .populate('teacher')
    // .sort({ createdAt: 'desc' })
    .then((response) => {
    //   console.log(response);
      return res.status(200).send(response);
    })
    .catch(next); //  то же самое что .catch(err => next(err));
};

module.exports.saveNewSubs = (req, res, next) => {
  const subsData = req.body;

  Substitute.create(subsData)
    .then((response) => res.status(201).send(response))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new ValidationError(`Переданы некорректные данные при создании Замены. - ${err.message}`);
        return next(error);
      }
      return next(err);
    });
};

module.exports.setApproveSubs = (req, res, next) => {
  const { chatId } = req.body;
  const { status } = req.body;
  const dateTodayShort = new Date().toISOString().substring(0, 10);
  const dateToday = new Date(dateTodayShort);
  const midnightDate = new Date(dateTodayShort);
  midnightDate.setDate(midnightDate.getDate() + 1);
  Substitute.findOneAndUpdate(
    {
      chatId,
      createdAt: {
        $gte: dateToday,
        $lt: midnightDate,
      },
      status: 'No data',
    },
    { $set: { status } },
    { returnNewDocument: true },
  )
    // .populate('teacher')
    // .sort({ createdAt: 'desc' })
    .then((response) => {
    //   console.log(response);
      return res.status(200).send(response);
    })
    .catch(next); //  то же самое что .catch(err => next(err));
};
