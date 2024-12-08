import { useState } from "react";
import { createContext } from "react";

export const DoctorContext = createContext();

export const DoctorContextProvider = ({ children }) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [dToken, setDToken] = useState(
        localStorage.getItem('dToken') || ""
    );
    const [loggedInDoctor, setLoggedInDoctor] = useState(
        JSON.parse(localStorage.getItem('currentDoctor')) || {}
    );

    const value = {
        backendUrl,
        dToken,
        setDToken,
        loggedInDoctor,
        setLoggedInDoctor
    };

    return (
        <DoctorContext.Provider value={value}>
            {children}
        </DoctorContext.Provider>
    )

};

export default DoctorContextProvider;