import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import Loader from "../../components/Loader";
import docIcon from '../../assets/assets_admin/doctor_icon.svg';
import appIcon from '../../assets/assets_admin/appointments_icon.svg';
import patIcon from '../../assets/assets_admin/patients_icon.svg';
import listIcon from '../../assets/assets_admin/list_icon.svg';
import icon from '../../assets/assets_admin/cancel_icon.svg';

const Dashboard = () => {

    const { dashData, dashDataLoading, getDashData, cancelAppointment, aToken, cancelLoading } = useContext(AdminContext);

    useEffect(() => {
        if (aToken) {
            getDashData();
        }
    }, [aToken]);

    if (dashDataLoading) {
        return <Loader text="Loading dashdoard data..." />
    } else if (cancelLoading) {
        return <Loader text="Cancelling appointment..." />
    }

    return dashData && (
        <section className="m-5">
            <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
                    <img src={docIcon} alt="" className="w-14 " />
                    <div>
                        <p className="text-xl font-semibold text-gray-600">{dashData.doctors}</p>
                        <p className="text-gray-400">Doctors</p>
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
                                <img src={app.docData.image} alt="" className="rounded-full w-10 h-10 object-cover" />
                                <div className="flex-1 text-sm">
                                    <p className="text-gray-800 font-medium">{app.docData.name}</p>
                                    <p className="text-gray-600">{app.slotDate}</p>
                                </div>

                                {app.cancelled ? (
                                    <p className="text-red-400 text-xs">cancelled</p>
                                ) : (
                                    <img
                                        src={icon}
                                        className="w-10  rounded-full"
                                        alt="Cancel Icon"
                                        onClick={() => cancelAppointment(app._id)}
                                    />
                                )}
                            </div>
                        ))
                    }
                </div>
            </div>

        </section>
    )
}

export default Dashboard
