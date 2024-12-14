import Comment from "../models/Comment.js";
import Blog from "../models/Blog.js";
import User from "../models/User.js";

// @desc    Add a comment to a blog
// @route   POST /api/comments
// @access  Public
const addComment = async (req, res) => {
    const { blogId, content } = req.body;
    const userId = req.user;

    try {
        // Check if the blog exists
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found', success: false });
        }

        // Create a new comment
        const comment = new Comment({ blogId, userId, content });
        const savedComment = await comment.save();

        // Add the comment to the blog's comments array
        blog.comments.push(savedComment._id);
        await blog.save();

        res.status(201).json({ savedComment, success: true });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message, error });
    }
};

// @desc    Get all comments for a blog
// @route   GET /api/comments/:blogId
// @access  Public
const getCommentsByBlogId = async (req, res) => {

    const { blogId } = req.params;
    const userId = req.user;

    try {

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found!" });
        }

        // populate the comments with user details
        const comments = await Comment.find({ blogId })
            .populate("userId", "name image");

        res.status(200).json({ comments, success: true });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message, success: false });
    }
};

// @desc    Delete a comment
// @route   DELETE /api/comments/:id
// @access  Private (Admin/User)
const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found', success: false });
        }

        // Remove the comment from the blog's comments array
        const blog = await Blog.findById(comment.blogId);
        if (blog) {
            blog.comments = blog.comments.filter((id) => id.toString() !== comment._id.toString());
            await blog.save();
        }

        await comment.remove();
        res.status(200).json({ message: 'Comment deleted successfully', success: true });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message, success: false });
    }
};

const editComment = async (req, res) => {
    const { commentId } = req.params;
    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found!!" });
        }

        comment.content = req.body.content || comment.content;
        await comment.save();

        res.status(200).json({ message: comment, success: true });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message, success: false });
    }
};

export { addComment, getCommentsByBlogId, deleteComment, editComment };