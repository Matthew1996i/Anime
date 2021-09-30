const { Router } = require('express');
const { firestoreController } = require('../controllers');

const userRouter = Router();

userRouter.post('/createcollection', firestoreController.createCollection);
