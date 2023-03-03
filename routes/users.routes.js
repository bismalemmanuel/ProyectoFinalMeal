const { Router } = require('express');
const { check } = require('express-validator');
const {
  signup,
  login,
  updateUser,
  deleteUser,
  getOrders,
} = require('../controllers/user.controllers');
const {
  protect,
  protectAccountOwner,
} = require('../middlewares/auth.middleware');
const { validIfExistUser } = require('../middlewares/user.middleware');
const {
  validateFields,
  signupValidations,
  validIfExistUserEmail,
  loginValidations,
  validPassword,
  validUserByEmail,
} = require('../middlewares/validations.middlewares');

const router = Router();

router.post(
  '/signup',
  validateFields,
  signupValidations,
  validIfExistUserEmail,
  signup
);

router.post(
  '/login',
  loginValidations,
  validateFields,
  validUserByEmail,
  validPassword,
  login
);

router.use(protect);

router.patch(
  '/:id',
  [
    check('name', 'The name must be mandatory').not().isEmpty(),
    check('email', 'The email must be mandatory').not().isEmpty(),
    check('email', 'The email must be a correct format').isEmail(),
    validIfExistUser,
    validateFields,
    protectAccountOwner,
    validUserByEmail,
  ],
  updateUser
);

router.delete('/:id', validIfExistUser, deleteUser);

router.get('/orders', protect, getOrders);

module.exports = {
  usersRouter: router,
};
