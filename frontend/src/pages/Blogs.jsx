import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

const Blogs = () => {

    const { blogs, blogsLoading, getAllBlogs, token } = useContext(AppContext);

    useEffect(() => {
        if (token) {
            getAllBlogs();
        }
    }, [token]);

    if (blogsLoading) {
        return <Loader text="Fetching blogs..." />
    }

    if (blogs.length === 0) {
        return <h2>No blogs found</h2>
    }

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
            <div className="container mx-auto py-8">
                <h1 className="text-4xl font-bold text-center mb-6">Blogs</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map(blog => (
                        <div
                            key={blog._id}
                            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition"
                        >
                            <img
                                src={blog.imageUrls[0] || '/default-blog.jpg'}
                                alt={blog.title}
                                className="w-full h-48 object-cover"
                            />

                            <div className="p-4">
                                <h3 className="font-semibold text-lg mb-2">{blog.title}</h3>
                                <p className="text-gray-600 mb-4">{blog.content.slice(0, 80)}...</p>

                                <div className="flex gap-2 mb-4">
                                    {blogs.tags.map((tag, index) => (
                                        <span key={index} className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                                <Link
                                    to={`/blogs/${blog._id}`}
                                    className="text-blue-600 font-semibold"
                                >
                                    Read More →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blogs;