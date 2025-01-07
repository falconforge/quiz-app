import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import userRoutes from './routes/UsersRoute.js';
import quizRoutes from './routes/QuizRoute.js';

import logger from './utils/logger.js';
import rateLimitter from './utils/rateLimitter.js';

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());

logger(app); // Logging
rateLimitter(app); // Limiter

// Routes
app.use('/users', userRoutes);
app.use('/quiz', quizRoutes);

export default app;