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
import upload from '../middleware/multer.js';

const router = express.Router();

router.use(authUser);

router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.post('/', upload.array('imageUrls', 5), createBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);
router.get('/tag', getBlogsByTag);

export default router;