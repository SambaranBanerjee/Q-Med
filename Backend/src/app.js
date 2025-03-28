import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import questionRouter from './routes/questionsRoutes.js';
import doctorRouter from './routes/doctorRoutes.js';

dotenv.config();

const app = express();

//Middleware

app.use(cors());
app.use(express.json());

//Routes

app.use('/api', userRoutes);
app.use('/api', doctorRouter);
app.use('/api', questionRouter );

app.get('/api/users', (req, res) => {
    res.send('Backend is running');
});

export default app;