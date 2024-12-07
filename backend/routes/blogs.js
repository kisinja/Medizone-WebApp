import express from 'express';
import {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
    getBlogsByTag
} from '../controllers/blogs.js';
import authUser from '../middleware/authUser.js';

const router = express.Router();

router.use(authUser);

router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.post('/', upload.single('imageUrl'), createBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);
router.get('/tag', getBlogsByTag);

export default router;