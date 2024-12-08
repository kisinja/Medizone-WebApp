import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const currencySymbol = 'Kshs. ';

    const backendUrl = import.meta.env.VITE_BACKEND;

    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(
        localStorage.getItem('token') ? localStorage.getItem('token') : ''
    );
    const [userData, setUserData] = useState(false);

    const getDoctorsData = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
            if (data.success) {
                setDoctors(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getDoctorsData();
    }, []);

    // get user data
    const loadUserProfile = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (data.success) {
                setUserData(data.user);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (token) {
            loadUserProfile();
        } else {
            setUserData(false);
        }
    }, [token]);

    const value = {
        doctors,
        loading,
        getDoctorsData,
        currencySymbol,
        token,
        setToken,
        backendUrl,
        userData,
        setUserData,
        loadUserProfile
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
};

export default AppContextProvider;