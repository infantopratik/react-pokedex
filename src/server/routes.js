'use strict'
import { Router } from 'express';
import * as UserController from './controllers/User.controller';
import * as FavoriteController from './controllers/Favorite.controller';

import authenticate from './middlewares/authenticate';

const router = new Router();

// User Routes
router.get('/user', UserController.getUser);
router.post('/user', UserController.createUser);
router.post('/login', UserController.login);
router.get('/checkToken', UserController.checkToken);
router.get('/user/details', authenticate, UserController.getDetails);
router.post('/logout', UserController.logout);

// Favorites Routes
router.post('/favorite', authenticate, FavoriteController.addFavorite);
router.delete('/favorite', authenticate, FavoriteController.removeFavorite);
router.get('/favorites', authenticate, FavoriteController.getAllFavorites);

export default router;
