import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        default: null
    },
    author: {
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
        default: 0,
        min: 0
    },
    downvote: {
        type: Number,
        default: 0,
        min: 0
    }
}, {
    // Disable automatic index creation
    autoIndex: false
});

// Remove all virtuals and transforms that might interfere
questionSchema.set('toJSON', {
    virtuals: false,
    transform: (doc, ret) => {
        delete ret.__v;
        return ret;
    }
});

const Question = mongoose.model("Question", questionSchema);

export default Question;