import myQuestion from "../models/myQuestionsModel.js";

export const getMyQuestions = async (req, res) => {
    try {
        const questions = await myQuestion.find();
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const createMyQuestion = async (req, res) => {
    try {
        const { question } = req.body;
        if (!question) {
            return res.status(400).json({ message: 'Question text is required' });
        }
        const newQuestion = new myQuestion({ question });
        await newQuestion.save();
        res.status(201).json(newQuestion);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};  


