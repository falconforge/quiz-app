import { Router } from 'express';
import UserController from '../controllers/UserController.js';
import AuthMiddleware from '../middlewares/AuthMiddlerware.js';

const router = Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/profile', AuthMiddleware.verifyToken, UserController.getProfile);

export default router;