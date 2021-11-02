const { Router } = require('express');
const { firestoreController } = require('../controllers');
const authMiddleware = require('../middlewares/auth');

const firestoreRouter = Router();

firestoreRouter.post('/newanime', authMiddleware, firestoreController.addAnime);

module.exports = firestoreRouter;
