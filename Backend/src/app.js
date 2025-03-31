import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import questionRouter from './routes/questionsRoutes.js';
import doctorRouter from './routes/doctorRoutes.js';
import myQuestionsRouter from './routes/myQuestionsRoutes.js';
dotenv.config();

const app = express();

//Middleware

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

//Routes

app.use('/api', userRoutes);
app.use('/api', doctorRouter);
app.use('/api', questionRouter );
app.use('/api', myQuestionsRouter);

app.get('/api/users', (req, res) => {
    res.send('Backend is running');
});

export default app;