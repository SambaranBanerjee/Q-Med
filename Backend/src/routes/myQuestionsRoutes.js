import express from "express";
import { getMyQuestions, createMyQuestion } from "../controllers/myQuestionsController.js";

const myQuestionsRouter = express.Router();

myQuestionsRouter.get('/myQuestions', getMyQuestions);

myQuestionsRouter.post('/myQuestions', createMyQuestion);

export default myQuestionsRouter;


