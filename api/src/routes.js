const express = require('express');
const cors = require('cors');

const {
  rootRouter,
  userRouter,
  firestoreRouter,
} = require('./routers');

const routes = express.Router();

routes.use(cors());
routes.use(express.urlencoded({ extended: true }));
routes.use(express.json());
routes.use('/', rootRouter);
routes.use('/user', userRouter);
routes.use('/collection', firestoreRouter);

module.exports = routes;
