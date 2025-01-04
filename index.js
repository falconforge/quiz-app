import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/UsersRoute.js';
import quizRoutes from './routes/QuizRoute.js';

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/users', userRoutes);
app.use('/quiz', quizRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;