import multer from 'multer';
import path from 'path';
import Question from '../models/questionModels.js';

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG, and GIF images are allowed'), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    
    // Transform the response to include imageUrl
    const transformedQuestions = questions.map(question => ({
      _id: question._id,
      question: question.question,
      ...(question.image && { 
        imageUrl: `/uploads/${path.basename(question.image)}` 
      }),
      createdAt: question.createdAt,
      isAnswered: question.isAnswered,
      answers: question.answers,
      upvote: question.upvote,
      downvote: question.downvote,
      author: question.author
    }));

    res.status(200).json(transformedQuestions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ 
      message: 'Server error',
      error: error.message 
    });
  }
};

export const createQuestion = async (req, res) => {
  try {
    if (!req.body.question && !req.file) {
      return res.status(400).json({ 
        message: 'Question text or image is required' 
      });
    }

    const newQuestion = new Question({
      question: req.body.question,
      author: req.body.author,
      ...(req.file && { image: req.file.path })
    });

    const savedQuestion = await newQuestion.save();
    
    // Transform the response to include image URL
    const response = {
      _id: savedQuestion._id,
      question: savedQuestion.question,
      ...(savedQuestion.image && { 
        imageUrl: `/uploads/${path.basename(savedQuestion.image)}` 
      }),
      createdAt: savedQuestion.createdAt,
      isAnswered: savedQuestion.isAnswered,
      answers: savedQuestion.answers,
      upvote: savedQuestion.upvote,
      downvote: savedQuestion.downvote,
      author: savedQuestion.author
    };
    
    res.status(201).json(response);
    
  } catch (error) {
    console.error('Question creation error:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    res.status(400).json({
      message: 'Error creating question',
      error: error.message,
      ...(error.code === 11000 && { 
        duplicateKey: error.keyValue 
      })
    });
  }
};

export const voteQuestion = async (req, res) => {
  const { questionId } = req.params;
  const { action } = req.body;
  
  try {
    if (!questionId) {
      return res.status(400).json({ message: 'Question ID is required' });
    }

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    const update = {};
    if (action === 'upvote') {
      update.$inc = { upvote: 1 };
    } else if (action === 'downvote') {
      update.$inc = { downvote: 1 };
    } else {
      return res.status(400).json({ message: 'Invalid action type' });
    }

    const updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      update,
      { new: true }
    );

    res.status(200).json({
      _id: updatedQuestion._id,
      question: updatedQuestion.question,
      upvote: updatedQuestion.upvote,
      downvote: updatedQuestion.downvote,
      ...(updatedQuestion.image && {
        imageUrl: `/uploads/${path.basename(updatedQuestion.image)}`
      })
    });
  } catch (error) {
    console.error('Voting error:', {
      params: req.params,
      error: error.message
    });
    res.status(500).json({ 
      message: 'Server error during voting',
      error: error.message 
    });
  }
};
