import { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const { backendUrl, token } = useContext(AppContext);

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

    if (loading) return <Loader text="Fetching blog..." />;

    return (
        <section className="bg-gray-100 min-h-screen">
            <div className="container mx-auto py-12">
                {/* Blog Header */}
                <div className="text-center">
                    <h1 className="text-5xl font-bold mb-4">{blog.title}</h1>
                    <p className="text-gray-600 text-lg">{blog.author} · {blog.createdAt}</p>
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
                        <h2 className="text-3xl font-bold">Related Blogs</h2>
                        {relatedBlogs.map((related) => (
                            <Link
                                to={`/blogs/${related._id}`}
                                key={related._id}
                                className="block bg-white shadow-lg rounded-lg hover:shadow-xl transition"
                            >
                                <div className="grid grid-cols-3">
                                    <img
                                        src={related.imageUrls[0] || '/default-blog.jpg'}
                                        alt={related.title}
                                        className="rounded-l-lg object-cover h-32 w-full"
                                    />
                                    <div className="col-span-2 p-4">
                                        <h3 className="text-lg font-semibold">{related.title}</h3>
                                        <p className="text-gray-600 line-clamp-2">
                                            {related.content}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogDetails;