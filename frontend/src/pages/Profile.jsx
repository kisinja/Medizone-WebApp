import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../components/Loader";
import { FaCalendarAlt, FaRegAddressCard, FaTransgenderAlt } from "react-icons/fa";
import { MdOutlineLocalPhone, MdOutlineMailOutline } from "react-icons/md";

const Profile = () => {
    const { userData, setUserData } = useContext(AppContext);
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(false);

    const { backendUrl, token } = useContext(AppContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();

            formData.append("name", userData.name);
            formData.append("email", userData.email);
            formData.append("phone", userData.phone);
            formData.append("address", JSON.stringify(userData.address));
            formData.append("gender", userData.gender);
            formData.append("dob", userData.dob);

            if (userData.imageFile) {
                formData.append("image", userData.imageFile);
            }

            const { data } = await axios.put(
                `${backendUrl}/api/user/profile/update`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data", // Important for file uploads
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (data.success) {
                toast.success(data.message);
                setIsEdit(false);
                setUserData((prevData) => ({
                    ...prevData,
                    image: data.user.image,
                }));
            } else {
                toast.error(data.message);
            }

            scrollTo(0, 0);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loader text="Updating Profile..." />;
    }

    return (
        userData && (
            <div className="max-w-lg flex flex-col gap-2 text-sm">
                {
                    isEdit
                        ? (
                            <input
                                type="file"
                                onChange={(e) => setUserData(prev => ({ ...prev, imageFile: e.target.files[0] }))}
                                className=""
                            />
                        )
                        : (
                            <img
                                src={userData.image || '/path/to/default-image.jpg'} // Use a fallback image if no user image
                                alt="User Profile"
                                className="w-36 rounded cursor-pointer"
                            />
                        )
                }


                {
                    isEdit
                        ? <input type="text" onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} value={userData.name} className="bg-gray-50 text-3xl font-medium max-w-60 mt-4" />
                        : <p className="font-medium text-3xl text-neutral-800">{userData.name}</p>
                }

                <hr className="bg-zinc-400 h-[1px] border-none" />

                <div>
                    <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>

                    <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
                        <p className="font-medium flex items-center gap-1">
                            <MdOutlineMailOutline className="text-gray-400 text-lg" />
                            Email id:
                        </p>
                        <p className="text-blue-500">{userData.email}</p>

                        <p className="font-medium flex items-center gap-1">
                            <MdOutlineLocalPhone className="text-gray-400 text-lg" />
                            Phone:
                        </p>
                        {
                            isEdit
                                ? <input type="text" onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} value={userData.phone} className="bg-gray-100 max-w-52" />
                                : <p className="text-blue-400">{userData.phone}</p>
                        }

                        <p className="font-medium flex items-center gap-1">
                            <FaRegAddressCard className="text-gray-400 text-lg" />
                            Address:
                        </p>
                        {
                            isEdit
                                ? <p>
                                    <input
                                        type="text"
                                        onChange={(e) => setUserData(prev => ({
                                            ...prev,
                                            address: {
                                                ...prev.address,
                                                line1: e.target.value
                                            }
                                        }))}
                                        value={userData.address.line1 || ''}
                                        className="bg-gray-100 max-w-52"
                                        placeholder="Address Line 1"
                                    />
                                    <input
                                        type="text"
                                        onChange={(e) => setUserData(prev => ({
                                            ...prev,
                                            address: {
                                                ...prev.address,
                                                line2: e.target.value
                                            }
                                        }))}
                                        value={userData.address.line2 || ''}
                                        className="bg-gray-100 max-w-52 mt-2"
                                        placeholder="Address Line 2"
                                    />
                                </p>
                                : <p className="text-gray-500">
                                    {userData.address && userData.address.line1
                                        ? (
                                            <>
                                                {userData.address.line1}
                                                <br />
                                                {userData.address.line2}
                                            </>
                                        )
                                        : 'No address provided'}
                                </p>
                        }
                    </div>

                    <div>
                        <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>

                        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
                            <p className="font-medium flex items-center gap-1">
                                <FaTransgenderAlt className="text-gray-400 text-lg" />
                                Gender:
                            </p>

                            {
                                isEdit
                                    ? <select onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender} className="max-w-20 bg-gray-100">
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                    : <p className="text-gray-400">{userData.gender}</p>
                            }
                            <p className="font-medium flex items-center gap-1">
                                <FaCalendarAlt className="text-gray-400 text-lg" />
                                Birthday:
                            </p>
                            {
                                isEdit
                                    ? <input type="date" onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} className="max-w-28 bg-gray-100" />
                                    : <p className="text-gray-400">{userData.dob}</p>
                            }
                        </div>

                        <div className="mt-6 flex items-center gap-2">
                            <div className="flex items-center gap-1">
                                <FaCalendarAlt className="text-gray-400" />
                                <p className="font-medium">Joined on:</p>
                            </div>
                            <span className="text-blue-400">{new Date(userData.createdAt).toDateString()}</span>
                        </div>
                    </div>

                    <div className="mt-10">
                        {
                            isEdit
                                ? (
                                    <div>
                                        <button onClick={onSubmitHandler} className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white ">Update Information</button>

                                        <button onClick={() => setIsEdit(false)} className="border border-gray-400 px-8 py-2 rounded-full hover:bg-gray-400 hover:text-white ml-4">Cancel</button>
                                    </div>
                                )
                                : <button onClick={() => { setIsEdit(true); scrollTo(0, 0) }} className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white">Edit Profile</button>
                        }
                    </div>
                </div>
            </div>
        )
    );
};

export default Profile;