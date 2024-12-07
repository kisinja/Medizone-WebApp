const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        imageUrls: [{
            type: String,
            required: false,
        }],
        tags: [String], // For categorizing or searching
        published: {
            type: Boolean,
            default: false, // Allows for drafts
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment',
            },
        ],
        shares: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;