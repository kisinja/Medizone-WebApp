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

    if (loading) return <Loader text="fetching blog..." />;

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto py-8">
                <h1 className="text-4xl font-bold text-center mb-6">{blog.title}</h1>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-3">
                        <div className="bg-white shadow-lg rounded-lg p-6">
                            {blog.imageUrls.map((url, index) => (
                                <img
                                    key={index}
                                    src={url}
                                    alt={`Blog Image ${index + 1}`}
                                    className="w-full mb-4 rounded-lg"
                                />
                            ))}
                            <p className="text-gray-700 text-lg leading-7">{blog.content}</p>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Related Blogs</h2>
                        {relatedBlogs.map((related) => (
                            <Link
                                to={`/blogs/${related._id}`}
                                key={related._id}
                                className="block bg-white shadow-lg rounded-lg mb-4 overflow-hidden hover:shadow-xl transition"
                            >
                                <img
                                    src={related.imageUrls[0] || '/default-blog.jpg'}
                                    alt={related.title}
                                    className="w-full h-32 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold">{related.title}</h3>
                                    <p className="text-gray-600">{related.content.slice(0, 50)}...</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;