const Restaurant = require('../models/restaurant.model');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const generateJWT = require('../utils/jwt');
const Review = require('../models/reviews.model');

exports.createrestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;
  const restaurant = new Restaurant({ name, address, rating });
  await restaurant.save();

  res.status(200).json({
    status: 'succes',
    restaurant,
  });
});

exports.findRestaurants = catchAsync(async (req, res, next) => {
  const restaurant = await Restaurant.findAll({
    where: {
      status: true,
    },
  });

  res.status(200).json({
    status: 'success',
    message: 'Restaurant was found successfully',
    restaurant,
  });
});

exports.findRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  res.status(200).json({
    status: 'success',
    message: 'Restaurant was found successfully',
    restaurant,
  });
});

exports.updateRestaurant = catchAsync(async (req, res, next) => {
  const { name, address } = req.body;
  const { restaurant } = req;

  await restaurant.update({ name, address });

  res.status(200).json({
    status: 'success',
    message: 'Restaurant updated successfully',
    restaurant,
  });
});

exports.deleteRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  await restaurant.update({ status: false });

  res.status(200).json({
    status: 'success',
    message: 'Restaurant deleted successfully',
  });
});

exports.createreview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { restaurant, sessionUser } = req;
  const reviews = new Review({
    comment,
    rating,
    restaurantId: restaurant.id,
    userId: sessionUser.id,
  });
  await reviews.save();

  res.status(200).json({
    status: 'succes',
    reviews,
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const { review } = req;
  const { comment, rating } = req.body;

  await review.update({ comment, rating });
  res.status(200).json({
    status: 'success',
    message: 'The review has been update',
  });
});

exports.deleteeReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  await review.update({ status: false });
  res.status(200).json({
    status: 'success',
    message: 'The review has been deleted',
  });
});
