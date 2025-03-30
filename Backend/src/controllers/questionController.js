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
        if (!req.body.question) {
            return res.status(400).json({ message: 'Question text is required' });
        }

        const newQuestion = new Question({
            question: req.body.question
        });

        const savedQuestion = await newQuestion.save();
        
        // Ensure we're sending a consistent response
        const response = {
            _id: savedQuestion._id,
            question: savedQuestion.question,
            createdAt: savedQuestion.createdAt,
            isAnswered: savedQuestion.isAnswered,
            answers: savedQuestion.answers,
            upvote: savedQuestion.upvote,
            downvote: savedQuestion.downvote
        };
        
        res.status(201).json(response);
        
    } catch (error) {
        console.error('Creation error:', error);
        // Add more detailed error logging
        console.error('Full error object:', {
            name: error.name,
            message: error.message,
            code: error.code,
            keyPattern: error.keyPattern,
            keyValue: error.keyValue
        });
        
        res.status(400).json({
            message: 'Error creating question',
            error: error.message,
            details: error.code === 11000 ? error.keyPattern : null
        });
    }
};

export const voteQuestion = async (req, res) => {
    const { q_Id } = req.params;
    const { action } = req.body;
    
    try {
        console.log('Vote request received:', { q_Id, action }); // Debug log
        
        if (!q_Id) {
            return res.status(400).json({ message: 'Question ID is required' });
        }

        const question = await Question.findById(q_Id);
        console.log('Found question:', question); // Debug log

        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        if (action === 'upvote') {
            question.upvote = (question.upvote || 0) + 1;
        } else if (action === 'downvote') {
            question.downvote = (question.downvote || 0) + 1;
        } else {
            return res.status(400).json({ message: 'Invalid action type' });
        }

        const updatedQuestion = await question.save();
        console.log('Updated question:', updatedQuestion); // Debug log

        // Send back a response that matches your frontend Question interface
        const response = {
            _id: updatedQuestion._id,
            question: updatedQuestion.question,
            createdAt: updatedQuestion.createdAt,
            isAnswered: updatedQuestion.isAnswered,
            answers: updatedQuestion.answers,
            upvote: updatedQuestion.upvote,
            downvote: updatedQuestion.downvote
        };

        res.status(200).json(response);
    } catch (error) {
        console.error('Vote error:', error); // Debug log
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
