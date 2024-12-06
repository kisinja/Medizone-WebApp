import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const currencySymbol = '$';

    const backendUrl = import.meta.env.VITE_BACKEND;

    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState(
        localStorage.getItem('token') ? localStorage.getItem('token') : ''
    );
    const [userData, setUserData] = useState(false);

    const getDoctorsData = async () => {
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