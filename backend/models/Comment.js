import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required: true,
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
}, { timestamps: true });

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;