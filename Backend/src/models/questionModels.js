import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    q_Id: {
        type: String,
        unique: true
    },
    question: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isAnswered: {
        type: Boolean,
        default: false
    },
    answers: {
        type: [String],
        default: []
    },
    upvote: {
        type: Number,
        default: 0
    },
    downvote: {
        type: Number,
        default: 0
    },
});

const Question = mongoose.model("Question", questionSchema);

export default Question;