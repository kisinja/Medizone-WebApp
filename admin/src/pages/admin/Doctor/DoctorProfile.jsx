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
            const { fees, address, phone, available } = loggedInDoctor;

            const { data } = await axios.post(
                `${backendUrl}/api/doctor/profile/update`,
                { fees, address, phone, available },
                {
                    headers: {
                        Authorization: `Bearer ${dToken}`,
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
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loader text="Updating Profile..." />;
    }

    return (
        loggedInDoctor && (
            <section className="max-w-lg flex flex-col gap-2 text-sm px-8">
                <form onSubmit={onSubmitHandler}>
                    <div>
                        <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>

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
                                    onChange={(e) =>
                                        setLoggedInDoctor((prev) => ({ ...prev, phone: e.target.value }))
                                    }
                                    value={loggedInDoctor.phone}
                                    className="bg-gray-100 max-w-52"
                                />
                            ) : (
                                <p className="text-blue-400">{loggedInDoctor.phone}</p>
                            )}

                            <p className="font-medium flex items-center gap-1">
                                <FaRegAddressCard className="text-gray-400 text-lg" />
                                Address:
                            </p>
                            {isEdit ? (
                                <div>
                                    <input
                                        type="text"
                                        onChange={(e) =>
                                            setLoggedInDoctor((prev) => ({
                                                ...prev,
                                                address: {
                                                    ...prev.address,
                                                    line1: e.target.value,
                                                },
                                            }))
                                        }
                                        value={loggedInDoctor.address?.line1 || ""}
                                        className="bg-gray-100 max-w-52"
                                        placeholder="Address Line 1"
                                    />
                                    <input
                                        type="text"
                                        onChange={(e) =>
                                            setLoggedInDoctor((prev) => ({
                                                ...prev,
                                                address: {
                                                    ...prev.address,
                                                    line2: e.target.value,
                                                },
                                            }))
                                        }
                                        value={loggedInDoctor.address?.line2 || ""}
                                        className="bg-gray-100 max-w-52 mt-2"
                                        placeholder="Address Line 2"
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
                    </div>

                    <div>
                        <p className="text-neutral-500 underline mt-3">PROFILE DETAILS</p>
                        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
                            <p className="font-medium flex items-center gap-1">Fees:</p>
                            {isEdit ? (
                                <input
                                    type="number"
                                    onChange={(e) =>
                                        setLoggedInDoctor((prev) => ({ ...prev, fees: e.target.value }))
                                    }
                                    value={loggedInDoctor.fees}
                                    className="bg-gray-100 max-w-52"
                                />
                            ) : (
                                <p className="text-gray-400">{loggedInDoctor.fees}</p>
                            )}

                            <p className="font-medium flex items-center gap-1">Availability:</p>
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
                                    className={`${loggedInDoctor.available ? "text-green-500" : "text-red-400"
                                        } font-medium`}
                                >
                                    {loggedInDoctor.available ? "Available" : "Not Available"}
                                </p>
                            )}
                        </div>
                    </div>

                    {isEdit && (
                        <button
                            type="submit"
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Save Changes
                        </button>
                    )}
                </form>

                {!isEdit && (
                    <button
                        onClick={() => setIsEdit(true)}
                        className="mt-4 bg-gray-300 text-black px-4 py-2 rounded"
                    >
                        Edit Profile
                    </button>
                )}
            </section>
        )
    );
};

export default DoctorProfile;