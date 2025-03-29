import Question from '../models/questionModels.js';

export const getQuestion = async (req, res) => {
        try {
            const questions = await Question.find();
            res.status(200).json(questions);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    };

export const createQuestion = async (req, res) => {
    try {
        const newQuestion = new Question({ question: req.body.question, });
        const savedQuestion = await newQuestion.save();
        const response = {
            question: savedQuestion.question,
            upvote: savedQuestion.upvote,
            downvote: savedQuestion.downvote,
            answers: savedQuestion.answers,
            isAnswered: savedQuestion.isAnswered,
            createdAt: savedQuestion.createdAt,
            q_Id: savedQuestion._id,
        };
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ message: 'Invalid request' });
    }
};

export const voteQuestion = async (req, res) => {
    const { q_Id } = req.params;
    const { action } = req.body;
    try {
        const question = await Question.findById(q_Id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        if (action === 'upvote') {
            question.upvote += 1;
        } else if (action === 'downvote') {
            question.downvote += 1;
        }
        const updatedQuestion = await question.save();
        res.status(200).json(updatedQuestion);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
