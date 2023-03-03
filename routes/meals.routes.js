const { Router } = require('express');
const { check } = require('express-validator');
const {
  createmeal,
  findMeals,
  findMeal,
  updateMeal,
  deleteMeal,
} = require('../controllers/meal.controllers');
const {
  protect,
  protectAccountOwner,
  restrictTo,
} = require('../middlewares/auth.middleware');
const { validIfExistMeal } = require('../middlewares/meal.middleware');
const {
  validIfExistRestaurant,
} = require('../middlewares/restaurant.middlewares');
const {
  createReviewValidation,
  validateFields,
  createMealValidation,
} = require('../middlewares/validations.middlewares');

const router = Router();

router.get('/', findMeals);
router.get('/:id', validIfExistMeal, findMeal);

router.use(protect);

router.post(
  '/:id',
  createMealValidation,
  validateFields,
  validIfExistRestaurant,
  createmeal
);

router.patch(
  '/:id',
  createMealValidation,
  validateFields,
  validIfExistMeal,
  updateMeal
);

router.delete('/:id', validIfExistMeal, deleteMeal);

module.exports = {
  mealsRouter: router,
};
