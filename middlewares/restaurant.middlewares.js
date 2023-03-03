const Restaurant = require('../models/restaurant.model');
const catchAsync = require('../utils/catchAsync');

/* A middleware that validates if the Restaurant exists in the database. */
exports.validIfExistRestaurant = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const restaurant = await Restaurant.findOne({
    where: {
      status: true,
      id,
    },
  });

  if (!restaurant) {
    return next(new AppError('restaurant not found', 404));
  }

  req.restaurant = restaurant;
  next();
});

exports.validIfExistRestaurantId = catchAsync(async (req, res, next) => {
  const { restaurantId } = req.params;
  const restaurant = await Restaurant.findOne({
    where: {
      status: true,
      id: restaurantId,
    },
  });

  if (!restaurant) {
    return next(new AppError('restaurant not found', 404));
  }

  req.restaurant = restaurant;
  next();
});
