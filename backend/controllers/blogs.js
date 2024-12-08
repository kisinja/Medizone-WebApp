import { v2 as cloudinary } from 'cloudinary';
import Blog from '../models/Blog.js';

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.status(200).json({ blogs, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
        console.log(error.message);
    }
};

// @desc    Get a single blog by ID
// @route   GET /api/blogs/:id
// @access  Public
const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found", success: false });
        }
        res.status(200).json({ blog, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
        console.log(error.message);
    }
};

// @desc   Get blogs by tag
// @route  GET /api/blogs/tag/:tag
// @access Public
const getBlogsByTag = async (req, res) => {
    const { tag } = req.query;

    try {
        let blogs;
        if (tag) {
            blogs = await Blog.find({ tags: { $in: [tag] } }).sort({ createdAt: -1 });
        } else {
            blogs = await Blog.find().sort({ createdAt: -1 });
        }

        res.status(200).json({ blogs, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
        console.log(error.message);
    }
};

// @desc    Create a new blog
// @route   POST /api/blogs
// @access  Private (Authorized only)
const createBlog = async (req, res) => {
    const { title, content, tags, published } = req.body;

    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No images uploaded", success: false });
    }

    try {
        // Upload images to Cloudinary
        const uploadPromises = req.files.map((file) =>
            cloudinary.uploader.upload(file.path)
        );

        const uploadResults = await Promise.all(uploadPromises);

        // Get all uploaded image URLs
        const imageUrls = uploadResults.map((result) => result.secure_url);

        // Create new blog
        const blog = new Blog({
            title,
            content,
            imageUrls,
            tags: JSON.parse(tags),
            published,
        });

        const createdBlog = await blog.save();
        res.status(201).json({ createdBlog, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
        console.log(error.message);
    }
};

// @desc    Update a blog
// @route   PUT /api/blogs/:id
// @access  Private (Admin only)
const updateBlog = async (req, res) => {
    const { title, content, tags, published } = req.body;
    const blogId = req.params.id;

    try {
        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found", success: false });
        }

        // Upload new images if any
        let newImageUrls = [];
        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map((file) =>
                cloudinary.uploader.upload(file.path, { resource_type: "image" })
            );
            const uploadResults = await Promise.all(uploadPromises);
            newImageUrls = uploadResults.map((result) => result.secure_url);
        }

        // Merge existing and new images
        const updatedImageUrls = [...(blog.imageUrls || []), ...newImageUrls];

        // Update blog fields
        blog.title = title || blog.title;
        blog.content = content || blog.content;
        blog.imageUrls = updatedImageUrls;
        blog.tags = tags ? JSON.parse(tags) : blog.tags;
        blog.published = published !== undefined ? published : blog.published;

        const updatedBlog = await blog.save();
        res.status(200).json({ updatedBlog, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
        console.log(error.message);
    }
};

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Private (Admin only)
const deleteBlog = async (req, res) => {

    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found", success: false });
        }

        await blog.remove();
        res.status(200).json({ message: "Blog deleted successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
        console.log(error.message);
    }
};

export {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
    getBlogsByTag
};