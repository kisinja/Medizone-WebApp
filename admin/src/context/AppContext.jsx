import { createContext } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const currencySymbol = "$";

    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);

        let age = today.getFullYear() - birthDate.getFullYear();
        return age;
    };

    const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split("-");
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
    };

    const value = {
        calculateAge,
        slotDateFormat,
        currencySymbol
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )

};

export default AppContextProvider;