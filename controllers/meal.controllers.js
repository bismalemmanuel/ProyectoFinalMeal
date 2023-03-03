const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const generateJWT = require('../utils/jwt');
const Order = require('../models/order.model');
const Meal = require('../models/meal.model');

exports.createmeal = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const { restaurant } = req;
  const meal = new Meal({
    name,
    price,
    restaurantId: restaurant.id,
  });
  await meal.save();

  res.status(200).json({
    status: 'succes',
    meal,
  });
});

exports.findMeals = catchAsync(async (req, res, next) => {
  const meal = await Meal.findAll({
    where: {
      status: true,
    },
  });

  res.status(200).json({
    status: 'success',
    message: 'Meal was found successfully',
    meal,
  });
});

exports.findMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;

  res.status(200).json({
    status: 'success',
    message: 'Meals was found successfully',
    meal,
  });
});

exports.updateMeal = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const { meal } = req;

  await meal.update({ name, price });

  res.status(200).json({
    status: 'success',
    message: 'Meal updated successfully',
    meal,
  });
});

exports.deleteMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;

  await meal.update({ status: false });

  res.status(200).json({
    status: 'success',
    message: 'Mail deleted successfully',
    meal,
  });
});
