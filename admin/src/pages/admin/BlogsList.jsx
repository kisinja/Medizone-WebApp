import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import Loader from "../../components/Loader";
import BlogCard from "./BlogCard";

const BlogsList = () => {

    const { blogs, blogsLoading, getAllBlogs } = useContext(AdminContext);

    useEffect(() => {
        getAllBlogs();
    }, []);

    if (blogsLoading) {
        return <Loader text="Fetching blogs..." />
    }

    if (blogs.length === 0) {
        return <h1 className="text-3xl text-center text-gray-600">No Blogs Found</h1>
    }

    return (
        <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {
                    blogs && blogs.map(blog => (
                        <BlogCard key={blog._id} blog={blog} />
                    ))
                }
            </div>
        </section>
    )
}

export default BlogsList
