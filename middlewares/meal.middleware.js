const Meal = require('../models/meal.model');
const Restaurant = require('../models/restaurant.model');
const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

/* A middleware that validates if the user exists in the database. */
exports.validIfExistMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meal.findOne({
    where: {
      status: true,
      id,
    },
    include: [
      {
        model: Restaurant,
      },
    ],
  });

  if (!meal) {
    return next(new AppError('meal not found', 404));
  }
  // res.status(200).json({
  //   meal,
  // });

  req.meal = meal;

  next();
});
