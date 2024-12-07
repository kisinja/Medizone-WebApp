import express from 'express';
import { addComment, getCommentsByBlogId, deleteComment, editComment } from '../controllers/comments.js';
import authUser from '../middleware/authUser.js';

const router = express.Router();

router.use(authUser);

// Add a comment
router.post('/', addComment);

// Get comments for a specific blog
router.get('/:blogId', getCommentsByBlogId);

// Delete a comment
router.delete('/:id', deleteComment);

// edit a comment
router.put('/:commentId', editComment);

export default router;