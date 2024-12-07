import { useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const BlogForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        tags: "",
        published: false,
    });

    const { backendUrl, token } = useContext(AppContext);

    const [uploadedImages, setUploadedImages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onDrop = (acceptedFiles) => {
        setUploadedImages((prev) =>
            prev.concat(
                acceptedFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) }))
            )
        );
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = () => {
        setFormData((prev) => ({ ...prev, published: !prev.published }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("content", formData.content);
        formDataToSend.append("published", formData.published);

        // Convert tags string into an array
        const tagsArray = formData.tags.split(",").map((tag) => tag.trim());
        formDataToSend.append("tags", JSON.stringify(tagsArray)); // Send as a JSON string if backend expects JSON

        uploadedImages.forEach((image) => {
            formDataToSend.append("imageUrls", image);
        });

        try {
            const { data } = await axios.post(`${backendUrl}/api/blogs`, formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`,
                },
            });
            if (data.success) {
                toast.success("Blog created successfully");
                setFormData({
                    title: "",
                    content: "",
                    tags: "",
                    published: false,
                });
                setUploadedImages([]);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while creating the blog.");
        } finally {
            setIsSubmitting(false);
        }
    };


    if (isSubmitting) {
        return <Loader text="Publishing Blog..." />
    }

    return (
        <section className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6">
                <h1 className="text-3xl font-bold mb-6 text-gray-600 text-center">Create a New Blog</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter blog title"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Content</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                            rows="6"
                            placeholder="Write your blog content"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Tags (comma-separated)</label>
                        <input
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g. technology, programming, web development"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Upload Images</label>
                        <div
                            {...getRootProps()}
                            className="border-dashed border-2 border-gray-300 rounded-lg p-6 flex justify-center items-center text-gray-500 cursor-pointer hover:bg-gray-50"
                        >
                            <input {...getInputProps()} />
                            <p>Drag and drop images here, or click to select files</p>
                        </div>
                        <div className="flex flex-wrap mt-4 gap-2">
                            {uploadedImages.map((file, index) => (
                                <div key={index} className="relative w-24 h-24">
                                    <img
                                        src={file.preview}
                                        alt="Preview"
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="published"
                            name="published"
                            checked={formData.published}
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="published" className="ml-2 text-gray-700">
                            Publish immediately
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Create Blog"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default BlogForm;