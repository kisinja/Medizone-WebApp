import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {

    const { _id, title, content, tags, imageUrls, published } = blog;

    return (
        <div
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition"
        >
            <img
                src={imageUrls[0] || '/default-blog.jpg'}
                alt={title}
                className="w-full h-48 object-cover"
            />

            <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{title}</h3>

                <div className="flex gap-1">
                    <div
                        className="text-sm text-gray-500 line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: `${content.slice(0, 80)}` }}
                    ></div>
                </div>

                <div className="flex gap-2 mb-4 flex-wrap">
                    {tags && tags.map((tag, index) => (
                        <span key={index} className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                            #{tag}
                        </span>
                    ))}
                </div>
                <Link
                    to={`/blogs/${_id}`}
                    className="text-blue-600 font-semibold"
                >
                    Read More →
                </Link>
            </div>
        </div>
    );
};

export default BlogCard;