const { validationResult, check } = require('express-validator');
const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const AppError = require('../utils/appError');
const generateJWT = require('../utils/jwt');

/* A middleware function that checks if the request body has any errors. If there are errors, it
returns a 400 status code with the errors. If there are no errors, it calls the next middleware
function. */
exports.validateFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

exports.signupValidations = [
  check('name', 'the name is requerid').not().isEmpty(),
  check('email', 'The email must be mandatory').not().isEmpty(),
  check('email', 'The email must be a correct format').isEmail(),
  check('password', 'The password must be mandatory').not().isEmpty(),
];

exports.loginValidations = [
  check('email', 'The email must be mandatory').not().isEmpty(),
  check('email', 'The email must be a correct format').isEmail(),
  check('password', 'The password must be mandatory').not().isEmpty(),
];

/* A middleware that validates if the user exists in the database. */
//Si el email existe esta mal y manda un error
exports.validIfExistUserEmail = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({
    where: {
      email: email.toLowerCase(),
      status: true,
    },
  });

  if (user && !user.status) {
    //TODO: lo que se deberia hacer es hacerle un update a true al estado de la cuenta
    return next(
      new AppError(
        'The user has an account, but it is deactivated please talk to the administrator to activate it',
        400
      )
    );
  }

  if (user) {
    return next(new AppError('The email user already exists', 400));
  }
  req.user;
  next();
});

// si existe en email esta bien y sigue , sino manda un error que no esta registrado
exports.validUserByEmail = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({
    where: {
      email: email.toLowerCase(),
      status: true,
    },
  });

  if (!user) {
    return next(new AppError('The user is not registered', 400));
  }

  req.user = user;
  next();
});

exports.validPassword = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { password } = req.body;

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Invalid credentials', 401));
  }
  next();
});

exports.createRestaurantValidation = [
  check('name', 'The name is required').not().isEmpty(),
  check('address', 'The address is required').not().isEmpty(),
  check('rating', 'The rating is required').not().isEmpty(),
  check('rating', 'The email must be numeric').isNumeric(),
];

exports.createReviewValidation = [
  check('comment', 'The comment is required').not().isEmpty(),
  check('rating', 'The rating is required').not().isEmpty(),
  check('rating', 'The email must be numeric').isNumeric(),
];

exports.createMealValidation = [
  check('name', 'The name is required').not().isEmpty(),
  check('price', 'The rating is required').not().isEmpty(),
  check('price', 'The email must be numeric').isNumeric(),
];
