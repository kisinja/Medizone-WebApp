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
    const [blogs, setBlogs] = useState([]);
    const [blogsLoading, setBlogsLoading] = useState(true);

    const [comments, setComments] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(true);

    const getBlogComments = async (blogId) => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/comments/${blogId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (data.success) {
                setComments(data.comments);
                console.log(data.comments);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        } finally {
            setCommentsLoading(false);
        }
    };

    const getAllBlogs = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/blogs`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (data.success) {
                setBlogs(data.blogs);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        } finally {
            setBlogsLoading(false);
        }
    };

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
        loadUserProfile,
        blogs,
        blogsLoading,
        getAllBlogs,
        comments,
        commentsLoading,
        getBlogComments
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
};

export default AppContextProvider;