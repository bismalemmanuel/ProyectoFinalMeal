const express = require('express');
const cors = require('cors');
const { db } = require('../database/db');
const { ordersRouter } = require('../routes/orders.routes');
const { restaurantsRouter } = require('../routes/restaurants.routes');
const { mealsRouter } = require('../routes/meals.routes');
const { usersRouter } = require('../routes/users.routes');
const globalErrorHandler = require('../controllers/error.controller');
const initModel = require('./init.models');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //Path Routes
    this.paths = {
      users: '/api/v1/users',
      restaurants: '/api/v1/restaurants',
      meals: '/api/v1/meals',
      orders: '/api/v1/orders',
    };

    //Connect to db
    this.database();

    //Middlewares
    this.middlewares();

    //Routes
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.paths.users, usersRouter);
    this.app.use(this.paths.restaurants, restaurantsRouter);
    this.app.use(this.paths.orders, ordersRouter);
    this.app.use(this.paths.meals, mealsRouter);
    this.app.all('*', (req, res, next) => {
      return next(
        new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
      );
    });
    this.app.use(globalErrorHandler);
  }

  database() {
    db.authenticate()
      .then(() => console.log('Database authenticated'))
      .catch(err => console.log(err));
    //relations

    initModel();

    db.sync()
      .then(() => console.log('Database synced'))
      .catch(err => console.error(err));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server Running On Por', this.port);
    });
  }
}

module.exports = Server;
