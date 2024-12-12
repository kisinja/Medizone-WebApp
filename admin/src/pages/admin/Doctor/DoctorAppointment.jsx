import { useContext, useEffect } from "react";
import { DoctorContext } from "../../../context/DoctorContext";
import Loader from "../../../components/Loader";
import { AppContext } from "../../../context/AppContext";
import icon from '../../../assets/assets_admin/cancel_icon.svg';
import tick from '../../../assets/assets_admin/tick_icon.svg';

const DoctorAppointment = () => {

    const { appointments, appLoading, getAppointments, dToken, cancelAppointment, completeAppointment, cancelLoading, completeLoading } = useContext(DoctorContext);
    const { calculateAge, slotDateFormat, currencySymbol } = useContext(AppContext);

    useEffect(() => {
        if (dToken) {
            getAppointments();
        }
    }, []);

    if (appLoading) {
        return <Loader text="Loading your appointments..." />
    } else if (cancelLoading) {
        return <Loader text="Cancelling appointment..." />
    } else if (completeLoading) {
        return <Loader text="Completing appointment..." />
    } else if (appointments.length === 0) {
        return <div className="flex justify-center items-center text-gray-600 min-h-screen text-center">No appointments found</div>
    }

    return (
        <section className="w-full max-w-6xl m-5">
            <h1 className="mb-3 text-lg font-medium">All My Appointments</h1>

            <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll min-h-[50vh]">
                <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b">
                    <p>#</p>
                    <p>Patient</p>
                    <p>Payment</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Fee</p>
                    <p>Action</p>
                </div>

                {
                    appointments.map((item, index) => (
                        <div key={index} className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50">
                            <p className="max-sm:hidden">{index + 1}</p>

                            <div className="flex items-center gap-2">
                                <img
                                    src={item.userData.image} alt=""
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <p>{item.userData.name}</p>
                            </div>

                            <div>
                                <p className="text-xs inline border border-primary px-2 rounded-full">
                                    {item.payment ? "Online" : "CASH"}
                                </p>
                            </div>
                            <p className="max-sm:hidden">
                                {calculateAge(item.userData.dob)}
                            </p>
                            <p>
                                {slotDateFormat(item.slotDate)} {item.slotTime}
                            </p>
                            <p>
                                {currencySymbol}{item.amount}
                            </p>

                            {
                                item.cancelled
                                    ? <p className="text-red-400 text-xs font-medium">Cancelled</p>
                                    : item.isCompleted
                                        ? <p className="text-green-500 text-xs font-medium">Completed</p>
                                        : <div className="flex">
                                            <img
                                                src={icon}
                                                alt=""
                                                className="w-10 h-10 rounded-full cursor-pointer"
                                                onClick={() => cancelAppointment(item._id)}
                                                title="Cancel Appointment"
                                            />

                                            <img
                                                src={tick}
                                                alt=""
                                                className="w-10 h-10 rounded-full cursor-pointer"
                                                onClick={() => completeAppointment(item._id)}
                                                title="Complete Appointment"
                                            />
                                        </div>
                            }
                        </div>
                    ))
                }
            </div>
        </section>
    );
};

export default DoctorAppointment;