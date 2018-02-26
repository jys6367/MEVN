import mongoose from "mongoose";

const Board = mongoose.Schema({
    id: {
        type: Number,
        require: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("board", Board);