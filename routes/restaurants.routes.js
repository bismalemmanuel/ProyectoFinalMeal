const { Router } = require('express');
const { check } = require('express-validator');
const {
  createrestaurant,
  findRestaurants,
  findRestaurant,
  updateRestaurant,
  deleteRestaurant,
  createreview,
  updateReview,
  deleteeReview,
} = require('../controllers/restaurant.controller');
const {
  protect,
  protectAccountOwner,
  restrictTo,
} = require('../middlewares/auth.middleware');
const {
  validIfExistRestaurant,
  validIfExistRestaurantId,
} = require('../middlewares/restaurant.middlewares');
const { validExistReview } = require('../middlewares/review.middleware');
const {
  createRestaurantValidation,
  validateFields,
  createReviewValidation,
} = require('../middlewares/validations.middlewares');

const router = Router();

router.use(protect);

router.post('/', createRestaurantValidation, validateFields, createrestaurant);
router.get('/', validateFields, findRestaurants);
router.get('/:id', validIfExistRestaurant, validateFields, findRestaurant);
router.patch('/:id', validIfExistRestaurant, validateFields, updateRestaurant);
router.delete('/:id', validIfExistRestaurant, validateFields, deleteRestaurant);

router.post(
  '/reviews/:id',
  createReviewValidation,
  validateFields,
  validIfExistRestaurant,
  createreview
);

router.patch(
  '/reviews/:restaurantId/:id',
  createReviewValidation,
  validateFields,
  validIfExistRestaurantId,
  validExistReview,
  protectAccountOwner,
  updateReview
);

router.delete(
  '/reviews/:restaurantId/:id',
  createReviewValidation,
  validateFields,
  validIfExistRestaurantId,
  validExistReview,
  protectAccountOwner,
  deleteeReview
);

module.exports = {
  restaurantsRouter: router,
};
