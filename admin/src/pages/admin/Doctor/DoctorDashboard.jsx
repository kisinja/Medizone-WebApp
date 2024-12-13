import { useContext, useEffect } from "react";
import { DoctorContext } from "../../../context/DoctorContext";
import Loader from '../../../components/Loader';
import docIcon from '../../../assets/assets_admin/earning_icon.svg';
import appIcon from '../../../assets/assets_admin/appointments_icon.svg';
import patIcon from '../../../assets/assets_admin/patients_icon.svg';
import listIcon from '../../../assets/assets_admin/list_icon.svg';
import icon from '../../../assets/assets_admin/cancel_icon.svg';
import { AppContext } from "../../../context/AppContext";
import tick from '../../../assets/assets_admin/tick_icon.svg';

const DoctorDashboard = () => {

    const { dashData, dashLoading, getDashData, dToken, cancelAppointment, cancelLoading, completeAppointment } = useContext(DoctorContext);
    const { slotDateFormat, currencySymbol } = useContext(AppContext);

    useEffect(() => {
        if (dToken) {
            getDashData();
        }
    }, [dToken]);

    if (dashLoading) {
        return <Loader text="Loading dashboard data..." />
    } else if (cancelLoading) {
        return <Loader text="Cancelling Appointment..." />
    }

    return dashData && (
        <section className="m-5">
            <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
                    <img src={docIcon} alt="" className="w-14 " />
                    <div>
                        <p className="text-xl font-semibold text-gray-600">{currencySymbol}{dashData.earnings}</p>
                        <p className="text-gray-400">Earnings</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
                    <img src={appIcon} alt="" className="w-14 " />
                    <div>
                        <p className="text-xl font-semibold text-gray-600">{dashData.appointments}</p>
                        <p className="text-gray-400">Appointments</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
                    <img src={patIcon} alt="" className="w-14 " />
                    <div>
                        <p className="text-xl font-semibold text-gray-600">{dashData.patients}</p>
                        <p className="text-gray-400">Patients</p>
                    </div>
                </div>
            </div>

            <div className="bg-white">
                <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
                    <img src={listIcon} alt="" />
                    <p className="font-semibold">Latest Bookings</p>
                </div>

                <div className="pt-4 border border-t-0">
                    {
                        dashData.latestAppointments.map((app, index) => (
                            <div key={index} className="flex items-center px-6 gap-3 py-3 hover:bg-gray-100">
                                <img src={app.userData.image} alt="" className="rounded-full w-10 h-10 object-cover" />
                                <div className="flex-1 text-sm">
                                    <p className="text-gray-800 font-medium">{app.userData.name}</p>
                                    <p className="text-gray-600">{
                                        slotDateFormat(app.slotDate)}
                                    </p>
                                </div>

                                {
                                    app.cancelled
                                        ? <p className="text-red-400 text-xs font-medium">Cancelled</p>
                                        : app.isCompleted
                                            ? <p className="text-green-500 text-xs font-medium">Completed</p>
                                            : <div className="flex">
                                                <img
                                                    src={icon}
                                                    alt=""
                                                    className="w-10 h-10 rounded-full cursor-pointer"
                                                    onClick={() => cancelAppointment(app._id)}
                                                    title="Cancel Appointment"
                                                />

                                                <img
                                                    src={tick}
                                                    alt=""
                                                    className="w-10 h-10 rounded-full cursor-pointer"
                                                    onClick={() => completeAppointment(app._id)}
                                                    title="Complete Appointment"
                                                />
                                            </div>
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    );
};

export default DoctorDashboard;