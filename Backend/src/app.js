import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import Router from './routes/questionsRoutes.js';

dotenv.config();

const app = express();

//Middleware

app.use(cors());
app.use(express.json());

//Routes

app.use('/api/users', userRoutes);
app.use('/api', Router );

app.get('/api/users', (req, res) => {
    res.send('Backend is running');
});

export default app;