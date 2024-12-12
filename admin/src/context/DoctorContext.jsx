import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const DoctorContext = createContext();

export const DoctorContextProvider = ({ children }) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [dToken, setDToken] = useState(
        localStorage.getItem('dToken') || ""
    );
    const [loggedInDoctor, setLoggedInDoctor] = useState(
        JSON.parse(localStorage.getItem('currentDoctor')) || {}
    );
    const [appointments, setAppointments] = useState([]);
    const [appLoading, setAppLoading] = useState(true);
    const [cancelLoading, setCancelLoading] = useState(false);
    const [completeLoading, setCompleteLoading] = useState(false);

    const getAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/my-appointments`, {
                headers: {
                    Authorization: `Bearer ${dToken}`
                }
            });
            if (data.success) {
                setAppointments(data.appointments);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        } finally {
            setAppLoading(false);
        }
    };

    const completeAppointment = async (appointmentId) => {
        setCompleteLoading(true);
        try {
            const { data } = await axios.post(`${backendUrl}/api/doctor/complete-appointment`, { appointmentId }, {
                headers: {
                    "Authorization": `Bearer ${dToken}`
                }
            });
            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        } finally {
            setCompleteLoading(false);
        }
    };

    const cancelAppointment = async (appointmentId) => {
        setCancelLoading(true);
        try {
            const { data } = await axios.post(`${backendUrl}/api/doctor/cancel-appointment`, { appointmentId }, {
                headers: {
                    "Authorization": `Bearer ${dToken}`
                }
            });
            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        } finally {
            setCancelLoading(false);
        }
    };

    const value = {
        backendUrl,
        dToken,
        setDToken,
        loggedInDoctor,
        setLoggedInDoctor,
        getAppointments,
        appointments,
        appLoading,
        cancelAppointment,
        completeAppointment,
        cancelLoading,
        completeLoading
    };

    return (
        <DoctorContext.Provider value={value}>
            {children}
        </DoctorContext.Provider>
    )

};

export default DoctorContextProvider;