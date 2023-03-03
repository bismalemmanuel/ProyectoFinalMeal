const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const generateJWT = require('../utils/jwt');
const Order = require('../models/order.model');
const Meal = require('../models/meal.model');

exports.createorder = catchAsync(async (req, res, next) => {
  const { quantity, mealId, totalPrice } = req.body;
  const { sessionUser } = req;
  const order = new Order({
    quantity,
    mealId,
    totalPrice,
    userId: sessionUser.id,
  });
  await order.save();

  res.status(200).json({
    status: 'succes',
    order,
  });
});

exports.getOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.findAll({
    where: {
      status: true,
    },
  });

  res.status(200).json({
    orders,
  });
});
