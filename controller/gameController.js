const Games = require('../models/gameModel');

const appError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

// exports.aliasTopTours = (req, res, next) => {
//   (req.query.limit = '5'),
//     (req.query.sort = '-ratingsAverage,price'),
//     (req.query.fields = 'name,price,ratingsAverage,summary,difficulty');
//   next();
// };

//Request handlers
exports.getAllGame = factory.getAll(Games);
exports.createGame = factory.createOne(Games);
exports.getGame = factory.getOne(Games);
exports.updateTour = factory.updateOne(Games);
exports.deleteTour = factory.deleteOne(Games);

// exports.roomIdCheckTime = (req, res, next) => {
//   const checkTime = new Date().toLocaleString('en-US', {
//     timeZone: 'Asia/Kolkata',
//   });
//   console.log(checkTime);
//   res.status(200).json({
//     status: 'success',
//     checkTime: new Date(checkTime),
//   });
// };

exports.roomIdCheckTime = (req, res, next) => {
  const checkTime = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
  });

  const finalTime = new Date(checkTime).getTime();
  res.status(200).json({
    status: 'success',
    checkTime: new Date(finalTime + 600000),
  });
};

exports.getMyGames = catchAsync(async (req, res, next) => {
  userId = req.user._id;
  const my_games = await Games.find({ players_participated: [userId] });
  if (!my_games) {
    return res.status(500).json({
      status: 'failed',
    });
  }
  res.status(200).json({
    status: 'success',
    data: my_games,
  });
});

//Android specific
exports.getAllGameForAndroid = catchAsync(async (req, res, next) => {
  const doc = await Games.find({ active: true });
  if (!doc) {
    return res.status(200).json({
      status: 'failed',
      message: 'No Upcoming Tournaments',
    });
  }
  res.status(200).json({
    status: 'success',
    length: doc.length,
    data: {
      doc,
    },
  });
});
