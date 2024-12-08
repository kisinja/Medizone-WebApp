
const PublishBlogIcon = () => {
    return (
        <a
            href="/publish-blog"
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 px-3 py-2 rounded-md transition w-12 md:w-8"
        >
            {/* Icon */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4m14 4H6m14-8H6"
                />
            </svg>
            {/* Label */}
            <span className="font-medium">Publish Blog</span>
        </a>
    );
};

export default PublishBlogIcon;