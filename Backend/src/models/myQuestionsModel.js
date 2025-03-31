import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    isAnswered: {
        type: Boolean,
        default: false,
    },
    answers: {
        type: [String],
    },
    upvotes: {
        type: Number,
        default: 0,
    },
    downvotes: {
        type: Number,
        default: 0,
    },
});

const myQuestion = mongoose.model("myQuestion", questionSchema);

export default myQuestion;

