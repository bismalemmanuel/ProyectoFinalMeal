const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

/* A middleware that validates if the user exists in the database. */
exports.validIfExistUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      status: true,
      id,
    },
  });

  if (!user) {
    return next(new AppError('User not found', 404));
  }
  // res.status(200).json({
  //   user,
  // });

  req.user = user;
  next();
});
