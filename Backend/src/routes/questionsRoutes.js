import express from 'express';
import { 
  getQuestions, 
  createQuestion, 
  voteQuestion,
  upload 
} from '../controllers/questionController.js';

const questionRouter = express.Router();

// GET all questions
questionRouter.get('/questions', getQuestions);

// POST a new question (with optional image upload)
questionRouter.post('/questions', upload.single('image'), createQuestion);

// PUT vote on a question
questionRouter.put('/questions/:questionId/vote', voteQuestion);

export default questionRouter;