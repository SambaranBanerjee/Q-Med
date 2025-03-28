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
    const { question } = req.body;

    try {
        const newQuestion = new Question({ question });
        const savedQuestion = await newQuestion.save();
        console.log(savedQuestion);
        res.status(201).json(savedQuestion);
    } catch (error) {
        res.status(400).json({ message: 'Invalid request' });
    }
};