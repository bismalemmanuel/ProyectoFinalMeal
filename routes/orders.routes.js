const { Router } = require('express');
const { check } = require('express-validator');
const { createorder, getOrders } = require('../controllers/order.controllers');
const { protect } = require('../middlewares/auth.middleware');

const router = Router();

// router.get('/', findMeals);
// router.get('/:id', validIfExistMeal, findMeal);

router.use(protect);

router.post('/', createorder);
router.get('/me', getOrders);

module.exports = {
  ordersRouter: router,
};
