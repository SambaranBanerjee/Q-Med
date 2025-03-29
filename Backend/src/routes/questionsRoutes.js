import express from 'express';
import { getQuestion, createQuestion, voteQuestion } from '../controllers/questionController.js';

const questionRouter = express.Router();

questionRouter.get('/questions', getQuestion );

questionRouter.post('/questions', createQuestion );

questionRouter.put('/questions/:q_Id/vote', voteQuestion);

export default questionRouter;