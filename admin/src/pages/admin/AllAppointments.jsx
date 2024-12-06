import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import icon from '../../assets/assets_admin/cancel_icon.svg';
import { toast } from "react-toastify";

const AllAppointments = () => {
    const { aToken, appointments, getAllAppointments } = useContext(AdminContext);
    const { calculateAge, slotDateFormat, currencySymbol } = useContext(AppContext);

    useEffect(() => {
        if (aToken) {
            getAllAppointments();
        }
    }, [aToken, getAllAppointments]);

    return (
        <div className="w-full max-w-6xl m-5">
            <p className="mb-3 text-lg font-medium">All Appointments</p>

            <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll min-h-[60vh]">
                {/* Header */}
                <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
                    <p>#</p>
                    <p>Patient</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Doctor</p>
                    <p>Fees</p>
                    <p>Action</p>
                </div>

                {/* Appointments List */}
                {appointments.length === 0 ? (
                    <div className="text-center py-5 flex justify-center items-center h-screen text-gray-600 text-lg">No appointments booked currently!!</div>
                ) : (
                    appointments.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
                        >
                            <p className="max-sm:hidden">{index + 1}</p>
                            <div className="flex items-center gap-2">
                                <img
                                    src={item.userData.image}
                                    className="w-8 rounded-full h-8 object-cover"
                                    alt={item.userData.name}
                                />
                                <p>{item.userData.name}</p>
                            </div>
                            <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
                            <p>
                                {slotDateFormat(item.slotDate)}, {item.slotTime}
                            </p>
                            <div className="flex items-center gap-2">
                                <img
                                    src={item.docData.image}
                                    className="w-8 rounded-full h-8 object-cover bg-gray-200"
                                    alt={item.docData.name}
                                />
                                <p>{item.docData.name}</p>
                            </div>
                            <p>
                                {currencySymbol}
                                {item.amount}
                            </p>
                            {item.cancelled ? (
                                <p className="text-red-500">Cancelled</p>
                            ) : (
                                <img
                                    src={icon}
                                    className="w-10 cursor-pointer"
                                    alt="Cancel Icon"
                                    onClick={() => toast.success("Appointment cancelled!!")} // Add appropriate handler here
                                />
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AllAppointments;