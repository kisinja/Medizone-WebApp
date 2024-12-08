import Carousel from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


const BlogCard = ({ blog }) => {

    const { title, content, tags, imageUrls, published } = blog;

    return (
        <div className="max-w-md mx-auto bg-gradient-to-br from-gray-900 to-purple-800 shadow-2xl rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-500">
            {/* Image Carousel */}
            <div className="relative">
                <Carousel
                    autoPlay
                    infiniteLoop
                    showThumbs={false}
                    showStatus={false}
                    className="blog-carousel"
                >
                    {imageUrls.map((url, index) => (
                        <img
                            key={index}
                            src={url}
                            alt={`Blog Image ${index + 1}`}
                            className="object-cover h-64 w-full"
                        />
                    ))}
                </Carousel>
                <span className="absolute top-4 left-4 bg-black bg-opacity-50 text-white text-xs px-3 py-1 rounded-full uppercase font-bold">
                    {published ? "Published" : "Draft"}
                </span>
            </div>

            {/* Blog Content */}
            <div className="p-6 space-y-4 text-white">
                <h3 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">
                    {title}
                </h3>
                <div
                    className="text-sm text-gray-300 content-clamp"
                    dangerouslySetInnerHTML={{ __html: content }}
                ></div>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-gray-800 rounded-full text-xs text-pink-400 shadow-sm"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Read More Button */}
            <div className="px-6 py-4">
                <button className="w-full py-2 bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded-lg font-bold shadow-md transform hover:translate-y-1 transition-transform duration-300">
                    Read More
                </button>
            </div>
        </div>
    );
};

export default BlogCard;