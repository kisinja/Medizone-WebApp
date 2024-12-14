import { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { Helmet } from 'react-helmet-async';

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState('');
    const [subLoading, setSubLoading] = useState(false);

    const { backendUrl, token, comments, commentsLoading, getBlogComments } = useContext(AppContext);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const { data } = await axios.get(`${backendUrl}/api/blogs/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (data.success) {
                    setBlog(data.blog);
                    setRelatedBlogs(data.relatedBlogs);

                    // Fetch comments for the blog
                    getBlogComments(id);
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                console.log(error.message);
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id, backendUrl, token]);

    if (loading) {
        return <Loader text="Fetching blog..." />;
    } else if (commentsLoading) {
        return <Loader text="Fetching comments..." />;
    }

    const handleCommentSubmit = async (blogId) => {

        setSubLoading(true);

        if (!content) {
            toast.error('Comment content is required!');
            setSubLoading(false);
            return;
        }

        try {
            const { data } = await axios.post(`${backendUrl}/api/comments`, { blogId, content }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (data.success) {
                toast.success(data.message);
                console.log(data);
                setContent('');
                getBlogComments(blogId);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        } finally {
            setSubLoading(false);
        }
    };

    const pageUrl = `${window.location.origin}/blogs/${id}`;

    return (
        <>
            {/* Helmet for SEO */}
            <Helmet>
                <title>{blog.title} | Blog Platform</title>
                <meta name="description" content={blog.content.slice(0, 150)} />
                <meta name="author" content={blog.author} />
                <meta name="keywords" content={blog.tags?.join(', ')} />
                <meta property="og:title" content={blog.title} />
                <meta property="og:description" content={blog.content.slice(0, 150)} />
                <meta property="og:image" content={blog.imageUrls[0] || '/default-blog.jpg'} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={pageUrl} />
                <link rel="canonical" href={pageUrl} />
            </Helmet>

            <section className="bg-gray-100 min-h-screen px-8">
                <div className="container mx-auto py-12">
                    {/* Blog Header */}
                    <div className="text-center">
                        <h1 className="text-5xl font-bold mb-4">{blog.title}</h1>
                        <p className="text-gray-600 text-lg">
                            {blog.author} · {new Date(blog.createdAt).toLocaleDateString()}
                        </p>
                    </div>

                    {/* Blog Content Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <div className="bg-white shadow-lg rounded-lg p-8">
                                {/* Image Gallery */}
                                <div className="grid grid-cols-3 gap-2 mb-6">
                                    {blog.imageUrls.map((url, index) => (
                                        <img
                                            key={index}
                                            src={url}
                                            alt={`Blog Image ${index + 1}`}
                                            className="rounded-lg object-cover h-40 w-full"
                                            width="300" // Example width
                                            height="160" // Example height
                                        />
                                    ))}
                                </div>
                                {/* Blog Text */}
                                <div
                                    className="text-gray-700 text-lg leading-8"
                                    dangerouslySetInnerHTML={{ __html: blog.content }}
                                ></div>
                            </div>
                        </div>

                        {/* Related Blogs Section */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold">Related Blogs</h2>

                            {relatedBlogs.length === 0 ? (
                                <p className='text-gray-500'>No related blogs found!</p>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {relatedBlogs.map((blog) => (
                                        <div
                                            key={blog._id}
                                            className="bg-white shadow-lg rounded-lg p-6"
                                        >
                                            <Link to={`/blogs/${blog._id}`}>
                                                <img
                                                    src={blog.imageUrls[0] || '/default-blog.jpg'}
                                                    alt={blog.title}
                                                    className="rounded-lg object-cover h-40 w-full"
                                                    width="300" // Example width
                                                    height="160" // Example height
                                                />
                                            </Link>
                                            <div className="mt-4">
                                                <Link to={`/blogs/${blog._id}`}>
                                                    <h3 className="text-xl font-semibold hover:underline">
                                                        {blog.title}
                                                    </h3>
                                                </Link>
                                                <p className="text-gray-600">
                                                    {blog.author} ·{' '}
                                                    {new Date(blog.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                        </div>
                    </div>

                    {/* Comment Section */}
                    <div className="mt-12 py-12">
                        <h2 className="text-3xl font-bold mb-6">Comments</h2>
                        <div className="bg-white shadow-lg rounded-lg p-6">
                            {/* Comment Form (to be implemented later) */}
                            <div className="mb-6">
                                <textarea
                                    placeholder="Add a comment..."
                                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
                                    rows="4"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                ></textarea>
                                <button
                                    className="mt-4 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                                    type="submit"
                                    onClick={() => handleCommentSubmit(blog._id)}
                                    disabled={subLoading}
                                >
                                    {subLoading ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>

                            {/* Display Comments (placeholder for now) */}
                            <div className="space-y-4">

                                {
                                    comments.length === 0 ? (
                                        <p className="text-gray-500">No comments for this blog found!</p>
                                    ) : (
                                        <>
                                            {
                                                comments.slice(0, 3).map(comm => (
                                                    <div className="flex items-start space-x-4" key={comm._id}>
                                                        <div className="">
                                                            <img src={comm.userId.image} alt=""
                                                                className='w-10 h-10 rounded-full'
                                                            />
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold">{comm.userId.name}</p>
                                                            <p className="text-gray-600">{comm.content}</p>
                                                            {/* Comment time */}
                                                            <p className="text-gray-400 text-sm">
                                                                {new Date(comm.createdAt).toLocaleDateString()} . {new Date(comm.createdAt).toLocaleTimeString()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    );
};

export default BlogDetails;