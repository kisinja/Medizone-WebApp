import { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../../../components/Loader";
import { FaRegAddressCard } from "react-icons/fa";
import { MdOutlineLocalPhone, MdOutlineMailOutline } from "react-icons/md";
import { DoctorContext } from "../../../context/DoctorContext";

const DoctorProfile = () => {
    const { loggedInDoctor, setLoggedInDoctor, dToken, backendUrl, profileLoading } = useContext(DoctorContext);
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(false);

    if (profileLoading) {
        return <Loader text="Loading profile..." />;
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("fees", loggedInDoctor.fees);
            formData.append("phone", loggedInDoctor.phone);
            formData.append("available", loggedInDoctor.available);

            // Convert address to a JSON string before appending
            if (loggedInDoctor.address) {
                formData.append("address", JSON.stringify(loggedInDoctor.address));
            }

            // Append the image file if it exists
            if (loggedInDoctor.image) {
                formData.append("image", loggedInDoctor.image);
            }

            const { data } = await axios.put(
                `${backendUrl}/api/doctor/profile/update`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${dToken}`, // Allow axios to set the proper Content-Type
                    },
                }
            );

            if (data.success) {
                toast.success(data.message);
                setIsEdit(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };


    if (loading) {
        return <Loader text="Updating Profile..." />;
    }

    return (
        loggedInDoctor && (
            <section className="max-w-lg flex flex-col gap-4 text-sm px-8">
                <form onSubmit={onSubmitHandler}>
                    {/* Personal Information */}
                    <div>
                        <p className="text-neutral-500 underline">PERSONAL INFORMATION</p>
                        {isEdit ? (
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setLoggedInDoctor((prev) => ({
                                        ...prev,
                                        image: e.target.files[0],
                                    }))
                                }
                                className="mt-2"
                            />
                        ) : (
                            <img
                                src={loggedInDoctor.image || "/path/to/default-image.jpg"}
                                alt="User Profile"
                                className="w-36 rounded cursor-pointer"
                            />
                        )}
                    </div>

                    {/* Contact Information */}
                    <div>
                        <p className="text-neutral-500 underline mt-4">CONTACT INFORMATION</p>
                        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
                            <p className="font-medium flex items-center gap-1">
                                <MdOutlineMailOutline className="text-gray-400 text-lg" />
                                Email id:
                            </p>
                            <p className="text-blue-500">{loggedInDoctor.email}</p>

                            <p className="font-medium flex items-center gap-1">
                                <MdOutlineLocalPhone className="text-gray-400 text-lg" />
                                Phone:
                            </p>
                            {isEdit ? (
                                <input
                                    type="text"
                                    value={loggedInDoctor.phone}
                                    onChange={(e) =>
                                        setLoggedInDoctor((prev) => ({
                                            ...prev,
                                            phone: e.target.value,
                                        }))
                                    }
                                    className="bg-gray-100 max-w-52"
                                />
                            ) : (
                                <p className="text-blue-400">{loggedInDoctor.phone}</p>
                            )}
                        </div>
                    </div>

                    {/* Address */}
                    <div>
                        <p className="font-medium flex items-center gap-1">
                            <FaRegAddressCard className="text-gray-400 text-lg" />
                            Address:
                        </p>
                        {isEdit ? (
                            <div>
                                <input
                                    type="text"
                                    placeholder="Line 1"
                                    value={loggedInDoctor.address?.line1 || ""}
                                    onChange={(e) =>
                                        setLoggedInDoctor((prev) => ({
                                            ...prev,
                                            address: { ...prev.address, line1: e.target.value },
                                        }))
                                    }
                                    className="bg-gray-100 max-w-52 mt-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Line 2"
                                    value={loggedInDoctor.address?.line2 || ""}
                                    onChange={(e) =>
                                        setLoggedInDoctor((prev) => ({
                                            ...prev,
                                            address: { ...prev.address, line2: e.target.value },
                                        }))
                                    }
                                    className="bg-gray-100 max-w-52 mt-2"
                                />
                            </div>
                        ) : (
                            <p className="text-gray-500">
                                {loggedInDoctor.address?.line1}
                                <br />
                                {loggedInDoctor.address?.line2}
                            </p>
                        )}
                    </div>

                    {/* Fees and Availability */}
                    <div>
                        <p className="text-neutral-500 underline mt-4">PROFILE DETAILS</p>
                        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
                            <p className="font-medium">Fees:</p>
                            {isEdit ? (
                                <input
                                    type="number"
                                    value={loggedInDoctor.fees}
                                    onChange={(e) =>
                                        setLoggedInDoctor((prev) => ({
                                            ...prev,
                                            fees: e.target.value,
                                        }))
                                    }
                                    className="bg-gray-100 max-w-52"
                                />
                            ) : (
                                <p className="text-gray-400">{loggedInDoctor.fees}</p>
                            )}

                            <p className="font-medium">Availability:</p>
                            {isEdit ? (
                                <input
                                    type="checkbox"
                                    checked={loggedInDoctor.available}
                                    onChange={(e) =>
                                        setLoggedInDoctor((prev) => ({
                                            ...prev,
                                            available: e.target.checked,
                                        }))
                                    }
                                />
                            ) : (
                                <p
                                    className={`${loggedInDoctor.available
                                        ? "text-green-500"
                                        : "text-red-400"
                                        } font-medium`}
                                >
                                    {loggedInDoctor.available ? "Available" : "Not Available"}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    {isEdit ? (
                        <button
                            type="submit"
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Save Changes
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsEdit(true)}
                            className="mt-4 bg-gray-300 text-black px-4 py-2 rounded"
                        >
                            Edit Profile
                        </button>
                    )}
                </form>
            </section>
        )
    );
};

export default DoctorProfile;