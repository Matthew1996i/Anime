const express = require('express');
const {
  rootRouter,
  userRouter,
} = require('./routers');

const routes = express.Router();

routes.use('/', rootRouter);
routes.use('/user', userRouter);

module.exports = routes;
