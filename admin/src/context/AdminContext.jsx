import { createContext, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {

    const [aToken, setAToken] = useState(
        localStorage.getItem('aToken') || ''
    );
    const [doctors, setDoctors] = useState();
    const [loading, setLoading] = useState(false);
    const [appointmentsLoading, setAppointmentsLoading] = useState(true);
    const [cancelLoading, setCancelLoading] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [blogsLoading, setBlogsLoading] = useState(true);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getAllBlogs = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/blogs`, {
                headers: {
                    'Authorization': `Bearer ${aToken}`,
                },
            });
            if (data.success) {
                setBlogs(data.blogs);
            } else {
                toast.error(data.message);
                console.log(data);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        } finally {
            setBlogsLoading(false);
        }
    };

    const getAllDoctors = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/all-doctors`, {
                headers: {
                    'Authorization': `Bearer ${aToken}`
                }
            });

            if (data.success) {
                setDoctors(data.doctors);
                setLoading(false);
            } else {
                toast.error(data.message);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const changeAvailability = async (docId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/change-availability`, { docId }, {
                headers: {
                    'Authorization': `Bearer ${aToken}`
                }
            });

            if (data.success) {
                toast.success(data.message);
                getAllDoctors();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    const getAllAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/appointments`, {
                headers: {
                    'Authorization': `Bearer ${aToken}`
                }
            });
            if (data.success) {
                setAppointments(data.appointments);
            } else {
                toast.error(data.message?.error);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        } finally {
            setAppointmentsLoading(false);
        }
    };

    const cancelAppointment = async (appointmentId) => {
        setCancelLoading(true);

        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/cancel-appointment`, { appointmentId }, {
                headers: {
                    Authorization: `Bearer ${aToken}`,
                },
            });
            if (data.success) {
                toast.success(data.message);
                getAllAppointments();
                getAllDoctors();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setCancelLoading(false);
        }
    };

    const value = {
        aToken,
        setAToken,
        backendUrl,
        doctors,
        getAllDoctors,
        loading,
        changeAvailability,
        appointments,
        getAllAppointments,
        setAppointments,
        appointmentsLoading,
        cancelAppointment,
        cancelLoading,
        blogs,
        getAllBlogs,
        blogsLoading,
    };

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    )

};

export default AdminContextProvider;