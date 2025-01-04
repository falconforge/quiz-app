import { Router } from 'express';
import QuizController from '../controllers/QuizController.js';
import AuthMiddleware from '../middlewares/AuthMiddlerware.js';

const router = Router();

router.post('/create-quiz', AuthMiddleware.verifyToken, QuizController.createQuiz);
router.get('/get-quiz', AuthMiddleware.verifyToken, QuizController.getQuiz);
router.post('/post-answer', AuthMiddleware.verifyToken, QuizController.postAnswer);
router.get('/get-result', AuthMiddleware.verifyToken, QuizController.getResult);

export default router;