import express from 'express';
import { getQuestion, createQuestion } from '../controllers/questionController.js';

const questionRouter = express.Router();

questionRouter.get('/questions', getQuestion );

questionRouter.post('/questions', createQuestion );

export default questionRouter;