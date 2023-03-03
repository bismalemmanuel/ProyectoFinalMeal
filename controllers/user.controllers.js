const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const generateJWT = require('../utils/jwt');
const Order = require('../models/order.model');

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, role = 'normal' } = req.body;
  const user = new User({ name, email, password, role });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  await user.save();
  const token = await generateJWT(user.id);
  res.status(200).json({
    status: 'succes',
    id: user.id,
    token,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { user } = req;
  const token = await generateJWT(user.id);

  return res.status(200).json({
    status: 'success',
    token,
    user: {
      id: user.id,
      name: user.name,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { name, email } = req.body;
  const { user } = req;

  await user.update({ name, email });

  res.status(200).json({
    status: 'success',
    message: 'User updated successfully',
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: false });

  res.status(200).json({
    status: 'success',
    message: 'User deleted successfully',
  });
});

exports.getOrders = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const orders = await Order.findAll({
    where: {
      userId: sessionUser.id,
      status: true,
    },
  });

  res.status(200).json({
    orders,
  });
});
